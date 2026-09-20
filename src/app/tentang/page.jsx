import Link from 'next/link';
import styles from '@/components/info/info.module.css';

export const metadata = { title: 'Tentang Kami | TEMANIN', description: 'Kenali tujuan dan ruang lingkup platform TEMANIN.' };

export default function TentangPage() {
  return <div className={styles.page}>
    <header className={styles.hero}><div className={`container ${styles.heroInner}`}><span className={styles.badge}>Tentang TEMANIN</span><h1 className={styles.title}>Teman Bertumbuh untuk Remaja Depok</h1><p className={styles.lead}>TEMANIN menghadirkan edukasi kesehatan mental, konseling sebaya, dan akses ke jejaring PIK-R dalam ruang digital yang ramah remaja.</p></div></header>
    <main className={`container ${styles.content}`}>
      <section className={styles.section}><h2>Mengapa TEMANIN hadir?</h2><p>Remaja membutuhkan ruang aman untuk belajar, bercerita, dan mencari dukungan tanpa takut dihakimi. TEMANIN membantu mempertemukan kebutuhan tersebut dengan konselor sebaya dan jejaring PIK-R Kota Depok.</p><p>Kami percaya dukungan awal yang mudah dijangkau dapat membantu remaja memahami perasaannya dan menentukan langkah bantuan yang tepat.</p></section>
      <section className={styles.section}><h2>Tiga fokus layanan</h2><div className={styles.cardGrid}><div className={styles.card}><span className={styles.cardIcon}>📖</span><h3>Edukasi</h3><p>Artikel praktis tentang emosi, relasi, dunia digital, dan kesehatan mental.</p></div><div className={styles.card}><span className={styles.cardIcon}>💬</span><h3>Konseling Sebaya</h3><p>Ruang bercerita dengan pendamping sebaya yang mendengarkan tanpa menghakimi.</p></div><div className={styles.card}><span className={styles.cardIcon}>🤝</span><h3>Jejaring PIK-R</h3><p>Akses ke komunitas PIK-R berdasarkan wilayah dan kebutuhan remaja.</p></div></div></section>
      <section className={styles.section}><h2>Batasan layanan</h2><div className={styles.notice}>TEMANIN bukan layanan diagnosis, psikoterapi, atau kegawatdaruratan medis. Dalam keadaan tidak aman atau berisiko menyakiti diri, hubungi 112 atau 119 ext 8 dan cari orang dewasa yang dipercaya.</div></section>
      <Link href="/curhat" className="btn btn-primary">Mulai Curhat</Link>
    </main>
  </div>;
}
