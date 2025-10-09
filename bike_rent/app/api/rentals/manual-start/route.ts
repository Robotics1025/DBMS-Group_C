import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeInsertQuery } from '@/lib/queries';
import { PrismaClient } from '@/app/generated/prisma';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerId, bikeId, expectedDuration, staffId, paymentMethod } = body;

    // Validate required fields
    if (!customerId || !bikeId || !expectedDuration || !staffId) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Missing required fields: customerId, bikeId, expectedDuration, staffId' 
        },
        { status: 400 }
      );
    }

    // Check if bike is available
    const bikeCheckQuery = `
      SELECT BikeID, CurrentStatus, RentalRatePerMinute
      FROM bike 
      WHERE BikeID = ? AND CurrentStatus = 'Available'
    `;

    const bikeResult = await executeQuery(prisma, bikeCheckQuery, [bikeId]);

    if (!bikeResult.success || !bikeResult.data || bikeResult.data.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Bike is not available for rental' 
        },
        { status: 400 }
      );
    }

    const bike = bikeResult.data[0];
    const rentalRatePerMinute = Number(bike.RentalRatePerMinute);
    const estimatedCost = rentalRatePerMinute * expectedDuration;

    // Calculate expected return time
    const now = new Date();
    const expectedReturn = new Date(now.getTime() + (expectedDuration * 60 * 1000));

    // Start rental transaction
    const insertRentalQuery = `
      INSERT INTO rental (
        CustomerID,
        BikeID,
        RentalStart,
        ExpectedReturn,
        TotalCost,
        PaymentStatus,
        PaymentMethod
      ) VALUES (?, ?, NOW(), ?, ?, 'Pending', ?)
    `;

    const rentalResult = await executeInsertQuery(prisma, insertRentalQuery, [
      customerId,
      bikeId,
      expectedReturn.toISOString().slice(0, 19).replace('T', ' '),
      estimatedCost,
      paymentMethod || 'Cash'
    ]);

    if (!rentalResult.success) {
      throw new Error('Failed to create rental record');
    }

    // Update bike status to Rented
    const updateBikeQuery = `
      UPDATE bike 
      SET CurrentStatus = 'Rented' 
      WHERE BikeID = ?
    `;

    const updateResult = await executeQuery(prisma, updateBikeQuery, [bikeId]);

    if (!updateResult.success) {
      throw new Error('Failed to update bike status');
    }

    // Log the rental activity (optional, for staff tracking)
    const activityLogQuery = `
      INSERT INTO bikemovement (
        BikeID,
        FromLocationID,
        ToLocationID,
        StaffID,
        Notes,
        MovementDate
      ) SELECT 
        ?,
        LocationID,
        LocationID,
        ?,
        ?,
        NOW()
      FROM bike WHERE BikeID = ?
    `;

    await executeInsertQuery(prisma, activityLogQuery, [
      bikeId,
      staffId,
      `Manual rental started - Customer ID: ${customerId}, Duration: ${expectedDuration} minutes`,
      bikeId
    ]);

    return NextResponse.json({
      success: true,
      message: 'Rental started successfully',
      rentalId: Number(rentalResult.insertId),
      estimatedCost: estimatedCost,
      expectedReturn: expectedReturn.toISOString()
    });

  } catch (error) {
    console.error('Error starting manual rental:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        error: 'Failed to start rental'
      },
      { status: 500 }
    );
  } finally {
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      console.error('Error disconnecting Prisma:', disconnectError);
    }
  }
}