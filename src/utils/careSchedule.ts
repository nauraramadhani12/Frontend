import { CARE_SLOTS } from '../data/care.ts';
import type { CareSlot } from '../data/care.ts';
import { SPECIES, getSpecies } from '../data/species.ts';
import type { PetType, PetVariety } from '../types/index.ts';
import { getJakartaDateKey, getJakartaDateTime, isDateKey, isTimeKey } from './dateTime.ts';
import { isRecord } from './storage.ts';

export const CARE_SCHEDULE_STORAGE_KEY = 'dewi_sri_care_schedule';
export type CareScheduleKey = `${PetVariety}-${CareSlot}`;
export interface ScheduleEntry {
  enabled: boolean;
  time: string;
  doneOn?: string;
}
export type CareSchedules = Partial<Record<CareScheduleKey, ScheduleEntry>>;
export type SelectedVarieties = Partial<Record<PetType, PetVariety>>;

export interface ScheduledCare extends ScheduleEntry {
  key: CareScheduleKey;
  type: PetType;
  variety: PetVariety;
  slot: CareSlot;
}

const PET_TYPES: PetType[] = ['tunas', 'koki', 'kuning'];

function normalizeEntry(value: unknown): ScheduleEntry | undefined {
  if (!isRecord(value) || !isTimeKey(value.time) || typeof value.enabled !== 'boolean') return undefined;
  return {
    enabled: value.enabled,
    time: value.time,
    ...(isDateKey(value.doneOn) ? { doneOn: value.doneOn } : {}),
  };
}

export function getScheduleKey(variety: PetVariety, slot: CareSlot): CareScheduleKey {
  return `${variety}-${slot}`;
}

export function normalizeSchedules(value: unknown, selected: SelectedVarieties = {}): CareSchedules {
  if (!isRecord(value)) return {};
  const source = isRecord(value.entries) ? value.entries : value;
  const normalized: CareSchedules = {};

  for (const type of PET_TYPES) {
    for (const species of SPECIES[type]) {
      for (const slot of CARE_SLOTS) {
        const key = getScheduleKey(species.id, slot);
        const entry = normalizeEntry(source[key]);
        if (entry) normalized[key] = entry;
      }
    }
  }

  for (const type of PET_TYPES) {
    const variety = getSpecies(type, selected[type]).id;
    for (const slot of CARE_SLOTS) {
      const key = getScheduleKey(variety, slot);
      const legacyEntry = normalizeEntry(source[`${type}-${slot}`]);
      if (legacyEntry && !normalized[key]) normalized[key] = legacyEntry;
    }
  }
  return normalized;
}

export function getSchedule(schedules: CareSchedules, variety: PetVariety, slot: CareSlot): ScheduleEntry | undefined {
  return schedules[getScheduleKey(variety, slot)];
}

export function updateSchedule(
  schedules: CareSchedules,
  variety: PetVariety,
  slot: CareSlot,
  change: Partial<ScheduleEntry>,
): CareSchedules {
  const key = getScheduleKey(variety, slot);
  const current = schedules[key] || { enabled: false, time: '07:00' };
  const next: ScheduleEntry = {
    enabled: typeof change.enabled === 'boolean' ? change.enabled : current.enabled,
    time: isTimeKey(change.time) ? change.time : current.time,
    ...(current.doneOn ? { doneOn: current.doneOn } : {}),
  };
  if (Object.hasOwn(change, 'doneOn')) {
    if (isDateKey(change.doneOn)) next.doneOn = change.doneOn;
    else delete next.doneOn;
  }
  return { ...schedules, [key]: next };
}

export function markScheduleDone(
  schedules: CareSchedules,
  variety: PetVariety,
  slot: CareSlot,
  date = getJakartaDateKey(),
): CareSchedules {
  const entry = getSchedule(schedules, variety, slot);
  if (!entry?.enabled || !isDateKey(date)) return schedules;
  return updateSchedule(schedules, variety, slot, { doneOn: date });
}

export function getScheduledCare(schedules: CareSchedules, variety?: PetVariety): ScheduledCare[] {
  const result: ScheduledCare[] = [];
  for (const type of PET_TYPES) {
    for (const species of SPECIES[type]) {
      if (variety && species.id !== variety) continue;
      for (const slot of CARE_SLOTS) {
        const key = getScheduleKey(species.id, slot);
        const entry = schedules[key];
        if (entry?.enabled) result.push({ ...entry, key, type, variety: species.id, slot });
      }
    }
  }
  return result.sort((a, b) => a.time.localeCompare(b.time) || a.key.localeCompare(b.key));
}

export function getDueCare(
  schedules: CareSchedules,
  now = getJakartaDateTime(),
  variety?: PetVariety,
): ScheduledCare[] {
  return getScheduledCare(schedules, variety).filter((entry) => entry.doneOn !== now.date && entry.time <= now.time);
}
