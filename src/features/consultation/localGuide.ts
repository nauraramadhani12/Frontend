import { getSpecies, SPECIES } from '../../data/species.ts';
import { GROW_GUIDES, yellowLeafAdvice } from '../../data/guides.ts';
import type { PetType, PetVariety } from '../../types/index.ts';

export type PhotoIntent = 'yellow' | 'grow' | 'care';

const GENERAL_NOTE = 'Panduan umum dari aplikasi. Jika gejala memburuk atau meluas, hubungi penyuluh atau petugas setempat.';
const FISH_STEPS = [
  'Berikan pakan sedikit demi sedikit dan amati apakah pakan habis.',
  'Periksa warna, bau, dan kebersihan air kolam. Lakukan pergantian air secara bertahap.',
  'Amati ikan yang lemah atau terluka. Pisahkan bila perlu dan minta bantuan petugas perikanan.',
];
const CHICKEN_STEPS = [
  'Sediakan air minum bersih dan pakan sesuai umur ayam.',
  'Jaga kandang dan sarang tetap bersih, kering, dan berventilasi.',
  'Periksa sarang dan ambil telur setiap hari. Catat bila ada perubahan kondisi ayam.',
];

function numberedSteps(steps: string[]): string {
  return steps.map((step, index) => `${index + 1}. ${step}`).join('\n\n');
}

function findPlant(text: string) {
  const normalized = text.replace(/\bcabe\b/g, 'cabai');
  return SPECIES.tunas.find((item) => normalized.includes(item.label.toLocaleLowerCase('id-ID')));
}

export function getSpeciesType(variety: PetVariety): PetType {
  return SPECIES.tunas.some((item) => item.id === variety)
    ? 'tunas'
    : SPECIES.koki.some((item) => item.id === variety) ? 'koki' : 'kuning';
}

export function getLocalReply(question: string): string {
  const text = question.toLocaleLowerCase('id-ID');
  const namedPlant = findPlant(text);
  let advice: string;

  if (/\b(ikan|kolam|lele|nila|koi)\b|ikan mas/.test(text)) {
    advice = `Untuk merawat ikan dan kolam:\n\n${numberedSteps(FISH_STEPS)}`;
  } else if (/\b(ayam|kandang|petelur|telur)\b/.test(text)) {
    advice = `Untuk merawat ayam:\n\n${numberedSteps(CHICKEN_STEPS)}`;
  } else if (text.includes('kuning')) {
    advice = namedPlant
      ? yellowLeafAdvice(namedPlant.label.toLowerCase())
      : 'Sebutkan jenis tanaman yang daunnya menguning. Periksa juga kelembapan tanah, bagian bawah daun, dan apakah perubahan muncul pada daun tua atau muda.';
  } else if (namedPlant && /budidaya|menanam|tanam|tutorial/.test(text)) {
    advice = `Langkah awal budidaya ${namedPlant.label.toLowerCase()}:\n\n${numberedSteps(GROW_GUIDES[namedPlant.id] || [])}`;
  } else if (/hama|wereng|ulat|kutu|bercak/.test(text)) {
    advice = 'Periksa bagian bawah daun dan catat seberapa luas perubahan yang terlihat. Singkirkan hama yang terlihat dan jaga kebersihan area tanam. Jika memakai produk pengendali hama, ikuti petunjuk pada labelnya.';
  } else if (/pupuk|nutrisi|hara/.test(text)) {
    advice = 'Gunakan kompos matang atau pupuk sesuai kebutuhan tanaman dan petunjuk kemasan. Mulai dari dosis rendah. Hindari menambah pupuk hanya karena daun berubah warna sebelum penyebabnya diperiksa.';
  } else if (/siram|nyiram|air|layu/.test(text)) {
    advice = 'Periksa kelembapan media terlebih dahulu. Untuk tanaman dalam pot, siram saat lapisan atas mulai kering dan pastikan air dapat keluar melalui lubang drainase. Sesuaikan dengan jenis tanaman dan kondisi cuaca.';
  } else if (namedPlant) {
    advice = `Untuk ${namedPlant.label.toLowerCase()}, mulai dengan panduan ini:\n\n${numberedSteps(GROW_GUIDES[namedPlant.id] || [])}`;
  } else {
    advice = 'Ceritakan jenis tanaman atau hewan, perubahan yang terlihat, sejak kapan terjadi, dan perawatan terakhirnya. Untuk tanaman, misalnya: “Daun kangkung mulai kuning sejak kemarin, tanahnya masih basah.”';
  }

  return `${advice}\n\n${GENERAL_NOTE}`;
}

export function getPhotoGuidance(variety: PetVariety, intent: PhotoIntent, description: string): { question: string; reply: string } {
  const type = getSpeciesType(variety);
  const species = getSpecies(type, variety);
  const intentLabel = type === 'tunas' && intent === 'yellow'
    ? 'Daun menguning'
    : type === 'tunas' && intent === 'grow' ? 'Cara budidaya' : 'Perawatan harian';
  const details = description.trim();
  const question = `${species.label}: ${intentLabel.toLowerCase()}${details ? `\n${details}` : ''}`;
  let advice: string;

  if (type === 'tunas' && intent === 'yellow') {
    advice = yellowLeafAdvice(species.label.toLowerCase());
  } else if (type === 'tunas' && intent === 'grow') {
    advice = numberedSteps(GROW_GUIDES[variety] || []);
  } else if (type === 'tunas') {
    advice = `Periksa kelembapan media, cahaya, dan bagian bawah daun ${species.label.toLowerCase()}. Catat perubahan yang terlihat sebelum menambah pupuk atau produk perawatan.\n\n${numberedSteps((GROW_GUIDES[variety] || []).slice(0, 2))}`;
  } else {
    advice = numberedSteps(type === 'koki' ? FISH_STEPS : CHICKEN_STEPS);
  }

  return {
    question,
    reply: `Panduan ${species.label.toLowerCase()} berdasarkan jenis dan kebutuhan yang dipilih:\n\n${advice}\n\nFoto belum dibaca otomatis. ${GENERAL_NOTE}`,
  };
}
