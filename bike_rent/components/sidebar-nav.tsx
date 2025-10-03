"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Users,
  DollarSign,
  Settings,
  Home,
  Menu,
  X,
  LogOut,
  Bike,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";

interface SidebarNavProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  onLogout: () => void;
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Bikes", href: "/properties", icon: Building2 },
  { name: "Rental History", href: "/tenants", icon: Users },
  { name: "Payments", href: "/payments", icon: DollarSign },
  { name: "Settings", href: "/settings", icon: Settings },
  {
    name: "Docs",
    href: "https://nextjs.org",
    icon: ExternalLink,
    external: true,
    badge: "NEW",
  },
];

export function SidebarNav({ user, onLogout }: SidebarNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-background"
        >
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 transform transition-all duration-300 ease-in-out flex flex-col",
          collapsed ? "w-20" : "w-64",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Collapse toggle inside sidebar */}
        <div className="flex justify-end p-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? "→" : "←"}
          </Button>
        </div>

        {/* Logo */}
        <div
          className={cn(
            "flex items-center gap-3 px-6 py-6 border-b border-gray-200 dark:border-gray-800",
            collapsed && "justify-center"
          )}
        >
          <Bike className="h-8 w-8 text-primary" />
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold">BIKE RENTAL</h1>
              <p className="text-xs text-muted-foreground">Smart Dashboard</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-6 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                target={item.external ? "_blank" : "_self"}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors group",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  collapsed && "justify-center"
                )}
              >
                <item.icon className="h-5 w-5" />
                {!collapsed && <span className="flex-1">{item.name}</span>}
                {!collapsed && item.badge && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Upgrade Box */}
        {!collapsed && (
          <div className="px-6 mb-4">
            <div className="rounded-lg bg-primary/10 p-4 text-center">
              <p className="text-sm mb-2 font-medium">Upgrade to Pro 🚀</p>
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </div>
          </div>
        )}

        {/* User info */}
        <div
          className={cn(
            "px-6 py-4 border-t border-gray-200 dark:border-gray-800",
            collapsed && "justify-center"
          )}
        >
          <div className={cn("flex items-center gap-3 mb-3", collapsed && "justify-center")}>
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
            )}
            {!collapsed && (
              <div className="flex-1">
                <p className="text-sm font-medium">{user?.name || "User"}</p>
                <p className="text-xs text-muted-foreground">{user?.email || "user@example.com"}</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className={cn(
              "w-full justify-start gap-2 text-muted-foreground hover:text-destructive",
              collapsed && "justify-center"
            )}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && "Sign Out"}
          </Button>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
