"use client";

import React, { useState } from 'react';
import { Clock, MapPin, Star, AlertCircle, CheckCircle, User, Phone, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/contexts/NotificationContext';

interface Bike {
  BikeID: number;
  BikeSerialNumber: string;
  Model: string;
  BikeType: string;
  RentalRatePerMinute: number;
  CurrentStatus: string;
  LocationName: string;
  Address: string;
  City: string;
}

interface DirectRentalProps {
  bike: Bike;
  onRentalSuccess?: (rentalID: number) => void;
}

export function DirectRentalDialog({ bike, onRentalSuccess }: DirectRentalProps) {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  
  const [rentalHours, setRentalHours] = useState([2]); // Default 2 hours
  const [promoCode, setPromoCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('mobile-money');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rentalSuccess, setRentalSuccess] = useState(false);

  // Calculate costs
  const hourlyRate = parseFloat(bike.RentalRatePerMinute.toString()) * 60;
  const baseCost = hourlyRate * rentalHours[0];
  const serviceFee = 2.99;
  const totalCost = baseCost + serviceFee;

  const handleDirectRental = async () => {
    if (!user?.UserID) {
      addNotification({
        type: 'error',
        title: 'Authentication Required',
        message: 'Please log in to rent a bike.'
      });
      return;
    }

    if (paymentMethod === 'mobile-money' && !phoneNumber) {
      addNotification({
        type: 'warning',
        title: 'Phone Number Required',
        message: 'Please enter your phone number for mobile money payment.'
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/direct-rental', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerID: user.UserID,
          bikeID: bike.BikeID,
          expectedHours: rentalHours[0],
          promoID: null // Handle promo codes later
        }),
      });

      const data = await response.json();

      if (data.success) {
        setRentalSuccess(true);
        addNotification({
          type: 'success',
          title: 'Rental Successful!',
          message: `${bike.Model} has been rented successfully. Staff has been notified.`
        });
        
        if (onRentalSuccess) {
          onRentalSuccess(data.rentalID);
        }
      } else {
        throw new Error(data.error || 'Failed to process rental');
      }

    } catch (error) {
      console.error('Rental error:', error);
      addNotification({
        type: 'error',
        title: 'Rental Failed',
        message: error instanceof Error ? error.message : 'Unable to process rental. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (rentalSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Rental Successful!</h3>
          <p className="text-gray-600 mb-4">
            You have successfully rented <strong>{bike.Model}</strong>. 
            Our staff has been notified and the bike is ready for pickup.
          </p>
          <div className="space-y-2 text-sm text-gray-600">
            <p><strong>Duration:</strong> {rentalHours[0]} hours</p>
            <p><strong>Total Cost:</strong> ${totalCost.toFixed(2)}</p>
            <p><strong>Pickup Location:</strong> {bike.LocationName}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-orange-500" />
          Rent {bike.Model}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Bike Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Bike Type</span>
            <Badge variant="secondary">{bike.BikeType}</Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{bike.LocationName}, {bike.City}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium">Rate:</span> ${hourlyRate.toFixed(2)}/hour
          </div>
        </div>

        {/* Rental Duration */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Rental Duration: {rentalHours[0]} hours</Label>
          <Slider
            value={rentalHours}
            onValueChange={setRentalHours}
            max={24}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>1 hour</span>
            <span>24 hours</span>
          </div>
        </div>

        {/* Promo Code */}
        <div className="space-y-2">
          <Label htmlFor="promo" className="text-sm font-medium">Promo Code (Optional)</Label>
          <Input
            id="promo"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
        </div>

        {/* Payment Method */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Payment Method</Label>
          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mobile-money">Mobile Money (MTN/Airtel)</SelectItem>
              <SelectItem value="credit-card">Credit Card</SelectItem>
              <SelectItem value="cash">Pay at Pickup</SelectItem>
            </SelectContent>
          </Select>

          {paymentMethod === 'mobile-money' && (
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+256 xxx xxx xxx"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Cost Breakdown */}
        <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between text-sm">
            <span>Base Cost ({rentalHours[0]}h × ${hourlyRate.toFixed(2)})</span>
            <span>${baseCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Service Fee</span>
            <span>${serviceFee.toFixed(2)}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${totalCost.toFixed(2)}</span>
          </div>
        </div>

        {/* Customer Info Display */}
        {user && (
          <div className="p-3 bg-blue-50 rounded-lg space-y-1">
            <div className="flex items-center gap-2 text-sm font-medium text-blue-900">
              <User className="w-4 h-4" />
              Rental Details
            </div>
            <p className="text-sm text-blue-700">
              <strong>Customer:</strong> {user.FirstName} {user.LastName}
            </p>
            <p className="text-sm text-blue-700">
              <strong>Email:</strong> {user.Email}
            </p>
          </div>
        )}

        {/* Rent Button */}
        <Button
          onClick={handleDirectRental}
          disabled={isLoading || bike.CurrentStatus !== 'Available'}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3"
        >
          {isLoading ? 'Processing...' : `Rent Now - $${totalCost.toFixed(2)}`}
        </Button>

        {bike.CurrentStatus !== 'Available' && (
          <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg text-red-700">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">This bike is currently not available for rental.</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}