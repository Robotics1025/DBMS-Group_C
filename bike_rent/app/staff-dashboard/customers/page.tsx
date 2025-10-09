"use client";

import React, { useState, useEffect } from 'react';
import { 
  Search, User, Mail, Phone, Calendar, MapPin, 
  Clock, DollarSign, Eye, Edit, MoreHorizontal,
  ArrowLeft, Filter, Download, RefreshCw, Plus,
  CheckCircle, AlertCircle, XCircle, Star
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

interface Customer {
  UserID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber?: string;
  LoyaltyPoints: number;
  RegistrationDate: string;
  DateOfBirth?: string;
  TotalRentals?: number;
  ActiveRental?: {
    RentalID: number;
    BikeModel: string;
    StartTime: string;
  };
  LastRental?: string;
}

interface Rental {
  RentalID: number;
  BikeSerialNumber: string;
  BikeModel: string;
  BikeType: string;
  RentalStart: string;
  RentalEnd?: string;
  TotalCost: number;
  PaymentStatus: string;
  PaymentMethod?: string;
  Duration?: number;
}

interface CustomerStats {
  totalCustomers: number;
  activeCustomers: number;
  newThisMonth: number;
  averageLoyaltyPoints: number;
}

export default function CustomerManagementPage() {
  const { user } = useAuth();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerRentals, setCustomerRentals] = useState<Rental[]>([]);
  const [stats, setStats] = useState<CustomerStats>({
    totalCustomers: 0,
    activeCustomers: 0,
    newThisMonth: 0,
    averageLoyaltyPoints: 0
  });
  
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCustomerDialog, setShowCustomerDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  useEffect(() => {
    fetchCustomers();
    fetchCustomerStats();
  }, [statusFilter]);

  useEffect(() => {
    if (searchTerm) {
      searchCustomers();
    } else {
      fetchCustomers();
    }
  }, [searchTerm]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      let url = '/api/customers/all';
      if (statusFilter !== 'all') {
        url += `?status=${statusFilter}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setCustomers(data.customers || []);
      } else {
        toast.error('Failed to fetch customers');
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast.error('Error loading customers');
    } finally {
      setLoading(false);
    }
  };

  const searchCustomers = async () => {
    if (!searchTerm || searchTerm.length < 2) {
      fetchCustomers();
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/customers/search?q=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();

      if (data.success) {
        setCustomers(data.customers || []);
      } else {
        toast.error('Search failed');
      }
    } catch (error) {
      console.error('Error searching customers:', error);
      toast.error('Search error');
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomerStats = async () => {
    try {
      const response = await fetch('/api/customers/stats');
      const data = await response.json();

      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching customer stats:', error);
    }
  };

  const fetchCustomerDetails = async (customerId: number) => {
    try {
      setLoading(true);
      
      // Fetch customer rental history
      const response = await fetch(`/api/customers/${customerId}/rentals`);
      const data = await response.json();

      if (data.success) {
        setCustomerRentals(data.rentals || []);
        setShowCustomerDialog(true);
      } else {
        toast.error('Failed to fetch customer details');
      }
    } catch (error) {
      console.error('Error fetching customer details:', error);
      toast.error('Error loading customer details');
    } finally {
      setLoading(false);
    }
  };

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    fetchCustomerDetails(customer.UserID);
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowEditDialog(true);
  };

  const getStatusBadge = (customer: Customer) => {
    if (customer.ActiveRental) {
      return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Active Rental</Badge>;
    } else if (customer.LastRental) {
      const lastRental = new Date(customer.LastRental);
      const daysSince = Math.floor((Date.now() - lastRental.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysSince <= 7) {
        return <Badge variant="default" className="bg-green-100 text-green-800">Recent</Badge>;
      } else if (daysSince <= 30) {
        return <Badge variant="outline">Regular</Badge>;
      } else {
        return <Badge variant="secondary" className="bg-gray-100 text-gray-600">Inactive</Badge>;
      }
    } else {
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">New</Badge>;
    }
  };

  const getLoyaltyTier = (points: number) => {
    if (points >= 1000) return { name: 'Platinum', color: 'text-purple-600', bg: 'bg-purple-100' };
    if (points >= 500) return { name: 'Gold', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (points >= 200) return { name: 'Silver', color: 'text-gray-600', bg: 'bg-gray-100' };
    return { name: 'Bronze', color: 'text-orange-600', bg: 'bg-orange-100' };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/staff-dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
            <p className="text-gray-600 mt-1">View and manage customer information and rental history</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => fetchCustomers()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalCustomers}</p>
              </div>
              <User className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Customers</p>
                <p className="text-2xl font-bold text-green-600">{stats.activeCustomers}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New This Month</p>
                <p className="text-2xl font-bold text-purple-600">{stats.newThisMonth}</p>
              </div>
              <Plus className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Loyalty Points</p>
                <p className="text-2xl font-bold text-orange-600">{Math.round(stats.averageLoyaltyPoints)}</p>
              </div>
              <Star className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search customers by name, email, or phone..."
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
                <SelectItem value="all">All Customers</SelectItem>
                <SelectItem value="active">Active Rentals</SelectItem>
                <SelectItem value="recent">Recent Activity</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="new">New Customers</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Directory</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-16 bg-gray-200 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Loyalty</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => {
                  const loyaltyTier = getLoyaltyTier(customer.LoyaltyPoints);
                  
                  return (
                    <TableRow key={customer.UserID} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-blue-100 text-blue-700 font-medium">
                              {customer.FirstName[0]}{customer.LastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {customer.FirstName} {customer.LastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {customer.UserID}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-3 w-3 text-gray-400" />
                            <span className="truncate max-w-48">{customer.Email}</span>
                          </div>
                          {customer.PhoneNumber && (
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-3 w-3 text-gray-400" />
                              <span>{customer.PhoneNumber}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="space-y-1">
                          {getStatusBadge(customer)}
                          {customer.ActiveRental && (
                            <div className="text-xs text-blue-600">
                              Renting: {customer.ActiveRental.BikeModel}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="space-y-1">
                          <Badge className={`${loyaltyTier.bg} ${loyaltyTier.color}`}>
                            {loyaltyTier.name}
                          </Badge>
                          <div className="text-sm font-medium">
                            {customer.LoyaltyPoints} points
                          </div>
                          <div className="text-xs text-gray-500">
                            {customer.TotalRentals || 0} rentals
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="text-sm">
                          {customer.LastRental ? (
                            <>
                              <div>{formatDate(customer.LastRental)}</div>
                              <div className="text-xs text-gray-500">
                                {Math.floor((Date.now() - new Date(customer.LastRental).getTime()) / (1000 * 60 * 60 * 24))} days ago
                              </div>
                            </>
                          ) : (
                            <span className="text-gray-400">No rentals</span>
                          )}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewCustomer(customer)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditCustomer(customer)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Info
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Email
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}

          {customers.length === 0 && !loading && (
            <div className="text-center py-8 text-gray-500">
              <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No customers found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Customer Details Dialog */}
      <Dialog open={showCustomerDialog} onOpenChange={setShowCustomerDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
            {selectedCustomer && (
              <DialogDescription>
                Viewing information for {selectedCustomer.FirstName} {selectedCustomer.LastName}
              </DialogDescription>
            )}
          </DialogHeader>

          {selectedCustomer && (
            <div className="space-y-6">
              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-blue-100 text-blue-700 text-lg font-medium">
                          {selectedCustomer.FirstName[0]}{selectedCustomer.LastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-lg">
                          {selectedCustomer.FirstName} {selectedCustomer.LastName}
                        </div>
                        <div className="text-sm text-gray-500">Customer ID: {selectedCustomer.UserID}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{selectedCustomer.Email}</span>
                      </div>
                      {selectedCustomer.PhoneNumber && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span>{selectedCustomer.PhoneNumber}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>Joined {formatDate(selectedCustomer.RegistrationDate)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Account Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{selectedCustomer.TotalRentals || 0}</div>
                        <div className="text-sm text-blue-800">Total Rentals</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{selectedCustomer.LoyaltyPoints}</div>
                        <div className="text-sm text-orange-800">Loyalty Points</div>
                      </div>
                    </div>
                    
                    <div>
                      {getStatusBadge(selectedCustomer)}
                    </div>
                    
                    {selectedCustomer.ActiveRental && (
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="font-medium text-yellow-800">Current Rental</div>
                        <div className="text-sm text-yellow-700">
                          {selectedCustomer.ActiveRental.BikeModel}
                        </div>
                        <div className="text-xs text-yellow-600">
                          Started: {formatDateTime(selectedCustomer.ActiveRental.StartTime)}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Rental History */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Rental History</CardTitle>
                </CardHeader>
                <CardContent>
                  {customerRentals.length > 0 ? (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {customerRentals.map((rental) => (
                        <div key={rental.RentalID} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="font-medium">
                                {rental.BikeModel} ({rental.BikeSerialNumber})
                              </div>
                              <div className="text-sm text-gray-600">
                                Started: {formatDateTime(rental.RentalStart)}
                              </div>
                              {rental.RentalEnd && (
                                <div className="text-sm text-gray-600">
                                  Ended: {formatDateTime(rental.RentalEnd)}
                                </div>
                              )}
                              {rental.Duration && (
                                <div className="text-sm text-gray-600">
                                  Duration: {Math.round(rental.Duration)} minutes
                                </div>
                              )}
                            </div>
                            
                            <div className="text-right">
                              <div className="font-semibold">{formatCurrency(rental.TotalCost)}</div>
                              <Badge 
                                variant={rental.PaymentStatus === 'Paid' ? 'default' : 'secondary'}
                                className={
                                  rental.PaymentStatus === 'Paid' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }
                              >
                                {rental.PaymentStatus}
                              </Badge>
                              {rental.PaymentMethod && (
                                <div className="text-xs text-gray-500 mt-1">
                                  via {rental.PaymentMethod}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Clock className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                      <p>No rental history</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCustomerDialog(false)}>
              Close
            </Button>
            {selectedCustomer && (
              <Button onClick={() => handleEditCustomer(selectedCustomer)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Customer
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Customer Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Customer Information</DialogTitle>
            {selectedCustomer && (
              <DialogDescription>
                Editing information for {selectedCustomer.FirstName} {selectedCustomer.LastName}
              </DialogDescription>
            )}
          </DialogHeader>

          {selectedCustomer && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-firstname">First Name</Label>
                  <Input
                    id="edit-firstname"
                    defaultValue={selectedCustomer.FirstName}
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-lastname">Last Name</Label>
                  <Input
                    id="edit-lastname"
                    defaultValue={selectedCustomer.LastName}
                    placeholder="Last Name"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  defaultValue={selectedCustomer.Email}
                  placeholder="Email"
                />
              </div>
              
              <div>
                <Label htmlFor="edit-phone">Phone Number</Label>
                <Input
                  id="edit-phone"
                  type="tel"
                  defaultValue={selectedCustomer.PhoneNumber || ''}
                  placeholder="Phone Number"
                />
              </div>
              
              <div>
                <Label htmlFor="edit-loyalty">Loyalty Points</Label>
                <Input
                  id="edit-loyalty"
                  type="number"
                  defaultValue={selectedCustomer.LoyaltyPoints}
                  placeholder="Loyalty Points"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}