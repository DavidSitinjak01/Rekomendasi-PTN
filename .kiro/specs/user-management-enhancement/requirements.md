# Requirements: User Management Enhancement

## Feature Overview
Meningkatkan sistem manajemen user dengan memisahkan guru dan siswa, serta menambahkan fitur edit password untuk admin dan semua user.

## User Stories

### 1. Pemisahan Guru dan Siswa
**As an** admin  
**I want to** melihat guru dan siswa dalam daftar terpisah  
**So that** saya bisa mengelola mereka dengan lebih mudah dan terorganisir

**Acceptance Criteria:**
- 1.1. Halaman Kelola User menampilkan 2 tab: "Siswa" dan "Guru"
- 1.2. Tab "Siswa" menampilkan semua user dengan role "student"
- 1.3. Tab "Guru" menampilkan semua user dengan role "teacher"
- 1.4. Setiap tab menampilkan jumlah total user (contoh: "Siswa (176)" dan "Guru (12)")
- 1.5. Admin bisa menambah user baru dengan memilih role (siswa atau guru)
- 1.6. Guru bisa login dengan username dan password mereka sendiri
- 1.7. Guru bisa melihat semua data siswa (read-only, tidak bisa edit)

### 2. Admin Edit Password Sendiri
**As an** admin  
**I want to** mengubah password admin saya sendiri  
**So that** saya bisa menjaga keamanan akun admin

**Acceptance Criteria:**
- 2.1. Admin melihat tombol "Ubah Password Admin" di halaman Kelola User
- 2.2. Klik tombol membuka modal/form untuk ubah password
- 2.3. Form meminta: Password Lama, Password Baru, Konfirmasi Password Baru
- 2.4. Sistem validasi password lama benar
- 2.5. Sistem validasi password baru minimal 6 karakter
- 2.6. Sistem validasi password baru dan konfirmasi sama
- 2.7. Setelah berhasil, admin harus login ulang dengan password baru
- 2.8. Notifikasi sukses ditampilkan

### 3. Admin Edit Password User Lain
**As an** admin  
**I want to** mengubah password siswa atau guru  
**So that** saya bisa membantu user yang lupa password

**Acceptance Criteria:**
- 3.1. Setiap user card memiliki tombol "Reset Password"
- 3.2. Klik tombol membuka modal untuk set password baru
- 3.3. Form meminta: Password Baru, Konfirmasi Password Baru
- 3.4. Admin TIDAK perlu tahu password lama user
- 3.5. Sistem validasi password baru minimal 6 karakter
- 3.6. Sistem validasi password baru dan konfirmasi sama
- 3.7. Notifikasi sukses ditampilkan
- 3.8. User bisa login dengan password baru

### 4. Admin Edit Data User
**As an** admin  
**I want to** mengedit data user (nama, username, role)  
**So that** saya bisa memperbaiki data yang salah

**Acceptance Criteria:**
- 4.1. Setiap user card memiliki tombol "Edit"
- 4.2. Klik tombol membuka modal untuk edit data
- 4.3. Form menampilkan: Nama, Username/NISN, Role (Siswa/Guru), Kelas (jika siswa)
- 4.4. Admin bisa mengubah semua field
- 4.5. Admin bisa mengubah role siswa menjadi guru atau sebaliknya
- 4.6. Sistem validasi username/NISN tidak duplikat
- 4.7. Notifikasi sukses ditampilkan
- 4.8. Daftar user di-refresh otomatis

### 5. Guru Login dan Akses
**As a** guru  
**I want to** login dan melihat data siswa  
**So that** saya bisa memantau perkembangan siswa

**Acceptance Criteria:**
- 5.1. Guru bisa login dengan username dan password
- 5.2. Setelah login, guru melihat halaman beranda dengan daftar siswa
- 5.3. Guru bisa melihat detail siswa (nilai, analisis, rekomendasi)
- 5.4. Guru bisa download PDF laporan siswa
- 5.5. Guru TIDAK bisa edit atau hapus data siswa
- 5.6. Guru TIDAK bisa upload file Excel
- 5.7. Guru TIDAK bisa akses halaman Kelola User
- 5.8. Text "👤 Guru" muncul di sebelah tombol Logout

## Technical Requirements

### Database Schema Changes
- Tambah field `role` di tabel users: 'admin' | 'teacher' | 'student'
- Tambah field `password` di tabel users (hash dengan bcrypt atau simple hash)
- Tambah field `username` di tabel users (untuk guru, karena tidak punya NISN)

### API Endpoints
- `POST /api/admin/change-password` - Admin ubah password sendiri
- `POST /api/admin/reset-user-password/:id` - Admin reset password user
- `PUT /api/admin/users/:id` - Admin edit data user (termasuk role)
- `GET /api/admin/users?role=teacher` - Get semua guru
- `GET /api/admin/users?role=student` - Get semua siswa

### Security
- Password harus di-hash sebelum disimpan
- Validasi role di server-side untuk setiap request
- Guru tidak bisa akses endpoint admin
- Session harus menyimpan role user

## Non-Functional Requirements

### Performance
- Load daftar user maksimal 2 detik untuk 500 user
- Edit password maksimal 1 detik

### Usability
- Form edit user mudah digunakan
- Notifikasi jelas dan informatif
- Tab switching smooth tanpa reload halaman

### Security
- Password minimal 6 karakter
- Password di-hash dengan algoritma yang aman
- Session timeout setelah 24 jam

## Out of Scope (Tidak Termasuk)
- User bisa ubah password sendiri (hanya admin yang bisa)
- Email notification saat password direset
- Password recovery via email
- Two-factor authentication
- Role-based permissions yang lebih kompleks

## Success Metrics
- Admin bisa mengelola guru dan siswa dengan mudah
- Admin bisa reset password user dalam < 30 detik
- Guru bisa login dan melihat data siswa
- Tidak ada bug atau error saat edit user
