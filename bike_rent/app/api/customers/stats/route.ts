import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/queries';
import { PrismaClient } from '@/app/generated/prisma';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Get total customers
    const totalCustomersQuery = `
      SELECT COUNT(*) as count
      FROM user 
      WHERE Role = 'Customer'
    `;

    // Get active customers (customers with rentals in the last 30 days)
    const activeCustomersQuery = `
      SELECT COUNT(DISTINCT r.CustomerID) as count
      FROM rental r
      WHERE r.RentalStart >= DATE_SUB(NOW(), INTERVAL 30 DAY)
    `;

    // Get new customers this month
    const newThisMonthQuery = `
      SELECT COUNT(*) as count
      FROM user 
      WHERE Role = 'Customer' 
      AND RegistrationDate >= DATE_SUB(NOW(), INTERVAL 30 DAY)
    `;

    // Get average loyalty points
    const averageLoyaltyQuery = `
      SELECT AVG(LoyaltyPoints) as average
      FROM user 
      WHERE Role = 'Customer'
    `;

    // Execute all queries in parallel
    const [
      totalResult,
      activeResult,
      newResult,
      loyaltyResult
    ] = await Promise.all([
      executeQuery(prisma, totalCustomersQuery),
      executeQuery(prisma, activeCustomersQuery),
      executeQuery(prisma, newThisMonthQuery),
      executeQuery(prisma, averageLoyaltyQuery)
    ]);

    // Check if all queries succeeded
    if (!totalResult.success || !activeResult.success || !newResult.success || !loyaltyResult.success) {
      throw new Error('One or more database queries failed');
    }

    const stats = {
      totalCustomers: Number(totalResult.data?.[0]?.count) || 0,
      activeCustomers: Number(activeResult.data?.[0]?.count) || 0,
      newThisMonth: Number(newResult.data?.[0]?.count) || 0,
      averageLoyaltyPoints: Number(loyaltyResult.data?.[0]?.average) || 0
    };

    return NextResponse.json({
      success: true,
      stats
    });

  } catch (error) {
    console.error('Error fetching customer stats:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        error: 'Failed to fetch customer statistics'
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