import React, { useState, useEffect } from 'react';
import { 
  Users, Bike, Clock, TrendingUp, Bell, MapPin, Search, Filter, 
  MoreHorizontal, Eye, Edit, Trash2, UserPlus, DollarSign, 
  Activity, AlertTriangle, Calendar, Phone, Mail, CheckCircle, XCircle, RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { StaffNotifications } from '@/components/StaffNotifications';
import Image from 'next/image';

const stats = [
  {
    title: "Active Rentals",
    value: "42",
    change: "+8 today",
    icon: Activity,
    trend: "+12%",
    status: "success",
  },
  {
    title: "Total Revenue",
    value: "$3,247",
    change: "This month",
    icon: DollarSign,
    trend: "+18.2%",
    status: "success",
  },
  {
    title: "Available Bikes",
    value: "128",
    change: "Out of 156 total",
    icon: Bike,
    trend: "82%",
    status: "warning",
  },
  {
    title: "Pending Issues",
    value: "5",
    change: "Need attention",
    icon: AlertTriangle,
    trend: "-2 today",
    status: "error",
  },
];

const recentRentals = [
  { 
    id: "R-2025-001", 
    customer: "Sarah Johnson", 
    phone: "+256 777 123 456",
    email: "sarah.j@email.com",
    bike: "Mountain Explorer Pro", 
    bikeId: "BK-001",
    status: "Active", 
    startTime: "10:30 AM",
    duration: "2 hours",
    amount: "$25.00",
    location: "Central Station",
    avatar: "/assets/images/avatar/avatar-1.webp"
  },
  { 
    id: "R-2025-002", 
    customer: "Mike Chen", 
    phone: "+256 777 987 654",
    email: "mike.chen@email.com",
    bike: "Urban E-Cruiser", 
    bikeId: "BK-012",
    status: "Active", 
    startTime: "11:15 AM",
    duration: "4 hours",
    amount: "$40.00",
    location: "Downtown Hub",
    avatar: "/assets/images/avatar/avatar-2.webp"
  },
  { 
    id: "R-2025-003", 
    customer: "Emma Davis", 
    phone: "+256 777 456 789",
    email: "emma.davis@email.com",
    bike: "City Commuter", 
    bikeId: "BK-023",
    status: "Returned", 
    startTime: "9:00 AM",
    duration: "3 hours",
    amount: "$30.00",
    location: "University Campus",
    avatar: "/assets/images/avatar/avatar-3.webp"
  },
  { 
    id: "R-2025-004", 
    customer: "James Wilson", 
    phone: "+256 777 321 098",
    email: "james.w@email.com",
    bike: "Electric Swift", 
    bikeId: "BK-034",
    status: "Active", 
    startTime: "12:00 PM",
    duration: "1 hour",
    amount: "$15.00",
    location: "Park Avenue",
    avatar: "/assets/images/avatar/avatar-4.webp"
  },
  { 
    id: "R-2025-005", 
    customer: "Lisa Anderson", 
    phone: "+256 777 654 321",
    email: "lisa.anderson@email.com",
    bike: "Hybrid Comfort", 
    bikeId: "BK-045",
    status: "Returned", 
    startTime: "8:30 AM",
    duration: "5 hours",
    amount: "$50.00",
    location: "Riverside Station",
    avatar: "/assets/images/avatar/avatar-1.webp"
  },
];

const customerStats = [
  { label: "New Customers Today", value: "23", color: "text-green-600", bg: "bg-green-50" },
  { label: "Total Active Users", value: "1,247", color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Premium Members", value: "156", color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Pending Verifications", value: "8", color: "text-orange-600", bg: "bg-orange-50" },
];

const bikeStatus = [
  { status: "Available", count: 128, color: "text-green-600", bg: "bg-green-100" },
  { status: "Rented", count: 42, color: "text-blue-600", bg: "bg-blue-100" },
  { status: "Maintenance", count: 8, color: "text-orange-600", bg: "bg-orange-100" },
  { status: "Out of Service", count: 3, color: "text-red-600", bg: "bg-red-100" },
];

export default function StaffDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Filter rentals based on search and status
  const filteredRentals = recentRentals.filter(rental => {
    const matchesSearch = rental.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rental.bike.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rental.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || rental.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRentals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRentals = filteredRentals.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Active</Badge>;
      case 'returned':
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">Returned</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-200">Overdue</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
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
        
        {/* Additional decorative shapes */}
        <div className="absolute top-32 left-1/4 w-32 h-32 opacity-[0.02] rotate-180 animate-pulse delay-500">
          <Image 
            src="/assets/background/shape-square.svg" 
            alt="" 
            fill 
            className="object-contain"
          />
        </div>
        
        <div className="absolute bottom-40 right-1/4 w-48 h-48 opacity-[0.025] -rotate-12 animate-pulse delay-1500">
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
      <div className="relative bg-gradient-to-r from-primary/5 via-blue-500/5 to-purple-500/5 rounded-2xl p-8 border backdrop-blur-sm overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Staff Dashboard
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Monitor bike rentals and customer activity in real-time
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-100 text-green-700">
              <Bell className="w-3 h-3 mr-1" />
              Live Updates
            </Badge>
            <Button size="sm" variant="outline" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
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
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const cardColors = [
            {
              bg: "bg-gradient-to-br from-blue-100 to-blue-50",
              iconBg: "bg-blue-500", 
              iconColor: "text-white",
              textColor: "text-blue-700",
              valueColor: "text-blue-800",
              changeColor: "text-blue-600"
            },
            {
              bg: "bg-gradient-to-br from-green-100 to-green-50",
              iconBg: "bg-green-500",
              iconColor: "text-white",
              textColor: "text-green-700",
              valueColor: "text-green-800",
              changeColor: "text-green-600"
            },
            {
              bg: "bg-gradient-to-br from-orange-100 to-orange-50", 
              iconBg: "bg-orange-500",
              iconColor: "text-white",
              textColor: "text-orange-700",
              valueColor: "text-orange-800",
              changeColor: "text-orange-600"
            },
            {
              bg: "bg-gradient-to-br from-red-100 to-red-50",
              iconBg: "bg-red-500",
              iconColor: "text-white", 
              textColor: "text-red-700",
              valueColor: "text-red-800",
              changeColor: "text-red-600"
            }
          ];
          
          const colors = cardColors[index];
          
          return (
            <Card key={stat.title} className={`${colors.bg} border-0 hover:shadow-lg transition-all duration-300 overflow-hidden relative rounded-2xl`}>
              {/* Dot Pattern Background */}
              <div className="absolute inset-0 opacity-20">
                <div className={`absolute inset-0 ${colors.textColor}`}>
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id={`dots-staff-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="1" fill="currentColor"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#dots-staff-${index})`}/>
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
                      {stat.trend}
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
                  <p className={`text-xs ${colors.textColor} opacity-80`}>
                    {stat.change}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Secondary Stats Grid */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Customer Stats */}
        <Card className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-500/5 to-cyan-500/5">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Customer Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {customerStats.map((item, index) => (
              <div key={index} className={`p-3 rounded-lg ${item.bg} flex justify-between items-center`}>
                <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
                <span className={`text-lg font-bold ${item.color}`}>{item.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Bike Status */}
        <Card className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-green-500/5 to-emerald-500/5">
            <CardTitle className="flex items-center gap-2">
              <Bike className="h-5 w-5 text-primary" />
              Fleet Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {bikeStatus.map((item, index) => (
              <div key={index} className={`p-3 rounded-lg ${item.bg} flex justify-between items-center`}>
                <span className="text-sm font-medium text-muted-foreground">{item.status}</span>
                <span className={`text-lg font-bold ${item.color}`}>{item.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Staff Notifications Panel */}
        <StaffNotifications />
      </div>

      {/* Rental Management Section */}
      <div className="grid gap-6 lg:grid-cols-1">
        {/* Search and Filter Controls */}
        <Card className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-blue-500/5">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Active Rentals Management
              </div>
              <Badge className="bg-blue-100 text-blue-700">
                {filteredRentals.length} rentals
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by customer, bike, or rental ID..."
                  className="pl-10 h-11"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px] h-11">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="returned">Returned</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Rentals Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-[250px]">Customer</TableHead>
                    <TableHead>Bike Details</TableHead>
                    <TableHead>Rental Info</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedRentals.map((rental) => (
                    <TableRow key={rental.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                            <Image 
                              src={rental.avatar} 
                              alt={rental.customer}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-sm truncate">{rental.customer}</p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              <span className="truncate">{rental.phone}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Mail className="h-3 w-3" />
                              <span className="truncate">{rental.email}</span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium text-sm">{rental.bike}</p>
                          <p className="text-xs text-muted-foreground">ID: {rental.bikeId}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{rental.location}</span>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Started: {rental.startTime}</p>
                          <p className="text-xs text-muted-foreground">Duration: {rental.duration}</p>
                          <p className="text-xs text-muted-foreground">ID: {rental.id}</p>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        {getStatusBadge(rental.status)}
                      </TableCell>
                      
                      <TableCell>
                        <span className="font-medium text-green-600">{rental.amount}</span>
                      </TableCell>
                      
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="cursor-pointer">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Rental
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-red-600">
                              <XCircle className="h-4 w-4 mr-2" />
                              End Rental
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredRentals.length)} of {filteredRentals.length} results
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Footer */}
      <Card className="bg-gradient-to-r from-primary/5 to-blue-500/5">
        <CardContent className="p-6">
          <div className="grid gap-3 md:grid-cols-4">
            <Button className="w-full justify-start gap-2 h-12" variant="default">
              <UserPlus className="h-4 w-4" />
              Add New Customer
            </Button>
            <Button className="w-full justify-start gap-2 h-12" variant="outline">
              <Bike className="h-4 w-4" />
              Manage Fleet
            </Button>
            <Button className="w-full justify-start gap-2 h-12" variant="outline">
              <Calendar className="h-4 w-4" />
              View Reports
            </Button>
            <Button className="w-full justify-start gap-2 h-12" variant="outline">
              <Bell className="h-4 w-4" />
              Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}