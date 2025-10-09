"use client";

import { useCallback } from 'react';
import { useNotifications } from '@/contexts/NotificationContext';

interface UseNotifyReturn {
  notify: {
    success: (title: string, message?: string, options?: NotifyOptions) => string;
    error: (title: string, message?: string, options?: NotifyOptions) => string;
    warning: (title: string, message?: string, options?: NotifyOptions) => string;
    info: (title: string, message?: string, options?: NotifyOptions) => string;
  };
  remove: (id: string) => void;
  clear: () => void;
}

interface NotifyOptions {
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const useNotify = (): UseNotifyReturn => {
  const { addNotification, removeNotification, clearAll } = useNotifications();

  const success = useCallback((title: string, message?: string, options?: NotifyOptions) => {
    return addNotification({
      type: 'success',
      title,
      message,
      duration: options?.duration,
      action: options?.action,
    });
  }, [addNotification]);

  const error = useCallback((title: string, message?: string, options?: NotifyOptions) => {
    return addNotification({
      type: 'error',
      title,
      message,
      duration: options?.duration,
      action: options?.action,
    });
  }, [addNotification]);

  const warning = useCallback((title: string, message?: string, options?: NotifyOptions) => {
    return addNotification({
      type: 'warning',
      title,
      message,
      duration: options?.duration,
      action: options?.action,
    });
  }, [addNotification]);

  const info = useCallback((title: string, message?: string, options?: NotifyOptions) => {
    return addNotification({
      type: 'info',
      title,
      message,
      duration: options?.duration,
      action: options?.action,
    });
  }, [addNotification]);

  return {
    notify: {
      success,
      error,
      warning,
      info,
    },
    remove: removeNotification,
    clear: clearAll,
  };
};

// Predefined notification templates for common scenarios
export const useAppNotifications = () => {
  const { notify } = useNotify();

  return {
    // Authentication notifications
    loginSuccess: (username: string) => 
      notify.success('Welcome back!', `Successfully logged in as ${username}`),
    
    loginError: (error?: string) => 
      notify.error('Login failed', error || 'Invalid credentials. Please try again.'),
    
    logoutSuccess: () => 
      notify.info('Logged out', 'You have been successfully logged out'),

    // CRUD operation notifications
    createSuccess: (entityType: string, entityName?: string) => 
      notify.success(
        `${entityType} created successfully`, 
        entityName ? `${entityName} has been added` : undefined
      ),
    
    updateSuccess: (entityType: string, entityName?: string) => 
      notify.success(
        `${entityType} updated successfully`, 
        entityName ? `${entityName} has been updated` : undefined
      ),
    
    deleteSuccess: (entityType: string, entityName?: string) => 
      notify.success(
        `${entityType} deleted successfully`, 
        entityName ? `${entityName} has been removed` : undefined
      ),
    
    operationError: (operation: string, error?: string) => 
      notify.error(
        `${operation} failed`, 
        error || 'An unexpected error occurred. Please try again.'
      ),

    // Bike rental notifications
    rentalStarted: (bikeId: string, stationName: string) => 
      notify.success(
        'Rental started', 
        `Bike #${bikeId} from ${stationName}`,
        { duration: 7000 }
      ),
    
    rentalEnded: (duration: string, cost: string) => 
      notify.success(
        'Rental completed', 
        `Duration: ${duration} | Cost: ${cost}`,
        { duration: 10000 }
      ),
    
    lowBattery: (bikeId: string, batteryLevel: number) => 
      notify.warning(
        'Low battery warning', 
        `Bike #${bikeId} has ${batteryLevel}% battery remaining`,
        { duration: 0 } // Persistent until dismissed
      ),
    
    maintenanceRequired: (bikeId: string, issue: string) => 
      notify.error(
        'Maintenance required', 
        `Bike #${bikeId}: ${issue}`,
        { 
          duration: 0,
          action: {
            label: 'Schedule',
            onClick: () => console.log('Schedule maintenance for bike', bikeId)
          }
        }
      ),

    // Station notifications
    stationFull: (stationName: string) => 
      notify.warning(
        'Station full', 
        `${stationName} has reached maximum capacity`
      ),
    
    stationEmpty: (stationName: string) => 
      notify.warning(
        'Station empty', 
        `No bikes available at ${stationName}`
      ),
    
    stationOffline: (stationName: string) => 
      notify.error(
        'Station offline', 
        `${stationName} is currently unavailable`,
        { 
          duration: 0,
          action: {
            label: 'Report',
            onClick: () => console.log('Report station issue', stationName)
          }
        }
      ),

    // System notifications
    dataSync: () => 
      notify.info('Data synchronized', 'All data has been updated successfully'),
    
    maintenanceMode: (duration: string) => 
      notify.warning(
        'Maintenance scheduled', 
        `System maintenance in ${duration}`,
        { duration: 0 }
      ),
    
    newUpdate: (version: string) => 
      notify.info(
        'Update available', 
        `Version ${version} is now available`,
        {
          action: {
            label: 'Update',
            onClick: () => console.log('Start update process')
          }
        }
      ),

    // User notifications
    profileUpdated: () => 
      notify.success('Profile updated', 'Your profile has been saved successfully'),
    
    passwordChanged: () => 
      notify.success('Password changed', 'Your password has been updated'),
    
    paymentSuccess: (amount: string) => 
      notify.success('Payment successful', `Charged ${amount} to your account`),
    
    paymentFailed: (reason?: string) => 
      notify.error('Payment failed', reason || 'Unable to process payment'),

    // Performance notifications
    highUsage: (percentage: number) => 
      notify.warning(
        'High system usage', 
        `Current usage at ${percentage}%`
      ),
    
    revenueTarget: (amount: string, target: string) => 
      notify.success(
        'Revenue milestone', 
        `Reached ${amount} of ${target} monthly target`
      ),
  };
};