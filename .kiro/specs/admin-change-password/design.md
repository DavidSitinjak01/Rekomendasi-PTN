# Design: Admin Change Password

## UI Design

### Button Location
Tambahkan tombol "🔑 Ubah Password" di halaman `admin-users.html` di bagian atas, sebelah tombol lainnya.

### Modal Design
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
│ (Minimal 6 karakter)                         │
│                                              │
│ Konfirmasi Password Baru:                    │
│ [_________________________________]          │
│                                              │
│         [Batal]  [Ubah Password]             │
└─────────────────────────────────────────────┘
```

## API Design

### Endpoint: Change Admin Password
```
POST /api/admin/change-password

Request:
{
  "oldPassword": "admin123",
  "newPassword": "newpassword456"
}

Response (Success):
{
  "success": true,
  "message": "Password berhasil diubah. Silakan login kembali."
}

Response (Error - Wrong Old Password):
{
  "success": false,
  "message": "Password lama salah"
}

Response (Error - Password Too Short):
{
  "success": false,
  "message": "Password baru minimal 6 karakter"
}
```

## Implementation Details

### Password Storage
Gunakan variabel global di `server.js`:
```javascript
// Admin credentials
let ADMIN_USERNAME = 'admin';
let ADMIN_PASSWORD_HASH = hashPassword('admin123'); // Initial password

function hashPassword(password) {
  const crypto = require('crypto');
  return crypto.createHash('sha256').update(password).digest('hex');
}
```

### Server-side Logic
```javascript
app.post('/api/admin/change-password', requireAuth, requireAdmin, (req, res) => {
  const { oldPassword, newPassword } = req.body;
  
  // Validate old password
  if (hashPassword(oldPassword) !== ADMIN_PASSWORD_HASH) {
    return res.status(400).json({
      success: false,
      message: 'Password lama salah'
    });
  }
  
  // Validate new password length
  if (newPassword.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password baru minimal 6 karakter'
    });
  }
  
  // Update password
  ADMIN_PASSWORD_HASH = hashPassword(newPassword);
  
  // Clear session
  const sessionId = req.headers['x-session-id'];
  sessions.delete(sessionId);
  
  res.json({
    success: true,
    message: 'Password berhasil diubah. Silakan login kembali.'
  });
});
```

### Client-side Logic
```javascript
async function changeAdminPassword() {
  const oldPassword = document.getElementById('oldPassword').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  
  // Validate passwords match
  if (newPassword !== confirmPassword) {
    alert('Password baru dan konfirmasi tidak sama');
    return;
  }
  
  // Validate password length
  if (newPassword.length < 6) {
    alert('Password baru minimal 6 karakter');
    return;
  }
  
  try {
    const response = await fetch(`${API_URL}/admin/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-session-id': sessionId
      },
      body: JSON.stringify({ oldPassword, newPassword })
    });
    
    const result = await response.json();
    
    if (result.success) {
      alert(result.message);
      // Clear local storage and redirect to login
      localStorage.clear();
      window.location.href = 'login.html';
    } else {
      alert(result.message);
    }
  } catch (error) {
    alert('Error: ' + error.message);
  }
}
```

## Flow Diagram

```
Admin clicks "Ubah Password" button
         ↓
Modal opens with form
         ↓
Admin fills in:
- Password Lama
- Password Baru
- Konfirmasi Password Baru
         ↓
Admin clicks "Ubah Password"
         ↓
Client validates:
- Passwords match?
- Password length >= 6?
         ↓
Send POST request to server
         ↓
Server validates:
- Old password correct?
- New password length >= 6?
         ↓
Update ADMIN_PASSWORD_HASH
         ↓
Clear admin session
         ↓
Return success response
         ↓
Client shows success message
         ↓
Clear localStorage
         ↓
Redirect to login page
         ↓
Admin logs in with new password
```

## Security Considerations

1. **Password Hashing**: Use SHA-256 for hashing (simple but secure enough for development)
2. **Session Clearing**: Clear session after password change to force re-login
3. **Validation**: Validate on both client and server side
4. **No Password in Logs**: Never log passwords (old or new)

## Error Handling

### Client-side Errors
- Passwords don't match
- Password too short
- Empty fields

### Server-side Errors
- Wrong old password
- Password too short
- Session expired
- Server error

## Testing Checklist

- [ ] Test with correct old password
- [ ] Test with wrong old password
- [ ] Test with password < 6 characters
- [ ] Test with passwords that don't match
- [ ] Test login after password change
- [ ] Test that old password doesn't work after change
- [ ] Test that new password works after change

## Estimated Time
- Backend: 30 minutes
- Frontend: 30 minutes
- Testing: 15 minutes
- **Total: ~1 hour 15 minutes**
