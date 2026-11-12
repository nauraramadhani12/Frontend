import type { PetState, PetType, ChatConversation } from '../types/index.ts';
import { getSpecies } from '../data/species.ts';

export const INITIAL_PETS: Record<PetType, PetState> = {
  tunas: {
    type: 'tunas',
    variety: 'sorgum',
    name: 'Sorgum',
    species: 'Tanaman sorgum',
    stat1Name: 'Nutrisi',
    stat1: 30,
    stat2Name: 'Air',
    stat2: 10,
    stat3Name: 'Senang',
    stat3: 25,
    speech: 'Periksa kelembapan tanah sebelum menyiram.',
    isHungryOrThirsty: true,
  },
  koki: {
    type: 'koki',
    variety: 'lele',
    name: 'Lele',
    species: 'Ikan lele',
    stat1Name: 'Pakan',
    stat1: 15,
    stat2Name: 'Air',
    stat2: 40,
    stat3Name: 'Senang',
    stat3: 30,
    speech: 'Periksa pakan dan kualitas air kolam.',
    isHungryOrThirsty: true,
  },
  kuning: {
    type: 'kuning',
    variety: 'petelur',
    name: 'Ayam petelur',
    species: 'Ayam petelur',
    stat1Name: 'Kenyang',
    stat1: 15,
    stat2Name: 'Kandang',
    stat2: 40,
    stat3Name: 'Senang',
    stat3: 30,
    speech: 'Pastikan pakan, air minum, dan kandang terjaga.',
    isHungryOrThirsty: true,
  },
};

export const RANK_LEVELS = [
  { level: 1, title: 'Benih Harapan', minCare: 0, maxCare: 3 },
  { level: 2, title: 'Tunas Muda', minCare: 3, maxCare: 6 },
  { level: 3, title: 'Padi Berisi', minCare: 6, maxCare: 10 },
  { level: 4, title: 'Lumbung Padi Lestari', minCare: 10, maxCare: 20 },
  { level: 5, title: 'Petani Teladan', minCare: 20, maxCare: 20 },
];

export function calculateMood(pet: PetState): 'sad' | 'happy' {
  // If primary survival stat is low (<= 25%), the pet is sad and needs help
  if (pet.stat1 <= 25 || pet.stat2 <= 25 || pet.stat3 <= 30) {
    return 'sad';
  }
  return 'happy';
}

export function performCareAction(
  pet: PetState,
  actionSlot: 'action1' | 'action2' | 'action3'
): { updatedPet: PetState; xpGained: number; feedbackText: string } {
  const updated: PetState = { ...pet };
  let feedbackText = '';

  if (pet.type === 'tunas') {
    const plantLabel = getSpecies('tunas', pet.variety).label.toLowerCase();
    if (actionSlot === 'action1') {
      // Siram
      updated.stat2 = Math.min(100, updated.stat2 + 30);
      updated.stat3 = Math.min(100, updated.stat3 + 15);
      feedbackText = `Penyiraman ${plantLabel} tercatat.`;
      updated.speech = `Penyiraman ${plantLabel} tercatat. Cek tanah sebelum menyiram lagi.`;
    } else if (actionSlot === 'action2') {
      // Pupuk
      updated.stat1 = Math.min(100, updated.stat1 + 35);
      updated.stat3 = Math.min(100, updated.stat3 + 20);
      feedbackText = `Pemupukan ${plantLabel} tercatat.`;
      updated.speech = `Pemupukan ${plantLabel} tercatat. Ikuti dosis sesuai jenis pupuk.`;
    } else {
      // Sinar Matahari
      updated.stat3 = Math.min(100, updated.stat3 + 30);
      updated.stat1 = Math.min(100, updated.stat1 + 10);
      feedbackText = `Pemeriksaan cahaya ${plantLabel} tercatat.`;
      updated.speech = `Pemeriksaan cahaya ${plantLabel} tercatat.`;
    }
  } else if (pet.type === 'koki') {
    if (actionSlot === 'action1') {
      // Beri Makan
      updated.stat1 = Math.min(100, updated.stat1 + 35);
      updated.stat3 = Math.min(100, updated.stat3 + 20);
      feedbackText = 'Pemberian pakan ikan tercatat.';
      updated.speech = 'Pakan tercatat. Amati apakah pakan habis dalam beberapa menit.';
    } else if (actionSlot === 'action2') {
      // Ganti Air
      updated.stat2 = Math.min(100, updated.stat2 + 30);
      updated.stat3 = Math.min(100, updated.stat3 + 15);
      feedbackText = 'Pergantian air kolam tercatat.';
      updated.speech = 'Pergantian air tercatat. Lakukan bertahap.';
    } else {
      // Kuras Air
      updated.stat2 = Math.min(100, updated.stat2 + 40);
      updated.stat3 = Math.min(100, updated.stat3 + 25);
      feedbackText = 'Pembersihan kolam tercatat.';
      updated.speech = 'Pembersihan kolam tercatat.';
    }
  } else {
    // Si Kuning
    if (actionSlot === 'action1') {
      // Beri Makan
      updated.stat1 = Math.min(100, updated.stat1 + 35);
      updated.stat3 = Math.min(100, updated.stat3 + 20);
      feedbackText = 'Pemberian pakan ayam tercatat.';
      updated.speech = 'Pakan tercatat. Gunakan ransum sesuai umur ayam.';
    } else if (actionSlot === 'action2') {
      // Beri Minum
      updated.stat3 = Math.min(100, updated.stat3 + 20);
      updated.stat1 = Math.min(100, updated.stat1 + 10);
      feedbackText = 'Pengisian air minum tercatat.';
      updated.speech = 'Air minum tercatat. Pastikan wadah tetap bersih.';
    } else {
      // Bersihkan
      updated.stat2 = Math.min(100, updated.stat2 + 35);
      updated.stat3 = Math.min(100, updated.stat3 + 25);
      feedbackText = 'Pembersihan kandang tercatat.';
      updated.speech = 'Pembersihan kandang tercatat. Jaga alas tetap kering.';
    }
  }

  updated.isHungryOrThirsty = calculateMood(updated) === 'sad';
  return { updatedPet: updated, xpGained: 1, feedbackText };
}

export function getRankInfo(totalCares: number) {
  // Matches screenshots: Level 4 "Lumbung Padi Lestari" with 12 / 20 (8 kali lagi menuju Level 5)
  if (totalCares >= 20) {
    return {
      level: 5,
      title: 'Petani Teladan',
      subtitle: 'Puncak dedikasi menjaga ketahanan pangan Nusantara.',
      current: totalCares,
      max: 20,
      remaining: 0,
      isMax: true,
      progressPct: 100,
    };
  }
  if (totalCares >= 10) {
    return {
      level: 4,
      title: 'Lumbung Padi Lestari',
      subtitle: 'Rawatan konsisten menjaga kesuburan sawah dan ternak tetap prima.',
      current: totalCares,
      max: 20,
      remaining: Math.max(0, 20 - totalCares),
      isMax: false,
      progressPct: Math.round((totalCares / 20) * 100),
    };
  }
  if (totalCares >= 6) {
    return {
      level: 3,
      title: 'Padi Berisi',
      subtitle: 'Keahlian merawat semakin matang dan penuh berkah.',
      current: totalCares,
      max: 10,
      remaining: 10 - totalCares,
      isMax: false,
      progressPct: Math.round((totalCares / 10) * 100),
    };
  }
  if (totalCares >= 3) {
    return {
      level: 2,
      title: 'Tunas Muda',
      subtitle: 'Langkah awal membiasakan rutinitas rawat tani.',
      current: totalCares,
      max: 6,
      remaining: 6 - totalCares,
      isMax: false,
      progressPct: Math.round((totalCares / 6) * 100),
    };
  }
  return {
    level: 1,
    title: 'Benih Harapan',
    subtitle: 'Menanam komitmen pertama merawat alam.',
    current: totalCares,
    max: 3,
    remaining: 3 - totalCares,
    isMax: false,
    progressPct: Math.round((totalCares / 3) * 100),
  };
}

export function searchConversations(conversations: ChatConversation[], query: string): ChatConversation[] {
  const q = query.trim().toLowerCase();
  if (!q) return conversations;
  return conversations.filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      c.snippet.toLowerCase().includes(q) ||
      c.messages.some((m) => m.text.toLowerCase().includes(q))
  );
}
