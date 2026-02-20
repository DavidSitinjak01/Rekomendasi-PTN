# Cara Penggunaan Aplikasi Analisis Data Excel

## Instalasi

Aplikasi sudah terinstall di komputer Anda. Tidak perlu instalasi tambahan.

## Menjalankan Aplikasi

1. Buka Command Prompt atau Terminal
2. Masuk ke folder aplikasi:
   ```
   cd "D:\Rekomendasi PTN"
   ```
3. Jalankan aplikasi:
   ```
   npm start
   ```

## Menu Aplikasi

### 1. Buka File Excel
- Masukkan path file Excel Anda (contoh: `Rekomendasi PTN.xlsx`)
- Pilih worksheet yang ingin dianalisis
- Data akan dimuat ke dalam aplikasi

### 2. Lihat Data
- Menampilkan data yang sudah dimuat
- Menampilkan maksimal 20 baris pertama
- Menampilkan informasi jumlah baris dan kolom

### 3. Analisis Statistik
- Pilih kolom numerik untuk dianalisis
- Aplikasi akan menghitung:
  - Rata-rata (mean)
  - Median
  - Modus
  - Standar deviasi
  - Nilai minimum dan maksimum
  - Jumlah total (sum)

### 4. Filter Data
- Pilih kolom yang ingin difilter
- Pilih operator:
  - **equals**: Sama dengan nilai tertentu
  - **gt**: Lebih besar dari (untuk angka)
  - **lt**: Lebih kecil dari (untuk angka)
  - **contains**: Mengandung teks tertentu
- Masukkan nilai filter
- Hasil filter dapat disimpan sebagai dataset aktif

### 5. Sort Data
- Pilih kolom untuk pengurutan
- Pilih urutan:
  - **asc**: Ascending (A-Z, kecil ke besar)
  - **desc**: Descending (Z-A, besar ke kecil)
- Hasil sort dapat disimpan sebagai dataset aktif

### 6. Cari Data
- Masukkan kata kunci pencarian
- Aplikasi akan mencari di semua kolom
- Hasil ditampilkan dengan highlight `>>keyword<<`

### 7. Validasi Data
- Memeriksa kelengkapan data
- Menampilkan:
  - Jumlah baris tidak lengkap
  - Persentase kelengkapan per kolom
  - Jumlah cell kosong per kolom

### 8. Export Data
- Export data yang sudah difilter/sort
- Format yang tersedia:
  - Excel (.xlsx)
  - CSV (.csv)
- Masukkan path file output

### 0. Keluar
- Keluar dari aplikasi

## Contoh Penggunaan

### Contoh 1: Analisis Statistik
```
1. Pilih menu 1 (Buka File Excel)
2. Masukkan: Rekomendasi PTN.xlsx
3. Pilih worksheet yang tersedia
4. Pilih menu 3 (Analisis Statistik)
5. Pilih kolom numerik (misalnya: Nilai)
6. Lihat hasil statistik
```

### Contoh 2: Filter dan Export
```
1. Buka file Excel (menu 1)
2. Pilih menu 4 (Filter Data)
3. Pilih kolom untuk filter
4. Pilih operator (misalnya: gt untuk lebih besar dari)
5. Masukkan nilai (misalnya: 80)
6. Simpan hasil filter sebagai dataset aktif (y)
7. Pilih menu 8 (Export Data)
8. Pilih format (1 untuk Excel, 2 untuk CSV)
9. Masukkan path output (misalnya: hasil-filter.xlsx)
```

## Tips

- Pastikan file Excel Anda dalam format .xlsx
- Untuk analisis statistik, pastikan kolom berisi data numerik
- Hasil filter dan sort dapat disimpan sebagai dataset aktif untuk operasi selanjutnya
- Gunakan validasi data untuk memeriksa kelengkapan data sebelum analisis

## Troubleshooting

### File tidak ditemukan
- Pastikan path file benar
- Gunakan path lengkap atau relatif dari folder aplikasi
- Contoh: `Rekomendasi PTN.xlsx` atau `D:\Data\file.xlsx`

### Kolom tidak ditemukan
- Pastikan nama kolom ditulis dengan benar (case-sensitive)
- Lihat daftar kolom yang tersedia di menu 2 (Lihat Data)

### Statistik tidak dapat dihitung
- Pastikan kolom yang dipilih berisi data numerik
- Kolom teks tidak dapat dihitung statistiknya

## Kontak

Jika ada pertanyaan atau masalah, silakan hubungi developer.
