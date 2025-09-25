# Frontend Authentication Documentation

## Overview

This document provides comprehensive information about the frontend authentication system for the Comrade application. The authentication system integrates with the backend JWT-based API to provide secure user authentication and authorization.

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Authentication Flow](#authentication-flow)
3. [Components](#components)
4. [API Integration](#api-integration)
5. [State Management](#state-management)
6. [Security Features](#security-features)
7. [Usage Guide](#usage-guide)
8. [Troubleshooting](#troubleshooting)
9. [Development Guide](#development-guide)

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Authentication                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐    ┌─────────────────┐                │
│  │   Login Form    │    │   AuthContext    │                │
│  │                 │    │                 │                │
│  │ • Username      │    │ • User State    │                │
│  │ • Password      │    │ • Login Logic   │                │
│  │ • Validation    │    │ • Token Mgmt    │                │
│  └─────────────────┘    └─────────────────┘                │
│           │                       │                         │
│           └───────────┬───────────┘                         │
│                       │                                     │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                API Service (axios)                      │ │
│  │                                                         │ │
│  │  ┌─────────────────────────────────────────────────┐   │ │
│  │  │            HTTP Interceptors                     │   │ │
│  │  │                                                 │   │ │
│  │  │  Request: Add JWT Token                         │   │ │
│  │  │  Response: Handle Token Refresh                 │   │ │
│  │  │  Error: Redirect to Login                       │   │ │
│  │  └─────────────────────────────────────────────────┘   │ │
│  └─────────────────────────────────────────────────────────┘ │
│                       │                                     │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                Backend API (JWT)                       │ │
│  │                                                         │ │
│  │  ┌─────────────────────────────────────────────────┐   │ │
│  │  │            Authentication Endpoints              │   │ │
│  │  │                                                 │   │ │
│  │  │  POST /api/auth/signin                          │   │ │
│  │  │  GET  /api/auth/profile                         │   │ │
│  │  │  POST /api/auth/refresh                         │   │ │
│  │  └─────────────────────────────────────────────────┘   │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Authentication Flow

### 1. Login Process

```
User Input → Login Form → AuthContext → API Service → Backend
     ↓              ↓           ↓            ↓          ↓
Username/Password → Validation → Login() → POST /signin → JWT Tokens
     ↓              ↓           ↓            ↓          ↓
Success Response ← Token Storage ← Profile Fetch ← Token Return ← Database
     ↓              ↓           ↓            ↓          ↓
Dashboard Redirect ← User State ← Auth Success ← Profile Data ← User Data
```

### 2. Token Management

```
Access Token (15min) → Automatic Refresh → Refresh Token (7days)
        ↓                      ↓                      ↓
   API Requests          Token Expiry          Long-term Auth
        ↓                      ↓                      ↓
   Bearer Header         Auto Refresh          Secure Storage
```

### 3. Route Protection

```
Route Access → ProtectedRoute → AuthContext → Authentication Check
     ↓              ↓              ↓              ↓
Public Route ← Allow Access ← Authenticated ← Valid Token
     ↓              ↓              ↓              ↓
Protected Route → Redirect → Login Page ← Invalid/No Token
```

## Components

### 1. AuthContext (`src/contexts/AuthContext.tsx`)

**Purpose**: Global authentication state management

**Key Features**:

- User state management
- Login/logout functionality
- Token storage and retrieval
- Authentication status checking

**Interface**:

```typescript
interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}
```

**Usage**:

```typescript
const { user, login, logout, isAuthenticated } = useAuth();
```

### 2. LoginForm (`src/components/login-form.tsx`)

**Purpose**: User authentication form

**Features**:

- Username/password input fields
- Form validation
- Loading states
- Error handling
- Automatic redirect after login

**Form Fields**:

- `username`: Text input for username
- `password`: Password input for authentication

**States**:

- `isLoading`: Shows loading spinner during authentication
- `error`: Displays error messages for failed attempts

### 3. ProtectedRoute (`src/components/ProtectedRoute.tsx`)

**Purpose**: Route protection component

**Features**:

- Authentication checking
- Automatic redirect to login
- Loading state during auth check
- Preserves intended destination

**Usage**:

```typescript
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

### 4. Dashboard (`src/components/Dashboard.tsx`)

**Purpose**: Authenticated user dashboard

**Features**:

- User information display
- Statistics cards
- Activity feed
- Quick actions
- Logout functionality

**Components**:

- User welcome message
- System statistics
- Recent activity log
- Action buttons

### 5. API Service (`src/lib/api.ts`)

**Purpose**: HTTP client with authentication

**Features**:

- Axios instance configuration
- Request/response interceptors
- Automatic token attachment
- Token refresh handling
- Error management

**Configuration**:

```typescript
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});
```

## API Integration

### Authentication Endpoints

#### 1. Sign In

```typescript
POST /api/auth/signin
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}

Response:
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 900,
  "tokenType": "Bearer"
}
```

#### 2. Profile

```typescript
GET /api/auth/profile
Authorization: Bearer <access_token>

Response:
{
  "id": 1,
  "username": "admin"
}
```

#### 3. Token Refresh

```typescript
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Response:
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 900,
  "tokenType": "Bearer"
}
```

## State Management

### Authentication State

```typescript
interface User {
  id: number;
  username: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}
```

### Token Storage

**LocalStorage Keys**:

- `accessToken`: Short-lived access token (15 minutes)
- `refreshToken`: Long-lived refresh token (7 days)

**Storage Strategy**:

- Tokens stored in localStorage for persistence
- Automatic cleanup on logout
- Secure token handling

## Security Features

### 1. Token Security

- **Access Tokens**: Short-lived (15 minutes) for security
- **Refresh Tokens**: Long-lived (7 days) for convenience
- **Automatic Refresh**: Seamless token renewal
- **Secure Storage**: localStorage with proper cleanup

### 2. Route Protection

- **Protected Routes**: Require authentication
- **Automatic Redirects**: Unauthenticated users sent to login
- **Preserved State**: Return to intended destination after login

### 3. Error Handling

- **Network Errors**: Graceful handling of API failures
- **Authentication Errors**: Clear error messages
- **Token Expiry**: Automatic refresh or logout

### 4. Input Validation

- **Form Validation**: Required fields and proper formats
- **Error Display**: User-friendly error messages
- **Loading States**: Clear feedback during operations

## Usage Guide

### 1. Setting Up Authentication

```typescript
// Wrap your app with AuthProvider
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>{/* Your routes */}</Routes>
    </AuthProvider>
  );
}
```

### 2. Protecting Routes

```typescript
import { ProtectedRoute } from "./components/ProtectedRoute";

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>;
```

### 3. Using Authentication in Components

```typescript
import { useAuth } from "./contexts/AuthContext";

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <div>Welcome, {user?.username}!</div>;
  }

  return <div>Please log in</div>;
}
```

### 4. Making Authenticated API Calls

```typescript
import api from "./lib/api";

// Tokens are automatically attached
const response = await api.get("/auth/profile");
const userData = response.data;
```

## Troubleshooting

### Common Issues

#### 1. "Cannot connect to backend"

**Problem**: Frontend can't reach backend API
**Solution**:

- Ensure backend is running on `http://localhost:3000`
- Check CORS configuration
- Verify API base URL in `src/lib/api.ts`

#### 2. "Invalid credentials" error

**Problem**: Login fails with valid credentials
**Solution**:

- Check if user exists in database
- Verify password hashing
- Check backend authentication logic

#### 3. "Token expired" errors

**Problem**: Frequent token expiry issues
**Solution**:

- Check token refresh logic
- Verify refresh token validity
- Ensure proper token storage

#### 4. Route protection not working

**Problem**: Protected routes accessible without authentication
**Solution**:

- Verify AuthProvider wraps the app
- Check ProtectedRoute implementation
- Ensure authentication state is properly managed

### Debug Steps

1. **Check Browser Console**: Look for JavaScript errors
2. **Network Tab**: Monitor API requests and responses
3. **LocalStorage**: Verify token storage
4. **Backend Logs**: Check server-side authentication

## Development Guide

### Adding New Protected Routes

```typescript
// 1. Create the component
const NewPage = () => <div>Protected Content</div>;

// 2. Add to routes with protection
<Route
  path="/new-page"
  element={
    <ProtectedRoute>
      <NewPage />
    </ProtectedRoute>
  }
/>;
```

### Extending User Data

```typescript
// 1. Update User interface
interface User {
  id: number;
  username: string;
  email?: string;
  role?: string;
}

// 2. Update backend profile endpoint
// 3. Update frontend to use new fields
```

### Adding New API Endpoints

```typescript
// 1. Add to API service
export const userService = {
  getProfile: () => api.get("/auth/profile"),
  updateProfile: (data) => api.put("/auth/profile", data),
};

// 2. Use in components
const { data } = await userService.getProfile();
```

## File Structure

```
src/
├── contexts/
│   └── AuthContext.tsx          # Authentication state management
├── components/
│   ├── login-form.tsx           # Login form component
│   ├── ProtectedRoute.tsx        # Route protection
│   └── Dashboard.tsx             # Authenticated dashboard
├── lib/
│   └── api.ts                    # API service with interceptors
└── App.tsx                       # Main app with AuthProvider
```

## Dependencies

### Required Packages

- `axios`: HTTP client for API requests
- `react-router-dom`: Routing and navigation
- `react`: Core React library

### Package Installation

```bash
npm install axios react-router-dom
```

## Environment Configuration

### Development Environment

- **Frontend**: `http://localhost:5177`
- **Backend**: `http://localhost:3000`
- **API Base URL**: `http://localhost:3000/api`

### Production Considerations

- Update API base URL for production
- Implement proper error boundaries
- Add comprehensive logging
- Consider token storage security

## Testing

### Manual Testing Checklist

- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Access protected routes when authenticated
- [ ] Redirect to login when not authenticated
- [ ] Token refresh functionality
- [ ] Logout functionality
- [ ] Error handling and display

### Test Credentials

- **Admin**: `admin` / `admin123`
- **Commander**: `commander` / `commander123`
- **Soldier**: `soldier` / `soldier123`

---

**Last Updated**: January 22, 2025  
**Version**: 1.0.0  
**Author**: Comrade Development Team
