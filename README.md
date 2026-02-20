# Excel Data Analyzer

Aplikasi analisis data Excel dengan fitur statistik, filtering, sorting, dan validasi data.

## ✨ Status

✅ **Aplikasi sudah siap digunakan!**

Semua fitur utama telah diimplementasikan dan ditest (61 unit tests passing).

## 🚀 Fitur

- 📊 **Membaca file Excel** - Support format .xlsx dengan multiple worksheets
- 📈 **Analisis Statistik** - Mean, median, mode, std dev, min/max, sum
- 🔍 **Filter Data** - Equals, greater than, less than, contains
- 🔄 **Sort Data** - Ascending/descending untuk semua tipe data
- 🔎 **Pencarian** - Search dengan highlighting hasil
- ✅ **Validasi Data** - Deteksi data kosong dan kelengkapan
- 💾 **Export** - Ke Excel (.xlsx) atau CSV
- 🖥️ **CLI Interface** - Menu interaktif yang mudah digunakan

## 📦 Instalasi

Aplikasi sudah terinstall! Tidak perlu instalasi tambahan.

## 🎯 Cara Menggunakan

### Jalankan Aplikasi

```bash
npm start
```

### Menu yang Tersedia

1. **Buka File Excel** - Load file .xlsx Anda
2. **Lihat Data** - Tampilkan data yang sudah dimuat
3. **Analisis Statistik** - Hitung statistik untuk kolom numerik
4. **Filter Data** - Filter berdasarkan kriteria
5. **Sort Data** - Urutkan data berdasarkan kolom
6. **Cari Data** - Cari keyword di semua kolom
7. **Validasi Data** - Cek kelengkapan data
8. **Export Data** - Simpan hasil ke Excel/CSV

### Contoh Quick Start

```bash
# 1. Jalankan aplikasi
npm start

# 2. Pilih menu 1 (Buka File Excel)
# 3. Masukkan: Rekomendasi PTN.xlsx
# 4. Pilih worksheet yang tersedia
# 5. Gunakan menu lainnya untuk analisis
```

Lihat [CARA-PENGGUNAAN.md](CARA-PENGGUNAAN.md) untuk panduan lengkap.

## 🧪 Testing

```bash
# Run all tests (61 tests)
npm test

# Run tests with coverage
npm test:coverage

# Run specific test
npm test -- ExcelReader.test.js
```

**Test Status:** ✅ 61/61 passing

## 📁 Struktur Project

```
.
├── src/                           # Source code
│   ├── ExcelReader.js            # Baca file Excel
│   ├── Dataset.js                # Data model
│   ├── StatisticalCalculator.js  # Statistik
│   ├── FilterEngine.js           # Filter data
│   ├── SortEngine.js             # Sort data
│   ├── SearchEngine.js           # Search data
│   ├── ValidationEngine.js       # Validasi data
│   ├── ExcelWriter.js            # Export data
│   └── index.js                  # Main app
├── tests/
│   ├── unit/                     # Unit tests (61 tests)
│   ├── property/                 # Property-based tests
│   └── integration/              # Integration tests
├── .kiro/specs/                  # Specification documents
│   └── excel-data-analyzer/
│       ├── requirements.md       # Requirements
│       ├── design.md             # Design doc
│       └── tasks.md              # Implementation tasks
├── CARA-PENGGUNAAN.md            # Panduan lengkap
└── package.json
```

## 🛠️ Technology Stack

- **Runtime:** Node.js
- **Excel Processing:** xlsx (SheetJS)
- **Testing:** Jest
- **Property Testing:** fast-check
- **Linting:** ESLint

## 📊 Tested With

Aplikasi telah ditest dengan file "Rekomendasi PTN.xlsx":
- ✅ 177 baris data
- ✅ 136 kolom
- ✅ Multiple data types (text, number, date)
- ✅ Semua fitur berfungsi dengan baik

## 📝 Requirements

- Node.js >= 14.x
- npm >= 6.x

## 📄 License

ISC

## 🤝 Kontribusi

Aplikasi ini dibuat dengan spesifikasi lengkap di folder `.kiro/specs/excel-data-analyzer/`

---

**Dibuat dengan ❤️ menggunakan Kiro AI**
