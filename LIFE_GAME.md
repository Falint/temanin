# TEMANIN Life — Tiga Tahun SMA

Game pilihan edukatif di `/games/life`, diakses dari `/games` atau beranda.
Target satu permainan sekitar 15 menit, bukan batas waktu paksa. Durasi perlu dikalibrasi
lagi melalui playtest pembaca; satu jalur berisi sekitar 2.300–2.400 kata sebelum epilog.

## Cakupan

| Bab | Kejadian |
| --- | --- |
| Kelas 10 — Menemukan tempat | Pergaulan pertama, tugas kelompok, nilai ulangan, menentukan hubungan |
| Kelas 11 — Belajar menjaga | Privasi chat, percakapan tersebar, permintaan contekan, memperbaiki hubungan |
| Kelas 12 — Memilih arah | Rencana setelah SMA, tryout, persiapan ujian, kelulusan |

Ada 12 kejadian, masing-masing tiga pilihan. Cerita melewati titik waktu yang sama,
tetapi dialog lanjutan dan hasil hubungan mengikuti keputusan sebelumnya. Nama pemain
bebas; karakter perempuan bertemu Raka, karakter laki-laki bertemu Nara. Tio adalah
sahabat dan Maya teman belajar. Jalur pacaran, berteman, belum yakin, dan mengambil
jarak sama-sama dapat dilanjutkan sampai lulus. Tidak ada game over karena satu pilihan.

## Struktur

- `src/lib/game/content.mjs`: teks kejadian, pilihan, konsekuensi, efek, dan kondisi dialog.
- `src/lib/game/constants.mjs`: bab, statistik, serta versi dan kunci simpanan.
- `src/lib/game/engine.mjs`: reducer murni, pembatasan statistik, resolusi dialog dan epilog.
- `src/lib/game/save.mjs`: baca/tulis localStorage dan validasi melalui replay riwayat.
- `src/components/game/`: layar permainan, panel kondisi, epilog, adegan SVG dan CSS.
- `src/app/games/life/page.jsx`: route dan metadata game.
- `src/tests/life.test.mjs`: transisi, percabangan, ending, dan ketahanan simpanan.

## Aturan

Empat indikator 0–100: akademik, energi, suasana hati, dan percaya diri. Kepercayaan
Tio, Maya, dan teman dekat dihitung terpisah. Flag merekam keputusan spesifik.
UI tidak mengatur rumus konsekuensi. Konten deklaratif tidak memanggil jaringan.
Epilog menggabungkan hasil akademik, pertemanan, hubungan, kondisi energi,
arah setelah sekolah, serta tiga keputusan penting terakhir.

Pilihan hanya bisa diterapkan saat fase `story`, satu kali. Fase `feedback` menampilkan
akibat sebelum melanjutkan ke kejadian berikutnya. Setelah kejadian terakhir,
transisi menuju `ending`. Statistik nol tidak membuat pemain terkunci.

## Simpanan dan privasi

Tidak ada API game, database, Supabase, login, atau model AI yang dipanggil game.
Save key: `temanin.life.v1`. Pilihan dan fase disimpan setiap perubahan state.
Saat dibuka kembali, statistik/flag dibangun ulang dari riwayat pilihan yang valid.
Simpanan rusak atau versi tidak didukung tidak membuat halaman crash. Ketika browser
menolak penyimpanan, game tetap berjalan dan memberi tahu bahwa progres belum tersimpan.
Memulai ulang membutuhkan konfirmasi; membatalkannya mempertahankan simpanan.

Progres hanya tersedia pada browser/perangkat dan origin yang sama. Menghapus data
browser menghapus progres. Fitur TEMANIN lain mempertahankan integrasi yang sudah ada.

## Visual dan aksesibilitas

Empat latar SVG: kelas, kantin, kamar, halaman sekolah. Karakter dan ekspresi digambar
melalui kode tanpa aset raster, video, atau engine eksternal. Layout mendukung ponsel,
kontrol keyboard, label form, focus pada judul setelah transisi, dan reduced motion.
Font situs tetap menggunakan konfigurasi Next.js yang sudah ada.

## Menjalankan

Dari direktori `src`:

```sh
npm ci
npm run dev
npm run test:life
npm run lint
npm run build
```

Build membutuhkan akses Google Fonts karena konfigurasi font situs yang sudah ada.
Katalog game lama, data placeholder, CSS khusus kartu lama, dan referensinya sudah
beralih ke TEMANIN Life. Tidak ada perubahan skema atau data Supabase.
