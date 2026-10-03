import Link from 'next/link';
import Scene from '@/components/game/Scene';
import styles from '@/components/games/games.module.css';

export const metadata = {
  title: 'Games | TEMANIN',
  description: 'Mainkan TEMANIN Life: cerita interaktif tiga tahun SMA tentang pertemanan, hubungan, dan akademik, langsung di browser.',
};

export default function GamesPage() {
  return <div className={styles.page}>
    <header className={styles.header}><span>MAIN · PILIH · BERTUMBUH</span><h1>Cerita kecil.<br />Pelajaran yang tinggal.</h1><p>Kenali diri lewat pilihan sehari-hari. Mulai dari dunia yang dekat denganmu.</p></header>
    <section className={styles.section} aria-label="Pilihan game">
      <Link href="/games/life" className={styles.card}>
        <div className={styles.art}><Scene compact /></div>
        <div className={styles.content}><span className={styles.badge}>CERITA INTERAKTIF · ±15 MENIT</span><h2>TEMANIN Life</h2><p>Dari kelas 10 sampai lulus. Teman baru, rasa suka, nilai ujian, dan keputusan yang membentuk tiga tahunmu.</p><div className={styles.tags}><span>3 bab</span><span>12 keputusan</span><span>Tanpa akun</span></div><span className={styles.play}>Mulai ceritamu ↗</span></div>
      </Link>
      <p className={styles.note}>Main langsung di browser. Progres tersimpan di perangkat ini. Durasi mengikuti kecepatan membaca dan memilih.</p>
    </section>
  </div>;
}
