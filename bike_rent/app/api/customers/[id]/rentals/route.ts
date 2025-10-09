import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/queries';
import { PrismaClient } from '@/app/generated/prisma';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const customerId = parseInt(params.id);

    if (isNaN(customerId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid customer ID' },
        { status: 400 }
      );
    }

    // Get customer rental history
    const rentalsQuery = `
      SELECT 
        r.RentalID,
        r.RentalStart,
        r.RentalEnd,
        r.TotalCost,
        r.PaymentStatus,
        r.PaymentMethod,
        b.BikeSerialNumber,
        b.Model as BikeModel,
        b.BikeType,
        CASE 
          WHEN r.RentalEnd IS NOT NULL THEN 
            TIMESTAMPDIFF(MINUTE, r.RentalStart, r.RentalEnd)
          ELSE NULL
        END as Duration
      FROM rental r
      JOIN bike b ON r.BikeID = b.BikeID
      WHERE r.CustomerID = ?
      ORDER BY r.RentalStart DESC
      LIMIT 50
    `;

    const result = await executeQuery(prisma, rentalsQuery, [customerId]);

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
      RentalStart: rental.RentalStart,
      RentalEnd: rental.RentalEnd,
      TotalCost: Number(rental.TotalCost) || 0,
      PaymentStatus: rental.PaymentStatus || 'Pending',
      PaymentMethod: rental.PaymentMethod,
      BikeSerialNumber: rental.BikeSerialNumber,
      BikeModel: rental.BikeModel,
      BikeType: rental.BikeType,
      Duration: rental.Duration ? Number(rental.Duration) : null
    }));

    return NextResponse.json({
      success: true,
      rentals: serializedRentals,
      count: serializedRentals.length
    });

  } catch (error) {
    console.error('Error fetching customer rentals:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        error: 'Failed to fetch customer rental history'
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