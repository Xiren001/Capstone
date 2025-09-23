# Comrade Frontend

A modern React frontend application for the Comrade military communication platform with integrated authentication system.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Backend server running on port 3000

### Installation

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start development server**:

   ```bash
   npm run dev
   ```

3. **Access application**:
   - Frontend: http://localhost:5177
   - Login: http://localhost:5177/login

## 🔐 Authentication System

### Login Credentials

| Username    | Password       | Role                 |
| ----------- | -------------- | -------------------- |
| `admin`     | `admin123`     | System Administrator |
| `commander` | `commander123` | Commander            |
| `soldier`   | `soldier123`   | Soldier              |

### Features

- **JWT Authentication**: Secure token-based authentication
- **Automatic Token Refresh**: Seamless token renewal
- **Route Protection**: Protected routes require authentication
- **User Dashboard**: Professional dashboard for authenticated users
- **Responsive Design**: Mobile-friendly interface

## 📋 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   ├── login-form.tsx         # Authentication form
│   ├── ProtectedRoute.tsx     # Route protection
│   └── Dashboard.tsx          # User dashboard
├── contexts/
│   └── AuthContext.tsx        # Authentication state
├── lib/
│   └── api.ts                 # API service
├── LandingPage/
│   ├── Body/                  # Landing page components
│   ├── HeaderFooter/          # Header and footer
│   └── pages/                 # Landing page routes
└── App.tsx                    # Main application
```

## 🔧 Key Components

### AuthContext

Global authentication state management:

```typescript
const { user, login, logout, isAuthenticated, isLoading } = useAuth();
```

### ProtectedRoute

Route protection component:

```typescript
<ProtectedRoute>
  <YourComponent />
</ProtectedRoute>
```

### API Service

HTTP client with automatic token management:

```typescript
import api from "@/lib/api";

// Automatic token attachment
const response = await api.get("/auth/profile");
```

## 🌐 API Integration

### Backend Endpoints

- **Sign In**: `POST /api/auth/signin`
- **Profile**: `GET /api/auth/profile`
- **Token Refresh**: `POST /api/auth/refresh`

### Configuration

- **Backend URL**: `http://localhost:3000/api`
- **Frontend URL**: `http://localhost:5177`

## 🎨 UI Components

### Design System

- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icons
- **Custom Components**: Reusable UI elements

### Key UI Features

- **Responsive Design**: Mobile-first approach
- **Dark/Light Mode**: Theme switching support
- **Accessibility**: WCAG compliant components
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages

## 🔒 Security Features

### Authentication Security

- **JWT Tokens**: Secure token-based authentication
- **Token Expiry**: Short-lived access tokens (15 minutes)
- **Refresh Tokens**: Long-lived refresh tokens (7 days)
- **Automatic Refresh**: Seamless token renewal
- **Secure Storage**: localStorage with proper cleanup

### Route Security

- **Protected Routes**: Authentication required
- **Automatic Redirects**: Unauthenticated users sent to login
- **State Preservation**: Return to intended destination

### Input Security

- **Form Validation**: Required fields and proper formats
- **Error Handling**: Secure error messages
- **XSS Protection**: Input sanitization

## 🛠️ Development Guide

### Adding New Protected Routes

```typescript
// 1. Create component
const NewPage = () => <div>Protected Content</div>;

// 2. Add to routes
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

## 🧪 Testing

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

## 🚨 Troubleshooting

### Common Issues

#### Backend Connection Error

**Problem**: Frontend can't reach backend API
**Solution**:

- Ensure backend is running on `http://localhost:3000`
- Check CORS configuration
- Verify API base URL in `src/lib/api.ts`

#### Login Failures

**Problem**: Login fails with valid credentials
**Solution**:

- Check browser console for errors
- Verify backend authentication
- Check network tab for API calls

#### Token Issues

**Problem**: Frequent token expiry or authentication errors
**Solution**:

- Check token refresh logic
- Verify refresh token validity
- Clear localStorage and retry

### Debug Steps

1. **Browser Console**: Check for JavaScript errors
2. **Network Tab**: Monitor API requests and responses
3. **LocalStorage**: Verify token storage
4. **Backend Logs**: Check server-side authentication

## 📚 Documentation

- [Authentication Documentation](./AUTHENTICATION_DOCUMENTATION.md) - Complete auth system guide
- [Quick Reference](./AUTH_QUICK_REFERENCE.md) - Fast command reference
- [Implementation Guide](./AUTH_IMPLEMENTATION_GUIDE.md) - Technical details

## 🔄 Development Workflow

### Starting Development

1. **Start Backend**:

   ```bash
   cd ../com-rade-backend
   PORT=3000 node index.js
   ```

2. **Start Frontend**:

   ```bash
   npm run dev
   ```

3. **Access Application**:
   - Visit http://localhost:5177
   - Navigate to /login for authentication

### Code Quality

- **ESLint**: Code linting and formatting
- **TypeScript**: Type safety and better development experience
- **Prettier**: Code formatting (if configured)

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Environment Variables

```env
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_ENV=production
```

### Production Considerations

- Update API base URL for production
- Implement proper error boundaries
- Add comprehensive logging
- Consider token storage security
- Enable HTTPS in production

## 🤝 Contributing

### Code Standards

1. **TypeScript**: Use TypeScript for all new code
2. **Components**: Create reusable, well-documented components
3. **Testing**: Add tests for new features
4. **Documentation**: Update documentation for changes

### Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Update documentation
6. Submit a pull request

## 📄 License

This project is part of the Comrade military communication platform.

## 🆘 Support

### Getting Help

1. Check the documentation files
2. Review troubleshooting section
3. Check browser console for errors
4. Verify backend server status

### Resources

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Axios Documentation](https://axios-http.com/)

---

**Last Updated**: January 22, 2025  
**Version**: 1.0.0  
**Author**: Comrade Development Team
