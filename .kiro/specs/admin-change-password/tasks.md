# Tasks: Admin Change Password

## 1. Backend - Password Hashing Setup
- [ ] 1.1 Add crypto module import to server.js
- [ ] 1.2 Create hashPassword() utility function
- [ ] 1.3 Create global variable ADMIN_PASSWORD_HASH with initial hashed password
- [ ] 1.4 Update login endpoint to use hashed password comparison

## 2. Backend - Change Password API
- [ ] 2.1 Create POST /api/admin/change-password endpoint
- [ ] 2.2 Add requireAuth and requireAdmin middleware to endpoint
- [ ] 2.3 Implement old password validation
- [ ] 2.4 Implement new password length validation (min 6 chars)
- [ ] 2.5 Update ADMIN_PASSWORD_HASH with new hashed password
- [ ] 2.6 Clear admin session after password change
- [ ] 2.7 Return success/error response

## 3. Frontend - UI Components
- [ ] 3.1 Add "🔑 Ubah Password" button to admin-users.html
- [ ] 3.2 Create modal HTML for change password form
- [ ] 3.3 Add form fields: oldPassword, newPassword, confirmPassword
- [ ] 3.4 Add CSS styling for modal and form

## 4. Frontend - JavaScript Logic
- [ ] 4.1 Create function to open change password modal
- [ ] 4.2 Create function to close modal
- [ ] 4.3 Implement client-side validation (passwords match, length >= 6)
- [ ] 4.4 Implement changeAdminPassword() function
- [ ] 4.5 Call API endpoint with old and new password
- [ ] 4.6 Handle success response (show message, clear storage, redirect)
- [ ] 4.7 Handle error response (show error message)

## 5. Testing
- [ ] 5.1 Test change password with correct old password
- [ ] 5.2 Test change password with wrong old password
- [ ] 5.3 Test change password with password < 6 characters
- [ ] 5.4 Test change password with mismatched passwords
- [ ] 5.5 Test login with old password (should fail)
- [ ] 5.6 Test login with new password (should succeed)
- [ ] 5.7 Test that session is cleared after password change

## 6. Documentation
- [ ] 6.1 Add comment in server.js explaining password hashing
- [ ] 6.2 Update README with admin password change feature
- [ ] 6.3 Document default admin credentials

## Estimated Time per Task
- Task 1: 15 minutes
- Task 2: 20 minutes
- Task 3: 15 minutes
- Task 4: 20 minutes
- Task 5: 15 minutes
- Task 6: 10 minutes
- **Total: ~1 hour 35 minutes**

## Dependencies
- Task 1 must be completed before Task 2
- Task 2 must be completed before Task 4
- Task 3 and Task 4 can be done in parallel
- Task 5 depends on all previous tasks

## Notes
- Keep it simple - use SHA-256 for hashing (good enough for development)
- For production, consider using bcrypt for better security
- Make sure to test thoroughly before deploying
- Default admin password: admin123
