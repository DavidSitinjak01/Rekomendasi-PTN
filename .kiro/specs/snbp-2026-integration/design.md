# Design Document: SNBP 2026 Integration

## Overview

This design document specifies the technical implementation for integrating SNBP (Seleksi Nasional Berdasarkan Prestasi) 2026 features into the existing PTN recommendation system. The integration adds comprehensive support for Indonesia's merit-based university selection pathway, including TKA score management, SNBP eligibility simulation, strategic pathway recommendations, province-based filtering, and a dedicated dashboard.

### Key Design Goals

1. **Seamless Integration**: Extend existing architecture without breaking current functionality
2. **Accurate Calculations**: Implement SNBP scoring formulas based on official 2026 regulations
3. **User-Centric**: Provide clear, actionable insights for students and administrators
4. **Performance**: Maintain sub-second response times for all SNBP calculations
5. **Scalability**: Support multiple schools with hundreds of students each

### System Context

The existing system is a Node.js/Express web application with:
- In-memory database (Database class)
- RESTful API endpoints
- Static HTML/CSS/JavaScript frontend
- Excel import/export capabilities
- Student grade management (6 semesters)
- PTN and major recommendation engine

The SNBP integration will extend this foundation with new data models, calculation engines, and UI components.

## Architecture

### High-Level Architecture


```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Student      │  │ Admin        │  │ SNBP         │     │
│  │ Profile UI   │  │ Management   │  │ Dashboard    │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
└─────────┼──────────────────┼──────────────────┼─────────────┘
          │                  │                  │
          └──────────────────┴──────────────────┘
                             │
┌─────────────────────────────┼─────────────────────────────────┐
│                     API Layer (Express)                       │
│  ┌──────────────────────────┴──────────────────────────┐     │
│  │  Existing Endpoints    │  New SNBP Endpoints        │     │
│  │  /api/students         │  /api/students/:id/tka     │     │
│  │  /api/students/:id/    │  /api/students/:id/snbp-   │     │
│  │    grades              │    simulation              │     │
│  │  /api/students/:id/    │  /api/students/:id/        │     │
│  │    recommendations     │    strategy-recommendation │     │
│  │  /api/ptn              │  /api/students/:id/snbp-   │     │
│  │  /api/majors           │    dashboard               │     │
│  └────────────────────────┬──────────────────────────┬─┘     │
└───────────────────────────┼──────────────────────────┼───────┘
                            │                          │
┌───────────────────────────┼──────────────────────────┼───────┐
│                   Business Logic Layer                        │
│  ┌─────────────────────┐  ┌──────────────────────────────┐   │
│  │ Existing Engines    │  │ New SNBP Engines             │   │
│  │ - analyzeStudent    │  │ - SNBPScoreCalculator        │   │
│  │ - getRecommendations│  │ - SchoolRankingEngine        │   │
│  │ - calculateMatch    │  │ - EligibilitySimulator       │   │
│  │                     │  │ - StrategyRecommender        │   │
│  │                     │  │ - ProvinceRuleValidator      │   │
│  └─────────────────────┘  └──────────────────────────────┘   │
└───────────────────────────┬──────────────────────────────────┘
                            │
┌───────────────────────────┼──────────────────────────────────┐
│                     Data Layer                                │
│  ┌─────────────────────────────────────────────────────┐     │
│  │  Database (In-Memory)                               │     │
│  │  - students Map (extended with SNBP fields)         │     │
│  │  - grades Map                                       │     │
│  │  - ptn-list.json (extended with province)           │     │
│  │  - ptn-majors.json                                  │     │
│  │  - subjects.json                                    │     │
│  └─────────────────────────────────────────────────────┘     │
└───────────────────────────────────────────────────────────────┘
```

### Component Interaction Flow

**SNBP Simulation Request Flow:**
```
1. Student → Frontend: Click "Check SNBP Eligibility"
2. Frontend → API: GET /api/students/:id/snbp-simulation
3. API → SNBPScoreCalculator: Calculate SNBP score
4. SNBPScoreCalculator → Database: Fetch student grades, TKA, school info
5. SNBPScoreCalculator → SchoolRankingEngine: Get student ranking
6. SchoolRankingEngine → Database: Fetch all students from same school
7. SchoolRankingEngine → SNBPScoreCalculator: Return ranking
8. SNBPScoreCalculator → EligibilitySimulator: Determine eligibility
9. EligibilitySimulator → API: Return simulation results
10. API → Frontend: JSON response with eligibility data
11. Frontend → Student: Display eligibility status and probability
```

## Components and Interfaces

### 1. Database Schema Extensions



#### Student Record Extension

```javascript
// Existing student structure
{
  id: string,
  nama: string,
  nisn: string,
  kelas: string,
  createdAt: Date,
  updatedAt: Date
}

// Extended student structure with SNBP fields
{
  id: string,
  nama: string,
  nisn: string,
  kelas: string,
  // New SNBP fields
  tka_score: number | null,           // 0-800 range
  school_name: string,                // e.g., "SMA Negeri 1 Jakarta"
  school_accreditation: 'A' | 'B' | 'C' | 'Unaccredited',
  school_province: string,            // e.g., "DKI Jakarta"
  school_npsn: string | null,         // Optional 8-digit code
  achievements: Achievement[],        // New array for achievements
  createdAt: Date,
  updatedAt: Date
}

// Achievement structure
interface Achievement {
  id: string,
  type: 'competition' | 'certification' | 'leadership',
  name: string,
  level: 'national' | 'provincial' | 'regional' | 'school',
  rank: string | null,               // e.g., "Juara 1", "Finalis"
  year: number,
  points: number                     // Calculated achievement points
}
```

#### PTN Record Extension

```javascript
// Existing PTN structure
{
  id: number,
  name: string,
  acronym: string,
  location: string,
  region: string,
  established: number,
  accreditation: string
}

// Extended PTN structure
{
  id: number,
  name: string,
  acronym: string,
  location: string,
  region: string,
  province: string,                  // NEW: e.g., "Jawa Barat"
  established: number,
  accreditation: string
}
```

### 2. SNBP Score Calculator



**Purpose**: Calculate comprehensive SNBP score based on multiple weighted components.

**Interface**:
```javascript
class SNBPScoreCalculator {
  /**
   * Calculate SNBP score for a student
   * @param {Object} student - Student record with grades
   * @returns {Object} Score breakdown and total
   */
  calculateSNBPScore(student) {
    // Returns:
    // {
    //   reportCardScore: number,      // 0-100
    //   tkaScore: number,              // 0-100 (normalized from 0-800)
    //   consistencyScore: number,      // 0-100
    //   achievementScore: number,      // 0-100
    //   totalScore: number,            // 0-100 (weighted average)
    //   weights: {
    //     reportCard: number,          // Actual weight used (40% or adjusted)
    //     tka: number,                 // Actual weight used (30% or adjusted)
    //     consistency: number,         // Actual weight used (20% or adjusted)
    //     achievement: number          // Actual weight used (10% or adjusted)
    //   },
    //   missingComponents: string[]    // List of missing data
    // }
  }

  /**
   * Calculate report card average from all semesters
   * @param {Array} grades - Array of semester grade objects
   * @returns {number} Average score 0-100
   */
  calculateReportCardAverage(grades) {}

  /**
   * Normalize TKA score from 0-800 to 0-100 scale
   * @param {number} tkaScore - Raw TKA score
   * @returns {number} Normalized score 0-100
   */
  normalizeTKAScore(tkaScore) {}

  /**
   * Calculate grade consistency across semesters
   * @param {Array} grades - Array of semester grade objects
   * @returns {number} Consistency score 0-100
   */
  calculateConsistencyScore(grades) {}

  /**
   * Calculate achievement score from competitions and activities
   * @param {Array} achievements - Array of achievement objects
   * @returns {number} Achievement score 0-100
   */
  calculateAchievementScore(achievements) {}

  /**
   * Adjust weights when components are missing
   * @param {Object} availableComponents - Which components have data
   * @returns {Object} Adjusted weights that sum to 100%
   */
  adjustWeights(availableComponents) {}
}
```

**Algorithm Details**:

1. **Report Card Average (40% weight)**:
   ```
   - Sum all subject grades across all semesters
   - Exclude non-academic subjects (PE, Arts)
   - Calculate average
   - Normalize to 0-100 scale
   ```

2. **TKA Score (30% weight)**:
   ```
   - Take raw TKA score (0-800)
   - Normalize: (tka_score / 800) * 100
   - If missing: redistribute 30% to other components
   ```

3. **Consistency Score (20% weight)**:
   ```
   - Calculate semester averages
   - Calculate standard deviation
   - Convert to consistency score:
     consistency = 100 - (std_dev * 10)
   - Clamp to 0-100 range
   - If only 1 semester: assign 100 (perfect consistency)
   ```

4. **Achievement Score (10% weight)**:
   ```
   - National level: 100 points per achievement
   - Provincial level: 60 points per achievement
   - Regional level: 30 points per achievement
   - School level: 10 points per achievement
   - Sum all points, normalize to 0-100 scale
   - Cap at 100
   - If no achievements: 0 points
   ```

5. **Weight Adjustment**:
   ```
   - If TKA missing: redistribute 30% proportionally
     - Report card: 40% → 57.14%
     - Consistency: 20% → 28.57%
     - Achievement: 10% → 14.29%
   - If Achievement missing: redistribute 10% proportionally
     - Report card: 40% → 44.44%
     - TKA: 30% → 33.33%
     - Consistency: 20% → 22.22%
   ```

### 3. School Ranking Engine



**Purpose**: Calculate student rankings within their school based on SNBP scores.

**Interface**:
```javascript
class SchoolRankingEngine {
  /**
   * Calculate ranking for a student within their school
   * @param {string} studentId - Student ID
   * @param {string} schoolName - School name for grouping
   * @returns {Object} Ranking information
   */
  calculateRanking(studentId, schoolName) {
    // Returns:
    // {
    //   rank: number,                  // Student's rank (1-based)
    //   totalStudents: number,         // Total students in school
    //   percentile: number,            // Percentile (0-100)
    //   rankDisplay: string,           // e.g., "Rank 5 of 120 students"
    //   isTopQuartile: boolean,        // Top 25%
    //   isTopHalf: boolean             // Top 50%
    // }
  }

  /**
   * Get all students from the same school with their SNBP scores
   * @param {string} schoolName - School name
   * @returns {Array} Sorted array of students with scores
   */
  getSchoolStudents(schoolName) {}

  /**
   * Handle tied scores (same rank for equal scores)
   * @param {Array} sortedStudents - Students sorted by score
   * @returns {Array} Students with assigned ranks
   */
  assignRanksWithTies(sortedStudents) {}
}
```

**Algorithm**:
```
1. Fetch all students from the same school
2. Calculate SNBP score for each student
3. Sort students by SNBP score (descending)
4. Assign ranks:
   - Students with equal scores get the same rank
   - Next rank skips the tied positions
   - Example: 1, 2, 2, 4, 5 (two students tied at rank 2)
5. Calculate percentile: ((totalStudents - rank + 1) / totalStudents) * 100
6. Return ranking information
```

### 4. Eligibility Simulator

**Purpose**: Determine SNBP eligibility status and probability based on school quota and ranking.

**Interface**:
```javascript
class EligibilitySimulator {
  /**
   * Simulate SNBP eligibility for a student
   * @param {Object} student - Student record
   * @param {Object} ranking - Ranking information
   * @param {number} snbpScore - Calculated SNBP score
   * @returns {Object} Eligibility simulation results
   */
  simulateEligibility(student, ranking, snbpScore) {
    // Returns:
    // {
    //   status: 'Eligible' | 'Borderline' | 'Not Eligible',
    //   probability: number,           // 0-100 percentage
    //   quota: {
    //     percentage: number,          // School quota percentage
    //     cutoffRank: number,          // Rank cutoff for eligibility
    //     totalEligible: number        // Number of eligible students
    //   },
    //   explanation: string,           // Human-readable explanation
    //   factors: {
    //     withinQuota: boolean,
    //     scoreAboveAverage: boolean,
    //     consistentGrades: boolean,
    //     hasTKA: boolean
    //   }
    // }
  }

  /**
   * Calculate school quota based on accreditation
   * @param {string} accreditation - School accreditation (A, B, C, Unaccredited)
   * @param {number} totalStudents - Total students in school
   * @returns {Object} Quota information
   */
  calculateQuota(accreditation, totalStudents) {}

  /**
   * Calculate probability based on rank and quota
   * @param {number} rank - Student rank
   * @param {number} cutoffRank - Quota cutoff rank
   * @param {number} snbpScore - SNBP score
   * @returns {number} Probability percentage
   */
  calculateProbability(rank, cutoffRank, snbpScore) {}

  /**
   * Determine eligibility status
   * @param {number} rank - Student rank
   * @param {number} cutoffRank - Quota cutoff rank
   * @returns {string} Status: Eligible, Borderline, or Not Eligible
   */
  determineStatus(rank, cutoffRank) {}
}
```

**Algorithm Details**:

1. **Quota Calculation**:
   ```
   Accreditation A: 40% of students
   Accreditation B: 25% of students
   Accreditation C: 5% of students
   Unaccredited: 0% of students
   
   cutoffRank = Math.ceil(totalStudents * quotaPercentage)
   ```

2. **Status Determination**:
   ```
   if (rank <= cutoffRank):
     status = "Eligible"
   else if (rank <= cutoffRank * 1.1):  // Within 10% above cutoff
     status = "Borderline"
   else:
     status = "Not Eligible"
   ```

3. **Probability Calculation**:
   ```
   if (status === "Eligible"):
     // Higher rank within quota = higher probability
     positionInQuota = rank / cutoffRank
     baseProbability = 100 - (positionInQuota * 30)  // 70-100%
     // Adjust based on score
     scoreBonus = (snbpScore - 70) / 30 * 10  // Up to +10%
     probability = Math.min(100, baseProbability + scoreBonus)
   
   else if (status === "Borderline"):
     // 30-60% range
     distanceFromCutoff = (rank - cutoffRank) / cutoffRank
     probability = 60 - (distanceFromCutoff * 300)  // Decreases with distance
     probability = Math.max(30, Math.min(60, probability))
   
   else:
     // Below 30%
     probability = Math.max(5, 30 - ((rank - cutoffRank) / cutoffRank * 50))
   ```

### 5. Strategy Recommender



**Purpose**: Recommend optimal university selection strategy based on SNBP probability and student profile.

**Interface**:
```javascript
class StrategyRecommender {
  /**
   * Recommend selection strategy for a student
   * @param {Object} eligibility - Eligibility simulation results
   * @param {Object} student - Student record
   * @param {Object} ranking - Ranking information
   * @returns {Object} Strategy recommendation
   */
  recommendStrategy(eligibility, student, ranking) {
    // Returns:
    // {
    //   strategy: 'SNBP Only' | 'SNBP + SNBT Backup' | 'SNBT Only' | 'SNBT + Mandiri',
    //   confidence: 'High' | 'Medium' | 'Low',
    //   reasoning: string[],           // Array of reasons for recommendation
    //   actionItems: string[],         // Specific next steps
    //   timeline: {
    //     snbpRegistration: Date,
    //     snbtRegistration: Date,
    //     recommendations: string[]
    //   },
    //   estimatedCost: {
    //     min: number,
    //     max: number,
    //     breakdown: Object
    //   }
    // }
  }

  /**
   * Determine strategy based on probability
   * @param {number} probability - SNBP probability percentage
   * @returns {string} Recommended strategy
   */
  determineStrategy(probability) {}

  /**
   * Generate reasoning for recommendation
   * @param {string} strategy - Recommended strategy
   * @param {Object} eligibility - Eligibility data
   * @param {Object} student - Student data
   * @returns {Array} Array of reasoning strings
   */
  generateReasoning(strategy, eligibility, student) {}

  /**
   * Generate actionable next steps
   * @param {string} strategy - Recommended strategy
   * @returns {Array} Array of action items
   */
  generateActionItems(strategy) {}
}
```

**Strategy Decision Logic**:
```
if (probability > 70%):
  strategy = "SNBP Only"
  reasoning = [
    "Your SNBP probability is very high (>70%)",
    "You rank in the top tier of your school",
    "Your SNBP score is strong across all components",
    "Focus on maintaining grades and preparing TKA"
  ]
  actionItems = [
    "Ensure all documents are ready (NIK, NISN, PDSS)",
    "Practice TKA to maintain your score",
    "Prepare achievement documentation",
    "Research your top 2 major choices carefully"
  ]

else if (probability >= 40% && probability <= 70%):
  strategy = "SNBP + SNBT Backup"
  reasoning = [
    "Your SNBP probability is moderate (40-70%)",
    "You have a good chance but should prepare backup",
    "SNBT preparation won't hurt your SNBP chances",
    "This maximizes your overall admission probability"
  ]
  actionItems = [
    "Register for SNBP and prepare documents",
    "Start UTBK preparation (TPS and Literasi)",
    "Join UTBK practice tests",
    "Keep grades consistent through final semester"
  ]

else if (probability >= 20% && probability < 40%):
  strategy = "SNBT Only"
  reasoning = [
    "Your SNBP probability is low (20-40%)",
    "SNBT offers better chances with strong test performance",
    "You can demonstrate ability through standardized testing",
    "SNBT has larger quota (40% vs 20%)"
  ]
  actionItems = [
    "Focus on intensive UTBK preparation",
    "Join bimbel or study groups for UTBK",
    "Take regular practice tests",
    "Identify your strong subjects for major selection"
  ]

else:  // probability < 20%
  strategy = "SNBT + Mandiri"
  reasoning = [
    "Your SNBP probability is very low (<20%)",
    "Multiple pathways increase your chances",
    "Mandiri pathway offers additional opportunities",
    "Focus on test preparation and university research"
  ]
  actionItems = [
    "Prepare intensively for UTBK",
    "Research mandiri requirements for target universities",
    "Save budget for UTBK and mandiri fees",
    "Consider universities with strong mandiri programs"
  ]
```

### 6. Province Rule Validator

**Purpose**: Validate major selections against SNBP province rules.

**Interface**:
```javascript
class ProvinceRuleValidator {
  /**
   * Validate major selections against province rules
   * @param {Array} selectedMajors - Array of selected major objects
   * @param {string} studentProvince - Student's school province
   * @returns {Object} Validation result
   */
  validateSelection(selectedMajors, studentProvince) {
    // Returns:
    // {
    //   isValid: boolean,
    //   violations: string[],          // Array of rule violations
    //   warnings: string[],            // Array of warnings
    //   suggestions: string[]          // Array of suggestions
    // }
  }

  /**
   * Check if at least one major is in same province
   * @param {Array} selectedMajors - Selected majors
   * @param {string} studentProvince - Student's province
   * @returns {boolean} True if rule is satisfied
   */
  checkProvinceRule(selectedMajors, studentProvince) {}

  /**
   * Get PTN province from major selection
   * @param {Object} major - Major object
   * @returns {string} Province name
   */
  getMajorProvince(major) {}
}
```

**Validation Rules**:
```
Rule 1: If selecting 2 majors
  - At least 1 major must be in same province as student's school
  - Violation message: "When selecting 2 majors, at least one must be in [province]"

Rule 2: If selecting 1 major
  - Any province is allowed
  - No validation needed

Rule 3: Maximum 2 majors
  - Cannot select more than 2 majors
  - Violation message: "Maximum 2 major selections allowed for SNBP"
```

## Data Models

### SNBP Calculation Result

```javascript
interface SNBPCalculationResult {
  snbpScore: {
    total: number,                    // 0-100
    components: {
      reportCard: {
        raw: number,
        weighted: number,
        weight: number
      },
      tka: {
        raw: number,
        weighted: number,
        weight: number
      },
      consistency: {
        raw: number,
        weighted: number,
        weight: number
      },
      achievement: {
        raw: number,
        weighted: number,
        weight: number
      }
    },
    missingComponents: string[]
  },
  ranking: {
    rank: number,
    totalStudents: number,
    percentile: number,
    rankDisplay: string
  },
  eligibility: {
    status: 'Eligible' | 'Borderline' | 'Not Eligible',
    probability: number,
    quota: {
      percentage: number,
      cutoffRank: number,
      totalEligible: number
    },
    explanation: string
  },
  strategy: {
    recommended: string,
    confidence: string,
    reasoning: string[],
    actionItems: string[]
  }
}
```

### Dashboard Data Model

```javascript
interface SNBPDashboardData {
  student: {
    id: string,
    nama: string,
    school: string,
    province: string
  },
  eligibilityStatus: {
    status: string,
    probability: number,
    statusColor: string,            // 'green', 'yellow', 'red'
    statusIcon: string
  },
  scoreBreakdown: {
    total: number,
    components: Array<{
      name: string,
      score: number,
      weight: number,
      color: string
    }>
  },
  ranking: {
    rank: number,
    total: number,
    percentile: number,
    schoolAverage: number
  },
  strategy: {
    recommended: string,
    reasoning: string[],
    actionItems: string[]
  },
  timeline: Array<{
    date: Date,
    event: string,
    status: 'upcoming' | 'current' | 'completed',
    daysRemaining: number
  }>,
  checklist: Array<{
    item: string,
    completed: boolean,
    required: boolean,
    actionLink: string
  }>
}
```



## API Endpoints

### 1. Update TKA Score

**Endpoint**: `POST /api/students/:id/tka`

**Request Body**:
```javascript
{
  tka_score: number  // 0-800
}
```

**Response**:
```javascript
{
  success: boolean,
  message: string,
  student: {
    id: string,
    tka_score: number,
    snbp_score: number  // Recalculated
  }
}
```

**Validation**:
- TKA score must be numeric
- TKA score must be between 0 and 800
- Student must exist
- User must be authenticated
- Student can only update their own TKA (or admin can update any)

### 2. Get SNBP Simulation

**Endpoint**: `GET /api/students/:id/snbp-simulation`

**Response**:
```javascript
{
  success: boolean,
  data: {
    snbpScore: number,
    scoreBreakdown: {
      reportCard: { raw: number, weighted: number, weight: number },
      tka: { raw: number, weighted: number, weight: number },
      consistency: { raw: number, weighted: number, weight: number },
      achievement: { raw: number, weighted: number, weight: number }
    },
    ranking: {
      rank: number,
      totalStudents: number,
      percentile: number,
      rankDisplay: string
    },
    eligibility: {
      status: string,
      probability: number,
      quota: Object,
      explanation: string
    },
    missingData: string[]  // List of missing required data
  }
}
```

### 3. Get Strategy Recommendation

**Endpoint**: `GET /api/students/:id/strategy-recommendation`

**Response**:
```javascript
{
  success: boolean,
  data: {
    strategy: string,
    confidence: string,
    reasoning: string[],
    actionItems: string[],
    timeline: {
      snbpRegistration: string,
      snbtRegistration: string,
      recommendations: string[]
    },
    estimatedCost: {
      min: number,
      max: number,
      breakdown: Object
    }
  }
}
```

### 4. Get PTN by Province

**Endpoint**: `GET /api/ptn?province={province}`

**Query Parameters**:
- `province` (optional): Filter by province name
- `region` (optional): Filter by region (existing parameter)

**Response**:
```javascript
{
  success: boolean,
  data: Array<{
    id: number,
    name: string,
    acronym: string,
    location: string,
    region: string,
    province: string,
    accreditation: string,
    isInStudentProvince: boolean  // If student context available
  }>,
  total: number
}
```

### 5. Get SNBP Dashboard

**Endpoint**: `GET /api/students/:id/snbp-dashboard`

**Response**:
```javascript
{
  success: boolean,
  data: {
    student: Object,
    eligibilityStatus: Object,
    scoreBreakdown: Object,
    ranking: Object,
    strategy: Object,
    timeline: Array,
    checklist: Array
  }
}
```

### 6. Update School Information

**Endpoint**: `PUT /api/students/:id/school`

**Request Body**:
```javascript
{
  school_name: string,
  school_accreditation: 'A' | 'B' | 'C' | 'Unaccredited',
  school_province: string,
  school_npsn: string | null
}
```

**Response**:
```javascript
{
  success: boolean,
  message: string,
  student: Object
}
```

### 7. Excel Upload Enhancement

**Endpoint**: `POST /api/upload` (existing, enhanced)

**Enhanced Excel Format**:
```
Columns:
- NAMA (existing)
- NISN (existing)
- Kelas (existing)
- [Subject columns] (existing)
- TKA (new, optional)
- School_Name (new, optional)
- Accreditation (new, optional)
- Province (new, optional)
- NPSN (new, optional)
```

**Response** (enhanced):
```javascript
{
  success: boolean,
  message: string,
  totalStudents: number,
  columns: string[],
  snbpDataImported: {
    tkaCount: number,
    schoolInfoCount: number
  },
  errors: Array<{
    row: number,
    column: string,
    error: string
  }>
}
```

### 8. Export SNBP Report

**Endpoint**: `GET /api/admin/snbp-report?school={schoolName}`

**Query Parameters**:
- `school` (optional): Filter by school name
- `format`: 'excel' | 'pdf' (default: 'excel')

**Response**: File download (Excel or PDF)

**Excel Columns**:
- Nama
- NISN
- Kelas
- School
- SNBP Score
- Ranking
- Eligibility Status
- Probability
- Recommended Strategy

## Frontend Components

### 1. TKA Input Component

**Location**: Student profile page, grade input form

**UI Elements**:
- Number input field (0-800 range)
- Validation indicator
- Help text explaining TKA
- Save button

**Behavior**:
- Real-time validation
- Auto-save on blur
- Trigger SNBP recalculation on save
- Show success/error message

### 2. School Information Form

**Location**: Admin student management, student profile

**UI Elements**:
- School name text input
- Accreditation dropdown (A, B, C, Unaccredited)
- Province dropdown (Indonesian provinces)
- NPSN text input (optional)
- Save button

**Behavior**:
- Validate all required fields
- Province dropdown with search
- Auto-save functionality
- Update all related students if school info changes

### 3. SNBP Simulation Card

**Location**: Student dashboard, analysis page

**UI Elements**:
- SNBP score gauge (0-100)
- Eligibility status badge
- Probability percentage
- Ranking display
- "View Details" button

**Behavior**:
- Auto-refresh when data changes
- Animated gauge chart
- Color-coded status (green/yellow/red)
- Click to expand full simulation

### 4. Strategy Recommendation Card

**Location**: Student dashboard

**UI Elements**:
- Strategy title (large, prominent)
- Confidence indicator
- Reasoning list
- Action items checklist
- Timeline preview
- Cost estimate

**Behavior**:
- Expandable sections
- Checkable action items
- Link to detailed strategy page

### 5. Province Filter Component

**Location**: PTN list page, major selection page

**UI Elements**:
- Province dropdown
- "Show all" option
- Province badge on PTN cards
- "In your province" indicator

**Behavior**:
- Filter PTN list on selection
- Highlight same-province PTN
- Show count of PTN per province

### 6. SNBP Dashboard Page

**Layout**:
```
┌─────────────────────────────────────────────────────┐
│  SNBP Dashboard - [Student Name]                    │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────────┐  ┌──────────────────┐        │
│  │ Eligibility      │  │ SNBP Score       │        │
│  │ Status: Eligible │  │ Gauge Chart      │        │
│  │ Probability: 85% │  │ 87.5 / 100       │        │
│  └──────────────────┘  └──────────────────┘        │
│                                                      │
│  ┌──────────────────────────────────────────┐      │
│  │ Score Breakdown (Bar Chart)              │      │
│  │ Report Card: ████████ 40%                │      │
│  │ TKA:         ██████   30%                │      │
│  │ Consistency: ████     20%                │      │
│  │ Achievement: ██       10%                │      │
│  └──────────────────────────────────────────┘      │
│                                                      │
│  ┌──────────────────┐  ┌──────────────────┐        │
│  │ School Ranking   │  │ Strategy         │        │
│  │ Rank 12 of 150   │  │ SNBP + SNBT      │        │
│  │ Top 8%           │  │ Backup           │        │
│  └──────────────────┘  └──────────────────┘        │
│                                                      │
│  ┌──────────────────────────────────────────┐      │
│  │ Timeline                                  │      │
│  │ ● SNBP Registration (15 days)             │      │
│  │ ○ Document Submission                     │      │
│  │ ○ Announcement                            │      │
│  └──────────────────────────────────────────┘      │
│                                                      │
│  ┌──────────────────────────────────────────┐      │
│  │ Requirements Checklist (80% complete)     │      │
│  │ ✓ NIK                                     │      │
│  │ ✓ NISN                                    │      │
│  │ ✓ Grade Data                              │      │
│  │ ✓ TKA Score                               │      │
│  │ ✗ PDSS Verification                       │      │
│  │ ✗ Achievement Documentation               │      │
│  └──────────────────────────────────────────┘      │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Components**:
- Eligibility status card (prominent, color-coded)
- SNBP score gauge chart (animated)
- Score breakdown bar chart
- Ranking comparison card
- Strategy recommendation card
- Timeline tracker (with progress indicators)
- Requirements checklist (with completion percentage)

**Behavior**:
- Real-time updates
- Responsive layout (mobile-friendly)
- Printable view
- Export to PDF option

