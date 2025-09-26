import { LoginForm } from "@/components/login-form";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background decoration */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div> */}

      {/* Main content */}
      <div className="relative w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-white hover:text-white/90 transition-colors"
          >
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
            <span className="text-2xl font-bold">Comrade</span>
          </Link>
          <p className="text-white/70 mt-2">
            Secure Military Communication Platform
          </p>
        </div>

        {/* Login Form */}
        <LoginForm />

        {/* Back to home link */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-white/70 hover:text-white transition-colors text-sm underline underline-offset-4"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
