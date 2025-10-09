'use client';

import { useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { 
  Receipt, 
  Search, 
  Filter, 
  Download,
  Print,
  Calendar,
  User,
  Bike,
  MapPin,
  Clock,
  CreditCard,
  FileText,
  Eye,
  CheckCircle
} from "lucide-react";

interface Rental {
  RentalID: number;
  CustomerName: string;
  CustomerEmail: string;
  CustomerPhone?: string;
  BikeSerialNumber: string;
  BikeModel: string;
  StationName: string;
  RentalStart: string;
  RentalEnd?: string;
  Duration?: number;
  TotalCost: number;
  PaymentStatus: string;
  PaymentMethod?: string;
  ReceiptGenerated: boolean;
}

interface ReceiptData {
  receiptNumber: string;
  generatedDate: string;
  rental: Rental;
  companyInfo: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
}

const COMPANY_INFO = {
  name: "EcoBike Rental System",
  address: "123 Green Street, Eco City, EC 12345",
  phone: "+60 3-1234 5678",
  email: "support@ecobike.com"
};

export default function ReceiptsPage() {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [showReceiptDialog, setShowReceiptDialog] = useState(false);
  const [selectedRental, setSelectedRental] = useState<Rental | null>(null);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  // Fetch rental data
  const fetchRentals = async () => {
    try {
      setLoading(true);
      
      const params = new URLSearchParams({
        includeCompleted: 'true',
        includeCustomerInfo: 'true'
      });

      const response = await fetch(`/api/rentals/all?${params}`);
      
      if (response.ok) {
        const data = await response.json();
        setRentals(data.rentals || []);
      } else {
        toast.error('Failed to load rental data');
      }
    } catch (error) {
      console.error('Error fetching rentals:', error);
      toast.error('Failed to load rental data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRentals();
  }, []);

  // Filter rentals
  const filteredRentals = rentals.filter(rental => {
    const matchesSearch = 
      rental.CustomerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rental.CustomerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rental.BikeSerialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rental.RentalID.toString().includes(searchQuery);

    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'paid' && rental.PaymentStatus === 'Completed') ||
      (statusFilter === 'pending' && rental.PaymentStatus === 'Pending') ||
      (statusFilter === 'with_receipt' && rental.ReceiptGenerated) ||
      (statusFilter === 'without_receipt' && !rental.ReceiptGenerated);

    const matchesDate = dateFilter === 'all' || (() => {
      const rentalDate = new Date(rental.RentalStart);
      const today = new Date();
      const daysDiff = Math.floor((today.getTime() - rentalDate.getTime()) / (1000 * 60 * 60 * 24));
      
      switch (dateFilter) {
        case 'today': return daysDiff === 0;
        case 'week': return daysDiff <= 7;
        case 'month': return daysDiff <= 30;
        default: return true;
      }
    })();

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Generate receipt
  const generateReceipt = async (rental: Rental) => {
    try {
      const receiptNumber = `RCP-${rental.RentalID}-${Date.now().toString().slice(-6)}`;
      const generatedDate = new Date().toISOString();

      const newReceiptData: ReceiptData = {
        receiptNumber,
        generatedDate,
        rental,
        companyInfo: COMPANY_INFO
      };

      setReceiptData(newReceiptData);
      setSelectedRental(rental);
      setShowReceiptDialog(true);

      // Mark receipt as generated in database
      const response = await fetch('/api/receipts/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rentalId: rental.RentalID,
          receiptNumber,
          generatedDate
        }),
      });

      if (response.ok) {
        // Update local state
        setRentals(prev => prev.map(r => 
          r.RentalID === rental.RentalID 
            ? { ...r, ReceiptGenerated: true }
            : r
        ));
        toast.success('Receipt generated successfully');
      } else {
        toast.error('Failed to save receipt record');
      }
    } catch (error) {
      console.error('Error generating receipt:', error);
      toast.error('Failed to generate receipt');
    }
  };

  // Print receipt
  const handlePrint = () => {
    if (printRef.current) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Receipt - ${receiptData?.receiptNumber}</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .receipt-container { max-width: 600px; margin: 0 auto; }
                .header { text-align: center; margin-bottom: 30px; }
                .company-name { font-size: 24px; font-weight: bold; color: #1f2937; }
                .receipt-title { font-size: 18px; margin: 10px 0; }
                .section { margin: 20px 0; }
                .label { font-weight: bold; }
                .divider { border-top: 1px solid #ddd; margin: 15px 0; }
                .total { font-size: 18px; font-weight: bold; }
                .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #666; }
                table { width: 100%; border-collapse: collapse; }
                th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
              </style>
            </head>
            <body>
              ${printRef.current.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
      }
    }
  };

  // Download receipt as text/HTML
  const handleDownload = () => {
    if (!receiptData) return;

    const receiptContent = generateReceiptText(receiptData);
    const blob = new Blob([receiptContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt-${receiptData.receiptNumber}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generateReceiptText = (data: ReceiptData): string => {
    return `
<!DOCTYPE html>
<html>
<head>
    <title>Receipt - ${data.receiptNumber}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .company-name { font-size: 24px; font-weight: bold; }
        .section { margin: 20px 0; }
        .label { font-weight: bold; }
    </style>
</head>
<body>
    <div class="header">
        <div class="company-name">${data.companyInfo.name}</div>
        <div>${data.companyInfo.address}</div>
        <div>${data.companyInfo.phone} | ${data.companyInfo.email}</div>
        <h2>RENTAL RECEIPT</h2>
        <div>Receipt #: ${data.receiptNumber}</div>
        <div>Date: ${new Date(data.generatedDate).toLocaleDateString()}</div>
    </div>

    <div class="section">
        <h3>Customer Information</h3>
        <div><span class="label">Name:</span> ${data.rental.CustomerName}</div>
        <div><span class="label">Email:</span> ${data.rental.CustomerEmail}</div>
        ${data.rental.CustomerPhone ? `<div><span class="label">Phone:</span> ${data.rental.CustomerPhone}</div>` : ''}
    </div>

    <div class="section">
        <h3>Rental Details</h3>
        <div><span class="label">Rental ID:</span> #${data.rental.RentalID}</div>
        <div><span class="label">Bike:</span> ${data.rental.BikeSerialNumber} (${data.rental.BikeModel})</div>
        <div><span class="label">Station:</span> ${data.rental.StationName}</div>
        <div><span class="label">Start Time:</span> ${new Date(data.rental.RentalStart).toLocaleString()}</div>
        ${data.rental.RentalEnd ? `<div><span class="label">End Time:</span> ${new Date(data.rental.RentalEnd).toLocaleString()}</div>` : ''}
        ${data.rental.Duration ? `<div><span class="label">Duration:</span> ${Math.floor(data.rental.Duration / 60)}h ${data.rental.Duration % 60}m</div>` : ''}
    </div>

    <div class="section">
        <h3>Payment Information</h3>
        <div><span class="label">Total Cost:</span> RM ${data.rental.TotalCost.toFixed(2)}</div>
        <div><span class="label">Payment Status:</span> ${data.rental.PaymentStatus}</div>
        ${data.rental.PaymentMethod ? `<div><span class="label">Payment Method:</span> ${data.rental.PaymentMethod}</div>` : ''}
    </div>

    <div class="section">
        <p><strong>Thank you for choosing ${data.companyInfo.name}!</strong></p>
        <p>For support, contact us at ${data.companyInfo.email}</p>
    </div>
</body>
</html>`;
  };

  const formatDuration = (minutes?: number): string => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading receipt data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Receipt Management</h1>
          <p className="text-gray-600">Generate and manage rental receipts</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rentals</CardTitle>
            <Receipt className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{rentals.length}</div>
            <p className="text-xs text-gray-600">All rentals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receipts Generated</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {rentals.filter(r => r.ReceiptGenerated).length}
            </div>
            <p className="text-xs text-gray-600">Have receipts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Rentals</CardTitle>
            <CreditCard className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {rentals.filter(r => r.PaymentStatus === 'Completed').length}
            </div>
            <p className="text-xs text-gray-600">Payment completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <FileText className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              RM {rentals.reduce((sum, r) => sum + r.TotalCost, 0).toFixed(2)}
            </div>
            <p className="text-xs text-gray-600">From all rentals</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by customer, email, bike, or rental ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending Payment</SelectItem>
            <SelectItem value="with_receipt">With Receipt</SelectItem>
            <SelectItem value="without_receipt">Without Receipt</SelectItem>
          </SelectContent>
        </Select>
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <Calendar className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Date filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Dates</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Rentals List */}
      <Card>
        <CardHeader>
          <CardTitle>Rental Records</CardTitle>
          <CardDescription>
            {filteredRentals.length} of {rentals.length} rentals
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredRentals.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              No rentals found matching your criteria
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRentals.map((rental) => (
                <Card key={rental.RentalID} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">#{rental.RentalID}</span>
                          <Badge className={
                            rental.PaymentStatus === 'Completed' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }>
                            {rental.PaymentStatus}
                          </Badge>
                          {rental.ReceiptGenerated && (
                            <Badge className="bg-blue-100 text-blue-800">
                              Receipt Generated
                            </Badge>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{rental.CustomerName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Bike className="w-4 h-4" />
                            <span>{rental.BikeSerialNumber}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{rental.StationName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{formatDuration(rental.Duration)}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div>
                            <span className="text-gray-600">Started: </span>
                            <span>{new Date(rental.RentalStart).toLocaleString()}</span>
                          </div>
                          <div className="font-medium text-lg">
                            RM {rental.TotalCost.toFixed(2)}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 ml-4">
                        <Button
                          size="sm"
                          onClick={() => generateReceipt(rental)}
                          disabled={rental.PaymentStatus !== 'Completed'}
                        >
                          <Receipt className="w-4 h-4 mr-2" />
                          {rental.ReceiptGenerated ? 'Regenerate' : 'Generate'} Receipt
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Receipt Preview Dialog */}
      <Dialog open={showReceiptDialog} onOpenChange={setShowReceiptDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Receipt Preview</DialogTitle>
            <DialogDescription>
              Receipt for Rental #{selectedRental?.RentalID}
            </DialogDescription>
          </DialogHeader>

          {receiptData && (
            <div>
              {/* Receipt Content */}
              <div ref={printRef} className="p-6 bg-white">
                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-gray-900">{receiptData.companyInfo.name}</h1>
                  <p className="text-gray-600">{receiptData.companyInfo.address}</p>
                  <p className="text-gray-600">{receiptData.companyInfo.phone} | {receiptData.companyInfo.email}</p>
                  <h2 className="text-xl font-semibold mt-4 mb-2">RENTAL RECEIPT</h2>
                  <div className="text-sm text-gray-600">
                    <p>Receipt #: {receiptData.receiptNumber}</p>
                    <p>Generated: {new Date(receiptData.generatedDate).toLocaleString()}</p>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Customer Information */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Customer Information</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Name:</span> {receiptData.rental.CustomerName}</div>
                    <div><span className="font-medium">Email:</span> {receiptData.rental.CustomerEmail}</div>
                    {receiptData.rental.CustomerPhone && (
                      <div><span className="font-medium">Phone:</span> {receiptData.rental.CustomerPhone}</div>
                    )}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Rental Details */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Rental Details</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Rental ID:</span> #{receiptData.rental.RentalID}</div>
                    <div><span className="font-medium">Bike:</span> {receiptData.rental.BikeSerialNumber} ({receiptData.rental.BikeModel})</div>
                    <div><span className="font-medium">Station:</span> {receiptData.rental.StationName}</div>
                    <div><span className="font-medium">Start Time:</span> {new Date(receiptData.rental.RentalStart).toLocaleString()}</div>
                    {receiptData.rental.RentalEnd && (
                      <div><span className="font-medium">End Time:</span> {new Date(receiptData.rental.RentalEnd).toLocaleString()}</div>
                    )}
                    {receiptData.rental.Duration && (
                      <div><span className="font-medium">Duration:</span> {formatDuration(receiptData.rental.Duration)}</div>
                    )}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Payment Information */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Payment Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total Amount:</span>
                      <span className="text-lg font-bold">RM {receiptData.rental.TotalCost.toFixed(2)}</span>
                    </div>
                    <div><span className="font-medium">Payment Status:</span> {receiptData.rental.PaymentStatus}</div>
                    {receiptData.rental.PaymentMethod && (
                      <div><span className="font-medium">Payment Method:</span> {receiptData.rental.PaymentMethod}</div>
                    )}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Footer */}
                <div className="text-center text-sm text-gray-600">
                  <p className="font-medium">Thank you for choosing {receiptData.companyInfo.name}!</p>
                  <p>For support, contact us at {receiptData.companyInfo.email}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
                <Button variant="outline" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button onClick={handlePrint}>
                  <Print className="w-4 h-4 mr-2" />
                  Print
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}