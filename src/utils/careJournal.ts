import type { PetType, PetVariety } from '../types/index.ts';
import { SPECIES } from '../data/species.ts';
import { isCareSlot } from '../data/care.ts';
import type { CareSlot } from '../data/care.ts';
import { getJakartaDateKey, isDateKey } from './dateTime.ts';
import { isRecord } from './storage.ts';

export const CARE_JOURNAL_STORAGE_KEY = 'dewi_sri_care_journal';
export const MAX_CARE_RECORDS = 500;

export interface CareRecord {
  id: string;
  type: PetType;
  variety: PetVariety;
  slot: CareSlot;
  createdAt: string;
}

export interface CareRecordGroup {
  date: string;
  records: CareRecord[];
}

function isPetType(value: unknown): value is PetType {
  return value === 'tunas' || value === 'koki' || value === 'kuning';
}

function isoDate(value: unknown): string | undefined {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{1,3})?(?:Z|[+-](?:[01]\d|2[0-3]):[0-5]\d)$/.test(value) || !isDateKey(value.slice(0, 10))) return undefined;
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? date.toISOString() : undefined;
}

export function normalizeCareRecords(value: unknown): CareRecord[] {
  if (!Array.isArray(value)) return [];
  const records = new Map<string, CareRecord>();
  for (const item of value) {
    if (!isRecord(item) || typeof item.id !== 'string' || !item.id.trim() || !isPetType(item.type) || !isCareSlot(item.slot)) continue;
    const species = SPECIES[item.type].find((entry) => entry.id === item.variety);
    const createdAt = isoDate(item.createdAt);
    if (!species || !createdAt) continue;
    const id = item.id.slice(0, 200);
    const record: CareRecord = { id, type: item.type, variety: species.id, slot: item.slot, createdAt };
    const previous = records.get(id);
    if (!previous || record.createdAt > previous.createdAt) records.set(id, record);
  }
  return [...records.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, MAX_CARE_RECORDS);
}

export function createCareRecord(type: PetType, variety: PetVariety, slot: CareSlot, date = new Date()): CareRecord {
  if (!SPECIES[type].some((species) => species.id === variety) || !isCareSlot(slot) || !Number.isFinite(date.getTime())) {
    throw new Error('Jenis atau waktu catatan perawatan tidak valid.');
  }
  return {
    id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `care-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    type,
    variety,
    slot,
    createdAt: date.toISOString(),
  };
}

export function groupCareRecordsByDate(records: CareRecord[]): CareRecordGroup[] {
  const groups = new Map<string, CareRecord[]>();
  for (const record of normalizeCareRecords(records)) {
    const date = getJakartaDateKey(new Date(record.createdAt));
    const group = groups.get(date) || [];
    group.push(record);
    groups.set(date, group);
  }
  return [...groups].map(([date, entries]) => ({ date, records: entries }));
}
