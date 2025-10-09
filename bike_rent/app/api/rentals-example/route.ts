// Rental Management API
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/app/generated/prisma';
import { 
  rentalQueries, 
  bikeQueries, 
  paymentQueries,
  userQueries,
  executeQuery, 
  executeInsertQuery 
} from '@/lib/queries';

const prisma = new PrismaClient();

// Create new rental
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerId, bikeId, rentalDurationHours, promoId } = body;

    // Validate required fields
    if (!customerId || !bikeId || !rentalDurationHours) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check bike availability
    const bikeResult = await executeQuery(
      prisma,
      bikeQueries.getBikeById,
      [bikeId]
    );

    if (!bikeResult.success || !bikeResult.data || bikeResult.data.length === 0) {
      return NextResponse.json(
        { error: 'Bike not found' },
        { status: 404 }
      );
    }

    const bike = bikeResult.data[0];
    
    if (bike.CurrentStatus !== 'Available') {
      return NextResponse.json(
        { error: 'Bike is not available for rental' },
        { status: 400 }
      );
    }

    // Calculate rental times
    const rentalStart = new Date();
    const expectedReturn = new Date();
    expectedReturn.setHours(expectedReturn.getHours() + rentalDurationHours);

    // Create rental record
    const rentalResult = await executeInsertQuery(
      prisma,
      rentalQueries.createRental,
      [customerId, bikeId, rentalStart, expectedReturn, promoId]
    );

    if (!rentalResult.success) {
      return NextResponse.json(
        { error: rentalResult.error },
        { status: 500 }
      );
    }

    // Update bike status to 'Rented'
    await executeQuery(
      prisma,
      bikeQueries.updateBikeStatus,
      ['Rented', bikeId]
    );

    // Calculate cost manually since we don't have a dedicated query
    // Get bike info first to get rental rate (reuse previous bikeResult)
    let totalCost = 0;
    if (bikeResult.success && bikeResult.data && bikeResult.data.length > 0) {
      const bike = bikeResult.data[0];
      const rentalHours = Math.ceil((expectedReturn.getTime() - rentalStart.getTime()) / (1000 * 60 * 60));
      totalCost = parseFloat(bike.RentalRatePerMinute) * rentalHours * 60; // Convert to hours
    }

    return NextResponse.json({
      success: true,
      rental: {
        rentalId: rentalResult.insertId,
        bikeId,
        rentalStart,
        expectedReturn,
        totalCost
      }
    });

  } catch (error) {
    console.error('Rental creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create rental' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Get customer rental history
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customerId');
    const active = searchParams.get('active') === 'true';

    if (!customerId) {
      return NextResponse.json(
        { error: 'Customer ID is required' },
        { status: 400 }
      );
    }

    let result;
    
    if (active) {
      // Get active rentals only
      result = await executeQuery(
        prisma,
        rentalQueries.getActiveRentals,
        [customerId]
      );
    } else {
      // Get full rental history
      result = await executeQuery(
        prisma,
        rentalQueries.getRentalHistory,
        [customerId]
      );
    }

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      rentals: result.data,
      count: result.rowCount
    });

  } catch (error) {
    console.error('Error fetching rental history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rental history' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Complete rental (return bike)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { rentalId, customerId, paymentMethod, transactionId } = body;

    if (!rentalId || !customerId) {
      return NextResponse.json(
        { error: 'Rental ID and Customer ID are required' },
        { status: 400 }
      );
    }

    // Get rental details
    const rentalResult = await executeQuery(
      prisma,
      rentalQueries.getRentalById,
      [rentalId]
    );

    if (!rentalResult.success || !rentalResult.data || rentalResult.data.length === 0) {
      return NextResponse.json(
        { error: 'Rental not found' },
        { status: 404 }
      );
    }

    const rental = rentalResult.data[0];

    // Calculate final cost based on actual return time
    const now = new Date();
    const actualMinutes = Math.ceil((now.getTime() - new Date(rental.RentalStart).getTime()) / (1000 * 60));
    const finalCost = actualMinutes * parseFloat(rental.RentalRatePerMinute);

    // Complete rental
    const updateResult = await executeQuery(
      prisma,
      rentalQueries.completeRental,
      [finalCost, rentalId, customerId]
    );

    if (!updateResult.success) {
      return NextResponse.json(
        { error: updateResult.error },
        { status: 500 }
      );
    }

    // Update bike status back to 'Available'
    await executeQuery(
      prisma,
      bikeQueries.updateBikeStatus,
      ['Available', rental.BikeID]
    );

    // Create payment record
    if (paymentMethod && transactionId) {
      await executeQuery(
        prisma,
        paymentQueries.createPayment,
        [rentalId, finalCost, paymentMethod, transactionId]
      );
    }

    // Update loyalty points (1 point per dollar spent)
    const pointsToAdd = Math.floor(finalCost);
    if (pointsToAdd > 0) {
      await executeQuery(
        prisma,
        userQueries.updateLoyaltyPoints,
        [pointsToAdd, customerId]
      );
    }

    return NextResponse.json({
      success: true,
      rental: {
        rentalId,
        finalCost,
        durationMinutes: actualMinutes,
        pointsEarned: pointsToAdd
      }
    });

  } catch (error) {
    console.error('Error completing rental:', error);
    return NextResponse.json(
      { error: 'Failed to complete rental' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}