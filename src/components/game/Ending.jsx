import Link from 'next/link';
import { getEnding, formatText } from '@/lib/game/engine.mjs';
import Scene from './Scene';
import styles from './life.module.css';

export default function Ending({ state, onRestart, headingRef }) {
  const ending = getEnding(state);
  return <section className={styles.ending}>
    <div className={styles.endingArt}><Scene avatar={state.player.avatar} mood="happy" /></div>
    <div className={styles.endingBody}>
      <span className={styles.eyebrow}>EPILOG · KELULUSAN</span>
      <h1 ref={headingRef} tabIndex={-1}>Tiga tahun. Banyak versi dirimu.</h1>
      <p className={styles.lead}>Selamat lulus, {state.player.name}. Ini jejak pilihanmu.</p>
      <div className={styles.endingGrid}>
        {[['Akademik', ending.academic], ['Pertemanan', ending.friendship], ['Hubungan', ending.relationship]].map(([label, result]) => <article key={label}>
          <span className={styles.eyebrow}>{label}</span><h2>{result.title}</h2><p>{result.text}</p>
        </article>)}
      </div>
      <div className={styles.reflection}><h2>Yang kamu bawa pulang</h2><p>{ending.direction}</p><p>{ending.wellbeing}</p></div>
      <h2>Tiga keputusan yang membentuk perjalananmu</h2>
      <ol className={styles.memories}>{ending.memories.map(memory => <li key={memory.title}><strong>{memory.title}</strong><p>{formatText(memory.choice, state)}</p></li>)}</ol>
      <p className={styles.small}>Ini hasil cerita fiksi, bukan diagnosis atau prediksi masa depan. Hubungan dan pilihan setelah sekolah selalu bisa berkembang.</p>
      <div className={styles.actions}><button className={styles.primary} onClick={onRestart}>Coba perjalanan lain ↗</button><Link className={styles.secondary} href="/games">Kembali ke Games</Link></div>
    </div>
  </section>;
}
