# Dewi Sri

Frontend React dan TypeScript untuk merawat tanaman, ikan, dan ayam. Aplikasi berjalan secara lokal di browser; tidak membutuhkan kata sandi atau kunci API.

## Menjalankan

```sh
npm install
npm run dev
```

```sh
npm run lint
npm test
npm run build
```

## Struktur

| Lokasi | Tanggung jawab |
| --- | --- |
| `src/App.tsx` | Navigasi, penggabungan state, dan aksi aplikasi |
| `src/components/garden/` | Pemilih kegiatan, panduan, dan editor jadwal |
| `src/data/species.ts` | Nama, kelompok, dan aset setiap jenis |
| `src/data/care.ts` | Label dan aksi perawatan yang dipakai bersama |
| `src/features/consultation/localGuide.ts` | Jawaban teks dan panduan foto berbasis pilihan pengguna |
| `src/hooks/usePersistentState.ts` | State browser dengan penanganan kegagalan penyimpanan |
| `src/utils/gardenState.ts` | Validasi profil dan progres setiap spesies |
| `src/utils/careSchedule.ts` | Jadwal, migrasi format lama, dan penyelesaian harian |
| `src/utils/careJournal.ts` | Catatan kegiatan yang benar-benar ditekan pengguna |
| `src/utils/chatStorage.ts` | Validasi dan penyimpanan percakapan |
| `src/styles/` | Fondasi visual dan CSS per kelompok halaman |

`src/garden.css` hanya menggabungkan fondasi dan gaya halaman kebun. Halaman konsultasi, profil, serta onboarding mengimpor gaya masing-masing.

## Menambah jenis dan aset

1. Tambahkan ID pada union jenis di `src/types/index.ts`.
2. Tambahkan entri pada `src/data/species.ts`, termasuk kelompok dan gambar yang sesuai bentuk aslinya.
3. Lengkapi panduan dalam `src/data/guides.ts` bila termasuk tanaman.
4. Simpan gambar di `public/assets/generated/` dan catat prompt pada `prompts.json`. Gunakan WebP ringan untuk UI; sumber PNG boleh disimpan.

Progres dan jadwal disimpan per ID spesies. Format lama berdasarkan kategori tetap dibaca dan dipindahkan hanya ke jenis yang sebelumnya dipilih. Data baru melalui normalisasi sebelum dipakai UI. Semua tanggal harian memakai Asia/Jakarta.

## Batas frontend dan titik integrasi

- Kamera/galeri melampirkan foto; panduan saat ini memakai jenis, kebutuhan, dan keterangan pengguna. Gambar belum dianalisis AI.
- Jawaban lokal terpisah di `localGuide.ts`, sehingga penyedia jawaban backend dapat disambungkan melalui lapisan ini dan state konsultasi tanpa mengganti tampilan.
- Panel cuaca menampilkan status belum terhubung. Lokasi profil sudah tersedia sebagai masukan layanan cuaca kelak.
- Jadwal berulang setiap hari. Tanda pengingat hanya tampil di beranda saat aplikasi dibuka dan diaktifkan; belum ada push notification.
- Profil, jadwal, jurnal, poin, dan percakapan belum tersinkron antarperangkat. Penyimpanan penuh atau diblokir ditampilkan kepada pengguna, dan aplikasi tetap dapat digunakan sementara.
- Kunci AI/cuaca dan autentikasi produksi harus berada di backend. Jangan menaruh rahasia pada variabel `VITE_*` atau browser.

Hasil pemeriksaan frontend dan alur yang diperiksa tercatat di [docs/frontend-verification.md](docs/frontend-verification.md).
