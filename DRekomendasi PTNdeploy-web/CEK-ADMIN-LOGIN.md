# Cek Apakah Anda Sudah Login sebagai Admin

## Langkah Cepat (2 Menit)

### 1. Buka http://localhost:3000

### 2. Tekan F12 (Developer Tools)

### 3. Klik Tab "Console"

### 4. Ketik Perintah Ini:
```javascript
localStorage.getItem('role')
```

### 5. Tekan Enter

## Hasil yang Mungkin Muncul:

### ✅ Jika Muncul: "admin"
**Artinya**: Anda SUDAH login sebagai admin
**Yang harus terlihat**:
- Menu "Kelola User" di navigation bar
- Menu "🧪 Upload Test" di navigation bar  
- Form upload Excel di halaman Beranda

**Jika menu tidak terlihat**: Ada masalah JavaScript
**Solusi**: Refresh halaman (Ctrl+Shift+R)

### ❌ Jika Muncul: null
**Artinya**: Anda BELUM login atau session hilang
**Solusi**:
1. Ketik di console: `localStorage.clear()`
2. Refresh halaman (F5)
3. Login dengan:
   - Username: `admin`
   - Password: `admin123`

### ❌ Jika Muncul: "student"
**Artinya**: Anda login sebagai siswa, bukan admin
**Solusi**:
1. Logout (klik tombol Logout)
2. Login lagi dengan:
   - Username: `admin`
   - Password: `admin123`

## Setelah Memastikan Login sebagai Admin

### Cek Menu Navigation Bar
Anda HARUS melihat menu ini:
- ✅ Beranda
- ✅ **Kelola User** ← Ini harus terlihat!
- ✅ **🧪 Upload Test** ← Ini harus terlihat!
- ✅ Database PTN
- ✅ Database Jurusan
- ✅ Database Mata Pelajaran

### Jika Menu Tidak Terlihat
**Artinya**: JavaScript tidak berjalan atau ada error

**Cek di Console**:
Lihat apakah ada error (text merah) di console

**Solusi**:
1. Screenshot console dan kirim ke saya
2. Atau coba browser lain (Chrome/Firefox/Edge)

## Untuk Upload File Excel

### Pilihan 1: Upload di Beranda (Halaman Utama)
- Scroll ke bawah
- Lihat form "📤 Upload Data Siswa"
- Pilih file Excel
- Klik "Upload File"

### Pilihan 2: Upload Test (Recommended untuk Debugging)
- Klik menu "🧪 Upload Test"
- Lihat LOG di layar
- Pilih file Excel
- Klik "Upload File"
- Perhatikan LOG - semua proses akan tercatat

## Beritahu Saya

Setelah cek, tolong beritahu saya:

1. **Hasil dari `localStorage.getItem('role')`**: ________
2. **Apakah menu "Kelola User" terlihat?**: Ya / Tidak
3. **Apakah menu "Upload Test" terlihat?**: Ya / Tidak
4. **Apakah ada error di console?**: Ya / Tidak (Screenshot jika ada)

Dengan informasi ini, saya bisa bantu lebih lanjut! 🙏
