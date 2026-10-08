import Link from 'next/link';
import Logo from '@/components/shared/Logo';
import styles from './Hero.module.css';

export default function Hero() {
  return <section className={styles.hero}>
    <div className={`container ${styles.inner}`}>
      <div className={styles.content}>
        <span className={styles.eyebrow}>DARI REMAJA, UNTUK REMAJA DEPOK</span>
        <h1>Jadi diri sendiri.<br /><span>Tumbuh bareng.</span></h1>
        <p>Hari yang berat, pertanyaan yang banyak, atau sekadar ingin cerita. Ada ruang untuk setiap versi dirimu di TEMANIN.</p>
        <div className={styles.actions}>
          <Link href="/curhat" className="btn btn-primary">Aku ingin cerita <span aria-hidden="true">↗</span></Link>
          <Link href="#jelajahi" className={styles.explore}>Kenalan dulu <span aria-hidden="true">↓</span></Link>
        </div>
        <div className={styles.note}><span aria-hidden="true">✳</span><p>Nggak harus tahu semua jawabannya.<br /><strong>Satu langkah kecil juga berarti.</strong></p></div>
      </div>
      <div className={styles.visual}>
        <div className={styles.visualHeading}><span>CATATAN UNTUK DIRIMU</span><Logo size={48} /></div>
        <div className={styles.message}><span aria-hidden="true">“</span><h2>Kamu nggak<br />harus menjalani<br />semuanya<br /><em>sendirian.</em></h2></div>
        <div className={styles.caption}><span>Ambil jeda. Tarik napas.</span><span aria-hidden="true">↗</span></div>
        <Link href="/games/life" className={styles.gameNote}><span aria-hidden="true">↳</span><div>Butuh ganti suasana?<strong>Coba cerita interaktif Life →</strong></div></Link>
      </div>
    </div>
    <div className={`container ${styles.bottom}`}><span>RUANGMU, RITMEMU.</span><p>Belajar memahami diri. Berani bercerita. Menemukan teman tumbuh.</p><span aria-hidden="true">01 / TEMANIN</span></div>
  </section>;
}
