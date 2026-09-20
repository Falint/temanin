import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles, categories, getArticleBySlug } from '@/lib/data/education';
import styles from '@/components/education/education.module.css';

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: 'Artikel Tidak Ditemukan | TEMANIN' };
  return { title: `${article.title} | TEMANIN`, description: article.excerpt };
}

export default async function ArticleDetailPage({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const category = categories.find((item) => item.id === article.category);

  return (
    <article className={styles.detailPage}>
      <header className={styles.detailHeader}>
        <div className={`container ${styles.detailHeaderInner}`}>
          <Link href="/edukasi" className={styles.detailBack}>← Kembali ke Edukasi</Link>
          <span className={styles.detailEmoji}>{article.emoji}</span>
          <span className={styles.articleCategory}>{category?.label || article.category}</span>
          <h1 className={styles.detailTitle}>{article.title}</h1>
          <p className={styles.detailLead}>{article.excerpt}</p>
          <span className={styles.featuredMeta}>⏱ Waktu baca {article.readTime}</span>
        </div>
      </header>

      <div className={`container ${styles.detailLayout}`}>
        <div className={styles.detailContent}>
          {article.content.map((section) => (
            <section key={section.heading} className={styles.detailSection}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.tips && <ul>{section.tips.map((tip) => <li key={tip}>{tip}</li>)}</ul>}
            </section>
          ))}

          <section className={styles.nextSteps}>
            <h2>Langkah Selanjutnya</h2>
            <ul>{article.nextSteps.map((step) => <li key={step}>{step}</li>)}</ul>
            <p>Kamu tidak harus menjalani semuanya sendiri. Konselor sebaya TEMANIN siap mendengarkan tanpa menghakimi.</p>
            <Link href="/curhat" className="btn btn-primary">Curhat Sekarang</Link>
          </section>
        </div>

        <aside className={styles.detailAside}>
          <strong>Butuh bantuan segera?</strong>
          <p>TEMANIN bukan layanan darurat. Jika kamu sedang tidak aman, hubungi 112 atau 119 ext 8.</p>
          <a href="tel:112" className="btn btn-secondary btn-sm">Hubungi 112</a>
        </aside>
      </div>
    </article>
  );
}
