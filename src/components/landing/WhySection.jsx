import Icon from '@/components/shared/Icon';
import SectionHeader from '@/components/shared/SectionHeader';
import styles from './landing.module.css';

const pillars = [
  {
    icon: 'spark',
    title: 'Pahami Dirimu',
    description: 'Kenali emosi, pikiran, dan perasaanmu. Memahami diri sendiri adalah langkah pertama menuju kesehatan mental yang lebih baik.',
    bg: 'var(--primary-bg)',
  },
  {
    icon: 'book',
    title: 'Belajar & Bermain',
    description: 'Akses edukasi mental health dan game edukatif yang membuat proses belajar jadi menyenangkan dan tidak membosankan.',
    bg: 'var(--secondary-bg)',
  },
  {
    icon: 'people',
    title: 'Temukan Dukungan',
    description: 'Kamu tidak sendirian. Terhubung dengan konselor sebaya PIK-R yang siap mendengarkan dan mendampingimu.',
    bg: 'var(--accent-bg)',
  },
];

export default function WhySection() {
  return (
    <section className={styles.whySection}>
      <div className="container">
        <SectionHeader
          badge="Kenapa TEMANIN?"
          badgeVariant="secondary"
          title="TUMBUH ITU SEBUAH PROSES."
          description="Dibangun khusus untuk mendukung kesejahteraan mental remaja di Kota Depok, dengan tiga pilar utama."
        />

        <div className={styles.whyGrid}>
          {pillars.map((pillar, idx) => (
            <details key={pillar.title} className={styles.whyCard} open={idx === 0}>
              <summary><span className={styles.whyIcon}><Icon name={pillar.icon} size={25} /></span><h3 className={styles.whyCardTitle}>{pillar.title}</h3><span className={styles.expand} aria-hidden="true">+</span></summary>
              <p className={styles.whyCardDesc}>{pillar.description}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
