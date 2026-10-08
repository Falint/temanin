'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { regions } from '@/lib/data/regions';
import styles from '@/components/curhat/curhat.module.css';
import CurhatSteps from '@/components/curhat/CurhatSteps';
import TelegramStartButton from '@/components/curhat/TelegramStartButton';

export default function WilayahContent({ partners }) {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'anonim';
  const sessionId = searchParams.get('session') || '';
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const filteredPartners = useMemo(() => {
    return selectedDistrict ? partners.filter((partner) => partner.district === selectedDistrict) : partners;
  }, [partners, selectedDistrict]);

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
<CurhatSteps current={3} />
        <p>Setelah memilih PIK-R, buka bot dan tekan Start di Telegram. Waktu balasan mengikuti jadwal pengurus.</p>
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
          <p className={styles.pikrCount} role="status">
            {filteredPartners.length} PIK-R ditemukan
            {selectedDistrict ? ` di ${getDistrictName(selectedDistrict)}` : ''}
          </p>

          {filteredPartners.length > 0 ? (
            <div className={styles.pikrGrid}>
              {filteredPartners.map((partner) => (
                <div
                  key={partner.id}
                  className={styles.pikrCard}
                >
                  <div className={styles.pikrCardHeader}>
                    <h3 className={styles.pikrCardName}>{partner.name}</h3>
                    <span className="badge badge-available">Telegram terhubung</span>
                  </div>
                  <p className={styles.pikrCardDistrict}>
                    📍 {getDistrictName(partner.district)}, {partner.city}
                  </p>
                  <p className={styles.pikrCardDesc}>{partner.description}</p>

                  <div className={styles.pikrCardActions}>
                    {sessionId ? <TelegramStartButton pikrId={partner.id} mode={mode} sessionId={sessionId} /> : <Link href="/curhat" className="btn btn-primary">Mulai dari pilihan mode →</Link>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="icon">📍</span>
              <h3>Tidak ada PIK-R di wilayah ini</h3>
              <p>Coba pilih kecamatan lain atau lihat semua PIK-R yang tersedia.</p>
              {selectedDistrict && <button className="btn btn-outline" onClick={() => setSelectedDistrict('')}>Lihat semua wilayah</button>}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
