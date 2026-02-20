# Cara Mengatasi Error JSON di Halaman Admin

## Error yang Muncul
```
Error: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
```

## Penyebab
Error ini terjadi karena browser mengharapkan response JSON dari server, tapi malah menerima HTML. Penyebab umum:
1. Browser masih menggunakan file JavaScript lama (cache)
2. Session sudah expired atau tidak valid
3. Server belum di-restart setelah perubahan

## Solusi Lengkap (Ikuti Berurutan!)

### Langkah 1: Stop Server
Jika server masih running, stop dulu dengan:
- Tekan **Ctrl+C** di terminal server

### Langkah 2: Clear Browser Cache TOTAL
1. Buka browser
2. Tekan **Ctrl + Shift + Delete**
3. Centang:
   - ✅ Cached images and files
   - ✅ Cookies and other site data
4. Time range: **All time**
5. Klik **Clear data**

### Langkah 3: Clear localStorage
1. Buka `http://localhost:3000` (meskipun server belum jalan)
2. Tekan **F12** (Developer Tools)
3. Klik tab **Console**
4. Ketik dan tekan Enter:
   ```javascript
   localStorage.clear()
   ```
5. **Tutup browser sepenuhnya** (semua tab dan window)

### Langkah 4: Start Server Baru
```bash
node web-app/server.js
```

Tunggu sampai muncul:
```
🚀 Server berjalan di http://localhost:3000
```

### Langkah 5: Buka Browser Baru (Mode Incognito)
Untuk memastikan tidak ada cache:
- **Chrome**: Ctrl + Shift + N
- **Firefox**: Ctrl + Shift + P
- **Edge**: Ctrl + Shift + N

### Langkah 6: Login sebagai Admin
1. Buka `http://localhost:3000`
2. Login dengan:
   - Username: `admin`
   - Password: `admin123`

### Langkah 7: Test Fitur
1. Klik menu **"Kelola User"**
2. Buka **Developer Tools** (F12)
3. Klik tab **Console**
4. Lihat apakah ada error

## Jika Masih Error

### Cek Console untuk Detail Error
Setelah buka halaman Kelola User:
1. Tekan **F12**
2. Klik tab **Console**
3. Lihat pesan error yang muncul
4. Klik tab **Network**
5. Refresh halaman (F5)
6. Lihat request yang berwarna merah
7. Klik request tersebut
8. Klik tab **Response**
9. **Screenshot dan kirim ke saya**

### Cek Server Console
Lihat terminal tempat server berjalan:
- Apakah ada error?
- Jika ada, **copy paste error tersebut**

## Test Manual dengan Browser

### Test 1: Cek Server Berjalan
Buka di browser: `http://localhost:3000`
- ✅ Jika muncul halaman login = Server berjalan
- ❌ Jika tidak bisa akses = Server tidak jalan

### Test 2: Cek API Endpoint
Buka di browser: `http://localhost:3000/api/students`
- ✅ Jika muncul JSON error "Unauthorized" = Endpoint berfungsi
- ❌ Jika muncul HTML = Ada masalah routing

## Kriteria Password Baru

Saat mengubah password admin:
- ✅ Minimal **6 karakter**
- ✅ Password baru dan konfirmasi harus **sama**
- ✅ Password lama harus **benar**

Contoh password yang valid:
- `admin123` (6 karakter)
- `password123` (11 karakter)
- `mypass` (6 karakter)

Contoh password yang TIDAK valid:
- `admin` (hanya 5 karakter - terlalu pendek)
- `pass` (hanya 4 karakter - terlalu pendek)

## Troubleshooting Tambahan

### Masalah: Port 3000 Sudah Digunakan
**Gejala**: Server tidak bisa start, error "EADDRINUSE"

**Solusi Windows**:
```bash
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F
```

### Masalah: Session Expired
**Gejala**: Setelah beberapa saat, tiba-tiba logout sendiri

**Solusi**: Login ulang. Session akan expired jika:
- Server di-restart
- Browser di-close
- Terlalu lama tidak aktif

### Masalah: Halaman Blank atau Tidak Muncul Data
**Solusi**:
1. Buka Developer Tools (F12)
2. Klik tab Console
3. Lihat error yang muncul
4. Refresh halaman (Ctrl + F5 untuk hard refresh)

## Informasi Tambahan

### Endpoint yang Digunakan
Halaman Kelola User menggunakan endpoint berikut:
- `GET /api/admin/students` - Ambil semua data siswa
- `POST /api/admin/students` - Tambah siswa baru
- `PUT /api/admin/students/:id` - Update data siswa
- `DELETE /api/admin/students/:id` - Hapus siswa
- `POST /api/admin/change-password` - Ubah password admin

### Logging yang Ditambahkan
Sekarang halaman admin-users.html sudah dilengkapi dengan logging detail di Console:
- Request URL yang dipanggil
- Session ID yang digunakan
- Response status
- Response body (jika error)

Ini akan membantu debugging jika masih ada masalah.

## Beritahu Saya Jika Masih Error

Jika setelah mengikuti semua langkah di atas masih error, tolong beritahu:

1. **Di langkah mana error muncul?**
2. **Apa pesan error lengkapnya?** (Screenshot Console)
3. **Apa yang muncul di tab Network?** (Screenshot)
4. **Apakah ada error di server console?** (Copy paste)
5. **Browser apa yang digunakan?** (Chrome/Firefox/Edge)

Dengan informasi ini saya bisa bantu lebih lanjut! 🙏
