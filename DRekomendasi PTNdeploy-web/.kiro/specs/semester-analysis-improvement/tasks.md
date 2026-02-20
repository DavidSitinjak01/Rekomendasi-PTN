# Implementation Plan: Semester Analysis Improvement

## Overview

This implementation plan addresses the Excel upload bug and adds progressive analysis features to the PTN Major Recommendation System. The approach is to first fix the data storage bug, then implement the progressive analysis engine, and finally add the adaptive UI components.

## Tasks

- [ ] 1. Database Schema Updates and Migration
  - Create new `excel_reference` table for admin-only Excel data
  - Add `input_source` field to `grades` table
  - Create `recommendation_history` table for tracking changes
  - Write migration script to move existing semester 6 data to excel_reference
  - _Requirements: 1.1, 1.2, 13.1, 13.2, 13.3_

- [ ] 2. Fix Excel Upload Bug
  - [ ] 2.1 Implement ExcelReferenceService class
    - Create methods: importExcelData, getExcelReference, getAllExcelReferences, deleteExcelReference
    - Store Excel data in excel_reference table without creating grades entries
    - _Requirements: 1.1, 1.2_
  
  - [ ]* 2.2 Write property test for Excel import isolation
    - **Property 1: Excel Import Isolation**
    - **Validates: Requirements 1.1, 1.2, 1.3**
  
  - [ ] 2.3 Update server.js Excel upload endpoint
    - Modify /api/upload to use ExcelReferenceService instead of direct grade storage
    - Remove semester 6 hardcoding from database.js importFromExcel
    - _Requirements: 1.1, 1.4_
  
  - [ ]* 2.4 Write unit tests for Excel upload endpoint
    - Test Excel upload creates reference data only
    - Test student profile data is preserved
    - _Requirements: 1.1, 1.4, 1.5_

- [ ] 3. Implement Grade Storage Service
  - [ ] 3.1 Create GradeStorageService class
    - Implement saveGrade with semester validation (1-6)
    - Implement getGrade, getAllGrades, updateGrade, getSemesterCount
    - Add input_source tracking ('manual' | 'migrated')
    - _Requirements: 2.1, 2.2, 2.4, 2.5_
  
  - [ ]* 3.2 Write property test for semester storage correctness
    - **Property 2: Semester Storage Correctness**
    - **Validates: Requirements 2.1, 2.2, 2.3, 2.4**
  
  - [ ]* 3.3 Write unit tests for grade validation
    - Test semester range validation (1-6)
    - Test grade value validation (0-100)
    - Test decimal precision (max 2 places)
    - _Requirements: 2.5, 12.1, 12.2, 12.3_

- [ ] 4. Checkpoint - Ensure data storage tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Implement Progressive Analyzer
  - [ ] 5.1 Create ProgressiveAnalyzer class
    - Implement calculateConfidenceLevel method with tier logic
    - Implement getAnalysisStatus method (Awal/Berkembang/Lengkap)
    - Implement getAdaptiveMessage method with contextual messages
    - _Requirements: 3.2, 3.3, 3.4, 3.5, 4.1, 4.2, 4.3, 5.1, 5.2, 5.3_
  
  - [ ]* 5.2 Write property test for confidence level boundaries
    - **Property 3: Confidence Level Boundaries**
    - **Validates: Requirements 3.2, 3.3, 3.4, 3.5**
  
  - [ ]* 5.3 Write property test for status badge consistency
    - **Property 5: Status Badge Consistency**
    - **Validates: Requirements 4.1, 4.2, 4.3**
  
  - [ ]* 5.4 Write property test for adaptive message mapping
    - **Property 6: Adaptive Message Mapping**
    - **Validates: Requirements 5.1, 5.2, 5.3**

- [ ] 6. Implement Weighted Average Calculator
  - [ ] 6.1 Create WeightedAverageCalculator class
    - Implement getWeightForSemester (1.0 + (S-1) * 0.1)
    - Implement calculateWeightedAverage for overall grades
    - Implement calculateSubjectWeightedAverage for individual subjects
    - _Requirements: 8.1, 8.2, 8.3, 8.4_
  
  - [ ]* 6.2 Write property test for weighted average monotonicity
    - **Property 8: Weighted Average Monotonicity**
    - **Validates: Requirements 8.2**
  
  - [ ]* 6.3 Write property test for weighted average calculation
    - **Property 9: Weighted Average Calculation**
    - **Validates: Requirements 8.1, 8.3, 8.4**
  
  - [ ]* 6.4 Write unit tests for weight calculation
    - Test weight formula for each semester (1-6)
    - Test single semester case (no weighting)
    - _Requirements: 8.2, 8.5_

- [ ] 7. Implement Consistency Score Calculator
  - [ ] 7.1 Create ConsistencyScoreCalculator class
    - Implement calculateSubjectStandardDeviation method
    - Implement getConsistencyLevel method with tier logic
    - Implement calculateConsistencyScore for overall analysis
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_
  
  - [ ]* 7.2 Write property test for consistency score boundaries
    - **Property 10: Consistency Score Boundaries**
    - **Validates: Requirements 9.3, 9.4, 9.5**
  
  - [ ]* 7.3 Write unit tests for standard deviation calculation
    - Test with known data sets
    - Test with single semester (should return 0)
    - Test with highly variable data
    - _Requirements: 9.2_

- [ ] 8. Checkpoint - Ensure calculation engines pass tests
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Implement Adaptive Recommendation Engine
  - [ ] 9.1 Create AdaptiveRecommendationEngine class
    - Implement generateRecommendations with progressive logic
    - Implement calculateMatchScore using weighted averages
    - Implement getRecommendationThreshold based on semester count
    - Implement trackRecommendationChanges for history
    - Implement getMatchScoreTrend for trend calculation
    - _Requirements: 3.1, 10.1, 10.2, 14.1, 14.3, 14.4, 14.5_
  
  - [ ]* 9.2 Write property test for minimum data recommendation
    - **Property 4: Minimum Data Recommendation**
    - **Validates: Requirements 3.1, 14.2**
  
  - [ ]* 9.3 Write property test for recommendation recalculation
    - **Property 11: Recommendation Recalculation**
    - **Validates: Requirements 10.1**
  
  - [ ]* 9.4 Write property test for trend direction correctness
    - **Property 12: Trend Direction Correctness**
    - **Validates: Requirements 10.3, 10.4, 10.5**
  
  - [ ]* 9.5 Write property test for threshold adaptation
    - **Property 16: Threshold Adaptation**
    - **Validates: Requirements 14.5**
  
  - [ ]* 9.6 Write unit tests for match score calculation
    - Test with complete data (6 semesters)
    - Test with minimal data (1 semester)
    - Test with no matching subjects
    - _Requirements: 3.1, 14.1_

- [ ] 10. Update Server API Endpoints
  - [ ] 10.1 Modify /api/students/:id/analysis endpoint
    - Integrate ProgressiveAnalyzer for confidence calculation
    - Add consistency score to analysis result
    - Add semester count and analysis status
    - _Requirements: 3.1, 3.2, 3.6, 9.6_
  
  - [ ] 10.2 Modify /api/students/:id/recommendations endpoint
    - Use AdaptiveRecommendationEngine instead of old logic
    - Include confidence level in each recommendation
    - Include trend data from recommendation history
    - Lower threshold for minimal data cases
    - _Requirements: 3.1, 10.1, 10.3, 10.4, 10.5, 10.6, 14.2, 14.5_
  
  - [ ] 10.3 Create /api/admin/excel-reference endpoint
    - Implement GET endpoint for admin to view Excel reference data
    - Add authorization check (admin only)
    - Display warning that data is reference only
    - _Requirements: 11.1, 11.2, 11.3, 11.4_
  
  - [ ]* 10.4 Write property test for admin-student data isolation
    - **Property 15: Admin-Student Data Isolation**
    - **Validates: Requirements 11.5**
  
  - [ ]* 10.5 Write unit tests for authorization
    - Test student cannot access other student data
    - Test student cannot access admin endpoints
    - Test admin can access all data
    - _Requirements: 11.5_

- [ ] 11. Implement UI Renderer Components
  - [ ] 11.1 Create SemesterProgressBar component
    - Render progress bar with X/6 display
    - Calculate percentage correctly
    - Apply color coding (green when complete)
    - _Requirements: 6.1, 6.2, 6.4, 6.5_
  
  - [ ]* 11.2 Write property test for progress calculation accuracy
    - **Property 7: Progress Calculation Accuracy**
    - **Validates: Requirements 6.1, 6.2, 6.3**
  
  - [ ] 11.3 Create AnalysisStatusBadge component
    - Render badge with correct text and color
    - Map semester count to status
    - Add appropriate icon
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
  
  - [ ] 11.4 Create AdaptiveMessageRenderer component
    - Display contextual message based on semester count
    - Add appropriate icon
    - Style according to message type
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_
  
  - [ ] 11.5 Create TrendIconRenderer component
    - Calculate trend from score difference
    - Display appropriate icon (📈/📉/➡️)
    - Show percentage change
    - _Requirements: 10.3, 10.4, 10.5, 10.6_
  
  - [ ]* 11.6 Write unit tests for UI components
    - Test each component renders correctly
    - Test edge cases (0 semesters, 6 semesters)
    - Test trend calculation edge cases
    - _Requirements: 4.1, 5.1, 6.1, 10.3_

- [ ] 12. Update Frontend Pages
  - [ ] 12.1 Update input-grades.html
    - Add SemesterProgressBar component
    - Update form validation for grade range and decimal precision
    - Add real-time validation feedback
    - _Requirements: 6.4, 12.1, 12.2, 12.3, 12.4_
  
  - [ ] 12.2 Update my-recommendations.html
    - Add AnalysisStatusBadge at top of page
    - Add AdaptiveMessageRenderer below badge
    - Add SemesterProgressBar in analysis section
    - Update recommendation cards to show confidence level
    - Add TrendIconRenderer to each recommendation
    - Display consistency score in analysis section
    - Highlight subjects that need improvement
    - _Requirements: 3.6, 4.4, 5.4, 6.4, 7.1, 7.2, 7.3, 7.4, 7.5, 9.6, 9.7_
  
  - [ ] 12.3 Create admin-excel-reference.html page
    - Display Excel reference data in table format
    - Add warning message about reference-only data
    - Add delete functionality for reference entries
    - Restrict access to admin only
    - _Requirements: 11.2, 11.3, 11.4, 11.5_
  
  - [ ]* 12.4 Write integration tests for frontend
    - Test grade input flow with validation
    - Test recommendation display with all new components
    - Test admin Excel reference page access control
    - _Requirements: 11.5, 12.4_

- [ ] 13. Implement Notification System
  - [ ] 13.1 Create notification service
    - Implement toast message display (5 second duration)
    - Store notification history per student
    - Check for milestone achievements (2nd, 4th, 6th semester)
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5_
  
  - [ ] 13.2 Add notification triggers
    - Trigger on semester completion
    - Display appropriate message based on milestone
    - Update notification history
    - _Requirements: 15.1, 15.2, 15.3_
  
  - [ ]* 13.3 Write unit tests for notifications
    - Test milestone detection
    - Test message selection
    - Test notification history storage
    - _Requirements: 15.1, 15.2, 15.3, 15.5_

- [ ] 14. Implement Data Migration Script
  - [ ] 14.1 Create migration script
    - Detect all semester 6 grades with input_source not set
    - Move data to excel_reference table
    - Remove from grades table
    - Create migration log
    - _Requirements: 13.1, 13.2, 13.3, 13.4_
  
  - [ ] 14.2 Add rollback capability
    - Implement rollback function if migration fails
    - Test rollback with sample data
    - _Requirements: 13.4_
  
  - [ ] 14.3 Create admin notification for migration
    - Display migration summary to admin
    - Show number of records migrated
    - _Requirements: 13.5_
  
  - [ ]* 14.4 Write unit tests for migration
    - Test migration with sample data
    - Test rollback functionality
    - Test idempotence (running twice produces same result)
    - _Requirements: 13.1, 13.2, 13.3, 13.4_

- [ ] 15. Checkpoint - Integration testing
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 16. Update Documentation
  - [ ] 16.1 Update API documentation
    - Document new endpoints
    - Document modified endpoints
    - Document new data models
    - _Requirements: All_
  
  - [ ] 16.2 Update user guide
    - Add section on progressive analysis
    - Explain confidence levels
    - Explain how to interpret recommendations with minimal data
    - _Requirements: 3.1, 3.2, 4.1, 5.1_
  
  - [ ] 16.3 Create admin guide for Excel reference
    - Explain Excel upload changes
    - Explain how to view reference data
    - Explain migration process
    - _Requirements: 1.1, 11.2, 13.1_

- [ ] 17. Final checkpoint - End-to-end testing
  - Test complete flow: Excel upload → student registration → grade input → analysis → recommendations
  - Test with various semester counts (1, 3, 6)
  - Test admin and student access controls
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- The implementation follows a bottom-up approach: data layer → business logic → API → UI

