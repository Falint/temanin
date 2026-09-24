# Deploy TEMANIN ke Vercel dan kelola PIK-R Telegram

## Deploy dari GitHub

1. Pastikan perubahan di branch `feat/chatBot` sudah ada di GitHub. Di Vercel pilih **Add New → Project → Import** repo `Falint/temanin`.
2. Pilih **Framework Preset: Next.js** dan **Root Directory: `src`**. Biarkan Build Command `next build` dan Output Directory default; jangan pilih static export.
3. Di **Environment Variables**, masukkan lima nilai yang sama seperti `src/.env.local`: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_BOT_USERNAME`, `TELEGRAM_WEBHOOK_SECRET`. Pasang di lingkungan **Production**. Untuk menguji deployment branch Preview, pasang juga di **Preview**. Simpan service role dan token bot sebagai secret server, tanpa awalan `NEXT_PUBLIC_`.
4. Tentukan branch produksi di **Project Settings → Environments → Production → Branch**. Untuk menguji branch ini langsung, pilih `feat/chatBot`; bila proyek sudah memakai `main`, gabungkan branch setelah review dan gunakan `main`. Deploy dan catat domain produksi yang stabil (`https://NAMA-PROJECT.vercel.app` atau domain milikmu).
5. Dari terminal di folder `temanin/src`, gunakan token dan secret lokal untuk mendaftarkan **satu** webhook bot ke domain produksi:

   ```bash
   set -a
   source .env.local
   set +a
   curl -sS -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook" \
     --data-urlencode "url=https://NAMA-PROJECT.vercel.app/api/telegram/webhook" \
     --data-urlencode "secret_token=${TELEGRAM_WEBHOOK_SECRET}" \
     --data-urlencode 'allowed_updates=["message"]'
   curl -sS "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getWebhookInfo"
   ```

   Ganti `NAMA-PROJECT` dengan domain Vercel yang benar. Hasil `getWebhookInfo.result.url` harus menunjukkan domain itu. Hanya satu webhook aktif per bot; setelah dipindahkan ke Vercel, tunnel lokal tidak menerima pesan bot. Bila secret berubah, perbarui Vercel dan webhook dengan nilai yang sama.

6. Uji dari website Vercel: buat sesi, tekan Start pada bot, kirim pesan pribadi, lalu Reply dari akun staf di grup. Periksa **Vercel → Project → Logs** jika webhook gagal.

## Tambah satu PIK-R

1. Buat grup Telegram PIK-R, masukkan bot dan akun staf. Catat `message.chat.id` grup (biasanya negatif) dan `message.from.id` setiap staf. Cara mengambilnya dijelaskan di `TELEGRAM_PROTOTYPE.md`. ID grup dan ID akun harus angka asli, bukan username atau nama grup.
2. Di **Supabase → SQL Editor**, jalankan SQL berikut dengan slug, nama, kecamatan, ID grup, dan ID staf yang baru. Jalankan bagian staf lagi untuk setiap staf tambahan:

   ```sql
   insert into public.pik_r_partners
     (slug, name, district, city, description, chat_enabled, is_active)
   values
     ('pikr-baru', 'PIK-R Baru', 'beji', 'Depok', 'Layanan curhat PIK-R Baru', true, true)
   on conflict (slug) do update set
     name = excluded.name,
     district = excluded.district,
     city = excluded.city,
     description = excluded.description,
     chat_enabled = true,
     is_active = true;

   insert into public.telegram_pikr_routes (pikr_id, pikr_chat_id)
   select id, -1001234567890 from public.pik_r_partners where slug = 'pikr-baru'
   on conflict (pikr_id) do update set pikr_chat_id = excluded.pikr_chat_id;

   insert into public.telegram_pikr_staff (pikr_id, telegram_user_id)
   select id, 123456789 from public.pik_r_partners where slug = 'pikr-baru'
   on conflict (pikr_id, telegram_user_id) do nothing;
   ```

3. Buka ulang `/curhat/wilayah`: mitra aktif yang punya route grup muncul langsung dari Supabase. Tidak perlu mengubah source, deploy ulang, atau membuat bot baru. Kecamatan harus memakai slug di `src/lib/data/regions.js`, misalnya `beji`, `cimanggis`, `sukmajaya`, atau `pancoran-mas`. Jika mitra lama memiliki `district = 'Depok'`, ubah ke slug kecamatan agar filter wilayah menampilkannya:

   ```sql
   update public.pik_r_partners set district = 'beji' where slug = 'testing';
   ```

4. Untuk menonaktifkan mitra tanpa menghapus riwayat, ubah `is_active = false`. Untuk mencabut izin staf, hapus baris miliknya di `telegram_pikr_staff`. Pengurus hanya dapat membalas dengan fitur **Reply** pada pesan bot di grup yang sesuai.

## Batas saat ini

Endpoint pembuatan sesi belum memiliki autentikasi atau rate limit; deploy ini untuk pengujian terbatas, bukan peluncuran layanan curhat publik. Pesan teks Telegram belum disalin ke tabel `messages`, dan dashboard konselor masih memakai data demo. Hindari mengirim token atau service role key ke chat, Git, maupun variabel `NEXT_PUBLIC_`.
