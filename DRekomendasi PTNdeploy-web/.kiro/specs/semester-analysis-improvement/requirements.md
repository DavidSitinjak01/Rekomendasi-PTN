# Requirements Document

## Introduction

Sistem Rekomendasi Jurusan PTN saat ini memiliki bug kritis dan keterbatasan fungsional yang menghambat pengalaman siswa kelas X dan XI. Bug utama adalah Excel upload yang menyimpan semua nilai ke Semester 6, bukan semester yang sesuai. Keterbatasan utama adalah sistem hanya memberikan rekomendasi ketika data lengkap, padahal siswa kelas X dan XI membutuhkan analisis bertahap untuk membantu mereka meningkatkan nilai sejak dini.

Fitur ini akan memperbaiki bug Excel upload dan menambahkan kemampuan analisis bertahap (progressive analysis) yang memberikan rekomendasi dengan tingkat kepercayaan yang berbeda berdasarkan jumlah semester yang telah diinput.

## Glossary

- **System**: Sistem Rekomendasi Jurusan PTN berbasis web
- **Excel_Upload**: Fitur upload file Excel yang berisi data nilai siswa
- **Progressive_Analysis**: Analisis bertahap yang memberikan rekomendasi berdasarkan data semester yang tersedia
- **Confidence_Level**: Tingkat kepercayaan rekomendasi berdasarkan jumlah semester terisi (40-95%)
- **Semester_Data**: Data nilai mata pelajaran untuk satu semester tertentu (1-6)
- **Student_Input**: Input nilai manual oleh siswa per semester
- **Admin_View**: Tampilan data Excel untuk referensi admin saja
- **Recommendation_Engine**: Mesin pemberi rekomendasi jurusan PTN
- **Weighted_Average**: Rata-rata tertimbang dengan bobot lebih tinggi untuk semester terbaru
- **Consistency_Score**: Skor konsistensi nilai (tidak naik-turun drastis)

## Requirements

### Requirement 1: Perbaikan Excel Upload

**User Story:** Sebagai admin, saya ingin Excel upload tidak menyimpan nilai ke semester tertentu, sehingga tidak terjadi bug nilai muncul di semester yang salah.

#### Acceptance Criteria

1. WHEN admin mengupload file Excel, THE System SHALL menyimpan data siswa tanpa menyimpan nilai ke semester tertentu
2. WHEN admin mengupload file Excel, THE System SHALL menyimpan data nilai hanya untuk referensi admin
3. WHEN admin melihat data Excel, THE System SHALL menampilkan nilai sebagai data referensi tanpa label semester
4. THE System SHALL mempertahankan fungsi import data siswa (nama, NISN, kelas) dari Excel
5. WHEN siswa login setelah Excel upload, THE System SHALL menampilkan profil siswa tanpa nilai semester

### Requirement 2: Input Nilai Manual Per Semester

**User Story:** Sebagai siswa, saya ingin menginput nilai per semester secara manual, sehingga sistem memiliki data yang akurat untuk setiap semester.

#### Acceptance Criteria

1. WHEN siswa memilih semester (1-6), THE System SHALL menampilkan form input nilai untuk semester tersebut
2. WHEN siswa menyimpan nilai, THE System SHALL menyimpan nilai ke semester yang dipilih
3. WHEN siswa membuka semester yang sudah diisi, THE System SHALL menampilkan nilai yang tersimpan
4. WHEN siswa mengubah nilai semester yang sudah ada, THE System SHALL mengupdate nilai semester tersebut
5. THE System SHALL memvalidasi bahwa semester berada dalam rentang 1-6

### Requirement 3: Analisis Bertahap dengan Confidence Level

**User Story:** Sebagai siswa kelas X atau XI, saya ingin melihat rekomendasi awal berdasarkan nilai yang sudah ada, sehingga saya dapat meningkatkan mata pelajaran pendukung jurusan sejak dini.

#### Acceptance Criteria

1. WHEN siswa memiliki minimal 1 semester nilai, THE System SHALL menghitung dan menampilkan rekomendasi
2. WHEN sistem menghitung rekomendasi, THE System SHALL menentukan confidence level berdasarkan jumlah semester terisi
3. WHEN siswa memiliki 1-2 semester terisi, THE System SHALL menetapkan confidence level 40-50%
4. WHEN siswa memiliki 3-4 semester terisi, THE System SHALL menetapkan confidence level 60-75%
5. WHEN siswa memiliki 5-6 semester terisi, THE System SHALL menetapkan confidence level 85-95%
6. THE System SHALL menampilkan confidence level pada halaman rekomendasi

### Requirement 4: Indikator Status Analisis

**User Story:** Sebagai siswa, saya ingin melihat status analisis saya (Awal/Berkembang/Lengkap), sehingga saya memahami tingkat akurasi rekomendasi.

#### Acceptance Criteria

1. WHEN siswa memiliki 1-2 semester terisi, THE System SHALL menampilkan badge "Analisis Awal"
2. WHEN siswa memiliki 3-4 semester terisi, THE System SHALL menampilkan badge "Analisis Berkembang"
3. WHEN siswa memiliki 5-6 semester terisi, THE System SHALL menampilkan badge "Analisis Lengkap"
4. THE System SHALL menampilkan badge status analisis di bagian atas halaman rekomendasi
5. THE System SHALL menggunakan warna berbeda untuk setiap status (kuning untuk Awal, biru untuk Berkembang, hijau untuk Lengkap)

### Requirement 5: Pesan Adaptif Berdasarkan Jumlah Semester

**User Story:** Sebagai siswa, saya ingin melihat pesan yang sesuai dengan jumlah semester yang sudah saya input, sehingga saya mendapat panduan yang relevan.

#### Acceptance Criteria

1. WHEN siswa memiliki 1-2 semester terisi, THE System SHALL menampilkan pesan "Ini adalah gambaran awal. Tingkatkan nilai untuk rekomendasi lebih akurat."
2. WHEN siswa memiliki 3-4 semester terisi, THE System SHALL menampilkan pesan "Rekomendasi semakin akurat. Pertahankan nilai mata pelajaran penting."
3. WHEN siswa memiliki 5-6 semester terisi, THE System SHALL menampilkan pesan "Analisis lengkap. Ini adalah rekomendasi terbaik untuk Anda."
4. THE System SHALL menampilkan pesan di bawah badge status analisis
5. THE System SHALL menggunakan ikon yang sesuai untuk setiap pesan (💡 untuk Awal, 📈 untuk Berkembang, ✅ untuk Lengkap)

### Requirement 6: Visualisasi Progress Semester

**User Story:** Sebagai siswa, saya ingin melihat progress jumlah semester yang sudah saya isi, sehingga saya termotivasi untuk melengkapi data.

#### Acceptance Criteria

1. THE System SHALL menampilkan progress bar yang menunjukkan jumlah semester terisi dari total 6 semester
2. THE System SHALL menampilkan teks "X/6 Semester Terisi" di samping progress bar
3. THE System SHALL mengupdate progress bar secara real-time ketika siswa menambah semester baru
4. THE System SHALL menampilkan progress bar di halaman input nilai dan halaman rekomendasi
5. WHEN semua 6 semester terisi, THE System SHALL menampilkan progress bar dengan warna hijau penuh

### Requirement 7: Highlight Mata Pelajaran yang Perlu Ditingkatkan

**User Story:** Sebagai siswa, saya ingin melihat mata pelajaran mana yang perlu saya tingkatkan untuk jurusan yang saya minati, sehingga saya dapat fokus belajar pada mata pelajaran tersebut.

#### Acceptance Criteria

1. WHEN sistem menampilkan rekomendasi jurusan, THE System SHALL menampilkan mata pelajaran yang nilainya di bawah minimum requirement
2. WHEN mata pelajaran di bawah minimum, THE System SHALL menampilkan ikon peringatan (⚠) dan teks "Perlu ditingkatkan"
3. WHEN mata pelajaran memenuhi minimum, THE System SHALL menampilkan ikon centang (✓) dan status (Good/Very Good/Excellent)
4. THE System SHALL mengurutkan mata pelajaran berdasarkan prioritas (yang paling perlu ditingkatkan di atas)
5. THE System SHALL menampilkan selisih nilai dengan minimum requirement

### Requirement 8: Algoritma Weighted Average

**User Story:** Sebagai sistem, saya ingin menggunakan weighted average dengan bobot lebih tinggi untuk semester terbaru, sehingga rekomendasi mencerminkan performa terkini siswa.

#### Acceptance Criteria

1. WHEN sistem menghitung rata-rata nilai, THE System SHALL memberikan bobot lebih tinggi untuk semester yang lebih baru
2. THE System SHALL menggunakan bobot progresif: semester 1 (bobot 1.0), semester 2 (bobot 1.1), semester 3 (bobot 1.2), semester 4 (bobot 1.3), semester 5 (bobot 1.4), semester 6 (bobot 1.5)
3. WHEN menghitung match score, THE System SHALL menggunakan weighted average untuk setiap mata pelajaran
4. THE System SHALL menormalkan hasil weighted average ke skala 0-100
5. WHEN siswa hanya memiliki 1 semester, THE System SHALL menggunakan nilai semester tersebut tanpa pembobotan

### Requirement 9: Perhitungan Consistency Score

**User Story:** Sebagai sistem, saya ingin menghitung consistency score untuk mendeteksi nilai yang naik-turun drastis, sehingga rekomendasi mempertimbangkan stabilitas performa siswa.

#### Acceptance Criteria

1. WHEN siswa memiliki minimal 2 semester nilai, THE System SHALL menghitung consistency score
2. THE System SHALL menghitung standar deviasi nilai per mata pelajaran antar semester
3. WHEN standar deviasi rendah (< 5), THE System SHALL memberikan consistency score tinggi (90-100%)
4. WHEN standar deviasi sedang (5-10), THE System SHALL memberikan consistency score sedang (70-89%)
5. WHEN standar deviasi tinggi (> 10), THE System SHALL memberikan consistency score rendah (< 70%)
6. THE System SHALL menampilkan consistency score pada halaman analisis
7. WHEN consistency score rendah, THE System SHALL menampilkan pesan "Nilai Anda cukup fluktuatif. Usahakan konsistensi untuk hasil lebih baik."

### Requirement 10: Rekomendasi Adaptif

**User Story:** Sebagai siswa, saya ingin rekomendasi berubah seiring bertambahnya data semester, sehingga saya melihat perkembangan kesesuaian saya dengan jurusan tertentu.

#### Acceptance Criteria

1. WHEN siswa menambah semester baru, THE System SHALL menghitung ulang semua rekomendasi
2. THE System SHALL menyimpan riwayat perubahan match score untuk setiap jurusan
3. WHEN match score meningkat, THE System SHALL menampilkan ikon trend naik (📈)
4. WHEN match score menurun, THE System SHALL menampilkan ikon trend turun (📉)
5. WHEN match score stabil, THE System SHALL menampilkan ikon stabil (➡️)
6. THE System SHALL menampilkan perubahan match score dalam persentase (contoh: +5%, -3%)

### Requirement 11: Admin View untuk Data Excel

**User Story:** Sebagai admin, saya ingin melihat data Excel yang diupload sebagai referensi, sehingga saya dapat memverifikasi data siswa tanpa mempengaruhi sistem rekomendasi.

#### Acceptance Criteria

1. WHEN admin mengupload Excel, THE System SHALL menyimpan data Excel dalam tabel terpisah untuk referensi
2. THE System SHALL menyediakan halaman khusus admin untuk melihat data Excel
3. WHEN admin membuka halaman referensi Excel, THE System SHALL menampilkan semua data tanpa label semester
4. THE System SHALL menampilkan peringatan bahwa data Excel adalah referensi dan tidak digunakan untuk rekomendasi
5. THE System SHALL tidak mengizinkan siswa mengakses halaman referensi Excel

### Requirement 12: Validasi Data Input

**User Story:** Sebagai sistem, saya ingin memvalidasi input nilai siswa, sehingga data yang tersimpan selalu valid dan konsisten.

#### Acceptance Criteria

1. WHEN siswa menginput nilai, THE System SHALL memvalidasi bahwa nilai berada dalam rentang 0-100
2. WHEN siswa menginput nilai, THE System SHALL memvalidasi bahwa nilai adalah angka valid
3. WHEN siswa menginput nilai dengan desimal, THE System SHALL menerima maksimal 2 digit desimal
4. WHEN siswa menyimpan form dengan semua field kosong, THE System SHALL menampilkan error "Harap isi minimal satu mata pelajaran"
5. WHEN validasi gagal, THE System SHALL menampilkan pesan error yang jelas dan tidak menyimpan data

### Requirement 13: Migrasi Data Existing

**User Story:** Sebagai sistem, saya ingin memigrasi data semester 6 yang sudah ada ke format baru, sehingga data existing tidak hilang setelah perbaikan bug.

#### Acceptance Criteria

1. WHEN sistem diupdate, THE System SHALL mendeteksi data semester 6 yang berasal dari Excel upload
2. THE System SHALL memindahkan data semester 6 ke tabel referensi admin
3. THE System SHALL menghapus data semester 6 dari tabel grades siswa
4. THE System SHALL membuat log migrasi untuk audit
5. WHEN migrasi selesai, THE System SHALL menampilkan notifikasi ke admin tentang jumlah data yang dimigrasi

### Requirement 14: Performance dengan Data Minimal

**User Story:** Sebagai sistem, saya ingin tetap memberikan rekomendasi yang berguna meskipun data minimal, sehingga siswa kelas X mendapat manfaat sejak semester 1.

#### Acceptance Criteria

1. WHEN siswa hanya memiliki 1 semester, THE System SHALL tetap menghitung match score untuk semua jurusan
2. THE System SHALL memberikan rekomendasi minimal 5 jurusan meskipun dengan data 1 semester
3. WHEN data minimal, THE System SHALL memprioritaskan jurusan dengan requirement subjects yang sesuai dengan nilai tinggi siswa
4. THE System SHALL menampilkan disclaimer "Rekomendasi akan lebih akurat dengan lebih banyak data semester"
5. WHEN tidak ada jurusan dengan match score > 50%, THE System SHALL menurunkan threshold menjadi 40% untuk data minimal

### Requirement 15: Notifikasi Progress

**User Story:** Sebagai siswa, saya ingin mendapat notifikasi ketika saya mencapai milestone tertentu, sehingga saya termotivasi untuk terus melengkapi data.

#### Acceptance Criteria

1. WHEN siswa menyelesaikan semester ke-2, THE System SHALL menampilkan notifikasi "Bagus! Rekomendasi Anda mulai lebih akurat."
2. WHEN siswa menyelesaikan semester ke-4, THE System SHALL menampilkan notifikasi "Hebat! Rekomendasi Anda sudah cukup akurat."
3. WHEN siswa menyelesaikan semester ke-6, THE System SHALL menampilkan notifikasi "Sempurna! Anda memiliki analisis lengkap."
4. THE System SHALL menampilkan notifikasi sebagai toast message yang muncul selama 5 detik
5. THE System SHALL menyimpan riwayat notifikasi untuk setiap siswa
