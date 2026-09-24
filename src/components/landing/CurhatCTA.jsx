import Link from 'next/link';
import styles from './landing.module.css';

export default function CurhatCTA() {
  return (
    <section className={styles.curhatSection}>
      <div className={`${styles.curhatDecor} ${styles.curhatDecorOne}`} aria-hidden="true" />
      <div className={`${styles.curhatDecor} ${styles.curhatDecorTwo}`} aria-hidden="true" />

      <div className="container">
        <div className={styles.curhatInner}>
          <span className={styles.curhatIcon}>💬</span>
          <h2 className={styles.curhatTitle}>
            Butuh Seseorang untuk Mendengarkan?
          </h2>
          <p className={styles.curhatDesc}>
            Kamu tidak harus menghadapi semuanya sendiri. Ceritakan perasaanmu — anonim atau terhubung dengan konselor sebaya yang memahami.
          </p>
          <div className={styles.curhatCtas}>
            <Link href="/curhat" className={styles.curhatBtnPrimary}>
              💬 Mulai Curhat
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
