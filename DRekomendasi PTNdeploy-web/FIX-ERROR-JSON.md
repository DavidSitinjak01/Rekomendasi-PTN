# Fix Error: Unexpected token '<', "<!DOCTYPE "... is not valid JSON

## Penyebab Error

Error ini terjadi karena JavaScript mengharapkan response JSON dari server, tapi malah menerima HTML. Ini biasanya terjadi karena:

1. ❌ Browser menggunakan cache lama (file JavaScript lama)
2. ❌ Session expired atau tidak valid
3. ❌ Server belum di-restart dengan perubahan baru

## Solusi Lengkap (Ikuti Urutan Ini!)

### Langkah 1: Stop Server (Jika Masih Running)
```
Ctrl+C di terminal server
```

### Langkah 2: Clear Browser Cache TOTAL
1. Buka browser
2. Tekan **Ctrl + Shift + Delete**
3. Pilih:
   - ✅ Cached images and files
   - ✅ Cookies and other site data
4. Time range: **All time**
5. Klik **Clear data**

### Langkah 3: Clear localStorage
1. Buka `http://localhost:3000` (meskipun server belum jalan)
2. Tekan **F12** (Developer Tools)
3. Klik tab **Console**
4. Ketik dan Enter:
   ```javascript
   localStorage.clear()
   ```
5. Tutup browser **SEPENUHNYA** (semua tab dan window)

### Langkah 4: Start Server Baru
```bash
node web-app/server.js
```

Tunggu sampai muncul:
```
🚀 Server berjalan di http://localhost:3000
```

### Langkah 5: Buka Browser Baru (Incognito/Private)
1. Buka browser dalam mode **Incognito/Private**:
   - Chrome: Ctrl + Shift + N
   - Firefox: Ctrl + Shift + P
   - Edge: Ctrl + Shift + N

2. Buka `http://localhost:3000`

### Langkah 6: Login sebagai Admin
- Username: `admin`
- Password: `admin123`

### Langkah 7: Test Fitur Ubah Password
1. Klik menu "Kelola User"
2. Klik tombol "🔑 Ubah Password Admin"
3. Isi form dan submit

## Jika Masih Error

### Cek Console untuk Error Detail
1. Tekan **F12**
2. Klik tab **Console**
3. Klik tab **Network**
4. Coba ubah password lagi
5. Lihat request yang gagal (warna merah)
6. Klik request tersebut
7. Lihat tab **Response**
8. **Screenshot dan kirim ke saya**

### Cek Server Console
Lihat terminal server, apakah ada error? Jika ada, **copy paste error tersebut ke saya**.

## Alternative: Test dengan cURL

Jika masih error, test endpoint langsung dengan cURL:

### 1. Login dulu untuk dapat session:
```bash
curl -X POST http://localhost:3000/api/login -H "Content-Type: application/json" -d "{\"username\":\"admin\",\"password\":\"admin123\"}"
```

Akan muncul response seperti:
```json
{
  "success": true,
  "sessionId": "1234567890.abcdef",
  "role": "admin",
  "message": "Login berhasil sebagai Admin"
}
```

Copy `sessionId` tersebut.

### 2. Test change password:
```bash
curl -X POST http://localhost:3000/api/admin/change-password -H "Content-Type: application/json" -H "x-session-id: [PASTE_SESSION_ID_DISINI]" -d "{\"oldPassword\":\"admin123\",\"newPassword\":\"newpass123\"}"
```

Ganti `[PASTE_SESSION_ID_DISINI]` dengan sessionId dari langkah 1.

**Expected response:**
```json
{
  "success": true,
  "message": "Password berhasil diubah. Silakan login kembali."
}
```

Jika response ini muncul, berarti **backend berfungsi dengan baik**, masalahnya di frontend/browser.

## Kemungkinan Masalah Lain

### Masalah 1: Port 3000 Sudah Digunakan
**Gejala**: Server tidak bisa start atau error "EADDRINUSE"

**Solusi**:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F

# Atau ganti port di server.js
const PORT = 3001; // Ganti ke port lain
```

### Masalah 2: Node Modules Corrupt
**Solusi**:
```bash
rm -rf node_modules
npm install
```

### Masalah 3: File server.js Corrupt
**Solusi**: Saya bisa regenerate file server.js jika perlu.

## Quick Test

Untuk test cepat apakah server berfungsi:

1. Buka browser
2. Buka `http://localhost:3000/api/login` (akan error 404 atau method not allowed - ini normal)
3. Jika muncul JSON error, berarti server berfungsi
4. Jika muncul "Cannot GET /api/login", berarti server berfungsi (endpoint hanya terima POST)
5. Jika tidak bisa akses sama sekali, berarti server tidak jalan

## Beritahu Saya

Setelah ikuti langkah-langkah di atas, tolong beritahu saya:

1. **Apakah error masih muncul?** (Ya/Tidak)
2. **Jika ya, di langkah mana error muncul?**
3. **Apa pesan error lengkapnya?** (Screenshot atau copy paste)
4. **Apakah ada error di server console?** (Copy paste jika ada)
5. **Apakah test dengan cURL berhasil?** (Ya/Tidak)

Dengan informasi ini, saya bisa bantu lebih lanjut! 🙏
