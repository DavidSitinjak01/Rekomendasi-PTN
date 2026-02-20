# Requirements Document: SNBP 2026 Integration

## Introduction

This document specifies the requirements for integrating SNBP (Seleksi Nasional Berdasarkan Prestasi) 2026 features into the existing PTN recommendation system. SNBP is Indonesia's national university selection pathway based on academic achievement, where students are selected based on their high school performance, standardized test scores, and school ranking.

The system will enable students to:
- Input their TKA (Tes Kemampuan Akademik) scores
- Simulate their SNBP eligibility and probability
- Receive strategic recommendations for university selection pathways
- Filter PTN options based on SNBP province rules
- Track their SNBP readiness through a comprehensive dashboard

## Glossary

- **SNBP**: Seleksi Nasional Berdasarkan Prestasi - National selection based on academic achievement
- **TKA**: Tes Kemampuan Akademik - Academic ability test (standardized test, score range 0-800)
- **SNBT**: Seleksi Nasional Berdasarkan Tes - National selection based on test scores
- **PTN**: Perguruan Tinggi Negeri - State university
- **NISN**: Nomor Induk Siswa Nasional - National student identification number
- **NPSN**: Nomor Pokok Sekolah Nasional - National school identification number
- **PDSS**: Pangkalan Data Sekolah dan Siswa - School and student database
- **System**: The PTN recommendation web application
- **Student**: A high school student using the system
- **Admin**: A school administrator or teacher managing student data
- **School_Ranking**: Student's position within their school based on SNBP score
- **SNBP_Score**: Calculated score based on report card average, TKA, consistency, and achievements
- **Eligibility_Status**: Student's SNBP qualification status (Eligible, Borderline, Not Eligible)
- **Strategy**: Recommended university selection pathway (SNBP Only, SNBP+SNBT, SNBT Only, SNBT+Mandiri)
- **Province_Rule**: SNBP regulation requiring at least one major selection in the same province as student's school when selecting 2 majors
- **School_Quota**: Percentage of students eligible for SNBP based on school accreditation

## Requirements

### Requirement 1: TKA Score Input and Management

**User Story:** As a student, I want to input my TKA score, so that the system can calculate my SNBP eligibility accurately.

#### Acceptance Criteria

1. WHEN a student accesses their profile, THE System SHALL display a TKA score input field
2. WHEN a student enters a TKA score, THE System SHALL validate that the score is numeric and within the range 0-800
3. WHEN a student submits a valid TKA score, THE System SHALL save the score to the student's profile
4. WHEN a student has not entered a TKA score, THE System SHALL allow the profile to be saved without the TKA score (optional field)
5. WHEN a student updates their TKA score, THE System SHALL recalculate all SNBP-related metrics automatically

### Requirement 2: School Information Management

**User Story:** As an admin, I want to manage school information for students, so that SNBP quota calculations are accurate.

#### Acceptance Criteria

1. WHEN an admin adds or edits student information, THE System SHALL provide fields for school name, accreditation, province, and NPSN
2. WHEN an admin selects school accreditation, THE System SHALL accept only values: A, B, C, or Unaccredited
3. WHEN an admin enters school province, THE System SHALL validate against a list of Indonesian provinces
4. WHEN school information is saved, THE System SHALL associate it with the student record
5. WHEN NPSN is provided, THE System SHALL validate that it is numeric (optional field)

### Requirement 3: Excel Upload Enhancement for TKA and School Data

**User Story:** As an admin, I want to upload Excel files containing TKA scores and school information, so that I can efficiently import bulk student data.

#### Acceptance Criteria

1. WHEN an admin uploads an Excel file, THE System SHALL recognize columns: TKA, School_Name, Accreditation, Province, NPSN
2. WHEN the Excel file contains TKA values, THE System SHALL validate each TKA score is within 0-800 range
3. WHEN the Excel file contains accreditation values, THE System SHALL validate each is A, B, C, or Unaccredited
4. WHEN the Excel file is missing new columns, THE System SHALL process the file successfully (backward compatibility)
5. IF any validation fails, THEN THE System SHALL report the specific row and column with the error
6. WHEN the upload is successful, THE System SHALL import all valid records and report the count of imported students

### Requirement 4: SNBP Score Calculation

**User Story:** As a student, I want the system to calculate my SNBP score, so that I can understand my competitive position.

#### Acceptance Criteria

1. WHEN calculating SNBP score, THE System SHALL weight report card average at 40%
2. WHEN calculating SNBP score, THE System SHALL weight TKA score at 30%
3. WHEN calculating SNBP score, THE System SHALL weight grade consistency at 20%
4. WHEN calculating SNBP score, THE System SHALL weight achievements at 10%
5. WHEN TKA score is not available, THE System SHALL redistribute the 30% weight proportionally to other components
6. WHEN achievements are not available, THE System SHALL redistribute the 10% weight proportionally to other components
7. THE System SHALL normalize the final SNBP score to a 0-100 scale

### Requirement 5: School Ranking Calculation

**User Story:** As a student, I want to see my ranking within my school, so that I can assess my SNBP eligibility.

#### Acceptance Criteria

1. WHEN calculating school ranking, THE System SHALL compare SNBP scores of all students from the same school
2. WHEN students have equal SNBP scores, THE System SHALL assign them the same rank
3. THE System SHALL display the student's rank as "Rank X of Y students"
4. WHEN a student's SNBP score changes, THE System SHALL recalculate rankings for all students in that school
5. WHEN a school has only one student, THE System SHALL display "Rank 1 of 1 student"

### Requirement 6: SNBP Quota Determination

**User Story:** As a student, I want to know my school's SNBP quota, so that I can understand the eligibility threshold.

#### Acceptance Criteria

1. WHEN school accreditation is A, THE System SHALL set SNBP quota to 40% of students
2. WHEN school accreditation is B, THE System SHALL set SNBP quota to 25% of students
3. WHEN school accreditation is C, THE System SHALL set SNBP quota to 5% of students
4. WHEN school accreditation is Unaccredited, THE System SHALL set SNBP quota to 0% of students
5. THE System SHALL calculate the quota cutoff rank based on total students in the school
6. THE System SHALL display the quota as "Top X students eligible" where X is the calculated number

### Requirement 7: SNBP Eligibility Status Determination

**User Story:** As a student, I want to see my SNBP eligibility status, so that I know if I qualify for SNBP pathway.

#### Acceptance Criteria

1. WHEN a student's rank is within the school quota, THE System SHALL set eligibility status to "Eligible"
2. WHEN a student's rank is within 10% above the quota cutoff, THE System SHALL set eligibility status to "Borderline"
3. WHEN a student's rank is beyond the borderline threshold, THE System SHALL set eligibility status to "Not Eligible"
4. THE System SHALL display the eligibility status with appropriate visual indicators (color coding)
5. WHEN eligibility status is Borderline, THE System SHALL display a message explaining the uncertainty

### Requirement 8: SNBP Probability Calculation

**User Story:** As a student, I want to see my SNBP acceptance probability, so that I can make informed decisions about my application strategy.

#### Acceptance Criteria

1. WHEN a student is Eligible, THE System SHALL calculate probability based on rank position within quota (higher rank = higher probability)
2. WHEN a student is Borderline, THE System SHALL calculate probability between 30-60%
3. WHEN a student is Not Eligible, THE System SHALL set probability to less than 30%
4. THE System SHALL display probability as a percentage with one decimal place
5. THE System SHALL provide a brief explanation of how the probability was calculated

### Requirement 9: Strategy Recommendation Engine

**User Story:** As a student, I want to receive a recommended selection strategy, so that I can optimize my chances of university admission.

#### Acceptance Criteria

1. WHEN SNBP probability is above 70%, THE System SHALL recommend "SNBP Only" strategy
2. WHEN SNBP probability is between 40-70%, THE System SHALL recommend "SNBP + SNBT Backup" strategy
3. WHEN SNBP probability is between 20-40%, THE System SHALL recommend "SNBT Only" strategy
4. WHEN SNBP probability is below 20%, THE System SHALL recommend "SNBT + Mandiri" strategy
5. THE System SHALL provide reasoning for the recommendation including key factors considered
6. WHEN student data changes, THE System SHALL automatically update the strategy recommendation

### Requirement 10: Province-Based PTN Filtering

**User Story:** As a student, I want to filter PTN by province, so that I can find universities that match SNBP location requirements.

#### Acceptance Criteria

1. WHEN viewing the PTN list, THE System SHALL provide a province filter dropdown
2. WHEN a province is selected, THE System SHALL display only PTN located in that province
3. WHEN "All Provinces" is selected, THE System SHALL display all PTN
4. THE System SHALL display the province information for each PTN in the list
5. WHEN a student's school province is known, THE System SHALL highlight PTN in the same province

### Requirement 11: SNBP Province Rule Validation

**User Story:** As a student, I want the system to validate SNBP province rules, so that my major selections comply with SNBP regulations.

#### Acceptance Criteria

1. WHEN a student selects 2 majors, THE System SHALL validate that at least one major is in the same province as the student's school
2. WHEN a student selects 1 major, THE System SHALL allow any province
3. IF the province rule is violated, THEN THE System SHALL display a warning message explaining the rule
4. THE System SHALL prevent submission of major selections that violate the province rule
5. WHEN displaying major selection options, THE System SHALL indicate which majors satisfy the province requirement

### Requirement 12: SNBP Dashboard Overview

**User Story:** As a student, I want to view a comprehensive SNBP dashboard, so that I can track all aspects of my SNBP readiness in one place.

#### Acceptance Criteria

1. WHEN a student accesses the SNBP dashboard, THE System SHALL display their current eligibility status prominently
2. THE System SHALL display the SNBP score breakdown showing all four components (report card, TKA, consistency, achievements)
3. THE System SHALL display the student's school ranking position
4. THE System SHALL display the recommended strategy with reasoning
5. THE System SHALL display a timeline of SNBP 2026 important dates
6. THE System SHALL display a checklist of SNBP requirements (NIK, NISN, PDSS, TKA, etc.) with completion status

### Requirement 13: SNBP Score Visualization

**User Story:** As a student, I want to see visual representations of my SNBP metrics, so that I can quickly understand my performance.

#### Acceptance Criteria

1. THE System SHALL display a gauge chart showing the SNBP score from 0-100
2. THE System SHALL display a bar chart comparing the student's score to the school average
3. THE System SHALL use color coding: green for good performance, yellow for moderate, red for needs improvement
4. WHEN hovering over chart elements, THE System SHALL display detailed tooltips with exact values
5. THE System SHALL ensure all charts are responsive and readable on mobile devices

### Requirement 14: SNBP Timeline Tracker

**User Story:** As a student, I want to see SNBP 2026 important dates, so that I don't miss critical deadlines.

#### Acceptance Criteria

1. THE System SHALL display a timeline showing key SNBP 2026 dates: registration, document submission, announcement
2. THE System SHALL highlight the current phase in the timeline
3. WHEN a deadline is approaching (within 7 days), THE System SHALL display a warning indicator
4. WHEN a deadline has passed, THE System SHALL mark it as completed
5. THE System SHALL display the number of days remaining until the next deadline

### Requirement 15: SNBP Requirements Checklist

**User Story:** As a student, I want to track my SNBP requirements completion, so that I ensure I have everything ready for application.

#### Acceptance Criteria

1. THE System SHALL display a checklist including: NIK, NISN, PDSS verification, TKA score, school data, grade data
2. WHEN a requirement is completed, THE System SHALL mark it with a checkmark
3. WHEN a requirement is incomplete, THE System SHALL display it as unchecked with a link to complete it
4. THE System SHALL calculate and display the overall completion percentage
5. WHEN all requirements are complete, THE System SHALL display a success message

### Requirement 16: Grade Consistency Calculation

**User Story:** As a student, I want the system to calculate my grade consistency, so that it contributes accurately to my SNBP score.

#### Acceptance Criteria

1. WHEN calculating grade consistency, THE System SHALL compare semester averages across all available semesters
2. THE System SHALL calculate the standard deviation of semester averages
3. THE System SHALL convert standard deviation to a consistency score: lower deviation = higher consistency score
4. WHEN a student has only one semester of grades, THE System SHALL assign maximum consistency score
5. THE System SHALL normalize the consistency score to a 0-100 scale

### Requirement 17: Achievement Score Calculation

**User Story:** As a student, I want my achievements to contribute to my SNBP score, so that my extracurricular accomplishments are recognized.

#### Acceptance Criteria

1. WHEN calculating achievement score, THE System SHALL consider competition awards, certifications, and leadership positions
2. THE System SHALL weight national-level achievements higher than regional or school-level
3. WHEN no achievements are recorded, THE System SHALL assign a score of 0 for the achievement component
4. THE System SHALL normalize the achievement score to a 0-100 scale
5. THE System SHALL display which achievements contributed to the score

### Requirement 18: API Endpoint for TKA Update

**User Story:** As a developer, I want a dedicated API endpoint for TKA updates, so that the frontend can update TKA scores efficiently.

#### Acceptance Criteria

1. THE System SHALL provide a POST endpoint at /api/students/:id/tka
2. WHEN the endpoint receives a valid TKA score, THE System SHALL update the student record
3. WHEN the endpoint receives an invalid TKA score, THE System SHALL return a 400 error with validation message
4. THE System SHALL require authentication for this endpoint
5. THE System SHALL return the updated student data including recalculated SNBP metrics

### Requirement 19: API Endpoint for SNBP Simulation

**User Story:** As a developer, I want a dedicated API endpoint for SNBP simulation, so that the frontend can retrieve eligibility data.

#### Acceptance Criteria

1. THE System SHALL provide a GET endpoint at /api/students/:id/snbp-simulation
2. THE System SHALL return SNBP score, school ranking, eligibility status, and probability
3. THE System SHALL require authentication for this endpoint
4. WHEN the student lacks required data, THE System SHALL return partial results with indicators of missing data
5. THE System SHALL return the response within 500ms for performance

### Requirement 20: API Endpoint for Strategy Recommendation

**User Story:** As a developer, I want a dedicated API endpoint for strategy recommendations, so that the frontend can display strategic guidance.

#### Acceptance Criteria

1. THE System SHALL provide a GET endpoint at /api/students/:id/strategy-recommendation
2. THE System SHALL return the recommended strategy, reasoning, and key factors
3. THE System SHALL require authentication for this endpoint
4. THE System SHALL include actionable next steps in the response
5. THE System SHALL return the response within 500ms for performance

### Requirement 21: API Endpoint for Province-Filtered PTN

**User Story:** As a developer, I want to filter PTN by province via API, so that the frontend can display location-specific options.

#### Acceptance Criteria

1. THE System SHALL enhance the existing /api/ptn endpoint to accept a province query parameter
2. WHEN province parameter is provided, THE System SHALL return only PTN in that province
3. WHEN province parameter is omitted, THE System SHALL return all PTN
4. THE System SHALL return province information for each PTN in the response
5. THE System SHALL require authentication for this endpoint

### Requirement 22: API Endpoint for SNBP Dashboard Data

**User Story:** As a developer, I want a dedicated API endpoint for dashboard data, so that the frontend can load all SNBP metrics efficiently.

#### Acceptance Criteria

1. THE System SHALL provide a GET endpoint at /api/students/:id/snbp-dashboard
2. THE System SHALL return all dashboard components in a single response: eligibility, score breakdown, ranking, strategy, timeline, checklist
3. THE System SHALL require authentication for this endpoint
4. THE System SHALL optimize the query to minimize database calls
5. THE System SHALL return the response within 1 second for performance

### Requirement 23: Database Schema Extension

**User Story:** As a developer, I want the database schema to support SNBP data, so that all new information can be persisted.

#### Acceptance Criteria

1. THE System SHALL add tka_score field to student records (integer, nullable)
2. THE System SHALL add school_name field to student records (string, required)
3. THE System SHALL add school_accreditation field to student records (enum: A, B, C, Unaccredited)
4. THE System SHALL add school_province field to student records (string, required)
5. THE System SHALL add school_npsn field to student records (string, nullable)
6. THE System SHALL add province field to PTN records (string, required)
7. THE System SHALL maintain backward compatibility with existing data

### Requirement 24: Report Card Average Calculation

**User Story:** As a student, I want my report card average calculated correctly, so that it contributes accurately to my SNBP score.

#### Acceptance Criteria

1. WHEN calculating report card average, THE System SHALL use grades from all available semesters
2. THE System SHALL weight all semesters equally in the average calculation
3. THE System SHALL exclude non-academic subjects from the calculation (e.g., Physical Education)
4. THE System SHALL normalize the report card average to a 0-100 scale
5. WHEN a student has no grade data, THE System SHALL return 0 for the report card component

### Requirement 25: Mobile Responsiveness for SNBP Features

**User Story:** As a student, I want to access SNBP features on my mobile device, so that I can check my status anywhere.

#### Acceptance Criteria

1. WHEN accessing the SNBP dashboard on mobile, THE System SHALL display all components in a single-column layout
2. THE System SHALL ensure all charts are readable on screens as small as 320px wide
3. THE System SHALL ensure all interactive elements have touch targets of at least 44x44 pixels
4. THE System SHALL load the mobile dashboard within 3 seconds on 3G connection
5. THE System SHALL maintain all functionality available on desktop

### Requirement 26: Error Handling for Missing School Data

**User Story:** As a student, I want clear guidance when school data is missing, so that I know what information to provide.

#### Acceptance Criteria

1. WHEN school information is incomplete, THE System SHALL display a prominent message indicating missing fields
2. THE System SHALL provide a direct link to update school information
3. WHEN attempting to view SNBP simulation without school data, THE System SHALL display an informative error message
4. THE System SHALL list specifically which school fields are required: name, accreditation, province
5. THE System SHALL allow students to continue using other features while school data is incomplete

### Requirement 27: Data Export for SNBP Reports

**User Story:** As an admin, I want to export SNBP data for all students, so that I can share reports with school management.

#### Acceptance Criteria

1. THE System SHALL provide an export function for SNBP data in Excel format
2. THE System SHALL include columns: student name, NISN, SNBP score, ranking, eligibility status, probability, strategy
3. THE System SHALL sort the export by school ranking (highest to lowest)
4. THE System SHALL include school information in the export header
5. THE System SHALL generate the export file within 5 seconds for up to 500 students

### Requirement 28: SNBP Score Component Breakdown Display

**User Story:** As a student, I want to see how each component contributes to my SNBP score, so that I understand where to focus my efforts.

#### Acceptance Criteria

1. THE System SHALL display each SNBP component with its weight percentage
2. THE System SHALL display the raw score and weighted score for each component
3. THE System SHALL highlight the component with the lowest contribution
4. THE System SHALL provide suggestions for improving the weakest component
5. THE System SHALL update the breakdown display in real-time when data changes
