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
    const routes = ['/', '/curhat', '/curhat/wilayah', '/curhat/profil?mode=anonim', '/curhat/screening', '/curhat/chat', '/curhat/konseling', '/edukasi', '/edukasi/mengenal-emosi', '/games', '/games/life', '/tentang', '/kontak', '/ketentuan', '/kebijakan-privasi', '/dashboard/admin', '/dashboard/konselor', '/dashboard/supervisor'];
    await page.goto(base + '/edukasi');
    const articleRoutes = await page.locator('a[href^="/edukasi/"]').evaluateAll(links => [...new Set(links.map(link => new URL(link.href).pathname))]);
    routes.push(...articleRoutes.filter(route => !routes.includes(route)));
    for (const width of [320, 375, 390, 768, 1024, 1280, 1440]) {
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
    const guide = page.locator('details').filter({ has: page.locator('summary[aria-label="Buka panduan jelajah TEMANIN"]') });
    await guide.locator('summary').click();
    assert.equal(await guide.locator('a').count(), 3);
    assert.equal(await guide.getAttribute('open'), '');
    await guide.locator('summary').click();
    assert.equal(await guide.getAttribute('open'), null);
    await page.getByRole('button', { name: 'Buka menu' }).click();
    assert.equal(await page.getByRole('button', { name: 'Tutup menu' }).getAttribute('aria-expanded'), 'true');
    await page.keyboard.press('Escape');
    assert.equal(await page.getByRole('button', { name: 'Buka menu' }).getAttribute('aria-expanded'), 'false');
    await page.getByRole('button', { name: 'Buka menu' }).click();
    await page.getByRole('navigation', { name: 'Navigasi utama' }).getByRole('link', { name: 'Edukasi', exact: true }).click();
    await page.waitForURL('**/edukasi');
    await page.getByLabel('Cari artikel edukasi').fill('zzzz-no-results');
    await page.getByRole('heading', { name: 'Tidak ada artikel ditemukan' }).waitFor();

    await page.getByRole('button', { name: 'Hapus filter' }).click();
    assert.ok(await page.locator('a[href^="/edukasi/"]').count() > 0);

    await page.goto(base + '/curhat');
    const faq = page.getByRole('button', { name: 'Apakah layanan curhat TEMANIN berbayar?' });
    await faq.focus();
    await page.keyboard.press('Space');
    assert.equal(await faq.getAttribute('aria-expanded'), 'true');
    await page.locator('#consentCheckbox').check();
    await page.getByRole('link', { name: 'Anonim', exact: false }).click();
    await page.getByRole('button', { name: 'Pilih PIK-R' }).click();
    await page.locator('#profile-error').waitFor();
    assert.equal(await page.locator('#nickname').getAttribute('aria-invalid'), 'true');
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

    // Complete the saved run; reducer tests separately cover every choice/outcome.
    for (let decision = 0; decision < 12; decision++) {
      const advance = page.getByRole('button', { name: /Lanjutkan cerita|Masuk kelas|Buka epilog kelulusan/ });
      await advance.click();
      if (decision < 11) {
        await page.getByRole('heading', { name: 'Apa yang kamu lakukan?' }).waitFor();
        await page.locator('button').filter({ has: page.locator('span', { hasText: /^A$/ }) }).click();
      }
    }
    await page.getByRole('heading', { name: 'Tiga tahun. Banyak versi dirimu.' }).waitFor();
    await page.getByRole('button', { name: 'Coba perjalanan lain' }).click();
    await page.getByRole('button', { name: 'Batal', exact: true }).click();
    await page.getByRole('button', { name: 'Lihat epilog' }).click();
    await page.getByRole('heading', { name: 'Tiga tahun. Banyak versi dirimu.' }).waitFor();

    await page.goto(base + '/curhat/chat');
    const emergency = page.getByRole('button', { name: 'Bantuan Krisis Darurat', exact: true });
    await emergency.click();
    await page.getByRole('dialog').waitFor();
    for (let index = 0; index < 10; index++) {
      await page.keyboard.press('Tab');
      assert.equal(await page.evaluate(() => !!document.querySelector('dialog:modal') && (document.activeElement === document.body || document.activeElement.closest('dialog') !== null)), true);
    }
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('dialog[open]').count(), 0);
    assert.equal(await emergency.evaluate(element => element === document.activeElement), true);

    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(base);
    assert.equal(await page.locator('h1').evaluate(element => getComputedStyle(element.parentElement).animationName), 'none');
    assert.deepEqual(errors, []);
    console.log(`PASS: ${routes.length} routes × 7 widths; menu, FAQ keyboard, search/reset, profile validation, LifeGame complete/resume/restart, dialog keyboard, reduced motion.`);
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
