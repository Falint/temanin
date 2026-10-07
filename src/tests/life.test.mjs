import test from 'node:test';
import assert from 'node:assert/strict';
import { EVENTS } from '../lib/game/content.mjs';
import { createGame, choose, advance, getEvent, getEnding, formatText } from '../lib/game/engine.mjs';
import { restoreGame, loadGame, saveGame } from '../lib/game/save.mjs';
import { STAT_LABELS, RELATION_LABELS, SAVE_KEY } from '../lib/game/constants.mjs';

function play(selections = {}) {
  let state = createGame('Kafka');
  for (const event of EVENTS) state = advance(choose(state, selections[event.id] || event.choices[0].id));
  return state;
}

test('12 unique events cover grades 10–12 with valid choices and known stat keys', () => {
  assert.equal(EVENTS.length, 12);
  assert.equal(new Set(EVENTS.map(e => e.id)).size, 12);
  for (let chapter = 0; chapter < 3; chapter++) assert.equal(EVENTS.filter(e => e.chapter === chapter).length, 4);
  for (const event of EVENTS) {
    assert.equal(event.choices.length, 3);
    assert.equal(new Set(event.choices.map(c => c.id)).size, 3);
    for (const choice of event.choices) {
      assert.ok(choice.label && choice.result && event.lesson);
      assert.ok(Object.keys(choice.effects).every(key => key in STAT_LABELS));
      assert.ok(Object.keys(choice.relations || {}).every(key => key in RELATION_LABELS));
    }
  }
});

test('all three choices at every event remain playable and every state resumes exactly', () => {
  for (let target = 0; target < EVENTS.length; target++) {
    for (const choice of EVENTS[target].choices) {
      let state = createGame('Kafka', 'boy');
      for (let index = 0; index < EVENTS.length; index++) {
        assert.deepEqual(restoreGame(state), state);
        state = choose(state, index === target ? choice.id : EVENTS[index].choices[0].id);
        assert.deepEqual(restoreGame(state), state);
        assert.ok(Object.values(state.stats).every(value => value >= 0 && value <= 100));
        assert.ok(Object.values(state.relations).every(value => value >= 0 && value <= 100));
        state = advance(state);
      }
      assert.equal(state.phase, 'ending');
      assert.equal(state.history.length, 12);
      assert.deepEqual(restoreGame(state), state);
      assert.equal(getEvent(state), null);
      assert.equal(getEnding(state).memories.length, 3);
    }
  }
});

test('choices do not mutate prior state or apply twice; invalid transitions are ignored', () => {
  const state = createGame('Kafka');
  const snapshot = structuredClone(state);
  assert.equal(choose(state, 'unknown'), state);
  assert.equal(advance(state), state);
  const chosen = choose(state, 'speak');
  assert.deepEqual(state, snapshot);
  assert.equal(choose(chosen, 'speak'), chosen);
  assert.equal(chosen.history.length, 1);
  const finished = play();
  assert.equal(choose(finished, 'speak'), finished);
  assert.equal(advance(finished), finished);
});

test('previous choices unlock later dialogue and relationship endings differ', () => {
  let state = createGame('Kafka');
  for (const event of EVENTS.slice(0, 4)) state = advance(choose(state, event.id === 'closer' ? 'friends' : event.choices[0].id));
  assert.match(getEvent(state).text, /sepakat berteman/);
  state = advance(choose(state, 'show'));
  assert.match(getEvent(state).text, /memperlihatkan chat/);
  assert.equal(getEnding(play()).relationship.title, 'Dekat tanpa kehilangan diri');
  assert.equal(getEnding(play({ closer: 'friends' })).relationship.title, 'Pertemanan juga berharga');
  assert.equal(getEnding(play({ repair: 'distance' })).relationship.title, 'Berpisah dengan ruang');
  assert.equal(getEnding(play({ repair: 'ignore' })).relationship.title, 'Masih perlu kejelasan');
});

test('save loader rejects corruption, impossible progress, invalid choices and unknown versions', () => {
  const state = createGame('Kafka');
  for (const invalid of [null, {}, { ...state, version: 999 }, { ...state, index: 9 },
    { ...state, phase: 'ending' }, { ...state, player: { name: [], avatar: 'girl' } },
    { ...state, history: [{ event: 'first-seat', choice: 'hacked' }] }]) assert.equal(restoreGame(invalid), null);
  assert.equal(loadGame({ getItem: () => '{broken' }).state, null);
  assert.ok(loadGame({ getItem: () => '{broken' }).warning);
});

test('storage failures are nonfatal; saved stats cannot override deterministic replay', () => {
  const blocked = { getItem() { throw Error('blocked'); }, setItem() { throw Error('quota'); } };
  assert.equal(saveGame(blocked, createGame('Kafka')), false);
  assert.ok(loadGame(blocked).warning);
  const memory = new Map();
  const storage = { getItem: key => memory.get(key), setItem: (key, value) => memory.set(key, value) };
  const state = play();
  assert.equal(saveGame(storage, state), true);
  assert.ok(memory.has(SAVE_KEY));
  assert.deepEqual(loadGame(storage).state, state);
  assert.deepEqual(restoreGame({ ...state, stats: { academic: 99999 }, flags: { cheated: true } }), state);
});

test('energy stays bounded on demanding route; endings reflect academic consequences', () => {
  const state = play({ 'first-score': 'avoid', tryout: 'escape', 'last-exam': 'overnight', cheating: 'answer' });
  assert.notEqual(getEnding(state).academic.title, getEnding(play()).academic.title);
  const exhausted = play({ 'group-work': 'takeover', 'first-score': 'cram', tryout: 'all-in', 'last-exam': 'overnight' });
  assert.ok(exhausted.stats.energy >= 0);
  assert.match(getEnding(exhausted).wellbeing, /menguras energi/);
  assert.equal(formatText('{name} dan {close}', createGame('Kafka', 'boy')), 'Kafka dan Nara');
});
