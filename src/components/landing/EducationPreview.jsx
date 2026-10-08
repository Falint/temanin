import Link from 'next/link';
import Icon from '@/components/shared/Icon';
import SectionHeader from '@/components/shared/SectionHeader';
import { articles, categories } from '@/lib/data/education';
import styles from './landing.module.css';

export default function EducationPreview() {
  // Show first 3 articles as preview
  const previewArticles = articles.slice(0, 3);

  const getCategoryLabel = (catId) => {
    const cat = categories.find((c) => c.id === catId);
    return cat ? cat.label : catId;
  };

  return (
    <section className={styles.eduSection}>
      <div className="container">
        <SectionHeader
          badge="Edukasi"
          badgeVariant="primary"
          title="KENALI DIRI. BUKA PERSPEKTIF."
          description="Artikel dan panduan yang mudah dipahami, ditulis khusus untuk remaja."
        />

        <div className={styles.eduGrid}>
          {previewArticles.map((article) => (
            <Link key={article.id} href={`/edukasi/${article.id}`} className={`${styles.eduCard} soft-card`}>
              <span className={styles.eduEmoji}><Icon name="book" size={50} /></span>
              <span className={styles.eduCategory}>{getCategoryLabel(article.category)}</span>
              <h3 className={styles.eduTitle}>{article.title}</h3>
              <p className={styles.eduExcerpt}>{article.excerpt}</p>
              <p className={styles.eduReadTime}>{article.readTime} baca</p>
              <span className={styles.articleAction}>Baca artikel ↗</span>
            </Link>
          ))}
        </div>

        <div className={styles.eduCta}>
          <Link href="/edukasi" className="btn btn-outline">
            Lihat Semua Artikel →
          </Link>
        </div>
      </div>
    </section>
  );
}
