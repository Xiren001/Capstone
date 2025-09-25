# Authentication Implementation Guide

## Technical Implementation Details

This guide provides detailed technical information about implementing the authentication system in the Comrade frontend application.

## Architecture Overview

### Component Hierarchy

```
App
├── AuthProvider (Context Provider)
│   ├── Routes
│   │   ├── Login (Public Route)
│   │   └── Protected Routes
│   │       ├── Dashboard
│   │       └── Other Protected Pages
│   └── AuthContext (State Management)
└── API Service (HTTP Client)
```

### Data Flow

```
User Action → Component → AuthContext → API Service → Backend → Response → State Update → UI Update
```

## Implementation Details

### 1. AuthContext Implementation

**File**: `src/contexts/AuthContext.tsx`

**Key Features**:

- React Context for global state
- TypeScript interfaces for type safety
- Async authentication methods
- Token management
- Error handling

**State Management**:

```typescript
const [user, setUser] = useState<User | null>(null);
const [isLoading, setIsLoading] = useState(true);
```

**Authentication Methods**:

```typescript
const login = async (username: string, password: string) => {
  // 1. Call backend API
  // 2. Store tokens in localStorage
  // 3. Fetch user profile
  // 4. Update state
};

const logout = () => {
  // 1. Clear tokens from localStorage
  // 2. Reset user state
};
```

### 2. API Service Implementation

**File**: `src/lib/api.ts`

**Axios Configuration**:

```typescript
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});
```

**Request Interceptor**:

```typescript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

**Response Interceptor**:

```typescript
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Attempt token refresh
      // Retry original request
    }
    return Promise.reject(error);
  }
);
```

### 3. Login Form Implementation

**File**: `src/components/login-form.tsx`

**Form Handling**:

```typescript
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");

  const formData = new FormData(e.currentTarget);
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {
    await login(username, password);
    navigate(from, { replace: true });
  } catch (err: any) {
    setError(err.message || "Login failed");
  } finally {
    setIsLoading(false);
  }
};
```

**Form States**:

- `isLoading`: Controls button disabled state and spinner
- `error`: Displays error messages to user
- Form validation with required fields

### 4. Protected Route Implementation

**File**: `src/components/ProtectedRoute.tsx`

**Route Protection Logic**:

```typescript
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
```

**Features**:

- Authentication checking
- Loading state handling
- Redirect preservation
- Route replacement

### 5. Dashboard Implementation

**File**: `src/components/Dashboard.tsx`

**Component Structure**:

```typescript
export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header with user info and logout */}
        {/* Statistics cards */}
        {/* Activity feed */}
        {/* Quick actions */}
      </div>
    </div>
  );
};
```

**Features**:

- User information display
- Statistics cards
- Activity feed
- Quick action buttons
- Logout functionality

## Security Implementation

### Token Management

**Storage Strategy**:

```typescript
// Store tokens
localStorage.setItem("accessToken", accessToken);
localStorage.setItem("refreshToken", refreshToken);

// Retrieve tokens
const token = localStorage.getItem("accessToken");

// Clear tokens
localStorage.removeItem("accessToken");
localStorage.removeItem("refreshToken");
```

**Token Refresh Logic**:

```typescript
const refreshToken = localStorage.getItem("refreshToken");
if (refreshToken) {
  const response = await axios.post("/api/auth/refresh", {
    refreshToken,
  });

  const { accessToken, refreshToken: newRefreshToken } = response.data;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", newRefreshToken);
}
```

### Error Handling

**API Error Handling**:

```typescript
try {
  const response = await api.get("/protected-endpoint");
  return response.data;
} catch (error: any) {
  if (error.response?.status === 401) {
    // Handle authentication error
    logout();
  } else {
    // Handle other errors
    throw new Error(error.response?.data?.message || "Request failed");
  }
}
```

**Form Error Handling**:

```typescript
catch (err: any) {
  setError(err.message || 'Login failed');
} finally {
  setIsLoading(false);
}
```

## TypeScript Implementation

### Type Definitions

**User Interface**:

```typescript
interface User {
  id: number;
  username: string;
}
```

**Auth Context Interface**:

```typescript
interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}
```

**API Response Types**:

```typescript
interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

interface ProfileResponse {
  id: number;
  username: string;
}
```

### Type Safety

**Context Provider**:

```typescript
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
```

## State Management Patterns

### Context Pattern

**Provider Implementation**:

```typescript
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
```

**Consumer Usage**:

```typescript
const { user, login, logout, isAuthenticated } = useAuth();
```

### Local State Management

**Component State**:

```typescript
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState("");
```

**State Updates**:

```typescript
setIsLoading(true);
setError("");

try {
  // Async operation
} catch (error) {
  setError(error.message);
} finally {
  setIsLoading(false);
}
```

## Performance Considerations

### Lazy Loading

**Route-based Code Splitting**:

```typescript
const Dashboard = lazy(() => import("./components/Dashboard"));

<Route
  path="/dashboard"
  element={
    <Suspense fallback={<LoadingSpinner />}>
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    </Suspense>
  }
/>;
```

### Memoization

**Component Memoization**:

```typescript
export const Dashboard = React.memo(() => {
  // Component implementation
});
```

**Callback Memoization**:

```typescript
const handleLogout = useCallback(() => {
  logout();
}, [logout]);
```

## Testing Implementation

### Unit Testing

**AuthContext Testing**:

```typescript
describe("AuthContext", () => {
  it("should provide authentication state", () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.isAuthenticated).toBe(false);
  });
});
```

**Component Testing**:

```typescript
describe("LoginForm", () => {
  it("should submit login form", async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "admin" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "admin123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("admin", "admin123");
    });
  });
});
```

### Integration Testing

**API Integration**:

```typescript
describe("API Integration", () => {
  it("should handle authentication flow", async () => {
    const response = await api.post("/auth/signin", {
      username: "admin",
      password: "admin123",
    });

    expect(response.data).toHaveProperty("accessToken");
    expect(response.data).toHaveProperty("refreshToken");
  });
});
```

## Deployment Considerations

### Environment Configuration

**Development**:

```typescript
const api = axios.create({
  baseURL: "http://localhost:3000/api",
});
```

**Production**:

```typescript
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "/api",
});
```

### Security Headers

**CORS Configuration**:

```typescript
// Backend CORS setup
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5177",
    credentials: true,
  })
);
```

### Error Monitoring

**Error Boundary**:

```typescript
class AuthErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Authentication Error:", error, errorInfo);
    // Send to error monitoring service
  }
}
```

## Best Practices

### Code Organization

1. **Separation of Concerns**: Keep authentication logic separate from UI components
2. **Single Responsibility**: Each component has a single, clear purpose
3. **Reusability**: Create reusable authentication components
4. **Type Safety**: Use TypeScript for all authentication-related code

### Security Best Practices

1. **Token Storage**: Use secure storage mechanisms
2. **Token Expiry**: Implement proper token refresh logic
3. **Error Handling**: Don't expose sensitive information in errors
4. **Input Validation**: Validate all user inputs

### Performance Best Practices

1. **Lazy Loading**: Load authentication components only when needed
2. **Memoization**: Use React.memo and useCallback for expensive operations
3. **State Updates**: Minimize unnecessary re-renders
4. **API Optimization**: Implement request caching where appropriate

---

**Last Updated**: January 22, 2025  
**Version**: 1.0.0  
**Author**: Comrade Development Team
