import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INITIAL_PETS,
  calculateMood,
  performCareAction,
  getRankInfo,
  searchConversations,
} from './petRules.ts';

test('initial pets are in hungry/thirsty state with proper low thresholds', () => {
  assert.equal(INITIAL_PETS.tunas.stat2, 10);
  assert.equal(calculateMood(INITIAL_PETS.tunas), 'sad');
  assert.equal(calculateMood(INITIAL_PETS.koki), 'sad');
  assert.equal(calculateMood(INITIAL_PETS.kuning), 'sad');
});

test('performing care actions restores vitals and changes mood to happy when above threshold', () => {
  const initial = INITIAL_PETS.tunas;
  const { updatedPet: wateredPet } = performCareAction(initial, 'action1'); // Siram (+30 air)
  assert.equal(wateredPet.stat2, 40);

  const { updatedPet: fertilizedPet } = performCareAction(wateredPet, 'action2'); // Pupuk (+35 nutrisi)
  assert.equal(fertilizedPet.stat1, 65);

  const { updatedPet: sunnyPet } = performCareAction(fertilizedPet, 'action3'); // Matahari (+30 senang)
  assert.equal(sunnyPet.stat3, 90);
  assert.equal(calculateMood(sunnyPet), 'happy');
});

test('ranking progression correctly maps total care counts to Level 4 at 12/20', () => {
  const rank = getRankInfo(12);
  assert.equal(rank.level, 4);
  assert.equal(rank.title, 'Lumbung Padi Lestari');
  assert.equal(rank.current, 12);
  assert.equal(rank.max, 20);
  assert.equal(rank.remaining, 8);
});

test('ranking progression correctly caps at Level 5 Petani Teladan at 20+', () => {
  const rank = getRankInfo(20);
  assert.equal(rank.level, 5);
  assert.equal(rank.title, 'Petani Teladan');
  assert.equal(rank.isMax, true);
});

test('searchConversations correctly filters by title or snippet', () => {
  const mockChats: any[] = [
    { id: '1', title: 'Daun cabai menguning', snippet: 'Kekurangan nitrogen', messages: [] },
    { id: '2', title: 'Ikan koki mengapung', snippet: 'Gelembung renang', messages: [] },
  ];
  const results = searchConversations(mockChats, 'cabai');
  assert.equal(results.length, 1);
  assert.equal(results[0].id, '1');

  const results2 = searchConversations(mockChats, 'gelembung');
  assert.equal(results2.length, 1);
  assert.equal(results2[0].id, '2');

  const emptyResults = searchConversations(mockChats, 'xyz123');
  assert.equal(emptyResults.length, 0);
});
