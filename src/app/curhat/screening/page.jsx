'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '@/components/curhat/curhat.module.css';
import PageLoading from '@/components/shared/PageLoading';

const TOPICS = [
  { id: 'school', label: 'Sekolah, kuliah, atau pekerjaan', icon: '📚' },
  { id: 'family', label: 'Keluarga', icon: '🏠' },
  { id: 'friendship', label: 'Pertemanan', icon: '🫂' },
  { id: 'relationship', label: 'Hubungan atau percintaan', icon: '💞' },
  { id: 'emotion', label: 'Emosi, cemas, atau stres', icon: '🌧️' },
  { id: 'self', label: 'Kepercayaan dan penerimaan diri', icon: '🌱' },
  { id: 'digital', label: 'Media sosial atau cyberbullying', icon: '📱' },
  { id: 'other', label: 'Topik lainnya', icon: '💬' },
];

const CONDITION_LEVELS = [
  { value: 1, label: 'Cukup tenang' },
  { value: 2, label: 'Sedikit terbebani' },
  { value: 3, label: 'Cukup berat' },
  { value: 4, label: 'Sangat berat' },
  { value: 5, label: 'Butuh bantuan segera' },
];

function getPriorityLabel(score) {
  if (score <= 2) return 'LOW';
  if (score === 3) return 'MEDIUM';
  if (score === 4) return 'HIGH';
  return 'URGENT';
}

function ScreeningContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') === 'terhubung' ? 'terhubung' : 'anonim';
  const sessionId = searchParams.get('session') || '';
  const [topic, setTopic] = useState('');
  const [conditionScore, setConditionScore] = useState(null);
  const [error, setError] = useState('');

  const selectedTopic = TOPICS.find((item) => item.id === topic);
  const selectedCondition = CONDITION_LEVELS.find((item) => item.value === conditionScore);
  const needsImmediateHelp = conditionScore === 5;

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    if (!selectedTopic || !selectedCondition) {
      setError('Pilih satu topik dan kondisi yang paling menggambarkan keadaanmu saat ini.');
      return;
    }

    const screeningData = {
      sessionId,
      category: selectedTopic.id,
      categoryLabel: selectedTopic.label,
      raw_answer: selectedCondition.value,
      conditionLabel: selectedCondition.label,
      priority_label: getPriorityLabel(selectedCondition.value),
      createdAt: new Date().toISOString(),
    };

    try {
      sessionStorage.setItem('temanin_screening', JSON.stringify(screeningData));
    } catch {
      // Continue gracefully if browser storage is unavailable.
    }

    router.push(`/curhat/wilayah?mode=${mode}${sessionId ? `&session=${sessionId}` : ''}`);
  };

  return (
    <div>
      <header className={`${styles.pageHeader} ${styles.pageHeaderSoft}`}>
        <div className="container">
          <span className={`${styles.pageHeaderBadge} ${styles.pageHeaderBadgeDark}`}>
            Langkah 2 dari 3
          </span>
          <h1 className={`${styles.pageTitle} ${styles.pageTitleDark}`}>Ceritakan Kondisimu Singkat</h1>
          <p className={`${styles.pageDesc} ${styles.pageDescDark}`}>
            Dua jawaban ini membantu konselor memahami konteks awal sebelum kamu mulai bercerita.
          </p>
        </div>
      </header>

      <section className={styles.profileSection}>
        <div className="container">
          <form className={`${styles.profileCard} ${styles.screeningCard}`} onSubmit={handleSubmit}>
            <div className={styles.screeningNote}>
              Hasil screening hanya menjadi informasi awal untuk konselor, bukan diagnosis medis dan tidak mengubah pilihan PIK-R kamu.
            </div>

            <fieldset className={styles.screeningFieldset}>
              <legend className={styles.screeningLegend}>1. Topik apa yang paling ingin kamu ceritakan?</legend>
              <div className={styles.screeningOptions}>
                {TOPICS.map((item) => (
                  <label
                    key={item.id}
                    className={`${styles.screeningOption} ${topic === item.id ? styles.screeningOptionSelected : ''}`}
                  >
                    <input
                      type="radio"
                      name="topic"
                      value={item.id}
                      checked={topic === item.id}
                      onChange={(event) => setTopic(event.target.value)}
                    />
                    <span aria-hidden="true">{item.icon}</span>
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className={styles.screeningFieldset}>
              <legend className={styles.screeningLegend}>2. Seberapa berat kondisimu saat ini?</legend>
              <p className={styles.formHelpText}>Pilih angka 1 sampai 5 yang paling mendekati perasaanmu.</p>
              <div className={styles.conditionScale}>
                {CONDITION_LEVELS.map((item) => (
                  <label
                    key={item.value}
                    className={`${styles.conditionOption} ${
                      conditionScore === item.value ? styles.conditionOptionSelected : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="condition"
                      value={item.value}
                      checked={conditionScore === item.value}
                      onChange={() => setConditionScore(item.value)}
                    />
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {needsImmediateHelp && (
              <div className={styles.urgentNotice} role="alert">
                <strong>Kamu berhak mendapat bantuan segera.</strong>
                <span>
                  TEMANIN bukan layanan darurat. Jika kamu sedang tidak aman atau ingin menyakiti diri, segera hubungi{' '}
                  <a href="tel:112">112</a> atau <a href="tel:119,8">119 ext 8</a>, dan dekati orang dewasa yang kamu percaya.
                </span>
              </div>
            )}

            {error && <div className={styles.screeningError} role="alert">{error}</div>}

            <button type="submit" className={`btn btn-primary btn-lg ${styles.formSubmit}`}>
              Simpan dan Pilih Wilayah PIK-R →
            </button>

            <div className={styles.screeningBack}>
              <Link href={`/curhat/profil?mode=${mode}`}>← Kembali ke profil</Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default function ScreeningPage() {
  return (
    <Suspense fallback={<PageLoading message="Menyiapkan screening..." />}>
      <ScreeningContent />
    </Suspense>
  );
}
