# Rencana Database PTN & Jurusan Lengkap

## Yang Akan Dibuat

### 1. Database PTN Lengkap
**Jumlah**: 80+ PTN se-Indonesia

**Wilayah**:
- Sumatera (15 PTN)
- Jawa (30 PTN)
- Kalimantan (8 PTN)
- Sulawesi (10 PTN)
- Bali & Nusa Tenggara (5 PTN)
- Maluku & Papua (5 PTN)

**Data Per PTN**:
- Nama lengkap
- Kota/Provinsi
- Akreditasi
- Website
- Jumlah jurusan

### 2. Database Jurusan Lengkap
**Jumlah**: 2000+ jurusan

**Kategori**:
- Saintek (Kedokteran, Teknik, MIPA, dll)
- Soshum (Ekonomi, Hukum, Sosial, dll)
- Campuran

**Data Per Jurusan**:
- Nama jurusan
- PTN
- Fakultas
- Kategori
- Passing Grade
- Daya Tampung
- **Mata Pelajaran yang Dibutuhkan** (dengan nilai minimum)
- Prospek Karir
- Deskripsi singkat

### 3. Halaman Baru: PTN & Jurusan Terpadu
**File**: `ptn-jurusan-database.html`

**Fitur**:
- List PTN dengan search & filter wilayah
- Klik PTN → Expand list jurusan
- Klik Jurusan → Expand detail lengkap:
  * Mata pelajaran yang dibutuhkan
  * Passing grade
  * Daya tampung
  * Prospek karir
  * Deskripsi

**Desain**:
```
┌─────────────────────────────────────────┐
│  [Search PTN/Jurusan...]  [Wilayah ▼]  │
├─────────────────────────────────────────┤
│  📍 Universitas Indonesia (UI)          │
│     Jakarta | A | 50 Jurusan            │
│     [▼ Lihat Semua Jurusan]            │
│                                         │
│     ┌───────────────────────────────┐  │
│     │ 🏥 Kedokteran                 │  │
│     │    [▼ Lihat Detail]           │  │
│     │                               │  │
│     │    📚 Mapel Dibutuhkan:       │  │
│     │    • Kimia (Min: 80)          │  │
│     │    • Biologi (Min: 80)        │  │
│     │    • Fisika (Min: 75)         │  │
│     │                               │  │
│     │    📊 Passing Grade: 65-70%   │  │
│     │    👥 Daya Tampung: 100       │  │
│     │    💼 Prospek: Dokter, dll    │  │
│     └───────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## Estimasi

**Waktu**: 30-40 menit
**Token**: ~15.000-20.000 token
**File yang Dibuat**:
1. `web-app/data/ptn-complete.json` - Database PTN lengkap
2. `web-app/data/majors-complete.json` - Database jurusan lengkap
3. `web-app/public/ptn-jurusan-database.html` - Halaman baru

## Catatan

Karena membuat 2000+ jurusan manual akan sangat panjang, saya akan:
1. Buat template data yang representatif
2. Fokus pada PTN & jurusan populer
3. Struktur data yang mudah ditambahkan nanti

Apakah Anda setuju dengan pendekatan ini?
