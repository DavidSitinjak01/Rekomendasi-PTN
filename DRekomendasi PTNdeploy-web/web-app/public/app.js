const API_URL = 'http://localhost:3000/api';

console.log('app.js loaded');

let studentsData = [];
let currentStudent = null;
let sessionId = null;
let userRole = null;
let selectedClass = 'all';

// Check authentication on page load
window.addEventListener('DOMContentLoaded', () => {
    console.log('=== DOMContentLoaded event fired ===');
    sessionId = localStorage.getItem('sessionId');
    userRole = localStorage.getItem('role');
    
    console.log('Session ID:', sessionId);
    console.log('User Role:', userRole);
    
    if (!sessionId) {
        console.log('No session, redirecting to login');
        window.location.href = 'login.html';
        return;
    }
    
    // Load school logo
    if (typeof loadSchoolLogo === 'function') {
        loadSchoolLogo('schoolLogoHeader');
    }
    
    // Display user info
    const userRoleSpan = document.getElementById('userRole');
    if (userRoleSpan) {
        if (userRole === 'admin') {
            userRoleSpan.textContent = '👤 Admin';
            console.log('User is admin');
            // Show admin links
            const adminUsersLink = document.getElementById('adminUsersLink');
            if (adminUsersLink) {
                adminUsersLink.style.display = 'inline-block';
            }
            const uploadSimpleLink = document.getElementById('uploadSimpleLink');
            if (uploadSimpleLink) {
                uploadSimpleLink.style.display = 'inline-block';
            }
        } else {
            userRoleSpan.textContent = '👤 Siswa';
            console.log('User is student');
            // Show input grades link for students
            const inputGradesLink = document.getElementById('inputGradesLink');
            if (inputGradesLink) {
                inputGradesLink.style.display = 'inline-block';
            }
        }
    }
    
    // Hide upload section for students
    const uploadSection = document.getElementById('uploadSection');
    if (userRole === 'student' && uploadSection) {
        console.log('Hiding upload section for student');
        uploadSection.style.display = 'none';
        loadStudents(); // Auto-load student's own data
    }
    
    // Setup upload form handler
    setupUploadForm();
});

// Setup upload form handler
function setupUploadForm() {
    const uploadForm = document.getElementById('uploadForm');
    console.log('=== Setting up upload form ===');
    console.log('Upload form element:', uploadForm);
    
    if (!uploadForm) {
        console.warn('Upload form not found in DOM');
        return;
    }
    
    console.log('Attaching submit event listener to form');
    
    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('=== FORM SUBMITTED ===');
        
        const fileInput = document.getElementById('fileInput');
        const file = fileInput ? fileInput.files[0] : null;
        
        console.log('File input element:', fileInput);
        console.log('File selected:', file ? file.name : 'NO FILE');
        
        if (!file) {
            console.error('No file selected');
            showStatus('✗ Pilih file terlebih dahulu', 'error');
            return;
        }
        
        // Check if session exists
        if (!sessionId) {
            console.error('No session ID');
            showStatus('Session expired. Please login again.', 'error');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
            return;
        }
        
        const formData = new FormData();
        formData.append('file', file);
        
        showStatus('⏳ Mengupload file...', 'success');
        console.log('Starting upload to:', `${API_URL}/upload`);
        console.log('Session ID:', sessionId);
        
        try {
            const response = await fetch(`${API_URL}/upload`, {
                method: 'POST',
                headers: {
                    'x-session-id': sessionId
                },
                body: formData
            });
            
            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);
            
            const result = await response.json();
            console.log('Response data:', result);
            
            if (response.status === 401) {
                console.error('Unauthorized - session expired');
                showStatus('Session expired. Please login again.', 'error');
                setTimeout(() => {
                    localStorage.removeItem('sessionId');
                    localStorage.removeItem('role');
                    localStorage.removeItem('studentId');
                    window.location.href = 'login.html';
                }, 1500);
                return;
            }
            
            if (result.success) {
                console.log('Upload successful!');
                showStatus(`✓ ${result.message}. Total siswa: ${result.totalStudents}`, 'success');
                fileInput.value = ''; // Clear file input
                setTimeout(() => {
                    console.log('Reloading page...');
                    window.location.reload();
                }, 2000);
            } else {
                console.error('Upload failed:', result.message);
                showStatus(`✗ ${result.message}`, 'error');
            }
        } catch (error) {
            console.error('=== UPLOAD ERROR ===');
            console.error('Error:', error);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
            showStatus(`✗ Error: ${error.message}`, 'error');
        }
    });
    
    console.log('Event listener attached successfully');
}

// Logout function
function logout() {
    fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: {
            'x-session-id': sessionId
        }
    }).then(() => {
        localStorage.removeItem('sessionId');
        localStorage.removeItem('role');
        localStorage.removeItem('studentId');
        window.location.href = 'login.html';
    });
}

// Helper function to add auth header
function getHeaders() {
    return {
        'x-session-id': sessionId,
        'Content-Type': 'application/json'
    };
}

// Get unique classes from students data
function getUniqueClasses() {
    const classes = [...new Set(studentsData.map(s => s.kelas).filter(k => k && k !== 'null'))];
    return classes.sort();
}

// Populate class filter dropdown
function populateClassFilter() {
    const classFilter = document.getElementById('classFilter');
    const classes = getUniqueClasses();
    
    // Clear existing options except "Semua Kelas"
    classFilter.innerHTML = '<option value="all">Semua Kelas</option>';
    
    // Add class options
    classes.forEach(className => {
        const option = document.createElement('option');
        option.value = className;
        option.textContent = className;
        classFilter.appendChild(option);
    });
}

// Filter students by class
function filterByClass() {
    const classFilter = document.getElementById('classFilter');
    selectedClass = classFilter.value;
    
    let filtered = studentsData;
    
    if (selectedClass !== 'all') {
        filtered = studentsData.filter(s => s.kelas === selectedClass);
    }
    
    displayStudents(filtered);
    updateClassStats(filtered);
}

// Update class statistics
function updateClassStats(students) {
    const statsSpan = document.getElementById('classStats');
    
    if (students.length === 0) {
        statsSpan.textContent = '';
        return;
    }
    
    // Calculate average
    let totalAvg = 0;
    let count = 0;
    
    students.forEach(student => {
        const subjects = Object.values(student.subjects);
        if (subjects.length > 0) {
            const avg = subjects.reduce((a, b) => a + b, 0) / subjects.length;
            totalAvg += avg;
            count++;
        }
    });
    
    const classAvg = count > 0 ? (totalAvg / count).toFixed(2) : 0;
    
    statsSpan.textContent = `📊 ${students.length} siswa | Rata-rata kelas: ${classAvg}`;
}

// Upload Form Handler
// NOTE: This is now handled in setupUploadForm() function called from DOMContentLoaded

// Load Students List
async function loadStudents() {
    try {
        const response = await fetch(`${API_URL}/students`, {
            headers: getHeaders()
        });
        const result = await response.json();
        
        if (result.success) {
            studentsData = result.students;
            populateClassFilter();
            displayStudents(studentsData);
            updateClassStats(studentsData);
            
            document.getElementById('uploadSection').style.display = 'none';
            document.getElementById('studentsSection').style.display = 'block';
        }
    } catch (error) {
        console.error('Error loading students:', error);
    }
}

// Display Students
function displayStudents(students) {
    const container = document.getElementById('studentsList');
    
    if (students.length === 0) {
        container.innerHTML = '<p>Tidak ada data siswa</p>';
        return;
    }
    
    container.innerHTML = students.map(student => {
        const gradesCount = student.grades ? student.grades.length : 0;
        const latestGrade = student.grades && student.grades.length > 0 ? 
            student.grades[student.grades.length - 1] : null;
        const subjectsCount = latestGrade ? Object.keys(latestGrade.subjects).length : 0;
        
        return `
            <div class="student-card" onclick="viewStudent('${student.id}')">
                <h3>${student.nama}</h3>
                <p>NISN: ${student.nisn || '-'}</p>
                <p>Kelas: ${student.kelas || '-'}</p>
                <p>Semester Tercatat: ${gradesCount}</p>
                <p>Mata Pelajaran: ${subjectsCount}</p>
            </div>
        `;
    }).join('');
}

// Search Students
document.getElementById('searchInput')?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    let filtered = studentsData;
    
    // Apply class filter first
    if (selectedClass !== 'all') {
        filtered = filtered.filter(s => s.kelas === selectedClass);
    }
    
    // Then apply search
    filtered = filtered.filter(student => 
        student.nama.toLowerCase().includes(searchTerm)
    );
    
    displayStudents(filtered);
    updateClassStats(filtered);
});

// View Student Detail
async function viewStudent(studentId) {
    try {
        // Load detailed analysis
        const analysisResponse = await fetch(`${API_URL}/students/${studentId}/detailed-analysis`, {
            headers: getHeaders()
        });
        const analysisResult = await analysisResponse.json();
        
        // Load recommendations
        const recResponse = await fetch(`${API_URL}/students/${studentId}/recommendations`, {
            headers: getHeaders()
        });
        const recResult = await recResponse.json();
        
        if (analysisResult.success && recResult.success) {
            currentStudent = analysisResult.student;
            displayStudentDetail(analysisResult.student, analysisResult.analysis, analysisResult.topSubjects, analysisResult.bottomSubjects);
            displayRecommendations(recResult.recommendations);
            
            document.getElementById('studentsSection').style.display = 'none';
            document.getElementById('detailSection').style.display = 'block';
        }
    } catch (error) {
        console.error('Error loading student detail:', error);
    }
}

// Display Student Detail
function displayStudentDetail(student, analysis, topSubjects, bottomSubjects) {
    const infoContainer = document.getElementById('studentInfo');
    const analysisContainer = document.getElementById('analysisResult');
    
    infoContainer.innerHTML = `
        <h3>${student.nama}</h3>
        <p><strong>NISN:</strong> ${student.nisn || '-'}</p>
        <p><strong>Kelas:</strong> ${student.kelas || '-'}</p>
    `;
    
    // Build top subjects HTML
    let topSubjectsHTML = '';
    if (topSubjects && topSubjects.length > 0) {
        topSubjectsHTML = `
            <div style="margin-top: 20px; padding: 15px; background: #f0fff4; border-radius: 10px;">
                <h4 style="color: #10b981; margin-bottom: 10px;">📈 Mata Pelajaran Terbaik</h4>
                ${topSubjects.map((sub, idx) => `
                    <p style="margin: 8px 0;">
                        <strong>${idx + 1}. ${sub.name}:</strong> ${sub.score}
                        <span style="color: #10b981; margin-left: 10px;">✓ Excellent</span>
                    </p>
                `).join('')}
            </div>
        `;
    }
    
    // Build bottom subjects HTML
    let bottomSubjectsHTML = '';
    if (bottomSubjects && bottomSubjects.length > 0) {
        bottomSubjectsHTML = `
            <div style="margin-top: 15px; padding: 15px; background: #fef3c7; border-radius: 10px;">
                <h4 style="color: #d97706; margin-bottom: 10px;">📉 Mata Pelajaran yang Perlu Ditingkatkan</h4>
                ${bottomSubjects.map((sub, idx) => `
                    <p style="margin: 8px 0;">
                        <strong>${idx + 1}. ${sub.name}:</strong> ${sub.score}
                        <span style="color: #d97706; margin-left: 10px;">⚠ Perlu peningkatan</span>
                    </p>
                `).join('')}
            </div>
        `;
    }
    
    analysisContainer.innerHTML = `
        <div class="analysis-grid">
            <div class="stat-box">
                <h3>${analysis.average}</h3>
                <p>Rata-rata Nilai</p>
            </div>
            <div class="stat-box">
                <h3>${analysis.semesterProgress ? analysis.semesterProgress.length : 0}</h3>
                <p>Semester Tercatat</p>
            </div>
        </div>
        
        ${topSubjectsHTML}
        ${bottomSubjectsHTML}
        
        <h3 style="margin-top: 30px; color: #667eea;">Nilai Per Mata Pelajaran</h3>
        <table class="subjects-table">
            <thead>
                <tr>
                    <th>Mata Pelajaran</th>
                    <th>Nilai</th>
                </tr>
            </thead>
            <tbody>
                ${Object.entries(analysis.subjectScores)
                    .sort((a, b) => b[1] - a[1])
                    .map(([subject, score]) => `
                        <tr>
                            <td>${subject}</td>
                            <td><strong>${score}</strong></td>
                        </tr>
                    `).join('')}
            </tbody>
        </table>
    `;
}

// Display Recommendations
function displayRecommendations(recommendations) {
    const container = document.getElementById('recommendationsList');
    
    if (recommendations.length === 0) {
        container.innerHTML = '<p>Tidak ada rekomendasi yang sesuai. Tingkatkan nilai untuk mendapatkan rekomendasi.</p>';
        return;
    }
    
    container.innerHTML = recommendations.map((rec, index) => {
        const majorName = rec.major || rec.name;
        
        // Build reasons HTML
        let reasonsHTML = '';
        if (rec.reasons && rec.reasons.length > 0) {
            reasonsHTML = '<div class="recommendation-reasons"><h4>Alasan Rekomendasi:</h4><ul>';
            rec.reasons.forEach(reason => {
                reasonsHTML += `<li class="reason-${reason.type}">
                    <span class="reason-icon">${reason.icon}</span>
                    <span class="reason-text">${reason.message}</span>
                </li>`;
            });
            reasonsHTML += '</ul></div>';
        }
        
        // Build career prospects HTML
        let careerHTML = '';
        if (rec.careerProspects && rec.careerProspects.length > 0) {
            careerHTML = `<p><strong>Prospek Karir:</strong> ${rec.careerProspects.join(', ')}</p>`;
        }
        
        // Build description HTML
        let descHTML = '';
        if (rec.description) {
            descHTML = `<p class="major-description">${rec.description}</p>`;
        }
        
        return `
            <div class="recommendation-card">
                <div class="rec-header">
                    <h3>${index + 1}. ${majorName}</h3>
                    <span class="match-score ${rec.matchScore >= 85 ? 'high' : rec.matchScore >= 70 ? 'medium' : 'low'}">
                        Match: ${rec.matchScore}%
                    </span>
                </div>
                <p class="university">${rec.university}</p>
                ${descHTML}
                <div class="details">
                    <p><strong>Kategori:</strong> ${rec.category}</p>
                    <p><strong>Passing Grade:</strong> ${rec.passingGrade}</p>
                    ${careerHTML}
                </div>
                ${reasonsHTML}
            </div>
        `;
    }).join('');
}

// Back to List
function backToList() {
    document.getElementById('detailSection').style.display = 'none';
    document.getElementById('studentsSection').style.display = 'block';
}

// Download PDF
function downloadPDF() {
    if (!currentStudent) return;
    
    const studentId = currentStudent.id;
    window.open(`${API_URL}/students/${studentId}/download-pdf?session=${sessionId}`, '_blank');
}

// Show Status Message
function showStatus(message, type) {
    console.log(`Status [${type}]:`, message);
    const statusDiv = document.getElementById('uploadStatus');
    if (statusDiv) {
        statusDiv.textContent = message;
        statusDiv.className = `status-message ${type}`;
        statusDiv.style.display = 'block';
    } else {
        console.warn('uploadStatus element not found');
        // Fallback to alert if status div not found
        if (type === 'error') {
            alert(message);
        }
    }
}
