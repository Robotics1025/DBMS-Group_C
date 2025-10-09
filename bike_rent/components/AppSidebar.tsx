"use client";

import { Home, Settings, Bike, Clock, Users, TrendingUp, MapPin, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

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
  { 
    title: "Dashboard", 
    url: "/dashboard", 
    icon: Home, 
    description: "Overview & statistics",
    color: "text-blue-600" 
  },
  { 
    title: "Bikes", 
    url: "/dashboard/bikes", 
    icon: Bike, 
    description: "Manage fleet",
    color: "text-green-600" 
  },
  { 
    title: "Rentals", 
    url: "/dashboard/rentals", 
    icon: Clock, 
    description: "Active bookings",
    color: "text-orange-600",
    badge: "12" 
  },
  { 
    title: "Staff", 
    url: "/dashboard/staff", 
    icon: Users, 
    description: "Team management",
    color: "text-purple-600" 
  },
  { 
    title: "Analytics", 
    url: "/dashboard/analytics", 
    icon: TrendingUp, 
    description: "Reports & insights",
    color: "text-indigo-600" 
  },
  { 
    title: "Stations", 
    url: "/dashboard/stations", 
    icon: MapPin, 
    description: "Location management",
    color: "text-pink-600" 
  },
];

const supportItems = [
  { 
    title: "Settings", 
    url: "/dashboard/settings", 
    icon: Settings, 
    description: "Account & preferences",
    color: "text-gray-600" 
  },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const { user } = useAuth();
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <Sidebar 
      collapsible="icon" 
      className="border-r border-border/40 bg-gradient-to-b from-background/95 to-background backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <SidebarContent className="relative">
        {/* Enhanced Logo/Brand Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10" />
          <div className="relative flex items-center gap-3 px-6 py-8 border-b border-border/40">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg ring-1 ring-primary/20">
              <Bike className="h-5 w-5 text-primary-foreground" />
            </div>
            {open && (
              <div className="flex flex-col">
                <span className="text-foreground font-bold text-xl tracking-tight">
                  BikeRental
                </span>
                <span className="text-muted-foreground text-xs font-medium">
                  Management System
                </span>
              </div>
            )}
          </div>
        </div>

        {/* User Profile Section */}
        {open && user && (
          <div className="px-6 py-4 border-b border-border/40 bg-muted/20">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {user.name}
                </p>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={user.role === 'admin' ? 'destructive' : 'secondary'}
                    className="text-xs px-2 py-0"
                  >
                    {user.role}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Navigation with Material Design */}
        <div className="flex-1 px-3 py-4 space-y-2">
          <SidebarGroup>
            <SidebarGroupLabel className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Main Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {mainItems.map((item) => {
                  const isActive = pathname === item.url;
                  const isHovered = hoveredItem === item.title;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          onMouseEnter={() => setHoveredItem(item.title)}
                          onMouseLeave={() => setHoveredItem(null)}
                          className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ease-in-out transform
                            ${isActive
                              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02] border border-primary/20"
                              : "hover:bg-accent/80 text-foreground hover:shadow-md hover:scale-[1.01] border border-transparent hover:border-accent"
                            }
                            ${isHovered && !isActive ? "bg-accent/50" : ""}
                          `}
                        >
                          {/* Active indicator */}
                          {isActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-foreground rounded-r-full" />
                          )}
                          
                          <div className={`transition-colors duration-200 ${isActive ? 'text-primary-foreground' : item.color}`}>
                            <item.icon className="h-5 w-5" />
                          </div>
                          
                          {open && (
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-sm truncate">
                                  {item.title}
                                </span>
                                {item.badge && (
                                  <Badge 
                                    variant="secondary" 
                                    className="text-xs px-1.5 py-0 ml-2 bg-background/80"
                                  >
                                    {item.badge}
                                  </Badge>
                                )}
                              </div>
                              <p className={`text-xs truncate transition-colors duration-200 ${
                                isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'
                              }`}>
                                {item.description}
                              </p>
                            </div>
                          )}
                          
                          {/* Hover indicator */}
                          {!open && isHovered && (
                            <ChevronRight className="h-3 w-3 opacity-60" />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Support Section */}
          <SidebarGroup className="mt-8">
            <SidebarGroupLabel className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Account
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {supportItems.map((item) => {
                  const isActive = pathname === item.url;
                  const isHovered = hoveredItem === item.title;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          onMouseEnter={() => setHoveredItem(item.title)}
                          onMouseLeave={() => setHoveredItem(null)}
                          className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ease-in-out transform
                            ${isActive
                              ? "bg-accent text-accent-foreground shadow-md border border-accent/20"
                              : "hover:bg-accent/50 text-foreground hover:shadow-sm hover:scale-[1.01] border border-transparent"
                            }
                            ${isHovered && !isActive ? "bg-accent/30" : ""}
                          `}
                        >
                          <div className={`transition-colors duration-200 ${isActive ? 'text-accent-foreground' : item.color}`}>
                            <item.icon className="h-5 w-5" />
                          </div>
                          
                          {open && (
                            <div className="flex-1 min-w-0">
                              <span className="font-medium text-sm truncate">
                                {item.title}
                              </span>
                              <p className={`text-xs truncate transition-colors duration-200 ${
                                isActive ? 'text-accent-foreground/80' : 'text-muted-foreground'
                              }`}>
                                {item.description}
                              </p>
                            </div>
                          )}
                          
                          {!open && isHovered && (
                            <ChevronRight className="h-3 w-3 opacity-60" />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* Footer Section */}
        {open && (
          <div className="px-6 py-4 border-t border-border/40 bg-muted/10">
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                <p className="font-medium">BikeRental v2.0</p>
                <p>© 2025 All rights reserved</p>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
