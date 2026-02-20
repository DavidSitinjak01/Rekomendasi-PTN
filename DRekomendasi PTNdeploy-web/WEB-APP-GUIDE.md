# 🎓 Panduan Aplikasi Web Rekomendasi Jurusan PTN

## Deskripsi

Aplikasi web untuk menganalisis nilai siswa dan memberikan rekomendasi jurusan PTN yang sesuai berdasarkan profil nilai mereka.

## ✨ Fitur

1. **Upload Data Siswa** - Upload file Excel dengan data nilai siswa
2. **Analisis Nilai** - Analisis otomatis nilai per mata pelajaran
3. **Kategori IPA/IPS** - Deteksi otomatis kategori siswa
4. **Rekomendasi Jurusan** - Rekomendasi 10 jurusan PTN terbaik
5. **Match Score** - Skor kesesuaian dengan setiap jurusan
6. **Interface Modern** - Tampilan web yang user-friendly

## 🚀 Cara Menjalankan

### 1. Jalankan Server

Buka Command Prompt dan jalankan:

```bash
cd "D:\Rekomendasi PTN"
npm run web
```

Server akan berjalan di: **http://localhost:3000**

### 2. Buka di Browser

Buka browser (Chrome, Firefox, Edge) dan akses:

```
http://localhost:3000
```

## 📖 Cara Menggunakan

### Step 1: Upload File Excel

1. Klik tombol "Choose File"
2. Pilih file "Rekomendasi PTN.xlsx"
3. Klik "Upload File"
4. Tunggu proses upload selesai

### Step 2: Lihat Daftar Siswa

Setelah upload berhasil, Anda akan melihat:
- Daftar semua siswa
- Nama, NISN, dan Kelas
- Jumlah mata pelajaran yang dinilai

### Step 3: Pilih Siswa

Klik pada card siswa untuk melihat detail analisis

### Step 4: Lihat Analisis

Anda akan melihat:
- **Rata-rata Nilai** - Nilai rata-rata keseluruhan
- **Kategori** - IPA atau IPS
- **Rata-rata IPA** - Nilai rata-rata mata pelajaran IPA
- **Rata-rata IPS** - Nilai rata-rata mata pelajaran IPS
- **Tabel Nilai** - Nilai per mata pelajaran
- **Mata Pelajaran Terbaik/Terlemah**

### Step 5: Lihat Rekomendasi Jurusan

Di bagian bawah, Anda akan melihat:
- **Top 10 Rekomendasi Jurusan PTN**
- **Match Score** - Persentase kesesuaian (70-100%)
- **Universitas** - Nama PTN
- **Kategori** - IPA/IPS
- **Passing Grade** - Nilai minimum yang dibutuhkan
- **Mata Pelajaran Penting** - Mata pelajaran yang diprioritaskan

## 🎯 Cara Kerja Rekomendasi

### 1. Analisis Profil Siswa

Sistem menganalisis:
- Nilai rata-rata semua mata pelajaran
- Nilai rata-rata mata pelajaran IPA (Matematika, Fisika, Kimia, Biologi)
- Nilai rata-rata mata pelajaran IPS (Ekonomi, Sosiologi, Geografi, Sejarah)
- Kategori dominan (IPA/IPS)

### 2. Matching dengan Jurusan

Untuk setiap jurusan PTN, sistem menghitung:
- **Kesesuaian Kategori** (30 poin) - IPA/IPS match
- **Nilai Mata Pelajaran Penting** (70 poin) - Berdasarkan bobot mata pelajaran

### 3. Match Score

Match Score dihitung dari:
```
Match Score = (Kategori Match + Nilai Mata Pelajaran) / Total Bobot × 100
```

Hanya jurusan dengan Match Score ≥ 70% yang ditampilkan.

## 📊 Database Jurusan PTN

Aplikasi ini sudah dilengkapi dengan database 20+ jurusan dari PTN terkemuka:

### PTN yang Tersedia:
- Universitas Indonesia (UI)
- Institut Teknologi Bandung (ITB)
- Universitas Gadjah Mada (UGM)
- Institut Teknologi Sepuluh Nopember (ITS)
- Universitas Airlangga (Unair)
- Universitas Padjadjaran (Unpad)
- Universitas Brawijaya (UB)
- Universitas Diponegoro (Undip)

### Jurusan IPA:
- Teknik Informatika
- Kedokteran
- Teknik Elektro
- Teknik Kimia
- Teknik Mesin
- Farmasi
- Kedokteran Gigi
- Matematika
- Ilmu Komputer
- Arsitektur
- Kesehatan Masyarakat

### Jurusan IPS:
- Ekonomi
- Hukum
- Akuntansi
- Ilmu Komunikasi
- Manajemen
- Psikologi
- Hubungan Internasional
- Agribisnis

## 🔧 Kustomisasi

### Menambah Jurusan PTN

Edit file: `web-app/data/ptn-majors.json`

Format:
```json
{
  "university": "Nama PTN",
  "name": "Nama Jurusan",
  "category": "IPA atau IPS",
  "passingGrade": 60-70,
  "requiredSubjects": [
    { "name": "Nama Mata Pelajaran", "weight": 10-30 }
  ]
}
```

### Mengubah Bobot Mata Pelajaran

Ubah nilai `weight` di `requiredSubjects`:
- 25-30: Sangat penting
- 15-20: Penting
- 10-15: Cukup penting

## 💡 Tips Penggunaan

1. **Format Excel**: Pastikan file Excel memiliki kolom yang sesuai dengan format "Rekomendasi PTN.xlsx"

2. **Nama Mata Pelajaran**: Nama mata pelajaran harus sama persis dengan yang ada di database

3. **Nilai**: Nilai harus dalam format angka (0-100)

4. **Multiple Upload**: Anda bisa upload file baru kapan saja, data lama akan diganti

5. **Search**: Gunakan search box untuk mencari siswa dengan cepat

## 🐛 Troubleshooting

### Server tidak bisa dijalankan
```bash
# Pastikan port 3000 tidak digunakan aplikasi lain
# Atau ubah PORT di web-app/server.js
```

### File tidak bisa diupload
- Pastikan file berformat .xlsx atau .xls
- Pastikan file tidak corrupt
- Pastikan folder `uploads/` ada

### Tidak ada rekomendasi
- Nilai siswa mungkin terlalu rendah (< 70)
- Tingkatkan nilai mata pelajaran penting
- Atau turunkan passing grade di database

### Rekomendasi tidak sesuai
- Periksa bobot mata pelajaran di `ptn-majors.json`
- Sesuaikan dengan kebijakan PTN terbaru

## 📞 Support

Jika ada pertanyaan atau masalah, silakan hubungi developer.

---

**Dibuat dengan ❤️ untuk membantu siswa memilih jurusan PTN yang tepat**
