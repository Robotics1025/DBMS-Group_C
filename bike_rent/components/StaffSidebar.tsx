"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, Users, Bike, Wrench, Receipt, MapPin, 
  TrendingUp, Settings, CreditCard, FileText,
  ArrowUpDown, AlertTriangle, Clock, Battery
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const staffNavItems = [
  {
    title: "Dashboard",
    href: "/staff-dashboard",
    icon: Home,
    description: "Overview & stats"
  },
  {
    title: "Manual Transactions",
    href: "/staff-dashboard/transactions", 
    icon: CreditCard,
    description: "Process in-person rentals",
    badge: "New"
  },
  {
    title: "Customer Management",
    href: "/staff-dashboard/customers",
    icon: Users,
    description: "Manage customer info"
  },
  {
    title: "Bike Management",
    href: "/staff-dashboard/bikes",
    icon: Bike,
    description: "Fleet overview"
  },
  {
    title: "Maintenance",
    href: "/staff-dashboard/maintenance",
    icon: Wrench,
    description: "Bike maintenance"
  },
  {
    title: "Bike Movement",
    href: "/staff-dashboard/movement",
    icon: ArrowUpDown,
    description: "Track bike relocations"
  },
  {
    title: "Receipts",
    href: "/staff-dashboard/receipts",
    icon: Receipt,
    description: "Generate receipts"
  },
  {
    title: "Reports",
    href: "/staff-dashboard/reports",
    icon: TrendingUp,
    description: "Analytics & reports"
  }
];

export function StaffSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="px-6 py-4 border-b">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">BR</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Staff Panel</h2>
            <p className="text-xs text-gray-500">Operations Dashboard</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {staffNavItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100"
                    >
                      <Link href={item.href}>
                        <Icon className="h-5 w-5" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="truncate">{item.title}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="text-xs ml-2">
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs truncate mt-0.5 opacity-70">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Quick Stats</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Bike className="h-3 w-3 text-green-600" />
                    <span className="text-gray-600">Available</span>
                  </div>
                  <span className="font-medium text-green-600">24</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-blue-600" />
                    <span className="text-gray-600">Rented</span>
                  </div>
                  <span className="font-medium text-blue-600">8</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-3 w-3 text-orange-600" />
                    <span className="text-gray-600">Maintenance</span>
                  </div>
                  <span className="font-medium text-orange-600">3</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Battery className="h-3 w-3 text-purple-600" />
                    <span className="text-gray-600">Charging</span>
                  </div>
                  <span className="font-medium text-purple-600">2</span>
                </div>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}