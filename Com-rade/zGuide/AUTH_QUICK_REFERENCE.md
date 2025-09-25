# Authentication Quick Reference

## 🚀 Quick Start

### 1. Start Servers

```bash
# Backend (Terminal 1)
cd /Applications/XAMPP/xamppfiles/htdocs/Capstone/com-rade-backend
PORT=3000 node index.js

# Frontend (Terminal 2)
cd /Applications/XAMPP/xamppfiles/htdocs/Capstone/Com-rade
npm run dev
```

### 2. Access Application

- **Frontend**: http://localhost:5177
- **Login Page**: http://localhost:5177/login
- **Backend API**: http://localhost:3000

## 🔐 Login Credentials

| Username    | Password       | Role                 |
| ----------- | -------------- | -------------------- |
| `admin`     | `admin123`     | System Administrator |
| `commander` | `commander123` | Commander            |
| `soldier`   | `soldier123`   | Soldier              |

## 📋 Key Components

### AuthContext Hook

```typescript
const { user, login, logout, isAuthenticated, isLoading } = useAuth();
```

### Protected Route

```typescript
<ProtectedRoute>
  <YourComponent />
</ProtectedRoute>
```

### API Service

```typescript
import api from "@/lib/api";

// Automatic token attachment
const response = await api.get("/auth/profile");
```

## 🔧 Common Tasks

### Add New Protected Route

```typescript
<Route
  path="/new-page"
  element={
    <ProtectedRoute>
      <NewPage />
    </ProtectedRoute>
  }
/>
```

### Check Authentication Status

```typescript
const { isAuthenticated, user } = useAuth();

if (isAuthenticated) {
  console.log(`Welcome, ${user?.username}!`);
}
```

### Make Authenticated API Call

```typescript
try {
  const response = await api.get("/protected-endpoint");
  console.log(response.data);
} catch (error) {
  console.error("API Error:", error);
}
```

## 🛠️ Troubleshooting

### Backend Not Responding

```bash
# Check if server is running
curl http://localhost:3000

# Check port usage
lsof -i :3000
```

### Login Fails

1. Check browser console for errors
2. Verify backend is running
3. Check network tab for API calls
4. Verify credentials in database

### Token Issues

```bash
# Check localStorage
localStorage.getItem('accessToken')
localStorage.getItem('refreshToken')

# Clear tokens
localStorage.removeItem('accessToken')
localStorage.removeItem('refreshToken')
```

## 📁 File Locations

| Component       | File Path                           |
| --------------- | ----------------------------------- |
| AuthContext     | `src/contexts/AuthContext.tsx`      |
| Login Form      | `src/components/login-form.tsx`     |
| Protected Route | `src/components/ProtectedRoute.tsx` |
| Dashboard       | `src/components/Dashboard.tsx`      |
| API Service     | `src/lib/api.ts`                    |

## 🔄 Authentication Flow

```
1. User enters credentials
2. Login form submits to backend
3. Backend validates and returns JWT tokens
4. Frontend stores tokens in localStorage
5. User redirected to dashboard
6. Protected routes check authentication
7. API calls include Bearer token
8. Automatic token refresh on expiry
```

## ⚡ Quick Commands

### Start Development

```bash
# Backend
cd com-rade-backend && PORT=3000 node index.js

# Frontend
cd Com-rade && npm run dev
```

### Test API

```bash
# Test login
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Test profile (replace TOKEN)
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:3000/api/auth/profile
```

### Database Operations

```bash
# Run seeders
npm run seed:admin
npm run seed:users

# Check users
psql -U postgres -d Comrade -c "SELECT * FROM users;"
```

## 🎯 Development Tips

1. **Always wrap app with AuthProvider**
2. **Use ProtectedRoute for sensitive pages**
3. **Check authentication state before API calls**
4. **Handle loading and error states**
5. **Test with different user roles**

## 📊 Server Status

- **Backend**: ✅ Running on port 3000
- **Frontend**: ✅ Running on port 5177
- **Database**: ✅ Connected with seeded users
- **Authentication**: ✅ JWT tokens working

---

**Need Help?** Check the full documentation in `AUTHENTICATION_DOCUMENTATION.md`
