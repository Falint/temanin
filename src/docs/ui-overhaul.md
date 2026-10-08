# TEMANIN UI/UX overhaul — 8 Oktober 2026

Branch: `feat/FrontEnd`. Basis: `1873a32acf103a805e5e8e43919516080d0d320a`.

## Audit dan batas fitur

- Next.js 16.2.10 App Router, React 19, CSS Modules; tanpa Tailwind atau library UI tambahan.
- Branding yang sudah ada dipertahankan: logo PNG, font lokal Raleway ExtraBold dan Inter, palet `#334EAC`, `#081F5C`, `#7096D1`, `#BAD6EB`, `#D0E3FF`, `#FFF9F0`, `#F7F2EB`. Aset Drive tidak diunduh ulang.
- Curhat aktif: persetujuan → pilihan mode → profil di sessionStorage → mitra dari Supabase → POST `/api/telegram/session` → bot Telegram. Screening bukan langkah wajib pada alur aktif.
- `/curhat/chat`, `/curhat/screening`, penjadwalan `/curhat/konseling`, dan ketiga dashboard adalah UI demo. Autentikasi dashboard belum diimplementasikan pada basis repo; redesign tidak membuat klaim bahwa data demo merupakan layanan aktif.
- LifeGame: reducer, cerita, 12 keputusan, 3 bab, skor, konsekuensi, epilog, dan validasi penyimpanan berada di `lib/game`; semuanya dipertahankan.
- Edukasi: sembilan artikel statis, pencarian, kategori, halaman dinamis berdasarkan slug; data artikel tetap.

## Rute yang ditinjau dan diperbarui

| Area | Rute | Perubahan |
| --- | --- | --- |
| Beranda | `/` | Hero editorial, navigasi ke aktivitas, kartu tujuan, sorotan Life, urutan konten |
| Curhat | `/curhat`, `/curhat/profil`, `/curhat/wilayah` | Langkah nyata, validasi aksesibel, feedback Telegram, penanganan layanan gagal, penjelasan data |
| Alur demo lama | `/curhat/screening`, `/curhat/chat`, `/curhat/konseling` | Tampilan selaras, label simulasi, reduced motion, dialog modal native |
| Edukasi | `/edukasi`, `/edukasi/[slug]` (9 artikel) | Tata baca editorial, jumlah hasil, reset filter, daftar isi artikel |
| Games | `/games`, `/games/life` | Sampul buku cerita, pilihan terbaca, panel kondisi, epilog |
| Informasi | `/tentang`, `/kontak`, `/ketentuan`, `/kebijakan-privasi` | Tipografi, lebar baca, kartu kontak, satu landmark main, penjelasan penyimpanan sesuai kode |
| Dashboard demo | `/dashboard/admin`, `/dashboard/konselor`, `/dashboard/supervisor` | Navigasi aktif, statistik, tabel dengan scroll keyboard, penanda data contoh |
| Sistem | loading, error, not-found | Visual selaras, jalur pemulihan, tanpa logging error klien tambahan |

## Implementasi

Memakai komponen dan CSS Modules yang ada, dengan satu komponen kecil `CurhatSteps` untuk tiga halaman alur aktif. Token permukaan, batas, radius, dan interaksi disatukan pada globals. Tidak ada dependency produk baru. Homepage sekarang dapat diprerender statis. Font dan ilustrasi game tetap lokal. Animasi masuk yang menurunkan kontras judul dihapus; preferensi reduced motion tetap dihormati.

Profil tidak lagi diarahkan ke langkah berikutnya jika sessionStorage gagal: pengguna mendapat pesan pemulihan, karena tombol Telegram memang memerlukan profil tersebut. Payload API, consent checkbox, mode identity, query mitra, dan pemetaan Telegram tetap.

Kegagalan membaca mitra menampilkan keadaan layanan tidak tersedia, tanpa data pengganti. Badge mitra menyatakan bot terhubung, bukan menjanjikan konselor sedang online. Nama samaran tidak diklaim sebagai anonimitas absolut.

## Validasi

Hasil dan batas pemeriksaan final dicatat pada `frontend-validation.md`. `tests/frontend.cjs` memeriksa seluruh artikel, tujuh viewport, pencarian, persetujuan/profil, permainan sampai tamat, penyimpanan/resume, dialog keyboard, dan reduced motion. `tests/life.test.mjs` tetap menjadi regresi semua pilihan dan state reducer.

## Batas yang perlu diketahui

- Kredensial server Supabase/Telegram tidak tersedia di lingkungan pengujian. Pengiriman bot, balasan pengurus, data mitra nyata, dan operasi database tidak diuji end-to-end. Kode API dan integrasi tidak berubah.
- Dashboard tetap demo dan belum memiliki autentikasi. Tidak ada akses data layanan nyata yang ditambahkan.
- Status operasional kanal sosial, email, dan nomor bantuan yang sudah ada tidak diverifikasi ulang dalam pekerjaan UI ini.
- Tidak ada pengukuran Lighthouse/Core Web Vitals lapangan atau audit aksesibilitas manual menyeluruh. Tes otomatis tidak membuktikan kepatuhan WCAG penuh.
