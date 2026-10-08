# Validasi frontend — 8 Oktober 2026

Basis branch `feat/FrontEnd`: `1873a32acf103a805e5e8e43919516080d0d320a`.

## Hasil final

| Pemeriksaan | Hasil |
| --- | --- |
| `npm ci --no-audit --no-fund` | Berhasil, lockfile tidak berubah |
| `npm run build` | Lulus, 29 halaman dihasilkan oleh Next.js; homepage statis |
| `npm run lint` | Lulus |
| `npm run test:life` | 7/7 lulus, termasuk setiap pilihan, replay/save, state invalid, dan konsekuensi |
| `node tests/frontend.cjs` | Lulus: 26 rute × 7 viewport, tanpa overflow horizontal |
| Viewport | 320, 375, 390, 768, 1024, 1280, 1440 px |
| Interaksi browser | Menu mobile + Escape, FAQ keyboard, pencarian/reset, consent/profil/validasi, LifeGame hingga epilog, save/resume, batal restart, dialog modal + pengembalian fokus, reduced motion |
| Error browser | Tidak ada `pageerror` selama suite |
| axe-core | Tidak ada violation WCAG 2 A/AA, 2.1 AA, 2.2 AA pada `/`, `/curhat`, `/edukasi`, `/games/life`, `/dashboard/admin` di 390 dan 1440 px setelah perbaikan kontras |
| Visual manual | Screenshot beranda, Curhat, edukasi, dan intro LifeGame diperiksa pada mobile/desktop; screenshot dashboard juga diambil |
| `git diff --check` | Lulus |
| Preservation | `app/api`, `lib/telegram`, `lib/game`, `lib/data`, package.json, lockfile, dan schema Supabase tidak berubah |

Browser menggunakan Chromium sementara di luar repo karena unduhan Playwright standar tidak tersedia. Tidak ada binary, dependency browser, kredensial, atau screenshot sementara yang dimasukkan ke commit. Screenshot pada lingkungan ini tidak mempunyai font emoji sistem lengkap; font produk Raleway/Inter tetap dimuat dari repo.

Untuk mengulang:

```sh
npm ci
npm run build
npm run lint
npm run test:life
npm run start -- --hostname 127.0.0.1
# Di terminal lain, setelah Playwright/browser tersedia:
node tests/frontend.cjs
```

`BASE_URL` dan `CHROMIUM_EXECUTABLE_PATH` dapat dipakai oleh test runner untuk server/binary alternatif.

## Batas verifikasi

- Supabase dan Telegram tidak diuji langsung: kredensial server tidak tersedia. `/curhat/wilayah` diuji pada keadaan layanan tidak tersedia, bukan dengan mitra palsu. Pengiriman API, webhook, dan balasan konselor tidak diklaim lulus.
- Dashboard, chat web, dan penjadwalan tetap demo sebagaimana repo awal. Tidak ada autentikasi dashboard baru.
- Repo JavaScript ini tidak menyediakan skrip typecheck terpisah. Tahap pemeriksaan Next.js saat build lulus; ini bukan audit TypeScript tambahan.
- Tidak menjalankan Lighthouse atau mengukur Core Web Vitals lapangan. Tidak ada klaim skor performa.
- axe adalah pemeriksaan otomatis pada halaman yang disebutkan, bukan sertifikasi WCAG seluruh produk.
