import test from 'node:test';
import assert from 'node:assert/strict';
import { createCareRecord, groupCareRecordsByDate, MAX_CARE_RECORDS, normalizeCareRecords } from './careJournal.ts';
import { getRankInfo, RANK_LEVELS } from './petRules.ts';

test('care journal validates real species/category combinations, action slots and ISO dates', () => {
  const record = createCareRecord('tunas', 'kangkung', 'action1', new Date('2026-11-11T17:30:00.000Z'));
  const normalized = normalizeCareRecords([
    record,
    { ...record, id: 'wrong-species', type: 'koki' },
    { ...record, id: 'wrong-slot', slot: 'action4' },
    { ...record, id: 'wrong-date', createdAt: '2026-02-30T07:00:00Z' },
    { ...record, id: 'non-iso', createdAt: '11/12/2026' },
    { ...record, id: 'bad-time', createdAt: '2026-11-12T24:00:00Z' },
    { ...record, id: 'missing-date', createdAt: null },
    null,
  ]);
  assert.deepEqual(normalized, [record]);
  assert.equal(groupCareRecordsByDate(normalized)[0].date, '2026-11-12');
  assert.throws(() => createCareRecord('koki', 'kangkung', 'action1'));
});

test('care journal keeps newest records, deduplicates ids and limits persisted history', () => {
  const base = createCareRecord('koki', 'nila', 'action1', new Date('2026-11-12T07:00:00Z'));
  const records = normalizeCareRecords([
    ...Array.from({ length: MAX_CARE_RECORDS + 20 }, (_, index) => ({ ...base, id: `care-${index}`, createdAt: new Date(Date.parse(base.createdAt) + index * 1000).toISOString() })),
    { ...base, id: 'care-0', createdAt: '2026-11-13T00:00:00.000Z' },
  ]);
  assert.equal(records.length, MAX_CARE_RECORDS);
  assert.equal(records[0].id, 'care-0');
  assert.equal(new Set(records.map((record) => record.id)).size, MAX_CARE_RECORDS);
  assert.equal(records[1].id, 'care-519');
});

test('rank metadata agrees with existing rank behavior at every boundary', () => {
  for (const count of [0, 2, 3, 5, 6, 9, 10, 19, 20, 21]) {
    const rank = RANK_LEVELS.filter((entry) => count >= entry.minCare).at(-1)!;
    const info = getRankInfo(count);
    assert.equal(rank.level, info.level, `level at ${count} care records`);
    assert.equal(rank.maxCare, info.max, `target at ${count} care records`);
  }
});
