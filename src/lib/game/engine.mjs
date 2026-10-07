import { EVENTS } from './content.mjs';
import { SAVE_VERSION, STAT_MIN, STAT_MAX } from './constants.mjs';

export function createGame(name, avatar = 'girl') {
  return {
    version: SAVE_VERSION,
    player: { name: String(name || '').trim().slice(0, 24) || 'Kamu', avatar: avatar === 'boy' ? 'boy' : 'girl' },
    index: 0, phase: 'story',
    stats: { academic: 50, energy: 75, mood: 65, confidence: 45 },
    relations: { friend: 45, peer: 45, close: 45 },
    flags: {}, history: [],
  };
}

export function formatText(text, state) {
  const values = { name: state.player.name, close: state.player.avatar === 'girl' ? 'Raka' : 'Nara' };
  return text.replace(/\{(name|close)\}/g, (_, key) => values[key]);
}

export function getEvent(state) {
  if (state.phase === 'ending') return null;
  const event = EVENTS[state.index];
  const additions = (event.variants || [])
    .filter(({ when }) => Object.entries(when).every(([key, value]) => state.flags[key] === value))
    .map(({ text }) => text);
  return { ...event, text: formatText([event.text, ...additions].join('\n\n'), state) };
}

function applyDeltas(values, deltas = {}) {
  return Object.fromEntries(Object.entries(values).map(([key, value]) => [
    key, Math.min(STAT_MAX, Math.max(STAT_MIN, value + (deltas[key] || 0))),
  ]));
}

export function choose(state, choiceId) {
  if (state.phase !== 'story') return state;
  const event = EVENTS[state.index];
  const choice = event.choices.find(({ id }) => id === choiceId);
  if (!choice) return state;
  return {
    ...state, phase: 'feedback',
    stats: applyDeltas(state.stats, choice.effects),
    relations: applyDeltas(state.relations, choice.relations),
    flags: { ...state.flags, ...choice.flags },
    history: [...state.history, { event: event.id, choice: choice.id }],
  };
}

export function advance(state) {
  if (state.phase !== 'feedback') return state;
  return state.index === EVENTS.length - 1
    ? { ...state, phase: 'ending' }
    : { ...state, index: state.index + 1, phase: 'story' };
}

export function gameReducer(state, action) {
  if (action.type === 'restore') return action.state;
  if (action.type === 'start') return createGame(action.name, action.avatar);
  if (!state) return state;
  if (action.type === 'choose') return choose(state, action.id);
  if (action.type === 'advance') return advance(state);
  return state;
}

export function getEnding(state) {
  const academic = state.stats.academic >= 75
    ? { title: 'Usahamu menemukan bentuk', text: 'Persiapan dan kebiasaan belajarmu memberi fondasi akademik yang kuat. Kamu lulus dengan bekal untuk melanjutkan targetmu, sambil tetap perlu mencari kesempatan yang sesuai.' }
    : state.stats.academic >= 50
      ? { title: 'Masih terus berkembang', text: 'Hasil belajarmu punya sisi kuat dan bagian yang perlu dikejar. Kamu lulus dengan pengalaman mengenali cara belajar yang cocok. Rencana berikutnya masih bisa kamu susun bertahap.' }
      : { title: 'Kesempatan untuk mulai lagi', text: 'Kamu lulus, meski hasil akademik belum sesuai harapan. Beberapa materi masih perlu dipelajari. Hasil ini bukan akhir kesempatanmu; kamu bisa mencari dukungan dan jalur lanjutan yang realistis.' };
  const friendship = state.relations.friend >= 60 && state.relations.peer >= 55
    ? { title: 'Teman yang ikut bertumbuh', text: 'Tio dan Maya mengingat bantuan sekaligus kejujuranmu. Kalian tidak selalu setuju, tetapi punya dasar kepercayaan untuk terus saling mengenal di luar sekolah.' }
    : state.relations.friend < 40 || state.relations.peer < 40
      ? { title: 'Ada jarak yang tersisa', text: 'Beberapa tindakan meninggalkan jarak dengan temanmu. Satu ucapan saat perpisahan tidak menghapus semuanya. Kamu bisa menghargai batas mereka dan belajar memperbaiki caramu berhubungan.' }
      : { title: 'Berubah, tetap berarti', text: 'Pertemanan kalian tidak selalu dekat dan tidak selalu mudah. Ada kenangan baik dan percakapan yang belum selesai. Bentuk hubungan selanjutnya bisa kalian tentukan tanpa paksaan.' };
  const relationship = state.flags.bond === 'apart'
    ? { title: 'Berpisah dengan ruang', text: 'Kamu memilih mengambil jarak. Hubungan yang selesai tetap dapat mengajarkan cara mengenali kebutuhan dan batas diri.' }
    : state.relations.close < 50 || !state.flags.boundaries || state.flags.unresolved
      ? { title: 'Masih perlu kejelasan', text: 'Kedekatan kalian menyisakan pertanyaan tentang kepercayaan dan komunikasi. Kalian bebas memutuskan apakah ingin memperbaikinya bersama atau mengambil jarak.' }
      : state.flags.bond === 'dating'
        ? { title: 'Dekat tanpa kehilangan diri', text: 'Kalian memilih melanjutkan hubungan sambil menghargai ruang pribadi. Perbedaan rencana setelah sekolah perlu terus dibicarakan, bukan diselesaikan dengan tuntutan.' }
        : { title: 'Pertemanan juga berharga', text: 'Kalian punya kedekatan tanpa harus menjadi pasangan. Kejujuran tentang harapan dan batas membantu kalian melanjutkan hubungan dengan lebih jelas.' };
  return {
    academic, friendship, relationship,
    wellbeing: state.stats.energy < 35
      ? 'Perjalananmu juga menguras energi. Di langkah berikutnya, beri ruang untuk istirahat dan meminta bantuan; pencapaian tidak harus dibayar dengan terus memaksakan diri.'
      : 'Bawa kebiasaan yang membantumu dan ubah yang memberatkan. Kamu tidak harus punya seluruh jawaban saat meninggalkan gerbang sekolah.',
    direction: state.flags.ownPath ? 'Kamu mulai menentukan arah berdasarkan kebutuhan dan minatmu sendiri.' : 'Kamu masih bisa meninjau rencana masa depan sebelum menjadikannya keputusan jangka panjang.',
    memories: state.history.filter(({ event }) => EVENTS.find(({ id }) => id === event)?.milestone).slice(-3).map(entry => {
      const event = EVENTS.find(({ id }) => id === entry.event);
      return { title: event.title, choice: event.choices.find(({ id }) => id === entry.choice).label };
    }),
  };
}
