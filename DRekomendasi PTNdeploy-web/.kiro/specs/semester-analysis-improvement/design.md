# Design Document: Semester Analysis Improvement

## Overview

This design addresses two critical issues in the current PTN Major Recommendation System:

1. **Bug Fix**: Excel upload incorrectly saves all grades to Semester 6
2. **Feature Addition**: Progressive analysis that provides recommendations based on available semester data

The solution involves separating Excel data into an admin-only reference table, implementing proper semester-specific grade storage, and creating a progressive recommendation engine that adapts to the amount of available data.

### Key Design Decisions

- **Separation of Concerns**: Excel data becomes admin reference only; student grades are manually input per semester
- **Progressive Confidence**: Confidence levels (40-95%) based on number of semesters filled
- **Weighted Averaging**: Recent semesters weighted higher (1.0x to 1.5x) for more accurate current performance
- **Consistency Scoring**: Standard deviation analysis to detect grade fluctuations
- **Adaptive UI**: Visual indicators (badges, progress bars, trend icons) to guide students

## Architecture

### System Components

The system consists of several key components that work together to provide progressive analysis:

1. **Grade Storage Service**: Handles semester-specific grade storage
2. **Excel Reference Service**: Manages Excel data for admin reference only
3. **Progressive Analyzer**: Calculates confidence levels and analysis status
4. **Weighted Average Calculator**: Computes weighted averages favoring recent semesters
5. **Consistency Score Calculator**: Measures grade stability
6. **Adaptive Recommendation Engine**: Generates recommendations based on available data
7. **UI Renderer Components**: Displays adaptive visual elements

### Data Flow

1. **Student Path**: Student inputs grades → Stored per semester → Analysis engine → Progressive recommendations
2. **Admin Path**: Admin uploads Excel → Stored as reference → Admin view only (no impact on recommendations)
3. **Analysis Path**: Retrieve all student semesters → Calculate weighted averages → Determine confidence → Generate recommendations


### Database Schema Changes

**New Table: `excel_reference`**
- id (primary key)
- student_id (foreign key)
- nama, nisn, kelas
- subject_data (JSON)
- uploaded_at, uploaded_by

**Modified Table: `grades`**
- id (primary key)
- student_id (foreign key)
- semester (1-6)
- subjects (JSON)
- input_source ('manual' | 'migrated')
- created_at, updated_at

**New Table: `recommendation_history`**
- id (primary key)
- student_id (foreign key)
- semester_count
- major_name, university
- match_score, confidence_level
- calculated_at

## Components and Interfaces

### 1. Grade Storage Service

**Purpose**: Handle semester-specific grade storage and retrieval

**Key Methods**:
- `saveGrade(studentId, semester, subjects, source)`: Validates semester (1-6) and stores with source tracking
- `getGrade(studentId, semester)`: Retrieves grades for specific semester
- `getAllGrades(studentId)`: Returns array sorted by semester
- `updateGrade(studentId, semester, subjects)`: Updates existing semester grades
- `getSemesterCount(studentId)`: Returns number of filled semesters

### 2. Excel Reference Service

**Purpose**: Store and manage Excel upload data for admin reference only

**Key Methods**:
- `importExcelData(data, adminId)`: Stores Excel data without creating semester grades
- `getExcelReference(studentId)`: Retrieves reference data for admin view
- `getAllExcelReferences()`: Gets all Excel reference data
- `deleteExcelReference(id)`: Removes Excel reference entry

### 3. Progressive Analyzer

**Purpose**: Analyze student performance with confidence levels based on data availability

**Confidence Level Calculation**:
- 5-6 semesters: 85-95% confidence
- 3-4 semesters: 60-75% confidence
- 1-2 semesters: 40-50% confidence

**Status Mapping**:
- 1-2 semesters: "Analisis Awal" (yellow badge)
- 3-4 semesters: "Analisis Berkembang" (blue badge)
- 5-6 semesters: "Analisis Lengkap" (green badge)

### 4. Weighted Average Calculator

**Purpose**: Calculate weighted averages with higher weights for recent semesters

**Weight Formula**: 
- Semester 1: weight 1.0
- Semester 2: weight 1.1
- Semester 3: weight 1.2
- Semester 4: weight 1.3
- Semester 5: weight 1.4
- Semester 6: weight 1.5

**Calculation**: For each semester, multiply average by weight, sum all weighted values, divide by sum of weights.

### 5. Consistency Score Calculator

**Purpose**: Measure grade stability across semesters using standard deviation

**Consistency Levels**:
- Standard deviation < 5: "Sangat Konsisten" (90-100% score)
- Standard deviation 5-10: "Cukup Konsisten" (70-89% score)
- Standard deviation > 10: "Perlu Konsistensi" (50-69% score)

### 6. Adaptive Recommendation Engine

**Purpose**: Generate recommendations that adapt to available data

**Match Score Calculation**: 
- Calculate weighted average for each required subject
- Apply subject weights from major requirements
- Normalize to 0-100 scale
- Apply confidence multiplier based on semester count

**Threshold Adjustment**:
- 1-2 semesters: 40% threshold (lower for minimal data)
- 3-4 semesters: 50% threshold
- 5-6 semesters: 60% threshold (higher for complete data)

### 7. UI Renderer Components

**Progress Bar**: Shows X/6 semesters filled with percentage bar

**Status Badge**: Displays analysis status with color coding

**Adaptive Message**: Shows contextual guidance based on semester count

**Trend Icon**: Displays trend (📈 up, 📉 down, ➡️ stable) with percentage change

## Data Models

### Student Grade Model
```javascript
{
  id, studentId, semester (1-6),
  subjects: { "Subject Name": score },
  inputSource: 'manual' | 'migrated',
  createdAt, updatedAt
}
```

### Excel Reference Model
```javascript
{
  id, studentId, nama, nisn, kelas,
  subjectData: { "Subject Name": score },
  uploadedAt, uploadedBy
}
```

### Analysis Result Model
```javascript
{
  studentId, semesterCount,
  confidenceLevel (0-100),
  analysisStatus: 'Awal' | 'Berkembang' | 'Lengkap',
  weightedAverage,
  consistencyScore: { overall, level, message },
  subjectAnalysis: { [subject]: { weightedAverage, standardDeviation, trend } },
  calculatedAt
}
```

### Recommendation Model
```javascript
{
  university, major, category,
  matchScore, confidenceLevel,
  trend: { icon, text, change },
  requiredSubjects: [{ name, studentScore, minScore, status, icon }],
  passingGrade,
  reasons: [{ type, icon, message }]
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Excel Import Isolation

*For any* Excel upload operation, the system should store student profile data (nama, NISN, kelas) and subject scores in the excel_reference table without creating any entries in the grades table.

**Validates: Requirements 1.1, 1.2, 1.3**

### Property 2: Semester Storage Correctness

*For any* manual grade input with semester S (where 1 ≤ S ≤ 6), the system should store the grades with semester field equal to S, and retrieving grades for semester S should return the exact subjects and scores that were saved.

**Validates: Requirements 2.1, 2.2, 2.3, 2.4**

### Property 3: Confidence Level Boundaries

*For any* student with N semesters of data, the calculated confidence level should be within the correct range: 40-50% for N ∈ {1,2}, 60-75% for N ∈ {3,4}, and 85-95% for N ∈ {5,6}.

**Validates: Requirements 3.2, 3.3, 3.4, 3.5**

### Property 4: Minimum Data Recommendation

*For any* student with at least 1 semester of grades, the system should generate at least one recommendation (assuming at least one major has match score above threshold).

**Validates: Requirements 3.1, 14.2**

### Property 5: Status Badge Consistency

*For any* student with N semesters, the displayed analysis status badge should match the semester count: "Analisis Awal" for N ∈ {1,2}, "Analisis Berkembang" for N ∈ {3,4}, "Analisis Lengkap" for N ∈ {5,6}.

**Validates: Requirements 4.1, 4.2, 4.3**

### Property 6: Adaptive Message Mapping

*For any* student viewing recommendations, the displayed message should correspond to their semester count according to the defined mapping (Awal/Berkembang/Lengkap messages).

**Validates: Requirements 5.1, 5.2, 5.3**

### Property 7: Progress Calculation Accuracy

*For any* student with N filled semesters (0 ≤ N ≤ 6), the progress bar should display "N/6 Semester Terisi" and show (N/6 * 100)% fill.

**Validates: Requirements 6.1, 6.2, 6.3**

### Property 8: Weighted Average Monotonicity

*For any* two semesters S1 and S2 where S1 < S2, the weight for S2 should be greater than the weight for S1 (specifically, weight(S) = 1.0 + (S-1) * 0.1).

**Validates: Requirements 8.2**

### Property 9: Weighted Average Calculation

*For any* set of semester grades, calculating the weighted average then recalculating with the same data should produce the same result (idempotence).

**Validates: Requirements 8.1, 8.3, 8.4**

### Property 10: Consistency Score Boundaries

*For any* subject with standard deviation σ, the consistency score should be: ≥90% if σ < 5, between 70-89% if 5 ≤ σ < 10, and <70% if σ ≥ 10.

**Validates: Requirements 9.3, 9.4, 9.5**

### Property 11: Recommendation Recalculation

*For any* student who adds a new semester of grades, the system should recalculate all recommendations, and the new match scores should reflect the additional data.

**Validates: Requirements 10.1**

### Property 12: Trend Direction Correctness

*For any* major with previous match score P and current match score C, the trend icon should be: 📈 if C > P + 2, 📉 if C < P - 2, and ➡️ if |C - P| ≤ 2.

**Validates: Requirements 10.3, 10.4, 10.5**

### Property 13: Input Validation Range

*For any* grade input, the system should reject values outside the range [0, 100] and accept all values within that range.

**Validates: Requirements 12.1, 12.2**

### Property 14: Decimal Precision

*For any* grade input with decimal places, the system should accept values with up to 2 decimal places and round or reject values with more precision.

**Validates: Requirements 12.3**

### Property 15: Admin-Student Data Isolation

*For any* Excel reference data stored by admin, students should not be able to access or view this data through any student-facing endpoint.

**Validates: Requirements 11.5**

### Property 16: Threshold Adaptation

*For any* student with N semesters, the recommendation threshold should be: 40% if N ≤ 2, 50% if 3 ≤ N ≤ 4, and 60% if N ≥ 5.

**Validates: Requirements 14.5**

## Error Handling

### Input Validation Errors

**Invalid Semester Number**:
- Error: "Semester harus antara 1-6"
- HTTP Status: 400 Bad Request
- Recovery: Prompt user to select valid semester

**Invalid Grade Value**:
- Error: "Nilai harus antara 0-100"
- HTTP Status: 400 Bad Request
- Recovery: Highlight invalid field, allow correction

**Empty Form Submission**:
- Error: "Harap isi minimal satu mata pelajaran"
- HTTP Status: 400 Bad Request
- Recovery: Show validation message, keep form open

### Authorization Errors

**Student Accessing Other Student Data**:
- Error: "Anda hanya bisa melihat data Anda sendiri"
- HTTP Status: 403 Forbidden
- Recovery: Redirect to own dashboard

**Student Accessing Admin Endpoints**:
- Error: "Akses ditolak. Hanya admin yang dapat mengakses halaman ini"
- HTTP Status: 403 Forbidden
- Recovery: Redirect to student dashboard

### Data Errors

**Student Not Found**:
- Error: "Data siswa tidak ditemukan"
- HTTP Status: 404 Not Found
- Recovery: Redirect to login or registration

**No Grades Available**:
- Error: "Belum ada data nilai. Silakan input nilai terlebih dahulu"
- HTTP Status: 200 OK (not an error, just empty state)
- Recovery: Show empty state with call-to-action to input grades

**Calculation Errors**:
- Error: "Gagal menghitung analisis. Silakan coba lagi"
- HTTP Status: 500 Internal Server Error
- Recovery: Log error, show user-friendly message, retry button

### Migration Errors

**Migration Failure**:
- Error: "Gagal migrasi data. Rollback dilakukan"
- HTTP Status: 500 Internal Server Error
- Recovery: Log detailed error, notify admin, maintain old data structure

## Testing Strategy

### Dual Testing Approach

This feature requires both unit tests and property-based tests for comprehensive coverage:

- **Unit tests**: Verify specific examples, edge cases, and error conditions
- **Property tests**: Verify universal properties across all inputs

### Unit Testing Focus

Unit tests should cover:
- Specific confidence level calculations (1 semester = 40%, 6 semesters = 95%)
- Status badge rendering for each semester count
- Weighted average calculation with known inputs
- Standard deviation calculation with sample data
- Excel import without grade creation
- Authorization checks (student vs admin access)
- Input validation edge cases (0, 100, 100.01, -1, 101)
- Empty state handling
- Migration script execution

### Property-Based Testing

**Library**: Use `fast-check` for JavaScript property-based testing

**Configuration**: Each property test should run minimum 100 iterations

**Test Tagging**: Each test must reference its design property using format:
```javascript
// Feature: semester-analysis-improvement, Property 1: Excel Import Isolation
```

### Property Test Specifications

**Property 1 Test**: Generate random Excel data, import it, verify no grades table entries created

**Property 2 Test**: Generate random semester (1-6) and grades, save them, retrieve and verify exact match

**Property 3 Test**: Generate random semester counts (1-6), calculate confidence, verify within correct range

**Property 4 Test**: Generate random single-semester data, verify at least one recommendation generated

**Property 5 Test**: Generate random semester counts, verify badge text matches expected status

**Property 6 Test**: Generate random semester counts, verify message matches expected text

**Property 7 Test**: Generate random semester counts (0-6), verify progress calculation accuracy

**Property 8 Test**: Generate pairs of semesters, verify weight(S2) > weight(S1) when S2 > S1

**Property 9 Test**: Generate random grade sets, calculate weighted average twice, verify identical results

**Property 10 Test**: Generate random grade sequences, calculate std dev, verify consistency score in correct range

**Property 11 Test**: Generate initial grades, calculate recommendations, add semester, verify recommendations recalculated

**Property 12 Test**: Generate random score pairs, verify trend icon matches difference calculation

**Property 13 Test**: Generate random numbers, verify acceptance/rejection based on [0,100] range

**Property 14 Test**: Generate random decimal numbers, verify precision handling (max 2 decimal places)

**Property 15 Test**: Generate Excel reference data, attempt student access, verify rejection

**Property 16 Test**: Generate random semester counts, verify threshold matches expected value

### Integration Testing

Integration tests should verify:
- End-to-end flow: Excel upload → admin view → student manual input → analysis → recommendations
- Database transactions: Grade save → retrieve → update cycle
- Session management: Login → access control → logout
- UI rendering: Data changes → UI updates → user interactions

### Performance Testing

Performance tests should verify:
- Weighted average calculation completes in <100ms for 6 semesters
- Recommendation generation completes in <500ms for full database
- Consistency score calculation completes in <50ms per subject
- UI rendering updates in <200ms after data change

### Migration Testing

Migration tests should verify:
- All semester 6 data correctly moved to excel_reference
- No data loss during migration
- Rollback capability if migration fails
- Migration idempotence (running twice produces same result)

