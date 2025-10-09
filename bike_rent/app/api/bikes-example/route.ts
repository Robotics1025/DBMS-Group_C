// Example API route using the centralized queries
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/app/generated/prisma';
import { bikeQueries, executeQuery } from '@/lib/queries';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bikeType = searchParams.get('type');
    const locationId = searchParams.get('location');

    let result;

    if (bikeType || locationId) {
      // Use search query with filters
      result = await executeQuery(
        prisma, 
        bikeQueries.searchBikes, 
        [bikeType, bikeType, locationId, locationId]
      );
    } else {
      // Get all available bikes
      result = await executeQuery(prisma, bikeQueries.getAvailableBikes);
    }

    if (!result.success) {
      return NextResponse.json(
        { error: result.error }, 
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      bikes: result.data,
      count: result.rowCount
    });

  } catch (error) {
    console.error('Error fetching bikes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bikes' }, 
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bikeSerialNumber, model, bikeType, rentalRatePerMinute, locationId } = body;

    // Validate required fields
    if (!bikeSerialNumber || !bikeType || !rentalRatePerMinute || !locationId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Add new bike using centralized query
    const result = await executeQuery(
      prisma,
      bikeQueries.addBike,
      [bikeSerialNumber, model, bikeType, rentalRatePerMinute, locationId]
    );

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Bike added successfully',
      bikeId: result.insertId
    });

  } catch (error) {
    console.error('Error adding bike:', error);
    return NextResponse.json(
      { error: 'Failed to add bike' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}