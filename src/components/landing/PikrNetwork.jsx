import Link from 'next/link';
import SectionHeader from '@/components/shared/SectionHeader';
import { pikrPartners } from '@/lib/data/pikr';
import { regions } from '@/lib/data/regions';
import styles from './landing.module.css';

export default function PikrNetwork() {
  // Show first 6 available PIK-R partners
  const previewPartners = pikrPartners.filter((p) => p.isAvailable).slice(0, 6);

  const getDistrictName = (districtId) => {
    const region = regions.find((r) => r.id === districtId);
    return region ? region.name : districtId;
  };

  return (
    <section className={styles.pikrSection}>
      <div className="container">
        <SectionHeader
          badge="Jaringan PIK-R"
          badgeVariant="secondary"
          title="Konselor Sebaya di Dekatmu"
          description="Pusat Informasi dan Konseling Remaja (PIK-R) tersebar di berbagai kecamatan di Kota Depok."
        />

        <div className={styles.pikrGrid}>
          {previewPartners.map((partner) => (
            <div key={partner.id} className={styles.pikrCard}>
              <div className={styles.pikrCardHeader}>
                <h3 className={styles.pikrCardName}>{partner.name}</h3>
                <span className="badge badge-available">Available</span>
              </div>
              <p className={styles.pikrCardDistrict}>📍 {getDistrictName(partner.district)}, {partner.city}</p>
              <div className={styles.pikrCardServices}>
                {partner.chatEnabled && <span className={styles.pikrServiceBadge}>💬 Chat</span>}
                {partner.telegramEnabled && <span className={styles.pikrServiceBadge}>📱 Telegram</span>}
                {partner.offlineCounselingEnabled && <span className={styles.pikrServiceBadge}>🏥 Konseling</span>}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.pikrCta}>
          <Link href="/curhat/wilayah" className="btn btn-secondary">
            Cari PIK-R di Wilayahmu →
          </Link>
        </div>
      </div>
    </section>
  );
}
