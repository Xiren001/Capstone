import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminLoginForm } from "@/components/AdminLoginForm";
import { AdminDashboard } from "@/components/AdminDashboard";
import { ProtectedRoute } from "@/components/ProtectedRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Login Route */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/admin/login" replace />} />
          <Route
            path="/admin"
            element={<Navigate to="/admin/dashboard" replace />}
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/admin/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

// Admin Login Page Component
function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Main content */}
      <div className="relative w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 text-white">
            <div className="text-3xl">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 324 323"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="88.1023"
                  y="144.792"
                  width="151.802"
                  height="36.5788"
                  rx="18.2894"
                  transform="rotate(-38.5799 88.1023 144.792)"
                  fill="currentColor"
                />
                <rect
                  x="85.3459"
                  y="244.537"
                  width="151.802"
                  height="36.5788"
                  rx="18.2894"
                  transform="rotate(-38.5799 85.3459 244.537)"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="text-2xl font-bold">Comrade Admin</span>
          </div>
          <p className="text-white/70 mt-2">Administrative Dashboard Access</p>
        </div>

        {/* Login Form */}
        <AdminLoginForm />

        {/* Back to main app link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-white/70 hover:text-white transition-colors text-sm underline underline-offset-4"
          >
            ← Back to Main App
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
