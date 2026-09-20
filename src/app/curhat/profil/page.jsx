'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '@/components/curhat/curhat.module.css';

function generateRandomSessionId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `TEMANIN-${result}`;
}

function ProfileFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get('mode') === 'terhubung' ? 'terhubung' : 'anonim';

  const [sessionId, setSessionId] = useState('');
  const [nickname, setNickname] = useState('');
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [schoolOrCampus, setSchoolOrCampus] = useState('');
  const [error, setError] = useState('');

  // Generate unique session id once on mount
  useEffect(() => {
    setSessionId(generateRandomSessionId());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'anonim') {
      if (!nickname.trim()) {
        setError('Mohon masukkan nama panggilan atau alias untuk sesi curhatmu.');
        return;
      }
    } else {
      if (!fullName.trim()) {
        setError('Mohon masukkan nama lengkap atau nama panggilanmu.');
        return;
      }
    }

    // Save profile to sessionStorage
    const profileData = {
      sessionId,
      mode,
      displayName: mode === 'anonim' ? nickname.trim() : fullName.trim(),
      contact: mode === 'terhubung' ? contact.trim() : null,
      institution: mode === 'terhubung' ? schoolOrCampus.trim() : null,
      createdAt: new Date().toISOString(),
    };

    try {
      sessionStorage.setItem('temanin_user_profile', JSON.stringify(profileData));
    } catch {
      // Graceful fallback if storage disabled
    }

    // Proceed to next step (wilayah selection)
    router.push(`/curhat/wilayah?mode=${mode}&session=${sessionId}`);
  };

  return (
    <div>
      {/* Header */}
      <header className={`${styles.pageHeader} ${styles.pageHeaderSoft}`}>
        <div className="container">
          <span className={`${styles.pageHeaderBadge} ${styles.pageHeaderBadgeDark}`}>
            {mode === 'anonim' ? '🕊️ Mode Anonim' : '🤝 Mode Terhubung'}
          </span>
          <h1 className={`${styles.pageTitle} ${styles.pageTitleDark}`}>
            {mode === 'anonim' ? 'Pengaturan Profil Anonim' : 'Informasi Profil Kamu'}
          </h1>
          <p className={`${styles.pageDesc} ${styles.pageDescDark}`}>
            {mode === 'anonim'
              ? 'Identitas aslimu tidak disimpan. Masukkan nama panggilan yang nyaman untuk didengar teman sebaya.'
              : 'Informasi ini membantu konselor sebaya memberikan pendampingan lanjutan jika kamu membutuhkannya.'}
          </p>
        </div>
      </header>

      {/* Form Section */}
      <section className={styles.profileSection}>
        <div className="container">
          <div className={styles.profileCard}>
            {/* Info Notice */}
            <div
              className={`${styles.profileNotice} ${
                mode === 'anonim' ? styles.profileNoticeAnon : styles.profileNoticeTerhubung
              }`}
            >
              <span style={{ fontSize: '1.25rem' }}>{mode === 'anonim' ? '🔒' : '💡'}</span>
              <div>
                {mode === 'anonim' ? (
                  <>
                    <strong>Privasi 100% Terjaga:</strong> Percakapanmu dikaitkan dengan ID sesi acak. Konselor tidak akan mengetahui nama asli, nomor HP, ataupun emailmu.
                  </>
                ) : (
                  <>
                    <strong>Pendampingan Personal:</strong> Informasi kontakmu hanya digunakan jika kamu memerlukan rujukan atau jadwal tindak lanjut dengan konselor.
                  </>
                )}
              </div>
            </div>

            {/* Session ID box */}
            <div className={styles.sessionIdBox}>
              <span className={styles.sessionIdLabel}>Kode Sesi Otomatis:</span>
              <span className={styles.sessionIdCode}>{sessionId || 'Membuat sesi...'}</span>
            </div>

            {error && (
              <div
                style={{
                  background: '#FFF5F5',
                  color: '#C53030',
                  border: '1px solid #FEB2B2',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.75rem 1rem',
                  fontSize: '0.875rem',
                  marginBottom: '1.25rem',
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {mode === 'anonim' ? (
                /* Form Mode Anonim */
                <div className={styles.formGroup}>
                  <label htmlFor="nickname" className={styles.formLabel}>
                    Nama Panggilan / Alias <span style={{ color: 'var(--accent)' }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="nickname"
                    className="input"
                    placeholder="Contoh: Bintang, Rian, Sahabat, KucingOren"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    maxLength={30}
                    autoFocus
                  />
                  <p className={styles.formHelpText}>
                    Boleh nama samaran atau karakter favoritmu. Konselor akan memanggilmu dengan nama ini.
                  </p>
                </div>
              ) : (
                /* Form Mode Terhubung */
                <>
                  <div className={styles.formGroup}>
                    <label htmlFor="fullName" className={styles.formLabel}>
                      Nama Lengkap / Panggilan <span style={{ color: 'var(--accent)' }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      className="input"
                      placeholder="Masukkan nama yang ingin disapa"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      maxLength={60}
                      autoFocus
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="contact" className={styles.formLabel}>
                      Nomor WhatsApp atau Email <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>(Opsional)</span>
                    </label>
                    <input
                      type="text"
                      id="contact"
                      className="input"
                      placeholder="Contoh: 0812xxxxxxx atau email@contoh.com"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                    <p className={styles.formHelpText}>
                      Hanya dihubungi jika kamu membutuhkan pengingat jadwal konseling atau pendampingan berkala.
                    </p>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="schoolOrCampus" className={styles.formLabel}>
                      Sekolah / Kampus / Komunitas di Depok <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>(Opsional)</span>
                    </label>
                    <input
                      type="text"
                      id="schoolOrCampus"
                      className="input"
                      placeholder="Contoh: SMAN 1 Depok, UI, Karang Taruna Beji"
                      value={schoolOrCampus}
                      onChange={(e) => setSchoolOrCampus(e.target.value)}
                    />
                    <p className={styles.formHelpText}>
                      Membantu mencocokkan konselor sebaya dari wilayah atau lingkungan yang paling relevan.
                    </p>
                  </div>
                </>
              )}

              <button type="submit" className={`btn btn-primary btn-lg ${styles.formSubmit}`}>
                Lanjutkan Pilih Wilayah PIK-R →
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <Link
                href="/curhat"
                style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textDecoration: 'underline' }}
              >
                ← Ganti Pilihan Mode Curhat
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: '8rem 2rem', textAlign: 'center' }}>
          <p>Menyiapkan sesi curhat...</p>
        </div>
      }
    >
      <ProfileFormContent />
    </Suspense>
  );
}
