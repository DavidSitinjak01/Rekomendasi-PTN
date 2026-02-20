# ✅ Fix Masalah "Gagal Memuat Data"

## 🔍 Masalah yang Ditemukan

**Error**: "Gagal memuat data. Pastikan server berjalan."

**Penyebab**: 
1. Folder `data` tidak bisa diakses dari browser karena server tidak menyajikan folder tersebut
2. Path fetch menggunakan path relatif yang tidak benar

## 🔧 Perbaikan yang Sudah Dilakukan

### 1. Update `server.js`
✅ Menambahkan route untuk serve folder `data`:
```javascript
app.use('/data', express.static(path.join(__dirname, 'data')));
```

### 2. Update `ptn-jurusan-simple.html`
✅ Mengubah path fetch dari relatif ke absolut:
```javascript
// Sebelum:
fetch('data/ptn-complete.json')

// Sesudah:
fetch('/data/ptn-complete.json')
```

✅ Menambahkan error handling yang lebih baik:
- Cek HTTP status
- Log error details
- Tampilkan error message yang lebih informatif

### 3. Restart Server
✅ Server sudah direstart dengan konfigurasi baru

## 🧪 Cara Test Sekarang

### Langkah 1: Clear Browser Cache
**PENTING**: Lakukan ini dulu!

1. Tekan `Ctrl + Shift + Delete`
2. Pilih "Cached images and files"
3. Klik "Clear data"

ATAU

1. Tekan `Ctrl + Shift + R` untuk hard refresh

### Langkah 2: Buka Halaman
1. Buka browser baru (atau tutup semua tab dulu)
2. Akses: `http://localhost:3000/ptn-jurusan-simple.html`

### Langkah 3: Verifikasi Loading
1. **Harusnya TIDAK muncul** alert "Gagal memuat data"
2. **Harusnya muncul** dropdown PTN yang terisi
3. Buka Console (F12) dan lihat output:
   ```
   Loading data...
   Fetching from: http://localhost:3000/data/ptn-complete.json
   PTN loaded: 60
   Majors loaded: [jumlah]
   ```

### Langkah 4: Test Dropdown
1. Klik dropdown "Pilih Perguruan Tinggi Negeri (PTN)"
2. **Harusnya muncul**: Daftar 60+ PTN
3. Pilih salah satu PTN (contoh: "Universitas Sumatera Utara - Medan")
4. **Harusnya muncul**: Daftar jurusan
5. Klik salah satu jurusan
6. **Harusnya muncul**: Detail lengkap

## 🐛 Debugging

### Jika Masih Muncul Error "Gagal Memuat Data":

1. **Buka Console** (F12)
2. **Lihat error message**
3. **Cek output**:
   - Apakah ada error "404 Not Found"?
   - Apakah ada error "Failed to fetch"?
   - Apakah ada error lainnya?

4. **Test akses langsung**:
   - Buka tab baru
   - Akses: `http://localhost:3000/data/ptn-complete.json`
   - **Harusnya**: Muncul data JSON
   - **Jika 404**: Server belum restart dengan benar

5. **Jika masih error**:
   - Screenshot error di Console
   - Screenshot alert message
   - Laporkan

### Jika Dropdown Kosong:

1. **Buka Console** (F12)
2. **Cek output**:
   ```
   PTN loaded: 60
   ```
3. **Jika PTN loaded: 0**:
   - File JSON kosong atau corrupt
   - Cek file: `web-app/data/ptn-complete.json`

4. **Jika tidak ada output**:
   - Function `loadData()` tidak dipanggil
   - Cek apakah ada error JavaScript

### Jika Jurusan Tidak Muncul:

1. **Pilih PTN dari dropdown**
2. **Buka Console** (F12)
3. **Cek output**:
   ```
   Loading majors for: [Nama PTN]
   Found majors: [jumlah]
   ```
4. **Jika Found majors: 0**:
   - PTN tersebut belum ada data jurusan
   - Coba pilih PTN lain (UI, ITB, UGM)

## 📋 Checklist Verifikasi

Centang jika sudah OK:

- [ ] Server sudah berjalan (cek: `http://localhost:3000`)
- [ ] Sudah clear browser cache (Ctrl + Shift + R)
- [ ] Buka `http://localhost:3000/ptn-jurusan-simple.html`
- [ ] TIDAK muncul alert "Gagal memuat data"
- [ ] Dropdown PTN terisi dengan daftar PTN
- [ ] Console menampilkan "PTN loaded: 60"
- [ ] Console menampilkan "Majors loaded: [jumlah]"
- [ ] Pilih PTN, muncul daftar jurusan
- [ ] Klik jurusan, muncul detail lengkap
- [ ] Tidak ada error di Console

## 🎯 Test Akses File JSON Langsung

Untuk memastikan server menyajikan file JSON dengan benar:

### Test 1: PTN Data
1. Buka tab baru
2. Akses: `http://localhost:3000/data/ptn-complete.json`
3. **Harusnya**: Muncul data JSON dengan 60+ PTN
4. **Jika 404**: Server belum restart atau konfigurasi salah

### Test 2: Majors Data
1. Buka tab baru
2. Akses: `http://localhost:3000/data/majors-complete.json`
3. **Harusnya**: Muncul data JSON dengan 100+ jurusan
4. **Jika 404**: Server belum restart atau konfigurasi salah

## 🚀 Langkah Cepat

1. **Clear cache**: `Ctrl + Shift + R`
2. **Buka**: `http://localhost:3000/ptn-jurusan-simple.html`
3. **Verifikasi**: Dropdown PTN terisi
4. **Test**: Pilih PTN → Lihat jurusan → Klik jurusan → Lihat detail

## 📞 Jika Masih Bermasalah

Laporkan dengan informasi berikut:

1. **Screenshot alert error** (jika ada)
2. **Screenshot Console** (F12 → Console tab)
3. **Test akses langsung**:
   - Buka: `http://localhost:3000/data/ptn-complete.json`
   - Screenshot hasilnya (apakah muncul JSON atau 404?)
4. **Langkah yang sudah dilakukan**:
   - [ ] Sudah clear cache?
   - [ ] Sudah hard refresh (Ctrl + Shift + R)?
   - [ ] Sudah test akses JSON langsung?

---

**Silakan test sekarang dan beritahu hasilnya!** 🚀

## 💡 Penjelasan Teknis

### Kenapa Terjadi Error?

Sebelumnya, server hanya menyajikan folder `public`:
```javascript
app.use(express.static(path.join(__dirname, 'public')));
```

Ini berarti:
- File di `web-app/public/` bisa diakses
- File di `web-app/data/` TIDAK bisa diakses

Ketika browser mencoba fetch `data/ptn-complete.json`, server mencari di:
- `web-app/public/data/ptn-complete.json` ❌ (tidak ada)

Setelah perbaikan, server juga menyajikan folder `data`:
```javascript
app.use('/data', express.static(path.join(__dirname, 'data')));
```

Sekarang browser bisa fetch `/data/ptn-complete.json` dan server mencari di:
- `web-app/data/ptn-complete.json` ✅ (ada!)

### Kenapa Perlu Restart Server?

Perubahan di `server.js` hanya berlaku setelah server direstart. Tanpa restart, konfigurasi lama masih digunakan.
