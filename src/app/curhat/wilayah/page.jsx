'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { pikrPartners, getPikrByDistrict } from '@/lib/data/pikr';
import { regions } from '@/lib/data/regions';
import styles from '@/components/curhat/curhat.module.css';
import UnavailableNotice from '@/components/shared/UnavailableNotice';
import PageLoading from '@/components/shared/PageLoading';

function WilayahContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'anonim';
  const sessionId = searchParams.get('session') || '';
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const filteredPartners = useMemo(() => {
    return getPikrByDistrict(selectedDistrict);
  }, [selectedDistrict]);

  const getDistrictName = (districtId) => {
    const region = regions.find((r) => r.id === districtId);
    return region ? region.name : districtId;
  };

  return (
    <div>
      {/* Page Header */}
      <header className={`${styles.pageHeader} ${styles.pageHeaderSoft}`}>
        <div className="container">
          <span className={`${styles.pageHeaderBadge} ${styles.pageHeaderBadgeDark}`}>
            {mode === 'anonim' ? '🕊️ Mode Anonim' : '🤝 Mode Terhubung'}
          </span>
          <h1 className={`${styles.pageTitle} ${styles.pageTitleDark}`}>
            Pilih Wilayahmu
          </h1>
          <p className={`${styles.pageDesc} ${styles.pageDescDark}`}>
            Temukan PIK-R terdekat di kecamatanmu untuk memulai percakapan.
          </p>
        </div>
      </header>

      <div className="container">
        {/* Region Selector */}
        <section className={styles.regionSection}>
          <div className={styles.regionSelectWrapper}>
            <label className={styles.regionLabel} htmlFor="district-select">
              Kecamatan / Wilayah
            </label>
            <select
              id="district-select"
              className="select"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              <option value="">Semua Kecamatan</option>
              {regions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* PIK-R List */}
        <section className={styles.pikrSection}>
          <p className={styles.pikrCount}>
            {filteredPartners.length} PIK-R ditemukan
            {selectedDistrict ? ` di ${getDistrictName(selectedDistrict)}` : ''}
          </p>

          {filteredPartners.length > 0 ? (
            <div className={styles.pikrGrid}>
              {filteredPartners.map((partner) => (
                <div
                  key={partner.id}
                  className={`${styles.pikrCard} ${!partner.isAvailable ? styles.pikrUnavailable : ''}`}
                >
                  <div className={styles.pikrCardHeader}>
                    <h3 className={styles.pikrCardName}>{partner.name}</h3>
                    <span className={`badge ${partner.isAvailable ? 'badge-available' : 'badge-unavailable'}`}>
                      {partner.isAvailable ? 'Available' : 'Tidak Aktif'}
                    </span>
                  </div>
                  <p className={styles.pikrCardDistrict}>
                    📍 {getDistrictName(partner.district)}, {partner.city}
                  </p>
                  <p className={styles.pikrCardDesc}>{partner.description}</p>

                  {partner.isAvailable && (
                    <div className={styles.pikrCardActions}>
                      {partner.chatEnabled && (
                        <Link
                          href={`/curhat/chat?pikr=${partner.id}&mode=${mode}${sessionId ? `&session=${sessionId}` : ''}`}
                          className={`${styles.pikrActionBtn} ${styles.pikrActionChat}`}
                        >
                          💬 Chat
                        </Link>
                      )}
                      {partner.telegramEnabled && (
                        <UnavailableNotice
                          href={partner.telegramUrl}
                          className={`${styles.pikrActionBtn} ${styles.pikrActionTelegram}`}
                          title="Kontak Telegram belum tersedia"
                          message="PIK-R ini belum memiliki tautan Telegram resmi yang terverifikasi. Gunakan pilihan Chat atau Konseling jika tersedia."
                        >
                          📱 Telegram
                        </UnavailableNotice>
                      )}
                      {partner.offlineCounselingEnabled && (
                        <Link
                          href={`/curhat/konseling?pikr=${partner.id}`}
                          className={`${styles.pikrActionBtn} ${styles.pikrActionKonseling}`}
                        >
                          🏥 Konseling
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="icon">📍</span>
              <h3>Tidak ada PIK-R di wilayah ini</h3>
              <p>Coba pilih kecamatan lain atau lihat semua PIK-R yang tersedia.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default function WilayahPage() {
  return (
    <Suspense fallback={<PageLoading message="Memuat wilayah PIK-R..." />}>
      <WilayahContent />
    </Suspense>
  );
}
