"use client";"use client";



import React, { useState, useEffect } from 'react';import React, { useState, useEffect } from 'react';

import { import { 

  Users, Search, Filter, MoreHorizontal, Eye, Edit, Trash2, UserPlus,   Users, Search, Filter, MoreHorizontal, Eye, Edit, Trash2, UserPlus, 

  MapPin, Phone, Mail, CheckCircle, XCircle, RefreshCw, Shield, Clock  MapPin, Phone, Mail, CheckCircle, XCircle, RefreshCw, Shield, Clock

} from 'lucide-react';} from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';import { Badge } from '@/components/ui/badge';

import { Button } from '@/components/ui/button';import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';import { Input } from '@/components/ui/input';

import { import { 

  Table, TableBody, TableCell, TableHead, TableHeader, TableRow   Table, TableBody, TableCell, TableHead, TableHeader, TableRow 

} from '@/components/ui/table';} from '@/components/ui/table';

import { import { 

  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger   DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger 

} from '@/components/ui/dropdown-menu';} from '@/components/ui/dropdown-menu';

import { import { 

  Select, SelectContent, SelectItem, SelectTrigger, SelectValue   Select, SelectContent, SelectItem, SelectTrigger, SelectValue 

} from '@/components/ui/select';} from '@/components/ui/select';

import {import {

  Dialog, DialogContent, DialogDescription, DialogHeader,   Dialog, DialogContent, DialogDescription, DialogHeader, 

  DialogTitle, DialogTrigger, DialogFooter  DialogTitle, DialogTrigger, DialogFooter

} from '@/components/ui/dialog';} from '@/components/ui/dialog';

import { Label } from '@/components/ui/label';import { Label } from '@/components/ui/label';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';



interface StaffMember {interface StaffMember {

  UserID: number;  UserID: number;

  UserName: string;  UserName: string;

  Email: string;  Email: string;

  PhoneNumber: string;  PhoneNumber: string;

  Role: string;  Role: string;

  IsActive: boolean;  IsActive: boolean;

  CreatedAt: string;  CreatedAt: string;

  AssignedLocationID?: number;  AssignedLocationID?: number;

  LocationName?: string;  LocationName?: string;

  LocationAddress?: string;  LocationAddress?: string;

}}



interface Location {interface Location {

  LocationID: number;  LocationID: number;

  LocationName: string;  LocationName: string;

  Address: string;  Address: string;

  City: string;  City: string;

}}



export default function StaffManagement() {export default function StaffManagement() {

  const [staff, setStaff] = useState<StaffMember[]>([]);  const [staff, setStaff] = useState<StaffMember[]>([]);

  const [locations, setLocations] = useState<Location[]>([]);  const [locations, setLocations] = useState<Location[]>([]);

  const [loading, setLoading] = useState(true);  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");  const [searchTerm, setSearchTerm] = useState("");

  const [roleFilter, setRoleFilter] = useState<string>("all");  const [roleFilter, setRoleFilter] = useState<string>("all");

  const [statusFilter, setStatusFilter] = useState<string>("all");  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    

  // Form state for adding/editing staff  // Form state for adding/editing staff

  const [formData, setFormData] = useState({  const [formData, setFormData] = useState({

    userName: "",    userName: "",

    email: "",    email: "",

    phoneNumber: "",    phoneNumber: "",

    password: "",    password: "",

    role: "Staff",    role: "Staff",

    locationID: ""    locationID: ""

  });  });



  const fetchStaff = async () => {  const fetchStaff = async () => {

    try {    try {

      setLoading(true);      setLoading(true);

      // For now, use mock data until we create the staff API      // For now, use mock data until we create the staff API

      const mockStaff: StaffMember[] = [      const mockStaff: StaffMember[] = [

        {        {

          UserID: 2,          UserID: 2,

          UserName: "John Smith",          UserName: "John Smith",

          Email: "john.smith@bikerental.com",          Email: "john.smith@bikerental.com",

          PhoneNumber: "+256 777 123 456",          PhoneNumber: "+256 777 123 456",

          Role: "Staff",          Role: "Staff",

          IsActive: true,          IsActive: true,

          CreatedAt: "2025-01-01T00:00:00Z",          CreatedAt: "2025-01-01T00:00:00Z",

          AssignedLocationID: 1,          AssignedLocationID: 1,

          LocationName: "Central Station",          LocationName: "Central Station",

          LocationAddress: "123 Main St"          LocationAddress: "123 Main St"

        },        },

        {        {

          UserID: 3,          UserID: 3,

          UserName: "Sarah Johnson",          UserName: "Sarah Johnson",

          Email: "sarah.j@bikerental.com",           Email: "sarah.j@bikerental.com", 

          PhoneNumber: "+256 777 987 654",          PhoneNumber: "+256 777 987 654",

          Role: "Staff",          Role: "Staff",

          IsActive: true,          IsActive: true,

          CreatedAt: "2025-01-02T00:00:00Z",          CreatedAt: "2025-01-02T00:00:00Z",

          AssignedLocationID: 2,          AssignedLocationID: 2,

          LocationName: "Downtown Hub",          LocationName: "Downtown Hub",

          LocationAddress: "456 Central Ave"          LocationAddress: "456 Central Ave"

        },        },

        {        {

          UserID: 4,          UserID: 4,

          UserName: "Mike Wilson",          UserName: "Mike Wilson",

          Email: "mike.w@bikerental.com",          Email: "mike.w@bikerental.com",

          PhoneNumber: "+256 777 456 789",           PhoneNumber: "+256 777 456 789", 

          Role: "Staff",          Role: "Staff",

          IsActive: false,          IsActive: false,

          CreatedAt: "2025-01-03T00:00:00Z"          CreatedAt: "2025-01-03T00:00:00Z"

        }        }

      ];      ];

      setStaff(mockStaff);      setStaff(mockStaff);

    } catch (error) {    } catch (error) {

      console.error('Error fetching staff:', error);      console.error('Error fetching staff:', error);

    } finally {    } finally {

      setLoading(false);      setLoading(false);

    }    }

  };  };



  const fetchLocations = async () => {  const fetchLocations = async () => {

    try {    try {

      const response = await fetch('/api/locations');      const response = await fetch('/api/locations');

      if (response.ok) {      if (response.ok) {

        const data = await response.json();        const data = await response.json();

        if (data.success) {        if (data.success) {

          setLocations(data.locations);          setLocations(data.locations);

        }        }

      }      }

    } catch (error) {    } catch (error) {

      console.error('Error fetching locations:', error);      console.error('Error fetching locations:', error);

      // Mock locations for now      // Mock locations for now

      setLocations([      setLocations([

        { LocationID: 1, LocationName: "Central Station", Address: "123 Main St", City: "Kampala" },        { LocationID: 1, LocationName: "Central Station", Address: "123 Main St", City: "Kampala" },

        { LocationID: 2, LocationName: "Downtown Hub", Address: "456 Central Ave", City: "Kampala" },        { LocationID: 2, LocationName: "Downtown Hub", Address: "456 Central Ave", City: "Kampala" },

        { LocationID: 3, LocationName: "University Campus", Address: "789 Campus Rd", City: "Kampala" }        { LocationID: 3, LocationName: "University Campus", Address: "789 Campus Rd", City: "Kampala" }

      ]);      ]);

    }    }

  };  };



  useEffect(() => {  useEffect(() => {

    fetchStaff();    fetchStaff();

    fetchLocations();    fetchLocations();

  }, []);  }, []);



  // Filter staff based on search and filters  // Filter staff based on search and filters

  const filteredStaff = staff.filter(member => {  const filteredStaff = staff.filter(member => {

    const matchesSearch =     const matchesSearch = 

      member.UserName.toLowerCase().includes(searchTerm.toLowerCase()) ||      member.UserName.toLowerCase().includes(searchTerm.toLowerCase()) ||

      member.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||      member.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||

      member.PhoneNumber.includes(searchTerm);      member.PhoneNumber.includes(searchTerm);

        

    const matchesRole = roleFilter === "all" || member.Role === roleFilter;    const matchesRole = roleFilter === "all" || member.Role === roleFilter;

    const matchesStatus = statusFilter === "all" ||     const matchesStatus = statusFilter === "all" || 

      (statusFilter === "active" && member.IsActive) ||      (statusFilter === "active" && member.IsActive) ||

      (statusFilter === "inactive" && !member.IsActive);      (statusFilter === "inactive" && !member.IsActive);

        

    return matchesSearch && matchesRole && matchesStatus;    return matchesSearch && matchesRole && matchesStatus;

  });  });



  const getStatusBadge = (isActive: boolean) => {  const getStatusBadge = (isActive: boolean) => {

    return isActive ? (    return isActive ? (

      <Badge variant="default" className="gap-1">      <Badge variant="default" className="gap-1">

        <CheckCircle className="h-3 w-3" />        <CheckCircle className="h-3 w-3" />

        Active        Active

      </Badge>      </Badge>

    ) : (    ) : (

      <Badge variant="secondary" className="gap-1">      <Badge variant="secondary" className="gap-1">

        <XCircle className="h-3 w-3" />        <XCircle className="h-3 w-3" />

        Inactive        Inactive

      </Badge>      </Badge>

    );    );

  };  };



  const getRoleBadge = (role: string) => {  const getRoleBadge = (role: string) => {

    const roleConfig = {    const roleConfig = {

      Administrator: { variant: "destructive" as const, icon: Shield },      Administrator: { variant: "destructive" as const, icon: Shield },

      Staff: { variant: "default" as const, icon: Users },      Staff: { variant: "default" as const, icon: Users },

      Customer: { variant: "outline" as const, icon: Users }      Customer: { variant: "outline" as const, icon: Users }

    };    };

        

    const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.Customer;    const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.Customer;

    const Icon = config.icon;    const Icon = config.icon;

        

    return (    return (

      <Badge variant={config.variant} className="gap-1">      <Badge variant={config.variant} className="gap-1">

        <Icon className="h-3 w-3" />        <Icon className="h-3 w-3" />

        {role}        {role}

      </Badge>      </Badge>

    );    );

  };  };



  if (loading) {  if (loading) {

    return (    return (

      <div className="flex items-center justify-center h-64">      <div className="flex items-center justify-center h-64">

        <RefreshCw className="h-8 w-8 animate-spin" />        <RefreshCw className="h-8 w-8 animate-spin" />

        <span className="ml-2">Loading staff...</span>        <span className="ml-2">Loading staff...</span>

      </div>      </div>

    );    );

  }  }



  return (  return (

    <div className="space-y-6">    <div className="space-y-6">

      {/* Header */}      {/* Header */}

      <div className="flex items-center justify-between">      <div className="flex items-center justify-between">

        <div>        <div>

          <h1 className="text-3xl font-bold tracking-tight">Staff Management</h1>          <h1 className="text-3xl font-bold tracking-tight">Staff Management</h1>

          <p className="text-muted-foreground">          <p className="text-muted-foreground">

            Manage staff members, assign locations, and control access            Manage staff members, assign locations, and control access

          </p>          </p>

        </div>        </div>

                

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>

          <DialogTrigger asChild>          <DialogTrigger asChild>

            <Button>            <Button>

              <UserPlus className="h-4 w-4 mr-2" />              <UserPlus className="h-4 w-4 mr-2" />

              Add Staff Member              Add Staff Member

            </Button>            </Button>

          </DialogTrigger>          </DialogTrigger>

          <DialogContent>          <DialogContent>

            <DialogHeader>            <DialogHeader>

              <DialogTitle>Add New Staff Member</DialogTitle>              <DialogTitle>Add New Staff Member</DialogTitle>

              <DialogDescription>              <DialogDescription>

                Create a new staff account and assign them to a location.                Create a new staff account and assign them to a location.

              </DialogDescription>              </DialogDescription>

            </DialogHeader>            </DialogHeader>

                        

            <div className="grid gap-4 py-4">            <div className="grid gap-4 py-4">

              <div className="grid grid-cols-4 items-center gap-4">              <div className="grid grid-cols-4 items-center gap-4">

                <Label htmlFor="userName" className="text-right">Name</Label>                <Label htmlFor="userName" className="text-right">Name</Label>

                <Input                <Input

                  id="userName"                  id="userName"

                  value={formData.userName}                  value={formData.userName}

                  onChange={(e) => setFormData({...formData, userName: e.target.value})}                  onChange={(e) => setFormData({...formData, userName: e.target.value})}

                  className="col-span-3"                  className="col-span-3"

                  placeholder="Full name"                  placeholder="Full name"

                />                />

              </div>              </div>

                            

              <div className="grid grid-cols-4 items-center gap-4">              <div className="grid grid-cols-4 items-center gap-4">

                <Label htmlFor="email" className="text-right">Email</Label>                <Label htmlFor="email" className="text-right">Email</Label>

                <Input                <Input

                  id="email"                  id="email"

                  type="email"                  type="email"

                  value={formData.email}                  value={formData.email}

                  onChange={(e) => setFormData({...formData, email: e.target.value})}                  onChange={(e) => setFormData({...formData, email: e.target.value})}

                  className="col-span-3"                  className="col-span-3"

                  placeholder="Email address"                  placeholder="Email address"

                />                />

              </div>              </div>

                            

              <div className="grid grid-cols-4 items-center gap-4">              <div className="grid grid-cols-4 items-center gap-4">

                <Label htmlFor="phone" className="text-right">Phone</Label>                <Label htmlFor="phone" className="text-right">Phone</Label>

                <Input                <Input

                  id="phone"                  id="phone"

                  value={formData.phoneNumber}                  value={formData.phoneNumber}

                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}

                  className="col-span-3"                  className="col-span-3"

                  placeholder="Phone number"                  placeholder="Phone number"

                />                />

              </div>              </div>

                            

              <div className="grid grid-cols-4 items-center gap-4">              <div className="grid grid-cols-4 items-center gap-4">

                <Label htmlFor="password" className="text-right">Password</Label>                <Label htmlFor="password" className="text-right">Password</Label>

                <Input                <Input

                  id="password"                  id="password"

                  type="password"                  type="password"

                  value={formData.password}                  value={formData.password}

                  onChange={(e) => setFormData({...formData, password: e.target.value})}                  onChange={(e) => setFormData({...formData, password: e.target.value})}

                  className="col-span-3"                  className="col-span-3"

                  placeholder="Initial password"                  placeholder="Initial password"

                />                />

              </div>              </div>

                            

              <div className="grid grid-cols-4 items-center gap-4">              <div className="grid grid-cols-4 items-center gap-4">

                <Label htmlFor="role" className="text-right">Role</Label>                <Label htmlFor="role" className="text-right">Role</Label>

                <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>                <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>

                  <SelectTrigger className="col-span-3">                  <SelectTrigger className="col-span-3">

                    <SelectValue placeholder="Select role" />                    <SelectValue placeholder="Select role" />

                  </SelectTrigger>                  </SelectTrigger>

                  <SelectContent>                  <SelectContent>

                    <SelectItem value="Staff">Staff</SelectItem>                    <SelectItem value="Staff">Staff</SelectItem>

                    <SelectItem value="Administrator">Administrator</SelectItem>                    <SelectItem value="Administrator">Administrator</SelectItem>

                  </SelectContent>                  </SelectContent>

                </Select>                </Select>

              </div>              </div>

                            

              <div className="grid grid-cols-4 items-center gap-4">              <div className="grid grid-cols-4 items-center gap-4">

                <Label htmlFor="location" className="text-right">Location</Label>                <Label htmlFor="location" className="text-right">Location</Label>

                <Select value={formData.locationID} onValueChange={(value) => setFormData({...formData, locationID: value})}>                <Select value={formData.locationID} onValueChange={(value) => setFormData({...formData, locationID: value})}>

                  <SelectTrigger className="col-span-3">                  <SelectTrigger className="col-span-3">

                    <SelectValue placeholder="Assign to location" />                    <SelectValue placeholder="Assign to location" />

                  </SelectTrigger>                  </SelectTrigger>

                  <SelectContent>                  <SelectContent>

                    <SelectItem value="">No Assignment</SelectItem>                    <SelectItem value="">No Assignment</SelectItem>

                    {locations.map((location) => (                    {locations.map((location) => (

                      <SelectItem key={location.LocationID} value={location.LocationID.toString()}>                      <SelectItem key={location.LocationID} value={location.LocationID.toString()}>

                        {location.LocationName} - {location.City}                        {location.LocationName} - {location.City}

                      </SelectItem>                      </SelectItem>

                    ))}                    ))}

                  </SelectContent>                  </SelectContent>

                </Select>                </Select>

              </div>              </div>

            </div>            </div>

                        

            <DialogFooter>            <DialogFooter>

              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>

                Cancel                Cancel

              </Button>              </Button>

              <Button onClick={() => {              <Button onClick={() => {

                // For now just close the dialog - we'll implement the API later                // For now just close the dialog - we'll implement the API later

                console.log('Adding staff:', formData);                console.log('Adding staff:', formData);

                setIsAddDialogOpen(false);                setIsAddDialogOpen(false);

              }}>              }}>

                Add Staff Member                Add Staff Member

              </Button>              </Button>

            </DialogFooter>            </DialogFooter>

          </DialogContent>          </DialogContent>

        </Dialog>        </Dialog>

      </div>      </div>



      {/* Stats Cards */}      {/* Stats Cards */}

      <div className="grid gap-4 md:grid-cols-4">      <div className="grid gap-4 md:grid-cols-4">

        <Card>        <Card>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>

            <Users className="h-4 w-4 text-muted-foreground" />            <Users className="h-4 w-4 text-muted-foreground" />

          </CardHeader>          </CardHeader>

          <CardContent>          <CardContent>

            <div className="text-2xl font-bold">{staff.length}</div>            <div className="text-2xl font-bold">{staff.length}</div>

            <p className="text-xs text-muted-foreground">            <p className="text-xs text-muted-foreground">

              {staff.filter(s => s.Role === 'Staff').length} staff members              {staff.filter(s => s.Role === 'Staff').length} staff members

            </p>            </p>

          </CardContent>          </CardContent>

        </Card>        </Card>

                

        <Card>        <Card>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

            <CardTitle className="text-sm font-medium">Active Staff</CardTitle>            <CardTitle className="text-sm font-medium">Active Staff</CardTitle>

            <CheckCircle className="h-4 w-4 text-muted-foreground" />            <CheckCircle className="h-4 w-4 text-muted-foreground" />

          </CardHeader>          </CardHeader>

          <CardContent>          <CardContent>

            <div className="text-2xl font-bold">            <div className="text-2xl font-bold">

              {staff.filter(s => s.IsActive).length}              {staff.filter(s => s.IsActive).length}

            </div>            </div>

            <p className="text-xs text-muted-foreground">            <p className="text-xs text-muted-foreground">

              Currently active              Currently active

            </p>            </p>

          </CardContent>          </CardContent>

        </Card>        </Card>

                

        <Card>        <Card>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

            <CardTitle className="text-sm font-medium">Assigned</CardTitle>            <CardTitle className="text-sm font-medium">Assigned</CardTitle>

            <MapPin className="h-4 w-4 text-muted-foreground" />            <MapPin className="h-4 w-4 text-muted-foreground" />

          </CardHeader>          </CardHeader>

          <CardContent>          <CardContent>

            <div className="text-2xl font-bold">            <div className="text-2xl font-bold">

              {staff.filter(s => s.AssignedLocationID).length}              {staff.filter(s => s.AssignedLocationID).length}

            </div>            </div>

            <p className="text-xs text-muted-foreground">            <p className="text-xs text-muted-foreground">

              Assigned to locations              Assigned to locations

            </p>            </p>

          </CardContent>          </CardContent>

        </Card>        </Card>

                

        <Card>        <Card>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

            <CardTitle className="text-sm font-medium">Administrators</CardTitle>            <CardTitle className="text-sm font-medium">Administrators</CardTitle>

            <Shield className="h-4 w-4 text-muted-foreground" />            <Shield className="h-4 w-4 text-muted-foreground" />

          </CardHeader>          </CardHeader>

          <CardContent>          <CardContent>

            <div className="text-2xl font-bold">            <div className="text-2xl font-bold">

              {staff.filter(s => s.Role === 'Administrator').length}              {staff.filter(s => s.Role === 'Administrator').length}

            </div>            </div>

            <p className="text-xs text-muted-foreground">            <p className="text-xs text-muted-foreground">

              Admin accounts              Admin accounts

            </p>            </p>

          </CardContent>          </CardContent>

        </Card>        </Card>

      </div>      </div>



      {/* Filters */}      {/* Filters */}

      <Card>      <Card>

        <CardHeader>        <CardHeader>

          <div className="flex flex-col sm:flex-row gap-4">          <div className="flex flex-col sm:flex-row gap-4">

            <div className="flex-1">            <div className="flex-1">

              <div className="relative">              <div className="relative">

                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input                <Input

                  placeholder="Search staff by name, email, or phone..."                  placeholder="Search staff by name, email, or phone..."

                  value={searchTerm}                  value={searchTerm}

                  onChange={(e) => setSearchTerm(e.target.value)}                  onChange={(e) => setSearchTerm(e.target.value)}

                  className="pl-10"                  className="pl-10"

                />                />

              </div>              </div>

            </div>            </div>

                        

            <div className="flex gap-2">            <div className="flex gap-2">

              <Select value={roleFilter} onValueChange={setRoleFilter}>              <Select value={roleFilter} onValueChange={setRoleFilter}>

                <SelectTrigger className="w-[140px]">                <SelectTrigger className="w-[140px]">

                  <SelectValue placeholder="Filter by role" />                  <SelectValue placeholder="Filter by role" />

                </SelectTrigger>                </SelectTrigger>

                <SelectContent>                <SelectContent>

                  <SelectItem value="all">All Roles</SelectItem>                  <SelectItem value="all">All Roles</SelectItem>

                  <SelectItem value="Staff">Staff</SelectItem>                  <SelectItem value="Staff">Staff</SelectItem>

                  <SelectItem value="Administrator">Administrator</SelectItem>                  <SelectItem value="Administrator">Administrator</SelectItem>

                </SelectContent>                </SelectContent>

              </Select>              </Select>

                            

              <Select value={statusFilter} onValueChange={setStatusFilter}>              <Select value={statusFilter} onValueChange={setStatusFilter}>

                <SelectTrigger className="w-[140px]">                <SelectTrigger className="w-[140px]">

                  <SelectValue placeholder="Filter by status" />                  <SelectValue placeholder="Filter by status" />

                </SelectTrigger>                </SelectTrigger>

                <SelectContent>                <SelectContent>

                  <SelectItem value="all">All Status</SelectItem>                  <SelectItem value="all">All Status</SelectItem>

                  <SelectItem value="active">Active</SelectItem>                  <SelectItem value="active">Active</SelectItem>

                  <SelectItem value="inactive">Inactive</SelectItem>                  <SelectItem value="inactive">Inactive</SelectItem>

                </SelectContent>                </SelectContent>

              </Select>              </Select>

                            

              <Button variant="outline" onClick={fetchStaff}>              <Button variant="outline" onClick={fetchStaff}>

                <RefreshCw className="h-4 w-4" />                <RefreshCw className="h-4 w-4" />

              </Button>              </Button>

            </div>            </div>

          </div>          </div>

        </CardHeader>        </CardHeader>

      </Card>      </Card>



      {/* Staff Table */}      {/* Staff Table */}

      <Card>      <Card>

        <CardHeader>        <CardHeader>

          <CardTitle>Staff Members ({filteredStaff.length})</CardTitle>          <CardTitle>Staff Members ({filteredStaff.length})</CardTitle>

        </CardHeader>        </CardHeader>

        <CardContent>        <CardContent>

          <Table>          <Table>

            <TableHeader>            <TableHeader>

              <TableRow>              <TableRow>

                <TableHead>Staff Member</TableHead>                <TableHead>Staff Member</TableHead>

                <TableHead>Contact</TableHead>                <TableHead>Contact</TableHead>

                <TableHead>Role</TableHead>                <TableHead>Role</TableHead>

                <TableHead>Status</TableHead>                <TableHead>Status</TableHead>

                <TableHead>Assigned Location</TableHead>                <TableHead>Assigned Location</TableHead>

                <TableHead>Created</TableHead>                <TableHead>Created</TableHead>

                <TableHead>Actions</TableHead>                <TableHead>Actions</TableHead>

              </TableRow>              </TableRow>

            </TableHeader>            </TableHeader>

            <TableBody>            <TableBody>

              {filteredStaff.map((member) => (              {filteredStaff.map((member) => (

                <TableRow key={member.UserID}>                <TableRow key={member.UserID}>

                  <TableCell>                  <TableCell>

                    <div className="flex items-center gap-2">                    <div className="flex items-center gap-2">

                      <Avatar className="h-8 w-8">                      <Avatar className="h-8 w-8">

                        <AvatarFallback>                        <AvatarFallback>

                          {member.UserName.split(' ').map(n => n[0]).join('').toUpperCase()}                          {member.UserName.split(' ').map(n => n[0]).join('').toUpperCase()}

                        </AvatarFallback>                        </AvatarFallback>

                      </Avatar>                      </Avatar>

                      <div>                      <div>

                        <div className="font-medium">{member.UserName}</div>                        <div className="font-medium">{member.UserName}</div>

                        <div className="text-sm text-muted-foreground">ID: {member.UserID}</div>                        <div className="text-sm text-muted-foreground">ID: {member.UserID}</div>

                      </div>                      </div>

                    </div>                    </div>

                  </TableCell>                  </TableCell>

                                    

                  <TableCell>                  <TableCell>

                    <div className="space-y-1">                    <div className="space-y-1">

                      <div className="flex items-center gap-1 text-sm">                      <div className="flex items-center gap-1 text-sm">

                        <Mail className="h-3 w-3" />                        <Mail className="h-3 w-3" />

                        {member.Email}                        {member.Email}

                      </div>                      </div>

                      <div className="flex items-center gap-1 text-sm">                      <div className="flex items-center gap-1 text-sm">

                        <Phone className="h-3 w-3" />                        <Phone className="h-3 w-3" />

                        {member.PhoneNumber}                        {member.PhoneNumber}

                      </div>                      </div>

                    </div>                    </div>

                  </TableCell>                  </TableCell>

                                    

                  <TableCell>                  <TableCell>

                    {getRoleBadge(member.Role)}                    {getRoleBadge(member.Role)}

                  </TableCell>                  </TableCell>

                                    

                  <TableCell>                  <TableCell>

                    {getStatusBadge(member.IsActive)}                    {getStatusBadge(member.IsActive)}

                  </TableCell>                  </TableCell>

                                    

                  <TableCell>                  <TableCell>

                    {member.LocationName ? (                    {member.LocationName ? (

                      <div>                      <div>

                        <div className="font-medium">{member.LocationName}</div>                        <div className="font-medium">{member.LocationName}</div>

                        <div className="text-sm text-muted-foreground">{member.LocationAddress}</div>                        <div className="text-sm text-muted-foreground">{member.LocationAddress}</div>

                      </div>                      </div>

                    ) : (                    ) : (

                      <span className="text-muted-foreground">Not assigned</span>                      <span className="text-muted-foreground">Not assigned</span>

                    )}                    )}

                  </TableCell>                  </TableCell>

                                    

                  <TableCell>                  <TableCell>

                    <div className="flex items-center gap-1 text-sm">                    <div className="flex items-center gap-1 text-sm">

                      <Clock className="h-3 w-3" />                      <Clock className="h-3 w-3" />

                      {new Date(member.CreatedAt).toLocaleDateString()}                      {new Date(member.CreatedAt).toLocaleDateString()}

                    </div>                    </div>

                  </TableCell>                  </TableCell>

                                    

                  <TableCell>                  <TableCell>

                    <DropdownMenu>                    <DropdownMenu>

                      <DropdownMenuTrigger asChild>                      <DropdownMenuTrigger asChild>

                        <Button variant="ghost" size="sm">                        <Button variant="ghost" size="sm">

                          <MoreHorizontal className="h-4 w-4" />                          <MoreHorizontal className="h-4 w-4" />

                        </Button>                        </Button>

                      </DropdownMenuTrigger>                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">                      <DropdownMenuContent align="end">

                        <DropdownMenuItem>                        <DropdownMenuItem>

                          <Eye className="h-4 w-4 mr-2" />                          <Eye className="h-4 w-4 mr-2" />

                          View Details                          View Details

                        </DropdownMenuItem>                        </DropdownMenuItem>

                                                

                        <DropdownMenuItem>                        <DropdownMenuItem>

                          <Edit className="h-4 w-4 mr-2" />                          <Edit className="h-4 w-4 mr-2" />

                          Edit Info                          Edit Info

                        </DropdownMenuItem>                        </DropdownMenuItem>

                                                

                        <DropdownMenuItem>                        <DropdownMenuItem>

                          {member.IsActive ? (                          {member.IsActive ? (

                            <>                            <>

                              <XCircle className="h-4 w-4 mr-2" />                              <XCircle className="h-4 w-4 mr-2" />

                              Deactivate                              Deactivate

                            </>                            </>

                          ) : (                          ) : (

                            <>                            <>

                              <CheckCircle className="h-4 w-4 mr-2" />                              <CheckCircle className="h-4 w-4 mr-2" />

                              Activate                              Activate

                            </>                            </>

                          )}                          )}

                        </DropdownMenuItem>                        </DropdownMenuItem>

                                                

                        <DropdownMenuItem>                        <DropdownMenuItem>

                          <MapPin className="h-4 w-4 mr-2" />                          <MapPin className="h-4 w-4 mr-2" />

                          Assign Location                          Assign Location

                        </DropdownMenuItem>                        </DropdownMenuItem>

                                                

                        <DropdownMenuItem className="text-destructive">                        <DropdownMenuItem className="text-destructive">

                          <Trash2 className="h-4 w-4 mr-2" />                          <Trash2 className="h-4 w-4 mr-2" />

                          Remove Staff                          Remove Staff

                        </DropdownMenuItem>                        </DropdownMenuItem>

                      </DropdownMenuContent>                      </DropdownMenuContent>

                    </DropdownMenu>                    </DropdownMenu>

                  </TableCell>                  </TableCell>

                </TableRow>                </TableRow>

              ))}              ))}

            </TableBody>            </TableBody>

          </Table>          </Table>

                    

          {filteredStaff.length === 0 && (          {filteredStaff.length === 0 && (

            <div className="text-center py-8">            <div className="text-center py-8">

              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />

              <h3 className="text-lg font-semibold mb-2">No staff found</h3>              <h3 className="text-lg font-semibold mb-2">No staff found</h3>

              <p className="text-muted-foreground mb-4">              <p className="text-muted-foreground mb-4">

                {searchTerm || roleFilter !== "all" || statusFilter !== "all"                {searchTerm || roleFilter !== "all" || statusFilter !== "all"

                  ? "Try adjusting your search or filters."                  ? "Try adjusting your search or filters."

                  : "Start by adding your first staff member."}                  : "Start by adding your first staff member."}

              </p>              </p>

              <Button onClick={() => setIsAddDialogOpen(true)}>              <Button onClick={() => setIsAddDialogOpen(true)}>

                <UserPlus className="h-4 w-4 mr-2" />                <UserPlus className="h-4 w-4 mr-2" />

                Add Staff Member                Add Staff Member

              </Button>              </Button>

            </div>            </div>

          )}          )}

        </CardContent>        </CardContent>

      </Card>      </Card>

    </div>    </div>

  );  );

}}

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