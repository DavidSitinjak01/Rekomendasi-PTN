# 🧪 Cara Test Fitur PTN & Jurusan Dropdown

## Status Server
✅ Server sudah berjalan di: `http://localhost:3000`

## Langkah Test

### 1️⃣ Buka Halaman
Buka browser dan akses:
```
http://localhost:3000/ptn-jurusan-simple.html
```

### 2️⃣ Test Dropdown PTN
1. Lihat dropdown "Pilih Perguruan Tinggi Negeri (PTN)"
2. Klik dropdown tersebut
3. **Harusnya muncul**: Daftar 60+ PTN dengan format "Nama PTN - Kota"
   - Contoh: "Universitas Indonesia - Depok"
   - Contoh: "Institut Teknologi Bandung - Bandung"
   - Contoh: "Universitas Sumatera Utara - Medan"

### 3️⃣ Test Pilih PTN
1. Pilih salah satu PTN (contoh: "Universitas Sumatera Utara - Medan")
2. **Harusnya muncul**: 
   - Section "Daftar Jurusan di Universitas Sumatera Utara"
   - Daftar jurusan dalam bentuk card yang bisa diklik
   - Setiap card menampilkan:
     - Nama jurusan
     - Kategori (Saintek/Soshum)
     - Fakultas
     - Passing Grade

### 4️⃣ Test Klik Jurusan
1. Klik salah satu jurusan (contoh: "Kedokteran")
2. **Harusnya muncul** (dengan animasi slide-down):
   - Header jurusan dengan nama, kategori, fakultas
   - Tabel "Data Indeks Per Tahun" dengan 3 baris:
     - Tahun 2023
     - Tahun 2024
     - Tahun 2033 (Proyeksi)
   - Section "Mata Pelajaran Pendukung & Passing Grade"
   - Card untuk setiap mata pelajaran dengan:
     - Nama mata pelajaran
     - Passing Grade (nilai minimum)
     - Bobot (%)
     - Alasan
   - Deskripsi jurusan
   - Prospek karir
3. **Harusnya auto-scroll** ke detail jurusan

### 5️⃣ Test Tutup Detail
1. Scroll ke bawah, lihat tombol "✕ Tutup Detail"
2. Klik tombol tersebut
3. **Harusnya**: Detail hilang dan kembali ke daftar jurusan

## Contoh Test Case

### Test Case 1: Universitas Indonesia - Kedokteran
1. Pilih PTN: "Universitas Indonesia - Depok"
2. Klik jurusan: "Kedokteran"
3. **Verifikasi**:
   - Passing Grade: 65-70%
   - Mata pelajaran: Biologi (85), Kimia (85), Fisika (80)
   - Tabel indeks ada 3 tahun (2023, 2024, 2033)

### Test Case 2: ITB - Teknik Informatika
1. Pilih PTN: "Institut Teknologi Bandung - Bandung"
2. Klik jurusan: "Teknik Informatika"
3. **Verifikasi**:
   - Passing Grade: 60-65%
   - Mata pelajaran: Matematika (85), Fisika (80), Informatika (85)
   - Bobot masing-masing mata pelajaran ditampilkan

### Test Case 3: USU - Berbagai Jurusan
1. Pilih PTN: "Universitas Sumatera Utara - Medan"
2. **Verifikasi**: Muncul daftar jurusan yang tersedia di USU
3. Klik beberapa jurusan berbeda
4. **Verifikasi**: Detail masing-masing jurusan berbeda

## Checklist Fitur

Centang jika fitur berfungsi:

- [ ] Dropdown PTN muncul dan bisa diklik
- [ ] Daftar PTN lengkap (60+ PTN)
- [ ] Setelah pilih PTN, daftar jurusan muncul
- [ ] Jurusan ditampilkan dalam card yang rapi
- [ ] Klik jurusan, detail muncul dengan animasi
- [ ] Tabel indeks menampilkan 3 tahun (2023, 2024, 2033)
- [ ] Mata pelajaran ditampilkan dengan passing grade
- [ ] Bobot (%) ditampilkan untuk setiap mata pelajaran
- [ ] Alasan mata pelajaran ditampilkan
- [ ] Deskripsi jurusan muncul
- [ ] Prospek karir muncul
- [ ] Auto-scroll ke detail saat klik jurusan
- [ ] Tombol "Tutup Detail" berfungsi
- [ ] Tidak ada error di Console (F12)

## Troubleshooting

### Jika Dropdown Kosong:
1. Buka Console (F12)
2. Lihat apakah ada error
3. Cek apakah file `data/ptn-complete.json` bisa diakses
4. Refresh halaman dengan Ctrl + Shift + R

### Jika Jurusan Tidak Muncul:
1. Pastikan PTN sudah dipilih dari dropdown
2. Buka Console (F12) dan lihat error
3. Cek apakah file `data/majors-complete.json` bisa diakses

### Jika Detail Tidak Muncul:
1. Pastikan jurusan sudah diklik
2. Buka Console (F12) dan lihat error
3. Cek apakah data jurusan memiliki field yang lengkap

## Hasil Test

Silakan test dan laporkan hasilnya:

**Apakah dropdown PTN berfungsi?**
- [ ] Ya, berfungsi
- [ ] Tidak, ada masalah: _________________

**Apakah daftar jurusan muncul setelah pilih PTN?**
- [ ] Ya, muncul
- [ ] Tidak, ada masalah: _________________

**Apakah detail jurusan muncul dengan lengkap?**
- [ ] Ya, lengkap (tabel indeks, mata pelajaran, passing grade, bobot)
- [ ] Tidak lengkap, yang kurang: _________________

**Apakah ada error di Console?**
- [ ] Tidak ada error
- [ ] Ada error: _________________

## Catatan Penting

### Data yang Ditampilkan:
- **Data Indeks 2023, 2024**: Simulasi (untuk demo)
- **Data Indeks 2033**: Proyeksi (untuk demo)
- **Passing Grade**: Real dari database
- **Mata Pelajaran**: Real dari database
- **Bobot**: Real dari database

### Penyederhanaan yang Sudah Dilakukan:
✅ Removed: Teks promosi "Jelajahi 60+ PTN..."
✅ Removed: Kartu statistik (Total PTN, Total Jurusan, dll)
✅ Removed: Filter Wilayah dropdown
✅ Removed: Filter Kategori dropdown
✅ Removed: Emoji icons dari section headers

### Yang Tersisa (Sesuai Permintaan):
✅ Page title
✅ PTN dropdown
✅ Majors list area
✅ Detail panel dengan data lengkap

## Test Sekarang!

Silakan test halaman dan beritahu hasilnya! 🚀
