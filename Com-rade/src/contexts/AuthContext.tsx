import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { TokenExpiredModal } from "@/components/TokenExpiredModal";
import { eventEmitter, EVENTS } from "@/lib/events";

interface User {
  id: number;
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  showTokenExpiredModal: boolean;
  setShowTokenExpiredModal: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showTokenExpiredModal, setShowTokenExpiredModal] = useState(false);
  const navigate = useNavigate();

  const isAuthenticated = !!user;

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const response = await api.get("/auth/profile");
          setUser(response.data);
        } catch (error) {
          // Token is invalid, remove it
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setUser(null);
          // Don't show modal on app start - just clear tokens silently
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Listen for token expiration events from API interceptor
  useEffect(() => {
    const handleTokenExpired = () => {
      // Only show modal if user is authenticated
      if (user) {
        setShowTokenExpiredModal(true);
      }
    };

    eventEmitter.on(EVENTS.TOKEN_EXPIRED, handleTokenExpired);

    return () => {
      eventEmitter.off(EVENTS.TOKEN_EXPIRED, handleTokenExpired);
    };
  }, [user]);

  // Periodic token expiration check
  useEffect(() => {
    if (!user || showTokenExpiredModal) return;

    const checkTokenExpiration = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!accessToken || !refreshToken) {
        setShowTokenExpiredModal(true);
        return;
      }

      try {
        // Try to get user profile to test if tokens are still valid
        await api.get("/auth/profile");
      } catch (error: any) {
        if (error.response?.status === 401) {
          setShowTokenExpiredModal(true);
        }
      }
    };

    // Check every 30 seconds
    const interval = setInterval(checkTokenExpiration, 30000);

    return () => clearInterval(interval);
  }, [user, showTokenExpiredModal]);

  // Hide modal when user is not authenticated
  useEffect(() => {
    if (!user && showTokenExpiredModal) {
      setShowTokenExpiredModal(false);
    }
  }, [user, showTokenExpiredModal]);

  const login = async (username: string, password: string) => {
    try {
      const response = await api.post("/auth/signin", {
        username,
        password,
        platform: "web", // Specify platform for role-based access
      });

      const { accessToken, refreshToken } = response.data;

      // Store tokens
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Get user profile
      const profileResponse = await api.get("/auth/profile");
      setUser(profileResponse.data);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed";
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setShowTokenExpiredModal(false);
    navigate("/");
  };

  const handleTokenExpiredLogin = () => {
    setShowTokenExpiredModal(false);
    navigate("/");
  };

  const handleTokenExpiredClose = () => {
    setShowTokenExpiredModal(false);
    // Clear tokens and logout user to prevent re-triggering
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    navigate("/");
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated,
    showTokenExpiredModal,
    setShowTokenExpiredModal,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <TokenExpiredModal
        isOpen={showTokenExpiredModal}
        onLogin={handleTokenExpiredLogin}
        onClose={handleTokenExpiredClose}
      />
    </AuthContext.Provider>
  );
};
