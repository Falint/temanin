import Link from 'next/link';
import Icon from '@/components/shared/Icon';
import styles from './landing.module.css';

export default function CurhatCTA() {
  return (
    <section className={styles.curhatSection}>
      <div className={`${styles.curhatDecor} ${styles.curhatDecorOne}`} aria-hidden="true" />
      <div className={`${styles.curhatDecor} ${styles.curhatDecorTwo}`} aria-hidden="true" />

      <div className="container">
        <div className={styles.curhatInner}>
          <span className={styles.curhatIcon}><Icon name="chat" size={52} /></span>
          <h2 className={styles.curhatTitle}>
            ADA CERITA YANG INGIN KAMU BAGIKAN?
          </h2>
          <p className={styles.curhatDesc}>
            Pilih nama yang nyaman, cari PIK-R, lalu lanjutkan percakapan melalui bot Telegram. Balasan mengikuti jadwal dan ketersediaan pengurus.
          </p>
          <p className={styles.curhatSafety}>Dukungan sebaya, bukan pengganti psikolog, tenaga medis, atau layanan darurat.</p>
          <div className={styles.curhatCtas}>
            <Link href="/curhat" className={styles.curhatBtnPrimary}>
              Mulai Curhat →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
