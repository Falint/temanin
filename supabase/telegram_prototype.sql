-- Jalankan setelah schema.sql. Isi chat_id dan staf uji secara manual (lihat README).
create table public.telegram_pikr_routes (
  pikr_id uuid primary key references public.pik_r_partners(id) on delete cascade,
  pikr_chat_id bigint not null unique
);

create table public.telegram_pikr_staff (
  pikr_id uuid not null references public.pik_r_partners(id) on delete cascade,
  telegram_user_id bigint not null,
  primary key (pikr_id, telegram_user_id)
);

create table public.telegram_sessions (
  session_id uuid primary key references public.sessions(id) on delete cascade,
  link_token_hash text not null unique,
  link_expires_at timestamptz not null,
  user_chat_id bigint,
  linked_at timestamptz,
  closed_at timestamptz
);
create unique index telegram_one_active_session_per_user
  on public.telegram_sessions (user_chat_id) where user_chat_id is not null and closed_at is null;

create table public.telegram_relay_messages (
  pikr_chat_id bigint not null,
  bot_message_id bigint not null,
  session_id uuid not null references public.sessions(id) on delete cascade,
  primary key (pikr_chat_id, bot_message_id)
);
create index telegram_relay_session_idx on public.telegram_relay_messages (session_id);

create table public.telegram_processed_updates (
  update_id bigint primary key,
  created_at timestamptz not null default now()
);

alter table public.telegram_pikr_routes enable row level security;
alter table public.telegram_pikr_staff enable row level security;
alter table public.telegram_sessions enable row level security;
alter table public.telegram_relay_messages enable row level security;
alter table public.telegram_processed_updates enable row level security;
-- Tidak ada policy untuk anon/authenticated. Hanya server dengan service role yang mengaksesnya.
grant all on public.telegram_pikr_routes, public.telegram_pikr_staff, public.telegram_sessions,
  public.telegram_relay_messages, public.telegram_processed_updates to service_role;
