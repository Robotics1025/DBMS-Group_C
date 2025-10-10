'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Image from "next/image";
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Download,
  RefreshCw,
  Users,
  MapPin,
  Bike,
  CreditCard,
  Clock,
  DollarSign,
  FileText,
  Eye,
  Filter
} from "lucide-react";

interface ReportData {
  success: boolean;
  reportTitle: string;
  reportType: string;
  generatedAt: string;
  summary?: any;
  data: any[];
  recordCount: number;
}

interface ReportConfig {
  type: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
  requiresDateRange?: boolean;
}

const reportConfigs: ReportConfig[] = [
  {
    type: 'business-summary',
    title: 'Business Summary',
    description: 'Complete business overview and KPIs',
    icon: BarChart3,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    type: 'monthly',
    title: 'Monthly Sales',
    description: 'Monthly revenue and rental trends',
    icon: Calendar,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    type: 'quarterly',
    title: 'Quarterly Report',
    description: 'Quarterly performance analysis',
    icon: TrendingUp,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    type: 'locations',
    title: 'Location Performance',
    description: 'Station-wise performance metrics',
    icon: MapPin,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    type: 'bike-types',
    title: 'Bike Type Analysis',
    description: 'Performance by bike categories',
    icon: Bike,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50'
  },
  {
    type: 'top-customers',
    title: 'Top Customers',
    description: 'Most valuable customer analysis',
    icon: Users,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50'
  },
  {
    type: 'payment-methods',
    title: 'Payment Analysis',
    description: 'Payment method preferences',
    icon: CreditCard,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50'
  },
  {
    type: 'peak-usage',
    title: 'Peak Usage Hours',
    description: 'Peak operation times analysis',
    icon: Clock,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50'
  },
  {
    type: 'revenue-trend',
    title: 'Revenue Trends',
    description: '12-month revenue trend analysis',
    icon: DollarSign,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50'
  },
  {
    type: 'daily',
    title: 'Daily Sales',
    description: 'Day-by-day performance tracking',
    icon: FileText,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    requiresDateRange: true
  }
];

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<string>('business-summary');
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    months: 12,
    quarters: 4,
    years: 3,
    days: 30,
    limit: 20,
    startDate: '',
    endDate: ''
  });

  // Handle URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const typeParam = urlParams.get('type');
    if (typeParam && reportConfigs.find(r => r.type === typeParam)) {
      setSelectedReport(typeParam);
    }
  }, []);

  useEffect(() => {
    if (selectedReport) {
      fetchReport();
    }
  }, [selectedReport]);

  const fetchReport = async () => {
    if (!selectedReport) return;

    setLoading(true);
    try {
      const config = reportConfigs.find(r => r.type === selectedReport);
      
      let url = `/api/reports/sales?type=${selectedReport}`;
      
      // Add parameters based on report type
      if (config?.requiresDateRange && filters.startDate && filters.endDate) {
        url += `&startDate=${filters.startDate}&endDate=${filters.endDate}`;
      } else {
        url += `&months=${filters.months}&quarters=${filters.quarters}&years=${filters.years}&days=${filters.days}&limit=${filters.limit}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setReportData(data);
        toast.success('Report generated successfully');
      } else {
        toast.error(data.message || 'Failed to generate report');
      }
    } catch (error) {
      console.error('Error fetching report:', error);
      toast.error('Failed to fetch report data');
    } finally {
      setLoading(false);
    }
  };

  const exportReport = () => {
    if (!reportData) return;
    
    const csvContent = convertToCSV(reportData.data);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedReport}-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    toast.success('Report exported successfully');
  };

  const convertToCSV = (data: any[]) => {
    if (!data || data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          return typeof value === 'string' ? `"${value}"` : value;
        }).join(',')
      )
    ];
    
    return csvRows.join('\\n');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR'
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const selectedConfig = reportConfigs.find(r => r.type === selectedReport);

  return (
    <div className="space-y-6 relative min-h-screen">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 opacity-[0.02] rotate-12 animate-pulse">
          <Image 
            src="/assets/background/shape-square.svg" 
            alt="" 
            fill 
            className="object-contain"
          />
        </div>
        <div className="absolute bottom-20 left-10 w-60 h-60 opacity-[0.03] -rotate-45 animate-pulse delay-1000">
          <Image 
            src="/assets/background/shape-square.svg" 
            alt="" 
            fill 
            className="object-contain"
          />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 opacity-[0.015] rotate-90 animate-pulse delay-2000">
          <Image 
            src="/assets/background/shape-square.svg" 
            alt="" 
            fill 
            className="object-contain"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/50 to-background/20" />
      </div>

      {/* Header */}
      <div className="relative bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 rounded-2xl p-8 border backdrop-blur-sm overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Sales Reports & Analytics
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Comprehensive business intelligence and performance metrics
            </p>
          </div>
          <div className="hidden md:block relative w-40 h-40">
            <Image 
              src="/assets/illustrations/illustration-analytics.webp" 
              alt="Analytics illustration" 
              fill
              className="object-contain"
            />
          </div>
        </div>
        
        <div className="absolute top-2 left-2 w-20 h-20 opacity-5 rotate-45">
          <Image 
            src="/assets/background/shape-square.svg" 
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Report Selection */}
      <Card className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Select Report Type
          </CardTitle>
          <CardDescription>
            Choose from our comprehensive collection of business analytics reports
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Report Type Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {reportConfigs.map((config) => {
              const Icon = config.icon;
              const isSelected = selectedReport === config.type;
              
              return (
                <div
                  key={config.type}
                  onClick={() => setSelectedReport(config.type)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:scale-105 ${
                    isSelected 
                      ? `border-primary ${config.bgColor} shadow-lg` 
                      : 'border-border hover:border-primary/50 bg-card'
                  }`}
                >
                  <div className={`p-3 rounded-lg ${config.bgColor} w-fit mb-3 ${isSelected ? 'scale-110' : ''} transition-transform`}>
                    <Icon className={`h-6 w-6 ${config.color}`} />
                  </div>
                  <h3 className={`font-semibold mb-1 ${isSelected ? config.color : 'text-foreground'}`}>
                    {config.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {config.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Filters */}
          {selectedConfig && (
            <div className="border-t pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm font-medium">Report Filters</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {selectedConfig.requiresDateRange ? (
                  <>
                    <div>
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={filters.startDate}
                        onChange={(e) => setFilters({...filters, startDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={filters.endDate}
                        onChange={(e) => setFilters({...filters, endDate: e.target.value})}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Label htmlFor="months">Months</Label>
                      <Select value={filters.months.toString()} onValueChange={(value) => setFilters({...filters, months: parseInt(value)})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">Last 3 months</SelectItem>
                          <SelectItem value="6">Last 6 months</SelectItem>
                          <SelectItem value="12">Last 12 months</SelectItem>
                          <SelectItem value="24">Last 24 months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {selectedReport === 'top-customers' && (
                      <div>
                        <Label htmlFor="limit">Top Records</Label>
                        <Select value={filters.limit.toString()} onValueChange={(value) => setFilters({...filters, limit: parseInt(value)})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10">Top 10</SelectItem>
                            <SelectItem value="20">Top 20</SelectItem>
                            <SelectItem value="50">Top 50</SelectItem>
                            <SelectItem value="100">Top 100</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </>
                )}
                
                <div className="flex items-end gap-2">
                  <Button 
                    onClick={fetchReport} 
                    disabled={loading}
                    className="flex items-center gap-2"
                  >
                    {loading ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    Generate Report
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Report Results */}
      {reportData && (
        <Card className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {selectedConfig && <selectedConfig.icon className="h-5 w-5 text-primary" />}
                {reportData.reportTitle}
              </CardTitle>
              <CardDescription>
                Generated on {new Date(reportData.generatedAt).toLocaleString()} • {reportData.recordCount} records
              </CardDescription>
            </div>
            <Button onClick={exportReport} variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </CardHeader>
          <CardContent>
            {/* Summary Stats */}
            {reportData.summary && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {Object.entries(reportData.summary).map(([key, value]) => (
                  <div key={key} className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border">
                    <div className="text-sm text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-2xl font-bold text-primary mt-1">
                      {typeof value === 'number' && key.includes('Revenue') ? formatCurrency(value) : 
                       typeof value === 'number' ? formatNumber(value) : 
                       typeof value === 'object' ? JSON.stringify(value) : String(value)}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b bg-muted/50">
                    {reportData.data.length > 0 && Object.keys(reportData.data[0]).map((header) => (
                      <th key={header} className="p-3 text-left font-medium text-sm">
                        {header.replace(/([A-Z])/g, ' $1').trim()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reportData.data.map((row, index) => (
                    <tr key={index} className="border-b hover:bg-muted/25 transition-colors">
                      {Object.entries(row).map(([key, value]) => (
                        <td key={key} className="p-3 text-sm">
                          {typeof value === 'number' && (key.includes('Revenue') || key.includes('Cost') || key.includes('Amount')) ? 
                            formatCurrency(value) : 
                           typeof value === 'number' ? formatNumber(value) : 
                           value === null ? '-' : String(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {reportData.data.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No data available for the selected criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}