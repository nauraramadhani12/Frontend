import type { PetType } from '../types/index.ts';

export const CARE_SLOTS = ['action1', 'action2', 'action3'] as const;
export type CareSlot = typeof CARE_SLOTS[number];
export type CareIcon = 'water' | 'plant' | 'sun' | 'feed' | 'clean';

export interface CareAction {
  slot: CareSlot;
  label: string;
  description: string;
  icon: CareIcon;
}

export const CARE_ACTIONS: Record<PetType, readonly CareAction[]> = {
  tunas: [
    { slot: 'action1', label: 'Siram', description: 'Periksa media, lalu catat penyiraman.', icon: 'water' },
    { slot: 'action2', label: 'Beri pupuk', description: 'Catat pemupukan sesuai kebutuhan.', icon: 'plant' },
    { slot: 'action3', label: 'Cek cahaya', description: 'Catat pemeriksaan cahaya tanaman.', icon: 'sun' },
  ],
  koki: [
    { slot: 'action1', label: 'Beri makan', description: 'Catat pemberian pakan ikan.', icon: 'feed' },
    { slot: 'action2', label: 'Ganti air', description: 'Catat pergantian air bertahap.', icon: 'water' },
    { slot: 'action3', label: 'Bersihkan kolam', description: 'Catat pembersihan area kolam.', icon: 'clean' },
  ],
  kuning: [
    { slot: 'action1', label: 'Beri makan', description: 'Catat pemberian pakan ayam.', icon: 'feed' },
    { slot: 'action2', label: 'Beri minum', description: 'Catat pengisian air minum bersih.', icon: 'water' },
    { slot: 'action3', label: 'Bersihkan kandang', description: 'Catat pembersihan alas dan kandang.', icon: 'clean' },
  ],
};

export function isCareSlot(value: unknown): value is CareSlot {
  return typeof value === 'string' && CARE_SLOTS.some((slot) => slot === value);
}

export function getCareAction(type: PetType, slot: CareSlot): CareAction {
  return CARE_ACTIONS[type].find((action) => action.slot === slot)!;
}
