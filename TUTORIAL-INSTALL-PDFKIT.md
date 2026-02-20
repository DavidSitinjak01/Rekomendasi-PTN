# 📦 Tutorial Install PDFKit

## Cara 1: Install Menggunakan PowerShell (Recommended)

### Langkah 1: Buka PowerShell sebagai Administrator
1. Tekan tombol **Windows**
2. Ketik **"PowerShell"**
3. Klik kanan pada **"Windows PowerShell"**
4. Pilih **"Run as administrator"**

### Langkah 2: Ubah Execution Policy (Jika Diperlukan)
Jika muncul error "running scripts is disabled", jalankan:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Ketik **Y** dan tekan **Enter**

### Langkah 3: Masuk ke Folder Project
```powershell
cd "D:\Rekomendasi PTN"
```

### Langkah 4: Install PDFKit
```powershell
npm install pdfkit
```

Tunggu sampai selesai (biasanya 10-30 detik)

### Langkah 5: Jalankan Server
```powershell
node web-app/server.js
```

---

## Cara 2: Install Menggunakan CMD

### Langkah 1: Buka Command Prompt
1. Tekan **Windows + R**
2. Ketik **"cmd"**
3. Tekan **Enter**

### Langkah 2: Masuk ke Folder Project
```cmd
cd D:\Rekomendasi PTN
```

### Langkah 3: Install PDFKit
```cmd
npm install pdfkit
```

### Langkah 4: Jalankan Server
```cmd
node web-app/server.js
```

---

## Cara 3: Install Menggunakan VS Code Terminal

### Langkah 1: Buka VS Code
Buka folder project di VS Code

### Langkah 2: Buka Terminal
- Tekan **Ctrl + `** (backtick)
- Atau menu: **Terminal → New Terminal**

### Langkah 3: Install PDFKit
```bash
npm install pdfkit
```

### Langkah 4: Jalankan Server
```bash
node web-app/server.js
```

---

## ✅ Verifikasi Instalasi Berhasil

Setelah install, cek file `package.json`. Seharusnya ada:
```json
"dependencies": {
  "pdfkit": "^0.15.0",
  ...
}
```

Dan folder `node_modules/pdfkit` sudah ada.

---

## 🚀 Test Fitur PDF

1. Buka browser: `http://localhost:3000`
2. **Anda akan otomatis diarahkan ke halaman login** (ini normal!)
3. Login sebagai admin:
   - Username: `admin`
   - Password: `admin123`
4. Atau login sebagai siswa (gunakan nama lengkap dan NISN)
5. Setelah login, klik nama siswa untuk lihat detail
6. Klik tombol **"📥 Download PDF"**
7. PDF akan otomatis terdownload

---

## ⚠️ Troubleshooting

### Error: "npm is not recognized"
**Solusi:** Install Node.js dari https://nodejs.org/

### Error: "Cannot find module 'pdfkit'"
**Solusi:** 
```bash
npm install pdfkit --save
```

### Error: "EACCES: permission denied"
**Solusi:** Jalankan sebagai Administrator

### Error: "running scripts is disabled"
**Solusi:** 
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 📝 Catatan

- PDFKit akan mendownload beberapa dependencies (canvas, fontkit, dll)
- Total size sekitar 5-10 MB
- Instalasi membutuhkan koneksi internet
- Setelah install, tidak perlu install lagi

---

**Selamat! PDFKit sudah siap digunakan! 🎉**
