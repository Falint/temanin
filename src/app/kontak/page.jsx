import styles from '@/components/info/info.module.css';
import { EXTERNAL_LINKS } from '@/lib/constants';

export const metadata = { title: 'Kontak | TEMANIN', description: 'Hubungi dan ikuti kanal resmi TEMANIN dan GenRe Kota Depok.' };

export default function KontakPage() {
  return <div className={styles.page}>
    <header className={styles.hero}><div className={`container ${styles.heroInner}`}><span className={styles.badge}>Kontak & Media Sosial</span><h1 className={styles.title}>Mari Terhubung</h1><p className={styles.lead}>Hubungi kanal berikut untuk pertanyaan umum, informasi program, atau kolaborasi. Untuk curhat, gunakan alur Curhat agar konteksmu tertangani dengan benar.</p></div></header>
    <main className={`container ${styles.content}`}>
      <section className={styles.section}><h2>Kanal resmi</h2><div className={styles.contactGrid}><a className={styles.contactCard} href={EXTERNAL_LINKS.EMAIL}><strong>✉️ Email</strong><span>halo@genredepok.id</span></a><a className={styles.contactCard} href={EXTERNAL_LINKS.INSTAGRAM} target="_blank" rel="noopener noreferrer"><strong>📷 Instagram</strong><span>@genrekotadepok</span></a></div></section>
      <section className={styles.section}><h2>Untuk keadaan darurat</h2><p>Pesan melalui email atau media sosial tidak dipantau sebagai layanan darurat. Jika kamu atau orang lain sedang tidak aman, segera hubungi:</p><div className={styles.contactGrid}><a className={styles.contactCard} href="tel:112"><strong>Darurat Nasional</strong><span>112</span></a><a className={styles.contactCard} href="tel:119,8"><strong>Kemenkes SEJIWA</strong><span>119 ext 8</span></a></div></section>
    </main>
  </div>;
}
