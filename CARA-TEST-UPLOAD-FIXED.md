# Cara Test Upload File (FIXED)

## Perubahan yang Dilakukan

Saya sudah memperbaiki konflik antara inline script dan app.js:

1. ✅ Menghapus inline script yang duplikat
2. ✅ Memindahkan semua logika upload ke app.js
3. ✅ Menambahkan logging yang sangat detail
4. ✅ Memperbaiki timing event listener (sekarang di DOMContentLoaded)

## Langkah-Langkah Test

### 1. Restart Server
```bash
# Tekan Ctrl+C untuk stop server
# Kemudian jalankan lagi:
node web-app/server.js
```

### 2. Buka Browser dengan Developer Tools
1. Buka browser (Chrome/Edge/Firefox)
2. Tekan **F12** untuk buka Developer Tools
3. Klik tab **Console**
4. Buka `http://localhost:3000`

### 3. Lihat Console - Harus Muncul:
```
app.js loaded
=== DOMContentLoaded event fired ===
Session ID: null
No session, redirecting to login
```

### 4. Login sebagai Admin
- Username: `admin`
- Password: `admin123`

### 5. Setelah Login, Lihat Console - Harus Muncul:
```
=== DOMContentLoaded event fired ===
Session ID: [angka panjang]
User Role: admin
User is admin
=== Setting up upload form ===
Upload form element: [object HTMLFormElement]
Attaching submit event listener to form
Event listener attached successfully
```

**PENTING**: Jika tidak muncul "Event listener attached successfully", berarti ada masalah!

### 6. Pilih File Excel
- Klik tombol "Choose File" atau "Pilih File"
- Pilih file Excel Anda (Rekomendasi PTN.xlsx)

### 7. Klik "Upload File"

### 8. Lihat Console - Harus Muncul:
```
=== FORM SUBMITTED ===
File input element: [object HTMLInputElement]
File selected: Rekomendasi PTN.xlsx
Starting upload to: http://localhost:3000/api/upload
Session ID: [angka panjang]
Response status: 200
Response ok: true
Response data: {success: true, message: "...", totalStudents: 176}
Upload successful!
Status [success]: ✓ File berhasil diupload dan data tersimpan. Total siswa: 176
Reloading page...
```

### 9. Halaman Akan Reload Otomatis
Setelah 2 detik, halaman akan reload dan menampilkan daftar siswa.

## Troubleshooting

### Jika Tidak Muncul "app.js loaded"
**Masalah**: File app.js tidak ter-load
**Solusi**:
1. Hard refresh: Ctrl+Shift+R atau Ctrl+F5
2. Clear cache browser
3. Cek apakah ada error di console

### Jika Tidak Muncul "Event listener attached successfully"
**Masalah**: Upload form tidak ditemukan atau ada error
**Solusi**:
1. Cek apakah Anda login sebagai admin (bukan student)
2. Cek apakah ada error JavaScript di console
3. Screenshot console dan kirim ke saya

### Jika Tidak Muncul "FORM SUBMITTED"
**Masalah**: Event listener tidak berfungsi
**Solusi**:
1. Restart server
2. Hard refresh browser (Ctrl+Shift+R)
3. Clear localStorage:
   - Di console, ketik: `localStorage.clear()`
   - Refresh halaman
   - Login lagi

### Jika Muncul Error di Console
**Solusi**:
1. Screenshot error tersebut
2. Copy paste text error ke chat
3. Beritahu saya apa yang terjadi

## Cek Folder uploads/

Pastikan folder `uploads/` ada di root project:
```
your-project/
├── uploads/           <-- Folder ini harus ada
├── web-app/
├── src/
└── ...
```

Jika tidak ada, buat folder tersebut:
```bash
mkdir uploads
```

## Jika Masih Tidak Berfungsi

Lakukan ini dan kirim hasilnya ke saya:

1. **Screenshot Console** (F12 → Console tab)
2. **Screenshot Network Tab** (F12 → Network tab, filter: XHR)
3. **Copy paste semua text dari console**
4. **Beritahu saya apa yang muncul di layar**

## Status Token
- Token terpakai: ~52.500 / 200.000 (26.25%)
- Token tersisa: ~147.500 (73.75%)
- Masih banyak token tersisa untuk debugging lebih lanjut!

## Perbedaan dengan Versi Sebelumnya

### Sebelumnya (SALAH):
- Ada 2 script yang handle upload (inline + app.js)
- Konflik event listener
- Timing issue

### Sekarang (BENAR):
- Hanya 1 script yang handle upload (app.js)
- Event listener dipasang di DOMContentLoaded
- Logging sangat detail untuk debugging
- Tidak ada konflik

## Kesimpulan

Sekarang upload file seharusnya berfungsi dengan baik. Jika masih ada masalah, console.log akan memberikan informasi yang sangat detail tentang apa yang salah.

**Silakan test dan beritahu saya hasilnya!**
