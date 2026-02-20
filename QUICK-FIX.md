# ⚡ Quick Fix - Solusi Cepat

## 🚨 Error "Failed to fetch" atau Tidak Bisa Masuk?

### Lakukan 3 Langkah Ini:

---

## 1️⃣ Clear Browser Storage

### Chrome / Edge:
1. Tekan `F12` (buka Developer Tools)
2. Klik tab **Application**
3. Di sidebar kiri, klik **Local Storage**
4. Klik `http://localhost:3000`
5. Klik kanan → **Clear**
6. Tutup Developer Tools

### Firefox:
1. Tekan `F12`
2. Klik tab **Storage**
3. Klik **Local Storage** → `http://localhost:3000`
4. Klik kanan → **Delete All**
5. Tutup Developer Tools

---

## 2️⃣ Hard Refresh Browser

Tekan: **`Ctrl + Shift + R`**

Atau:
1. Tekan `Ctrl + F5`
2. Atau klik kanan di halaman → **Reload**

---

## 3️⃣ Login Ulang

1. Buka: `http://localhost:3000`
2. Anda akan diarahkan ke halaman login
3. Login dengan:
   - **Username:** `admin`
   - **Password:** `admin123`
4. Setelah login, coba upload lagi

---

## ✅ Sekarang Coba Upload Lagi!

1. Pilih file Excel
2. Klik **Upload File**
3. Tunggu sampai muncul pesan sukses

---

## 🔄 Jika Masih Error

### Restart Server:
1. Buka terminal tempat server berjalan
2. Tekan `Ctrl + C` untuk stop server
3. Jalankan lagi:
   ```bash
   node web-app/server.js
   ```
4. Ulangi langkah 1-3 di atas

---

## 📝 Catatan Penting

**Setiap kali server di-restart:**
- Session akan hilang
- Data siswa akan hilang (in-memory database)
- Anda harus login ulang
- Anda harus upload Excel ulang

**Ini NORMAL!** Database menggunakan RAM, bukan disk.

---

## 🎯 Workflow yang Benar

```
1. Jalankan server
   ↓
2. Buka browser → http://localhost:3000
   ↓
3. Login (admin/admin123)
   ↓
4. Upload Excel
   ↓
5. Lihat data siswa
   ↓
6. Download PDF
```

**JANGAN restart server di tengah-tengah!**

---

## 💡 Tips

- Simpan file Excel sebagai backup
- Jangan tutup terminal server
- Gunakan satu browser saja
- Clear cache jika ada masalah

---

**Server Status:** ✅ Running di http://localhost:3000
**PDFKit:** ✅ Terinstal
**Database:** ✅ In-memory (data hilang saat restart)

**Selamat menggunakan! 🎉**
