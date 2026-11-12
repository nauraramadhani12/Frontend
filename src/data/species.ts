import type { PetType, PetVariety } from '../types/index.ts';

export interface Species {
  id: PetVariety;
  label: string;
  image: string;
  note: string;
  group: 'sayuran' | 'buah' | 'bijian' | 'ikan' | 'unggas';
}

export const SPECIES: Record<PetType, Species[]> = {
  tunas: [
    { id: 'sorgum', label: 'Sorgum', image: '/assets/generated/sorgum.webp', note: 'Biji-bijian', group: 'bijian' },
    { id: 'kangkung', label: 'Kangkung', image: '/assets/generated/kangkung.webp', note: 'Sayuran daun', group: 'sayuran' },
    { id: 'sawi', label: 'Sawi', image: '/assets/generated/sawi.webp', note: 'Sayuran daun', group: 'sayuran' },
    { id: 'selada', label: 'Selada', image: '/assets/generated/selada.webp', note: 'Sayuran daun', group: 'sayuran' },
    { id: 'melon', label: 'Melon', image: '/assets/generated/melon.webp', note: 'Buah', group: 'buah' },
    { id: 'semangka', label: 'Semangka', image: '/assets/generated/semangka.webp', note: 'Buah', group: 'buah' },
    { id: 'cabai', label: 'Cabai', image: '/assets/generated/cabai.webp', note: 'Sayuran buah', group: 'sayuran' },
  ],
  koki: [
    { id: 'lele', label: 'Lele', image: '/assets/generated/lele.webp', note: 'Ikan air tawar', group: 'ikan' },
    { id: 'nila', label: 'Nila', image: '/assets/generated/nila.webp', note: 'Ikan air tawar', group: 'ikan' },
    { id: 'mas', label: 'Ikan mas', image: '/assets/generated/ikan-mas.webp', note: 'Ikan air tawar', group: 'ikan' },
  ],
  kuning: [
    { id: 'petelur', label: 'Ayam petelur', image: '/assets/generated/ayam-petelur.webp', note: 'Unggas darat', group: 'unggas' },
  ],
};

export function getSpecies(type: PetType, variety?: PetVariety): Species {
  return SPECIES[type].find((item) => item.id === variety) ?? SPECIES[type][0];
}
