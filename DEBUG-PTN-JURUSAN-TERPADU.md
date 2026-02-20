# Debug: PTN Tidak Muncul Saat Pencarian

## Masalah yang Dilaporkan

1. **PTN tidak muncul saat diketik pencarian**
2. **Kategori hanya 2 (Saintek dan Soshum)**

## Perbaikan yang Sudah Dilakukan

### 1. Fix Path File JSON ✅
**Masalah**: Path file JSON salah (`/web-app/data/...` seharusnya `data/...`)

**Perbaikan**:
```javascript
// SEBELUM (SALAH):
const ptnResponse = await fetch('/web-app/data/ptn-complete.json');

// SESUDAH (BENAR):
const ptnResponse = await fetch('data/ptn-complete.json');
```

### 2. Tambah Kategori Filter ✅
**Sebelum**: Hanya 2 kategori (Saintek, Soshum)

**Sesudah**: 7 kategori
- Semua Kategori
- Saintek
- Soshum
- Kedokteran & Kesehatan
- Teknik
- Ekonomi & Bisnis
- Pendidikan
- Pertanian & Kehutanan

### 3. Tambah Console Logging ✅
Untuk memudahkan debugging:
```javascript
console.log('Loading PTN data...');
console.log('PTN loaded:', allPTN.length);
console.log('Majors loaded:', allMajors.length);
console.log('Filtering with:', { searchTerm, regionFilter, categoryFilter });
console.log('Filtered results:', filtered.length);
```

### 4. Perbaiki Filter Function ✅
- Filter search sekarang juga menerima string kosong
- Filter kategori spesifik (Kedokteran, Teknik, dll) sekarang bekerja dengan baik

## Cara Test Perbaikan

### 1. Refresh Halaman
1. Buka `http://localhost:3000/ptn-jurusan-terpadu.html`
2. Tekan **Ctrl + Shift + R** (hard refresh)
3. Atau **Ctrl + F5**

### 2. Buka Developer Tools
1. Tekan **F12**
2. Klik tab **Console**
3. Lihat log yang muncul:
   ```
   Loading PTN data...
   PTN loaded: 60
   Loading Majors data...
   Majors loaded: 100
   Displaying PTN: 60
   ```

### 3. Test Search
1. Ketik "Indonesia" di search box
2. Lihat Console:
   ```
   Filtering with: {searchTerm: "indonesia", regionFilter: "all", categoryFilter: "all"}
   Filtered results: 5
   ```
3. PTN dengan nama "Indonesia" seharusnya muncul (UI, UPI, dll)

### 4. Test Filter Wilayah
1. Pilih "Jawa" di dropdown wilayah
2. Lihat Console:
   ```
   Filtering with: {searchTerm: "", regionFilter: "Jawa", categoryFilter: "all"}
   Filtered results: 25
   ```
3. Hanya PTN di Jawa yang muncul

### 5. Test Filter Kategori
1. Pilih "Kedokteran & Kesehatan" di dropdown kategori
2. Lihat Console:
   ```
   Filtering with: {searchTerm: "", regionFilter: "all", categoryFilter: "Kedokteran"}
   Filtered results: 15
   ```
3. Hanya PTN yang memiliki jurusan Kedokteran/Kesehatan yang muncul

## Jika Masih Bermasalah

### Masalah 1: PTN Tidak Muncul Sama Sekali

**Cek Console untuk Error**:
1. Buka Developer Tools (F12)
2. Lihat tab Console
3. Apakah ada error merah?

**Kemungkinan Error**:

#### Error: "Failed to fetch"
**Penyebab**: File JSON tidak ditemukan

**Solusi**:
1. Pastikan file ada di:
   - `web-app/data/ptn-complete.json`
   - `web-app/data/majors-complete.json`
2. Pastikan server berjalan: `node web-app/server.js`

#### Error: "Unexpected token"
**Penyebab**: File JSON corrupt atau format salah

**Solusi**:
1. Buka file JSON di editor
2. Pastikan format JSON valid (tidak ada koma terakhir, bracket lengkap)
3. Atau regenerate file JSON

### Masalah 2: Search Tidak Berfungsi

**Cek Console saat Ketik**:
1. Ketik di search box
2. Lihat Console, apakah muncul:
   ```
   Filtering with: {searchTerm: "...", ...}
   Filtered results: ...
   ```

**Jika tidak muncul log**:
- Function `filterData()` tidak terpanggil
- Cek apakah ada error JavaScript di Console

**Jika muncul log tapi hasil 0**:
- Search term tidak cocok dengan data
- Coba search term lain (contoh: "ui", "bandung", "jakarta")

### Masalah 3: Filter Kategori Tidak Berfungsi

**Cek Mapping Kategori**:
Kategori spesifik mencari berdasarkan nama jurusan:
- **Kedokteran**: "kedokteran", "kesehatan", "keperawatan", "farmasi", "gizi"
- **Teknik**: "teknik", "informatika", "komputer"
- **Ekonomi**: "ekonomi", "akuntansi", "manajemen", "bisnis"
- **Pendidikan**: "pendidikan"
- **Pertanian**: "pertanian", "agroteknologi", "kehutanan", "peternakan"

**Jika PTN tidak muncul**:
- PTN tersebut mungkin tidak memiliki jurusan di kategori tersebut
- Cek dengan expand PTN dan lihat jurusannya

## Test Manual

### Test 1: Load Data
```javascript
// Di Console, ketik:
console.log('PTN:', allPTN.length);
console.log('Majors:', allMajors.length);
```

**Expected Output**:
```
PTN: 60
Majors: 100
```

### Test 2: Search Function
```javascript
// Di Console, ketik:
document.getElementById('searchInput').value = 'indonesia';
filterData();
```

**Expected**: PTN dengan nama "Indonesia" muncul

### Test 3: Check PTN Data
```javascript
// Di Console, ketik:
console.log(allPTN[0]);
```

**Expected Output**:
```javascript
{
  id: "ui",
  name: "Universitas Indonesia",
  city: "Depok",
  province: "Jawa Barat",
  region: "Jawa",
  accreditation: "A",
  established: 1849,
  website: "https://www.ui.ac.id",
  totalMajors: 120
}
```

### Test 4: Check Majors Data
```javascript
// Di Console, ketik:
console.log(allMajors[0]);
```

**Expected Output**:
```javascript
{
  id: "kedokteran-ui",
  major: "Kedokteran",
  ptnId: "ui",
  faculty: "Fakultas Kedokteran",
  category: "Saintek",
  passingGrade: "65-70%",
  capacity: 100,
  requiredSubjects: [...],
  description: "...",
  careerProspects: [...]
}
```

## Kategori yang Tersedia

### 1. Semua Kategori
Menampilkan semua PTN tanpa filter

### 2. Saintek
Menampilkan PTN yang memiliki jurusan kategori Saintek

### 3. Soshum
Menampilkan PTN yang memiliki jurusan kategori Soshum

### 4. Kedokteran & Kesehatan
Menampilkan PTN yang memiliki jurusan:
- Kedokteran
- Kedokteran Gigi
- Kedokteran Hewan
- Keperawatan
- Kesehatan Masyarakat
- Farmasi
- Gizi

### 5. Teknik
Menampilkan PTN yang memiliki jurusan:
- Teknik Sipil
- Teknik Mesin
- Teknik Elektro
- Teknik Kimia
- Teknik Informatika
- Teknik Industri
- Teknik Perkapalan
- Teknik Kelautan
- Teknik Lingkungan
- dll

### 6. Ekonomi & Bisnis
Menampilkan PTN yang memiliki jurusan:
- Ekonomi
- Ekonomi Pembangunan
- Akuntansi
- Manajemen
- Bisnis

### 7. Pendidikan
Menampilkan PTN yang memiliki jurusan:
- Pendidikan Matematika
- Pendidikan Bahasa Inggris
- Pendidikan Fisika
- dll

### 8. Pertanian & Kehutanan
Menampilkan PTN yang memiliki jurusan:
- Agroteknologi
- Peternakan
- Kehutanan
- Teknologi Pangan

## Beritahu Saya

Setelah refresh halaman dan test, tolong beritahu:

1. **Apakah PTN muncul sekarang?** (Ya/Tidak)
2. **Apakah search berfungsi?** (Ya/Tidak)
3. **Apakah filter kategori berfungsi?** (Ya/Tidak)
4. **Apa yang muncul di Console?** (Screenshot atau copy paste)
5. **Apakah ada error di Console?** (Screenshot atau copy paste)

Dengan informasi ini saya bisa bantu lebih lanjut! 🔍
