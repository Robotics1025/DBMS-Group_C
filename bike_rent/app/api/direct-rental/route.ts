/**
 * Direct Rental API Route - No Cart System
 * Processes immediate bike rental and creates staff notifications
 */

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/app/generated/prisma';
import { rentalQueries, bikeQueries, notificationQueries, executeInsertQuery, executeQuery } from '@/lib/queries';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerID, bikeID, expectedHours, promoID } = body;

    // Validation
    if (!customerID || !bikeID || !expectedHours) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: customerID, bikeID, expectedHours'
      }, { status: 400 });
    }

    // Check if bike is available
    const bikeResult = await executeQuery(prisma, bikeQueries.getBikeById, [bikeID]);
    
    if (!bikeResult.success || !bikeResult.data || bikeResult.data.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Bike not found'
      }, { status: 404 });
    }

    const bike = bikeResult.data[0];
    
    if (bike.CurrentStatus !== 'Available') {
      return NextResponse.json({
        success: false,
        error: 'Bike is not available for rental'
      }, { status: 400 });
    }

    // Calculate expected return time and cost
    const now = new Date();
    const expectedReturn = new Date(now.getTime() + (expectedHours * 60 * 60 * 1000));
    const totalCost = (parseFloat(bike.RentalRatePerMinute) * expectedHours * 60).toFixed(2);

    // Start transaction
    const rentalResult = await executeInsertQuery(prisma, rentalQueries.createRental, [
      customerID,
      bikeID,
      expectedReturn.toISOString().slice(0, 19).replace('T', ' '),
      totalCost,
      promoID || null
    ]);

    if (!rentalResult.success) {
      return NextResponse.json({
        success: false,
        error: 'Failed to create rental'
      }, { status: 500 });
    }

    // Update bike status to 'Rented'
    const updateResult = await executeQuery(prisma, bikeQueries.updateBikeStatus, ['Rented', bikeID]);
    
    if (!updateResult.success) {
      return NextResponse.json({
        success: false,
        error: 'Failed to update bike status'
      }, { status: 500 });
    }

    // Get rental details for response
    const rentalDetails = await executeQuery(prisma, rentalQueries.getRentalById, [rentalResult.insertId]);

    return NextResponse.json({
      success: true,
      rental: rentalDetails.data?.[0],
      message: 'Rental created successfully. Staff has been notified.',
      rentalID: rentalResult.insertId
    });

  } catch (error) {
    console.error('Direct rental error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

// Get recent rental notifications for staff
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const staffMode = searchParams.get('staffMode');

    if (staffMode === 'notifications') {
      const notificationsResult = await executeQuery(prisma, notificationQueries.getRecentRentalNotifications, []);
      
      return NextResponse.json({
        success: true,
        notifications: notificationsResult.data || []
      });
    }

    // Default: Get all recent rentals
    const recentRentals = await executeQuery(prisma, rentalQueries.getRecentRentals, []);
    
    return NextResponse.json({
      success: true,
      rentals: recentRentals.data || []
    });

  } catch (error) {
    console.error('Get rentals error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}