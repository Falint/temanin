'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { articles, categories, getFeaturedArticles } from '@/lib/data/education';
import styles from '@/components/education/education.module.css';

export default function EdukasiPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const featured = getFeaturedArticles()[0];

  const filteredArticles = useMemo(() => {
    let result = articles;

    // Filter by category
    if (activeCategory && activeCategory !== 'all') {
      result = result.filter((a) => a.category === activeCategory);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  const getCategoryLabel = (catId) => {
    const cat = categories.find((c) => c.id === catId);
    return cat ? cat.label : catId;
  };

  return (
    <div>
      {/* Page Header */}
      <header className={styles.pageHeader}>
        <div className={`container ${styles.pageHeaderInner}`}>
          <span className={styles.pageHeaderBadge}>📖 Knowledge Hub</span>
          <h1 className={styles.pageTitle}>Edukasi Mental Health</h1>
          <p className={styles.pageDesc}>
            Artikel, panduan, dan modul yang mudah dipahami — ditulis khusus untuk remaja.
          </p>
        </div>
      </header>

      <div className="container">
        {/* Search */}
        <div className={styles.searchSection}>
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Cari artikel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Cari artikel edukasi"
            />
          </div>
        </div>

        {/* Categories */}
        <div className={styles.categories}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.categoryChip} ${activeCategory === cat.id ? styles.categoryChipActive : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Featured article (only shown when no filters active) */}
        {!searchQuery && activeCategory === 'all' && featured && (
          <div className={styles.featured}>
            <Link href={`/edukasi/${featured.id}`} className={styles.featuredCard}>
              <div className={styles.featuredEmoji}>{featured.emoji}</div>
              <div>
                <span className={styles.featuredBadge}>⭐ Artikel Pilihan</span>
                <h2 className={styles.featuredTitle}>{featured.title}</h2>
                <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
                <span className={styles.featuredMeta}>⏱ {featured.readTime} · {getCategoryLabel(featured.category)}</span>
              </div>
            </Link>
          </div>
        )}

        {/* Article grid */}
        <div className={styles.articlesSection}>
          {filteredArticles.length > 0 ? (
            <div className={styles.articleGrid}>
              {filteredArticles.map((article) => (
                <Link key={article.id} href={`/edukasi/${article.id}`} className={styles.articleCard}>
                  <span className={styles.articleEmoji}>{article.emoji}</span>
                  <span className={styles.articleCategory}>{getCategoryLabel(article.category)}</span>
                  <h3 className={styles.articleTitle}>{article.title}</h3>
                  <p className={styles.articleExcerpt}>{article.excerpt}</p>
                  <span className={styles.articleMeta}>⏱ {article.readTime}</span>
                  <span className={styles.articleReadMore}>Baca artikel →</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>🔍</span>
              <h3 className={styles.emptyTitle}>Tidak ada artikel ditemukan</h3>
              <p className={styles.emptyDesc}>Coba kata kunci lain atau pilih kategori berbeda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
