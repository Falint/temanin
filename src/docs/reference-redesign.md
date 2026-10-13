# Revisi visual mengikuti referensi Future First

Referensi pengguna: https://the-future-first.vercel.app/
Basis: `cb4c7c7808bb58fb50a1adb0771c9f8f4e0a532c`, branch `feat/FrontEnd`.

## Hasil

- Hero foto penuh, judul dua baris berukuran besar, overlay untuk keterbacaan, tiga CTA dengan tujuan nyata.
- Navbar navy dengan ikon garis, logo resmi, navigasi aktif, dan menu mobile.
- Blok pengenalan, pengingat, empat kartu aktivitas, sorotan LifeGame, dan edukasi dengan ikon SVG ringan.
- Panel jelajah mengambang dan accordion pilar memakai elemen native `details`; tidak mengklaim sebagai chatbot atau konselor.
- Header edukasi, Curhat, Games, dan informasi mengikuti kontras/typography baru. Warna, logo, font lokal Raleway ExtraBold dan Inter tetap TEMANIN.
- Stylesheet landing dan navbar ditulis ulang untuk mengganti aturan lama, bukan menumpuk tema baru.

## Aset

Hero: `src/public/images/temanin-together.webp`, 1672 × 941, 170894 bytes. Dibuat dengan built-in ImageGen, kemudian dioptimalkan ke WebP. Gambar adalah ilustrasi kampanye dengan orang fiktif, bukan dokumentasi kegiatan atau staf layanan; caption UI menjelaskannya. Di mobile, ukuran sumber gambar memperhitungkan crop tinggi agar tetap tajam.

Prompt final ImageGen:

> Use case: photorealistic-natural. Asset type: wide photographic website hero background for TEMANIN, a youth peer support and education platform in Depok Indonesia. Create a premium editorial lifestyle photograph, wide landscape 16:9. Scene: lush Indonesian school/community campus courtyard, dappled tropical trees, clean modern school facade, soft morning sunlight. A friendly diverse group of five Indonesian young adult students age 18-21 walking and chatting naturally, warm candid smiles, some wearing light blue shirts or navy overshirts, one woman in a pale blue hijab; tasteful casual student clothes and backpacks, authentic unposed interaction. Place the people predominantly on the right 60 percent of frame, show upper body to knees, leave left 40 percent as softly lit pale cream empty architecture/foliage negative space for large HTML typography. Natural realistic faces and hands, photographic detail, calm hope and belonging. Brand palette navy, pale sky blue and warm cream. No text, no logos, no watermark, no interface. This is illustrative fictional campaign imagery, not documentary event evidence.

Pratinjau browser: `previews/reference-1440.webp` dan `previews/reference-390.webp`.

## Validasi

- Production build dan lint lulus; 7/7 tes LifeGame lulus.
- Browser regression: 26 rute × 7 viewport (320, 375, 390, 768, 1024, 1280, 1440), tanpa overflow horizontal; menu, panel jelajah, FAQ, profil, pencarian, permainan hingga epilog, resume, dialog keyboard, dan reduced motion lulus.
- axe-core: nol violations pada aturan WCAG 2 A/AA, 2.1 AA, 2.2 AA yang diuji di beranda, Curhat, edukasi, intro LifeGame, dan dashboard admin pada 390 dan 1440 px. Pemeriksaan beranda diulang pada build final setelah penyempurnaan sumber gambar.
- Screenshot beranda desktop/mobile diperiksa langsung. Sumber foto berhasil dimuat dengan naturalWidth >= 1000 di kedua viewport.
- Tidak ada perubahan API, backend, schema, data, engine game, dependency, atau lockfile.
- Integrasi Telegram/Supabase tetap belum diuji live karena kredensial server tidak tersedia. Status demo yang sudah ada tetap seperti sebelumnya. Tidak ada klaim skor Lighthouse atau sertifikasi WCAG menyeluruh.
