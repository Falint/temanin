import Link from 'next/link';
import Hero from '@/components/landing/Hero';
import WhySection from '@/components/landing/WhySection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import EducationPreview from '@/components/landing/EducationPreview';
import GamesPreview from '@/components/landing/GamesPreview';
import CurhatCTA from '@/components/landing/CurhatCTA';
import PikrNetwork from '@/components/landing/PikrNetwork';
import HowItWorks from '@/components/landing/HowItWorks';
import styles from '@/components/landing/landing.module.css';

export default function Home() {
  return (
    <>
      <Hero />
      <WhySection />
      <FeaturesSection />
      <EducationPreview />
      <GamesPreview />
      <CurhatCTA />
      <PikrNetwork />
      <HowItWorks />

      {/* Final CTA */}
      <section className={styles.finalCta}>
        <div className="container">
          <div className={styles.finalCtaInner}>
            <h2 className={styles.finalCtaTitle}>
              Siap Memulai Perjalananmu?
            </h2>
            <p className={styles.finalCtaDesc}>
              Mulai dari yang paling nyaman untukmu. Tidak ada tekanan, tidak ada penilaian — hanya dukungan.
            </p>
            <div className={styles.finalCtaButtons}>
              <Link href="/curhat" className="btn btn-primary btn-lg">
                💬 Mulai Curhat
              </Link>
              <Link href="/edukasi" className="btn btn-ghost" style={{ color: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.3)', border: '2px solid rgba(255,255,255,0.3)' }}>
                📖 Jelajahi Edukasi
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
