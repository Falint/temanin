import Link from 'next/link';
import Logo from '@/components/shared/Logo';
import styles from './Hero.module.css';

export default function Hero() {
  return <section className={styles.hero}>
    <div className={`container ${styles.inner}`}>
      <div className={styles.content}>
        <span className="badge badge-primary">RUANG TUMBUH REMAJA DEPOK</span>
        <h1>Pelan-pelan,<br />kamu nggak<br /><span>sendirian.</span></h1>
        <p>Tempat untuk memahami diri, belajar, dan menemukan yang siap mendengarkan. Curhat dengan teman sebaya, jelajahi edukasi, atau rehat lewat cerita interaktif.</p>
        <div className={styles.actions}>
          <Link href="/curhat" className="btn btn-primary">Mulai Curhat <span aria-hidden="true">↗</span></Link>
          <Link href="/edukasi" className="btn btn-outline">Jelajahi Edukasi</Link>
        </div>
        <p className={styles.note}>Sesuai ritmemu. Tanpa tekanan, tanpa penghakiman.</p>
      </div>
      <div className={styles.visual}>
        <div className={styles.visualHeading}><Logo size={46} /><span>TEMANIN<br /><small>Teman dalam prosesmu</small></span><span aria-hidden="true">✳</span></div>
        <div className={styles.message}><span>SEBUAH PENGINGAT KECIL</span><h2>Semua perasaanmu<br />punya tempat di sini.</h2><p>Nggak harus punya semua jawaban hari ini.</p></div>
        <div className={styles.paths}>
          <Link href="/curhat"><span aria-hidden="true">💬</span><span>Aku ingin cerita<small>Temukan pendengar sebaya</small></span><span aria-hidden="true">↗</span></Link>
          <Link href="/edukasi"><span aria-hidden="true">📖</span><span>Aku ingin memahami diri<small>Belajar dari hal-hal kecil</small></span><span aria-hidden="true">↗</span></Link>
          <Link href="/games/life"><span aria-hidden="true">🎮</span><span>Aku butuh jeda<small>Mainkan TEMANIN Life</small></span><span aria-hidden="true">↗</span></Link>
        </div>
        <div className={styles.caption}>Kamu boleh mulai dari mana saja.</div>
      </div>
    </div>
  </section>;
}
