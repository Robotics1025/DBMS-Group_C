import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/queries';
import { PrismaClient } from '@/app/generated/prisma';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
      return NextResponse.json({
        success: true,
        customers: [],
        message: 'Search query too short'
      });
    }

    // Search customers by name, email, or phone
    const searchQuery = `
      SELECT 
        UserID,
        FirstName,
        LastName,
        Email,
        PhoneNumber,
        LoyaltyPoints,
        RegistrationDate
      FROM user 
      WHERE 
        Role = 'Customer' AND
        (
          LOWER(CONCAT(FirstName, ' ', LastName)) LIKE LOWER(?) OR
          LOWER(Email) LIKE LOWER(?) OR
          LOWER(PhoneNumber) LIKE LOWER(?) OR
          LOWER(FirstName) LIKE LOWER(?) OR
          LOWER(LastName) LIKE LOWER(?)
        )
      ORDER BY 
        CASE 
          WHEN LOWER(CONCAT(FirstName, ' ', LastName)) LIKE LOWER(?) THEN 1
          WHEN LOWER(Email) LIKE LOWER(?) THEN 2
          WHEN LOWER(PhoneNumber) LIKE LOWER(?) THEN 3
          ELSE 4
        END,
        FirstName ASC
      LIMIT 20
    `;

    const searchPattern = `%${query}%`;
    const exactPattern = query;

    const result = await executeQuery(prisma, searchQuery, [
      searchPattern, // name search
      searchPattern, // email search  
      searchPattern, // phone search
      searchPattern, // first name search
      searchPattern, // last name search
      exactPattern,  // name priority
      exactPattern,  // email priority
      exactPattern   // phone priority
    ]);

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

    // Serialize the data to handle BigInt values
    const serializedCustomers = customers.map((customer: any) => ({
      UserID: Number(customer.UserID),
      FirstName: customer.FirstName || '',
      LastName: customer.LastName || '',
      Email: customer.Email || '',
      PhoneNumber: customer.PhoneNumber || '',
      LoyaltyPoints: Number(customer.LoyaltyPoints) || 0,
      RegistrationDate: customer.RegistrationDate
    }));

    return NextResponse.json({
      success: true,
      customers: serializedCustomers,
      count: serializedCustomers.length
    });

  } catch (error) {
    console.error('Error searching customers:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        error: 'Failed to search customers'
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