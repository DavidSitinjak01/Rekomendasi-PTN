# Cara Test Fitur Ubah Password SEKARANG

## Anda Sudah Login? Bagus! Tidak Perlu Logout!

Ikuti langkah ini tanpa logout:

## Langkah 1: Hard Refresh Halaman
Di halaman yang sedang terbuka sekarang:

1. Tekan **Ctrl + Shift + R** (atau **Ctrl + F5**)
2. Ini akan reload halaman dengan file JavaScript terbaru
3. Tunggu halaman selesai loading

## Langkah 2: Klik Menu "Kelola User"
1. Klik menu **"Kelola User"** di navigasi atas
2. Halaman akan pindah ke admin-users.html
3. Seharusnya muncul daftar siswa (atau "Belum ada data siswa" jika belum upload Excel)

## Langkah 3: Test Fitur Ubah Password
1. Di halaman "Kelola User", cari tombol **"🔑 Ubah Password Admin"**
   - Tombol ini ada di kanan atas, sejajar dengan judul "➕ Tambah Siswa Baru"

2. Klik tombol tersebut
   - Modal (popup) akan muncul

3. Isi form di modal:
   - **Password Lama**: `admin123`
   - **Password Baru**: `testing123` (minimal 6 karakter)
   - **Konfirmasi Password**: `testing123` (harus sama)

4. Klik tombol **"Ubah Password"**

5. Jika berhasil:
   - Muncul pesan "Password berhasil diubah. Silakan login kembali."
   - Setelah 2 detik, otomatis redirect ke halaman login
   - Login dengan password baru: `testing123`

## Jika Ada Error

### Error: "Unexpected token '<', "<!DOCTYPE"..."
**Artinya**: Browser masih pakai file JavaScript lama

**Solusi**:
1. Tekan **Ctrl + Shift + R** untuk hard refresh
2. Atau buka di tab Incognito (Ctrl + Shift + N)

### Error: "Unauthorized" atau "Session expired"
**Artinya**: Session tidak valid

**Solusi**:
1. Buka Console (F12)
2. Ketik: `localStorage.clear()`
3. Refresh halaman (F5)
4. Login ulang

### Error: "Password lama salah"
**Artinya**: Password yang Anda masukkan salah

**Solusi**:
- Pastikan password lama adalah: `admin123`
- Atau jika sudah pernah diubah, gunakan password yang terakhir

### Error: "Password baru minimal 6 karakter"
**Artinya**: Password baru terlalu pendek

**Solusi**:
- Gunakan password minimal 6 karakter
- Contoh: `newpass`, `admin456`, `testing123`

### Error: "Password baru dan konfirmasi tidak sama"
**Artinya**: Password baru dan konfirmasi tidak cocok

**Solusi**:
- Pastikan kedua field diisi dengan password yang sama persis

## Cek Console untuk Detail

Jika ada error yang tidak jelas:

1. Tekan **F12** (Developer Tools)
2. Klik tab **Console**
3. Lihat pesan error yang muncul
4. Akan ada log detail seperti:
   ```
   Loading students from: http://localhost:3000/api/admin/students
   Session ID: 1234567890.abcdef
   Response status: 200
   ```

5. Screenshot dan kirim ke saya jika ada error

## Alternatif: Test di Tab Incognito

Jika cara di atas tidak berhasil, coba di tab Incognito:

1. Buka tab Incognito: **Ctrl + Shift + N**
2. Buka: `http://localhost:3000`
3. Login: username `admin`, password `admin123`
4. Klik menu "Kelola User"
5. Test fitur "Ubah Password Admin"

Tab Incognito tidak pakai cache, jadi pasti load file terbaru.

## Setelah Test Berhasil

Jika ubah password berhasil:

1. Anda akan di-redirect ke halaman login
2. Login dengan password baru
3. Password admin sudah berubah
4. Fitur ubah password sudah berfungsi dengan baik ✅

## Beritahu Saya

Setelah coba langkah di atas, tolong beritahu:

1. **Apakah tombol "🔑 Ubah Password Admin" muncul?** (Ya/Tidak)
2. **Apakah modal ubah password terbuka?** (Ya/Tidak)
3. **Apa yang terjadi setelah klik "Ubah Password"?** (Berhasil/Error)
4. **Jika error, apa pesannya?** (Screenshot Console)

Saya siap bantu lebih lanjut! 🚀
