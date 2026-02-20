# Debug Upload File

## Yang Sudah Ditambahkan

Saya sudah tambahkan console.log di banyak tempat untuk debugging:

1. `app.js loaded` - Saat file app.js dimuat
2. `DOMContentLoaded event fired` - Saat DOM siap
3. `Session ID: ...` - Menampilkan session
4. `Upload form found` - Saat form ditemukan
5. `Form submitted!` - Saat form di-submit
6. `File selected: ...` - Nama file yang dipilih
7. `Starting upload...` - Mulai upload
8. `Response status: ...` - Status response dari server
9. `Response data: ...` - Data response dari server

## Cara Debug

### 1. Restart Server
```
Ctrl+C
node web-app/server.js
```

### 2. Buka Browser dengan Console
1. Buka `http://localhost:3000`
2. Tekan **F12** (buka Developer Tools)
3. Klik tab **Console**

### 3. Login sebagai Admin
- Username: `admin`
- Password: `admin123`

### 4. Lihat Console
Di console, Anda harus melihat:
```
app.js loaded
DOMContentLoaded event fired
Session ID: [angka panjang]
User Role: admin
Upload form found, attaching event listener
```

### 5. Pilih File Excel
- Klik "Choose File"
- Pilih file Excel Anda

### 6. Klik "Upload File"

### 7. Lihat Console Lagi
Anda harus melihat:
```
Form submitted!
File selected: [nama file].xlsx
Starting upload...
Response status: 200
Response data: {success: true, ...}
```

## Kemungkinan Masalah

### Jika Tidak Ada "app.js loaded":
- File app.js tidak ter-load
- Cek apakah ada error di console
- Cek path file di index.html

### Jika Tidak Ada "Upload form found":
- Form tidak ditemukan
- Mungkin uploadSection di-hide
- Cek apakah Anda login sebagai admin

### Jika Tidak Ada "Form submitted":
- Event listener tidak terpasang
- Ada error JavaScript sebelumnya
- Cek console untuk error

### Jika Ada Error di Console:
- Screenshot error tersebut
- Beritahu saya error apa yang muncul

## Solusi Cepat

Jika masih tidak berfungsi, coba:

1. **Clear Browser Cache**:
   - Ctrl+Shift+Delete
   - Clear cache
   - Restart browser

2. **Hard Refresh**:
   - Ctrl+F5 atau Ctrl+Shift+R

3. **Cek Folder uploads/**:
   - Pastikan folder `uploads/` ada
   - Jika tidak ada, buat folder tersebut

## Status
- Token terpakai: ~129.000 / 200.000 (64.5%)
- Token tersisa: ~71.000 (35.5%)
