import Link from 'next/link';
import styles from './dashboard.module.css';

export default function DashboardShell({ role, title, description, children }) {
  return <div className={styles.page}>
    <aside className={styles.sidebar}>
      <Link href="/" className={styles.brand}>TEMANIN</Link>
      <span className={styles.role}>{role}</span>
      <nav aria-label="Dashboard demo">{[['Peer Counselor', 'konselor', 'Konselor'], ['Supervisor', 'supervisor', 'Supervisor'], ['Administrator', 'admin', 'Admin']].map(([key, path, label]) => <Link key={key} aria-current={role === key ? 'page' : undefined} href={`/dashboard/${path}`}>{label}</Link>)}</nav>
      <Link href="/" className={styles.back}>← Kembali ke situs</Link>
    </aside>
    <div className={styles.main}>
      <div className={styles.demoBanner}><strong>Preview antarmuka</strong><span>Data contoh, bukan aktivitas layanan. Autentikasi dan pengelolaan dashboard belum diimplementasikan; tombol aksi dinonaktifkan.</span></div>
      <header className={styles.header}><div><span className={styles.eyebrow}>{role}</span><h1>{title}</h1><p>{description}</p></div><span className={styles.demoUser}>👤 Akun Demo</span></header>
      {children}
    </div>
  </div>;
}
