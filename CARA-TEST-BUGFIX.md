# Cara Test Bug Fix

## Yang Sudah Diperbaiki

### 1. Logout Function ✅
**File yang dimodifikasi:**
- `web-app/public/common.js` (BARU) - Fungsi logout global
- `web-app/public/index.html` - Gunakan common.js
- `web-app/public/admin-users.html` - Gunakan common.js
- `web-app/public/admin-student-detail.html` - Gunakan common.js

### 2. Upload Excel ✅
**File yang dimodifikasi:**
- `web-app/public/app.js` - Tambah error handling & console.log

## Cara Test

### Test Logout:
1. **Restart server** (penting!):
   ```
   Ctrl+C (stop server)
   node web-app/server.js (start lagi)
   ```

2. Buka browser: `http://localhost:3000`

3. Login sebagai admin

4. Klik tombol "Logout" di kanan atas

5. **Hasil yang diharapkan**: Redirect ke halaman login

### Test Upload Excel:
1. Login sebagai admin

2. Di halaman utama, klik "Choose File"

3. Pilih file Excel Anda (yang punya 176 siswa)

4. Klik "Upload File"

5. **Hasil yang diharapkan**: 
   - Muncul pesan "Mengupload file..."
   - Lalu muncul "✓ File berhasil diupload. Total siswa: 176"
   - Halaman berubah menampilkan daftar siswa

### Jika Masih Error:

**Buka Console Browser** (F12):
1. Tekan F12 di browser
2. Klik tab "Console"
3. Coba logout atau upload lagi
4. Lihat error apa yang muncul
5. Beritahu saya error tersebut

## Catatan Penting

**HARUS RESTART SERVER!**
Setiap kali ada perubahan file JavaScript, server harus direstart:
```
Ctrl+C
node web-app/server.js
```

Lalu refresh browser (Ctrl+F5 atau Ctrl+Shift+R)

## Status Token
- Terpakai: ~123.000 / 200.000 (61.5%)
- Tersisa: ~77.000 (38.5%)
- Cukup untuk database lengkap
