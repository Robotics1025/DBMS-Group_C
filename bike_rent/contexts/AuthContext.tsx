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

// Mock users for different roles
const mockUsers: Record<string, User> = {
  'admin@bikerent.com': {
    id: '1',
    name: 'Admin User',
    email: 'admin@bikerent.com',
    phone: '+1-555-0001',
    role: 'admin',
    avatar: '/assets/images/avatar/admin-avatar.webp',
    createdAt: '2023-01-01',
    isActive: true
  },
  'staff@bikerent.com': {
    id: '2',
    name: 'Staff Member',
    email: 'staff@bikerent.com',
    phone: '+1-555-0002',
    role: 'staff',
    avatar: '/assets/images/avatar/staff-avatar.webp',
    createdAt: '2023-02-01',
    isActive: true
  },
  'customer@bikerent.com': {
    id: '3',
    name: 'John Customer',
    email: 'customer@bikerent.com',
    phone: '+1-555-0003',
    role: 'customer',
    avatar: '/assets/images/avatar/customer-avatar.webp',
    createdAt: '2023-03-01',
    isActive: true
  }
};

// Mock passwords (in real app, this would be handled by backend)
const mockPasswords: Record<string, string> = {
  'admin@bikerent.com': 'admin123',
  'staff@bikerent.com': 'staff123',
  'customer@bikerent.com': 'customer123'
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
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
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockUsers[email.toLowerCase()];
    const expectedPassword = mockPasswords[email.toLowerCase()];

    if (!user) {
      setIsLoading(false);
      return { success: false, message: 'User not found' };
    }

    if (password !== expectedPassword) {
      setIsLoading(false);
      return { success: false, message: 'Invalid password' };
    }

    if (!user.isActive) {
      setIsLoading(false);
      return { success: false, message: 'Account is deactivated' };
    }

    setUser(user);
    setIsLoading(false);
    return { success: true, user };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
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