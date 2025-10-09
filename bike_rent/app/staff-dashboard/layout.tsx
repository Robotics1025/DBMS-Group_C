"use client";

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { redirect } from 'next/navigation';
import { StaffSidebar } from '@/components/StaffSidebar';
import { StaffTopNav } from '@/components/StaffTopNav';

interface StaffLayoutProps {
  children: React.ReactNode;
}

export default function StaffLayout({ children }: StaffLayoutProps) {
  const { user, isAuthenticated, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-blue-200 rounded-full mx-auto mb-4"></div>
          <div className="h-4 bg-blue-200 rounded w-32 mx-auto mb-2"></div>
          <div className="h-3 bg-blue-200 rounded w-24 mx-auto"></div>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated or not staff/admin
  if (!isAuthenticated || !user || !['staff', 'admin'].includes(user.role)) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Staff Navigation */}
      <StaffTopNav />
      
      <div className="flex">
        {/* Staff Sidebar */}
        <StaffSidebar />
        
        {/* Main Content */}
        <main className="flex-1 ml-64">
          {children}
        </main>
      </div>
    </div>
  );
}