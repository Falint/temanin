'use client';

import { useState } from 'react';
import styles from '@/components/curhat/curhat.module.css';

export default function TelegramStartButton({ pikrId, mode, sessionId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [url, setUrl] = useState('');

  async function start() {
    setError('');
    setUrl('');
    let profile;
    try {
      profile = JSON.parse(sessionStorage.getItem('temanin_user_profile') || 'null');
    } catch {
      profile = null;
    }
    if (!profile || profile.sessionId !== sessionId || profile.mode !== mode) {
      setError('Mulai ulang dari halaman profil agar sesi terhubung dengan pilihanmu.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/telegram/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pikrId, mode, displayName: profile.displayName }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Tidak dapat membuat sesi.');
      setUrl(data.url);
    } catch (cause) {
      setError(cause.message);
    } finally {
      setLoading(false);
    }
  }

  return <div>
    {url ? (
      <a href={url} target="_blank" rel="noopener noreferrer" className={`${styles.pikrActionBtn} ${styles.pikrActionTelegram}`}>
        Buka bot Telegram ↗
      </a>
    ) : (
      <button type="button" onClick={start} disabled={loading} className={`${styles.pikrActionBtn} ${styles.pikrActionTelegram}`}>
        {loading ? 'Menyiapkan...' : '📱 Mulai via Telegram'}
      </button>
    )}
    {error && <p role="alert" style={{ color: '#b42318', fontSize: '0.8rem', marginTop: '0.5rem' }}>{error}</p>}
  </div>;
}
