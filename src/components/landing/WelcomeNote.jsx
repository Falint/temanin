import Link from 'next/link';
import Logo from '@/components/shared/Logo';
import styles from './landing.module.css';

export default function WelcomeNote() {
  return <section className={styles.welcome} aria-label="Kenalan dengan TEMANIN">
    <div className={`container ${styles.welcomeGrid}`}>
      <div><span className="badge badge-primary">KENALAN DULU, YUK</span><h2>APA ITU<br /><span>TEMANIN?</span></h2><p>Ruang digital untuk remaja Depok yang ingin memahami diri, menemukan dukungan sebaya, dan berani menentukan langkahnya sendiri.</p><Link href="/tentang" className={styles.textLink}>CERITA DI BALIK TEMANIN <span aria-hidden="true">↗</span></Link></div>
      <div className={styles.quoteCard}><div className={styles.quoteTop}><Logo size={60} /><span>PENGINGAT KECIL<br /><strong>UNTUK HARI INI</strong></span></div><blockquote>“Kamu nggak harus punya semua jawaban hari ini. Mulai dari satu langkah kecil.”</blockquote><Link href="/curhat">Ada yang ingin diceritakan? <span aria-hidden="true">→</span></Link></div>
    </div>
  </section>;
}
