import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/queries';
import { PrismaClient } from '@/app/generated/prisma';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Query to get all staff members with their most recent location (from bike movements)
    const staffQuery = `
      SELECT DISTINCT
        u.UserID,
        u.FirstName,
        u.LastName,
        u.Email,
        u.PhoneNumber,
        u.Role,
        u.DateHired,
        l.LocationID,
        l.LocationName,
        l.City
      FROM user u
      LEFT JOIN (
        SELECT DISTINCT 
          bm1.StaffID,
          bm1.ToLocationID,
          bm1.MovementDate
        FROM bikemovement bm1
        INNER JOIN (
          SELECT StaffID, MAX(MovementDate) as MaxDate
          FROM bikemovement
          GROUP BY StaffID
        ) bm2 ON bm1.StaffID = bm2.StaffID AND bm1.MovementDate = bm2.MaxDate
      ) recent_movement ON u.UserID = recent_movement.StaffID
      LEFT JOIN location l ON recent_movement.ToLocationID = l.LocationID
      WHERE u.Role IN ('Staff', 'Administrator')
      ORDER BY u.FirstName, u.LastName
    `;

    const staffResult = await executeQuery(prisma, staffQuery);

    if (!staffResult.success) {
      console.error('Database query failed:', staffResult.error);
      return NextResponse.json(
        { 
          success: false, 
          message: staffResult.error || 'Database query failed'
        },
        { status: 500 }
      );
    }

    // The executeQuery function already serializes BigInt values
    const staff = staffResult.data || [];

    const serializedStaff = staff.map((member: any) => ({
      UserID: Number(member.UserID),
      FirstName: member.FirstName || '',
      LastName: member.LastName || '',
      Email: member.Email || '',
      PhoneNumber: member.PhoneNumber || '',
      Role: member.Role || 'Staff',
      DateHired: member.DateHired,
      AssignedLocationID: member.LocationID ? Number(member.LocationID) : null,
      LocationName: member.LocationName || null,
      City: member.City || null
    }));

    return NextResponse.json({
      success: true,
      staff: serializedStaff,
      count: serializedStaff.length
    });

  } catch (error) {
    console.error('Error fetching staff:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        error: 'Failed to fetch staff members'
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