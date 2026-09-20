'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '@/components/curhat/curhat.module.css';

const EMERGENCY_HOTLINES = [
  { name: 'Kemenkes SEJIWA (Krisis Jiwa)', number: '119 ext 8', tel: 'tel:119,8' },
  { name: 'Panggilan Darurat Indonesia', number: '112', tel: 'tel:112' },
  { name: 'Yayasan Pulih (Trauma/Konseling)', number: '0811-8436-633', tel: 'tel:08118436633' },
  { name: 'Halo Kemenkes', number: '1500-567', tel: 'tel:1500567' },
];

const FAQS = [
  {
    q: 'Apakah layanan curhat TEMANIN berbayar?',
    a: 'Tidak. Layanan ini 100% gratis untuk seluruh remaja Kota Depok sebagai inisiatif dukungan kesehatan mental sebaya.',
  },
  {
    q: 'Siapa yang akan mendengarkan cerita saya?',
    a: 'Kamu akan terhubung dengan konselor sebaya terlatih dari jejaring PIK-R (Pusat Informasi dan Konseling Remaja) Kota Depok yang seusia denganmu dan siap mendengarkan tanpa menghakimi.',
  },
  {
    q: 'Apakah cerita saya akan disebarkan ke sekolah atau orang tua?',
    a: 'Tidak. Kami menjunjung tinggi kerahasiaan. Dalam mode Anonim, kami bahkan tidak meminta nama aslimu.',
  },
  {
    q: 'Apa perbedaan mode Anonim dan Terhubung?',
    a: 'Mode Anonim hanya memerlukan nama panggilan acak untuk kenyamanan privasimu. Mode Terhubung memungkinkan kamu mencantumkan kontak opsional jika membutuhkan pendampingan rujukan lanjutan.',
  },
];

export default function CurhatPage() {
  const [hasConsented, setHasConsented] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div>
      {/* Page Header */}
      <header className={`${styles.pageHeader} ${styles.pageHeaderGradient}`}>
        <div className="container">
          <span className={styles.pageHeaderBadge}>💬 Ruang Curhat & Konseling Sebaya</span>
          <h1 className={styles.pageTitle}>Kamu Tidak Sendirian di Sini</h1>
          <p className={styles.pageDesc}>
            Tempat aman untuk bercerita, melepaskan beban, dan didengarkan oleh konselor sebaya PIK-R Kota Depok.
          </p>
        </div>
      </header>

      <section className={styles.modeSection}>
        <div className="container" style={{ maxWidth: '840px' }}>

          {/* 1. CRISIS WARNING BANNER (Kritikal Keselamatan) */}
          <div className={styles.crisisBanner} role="alert">
            <div className={styles.crisisHeader}>
              <span className={styles.crisisIcon}>⚠️</span>
              <h2 className={styles.crisisTitle}>Pemberitahuan Penting: Bukan Layanan Darurat</h2>
            </div>
            <p className={styles.crisisDesc}>
              TEMANIN adalah layanan <strong>konseling sebaya (peer counseling)</strong> untuk mendengarkan keluh kesah dan berbagi cerita sehari-hari. 
              Jika kamu atau seseorang yang kamu kenal sedang dalam kondisi krisis hebat, pikiran untuk menyakiti diri, atau situasi darurat medis, 
              mohon segera hubungi nomor bantuan resmi di bawah ini:
            </p>
            <div className={styles.hotlineGrid}>
              {EMERGENCY_HOTLINES.map((hotline, idx) => (
                <a
                  key={idx}
                  href={hotline.tel}
                  className={styles.hotlineCard}
                  title={`Telepon ${hotline.name}`}
                >
                  <span className={styles.hotlineName}>{hotline.name}</span>
                  <span className={styles.hotlineNumber}>{hotline.number} 📞</span>
                </a>
              ))}
            </div>
          </div>

          {/* 2. BATASAN & PENJELASAN LAYANAN */}
          <div className={styles.scopeSection}>
            <h3 className={styles.scopeTitle}>Pedoman & Batasan Layanan</h3>
            <div className={styles.scopeGrid}>
              <div className={styles.scopeCardCan}>
                <div className={styles.scopeHeader} style={{ color: '#059669' }}>
                  <span>✅</span> Yang Bisa Kami Bantu
                </div>
                <ul className={styles.scopeList}>
                  <li>Mendengarkan ceritamu dengan penuh empati dan tanpa penghakiman.</li>
                  <li>Mendiskusikan stres sekolah, pertemanan, keluarga, dan rasa cemas sehari-hari.</li>
                  <li>Membantu mencari sudut pandang baru dari sudut pandang teman sebaya.</li>
                  <li>Memberikan rujukan ke fasilitas kesehatan jika diperlukan.</li>
                </ul>
              </div>

              <div className={styles.scopeCardCannot}>
                <div className={styles.scopeHeader} style={{ color: '#D97706' }}>
                  <span>ℹ️</span> Batasan Kami
                </div>
                <ul className={styles.scopeList}>
                  <li>Bukan diagnosis klinis, psikiatri, atau psikoterapi medis.</li>
                  <li>Tidak melayani penanganan gawat darurat (krisis bunuh diri/cedera fisik).</li>
                  <li>Tidak memberikan resep obat-obatan.</li>
                  <li>Waktu respons mengikuti jadwal piket relawan konselor sebaya.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 3. FAQ SINGKAT */}
          <div className={styles.faqSection}>
            <h3 className={styles.faqSectionTitle}>Pertanyaan yang Sering Diajukan (FAQ)</h3>
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className={styles.faqItem}
                onClick={() => toggleFaq(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && toggleFaq(idx)}
              >
                <div className={styles.faqQuestion}>
                  <span>{faq.q}</span>
                  <span>{openFaq === idx ? '▲' : '▼'}</span>
                </div>
                {openFaq === idx && (
                  <div className={styles.faqAnswer}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 4. CHECKBOX PERSETUJUAN (CONSENT) */}
          <div className={styles.consentBox}>
            <label className={styles.consentLabel}>
              <input
                type="checkbox"
                id="consentCheckbox"
                className={styles.consentCheckbox}
                checked={hasConsented}
                onChange={(e) => setHasConsented(e.target.checked)}
              />
              <span>
                Saya telah membaca dan memahami bahwa TEMANIN adalah layanan konseling sebaya dan <strong>bukan layanan darurat medis</strong>. Saya bersedia mematuhi pedoman kenyamanan bersama.
              </span>
            </label>

            {!hasConsented && (
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                👆 <em>Centang kotak persetujuan di atas untuk memilih mode curhat.</em>
              </p>
            )}
          </div>

          {/* 5. PILIH MODE CURHAT (Terbuka setelah persetujuan) */}
          <div className={hasConsented ? styles.modeWrapperUnlocked : styles.modeWrapperLocked}>
            <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
              Pilih Cara Kamu Ingin Bercerita:
            </h3>

            <div className={styles.modeGrid}>
              {/* Mode Anonim */}
              <Link
                href={hasConsented ? '/curhat/profil?mode=anonim' : '#'}
                className={styles.modeCard}
                tabIndex={hasConsented ? 0 : -1}
                aria-disabled={!hasConsented}
              >
                <span className={styles.modeIcon}>🕊️</span>
                <h4 className={styles.modeTitle}>Anonim</h4>
                <p className={styles.modeDesc}>
                  Ceritakan masalahmu secara bebas. Kami hanya membutuhkan nama panggilan tanpa identitas asli.
                </p>
                <span className={`${styles.modeBadge} ${styles.modeBadgeAnon}`}>
                  🔒 Privasi 100% Terlindungi
                </span>
              </Link>

              {/* Mode Terhubung */}
              <Link
                href={hasConsented ? '/curhat/profil?mode=terhubung' : '#'}
                className={styles.modeCard}
                tabIndex={hasConsented ? 0 : -1}
                aria-disabled={!hasConsented}
              >
                <span className={styles.modeIcon}>🤝</span>
                <h4 className={styles.modeTitle}>Terhubung</h4>
                <p className={styles.modeDesc}>
                  Sediakan kontak opsional jika kamu menginginkan follow-up atau pendampingan konseling berkala.
                </p>
                <span className={`${styles.modeBadge} ${styles.modeBadgeTerhubung}`}>
                  👤 Pendampingan Personal
                </span>
              </Link>
            </div>
          </div>

          {/* Privacy Footnote */}
          <div className={styles.privacyNotice}>
            <span className={styles.privacyNoticeIcon}>🔐</span>
            <p className={styles.privacyNoticeText}>
              Kerahasiaan percakapanmu dilindungi oleh kode etik konselor sebaya PIK-R Kota Depok. Data sesi konseling tidak pernah dibagikan kepada pihak ketiga.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
