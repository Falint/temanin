import styles from './curhat.module.css';
export default function CurhatSteps({ current }) {
  return <ol className={styles.flowSteps} aria-label="Langkah curhat">
    {['Pilih mode', 'Nama pilihanmu', 'PIK-R & Telegram'].map((label, index) => <li key={label} aria-current={current === index + 1 ? 'step' : undefined}><span aria-hidden="true">{index + 1}</span><span>{label}</span></li>)}
  </ol>;
}
