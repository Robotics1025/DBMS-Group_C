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

    // Check if bike exists and is at the source station
    const bikeCheckQuery = `
      SELECT 
        b.BikeID, 
        b.BikeSerialNumber, 
        b.Model,
        b.CurrentStatus,
        b.LocationID,
        s1.StationName as CurrentStationName,
        s2.StationName as DestinationStationName
      FROM bike b
      LEFT JOIN station s1 ON b.LocationID = s1.StationID
      LEFT JOIN station s2 ON s2.StationID = ?
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

    // Check destination station capacity
    const capacityCheckQuery = `
      SELECT 
        s.StationName,
        s.Capacity,
        COUNT(b.BikeID) as CurrentCount
      FROM station s
      LEFT JOIN bike b ON s.StationID = b.LocationID AND b.CurrentStatus IN ('Available', 'Rented')
      WHERE s.StationID = ?
      GROUP BY s.StationID, s.StationName, s.Capacity
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
      INSERT INTO bike_movement (
        BikeID,
        FromStationID,
        ToStationID,
        MovementDate,
        StaffName,
        Status,
        Reason,
        Notes
      ) VALUES (?, ?, ?, NOW(), 'Staff Request', 'Scheduled', ?, ?)
    `;

    const movementValues = [
      BikeID,
      FromStationID,
      ToStationID,
      Reason,
      Notes || null
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