# Panduan Proyek

- Baca `DESIGN.md` sebelum mengubah UI.
- Untuk pekerjaan antarmuka, gunakan panduan proyek `.agents/skills/antislop` dan `.agents/skills/design-taste-frontend` sebagai pemeriksaan kualitas yang relevan. Pertahankan pola aplikasi tani yang interaktif; panduan landing page tidak menggantikan kebutuhan navigasi dan alur aplikasi.
- Jaga semua alur sentuh tetap bisa dipakai dengan keyboard dan layar kecil. Kontrol harus mengerjakan aksi yang dinyatakan labelnya; integrasi yang belum tersedia harus dijelaskan dengan jujur.
- Perlakukan login saat ini sebagai pratinjau lokal, bukan autentikasi produksi. Jangan menyimpan kata sandi atau kunci API di browser. Jangan mengaku mengirim email, mengambil cuaca langsung, atau menganalisis gambar dengan AI tanpa backend yang terhubung.
- Aset ilustrasi aplikasi berada di `public/assets/generated/`; catat prompt untuk aset baru di `public/assets/generated/prompts.json` bila berkas tersebut tersedia.
- Jika MCP codebase-memory tersedia, gunakan untuk pertanyaan struktur dan hubungan kode proyek ini. Server memakai konfigurasi proyek di `.codex/config.toml`; jangan memasang hook atau menulis konfigurasi Codex global. Jika MCP tidak tersedia, gunakan pencarian kode biasa.
- Jangan menjalankan skrip dari skill/repo pihak ketiga tanpa membaca dan memastikan efek sampingnya.
