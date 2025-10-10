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

    if (bikeId) {
      whereClause += ' AND bm.BikeID = ?';
      queryParams.push(parseInt(bikeId));
    }

    if (stationId) {
      whereClause += ' AND (bm.FromLocationID = ? OR bm.ToLocationID = ?)';
      queryParams.push(parseInt(stationId), parseInt(stationId));
    }

    // Get movement history with bike and location information
    const movementQuery = `
      SELECT 
        bm.MovementID,
        bm.BikeID,
        bm.MovementDate,
        bm.StaffID,
        bm.Notes,
        b.BikeSerialNumber,
        b.Model as BikeModel,
        b.BikeType,
        l1.LocationName as FromStation,
        l1.Address as FromLocation,
        l2.LocationName as ToStation,
        l2.Address as ToLocation,
        u.FirstName as StaffFirstName,
        u.LastName as StaffLastName
      FROM bikemovement bm
      JOIN bike b ON bm.BikeID = b.BikeID
      JOIN location l1 ON bm.FromLocationID = l1.LocationID
      JOIN location l2 ON bm.ToLocationID = l2.LocationID
      JOIN user u ON bm.StaffID = u.UserID
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
      StaffName: `${movement.StaffFirstName} ${movement.StaffLastName}`,
      Notes: movement.Notes
    }));

    // Get total count for pagination
    const countQuery = `
      SELECT COUNT(*) as total
      FROM bikemovement bm
      JOIN bike b ON bm.BikeID = b.BikeID
      JOIN location l1 ON bm.FromLocationID = l1.LocationID
      JOIN location l2 ON bm.ToLocationID = l2.LocationID
      JOIN user u ON bm.StaffID = u.UserID
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
      FROM bikemovement bm
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

    // Update movement record notes
    let updateQuery = `UPDATE bikemovement SET Notes = ?`;
    let updateParams = [CompletionNotes || 'Updated'];

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

    // Update bike location if movement is completed
    if (Status === 'Completed') {
      // Move bike to destination location and set status to Available
      const updateBikeQuery = `
        UPDATE bike 
        SET LocationID = ?, CurrentStatus = 'Available'
        WHERE BikeID = ?
      `;

      const bikeUpdateResult = await executeQuery(prisma, updateBikeQuery, [
        movementRecord.ToLocationID, 
        movementRecord.BikeID
      ]);
      
      if (!bikeUpdateResult.success) {
        console.error('Failed to update bike location:', bikeUpdateResult.error);
        return NextResponse.json(
          { success: false, message: 'Movement updated but failed to update bike location' },
          { status: 500 }
        );
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