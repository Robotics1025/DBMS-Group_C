import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/queries';
import { PrismaClient } from '@/app/generated/prisma';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const status = searchParams.get('status') || '';
    const bikeId = searchParams.get('bikeId') || '';
    const stationId = searchParams.get('stationId') || '';

    // Build query with filters
    let whereClause = 'WHERE 1=1';
    const queryParams: any[] = [];

    if (status) {
      whereClause += ' AND bm.Status = ?';
      queryParams.push(status);
    }

    if (bikeId) {
      whereClause += ' AND bm.BikeID = ?';
      queryParams.push(parseInt(bikeId));
    }

    if (stationId) {
      whereClause += ' AND (bm.FromStationID = ? OR bm.ToStationID = ?)';
      queryParams.push(parseInt(stationId), parseInt(stationId));
    }

    // Get movement history with bike and station information
    const movementQuery = `
      SELECT 
        bm.MovementID,
        bm.BikeID,
        bm.MovementDate,
        bm.StaffName,
        bm.Status,
        bm.Reason,
        bm.Notes,
        bm.CompletionDate,
        b.BikeSerialNumber,
        b.Model as BikeModel,
        b.BikeType,
        s1.StationName as FromStation,
        s1.Location as FromLocation,
        s2.StationName as ToStation,
        s2.Location as ToLocation
      FROM bike_movement bm
      JOIN bike b ON bm.BikeID = b.BikeID
      JOIN station s1 ON bm.FromStationID = s1.StationID
      JOIN station s2 ON bm.ToStationID = s2.StationID
      ${whereClause}
      ORDER BY bm.MovementDate DESC
      LIMIT ? OFFSET ?
    `;

    queryParams.push(limit, offset);

    const result = await executeQuery(prisma, movementQuery, queryParams);

    if (!result.success) {
      console.error('Database query failed:', result.error);
      return NextResponse.json(
        { 
          success: false, 
          message: result.error || 'Database query failed'
        },
        { status: 500 }
      );
    }

    const movements = result.data || [];

    // Serialize the movement records
    const serializedMovements = movements.map((movement: any) => ({
      MovementID: Number(movement.MovementID),
      BikeID: Number(movement.BikeID),
      BikeSerialNumber: movement.BikeSerialNumber,
      BikeModel: movement.BikeModel,
      BikeType: movement.BikeType,
      FromStation: movement.FromStation,
      FromLocation: movement.FromLocation,
      ToStation: movement.ToStation,
      ToLocation: movement.ToLocation,
      MovementDate: movement.MovementDate,
      StaffName: movement.StaffName,
      Status: movement.Status,
      Reason: movement.Reason,
      Notes: movement.Notes,
      CompletionDate: movement.CompletionDate
    }));

    // Get total count for pagination
    const countQuery = `
      SELECT COUNT(*) as total
      FROM bike_movement bm
      JOIN bike b ON bm.BikeID = b.BikeID
      JOIN station s1 ON bm.FromStationID = s1.StationID
      JOIN station s2 ON bm.ToStationID = s2.StationID
      ${whereClause.replace('LIMIT ? OFFSET ?', '')}
    `;

    const countResult = await executeQuery(prisma, countQuery, queryParams.slice(0, -2));
    const totalRecords = countResult.success && countResult.data && countResult.data.length > 0
      ? Number(countResult.data[0].total)
      : 0;

    return NextResponse.json({
      success: true,
      movements: serializedMovements,
      pagination: {
        total: totalRecords,
        limit,
        offset,
        hasMore: offset + movements.length < totalRecords
      }
    });

  } catch (error) {
    console.error('Error fetching movement history:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        error: 'Failed to fetch movement history'
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

export async function PUT(request: NextRequest) {
  try {
    const { MovementID, Status, CompletionNotes } = await request.json();

    // Validate required fields
    if (!MovementID || !Status) {
      return NextResponse.json(
        { success: false, message: 'MovementID and Status are required' },
        { status: 400 }
      );
    }

    // Validate Status
    const validStatuses = ['Scheduled', 'In Transit', 'Completed', 'Cancelled'];
    if (!validStatuses.includes(Status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status' },
        { status: 400 }
      );
    }

    // Check if movement record exists
    const checkQuery = `
      SELECT bm.*, b.BikeID, b.CurrentStatus
      FROM bike_movement bm
      JOIN bike b ON bm.BikeID = b.BikeID
      WHERE bm.MovementID = ?
    `;

    const checkResult = await executeQuery(prisma, checkQuery, [MovementID]);
    
    if (!checkResult.success || !checkResult.data || checkResult.data.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Movement record not found' },
        { status: 404 }
      );
    }

    const movementRecord = checkResult.data[0];

    // Update movement record
    let updateQuery = `UPDATE bike_movement SET Status = ?`;
    let updateParams = [Status];

    if (Status === 'Completed') {
      updateQuery += `, CompletionDate = NOW()`;
      if (CompletionNotes) {
        updateQuery += `, Notes = CONCAT(COALESCE(Notes, ''), '\n\nCompletion: ', ?)`;
        updateParams.push(CompletionNotes);
      }
    }

    updateQuery += ` WHERE MovementID = ?`;
    updateParams.push(MovementID);

    const updateResult = await executeQuery(prisma, updateQuery, updateParams);

    if (!updateResult.success) {
      console.error('Failed to update movement record:', updateResult.error);
      return NextResponse.json(
        { success: false, message: 'Failed to update movement record' },
        { status: 500 }
      );
    }

    // Update bike status and location based on movement status
    if (Status === 'Completed') {
      // Move bike to destination station and set status to Available
      const updateBikeQuery = `
        UPDATE bike 
        SET LocationID = ?, CurrentStatus = 'Available'
        WHERE BikeID = ?
      `;

      const bikeUpdateResult = await executeQuery(prisma, updateBikeQuery, [
        movementRecord.ToStationID, 
        movementRecord.BikeID
      ]);
      
      if (!bikeUpdateResult.success) {
        console.error('Failed to update bike location:', bikeUpdateResult.error);
        return NextResponse.json(
          { success: false, message: 'Movement updated but failed to update bike location' },
          { status: 500 }
        );
      }
    } else if (Status === 'Cancelled') {
      // Reset bike status to Available at original location
      const updateBikeQuery = `
        UPDATE bike 
        SET CurrentStatus = 'Available'
        WHERE BikeID = ?
      `;

      const bikeUpdateResult = await executeQuery(prisma, updateBikeQuery, [movementRecord.BikeID]);
      
      if (!bikeUpdateResult.success) {
        console.warn('Failed to reset bike status after cancellation:', bikeUpdateResult.error);
        // Continue even if bike status update fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Movement record updated successfully',
      status: Status,
      movementId: Number(MovementID)
    });

  } catch (error) {
    console.error('Error updating movement record:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        error: 'Failed to update movement record'
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