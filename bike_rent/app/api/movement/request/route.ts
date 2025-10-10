import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/queries';
import { PrismaClient } from '@/app/generated/prisma';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { BikeID, FromStationID, ToStationID, Reason, Notes } = await request.json();

    // Validate required fields
    if (!BikeID || !FromStationID || !ToStationID || !Reason) {
      return NextResponse.json(
        { success: false, message: 'BikeID, FromStationID, ToStationID, and Reason are required' },
        { status: 400 }
      );
    }

    if (FromStationID === ToStationID) {
      return NextResponse.json(
        { success: false, message: 'Source and destination stations must be different' },
        { status: 400 }
      );
    }

    // Check if bike exists and is at the source location
    const bikeCheckQuery = `
      SELECT 
        b.BikeID, 
        b.BikeSerialNumber, 
        b.Model,
        b.CurrentStatus,
        b.LocationID,
        l1.LocationName as CurrentStationName,
        l2.LocationName as DestinationStationName
      FROM bike b
      LEFT JOIN location l1 ON b.LocationID = l1.LocationID
      LEFT JOIN location l2 ON l2.LocationID = ?
      WHERE b.BikeID = ?
    `;

    const bikeResult = await executeQuery(prisma, bikeCheckQuery, [ToStationID, BikeID]);
    
    if (!bikeResult.success || !bikeResult.data || bikeResult.data.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Bike not found' },
        { status: 404 }
      );
    }

    const bike = bikeResult.data[0];

    // Validate bike status and location
    if (bike.CurrentStatus !== 'Available') {
      return NextResponse.json(
        { success: false, message: 'Bike is not available for movement' },
        { status: 400 }
      );
    }

    if (bike.LocationID !== FromStationID) {
      return NextResponse.json(
        { success: false, message: 'Bike is not at the specified source station' },
        { status: 400 }
      );
    }

    if (!bike.DestinationStationName) {
      return NextResponse.json(
        { success: false, message: 'Destination station not found' },
        { status: 404 }
      );
    }

    // Check destination location capacity
    const capacityCheckQuery = `
      SELECT 
        l.LocationName as StationName,
        l.Capacity,
        COUNT(b.BikeID) as CurrentCount
      FROM location l
      LEFT JOIN bike b ON l.LocationID = b.LocationID AND b.CurrentStatus IN ('Available', 'Rented')
      WHERE l.LocationID = ?
      GROUP BY l.LocationID, l.LocationName, l.Capacity
    `;

    const capacityResult = await executeQuery(prisma, capacityCheckQuery, [ToStationID]);
    
    if (capacityResult.success && capacityResult.data && capacityResult.data.length > 0) {
      const stationInfo = capacityResult.data[0];
      if (stationInfo.CurrentCount >= stationInfo.Capacity) {
        return NextResponse.json(
          { success: false, message: `Destination station ${stationInfo.StationName} is at full capacity` },
          { status: 400 }
        );
      }
    }

    // Create movement record
    const insertMovementQuery = `
      INSERT INTO bikemovement (
        BikeID,
        FromLocationID,
        ToLocationID,
        MovementDate,
        StaffID,
        Notes
      ) VALUES (?, ?, ?, NOW(), 1, ?)
    `;

    const movementValues = [
      BikeID,
      FromStationID, // This will be treated as FromLocationID
      ToStationID,   // This will be treated as ToLocationID
      `${Reason}${Notes ? ': ' + Notes : ''}`
    ];

    const insertResult = await executeQuery(prisma, insertMovementQuery, movementValues);

    if (!insertResult.success) {
      console.error('Failed to create movement record:', insertResult.error);
      return NextResponse.json(
        { success: false, message: 'Failed to create movement request' },
        { status: 500 }
      );
    }

    // Update bike status to indicate it's being moved
    const updateBikeQuery = `
      UPDATE bike 
      SET CurrentStatus = 'In Transit'
      WHERE BikeID = ?
    `;

    const updateResult = await executeQuery(prisma, updateBikeQuery, [BikeID]);
    
    if (!updateResult.success) {
      console.warn('Failed to update bike status:', updateResult.error);
      // Continue even if bike status update fails
    }

    return NextResponse.json({
      success: true,
      message: 'Movement request created successfully',
      bikeSerialNumber: bike.BikeSerialNumber,
      fromStation: bike.CurrentStationName,
      toStation: bike.DestinationStationName,
      reason: Reason
    });

  } catch (error) {
    console.error('Error creating movement request:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        error: 'Failed to create movement request'
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