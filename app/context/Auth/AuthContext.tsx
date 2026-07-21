"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  clearAuthToken,
  getAuthToken,
  getAuthorizationHeaders,
  publicApiBaseUrl,
  saveAuthToken,
} from "@/app/libs/auth-client";

interface AuthContextProps {
  isAuthenticated: boolean;
  isAuthReady: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    if (!getAuthToken()) {
      setIsAuthReady(true);
      return;
    }

    fetch(`${publicApiBaseUrl}/api/auth/me`, {
      headers: getAuthorizationHeaders(),
    })
      .then((response) => {
        if (response.ok) setIsAuthenticated(true);
        else clearAuthToken();
      })
      .catch(() => clearAuthToken())
      .finally(() => setIsAuthReady(true));
  }, []);

  const login = (token: string): void => {
    saveAuthToken(token);
    setIsAuthenticated(true);
    setIsAuthReady(true);
  };

  const logout = (): void => {
    clearAuthToken();
    setIsAuthenticated(false);
    setIsAuthReady(true);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAuthReady, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
