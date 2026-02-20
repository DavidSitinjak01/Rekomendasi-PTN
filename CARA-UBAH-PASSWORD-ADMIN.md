# Cara Ubah Password Admin

## Fitur Baru: Ubah Password Admin

Admin sekarang bisa mengubah password sendiri dengan validasi password lama untuk keamanan.

## Cara Menggunakan

### 1. Login sebagai Admin
- Buka `http://localhost:3000`
- Login dengan:
  - Username: `admin`
  - Password: `admin123` (password default)

### 2. Buka Halaman Kelola User
- Klik menu "Kelola User" di navigation bar
- Atau langsung buka: `http://localhost:3000/admin-users.html`

### 3. Klik Tombol "🔑 Ubah Password Admin"
- Tombol ada di bagian atas halaman, sebelah kanan judul "Tambah Siswa Baru"
- Klik tombol tersebut

### 4. Isi Form Ubah Password
Modal akan muncul dengan 3 input field:

**Password Lama:**
- Masukkan password admin saat ini
- Contoh: `admin123`

**Password Baru:**
- Masukkan password baru yang Anda inginkan
- Minimal 6 karakter
- Contoh: `newpassword123`

**Konfirmasi Password Baru:**
- Ketik ulang password baru
- Harus sama dengan password baru di atas

### 5. Klik "Ubah Password"
- Sistem akan validasi:
  - ✅ Password lama benar
  - ✅ Password baru minimal 6 karakter
  - ✅ Password baru dan konfirmasi sama

### 6. Login Ulang
- Jika berhasil, Anda akan melihat pesan: "Password berhasil diubah. Silakan login kembali."
- Setelah 2 detik, otomatis redirect ke halaman login
- Login dengan password baru Anda

## Validasi & Error Messages

### ✅ Sukses
- "Password berhasil diubah. Silakan login kembali."
- Otomatis logout dan redirect ke login

### ❌ Error: Password Lama Salah
- "Password lama salah"
- Cek kembali password lama Anda

### ❌ Error: Password Terlalu Pendek
- "Password baru minimal 6 karakter"
- Gunakan password yang lebih panjang

### ❌ Error: Password Tidak Sama
- "Password baru dan konfirmasi tidak sama"
- Pastikan kedua password sama persis

## Keamanan

### Password Hashing
- Password di-hash menggunakan SHA-256
- Password tidak disimpan dalam bentuk plain text
- Aman dari pencurian data

### Session Clearing
- Setelah ubah password, session admin di-clear
- Admin harus login ulang dengan password baru
- Mencegah akses tidak sah

### Validasi Server-Side
- Semua validasi dilakukan di server
- Tidak bisa di-bypass dari client
- Aman dari manipulasi

## Tips

1. **Gunakan Password yang Kuat**
   - Minimal 8-10 karakter (meskipun minimum 6)
   - Kombinasi huruf besar, kecil, angka
   - Contoh: `Admin2024!`

2. **Jangan Lupa Password Baru**
   - Catat password baru di tempat aman
   - Jika lupa, tidak ada cara recovery (untuk sekarang)

3. **Ubah Password Secara Berkala**
   - Disarankan ubah password setiap 3-6 bulan
   - Untuk keamanan yang lebih baik

## Troubleshooting

### Masalah: Tombol "Ubah Password" Tidak Muncul
**Solusi:**
- Pastikan Anda login sebagai admin
- Refresh halaman (Ctrl+F5)
- Clear cache browser

### Masalah: Modal Tidak Muncul
**Solusi:**
- Cek console browser (F12) untuk error
- Pastikan JavaScript enabled
- Restart server dan refresh browser

### Masalah: Error "Unauthorized"
**Solusi:**
- Session expired
- Logout dan login ulang
- Coba ubah password lagi

### Masalah: Lupa Password Baru
**Solusi (Manual):**
1. Stop server (Ctrl+C)
2. Edit file `web-app/server.js`
3. Cari baris: `let ADMIN_PASSWORD_HASH = hashPassword('admin123');`
4. Ubah `'admin123'` dengan password yang Anda inginkan
5. Save file
6. Restart server: `node web-app/server.js`
7. Login dengan password baru

## Testing

### Test 1: Ubah Password dengan Benar
1. Login sebagai admin
2. Klik "Ubah Password Admin"
3. Isi:
   - Password Lama: `admin123`
   - Password Baru: `newpass123`
   - Konfirmasi: `newpass123`
4. Klik "Ubah Password"
5. **Expected**: Sukses, redirect ke login
6. Login dengan password baru: `newpass123`
7. **Expected**: Login berhasil

### Test 2: Password Lama Salah
1. Klik "Ubah Password Admin"
2. Isi:
   - Password Lama: `wrongpassword`
   - Password Baru: `newpass123`
   - Konfirmasi: `newpass123`
3. Klik "Ubah Password"
4. **Expected**: Error "Password lama salah"

### Test 3: Password Terlalu Pendek
1. Klik "Ubah Password Admin"
2. Isi:
   - Password Lama: `admin123`
   - Password Baru: `12345` (hanya 5 karakter)
   - Konfirmasi: `12345`
3. Klik "Ubah Password"
4. **Expected**: Error "Password baru minimal 6 karakter"

### Test 4: Password Tidak Sama
1. Klik "Ubah Password Admin"
2. Isi:
   - Password Lama: `admin123`
   - Password Baru: `newpass123`
   - Konfirmasi: `newpass456` (berbeda)
3. Klik "Ubah Password"
4. **Expected**: Error "Password baru dan konfirmasi tidak sama"

## Status Implementasi

✅ Backend API endpoint (`POST /api/admin/change-password`)
✅ Password hashing dengan SHA-256
✅ Validasi password lama
✅ Validasi password baru (minimal 6 karakter)
✅ Session clearing setelah ubah password
✅ Frontend UI (tombol dan modal)
✅ Client-side validation
✅ Error handling
✅ Success notification
✅ Auto redirect ke login

## Fitur Selesai! 🎉

Fitur "Ubah Password Admin" sudah selesai diimplementasikan dan siap digunakan!

**Estimasi waktu**: ~1.5 jam
**Waktu aktual**: ~1 jam (lebih cepat dari estimasi!)

Silakan test dan beritahu saya jika ada masalah atau bug! 🙏
