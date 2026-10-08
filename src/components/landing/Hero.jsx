import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  return <section className={styles.hero}>
    <Image className={styles.photo} src="/images/temanin-together.webp" alt="" fill sizes="(max-width: 768px) 1400px, 100vw" preload />
    <div className={styles.overlay} />
    <div className={`container ${styles.inner}`}>
      <div className={styles.content}>
        <span className={styles.eyebrow}>RUANG TUMBUH REMAJA DEPOK</span>
        <h1>CERITAMU.<br /><span>BERARTI.</span></h1>
        <div className={styles.rule} />
        <h2>Berani cerita. Berani jadi diri sendiri.</h2>
        <p>Teman untuk hari yang berat, mimpi yang besar, dan semua proses di antaranya. Yuk, tumbuh bareng TEMANIN.</p>
        <div className={styles.actions}>
          <Link href="/curhat" className={styles.primary}>MULAI CERITAMU <span aria-hidden="true">↗</span></Link>
          <Link href="#jelajahi" className={styles.secondary}>KENALI TEMANIN <span aria-hidden="true">↓</span></Link>
          <Link href="/games/life" className={styles.game}>MAIN TEMANIN LIFE <span aria-hidden="true">→</span></Link>
        </div>
      </div>
      <div className={styles.photoCaption}><span>BERSAMA, KITA BISA BERTUMBUH.</span><small>Ilustrasi suasana kebersamaan</small></div>
    </div>
    <div className={styles.bottom}><div className="container"><span>PAHAMI DIRI <b aria-hidden="true">✦</b> TEMUKAN DUKUNGAN <b aria-hidden="true">✦</b> TULIS CERITAMU <b aria-hidden="true">✦</b> TEMANIN</span><Link href="#jelajahi" aria-label="Jelajahi TEMANIN">↓</Link></div></div>
  </section>;
}
