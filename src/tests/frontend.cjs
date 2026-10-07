// Optional browser check: install Playwright separately, then run against npm run start.
// npm install --no-save --package-lock=false playwright && npx playwright install chromium
// node tests/frontend.cjs
const assert = require('node:assert/strict');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.CHROMIUM_EXECUTABLE_PATH } : {}),
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const base = process.env.BASE_URL || 'http://127.0.0.1:3000';
    const routes = ['/', '/curhat', '/curhat/profil?mode=anonim', '/curhat/screening', '/curhat/chat', '/curhat/konseling', '/edukasi', '/edukasi/mengenal-emosi', '/games', '/games/life', '/tentang', '/kontak', '/ketentuan', '/kebijakan-privasi', '/dashboard/admin', '/dashboard/konselor', '/dashboard/supervisor'];
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const route of routes) {
        const response = await page.goto(base + route);
        assert.equal(response.status(), 200, route);
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(100);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${route} overflows at ${width}px`);
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(base);
    await page.getByRole('button', { name: 'Buka menu' }).click();
    assert.equal(await page.getByRole('button', { name: 'Tutup menu' }).getAttribute('aria-expanded'), 'true');
    await page.keyboard.press('Escape');
    assert.equal(await page.getByRole('button', { name: 'Buka menu' }).getAttribute('aria-expanded'), 'false');
    await page.getByRole('button', { name: 'Buka menu' }).click();
    await page.getByRole('navigation', { name: 'Navigasi utama' }).getByRole('link', { name: 'Edukasi', exact: true }).click();
    await page.waitForURL('**/edukasi');
    await page.getByLabel('Cari artikel edukasi').fill('zzzz-no-results');
    await page.getByRole('heading', { name: 'Tidak ada artikel ditemukan' }).waitFor();

    await page.goto(base + '/curhat');
    const faq = page.getByRole('button', { name: 'Apakah layanan curhat TEMANIN berbayar?' });
    await faq.focus();
    await page.keyboard.press('Space');
    assert.equal(await faq.getAttribute('aria-expanded'), 'true');
    await page.locator('#consentCheckbox').check();
    await page.getByRole('link', { name: 'Anonim', exact: false }).click();
    await page.locator('#nickname').fill('Uji UI');
    await page.getByRole('button', { name: 'Pilih PIK-R' }).click();
    await page.waitForURL('**/curhat/wilayah?**');
    assert.equal(await page.evaluate(() => JSON.parse(sessionStorage.getItem('temanin_user_profile')).displayName), 'Uji UI');
    // Partner retrieval and sending through Telegram require real server configuration.

    await page.goto(base + '/games/life');
    await page.getByLabel('Nama panggilanmu').fill('Uji');
    await page.getByRole('button', { name: 'Mulai hari pertama' }).click();
    await page.getByRole('heading', { name: 'Apa yang kamu lakukan?' }).waitFor();
    await page.locator('button').filter({ has: page.locator('span', { hasText: /^A$/ }) }).click();
    await page.getByRole('button', { name: 'Lanjutkan cerita' }).waitFor();
    await page.reload();
    await page.getByRole('button', { name: 'Lanjutkan cerita' }).click();
    await page.getByRole('button', { name: 'Lanjutkan cerita' }).waitFor();

    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(base);
    assert.equal(await page.locator('h1').evaluate(element => getComputedStyle(element.parentElement).animationName), 'none');
    assert.deepEqual(errors, []);
    console.log('PASS: 17 routes × 5 widths; menu, FAQ keyboard, education search, Curhat profile, LifeGame save/resume, reduced motion.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
