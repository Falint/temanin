import Icon from '@/components/shared/Icon';
import styles from './education.module.css';

const covers = {
  'pentingnya-kesehatan-mental': { label: 'KENALI DIRIMU', word: 'Mind matters.', icon: 'spark', tone: 'blue', number: '01' },
  'menjadi-teman-cerita-yang-melegakan': { label: 'HADIR UNTUK TEMAN', word: 'I hear you.', icon: 'chat', tone: 'peach', number: '02' },
  'panduan-kesehatan-mental-remaja': { label: 'TUMBUH BERSAMA', word: 'Room to grow.', icon: 'book', tone: 'green', number: '03' },
  'cara-mengelola-stres': { label: 'AMBIL JEDA', word: 'One breath at a time.', icon: 'spark', tone: 'lilac', number: '04' },
};

export default function ArticleCover({ slug }) {
  const cover = covers[slug] || covers['pentingnya-kesehatan-mental'];
  return <div className={`${styles.cover} ${styles[cover.tone]}`} aria-hidden="true">
    <span className={styles.coverLabel}>{cover.label}</span>
    <span className={styles.coverShape}><Icon name={cover.icon} size={54} /></span>
    <strong className={styles.coverWord}>{cover.word}</strong>
    <span className={styles.coverNumber}>{cover.number} / TEMANIN</span>
  </div>;
}
