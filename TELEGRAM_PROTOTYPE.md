# Curhat Telegram TEMANIN

Percakapan berlangsung di Telegram. Halaman `/curhat/chat` masih simulasi. Daftar PIK-R untuk Telegram pada `/curhat/wilayah` dan beranda diambil dari Supabase: hanya mitra aktif dengan `chat_enabled = true` dan baris `telegram_pikr_routes` yang muncul. Satu bot melayani beberapa grup PIK-R; pengurus yang terdaftar membalas dengan **Reply** pada pesan bot di grup.

Untuk memasang di Vercel dan menambah PIK-R, lihat [DEPLOY_VERCEL.md](DEPLOY_VERCEL.md).

## 1. Siapkan Supabase

Jalankan `supabase/schema.sql` pada project Supabase baru jika belum pernah dijalankan. Setelah itu jalankan `supabase/telegram_prototype.sql`. Jangan jalankan skema dasar dua kali karena `CREATE TYPE` di sana tidak idempotent.

Untuk uji satu PIK-R, tambahkan mitra, route grup, dan ID pengurus (sesuaikan nilai contoh):

```sql
insert into public.pik_r_partners (slug, name, district, chat_enabled, is_active)
values ('pikr-demo-a', 'PIK-R Demo A', 'beji', true, true)
on conflict (slug) do update set chat_enabled = true, is_active = true;

-- Ganti kedua angka di bawah dengan ID grup PIK-R dan ID akun Telegram pengurus.
insert into public.telegram_pikr_routes (pikr_id, pikr_chat_id)
select id, -1001234567890 from public.pik_r_partners where slug = 'pikr-demo-a'
on conflict (pikr_id) do update set pikr_chat_id = excluded.pikr_chat_id;

insert into public.telegram_pikr_staff (pikr_id, telegram_user_id)
select id, 123456789 from public.pik_r_partners where slug = 'pikr-demo-a'
on conflict (pikr_id, telegram_user_id) do nothing;
```

Slug bebas selama huruf kecil, angka, dan tanda hubung; `district` gunakan ID kecamatan dari `src/lib/data/regions.js`, misalnya `beji`, bukan `Depok`. Satu PIK-R memakai satu grup Telegram. Jangan gunakan chat pribadi pengurus sebagai grup PIK-R.

Untuk mendapatkan ID grup dan ID pengurus: masukkan bot ke grup, kirim perintah seperti `/test@NamaBot` dari akun pengurus, lalu sebelum webhook dipasang panggil `getUpdates`:

```bash
curl "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates"
```

Dalam hasilnya, `message.chat.id` adalah ID grup, sedangkan `message.from.id` adalah ID pengurus. Jangan bagikan hasil lengkap `getUpdates` karena mungkin berisi pesan pribadi. Jika webhook sudah aktif, sementara hapus dengan `deleteWebhook`, catat ID melalui `getUpdates`, lalu pasang kembali webhook ke URL Vercel.

## 2. Environment lokal

Di direktori `src/`, salin `.env.example` menjadi `.env.local`, lalu isi lima variabel. `SUPABASE_SERVICE_ROLE_KEY` hanya boleh berada di server. `TELEGRAM_BOT_USERNAME` adalah nama bot tanpa `@`. Buat `TELEGRAM_WEBHOOK_SECRET` acak (misalnya `openssl rand -hex 32`). Jangan commit `.env.local`.

```bash
cd src
npm ci
npm run dev
```

Jalankan tunnel di terminal lain:

```bash
cloudflared tunnel --url http://localhost:3000
```

Catat URL HTTPS `https://...trycloudflare.com` yang muncul. URL ini berubah ketika quick tunnel baru dibuat.

Jika website dibuka melalui tunnel pada mode dev, tambahkan **hostname** tunnel tanpa `https://` ke `allowedDevOrigins` di `src/next.config.mjs`, kemudian restart `npm run dev`. Pengaturan ini tidak diperlukan pada Vercel.

## 3. Pasang webhook

Di terminal lain, dari direktori `src/`, muat variabel untuk perintah `curl` (Next.js membaca `.env.local` sendiri, tetapi shell tidak):

```bash
set -a
source .env.local
set +a
```

Lalu jalankan:

```bash
curl -sS -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook" \
  --data-urlencode "url=https://NAMA-TUNNEL.trycloudflare.com/api/telegram/webhook" \
  --data-urlencode "secret_token=${TELEGRAM_WEBHOOK_SECRET}" \
  --data-urlencode 'allowed_updates=["message"]'
```

Periksa statusnya dengan `curl -sS "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getWebhookInfo"`. Setiap kali URL tunnel berubah, ulangi `setWebhook`. Untuk kembali memakai `getUpdates`, hapus webhook melalui `deleteWebhook`.

## 4. Uji dua arah

1. Buka `http://localhost:3000/curhat`, setujui informasi layanan, pilih mode, isi nama panggilan, lalu pilih PIK-R yang terdaftar.
2. Klik **Mulai via Telegram**, lalu **Buka bot Telegram**. Tekan Start di Telegram. Bot memberi konfirmasi dan mengirim pemberitahuan ke grup PIK-R.
3. Kirim pesan dari chat pribadi bot. Pesan muncul sebagai pesan **dari bot** di grup PIK-R, dengan kode sesi dan alias, tanpa chat ID pengguna.
4. Dari akun pengurus yang ID-nya terdaftar, tekan **Reply** pada pesan bot di grup, lalu kirim jawaban. Jawaban masuk ke chat pribadi pengguna.
5. Uji pengguna kedua dan PIK-R kedua dengan grup serta route terpisah. Balas pesan masing-masing menggunakan Reply.
6. Pengguna mengetik `/end` untuk menutup sesi. Untuk sesi baru, ulangi alur website.

## Batas prototipe

- Pesan yang didukung adalah **teks**. Media, edit pesan, dan perintah selain `/start` serta `/end` belum ditangani.
- Browser hanya dipakai untuk membuat sesi dan memilih PIK-R; isi chat tidak disinkronkan ke halaman website maupun tabel `messages`.
- Endpoint pembuatan sesi belum memiliki autentikasi atau rate limit. Gunakan untuk uji terbatas; tambahkan pembatasan sebelum layanan dibuka ke publik.
- `update_id` mencegah pemrosesan ulang update yang sudah tercatat. Jika proses mati persis setelah mengirim pesan tetapi sebelum pencatatan selesai, retry masih dapat membuat pesan ganda.
- Jika grup menolak pesan bot atau database gagal di tengah rangkaian operasi, periksa log server dan buat sesi baru. Tahap berikutnya perlu transaksi/outbox dan pemulihan otomatis.
- Pengurus tidak melihat ID Telegram pengguna, tetapi bot dan database server tetap menyimpannya. Pengguna dapat mengungkap identitas sendiri melalui isi pesan.
