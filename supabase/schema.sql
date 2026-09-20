-- TEMANIN Supabase schema
-- Jalankan sekali melalui Supabase SQL Editor pada project baru.
-- Auth user dibuat melalui Supabase Auth, lalu profil staf dimasukkan ke public.counselors.

create extension if not exists pgcrypto;

create type public.identity_mode as enum ('anonim', 'terhubung');
create type public.session_status as enum ('screening', 'waiting', 'active', 'closed', 'cancelled');
create type public.priority_level as enum ('LOW', 'MEDIUM', 'HIGH', 'URGENT');
create type public.staff_role as enum ('peer_counselor', 'supervisor', 'admin');
create type public.conversation_status as enum ('waiting', 'connected', 'outside_schedule', 'escalated', 'closed');
create type public.sender_type as enum ('user', 'counselor', 'supervisor', 'system');

create table public.pik_r_partners (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  name text not null,
  district text not null,
  city text not null default 'Depok',
  description text,
  contact_person text,
  official_contact text,
  telegram_url text,
  is_active boolean not null default true,
  chat_enabled boolean not null default true,
  offline_counseling_enabled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.counselors (
  id uuid primary key references auth.users(id) on delete cascade,
  pik_r_id uuid references public.pik_r_partners(id) on delete set null,
  full_name text not null,
  role public.staff_role not null default 'peer_counselor',
  is_trained boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.shift_schedule (
  id uuid primary key default gen_random_uuid(),
  pik_r_id uuid not null references public.pik_r_partners(id) on delete cascade,
  counselor_id uuid not null references public.counselors(id) on delete cascade,
  day_of_week smallint not null check (day_of_week between 0 and 6),
  start_time time not null,
  end_time time not null,
  timezone text not null default 'Asia/Jakarta',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  check (start_time < end_time),
  unique (counselor_id, day_of_week, start_time, end_time)
);

create table public.sessions (
  id uuid primary key default gen_random_uuid(),
  session_code text not null unique default ('TEMANIN-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8))),
  user_id uuid references auth.users(id) on delete set null,
  identity_mode public.identity_mode not null,
  display_name text not null check (char_length(display_name) between 1 and 60),
  contact text,
  institution text,
  return_token_hash text,
  status public.session_status not null default 'screening',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  closed_at timestamptz
);

create table public.screening_results (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null unique references public.sessions(id) on delete cascade,
  category text not null,
  priority_label public.priority_level not null,
  raw_answer smallint not null check (raw_answer between 1 and 5),
  condition_label text not null,
  notes text,
  created_at timestamptz not null default now()
);

create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null unique references public.sessions(id) on delete cascade,
  pik_r_id uuid references public.pik_r_partners(id) on delete set null,
  primary_counselor_id uuid references public.counselors(id) on delete set null,
  status public.conversation_status not null default 'waiting',
  escalated boolean not null default false,
  escalated_to uuid references public.counselors(id) on delete set null,
  escalation_reason text,
  started_at timestamptz,
  closed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_type public.sender_type not null,
  sender_user_id uuid references auth.users(id) on delete set null,
  content text not null check (char_length(content) between 1 and 5000),
  sent_at timestamptz not null default now()
);

create table public.feedback (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null unique references public.conversations(id) on delete cascade,
  rating smallint not null check (rating between 1 and 5),
  comment text check (char_length(comment) <= 2000),
  created_at timestamptz not null default now()
);

create index idx_counselors_availability on public.counselors (pik_r_id, is_active, is_trained);
create index idx_shift_lookup on public.shift_schedule (day_of_week, is_active, pik_r_id);
create index idx_sessions_status_created on public.sessions (status, created_at);
create index idx_screening_priority on public.screening_results (priority_label, created_at);
create index idx_conversations_queue on public.conversations (status, pik_r_id, created_at);
create index idx_conversations_counselor on public.conversations (primary_counselor_id, status);
create index idx_messages_conversation_time on public.messages (conversation_id, sent_at);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_pik_r_partners_updated_at before update on public.pik_r_partners for each row execute function public.set_updated_at();
create trigger set_counselors_updated_at before update on public.counselors for each row execute function public.set_updated_at();
create trigger set_sessions_updated_at before update on public.sessions for each row execute function public.set_updated_at();
create trigger set_conversations_updated_at before update on public.conversations for each row execute function public.set_updated_at();

create or replace function public.current_staff_role()
returns public.staff_role
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select role from public.counselors where id = auth.uid() and is_active = true;
$$;

revoke all on function public.current_staff_role() from public;
grant execute on function public.current_staff_role() to authenticated;

alter table public.pik_r_partners enable row level security;
alter table public.counselors enable row level security;
alter table public.shift_schedule enable row level security;
alter table public.sessions enable row level security;
alter table public.screening_results enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.feedback enable row level security;

create policy "public can view active PIK-R" on public.pik_r_partners for select to anon, authenticated using (is_active = true);
create policy "admin manages PIK-R" on public.pik_r_partners for all to authenticated using (public.current_staff_role() = 'admin') with check (public.current_staff_role() = 'admin');

create policy "staff views own profile" on public.counselors for select to authenticated using (id = auth.uid() or public.current_staff_role() in ('supervisor', 'admin'));
create policy "admin manages counselors" on public.counselors for all to authenticated using (public.current_staff_role() = 'admin') with check (public.current_staff_role() = 'admin');

create policy "staff views relevant shifts" on public.shift_schedule for select to authenticated using (counselor_id = auth.uid() or public.current_staff_role() in ('supervisor', 'admin'));
create policy "admin manages shifts" on public.shift_schedule for all to authenticated using (public.current_staff_role() = 'admin') with check (public.current_staff_role() = 'admin');

create policy "visitor creates session" on public.sessions for insert to anon, authenticated with check (display_name <> '');
create policy "user views own linked sessions" on public.sessions for select to authenticated using (user_id = auth.uid() or public.current_staff_role() is not null);
create policy "staff updates sessions" on public.sessions for update to authenticated using (public.current_staff_role() is not null) with check (public.current_staff_role() is not null);

create policy "visitor submits screening" on public.screening_results for insert to anon, authenticated with check (raw_answer between 1 and 5);
create policy "staff views screening" on public.screening_results for select to authenticated using (public.current_staff_role() is not null);

create policy "staff views conversations" on public.conversations for select to authenticated using (
  primary_counselor_id = auth.uid() or escalated_to = auth.uid() or public.current_staff_role() in ('supervisor', 'admin')
);
create policy "staff updates conversations" on public.conversations for update to authenticated using (
  primary_counselor_id = auth.uid() or escalated_to = auth.uid() or public.current_staff_role() in ('supervisor', 'admin')
) with check (public.current_staff_role() is not null);

create policy "assigned staff views messages" on public.messages for select to authenticated using (
  exists (select 1 from public.conversations c where c.id = conversation_id and (c.primary_counselor_id = auth.uid() or c.escalated_to = auth.uid() or public.current_staff_role() in ('supervisor', 'admin')))
);
create policy "staff sends messages" on public.messages for insert to authenticated with check (sender_user_id = auth.uid() and public.current_staff_role() is not null);

create policy "visitor submits feedback" on public.feedback for insert to anon, authenticated with check (rating between 1 and 5);
create policy "supervisor views feedback" on public.feedback for select to authenticated using (public.current_staff_role() in ('supervisor', 'admin'));

-- Client publik hanya diberi operasi minimum. Pembuatan conversation dan routing
-- dilakukan melalui Route Handler/Server Action dengan service role di server.
grant select on public.pik_r_partners to anon, authenticated;
grant insert on public.sessions, public.screening_results, public.feedback to anon, authenticated;
grant select, update, insert on public.counselors, public.shift_schedule, public.sessions, public.screening_results, public.conversations, public.messages, public.feedback to authenticated;
grant all on all tables in schema public to service_role;

alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.conversations;
