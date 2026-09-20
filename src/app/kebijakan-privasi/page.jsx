import styles from '@/components/info/info.module.css';

export const metadata = { title: 'Kebijakan Privasi | TEMANIN', description: 'Penjelasan pengelolaan data dan privasi pengguna TEMANIN.' };

export default function PrivacyPage() {
  return <div className={styles.page}>
    <header className={styles.hero}><div className={`container ${styles.heroInner}`}><span className={styles.badge}>Kebijakan Privasi</span><h1 className={styles.title}>Privasi dan Kendali atas Datamu</h1><p className={styles.lead}>Penjelasan ringkas mengenai data yang digunakan TEMANIN dan alasan penggunaannya.</p></div></header>
    <main className={`container ${styles.content}`}><p className={styles.updated}>Terakhir diperbarui: 21 September 2026</p>
      <section className={styles.section}><h2>Data yang digunakan</h2><ul><li>Mode anonim: nama panggilan, ID sesi acak, hasil screening, dan isi percakapan.</li><li>Mode terhubung: nama, kontak opsional, institusi opsional, hasil screening, dan isi percakapan.</li><li>Data teknis dasar yang diperlukan untuk keamanan dan pengoperasian layanan setelah backend diaktifkan.</li></ul></section>
      <section className={styles.section}><h2>Penyimpanan saat ini</h2><p>Versi prototipe menyimpan profil dan hasil screening sementara pada <em>sessionStorage</em> browser. Data tersebut hilang ketika sesi browser berakhir. Chat yang tampil saat ini merupakan simulasi dan belum dikirim ke konselor atau database.</p></section>
      <section className={styles.section}><h2>Tujuan penggunaan</h2><p>Data digunakan untuk menampilkan sapaan, memberi konteks awal kepada konselor, menjalankan sesi konseling, menjaga keselamatan, serta meningkatkan kualitas layanan. Data tidak digunakan untuk iklan tertarget.</p></section>
      <section className={styles.section}><h2>Akses dan penghapusan</h2><p>Setelah layanan backend aktif, pengguna dapat meminta akses atau penghapusan data melalui halaman Kontak. Data hanya dapat diakses oleh petugas yang memiliki peran dan kebutuhan layanan yang sesuai.</p></section>
      <section className={styles.section}><h2>Situasi keselamatan</h2><p>Kerahasiaan dapat dibatasi jika terdapat risiko serius terhadap keselamatan pengguna atau orang lain, sesuai prosedur eskalasi dan hukum yang berlaku.</p></section>
      <div className={styles.notice}>Dokumen ini harus ditinjau kembali oleh pengelola dan penasihat hukum sebelum layanan produksi mengumpulkan data sensitif.</div>
    </main>
  </div>;
}
