import DashboardShell from '@/components/dashboard/DashboardShell';
import styles from '@/components/dashboard/dashboard.module.css';
import { demoQueue } from '@/lib/data/dashboard';

export const metadata = { title: 'Dashboard Konselor | TEMANIN' };
export default function CounselorDashboard() {
  return <DashboardShell role="Peer Counselor" title="Ruang Kerja Konselor" description="Kelola antrean, sesi aktif, dan jadwal piket dari satu tempat.">
    <section className={styles.statGrid}><div className={styles.statCard}><span>Antrean saat ini</span><strong>3</strong></div><div className={styles.statCard}><span>Sesi saya</span><strong>1</strong></div><div className={styles.statCard}><span>Jadwal berikutnya</span><strong>19:00</strong></div><div className={styles.statCard}><span>Selesai minggu ini</span><strong>12</strong></div></section>
    <div className={styles.panelGrid}><section className={styles.panel}><div className={styles.panelHeader}><h2>Antrean Curhat</h2><span>Urut prioritas dan waktu tunggu</span></div><div className={styles.tableWrap}><table className={styles.table}><thead><tr><th>Sesi</th><th>Nama</th><th>Topik</th><th>Prioritas</th><th>Menunggu</th><th>Aksi</th></tr></thead><tbody>{demoQueue.map((item) => <tr key={item.id}><td>{item.id}</td><td>{item.name}</td><td>{item.topic}</td><td><span className={styles.priority}>{item.priority}</span></td><td>{item.waiting}</td><td><button disabled className={styles.actionBtn}>Terima sesi</button></td></tr>)}</tbody></table></div></section><aside><section className={styles.panel}><div className={styles.panelHeader}><h2>Jadwal Piket</h2></div><div className={styles.list}><div className={styles.listItem}><strong>Hari ini</strong><span>19:00–21:00 WIB</span></div><div className={styles.listItem}><strong>Sabtu</strong><span>10:00–13:00 WIB</span></div></div></section><section className={styles.panel}><div className={styles.panelHeader}><h2>Sesi Aktif</h2></div><div className={styles.listItem}><strong>TEMANIN-D4F8J2</strong><span>Berjalan 18 menit</span><p><button disabled className={styles.actionBtn}>Eskalasi ke supervisor</button></p></div></section></aside></div>
  </DashboardShell>;
}
