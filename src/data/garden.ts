import type { PetType } from '../types/index.ts';

export const GARDEN_CATEGORIES: Record<PetType, { label: string; habitat: string; image: string; subject: string }> = {
  tunas: { label: 'Tanaman', habitat: 'Kebun tanaman', image: '/assets/generated/garden.webp', subject: '/assets/generated/sorgum.webp' },
  koki: { label: 'Ikan', habitat: 'Kolam air tawar', image: '/assets/generated/pond.webp', subject: '/assets/generated/nila.webp' },
  kuning: { label: 'Ayam', habitat: 'Halaman & kandang', image: '/assets/generated/kandang.webp', subject: '/assets/generated/ayam-petelur.webp' },
};
export const ACTION_ART = {
  care: '/assets/generated/care-tools-v1.webp',
  photo: '/assets/generated/photo-leaf-v1.webp',
  schedule: '/assets/generated/daily-calendar-v2.webp',
};
