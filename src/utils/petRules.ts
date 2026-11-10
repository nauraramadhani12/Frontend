import { PetState, PetType, ChatConversation } from '../types/index.ts';

export const INITIAL_PETS: Record<PetType, PetState> = {
  tunas: {
    type: 'tunas',
    variety: 'padi',
    name: 'Si Tunas',
    species: 'Padi Berkah Sawah',
    stat1Name: 'Nutrisi',
    stat1: 30,
    stat2Name: 'Air',
    stat2: 10,
    stat3Name: 'Senang',
    stat3: 25,
    speech: 'Kak, aku haus banget... tolong siram aku ya! 💦',
    isHungryOrThirsty: true,
  },
  koki: {
    type: 'koki',
    variety: 'koi',
    name: 'Si Koki',
    species: 'Ikan Mas Koi Cantik',
    stat1Name: 'Pakan',
    stat1: 15,
    stat2Name: 'Air',
    stat2: 40,
    stat3Name: 'Senang',
    stat3: 30,
    speech: 'Blub... aku lapar banget, tolong kasih makan ya!',
    isHungryOrThirsty: true,
  },
  kuning: {
    type: 'kuning',
    variety: 'kampung',
    name: 'Si Kuning',
    species: 'Anak Ayam Kampung',
    stat1Name: 'Kenyang',
    stat1: 15,
    stat2Name: 'Kandang',
    stat2: 40,
    stat3Name: 'Senang',
    stat3: 30,
    speech: 'Kukuruyuk... aku lapar banget, kasih makan dong!',
    isHungryOrThirsty: true,
  },
};

export const RANK_LEVELS = [
  { level: 1, title: 'Benih Harapan', minCare: 0, maxCare: 5 },
  { level: 2, title: 'Tunas Muda', minCare: 5, maxCare: 10 },
  { level: 3, title: 'Padi Berisi', minCare: 10, maxCare: 15 },
  { level: 4, title: 'Lumbung Padi Lestari', minCare: 15, maxCare: 20 },
  { level: 5, title: 'Petani Teladan', minCare: 20, maxCare: 30 },
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
    const plantLabel = pet.variety === 'berry' ? 'berry' : pet.variety === 'pisang' ? 'pisang' : pet.variety === 'sorgum' ? 'sorgum' : 'padi';
    if (actionSlot === 'action1') {
      // Siram
      updated.stat2 = Math.min(100, updated.stat2 + 30);
      updated.stat3 = Math.min(100, updated.stat3 + 15);
      feedbackText = `💦 Segar sekali! Air sejuk meresap ke akar tanaman ${plantLabel}!`;
      updated.speech =
        pet.variety === 'berry'
          ? 'Segarnya! Buah berryku makin montok dan manis! 🍓'
          : pet.variety === 'pisang'
          ? 'Segarnya! Daun pisangku makin mekar dan hijau! 🍌'
          : pet.variety === 'sorgum'
          ? 'Segarnya! Tanaman sorgumku makin subur! 🌾'
          : 'Segarnya! Terima kasih sudah menyiramku, Kak! 🌱';
    } else if (actionSlot === 'action2') {
      // Pupuk
      updated.stat1 = Math.min(100, updated.stat1 + 35);
      updated.stat3 = Math.min(100, updated.stat3 + 20);
      feedbackText = `🌿 Nutrisi organik diserap! Tanaman ${plantLabel} makin subur!`;
      updated.speech =
        pet.variety === 'berry'
          ? 'Nyam! Pupuk organiknya bikin buah berry makin lebat! ✨'
          : pet.variety === 'pisang'
          ? 'Nyam! Pupuk bikin pohon pisangku kokoh! 🍌'
          : 'Nyam! Pupuk organiknya bikin aku makin subur! ✨';
    } else {
      // Sinar Matahari
      updated.stat3 = Math.min(100, updated.stat3 + 30);
      updated.stat1 = Math.min(100, updated.stat1 + 10);
      feedbackText = `☀️ Hangatnya mentari pagi menyinari tanaman ${plantLabel}!`;
      updated.speech =
        pet.variety === 'berry'
          ? 'Hangatnya mentari mematangkan buah berry dengan sempurna! 🌞'
          : 'Hangatnya sinar surya pagi di sawah! Senang sekali! 🌞';
    }
  } else if (pet.type === 'koki') {
    if (actionSlot === 'action1') {
      // Beri Makan
      updated.stat1 = Math.min(100, updated.stat1 + 35);
      updated.stat3 = Math.min(100, updated.stat3 + 20);
      feedbackText = '🥖 Pelet lezat dimakan lahap!';
      updated.speech = 'Nyam nyam! Blub blub, perutku kenyang sekali! 🐟';
    } else if (actionSlot === 'action2') {
      // Ganti Air
      updated.stat2 = Math.min(100, updated.stat2 + 30);
      updated.stat3 = Math.min(100, updated.stat3 + 15);
      feedbackText = '💧 Air kolam jernih dan kaya oksigen!';
      updated.speech = 'Airnya bersih dan segar, aku bisa berenang lincah! 🌊';
    } else {
      // Kuras Air
      updated.stat2 = Math.min(100, updated.stat2 + 40);
      updated.stat3 = Math.min(100, updated.stat3 + 25);
      feedbackText = '✨ Lumut dan endapan dasar kolam dibersihkan!';
      updated.speech = 'Dasar kolam berkilau tanpa kotoran, terima kasih! 🧼';
    }
  } else {
    // Si Kuning
    if (actionSlot === 'action1') {
      // Beri Makan
      updated.stat1 = Math.min(100, updated.stat1 + 35);
      updated.stat3 = Math.min(100, updated.stat3 + 20);
      feedbackText = '🌽 Biji jagung manis dipatuk dengan gembira!';
      updated.speech = 'Kukuruyuk! Jagung manis ini lezat sekali! 🌾';
    } else if (actionSlot === 'action2') {
      // Beri Minum
      updated.stat3 = Math.min(100, updated.stat3 + 20);
      updated.stat1 = Math.min(100, updated.stat1 + 10);
      feedbackText = '💧 Wadah minum terisi air bersih!';
      updated.speech = 'Gluk gluk... segarnya air minum di cuaca hangat! 💧';
    } else {
      // Bersihkan
      updated.stat2 = Math.min(100, updated.stat2 + 35);
      updated.stat3 = Math.min(100, updated.stat3 + 25);
      feedbackText = '🧹 Kandang disapu bersih dari sekam kotor!';
      updated.speech = 'Kandangku wangi dan hangat, nyaman untuk istirahat! ✨';
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
