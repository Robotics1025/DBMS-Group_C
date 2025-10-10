"use client";

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { redirect } from 'next/navigation';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { StaffSidebar } from '@/components/StaffSidebar';
import { StaffTopNav } from '@/components/StaffTopNav';
import Image from 'next/image';

interface StaffLayoutProps {
  children: React.ReactNode;
}

export default function StaffLayout({ children }: StaffLayoutProps) {
  const { user, isAuthenticated, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 opacity-[0.02] rotate-12 animate-pulse">
            <Image 
              src="/assets/background/shape-square.svg" 
              alt="" 
              fill 
              className="object-contain"
            />
          </div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 opacity-[0.03] -rotate-45 animate-pulse delay-1000">
            <Image 
              src="/assets/background/shape-square.svg" 
              alt="" 
              fill 
              className="object-contain"
            />
          </div>
        </div>
        
        <div className="text-center p-8 rounded-2xl bg-white/60 backdrop-blur-sm border shadow-2xl">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading Staff Dashboard</h2>
          <p className="text-gray-600">Preparing your workspace...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated or not staff/admin
  if (!isAuthenticated || !user || !['staff', 'admin'].includes(user.role)) {
    redirect('/login');
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 relative overflow-hidden">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 -z-10">
          {/* Large decorative shapes */}
          <div className="absolute top-0 right-0 w-80 h-80 opacity-[0.015] rotate-12 animate-pulse">
            <Image 
              src="/assets/background/shape-square.svg" 
              alt="" 
              fill 
              className="object-contain"
            />
          </div>
          <div className="absolute bottom-20 left-10 w-60 h-60 opacity-[0.02] -rotate-45 animate-pulse delay-1000">
            <Image 
              src="/assets/background/shape-square.svg" 
              alt="" 
              fill 
              className="object-contain"
            />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 opacity-[0.01] rotate-90 animate-pulse delay-2000">
            <Image 
              src="/assets/background/shape-square.svg" 
              alt="" 
              fill 
              className="object-contain"
            />
          </div>
          
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/30 to-white/10" />
        </div>

        {/* Staff Top Navigation - Fixed at top */}
        <StaffTopNav />
        
        {/* Content with Sidebar */}
        <div className="flex pt-16 min-h-screen">
          {/* Staff Sidebar */}
          <StaffSidebar />
          
          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto relative">
            <div className="container max-w-7xl mx-auto p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}