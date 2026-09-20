'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getPikrById } from '@/lib/data/pikr';
import styles from '@/components/curhat/curhat.module.css';

function KonselingContent() {
  const searchParams = useSearchParams();
  const pikrId = searchParams.get('pikr') || '';
  const partner = getPikrById(pikrId);
  const [showSchedule, setShowSchedule] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const partnerName = partner ? partner.name : 'PIK-R';

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      {/* Page Header */}
      <header className={`${styles.pageHeader} ${styles.pageHeaderSoft}`}>
        <div className="container">
          <span className={`${styles.pageHeaderBadge} ${styles.pageHeaderBadgeDark}`}>
            🏥 Konseling — {partnerName}
          </span>
          <h1 className={`${styles.pageTitle} ${styles.pageTitleDark}`}>
            Butuh Bantuan Lebih Lanjut?
          </h1>
          <p className={`${styles.pageDesc} ${styles.pageDescDark}`}>
            Pilih jenis bantuan yang kamu butuhkan. Semua layanan bersifat rahasia.
          </p>
        </div>
      </header>

      {/* Options */}
      <section className={styles.konselingSection}>
        <div className="container">
          <div className={styles.konselingGrid}>
            <div className={styles.konselingCard}>
              <span className={styles.konselingIcon}>📞</span>
              <h2 className={styles.konselingTitle}>Hubungi Professional</h2>
              <p className={styles.konselingDesc}>
                Terhubung dengan konselor atau psikolog profesional untuk mendapatkan bantuan yang lebih mendalam.
              </p>
              <Link href="/curhat" className="btn btn-primary">
                Mulai Konsultasi
              </Link>
            </div>

            <div className={styles.konselingCard}>
              <span className={styles.konselingIcon}>📅</span>
              <h2 className={styles.konselingTitle}>Jadwalkan Konseling Offline</h2>
              <p className={styles.konselingDesc}>
                Buat janji untuk bertemu langsung dengan konselor di lokasi PIK-R terdekat.
              </p>
              <button
                className="btn btn-secondary"
                onClick={() => setShowSchedule(true)}
              >
                Jadwalkan
              </button>
            </div>
          </div>

          {/* Schedule Form (Demo) */}
          {showSchedule && !submitted && (
            <div className={styles.scheduleForm}>
              <div className={styles.demoNotice} style={{ marginBottom: '1.5rem' }}>
                ⚠️ Demo Scheduling — belum terhubung dengan sistem penjadwalan.
              </div>
              <h3 className={styles.scheduleTitle}>Jadwalkan Konseling Offline</h3>
              <p className={styles.scheduleDesc}>Isi form berikut untuk membuat janji.</p>

              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="schedule-name">Nama (opsional)</label>
                  <input
                    type="text"
                    id="schedule-name"
                    className="input"
                    placeholder="Boleh diisi, boleh tidak"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="schedule-date">Tanggal Preferensi</label>
                  <input
                    type="date"
                    id="schedule-date"
                    className="input"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="schedule-time">Waktu Preferensi</label>
                  <select id="schedule-time" className="select">
                    <option value="">Pilih waktu</option>
                    <option value="pagi">Pagi (08:00 - 12:00)</option>
                    <option value="siang">Siang (12:00 - 15:00)</option>
                    <option value="sore">Sore (15:00 - 17:00)</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="schedule-notes">Catatan (opsional)</label>
                  <textarea
                    id="schedule-notes"
                    className="textarea"
                    placeholder="Ceritakan sedikit tentang apa yang ingin kamu konsultasikan..."
                    rows={3}
                  />
                </div>
                <button type="submit" className={`btn btn-primary ${styles.formSubmit}`}>
                  Kirim Permintaan (Demo)
                </button>
              </form>
            </div>
          )}

          {/* Submitted state */}
          {submitted && (
            <div className={styles.scheduleForm} style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>✅</span>
              <h3 className={styles.scheduleTitle}>Permintaan Terkirim (Demo)</h3>
              <p className={styles.scheduleDesc}>
                Pada versi live, tim PIK-R akan menghubungimu untuk mengonfirmasi jadwal konseling.
              </p>
              <Link href="/curhat" className="btn btn-outline" style={{ marginTop: '1rem' }}>
                Kembali ke Curhat
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function KonselingPage() {
  return (
    <Suspense fallback={
      <div style={{ padding: '8rem 2rem', textAlign: 'center' }}>
        <p>Memuat...</p>
      </div>
    }>
      <KonselingContent />
    </Suspense>
  );
}
