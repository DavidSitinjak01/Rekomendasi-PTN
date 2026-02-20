# Test Session Langsung Setelah Login

## Masalah
Baru login sebagai admin, tapi ketika buka halaman "Kelola User" atau coba ubah password, malah disuruh logout dan login ulang.

## Kemungkinan Penyebab

1. **Session tidak tersimpan dengan benar** di localStorage
2. **Session ID tidak dikirim dengan benar** ke server
3. **Server tidak mengenali session** yang baru dibuat
4. **Browser cache** masih menggunakan file JavaScript lama

## Test Manual - Cek Session

### Langkah 1: Login sebagai Admin
1. Buka http://localhost:3000
2. Login dengan:
   - Username: `admin`
   - Password: `admin123`
3. Setelah login berhasil, **JANGAN TUTUP TAB**

### Langkah 2: Cek Session di Console
1. Tekan **F12** (Developer Tools)
2. Klik tab **Console**
3. Ketik dan Enter:
   ```javascript
   console.log('Session ID:', localStorage.getItem('sessionId'));
   console.log('Role:', localStorage.getItem('role'));
   ```

**Expected Output**:
```
Session ID: 1234567890.abcdef (angka dan huruf acak)
Role: admin
```

**Jika NULL atau undefined** = Session tidak tersimpan, ada masalah di login

### Langkah 3: Test API dengan Session
Masih di Console, ketik dan Enter:
```javascript
fetch('http://localhost:3000/api/admin/students', {
    headers: { 'x-session-id': localStorage.getItem('sessionId') }
})
.then(r => r.json())
.then(d => console.log('Result:', d))
.catch(e => console.error('Error:', e));
```

**Expected Output**:
```
Result: {success: true, students: [...]}
```

**Jika error "Unauthorized"** = Session tidak valid atau tidak dikirim dengan benar

### Langkah 4: Klik Menu "Kelola User"
1. Klik menu **"Kelola User"**
2. Lihat Console (F12)
3. Perhatikan log yang muncul:
   ```
   Loading students from: http://localhost:3000/api/admin/students
   Session ID: 1234567890.abcdef
   Response status: 200
   Result: {success: true, students: [...]}
   ```

**Jika muncul error** = Ada masalah di halaman admin-users.html

## Solusi Berdasarkan Hasil Test

### Jika Session NULL di Langkah 2
**Masalah**: Login tidak menyimpan session dengan benar

**Solusi**:
1. Clear localStorage: `localStorage.clear()`
2. Refresh halaman (Ctrl + F5)
3. Login ulang
4. Cek lagi session

### Jika Session Ada tapi API Error "Unauthorized"
**Masalah**: Server tidak mengenali session

**Solusi**:
1. Restart server (Ctrl+C, lalu `node web-app/server.js`)
2. Login ulang (session lama sudah tidak valid)
3. Test lagi

### Jika Session Ada dan API Berhasil, tapi Halaman Error
**Masalah**: File JavaScript di halaman admin-users.html masih cache lama

**Solusi**:
1. Hard refresh halaman: **Ctrl + Shift + R** atau **Ctrl + F5**
2. Atau clear cache browser (Ctrl + Shift + Delete)
3. Refresh halaman

## Test Fitur Ubah Password

Setelah session confirmed working:

1. Di halaman "Kelola User", klik tombol **"🔑 Ubah Password Admin"**
2. Buka Console (F12)
3. Isi form:
   - Password Lama: `admin123`
   - Password Baru: `newpass` (minimal 6 karakter)
   - Konfirmasi: `newpass`
4. Klik **"Ubah Password"**
5. Lihat Console untuk log detail:
   ```
   Sending change password request to: http://localhost:3000/api/admin/change-password
   Session ID: 1234567890.abcdef
   Response status: 200
   Result: {success: true, message: "Password berhasil diubah..."}
   ```

**Jika berhasil**: Akan redirect ke login dalam 2 detik

**Jika error**: Lihat pesan error di Console dan screenshot

## Quick Fix - Tanpa Logout

Jika Anda tidak ingin logout-login ulang, coba ini:

### Fix 1: Hard Refresh
1. Di halaman yang error, tekan **Ctrl + Shift + R**
2. Atau **Ctrl + F5**
3. Ini akan reload halaman tanpa cache

### Fix 2: Clear Cache Halaman Ini Saja
1. Tekan **F12**
2. Klik kanan tombol **Refresh** di browser
3. Pilih **"Empty Cache and Hard Reload"**

### Fix 3: Buka di Tab Baru
1. Klik kanan menu "Kelola User"
2. Pilih **"Open in New Tab"**
3. Tab baru akan load file terbaru

## Informasi Penting

### Session Akan Hilang Jika:
- ❌ Server di-restart
- ❌ Browser di-close
- ❌ localStorage di-clear
- ❌ Logout diklik

### Session Tetap Ada Jika:
- ✅ Refresh halaman (F5)
- ✅ Pindah ke halaman lain di aplikasi
- ✅ Buka tab baru dengan URL yang sama
- ✅ Browser minimize/maximize

## Beritahu Saya

Setelah test di atas, tolong beritahu:

1. **Hasil Langkah 2** (Session ID ada atau NULL?)
2. **Hasil Langkah 3** (API berhasil atau error?)
3. **Hasil Langkah 4** (Halaman load atau error?)
4. **Screenshot Console** jika ada error

Dengan informasi ini saya bisa tahu persis masalahnya di mana! 🔍
