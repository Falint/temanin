import Link from 'next/link';
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
          title="Pelajari Kesehatan Mentalmu"
          description="Artikel dan panduan yang mudah dipahami, ditulis khusus untuk remaja."
        />

        <div className={styles.eduGrid}>
          {previewArticles.map((article) => (
            <div key={article.id} className={styles.eduCard}>
              <span className={styles.eduEmoji}>{article.emoji}</span>
              <span className={styles.eduCategory}>{getCategoryLabel(article.category)}</span>
              <h3 className={styles.eduTitle}>{article.title}</h3>
              <p className={styles.eduExcerpt}>{article.excerpt}</p>
              <p className={styles.eduReadTime}>⏱ {article.readTime}</p>
            </div>
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
