import SectionHeader from '@/components/shared/SectionHeader';
import styles from './landing.module.css';

const steps = [
  {
    number: '1',
    icon: '📖',
    title: 'Pelajari',
    description: 'Baca artikel dan ikuti modul edukasi tentang kesehatan mental.',
  },
  {
    number: '2',
    icon: '🎮',
    title: 'Bermain',
    description: 'Mainkan game edukatif di Roblox untuk belajar sambil bersenang-senang.',
  },
  {
    number: '3',
    icon: '💬',
    title: 'Curhat',
    description: 'Ceritakan perasaanmu secara anonim atau pilih untuk terhubung dengan konselor.',
  },
  {
    number: '4',
    icon: '🤝',
    title: 'Dapatkan Dukungan',
    description: 'Terhubung dengan PIK-R dan dapatkan pendampingan profesional jika dibutuhkan.',
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.howSection}>
      <div className="container">
        <SectionHeader
          badge="Cara Kerja"
          badgeVariant="accent"
          title="Langkah Mudah Memulai"
          description="Mulai dari mana saja — tidak ada urutan yang harus diikuti."
        />

        <div className={styles.howSteps}>
          {steps.map((step, idx) => (
            <div key={idx} className={styles.howStep}>
              <div className={styles.howStepNumber}>{step.number}</div>
              <div>
                <span className={styles.howStepIcon}>{step.icon}</span>
                <h3 className={styles.howStepTitle}>{step.title}</h3>
                <p className={styles.howStepDesc}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
