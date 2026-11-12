# Pemeriksaan frontend Dewi Sri

Status: **PASS** untuk lingkup frontend lokal, 12 November 2026.

## Bukti pemeriksaan

- `npm run lint`: TypeScript lulus.
- `npm test`: 18 pengujian lulus, mencakup migrasi data lama, storage diblokir/penuh, validasi percakapan, progres spesies terpisah, batas tanggal Jakarta, jurnal, dan batas peringkat.
- `npm run build`: build produksi Vite berhasil.
- Chromium: tidak ada page error atau gambar gagal dimuat pada alur yang diperiksa.
- Lebar 320, 390, dan 1440 px diperiksa. Tidak ada halaman melebar ke samping. Ukuran tulisan besar 18–20 px juga diperiksa.
- Browser dengan `localStorage` diblokir tetap dapat membuka perawatan dan mencatat kegiatan sementara, dengan pemberitahuan penyimpanan.

| Alur | Hasil yang diamati |
| --- | --- |
| Pilihan jenis | Kategori membuka dialog; kelompok Sayuran dan pencarian Kangkung bekerja; pilihan mengubah nama, aset, dan habitat |
| Perawatan | Siram Kangkung menambah indikator latihannya; Melon tetap memiliki nilai awal sendiri |
| Jadwal | Buat Kangkung 08.30 dan Nila 09.00; ubah Nila menjadi 16.00; reload mempertahankan kedua jadwal |
| Penyelesaian jadwal | Catat Kangkung mengubah status hari ini dan menambahkan catatan jurnal |
| Jurnal | Kegiatan nyata ditampilkan dengan jenis, tanggal, dan waktu |
| Panduan & cuaca | Panduan ayam/telur terbuka; cuaca menampilkan status belum terhubung dan tujuan pengaturan lokasi |
| Foto | Kamera/galeri membuka pemilih native; gambar dipratinjau sebelum disimpan; jenis, kebutuhan, dan keterangan menghasilkan panduan lokal |
| Percakapan | Riwayat membuka foto/pesan yang benar; membuka kembali tidak mengubah waktu/urutan; percakapan baru tidak menimpa yang lama |
| Profil | Validasi nama/fokus bekerja; foto merupakan draft sebelum Save; Batal mempertahankan foto sebelumnya; Save menyimpan semua perubahan |
| Pengaturan | Suara, tanda pengingat, dan tiga ukuran tulisan berubah; informasi akun/bahasa/bantuan memakai dialog native |
| Profil lokal | Tamu tidak diberi email buatan; email lama dipertahankan saat melanjutkan tanpa email; pembuatan profil menerima email opsional |
| Perjalanan tani | Jenjang sesuai jumlah perawatan; klaim +5 poin tersimpan dan dinonaktifkan sesudah reload hari yang sama |
| Keyboard | Escape menutup dialog; fokus kembali ke pembuka; semua kontrol memakai elemen native dan focus ring |
| Data lama | Progres dan jadwal kategori Kangkung dipindah hanya ke Kangkung; Melon tidak mewarisi progresnya |

## Pemeriksaan kualitas antarmuka

Panduan antislop dan design-taste dipakai untuk kualitas aplikasi interaktif sesuai AGENTS.md. Aturan komposisi landing page tidak diterapkan pada navigasi aplikasi.

| Aturan | Status dan bukti |
| --- | --- |
| R-01 | PASS: lapisan warna pada kanvas luar dan habitat memperjelas isi, bukan dekorasi berulang |
| R-02 | PASS: pencarian karakter em dash pada `src` dan `index.html` tidak menemukan salinan UI baru |
| R-03 | PASS: 320/390/1440 px dan tulisan besar tanpa overflow horizontal |
| R-04 | PASS: ikon menunjukkan tindakan; gambar alat siram, kamera, dan kalender membantu membaca label |
| R-05 | PASS: struktur mengikuti kebutuhan kebun, aksi, jadwal, dan catatan aplikasi |
| R-06 | PASS: Nunito Sans mengikuti arah visual proyek; hierarki huruf memakai ukuran yang terbatas |
| R-07 | PASS: tidak ada grid dekoratif |
| R-08 | PASS: chevron menunjukkan perpindahan halaman atau dialog, bukan ditempel pada semua aksi |
| R-09 | PASS: label status menjelaskan kondisi lokal/terpilih; tidak ada klaim AI aktif |
| R-10 | PASS: blur hanya pada navigasi dan backdrop dialog |
| R-11 | PASS: radius bidang, tombol, input, dan ikon dibedakan |
| R-12 | PASS: elevasi dibatasi pada navigasi, shell, dan dialog |
| R-13 | PASS: tidak ada glow antarmuka |
| R-14 | PASS: tiga kartu aksi setara karena pengguna meminta semuanya diprioritaskan |
| R-15 | PASS: aksi memakai label konkret seperti Simpan jadwal, Foto kondisi, dan Catat |
| R-16 | PASS: tidak ada salinan pemasaran AI atau klaim layanan palsu |
| R-17 | PASS: angka berasal dari state lokal pengguna; indikator latihan dilabeli sebagai simulasi |
| R-18 | PASS: tidak ada testimoni atau identitas pengguna buatan |
| R-19 | PASS: gerak singkat untuk respons kontrol; tidak ada dekorasi bergerak terus |
| R-20 | PASS: spesies, habitat, jurnal, dan rutinitas tani memberi identitas khusus |
| R-21 | PASS: satu tema terang yang sesuai arah proyek |
| R-22 | PASS: ilustrasi baru menunjukkan alat yang terkait aksi aplikasi |
| R-23 | PASS: aset baru dibuat dalam lingkup permintaan; tanaman tanpa wajah dan hewan tanpa aksesori |
| R-24 | PASS: empat tujuan navigasi memiliki halaman yang bekerja |
| R-25 | PASS: teks utama/putih pada hijau 6.71:1; teks pendamping pada krem 5.32:1; teks habitat pada krem 5.78:1; batas input 3.22:1 |
| R-26 | PASS: tombol kategori, perawatan, jadwal, foto, panduan, riwayat, profil, dan poin diperiksa melalui interaksi browser |
| R-27 | PASS: state kosong, pembacaan foto, berkas salah, validasi formulir, dan storage gagal tersedia |
| R-28 | PASS: tidak ada FAQ pengisi |
| R-29 | PASS: krem, hijau daun, serta warna terakota pada aset mengikuti satu palet |
| R-30 | PASS: komposisi aplikasi tidak menyalin landing page atau kerangka produk lain |
| R-31 | PASS: tujuan visual dan keputusan navigasi dicatat di DESIGN.md |
| R-32 | PASS: kontrol native, focus ring, penahanan fokus dialog, Escape, dan pengembalian fokus |
| R-33 | PASS: fitur ditulis dalam sumber; tidak menggunakan skrip penggantian teks source/CSS |
| R-34 | PASS: tidak ada toggle tema yang belum lengkap |
| R-35 | PASS: build, pengujian data, dan alur interaktif di tabel bukti telah dijalankan |
| R-36 | PASS: metadata dan keterangan UI mencerminkan kemampuan frontend lokal |
| R-37 | PASS: arah visual proyek dan jawaban pengguna menjadi dasar implementasi |
| R-38 | PASS: ilustrasi tidak diklaim sebagai foto pengguna; layanan belum terhubung ditampilkan dengan jujur |
| R-39 | PASS: label kontrol, alt gambar, target sentuh, state, semantik, dan reduced motion tersedia |
| R-40 | PASS: habitat/ilustrasi memakai WebP dan ruang gambar tetap; gambar utama tidak lazy; tidak ada skrip pihak ketiga yang memblokir head |

ENERGY 2 / RHYTHM 2 / MOTION 1 sesuai hasil: habitat sebagai fokus, kelompok aksi setara, ruang baca untuk jadwal, dan gerak singkat. C-1 sampai C-5 lulus berdasarkan alasan visual, alur nyata, isi sesuai tugas, state/kontrol aksesibel, serta klaim yang sesuai kemampuan aplikasi.

## Batas pemeriksaan

Pemilih foto native dan `capture="environment"` diperiksa dari browser. Kamera fisik ponsel dan tampilan izin sistem operasi belum dicoba di perangkat nyata. AI analisis gambar, cuaca langsung, autentikasi server, sinkronisasi, dan push notification memang belum disambungkan pada tahap frontend ini.

## Pembaruan latar langit

PASS: beranda memakai aset `sky-morning-v1.webp` dengan langit biru dan awan yang memudar ke krem. Teks kepala halaman digelapkan dan pilihan kategori memakai bidang putih lembut. Build produksi berhasil; Chromium pada 320/390/1440 px tidak menunjukkan overflow atau page error, dan perpindahan Beranda → Jadwal → Beranda tetap bekerja. Pratinjau tersedia di `.artifacts/sky-fish-390.png` dan `.artifacts/sky-home-320.png`.
