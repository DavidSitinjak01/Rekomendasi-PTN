# 🧪 Test Autocomplete - Versi Simple

## File Test Sudah Dibuat

Saya sudah membuat file test sederhana: `test-autocomplete.html`

## Cara Test

### Step 1: Buka File Test
```
http://localhost:3000/test-autocomplete.html
```

### Step 2: Buka Console
1. Tekan **F12**
2. Klik tab **Console**
3. Lihat log:
   ```
   Loading PTN...
   PTN loaded: 60
   Sample PTN: {id: "ui", name: "Universitas Indonesia", ...}
   ```

### Step 3: Test Autocomplete
1. Ketik di search box: **"Universitas"**
2. Lihat Console:
   ```
   Search term: universitas
   Matched PTN: 8
   ```
3. Lihat dropdown muncul dengan PTN

### Step 4: Klik PTN
1. Klik salah satu PTN dari dropdown
2. Lihat Console:
   ```
   Selected PTN: {id: "ui", name: "Universitas Indonesia", ...}
   ```
3. Lihat detail PTN muncul di bawah

## Expected Result

### Jika Berfungsi:
✅ Console menampilkan "PTN loaded: 60"
✅ Ketik "Un" → Dropdown muncul
✅ Klik PTN → Detail muncul
✅ Dropdown tertutup setelah klik

### Jika Tidak Berfungsi:
❌ Console menampilkan error
❌ Dropdown tidak muncul
❌ Data tidak ter-load

## Troubleshooting

### Masalah 1: "PTN loaded: 0" atau Error
**Penyebab**: File JSON tidak ditemukan

**Solusi**:
1. Pastikan server berjalan: `node web-app/server.js`
2. Cek file ada: `web-app/data/ptn-complete.json`
3. Refresh halaman

### Masalah 2: Dropdown Tidak Muncul
**Penyebab**: JavaScript error atau data belum load

**Solusi**:
1. Cek Console untuk error
2. Tunggu data load (lihat log "PTN loaded")
3. Hard refresh (Ctrl + Shift + R)

### Masalah 3: Klik PTN Tidak Berfungsi
**Penyebab**: Function selectPTN error

**Solusi**:
1. Cek Console untuk error
2. Refresh halaman

## Test Manual di Console

### Test 1: Cek Data
```javascript
console.log('Total PTN:', allPTN.length);
console.log('First PTN:', allPTN[0]);
```

### Test 2: Test Function
```javascript
// Set search value
document.getElementById('searchInput').value = 'Universitas';

// Call function
handleSearch();

// Check dropdown
console.log('Dropdown HTML:', document.getElementById('dropdown').innerHTML);
```

### Test 3: Test Select
```javascript
// Select first PTN
selectPTN('ui');
```

## Hasil Test

Setelah test file simple ini, beritahu saya:

1. **Apakah file test berfungsi?** (Ya/Tidak)
2. **Apa yang muncul di Console?** (Screenshot)
3. **Apakah dropdown muncul?** (Ya/Tidak)
4. **Apakah klik PTN berfungsi?** (Ya/Tidak)

### Jika File Test Berfungsi:
Berarti masalahnya di file `ptn-jurusan-terpadu.html`
→ Saya akan perbaiki file utama

### Jika File Test Tidak Berfungsi:
Berarti masalahnya di:
- Server tidak berjalan
- File JSON tidak ada
- Browser issue

## Next Steps

**Jika test-autocomplete.html berfungsi**:
→ Saya akan copy logic ke file utama

**Jika test-autocomplete.html tidak berfungsi**:
→ Kita debug server dan file JSON dulu

Silakan test dan beritahu hasilnya! 🔍
