import { STAT_LABELS, RELATION_LABELS, STAT_MAX } from '@/lib/game/constants.mjs';
import { formatText } from '@/lib/game/engine.mjs';
import styles from './life.module.css';

export default function StatsPanel({ state }) {
  return <aside className={styles.statsPanel} aria-label="Kondisi dan hubungan karakter">
    <h2>Kabar {state.player.name}</h2>
    <p className={styles.muted}>Angka ini bagian dari simulasi, bukan penilaian dirimu.</p>
    <div className={styles.statsGrid}>
      {Object.entries(STAT_LABELS).map(([key, label]) => <div className={styles.stat} key={key}>
        <div><span>{label}</span><strong>{state.stats[key]}</strong></div>
        <meter min="0" max={STAT_MAX} value={state.stats[key]} aria-label={label} />
      </div>)}
    </div>
    <h3>Kepercayaan</h3>
    <div className={styles.relationships}>
      {Object.entries(RELATION_LABELS).map(([key, name]) => <div key={key}>
        <span>{key === 'close' ? formatText('{close}', state) : name}</span>
        <span>{state.relations[key] >= 65 ? 'Dekat' : state.relations[key] >= 40 ? 'Bertumbuh' : 'Berjarak'}</span>
      </div>)}
    </div>
    <p className={styles.small}>Kedekatan tidak selalu berarti sepakat. Keputusanmu bisa terasa lagi di bab berikutnya.</p>
  </aside>;
}
