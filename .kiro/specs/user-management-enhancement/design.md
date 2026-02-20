# Design: User Management Enhancement

## Architecture Overview

### System Components
```
┌─────────────────────────────────────────────────────────────┐
│                     Admin Interface                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Tab: Siswa   │  │ Tab: Guru    │  │ Ubah Password│      │
│  │ (176 users)  │  │ (12 users)   │  │ Admin        │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  User Card Actions:                                          │
│  [Edit] [Reset Password] [Delete] [Detail Siswa]            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                     API Layer (server.js)                    │
│  • POST /api/admin/users (create)                           │
│  • PUT /api/admin/users/:id (update)                        │
│  • DELETE /api/admin/users/:id (delete)                     │
│  • POST /api/admin/change-password (admin password)         │
│  • POST /api/admin/reset-user-password/:id (user password)  │
│  • GET /api/admin/users?role=teacher|student                │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  Database Layer (database.js)                │
│  • users table: id, nama, username, password, role, kelas   │
│  • students table: (existing)                                │
│  • grades table: (existing)                                  │
└─────────────────────────────────────────────────────────────┘
```

## Database Design

### Users Table Schema
```sql
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  nama TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,  -- NISN untuk siswa, username untuk guru/admin
  password TEXT NOT NULL,          -- hashed password
  role TEXT NOT NULL,              -- 'admin' | 'teacher' | 'student'
  kelas TEXT,                      -- hanya untuk siswa
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

### Migration Strategy
1. Buat tabel `users` baru
2. Migrate data siswa dari tabel `students` ke `users` dengan role='student'
3. Set password siswa = NISN (untuk backward compatibility)
4. Buat user admin default
5. Tabel `students` tetap ada untuk menyimpan grades

## UI Design

### 1. Halaman Kelola User (admin-users.html)

#### Layout
```
┌─────────────────────────────────────────────────────────────┐
│ Header: SMA Negeri 1 Telukdalam                             │
│ Navigation: [Beranda] [Kelola User] [Upload Test] ...       │
│ User: 👤 Admin [Logout]                                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│ 📋 Kelola User                                               │
│                                                               │
│ [+ Tambah User Baru]  [🔑 Ubah Password Admin]              │
│                                                               │
│ ┌─────────┬─────────┐                                       │
│ │ Siswa   │ Guru    │  ← Tabs                               │
│ │ (176)   │ (12)    │                                        │
│ └─────────┴─────────┘                                       │
│                                                               │
│ Tab Content: Siswa                                           │
│ ┌───────────────────────────────────────────────────────┐   │
│ │ 🔍 [Search box: Cari nama atau NISN...]              │   │
│ │                                                        │   │
│ │ ┌──────────────────────────────────────────────────┐ │   │
│ │ │ 👤 Ahmad Rizki                                   │ │   │
│ │ │ NISN: 1234567890 | Kelas: XII IPA 1             │ │   │
│ │ │ [Edit] [Reset Password] [Delete] [Detail Siswa] │ │   │
│ │ └──────────────────────────────────────────────────┘ │   │
│ │                                                        │   │
│ │ ┌──────────────────────────────────────────────────┐ │   │
│ │ │ 👤 Siti Nurhaliza                                │ │   │
│ │ │ NISN: 0987654321 | Kelas: XII IPA 2             │ │   │
│ │ │ [Edit] [Reset Password] [Delete] [Detail Siswa] │ │   │
│ │ └──────────────────────────────────────────────────┘ │   │
│ └────────────────────────────────────────────────────────┘   │
│                                                               │
│ Tab Content: Guru                                            │
│ ┌───────────────────────────────────────────────────────┐   │
│ │ 🔍 [Search box: Cari nama guru...]                   │   │
│ │                                                        │   │
│ │ ┌──────────────────────────────────────────────────┐ │   │
│ │ │ 👨‍🏫 Budi Santoso, S.Pd                            │ │   │
│ │ │ Username: budi.santoso                           │ │   │
│ │ │ [Edit] [Reset Password] [Delete]                │ │   │
│ │ └──────────────────────────────────────────────────┘ │   │
│ └────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 2. Modal: Tambah/Edit User

```
┌─────────────────────────────────────────────┐
│ ✏️ Tambah User Baru                         │
├─────────────────────────────────────────────┤
│                                              │
│ Role: ○ Siswa  ○ Guru                       │
│                                              │
│ Nama Lengkap:                                │
│ [_________________________________]          │
│                                              │
│ Username/NISN:                               │
│ [_________________________________]          │
│ (NISN untuk siswa, username untuk guru)     │
│                                              │
│ Password:                                    │
│ [_________________________________]          │
│ (Minimal 6 karakter)                         │
│                                              │
│ Kelas: (hanya untuk siswa)                   │
│ [_________________________________]          │
│                                              │
│         [Batal]  [Simpan]                    │
└─────────────────────────────────────────────┘
```

### 3. Modal: Reset Password User

```
┌─────────────────────────────────────────────┐
│ 🔑 Reset Password                            │
├─────────────────────────────────────────────┤
│                                              │
│ User: Ahmad Rizki (NISN: 1234567890)        │
│                                              │
│ Password Baru:                               │
│ [_________________________________]          │
│                                              │
│ Konfirmasi Password:                         │
│ [_________________________________]          │
│                                              │
│         [Batal]  [Reset Password]            │
└─────────────────────────────────────────────┘
```

### 4. Modal: Ubah Password Admin

```
┌─────────────────────────────────────────────┐
│ 🔑 Ubah Password Admin                       │
├─────────────────────────────────────────────┤
│                                              │
│ Password Lama:                               │
│ [_________________________________]          │
│                                              │
│ Password Baru:                               │
│ [_________________________________]          │
│                                              │
│ Konfirmasi Password Baru:                    │
│ [_________________________________]          │
│                                              │
│         [Batal]  [Ubah Password]             │
└─────────────────────────────────────────────┘
```

## API Design

### 1. Get Users by Role
```
GET /api/admin/users?role=student
GET /api/admin/users?role=teacher

Response:
{
  "success": true,
  "users": [
    {
      "id": "user_123",
      "nama": "Ahmad Rizki",
      "username": "1234567890",
      "role": "student",
      "kelas": "XII IPA 1",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 176
}
```

### 2. Create User
```
POST /api/admin/users

Request:
{
  "nama": "Budi Santoso",
  "username": "budi.santoso",
  "password": "password123",
  "role": "teacher",
  "kelas": null
}

Response:
{
  "success": true,
  "message": "User berhasil ditambahkan",
  "userId": "user_456"
}
```

### 3. Update User
```
PUT /api/admin/users/:id

Request:
{
  "nama": "Ahmad Rizki Updated",
  "username": "1234567890",
  "role": "student",
  "kelas": "XII IPA 2"
}

Response:
{
  "success": true,
  "message": "User berhasil diupdate"
}
```

### 4. Delete User
```
DELETE /api/admin/users/:id

Response:
{
  "success": true,
  "message": "User berhasil dihapus"
}
```

### 5. Reset User Password
```
POST /api/admin/reset-user-password/:id

Request:
{
  "newPassword": "newpassword123"
}

Response:
{
  "success": true,
  "message": "Password berhasil direset"
}
```

### 6. Change Admin Password
```
POST /api/admin/change-password

Request:
{
  "oldPassword": "admin123",
  "newPassword": "newadmin456"
}

Response:
{
  "success": true,
  "message": "Password admin berhasil diubah. Silakan login kembali."
}
```

## Security Design

### Password Hashing
```javascript
// Simple hash function (untuk development)
function hashPassword(password) {
  const crypto = require('crypto');
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Verify password
function verifyPassword(password, hash) {
  return hashPassword(password) === hash;
}
```

### Role-Based Access Control
```javascript
// Middleware untuk cek role
function requireRole(allowedRoles) {
  return (req, res, next) => {
    if (!req.session || !allowedRoles.includes(req.session.role)) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. Insufficient permissions.'
      });
    }
    next();
  };
}

// Usage
app.get('/api/admin/users', requireAuth, requireRole(['admin']), ...);
app.get('/api/teacher/students', requireAuth, requireRole(['admin', 'teacher']), ...);
```

## Implementation Strategy

### Phase 1: Database Setup
1. Create users table
2. Migrate existing students to users table
3. Create default admin user
4. Add password field to existing data

### Phase 2: Backend API
1. Implement user CRUD endpoints
2. Implement password management endpoints
3. Update login endpoint to support users table
4. Add role-based middleware

### Phase 3: Frontend UI
1. Update admin-users.html with tabs
2. Add modals for create/edit/delete user
3. Add modal for reset password
4. Add modal for change admin password
5. Update login flow

### Phase 4: Testing
1. Test user creation (siswa & guru)
2. Test user editing
3. Test user deletion
4. Test password reset
5. Test admin password change
6. Test role-based access

## Correctness Properties

### Property 1: User Creation Uniqueness
**Property**: No two users can have the same username
**Test**: Create user with duplicate username should fail

### Property 2: Password Security
**Property**: Passwords are never stored in plain text
**Test**: Check database - all passwords should be hashed

### Property 3: Role Validation
**Property**: User role must be one of: 'admin', 'teacher', 'student'
**Test**: Create user with invalid role should fail

### Property 4: Admin Password Change
**Property**: Admin must provide correct old password to change
**Test**: Change password with wrong old password should fail

### Property 5: User Deletion Cascade
**Property**: Deleting a student should not delete their grades
**Test**: Delete student, check grades still exist

### Property 6: Username Uniqueness After Edit
**Property**: Editing user username to existing username should fail
**Test**: Edit user A username to user B username should fail

## Error Handling

### Validation Errors
- Username already exists
- Password too short (< 6 characters)
- Invalid role
- Missing required fields

### Authentication Errors
- Wrong old password (admin change password)
- Session expired
- Insufficient permissions

### Database Errors
- User not found
- Database connection error
- Constraint violation

## UI/UX Considerations

### User Feedback
- Success notifications (green)
- Error notifications (red)
- Loading states during API calls
- Confirmation dialogs for delete actions

### Accessibility
- Keyboard navigation support
- Screen reader friendly
- Clear error messages
- Focus management in modals

### Performance
- Lazy load user list (pagination if > 100 users)
- Debounce search input
- Cache user list client-side
- Optimistic UI updates

## Migration Plan

### Step 1: Backup
- Backup existing database
- Export current students data

### Step 2: Create Users Table
- Run migration script
- Verify table created

### Step 3: Migrate Data
- Copy students to users table
- Set role = 'student'
- Set password = hash(NISN)
- Verify data migrated

### Step 4: Create Admin
- Insert admin user
- username: 'admin'
- password: hash('admin123')
- role: 'admin'

### Step 5: Update Login
- Update login endpoint
- Test login with admin
- Test login with student (NISN)

### Step 6: Deploy Frontend
- Update admin-users.html
- Test all CRUD operations
- Test password management

## Rollback Plan

If migration fails:
1. Restore database from backup
2. Revert code changes
3. Restart server
4. Verify old system works

## Success Criteria

- ✅ Admin can create users (siswa & guru)
- ✅ Admin can edit users
- ✅ Admin can delete users
- ✅ Admin can reset user passwords
- ✅ Admin can change own password
- ✅ Users are separated by role (tabs)
- ✅ All passwords are hashed
- ✅ No duplicate usernames
- ✅ Guru can login (future feature)
- ✅ UI is intuitive and responsive
