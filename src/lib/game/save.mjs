import { SAVE_KEY, SAVE_VERSION } from './constants.mjs';
import { EVENTS } from './content.mjs';
import { createGame, choose, advance } from './engine.mjs';

// Replay only known choices; never trust stored statistics, flags or arbitrary events.
export function restoreGame(value) {
  if (!value || value.version !== SAVE_VERSION || !value.player ||
      typeof value.player.name !== 'string' || value.player.name.length > 24 ||
      !['girl', 'boy'].includes(value.player.avatar) || !Array.isArray(value.history) ||
      value.history.length > EVENTS.length || !['story', 'feedback', 'ending'].includes(value.phase)) return null;
  let state = createGame(value.player.name, value.player.avatar);
  for (let i = 0; i < value.history.length; i += 1) {
    const entry = value.history[i];
    if (!entry || EVENTS[i].id !== entry.event || !EVENTS[i].choices.some(({ id }) => id === entry.choice)) return null;
    state = choose(state, entry.choice);
    if (i < value.history.length - 1 || value.phase !== 'feedback') state = advance(state);
  }
  if (state.phase !== value.phase || state.index !== value.index) return null;
  return state;
}

export function loadGame(storage) {
  try {
    const raw = storage.getItem(SAVE_KEY);
    if (!raw) return { state: null, warning: '' };
    const state = restoreGame(JSON.parse(raw));
    return { state, warning: state ? '' : 'Simpanan lama tidak bisa dibaca. Kamu bisa memulai perjalanan baru.' };
  } catch {
    return { state: null, warning: 'Simpanan tidak bisa dibaca. Kamu tetap bisa bermain di sesi ini.' };
  }
}

export function saveGame(storage, state) {
  try {
    storage.setItem(SAVE_KEY, JSON.stringify({
      version: state.version, player: state.player, index: state.index, phase: state.phase, history: state.history,
    }));
    return true;
  } catch { return false; }
}
