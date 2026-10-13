'use client';

import Link from 'next/link';
import { useEffect, useReducer, useRef, useState } from 'react';
import { CHAPTERS, STAT_LABELS } from '@/lib/game/constants.mjs';
import { EVENTS } from '@/lib/game/content.mjs';
import { gameReducer, getEvent, formatText } from '@/lib/game/engine.mjs';
import { loadGame, saveGame, restoreGame } from '@/lib/game/save.mjs';
import Scene from './Scene';
import StatsPanel from './StatsPanel';
import Ending from './Ending';
import styles from './life.module.css';

export default function LifeGame() {
  const [state, dispatch] = useReducer(gameReducer, null);
  const [ready, setReady] = useState(false);
  const [menu, setMenu] = useState(true);
  const [warning, setWarning] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('girl');
  const [confirmRestart, setConfirmRestart] = useState(false);
  const headingRef = useRef(null);

  useEffect(() => {
    let saved;
    try { saved = loadGame(window.localStorage); }
    catch { saved = { state: null, warning: 'Penyimpanan browser tidak tersedia. Progres hanya bertahan selama halaman ini terbuka.' }; }
    dispatch({ type: 'restore', state: saved.state });
    // Browser storage is unavailable during server rendering; hydrate it once after mount.
    setWarning(saved.warning);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || !state) return;
    let saved = false;
    try { saved = saveGame(window.localStorage, state); } catch { /* Access can be blocked by browser policy. */ }
    setWarning(saved ? '' : 'Progres belum tersimpan. Jangan tutup halaman jika ingin melanjutkan sesi ini.');
  }, [state, ready]);

  useEffect(() => {
    if (ready && !menu) headingRef.current?.focus();
  }, [state?.index, state?.phase, menu, ready]);

  function start(event) {
    event.preventDefault();
    dispatch({ type: 'start', name, avatar });
    setConfirmRestart(false);
    setMenu(false);
  }

  const event = state ? getEvent(state) : null;
  const chapter = state ? CHAPTERS[EVENTS[state.index].chapter] : CHAPTERS[0];
  const lastChoice = state?.phase === 'feedback' ? event.choices.find(choice => choice.id === state.history.at(-1).choice) : null;
  const beforeChoice = lastChoice ? restoreGame({ ...state, phase: 'story', history: state.history.slice(0, -1) }) : null;
  const speaker = event?.speaker === 'close' ? formatText('{close}', state) : event?.speaker;

  return <div className={styles.game}>
    <div className={styles.shell}>
      <nav className={styles.topbar} aria-label="Navigasi game">
        <Link href="/games" className={styles.back}>← Games</Link>
        <span className={styles.brand}>TEMANIN <em>Life</em></span>
        {state && !menu ? <button className={styles.textButton} onClick={() => setMenu(true)}>Jeda / menu</button> : <span className={styles.duration}>±15 menit</span>}
      </nav>
      {warning && <p className={styles.warning} role="status">{warning}</p>}
      {!ready ? <div className={styles.loading} role="status">Menyiapkan buku ceritamu…</div> : menu ? <section className={styles.intro}>
        <div className={styles.cover}>
          <span className={styles.eyebrow}>SEBUAH CERITA TENTANG BERTUMBUH</span>
          <h1>Tiga tahun.<br />Pilihanmu.<br /><em>Ceritamu.</em></h1>
          <p>Dari bangku kelas 10 sampai gerbang kelulusan. Tentang teman, rasa suka, dan belajar mengenal diri.</p>
          <div className={styles.coverArt}><Scene avatar={avatar} compact /></div>
          <div className={styles.coverMeta}><span>3 bab</span><span>12 keputusan</span><span>Banyak kemungkinan</span></div>
        </div>
        <div className={styles.startPanel}>
          <span className={styles.eyebrow}>BUKU CERITA / 01</span>
          <h2>Halaman pertama milikmu.</h2>
          <p>Tidak semua pilihan mudah. Temui akibatnya, jaga hubunganmu, lalu tentukan langkah berikutnya.</p>
          {state && <div className={styles.resume}>
            <strong>{state.player.name} · {state.phase === 'ending' ? 'Perjalanan selesai' : `Kelas ${chapter.grade}`}</strong>
            <span>{state.history.length} dari {EVENTS.length} keputusan</span>
            <button className={styles.primary} onClick={() => { setMenu(false); setConfirmRestart(false); }}>{state.phase === 'ending' ? 'Lihat epilog →' : 'Lanjutkan cerita →'}</button>
          </div>}
          {(!state || confirmRestart) ? <form onSubmit={start}>
            {state && <p className={styles.warning}>Memulai cerita baru akan mengganti progres di browser ini.</p>}
            <label className={styles.label} htmlFor="player-name">Nama panggilanmu</label>
            <input id="player-name" className={styles.input} value={name} onChange={e => setName(e.target.value)} maxLength={24} placeholder="Nama tokoh ceritamu" autoComplete="off" />
            <fieldset className={styles.avatarPicker}><legend>Karakter ceritamu</legend>
              <label><input type="radio" name="avatar" value="girl" checked={avatar === 'girl'} onChange={() => setAvatar('girl')} /> Perempuan</label>
              <label><input type="radio" name="avatar" value="boy" checked={avatar === 'boy'} onChange={() => setAvatar('boy')} /> Laki-laki</label>
            </fieldset>
            <button className={styles.primary} type="submit">{state ? 'Ganti progres & mulai' : 'Mulai hari pertama'} ↗</button>
            {state && <button type="button" className={styles.textButton} onClick={() => setConfirmRestart(false)}>Batal</button>}
          </form> : <button className={styles.secondary} onClick={() => setConfirmRestart(true)}>Mulai cerita baru</button>}
          <p className={styles.small}>Progres disimpan otomatis di browser ini. Tidak perlu akun. Menghapus data browser akan menghapus simpanan. Durasi tergantung kecepatan membaca.</p>
          <div className={styles.chapterList}>{CHAPTERS.map((item, index) => <div key={item.grade}><span>0{index + 1}</span><div><strong>Kelas {item.grade}</strong><p>{item.title}</p></div></div>)}</div>
        </div>
      </section> : state.phase === 'ending' ? <Ending state={state} headingRef={headingRef} onRestart={() => { setMenu(true); setConfirmRestart(true); }} /> : <>
        <ol className={styles.timeline} aria-label="Perjalanan sekolah">{CHAPTERS.map((item, index) => <li key={item.grade} aria-current={index === event.chapter ? 'step' : undefined} className={index === event.chapter ? styles.activeChapter : ''}><span>0{index + 1}</span><div><strong>Kelas {item.grade}</strong><small>{item.title}</small></div></li>)}</ol>
        <div className={styles.progressRow}><span>{chapter.title}</span><span>{state.index + 1} / {EVENTS.length} kejadian</span></div>
        <progress className={styles.progress} max={EVENTS.length} value={state.history.length} aria-label="Keputusan yang telah dibuat" />
        <div className={styles.playLayout}>
          <article className={styles.story}>
            <div className={styles.scene}><Scene type={event.scene} avatar={state.player.avatar} mood={lastChoice ? 'happy' : 'neutral'} /><span className={styles.sceneLabel}>KELAS {chapter.grade} · {chapter.subtitle}</span></div>
            <div className={styles.storyBody}>
              <span className={styles.eyebrow}>{lastChoice ? 'SETELAH PILIHANMU' : `BAB ${event.chapter + 1} · KEJADIAN ${(state.index % 4) + 1}`}</span>
              <h1 ref={headingRef} tabIndex={-1}>{event.title}</h1>
              {!lastChoice ? <>
                <div className={styles.prose}>{event.text.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
                <blockquote className={styles.quote}><strong>{speaker}</strong><p>“{formatText(event.quote, state)}”</p></blockquote>
                <h2 className={styles.choiceHeading}>Apa yang kamu lakukan?</h2>
                <div className={styles.choices}>{event.choices.map((choice, index) => <button key={choice.id} onClick={() => dispatch({ type: 'choose', id: choice.id })}><span>{String.fromCharCode(65 + index)}</span><span>{formatText(choice.label, state)}</span><span aria-hidden="true">↗</span></button>)}</div>
              </> : <div className={styles.feedback}>
                <p className={styles.chosen}>Pilihanmu: {formatText(lastChoice.label, state)}</p>
                <p className={styles.result} role="status">{formatText(lastChoice.result, state)}</p>
                <div className={styles.effects} aria-label="Perubahan kondisi">{Object.entries(STAT_LABELS).map(([key, label]) => {
                  const delta = state.stats[key] - beforeChoice.stats[key];
                  return delta ? <span key={key}>{label} <strong>{delta > 0 ? '+' : ''}{delta}</strong></span> : null;
                })}</div>
                <div className={styles.lesson}><span className={styles.eyebrow}>BEKAL KECIL</span><p>{event.lesson}</p></div>
                <button className={styles.primary} onClick={() => dispatch({ type: 'advance' })}>{state.index === EVENTS.length - 1 ? 'Buka epilog kelulusan' : EVENTS[state.index + 1].chapter !== event.chapter ? `Masuk kelas ${CHAPTERS[event.chapter + 1].grade}` : 'Lanjutkan cerita'} →</button>
              </div>}
            </div>
          </article>
          <StatsPanel state={state} />
        </div>
      </>}
      <footer className={styles.gameFooter}>TEMANIN Life · Setiap pilihan punya cerita.</footer>
    </div>
  </div>;
}
