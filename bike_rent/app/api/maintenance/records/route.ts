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

    // Build query with filters
    let whereClause = 'WHERE 1=1';
    const queryParams: any[] = [];

    if (status) {
      whereClause += ' AND m.Status = ?';
      queryParams.push(status);
    }

    if (bikeId) {
      whereClause += ' AND m.BikeID = ?';
      queryParams.push(parseInt(bikeId));
    }

    // Get maintenance records with bike information
    const maintenanceQuery = `
      SELECT 
        m.MaintenanceID,
        m.BikeID,
        m.MaintenanceType,
        m.Description,
        m.MaintenanceDate,
        m.TechnicianName,
        m.Status,
        m.Priority,
        m.EstimatedCost,
        m.ActualCost,
        m.CompletionDate,
        b.BikeSerialNumber,
        b.Model as BikeModel,
        b.BikeType,
        s.StationName
      FROM maintenance m
      JOIN bike b ON m.BikeID = b.BikeID
      LEFT JOIN station s ON b.StationID = s.StationID
      ${whereClause}
      ORDER BY m.MaintenanceDate DESC
      LIMIT ? OFFSET ?
    `;

    queryParams.push(limit, offset);

    const result = await executeQuery(prisma, maintenanceQuery, queryParams);

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

    const records = result.data || [];

    // Serialize the maintenance records
    const serializedRecords = records.map((record: any) => ({
      MaintenanceID: Number(record.MaintenanceID),
      BikeID: Number(record.BikeID),
      BikeSerialNumber: record.BikeSerialNumber,
      BikeModel: record.BikeModel,
      BikeType: record.BikeType,
      StationName: record.StationName,
      MaintenanceType: record.MaintenanceType,
      Description: record.Description,
      MaintenanceDate: record.MaintenanceDate,
      TechnicianName: record.TechnicianName,
      Status: record.Status,
      Priority: record.Priority,
      EstimatedCost: record.EstimatedCost ? Number(record.EstimatedCost) : null,
      ActualCost: record.ActualCost ? Number(record.ActualCost) : null,
      CompletionDate: record.CompletionDate
    }));

    // Get total count for pagination
    const countQuery = `
      SELECT COUNT(*) as total
      FROM maintenance m
      JOIN bike b ON m.BikeID = b.BikeID
      ${whereClause.replace('LIMIT ? OFFSET ?', '')}
    `;

    const countResult = await executeQuery(prisma, countQuery, queryParams.slice(0, -2));
    const totalRecords = countResult.success && countResult.data && countResult.data.length > 0
      ? Number(countResult.data[0].total)
      : 0;

    return NextResponse.json({
      success: true,
      records: serializedRecords,
      pagination: {
        total: totalRecords,
        limit,
        offset,
        hasMore: offset + records.length < totalRecords
      }
    });

  } catch (error) {
    console.error('Error fetching maintenance records:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        error: 'Failed to fetch maintenance records'
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
    const { MaintenanceID, Status, ActualCost, CompletionNotes, TechnicianName } = await request.json();

    // Validate required fields
    if (!MaintenanceID || !Status) {
      return NextResponse.json(
        { success: false, message: 'MaintenanceID and Status are required' },
        { status: 400 }
      );
    }

    // Validate Status
    const validStatuses = ['Scheduled', 'In Progress', 'Completed', 'Cancelled'];
    if (!validStatuses.includes(Status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status' },
        { status: 400 }
      );
    }

    // Check if maintenance record exists
    const checkQuery = `
      SELECT m.*, b.BikeID 
      FROM maintenance m
      JOIN bike b ON m.BikeID = b.BikeID
      WHERE m.MaintenanceID = ?
    `;

    const checkResult = await executeQuery(prisma, checkQuery, [MaintenanceID]);
    
    if (!checkResult.success || !checkResult.data || checkResult.data.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Maintenance record not found' },
        { status: 404 }
      );
    }

    const maintenanceRecord = checkResult.data[0];

    // Update maintenance record
    let updateQuery = `
      UPDATE maintenance 
      SET Status = ?, TechnicianName = ?
    `;
    let updateParams = [Status, TechnicianName || maintenanceRecord.TechnicianName];

    if (Status === 'Completed') {
      updateQuery += `, CompletionDate = NOW()`;
      if (ActualCost !== undefined && ActualCost !== null) {
        updateQuery += `, ActualCost = ?`;
        updateParams.push(ActualCost);
      }
      if (CompletionNotes) {
        updateQuery += `, Description = CONCAT(Description, '\n\nCompletion Notes: ', ?)`;
        updateParams.push(CompletionNotes);
      }
    }

    updateQuery += ` WHERE MaintenanceID = ?`;
    updateParams.push(MaintenanceID);

    const updateResult = await executeQuery(prisma, updateQuery, updateParams);

    if (!updateResult.success) {
      console.error('Failed to update maintenance record:', updateResult.error);
      return NextResponse.json(
        { success: false, message: 'Failed to update maintenance record' },
        { status: 500 }
      );
    }

    // If maintenance is completed, update bike status back to Available
    if (Status === 'Completed') {
      const updateBikeQuery = `
        UPDATE bike 
        SET Status = 'Available', LastMaintenance = NOW()
        WHERE BikeID = ?
      `;

      const bikeUpdateResult = await executeQuery(prisma, updateBikeQuery, [maintenanceRecord.BikeID]);
      
      if (!bikeUpdateResult.success) {
        console.warn('Failed to update bike status after maintenance completion:', bikeUpdateResult.error);
        // Continue even if bike status update fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Maintenance record updated successfully',
      status: Status,
      maintenanceId: Number(MaintenanceID)
    });

  } catch (error) {
    console.error('Error updating maintenance record:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        error: 'Failed to update maintenance record'
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