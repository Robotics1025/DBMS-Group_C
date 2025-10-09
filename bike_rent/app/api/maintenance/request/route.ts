import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/queries';
import { PrismaClient } from '@/app/generated/prisma';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { BikeID, MaintenanceType, Description, Priority, EstimatedCost } = await request.json();

    // Validate required fields
    if (!BikeID || !MaintenanceType || !Description) {
      return NextResponse.json(
        { success: false, message: 'BikeID, MaintenanceType, and Description are required' },
        { status: 400 }
      );
    }

    // Validate Priority
    const validPriorities = ['Low', 'Medium', 'High', 'Urgent'];
    if (Priority && !validPriorities.includes(Priority)) {
      return NextResponse.json(
        { success: false, message: 'Invalid priority level' },
        { status: 400 }
      );
    }

    // Check if bike exists
    const bikeCheckQuery = `
      SELECT BikeID, BikeSerialNumber, Status 
      FROM bike 
      WHERE BikeID = ?
    `;

    const bikeResult = await executeQuery(prisma, bikeCheckQuery, [BikeID]);
    
    if (!bikeResult.success || !bikeResult.data || bikeResult.data.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Bike not found' },
        { status: 404 }
      );
    }

    const bike = bikeResult.data[0];

    // Create maintenance request/record
    const insertMaintenanceQuery = `
      INSERT INTO maintenance (
        BikeID,
        MaintenanceType,
        Description,
        MaintenanceDate,
        TechnicianName,
        Status,
        Priority,
        EstimatedCost
      ) VALUES (?, ?, ?, NOW(), 'Staff Request', 'Scheduled', ?, ?)
    `;

    const maintenanceValues = [
      BikeID,
      MaintenanceType,
      Description,
      Priority || 'Medium',
      EstimatedCost || null
    ];

    const insertResult = await executeQuery(prisma, insertMaintenanceQuery, maintenanceValues);

    if (!insertResult.success) {
      console.error('Failed to create maintenance request:', insertResult.error);
      return NextResponse.json(
        { success: false, message: 'Failed to create maintenance request' },
        { status: 500 }
      );
    }

    // Update bike status to Maintenance if it's currently Available
    if (bike.Status === 'Available') {
      const updateBikeQuery = `
        UPDATE bike 
        SET Status = 'Maintenance', LastMaintenance = NOW()
        WHERE BikeID = ?
      `;

      const updateResult = await executeQuery(prisma, updateBikeQuery, [BikeID]);
      
      if (!updateResult.success) {
        console.warn('Failed to update bike status:', updateResult.error);
        // Continue even if bike status update fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Maintenance request created successfully',
      bikeSerialNumber: bike.BikeSerialNumber,
      maintenanceType: MaintenanceType,
      priority: Priority || 'Medium'
    });

  } catch (error) {
    console.error('Error creating maintenance request:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        error: 'Failed to create maintenance request'
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