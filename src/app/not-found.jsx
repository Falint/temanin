import Link from 'next/link';
import styles from '@/components/shared/system.module.css';

export default function NotFound() {
  return <div className={styles.systemPage}><div className={styles.systemCard}><span className={styles.systemCode}>404</span><h1>Halaman Tidak Ditemukan</h1><p>Alamat yang kamu buka mungkin sudah berubah atau tidak tersedia. Kamu bisa kembali ke beranda atau mencari artikel edukasi.</p><div className={styles.systemActions}><Link href="/" className="btn btn-primary">Ke Beranda</Link><Link href="/edukasi" className="btn btn-secondary">Buka Edukasi</Link></div></div></div>;
}
