# Requirements: Admin Change Password

## Feature Overview
Admin dapat mengubah password sendiri dengan validasi password lama untuk keamanan.

## User Story

**As an** admin  
**I want to** mengubah password admin saya sendiri  
**So that** saya bisa menjaga keamanan akun admin

## Acceptance Criteria

1. Admin melihat tombol "Ubah Password" di halaman yang mudah diakses
2. Klik tombol membuka modal/form untuk ubah password
3. Form meminta 3 input:
   - Password Lama
   - Password Baru
   - Konfirmasi Password Baru
4. Sistem validasi password lama benar
5. Sistem validasi password baru minimal 6 karakter
6. Sistem validasi password baru dan konfirmasi sama
7. Setelah berhasil ubah password, admin harus login ulang
8. Notifikasi sukses ditampilkan sebelum redirect ke login

## Technical Requirements

### Database
- Simpan password admin di file atau environment variable
- Password di-hash dengan SHA-256 (simple untuk development)

### API Endpoint
- `POST /api/admin/change-password`
  - Request: `{ oldPassword, newPassword }`
  - Response: `{ success: true, message: "..." }`

### Security
- Password harus di-hash sebelum disimpan
- Validasi password lama di server-side
- Session di-clear setelah password berhasil diubah

## Success Criteria
- ✅ Admin bisa ubah password sendiri
- ✅ Validasi password lama berfungsi
- ✅ Password baru di-hash dengan aman
- ✅ Admin harus login ulang setelah ubah password
- ✅ Notifikasi jelas dan informatif
