import Link from 'next/link';
import SectionHeader from '@/components/shared/SectionHeader';
import Scene from '@/components/game/Scene';
import styles from './landing.module.css';

export default function GamesPreview() {
  return <section className={styles.gamesSection}>
    <div className="container">
      <SectionHeader badge="TEMANIN Life" badgeVariant="warm" title="Tiga Tahun, Pilihanmu Sendiri" description="Cerita interaktif tentang pertemanan, hubungan, dan pelajaran dari kelas 10 sampai lulus SMA." />
      <Link href="/games/life" className={styles.lifePreview}>
        <div className={styles.lifePreviewArt}><Scene compact /></div>
        <div className={styles.lifePreviewBody}><span>3 BAB · 12 KEPUTUSAN · ±15 MENIT</span><h3>Jadi tokoh utama ceritamu.</h3><p>Pilihan kecil bisa terasa lagi di kemudian hari. Main langsung di browser, tanpa akun.</p><strong>Mulai TEMANIN Life →</strong></div>
      </Link>
    </div>
  </section>;
}
