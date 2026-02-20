// Common functions used across all pages
const API_URL = 'http://localhost:3000/api';

// Global logout function
function logout() {
    const sessionId = localStorage.getItem('sessionId');
    
    if (sessionId) {
        fetch(`${API_URL}/logout`, {
            method: 'POST',
            headers: {
                'x-session-id': sessionId
            }
        }).then(() => {
            clearSessionAndRedirect();
        }).catch(() => {
            // Even if fetch fails, still logout locally
            clearSessionAndRedirect();
        });
    } else {
        clearSessionAndRedirect();
    }
}

function clearSessionAndRedirect() {
    localStorage.removeItem('sessionId');
    localStorage.removeItem('role');
    localStorage.removeItem('studentId');
    window.location.href = 'login.html';
}

// Check authentication
function checkAuth() {
    const sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Get auth headers
function getAuthHeaders() {
    return {
        'x-session-id': localStorage.getItem('sessionId'),
        'Content-Type': 'application/json'
    };
}

// Load school logo
function loadSchoolLogo(elementId) {
    const savedLogo = localStorage.getItem('schoolLogo');
    const element = document.getElementById(elementId);
    
    if (savedLogo && element) {
        element.innerHTML = `<img src="${savedLogo}" alt="Logo Sekolah" style="width: 50px; height: 50px; border-radius: 8px; object-fit: cover;">`;
    }
}
