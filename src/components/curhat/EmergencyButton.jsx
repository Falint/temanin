'use client';

import { useState, useEffect } from 'react';
import styles from './EmergencyButton.module.css';

const EMERGENCY_CONTACTS = [
  {
    name: 'Kemenkes RI SEJIWA',
    subtitle: 'Layanan Pencegahan Bunuh Diri & Krisis Jiwa (24 Jam)',
    number: '119 ext 8',
    tel: 'tel:119,8',
  },
  {
    name: 'Panggilan Darurat Indonesia / Depok',
    subtitle: 'Ambulans, Polisi, Damkar, & Penyelamatan Gawat Darurat',
    number: '112',
    tel: 'tel:112',
  },
  {
    name: 'Yayasan Pulih',
    subtitle: 'Konseling Psikologis Penanganan Trauma & Krisis Emosional',
    number: '0811-8436-633',
    tel: 'tel:08118436633',
  },
  {
    name: 'Halo Kemenkes',
    subtitle: 'Informasi Rujukan Layanan Kesehatan Mental & Medis',
    number: '1500-567',
    tel: 'tel:1500567',
  },
];

export default function EmergencyButton({ variant = 'floating' }) {
  const [isOpen, setIsOpen] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Trigger Button */}
      {variant === 'header' ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={styles.emergencyHeaderBtn}
          title="Bantuan Krisis Darurat"
          aria-label="Bantuan Krisis Darurat"
        >
          <span>🚨</span>
          <span>Darurat</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={styles.emergencyFloatingBtn}
          title="Hubungi Bantuan Darurat Krisis"
          aria-label="Hubungi Bantuan Darurat Krisis"
        >
          <span>🚨</span>
          <span>Bantuan Krisis Darurat</span>
        </button>
      )}

      {/* Emergency Modal */}
      {isOpen && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="emergency-modal-title"
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleWrapper}>
                <span className={styles.modalIcon}>🚨</span>
                <h3 id="emergency-modal-title" className={styles.modalTitle}>
                  Bantuan Darurat Krisis
                </h3>
              </div>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setIsOpen(false)}
                aria-label="Tutup jendela darurat"
              >
                ✕
              </button>
            </div>

            <p className={styles.modalDesc}>
              Jika kamu merasa tidak aman, memiliki dorongan menyakiti diri, atau membutuhkan pertolongan medis/psikiatri darurat segera, mohon hubungi layanan resmi berikut:
            </p>

            <div className={styles.hotlineList}>
              {EMERGENCY_CONTACTS.map((contact, idx) => (
                <a
                  key={idx}
                  href={contact.tel}
                  className={styles.hotlineItem}
                  title={`Hubungi ${contact.name}`}
                >
                  <div className={styles.hotlineDetails}>
                    <span className={styles.hotlineTitle}>{contact.name}</span>
                    <span className={styles.hotlineSubtitle}>{contact.subtitle}</span>
                  </div>
                  <div className={styles.hotlineAction}>
                    <span>{contact.number}</span>
                    <span>📞</span>
                  </div>
                </a>
              ))}
            </div>

            <div className={styles.modalFooter}>
              <button
                type="button"
                className={styles.returnBtn}
                onClick={() => setIsOpen(false)}
              >
                Kembali ke Percakapan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
