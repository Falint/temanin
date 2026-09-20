import DashboardShell from '@/components/dashboard/DashboardShell';
import styles from '@/components/dashboard/dashboard.module.css';
import { demoPartners } from '@/lib/data/dashboard';

export const metadata = { title: 'Dashboard Admin | TEMANIN' };
export default function AdminDashboard() {
  return <DashboardShell role="Administrator" title="Administrasi TEMANIN" description="Kelola mitra PIK-R, staf, jadwal, dan kesehatan operasional platform.">
    <section className={styles.statGrid}><div className={styles.statCard}><span>Mitra PIK-R</span><strong>8</strong></div><div className={styles.statCard}><span>Konselor aktif</span><strong>24</strong></div><div className={styles.statCard}><span>Supervisor</span><strong>4</strong></div><div className={styles.statCard}><span>Sesi bulan ini</span><strong>136</strong></div></section>
    <div className={styles.panelGrid}><section className={styles.panel}><div className={styles.panelHeader}><h2>Mitra PIK-R</h2><button disabled className={styles.actionBtn}>Tambah mitra</button></div><div className={styles.tableWrap}><table className={styles.table}><thead><tr><th>Nama</th><th>Wilayah</th><th>Konselor</th><th>Status</th><th>Aksi</th></tr></thead><tbody>{demoPartners.map((partner) => <tr key={partner.name}><td>{partner.name}</td><td>{partner.district}</td><td>{partner.counselors}</td><td className={partner.active ? styles.statusActive : styles.statusInactive}>{partner.active ? 'Aktif' : 'Nonaktif'}</td><td><button disabled className={styles.actionBtn}>Kelola</button></td></tr>)}</tbody></table></div></section><aside><section className={styles.panel}><div className={styles.panelHeader}><h2>Akses Cepat</h2></div><div className={styles.list}><div className={styles.listItem}><strong>Akun staf</strong><span>Kelola role dan status pelatihan</span></div><div className={styles.listItem}><strong>Jadwal piket</strong><span>Atur ketersediaan setiap PIK-R</span></div><div className={styles.listItem}><strong>Laporan layanan</strong><span>Statistik tanpa membuka isi chat</span></div></div></section></aside></div>
  </DashboardShell>;
}
