"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, CreditCard, User, Phone, MapPin, ShoppingCart, Search, Receipt, LogOut, Menu, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useCart } from '@/contexts/CartContext';
import { useNotifications } from '@/contexts/NotificationContext';
import { useAuth } from '@/contexts/AuthContext';
import { NotificationBell } from '@/components/NotificationBell';

export default function ConfirmationPage() {
  const router = useRouter();
  const { items, totalAmount, clearCart } = useCart();
  const { addNotification } = useNotifications();
  const { user, logout } = useAuth();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const serviceFee = 2.99;
  const finalAmount = totalAmount + serviceFee;

  // Mock billing data (in real app, this would come from context or session)
  const billingData = {
    firstName: user?.name?.split(' ')[0] || 'John',
    lastName: user?.name?.split(' ')[1] || 'Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '+256 700 123 456',
    paymentMethod: 'Mobile Money',
    mobileProvider: 'MTN Mobile Money',
    mobileNumber: '+256 700 123 456'
  };

  const handleFinish = async () => {
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Generate receipt ID
      const receiptId = Math.random().toString(36).substr(2, 9).toUpperCase();

      // Show success notification
      addNotification({
        type: 'success',
        title: 'Payment Successful',
        message: `Your rental has been confirmed! Receipt #${receiptId}`
      });

      // Clear cart
      clearCart();

      // Redirect to receipt page
      router.push(`/customer-dashboard/receipt/${receiptId}`);

    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Payment Failed',
        message: 'There was an error processing your payment. Please try again.'
      });
      setIsProcessing(false);
    }
  };

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push('/customer-dashboard/cart');
    }
  }, [items.length, router]);

  if (items.length === 0) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
                <input
                  type="text"
                  placeholder="Search bikes, locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 w-full h-10 border border-gray-200 rounded-md focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none"
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

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/customer-dashboard/cart" className="hover:text-orange-600">
              Cart
            </Link>
            <span>/</span>
            <Link href="/customer-dashboard/billing" className="hover:text-orange-600">
              Billing
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Confirmation</span>
          </div>
        </div>

        {/* Confirmation Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Confirm Your Order</h1>
          <p className="text-gray-600">Please review your order details before completing the payment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="space-y-6">
            {/* Rental Items */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-orange-600" />
                  Rental Items ({items.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🚴</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.bikeName}</h4>
                      <p className="text-sm text-gray-600">
                        {item.hours} hour{item.hours > 1 ? 's' : ''} × ${item.price}/hour
                      </p>
                      <Badge variant="outline" className="mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        {item.hours} hour{item.hours > 1 ? 's' : ''}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${(item.price * item.hours).toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Billing Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-5 h-5 text-orange-600" />
                  Billing Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{billingData.firstName} {billingData.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{billingData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{billingData.phone}</span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-orange-600" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">{billingData.mobileProvider}</div>
                      <div className="text-sm text-gray-600">{billingData.mobileNumber}</div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    Ready
                  </Badge>
                </div>
                <p className="text-xs text-orange-600">
                  You will receive a payment prompt on your mobile device to complete the transaction
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Payment */}
          <div className="space-y-6">
            <Card className="border-2 border-green-100 bg-gradient-to-r from-green-50 to-green-100">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Receipt className="w-5 h-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Service Fee</span>
                    <span>${serviceFee.toFixed(2)}</span>
                  </div>
                  <hr className="border-green-200" />
                  <div className="flex justify-between font-bold text-xl">
                    <span>Total Amount</span>
                    <span className="text-green-600">${finalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    onClick={handleFinish}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    size="lg"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing Payment...
                      </div>
                    ) : (
                      'Finish & Pay'
                    )}
                  </Button>

                  <div className="flex justify-center mt-4">
                    <Link href="/customer-dashboard/billing">
                      <Button variant="ghost" className="text-gray-600 hover:text-orange-600">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to Billing
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Security Notice */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">Secure Payment</h4>
                    <p className="text-sm text-blue-700">
                      Your payment is processed securely through our encrypted mobile money gateway. 
                      We never store your payment information.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}