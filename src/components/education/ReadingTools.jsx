'use client';

import { useEffect, useState } from 'react';
import styles from './education.module.css';

export default function ReadingTools() {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  useEffect(() => {
    const update = () => {
      const body = document.getElementById('article-body');
      if (!body) return;
      const top = body.getBoundingClientRect().top + window.scrollY;
      const distance = body.offsetHeight - window.innerHeight + 100;
      setProgress(Math.round(Math.max(0, Math.min(100, (window.scrollY - top + 100) / Math.max(1, distance) * 100))));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href.split('#')[0]);
      setMessage('Tautan berhasil disalin.');
    } catch {
      setMessage('Belum bisa menyalin. Salin alamat halaman dari browsermu.');
    }
  }

  return <div className={styles.readingTools}>
    <div className={styles.pageProgress} style={{ transform: `scaleX(${progress / 100})` }} aria-hidden="true" />
    <div className={styles.readingProgress}><progress max="100" value={progress} aria-label="Progres membaca artikel" /><span>{progress}% terbaca</span></div>
    <button type="button" onClick={copyLink}>Salin tautan ↗</button>
    <span className={styles.copyStatus} role="status">{message}</span>
  </div>;
}
