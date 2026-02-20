# 🐛 Bugfix: Input Nilai Siswa

## Masalah yang Ditemukan

### 1. ❌ Semester Default Salah
**Masalah:** Saat membuka halaman input nilai, semester yang aktif adalah Semester 6, bukan Semester 1.

**Dampak:** Siswa bingung karena seharusnya mulai dari Semester 1.

**Penyebab:** 
```javascript
let currentSemester = 6; // Default semester 6
```

**Solusi:** Ubah default ke Semester 1
```javascript
let currentSemester = 1; // Start with semester 1
```

---

### 2. ❌ Input Semester 1 Terisi ke Semua Semester
**Masalah:** Saat input nilai Semester 1, nilai tersebut muncul di semua semester (1-6).

**Penyebab:** Tidak ada indikator visual yang jelas semester mana yang sedang dipilih, dan form tidak di-reset saat ganti semester.

**Solusi:**
1. Tambah indikator semester yang dipilih
2. Reset form saat ganti semester
3. Load nilai yang sudah ada (jika ada)

```javascript
function selectSemester(semester) {
    currentSemester = semester;
    
    // Update button states
    document.querySelectorAll('.semester-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update display
    document.getElementById('currentSemesterDisplay').textContent = semester;
    
    // Clear form
    document.getElementById('gradesForm').reset();
    
    // Load existing grades if any
    loadGrades(semester);
}
```

---

### 3. ❌ Rekomendasi Tidak Muncul
**Masalah:** Setelah input nilai dan klik "Lihat Rekomendasi", tidak ada rekomendasi yang muncul.

**Kemungkinan Penyebab:**
1. Data nilai tidak tersimpan dengan benar
2. Siswa belum punya cukup data nilai
3. Algoritma rekomendasi membutuhkan minimal data tertentu

**Solusi:**
1. Pastikan data tersimpan dengan benar (sudah diperbaiki)
2. Tambah validasi minimal data
3. Tampilkan pesan jika data belum cukup

---

## ✅ Perbaikan yang Dilakukan

### 1. Default Semester ke 1
```javascript
// BEFORE
let currentSemester = 6;

// AFTER
let currentSemester = 1; // Start with semester 1
```

### 2. Indikator Semester yang Jelas
```html
<!-- Tambah indikator visual -->
<div id="semesterInfo" style="margin-top: 10px; padding: 10px; background: #f0f3ff; border-radius: 5px;">
    <strong>Semester yang dipilih: <span id="currentSemesterDisplay">1</span></strong>
</div>
```

### 3. Reset Form Saat Ganti Semester
```javascript
function selectSemester(semester) {
    currentSemester = semester;
    
    // Update button states
    document.querySelectorAll('.semester-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update display
    document.getElementById('currentSemesterDisplay').textContent = semester;
    
    // Clear form - INI PENTING!
    document.getElementById('gradesForm').reset();
    
    // Load existing grades if any
    loadGrades(semester);
}
```

### 4. Load Nilai yang Sudah Ada
```javascript
async function loadGrades(semester) {
    try {
        const response = await fetch(`${API_URL}/students/${studentId}/analysis`, {
            headers: {
                'x-session-id': sessionId
            }
        });
        
        const result = await response.json();
        
        if (result.success && result.student.grades) {
            const semesterGrade = result.student.grades.find(g => g.semester === semester);
            
            if (semesterGrade && semesterGrade.subjects) {
                // Fill form with existing grades
                const form = document.getElementById('gradesForm');
                Object.keys(semesterGrade.subjects).forEach(subject => {
                    const input = form.querySelector(`input[name="${subject}"]`);
                    if (input) {
                        input.value = semesterGrade.subjects[subject];
                    }
                });
                
                showMessage(`Nilai semester ${semester} sudah ada. Anda dapat mengubahnya.`, 'success');
            }
        }
    } catch (error) {
        console.error('Error loading grades:', error);
    }
}
```

### 5. Validasi Input
```javascript
// Check if at least some subjects are filled
if (Object.keys(subjects).length === 0) {
    showMessage('Harap isi minimal satu mata pelajaran', 'error');
    return;
}
```

### 6. Pesan yang Lebih Jelas
```javascript
function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = `status-message ${type}`;
    messageDiv.style.display = 'block';
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}
```

---

## 🧪 Cara Testing

### Test 1: Input Semester 1
1. Login sebagai siswa
2. Klik menu "Input Nilai"
3. **Verifikasi:** Semester 1 harus aktif (biru)
4. **Verifikasi:** Indikator menunjukkan "Semester yang dipilih: 1"
5. Input nilai beberapa mata pelajaran
6. Klik "Simpan Nilai"
7. **Verifikasi:** Muncul pesan sukses

### Test 2: Ganti Semester
1. Setelah input Semester 1, klik "Semester 2"
2. **Verifikasi:** Form harus kosong (tidak ada nilai dari Semester 1)
3. **Verifikasi:** Indikator berubah menjadi "Semester yang dipilih: 2"
4. Input nilai untuk Semester 2
5. Klik "Simpan Nilai"

### Test 3: Edit Nilai yang Sudah Ada
1. Klik "Semester 1" lagi
2. **Verifikasi:** Form terisi dengan nilai yang sudah diinput sebelumnya
3. **Verifikasi:** Muncul pesan "Nilai semester 1 sudah ada. Anda dapat mengubahnya."
4. Ubah beberapa nilai
5. Klik "Simpan Nilai"

### Test 4: Lihat Rekomendasi
1. Setelah input minimal 1 semester
2. Klik "Lihat Rekomendasi"
3. **Verifikasi:** Redirect ke halaman utama
4. **Verifikasi:** Muncul rekomendasi jurusan

---

## 📋 Checklist Perbaikan

- [x] Default semester diubah ke 1
- [x] Tambah indikator semester yang dipilih
- [x] Reset form saat ganti semester
- [x] Load nilai yang sudah ada
- [x] Validasi minimal input
- [x] Pesan error/sukses yang jelas
- [x] Auto-hide pesan setelah 5 detik
- [x] Server di-restart

---

## 🚀 Status

✅ **Perbaikan selesai!**
✅ **Server sudah di-restart**
✅ **Siap untuk testing**

---

## 💡 Tips Penggunaan

1. **Input Nilai Bertahap:**
   - Mulai dari Semester 1
   - Input nilai per semester
   - Tidak perlu input semua mata pelajaran (opsional)

2. **Edit Nilai:**
   - Klik semester yang ingin diedit
   - Nilai yang sudah ada akan muncul
   - Ubah dan simpan

3. **Lihat Rekomendasi:**
   - Minimal input 1 semester
   - Semakin banyak data, semakin akurat rekomendasi
   - Klik "Lihat Rekomendasi" untuk melihat hasil

---

## 🔍 Troubleshooting

### Rekomendasi Masih Tidak Muncul?

**Kemungkinan 1: Belum Ada Data**
- Pastikan sudah input minimal 1 semester
- Pastikan sudah klik "Simpan Nilai"

**Kemungkinan 2: Session Expired**
- Logout dan login ulang
- Input nilai lagi

**Kemungkinan 3: Data Tidak Tersimpan**
- Cek console browser (F12)
- Lihat apakah ada error
- Pastikan server berjalan

**Solusi:**
1. Clear browser cache (Ctrl + Shift + Delete)
2. Logout dan login ulang
3. Input nilai dari Semester 1
4. Klik "Lihat Rekomendasi"

---

**Selamat mencoba! Jika masih ada masalah, silakan tanya! 😊**
