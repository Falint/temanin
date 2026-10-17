import Link from 'next/link';
import ReadingTools from '@/components/education/ReadingTools';
import ArticleCover from '@/components/education/ArticleCover';
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
  const related = articles.filter(item => item.id !== slug).slice(0, 2);

  return (
    <article className={styles.detailPage}>
      <header className={styles.detailHeader}>
        <div className={`container ${styles.detailHeaderInner}`}>
          <Link href="/edukasi" className={styles.detailBack}>← Kembali ke Edukasi</Link>

          <span className={styles.articleCategory}>{category?.label || article.category}</span>
          <h1 className={styles.detailTitle}>{article.title}</h1>
          <p className={styles.detailLead}>{article.excerpt}</p>
          <span className={styles.featuredMeta}>{article.readTime} baca · Materi edukasi TEMANIN</span>
          <ReadingTools />
        </div>
      </header>

      <div className={`container ${styles.detailLayout}`}>
        <div id="article-body" className={styles.detailContent}>
          <div className={styles.detailSection} dangerouslySetInnerHTML={{ __html: article.intro }} />
          {article.content.map((section, index) => (
            <section id={`bagian-${index + 1}`} key={section.heading} className={styles.detailSection}>
              <h2>{section.heading}</h2>
              <div dangerouslySetInnerHTML={{ __html: section.html }} />
            </section>
          ))}


        </div>

        <aside className={styles.detailAside}>
          <details className={styles.contents} open><summary>Di bacaan ini</summary><nav aria-label="Daftar isi artikel"><ol>{article.content.map((section, index) => <li key={section.heading}><a href={`#bagian-${index + 1}`}>{section.heading}</a></li>)}</ol></nav></details>
          <strong>Butuh bantuan segera?</strong>
          <p>TEMANIN bukan layanan darurat. Jika kamu sedang tidak aman, hubungi 112 atau 119 ext 8.</p>
          <a href="tel:112" className="btn btn-secondary btn-sm">Hubungi 112</a>
        </aside>
      </div>
      <section className={`container ${styles.related}`} aria-label="Bacaan berikutnya">
        <span className={styles.articleCategory}>LANJUTKAN RASA PENASARANMU</span>
        <h2>Masih ada ruang untuk belajar.</h2>
        <div className={styles.relatedGrid}>{related.map(item => <Link href={`/edukasi/${item.id}`} className={styles.articleCard} key={item.id}><ArticleCover slug={item.id} /><div className={styles.articleBody}><h3 className={styles.articleTitle}>{item.title}</h3><span className={styles.articleFooter}>{item.readTime} baca <strong>Baca selanjutnya ↗</strong></span></div></Link>)}</div>
        <Link href="/edukasi" className="btn btn-outline">Kembali ke semua bacaan</Link>
      </section>
    </article>
  );
}
