import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Decorative background blobs */}
      <div className={styles.blobOne} aria-hidden="true" />
      <div className={styles.blobTwo} aria-hidden="true" />
      <div className={styles.blobThree} aria-hidden="true" />

      <div className="container">
        <div className={styles.heroInner}>
          {/* Content */}
          <div className={styles.content}>
            <div className={styles.tagline}>
              <span className={styles.taglineIcon}>🌱</span>
              Mental Health × Edukasi × PIK-R Kota Depok
            </div>

            <h1 className={styles.title}>
              Tempat untuk{' '}
              <span className={styles.highlight}>Memahami Diri</span>,
              Belajar, dan Menemukan yang{' '}
              <span className={styles.highlight}>Siap Mendengarkan</span>
            </h1>

            <p className={styles.subtitle}>
              Ruang aman untuk remaja Depok — curhat, belajar tentang kesehatan mental, bermain game edukatif, dan terhubung dengan konselor sebaya PIK-R.
            </p>

            <div className={styles.ctas}>
              <Link href="/curhat" className="btn btn-primary btn-lg">
                💬 Curhat Sekarang
              </Link>
              <Link href="/edukasi" className="btn btn-outline btn-lg">
                📖 Mulai Belajar
              </Link>
            </div>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statValue}>11</span>
                <span className={styles.statLabel}>Kecamatan</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>8+</span>
                <span className={styles.statLabel}>PIK-R Partner</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>Piket</span>
                <span className={styles.statLabel}>Konselor Sebaya</span>
              </div>
            </div>
          </div>

          {/* Visual — interactive cards preview */}
          <div className={styles.visual}>
            <div className={styles.visualGrid}>
              <Link href="/edukasi" className={styles.visualCard}>
                <span className={styles.visualCardIcon}>📖</span>
                <h3 className={styles.visualCardTitle}>Edukasi</h3>
                <p className={styles.visualCardDesc}>Artikel & modul tentang mental health</p>
              </Link>
              <Link href="/games" className={styles.visualCard}>
                <span className={styles.visualCardIcon}>🎮</span>
                <h3 className={styles.visualCardTitle}>Games</h3>
                <p className={styles.visualCardDesc}>Belajar sambil bermain di Roblox</p>
              </Link>
              <Link href="/curhat" className={styles.visualCard}>
                <span className={styles.visualCardIcon}>💬</span>
                <h3 className={styles.visualCardTitle}>Curhat</h3>
                <p className={styles.visualCardDesc}>Ceritakan perasaanmu dengan aman</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
