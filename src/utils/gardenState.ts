import type { PetState, PetType, PetVariety, UserProfile } from '../types/index.ts';
import { SPECIES, getSpecies } from '../data/species.ts';
import { INITIAL_PETS, calculateMood } from './petRules.ts';
import { isRecord } from './storage.ts';

export const PET_TYPES: readonly PetType[] = ['tunas', 'koki', 'kuning'];
export type SpeciesPets = Partial<Record<PetVariety, PetState>>;
export const DEFAULT_PROFILE: UserProfile = {
  name: 'Sobat Tani',
  region: '',
  email: '',
  careFocus: ['tanaman'],
  soundEnabled: true,
  reminderEnabled: false,
  textSize: 'medium',
  language: 'Indonesia',
  avatarUrl: '/assets/generated/avatar-penyuluh.png',
  isLoggedIn: false,
};

function text(value: unknown, fallback: string, limit: number): string {
  return typeof value === 'string' ? value.trim().slice(0, limit) : fallback;
}

function percentage(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? Math.max(0, Math.min(100, Math.round(value))) : fallback;
}

function avatar(value: unknown): string {
  if (typeof value !== 'string' || value.length > 1_500_000 || value === '/assets/generated/pet-plant.png') return DEFAULT_PROFILE.avatarUrl;
  return /^\/assets\/[a-zA-Z0-9/_.-]+$/.test(value) || /^https:\/\//.test(value) || /^data:image\/(?:png|jpeg|webp);base64,/.test(value)
    ? value
    : DEFAULT_PROFILE.avatarUrl;
}

export function normalizeProfile(value: unknown): UserProfile {
  const raw = isRecord(value) ? value : {};
  const careFocus = Array.isArray(raw.careFocus)
    ? [...new Set(raw.careFocus.filter((item): item is 'tanaman' | 'ikan' | 'ayam' => item === 'tanaman' || item === 'ikan' || item === 'ayam'))]
    : [...DEFAULT_PROFILE.careFocus];
  return {
    name: text(raw.name, DEFAULT_PROFILE.name, 80) || DEFAULT_PROFILE.name,
    region: text(raw.region, '', 160),
    email: text(raw.email, '', 254),
    careFocus,
    soundEnabled: typeof raw.soundEnabled === 'boolean' ? raw.soundEnabled : DEFAULT_PROFILE.soundEnabled,
    reminderEnabled: typeof raw.reminderEnabled === 'boolean' ? raw.reminderEnabled : DEFAULT_PROFILE.reminderEnabled,
    textSize: raw.textSize === 'small' || raw.textSize === 'large' ? raw.textSize : 'medium',
    language: text(raw.language, DEFAULT_PROFILE.language, 40) || DEFAULT_PROFILE.language,
    avatarUrl: avatar(raw.avatarUrl),
    isLoggedIn: raw.isLoggedIn === true,
  };
}

export function normalizePetType(value: unknown): PetType {
  return value === 'koki' || value === 'kuning' ? value : 'tunas';
}

export function normalizeNonNegativeInteger(value: unknown): number {
  const number = typeof value === 'number' ? value : typeof value === 'string' && value.trim() ? Number(value) : 0;
  return Number.isFinite(number) ? Math.min(Number.MAX_SAFE_INTEGER, Math.max(0, Math.floor(number))) : 0;
}

export function createSpeciesPet(type: PetType, variety?: PetVariety, previous?: PetState): PetState {
  const species = getSpecies(type, variety);
  const base = previous || INITIAL_PETS[type];
  return {
    ...base,
    type,
    variety: species.id,
    name: species.label,
    species: type === 'tunas' ? `Tanaman ${species.label.toLowerCase()}` : type === 'koki' && !species.label.toLowerCase().startsWith('ikan') ? `Ikan ${species.label.toLowerCase()}` : species.label,
  };
}

export function normalizePets(value: unknown): Record<PetType, PetState> {
  const raw = isRecord(value) ? value : {};
  return Object.fromEntries(PET_TYPES.map((type) => {
    const stored = isRecord(raw[type]) ? raw[type] : {};
    return [type, normalizePet(type, stored, stored.variety as PetVariety)];
  })) as Record<PetType, PetState>;
}

function normalizePet(type: PetType, value: unknown, variety?: PetVariety): PetState {
  const stored = isRecord(value) ? value : {};
  const base = INITIAL_PETS[type];
  const pet = createSpeciesPet(type, variety, {
    ...base,
    stat1: percentage(stored.stat1, base.stat1),
    stat2: percentage(stored.stat2, base.stat2),
    stat3: percentage(stored.stat3, base.stat3),
    speech: text(stored.speech, base.speech, 500),
  });
  pet.isHungryOrThirsty = calculateMood(pet) === 'sad';
  return pet;
}

export function normalizeSpeciesPets(value: unknown, legacyPets = normalizePets(null)): SpeciesPets {
  const raw = isRecord(value) ? value : {};
  const normalized: SpeciesPets = {};
  for (const type of PET_TYPES) {
    for (const species of SPECIES[type]) {
      if (isRecord(raw[species.id])) normalized[species.id] = normalizePet(type, raw[species.id], species.id);
    }
    const previous = legacyPets[type];
    const selected = getSpecies(type, previous?.variety).id;
    if (!normalized[selected]) normalized[selected] = normalizePet(type, previous, selected);
  }
  return normalized;
}

export function getSpeciesPet(store: SpeciesPets, type: PetType, variety?: PetVariety): PetState {
  const species = getSpecies(type, variety);
  return normalizePet(type, store[species.id], species.id);
}

export function selectedVarieties(pets: Record<PetType, PetState>): Record<PetType, PetVariety> {
  return Object.fromEntries(PET_TYPES.map((type) => [type, getSpecies(type, pets[type].variety).id])) as Record<PetType, PetVariety>;
}
