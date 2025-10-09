"use client";

import React, { useState, useEffect } from "react";
import { 
  MapPin, Battery, Wrench, AlertTriangle, CheckCircle, Clock, 
  Users, Bike, DollarSign, TrendingUp, Search, Filter, Plus,
  MoreHorizontal, Edit, Trash2, Eye, Bell, User, LogOut,
  CreditCard, Receipt, ArrowUpDown, Calendar
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import Link from "next/link";

interface DashboardStats {
  totalBikes: number;
  availableBikes: number;
  rentedBikes: number;
  maintenanceBikes: number;
  chargingBikes: number;
  activeRentals: number;
  todayRevenue: number;
  totalCustomers: number;
}

interface QuickAction {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
}

interface RecentActivity {
  id: string;
  type: 'rental' | 'return' | 'maintenance' | 'movement';
  title: string;
  description: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

const quickActions: QuickAction[] = [
  {
    title: "Process Rental",
    description: "Start in-person bike rental",
    href: "/staff-dashboard/transactions",
    icon: CreditCard,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    title: "Generate Receipt",
    description: "Print customer receipt",
    href: "/staff-dashboard/receipts",
    icon: Receipt,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    title: "Report Maintenance",
    description: "Log bike maintenance issue",
    href: "/staff-dashboard/maintenance",
    icon: Wrench,
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  },
  {
    title: "Move Bike",
    description: "Record bike location change",
    href: "/staff-dashboard/movement",
    icon: ArrowUpDown,
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  }
];

const mockRecentActivity: RecentActivity[] = [
  {
    id: "1",
    type: "rental",
    title: "New Rental Started",
    description: "John Doe rented Mountain Explorer (BK002)",
    timestamp: "5 minutes ago",
    status: "success"
  },
  {
    id: "2", 
    type: "maintenance",
    title: "Maintenance Required",
    description: "City Commuter (BK003) needs brake adjustment",
    timestamp: "15 minutes ago",
    status: "warning"
  },
  {
    id: "3",
    type: "return",
    title: "Bike Returned",
    description: "Jane Smith returned Urban E-Cruiser (BK001)",
    timestamp: "30 minutes ago",
    status: "info"
  },
  {
    id: "4",
    type: "movement",
    title: "Bike Relocated",
    description: "Speed Demon moved from Tech Hub to Central Station",
    timestamp: "1 hour ago",
    status: "info"
  }
];

export default function StaffDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalBikes: 0,
    availableBikes: 0,
    rentedBikes: 0,
    maintenanceBikes: 0,
    chargingBikes: 0,
    activeRentals: 0,
    todayRevenue: 0,
    totalCustomers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      
      // Fetch bikes stats
      const bikesResponse = await fetch('/api/bike_all');
      const bikesData = await bikesResponse.json();
      
      // Fetch rental stats  
      const rentalsResponse = await fetch('/api/dashboard/stats');
      const rentalsData = await rentalsResponse.json();

      if (bikesData.success && rentalsData.success) {
        const bikes = bikesData.bikes || [];
        
        setStats({
          totalBikes: bikes.length,
          availableBikes: bikes.filter((b: any) => b.CurrentStatus === 'Available').length,
          rentedBikes: bikes.filter((b: any) => b.CurrentStatus === 'Rented').length,
          maintenanceBikes: bikes.filter((b: any) => b.CurrentStatus === 'Maintenance').length,
          chargingBikes: bikes.filter((b: any) => b.CurrentStatus === 'Charging').length,
          activeRentals: rentalsData.activeRentals || 0,
          todayRevenue: rentalsData.todayRevenue || 0,
          totalCustomers: rentalsData.totalCustomers || 0
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      toast.error('Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  const getActivityStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-orange-600';
      case 'error': return 'text-red-600';
      case 'info': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'rental': return CreditCard;
      case 'return': return CheckCircle;
      case 'maintenance': return Wrench;
      case 'movement': return ArrowUpDown;
      default: return Bell;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening at your station today.
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Today</p>
          <p className="text-lg font-semibold text-gray-900">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Available Bikes</p>
                <p className="text-3xl font-bold text-green-900">
                  {loading ? (
                    <div className="animate-pulse bg-green-200 rounded w-16 h-8" />
                  ) : (
                    stats.availableBikes
                  )}
                </p>
                <p className="text-xs text-green-600 mt-1">Ready for rental</p>
              </div>
              <div className="p-3 bg-green-200 rounded-full">
                <Bike className="h-8 w-8 text-green-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">Active Rentals</p>
                <p className="text-3xl font-bold text-blue-900">
                  {loading ? (
                    <div className="animate-pulse bg-blue-200 rounded w-16 h-8" />
                  ) : (
                    stats.activeRentals
                  )}
                </p>
                <p className="text-xs text-blue-600 mt-1">Currently rented</p>
              </div>
              <div className="p-3 bg-blue-200 rounded-full">
                <Clock className="h-8 w-8 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-800">Maintenance</p>
                <p className="text-3xl font-bold text-orange-900">
                  {loading ? (
                    <div className="animate-pulse bg-orange-200 rounded w-16 h-8" />
                  ) : (
                    stats.maintenanceBikes
                  )}
                </p>
                <p className="text-xs text-orange-600 mt-1">Needs attention</p>
              </div>
              <div className="p-3 bg-orange-200 rounded-full">
                <Wrench className="h-8 w-8 text-orange-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-800">Today's Revenue</p>
                <p className="text-3xl font-bold text-purple-900">
                  {loading ? (
                    <div className="animate-pulse bg-purple-200 rounded w-16 h-8" />
                  ) : (
                    `$${stats.todayRevenue.toFixed(2)}`
                  )}
                </p>
                <p className="text-xs text-purple-600 mt-1">From completed rentals</p>
              </div>
              <div className="p-3 bg-purple-200 rounded-full">
                <DollarSign className="h-8 w-8 text-purple-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.title} href={action.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${action.bgColor} group-hover:scale-110 transition-transform`}>
                      <Icon className={`h-6 w-6 ${action.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentActivity.map((activity) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-full bg-white ${getActivityStatusColor(activity.status)}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {activity.title}
                        </h4>
                        <span className="text-xs text-gray-500">{activity.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Today's Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Today's Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Rentals Today</span>
                </div>
                <span className="text-lg font-bold text-blue-900">
                  {loading ? (
                    <div className="animate-pulse bg-blue-200 rounded w-8 h-6" />
                  ) : (
                    stats.activeRentals
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-900">Revenue Generated</span>
                </div>
                <span className="text-lg font-bold text-green-900">
                  {loading ? (
                    <div className="animate-pulse bg-green-200 rounded w-12 h-6" />
                  ) : (
                    `$${stats.todayRevenue.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-900">Maintenance Issues</span>
                </div>
                <span className="text-lg font-bold text-orange-900">
                  {loading ? (
                    <div className="animate-pulse bg-orange-200 rounded w-6 h-6" />
                  ) : (
                    stats.maintenanceBikes
                  )}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3">Fleet Status Overview</p>
                <div className="flex justify-center gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{stats.availableBikes}</div>
                    <div className="text-xs text-gray-500">Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{stats.rentedBikes}</div>
                    <div className="text-xs text-gray-500">Rented</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">{stats.maintenanceBikes}</div>
                    <div className="text-xs text-gray-500">Maintenance</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}