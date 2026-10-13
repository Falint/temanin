import styles from '@/components/info/info.module.css';

export const metadata = { title: 'Kebijakan Privasi | TEMANIN', description: 'Penjelasan pengelolaan data dan privasi pengguna TEMANIN.' };

export default function PrivacyPage() {
  return <div className={styles.page}>
    <header className={styles.hero}><div className={`container ${styles.heroInner}`}><span className={styles.badge}>Kebijakan Privasi</span><h1 className={styles.title}>Privasi dan Kendali atas Datamu</h1><p className={styles.lead}>Penjelasan ringkas mengenai data yang digunakan TEMANIN dan alasan penggunaannya.</p></div></header>
    <div className={`container ${styles.content}`}><p className={styles.updated}>Terakhir diperbarui: 8 Oktober 2026</p>
      <section className={styles.section}><h2>Data yang digunakan</h2><ul><li>Mode anonim: nama panggilan, identitas sesi, dan ID chat Telegram untuk menghubungkan percakapan. Pesan yang kamu kirim melalui bot diteruskan ke pengurus PIK-R.</li><li>Mode terhubung: nama pilihanmu dan data penghubung Telegram yang sama. Formulir aktif tidak meminta kontak atau institusi.</li><li>Refleksi awal pada alur demo disimpan di browser dan tidak dikirim melalui bot Telegram.</li></ul></section>
      <section className={styles.section}><h2>Penyimpanan saat ini</h2><p>Profil dan refleksi awal disimpan sementara pada <em>sessionStorage</em> browser. Alur Telegram membuat sesi di server: nama pilihanmu, mode identitas, ID chat Telegram, status sesi, dan pemetaan pesan digunakan untuk meneruskan percakapan ke pengurus PIK-R. Halaman chat web adalah simulasi terpisah; pesan demo tidak dikirim ke konselor. Progres TEMANIN Life tersimpan di browser hingga data situs dihapus.</p></section>
      <section className={styles.section}><h2>Tujuan penggunaan</h2><p>Data digunakan untuk menampilkan sapaan, memberi konteks awal kepada konselor, menjalankan sesi konseling, menjaga keselamatan, serta meningkatkan kualitas layanan. Data tidak digunakan untuk iklan tertarget.</p></section>
      <section className={styles.section}><h2>Akses dan penghapusan</h2><p>Setelah layanan backend aktif, pengguna dapat meminta akses atau penghapusan data melalui halaman Kontak. Data hanya dapat diakses oleh petugas yang memiliki peran dan kebutuhan layanan yang sesuai.</p></section>
      <section className={styles.section}><h2>Situasi keselamatan</h2><p>Kerahasiaan dapat dibatasi jika terdapat risiko serius terhadap keselamatan pengguna atau orang lain, sesuai prosedur eskalasi dan hukum yang berlaku.</p></section>
      <div className={styles.notice}>Nama samaran tidak berarti anonim sepenuhnya: bot memerlukan ID chat Telegram untuk membalas. Hindari mengirim informasi pribadi yang tidak diperlukan dalam percakapan.</div>
    </div>
  </div>;
}
