"use client";

import React, { useState, useEffect } from "react";
import { 
  MapPin, Battery, Wrench, AlertTriangle, CheckCircle, Clock, 
  Users, Bike, DollarSign, TrendingUp, Search, Filter, Plus,
  MoreHorizontal, Edit, Trash2, Eye, Bell, User, LogOut,
  CreditCard, Receipt, ArrowUpDown, Calendar, Activity, BarChart3
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import Image from "next/image";

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
    <div className="space-y-6 relative min-h-screen">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Large shape in top-right */}
        <div className="absolute top-0 right-0 w-80 h-80 opacity-[0.02] rotate-12 animate-pulse">
          <Image 
            src="/assets/background/shape-square.svg" 
            alt="" 
            fill 
            className="object-contain"
          />
        </div>
        
        {/* Medium shape in bottom-left */}
        <div className="absolute bottom-20 left-10 w-60 h-60 opacity-[0.03] -rotate-45 animate-pulse delay-1000">
          <Image 
            src="/assets/background/shape-square.svg" 
            alt="" 
            fill 
            className="object-contain"
          />
        </div>
        
        {/* Small shape in center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 opacity-[0.015] rotate-90 animate-pulse delay-2000">
          <Image 
            src="/assets/background/shape-square.svg" 
            alt="" 
            fill 
            className="object-contain"
          />
        </div>
        
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/50 to-background/20" />
      </div>

      {/* Header with Cool Background */}
      <div className="relative bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 rounded-2xl p-8 border backdrop-blur-sm overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Staff Dashboard
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Welcome back, {user?.name?.split(' ')[0]}! Manage operations efficiently
            </p>
          </div>
          <div className="hidden md:block relative w-40 h-40">
            <Image 
              src="/assets/illustrations/illustration-dashboard.webp" 
              alt="Staff Dashboard illustration" 
              fill
              className="object-contain"
            />
          </div>
        </div>
        
        {/* Additional background shapes in header */}
        <div className="absolute top-2 left-2 w-20 h-20 opacity-5 rotate-45">
          <Image 
            src="/assets/background/shape-square.svg" 
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute bottom-2 right-2 w-16 h-16 opacity-5 -rotate-12">
          <Image 
            src="/assets/background/shape-square.svg" 
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Available Bikes",
            value: loading ? "..." : stats.availableBikes.toString(),
            change: "Ready for rental",
            icon: Bike,
            colors: {
              bg: "bg-gradient-to-br from-green-100 to-green-50",
              iconBg: "bg-green-500",
              iconColor: "text-white",
              textColor: "text-green-700",
              valueColor: "text-green-800",
              changeColor: "text-green-600"
            }
          },
          {
            title: "Active Rentals",
            value: loading ? "..." : stats.activeRentals.toString(),
            change: "Currently rented",
            icon: Clock,
            colors: {
              bg: "bg-gradient-to-br from-blue-100 to-blue-50",
              iconBg: "bg-blue-500",
              iconColor: "text-white",
              textColor: "text-blue-700",
              valueColor: "text-blue-800",
              changeColor: "text-blue-600"
            }
          },
          {
            title: "Maintenance",
            value: loading ? "..." : stats.maintenanceBikes.toString(),
            change: "Needs attention",
            icon: Wrench,
            colors: {
              bg: "bg-gradient-to-br from-orange-100 to-orange-50",
              iconBg: "bg-orange-500",
              iconColor: "text-white",
              textColor: "text-orange-700",
              valueColor: "text-orange-800",
              changeColor: "text-orange-600"
            }
          },
          {
            title: "Today's Revenue",
            value: loading ? "..." : `RM ${stats.todayRevenue.toFixed(2)}`,
            change: "Completed rentals",
            icon: DollarSign,
            colors: {
              bg: "bg-gradient-to-br from-purple-100 to-purple-50",
              iconBg: "bg-purple-500",
              iconColor: "text-white",
              textColor: "text-purple-700",
              valueColor: "text-purple-800",
              changeColor: "text-purple-600"
            }
          }
        ].map((stat, index) => {
          const Icon = stat.icon;
          const colors = stat.colors;
          
          return (
            <Card key={stat.title} className={`${colors.bg} border-0 hover:shadow-lg transition-all duration-300 overflow-hidden relative rounded-2xl`}>
              {/* Dot Pattern Background */}
              <div className="absolute inset-0 opacity-20">
                <div className={`absolute inset-0 ${colors.textColor}`}>
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id={`dots-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="1" fill="currentColor"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#dots-${index})`}/>
                  </svg>
                </div>
              </div>
              
              {/* Shape Pattern */}
              <div className="absolute top-4 right-4 w-16 h-16 opacity-10">
                <Image 
                  src="/assets/background/shape-square.svg" 
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              
              <CardContent className="p-6 relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${colors.iconBg}`}>
                    <Icon className={`h-6 w-6 ${colors.iconColor}`} />
                  </div>
                  <div className="flex items-center gap-1 text-right">
                    <TrendingUp className={`h-4 w-4 ${colors.changeColor}`} />
                    <span className={`text-sm font-medium ${colors.changeColor}`}>
                      +{stat.change}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <h3 className={`text-sm font-medium ${colors.textColor}`}>
                    {stat.title}
                  </h3>
                  <div className={`text-3xl font-bold ${colors.valueColor}`}>
                    {stat.value}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
          <Image 
            src="/assets/background/shape-square.svg" 
            alt=""
            fill
            className="object-contain"
          />
        </div>
        
        <CardHeader className="bg-gradient-to-r from-indigo-500/5 to-blue-500/5 relative z-10">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Common staff operations and tasks
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.title} href={action.href}>
                  <div className="group p-4 rounded-xl bg-gradient-to-br from-white to-gray-50 border hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-12 h-12 opacity-5">
                      <Image 
                        src="/assets/background/shape-square.svg" 
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                    
                    <div className="relative z-10">
                      <div className={`p-3 rounded-lg ${action.bgColor} group-hover:scale-110 transition-transform mb-3 w-fit`}>
                        <Icon className={`h-6 w-6 ${action.color}`} />
                      </div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-blue-500/5">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest operations and system events
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {mockRecentActivity.length === 0 ? (
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">No recent activity</h3>
                  <p className="text-xs text-muted-foreground">Staff operations will appear here</p>
                </div>
              ) : (
                mockRecentActivity.map((activity) => {
                  const Icon = getActivityIcon(activity.type);
                  return (
                    <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors border-b last:border-0">
                      <div className={`p-2 rounded-full bg-background ring-2 ring-primary/20 ${getActivityStatusColor(activity.status)}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium leading-none truncate">
                            {activity.title}
                          </h4>
                          <Badge variant="secondary" className="text-xs">
                            {activity.timestamp}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <Card className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
            <Image 
              src="/assets/background/shape-square.svg" 
              alt=""
              fill
              className="object-contain"
            />
          </div>
          
          <CardHeader className="bg-gradient-to-r from-purple-500/5 to-pink-500/5 relative z-10">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Performance Metrics
            </CardTitle>
            <CardDescription>
              Today's operational summary
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 relative z-10">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Fleet Utilization
                </span>
                <span className="font-medium text-primary">
                  {stats.totalBikes > 0 ? Math.round((stats.rentedBikes / stats.totalBikes) * 100) : 0}%
                </span>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000 w-0" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                  Maintenance Rate
                </span>
                <span className="font-medium text-yellow-600">
                  {stats.totalBikes > 0 ? Math.round((stats.maintenanceBikes / stats.totalBikes) * 100) : 0}%
                </span>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full transition-all duration-1000 w-0" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  System Health
                </span>
                <span className="font-medium text-green-600">Excellent</span>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full w-[95%] transition-all duration-1000" />
              </div>
            </div>

            <div className="pt-6 space-y-3 border-t">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">{stats.availableBikes}</div>
                  <div className="text-xs text-blue-700">Available</div>
                </div>
                <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <div className="text-lg font-bold text-green-600">{stats.activeRentals}</div>
                  <div className="text-xs text-green-700">Active</div>
                </div>
              </div>
              
              <Link href="/staff-dashboard/maintenance">
                <Button className="w-full bg-gradient-to-r from-primary to-blue-600 text-primary-foreground hover:from-primary/90 hover:to-blue-600/90 transition-all duration-300 transform hover:scale-105 shadow-md">
                  <Wrench className="h-4 w-4 mr-2" />
                  Maintenance Hub
                </Button>
              </Link>
              
              <Link href="/staff-dashboard/transactions">
                <Button variant="outline" className="w-full hover:bg-secondary/80 transition-all duration-300 transform hover:scale-105">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Process Rental
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Reports Section */}
      <Card className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
          <Image 
            src="/assets/background/shape-square.svg" 
            alt=""
            fill
            className="object-contain"
          />
        </div>
        
        <CardHeader className="bg-gradient-to-r from-emerald-500/5 to-teal-500/5 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Business Analytics
              </CardTitle>
              <CardDescription>
                Key performance insights and reports
              </CardDescription>
            </div>
            <Link href="/staff-dashboard/reports">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                View All Reports
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Quick Report Cards */}
            {[
              {
                title: "Monthly Revenue",
                description: "Current month performance",
                icon: DollarSign,
                color: "text-green-600",
                bgColor: "bg-green-50",
                href: "/staff-dashboard/reports?type=monthly"
              },
              {
                title: "Location Performance", 
                description: "Station-wise analytics",
                icon: MapPin,
                color: "text-blue-600",
                bgColor: "bg-blue-50",
                href: "/staff-dashboard/reports?type=locations"
              },
              {
                title: "Top Customers",
                description: "Most valuable clients",
                icon: Users,
                color: "text-purple-600",
                bgColor: "bg-purple-50",
                href: "/staff-dashboard/reports?type=top-customers"
              },
              {
                title: "Revenue Trends",
                description: "12-month analysis",
                icon: TrendingUp,
                color: "text-orange-600",
                bgColor: "bg-orange-50",
                href: "/staff-dashboard/reports?type=revenue-trend"
              }
            ].map((report) => {
              const Icon = report.icon;
              return (
                <Link key={report.title} href={report.href}>
                  <div className="group p-4 rounded-xl bg-gradient-to-br from-white to-gray-50 border hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-10 h-10 opacity-5">
                      <Image 
                        src="/assets/background/shape-square.svg" 
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                    
                    <div className="relative z-10">
                      <div className={`p-2 rounded-lg ${report.bgColor} group-hover:scale-110 transition-transform mb-3 w-fit`}>
                        <Icon className={`h-5 w-5 ${report.color}`} />
                      </div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1 text-sm">
                        {report.title}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {report.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">11</div>
                <div className="text-sm text-blue-700">Report Types</div>
                <div className="text-xs text-blue-600 mt-1">Available Analytics</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <div className="text-2xl font-bold text-green-600">Live</div>
                <div className="text-sm text-green-700">Data Updates</div>
                <div className="text-xs text-green-600 mt-1">Real-time Insights</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">CSV</div>
                <div className="text-sm text-purple-700">Export Format</div>
                <div className="text-xs text-purple-600 mt-1">Easy Data Export</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}