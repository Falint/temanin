import SectionHeader from '@/components/shared/SectionHeader';
import styles from './landing.module.css';

const pillars = [
  {
    icon: '🧠',
    title: 'Pahami Dirimu',
    description: 'Kenali emosi, pikiran, dan perasaanmu. Memahami diri sendiri adalah langkah pertama menuju kesehatan mental yang lebih baik.',
    bg: 'var(--primary-bg)',
  },
  {
    icon: '📚',
    title: 'Belajar & Bermain',
    description: 'Akses edukasi mental health dan game edukatif yang membuat proses belajar jadi menyenangkan dan tidak membosankan.',
    bg: 'var(--secondary-bg)',
  },
  {
    icon: '💚',
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
          title="Platform yang Benar-Benar Memahami Remaja"
          description="Dibangun khusus untuk mendukung kesejahteraan mental remaja di Kota Depok, dengan tiga pilar utama."
        />

        <div className={styles.whyGrid}>
          {pillars.map((pillar, idx) => (
            <div key={idx} className={styles.whyCard}>
              <div className={styles.whyIcon} style={{ backgroundColor: pillar.bg }}>
                {pillar.icon}
              </div>
              <h3 className={styles.whyCardTitle}>{pillar.title}</h3>
              <p className={styles.whyCardDesc}>{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
