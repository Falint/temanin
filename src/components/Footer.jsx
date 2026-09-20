import Link from 'next/link';
import styles from './Footer.module.css';
import { APP_NAME, EXTERNAL_LINKS } from '@/lib/constants';
import Logo from '@/components/shared/Logo';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Wave decoration */}
      <div className={styles.wave}>
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 60L48 54C96 48 192 36 288 42C384 48 480 72 576 78C672 84 768 72 864 60C960 48 1056 36 1152 36C1248 36 1344 48 1392 54L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z" fill="currentColor"/>
        </svg>
      </div>

      <div className={styles.content}>
        <div className="container">
          <div className={styles.grid}>
            {/* Brand */}
            <div className={styles.brand}>
              <Link href="/" className={styles.logo}>
                <Logo size={28} className={styles.logoIcon} />
                <span>
                  TEMAN<span className={styles.logoAccent}>IN</span>
                </span>
              </Link>
              <p className={styles.description}>
                Platform mental health, edukasi, dan konseling sebaya untuk remaja Kota Depok. Didukung oleh jaringan PIK-R (Pusat Informasi dan Konseling Remaja).
              </p>
              <div className={styles.socialLinks}>
                <a
                  href={EXTERNAL_LINKS.INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Instagram"
                >
                  📷
                </a>
                <a
                  href={EXTERNAL_LINKS.EMAIL}
                  className={styles.socialLink}
                  aria-label="Email"
                >
                  ✉️
                </a>
              </div>
            </div>

            {/* Platform */}
            <div>
              <h4 className={styles.title}>Platform</h4>
              <div className={styles.links}>
                <Link href="/tentang" className={styles.linkItem}>Tentang Kami</Link>
                <Link href="/edukasi" className={styles.linkItem}>Edukasi</Link>
                <Link href="/games" className={styles.linkItem}>Games</Link>
                <Link href="/curhat" className={styles.linkItem}>Curhat</Link>
                <Link href="/curhat/wilayah" className={styles.linkItem}>Cari PIK-R</Link>
              </div>
            </div>

            {/* Resources */}
            <div>
              <h4 className={styles.title}>Bantuan</h4>
              <div className={styles.links}>
                <Link href="/curhat" className={styles.linkItem}>Curhat Sekarang</Link>
                <Link href="/curhat/konseling" className={styles.linkItem}>Konseling</Link>
                <Link href="/kontak" className={styles.linkItem}>Hubungi Kami</Link>
              </div>
            </div>

            {/* Info */}
            <div>
              <h4 className={styles.title}>Info</h4>
              <div className={styles.links}>
                <span className={styles.infoText}>PIK-R Kota Depok</span>
                <span className={styles.infoText}>GenRe (Generasi Berencana)</span>
                <Link href="/kebijakan-privasi" className={styles.linkItem}>Kebijakan Privasi</Link>
                <Link href="/ketentuan" className={styles.linkItem}>Ketentuan Layanan</Link>
                <a
                  href={EXTERNAL_LINKS.INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkItem}
                >
                  @genre
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className={styles.bottom}>
            <p>© {new Date().getFullYear()} {APP_NAME} — PIK-R Kota Depok. Semua hak dilindungi.</p>
            <p className={styles.disclaimer}>
              Platform ini dikembangkan untuk mendukung kesehatan mental remaja di Kota Depok.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
