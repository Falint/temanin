import Link from 'next/link';
import SectionHeader from '@/components/shared/SectionHeader';
import styles from './landing.module.css';

const features = [
  { icon: '💬', title: 'Ada yang siap mendengarkan.', label: 'CURHAT SEBAYA', description: 'Ceritakan perasaanmu dengan nama pilihanmu. Terhubung dengan konselor sebaya melalui Telegram.', href: '/curhat', action: 'Mulai cerita', detail: 'Namamu, pilihanmu · Sesuai jadwal piket' },
  { icon: '📖', title: 'Kenali dirimu lebih dekat.', label: 'EDUKASI', description: 'Bacaan tentang emosi, relasi, kecemasan, dan merawat diri.', href: '/edukasi', action: 'Temukan bacaan', detail: 'Baca · Pahami · Refleksikan' },
  { icon: '🎮', title: 'Pilihan kecil, cerita baru.', label: 'TEMANIN LIFE', description: 'Jalani tiga tahun SMA lewat pilihan tentang pertemanan, hubungan, dan belajar.', href: '/games', action: 'Jelajahi game', detail: '3 bab · 12 keputusan · Tanpa akun' },
  { icon: '🤝', title: 'Dukungan yang dekat.', label: 'JARINGAN PIK-R', description: 'Cari Pusat Informasi dan Konseling Remaja di wilayahmu.', href: '/curhat/wilayah', action: 'Cari PIK-R', detail: 'Terhubung dengan teman sebaya' },
];

export default function FeaturesSection() {
  return <section className={styles.featuresSection}>
    <div className="container">
      <SectionHeader badge="Ruang untuk Kamu" title="Hari ini, kamu butuh apa?" description="Pilih yang paling sesuai dengan kebutuhanmu saat ini." />
      <div className={styles.featuresGrid}>
        {features.map(feature => <Link key={feature.href} href={feature.href} className={`${styles.featureCard} soft-card`}>
          <span className={styles.featureLabel}>{feature.label}</span>
          <span className={styles.featureIcon} aria-hidden="true">{feature.icon}</span>
          <div className={styles.featureContent}><h3 className={styles.featureTitle}>{feature.title}</h3><p className={styles.featureDesc}>{feature.description}</p></div>
          <span className={styles.featureDetail}>{feature.detail}</span>
          <span className={styles.featureArrow}>{feature.action} <span aria-hidden="true">↗</span></span>
        </Link>)}
      </div>
    </div>
  </section>;
}
