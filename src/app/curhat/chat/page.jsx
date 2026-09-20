'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getPikrById } from '@/lib/data/pikr';
import { articles } from '@/lib/data/education';
import { CHAT_STATES } from '@/lib/constants';
import styles from '@/components/curhat/curhat.module.css';
import EmergencyButton from '@/components/curhat/EmergencyButton';
import PageLoading from '@/components/shared/PageLoading';

const SESSION_STATUS = {
  WAITING: 'waiting',
  CONNECTED: 'connected',
  OUTSIDE_SCHEDULE: 'outside-schedule',
  CLOSED: 'closed',
};

const STATUS_COPY = {
  [SESSION_STATUS.WAITING]: { label: 'Menunggu konselor', detail: 'Belum ada konselor sungguhan yang menerima sesi ini.' },
  [SESSION_STATUS.CONNECTED]: { label: 'Simulasi terhubung', detail: 'Kamu sedang mencoba alur demo, bukan berbicara dengan konselor sungguhan.' },
  [SESSION_STATUS.OUTSIDE_SCHEDULE]: { label: 'Di luar jam piket', detail: 'Pesan live belum tersedia. Kamu tetap dapat mencoba simulasi.' },
  [SESSION_STATUS.CLOSED]: { label: 'Sesi selesai', detail: 'Rangkuman dan feedback tersedia di bawah.' },
};

const INITIAL_MESSAGES = [
  { id: 'welcome', type: 'in', text: 'Halo! 👋 Selamat datang di TEMANIN.', time: '10:00' },
  { id: 'intro', type: 'in', text: 'Ini adalah simulasi. Belum ada konselor sungguhan yang menerima pesanmu.', time: '10:00' },
];

const TOPIC_CATEGORY_MAP = {
  school: 'mengelola-emosi', family: 'relasi', friendship: 'dukungan-teman', relationship: 'relasi',
  emotion: 'mengelola-emosi', self: 'self-awareness', digital: 'cyberbullying', other: 'kesehatan-mental',
};

function ChatContent() {
  const searchParams = useSearchParams();
  const pikrId = searchParams.get('pikr') || '';
  const mode = searchParams.get('mode') || 'anonim';
  const sessionId = searchParams.get('session') || '';
  const partner = getPikrById(pikrId);

  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [chatState, setChatState] = useState(CHAT_STATES.READY);
  const [sessionStatus, setSessionStatus] = useState(SESSION_STATUS.WAITING);
  const [profile, setProfile] = useState(null);
  const [screening, setScreening] = useState(null);
  const [rating, setRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 8 || currentHour >= 21) setSessionStatus(SESSION_STATUS.OUTSIDE_SCHEDULE);

    try {
      const storedProfile = sessionStorage.getItem('temanin_user_profile');
      const storedScreening = sessionStorage.getItem('temanin_screening');
      const parsedProfile = storedProfile ? JSON.parse(storedProfile) : null;
      const parsedScreening = storedScreening ? JSON.parse(storedScreening) : null;
      setProfile(parsedProfile);
      setScreening(parsedScreening);

      const nextMessages = [
        {
          id: 'welcome', type: 'in',
          text: `Halo${parsedProfile?.displayName ? ` ${parsedProfile.displayName}` : ''}! 👋 Selamat datang di TEMANIN.`,
          time: '10:00',
        },
        { id: 'demo-context', type: 'in', text: 'Ini adalah simulasi. Belum ada konselor sungguhan yang menerima pesanmu.', time: '10:00' },
      ];

      if (parsedScreening?.categoryLabel && parsedScreening?.conditionLabel) {
        nextMessages.push({
          id: 'screening-context', type: 'in',
          text: `Konteks awal tersimpan: ${parsedScreening.categoryLabel}, kondisi “${parsedScreening.conditionLabel}”. Kamu boleh mulai dari bagian yang nyaman.`,
          time: '10:00',
        });
      }
      setMessages(nextMessages);
    } catch {
      // Use the default demo state when browser storage is unavailable.
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startSimulation = () => setSessionStatus(SESSION_STATUS.CONNECTED);

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text || sessionStatus !== SESSION_STATUS.CONNECTED) return;

    const userMessage = {
      id: `user-${Date.now()}`, type: 'out', text,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((current) => [...current, userMessage]);
    setInputValue('');
    setChatState(CHAT_STATES.SENDING);

    setTimeout(() => {
      setMessages((current) => [...current, {
        id: `reply-${Date.now()}`, type: 'in',
        text: 'Terima kasih sudah berbagi. Pada versi live, konselor sebaya akan merespons pesanmu secara langsung.',
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      }]);
      setChatState(CHAT_STATES.READY);
    }, 900);
  };

  const submitFeedback = (event) => {
    event.preventDefault();
    if (!rating) return;
    try {
      sessionStorage.setItem('temanin_feedback', JSON.stringify({ sessionId, rating, comment: feedbackComment.trim(), createdAt: new Date().toISOString() }));
    } catch {
      // The confirmation still works when storage is unavailable.
    }
    setFeedbackSent(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const recommendations = articles
    .filter((article) => article.category === TOPIC_CATEGORY_MAP[screening?.category])
    .concat(articles)
    .filter((article, index, list) => list.findIndex((item) => item.id === article.id) === index)
    .slice(0, 3);
  const userMessageCount = messages.filter((message) => message.type === 'out').length;
  const statusCopy = STATUS_COPY[sessionStatus];
  const partnerName = partner ? partner.name : 'Konselor Sebaya';

  if (sessionStatus === SESSION_STATUS.CLOSED) {
    return <div className={styles.postChatPage}>
      <div className={`container ${styles.postChatContainer}`}>
        <span className={styles.postChatIcon}>🌱</span>
        <h1>Sesi Demo Selesai</h1>
        <p>Terima kasih sudah mencoba alur TEMANIN. Rangkuman ini hanya tersimpan pada sesi browsermu.</p>

        <section className={styles.sessionSummary}>
          <h2>Rangkuman Sesi</h2>
          <dl>
            <div><dt>Nama panggilan</dt><dd>{profile?.displayName || 'Tidak tersedia'}</dd></div>
            <div><dt>Topik awal</dt><dd>{screening?.categoryLabel || 'Tidak tersedia'}</dd></div>
            <div><dt>Kondisi awal</dt><dd>{screening?.conditionLabel || 'Tidak tersedia'}</dd></div>
            <div><dt>Pesan terkirim</dt><dd>{userMessageCount} pesan demo</dd></div>
          </dl>
        </section>

        <section className={styles.recommendationSection}>
          <h2>Artikel yang Mungkin Membantu</h2>
          <div className={styles.recommendationGrid}>{recommendations.map((article) => <Link key={article.id} href={`/edukasi/${article.id}`} className={styles.recommendationCard}><span>{article.emoji}</span><strong>{article.title}</strong><small>{article.readTime}</small></Link>)}</div>
        </section>

        <section className={styles.feedbackSection}>
          <h2>Bagaimana pengalamanmu?</h2>
          {feedbackSent ? <div className={styles.feedbackSuccess}>✅ Terima kasih. Feedback demo tersimpan untuk sesi browser ini.</div> : <form onSubmit={submitFeedback}>
            <div className={styles.ratingRow} role="group" aria-label="Rating pengalaman">{[1, 2, 3, 4, 5].map((value) => <button key={value} type="button" onClick={() => setRating(value)} className={rating >= value ? styles.ratingActive : ''} aria-label={`${value} dari 5`}>★</button>)}</div>
            <textarea className="input" rows="4" value={feedbackComment} onChange={(event) => setFeedbackComment(event.target.value)} placeholder="Komentar tambahan (opsional)" />
            <button type="submit" className="btn btn-primary" disabled={!rating}>Kirim Feedback</button>
          </form>}
        </section>

        <div className={styles.postChatActions}><Link href="/edukasi" className="btn btn-secondary">Baca Edukasi</Link><Link href="/" className="btn btn-primary">Kembali ke Beranda</Link></div>
      </div>
      <EmergencyButton variant="floating" />
    </div>;
  }

  return <div className={styles.chatPage}>
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <Link href={`/curhat/wilayah?mode=${mode}${sessionId ? `&session=${sessionId}` : ''}`} className={styles.chatBack} aria-label="Kembali">←</Link>
        <div className={styles.chatHeaderInfo}><h2 className={styles.chatHeaderName}>{partnerName}</h2><p className={styles.chatHeaderStatus}>{chatState === CHAT_STATES.SENDING ? 'Balasan demo sedang dibuat...' : statusCopy.label}</p></div>
        <EmergencyButton variant="header" />
        <span className={`badge ${mode === 'anonim' ? 'badge-available' : 'badge-primary'} ${styles.chatModeBadge}`}>{mode === 'anonim' ? '🕊️ Anonim' : '👤 Terhubung'}</span>
      </div>

      <div className={`${styles.sessionStatus} ${styles[`sessionStatus_${sessionStatus}`]}`}>
        <div><strong>{statusCopy.label}</strong><span>{statusCopy.detail}</span></div>
        {sessionStatus !== SESSION_STATUS.CONNECTED && <button type="button" className="btn btn-secondary btn-sm" onClick={startSimulation}>Mulai Simulasi</button>}
      </div>

      <div className={styles.demoNotice} role="alert"><strong>SIMULASI:</strong> Pesan di halaman ini tidak dikirim kepada konselor, PIK-R, atau layanan darurat.</div>

      <div className={styles.chatMessages}>
        {messages.map((message) => <div key={message.id} className={message.type === 'in' ? styles.chatMessageIn : styles.chatMessageOut}><p className={styles.chatMessageText}>{message.text}</p><span className={styles.chatMessageTime}>{message.time}</span></div>)}
        {chatState === CHAT_STATES.SENDING && <div className={styles.chatMessageIn}><p className={styles.chatMessageText} style={{ opacity: 0.6 }}>Sedang mengetik...</p></div>}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.chatInputArea}>
        <input type="text" className={styles.chatInput} placeholder={sessionStatus === SESSION_STATUS.CONNECTED ? 'Ketik pesan demo...' : 'Mulai simulasi untuk mencoba chat'} value={inputValue} onChange={(event) => setInputValue(event.target.value)} onKeyDown={handleKeyDown} disabled={sessionStatus !== SESSION_STATUS.CONNECTED || chatState === CHAT_STATES.SENDING} aria-label="Pesan" />
        <button className={styles.chatSendBtn} onClick={handleSend} disabled={!inputValue.trim() || sessionStatus !== SESSION_STATUS.CONNECTED || chatState === CHAT_STATES.SENDING} aria-label="Kirim pesan">➤</button>
        <button type="button" className={styles.endSessionBtn} onClick={() => setSessionStatus(SESSION_STATUS.CLOSED)} disabled={sessionStatus !== SESSION_STATUS.CONNECTED}>Selesai</button>
      </div>
    </div>
    <EmergencyButton variant="floating" />
  </div>;
}

export default function ChatPage() {
  return <Suspense fallback={<PageLoading message="Memuat ruang chat..." />}><ChatContent /></Suspense>;
}
