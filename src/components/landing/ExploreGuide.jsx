import Link from 'next/link';
import Logo from '@/components/shared/Logo';
import styles from './landing.module.css';

export default function ExploreGuide() {
  return <details className={styles.guide}>
    <summary aria-label="Buka panduan jelajah TEMANIN"><Logo size={34} /><span>JELAJAHI</span></summary>
    <div className={styles.guidePanel}><strong>Mau mulai dari mana?</strong><p>Pilih yang paling dekat dengan kebutuhanmu.</p><Link href="/curhat">Aku ingin cerita <span aria-hidden="true">↗</span></Link><Link href="/edukasi">Aku ingin memahami diri <span aria-hidden="true">↗</span></Link><Link href="/games/life">Aku ingin bermain <span aria-hidden="true">↗</span></Link><small>Tekan tombol logo untuk menutup.</small></div>
  </details>;
}
