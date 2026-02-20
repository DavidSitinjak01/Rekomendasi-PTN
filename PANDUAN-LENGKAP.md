# 📚 Panduan Lengkap Sistem Rekomendasi Jurusan PTN

## 🎯 Daftar Isi
1. [Install PDFKit](#install-pdfkit)
2. [Fitur Admin](#fitur-admin)
3. [Fitur Siswa](#fitur-siswa)
4. [Cara Menggunakan](#cara-menggunakan)

---

## 📦 Install PDFKit

### Metode 1: PowerShell (Recommended)

1. **Buka PowerShell sebagai Administrator**
   - Tekan Windows
   - Ketik "PowerShell"
   - Klik kanan → "Run as administrator"

2. **Ubah Execution Policy (jika error)**
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
   Ketik `Y` dan Enter

3. **Masuk ke folder project**
   ```powershell
   cd "D:\Rekomendasi PTN"
   ```

4. **Install PDFKit**
   ```powershell
   npm install pdfkit
   ```

5. **Jalankan server**
   ```powershell
   node web-app/server.js
   ```

### Metode 2: CMD

```cmd
cd D:\Rekomendasi PTN
npm install pdfkit
node web-app/server.js
```

### Metode 3: VS Code Terminal

```bash
npm install pdfkit
node web-app/server.js
```

---

## 👨‍💼 Fitur Admin

### 1. Login Admin
- URL: `http://localhost:3000/login.html`
- Username: `admin`
- Password: `admin123`

### 2. Upload Data Excel (Opsional)
- Klik "Upload Data Siswa"
- Pilih file Excel
- Data akan tersimpan di database

### 3. Kelola User (BARU! ✨)
- Klik menu **"Kelola User"**
- Halaman: `admin-users.html`

#### A. Tambah Siswa Baru
- Isi form:
  - **Nama Lengkap** (wajib)
  - **NISN** (opsional - boleh dikosongkan)
  - **Kelas** (wajib)
- Klik "Tambah Siswa"

**Keuntungan:**
- Bisa tambah siswa tanpa NISN
- Cocok untuk siswa baru yang belum punya NISN
- Admin bisa isi data manual

#### B. Edit Data Siswa
- Klik tombol **"✏️ Edit"** pada siswa yang ingin diedit
- Ubah data yang diperlukan
- Klik "Simpan Perubahan"

**Yang bisa diedit:**
- Nama
- NISN (bisa ditambah/diubah/dikosongkan)
- Kelas

#### C. Hapus Siswa
- Klik tombol **"🗑️ Hapus"**
- Konfirmasi penghapusan
- Data siswa dan semua nilainya akan terhapus

**Peringatan:**
- Penghapusan bersifat permanen
- Semua nilai semester siswa juga akan terhapus
- Tidak bisa di-undo

#### D. Cari Siswa
- Gunakan search box
- Cari berdasarkan nama atau NISN
- Hasil filter otomatis

### 4. Lihat Semua Siswa
- Klik nama siswa untuk lihat detail
- Lihat analisis nilai
- Lihat rekomendasi jurusan
- Download PDF laporan

### 5. Download PDF
- Buka detail siswa
- Klik tombol **"📥 Download PDF"**
- PDF berisi:
  - Info siswa
  - Perkembangan nilai per semester
  - Analisis nilai terkini
  - Top 5 rekomendasi jurusan dengan alasan

---

## 👨‍🎓 Fitur Siswa

### 1. Registrasi (Untuk Siswa Baru)
- URL: `http://localhost:3000/register.html`
- Isi form:
  - Nama Lengkap
  - NISN
  - Kelas
- Klik "Daftar"

### 2. Login Siswa
- URL: `http://localhost:3000/login.html`
- Username: Nama lengkap
- Password: NISN
- Klik "Login"

### 3. Input Nilai
- Klik menu **"Input Nilai"**
- Pilih semester (1-6)
- Masukkan nilai semua mata pelajaran
- Klik "Simpan Nilai"

**Mata Pelajaran:**
- Pendidikan Pancasila
- Bahasa Indonesia
- Bahasa Inggris
- Matematika (Umum)
- Fisika
- Kimia
- Biologi
- Ekonomi
- Geografi
- Sosiologi
- Sejarah
- Informatika
- Pendidikan Jasmani

**Tips:**
- Isi nilai yang sudah pasti
- Bisa input per semester
- Nilai bisa diupdate kapan saja

### 4. Lihat Rekomendasi
- Klik "Lihat Rekomendasi" atau menu "Beranda"
- Lihat analisis nilai:
  - Rata-rata nilai
  - Mata pelajaran terbaik (Top 3)
  - Mata pelajaran yang perlu ditingkatkan (Bottom 2)
- Lihat rekomendasi jurusan:
  - Match score
  - Alasan detail kenapa cocok
  - Prospek karir

### 5. Download PDF
- Klik tombol **"📥 Download PDF"**
- Simpan laporan rekomendasi

---

## 🚀 Cara Menggunakan

### Skenario 1: Admin Menambah Siswa Tanpa NISN

1. Login sebagai admin
2. Klik menu "Kelola User"
3. Isi form tambah siswa:
   - Nama: "Budi Santoso"
   - NISN: (kosongkan)
   - Kelas: "XII"
4. Klik "Tambah Siswa"
5. Siswa berhasil ditambahkan!

**Catatan:** Siswa tanpa NISN tidak bisa login sendiri. Admin harus input nilai untuk mereka.

### Skenario 2: Admin Edit NISN Siswa

1. Login sebagai admin
2. Klik menu "Kelola User"
3. Cari siswa yang ingin diedit
4. Klik tombol "✏️ Edit"
5. Tambahkan/ubah NISN
6. Klik "Simpan Perubahan"
7. Sekarang siswa bisa login dengan NISN baru!

### Skenario 3: Siswa Baru Registrasi & Input Nilai

1. Buka `http://localhost:3000/register.html`
2. Isi form registrasi
3. Klik "Daftar"
4. Login dengan nama & NISN
5. Klik menu "Input Nilai"
6. Pilih semester 6 (semester terakhir)
7. Masukkan semua nilai
8. Klik "Simpan Nilai"
9. Klik "Lihat Rekomendasi"
10. Lihat rekomendasi jurusan
11. Download PDF

### Skenario 4: Admin Upload Excel & Kelola Data

1. Login sebagai admin
2. Upload file Excel (data batch)
3. Klik menu "Kelola User"
4. Lihat semua siswa dari Excel
5. Edit data jika ada yang salah
6. Hapus siswa duplikat
7. Tambah siswa baru yang belum ada di Excel

---

## 📊 Perubahan dari Versi Sebelumnya

### ✅ Yang Baru:
1. **Database Permanen** - Data tidak hilang setelah upload
2. **Hapus IPA/IPS** - Sesuai Kurikulum Merdeka
3. **Download PDF** - Laporan rekomendasi
4. **Input Nilai Siswa** - Siswa bisa input sendiri
5. **Kelola User Admin** - Tambah, edit, hapus user
6. **NISN Opsional** - Bisa tambah siswa tanpa NISN

### ❌ Yang Dihapus:
1. Kategori IPA/IPS
2. Rata-rata IPA/IPS
3. Bonus kategori dalam rekomendasi

### 🔄 Yang Berubah:
1. Algoritma rekomendasi (100% based on subject scores)
2. Struktur data (support multiple semesters)
3. Threshold match score (60% → 50%)

---

## 🎓 Keunggulan Sistem Baru

### Untuk Admin:
✅ Kelola user lebih fleksibel
✅ Bisa tambah siswa tanpa NISN
✅ Edit data kapan saja
✅ Hapus data yang salah
✅ Data tersimpan permanen
✅ Download PDF untuk semua siswa

### Untuk Siswa:
✅ Registrasi sendiri
✅ Input nilai sendiri
✅ Lihat perkembangan per semester
✅ Rekomendasi real-time
✅ Download PDF laporan
✅ Tidak perlu tergantung admin

### Untuk Sekolah:
✅ Sesuai Kurikulum Merdeka
✅ Tidak ada batasan IPA/IPS
✅ Semua jurusan terbuka untuk semua siswa
✅ Rekomendasi berdasarkan kemampuan aktual
✅ Tracking perkembangan nilai

---

## ⚠️ Troubleshooting

### Error: "npm is not recognized"
**Solusi:** Install Node.js dari https://nodejs.org/

### Error: "Cannot find module 'pdfkit'"
**Solusi:** 
```bash
npm install pdfkit --save
```

### Error: "running scripts is disabled"
**Solusi:** 
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Server tidak bisa start
**Solusi:**
1. Pastikan PDFKit sudah terinstall
2. Cek apakah port 3000 sudah digunakan
3. Restart terminal/PowerShell

### Data hilang setelah restart server
**Catatan:** Database menggunakan in-memory storage. Untuk production, gunakan database persistent (SQLite/PostgreSQL).

---

## 📞 Support

Jika ada pertanyaan atau masalah:
1. Cek file `TUTORIAL-INSTALL-PDFKIT.md`
2. Cek file `PERUBAHAN-KURIKULUM-MERDEKA.md`
3. Cek console browser (F12) untuk error

---

## 🎉 Selamat Menggunakan!

Sistem Rekomendasi Jurusan PTN sudah siap digunakan dengan fitur lengkap!

**Fitur Utama:**
- ✅ Kelola User (Tambah, Edit, Hapus)
- ✅ NISN Opsional
- ✅ Input Nilai Per Semester
- ✅ Download PDF
- ✅ Kurikulum Merdeka (No IPA/IPS)
- ✅ Database Permanen

**Dibuat dengan ❤️ untuk pendidikan Indonesia**
