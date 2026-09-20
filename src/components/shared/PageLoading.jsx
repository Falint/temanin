import styles from './system.module.css';

export default function PageLoading({ message = 'Memuat halaman...' }) {
  return <div className={styles.loading} role="status" aria-live="polite"><span className={styles.spinner} aria-hidden="true" /><p>{message}</p></div>;
}
