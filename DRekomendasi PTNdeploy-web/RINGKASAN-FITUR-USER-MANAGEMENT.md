# Ringkasan Fitur User Management Enhancement

## Yang Akan Ditambahkan

### 1. Pemisahan Guru dan Siswa ✨
- Halaman "Kelola User" akan punya 2 tab: **Siswa** dan **Guru**
- Setiap tab menampilkan jumlah user (contoh: "Siswa (176)" dan "Guru (12)")
- Admin bisa dengan mudah melihat dan mengelola siswa dan guru secara terpisah

### 2. Admin Bisa Edit Password Sendiri 🔑
- Tombol "Ubah Password Admin" di halaman Kelola User
- Admin input: Password Lama, Password Baru, Konfirmasi
- Setelah berhasil, admin harus login ulang dengan password baru

### 3. Admin Bisa Reset Password User 🔓
- Setiap user card punya tombol "Reset Password"
- Admin bisa set password baru untuk siswa atau guru
- Admin TIDAK perlu tahu password lama user
- User bisa login dengan password baru

### 4. Admin Bisa Edit Data User ✏️
- Setiap user card punya tombol "Edit"
- Admin bisa ubah: Nama, Username/NISN, Role, Kelas
- Admin bisa ubah role siswa jadi guru atau sebaliknya
- Validasi username tidak duplikat

### 5. Admin Bisa Tambah User Baru ➕
- Tombol "Tambah User Baru" di halaman Kelola User
- Admin pilih role: Siswa atau Guru
- Admin input: Nama, Username/NISN, Password, Kelas (jika siswa)

### 6. Admin Bisa Hapus User 🗑️
- Setiap user card punya tombol "Delete"
- Konfirmasi sebelum hapus
- Data nilai siswa tetap tersimpan (tidak ikut terhapus)

## Tampilan Baru

### Halaman Kelola User
```
┌─────────────────────────────────────────────────────┐
│ 📋 Kelola User                                      │
│                                                      │
│ [+ Tambah User Baru]  [🔑 Ubah Password Admin]     │
│                                                      │
│ ┌─────────┬─────────┐                              │
│ │ Siswa   │ Guru    │  ← Tabs                      │
│ │ (176)   │ (12)    │                              │
│ └─────────┴─────────┘                              │
│                                                      │
│ 🔍 [Search box]                                     │
│                                                      │
│ ┌────────────────────────────────────────────────┐ │
│ │ 👤 Ahmad Rizki                                 │ │
│ │ NISN: 1234567890 | Kelas: XII IPA 1           │ │
│ │ [Edit] [Reset Password] [Delete] [Detail]     │ │
│ └────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

## Fitur Guru (Future)
Setelah fitur ini selesai, guru bisa:
- Login dengan username dan password
- Melihat semua data siswa (read-only)
- Download PDF laporan siswa
- TIDAK bisa edit atau hapus data

## Keamanan 🔒
- Semua password di-hash (tidak disimpan plain text)
- Password minimal 6 karakter
- Username harus unik (tidak boleh duplikat)
- Role-based access control (admin, guru, siswa)

## Estimasi Waktu
- **Total: ~7.5 jam** untuk implementasi lengkap
- Database Setup: 1 jam
- Backend API: 2 jam
- Frontend UI: 3 jam
- Testing: 1 jam
- Documentation: 30 menit

## Langkah Implementasi

### Phase 1: Database (1 jam)
1. Buat tabel `users` baru
2. Migrate data siswa ke tabel users
3. Buat user admin default
4. Hash semua password

### Phase 2: Backend API (2 jam)
1. Endpoint untuk CRUD user
2. Endpoint untuk password management
3. Update login untuk support users table
4. Role-based middleware

### Phase 3: Frontend UI (3 jam)
1. Update halaman admin-users.html dengan tabs
2. Buat modal untuk tambah/edit user
3. Buat modal untuk reset password
4. Buat modal untuk ubah password admin
5. Implement delete user dengan konfirmasi

### Phase 4: Testing (1 jam)
1. Test semua fitur CRUD
2. Test password management
3. Test validasi
4. Fix bugs

## Apakah Anda Setuju?

Sebelum saya mulai implementasi, tolong konfirmasi:

1. **Apakah design ini sudah sesuai dengan yang Anda inginkan?**
2. **Apakah ada yang perlu ditambah atau diubah?**
3. **Apakah saya bisa mulai implementasi sekarang?**

## Token Status
- Token terpakai: ~96.600 / 200.000 (48.3%)
- Token tersisa: ~103.400 (51.7%)
- Cukup untuk implementasi lengkap!

---

**Catatan**: Fitur ini akan sangat meningkatkan kemampuan admin dalam mengelola user. Semua operasi CRUD (Create, Read, Update, Delete) akan tersedia untuk admin.
