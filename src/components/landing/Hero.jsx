import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/shared/Icon';
import styles from './Hero.module.css';

export default function Hero() {
  return <section className={styles.hero}>
    <div className={`container ${styles.inner}`}>
      <div className={styles.content}>
        <span className={styles.eyebrow}><span aria-hidden="true">✳</span> RUANG TUMBUH REMAJA DEPOK</span>
        <h1>Jadi diri sendiri.<br />Tumbuh <span>bareng.</span></h1>
        <p>Hari seru, hari berat, atau hari yang biasa aja. Ada ruang buat ceritamu, rasa penasaranmu, dan langkah kecilmu di sini.</p>
        <div className={styles.actions}>
          <Link href="#jelajahi" className="btn btn-primary">Temukan ruangmu <span aria-hidden="true">↗</span></Link>
          <Link href="/curhat" className={styles.secondary}><Icon name="chat" size={20} /> Aku mau cerita</Link>
        </div>
        <div className={styles.note}><span aria-hidden="true">✦</span> Belajar, bermain, dan bercerita. Dengan caramu.</div>
      </div>
      <div className={styles.collage}>
        <div className={styles.photoFrame}>
          <Image src="/images/temanin-together.webp" alt="Ilustrasi remaja berjalan dan mengobrol bersama di halaman sekolah" fill sizes="(max-width: 768px) 90vw, 48vw" preload />
          <span className={styles.caption}>Banyak cerita. Satu ruang untuk tumbuh.</span>
        </div>
        <span className={styles.sticker} aria-hidden="true">you do<br /><b>you.</b><span>✳</span></span>
        <Link href="/edukasi" className={styles.readCard}><span><Icon name="book" size={26} /></span><div><small>SEDIKIT BACA, BANYAK MAKNA</small><strong>Kenali dirimu lebih dekat.</strong></div><b aria-hidden="true">↗</b></Link>
        <span className={styles.spark} aria-hidden="true">✳</span>
      </div>
    </div>
    <div className={`container ${styles.quickStart}`}>
      <span>Hari ini, aku pengen…</span>
      <Link href="/edukasi/cara-mengelola-stres">Pikiran lebih tenang <span aria-hidden="true">↗</span></Link>
      <Link href="/games/life">Coba cerita baru <span aria-hidden="true">↗</span></Link>
      <Link href="/curhat">Ada teman cerita <span aria-hidden="true">↗</span></Link>
    </div>
  </section>;
}
