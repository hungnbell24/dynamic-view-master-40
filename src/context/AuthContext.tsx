
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthData {
  token: string;
  tenant_id: string;
  user_id: string;
  ttl: number;
}

interface AuthContextType {
  authData: AuthData | null;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for auth data in localStorage on mount
    const storedData = localStorage.getItem("authData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setAuthData(parsedData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse auth data:", error);
        localStorage.removeItem("authData");
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("authData");
    setAuthData(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        authData,
        isAuthenticated,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
