# 🎓 Sistem Rekomendasi Jurusan PTN

Aplikasi web untuk menganalisis nilai siswa dan memberikan rekomendasi jurusan PTN yang sesuai dengan profil akademik siswa.

## ✨ Fitur Utama

### 1. 🔐 Sistem Autentikasi
- **Login Admin:** Akses penuh untuk mengelola data siswa
- **Login Siswa:** Akses personal untuk melihat analisis dan rekomendasi sendiri

### 2. 📊 Analisis Nilai Siswa
- Upload data Excel siswa
- Analisis otomatis nilai per mata pelajaran
- Identifikasi kategori siswa (IPA/IPS)
- Tampilan mata pelajaran terbaik (Top 3)
- Tampilan mata pelajaran yang perlu ditingkatkan (Bottom 2)
- Filter siswa berdasarkan kelas

### 3. 🎯 Rekomendasi Jurusan Cerdas
- Algoritma matching berbasis nilai dan kategori
- Match score 0-100% dengan visualisasi warna
- Alasan detail untuk setiap rekomendasi:
  - Kesesuaian kategori (IPA/IPS)
  - Analisis per mata pelajaran penting
  - Status: Excellent, Very Good, Good, atau Below Minimum
  - Penjelasan kenapa mata pelajaran itu penting
- Informasi lengkap jurusan:
  - Deskripsi program studi
  - Passing grade
  - Kapasitas mahasiswa
  - Prospek karir

### 4. 📚 Database Lengkap

#### Database PTN (33 PTN)
- PTN dari Aceh sampai Papua
- Filter berdasarkan wilayah
- Informasi: nama, lokasi, tahun didirikan, akreditasi, website

#### Database Jurusan (24+ Jurusan)
- Jurusan dari berbagai PTN terkemuka
- Filter berdasarkan kategori (IPA/IPS)
- Pencarian jurusan atau universitas
- Mata pelajaran penting dengan nilai minimum
- Alasan kenapa mata pelajaran itu diperlukan
- Deskripsi dan prospek karir

#### Database Mata Pelajaran (15 Mata Pelajaran)
- Deskripsi lengkap setiap mata pelajaran
- Kategori: IPA, IPS, Bahasa, Umum
- Kepentingan untuk jurusan
- Jurusan-jurusan terkait

## 🚀 Cara Menjalankan

### Prasyarat
- Node.js (v14 atau lebih baru)
- npm

### Instalasi
```bash
# Install dependencies (jika belum)
npm install

# Jalankan server
node web-app/server.js
```

Server akan berjalan di: **http://localhost:3000**

## 🔑 Login

### Admin
- **Username:** `admin`
- **Password:** `admin123`
- **Akses:** Upload data, lihat semua siswa, akses semua fitur

### Siswa
- **Username:** Nama lengkap siswa (sesuai data Excel)
- **Password:** NISN siswa
- **Akses:** Lihat data dan rekomendasi pribadi

## 📖 Panduan Penggunaan

### Untuk Admin:
1. Login dengan kredensial admin
2. Upload file Excel berisi data nilai siswa
3. Lihat daftar siswa (bisa difilter berdasarkan kelas)
4. Klik nama siswa untuk melihat analisis detail
5. Lihat rekomendasi jurusan dengan alasan lengkap
6. Jelajahi database PTN, jurusan, dan mata pelajaran

### Untuk Siswa:
1. Login dengan nama lengkap dan NISN
2. Lihat analisis nilai pribadi
3. Lihat mata pelajaran terbaik dan yang perlu ditingkatkan
4. Lihat rekomendasi jurusan yang cocok
5. Pahami alasan detail setiap rekomendasi
6. Jelajahi database untuk riset lebih lanjut

## 📁 Struktur Proyek

```
├── src/                          # Core library (CLI version)
│   ├── ExcelReader.js
│   ├── Dataset.js
│   ├── StatisticalCalculator.js
│   └── ...
├── web-app/                      # Web application
│   ├── server.js                 # Express backend
│   ├── data/
│   │   ├── ptn-list.json        # 33 PTN database
│   │   ├── ptn-majors-extended.json  # 24+ majors database
│   │   └── subjects.json        # 15 subjects database
│   └── public/
│       ├── index.html           # Main page
│       ├── login.html           # Login page
│       ├── ptn-database.html    # PTN database page
│       ├── majors-database.html # Majors database page
│       ├── subjects-database.html # Subjects database page
│       ├── app.js               # Frontend JavaScript
│       └── style.css            # Styling
├── tests/                        # Unit tests
└── uploads/                      # Uploaded Excel files
```

## 🎯 Algoritma Rekomendasi

### Cara Kerja:
1. **Analisis Kategori (30% bobot)**
   - Menghitung rata-rata nilai IPA dan IPS
   - Menentukan kategori siswa
   - Memberikan bonus untuk jurusan yang sesuai

2. **Analisis Mata Pelajaran (70% bobot)**
   - Setiap mata pelajaran penting memiliki bobot berbeda
   - Nilai siswa dibandingkan dengan nilai minimum
   - Skor dihitung berdasarkan performa

3. **Match Score**
   - Dinormalisasi ke skala 0-100%
   - Hanya jurusan dengan match ≥60% yang ditampilkan
   - Diurutkan dari tertinggi ke terendah
   - Maksimal 10 rekomendasi teratas

## 📊 API Endpoints

### Autentikasi
- `POST /api/login` - Login
- `POST /api/logout` - Logout

### Data Siswa
- `POST /api/upload` - Upload Excel (admin only)
- `GET /api/students` - Daftar siswa
- `GET /api/students/:id/analysis` - Analisis nilai
- `GET /api/students/:id/detailed-analysis` - Analisis detail
- `GET /api/students/:id/recommendations` - Rekomendasi jurusan

### Database
- `GET /api/ptn` - Daftar PTN
- `GET /api/majors` - Daftar jurusan
- `GET /api/subjects` - Daftar mata pelajaran

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test file
npm test tests/unit/Dataset.test.js
```

## 📈 Statistik

- ✅ **33 PTN** dari seluruh Indonesia
- ✅ **24+ Jurusan** dari berbagai kategori
- ✅ **15 Mata Pelajaran** dengan deskripsi lengkap
- ✅ **61 Unit Tests** (semua passing)
- ✅ **4 Halaman Database** yang interaktif
- ✅ **Algoritma Rekomendasi** yang akurat dan transparan

## 🎨 Teknologi

- **Backend:** Node.js, Express.js
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Excel Processing:** xlsx library
- **Testing:** Jest
- **Styling:** Custom CSS dengan gradient design

## 📝 Format Data Excel

File Excel harus memiliki kolom:
- NAMA (nama siswa)
- NISN (nomor induk)
- Kelas (kelas siswa)
- Mata pelajaran (Matematika (Umum), Fisika, Kimia, Biologi, dll)

## 🔒 Keamanan

- Session-based authentication
- Role-based access control
- Students can only access their own data
- Admin has full access

## 📚 Dokumentasi Lengkap

- `README.md` - Dokumentasi CLI application
- `README-WEB.md` - Dokumentasi web application (file ini)
- `CARA-PENGGUNAAN.md` - Panduan penggunaan CLI
- `WEB-APP-GUIDE.md` - Panduan web application
- `FITUR-LENGKAP.md` - Dokumentasi fitur lengkap

## 🤝 Kontribusi

Aplikasi ini dibuat untuk membantu siswa menemukan jurusan PTN yang tepat berdasarkan profil akademik mereka.

## 📄 Lisensi

ISC

---

**Dibuat dengan ❤️ untuk pendidikan Indonesia**
