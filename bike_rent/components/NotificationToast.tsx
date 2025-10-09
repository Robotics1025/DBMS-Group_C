"use client";

import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNotifications, Notification } from '@/contexts/NotificationContext';

interface NotificationToastProps {
  notification: Notification;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ notification }) => {
  const { removeNotification, markAsRead } = useNotifications();
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const getNotificationIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const getNotificationColors = () => {
    switch (notification.type) {
      case 'success':
        return 'border-green-200 bg-green-50 text-green-800';
      case 'error':
        return 'border-red-200 bg-red-50 text-red-800';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 text-yellow-800';
      case 'info':
        return 'border-blue-200 bg-blue-50 text-blue-800';
      default:
        return 'border-gray-200 bg-gray-50 text-gray-800';
    }
  };

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      removeNotification(notification.id);
    }, 300);
  };

  const handleClick = () => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  useEffect(() => {
    // Mark as read when viewed
    if (!notification.read) {
      const timer = setTimeout(() => {
        markAsRead(notification.id);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [notification.read, notification.id, markAsRead]);

  if (!isVisible) return null;

  return (
    <Card 
      className={`
        ${getNotificationColors()} 
        ${isExiting ? 'animate-slide-out-right' : 'animate-slide-in-right'}
        max-w-md w-full pointer-events-auto flex shadow-lg border-l-4 cursor-pointer
        transition-all duration-300 hover:shadow-xl
      `}
      onClick={handleClick}
    >
      <div className="flex-1 flex p-4">
        <div className="flex-shrink-0">
          {getNotificationIcon()}
        </div>
        <div className="ml-3 flex-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-semibold">
                {notification.title}
              </p>
              {notification.message && (
                <p className="mt-1 text-sm opacity-90">
                  {notification.message}
                </p>
              )}
              <div className="flex items-center mt-2 text-xs opacity-70">
                <Clock className="h-3 w-3 mr-1" />
                {notification.timestamp.toLocaleTimeString()}
              </div>
            </div>
            <div className="flex-shrink-0 flex">
              {notification.action && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs mr-2 h-6 px-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    notification.action!.onClick();
                  }}
                >
                  {notification.action.label}
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm" 
                className="h-6 w-6 p-0 opacity-70 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export const NotificationContainer: React.FC = () => {
  const { notifications } = useNotifications();
  
  // Only show the first 5 notifications as toasts
  const visibleNotifications = notifications.slice(0, 5);

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col space-y-2 pointer-events-none">
      {visibleNotifications.map((notification) => (
        <NotificationToast key={notification.id} notification={notification} />
      ))}
    </div>
  );
};