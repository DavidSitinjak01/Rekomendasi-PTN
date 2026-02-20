// Simple in-memory database (can be replaced with SQLite or other DB)
class Database {
  constructor() {
    this.students = new Map();
    this.grades = new Map();
  }

  // Student operations
  saveStudent(studentData) {
    const id = studentData.id || Date.now().toString();
    this.students.set(id, {
      id,
      nama: studentData.nama,
      nisn: studentData.nisn,
      kelas: studentData.kelas,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return id;
  }

  getStudent(id) {
    return this.students.get(id);
  }

  getStudentByNISN(nisn) {
    for (const [id, student] of this.students.entries()) {
      if (student.nisn === nisn) {
        return { ...student, id };
      }
    }
    return null;
  }

  getAllStudents() {
    return Array.from(this.students.values());
  }

  updateStudent(id, data) {
    const student = this.students.get(id);
    if (student) {
      this.students.set(id, {
        ...student,
        ...data,
        updatedAt: new Date()
      });
      return true;
    }
    return false;
  }

  deleteStudent(id) {
    return this.students.delete(id);
  }

  // Grades operations
  saveGrades(studentId, semester, subjects) {
    const key = `${studentId}_${semester}`;
    this.grades.set(key, {
      studentId,
      semester,
      subjects,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  getGrades(studentId, semester) {
    const key = `${studentId}_${semester}`;
    return this.grades.get(key);
  }

  getAllGradesForStudent(studentId) {
    const studentGrades = [];
    for (const [key, grade] of this.grades.entries()) {
      if (grade.studentId === studentId) {
        studentGrades.push(grade);
      }
    }
    return studentGrades.sort((a, b) => a.semester - b.semester);
  }

  updateGrades(studentId, semester, subjects) {
    const key = `${studentId}_${semester}`;
    const existing = this.grades.get(key);
    if (existing) {
      this.grades.set(key, {
        ...existing,
        subjects,
        updatedAt: new Date()
      });
      return true;
    }
    return false;
  }

  // Bulk import from Excel
  importFromExcel(data) {
    const imported = [];
    data.forEach((row, index) => {
      if (!row.NAMA || row.NAMA === 'null') return;
      
      const studentId = this.saveStudent({
        id: index.toString(),
        nama: row.NAMA,
        nisn: row.NISN,
        kelas: row.Kelas
      });

      // Extract subjects
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

      // Save as semester 6 (final semester)
      this.saveGrades(studentId, 6, subjects);
      
      imported.push({ studentId, nama: row.NAMA });
    });
    
    return imported;
  }

  // Get student with all grades
  getStudentWithGrades(studentId) {
    const student = this.getStudent(studentId);
    if (!student) return null;

    const grades = this.getAllGradesForStudent(studentId);
    return {
      ...student,
      grades
    };
  }
}

module.exports = new Database();
