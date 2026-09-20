import Link from 'next/link';
import styles from './dashboard.module.css';

export default function DashboardShell({ role, title, description, children }) {
  return <div className={styles.page}>
    <aside className={styles.sidebar}>
      <Link href="/" className={styles.brand}>TEMANIN</Link>
      <span className={styles.role}>{role}</span>
      <nav><Link href="/dashboard/konselor">Konselor</Link><Link href="/dashboard/supervisor">Supervisor</Link><Link href="/dashboard/admin">Admin</Link></nav>
      <Link href="/" className={styles.back}>← Kembali ke situs</Link>
    </aside>
    <main className={styles.main}>
      <div className={styles.demoBanner}><strong>Preview antarmuka</strong><span>Data di halaman ini adalah demo. Login dan aksi database aktif setelah Supabase dihubungkan.</span></div>
      <header className={styles.header}><div><span className={styles.eyebrow}>{role}</span><h1>{title}</h1><p>{description}</p></div><span className={styles.demoUser}>👤 Akun Demo</span></header>
      {children}
    </main>
  </div>;
}
