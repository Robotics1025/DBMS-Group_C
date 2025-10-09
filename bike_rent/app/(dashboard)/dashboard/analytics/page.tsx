"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, TrendingUp, DollarSign, Users, Bike, MapPin, Calendar, 
  Download, Printer, Filter, RefreshCw, Eye, ChevronUp, ChevronDown,
  Activity, Clock, Target, Award
} from "lucide-react";
import Image from "next/image";

interface AnalyticsData {
  revenue: {
    total: number;
    daily: number;
    weekly: number;
    monthly: number;
    growth: number;
  };
  rentals: {
    total: number;
    active: number;
    completed: number;
    cancelled: number;
    dailyAverage: number;
  };
  users: {
    total: number;
    active: number;
    newThisMonth: number;
    retention: number;
  };
  stations: {
    total: number;
    active: number;
    avgUtilization: number;
    topPerformer: string;
  };
  chartData: {
    revenue: Array<{month: string, revenue: number, growth: number}>;
    rentals: Array<{day: string, rentals: number, completed: number}>;
    stations: Array<{name: string, utilization: number, revenue: number}>;
    users: Array<{month: string, new: number, active: number}>;
  };
}

export default function Analytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("monthly");
  const [reportType, setReportType] = useState("overview");
  const [isGenerating, setIsGenerating] = useState(false);

  // Sample data - in real app, this would come from API
  useEffect(() => {
    const fetchAnalytics = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setData({
        revenue: {
          total: 125840,
          daily: 4200,
          weekly: 29400,
          monthly: 125840,
          growth: 12.5
        },
        rentals: {
          total: 8467,
          active: 234,
          completed: 8233,
          cancelled: 34,
          dailyAverage: 156
        },
        users: {
          total: 4521,
          active: 3892,
          newThisMonth: 412,
          retention: 89.2
        },
        stations: {
          total: 48,
          active: 46,
          avgUtilization: 74.5,
          topPerformer: "Central Hub Station"
        },
        chartData: {
          revenue: [
            {month: "Jan", revenue: 98400, growth: 8.2},
            {month: "Feb", revenue: 105600, growth: 7.3},
            {month: "Mar", revenue: 112800, growth: 6.8},
            {month: "Apr", revenue: 119200, growth: 5.7},
            {month: "May", revenue: 125840, growth: 5.6},
            {month: "Jun", revenue: 134200, growth: 6.6}
          ],
          rentals: [
            {day: "Mon", rentals: 145, completed: 142},
            {day: "Tue", rentals: 162, completed: 158},
            {day: "Wed", rentals: 178, completed: 174},
            {day: "Thu", rentals: 156, completed: 152},
            {day: "Fri", rentals: 189, completed: 185},
            {day: "Sat", rentals: 201, completed: 198},
            {day: "Sun", rentals: 167, completed: 164}
          ],
          stations: [
            {name: "Central Hub", utilization: 92, revenue: 15600},
            {name: "Park Station", utilization: 87, revenue: 12400},
            {name: "Mall Center", utilization: 82, revenue: 11200},
            {name: "University", utilization: 78, revenue: 9800},
            {name: "Airport", utilization: 74, revenue: 8900}
          ],
          users: [
            {month: "Jan", new: 245, active: 3200},
            {month: "Feb", new: 289, active: 3350},
            {month: "Mar", new: 356, active: 3580},
            {month: "Apr", new: 398, active: 3750},
            {month: "May", new: 412, active: 3892},
            {month: "Jun", new: 445, active: 4021}
          ]
        }
      });
      setLoading(false);
    };

    fetchAnalytics();
  }, [timeframe]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportReport = async () => {
    setIsGenerating(true);
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In real app, this would generate and download a PDF/Excel file
    const reportData = {
      type: reportType,
      timeframe: timeframe,
      generatedAt: new Date().toISOString(),
      data: data
    };
    
    console.log("Exporting report:", reportData);
    setIsGenerating(false);
  };

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative min-h-screen print:space-y-4">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden print:hidden">
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

      {/* Header & Controls */}
      <div className="relative bg-gradient-to-r from-primary/5 via-blue-500/5 to-purple-500/5 rounded-2xl p-6 border backdrop-blur-sm overflow-hidden print:bg-transparent print:border-2 print:border-gray-300">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between relative z-10 print:flex-row print:justify-between">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent print:text-black print:bg-none">
              Analytics & Reports
            </h1>
            <p className="text-muted-foreground mt-2 text-base lg:text-lg print:text-black">
              Performance insights and data-driven analytics for your bike rental business
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 print:hidden">
            <div className="flex gap-2">
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-32 h-10">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-40 h-10">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overview">Overview</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="usage">Usage</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handlePrint}
                className="gap-2 h-10"
              >
                <Printer className="h-4 w-4" />
                Print
              </Button>
              <Button 
                onClick={handleExportReport}
                disabled={isGenerating}
                className="gap-2 bg-gradient-to-r from-primary to-accent shadow-lg hover:shadow-xl transition-all h-10"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Export Report
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Print-only report header */}
        <div className="hidden print:block mt-4 pt-4 border-t-2 border-gray-300">
          <div className="flex justify-between text-sm text-gray-600">
            <div>Report Type: {reportType.charAt(0).toUpperCase() + reportType.slice(1)}</div>
            <div>Timeframe: {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}</div>
            <div>Generated: {new Date().toLocaleDateString()}</div>
          </div>
        </div>
      </div>

      {/* Performance Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 print:grid-cols-4 print:gap-3">
        {[
          {
            title: "Total Revenue",
            value: `$${data.revenue.total.toLocaleString()}`,
            subtitle: `$${data.revenue.daily.toLocaleString()} today`,
            change: `+${data.revenue.growth}%`,
            icon: DollarSign,
            bg: "bg-gradient-to-br from-green-100 to-green-50",
            iconBg: "bg-green-500",
            textColor: "text-green-700",
            valueColor: "text-green-800",
            trend: "up"
          },
          {
            title: "Active Rentals",
            value: data.rentals.active.toLocaleString(),
            subtitle: `${data.rentals.dailyAverage} avg/day`,
            change: `${data.rentals.completed} completed`,
            icon: Bike,
            bg: "bg-gradient-to-br from-blue-100 to-blue-50",
            iconBg: "bg-blue-500",
            textColor: "text-blue-700",
            valueColor: "text-blue-800",
            trend: "stable"
          },
          {
            title: "Total Users",
            value: data.users.total.toLocaleString(),
            subtitle: `${data.users.newThisMonth} new this month`,
            change: `${data.users.retention}% retention`,
            icon: Users,
            bg: "bg-gradient-to-br from-purple-100 to-purple-50",
            iconBg: "bg-purple-500",
            textColor: "text-purple-700",
            valueColor: "text-purple-800",
            trend: "up"
          },
          {
            title: "Station Utilization",
            value: `${data.stations.avgUtilization}%`,
            subtitle: `${data.stations.active}/${data.stations.total} active`,
            change: data.stations.topPerformer,
            icon: MapPin,
            bg: "bg-gradient-to-br from-orange-100 to-orange-50",
            iconBg: "bg-orange-500",
            textColor: "text-orange-700",
            valueColor: "text-orange-800",
            trend: "up"
          }
        ].map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? ChevronUp : ChevronDown;
          
          return (
            <Card key={metric.title} className={`${metric.bg} border-0 hover:shadow-lg transition-all duration-300 overflow-hidden relative rounded-2xl print:shadow-none print:border print:border-gray-300`}>
              {/* Dot Pattern Background */}
              <div className="absolute inset-0 opacity-20 print:hidden">
                <div className={`absolute inset-0 ${metric.textColor}`}>
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
              <div className="absolute top-4 right-4 w-16 h-16 opacity-10 print:hidden">
                <Image 
                  src="/assets/background/shape-square.svg" 
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              
              <CardContent className="p-4 lg:p-6 relative z-10 print:p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${metric.iconBg} print:bg-gray-600`}>
                    <Icon className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                  </div>
                  {metric.trend && (
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full bg-white/50 print:bg-gray-100`}>
                      <TrendIcon className={`h-3 w-3 ${metric.trend === 'up' ? 'text-green-600' : 'text-gray-500'}`} />
                      <span className={`text-xs font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-gray-500'}`}>
                        {metric.trend === 'up' ? 'Growing' : 'Stable'}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-1">
                  <h3 className={`text-sm font-medium ${metric.textColor} print:text-gray-700`}>
                    {metric.title}
                  </h3>
                  <div className={`text-2xl lg:text-3xl font-bold ${metric.valueColor} print:text-black`}>
                    {metric.value}
                  </div>
                  <p className={`text-xs ${metric.textColor} opacity-80 print:text-gray-600`}>
                    {metric.subtitle}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <Badge variant="secondary" className={`text-xs ${metric.textColor} bg-white/60 print:bg-gray-200 print:text-black`}>
                      {metric.change}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2 print:grid-cols-2 print:gap-4">
        
        {/* Revenue Chart */}
        <Card className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-0 shadow-lg relative overflow-hidden print:shadow-none print:border print:border-gray-300">
          <div className="absolute top-0 right-0 w-24 h-24 opacity-5 print:hidden">
            <Image 
              src="/assets/background/shape-square.svg" 
              alt=""
              fill
              className="object-contain"
            />
          </div>
          
          <CardHeader className="bg-gradient-to-r from-green-500/5 to-emerald-500/5 border-b relative z-10 print:bg-transparent print:border-b-gray-300">
            <CardTitle className="flex items-center gap-2 text-lg print:text-black">
              <DollarSign className="h-5 w-5 text-green-600" />
              Revenue Trends ({timeframe})
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6 relative z-10 print:p-4">
            <div className="space-y-4">
              {/* Simple chart representation */}
              <div className="h-48 flex items-end justify-between gap-2 print:h-32">
                {data.chartData.revenue.map((item, index) => {
                  const height = (item.revenue / Math.max(...data.chartData.revenue.map(d => d.revenue))) * 100;
                  return (
                    <div key={item.month} className="flex-1 flex flex-col items-center">
                      <div className="text-xs font-medium text-green-600 mb-1 print:text-black">
                        ${(item.revenue / 1000).toFixed(0)}k
                      </div>
                      <div 
                        className={`w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-md min-h-[20px] print:bg-gray-600 ${
                          height >= 90 ? 'h-full' :
                          height >= 80 ? 'h-[90%]' :
                          height >= 70 ? 'h-[80%]' :
                          height >= 60 ? 'h-[70%]' :
                          height >= 50 ? 'h-[60%]' :
                          height >= 40 ? 'h-1/2' :
                          height >= 30 ? 'h-[40%]' :
                          height >= 20 ? 'h-[30%]' :
                          'h-[20%]'
                        }`}
                      />
                      <div className="text-xs text-muted-foreground mt-1 print:text-black">
                        {item.month}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t print:border-t-gray-300">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 print:text-black">
                    ${data.revenue.total.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground print:text-gray-600">Total Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 print:text-black">
                    +{data.revenue.growth}%
                  </div>
                  <div className="text-sm text-muted-foreground print:text-gray-600">Growth Rate</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rental Activity Chart */}
        <Card className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-0 shadow-lg relative overflow-hidden print:shadow-none print:border print:border-gray-300">
          <div className="absolute top-0 right-0 w-24 h-24 opacity-5 print:hidden">
            <Image 
              src="/assets/background/shape-square.svg" 
              alt=""
              fill
              className="object-contain"
            />
          </div>
          
          <CardHeader className="bg-gradient-to-r from-blue-500/5 to-cyan-500/5 border-b relative z-10 print:bg-transparent print:border-b-gray-300">
            <CardTitle className="flex items-center gap-2 text-lg print:text-black">
              <Activity className="h-5 w-5 text-blue-600" />
              Daily Rental Activity
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6 relative z-10 print:p-4">
            <div className="space-y-4">
              <div className="h-48 flex items-end justify-between gap-2 print:h-32">
                {data.chartData.rentals.map((item, index) => {
                  const height = (item.rentals / Math.max(...data.chartData.rentals.map(d => d.rentals))) * 100;
                  return (
                    <div key={item.day} className="flex-1 flex flex-col items-center">
                      <div className="text-xs font-medium text-blue-600 mb-1 print:text-black">
                        {item.rentals}
                      </div>
                      <div 
                        className={`w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md min-h-[20px] print:bg-gray-600 ${
                          height >= 90 ? 'h-full' :
                          height >= 80 ? 'h-[90%]' :
                          height >= 70 ? 'h-[80%]' :
                          height >= 60 ? 'h-[70%]' :
                          height >= 50 ? 'h-[60%]' :
                          height >= 40 ? 'h-1/2' :
                          height >= 30 ? 'h-[40%]' :
                          height >= 20 ? 'h-[30%]' :
                          'h-[20%]'
                        }`}
                      />
                      <div className="text-xs text-muted-foreground mt-1 print:text-black">
                        {item.day}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t print:border-t-gray-300">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 print:text-black">
                    {data.rentals.dailyAverage}
                  </div>
                  <div className="text-sm text-muted-foreground print:text-gray-600">Daily Average</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 print:text-black">
                    {data.rentals.active}
                  </div>
                  <div className="text-sm text-muted-foreground print:text-gray-600">Currently Active</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Station Performance & User Growth */}
      <div className="grid gap-6 lg:grid-cols-2 print:grid-cols-2 print:gap-4">
        
        {/* Top Performing Stations */}
        <Card className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-0 shadow-lg relative overflow-hidden print:shadow-none print:border print:border-gray-300">
          <div className="absolute top-0 right-0 w-24 h-24 opacity-5 print:hidden">
            <Image 
              src="/assets/background/shape-square.svg" 
              alt=""
              fill
              className="object-contain"
            />
          </div>
          
          <CardHeader className="bg-gradient-to-r from-orange-500/5 to-red-500/5 border-b relative z-10 print:bg-transparent print:border-b-gray-300">
            <CardTitle className="flex items-center gap-2 text-lg print:text-black">
              <Target className="h-5 w-5 text-orange-600" />
              Top Performing Stations
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6 relative z-10 print:p-4">
            <div className="space-y-4">
              {data.chartData.stations.map((station, index) => (
                <div key={station.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 print:bg-gray-100">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      index === 0 ? 'bg-yellow-500' :
                      index === 1 ? 'bg-gray-400' :
                      index === 2 ? 'bg-amber-600' :
                      'bg-gray-300'
                    } print:bg-gray-600`}>
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold print:text-black">{station.name}</div>
                      <div className="text-sm text-muted-foreground print:text-gray-600">
                        ${station.revenue.toLocaleString()} revenue
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-orange-600 print:text-black">{station.utilization}%</div>
                    <div className="text-sm text-muted-foreground print:text-gray-600">utilization</div>
                  </div>
                </div>
              ))}
              
              <div className="pt-4 border-t text-center print:border-t-gray-300">
                <div className="text-2xl font-bold text-orange-600 print:text-black">
                  {data.stations.avgUtilization}%
                </div>
                <div className="text-sm text-muted-foreground print:text-gray-600">Network Average</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Growth Chart */}
        <Card className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-0 shadow-lg relative overflow-hidden print:shadow-none print:border print:border-gray-300">
          <div className="absolute top-0 right-0 w-24 h-24 opacity-5 print:hidden">
            <Image 
              src="/assets/background/shape-square.svg" 
              alt=""
              fill
              className="object-contain"
            />
          </div>
          
          <CardHeader className="bg-gradient-to-r from-purple-500/5 to-pink-500/5 border-b relative z-10 print:bg-transparent print:border-b-gray-300">
            <CardTitle className="flex items-center gap-2 text-lg print:text-black">
              <Users className="h-5 w-5 text-purple-600" />
              User Growth & Retention
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6 relative z-10 print:p-4">
            <div className="space-y-4">
              <div className="h-48 print:h-32">
                {/* User growth visualization */}
                <div className="space-y-3">
                  {data.chartData.users.map((item, index) => {
                    const width = (item.active / Math.max(...data.chartData.users.map(d => d.active))) * 100;
                    return (
                      <div key={item.month} className="flex items-center gap-3">
                        <div className="w-8 text-xs font-medium print:text-black">{item.month}</div>
                        <div className="flex-1 bg-muted/30 rounded-full h-6 relative print:bg-gray-200">
                          <div 
                            className={`bg-gradient-to-r from-purple-500 to-purple-400 h-6 rounded-full flex items-center justify-end pr-2 print:bg-gray-600 ${
                              width >= 95 ? 'w-full' :
                              width >= 85 ? 'w-[95%]' :
                              width >= 75 ? 'w-[85%]' :
                              width >= 65 ? 'w-[75%]' :
                              width >= 55 ? 'w-[65%]' :
                              width >= 45 ? 'w-[55%]' :
                              width >= 35 ? 'w-[45%]' :
                              width >= 25 ? 'w-[35%]' :
                              'w-[25%]'
                            }`}
                          >
                            <span className="text-xs text-white font-medium">{item.active}</span>
                          </div>
                        </div>
                        <div className="w-12 text-xs text-muted-foreground print:text-gray-600">
                          +{item.new}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t print:border-t-gray-300">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 print:text-black">
                    {data.users.newThisMonth}
                  </div>
                  <div className="text-sm text-muted-foreground print:text-gray-600">New Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 print:text-black">
                    {data.users.retention}%
                  </div>
                  <div className="text-sm text-muted-foreground print:text-gray-600">Retention Rate</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Report Summary */}
      <Card className="bg-gradient-to-r from-primary/5 via-blue-500/5 to-purple-500/5 border-0 shadow-lg relative overflow-hidden print:shadow-none print:border print:border-gray-300">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/50 to-background/20 print:hidden" />
        
        <CardHeader className="relative z-10 print:border-b print:border-b-gray-300">
          <CardTitle className="flex items-center gap-2 text-xl print:text-black">
            <Award className="h-6 w-6 text-primary" />
            Performance Summary & Insights
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6 relative z-10 print:p-4">
          <div className="grid gap-6 lg:grid-cols-3 print:grid-cols-3 print:gap-4">
            
            {/* Key Metrics */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg print:text-black">Key Achievements</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 print:bg-gray-100">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div className="text-sm print:text-black">
                    <strong>Revenue Growth:</strong> +{data.revenue.growth}% this month
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 print:bg-gray-100">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div className="text-sm print:text-black">
                    <strong>Daily Rentals:</strong> {data.rentals.dailyAverage} average per day
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 print:bg-gray-100">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <div className="text-sm print:text-black">
                    <strong>User Retention:</strong> {data.users.retention}% retention rate
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg print:text-black">Recommendations</h3>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-yellow-50 border-l-4 border-yellow-400 print:bg-gray-100 print:border-l-gray-400">
                  <div className="text-sm print:text-black">
                    <strong>Expand Popular Stations:</strong> Consider adding more bikes to high-utilization stations
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-blue-50 border-l-4 border-blue-400 print:bg-gray-100 print:border-l-gray-400">
                  <div className="text-sm print:text-black">
                    <strong>Weekend Promotions:</strong> Implement targeted campaigns for peak usage days
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-green-50 border-l-4 border-green-400 print:bg-gray-100 print:border-l-gray-400">
                  <div className="text-sm print:text-black">
                    <strong>User Engagement:</strong> Launch loyalty programs to maintain high retention
                  </div>
                </div>
              </div>
            </div>

            {/* Report Meta */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg print:text-black">Report Information</h3>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-white/50 print:bg-gray-100">
                  <div className="text-sm text-muted-foreground print:text-gray-600">Generated On</div>
                  <div className="font-medium print:text-black">{new Date().toLocaleDateString()}</div>
                </div>
                <div className="p-3 rounded-lg bg-white/50 print:bg-gray-100">
                  <div className="text-sm text-muted-foreground print:text-gray-600">Report Period</div>
                  <div className="font-medium print:text-black">{timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} View</div>
                </div>
                <div className="p-3 rounded-lg bg-white/50 print:bg-gray-100">
                  <div className="text-sm text-muted-foreground print:text-gray-600">Data Points</div>
                  <div className="font-medium print:text-black">{data.rentals.total.toLocaleString()} total records</div>
                </div>
              </div>
            </div>
            
          </div>
        </CardContent>
      </Card>

      {/* Print Footer */}
      <div className="hidden print:block mt-8 pt-4 border-t-2 border-gray-300 text-center text-sm text-gray-600">
        <div>© 2025 Bike Rental Analytics | Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</div>
        <div className="mt-1">This report contains confidential business information</div>
      </div>

    </div>
  );
}
