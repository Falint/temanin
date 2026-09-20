import Link from 'next/link';
import SectionHeader from '@/components/shared/SectionHeader';
import styles from './landing.module.css';

const features = [
  {
    icon: '📖',
    title: 'Edukasi Mental Health',
    description: 'Artikel dan modul interaktif tentang mengenal diri, relasi, stress, anxiety, dan self care.',
    href: '/edukasi',
    bg: 'var(--primary-bg)',
  },
  {
    icon: '🎮',
    title: 'Games Edukatif',
    description: 'Belajar tentang kesehatan mental sambil bermain game seru di platform Roblox.',
    href: '/games',
    bg: 'var(--warm-bg)',
  },
  {
    icon: '💬',
    title: 'Curhat Aman',
    description: 'Ceritakan perasaanmu secara anonim atau terhubung langsung dengan konselor sebaya.',
    href: '/curhat',
    bg: 'var(--accent-bg)',
  },
  {
    icon: '🤝',
    title: 'Jaringan PIK-R',
    description: 'Temukan Pusat Informasi dan Konseling Remaja di kecamatanmu untuk pendampingan langsung.',
    href: '/curhat/wilayah',
    bg: 'var(--secondary-bg)',
  },
];

export default function FeaturesSection() {
  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <SectionHeader
          badge="Apa yang Bisa Kamu Lakukan"
          badgeVariant="primary"
          title="Empat Cara untuk Mendukung Kesejahteraanmu"
          description="Pilih yang paling sesuai dengan kebutuhanmu saat ini."
        />

        <div className={styles.featuresGrid}>
          {features.map((feature, idx) => (
            <Link key={idx} href={feature.href} className={styles.featureCard}>
              <div className={styles.featureIcon} style={{ backgroundColor: feature.bg }}>
                {feature.icon}
              </div>
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDesc}>{feature.description}</p>
              </div>
              <span className={styles.featureArrow}>→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
