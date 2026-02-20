# Requirements Document

## Introduction

Aplikasi Rekomendasi PTN dan Jurusan adalah sistem web yang membantu siswa SMA Negeri 1 Telukdalam dalam menentukan pilihan Perguruan Tinggi Negeri (PTN) dan program studi yang sesuai dengan kemampuan akademik mereka. Dokumen ini menjelaskan penyempurnaan aplikasi yang mencakup identitas sekolah, responsive design untuk perangkat mobile, deskripsi aplikasi, dan peningkatan hak akses admin.

## Glossary

- **System**: Aplikasi Rekomendasi PTN dan Jurusan
- **Admin**: Pengguna dengan hak akses administratif yang dapat mengelola data siswa dan melihat laporan
- **Student**: Siswa yang menggunakan aplikasi untuk menginput nilai dan melihat rekomendasi
- **School_Logo**: Gambar logo sekolah dalam format JPG, JPEG, atau PNG
- **Header**: Bagian atas halaman aplikasi yang menampilkan identitas sekolah
- **Mobile_Device**: Perangkat Android dengan layar smartphone
- **Excel_Upload**: Fitur untuk mengunggah file Excel berisi data nilai siswa
- **Student_Detail**: Halaman yang menampilkan informasi lengkap siswa termasuk nilai dan rekomendasi
- **PDF_Report**: Dokumen laporan dalam format PDF yang berisi informasi siswa dan rekomendasi

## Requirements

### Requirement 1: School Identity Display

**User Story:** Sebagai admin sekolah, saya ingin menampilkan identitas SMA Negeri 1 Telukdalam dengan logo sekolah, sehingga aplikasi memiliki branding yang jelas dan profesional.

#### Acceptance Criteria

1. THE System SHALL display the school name "SMA Negeri 1 Telukdalam" in the Header
2. WHEN an Admin uploads a School_Logo file, THE System SHALL validate that the file format is JPG, JPEG, or PNG
3. WHEN a valid School_Logo is uploaded, THE System SHALL store the logo and display it in the Header
4. WHEN an invalid file format is uploaded, THE System SHALL reject the upload and display an error message
5. THE System SHALL display the School_Logo in the Header on all pages after successful upload

### Requirement 2: Mobile Responsive Design

**User Story:** Sebagai siswa, saya ingin menggunakan aplikasi dari smartphone Android saya, sehingga saya dapat menginput nilai dan melihat rekomendasi kapan saja dan di mana saja.

#### Acceptance Criteria

1. WHEN the application is accessed from a Mobile_Device, THE System SHALL render a responsive layout optimized for mobile screens
2. WHEN a Student inputs grades on a Mobile_Device, THE System SHALL provide touch-friendly input controls with appropriate sizing
3. WHEN the viewport width is less than 768 pixels, THE System SHALL adjust the layout to single-column display
4. WHEN navigation menus are displayed on a Mobile_Device, THE System SHALL provide a mobile-friendly navigation pattern
5. WHEN forms are displayed on a Mobile_Device, THE System SHALL ensure all form fields are accessible and usable without horizontal scrolling

### Requirement 3: Application Description

**User Story:** Sebagai pengunjung aplikasi, saya ingin memahami tujuan dan manfaat aplikasi, sehingga saya dapat mengetahui bagaimana aplikasi ini membantu proses pemilihan PTN dan jurusan.

#### Acceptance Criteria

1. WHEN a user visits the main page, THE System SHALL display the application description text
2. THE System SHALL display the description: "Aplikasi Rekomendasi PTN dan Jurusan dibuat untuk membantu siswa menentukan pilihan Perguruan Tinggi Negeri (PTN) dan program studi yang sesuai dengan kemampuan akademik mereka. Banyak siswa mengalami kebingungan dalam memilih jurusan karena kurangnya analisis terhadap nilai dan tingkat persaingan masuk PTN. Melalui sistem ini, data nilai siswa dianalisis secara otomatis untuk menghasilkan rekomendasi kampus dan jurusan yang realistis, terukur, dan sesuai dengan performa akademik. Aplikasi ini juga membantu guru dan pihak sekolah dalam memberikan arahan yang lebih objektif dan berbasis data kepada siswa."
3. WHEN the description is displayed, THE System SHALL format the text for readability with appropriate spacing and typography

### Requirement 4: Enhanced Admin Access

**User Story:** Sebagai admin, saya ingin melihat detail lengkap nilai siswa dan mengunduh laporan per siswa, sehingga saya dapat memberikan bimbingan yang lebih baik dan mendokumentasikan hasil rekomendasi.

#### Acceptance Criteria

1. WHEN an Admin views the Student_Detail page, THE System SHALL display all subject grades from the uploaded Excel data
2. WHEN an Admin views the Student_Detail page, THE System SHALL display the PTN and major recommendations for that student
3. WHEN an Admin clicks the download button on Student_Detail page, THE System SHALL generate a PDF_Report containing student information, grades, and recommendations
4. WHEN the PDF_Report is generated, THE System SHALL include the School_Logo in the report header
5. WHEN an Admin accesses student data, THE System SHALL display complete academic information including all subjects and their respective grades
6. WHEN Excel_Upload contains student grades, THE System SHALL parse and store all subject grades for admin viewing

### Requirement 5: Data Integrity and Security

**User Story:** Sebagai admin, saya ingin memastikan data siswa aman dan akurat, sehingga rekomendasi yang diberikan dapat dipercaya.

#### Acceptance Criteria

1. WHEN a School_Logo is uploaded, THE System SHALL validate the file size does not exceed 5MB
2. WHEN student data is displayed, THE System SHALL ensure only authorized Admin users can access detailed student information
3. WHEN a PDF_Report is generated, THE System SHALL include all relevant student data without data loss
4. WHEN the System stores uploaded files, THE System SHALL use secure file storage mechanisms
5. WHEN a Student logs in, THE System SHALL only display their own grades and recommendations
