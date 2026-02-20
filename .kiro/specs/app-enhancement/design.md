# Design Document: App Enhancement

## Overview

This design document outlines the enhancements to the existing PTN Recommendation web application. The enhancements focus on four key areas:

1. **School Identity Branding**: Adding school name and logo upload functionality
2. **Mobile Responsive Design**: Optimizing the application for Android devices
3. **Application Description**: Adding informative content to the main page
4. **Enhanced Admin Access**: Improving admin capabilities to view detailed student data and generate PDF reports

The existing application is built with:
- **Backend**: Node.js with Express.js
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Database**: In-memory database (database.js)
- **File Upload**: Multer for Excel file handling
- **PDF Generation**: PDFKit for report generation

## Architecture

### System Components

The application follows a client-server architecture with the following components:

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  HTML Pages  │  │  CSS Styles  │  │  JavaScript  │      │
│  │  (Views)     │  │  (Styling)   │  │  (Logic)     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/REST API
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                        Server Layer                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Express.js Server (server.js)           │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐    │   │
│  │  │   Auth     │  │   Upload   │  │    API     │    │   │
│  │  │ Middleware │  │  Handler   │  │  Endpoints │    │   │
│  │  └────────────┘  └────────────┘  └────────────┘    │   │
│  └──────────────────────────────────────────────────────┘   │
│                            │                                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           Database Layer (database.js)               │   │
│  │  ┌────────────┐  ┌────────────┐                     │   │
│  │  │  Students  │  │   Grades   │                     │   │
│  │  │    Map     │  │    Map     │                     │   │
│  │  └────────────┘  └────────────┘                     │   │
│  └──────────────────────────────────────────────────────┘   │
│                            │                                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              File Storage Layer                      │   │
│  │  ┌────────────┐  ┌────────────┐                     │   │
│  │  │   Excel    │  │   School   │                     │   │
│  │  │   Files    │  │    Logo    │                     │   │
│  │  └────────────┘  └────────────┘                     │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Enhancement Integration Points

1. **School Identity**: 
   - New API endpoint for logo upload
   - Database extension to store school settings
   - Header component modification in all HTML pages

2. **Mobile Responsive Design**:
   - CSS media queries in style.css
   - Viewport meta tag adjustments
   - Touch-friendly UI components

3. **Application Description**:
   - Static content addition to index.html
   - CSS styling for description section

4. **Enhanced Admin Access**:
   - Extended API endpoint for detailed student view
   - PDF generation enhancement to include all grades
   - New admin detail view component

## Components and Interfaces

### 1. School Identity Component

#### Backend API

**New Endpoint: Upload School Logo**
```javascript
POST /api/school/logo
Content-Type: multipart/form-data
Authorization: Admin session required

Request:
- file: School logo (JPG/JPEG/PNG, max 5MB)

Response:
{
  success: boolean,
  message: string,
  logoUrl: string
}
```

**New Endpoint: Get School Settings**
```javascript
GET /api/school/settings

Response:
{
  success: boolean,
  settings: {
    schoolName: string,
    logoUrl: string | null
  }
}
```

#### Database Extension

```javascript
// Add to database.js
class Database {
  constructor() {
    // ... existing code
    this.schoolSettings = {
      schoolName: "SMA Negeri 1 Telukdalam",
      logoUrl: null
    };
  }

  saveSchoolLogo(logoUrl) {
    this.schoolSettings.logoUrl = logoUrl;
  }

  getSchoolSettings() {
    return this.schoolSettings;
  }
}
```

#### Frontend Component

**Header Component Enhancement**
```html
<header>
  <div class="school-identity">
    <img id="schoolLogo" src="" alt="School Logo" style="display: none;">
    <div class="school-info">
      <h1 id="schoolName">SMA Negeri 1 Telukdalam</h1>
      <p>Sistem Rekomendasi Jurusan PTN</p>
    </div>
  </div>
  <!-- Admin-only logo upload -->
  <div id="logoUploadSection" style="display: none;">
    <input type="file" id="logoInput" accept=".jpg,.jpeg,.png">
    <button onclick="uploadLogo()">Upload Logo</button>
  </div>
</header>
```

### 2. Mobile Responsive Design

#### CSS Media Queries Strategy

```css
/* Mobile-first approach */

/* Base styles for mobile (< 768px) */
.container {
  padding: 10px;
}

.students-list {
  grid-template-columns: 1fr;
}

/* Tablet (768px - 1024px) */
@media (min-width: 768px) {
  .container {
    padding: 20px;
  }
  
  .students-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop (> 1024px) */
@media (min-width: 1024px) {
  .students-list {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

#### Touch-Friendly UI Elements

- Minimum touch target size: 44x44 pixels
- Increased padding for form inputs on mobile
- Larger buttons with adequate spacing
- Swipe-friendly navigation

#### Viewport Configuration

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
```

### 3. Application Description Component

#### HTML Structure

```html
<section class="app-description">
  <div class="card description-card">
    <h2>Tentang Aplikasi</h2>
    <p class="description-text">
      Aplikasi Rekomendasi PTN dan Jurusan dibuat untuk membantu siswa 
      menentukan pilihan Perguruan Tinggi Negeri (PTN) dan program studi 
      yang sesuai dengan kemampuan akademik mereka. Banyak siswa mengalami 
      kebingungan dalam memilih jurusan karena kurangnya analisis terhadap 
      nilai dan tingkat persaingan masuk PTN. Melalui sistem ini, data nilai 
      siswa dianalisis secara otomatis untuk menghasilkan rekomendasi kampus 
      dan jurusan yang realistis, terukur, dan sesuai dengan performa akademik. 
      Aplikasi ini juga membantu guru dan pihak sekolah dalam memberikan 
      arahan yang lebih objektif dan berbasis data kepada siswa.
    </p>
  </div>
</section>
```

#### CSS Styling

```css
.app-description {
  margin-bottom: 30px;
}

.description-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

.description-text {
  line-height: 1.8;
  color: #333;
  font-size: 1.05em;
  text-align: justify;
}
```

### 4. Enhanced Admin Access Component

#### Backend API Enhancement

**Enhanced Endpoint: Get Student Detail**
```javascript
GET /api/admin/students/:id/detail
Authorization: Admin session required

Response:
{
  success: boolean,
  student: {
    id: string,
    nama: string,
    nisn: string,
    kelas: string,
    grades: [
      {
        semester: number,
        subjects: {
          [subjectName]: number
        }
      }
    ]
  },
  analysis: {
    average: number,
    highest: { subject: string, value: number },
    lowest: { subject: string, value: number },
    semesterProgress: Array
  },
  recommendations: Array
}
```

**Enhanced PDF Generation**
- Include school logo in header
- Display all semester grades in table format
- Show complete subject breakdown
- Include recommendations with match scores

#### Frontend Admin Detail View

```html
<section class="admin-detail-view">
  <div class="card">
    <h2>Detail Siswa</h2>
    
    <!-- Student Info -->
    <div class="student-info-section">
      <h3>Informasi Siswa</h3>
      <table class="info-table">
        <tr><td>Nama</td><td id="detailNama"></td></tr>
        <tr><td>NISN</td><td id="detailNISN"></td></tr>
        <tr><td>Kelas</td><td id="detailKelas"></td></tr>
      </table>
    </div>
    
    <!-- All Grades by Semester -->
    <div class="grades-section">
      <h3>Nilai Per Semester</h3>
      <div id="allGradesTable"></div>
    </div>
    
    <!-- Recommendations -->
    <div class="recommendations-section">
      <h3>Rekomendasi PTN dan Jurusan</h3>
      <div id="adminRecommendations"></div>
    </div>
    
    <!-- Download PDF -->
    <button class="btn btn-primary" onclick="downloadDetailPDF()">
      📥 Download Laporan PDF
    </button>
  </div>
</section>
```

## Data Models

### School Settings Model

```javascript
{
  schoolName: string,        // "SMA Negeri 1 Telukdalam"
  logoUrl: string | null,    // "/uploads/logo/school-logo.png"
  updatedAt: Date
}
```

### Student Model (Extended)

```javascript
{
  id: string,
  nama: string,
  nisn: string,
  kelas: string,
  grades: [
    {
      semester: number,      // 1-6
      subjects: {
        [subjectName]: number  // Subject name -> grade value
      },
      createdAt: Date,
      updatedAt: Date
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

### PDF Report Model

```javascript
{
  schoolInfo: {
    name: string,
    logoPath: string | null
  },
  studentInfo: {
    nama: string,
    nisn: string,
    kelas: string
  },
  gradesData: [
    {
      semester: number,
      subjects: { [name]: number },
      average: number
    }
  ],
  analysis: {
    overallAverage: number,
    highest: { subject: string, value: number },
    lowest: { subject: string, value: number }
  },
  recommendations: [
    {
      rank: number,
      university: string,
      major: string,
      matchScore: number,
      passingGrade: string,
      reasons: string[]
    }
  ],
  generatedAt: Date
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: Logo File Format Validation
*For any* file uploaded as a school logo, the system should accept the file if and only if its extension is JPG, JPEG, or PNG (case-insensitive).
**Validates: Requirements 1.2**

### Property 2: Logo Persistence Across Pages
*For any* valid school logo that has been successfully uploaded, the logo should be displayed in the header on all pages of the application.
**Validates: Requirements 1.3, 1.5**

### Property 3: Invalid File Rejection
*For any* file with an extension other than JPG, JPEG, or PNG, the upload should be rejected and an error message should be displayed to the user.
**Validates: Requirements 1.4**

### Property 4: Responsive Layout Adaptation
*For any* viewport width less than 768 pixels, the application layout should render in single-column format without horizontal scrolling.
**Validates: Requirements 2.1, 2.3**

### Property 5: Touch Target Sizing
*For any* interactive element (buttons, inputs, links) on mobile viewports, the element should have a minimum touch target size of 44x44 pixels.
**Validates: Requirements 2.2**

### Property 6: Form Accessibility on Mobile
*For any* form displayed on a mobile device (viewport < 768px), all form fields should be accessible and usable without requiring horizontal scrolling.
**Validates: Requirements 2.5**

### Property 7: Complete Grade Display
*For any* student with grades in the system, when an admin views the student detail page, all subject grades from all semesters should be displayed.
**Validates: Requirements 4.1, 4.5**

### Property 8: Recommendation Display
*For any* student with grades in the system, when viewing the student detail page, PTN and major recommendations should be displayed.
**Validates: Requirements 4.2**

### Property 9: PDF Content Completeness
*For any* student, when a PDF report is generated, the report should contain the student's information, all grades, and all recommendations without data loss.
**Validates: Requirements 4.3, 5.3**

### Property 10: Logo in PDF Header
*For any* PDF report generated when a school logo exists in the system, the logo should appear in the PDF header.
**Validates: Requirements 4.4**

### Property 11: Excel Data Parsing Completeness
*For any* Excel file uploaded containing student grades, all subject grades present in the Excel file should be parsed and stored in the system.
**Validates: Requirements 4.6**

### Property 12: File Size Validation
*For any* file uploaded as a school logo, if the file size exceeds 5MB, the upload should be rejected with an appropriate error message.
**Validates: Requirements 5.1**

### Property 13: Admin Authorization
*For any* request to access detailed student information, the request should succeed if and only if the user has admin role authorization.
**Validates: Requirements 5.2**

### Property 14: Student Data Isolation
*For any* student user logged into the system, they should only be able to view and access their own grades and recommendations, not other students' data.
**Validates: Requirements 5.5**

## Error Handling

### File Upload Errors

1. **Invalid File Format**
   - Error Code: `INVALID_FILE_FORMAT`
   - Message: "Format file tidak valid. Hanya JPG, JPEG, dan PNG yang diperbolehkan."
   - HTTP Status: 400 Bad Request

2. **File Size Exceeded**
   - Error Code: `FILE_TOO_LARGE`
   - Message: "Ukuran file terlalu besar. Maksimal 5MB."
   - HTTP Status: 400 Bad Request

3. **Upload Failed**
   - Error Code: `UPLOAD_FAILED`
   - Message: "Gagal mengupload file. Silakan coba lagi."
   - HTTP Status: 500 Internal Server Error

### Authorization Errors

1. **Unauthorized Access**
   - Error Code: `UNAUTHORIZED`
   - Message: "Anda tidak memiliki akses. Silakan login terlebih dahulu."
   - HTTP Status: 401 Unauthorized

2. **Forbidden Access**
   - Error Code: `FORBIDDEN`
   - Message: "Akses ditolak. Hanya admin yang dapat mengakses halaman ini."
   - HTTP Status: 403 Forbidden

3. **Student Data Access Violation**
   - Error Code: `ACCESS_DENIED`
   - Message: "Anda hanya dapat mengakses data Anda sendiri."
   - HTTP Status: 403 Forbidden

### Data Errors

1. **Student Not Found**
   - Error Code: `STUDENT_NOT_FOUND`
   - Message: "Data siswa tidak ditemukan."
   - HTTP Status: 404 Not Found

2. **No Grades Available**
   - Error Code: `NO_GRADES`
   - Message: "Belum ada data nilai untuk siswa ini."
   - HTTP Status: 404 Not Found

3. **PDF Generation Failed**
   - Error Code: `PDF_GENERATION_FAILED`
   - Message: "Gagal membuat laporan PDF. Silakan coba lagi."
   - HTTP Status: 500 Internal Server Error

### Responsive Design Errors

1. **Viewport Not Supported**
   - Graceful degradation for very small screens (< 320px)
   - Display warning message: "Layar terlalu kecil. Untuk pengalaman terbaik, gunakan layar minimal 320px."

2. **CSS Not Loaded**
   - Fallback to basic HTML structure
   - Ensure content remains accessible

## Testing Strategy

### Dual Testing Approach

This feature will use both unit testing and property-based testing to ensure comprehensive coverage:

**Unit Tests**: Focus on specific examples, edge cases, and integration points
- Test specific file uploads (valid JPG, invalid PDF)
- Test specific viewport breakpoints (767px, 768px, 769px)
- Test admin vs student access scenarios
- Test PDF generation with sample data

**Property-Based Tests**: Verify universal properties across all inputs
- Test file validation across randomly generated file types
- Test responsive behavior across random viewport sizes
- Test data completeness across randomly generated student data
- Test authorization across random user roles

### Property-Based Testing Configuration

**Testing Library**: For JavaScript/Node.js, we will use **fast-check** library

**Configuration**:
- Minimum 100 iterations per property test
- Each test tagged with feature name and property number
- Tag format: `Feature: app-enhancement, Property {N}: {property description}`

**Example Property Test Structure**:
```javascript
const fc = require('fast-check');

// Feature: app-enhancement, Property 1: Logo File Format Validation
test('accepts only JPG, JPEG, PNG file formats', () => {
  fc.assert(
    fc.property(
      fc.string(), // random filename
      fc.oneof(
        fc.constant('.jpg'),
        fc.constant('.jpeg'),
        fc.constant('.png'),
        fc.constant('.pdf'),
        fc.constant('.gif'),
        fc.constant('.bmp')
      ), // random extension
      (filename, extension) => {
        const file = { name: filename + extension };
        const isValid = validateLogoFormat(file);
        const validExtensions = ['.jpg', '.jpeg', '.png'];
        const shouldBeValid = validExtensions.includes(extension.toLowerCase());
        return isValid === shouldBeValid;
      }
    ),
    { numRuns: 100 }
  );
});
```

### Unit Testing Strategy

**Test Categories**:

1. **School Identity Tests**
   - Logo upload with valid formats (JPG, JPEG, PNG)
   - Logo upload with invalid formats (PDF, GIF, BMP)
   - Logo size validation (under 5MB, over 5MB)
   - Logo display in header
   - Logo persistence across page navigation

2. **Responsive Design Tests**
   - Layout at mobile breakpoint (< 768px)
   - Layout at tablet breakpoint (768px - 1024px)
   - Layout at desktop breakpoint (> 1024px)
   - Touch target sizes on mobile
   - Form field accessibility on mobile
   - No horizontal scrolling on mobile

3. **Application Description Tests**
   - Description text presence on main page
   - Description text content accuracy
   - Description formatting and styling

4. **Admin Access Tests**
   - Admin can view all student grades
   - Admin can view student recommendations
   - Admin can generate PDF reports
   - Student cannot access other students' data
   - Unauthenticated users cannot access student data

5. **PDF Generation Tests**
   - PDF contains student information
   - PDF contains all grades
   - PDF contains recommendations
   - PDF includes school logo (when available)
   - PDF generation without logo (graceful handling)

6. **Integration Tests**
   - End-to-end logo upload and display
   - End-to-end student data viewing by admin
   - End-to-end PDF generation and download
   - Mobile user flow (login → view grades → view recommendations)

### Test Coverage Goals

- **Code Coverage**: Minimum 80% line coverage
- **Branch Coverage**: Minimum 75% branch coverage
- **Property Tests**: All 14 correctness properties implemented
- **Unit Tests**: All critical paths and edge cases covered

### Testing Tools

- **Unit Testing**: Jest or Mocha
- **Property-Based Testing**: fast-check
- **E2E Testing**: Playwright or Cypress (for responsive design testing)
- **Visual Regression**: Percy or Chromatic (for mobile layout verification)
- **Accessibility Testing**: axe-core (for mobile accessibility)

## Implementation Notes

### File Storage Strategy

**Logo Storage**:
- Directory: `web-app/uploads/logo/`
- Filename format: `school-logo-{timestamp}.{extension}`
- Only one logo active at a time (replace previous)
- Old logos should be deleted when new logo is uploaded

### CSS Architecture

**Mobile-First Approach**:
1. Write base styles for mobile (default)
2. Add tablet styles with `@media (min-width: 768px)`
3. Add desktop styles with `@media (min-width: 1024px)`

**Critical CSS for Mobile**:
- Ensure above-the-fold content loads quickly
- Minimize CSS for initial render
- Use CSS Grid and Flexbox for responsive layouts

### Performance Considerations

1. **Image Optimization**:
   - Compress uploaded logos (use sharp or jimp)
   - Generate multiple sizes for different screen densities
   - Serve WebP format with fallback

2. **Mobile Performance**:
   - Minimize JavaScript bundle size
   - Lazy load non-critical components
   - Use CSS transforms for animations (GPU acceleration)

3. **PDF Generation**:
   - Generate PDFs asynchronously
   - Show loading indicator during generation
   - Cache generated PDFs (optional)

### Security Considerations

1. **File Upload Security**:
   - Validate file type on both client and server
   - Scan uploaded files for malware (optional)
   - Store files outside web root
   - Serve files through controlled endpoint

2. **Authorization**:
   - Verify admin role on every protected endpoint
   - Implement CSRF protection for file uploads
   - Rate limit file upload endpoints

3. **Data Privacy**:
   - Ensure student data isolation
   - Log access to sensitive data
   - Implement audit trail for admin actions

### Accessibility Considerations

1. **Mobile Accessibility**:
   - Ensure sufficient color contrast (WCAG AA)
   - Support screen readers on mobile
   - Provide text alternatives for images
   - Ensure keyboard navigation works on mobile browsers

2. **Touch Accessibility**:
   - Minimum 44x44px touch targets
   - Adequate spacing between interactive elements
   - Clear focus indicators for keyboard users

3. **Content Accessibility**:
   - Use semantic HTML
   - Provide ARIA labels where needed
   - Ensure proper heading hierarchy

## Migration and Deployment

### Database Migration

Since we're using an in-memory database, no migration is needed. However, for production:

1. Add `schoolSettings` table/collection
2. Migrate existing data (if any)
3. Set default school name

### Deployment Checklist

1. **Pre-Deployment**:
   - [ ] Create `uploads/logo/` directory
   - [ ] Set proper file permissions
   - [ ] Test on multiple mobile devices
   - [ ] Verify all API endpoints
   - [ ] Run all tests (unit + property)

2. **Deployment**:
   - [ ] Deploy backend changes
   - [ ] Deploy frontend changes
   - [ ] Update environment variables (if any)
   - [ ] Clear CDN cache (if applicable)

3. **Post-Deployment**:
   - [ ] Verify logo upload functionality
   - [ ] Test mobile responsiveness on real devices
   - [ ] Verify PDF generation with logo
   - [ ] Monitor error logs
   - [ ] Gather user feedback

### Rollback Plan

If issues occur:
1. Revert to previous version
2. Restore database backup (if applicable)
3. Remove uploaded logo files
4. Notify users of temporary issues

## Future Enhancements

1. **School Identity**:
   - Support for school motto/tagline
   - Customizable color scheme
   - Multiple logo variants (light/dark mode)

2. **Mobile Features**:
   - Progressive Web App (PWA) support
   - Offline mode for viewing grades
   - Push notifications for new recommendations

3. **Admin Features**:
   - Bulk PDF generation for all students
   - Export data to Excel
   - Analytics dashboard
   - Student performance trends

4. **PDF Enhancements**:
   - Customizable PDF templates
   - Digital signatures
   - QR code for verification
   - Multi-language support
