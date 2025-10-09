"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'customer' | 'staff' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string; user?: User }>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  switchRole: (role: UserRole) => void; // For demo purposes
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Real authentication using API - no mock data needed

// Helper function to normalize role names from database
function normalizeRole(role: string): UserRole {
  const normalizedRole = role.toLowerCase().trim();
  switch (normalizedRole) {
    case 'administrator':
    case 'admin':
      return 'admin';
    case 'staff':
    case 'employee':
      return 'staff';
    case 'customer':
    case 'user':
    default:
      return 'customer';
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage and validate session on mount
  useEffect(() => {
    const validateSession = async () => {
      const storedUser = localStorage.getItem('user');
      const sessionId = localStorage.getItem('sessionId');
      
      if (storedUser && sessionId) {
        try {
          const userData = JSON.parse(storedUser);
          // Optionally validate session with server here
          setUser(userData);
        } catch (error) {
          console.error('Error parsing stored user:', error);
          localStorage.removeItem('user');
          localStorage.removeItem('sessionId');
        }
      }
      setIsLoading(false);
    };

    validateSession();
  }, []);

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string; user?: User }> => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email: email, Password: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        return { success: false, message: data.error || 'Login failed' };
      }

      if (!data.success) {
        setIsLoading(false);
        return { success: false, message: data.error || 'Login failed' };
      }

      // Transform API response to match our User interface
      const user: User = {
        id: data.user.id.toString(),
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phoneNumber,
        role: normalizeRole(data.user.role),
        createdAt: new Date().toISOString(),
        isActive: true
      };

      // Store session ID in localStorage for API calls
      if (data.sessionId) {
        localStorage.setItem('sessionId', data.sessionId);
        // Set cookie for server-side authentication
        document.cookie = `sessionId=${data.sessionId}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
      }

      setUser(user);
      setIsLoading(false);
      return { success: true, user };

    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      // Call logout API to invalidate session
      const sessionId = localStorage.getItem('sessionId');
      if (sessionId) {
        await fetch('/api/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionId }),
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local state regardless of API call result
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('sessionId');
      // Clear cookie
      document.cookie = 'sessionId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
    }
  };

  // For demo purposes - switch roles without re-authentication
  const switchRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updateUser,
    switchRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Helper functions for role-based access control
export function hasPermission(userRole: UserRole, requiredRole: UserRole | UserRole[]): boolean {
  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(userRole);
  }
  
  const roleHierarchy: Record<UserRole, number> = {
    customer: 1,
    staff: 2,
    admin: 3
  };
  
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

export function getDashboardPath(role: UserRole): string {
  switch (role) {
    case 'admin':
      return '/dashboard';
    case 'staff':
      return '/staff-dashboard';
    case 'customer':
      return '/customer-dashboard';
    default:
      return '/login';
  }
}