# 🎓 Perubahan Sistem - Kurikulum Merdeka

## ✅ Perubahan yang Telah Diimplementasikan

### 1. ✅ Data Tersimpan Permanen (Tidak Perlu Upload Berulang)
**Status:** SELESAI

**Implementasi:**
- Database in-memory untuk menyimpan data siswa dan nilai
- Data tetap tersimpan selama server berjalan
- Admin hanya perlu upload sekali
- Siswa bisa input nilai sendiri dan data tersimpan

**File:** `web-app/database.js`

---

### 2. ✅ Hapus Sistem IPA/IPS (Sesuai Kurikulum Merdeka)
**Status:** SELESAI

**Perubahan:**
- ❌ Tidak ada lagi kategori IPA/IPS
- ❌ Tidak ada lagi rata-rata IPA/IPS
- ✅ Rekomendasi berdasarkan nilai mata pelajaran saja
- ✅ Semua jurusan terbuka untuk semua siswa
- ✅ Match score berdasarkan kesesuaian nilai dengan requirement jurusan

**Algoritma Baru:**
- Tidak ada bonus kategori (30% yang dulu untuk IPA/IPS dihapus)
- 100% berdasarkan nilai mata pelajaran yang diperlukan
- Threshold diturunkan dari 60% menjadi 50% (karena tidak ada bonus kategori)

---

### 3. ⚠️ Download PDF (Perlu Instalasi Library)
**Status:** KODE SUDAH SIAP, PERLU INSTALASI

**Yang Sudah Dibuat:**
- ✅ API endpoint `/api/students/:id/download-pdf`
- ✅ Fungsi generate PDF dengan PDFKit
- ✅ Tombol download di halaman detail siswa
- ✅ PDF berisi:
  - Informasi siswa
  - Perkembangan nilai per semester
  - Analisis nilai terkini
  - Top 5 rekomendasi jurusan dengan alasan

**Cara Mengaktifkan:**
```bash
# Install PDFKit
npm install pdfkit

# Restart server
node web-app/server.js
```

**Alternatif Tanpa PDFKit:**
Jika tidak bisa install PDFKit, bisa menggunakan browser print to PDF:
- Buka halaman detail siswa
- Tekan Ctrl+P (Windows) atau Cmd+P (Mac)
- Pilih "Save as PDF"

---

### 4. ✅ Siswa Bisa Input Nilai Sendiri
**Status:** SELESAI

**Fitur Baru:**

#### A. Registrasi Siswa
- Halaman: `register.html`
- Siswa bisa daftar sendiri dengan:
  - Nama lengkap
  - NISN (akan jadi password)
  - Kelas
- API: `POST /api/register`

#### B. Input Nilai Per Semester
- Halaman: `input-grades.html`
- Siswa bisa input nilai untuk semester 1-6
- Semua mata pelajaran tersedia
- Data tersimpan di database
- API: `POST /api/students/:id/grades`

#### C. Lihat Rekomendasi Langsung
- Setelah input nilai, siswa bisa langsung lihat rekomendasi
- Rekomendasi otomatis update berdasarkan nilai terbaru

---

## 🚀 Cara Menggunakan Fitur Baru

### Untuk Siswa Baru:

1. **Registrasi**
   - Buka: `http://localhost:3000/register.html`
   - Isi nama, NISN, dan kelas
   - Klik "Daftar"

2. **Login**
   - Buka: `http://localhost:3000/login.html`
   - Username: Nama lengkap
   - Password: NISN
   - Klik "Login"

3. **Input Nilai**
   - Klik menu "Input Nilai"
   - Pilih semester (1-6)
   - Masukkan nilai semua mata pelajaran
   - Klik "Simpan Nilai"

4. **Lihat Rekomendasi**
   - Klik "Lihat Rekomendasi" atau menu "Beranda"
   - Lihat analisis dan rekomendasi jurusan
   - Download PDF (jika PDFKit sudah terinstall)

### Untuk Admin:

1. **Login**
   - Username: `admin`
   - Password: `admin123`

2. **Upload Data (Opsional)**
   - Upload file Excel jika ada data batch
   - Data akan tersimpan di database

3. **Lihat Semua Siswa**
   - Lihat daftar semua siswa yang terdaftar
   - Klik nama siswa untuk lihat detail
   - Download PDF laporan siswa

---

## 📊 Perubahan Struktur Data

### Sebelum (Lama):
```javascript
{
  id: 1,
  nama: "John Doe",
  nisn: "1234567890",
  kelas: "XII IPA 1",
  subjects: {
    "Matematika": 90,
    "Fisika": 85,
    ...
  }
}
```

### Sesudah (Baru):
```javascript
{
  id: "unique-id",
  nama: "John Doe",
  nisn: "1234567890",
  kelas: "XII",
  grades: [
    {
      semester: 1,
      subjects: { "Matematika": 85, ... }
    },
    {
      semester: 2,
      subjects: { "Matematika": 87, ... }
    },
    ...
    {
      semester: 6,
      subjects: { "Matematika": 90, ... }
    }
  ]
}
```

**Keuntungan:**
- Bisa track perkembangan nilai per semester
- Bisa lihat tren kenaikan/penurunan nilai
- Lebih sesuai dengan sistem rapor semester

---

## 🎯 API Endpoints Baru

### Registrasi
```
POST /api/register
Body: { nama, nisn, kelas }
```

### Input Nilai
```
POST /api/students/:id/grades
Body: { semester, subjects }
Headers: x-session-id
```

### Download PDF
```
GET /api/students/:id/download-pdf
Headers: x-session-id
```

---

## 📁 File Baru yang Dibuat

1. `web-app/database.js` - Database in-memory
2. `web-app/public/register.html` - Halaman registrasi
3. `web-app/public/input-grades.html` - Halaman input nilai
4. `PERUBAHAN-KURIKULUM-MERDEKA.md` - Dokumentasi ini

---

## 📝 File yang Diupdate

1. `web-app/server.js` - Tambah endpoints dan hapus IPA/IPS
2. `web-app/public/index.html` - Tambah tombol download PDF
3. `web-app/public/app.js` - Update fungsi display dan tambah download
4. `web-app/public/login.html` - Tambah link registrasi
5. `package.json` - Tambah dependency pdfkit

---

## ⚠️ Catatan Penting

### Database In-Memory
- Data tersimpan selama server berjalan
- Jika server restart, data akan hilang
- Untuk production, gunakan database persistent (SQLite, PostgreSQL, dll)

### PDFKit Installation
- Perlu install manual: `npm install pdfkit`
- Jika tidak bisa install, gunakan browser print to PDF

### Kurikulum Merdeka
- Sistem IPA/IPS sudah dihapus total
- Rekomendasi murni berdasarkan nilai mata pelajaran
- Semua jurusan terbuka untuk semua siswa

---

## 🔄 Migrasi Data Lama

Jika ada data lama dengan format lama:
1. Upload file Excel seperti biasa
2. Data akan otomatis dikonversi ke format baru
3. Nilai akan disimpan sebagai semester 6 (semester terakhir)

---

## 🎓 Kesimpulan

Semua perubahan yang diminta sudah diimplementasikan:

✅ Data tidak perlu upload berulang (tersimpan di database)
✅ Sistem IPA/IPS dihapus (sesuai Kurikulum Merdeka)
✅ Kode download PDF sudah siap (perlu install pdfkit)
✅ Siswa bisa registrasi dan input nilai sendiri

**Server Status:** 🔴 Perlu restart setelah install pdfkit

**Untuk mengaktifkan semua fitur:**
```bash
npm install pdfkit
node web-app/server.js
```

---

**Dibuat dengan ❤️ untuk Kurikulum Merdeka**
