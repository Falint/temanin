import Link from 'next/link';
import ExploreGuide from '@/components/landing/ExploreGuide';
import Hero from '@/components/landing/Hero';
import WhySection from '@/components/landing/WhySection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import EducationPreview from '@/components/landing/EducationPreview';
import GamesPreview from '@/components/landing/GamesPreview';
import CurhatCTA from '@/components/landing/CurhatCTA';
import styles from '@/components/landing/landing.module.css';



export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <GamesPreview />
      <EducationPreview />
      <CurhatCTA />
      <WhySection />
      <ExploreGuide />

      {/* Final CTA */}
      <section className={styles.finalCta}>
        <div className="container">
          <div className={styles.finalCtaInner}>
            <h2 className={styles.finalCtaTitle}>
              Nggak harus sekaligus.
              Satu langkah dulu.
            </h2>
            <p className={styles.finalCtaDesc}>
              Baca satu artikel, coba satu cerita, atau mulai satu percakapan. Kamu yang pilih ritmenya.
            </p>
            <div className={styles.finalCtaButtons}>
              <Link href="/curhat" className="btn btn-primary btn-lg">
                Mulai Curhat →
              </Link>
              <Link href="/edukasi" className="btn btn-ghost">
                Jelajahi Edukasi
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
