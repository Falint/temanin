'use client';

import { useState } from 'react';
import Link from 'next/link';
import { articles, categories } from '@/lib/data/education';
import ArticleCover from '@/components/education/ArticleCover';
import Icon from '@/components/shared/Icon';
import styles from '@/components/education/education.module.css';

export default function EdukasiPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const query = searchQuery.trim().toLowerCase();
  const filteredArticles = articles.filter(article =>
    (activeCategory === 'all' || article.category === activeCategory) &&
    (!query || `${article.title} ${article.excerpt}`.toLowerCase().includes(query))
  );
  const reset = () => { setSearchQuery(''); setActiveCategory('all'); };

  return <div>
    <header className={styles.pageHeader}>
      <div className={`container ${styles.pageHeaderInner}`}>
        <div><span className={styles.pageHeaderBadge}><Icon name="book" size={18} /> RUANG BACA</span>
          <h1 className={styles.pageTitle}>Pahami diri.<br /><span>Pelan-pelan juga boleh.</span></h1>
          <p className={styles.pageDesc}>Tentang pikiran yang ramai, teman yang butuh didengar, dan cara merawat diri. Mulai dari yang paling dekat denganmu.</p>
        </div>
        <div className={styles.headerNote}><span aria-hidden="true">✳</span><strong>Nggak harus<br />paham semuanya<br /><em>hari ini.</em></strong><small>SATU BACAAN, SATU LANGKAH KECIL.</small></div>
      </div>
    </header>
    <div className="container">
      <div className={styles.searchSection}>
        <label className={styles.searchWrapper}><span className={styles.searchIcon} aria-hidden="true">⌕</span><input type="search" className={styles.searchInput} placeholder="Lagi ingin memahami apa?" value={searchQuery} onChange={event => setSearchQuery(event.target.value)} aria-label="Cari artikel edukasi" /></label>
        <span className={styles.libraryCount}>4 bacaan · Untuk kamu dan orang terdekat</span>
      </div>
      <div className={styles.categories} aria-label="Filter kategori">
        {categories.map(category => <button key={category.id} className={`${styles.categoryChip} ${activeCategory === category.id ? styles.categoryChipActive : ''}`} aria-pressed={activeCategory === category.id} onClick={() => setActiveCategory(category.id)}>{category.label}</button>)}
      </div>
      <div className={styles.resultsBar}><p role="status">{filteredArticles.length} bacaan untuk dijelajahi</p>{(searchQuery || activeCategory !== 'all') && <button className="btn btn-ghost btn-sm" onClick={reset}>Hapus filter ×</button>}</div>
      <section className={styles.articlesSection} aria-label="Artikel edukasi">
        {filteredArticles.length ? <div className={styles.articleGrid}>
          {filteredArticles.map(article => <Link key={article.id} href={`/edukasi/${article.id}`} className={styles.articleCard}>
            <ArticleCover slug={article.id} />
            <div className={styles.articleBody}>
              <span className={styles.articleCategory}>{categories.find(category => category.id === article.category)?.label}</span>
              <h2 className={styles.articleTitle}>{article.title}</h2>
              <p className={styles.articleExcerpt}>{article.excerpt}</p>
              <div className={styles.articleFooter}><span>{article.readTime} baca</span><strong>Buka bacaan <span aria-hidden="true">↗</span></strong></div>
            </div>
          </Link>)}
        </div> : <div className={styles.emptyState}><Icon name="book" size={44} /><h2>Tidak ada artikel ditemukan</h2><p>Coba kata seperti “stres”, “teman”, atau pilih kategori lain.</p><button className="btn btn-secondary" onClick={reset}>Lihat semua bacaan</button></div>}
      </section>
      <aside className={styles.readingNote}><Icon name="chat" size={26} /><div><strong>Selesai baca, masih ingin cerita?</strong><p>Kamu bisa lanjut ngobrol dengan konselor sebaya.</p></div><Link href="/curhat" className="btn btn-outline btn-sm">Temukan teman cerita ↗</Link></aside>
    </div>
  </div>;
}
