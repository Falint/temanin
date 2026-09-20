import styles from '@/components/info/info.module.css';

export const metadata = { title: 'Ketentuan Layanan | TEMANIN', description: 'Ketentuan penggunaan platform TEMANIN.' };

export default function TermsPage() {
  return <div className={styles.page}>
    <header className={styles.hero}><div className={`container ${styles.heroInner}`}><span className={styles.badge}>Ketentuan Layanan</span><h1 className={styles.title}>Pedoman Menggunakan TEMANIN</h1><p className={styles.lead}>Ketentuan ini membantu menjaga ruang TEMANIN tetap aman, saling menghormati, dan sesuai tujuan konseling sebaya.</p></div></header>
    <main className={`container ${styles.content}`}><p className={styles.updated}>Terakhir diperbarui: 21 September 2026</p>
      <section className={styles.section}><h2>Ruang lingkup</h2><p>TEMANIN menyediakan materi edukasi dan dukungan konseling sebaya. Layanan ini bukan pengganti pemeriksaan, diagnosis, atau penanganan tenaga kesehatan profesional.</p></section>
      <section className={styles.section}><h2>Tanggung jawab pengguna</h2><ul><li>Memberikan informasi yang wajar dan tidak menyamar sebagai orang lain.</li><li>Tidak mengirim ancaman, pelecehan, spam, atau konten ilegal.</li><li>Menghormati konselor, pengguna lain, dan kerahasiaan percakapan.</li><li>Tidak menggunakan layanan untuk keadaan darurat.</li></ul></section>
      <section className={styles.section}><h2>Keamanan dan moderasi</h2><p>Pengelola dapat membatasi sesi atau akun yang membahayakan orang lain, menyalahgunakan layanan, atau melanggar hukum. Dalam risiko keselamatan serius, sesi dapat dieskalasikan kepada supervisor atau layanan profesional.</p></section>
      <section className={styles.section}><h2>Ketersediaan layanan</h2><p>Respons konselor mengikuti jadwal piket dan ketersediaan relawan. TEMANIN tidak menjamin respons instan atau layanan tanpa gangguan.</p></section>
      <section className={styles.section}><h2>Perubahan ketentuan</h2><p>Ketentuan dapat diperbarui ketika fitur, regulasi, atau proses layanan berubah. Tanggal pembaruan akan dicantumkan pada halaman ini.</p></section>
      <div className={styles.notice}>Jika kamu tidak setuju dengan ketentuan ini, jangan melanjutkan sesi curhat dan hubungi pengelola melalui halaman Kontak.</div>
    </main>
  </div>;
}
