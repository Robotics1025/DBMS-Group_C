"use client";

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, Printer, Share2, CheckCircle, MapPin, Calendar, Clock, CreditCard, Star, Mail, Search, ShoppingCart, User, Receipt, LogOut, Menu, X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useNotifications } from '@/contexts/NotificationContext';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { NotificationBell } from '@/components/NotificationBell';

// Mock receipt data - in real app this would come from API or context
const generateReceiptData = (receiptId: string) => {
  const currentDate = new Date();
  const startTime = new Date(currentDate.getTime() + 30 * 60000); // 30 minutes from now
  const endTime = new Date(startTime.getTime() + 3 * 60 * 60000); // 3 hours later

  return {
    id: receiptId,
    date: currentDate.toISOString().split('T')[0],
    time: currentDate.toTimeString().split(' ')[0].substring(0, 5),
    transactionId: `TXN-${receiptId}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    customer: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+256 700 123 456'
    },
    bikes: [
      {
        id: 1,
        name: 'Mountain Explorer Pro',
        type: 'Mountain Bike',
        image: '/uploads/1759650691759-cool-bicycle-outdoors.jpg',
        hours: 3,
        pricePerHour: 15,
        totalPrice: 45
      }
    ],
    rental: {
      startDate: startTime.toISOString().split('T')[0],
      startTime: startTime.toTimeString().split(' ')[0].substring(0, 5),
      endDate: endTime.toISOString().split('T')[0], 
      endTime: endTime.toTimeString().split(' ')[0].substring(0, 5),
      duration: '3 hours',
      location: 'Station A - Downtown',
      staff: 'Alice Johnson'
    },
    payment: {
      method: 'MTN Mobile Money',
      mobileNumber: '+256 700 123 456',
      provider: 'MTN',
      subtotal: 45.00,
      serviceFee: 2.99,
      total: 47.99,
      status: 'Paid'
    },
    qrCode: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2ZmZiIvPgogIDx0ZXh0IHg9IjUwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzMzMyI+UVIgQ29kZTwvdGV4dD4KPC9zdmc+'
  };
};

export default function ReceiptPage() {
  const params = useParams();
  const router = useRouter();
  const { addNotification } = useNotifications();
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);

  const receiptId = params.id as string;
  const receipt = generateReceiptData(receiptId);

  const handleDownloadReceipt = () => {
    addNotification({
      type: 'success',
      title: 'Receipt Downloaded',
      message: 'Receipt has been saved to your downloads folder.'
    });
  };

  const handlePrintReceipt = () => {
    window.print();
    addNotification({
      type: 'info',
      title: 'Print Dialog Opened',
      message: 'Please select your printer and print settings.'
    });
  };

  const handleShareReceipt = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Bike Rental Receipt - ${receipt.id}`,
          text: `Rental receipt for ${receipt.bikes[0].name}`,
          url: window.location.href
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      addNotification({
        type: 'success',
        title: 'Link Copied',
        message: 'Receipt link copied to clipboard.'
      });
    }
  };

  const handleSubmitRating = () => {
    if (rating === 0) {
      addNotification({
        type: 'warning',
        title: 'Please Rate',
        message: 'Please select a rating before submitting.'
      });
      return;
    }

    addNotification({
      type: 'success',
      title: 'Thank You!',
      message: `Thanks for rating your experience ${rating} stars!`
    });
    setShowRating(false);
  };

  const handleEmailReceipt = () => {
    addNotification({
      type: 'success',
      title: 'Email Sent',
      message: `Receipt sent to ${receipt.customer.email}`
    });
  };

  const { user, logout } = useAuth();
  const { items } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Jumia-style Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Mobile Menu */}
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden mr-2"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
              
              <Link href="/customer-dashboard" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">B</span>
                </div>
                <span className="font-bold text-xl text-gray-800 hidden sm:block">BikeRent</span>
              </Link>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search bikes, locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 w-full border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <NotificationBell />
              
              <Link href="/customer-dashboard/cart">
                <Button variant="ghost" size="icon" className="relative hover:bg-orange-50">
                  <ShoppingCart className="h-5 w-5" />
                  {items.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full text-xs h-5 w-5 flex items-center justify-center">
                      {items.length}
                    </span>
                  )}
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 hover:bg-orange-50">
                    <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                      <User className="h-4 w-4 text-orange-600" />
                    </div>
                    <span className="hidden md:block font-medium">Hi, {user?.name?.split(' ')[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div>
                      <div className="font-medium">{user?.name}</div>
                      <div className="text-sm text-muted-foreground">{user?.email}</div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/customer-dashboard/profile">
                      <User className="mr-2 h-4 w-4" />
                      My Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/customer-dashboard/orders">
                      <Receipt className="mr-2 h-4 w-4" />
                      Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search */}
      <div className="md:hidden bg-white border-b px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search bikes, locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 w-full border-gray-200 focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Receipt</h1>
              <p className="text-gray-600">Rental ID: {receipt.id}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={handleEmailReceipt}>
              <Mail className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleShareReceipt}>
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handlePrintReceipt}>
              <Printer className="w-4 h-4" />
            </Button>
            <Button 
              onClick={handleDownloadReceipt}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Receipt */}
          <div className="lg:col-span-2 space-y-6">
            {/* Success Message */}
            <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-green-900">Payment Successful!</h2>
                    <p className="text-green-700">Your bike rental has been confirmed and is ready for pickup.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{receipt.customer.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{receipt.customer.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{receipt.customer.phone}</span>
                </div>
              </CardContent>
            </Card>

            {/* Rental Details */}
            <Card>
              <CardHeader>
                <CardTitle>Rental Details</CardTitle>
              </CardHeader>
              <CardContent>
                {receipt.bikes.map((bike: any, index: number) => (
                  <div key={index} className="flex gap-4 p-4 border border-gray-100 rounded-lg">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                      <img 
                        src={bike.image} 
                        alt={bike.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{bike.name}</h3>
                      <Badge variant="secondary" className="mt-1">{bike.type}</Badge>
                      <div className="flex justify-between items-end mt-2">
                        <span className="text-sm text-gray-600">{bike.hours} hours × ${bike.pricePerHour}/hour</span>
                        <span className="font-bold text-lg">${bike.totalPrice}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="grid md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Start: {receipt.rental.startDate} at {receipt.rental.startTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>End: {receipt.rental.endDate} at {receipt.rental.endTime}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{receipt.rental.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span>Staff: {receipt.rental.staff}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-orange-600" />
                  Payment Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${receipt.payment.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Fee</span>
                    <span>${receipt.payment.serviceFee.toFixed(2)}</span>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Paid</span>
                    <span className="text-orange-600">${receipt.payment.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Payment Method Info */}
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded ${receipt.payment.provider === 'MTN' ? 'bg-yellow-500' : 'bg-red-500'} flex items-center justify-center`}>
                        <span className="text-white text-xs font-bold">
                          {receipt.payment.provider === 'MTN' ? 'M' : 'A'}
                        </span>
                      </div>
                      <span className="font-medium">{receipt.payment.method}</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      {receipt.payment.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div>Mobile Number: {receipt.payment.mobileNumber}</div>
                    <div>Transaction ID: {receipt.transactionId}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* QR Code */}
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-lg">Pickup QR Code</CardTitle>
                <p className="text-sm text-gray-600">Show this to staff for bike pickup</p>
              </CardHeader>
              <CardContent>
                <div className="w-32 h-32 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img src={receipt.qrCode} alt="QR Code" className="w-24 h-24" />
                </div>
                <p className="text-xs text-gray-500">Rental ID: {receipt.id}</p>
              </CardContent>
            </Card>

            {/* Important Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Important Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium text-blue-900">Pickup Instructions:</p>
                  <p className="text-blue-800">Please arrive 10 minutes before your scheduled time with a valid ID.</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="font-medium text-yellow-900">Safety Guidelines:</p>
                  <p className="text-yellow-800">Helmet required. Check brakes and lights before riding.</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="font-medium text-green-900">Return Policy:</p>
                  <p className="text-green-800">Late returns incur additional charges. Lock bike securely at designated areas.</p>
                </div>
              </CardContent>
            </Card>

            {/* Rating */}
            {!showRating ? (
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-gray-600 mb-3">Enjoyed your ride?</p>
                  <Button 
                    onClick={() => setShowRating(true)}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                  >
                    Rate Your Experience
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-center">Rate Your Experience</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="transition-colors"
                        aria-label={`Rate ${star} stars`}
                        title={`Rate ${star} stars`}
                      >
                        <Star 
                          className={`w-8 h-8 ${
                            star <= rating 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300 hover:text-yellow-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <Button 
                    onClick={handleSubmitRating}
                    className="w-full"
                    disabled={rating === 0}
                  >
                    Submit Rating
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}