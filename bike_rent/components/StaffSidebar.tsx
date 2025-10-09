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
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Staff Panel</h2>
        
        <nav className="space-y-2">
          {staffNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100",
                  isActive
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-700 hover:text-gray-900"
                )}
              >
                <Icon className={cn("h-5 w-5", isActive ? "text-blue-700" : "text-gray-500")} />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="truncate">{item.title}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <p className={cn(
                    "text-xs truncate mt-0.5",
                    isActive ? "text-blue-600" : "text-gray-500"
                  )}>
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Stats</h3>
          <div className="space-y-2">
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
      </div>
    </aside>
  );
}