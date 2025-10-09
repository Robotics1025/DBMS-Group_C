import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/queries';
import { PrismaClient } from '@/app/generated/prisma';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Get active rentals count
    const activeRentalsQuery = `
      SELECT COUNT(*) as count
      FROM rental 
      WHERE RentalEnd IS NULL
    `;

    // Get today's revenue from completed rentals
    const todayRevenueQuery = `
      SELECT COALESCE(SUM(TotalCost), 0) as revenue
      FROM rental 
      WHERE DATE(RentalStart) = CURDATE() 
      AND RentalEnd IS NOT NULL
      AND PaymentStatus = 'Paid'
    `;

    // Get total customers count
    const totalCustomersQuery = `
      SELECT COUNT(*) as count
      FROM user 
      WHERE Role = 'Customer'
    `;

    // Execute all queries
    const [activeRentalsResult, todayRevenueResult, totalCustomersResult] = await Promise.all([
      executeQuery(prisma, activeRentalsQuery),
      executeQuery(prisma, todayRevenueQuery), 
      executeQuery(prisma, totalCustomersQuery)
    ]);

    // Check if all queries succeeded
    if (!activeRentalsResult.success || !todayRevenueResult.success || !totalCustomersResult.success) {
      throw new Error('One or more database queries failed');
    }

    const activeRentals = Number(activeRentalsResult.data?.[0]?.count) || 0;
    const todayRevenue = Number(todayRevenueResult.data?.[0]?.revenue) || 0;
    const totalCustomers = Number(totalCustomersResult.data?.[0]?.count) || 0;

    return NextResponse.json({
      success: true,
      activeRentals,
      todayRevenue,
      totalCustomers
    });

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        error: 'Failed to fetch dashboard statistics'
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