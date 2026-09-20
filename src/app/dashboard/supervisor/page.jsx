import DashboardShell from '@/components/dashboard/DashboardShell';
import styles from '@/components/dashboard/dashboard.module.css';
import { demoActiveSessions } from '@/lib/data/dashboard';

export const metadata = { title: 'Dashboard Supervisor | TEMANIN' };
export default function SupervisorDashboard() {
  return <DashboardShell role="Supervisor" title="Monitoring & Eskalasi" description="Pantau sesi aktif dan tangani permintaan bantuan dari konselor sebaya.">
    <section className={styles.statGrid}><div className={styles.statCard}><span>Sesi aktif</span><strong>8</strong></div><div className={styles.statCard}><span>Menunggu</span><strong>3</strong></div><div className={styles.statCard}><span>Eskalasi</span><strong>1</strong></div><div className={styles.statCard}><span>Konselor piket</span><strong>6</strong></div></section>
    <section className={styles.panel}><div className={styles.panelHeader}><h2>Sesi Aktif</h2><span>Data demo tanpa isi percakapan sensitif</span></div><div className={styles.tableWrap}><table className={styles.table}><thead><tr><th>Sesi</th><th>Konselor</th><th>PIK-R</th><th>Durasi</th><th>Status</th><th>Aksi</th></tr></thead><tbody>{demoActiveSessions.map((item) => <tr key={item.id}><td>{item.id}</td><td>{item.counselor}</td><td>{item.pikr}</td><td>{item.duration}</td><td><span className={styles.priority}>{item.status}</span></td><td><button disabled className={styles.actionBtn}>Buka monitoring</button></td></tr>)}</tbody></table></div></section>
    <section className={styles.panel}><div className={styles.panelHeader}><h2>Permintaan Eskalasi</h2><span>1 membutuhkan respons</span></div><div className={styles.listItem}><strong>TEMANIN-H7M1S5 · Prioritas URGENT</strong><span>Diajukan Raka Putra · 3 menit lalu</span><p>Konselor meminta pendampingan supervisor untuk menentukan rujukan lanjutan.</p><button disabled className={styles.actionBtn}>Ambil eskalasi</button></div></section>
  </DashboardShell>;
}
