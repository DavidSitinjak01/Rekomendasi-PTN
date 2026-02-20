const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto');
const PDFDocument = require('pdfkit');
const ExcelReader = require('../src/ExcelReader');
const Dataset = require('../src/Dataset');
const StatisticalCalculator = require('../src/StatisticalCalculator');
const db = require('./database');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/data', express.static(path.join(__dirname, 'data')));

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Store uploaded data in memory
let currentDataset = null;

// Session storage (in production, use proper session management)
const sessions = new Map();

// Password hashing utility
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Admin credentials (password is hashed)
const ADMIN_USERNAME = 'admin';
let ADMIN_PASSWORD_HASH = hashPassword('admin123'); // Initial password: admin123

// Middleware to check authentication
function requireAuth(req, res, next) {
  const sessionId = req.headers['x-session-id'];
  
  if (!sessionId || !sessions.has(sessionId)) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized. Please login first.'
    });
  }
  
  req.session = sessions.get(sessionId);
  next();
}

// Middleware to check admin role
function requireAdmin(req, res, next) {
  if (req.session.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Forbidden. Admin access required.'
    });
  }
  next();
}

// API Routes

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  // Check admin login (compare hashed password)
  if (username === ADMIN_USERNAME && hashPassword(password) === ADMIN_PASSWORD_HASH) {
    const sessionId = Date.now().toString() + Math.random().toString(36);
    sessions.set(sessionId, {
      role: 'admin',
      username: username
    });
    
    return res.json({
      success: true,
      sessionId: sessionId,
      role: 'admin',
      message: 'Login berhasil sebagai Admin'
    });
  }
  
  // Check student login
  const student = db.getStudentByNISN(password);
  
  if (student && student.nama.toLowerCase() === username.toLowerCase()) {
    const sessionId = Date.now().toString() + Math.random().toString(36);
    sessions.set(sessionId, {
      role: 'student',
      username: student.nama,
      studentId: student.id
    });
    
    return res.json({
      success: true,
      sessionId: sessionId,
      role: 'student',
      studentId: student.id,
      message: `Login berhasil. Selamat datang ${student.nama}!`
    });
  }
  
  res.status(401).json({
    success: false,
    message: 'Username atau password salah'
  });
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
  const sessionId = req.headers['x-session-id'];
  if (sessionId) {
    sessions.delete(sessionId);
  }
  res.json({ success: true, message: 'Logout berhasil' });
});

// Change admin password endpoint
app.post('/api/admin/change-password', requireAuth, requireAdmin, (req, res) => {
  const { oldPassword, newPassword } = req.body;
  
  // Validate old password
  if (hashPassword(oldPassword) !== ADMIN_PASSWORD_HASH) {
    return res.status(400).json({
      success: false,
      message: 'Password lama salah'
    });
  }
  
  // Validate new password length
  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password baru minimal 6 karakter'
    });
  }
  
  // Update password
  ADMIN_PASSWORD_HASH = hashPassword(newPassword);
  
  // Clear admin session to force re-login
  const sessionId = req.headers['x-session-id'];
  if (sessionId) {
    sessions.delete(sessionId);
  }
  
  res.json({
    success: true,
    message: 'Password berhasil diubah. Silakan login kembali.'
  });
});

// Upload Excel file
app.post('/api/upload', requireAuth, requireAdmin, upload.single('file'), (req, res) => {
  try {
    const filePath = req.file.path;
    
    // Read Excel file
    const workbookObj = ExcelReader.readFile(filePath);
    const sheets = ExcelReader.getWorksheets(workbookObj);
    const data = ExcelReader.readWorksheet(workbookObj, sheets[0]);
    const columnTypes = ExcelReader.detectColumnTypes(data);
    
    currentDataset = new Dataset(data, {
      columnTypes,
      sourceFile: req.file.originalname,
      sourceWorksheet: sheets[0]
    });
    
    // Import to database
    const imported = db.importFromExcel(data);
    
    res.json({
      success: true,
      message: 'File berhasil diupload dan data tersimpan',
      totalStudents: imported.length,
      columns: currentDataset.getColumnNames()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get all students (admin only)
app.get('/api/students', requireAuth, (req, res) => {
  // If student role, only return their own data
  if (req.session.role === 'student') {
    const student = db.getStudentWithGrades(req.session.studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Data siswa tidak ditemukan'
      });
    }
    return res.json({
      success: true,
      students: [student]
    });
  }
  
  // Admin can see all students
  const students = db.getAllStudents().map(s => db.getStudentWithGrades(s.id));
  
  if (!students.length) {
    return res.status(404).json({
      success: false,
      message: 'Belum ada data. Silakan upload file terlebih dahulu.'
    });
  }
  
  res.json({
    success: true,
    students: students
  });
});

// Admin: Get all students for management
app.get('/api/admin/students', requireAuth, requireAdmin, (req, res) => {
  const students = db.getAllStudents();
  res.json({
    success: true,
    students: students
  });
});

// Admin: Add new student
app.post('/api/admin/students', requireAuth, requireAdmin, (req, res) => {
  try {
    const { nama, nisn, kelas } = req.body;
    
    // Check if NISN already exists (if provided)
    if (nisn) {
      const existing = db.getStudentByNISN(nisn);
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'NISN sudah terdaftar'
        });
      }
    }
    
    const studentId = db.saveStudent({ nama, nisn: nisn || '', kelas });
    
    res.json({
      success: true,
      message: 'Siswa berhasil ditambahkan',
      studentId
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Admin: Update student
app.put('/api/admin/students/:id', requireAuth, requireAdmin, (req, res) => {
  try {
    const studentId = req.params.id;
    const { nama, nisn, kelas } = req.body;
    
    // Check if student exists
    const student = db.getStudent(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Siswa tidak ditemukan'
      });
    }
    
    // Check if new NISN conflicts with another student
    if (nisn && nisn !== student.nisn) {
      const existing = db.getStudentByNISN(nisn);
      if (existing && existing.id !== studentId) {
        return res.status(400).json({
          success: false,
          message: 'NISN sudah digunakan oleh siswa lain'
        });
      }
    }
    
    const updated = db.updateStudent(studentId, { nama, nisn, kelas });
    
    if (updated) {
      res.json({
        success: true,
        message: 'Data siswa berhasil diupdate'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Gagal mengupdate data siswa'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Admin: Delete student
app.delete('/api/admin/students/:id', requireAuth, requireAdmin, (req, res) => {
  try {
    const studentId = req.params.id;
    
    const deleted = db.deleteStudent(studentId);
    
    if (deleted) {
      res.json({
        success: true,
        message: 'Siswa berhasil dihapus'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Siswa tidak ditemukan'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Student self-registration
app.post('/api/register', (req, res) => {
  try {
    const { nama, nisn, kelas } = req.body;
    
    // Check if NISN already exists
    const existing = db.getStudentByNISN(nisn);
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'NISN sudah terdaftar'
      });
    }
    
    const studentId = db.saveStudent({ nama, nisn, kelas });
    
    res.json({
      success: true,
      message: 'Registrasi berhasil! Silakan login dengan nama dan NISN Anda.',
      studentId
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Student input grades
app.post('/api/students/:id/grades', requireAuth, (req, res) => {
  try {
    const studentId = req.params.id;
    const { semester, subjects } = req.body;
    
    // Check if student is updating their own data
    if (req.session.role === 'student' && req.session.studentId !== studentId) {
      return res.status(403).json({
        success: false,
        message: 'Anda hanya bisa mengupdate data Anda sendiri'
      });
    }
    
    // Validate semester (1-6)
    if (semester < 1 || semester > 6) {
      return res.status(400).json({
        success: false,
        message: 'Semester harus antara 1-6'
      });
    }
    
    // Save or update grades
    const existing = db.getGrades(studentId, semester);
    if (existing) {
      db.updateGrades(studentId, semester, subjects);
    } else {
      db.saveGrades(studentId, semester, subjects);
    }
    
    res.json({
      success: true,
      message: `Nilai semester ${semester} berhasil disimpan`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get student analysis by ID
app.get('/api/students/:id/analysis', requireAuth, (req, res) => {
  const studentId = req.params.id;
  
  // Check if student is accessing their own data (admin can access any student)
  if (req.session.role === 'student' && req.session.studentId !== studentId) {
    return res.status(403).json({
      success: false,
      message: 'Anda hanya bisa melihat data Anda sendiri'
    });
  }
  
  const student = db.getStudentWithGrades(studentId);
  
  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'Siswa tidak ditemukan'
    });
  }
  
  const analysis = analyzeStudent(student);
  
  res.json({
    success: true,
    student: student,
    analysis: analysis
  });
});

// Get recommendations for student
app.get('/api/students/:id/recommendations', requireAuth, (req, res) => {
  const studentId = req.params.id;
  
  // Check if student is accessing their own data (admin can access any student)
  if (req.session.role === 'student' && req.session.studentId !== studentId) {
    return res.status(403).json({
      success: false,
      message: 'Anda hanya bisa melihat data Anda sendiri'
    });
  }
  
  const student = db.getStudentWithGrades(studentId);
  
  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'Siswa tidak ditemukan'
    });
  }
  
  const recommendations = getRecommendations(student);
  
  res.json({
    success: true,
    recommendations: recommendations
  });
});

// Download PDF report
app.get('/api/students/:id/download-pdf', requireAuth, (req, res) => {
  const studentId = req.params.id;
  
  // Check if student is accessing their own data (admin can access any student)
  if (req.session.role === 'student' && req.session.studentId !== studentId) {
    return res.status(403).json({
      success: false,
      message: 'Anda hanya bisa mendownload data Anda sendiri'
    });
  }
  
  const student = db.getStudentWithGrades(studentId);
  
  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'Siswa tidak ditemukan'
    });
  }
  
  const analysis = analyzeStudent(student);
  const recommendations = getRecommendations(student);
  
  // Create PDF
  const doc = new PDFDocument({ margin: 50 });
  
  // Set response headers
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Rekomendasi_${student.nama.replace(/ /g, '_')}.pdf`);
  
  // Pipe PDF to response
  doc.pipe(res);
  
  // Add content to PDF
  doc.fontSize(20).text('LAPORAN REKOMENDASI JURUSAN PTN', { align: 'center' });
  doc.moveDown();
  
  // Student Info
  doc.fontSize(14).text('Informasi Siswa', { underline: true });
  doc.fontSize(12);
  doc.text(`Nama: ${student.nama}`);
  doc.text(`NISN: ${student.nisn}`);
  doc.text(`Kelas: ${student.kelas}`);
  doc.moveDown();
  
  // Semester Progress
  if (analysis.semesterProgress && analysis.semesterProgress.length > 0) {
    doc.fontSize(14).text('Perkembangan Nilai Per Semester', { underline: true });
    doc.fontSize(12);
    analysis.semesterProgress.forEach(sem => {
      doc.text(`Semester ${sem.semester}: Rata-rata ${sem.average.toFixed(2)}`);
    });
    doc.moveDown();
  }
  
  // Current Performance
  doc.fontSize(14).text('Analisis Nilai Terkini', { underline: true });
  doc.fontSize(12);
  doc.text(`Rata-rata Keseluruhan: ${analysis.average}`);
  if (analysis.highest) {
    doc.text(`Mata Pelajaran Terbaik: ${analysis.highest.subject} (${analysis.highest.value})`);
  }
  if (analysis.lowest) {
    doc.text(`Perlu Ditingkatkan: ${analysis.lowest.subject} (${analysis.lowest.value})`);
  }
  doc.moveDown();
  
  // Recommendations
  doc.fontSize(14).text('Rekomendasi Jurusan PTN', { underline: true });
  doc.fontSize(12);
  
  recommendations.slice(0, 5).forEach((rec, index) => {
    doc.moveDown();
    doc.fontSize(13).text(`${index + 1}. ${rec.major}`, { bold: true });
    doc.fontSize(11);
    doc.text(`   Universitas: ${rec.university}`);
    doc.text(`   Match Score: ${rec.matchScore}%`);
    doc.text(`   Passing Grade: ${rec.passingGrade}`);
    
    if (rec.reasons && rec.reasons.length > 0) {
      doc.text('   Alasan:');
      rec.reasons.slice(0, 3).forEach(reason => {
        doc.text(`   ${reason.icon} ${reason.message}`, { indent: 20 });
      });
    }
  });
  
  // Footer
  doc.moveDown(2);
  doc.fontSize(10).text(`Dibuat pada: ${new Date().toLocaleDateString('id-ID')}`, { align: 'center' });
  doc.text('Sistem Rekomendasi Jurusan PTN', { align: 'center' });
  
  // Finalize PDF
  doc.end();
});

// Get all PTN
app.get('/api/ptn', requireAuth, (req, res) => {
  try {
    const ptnList = require('./data/ptn-list.json');
    const region = req.query.region;
    
    let filtered = ptnList;
    if (region && region !== 'all') {
      filtered = ptnList.filter(ptn => ptn.region === region);
    }
    
    res.json({
      success: true,
      data: filtered,
      total: filtered.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get all majors
app.get('/api/majors', requireAuth, (req, res) => {
  try {
    let majors;
    try {
      majors = require('./data/ptn-majors-extended.json');
    } catch (e) {
      majors = require('./data/ptn-majors.json');
    }
    
    const university = req.query.university;
    const category = req.query.category;
    
    let filtered = majors;
    if (university) {
      filtered = filtered.filter(m => m.university.includes(university));
    }
    if (category && category !== 'all') {
      filtered = filtered.filter(m => m.category === category);
    }
    
    res.json({
      success: true,
      data: filtered,
      total: filtered.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get all subjects
app.get('/api/subjects', requireAuth, (req, res) => {
  try {
    const subjects = require('./data/subjects.json');
    const category = req.query.category;
    
    let filtered = subjects;
    if (category && category !== 'all') {
      filtered = subjects.filter(s => s.category === category);
    }
    
    res.json({
      success: true,
      data: filtered,
      total: filtered.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get detailed analysis with top/bottom subjects
app.get('/api/students/:id/detailed-analysis', requireAuth, (req, res) => {
  const studentId = req.params.id;
  
  // Check if student is accessing their own data
  if (req.session.role === 'student' && req.session.studentId !== studentId) {
    return res.status(403).json({
      success: false,
      message: 'Anda hanya bisa melihat data Anda sendiri'
    });
  }
  
  const student = db.getStudentWithGrades(studentId);
  
  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'Siswa tidak ditemukan'
    });
  }
  
  const analysis = analyzeStudent(student);
  const subjectScores = Object.entries(analysis.subjectScores)
    .map(([name, score]) => ({ name, score }))
    .sort((a, b) => b.score - a.score);
  
  const topSubjects = subjectScores.slice(0, 3);
  const bottomSubjects = subjectScores.slice(-2);
  
  res.json({
    success: true,
    student: student,
    analysis: analysis,
    topSubjects: topSubjects,
    bottomSubjects: bottomSubjects
  });
});

// Helper Functions

function processStudentData(data) {
  const students = [];
  
  data.forEach((row, index) => {
    if (!row.NAMA || row.NAMA === 'null') return;
    
    const student = {
      id: index,
      nama: row.NAMA,
      nisn: row.NISN,
      kelas: row.Kelas,
      subjects: extractSubjects(row)
    };
    
    students.push(student);
  });
  
  return students;
}

function extractSubjects(row) {
  const subjects = {};
  const subjectNames = [
    'Pendidikan Pancasila',
    'Bahasa Indonesia',
    'Bahasa Inggris',
    'Matematika (Umum)',
    'Pendidikan Jasmani, Olahraga, dan Kesehatan',
    'Informatika',
    'Biologi',
    'Fisika',
    'Kimia',
    'Geografi',
    'Sosiologi',
    'Ekonomi',
    'Sejarah'
  ];
  
  subjectNames.forEach(subject => {
    if (row[subject]) {
      const value = parseFloat(row[subject]);
      if (!isNaN(value)) {
        subjects[subject] = value;
      }
    }
  });
  
  return subjects;
}

function analyzeStudent(student) {
  // Get latest semester grades
  const grades = student.grades || [];
  if (grades.length === 0) {
    return {
      average: 0,
      highest: null,
      lowest: null,
      subjectScores: {},
      semesterProgress: []
    };
  }
  
  // Get the latest semester
  const latestGrade = grades[grades.length - 1];
  const subjects = latestGrade.subjects;
  const subjectNames = Object.keys(subjects);
  
  if (subjectNames.length === 0) {
    return {
      average: 0,
      highest: null,
      lowest: null,
      subjectScores: {},
      semesterProgress: []
    };
  }
  
  const values = Object.values(subjects);
  const average = values.reduce((a, b) => a + b, 0) / values.length;
  
  let highest = { subject: subjectNames[0], value: values[0] };
  let lowest = { subject: subjectNames[0], value: values[0] };
  
  subjectNames.forEach((subject, index) => {
    if (values[index] > highest.value) {
      highest = { subject, value: values[index] };
    }
    if (values[index] < lowest.value) {
      lowest = { subject, value: values[index] };
    }
  });
  
  // Calculate semester progress
  const semesterProgress = grades.map(grade => ({
    semester: grade.semester,
    average: Object.values(grade.subjects).reduce((a, b) => a + b, 0) / Object.keys(grade.subjects).length,
    subjects: grade.subjects
  }));
  
  return {
    average: Math.round(average * 100) / 100,
    highest,
    lowest,
    subjectScores: subjects,
    semesterProgress
  };
}

function getRecommendations(student) {
  const analysis = analyzeStudent(student);
  const recommendations = [];
  
  // Load PTN majors database - try extended first, fallback to basic
  let ptnMajors;
  try {
    ptnMajors = require('./data/ptn-majors-extended.json');
  } catch (e) {
    ptnMajors = require('./data/ptn-majors.json');
  }
  
  // Calculate match score for each major (no category filtering)
  ptnMajors.forEach(major => {
    const matchScore = calculateMatchScore(analysis, major);
    
    if (matchScore >= 50) { // Lower threshold since no category bonus
      const recommendation = {
        university: major.university,
        major: major.major || major.name,
        category: major.category,
        matchScore: Math.round(matchScore),
        requiredSubjects: major.requiredSubjects,
        passingGrade: major.passingGrade,
        description: major.description,
        careerProspects: major.careerProspects,
        reasons: generateRecommendationReasons(analysis, major, matchScore)
      };
      recommendations.push(recommendation);
    }
  });
  
  // Sort by match score
  recommendations.sort((a, b) => b.matchScore - a.matchScore);
  
  return recommendations.slice(0, 10); // Top 10 recommendations
}

function generateRecommendationReasons(analysis, major, matchScore) {
  const reasons = [];
  
  // Check required subjects
  major.requiredSubjects.forEach(reqSubject => {
    const studentScore = analysis.subjectScores[reqSubject.name];
    if (studentScore) {
      if (studentScore >= reqSubject.minScore) {
        const diff = studentScore - reqSubject.minScore;
        let status = 'Good';
        if (diff >= 10) status = 'Excellent';
        else if (diff >= 5) status = 'Very Good';
        
        reasons.push({
          type: 'subject',
          icon: '✓',
          subject: reqSubject.name,
          score: studentScore,
          required: reqSubject.minScore,
          status: status,
          message: `${reqSubject.name}: ${studentScore} (Min: ${reqSubject.minScore}) - ${status}`,
          reason: reqSubject.reason
        });
      } else {
        reasons.push({
          type: 'subject',
          icon: '⚠',
          subject: reqSubject.name,
          score: studentScore,
          required: reqSubject.minScore,
          status: 'Below Minimum',
          message: `${reqSubject.name}: ${studentScore} (Min: ${reqSubject.minScore}) - Perlu ditingkatkan`,
          reason: reqSubject.reason
        });
      }
    }
  });
  
  // Check overall performance
  if (matchScore >= 90) {
    reasons.push({
      type: 'overall',
      icon: '🌟',
      message: 'Profil Anda sangat cocok untuk jurusan ini!'
    });
  } else if (matchScore >= 80) {
    reasons.push({
      type: 'overall',
      icon: '👍',
      message: 'Profil Anda cocok untuk jurusan ini'
    });
  }
  
  return reasons;
}

function calculateMatchScore(analysis, major) {
  let score = 0;
  let totalWeight = 0;
  
  // Only check required subjects (no category bonus)
  major.requiredSubjects.forEach(reqSubject => {
    const studentScore = analysis.subjectScores[reqSubject.name];
    if (studentScore) {
      const weight = reqSubject.weight || 10;
      const subjectScore = (studentScore / 100) * weight;
      score += subjectScore;
      totalWeight += weight;
    }
  });
  
  // Normalize to 0-100
  return totalWeight > 0 ? (score / totalWeight) * 100 : 0;
}

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server berjalan di http://localhost:${PORT}`);
  console.log(`📊 Sistem Rekomendasi Jurusan PTN`);
  console.log(`\nBuka browser dan akses: http://localhost:${PORT}\n`);
});
