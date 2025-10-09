"use client";

import React, { useState } from "react";
import { 
  MapPin, Battery, Wrench, AlertTriangle, CheckCircle, Clock, 
  Users, Bike, DollarSign, TrendingUp, Search, Filter, Plus,
  MoreHorizontal, Edit, Trash2, Eye, Bell, User, LogOut
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
import { useNotify } from "@/hooks/use-notify";
import { NotificationBell } from "@/components/NotificationBell";

interface StaffBike {
  id: string;
  model: string;
  type: 'Electric' | 'Mountain' | 'City' | 'Hybrid';
  status: 'Available' | 'Rented' | 'Maintenance' | 'Charging';
  battery?: number;
  location: string;
  lastMaintenance: string;
  totalRides: number;
  condition: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  issues: string[];
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  currentRental?: {
    bikeId: string;
    startTime: string;
    duration: number;
  };
  totalRentals: number;
  status: 'Active' | 'Inactive';
}

interface Rental {
  id: string;
  customerId: string;
  customerName: string;
  bikeId: string;
  bikeModel: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  cost?: number;
  status: 'Active' | 'Completed' | 'Cancelled';
}

const mockBikes: StaffBike[] = [
  {
    id: "BK001",
    model: "Urban E-Cruiser",
    type: "Electric",
    status: "Available",
    battery: 85,
    location: "Central Station",
    lastMaintenance: "2024-10-01",
    totalRides: 142,
    condition: "Excellent",
    issues: []
  },
  {
    id: "BK002",
    model: "Mountain Explorer", 
    type: "Mountain",
    status: "Rented",
    location: "North Park Station",
    lastMaintenance: "2024-09-25",
    totalRides: 89,
    condition: "Good",
    issues: []
  },
  {
    id: "BK003",
    model: "City Commuter",
    type: "City",
    status: "Maintenance",
    location: "Workshop",
    lastMaintenance: "2024-10-05",
    totalRides: 156,
    condition: "Fair",
    issues: ["Brake adjustment needed", "Tire pressure low"]
  },
  {
    id: "BK004",
    model: "Speed Demon E-Bike",
    type: "Electric",
    status: "Charging",
    battery: 45,
    location: "Tech Hub Station",
    lastMaintenance: "2024-09-30",
    totalRides: 67,
    condition: "Good",
    issues: []
  }
];

const mockCustomers: Customer[] = [
  {
    id: "C001",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1-555-0123",
    currentRental: {
      bikeId: "BK002",
      startTime: "2024-10-08T10:30:00Z",
      duration: 120
    },
    totalRentals: 15,
    status: "Active"
  },
  {
    id: "C002", 
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1-555-0456",
    totalRentals: 8,
    status: "Active"
  }
];

const mockRentals: Rental[] = [
  {
    id: "R001",
    customerId: "C001",
    customerName: "John Doe",
    bikeId: "BK002",
    bikeModel: "Mountain Explorer",
    startTime: "2024-10-08T10:30:00Z",
    status: "Active"
  },
  {
    id: "R002",
    customerId: "C002",
    customerName: "Jane Smith", 
    bikeId: "BK001",
    bikeModel: "Urban E-Cruiser",
    startTime: "2024-10-08T08:00:00Z",
    endTime: "2024-10-08T10:00:00Z",
    duration: 120,
    cost: 30,
    status: "Completed"
  }
];

export default function StaffDashboard() {
  const { user, logout } = useAuth();
  const { notify } = useNotify();
  
  const [bikes] = useState<StaffBike[]>(mockBikes);
  const [customers] = useState<Customer[]>(mockCustomers);
  const [rentals] = useState<Rental[]>(mockRentals);
  const [selectedBike, setSelectedBike] = useState<StaffBike | null>(null);
  const [isMaintenanceOpen, setIsMaintenanceOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Welcome notification
  React.useEffect(() => {
    notify.info(`Welcome ${user?.name}!`, "Staff dashboard loaded successfully");
  }, [user?.name, notify.info]);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Available': return 'default';
      case 'Rented': return 'secondary'; 
      case 'Maintenance': return 'destructive';
      case 'Charging': return 'outline';
      default: return 'default';
    }
  };

  const handleMaintenanceUpdate = (bike: StaffBike) => {
    setSelectedBike(bike);
    setIsMaintenanceOpen(true);
  };

  const handleCompleteMaintenance = () => {
    if (selectedBike) {
      notify.success("Maintenance completed", `${selectedBike.model} is now available`);
      setIsMaintenanceOpen(false);
      setSelectedBike(null);
    }
  };

  const filteredBikes = bikes.filter(bike => {
    const matchesSearch = bike.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bike.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || bike.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const activeRentals = rentals.filter(r => r.status === 'Active');
  const todayRevenue = rentals
    .filter(r => r.status === 'Completed' && r.cost)
    .reduce((sum, r) => sum + (r.cost || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="h-8 w-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BR</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">BikeRent Staff</span>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <NotificationBell />
              
              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <User className="h-4 w-4 text-green-600" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div>
                      <div className="font-medium">{user?.name}</div>
                      <div className="text-sm text-muted-foreground">Staff Member</div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Available Bikes</p>
                  <p className="text-2xl font-bold text-green-600">
                    {bikes.filter(b => b.status === 'Available').length}
                  </p>
                </div>
                <Bike className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Rentals</p>
                  <p className="text-2xl font-bold text-blue-600">{activeRentals.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Maintenance Queue</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {bikes.filter(b => b.status === 'Maintenance').length}
                  </p>
                </div>
                <Wrench className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Today's Revenue</p>
                  <p className="text-2xl font-bold text-purple-600">${todayRevenue}</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="bikes" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bikes">Bike Management</TabsTrigger>
            <TabsTrigger value="rentals">Active Rentals</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>

          {/* Bikes Tab */}
          <TabsContent value="bikes" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex-1 min-w-64">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search bikes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="rented">Rented</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="charging">Charging</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Bikes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBikes.map((bike) => (
                <Card key={bike.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{bike.model}</CardTitle>
                        <p className="text-sm text-gray-600">{bike.id}</p>
                      </div>
                      <Badge variant={getStatusBadgeVariant(bike.status)}>
                        {bike.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Location:</span>
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {bike.location}
                        </span>
                      </div>

                      {bike.battery && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Battery:</span>
                            <span>{bike.battery}%</span>
                          </div>
                          <Progress value={bike.battery} className="h-2" />
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Condition:</span>
                        <Badge variant="outline" className={
                          bike.condition === 'Excellent' ? 'text-green-600' :
                          bike.condition === 'Good' ? 'text-blue-600' :
                          bike.condition === 'Fair' ? 'text-orange-600' : 'text-red-600'
                        }>
                          {bike.condition}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Total Rides:</span>
                        <span>{bike.totalRides}</span>
                      </div>

                      {bike.issues.length > 0 && (
                        <div className="mt-3">
                          <div className="flex items-center text-sm text-orange-600 mb-1">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Issues ({bike.issues.length})
                          </div>
                          <div className="text-xs space-y-1">
                            {bike.issues.map((issue, index) => (
                              <div key={index} className="bg-orange-50 text-orange-700 p-1 rounded">
                                {issue}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleMaintenanceUpdate(bike)}
                        >
                          <Wrench className="h-3 w-3 mr-1" />
                          Maintenance
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Info
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MapPin className="mr-2 h-4 w-4" />
                              Relocate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Rentals Tab */}
          <TabsContent value="rentals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Rentals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeRentals.map((rental) => (
                    <div key={rental.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">Active</Badge>
                            <span className="font-medium">{rental.customerName}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <div>Bike: {rental.bikeModel} ({rental.bikeId})</div>
                            <div>Started: {new Date(rental.startTime).toLocaleString()}</div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          End Rental
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {activeRentals.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No active rentals
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customers.map((customer) => (
                    <div key={customer.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{customer.name}</span>
                            <Badge variant={customer.status === 'Active' ? 'default' : 'secondary'}>
                              {customer.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600">
                            <div>{customer.email}</div>
                            <div>{customer.phone}</div>
                            <div>Total rentals: {customer.totalRentals}</div>
                          </div>
                          {customer.currentRental && (
                            <div className="text-sm text-blue-600">
                              Currently renting: {customer.currentRental.bikeId}
                            </div>
                          )}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Info
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Maintenance Modal */}
      <Dialog open={isMaintenanceOpen} onOpenChange={setIsMaintenanceOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Maintenance Update</DialogTitle>
            <DialogDescription>
              Update maintenance status for {selectedBike?.model}
            </DialogDescription>
          </DialogHeader>

          {selectedBike && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Bike ID:</span>
                  <div>{selectedBike.id}</div>
                </div>
                <div>
                  <span className="font-medium">Model:</span>
                  <div>{selectedBike.model}</div>
                </div>
                <div>
                  <span className="font-medium">Current Status:</span>
                  <div>
                    <Badge variant={getStatusBadgeVariant(selectedBike.status)}>
                      {selectedBike.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <span className="font-medium">Condition:</span>
                  <div>{selectedBike.condition}</div>
                </div>
              </div>

              {selectedBike.issues.length > 0 && (
                <div>
                  <span className="font-medium text-sm">Current Issues:</span>
                  <div className="space-y-1 mt-1">
                    {selectedBike.issues.map((issue, index) => (
                      <div key={index} className="text-sm bg-orange-50 text-orange-700 p-2 rounded">
                        {issue}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMaintenanceOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCompleteMaintenance}>
              Complete Maintenance
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}