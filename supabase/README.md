# Supabase setup untuk TEMANIN

1. Buat project Supabase sendiri.
2. Buka **SQL Editor**, tempel seluruh isi `schema.sql`, lalu jalankan sekali.
3. Buat akun staf melalui Supabase Auth.
4. Masukkan UUID akun tersebut ke tabel `counselors`, pilih role `peer_counselor`, `supervisor`, atau `admin`.
5. Isi `pik_r_partners` dan `shift_schedule` dengan data resmi.
6. Setelah project tersedia, pasang URL dan anon key sebagai environment variable Next.js. Simpan service role key hanya di server.

Skema mengaktifkan RLS. Pengguna publik hanya dapat melihat PIK-R aktif dan mengirim data awal. Pembuatan conversation, penugasan konselor, serta akses pesan pengguna harus melalui Route Handler atau Server Action di server menggunakan service role. Jangan mengekspos service role key ke browser.

Dashboard pada project saat ini masih memakai data demo. Hubungkan query Supabase setelah project dan akun staf selesai dibuat.
