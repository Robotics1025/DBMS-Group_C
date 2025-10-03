"use client";

import * as React from "react";
import { SidebarNav } from "@/components/sidebar-nav";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = React.useState<{ id: string; email: string } | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Read sessionId from cookie
    const cookies = document.cookie.split("; ").reduce((acc: any, curr) => {
      const [key, value] = curr.split("=");
      acc[key] = value;
      return acc;
    }, {});

    const sessionId = cookies["sessionId"];

    if (!sessionId) {
      router.push("/login");
      return;
    }

    setUser({ id: sessionId, email: "" }); // minimal user info
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar with mobile toggle */}
      <SidebarNav
        user={user}
        onLogout={() => {
          document.cookie = "sessionId=; path=/; max-age=0"; // clear session
          router.push("/login");
        }}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:pl-64">
        {/* Header */}
        <header className="w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 p-4 flex items-center justify-between sticky top-0 z-20">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <p className="text-sm text-muted-foreground">{user.email || "user@example.com"}</p>
            <button
              onClick={() => {
                document.cookie = "sessionId=; path=/; max-age=0";
                router.push("/login");
              }}
              className="text-red-500 hover:text-red-600 text-sm font-medium"
            >
              Sign Out
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
