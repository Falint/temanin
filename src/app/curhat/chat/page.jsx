'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getPikrById } from '@/lib/data/pikr';
import { CHAT_STATES } from '@/lib/constants';
import styles from '@/components/curhat/curhat.module.css';
import EmergencyButton from '@/components/curhat/EmergencyButton';

const INITIAL_MESSAGES = [
  {
    id: 'welcome',
    type: 'in',
    text: 'Halo! 👋 Selamat datang di Demo Chat. Ini adalah simulasi percakapan dengan konselor sebaya.',
    time: '10:00',
  },
  {
    id: 'intro',
    type: 'in',
    text: 'Kamu bisa ceritakan apa saja yang sedang kamu rasakan. Percakapan ini bersifat rahasia.',
    time: '10:00',
  },
];

function ChatContent() {
  const searchParams = useSearchParams();
  const pikrId = searchParams.get('pikr') || '';
  const mode = searchParams.get('mode') || 'anonim';
  const partner = getPikrById(pikrId);

  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [chatState, setChatState] = useState(CHAT_STATES.READY);
  const messagesEndRef = useRef(null);

  // Load the temporary profile and screening context for this browser session.
  useEffect(() => {
    try {
      const storedProfile = sessionStorage.getItem('temanin_user_profile');
      const storedScreening = sessionStorage.getItem('temanin_screening');
      const profile = storedProfile ? JSON.parse(storedProfile) : null;
      const screening = storedScreening ? JSON.parse(storedScreening) : null;

      if (profile?.displayName || screening?.categoryLabel) {
        const nextMessages = [
          {
            id: 'welcome',
            type: 'in',
            text: `Halo${profile?.displayName ? ` ${profile.displayName}` : ''}! 👋 Selamat datang di TEMANIN. Ini adalah ruang amanmu bersama konselor sebaya.`,
            time: '10:00',
          },
        ];

        if (screening?.categoryLabel && screening?.conditionLabel) {
          nextMessages.push({
            id: 'screening-context',
            type: 'in',
            text: `Kami sudah menerima konteks awalmu: ${screening.categoryLabel}, dengan kondisi “${screening.conditionLabel}”. Kamu boleh mulai bercerita dari bagian yang paling nyaman.`,
            time: '10:00',
          });
        } else {
          nextMessages.push(INITIAL_MESSAGES[1]);
        }

        setMessages(nextMessages);
      }
    } catch {
      // Graceful fallback
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;

    // Add user message
    const userMsg = {
      id: `user-${Date.now()}`,
      type: 'out',
      text,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setChatState(CHAT_STATES.SENDING);

    // Simulate response delay
    setTimeout(() => {
      const reply = {
        id: `reply-${Date.now()}`,
        type: 'in',
        text: 'Terima kasih sudah berbagi. Ini adalah demo chat — pada versi live, konselor sebaya akan merespons pesanmu secara langsung.',
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, reply]);
      setChatState(CHAT_STATES.READY);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const partnerName = partner ? partner.name : 'Konselor Sebaya';

  return (
    <div className={styles.chatPage}>
      <div className={styles.chatContainer}>
        {/* Header */}
        <div className={styles.chatHeader}>
          <Link href={`/curhat/wilayah?mode=${mode}`} className={styles.chatBack} aria-label="Kembali">
            ←
          </Link>
          <div className={styles.chatHeaderInfo}>
            <h2 className={styles.chatHeaderName}>{partnerName}</h2>
            <p className={styles.chatHeaderStatus}>
              {chatState === CHAT_STATES.SENDING ? 'Mengetik...' : 'Demo Chat'}
            </p>
          </div>
          <EmergencyButton variant="header" />
          <span
            className={`badge ${mode === 'anonim' ? 'badge-available' : 'badge-primary'} ${styles.chatModeBadge}`}
          >
            {mode === 'anonim' ? '🕊️ Anonim' : '👤 Terhubung'}
          </span>
        </div>

        {/* Demo notice */}
        <div className={styles.demoNotice}>
          ⚠️ Ini adalah Demo Chat — belum terhubung dengan konselor sungguhan.
        </div>

        {/* Messages */}
        <div className={styles.chatMessages}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={msg.type === 'in' ? styles.chatMessageIn : styles.chatMessageOut}
            >
              <p className={styles.chatMessageText}>{msg.text}</p>
              <span className={styles.chatMessageTime}>{msg.time}</span>
            </div>
          ))}
          {chatState === CHAT_STATES.SENDING && (
            <div className={styles.chatMessageIn}>
              <p className={styles.chatMessageText} style={{ opacity: 0.6 }}>
                Sedang mengetik...
              </p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className={styles.chatInputArea}>
          <input
            type="text"
            className={styles.chatInput}
            placeholder="Ketik pesanmu..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={chatState === CHAT_STATES.SENDING}
            aria-label="Pesan"
          />
          <button
            className={styles.chatSendBtn}
            onClick={handleSend}
            disabled={!inputValue.trim() || chatState === CHAT_STATES.SENDING}
            aria-label="Kirim pesan"
          >
            ➤
          </button>
        </div>
      </div>

      {/* Floating Emergency Button (Selalu terlihat di layar) */}
      <EmergencyButton variant="floating" />
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className={styles.chatPage}>
        <div className={styles.chatContainer}>
          <div className={styles.chatEmpty}>
            <span className={styles.chatEmptyIcon}>💬</span>
            <h3 className={styles.chatEmptyTitle}>Memuat chat...</h3>
          </div>
        </div>
      </div>
    }>
      <ChatContent />
    </Suspense>
  );
}
