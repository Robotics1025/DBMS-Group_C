"use client";

import * as React from "react";

import { useRouter } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopNav } from "@/components/TopNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = React.useState<{ id: string; email: string } | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
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

    setUser({ id: sessionId, email: "" });
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
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <TopNav />
          <main className="flex-1 p-6 bg-background">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

