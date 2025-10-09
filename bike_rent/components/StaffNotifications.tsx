"use client";

import React, { useState, useEffect } from 'react';
import { Bell, Clock, User, Bike, MapPin, Phone, AlertCircle, CheckCircle, X, Refresh } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface RentalNotification {
  RentalID: number;
  CustomerID: number;
  BikeID: number;
  RentalStart: string;
  ExpectedReturn: string;
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber?: string;
  NationalID: string;
  BikeSerialNumber: string;
  Model: string;
  BikeType: string;
  LocationID: number;
}

export function StaffNotifications() {
  const [notifications, setNotifications] = useState<RentalNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/direct-rental?staffMode=notifications');
      const data = await response.json();
      
      if (data.success) {
        setNotifications(data.notifications || []);
      }
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-refresh notifications every 30 seconds
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const rentalTime = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - rentalTime.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hrs ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  const markAsRead = (rentalId: number) => {
    setNotifications(prev => 
      prev.filter(notification => notification.RentalID !== rentalId)
    );
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-orange-500" />
            Rental Notifications
            {notifications.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {notifications.length}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={fetchNotifications}
            disabled={isLoading}
            className="h-8 w-8"
          >
            <Refresh className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
        <p className="text-xs text-gray-500">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </p>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <p className="text-sm text-gray-600">No new rental notifications</p>
              <p className="text-xs text-gray-500 mt-1">All caught up!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.RentalID}
                  className="p-4 border rounded-lg bg-orange-50 border-orange-200 relative"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => markAsRead(notification.RentalID)}
                    className="absolute top-2 right-2 h-6 w-6 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3 h-3" />
                  </Button>

                  <div className="pr-8">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                        <Bike className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className="bg-blue-500 text-white text-xs">
                            New Rental
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {formatTimeAgo(notification.RentalStart)}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          {notification.Model} ({notification.BikeSerialNumber})
                        </p>
                        <p className="text-xs text-gray-600">
                          {notification.BikeType} • ID: {notification.RentalID}
                        </p>
                      </div>
                    </div>

                    {/* Customer Details */}
                    <div className="bg-white rounded-md p-3 space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3 text-gray-400" />
                        <span className="font-medium">
                          {notification.FirstName} {notification.LastName}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          ID: {notification.NationalID}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-3 h-3" />
                        <span>{notification.PhoneNumber || 'No phone'}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-3 h-3" />
                        <span>
                          Started: {new Date(notification.RentalStart).toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <AlertCircle className="w-3 h-3" />
                        <span>
                          Expected return: {new Date(notification.ExpectedReturn).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        className="flex-1 text-xs h-8 bg-green-500 hover:bg-green-600"
                        onClick={() => {
                          // Handle bike preparation
                          alert(`Preparing ${notification.Model} for pickup`);
                          markAsRead(notification.RentalID);
                        }}
                      >
                        Prepare Bike
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs h-8"
                        onClick={() => {
                          // Handle customer contact
                          window.open(`tel:${notification.PhoneNumber || notification.Email}`);
                        }}
                      >
                        Contact Customer
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default StaffNotifications;