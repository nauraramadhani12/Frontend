import type { PetVariety } from '../types/index.ts';

export const GROW_GUIDES: Partial<Record<PetVariety, string[]>> = {
  sorgum: ['Tanam benih pada lahan yang mendapat matahari penuh.', 'Jaga tanah lembap saat awal tumbuh, lalu hindari genangan.', 'Amati malai dan panen saat biji matang sesuai varietas.'],
  kangkung: ['Siapkan bedengan atau wadah dengan media gembur dan drainase baik.', 'Sebar benih, tutup tipis, lalu jaga media lembap.', 'Panen pucuk saat batang dan daun sudah cukup panjang.'],
  sawi: ['Semai benih di media gembur, lalu pindahkan saat bibit kuat.', 'Siram secukupnya dan periksa hama di bawah daun.', 'Panen daun saat ukuran sesuai kebutuhan.'],
  selada: ['Semai di tempat terang yang tidak terlalu panas.', 'Jaga kelembapan media tanpa membuat akar tergenang.', 'Petik daun luar atau panen seluruh tanaman saat cukup besar.'],
  melon: ['Tanam di tempat dengan matahari penuh dan tanah berdrainase baik.', 'Beri ruang rambat dan bantu penyangga buah bila perlu.', 'Periksa kematangan buah berdasarkan aroma, warna, dan tangkai.'],
  semangka: ['Tanam pada lahan hangat dengan ruang rambat yang cukup.', 'Siram teratur di awal tumbuh, hindari genangan di sekitar akar.', 'Periksa kematangan dari sulur dekat buah dan warna bagian yang menyentuh tanah.'],
  cabai: ['Semai benih, lalu pindahkan setelah bibit memiliki beberapa daun sejati.', 'Jaga tanah lembap, beri cahaya cukup, dan hindari genangan.', 'Panen buah merah bertahap dan amati kutu serta bercak daun.'],
};

export function yellowLeafAdvice(plant: string): string {
  return `Daun ${plant} menguning bisa berkaitan dengan air berlebih atau kurang, kekurangan hara, umur daun, atau serangan hama. Periksa kelembapan tanah, bagian bawah daun, dan apakah gejala muncul pada daun tua atau muda. Jangan menambah pupuk atau pestisida sebelum penyebabnya lebih jelas.`;
}
