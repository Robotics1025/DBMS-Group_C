"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, Download, Printer, RefreshCw, Calendar, Filter,
  DollarSign, TrendingUp, Users, MapPin, Bike, Clock, CreditCard,
  Target, Activity, Eye, FileText, Database
} from "lucide-react";
import Image from "next/image";

interface ReportData {
  type: string;
  title: string;
  data: any[];
  summary?: any;
  generated_at: string;
}

const REPORT_TYPES = [
  { value: 'daily', label: 'Daily Sales', icon: Calendar, description: 'Daily revenue and rental statistics' },
  { value: 'monthly', label: 'Monthly Sales', icon: BarChart3, description: 'Monthly performance trends' },
  { value: 'quarterly', label: 'Quarterly Sales', icon: TrendingUp, description: 'Quarterly business analysis' },
  { value: 'yearly', label: 'Yearly Sales', icon: Target, description: 'Annual performance overview' },
  { value: 'locations', label: 'Location Performance', icon: MapPin, description: 'Station-wise performance metrics' },
  { value: 'bike-types', label: 'Bike Type Analysis', icon: Bike, description: 'Fleet performance by bike type' },
  { value: 'top-customers', label: 'Top Customers', icon: Users, description: 'Customer analysis and insights' },
  { value: 'payment-methods', label: 'Payment Analysis', icon: CreditCard, description: 'Payment method preferences' },
  { value: 'peak-usage', label: 'Peak Usage Hours', icon: Clock, description: 'Usage patterns and peak times' },
  { value: 'revenue-trend', label: 'Revenue Trend', icon: TrendingUp, description: '12-month revenue analysis' },
  { value: 'business-summary', label: 'Business Summary', icon: Activity, description: 'Complete KPIs and overview' }
];

export default function AdminReports() {
  const [selectedReportType, setSelectedReportType] = useState('business-summary');
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = async (reportType: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/reports/sales?type=${reportType}`);
      const result = await response.json();
      
      if (result.success) {
        setReportData({
          type: reportType,
          title: REPORT_TYPES.find(t => t.value === reportType)?.label || 'Report',
          data: result.data,
          summary: result.summary,
          generated_at: new Date().toISOString()
        });
      } else {
        setError(result.error || 'Failed to fetch report data');
      }
    } catch (err) {
      setError('Network error occurred while fetching report');
      console.error('Report fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport(selectedReportType);
  }, [selectedReportType]);

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    if (!reportData) return;
    
    // Convert data to CSV format
    let csv = '';
    if (Array.isArray(reportData.data) && reportData.data.length > 0) {
      const headers = Object.keys(reportData.data[0]).join(',');
      const rows = reportData.data.map(row => 
        Object.values(row).map(value => 
          typeof value === 'string' && value.includes(',') ? `"${value}"` : value
        ).join(',')
      );
      csv = headers + '\n' + rows.join('\n');
    }
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportData.type}-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderReportData = () => {
    if (!reportData || !reportData.data) return null;

    // Handle different report types with specific formatting
    switch (reportData.type) {
      case 'business-summary':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Revenue', value: `$${reportData.data.total_revenue?.toLocaleString() || '0'}`, color: 'text-green-600' },
                { label: 'Total Rentals', value: reportData.data.total_rentals?.toLocaleString() || '0', color: 'text-blue-600' },
                { label: 'Total Customers', value: reportData.data.total_customers?.toLocaleString() || '0', color: 'text-purple-600' },
                { label: 'Avg Daily Revenue', value: `$${reportData.data.average_daily_revenue?.toLocaleString() || '0'}`, color: 'text-orange-600' }
              ].map((metric, index) => (
                <div key={index} className="p-4 bg-gradient-to-br from-white to-gray-50 rounded-lg border">
                  <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
                  <div className="text-sm text-gray-600">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'locations':
        return (
          <div className="space-y-4">
            {Array.isArray(reportData.data) && reportData.data.map((location: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-gray-50 rounded-lg border">
                <div>
                  <div className="font-semibold">{location.location_name}</div>
                  <div className="text-sm text-gray-600">{location.total_rentals} rentals</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">${location.total_revenue?.toLocaleString() || '0'}</div>
                  <div className="text-sm text-gray-600">Revenue</div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'top-customers':
        return (
          <div className="space-y-4">
            {Array.isArray(reportData.data) && reportData.data.map((customer: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-gray-50 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold">{customer.customer_name}</div>
                    <div className="text-sm text-gray-600">{customer.total_rentals} rentals</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">${customer.total_spent?.toLocaleString() || '0'}</div>
                  <div className="text-sm text-gray-600">Total Spent</div>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        // Generic table view for other report types
        if (Array.isArray(reportData.data) && reportData.data.length > 0) {
          const headers = Object.keys(reportData.data[0]);
          return (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-primary/10 to-blue-500/10">
                  <tr>
                    {headers.map((header) => (
                      <th key={header} className="border border-gray-200 px-4 py-3 text-left font-semibold">
                        {header.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reportData.data.map((row: any, index: number) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      {headers.map((header) => (
                        <td key={header} className="border border-gray-200 px-4 py-3">
                          {typeof row[header] === 'number' && header.toLowerCase().includes('revenue') 
                            ? `$${row[header].toLocaleString()}` 
                            : row[header]?.toString() || '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return <div className="text-center py-8 text-gray-500">No data available for this report</div>;
    }
  };

  return (
    <div className="space-y-6 relative min-h-screen print:space-y-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden print:hidden">
        <div className="absolute top-0 right-0 w-80 h-80 opacity-[0.02] rotate-12 animate-pulse">
          <Image src="/assets/background/shape-square.svg" alt="" fill className="object-contain" />
        </div>
        <div className="absolute bottom-20 left-10 w-60 h-60 opacity-[0.03] -rotate-45 animate-pulse delay-1000">
          <Image src="/assets/background/shape-square.svg" alt="" fill className="object-contain" />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 opacity-[0.015] rotate-90 animate-pulse delay-2000">
          <Image src="/assets/background/shape-square.svg" alt="" fill className="object-contain" />
        </div>
      </div>

      {/* Header */}
      <div className="relative bg-gradient-to-r from-primary/5 via-blue-500/5 to-purple-500/5 rounded-2xl p-6 border backdrop-blur-sm overflow-hidden print:bg-transparent print:border-2 print:border-gray-300">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between relative z-10">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent print:text-black print:bg-none">
              Sales Reports & Analytics
            </h1>
            <p className="text-muted-foreground mt-2 text-base lg:text-lg print:text-black">
              Comprehensive business intelligence and performance insights
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 print:hidden">
            <Select value={selectedReportType} onValueChange={setSelectedReportType}>
              <SelectTrigger className="w-64 h-10">
                <Database className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {REPORT_TYPES.map((report) => {
                  const Icon = report.icon;
                  return (
                    <SelectItem key={report.value} value={report.value}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <div>
                          <div className="font-medium">{report.label}</div>
                          <div className="text-xs text-muted-foreground">{report.description}</div>
                        </div>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handlePrint}
                className="gap-2 h-10"
                disabled={loading || !reportData}
              >
                <Printer className="h-4 w-4" />
                Print
              </Button>
              <Button 
                onClick={handleExport}
                disabled={loading || !reportData}
                className="gap-2 bg-gradient-to-r from-primary to-accent shadow-lg hover:shadow-xl transition-all h-10"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </div>
        
        {/* Print header */}
        <div className="hidden print:block mt-4 pt-4 border-t-2 border-gray-300">
          <div className="flex justify-between text-sm text-gray-600">
            <div>Report: {reportData?.title}</div>
            <div>Generated: {new Date().toLocaleDateString()}</div>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <Card className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-0 shadow-lg relative overflow-hidden print:shadow-none print:border print:border-gray-300">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-blue-500/5 border-b relative z-10 print:bg-transparent print:border-b-gray-300">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {REPORT_TYPES.find(t => t.value === selectedReportType)?.icon && 
                React.createElement(REPORT_TYPES.find(t => t.value === selectedReportType)!.icon, { 
                  className: "h-5 w-5 text-primary" 
                })
              }
              <span className="print:text-black">
                {reportData?.title || 'Loading Report...'}
              </span>
            </div>
            {reportData && (
              <Badge variant="secondary" className="print:bg-gray-200 print:text-black">
                {reportData.data && Array.isArray(reportData.data) ? reportData.data.length : '1'} records
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6 relative z-10 print:p-4">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-muted-foreground">Loading report data...</p>
              </div>
            </div>
          )}
          
          {error && (
            <div className="text-center py-12">
              <div className="text-red-500 mb-4">
                <FileText className="h-12 w-12 mx-auto mb-2" />
                <p className="font-semibold">Error Loading Report</p>
                <p className="text-sm text-red-400">{error}</p>
              </div>
              <Button 
                onClick={() => fetchReport(selectedReportType)}
                variant="outline"
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Retry
              </Button>
            </div>
          )}
          
          {!loading && !error && reportData && renderReportData()}
          
          {!loading && !error && !reportData && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-muted-foreground">No report data available</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Report Types Quick Access */}
      <Card className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-0 shadow-lg print:hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Available Reports
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {REPORT_TYPES.map((report) => {
              const Icon = report.icon;
              const isActive = selectedReportType === report.value;
              
              return (
                <button
                  key={report.value}
                  onClick={() => setSelectedReportType(report.value)}
                  className={`p-4 rounded-xl border text-left transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                    isActive 
                      ? 'bg-gradient-to-br from-primary/10 to-blue-500/10 border-primary/30 shadow-md' 
                      : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    {isActive && <Badge variant="secondary">Active</Badge>}
                  </div>
                  <h3 className={`font-semibold mb-1 ${isActive ? 'text-primary' : 'text-gray-900'}`}>
                    {report.label}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {report.description}
                  </p>
                </button>
              );
            })}
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