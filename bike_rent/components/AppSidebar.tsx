"use client";

import { Home, Settings, Bike, Clock, Users, TrendingUp, MapPin } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Bikes", url: "/dashboard/bikes", icon: Bike },
  { title: "Rentals", url: "/dashboard/rentals", icon: Clock },
  { title: "Customers", url: "/dashboard/customers", icon: Users },
  { title: "Analytics", url: "/analytics", icon: TrendingUp },
  { title: "Stations", url: "/stations", icon: MapPin },
];

const supportItems = [
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {/* Logo/Brand */}
        <div className="flex items-center gap-2 px-4 py-6 border-b border-sidebar-border">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Bike className="h-5 w-5 text-primary-foreground" />
          </div>
          {open && (
            <span className="text-sidebar-foreground font-semibold text-lg">
              BikeRental
            </span>
          )}
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors
                          ${isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "hover:bg-sidebar-accent/50 text-sidebar-foreground"}`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Support Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {supportItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors
                          ${isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "hover:bg-sidebar-accent/50 text-sidebar-foreground"}`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
