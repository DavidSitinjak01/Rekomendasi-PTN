# 🧪 Cara Test Fitur Autocomplete PTN

## Langkah-Langkah Test

### 1. Buka Halaman
```
http://localhost:3000/ptn-jurusan-terpadu.html
```

### 2. Test Autocomplete

#### Test A: Ketik "Universitas Sumatera Utara"
1. Ketik di search box: **"Universitas"**
2. Lihat dropdown muncul dengan beberapa PTN
3. Ketik lebih spesifik: **"Universitas Sumatera"**
4. Klik **"Universitas Sumatera Utara"** dari dropdown

**Expected Result**:
- Dropdown muncul setelah ketik 2 karakter
- PTN USU muncul di dropdown
- Setelah klik, halaman menampilkan USU
- Daftar jurusan USU langsung terbuka
- Scroll otomatis ke card USU

#### Test B: Ketik "ITB"
1. Ketik di search box: **"ITB"**
2. Lihat dropdown muncul
3. Klik **"Institut Teknologi Bandung"**

**Expected Result**:
- Dropdown muncul dengan ITB
- Setelah klik, halaman menampilkan ITB
- Daftar jurusan ITB langsung terbuka

#### Test C: Ketik Nama Kota
1. Ketik di search box: **"Bandung"**
2. Lihat dropdown muncul dengan PTN di Bandung
3. Klik salah satu PTN

**Expected Result**:
- Dropdown menampilkan: ITB, Unpad, UPI, dll
- Setelah klik, PTN yang dipilih ditampilkan

### 3. Test Detail Jurusan

#### Klik Jurusan "Kedokteran"
1. Setelah PTN terbuka, klik card **"Kedokteran"**
2. Lihat detail yang muncul

**Expected Result**:
Detail jurusan menampilkan:

✅ **Passing Grade & Daya Tampung**:
```
Passing Grade: 65-70%
Daya Tampung: 100 mahasiswa
```

✅ **Data Historis 3 Tahun**:
```
Tahun | Peminat | Diterima | Keketatan
2024  | 1200    | 100      | 1:12 (merah)
2023  | 1100    | 100      | 1:11 (orange)
2022  | 1000    | 100      | 1:10 (hijau)
```

✅ **Mata Pelajaran**:
```
Biologi - Min: 85 (Bobot: 30%)
Kimia - Min: 85 (Bobot: 30%)
Fisika - Min: 80 (Bobot: 20%)
Matematika (Umum) - Min: 75 (Bobot: 10%)
Bahasa Inggris - Min: 75 (Bobot: 10%)
```

✅ **Deskripsi**:
```
Program studi yang mempelajari ilmu kesehatan dan penyakit manusia
```

✅ **Prospek Karir**:
```
[Dokter Umum] [Dokter Spesialis] [Peneliti Medis] [Dosen]
```

### 4. Test Close Dropdown

#### Test Close dengan Klik Luar
1. Ketik di search box untuk memunculkan dropdown
2. Klik di area luar search box

**Expected Result**:
- Dropdown tertutup otomatis

#### Test Close dengan Pilih PTN
1. Ketik di search box
2. Klik salah satu PTN dari dropdown

**Expected Result**:
- Dropdown tertutup
- PTN yang dipilih ditampilkan

### 5. Test Filter Kombinasi

#### Test dengan Filter Wilayah
1. Ketik "Universitas" di search box
2. Pilih "Jawa" di filter wilayah
3. Lihat hasil

**Expected Result**:
- Hanya PTN di Jawa yang muncul di dropdown
- Hasil filter sesuai dengan wilayah

#### Test dengan Filter Kategori
1. Ketik "Universitas" di search box
2. Pilih "Kedokteran & Kesehatan" di filter kategori
3. Lihat hasil

**Expected Result**:
- Hanya PTN yang memiliki jurusan Kedokteran/Kesehatan yang muncul

## Checklist Test

### ✅ Autocomplete
- [ ] Dropdown muncul setelah ketik 2 karakter
- [ ] Dropdown menampilkan maksimal 8 PTN
- [ ] Dropdown menampilkan nama PTN, lokasi, jumlah jurusan
- [ ] Klik PTN dari dropdown berfungsi
- [ ] Dropdown tertutup setelah pilih PTN
- [ ] Dropdown tertutup saat klik luar

### ✅ Auto-Expand
- [ ] Jurusan langsung terbuka setelah pilih PTN
- [ ] Scroll otomatis ke PTN yang dipilih
- [ ] Animasi smooth

### ✅ Data Historis
- [ ] Tabel 3 tahun terakhir muncul
- [ ] Data tahun 2024, 2023, 2022 ada
- [ ] Jumlah peminat ditampilkan
- [ ] Jumlah diterima ditampilkan
- [ ] Tingkat keketatan ditampilkan
- [ ] Warna badge sesuai (merah/orange/hijau)

### ✅ Mata Pelajaran
- [ ] Nama mata pelajaran ditampilkan
- [ ] Nilai minimum ditampilkan
- [ ] Bobot penilaian ditampilkan (%)

### ✅ Passing Grade & Daya Tampung
- [ ] Passing grade ditampilkan
- [ ] Daya tampung ditampilkan
- [ ] Format card rapi

### ✅ Deskripsi & Prospek Karir
- [ ] Deskripsi jurusan ditampilkan
- [ ] Prospek karir ditampilkan dalam tag

## Test dengan PTN Berbeda

### Test 10 PTN:
1. ✅ Universitas Indonesia (UI)
2. ✅ Institut Teknologi Bandung (ITB)
3. ✅ Universitas Gadjah Mada (UGM)
4. ✅ Universitas Sumatera Utara (USU)
5. ✅ Universitas Airlangga (Unair)
6. ✅ Universitas Hasanuddin (Unhas)
7. ✅ Universitas Padjadjaran (Unpad)
8. ✅ Institut Teknologi Sepuluh Nopember (ITS)
9. ✅ Universitas Brawijaya (UB)
10. ✅ Universitas Diponegoro (Undip)

## Troubleshooting

### Dropdown Tidak Muncul
**Solusi**:
1. Pastikan ketik minimal 2 karakter
2. Buka Console (F12), cek error
3. Refresh halaman (Ctrl + Shift + R)

### Jurusan Tidak Auto-Expand
**Solusi**:
1. Refresh halaman (Ctrl + Shift + R)
2. Cek Console untuk error
3. Pastikan PTN memiliki jurusan

### Data Historis Tidak Muncul
**Solusi**:
1. Data historis saat ini random/simulasi
2. Refresh halaman untuk generate ulang
3. Cek Console untuk error

### Scroll Tidak Smooth
**Solusi**:
1. Pastikan browser support smooth scroll
2. Coba browser lain (Chrome/Firefox)

## Screenshot Expected

### 1. Autocomplete Dropdown
```
┌─────────────────────────────────────────┐
│ 🔍 Ketik nama PTN...                    │
├─────────────────────────────────────────┤
│ 📍 Universitas Indonesia                │
│    Depok, Jawa Barat • 🎓 120 Jurusan  │
├─────────────────────────────────────────┤
│ 📍 Universitas Sumatera Utara           │
│    Medan, Sumatera Utara • 🎓 85 Jur   │
└─────────────────────────────────────────┘
```

### 2. Detail Jurusan
```
┌─────────────────────────────────────────┐
│ Kedokteran                              │
│ [Saintek] 📊 65-70% 👥 100             │
├─────────────────────────────────────────┤
│ 📊 Passing Grade & Daya Tampung         │
│ ┌──────────┬──────────┐                │
│ │ 65-70%   │ 100 mhs  │                │
│ └──────────┴──────────┘                │
│                                         │
│ 📈 Data Historis 3 Tahun Terakhir       │
│ ┌──────┬─────────┬─────────┬─────────┐ │
│ │ 2024 │ 1200    │ 100     │ 1:12    │ │
│ │ 2023 │ 1100    │ 100     │ 1:11    │ │
│ │ 2022 │ 1000    │ 100     │ 1:10    │ │
│ └──────┴─────────┴─────────┴─────────┘ │
│                                         │
│ 📚 Mata Pelajaran yang Dibutuhkan       │
│ • Biologi - Min: 85 (Bobot: 30%)       │
│ • Kimia - Min: 85 (Bobot: 30%)         │
│ • Fisika - Min: 80 (Bobot: 20%)        │
└─────────────────────────────────────────┘
```

## Status Test

Setelah test semua fitur, beritahu saya:

1. ✅ Autocomplete berfungsi? (Ya/Tidak)
2. ✅ Auto-expand berfungsi? (Ya/Tidak)
3. ✅ Data historis muncul? (Ya/Tidak)
4. ✅ Bobot mata pelajaran muncul? (Ya/Tidak)
5. ✅ Passing grade & daya tampung muncul? (Ya/Tidak)

Jika ada yang tidak berfungsi, screenshot Console (F12) dan beritahu saya! 🔍
