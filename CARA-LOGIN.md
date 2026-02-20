# 🔐 Cara Login ke Aplikasi

## ✅ PDFKit Sudah Terinstal dan Server Aktif!

Server berjalan di: **http://localhost:3000**

---

## 📝 Langkah-Langkah Login

### 1. Buka Browser
- Buka Chrome, Firefox, atau Edge
- Ketik di address bar: `http://localhost:3000`

### 2. Anda Akan Diarahkan ke Halaman Login
**Ini NORMAL!** Pesan "Unauthorized. Please login first" muncul karena Anda belum login.

Aplikasi akan otomatis membuka halaman: `http://localhost:3000/login.html`

### 3. Login Sebagai Admin
Untuk mengakses semua fitur:
- **Username:** `admin`
- **Password:** `admin123`
- Klik tombol **"Login"**

### 4. Login Sebagai Siswa
Jika sudah terdaftar:
- **Username:** Nama lengkap siswa
- **Password:** NISN siswa
- Klik tombol **"Login"**

---

## 🎯 Setelah Login Berhasil

### Untuk Admin:
✅ Upload data Excel siswa
✅ Lihat semua siswa
✅ Kelola user (tambah, edit, hapus)
✅ Download PDF laporan siswa
✅ Akses database PTN, Jurusan, dan Mata Pelajaran

### Untuk Siswa:
✅ Input nilai per semester
✅ Lihat rekomendasi jurusan
✅ Download PDF hasil rekomendasi
✅ Lihat database PTN, Jurusan, dan Mata Pelajaran

---

## 🔄 Jika Belum Punya Akun Siswa

1. Di halaman login, klik **"Belum punya akun? Daftar di sini"**
2. Isi form registrasi:
   - Nama Lengkap
   - NISN
   - Kelas
3. Klik **"Daftar"**
4. Login dengan nama dan NISN yang sudah didaftarkan

---

## ⚠️ Troubleshooting

### Pesan "Unauthorized. Please login first"
**Solusi:** Ini normal! Anda akan otomatis diarahkan ke halaman login. Silakan login terlebih dahulu.

### Tidak bisa login
**Solusi:** 
- Pastikan username dan password benar
- Untuk admin: `admin` / `admin123`
- Untuk siswa: Nama lengkap / NISN

### Server tidak berjalan
**Solusi:**
```bash
node web-app/server.js
```

---

## 📥 Test Fitur Download PDF

1. Login sebagai admin atau siswa
2. Klik nama siswa untuk lihat detail
3. Klik tombol **"📥 Download PDF"**
4. PDF akan otomatis terdownload dengan informasi:
   - Grafik kenaikan nilai
   - Tabel nilai lengkap
   - Rekomendasi jurusan PTN

---

**Selamat menggunakan aplikasi! 🎉**
