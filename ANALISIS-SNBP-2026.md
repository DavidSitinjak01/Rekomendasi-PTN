# 📊 Analisis SNBP 2026 - Sistem Rekomendasi PTN

## 🎯 Ringkasan Eksekutif

SNBP (Seleksi Nasional Berdasarkan Prestasi) 2026 adalah jalur masuk PTN berbasis nilai rapor dan prestasi, **tanpa ujian tulis UTBK-SNBT**. Ada perubahan penting: **Nilai TKA (Tes Kemampuan Akademik) wajib** sebagai validator nilai rapor.

---

## 📋 Analisis Detail

### 1. Persyaratan Siswa

| Kriteria | Keterangan | Relevansi untuk Aplikasi |
|----------|------------|--------------------------|
| **NIK & NISN Valid** | Wajib terdaftar resmi | ✅ Aplikasi sudah support NISN |
| **Data di PDSS** | Nilai rapor lengkap | ✅ Aplikasi bisa input nilai per semester |
| **Prestasi Akademik** | Nilai rapor unggul | ✅ Aplikasi analisis nilai & rekomendasi |
| **Nilai TKA** | **BARU 2026** - Validator rapor | ⚠️ Perlu ditambahkan ke aplikasi |
| **Prestasi Lain** | Lomba, portofolio | ⚠️ Belum ada di aplikasi |

### 2. Kuota Sekolah Berdasarkan Akreditasi

```
Akreditasi A  → 40% siswa terbaik
Akreditasi B  → 25% siswa terbaik  
Akreditasi C  → 5% siswa terbaik
+ Bonus kuota untuk sekolah dengan e-rapor
```

**Implikasi:**
- Siswa harus masuk ranking teratas di sekolahnya
- Aplikasi bisa menampilkan ranking siswa dalam kelas/sekolah
- Perlu fitur simulasi: "Apakah saya masuk kuota SNBP?"

### 3. Proses Seleksi

**Faktor Penilaian:**
1. ✅ Nilai rapor (semester 1-5) - **Aplikasi sudah support**
2. ✅ Konsistensi nilai - **Aplikasi bisa analisis tren**
3. ⚠️ Nilai TKA - **Perlu ditambahkan**
4. ⚠️ Prestasi lomba/non-akademik - **Perlu ditambahkan**
5. ✅ Kesesuaian jurusan dengan nilai - **Aplikasi sudah ada**

### 4. Aturan Pilihan Jurusan

| Skenario | Aturan |
|----------|--------|
| **Pilih 1 Jurusan** | Bebas pilih PTN mana saja |
| **Pilih 2 Jurusan** | 1 harus di PTN se-provinsi dengan sekolah |

**Implikasi untuk Aplikasi:**
- Perlu filter PTN berdasarkan provinsi
- Rekomendasi harus mempertimbangkan lokasi sekolah
- Validasi pilihan jurusan (max 2, 1 harus se-provinsi)

### 5. Aturan Khusus 2026

⚠️ **PENTING:**
- Siswa yang lolos SNBP **TIDAK BOLEH** ikut SNBT atau seleksi mandiri
- Nilai TKA **WAJIB** dilampirkan
- Ini adalah jalur "all-in" - harus yakin sebelum daftar

---

## 🔄 Perbandingan dengan Aplikasi Saat Ini

### ✅ Fitur yang Sudah Ada:
1. Input nilai rapor per semester (1-6)
2. Analisis nilai dan tren kenaikan
3. Rekomendasi jurusan berdasarkan nilai
4. Database PTN dan jurusan
5. Match score jurusan dengan profil siswa
6. Download PDF laporan

### ⚠️ Fitur yang Perlu Ditambahkan:

#### A. Data Siswa
- [ ] Input nilai TKA
- [ ] Input prestasi lomba/non-akademik
- [ ] Input akreditasi sekolah
- [ ] Input provinsi sekolah

#### B. Analisis SNBP
- [ ] Simulasi kuota SNBP (berdasarkan akreditasi)
- [ ] Ranking siswa dalam sekolah
- [ ] Prediksi peluang lolos SNBP
- [ ] Validasi pilihan jurusan (aturan 2 pilihan)

#### C. Rekomendasi
- [ ] Filter PTN berdasarkan provinsi
- [ ] Rekomendasi strategi: SNBP vs SNBT
- [ ] Skor kelayakan SNBP (rapor + TKA + prestasi)

---

## 📅 Timeline SNBP 2026

| Tanggal | Kegiatan | Action untuk Aplikasi |
|---------|----------|----------------------|
| **29 Des 2025** | Pengumuman kuota sekolah | Info ke admin/guru |
| **5 Jan - 2 Feb** | Pengisian PDSS sekolah | Pastikan data lengkap |
| **12 Jan - 18 Feb** | Registrasi akun siswa | Reminder ke siswa |
| **3 - 18 Feb** | Pendaftaran SNBP | Cek kelengkapan data |
| **31 Mar 2026** | Pengumuman hasil | - |

---

## 💡 Rekomendasi Pengembangan Aplikasi

### Priority 1 (High Impact):
1. **Tambah field Nilai TKA** - Wajib untuk SNBP 2026
2. **Input Akreditasi Sekolah** - Untuk simulasi kuota
3. **Simulasi Peluang SNBP** - Berdasarkan ranking & akreditasi
4. **Filter PTN by Provinsi** - Untuk aturan 2 pilihan

### Priority 2 (Medium Impact):
5. **Input Prestasi Non-Akademik** - Poin tambahan SNBP
6. **Ranking Siswa** - Posisi dalam sekolah
7. **Strategi Selector** - SNBP vs SNBT recommendation

### Priority 3 (Nice to Have):
8. **Timeline Tracker** - Reminder jadwal SNBP
9. **Checklist Kelengkapan** - NIK, NISN, PDSS, TKA
10. **Perbandingan SNBP vs SNBT** - Edukasi siswa

---

## 🎯 Formula Skor SNBP (Usulan)

```javascript
Skor SNBP = (Nilai Rapor × 40%) + 
            (Nilai TKA × 30%) + 
            (Konsistensi Nilai × 20%) + 
            (Prestasi Lain × 10%)

Peluang Lolos = Skor SNBP × Faktor Akreditasi × Faktor Ranking
```

**Faktor Akreditasi:**
- A: 1.0 (kuota 40%)
- B: 0.625 (kuota 25%)
- C: 0.125 (kuota 5%)

**Faktor Ranking:**
- Top 10%: 1.0
- Top 25%: 0.8
- Top 40%: 0.6
- Lainnya: 0.3

---

## 📊 Contoh Implementasi

### Struktur Data Baru:

```javascript
{
  "student": {
    "nama": "John Doe",
    "nisn": "1234567890",
    "kelas": "XII IPA 1",
    "sekolah": {
      "nama": "SMA Negeri 1",
      "akreditasi": "A",
      "provinsi": "Jawa Barat"
    },
    "nilaiTKA": 550,  // NEW
    "prestasi": [     // NEW
      {
        "jenis": "Lomba",
        "nama": "OSN Matematika",
        "tingkat": "Provinsi",
        "peringkat": "Juara 2"
      }
    ],
    "grades": [
      { "semester": 1, "subjects": {...} },
      { "semester": 2, "subjects": {...} },
      ...
    ]
  }
}
```

### API Endpoint Baru:

```javascript
// Simulasi peluang SNBP
GET /api/students/:id/snbp-simulation

Response:
{
  "skorSNBP": 85.5,
  "ranking": "Top 15%",
  "kuotaSekolah": "40%",
  "peluangLolos": "Tinggi",
  "rekomendasi": [
    "Anda masuk kuota SNBP sekolah",
    "Nilai TKA Anda di atas rata-rata",
    "Pertimbangkan pilihan 2 jurusan"
  ]
}
```

---

## 🚀 Roadmap Implementasi

### Phase 1: Data Enhancement (1-2 minggu)
- Tambah field TKA, akreditasi, provinsi
- Update database schema
- Update form input

### Phase 2: SNBP Logic (2-3 minggu)
- Implementasi formula skor SNBP
- Simulasi kuota & ranking
- Validasi pilihan jurusan

### Phase 3: UI/UX (1-2 minggu)
- Dashboard SNBP
- Visualisasi peluang
- Timeline & reminder

### Phase 4: Testing & Refinement (1 minggu)
- Test dengan data real
- User feedback
- Bug fixes

**Total estimasi: 5-8 minggu**

---

## 📝 Kesimpulan

Informasi SNBP 2026 ini sangat relevan untuk aplikasi rekomendasi PTN Anda. Dengan menambahkan fitur-fitur yang disebutkan di atas, aplikasi akan menjadi **tool lengkap** untuk membantu siswa:

1. ✅ Menganalisis peluang lolos SNBP
2. ✅ Memilih strategi jalur masuk PTN
3. ✅ Memilih jurusan yang tepat
4. ✅ Mempersiapkan dokumen lengkap

**Nilai tambah utama:** Aplikasi tidak hanya memberikan rekomendasi jurusan, tapi juga **prediksi peluang lolos** dan **strategi optimal** untuk masuk PTN.

---

**Apakah Anda ingin saya implementasikan fitur-fitur ini ke aplikasi?** 🚀
