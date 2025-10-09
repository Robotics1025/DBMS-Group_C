"use client";

import React, { useState, useEffect } from 'react';
import { 
  Users, UserPlus, Search, Filter, MoreHorizontal, Eye, Edit, 
  Trash2, MapPin, Phone, Mail, CheckCircle, XCircle, Shield, Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, 
  DialogTitle, DialogTrigger, DialogFooter
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import Image from 'next/image';

interface StaffMember {
  UserID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
  Role: string;
  DateHired?: string;
  AssignedLocationID?: number;
  LocationName?: string;
  City?: string;
}

interface Location {
  LocationID: number;
  LocationName: string;
  Address: string;
  City: string;
}

interface StaffStats {
  totalStaff: number;
  activeStaff: number;
  assignedStaff: number;
  administrators: number;
}

export default function StaffManagement() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [stats, setStats] = useState<StaffStats>({
    totalStaff: 0,
    activeStaff: 0,
    assignedStaff: 0,
    administrators: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // Form state for adding staff
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "Staff",
    password: "",
    locationID: "none"
  });

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/staff');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setStaff(data.staff || []);
        
        // Calculate stats from real data
        const staffArray = data.staff || [];
        const totalStaff = staffArray.length;
        const activeStaff = staffArray.filter((s: StaffMember) => s.Role !== 'Customer').length;
        const assignedStaff = staffArray.filter((s: StaffMember) => s.AssignedLocationID).length;
        const administrators = staffArray.filter((s: StaffMember) => s.Role === 'Administrator').length;
        
        setStats({
          totalStaff,
          activeStaff,
          assignedStaff,
          administrators
        });
      } else {
        throw new Error(data.message || 'Failed to fetch staff data');
      }
    } catch (error) {
      console.error('Error fetching staff:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to load staff data');
      // Set empty state on error
      setStaff([]);
      setStats({
        totalStaff: 0,
        activeStaff: 0,
        assignedStaff: 0,
        administrators: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await fetch('/api/locations');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setLocations(data.locations || []);
      } else {
        throw new Error(data.message || 'Failed to fetch locations');
      }
    } catch (error) {
      console.error('Error fetching locations:', error);
      toast.error('Failed to load locations');
      setLocations([]);
    }
  };

  useEffect(() => {
    // Wrap async calls to prevent unhandled promise rejections
    const initializeData = async () => {
      try {
        await Promise.all([fetchStaff(), fetchLocations()]);
      } catch (error) {
        console.error('Error during data initialization:', error);
        toast.error('Failed to initialize staff management');
      }
    };

    initializeData();
  }, []);

  const handleAddStaff = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      
      const response = await fetch('/api/staff/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          role: formData.role,
          password: formData.password
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        toast.success('Staff member added successfully!');
        setIsAddDialogOpen(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          role: "Staff",
          password: "",
          locationID: "none"
        });
        await fetchStaff(); // Refresh the staff list
      } else {
        throw new Error(data.message || 'Failed to add staff member');
      }
    } catch (error) {
      console.error('Error adding staff:', error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred while adding staff member';
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  // Filter staff based on search and role
  const filteredStaff = staff.filter(member => {
    const matchesSearch = 
      `${member.FirstName} ${member.LastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.PhoneNumber.includes(searchTerm);
    
    const matchesRole = roleFilter === "all" || member.Role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const getStatusBadge = (role: string) => {
    if (role === 'Administrator') {
      return (
        <Badge variant="destructive" className="gap-1">
          <Shield className="h-3 w-3" />
          Administrator
        </Badge>
      );
    } else if (role === 'Staff') {
      return (
        <Badge variant="default" className="gap-1">
          <Users className="h-3 w-3" />
          Staff
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="gap-1">
          <Users className="h-3 w-3" />
          {role}
        </Badge>
      );
    }
  };

  // Error boundary check
  if (hasError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-8 text-center max-w-md">
          <div className="text-destructive mb-4">
            <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
          <p className="text-muted-foreground mb-4">
            We encountered an error loading the staff management page.
          </p>
          <Button onClick={() => window.location.reload()} className="w-full">
            Reload Page
          </Button>
        </Card>
      </div>
    );
  }

  try {
    return (
      <div className="space-y-6 relative min-h-screen">
      {/* Enhanced Background Pattern - matching dashboard style */}
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

      {/* Header with Cool Background */}
      <div className="relative bg-gradient-to-r from-primary/5 via-blue-500/5 to-purple-500/5 rounded-2xl p-8 border backdrop-blur-sm overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Staff Management
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Manage staff members, assign locations, and control access
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2 shadow-lg">
                <UserPlus className="h-5 w-5" />
                Add Staff Member
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Staff Member</DialogTitle>
                <DialogDescription>
                  Create a new staff account and assign them to a location.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Enter email address"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                    placeholder="Enter phone number"
                  />
                </div>
                
                <div>
                  <Label htmlFor="password">Initial Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="Enter initial password"
                  />
                </div>
                
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Staff">Staff</SelectItem>
                      <SelectItem value="Administrator">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Location Assignment */}
                <div>
                  <Label htmlFor="location">Assign Location</Label>
                  <Select 
                    value={formData.locationID} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, locationID: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a location (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Location Assigned</SelectItem>
                      {locations.map((location) => (
                        <SelectItem key={location.LocationID} value={location.LocationID.toString()}>
                          <div className="flex flex-col">
                            <span className="font-medium">{location.LocationName}</span>
                            <span className="text-xs text-muted-foreground">{location.City}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddStaff} disabled={submitting}>
                  {submitting ? 'Adding...' : 'Add Staff Member'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { 
            title: "Total Staff", 
            value: stats.totalStaff, 
            icon: Users, 
            gradient: "from-blue-500/20 to-cyan-500/20",
            iconBg: "bg-gradient-to-r from-blue-500 to-cyan-500",
            iconColor: "text-white",
            trend: "+12%"
          },
          { 
            title: "Active Staff", 
            value: stats.activeStaff, 
            icon: CheckCircle, 
            gradient: "from-green-500/20 to-emerald-500/20",
            iconBg: "bg-gradient-to-r from-green-500 to-emerald-500",
            iconColor: "text-white",
            trend: "+8%"
          },
          { 
            title: "Assigned", 
            value: stats.assignedStaff, 
            icon: MapPin, 
            gradient: "from-orange-500/20 to-amber-500/20",
            iconBg: "bg-gradient-to-r from-orange-500 to-amber-500",
            iconColor: "text-white",
            trend: "+5%"
          },
          { 
            title: "Administrators", 
            value: stats.administrators, 
            icon: Shield, 
            gradient: "from-purple-500/20 to-pink-500/20",
            iconBg: "bg-gradient-to-r from-purple-500 to-pink-500",
            iconColor: "text-white",
            trend: "0%"
          }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="group relative overflow-hidden rounded-3xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              {/* Animated Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-60 group-hover:opacity-80 transition-opacity duration-300`} />
              
              {/* Subtle Pattern Overlay */}
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
              
              {/* Card Content */}
              <CardContent className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${stat.iconBg} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                  </div>
                  <Badge variant="outline" className="text-xs font-medium bg-white/10 backdrop-blur-sm border-white/20 text-foreground">
                    {stat.trend}
                  </Badge>
                </div>
                
                <div className="space-y-1">
                  <div className="text-3xl font-bold tracking-tight">
                    {loading ? (
                      <div className="animate-pulse bg-muted rounded w-12 h-8" />
                    ) : (
                      <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        {stat.value}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-xs text-muted-foreground/70">
                    {stat.title === "Total Staff" ? "Team members" :
                     stat.title === "Active Staff" ? "Currently working" :
                     stat.title === "Assigned" ? "To locations" : "Admin accounts"}
                  </p>
                </div>
              </CardContent>
              
              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/20 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </Card>
          );
        })}
      </div>

      {/* Enhanced Staff Table */}
      <Card className="relative overflow-hidden rounded-3xl border-0 shadow-xl backdrop-blur-sm">
        {/* Card Background with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-card/95 via-card to-card/90" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
        
        <CardHeader className="relative border-b border-border/50 bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Staff Members
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Managing {filteredStaff.length} team member{filteredStaff.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-[320px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-colors"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[160px] bg-background/80 backdrop-blur-sm border-border/50">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Staff">Staff Only</SelectItem>
                  <SelectItem value="Administrator">Admins Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative p-0">
          {loading ? (
            <div className="flex items-center justify-center h-40 bg-background/50">
              <div className="flex flex-col items-center gap-3">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                <p className="text-sm text-muted-foreground">Loading staff members...</p>
              </div>
            </div>
          ) : filteredStaff.length === 0 ? (
            <div className="text-center py-16 bg-gradient-to-br from-background/80 to-background/40">
              <div className="max-w-md mx-auto">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-full blur-2xl opacity-50" />
                  <Users className="relative h-16 w-16 text-muted-foreground mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {searchTerm || roleFilter !== "all" ? "No matches found" : "No staff members yet"}
                </h3>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                  {searchTerm || roleFilter !== "all"
                    ? "Try adjusting your search terms or filters to find what you're looking for."
                    : "Get started by adding your first team member to manage your bike rental locations."}
                </p>
                <Button 
                  onClick={() => setIsAddDialogOpen(true)} 
                  size="lg"
                  className="gap-2 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <UserPlus className="h-4 w-4" />
                  Add First Staff Member
                </Button>
              </div>
            </div>
          ) : (
            <div className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50 bg-muted/30">
                    <TableHead className="font-semibold text-foreground">Staff Member</TableHead>
                    <TableHead className="font-semibold text-foreground">Contact Info</TableHead>
                    <TableHead className="font-semibold text-foreground">Role & Status</TableHead>
                    <TableHead className="font-semibold text-foreground">Assignment</TableHead>
                    <TableHead className="font-semibold text-foreground">Date Hired</TableHead>
                    <TableHead className="font-semibold text-foreground text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStaff.map((member, index) => (
                    <TableRow key={member.UserID} className="group hover:bg-muted/50 transition-colors border-border/30">
                      <TableCell className="py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <Avatar className="h-12 w-12 ring-2 ring-background shadow-lg group-hover:scale-105 transition-transform">
                              <AvatarFallback className="bg-gradient-to-br from-primary to-blue-500 text-white font-semibold text-sm">
                                {`${member.FirstName[0]}${member.LastName[0]}`.toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full ring-2 ring-background" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              {member.FirstName} {member.LastName}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ID: {member.UserID} • Member #{index + 1}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell className="py-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <div className="p-1 rounded bg-blue-100 dark:bg-blue-900/30">
                              <Mail className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="truncate max-w-[200px]" title={member.Email}>
                              {member.Email}
                            </span>
                          </div>
                          {member.PhoneNumber && (
                            <div className="flex items-center gap-2 text-sm">
                              <div className="p-1 rounded bg-green-100 dark:bg-green-900/30">
                                <Phone className="h-3 w-3 text-green-600 dark:text-green-400" />
                              </div>
                              <span>{member.PhoneNumber}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      
                      <TableCell className="py-4">
                        {getStatusBadge(member.Role)}
                      </TableCell>
                      
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <div className="p-1 rounded bg-muted">
                            <MapPin className="h-3 w-3" />
                          </div>
                          {member.LocationName && member.City ? (
                            <div className="text-sm">
                              <div className="font-medium text-foreground">{member.LocationName}</div>
                              <div className="text-xs text-muted-foreground">{member.City}</div>
                            </div>
                          ) : (
                            <span className="text-sm">Unassigned</span>
                          )}
                        </div>
                      </TableCell>
                      
                      <TableCell className="py-4">
                        {member.DateHired ? (
                          <div className="flex items-center gap-2">
                            <div className="p-1 rounded bg-purple-100 dark:bg-purple-900/30">
                              <Clock className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">
                                {new Date(member.DateHired).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric', 
                                  year: 'numeric' 
                                })}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {Math.floor((Date.now() - new Date(member.DateHired).getTime()) / (1000 * 60 * 60 * 24))} days ago
                              </div>
                            </div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">Not recorded</span>
                        )}
                      </TableCell>
                      
                      <TableCell className="py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-9 w-9 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem className="gap-2 cursor-pointer">
                              <Eye className="h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 cursor-pointer">
                              <Edit className="h-4 w-4" />
                              Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 cursor-pointer">
                              <MapPin className="h-4 w-4" />
                              Change Assignment
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 cursor-pointer text-destructive focus:text-destructive">
                              <Trash2 className="h-4 w-4" />
                              Remove Staff
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
    );
  } catch (error) {
    console.error('Rendering error in StaffManagement:', error);
    // Return error boundary without setting state during render
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-8 text-center max-w-md">
          <div className="text-destructive mb-4">
            <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Rendering Error</h3>
          <p className="text-muted-foreground mb-4">
            Please refresh the page to try again.
          </p>
          <Button onClick={() => window.location.reload()} className="w-full">
            Reload Page
          </Button>
        </Card>
      </div>
    );
  }
}
