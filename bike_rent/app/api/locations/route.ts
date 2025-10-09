import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/queries';
import { PrismaClient } from '@/app/generated/prisma';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Query to get all locations
    const locationsQuery = `
      SELECT 
        LocationID,
        LocationName,
        Address,
        City,
        PhoneNumber,
        Capacity
      FROM location
      ORDER BY LocationName
    `;

    const locationsResult = await executeQuery(prisma, locationsQuery);

    if (!locationsResult.success) {
      console.error('Database query failed:', locationsResult.error);
      return NextResponse.json(
        { 
          success: false, 
          message: locationsResult.error || 'Database query failed'
        },
        { status: 500 }
      );
    }

    const locations = locationsResult.data || [];

    // Ensure all location data is properly formatted
    const serializedLocations = locations.map((location: any) => ({
      LocationID: Number(location.LocationID),
      LocationName: location.LocationName || '',
      Address: location.Address || '',
      City: location.City || '',
      PhoneNumber: location.PhoneNumber || '',
      Capacity: location.Capacity ? Number(location.Capacity) : null
    }));

    return NextResponse.json({
      success: true,
      locations: serializedLocations,
      count: serializedLocations.length
    });

  } catch (error) {
    console.error('Error fetching locations:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        error: 'Failed to fetch locations'
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