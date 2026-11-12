import test from 'node:test';
import assert from 'node:assert/strict';
import { readStoredValue, writeStoredValue } from './storage.ts';
import type { StorageLike } from './storage.ts';
import { getSpeciesPet, normalizeNonNegativeInteger, normalizePets, normalizePetType, normalizeProfile, normalizeSpeciesPets } from './gardenState.ts';
import { getJakartaDateKey, getJakartaTimeKey, offsetDateKey } from './dateTime.ts';
import { getDueCare, getSchedule, markScheduleDone, normalizeSchedules, updateSchedule } from './careSchedule.ts';
import { buildConversation, normalizeConversations, upsertConversation } from './chatStorage.ts';

function memoryStorage(initial: Record<string, string> = {}): StorageLike {
  const values = new Map(Object.entries(initial));
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => { values.set(key, value); },
  };
}

test('storage recovers malformed data and the previous unquoted category format', () => {
  const storage = memoryStorage({ profile: '{broken json', category: 'koki' });
  const profile = readStoredValue('profile', normalizeProfile(null), normalizeProfile, storage);
  const category = readStoredValue('category', 'tunas', normalizePetType, storage);
  assert.equal(profile.status, 'recovered');
  assert.equal(profile.value.name, 'Sobat Tani');
  assert.equal(category.value, 'koki');
  assert.equal(category.status, 'recovered');
});

test('blocked storage and quota errors preserve in-memory operation', () => {
  const blocked: StorageLike = {
    getItem: () => { throw Object.assign(new Error('blocked'), { name: 'SecurityError' }); },
    setItem: () => { throw Object.assign(new Error('blocked'), { name: 'SecurityError' }); },
  };
  assert.deepEqual(readStoredValue('counter', 0, normalizeNonNegativeInteger, blocked), { value: 0, status: 'unavailable' });
  assert.equal(writeStoredValue('counter', 4, blocked), 'unavailable');
  assert.equal(writeStoredValue('counter', 4, null), 'unavailable');
  const full = { getItem: () => null, setItem: () => { throw Object.assign(new Error('full'), { name: 'QuotaExceededError' }); } };
  assert.equal(writeStoredValue('photos', ['photo'], full), 'full');
  const circular: { self?: unknown } = {};
  circular.self = circular;
  assert.equal(writeStoredValue('bad', circular, memoryStorage()), 'error');
});

test('profile and pet validators keep known fields and repair invalid values', () => {
  const profile = normalizeProfile({ name: '', careFocus: ['tanaman', 'tanaman', 'other'], soundEnabled: 'yes', textSize: 'huge', avatarUrl: 'javascript:alert(1)', password: 'never keep this' });
  assert.equal(profile.name, 'Sobat Tani');
  assert.deepEqual(profile.careFocus, ['tanaman']);
  assert.equal(profile.soundEnabled, true);
  assert.equal(profile.textSize, 'medium');
  assert.match(profile.avatarUrl, /^\/assets\//);
  assert.equal(Object.hasOwn(profile, 'password'), false);
  const pets = normalizePets({ tunas: { variety: 'lele', stat1: -50, stat2: 150, stat3: Number.NaN }, koki: { variety: 'nila', stat1: 62.7 } });
  assert.equal(pets.tunas.variety, 'sorgum');
  assert.equal(pets.tunas.stat1, 0);
  assert.equal(pets.tunas.stat2, 100);
  assert.equal(pets.tunas.stat3, 25);
  assert.equal(pets.koki.name, 'Nila');
  assert.equal(pets.koki.stat1, 63);
  assert.equal(pets.kuning.variety, 'petelur');
  assert.equal(normalizeNonNegativeInteger('bad'), 0);
  assert.equal(normalizeNonNegativeInteger(-9), 0);
});

test('legacy category schedules migrate only to the selected species and preserve completion', () => {
  const schedules = normalizeSchedules({
    'tunas-action1': { enabled: true, time: '07:30', doneOn: '2026-11-12' },
    'koki-action1': { enabled: true, time: '08:00' },
  }, { tunas: 'kangkung', koki: 'nila' });
  assert.deepEqual(getSchedule(schedules, 'kangkung', 'action1'), { enabled: true, time: '07:30', doneOn: '2026-11-12' });
  assert.equal(getSchedule(schedules, 'sorgum', 'action1'), undefined);
  assert.deepEqual(getSchedule(schedules, 'nila', 'action1'), { enabled: true, time: '08:00' });
  assert.equal(Object.hasOwn(schedules, 'tunas-action1'), false);
});

test('species progress migrates selected legacy pets and stays independent when changing a species', () => {
  const legacy = normalizePets({ tunas: { variety: 'kangkung', stat1: 95, stat2: 80, stat3: 70 } });
  const store = normalizeSpeciesPets({ melon: { stat1: 60, stat2: 55, stat3: 40 } }, legacy);
  assert.equal(getSpeciesPet(store, 'tunas', 'kangkung').stat1, 95);
  assert.equal(getSpeciesPet(store, 'tunas', 'melon').stat1, 60);
  assert.equal(getSpeciesPet(store, 'tunas', 'sawi').stat1, 30);
  const updated = { ...store, kangkung: { ...getSpeciesPet(store, 'tunas', 'kangkung'), stat1: 100 } };
  assert.equal(getSpeciesPet(updated, 'tunas', 'melon').stat1, 60);
  assert.equal(store.kangkung?.stat1, 95);
  assert.equal(getSpeciesPet(store, 'tunas', 'melon').variety, 'melon');
});

test('schedule validation rejects malformed times and unknown keys, keeps species records over legacy', () => {
  const schedules = normalizeSchedules({
    entries: {
      'kangkung-action1': { enabled: true, time: '09:00', doneOn: '2026-02-30' },
      'tunas-action1': { enabled: true, time: '07:30' },
      'sawi-action1': { enabled: true, time: '24:00' },
      'sawi-action2': { enabled: 'yes', time: '10:00' },
      'unknown-action1': { enabled: true, time: '09:00' },
    },
  }, { tunas: 'kangkung' });
  assert.deepEqual(schedules, { 'kangkung-action1': { enabled: true, time: '09:00' } });
});

test('completion and due activities stay independent for each species and reset on the next date', () => {
  let schedules = updateSchedule({}, 'kangkung', 'action1', { enabled: true, time: '07:00' });
  schedules = updateSchedule(schedules, 'sawi', 'action1', { enabled: true, time: '08:00' });
  schedules = markScheduleDone(schedules, 'kangkung', 'action1', '2026-11-12');
  assert.equal(getSchedule(schedules, 'sawi', 'action1')?.doneOn, undefined);
  assert.deepEqual(getDueCare(schedules, { date: '2026-11-12', time: '08:00' }).map((entry) => entry.variety), ['sawi']);
  assert.deepEqual(getDueCare(schedules, { date: '2026-11-13', time: '08:00' }).map((entry) => entry.variety), ['kangkung', 'sawi']);
  assert.equal(updateSchedule(schedules, 'sawi', 'action1', { time: '' })['sawi-action1']?.time, '08:00');
});

test('date helpers use Jakarta day boundaries and calendar date offsets', () => {
  const date = new Date('2026-11-11T17:05:00.000Z');
  assert.equal(getJakartaDateKey(date), '2026-11-12');
  assert.equal(getJakartaTimeKey(date), '00:05');
  assert.equal(offsetDateKey('2026-03-01', -1), '2026-02-28');
});

test('chat history drops malformed messages and unsafe photo URLs while preserving uploaded images', () => {
  const conversations = normalizeConversations([{
    id: 'chat-1', title: 'Foto kangkung', snippet: 'Panduan', updatedAt: '2026-11-12T02:00:00.000Z',
    messages: [
      null,
      { id: 'one', sender: 'user', text: 'Daunnya kuning', timestamp: '09.00', photoUrl: 'data:image/jpeg;base64,AAAA', photoName: 'daun.jpg' },
      { id: 'one', sender: 'assistant', text: 'Cek tanah dahulu.', timestamp: '09.01' },
      { sender: 'system', text: 'invalid role' },
      { sender: 'user', text: 'Foto tidak valid', photoUrl: 'javascript:alert(1)' },
      { sender: 'user', text: '', photoUrl: 'data:image/svg+xml;base64,AAAA' },
      { sender: 'assistant', text: { unexpected: true } },
    ],
  }]);
  assert.equal(conversations.length, 1);
  assert.equal(conversations[0].messages.length, 3);
  assert.equal(conversations[0].messages[0].photoUrl, 'data:image/jpeg;base64,AAAA');
  assert.equal(conversations[0].messages[2].photoUrl, undefined);
  assert.notEqual(conversations[0].messages[0].id, conversations[0].messages[1].id);
});

test('chat dates sort deterministically and duplicate records keep the latest real update', () => {
  const shell = { title: 'Percakapan', snippet: 'Isi', messages: [] };
  const conversations = normalizeConversations([
    { ...shell, id: 'invalid-first', updatedAt: 'invalid' },
    { ...shell, id: 'old', updatedAt: '2026-11-10T00:00:00Z' },
    { ...shell, id: 'invalid-second' },
    { ...shell, id: 'new', updatedAt: '2026-11-12T00:00:00Z' },
    { ...shell, id: 'old', updatedAt: '2026-11-11T00:00:00Z' },
  ]);
  assert.deepEqual(conversations.map((conversation) => conversation.id), ['new', 'old', 'invalid-first', 'invalid-second']);
  assert.equal(conversations[1].updatedAt, '2026-11-11T00:00:00.000Z');
  assert.equal(conversations[2].dateLabel, 'Tanggal belum tersedia');
  const built = buildConversation('photo-only', [{ id: 'p', sender: 'user', text: '', photoName: 'daun.jpg', photoUrl: 'data:image/jpeg;base64,AAAA', timestamp: '09.00' }], new Date('2026-11-12T00:00:00Z'));
  assert.equal(built?.title, 'daun.jpg');
  assert.equal(upsertConversation(conversations, built!)[0].id, 'photo-only');
});
