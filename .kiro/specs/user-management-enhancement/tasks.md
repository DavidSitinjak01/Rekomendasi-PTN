# Tasks: User Management Enhancement

## 1. Database Setup & Migration
- [ ] 1.1 Create users table schema in database.js
- [ ] 1.2 Create migration function to copy students to users table
- [ ] 1.3 Create default admin user with hashed password
- [ ] 1.4 Add password hashing utility functions
- [ ] 1.5 Test migration with sample data

## 2. Backend API - User CRUD
- [ ] 2.1 Implement GET /api/admin/users?role=student endpoint
- [ ] 2.2 Implement GET /api/admin/users?role=teacher endpoint
- [ ] 2.3 Implement POST /api/admin/users (create user)
- [ ] 2.4 Implement PUT /api/admin/users/:id (update user)
- [ ] 2.5 Implement DELETE /api/admin/users/:id (delete user)
- [ ] 2.6 Add validation for username uniqueness
- [ ] 2.7 Add validation for password length (min 6 chars)
- [ ] 2.8 Add validation for role (admin/teacher/student)

## 3. Backend API - Password Management
- [ ] 3.1 Implement POST /api/admin/change-password (admin change own password)
- [ ] 3.2 Implement POST /api/admin/reset-user-password/:id (reset user password)
- [ ] 3.3 Add validation for old password (admin change password)
- [ ] 3.4 Add validation for password confirmation match

## 4. Backend API - Authentication Update
- [ ] 4.1 Update login endpoint to use users table
- [ ] 4.2 Update login to verify hashed passwords
- [ ] 4.3 Add role to session data
- [ ] 4.4 Create requireRole middleware for role-based access
- [ ] 4.5 Test login with admin credentials
- [ ] 4.6 Test login with student credentials (NISN)

## 5. Frontend - Admin Users Page Update
- [ ] 5.1 Add tabs for "Siswa" and "Guru" in admin-users.html
- [ ] 5.2 Add user count display in tabs (e.g., "Siswa (176)")
- [ ] 5.3 Add search box for filtering users
- [ ] 5.4 Update user card layout with action buttons
- [ ] 5.5 Add "Tambah User Baru" button
- [ ] 5.6 Add "Ubah Password Admin" button
- [ ] 5.7 Implement tab switching functionality
- [ ] 5.8 Load users by role when tab is clicked

## 6. Frontend - Modal: Tambah/Edit User
- [ ] 6.1 Create modal HTML for add/edit user
- [ ] 6.2 Add form fields: nama, username, password, role, kelas
- [ ] 6.3 Show/hide kelas field based on role selection
- [ ] 6.4 Implement form validation (client-side)
- [ ] 6.5 Implement save user function (POST/PUT API)
- [ ] 6.6 Show success/error notifications
- [ ] 6.7 Refresh user list after save
- [ ] 6.8 Close modal after successful save

## 7. Frontend - Modal: Reset Password User
- [ ] 7.1 Create modal HTML for reset password
- [ ] 7.2 Add form fields: newPassword, confirmPassword
- [ ] 7.3 Implement form validation (passwords match)
- [ ] 7.4 Implement reset password function (POST API)
- [ ] 7.5 Show success/error notifications
- [ ] 7.6 Close modal after successful reset

## 8. Frontend - Modal: Ubah Password Admin
- [ ] 8.1 Create modal HTML for change admin password
- [ ] 8.2 Add form fields: oldPassword, newPassword, confirmPassword
- [ ] 8.3 Implement form validation
- [ ] 8.4 Implement change password function (POST API)
- [ ] 8.5 Show success notification
- [ ] 8.6 Logout and redirect to login after successful change

## 9. Frontend - Delete User
- [ ] 9.1 Add delete button to user card
- [ ] 9.2 Show confirmation dialog before delete
- [ ] 9.3 Implement delete user function (DELETE API)
- [ ] 9.4 Show success/error notifications
- [ ] 9.5 Remove user from list after successful delete

## 10. Testing & Bug Fixes
- [ ] 10.1 Test create user (siswa)
- [ ] 10.2 Test create user (guru)
- [ ] 10.3 Test edit user data
- [ ] 10.4 Test edit user role (siswa → guru)
- [ ] 10.5 Test delete user
- [ ] 10.6 Test reset user password
- [ ] 10.7 Test change admin password
- [ ] 10.8 Test login with new user
- [ ] 10.9 Test username uniqueness validation
- [ ] 10.10 Test password length validation
- [ ] 10.11 Fix any bugs found during testing

## 11. Documentation
- [ ] 11.1 Update README with new user management features
- [ ] 11.2 Create user guide for admin
- [ ] 11.3 Document API endpoints
- [ ] 11.4 Document database schema changes

## Estimated Time
- Database Setup: 1 hour
- Backend API: 2 hours
- Frontend UI: 3 hours
- Testing: 1 hour
- Documentation: 30 minutes
- **Total: ~7.5 hours**

## Dependencies
- Task 1 must be completed before Task 2-4
- Task 2-4 must be completed before Task 5-9
- Task 5-9 can be done in parallel
- Task 10 depends on all previous tasks

## Notes
- Use simple SHA-256 hashing for passwords (development)
- For production, consider using bcrypt
- Backup database before running migration
- Test thoroughly before deploying to production
