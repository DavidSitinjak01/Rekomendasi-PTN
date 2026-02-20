# 🔧 Troubleshooting - Panduan Mengatasi Masalah

## ⚠️ Masalah: "Failed to fetch" saat Upload

### Penyebab:
1. Server tidak berjalan
2. Session expired (server di-restart)
3. Browser cache bermasalah

### Solusi:

#### 1. Pastikan Server Berjalan
Buka terminal/PowerShell dan jalankan:
```bash
node web-app/server.js
```

Anda harus melihat:
```
🚀 Server berjalan di http://localhost:3000
📊 Sistem Rekomendasi Jurusan PTN
```

#### 2. Clear Browser Cache & Login Ulang
Jika server baru saja di-restart:

**Cara 1: Hard Refresh**
- Tekan `Ctrl + Shift + R` (Windows/Linux)
- Atau `Cmd + Shift + R` (Mac)

**Cara 2: Clear Storage**
1. Buka Developer Tools (`F12`)
2. Klik tab **Application** (Chrome) atau **Storage** (Firefox)
3. Klik **Local Storage** → `http://localhost:3000`
4. Klik kanan → **Clear**
5. Refresh halaman (`F5`)

**Cara 3: Logout dan Login Ulang**
1. Klik tombol **Logout**
2. Login kembali dengan:
   - Admin: `admin` / `admin123`
   - Siswa: Nama / NISN

---

## ⚠️ Masalah: Tidak Bisa Masuk ke Aplikasi

### Solusi:

#### 1. Cek Server Status
```bash
# Pastikan server berjalan
node web-app/server.js
```

#### 2. Buka Browser dengan URL yang Benar
```
http://localhost:3000
```

**JANGAN gunakan:**
- `http://127.0.0.1:3000` (gunakan localhost)
- `https://localhost:3000` (gunakan http, bukan https)

#### 3. Clear Browser Data
1. Tekan `Ctrl + Shift + Delete`
2. Pilih **Cached images and files**
3. Pilih **Cookies and other site data**
4. Klik **Clear data**
5. Tutup dan buka browser lagi

#### 4. Coba Browser Lain
- Chrome
- Firefox
- Edge

---

## ⚠️ Masalah: "Unauthorized. Please login first"

### Ini NORMAL jika:
1. Anda belum login
2. Server baru di-restart
3. Session expired

### Solusi:
1. Anda akan otomatis diarahkan ke halaman login
2. Login dengan:
   - **Admin:** `admin` / `admin123`
   - **Siswa:** Nama lengkap / NISN

---

## ⚠️ Masalah: Data Siswa Hilang Setelah Restart Server

### Penyebab:
Database menggunakan **in-memory storage** (data tersimpan di RAM, bukan disk)

### Ini NORMAL!
Setiap kali server di-restart, data akan hilang.

### Solusi:
Upload ulang file Excel setelah server restart.

**Untuk data permanen:**
- Gunakan database seperti SQLite atau MySQL
- Atau simpan data di file JSON

---

## ⚠️ Masalah: Upload Excel Gagal

### Cek:
1. **Format file:** Harus `.xlsx` atau `.xls`
2. **Ukuran file:** Maksimal 10MB
3. **Struktur Excel:** Harus sesuai format yang benar

### Format Excel yang Benar:
```
| NAMA | NISN | Kelas | Matematika (Umum) | Bahasa Indonesia | ... |
|------|------|-------|-------------------|------------------|-----|
| John | 1234 | X-1   | 85                | 90               | ... |
```

### Solusi:
1. Pastikan file Excel sesuai format
2. Coba file Excel yang lebih kecil dulu
3. Pastikan tidak ada karakter aneh di nama kolom

---

## ⚠️ Masalah: Port 3000 Sudah Digunakan

### Error:
```
Error: listen EADDRINUSE: address already in use :::3000
```

### Solusi:

**Cara 1: Matikan Proses yang Menggunakan Port 3000**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

**Cara 2: Gunakan Port Lain**
Edit `web-app/server.js`:
```javascript
const PORT = 3001; // Ganti dari 3000 ke 3001
```

Lalu akses: `http://localhost:3001`

---

## ⚠️ Masalah: "Cannot find module 'pdfkit'"

### Solusi:
```bash
npm install pdfkit
```

Tunggu sampai selesai, lalu restart server:
```bash
node web-app/server.js
```

---

## 🔄 Langkah-Langkah Reset Lengkap

Jika semua cara di atas tidak berhasil:

### 1. Stop Server
Tekan `Ctrl + C` di terminal

### 2. Clear Browser
- Tekan `Ctrl + Shift + Delete`
- Clear semua data
- Tutup browser

### 3. Restart Server
```bash
node web-app/server.js
```

### 4. Buka Browser Baru
```
http://localhost:3000
```

### 5. Login
- Admin: `admin` / `admin123`

### 6. Upload Excel
- Pilih file Excel
- Klik Upload

---

## 📞 Checklist Debugging

Jika masih ada masalah, cek satu per satu:

- [ ] Server berjalan? (`node web-app/server.js`)
- [ ] URL benar? (`http://localhost:3000`)
- [ ] Browser cache sudah di-clear?
- [ ] Sudah login?
- [ ] Session masih valid? (coba logout dan login lagi)
- [ ] File Excel format benar?
- [ ] PDFKit sudah terinstal? (`npm install pdfkit`)
- [ ] Port 3000 tidak digunakan aplikasi lain?

---

## 💡 Tips Penggunaan

### Untuk Development:
1. Jangan restart server terlalu sering (data akan hilang)
2. Simpan file Excel sebagai backup
3. Test dengan data kecil dulu

### Untuk Production:
1. Gunakan database permanen (SQLite/MySQL)
2. Implementasi session management yang proper
3. Tambahkan error logging

---

**Jika masih ada masalah, cek console browser (F12) untuk melihat error detail!**
