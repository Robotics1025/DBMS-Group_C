"use client";

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  Printer, 
  Share2, 
  CheckCircle2, 
  User, 
  Bike, 
  MapPin, 
  Calendar,
  Clock,
  CreditCard,
  Tag,
  Star,
  Phone,
  Mail
} from 'lucide-react';
import Image from 'next/image';

interface ReceiptProps {
  receipt: {
    receiptNumber: string;
    transactionID: string;
    paymentID: number;
    status: string;
    timestamp: string;
    customer: {
      customerID: number;
      name: string;
      email: string;
      phone: string;
      nationalID: string;
      loyaltyPointsEarned: number;
      totalLoyaltyPoints: number;
    };
    assignedStaff: {
      staffID: number;
      name: string;
      email: string;
      phone: string;
      role: string;
    };
    rental: {
      rentalID: number;
      bikeSerialNumber: string;
      bikeModel: string;
      bikeType: string;
      bikeImage?: string;
      rentalStart: string;
      expectedReturn: string;
      rentalEnd?: string;
      duration: number;
      ratePerMinute: number;
    };
    location: {
      locationName: string;
      address: string;
      city: string;
      phone: string;
    };
    payment: {
      subtotal: string;
      discount?: {
        code: string;
        percent: number;
        amount: string;
      } | null;
      tax: string;
      taxRate: string;
      total: string;
      method: string;
      currency: string;
    };
    company: {
      name: string;
      address: string;
      phone: string;
      email: string;
      website: string;
      taxID: string;
    };
    notes: string;
    termsAndConditions: string;
    qrData: string;
  };
}

export function ReceiptView({ receipt }: ReceiptProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Implementation for PDF download
    console.log('Download receipt as PDF');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Receipt ${receipt.receiptNumber}`,
        text: `BikeRent Receipt - ${receipt.payment.currency} ${receipt.payment.total}`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Transaction Receipt</h1>
            <p className="text-sm text-gray-500">Receipt #{receipt.receiptNumber}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Main Receipt Card - Alibaba Style */}
        <Card className="border-2 border-orange-200 print:border-gray-300">
          {/* Success Banner */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-8 w-8" />
                <div>
                  <h2 className="text-xl font-bold">Payment Successful!</h2>
                  <p className="text-sm text-orange-50">Your rental is confirmed</p>
                </div>
              </div>
              <Badge className="bg-white text-orange-600 hover:bg-white">
                {receipt.status}
              </Badge>
            </div>
          </div>

          <CardContent className="p-6">
            {/* Company Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="h-12 w-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">BR</span>
                </div>
                <span className="text-3xl font-bold text-gray-900">{receipt.company.name}</span>
              </div>
              <p className="text-sm text-gray-600">{receipt.company.address}</p>
              <p className="text-sm text-gray-600">{receipt.company.phone} | {receipt.company.email}</p>
              <p className="text-xs text-gray-500 mt-1">Tax ID: {receipt.company.taxID}</p>
            </div>

            <Separator className="my-6" />

            {/* Transaction Details */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Customer Information
                </h3>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-600">Name:</span> <span className="font-medium">{receipt.customer.name}</span></p>
                  <p><span className="text-gray-600">ID:</span> {receipt.customer.nationalID}</p>
                  <p className="flex items-center gap-1"><Mail className="h-3 w-3" /> {receipt.customer.email}</p>
                  <p className="flex items-center gap-1"><Phone className="h-3 w-3" /> {receipt.customer.phone}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Service Representative
                </h3>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-600">Name:</span> <span className="font-medium">{receipt.assignedStaff.name}</span></p>
                  <p><span className="text-gray-600">Role:</span> {receipt.assignedStaff.role}</p>
                  <p className="flex items-center gap-1"><Mail className="h-3 w-3" /> {receipt.assignedStaff.email}</p>
                  <p className="flex items-center gap-1"><Phone className="h-3 w-3" /> {receipt.assignedStaff.phone}</p>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Rental Details */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Bike className="h-4 w-4" />
                Rental Details
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-4">
                  {receipt.rental.bikeImage && (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-white">
                      <Image 
                        src={receipt.rental.bikeImage} 
                        alt={receipt.rental.bikeModel}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Bike Model</p>
                      <p className="font-semibold">{receipt.rental.bikeModel}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Type</p>
                      <p className="font-semibold">{receipt.rental.bikeType}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Serial Number</p>
                      <p className="font-mono text-xs">{receipt.rental.bikeSerialNumber}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Rental ID</p>
                      <p className="font-mono text-xs">#{receipt.rental.rentalID}</p>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Start Time
                    </p>
                    <p className="font-medium">{new Date(receipt.rental.rentalStart).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Duration
                    </p>
                    <p className="font-medium">{receipt.rental.duration} minutes</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Rate</p>
                    <p className="font-medium">${receipt.rental.ratePerMinute}/min</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Pickup Location
              </h3>
              <div className="text-sm bg-gray-50 rounded-lg p-4">
                <p className="font-semibold">{receipt.location.locationName}</p>
                <p className="text-gray-600">{receipt.location.address}, {receipt.location.city}</p>
                <p className="text-gray-600 flex items-center gap-1 mt-1">
                  <Phone className="h-3 w-3" />
                  {receipt.location.phone}
                </p>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Payment Breakdown - Alibaba Style */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Payment Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{receipt.payment.currency} {receipt.payment.subtotal}</span>
                </div>
                
                {receipt.payment.discount && (
                  <div className="flex justify-between text-orange-600">
                    <span className="flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      Discount ({receipt.payment.discount.code}) - {receipt.payment.discount.percent}%
                    </span>
                    <span className="font-medium">-{receipt.payment.currency} {receipt.payment.discount.amount}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax ({receipt.payment.taxRate})</span>
                  <span className="font-medium">{receipt.payment.currency} {receipt.payment.tax}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-orange-600">{receipt.payment.currency} {receipt.payment.total}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium">{receipt.payment.method}</span>
                </div>
                
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Transaction ID</span>
                  <span className="font-mono">{receipt.transactionID}</span>
                </div>
              </div>
            </div>

            {/* Loyalty Points */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="font-semibold text-gray-900">Loyalty Points Earned</p>
                    <p className="text-sm text-gray-600">Total Points: {receipt.customer.totalLoyaltyPoints}</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-orange-600">
                  +{receipt.customer.loyaltyPointsEarned}
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-900">{receipt.notes}</p>
            </div>

            {/* QR Code Section */}
            <div className="text-center py-4">
              <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-lg">
                <div className="w-32 h-32 bg-gray-100 flex items-center justify-center">
                  {/* QR Code would be generated here */}
                  <span className="text-xs text-gray-400">QR Code</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Scan to verify receipt</p>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-gray-500 mt-6">
              <p>{receipt.termsAndConditions}</p>
              <p className="mt-2">Receipt generated on {new Date(receipt.timestamp).toLocaleString()}</p>
              <p className="mt-1">Visit {receipt.company.website} for support</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
