# 🎓 Sistem Rekomendasi Jurusan PTN - Fitur Lengkap

## ✅ Status Implementasi

Semua fitur yang diminta telah berhasil diimplementasikan!

## 🚀 Cara Menjalankan Aplikasi

```bash
node web-app/server.js
```

Kemudian buka browser dan akses: **http://localhost:3000**

## 🔐 Login

### Admin
- Username: `admin`
- Password: `admin123`
- Akses: Semua fitur termasuk upload data

### Siswa
- Username: Nama lengkap siswa (sesuai data Excel)
- Password: NISN siswa
- Akses: Hanya data siswa sendiri

## 📋 Fitur yang Telah Diimplementasikan

### 1. ✅ Database PTN Se-Indonesia (Aceh - Papua)

**Lokasi:** Menu "Database PTN"

**Fitur:**
- 33 PTN dari seluruh Indonesia
- Filter berdasarkan wilayah:
  - Sumatera
  - Jawa
  - Kalimantan
  - Sulawesi
  - Bali & Nusa Tenggara
  - Maluku & Papua
- Informasi lengkap setiap PTN:
  - Nama lengkap dan singkatan
  - Lokasi
  - Tahun didirikan
  - Akreditasi
  - Website

**File:** `web-app/data/ptn-list.json`

### 2. ✅ Database Jurusan PTN + Mata Pelajaran Wajib

**Lokasi:** Menu "Database Jurusan"

**Fitur:**
- 24+ jurusan dari berbagai PTN terkemuka
- Filter berdasarkan kategori (IPA/IPS)
- Pencarian jurusan atau universitas
- Informasi lengkap setiap jurusan:
  - Nama jurusan dan universitas
  - Kategori (IPA/IPS)
  - Deskripsi program studi
  - Passing grade
  - Kapasitas mahasiswa per tahun
  - Mata pelajaran penting dengan:
    - Nilai minimum yang diperlukan
    - Alasan kenapa mata pelajaran itu penting
  - Prospek karir

**Kategori Jurusan:**
- **Teknik:** Informatika, Elektro, Kimia, Mesin, Sipil, Industri
- **Kesehatan:** Kedokteran, Kedokteran Gigi, Farmasi, Keperawatan, Kesehatan Masyarakat
- **MIPA:** Matematika, Ilmu Komputer
- **Ekonomi:** Ekonomi, Akuntansi, Manajemen
- **Sosial:** Hukum, Ilmu Komunikasi, Hubungan Internasional, Psikologi
- **Pertanian:** Agribisnis, Agroteknologi
- **Arsitektur**

**File:** `web-app/data/ptn-majors-extended.json`

### 3. ✅ Database Mata Pelajaran

**Lokasi:** Menu "Database Mata Pelajaran"

**Fitur:**
- 15 mata pelajaran lengkap
- Filter berdasarkan kategori:
  - IPA
  - IPS
  - Bahasa
  - Umum
- Informasi setiap mata pelajaran:
  - Nama mata pelajaran
  - Kategori
  - Deskripsi lengkap
  - Kepentingan untuk jurusan
  - Jurusan-jurusan terkait

**Daftar Mata Pelajaran:**
1. Pendidikan Pancasila
2. Bahasa Indonesia
3. Bahasa Inggris
4. Matematika (Umum)
5. Matematika Tingkat Lanjut
6. Fisika
7. Kimia
8. Biologi
9. Geografi
10. Sosiologi
11. Ekonomi
12. Sejarah
13. Pendidikan Jasmani, Olahraga, dan Kesehatan
14. Seni dan Budaya
15. Informatika

**File:** `web-app/data/subjects.json`

### 4. ✅ Analisis Detail Per Siswa

**Lokasi:** Halaman detail siswa (klik nama siswa dari daftar)

**Fitur Analisis:**

#### A. Statistik Umum
- Rata-rata nilai keseluruhan
- Kategori siswa (IPA/IPS)
- Rata-rata nilai IPA
- Rata-rata nilai IPS

#### B. Mata Pelajaran Terbaik (Top 3)
- Menampilkan 3 mata pelajaran dengan nilai tertinggi
- Status: "Excellent"
- Ditampilkan dengan highlight hijau

#### C. Mata Pelajaran yang Perlu Ditingkatkan (Bottom 2)
- Menampilkan 2 mata pelajaran dengan nilai terendah
- Status: "Perlu peningkatan"
- Ditampilkan dengan highlight kuning

#### D. Tabel Lengkap Semua Mata Pelajaran
- Diurutkan dari nilai tertinggi ke terendah

### 5. ✅ Rekomendasi Jurusan dengan Alasan Detail

**Lokasi:** Halaman detail siswa, bagian "Rekomendasi Jurusan PTN"

**Fitur Rekomendasi:**

#### A. Match Score dengan Warna
- **Hijau (85-100%):** Match sangat tinggi
- **Biru (70-84%):** Match tinggi
- **Oranye (60-69%):** Match sedang

#### B. Informasi Jurusan
- Nama jurusan dan universitas
- Deskripsi program studi
- Kategori (IPA/IPS)
- Passing grade
- Prospek karir

#### C. Alasan Rekomendasi Detail
Setiap rekomendasi dilengkapi dengan alasan spesifik:

**1. Kesesuaian Kategori**
- ✓ "Profil IPA sangat kuat (rata-rata 93.5)"
- Menunjukkan kesesuaian dengan kategori jurusan

**2. Analisis Mata Pelajaran Penting**
Untuk setiap mata pelajaran yang diperlukan:
- ✓ **Excellent:** Nilai jauh melebihi minimum (≥10 poin)
- ✓ **Very Good:** Nilai melebihi minimum (5-9 poin)
- ✓ **Good:** Nilai melebihi minimum (1-4 poin)
- ⚠ **Below Minimum:** Nilai di bawah minimum (perlu ditingkatkan)

Contoh:
```
✓ Matematika (Umum): 95 (Min: 80) - Excellent
  Fundamental untuk algoritma dan logika pemrograman

✓ Fisika: 94 (Min: 75) - Excellent
  Penting untuk memahami sistem komputer dan jaringan

✓ Bahasa Inggris: 93 (Min: 75) - Very Good
  Dokumentasi dan komunikasi teknis menggunakan Bahasa Inggris
```

**3. Penilaian Keseluruhan**
- 🌟 "Profil Anda sangat cocok untuk jurusan ini!" (Match ≥90%)
- 👍 "Profil Anda cocok untuk jurusan ini" (Match 80-89%)

## 🎯 Algoritma Rekomendasi

### Cara Kerja:
1. **Analisis Kategori (30% bobot)**
   - Menghitung rata-rata nilai IPA dan IPS
   - Menentukan kategori siswa (IPA/IPS)
   - Memberikan bonus untuk jurusan yang sesuai kategori

2. **Analisis Mata Pelajaran Penting (70% bobot)**
   - Setiap mata pelajaran penting memiliki bobot berbeda
   - Nilai siswa dibandingkan dengan nilai minimum
   - Skor dihitung berdasarkan performa di mata pelajaran penting

3. **Match Score**
   - Dinormalisasi ke skala 0-100%
   - Hanya jurusan dengan match ≥60% yang ditampilkan
   - Diurutkan dari match tertinggi ke terendah
   - Maksimal 10 rekomendasi teratas

## 📊 API Endpoints

### Autentikasi
- `POST /api/login` - Login admin atau siswa
- `POST /api/logout` - Logout

### Data Siswa
- `POST /api/upload` - Upload file Excel (admin only)
- `GET /api/students` - Daftar siswa
- `GET /api/students/:id/analysis` - Analisis nilai siswa
- `GET /api/students/:id/detailed-analysis` - Analisis detail dengan top/bottom subjects
- `GET /api/students/:id/recommendations` - Rekomendasi jurusan

### Database
- `GET /api/ptn` - Daftar PTN (query: region)
- `GET /api/majors` - Daftar jurusan (query: university, category)
- `GET /api/subjects` - Daftar mata pelajaran (query: category)

## 📁 Struktur File

```
web-app/
├── server.js                      # Backend Express.js
├── data/
│   ├── ptn-list.json             # Database 33 PTN
│   ├── ptn-majors-extended.json  # Database 24+ jurusan lengkap
│   └── subjects.json             # Database 15 mata pelajaran
└── public/
    ├── index.html                # Halaman utama
    ├── login.html                # Halaman login
    ├── ptn-database.html         # Halaman database PTN
    ├── majors-database.html      # Halaman database jurusan
    ├── subjects-database.html    # Halaman database mata pelajaran
    ├── app.js                    # Frontend JavaScript
    └── style.css                 # Styling
```

## 🎨 Fitur UI/UX

### Navigation Menu
- Menu navigasi di semua halaman
- Highlight halaman aktif
- Responsive design

### Filter & Search
- Filter wilayah untuk PTN
- Filter kategori untuk jurusan dan mata pelajaran
- Search box untuk mencari jurusan atau universitas

### Visual Indicators
- Badge warna untuk kategori (IPA/IPS)
- Match score dengan gradient warna
- Icon untuk status (✓, ⚠, 🌟, 👍)
- Highlight box untuk top/bottom subjects

### Responsive Cards
- Grid layout yang responsif
- Hover effects
- Shadow dan animasi

## 🔒 Keamanan

- Session-based authentication
- Role-based access control (Admin/Student)
- Students can only access their own data
- Admin can access all data

## 📈 Statistik Aplikasi

- **33 PTN** dari seluruh Indonesia
- **24+ Jurusan** dari berbagai kategori
- **15 Mata Pelajaran** dengan deskripsi lengkap
- **4 Halaman Database** yang dapat diakses
- **Algoritma Rekomendasi** yang akurat dan transparan

## 🎓 Contoh Penggunaan

### Untuk Admin:
1. Login dengan username: `admin`, password: `admin123`
2. Upload file Excel dengan data siswa
3. Lihat daftar semua siswa
4. Filter siswa berdasarkan kelas
5. Klik nama siswa untuk melihat analisis detail
6. Lihat rekomendasi jurusan dengan alasan lengkap
7. Jelajahi database PTN, jurusan, dan mata pelajaran

### Untuk Siswa:
1. Login dengan nama lengkap dan NISN
2. Lihat analisis nilai pribadi
3. Lihat mata pelajaran terbaik dan yang perlu ditingkatkan
4. Lihat rekomendasi jurusan yang cocok dengan profil
5. Pahami alasan kenapa jurusan tersebut direkomendasikan
6. Jelajahi database untuk riset lebih lanjut

## 🚀 Pengembangan Selanjutnya (Opsional)

Jika ingin mengembangkan lebih lanjut, bisa menambahkan:
- Export hasil analisis ke PDF
- Grafik visualisasi nilai
- Perbandingan dengan siswa lain di kelas
- History rekomendasi
- Notifikasi untuk siswa
- Dashboard statistik untuk admin
- Integrasi dengan database real-time
- Sistem komentar/catatan dari guru

## 📞 Support

Aplikasi ini sudah lengkap dan siap digunakan. Semua fitur yang diminta telah diimplementasikan dengan baik.

---

**Dibuat dengan ❤️ untuk membantu siswa menemukan jurusan PTN yang tepat**
