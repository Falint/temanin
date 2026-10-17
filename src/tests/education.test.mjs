// Run after npm run build: node --test tests/education.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../lib/data/education.js', import.meta.url), 'utf8');
const { articles } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const rendered = path => readFile(new URL(`../.next/server/app/${path}.html`, import.meta.url), 'utf8');

test('education links reach exactly the four supplied articles', async () => {
  const index = await rendered('edukasi');
  const links = [...index.matchAll(/href="(\/edukasi\/[^"?#]+)"/g)].map(match => match[1]);
  assert.equal(articles.length, 4);
  assert.equal(new Set(articles.map(article => article.id)).size, 4);
  assert.deepEqual([...new Set(links)].sort(), articles.map(article => `/edukasi/${article.id}`).sort());
});

test('all article sections, tables and sources survive rendering; contents links resolve', async () => {
  for (const article of articles) {
    const html = await rendered(`edukasi/${article.id}`);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, article.id);
    assert.ok(html.includes(article.intro), `${article.id}: intro`);
    article.content.forEach((section, index) => {
      assert.ok(html.includes(section.html), `${article.id}: ${section.heading}`);
      assert.ok(html.includes(`id="bagian-${index + 1}"`));
      assert.ok(html.includes(`href="#bagian-${index + 1}"`));
    });
    assert.ok(html.includes('Progres membaca artikel'));
    assert.ok(html.includes('Salin tautan'));
    assert.ok(!html.includes('href="/edukasi/mengenal-emosi"'));
  }
});
