import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/queries';
import { PrismaClient } from '@/app/generated/prisma';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeCompleted = searchParams.get('includeCompleted') === 'true';
    const includeCustomerInfo = searchParams.get('includeCustomerInfo') === 'true';
    const limit = Math.min(parseInt(searchParams.get('limit') || '100'), 200);
    const offset = parseInt(searchParams.get('offset') || '0');
    const customerId = searchParams.get('customerId') || '';
    const status = searchParams.get('status') || '';

    // Build query with filters
    let whereClause = 'WHERE 1=1';
    const queryParams: any[] = [];

    if (!includeCompleted) {
      whereClause += ' AND r.RentalEnd IS NULL';
    }

    if (customerId) {
      whereClause += ' AND r.CustomerID = ?';
      queryParams.push(parseInt(customerId));
    }

    if (status) {
      whereClause += ' AND r.PaymentStatus = ?';
      queryParams.push(status);
    }

    // Enhanced query with customer information and receipt status
    const rentalsQuery = `
      SELECT 
        r.RentalID,
        r.CustomerID,
        r.BikeID,
        r.RentalStart,
        r.RentalEnd,
        r.TotalCost,
        r.PaymentStatus,
        r.PaymentMethod,
        CASE 
          WHEN r.RentalEnd IS NOT NULL THEN 
            TIMESTAMPDIFF(MINUTE, r.RentalStart, r.RentalEnd)
          ELSE NULL
        END as Duration,
        b.BikeSerialNumber,
        b.Model as BikeModel,
        b.BikeType,
        l.LocationName as StationName,
        l.Address as StationLocation,
        ${includeCustomerInfo ? `
        c.FirstName,
        c.LastName,
        c.Email,
        c.PhoneNumber,
        CONCAT(c.FirstName, ' ', c.LastName) as CustomerName,
        ` : ''}
        0 as ReceiptGenerated,
        NULL as ReceiptNumber,
        NULL as ReceiptGeneratedDate
      FROM rental r
      JOIN bike b ON r.BikeID = b.BikeID
      LEFT JOIN location l ON b.LocationID = l.LocationID
      ${includeCustomerInfo ? 'JOIN user c ON r.CustomerID = c.UserID' : ''}
      ${whereClause}
      ORDER BY r.RentalStart DESC
      LIMIT ? OFFSET ?
    `;

    queryParams.push(limit, offset);

    const result = await executeQuery(prisma, rentalsQuery, queryParams);

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

    const rentals = result.data || [];

    // Serialize the rental data
    const serializedRentals = rentals.map((rental: any) => ({
      RentalID: Number(rental.RentalID),
      CustomerID: Number(rental.CustomerID),
      BikeID: Number(rental.BikeID),
      RentalStart: rental.RentalStart,
      RentalEnd: rental.RentalEnd,
      Duration: rental.Duration ? Number(rental.Duration) : null,
      TotalCost: Number(rental.TotalCost) || 0,
      PaymentStatus: rental.PaymentStatus || 'Pending',
      PaymentMethod: rental.PaymentMethod,
      BikeSerialNumber: rental.BikeSerialNumber,
      BikeModel: rental.BikeModel,
      BikeType: rental.BikeType,
      StationName: rental.StationName,
      StationLocation: rental.StationLocation,
      ...(includeCustomerInfo && {
        CustomerName: rental.CustomerName || `${rental.FirstName || ''} ${rental.LastName || ''}`.trim(),
        CustomerEmail: rental.Email,
        CustomerPhone: rental.PhoneNumber,
        FirstName: rental.FirstName,
        LastName: rental.LastName
      }),
      ReceiptGenerated: Boolean(rental.ReceiptGenerated),
      ReceiptNumber: rental.ReceiptNumber,
      ReceiptGeneratedDate: rental.ReceiptGeneratedDate
    }));

    // Get total count for pagination
    const countQuery = `
      SELECT COUNT(*) as total
      FROM rental r
      JOIN bike b ON r.BikeID = b.BikeID
      LEFT JOIN location l ON b.LocationID = l.LocationID
      ${includeCustomerInfo ? 'JOIN user c ON r.CustomerID = c.UserID' : ''}
      ${whereClause.replace('LIMIT ? OFFSET ?', '')}
    `;

    const countResult = await executeQuery(prisma, countQuery, queryParams.slice(0, -2));
    const totalRecords = countResult.success && countResult.data && countResult.data.length > 0
      ? Number(countResult.data[0].total)
      : 0;

    return NextResponse.json({
      success: true,
      rentals: serializedRentals,
      pagination: {
        total: totalRecords,
        limit,
        offset,
        hasMore: offset + rentals.length < totalRecords
      }
    });

  } catch (error) {
    console.error('Error fetching rental records:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        error: 'Failed to fetch rental records'
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