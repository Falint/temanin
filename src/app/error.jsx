'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import styles from '@/components/shared/system.module.css';

export default function ErrorPage({ error, reset }) {
  useEffect(() => { console.error(error); }, [error]);
  return <div className={styles.systemPage}><div className={styles.systemCard}><span className={styles.systemCode}>!</span><h1>Terjadi Kendala</h1><p>Halaman gagal dimuat. Coba ulangi prosesnya. Jika masalah berlanjut, kembali ke beranda.</p><div className={styles.systemActions}><button type="button" className="btn btn-primary" onClick={reset}>Coba Lagi</button><Link href="/" className="btn btn-secondary">Ke Beranda</Link></div></div></div>;
}
