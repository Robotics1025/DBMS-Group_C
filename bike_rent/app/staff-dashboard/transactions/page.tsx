"use client";

import React, { useState, useEffect } from 'react';
import { 
  CreditCard, Search, User, Bike, Clock, DollarSign, 
  Receipt, CheckCircle, ArrowLeft, Plus, AlertCircle,
  Calendar, MapPin, Battery, Wrench
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
}

interface Bike {
  BikeID: number;
  BikeSerialNumber: string;
  Model: string;
  BikeType: string;
  CurrentStatus: string;
  RentalRatePerMinute: number;
  LocationName?: string;
  City?: string;
}

interface RentalTransaction {
  customer: Customer;
  bike: Bike;
  startTime: string;
  expectedDuration: number; // in minutes
  estimatedCost: number;
}

export default function TransactionsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('start-rental');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<RentalTransaction | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [expectedDuration, setExpectedDuration] = useState<number>(60); // default 1 hour

  useEffect(() => {
    if (activeTab === 'start-rental') {
      fetchAvailableBikes();
    }
  }, [activeTab]);

  const fetchCustomers = async (search: string) => {
    if (!search || search.length < 2) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/customers/search?q=${encodeURIComponent(search)}`);
      const data = await response.json();

      if (data.success) {
        setCustomers(data.customers || []);
      } else {
        toast.error('Failed to search customers');
      }
    } catch (error) {
      console.error('Error searching customers:', error);
      toast.error('Error searching customers');
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableBikes = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/bikes?status=Available');
      const data = await response.json();

      if (data.success) {
        setBikes(data.bikes || []);
      } else {
        toast.error('Failed to load available bikes');
      }
    } catch (error) {
      console.error('Error fetching bikes:', error);
      toast.error('Error loading bikes');
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerSearch = (value: string) => {
    setSearchTerm(value);
    fetchCustomers(value);
  };

  const calculateEstimatedCost = (bike: Bike, duration: number): number => {
    return bike.RentalRatePerMinute * duration;
  };

  const handleStartRental = () => {
    if (!selectedCustomer || !selectedBike) {
      toast.error('Please select both customer and bike');
      return;
    }

    const transaction: RentalTransaction = {
      customer: selectedCustomer,
      bike: selectedBike,
      startTime: new Date().toISOString(),
      expectedDuration,
      estimatedCost: calculateEstimatedCost(selectedBike, expectedDuration)
    };

    setCurrentTransaction(transaction);
    setShowConfirmDialog(true);
  };

  const confirmStartRental = async () => {
    if (!currentTransaction) return;

    try {
      setLoading(true);
      const response = await fetch('/api/rentals/manual-start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: currentTransaction.customer.UserID,
          bikeId: currentTransaction.bike.BikeID,
          expectedDuration: currentTransaction.expectedDuration,
          staffId: user?.id,
          paymentMethod: 'Cash' // Default for manual transactions
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Rental started successfully!');
        setShowConfirmDialog(false);
        setCurrentTransaction(null);
        setSelectedCustomer(null);
        setSelectedBike(null);
        setExpectedDuration(60);
        fetchAvailableBikes(); // Refresh bike list
      } else {
        toast.error(data.message || 'Failed to start rental');
      }
    } catch (error) {
      console.error('Error starting rental:', error);
      toast.error('Error processing rental');
    } finally {
      setLoading(false);
    }
  };

  const getBikeStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'text-green-600 bg-green-50';
      case 'Rented': return 'text-blue-600 bg-blue-50';
      case 'Maintenance': return 'text-orange-600 bg-orange-50';
      case 'Charging': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
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
            <h1 className="text-3xl font-bold text-gray-900">Manual Transactions</h1>
            <p className="text-gray-600 mt-1">Process in-person rentals and returns</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User className="h-4 w-4" />
          <span>Staff: {user?.name}</span>
        </div>
      </div>

      {/* Transaction Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="start-rental">Start Rental</TabsTrigger>
          <TabsTrigger value="end-rental">End Rental</TabsTrigger>
          <TabsTrigger value="payments">Process Payment</TabsTrigger>
        </TabsList>

        {/* Start Rental Tab */}
        <TabsContent value="start-rental" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Select Customer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="customer-search">Search Customer</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="customer-search"
                      placeholder="Enter name, email, or phone..."
                      value={searchTerm}
                      onChange={(e) => handleCustomerSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {customers.length > 0 && (
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {customers.map((customer) => (
                      <div
                        key={customer.UserID}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedCustomer?.UserID === customer.UserID
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedCustomer(customer)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">
                              {customer.FirstName} {customer.LastName}
                            </div>
                            <div className="text-sm text-gray-600">{customer.Email}</div>
                            {customer.PhoneNumber && (
                              <div className="text-sm text-gray-600">{customer.PhoneNumber}</div>
                            )}
                          </div>
                          <div className="text-right">
                            <Badge variant="outline">
                              {customer.LoyaltyPoints} pts
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {selectedCustomer && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-blue-100 text-blue-700">
                          {selectedCustomer.FirstName[0]}{selectedCustomer.LastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-blue-900">
                          {selectedCustomer.FirstName} {selectedCustomer.LastName}
                        </div>
                        <div className="text-sm text-blue-700">{selectedCustomer.Email}</div>
                        <div className="text-xs text-blue-600">
                          Loyalty Points: {selectedCustomer.LoyaltyPoints}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Bike Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bike className="h-5 w-5" />
                  Select Bike
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-16 bg-gray-200 rounded-lg"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="max-h-96 overflow-y-auto space-y-3">
                    {bikes.map((bike) => (
                      <div
                        key={bike.BikeID}
                        className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                          selectedBike?.BikeID === bike.BikeID
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedBike(bike)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{bike.Model}</div>
                            <div className="text-sm text-gray-600">
                              {bike.BikeSerialNumber} • {bike.BikeType}
                            </div>
                            <div className="text-sm text-gray-500">
                              ${bike.RentalRatePerMinute}/min
                            </div>
                            {bike.LocationName && (
                              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                <MapPin className="h-3 w-3" />
                                {bike.LocationName}, {bike.City}
                              </div>
                            )}
                          </div>
                          <Badge className={getBikeStatusColor(bike.CurrentStatus)}>
                            {bike.CurrentStatus}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Rental Details */}
          {selectedCustomer && selectedBike && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Rental Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="duration">Expected Duration (minutes)</Label>
                    <Select value={expectedDuration.toString()} onValueChange={(value) => setExpectedDuration(parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="180">3 hours</SelectItem>
                        <SelectItem value="240">4 hours</SelectItem>
                        <SelectItem value="480">8 hours (Full day)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-end">
                    <div className="w-full">
                      <Label>Estimated Cost</Label>
                      <div className="h-10 px-3 py-2 bg-gray-50 rounded-md flex items-center font-medium">
                        ${calculateEstimatedCost(selectedBike, expectedDuration).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-end">
                    <Button onClick={handleStartRental} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Start Rental
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Customer:</span>
                      <div className="font-medium">{selectedCustomer.FirstName} {selectedCustomer.LastName}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Bike:</span>
                      <div className="font-medium">{selectedBike.Model} ({selectedBike.BikeSerialNumber})</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Rate:</span>
                      <div className="font-medium">${selectedBike.RentalRatePerMinute}/minute</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Staff:</span>
                      <div className="font-medium">{user?.name}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* End Rental Tab */}
        <TabsContent value="end-rental" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>End Active Rental</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Scan bike QR code or search for active rental to process return.</p>
              {/* This would integrate with the rental return system */}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Process Manual Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Handle cash payments and payment adjustments.</p>
              {/* This would integrate with the payment processing system */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Rental Start</DialogTitle>
            <DialogDescription>
              Please review the rental details before confirming.
            </DialogDescription>
          </DialogHeader>

          {currentTransaction && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Customer:</span>
                  <div className="font-medium">
                    {currentTransaction.customer.FirstName} {currentTransaction.customer.LastName}
                  </div>
                  <div className="text-gray-500">{currentTransaction.customer.Email}</div>
                </div>
                <div>
                  <span className="text-gray-600">Bike:</span>
                  <div className="font-medium">{currentTransaction.bike.Model}</div>
                  <div className="text-gray-500">{currentTransaction.bike.BikeSerialNumber}</div>
                </div>
                <div>
                  <span className="text-gray-600">Duration:</span>
                  <div className="font-medium">{currentTransaction.expectedDuration} minutes</div>
                </div>
                <div>
                  <span className="text-gray-600">Estimated Cost:</span>
                  <div className="font-medium">${currentTransaction.estimatedCost.toFixed(2)}</div>
                </div>
              </div>

              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 text-yellow-800">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Important</span>
                </div>
                <p className="text-sm text-yellow-700 mt-1">
                  Make sure the customer has provided valid identification and understands the rental terms.
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmStartRental} disabled={loading}>
              {loading ? 'Processing...' : 'Confirm & Start Rental'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}