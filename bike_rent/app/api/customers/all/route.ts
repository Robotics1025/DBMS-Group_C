import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/queries';
import { PrismaClient } from '@/app/generated/prisma';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';

    let customersQuery = `
      SELECT 
        u.UserID,
        u.FirstName,
        u.LastName,
        u.Email,
        u.PhoneNumber,
        u.LoyaltyPoints,
        u.RegistrationDate,
        u.DateOfBirth,
        COUNT(r.RentalID) as TotalRentals,
        MAX(r.RentalStart) as LastRental,
        ar.RentalID as ActiveRentalID,
        ar.BikeModel,
        ar.RentalStart as ActiveRentalStart
      FROM user u
      LEFT JOIN rental r ON u.UserID = r.CustomerID AND r.RentalEnd IS NOT NULL
      LEFT JOIN (
        SELECT 
          r.RentalID,
          r.CustomerID,
          r.RentalStart,
          b.Model as BikeModel
        FROM rental r
        JOIN bike b ON r.BikeID = b.BikeID
        WHERE r.RentalEnd IS NULL
      ) ar ON u.UserID = ar.CustomerID
      WHERE u.Role = 'Customer'
    `;

    // Add status filtering
    if (status === 'active') {
      customersQuery += ' AND ar.RentalID IS NOT NULL';
    } else if (status === 'recent') {
      customersQuery += ' AND r.RentalStart >= DATE_SUB(NOW(), INTERVAL 7 DAY)';
    } else if (status === 'inactive') {
      customersQuery += ' AND (r.RentalStart IS NULL OR r.RentalStart < DATE_SUB(NOW(), INTERVAL 30 DAY)) AND ar.RentalID IS NULL';
    } else if (status === 'new') {
      customersQuery += ' AND u.RegistrationDate >= DATE_SUB(NOW(), INTERVAL 30 DAY)';
    }

    customersQuery += `
      GROUP BY u.UserID, u.FirstName, u.LastName, u.Email, u.PhoneNumber, 
               u.LoyaltyPoints, u.RegistrationDate, u.DateOfBirth,
               ar.RentalID, ar.BikeModel, ar.RentalStart
      ORDER BY u.FirstName, u.LastName
    `;

    const result = await executeQuery(prisma, customersQuery);

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

    const customers = result.data || [];

    // Serialize and format the data
    const serializedCustomers = customers.map((customer: any) => ({
      UserID: Number(customer.UserID),
      FirstName: customer.FirstName || '',
      LastName: customer.LastName || '',
      Email: customer.Email || '',
      PhoneNumber: customer.PhoneNumber || null,
      LoyaltyPoints: Number(customer.LoyaltyPoints) || 0,
      RegistrationDate: customer.RegistrationDate,
      DateOfBirth: customer.DateOfBirth,
      TotalRentals: Number(customer.TotalRentals) || 0,
      LastRental: customer.LastRental,
      ActiveRental: customer.ActiveRentalID ? {
        RentalID: Number(customer.ActiveRentalID),
        BikeModel: customer.BikeModel,
        StartTime: customer.ActiveRentalStart
      } : null
    }));

    return NextResponse.json({
      success: true,
      customers: serializedCustomers,
      count: serializedCustomers.length
    });

  } catch (error) {
    console.error('Error fetching customers:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        error: 'Failed to fetch customers'
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