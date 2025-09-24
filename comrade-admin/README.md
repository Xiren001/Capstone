# Comrade Admin Dashboard

A separate React application for the Comrade admin dashboard, designed to be deployed as a subdomain (e.g., `admin.comrade.com`).

## Features

- **Admin Authentication**: Uses the same JWT-based authentication system as the main app
- **Protected Routes**: Secure admin-only access with automatic redirects
- **Admin Dashboard**: Comprehensive admin interface with system statistics and quick actions
- **Responsive Design**: Modern UI with Tailwind CSS and shadcn/ui components
- **Subdomain Ready**: Configured for separate deployment

## Quick Start

### 1. Install Dependencies

```bash
cd comrade-admin
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The admin app will run on `http://localhost:5178` (different port from main app).

### 3. Login Credentials

Use the same credentials as the main app:

- **Admin**: `admin` / `admin123`
- **Commander**: `commander` / `commander123`
- **Soldier**: `soldier` / `soldier123`

## Project Structure

```
comrade-admin/
├── src/
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   ├── AdminLoginForm.tsx  # Admin-specific login form
│   │   ├── AdminDashboard.tsx  # Main admin dashboard
│   │   └── ProtectedRoute.tsx   # Route protection component
│   ├── contexts/
│   │   └── AuthContext.tsx     # Authentication context
│   ├── lib/
│   │   ├── api.ts              # API client with interceptors
│   │   └── utils.ts            # Utility functions
│   ├── App.tsx                 # Main app component
│   ├── main.tsx               # App entry point
│   └── index.css              # Global styles
├── public/
│   └── vite.svg               # App icon
├── package.json               # Dependencies and scripts
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## Authentication Flow

1. **Login**: Admin users authenticate using the same backend API
2. **Token Storage**: JWT tokens stored in localStorage
3. **Route Protection**: All admin routes require authentication
4. **Auto Refresh**: Tokens automatically refresh when needed
5. **Logout**: Clean token removal and redirect to login

## Deployment

### Subdomain Configuration

To deploy as a subdomain (e.g., `admin.comrade.com`):

1. **Build the app**:

   ```bash
   npm run build
   ```

2. **Configure DNS**:

   ```
   A Record: comrade.com → Your server IP
   CNAME: admin.comrade.com → comrade.com
   ```

3. **Web Server Configuration** (Nginx example):
   ```nginx
   server {
       server_name admin.comrade.com;
       root /path/to/comrade-admin/dist;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

### Environment Configuration

Update the API base URL in `src/lib/api.ts` for production:

```typescript
const api = axios.create({
  baseURL: "https://api.comrade.com/api", // Production API URL
  headers: {
    "Content-Type": "application/json",
  },
});
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Admin Features

1. **Create new components** in `src/components/`
2. **Add routes** in `src/App.tsx`
3. **Protect routes** with `ProtectedRoute` component
4. **Update dashboard** with new quick actions

### API Integration

The admin app uses the same backend API as the main app. All API calls are automatically authenticated using JWT tokens.

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Route Protection**: Automatic redirects for unauthenticated users
- **Token Refresh**: Seamless token renewal
- **Secure Storage**: Proper token cleanup on logout
- **Admin-Only Access**: Separate admin interface

## Troubleshooting

### Common Issues

1. **Cannot connect to backend**:

   - Ensure backend is running on `http://localhost:3000`
   - Check CORS configuration
   - Verify API base URL

2. **Login fails**:

   - Check if user exists in database
   - Verify credentials
   - Check backend authentication

3. **Route protection not working**:
   - Ensure `AuthProvider` wraps the app
   - Check `ProtectedRoute` implementation
   - Verify authentication state

### Debug Steps

1. Check browser console for errors
2. Monitor network requests in DevTools
3. Verify localStorage token storage
4. Check backend authentication logs

## Contributing

1. Follow the existing code structure
2. Use TypeScript for type safety
3. Follow the established UI patterns
4. Test authentication flows thoroughly

---

**Last Updated**: January 22, 2025  
**Version**: 1.0.0  
**Author**: Comrade Development Team
