# 🐛 Debug Autocomplete - Langkah Detail

## Step 1: Hard Refresh
1. Buka `http://localhost:3000/ptn-jurusan-terpadu.html`
2. Tekan **Ctrl + Shift + R** (Windows) atau **Cmd + Shift + R** (Mac)
3. Tunggu halaman reload

## Step 2: Buka Console
1. Tekan **F12**
2. Klik tab **Console**
3. Lihat apakah ada log:
   ```
   Loading PTN data...
   PTN loaded: 60
   Loading Majors data...
   Majors loaded: 100+
   ```

### Jika Log Tidak Muncul:
**Masalah**: Data tidak ter-load

**Solusi**:
1. Pastikan server berjalan: `node web-app/server.js`
2. Cek apakah file JSON ada:
   - `web-app/data/ptn-complete.json`
   - `web-app/data/majors-complete.json`
3. Refresh ulang halaman

## Step 3: Test Manual di Console

### Test 1: Cek Data Ter-load
Ketik di Console:
```javascript
console.log('allPTN:', allPTN);
console.log('allMajors:', allMajors);
```

**Expected**:
- `allPTN: Array(60)`
- `allMajors: Array(100+)`

**Jika undefined**:
- Data belum ter-load
- Tunggu beberapa detik, coba lagi

### Test 2: Cek Function Ada
Ketik di Console:
```javascript
console.log(typeof handleSearchInput);
console.log(typeof selectPTN);
console.log(typeof filterData);
```

**Expected**: Semua harus "function"

**Jika undefined**:
- File JavaScript belum ter-load
- Hard refresh lagi

### Test 3: Cek Element Ada
Ketik di Console:
```javascript
console.log(document.getElementById('searchInput'));
console.log(document.getElementById('autocompleteDropdown'));
```

**Expected**: Kedua element harus ada (bukan null)

**Jika null**:
- HTML belum ter-load
- Refresh halaman

### Test 4: Test Function Manual
Ketik di Console:
```javascript
// Set value search input
document.getElementById('searchInput').value = 'Universitas';

// Panggil function
handleSearchInput();

// Cek dropdown
console.log(document.getElementById('autocompleteDropdown').innerHTML);
```

**Expected**: Dropdown innerHTML harus berisi HTML autocomplete items

**Jika kosong**:
- Function tidak berjalan
- Atau data belum ter-load

## Step 4: Test Autocomplete di UI

### Test A: Ketik "Universitas"
1. Klik di search box
2. Ketik: **"Un"** (2 karakter)
3. Lihat apakah dropdown muncul

**Expected**: Dropdown muncul dengan PTN yang mengandung "un"

**Jika tidak muncul**:
- Buka Console, lihat error
- Cek apakah ada log error merah

### Test B: Ketik "Sumatera"
1. Ketik: **"Sumatera"**
2. Lihat dropdown

**Expected**: Dropdown muncul dengan PTN di Sumatera

### Test C: Klik PTN dari Dropdown
1. Ketik: **"Universitas Sumatera Utara"**
2. Klik PTN dari dropdown

**Expected**:
- Dropdown tertutup
- PTN USU ditampilkan
- Jurusan langsung terbuka
- Scroll ke PTN card

## Step 5: Cek Error di Console

### Error yang Mungkin Muncul:

#### Error 1: "allPTN is not defined"
**Penyebab**: Data belum ter-load

**Solusi**:
1. Tunggu data load
2. Refresh halaman
3. Cek server berjalan

#### Error 2: "Cannot read property 'classList' of null"
**Penyebab**: Element dropdown tidak ditemukan

**Solusi**:
1. Cek HTML, pastikan ada `<div id="autocompleteDropdown">`
2. Hard refresh
3. Cek typo di ID element

#### Error 3: "handleSearchInput is not defined"
**Penyebab**: Function belum ter-load

**Solusi**:
1. Hard refresh (Ctrl + Shift + R)
2. Clear cache
3. Gunakan incognito mode

## Step 6: Test dengan Incognito

1. Buka browser incognito:
   - Chrome: `Ctrl + Shift + N`
   - Firefox: `Ctrl + Shift + P`
2. Buka `http://localhost:3000/ptn-jurusan-terpadu.html`
3. Test autocomplete

**Jika berfungsi di incognito**:
- Masalahnya adalah cache
- Clear cache browser normal

**Jika tetap tidak berfungsi**:
- Ada masalah di kode
- Lanjut ke Step 7

## Step 7: Cek Network Tab

1. Buka Developer Tools (F12)
2. Klik tab **Network**
3. Refresh halaman
4. Lihat request ke:
   - `ptn-jurusan-terpadu.html` (status 200?)
   - `data/ptn-complete.json` (status 200?)
   - `data/majors-complete.json` (status 200?)

**Jika ada yang 404**:
- File tidak ditemukan
- Cek path file

**Jika ada yang failed**:
- Server tidak berjalan
- Restart server

## Step 8: Screenshot untuk Debug

Jika masih tidak berfungsi, ambil screenshot:

1. **Screenshot Console** (F12 > Console tab)
   - Tunjukkan semua log dan error

2. **Screenshot Network** (F12 > Network tab)
   - Tunjukkan semua request

3. **Screenshot Elements** (F12 > Elements tab)
   - Cari element `<div id="autocompleteDropdown">`
   - Screenshot element tersebut

4. **Screenshot Halaman**
   - Tunjukkan tampilan halaman

## Checklist Debug

- [ ] Hard refresh (Ctrl + Shift + R)
- [ ] Console menampilkan "PTN loaded: 60"
- [ ] Console menampilkan "Majors loaded: 100+"
- [ ] `allPTN` dan `allMajors` tidak undefined
- [ ] `handleSearchInput` adalah function
- [ ] Element `searchInput` ada
- [ ] Element `autocompleteDropdown` ada
- [ ] Ketik "Un" di search box
- [ ] Dropdown muncul
- [ ] Klik PTN dari dropdown
- [ ] PTN ditampilkan dengan jurusan terbuka

## Hasil Debug

Setelah test semua step, beritahu saya:

1. **Step mana yang gagal?** (1-8)
2. **Apa yang muncul di Console?** (Screenshot)
3. **Apakah ada error?** (Screenshot)
4. **Apakah data ter-load?** (allPTN dan allMajors)
5. **Apakah function ada?** (handleSearchInput)

Dengan informasi ini saya bisa bantu lebih spesifik! 🔍
