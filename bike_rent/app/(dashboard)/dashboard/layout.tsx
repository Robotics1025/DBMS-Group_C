"use client";

import * as React from "react";

import { useRouter } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopNav } from "@/components/TopNav";
import { useAuth, hasPermission, getDashboardPath } from "@/contexts/AuthContext";
import { useNotify } from "@/hooks/use-notify";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { notify } = useNotify();

  // Handle authentication and role-based access
  React.useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login");
        return;
      }

      // Check if user has admin access
      if (user && !hasPermission(user.role, 'admin')) {
        const correctPath = getDashboardPath(user.role);
        notify.warning("Access Denied", `Redirecting to ${user.role} dashboard`);
        router.push(correctPath);
        return;
      }
    }
  }, [isAuthenticated, isLoading, user, router, notify.warning]);

  // Show welcome notification only once
  React.useEffect(() => {
    if (user && user.role === 'admin' && isAuthenticated && !isLoading) {
      notify.info(`Welcome Admin ${user.name}`, "Full system access granted");
    }
  }, [user?.id, user?.role, isAuthenticated, isLoading, notify.info]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated || !user) {
    return null;
  }

  // Redirect if not admin
  if (!hasPermission(user.role, 'admin')) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <TopNav />
          <main className="flex-1 p-6 bg-background">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                  <p className="text-gray-600">Complete system management and analytics</p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>Logged in as:</span>
                  <span className="font-medium text-gray-900">{user.name}</span>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                    ADMIN
                  </span>
                </div>
              </div>
            </div>
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

