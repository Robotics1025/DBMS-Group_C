// Analytics Dashboard API
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/app/generated/prisma';
import { analyticsQueries, executeQuery } from '@/lib/queries';

const prisma = new PrismaClient();

// Get dashboard overview statistics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint');

    let result;

    switch (endpoint) {
      case 'overview':
        // Dashboard overview stats
        result = await executeQuery(prisma, analyticsQueries.getDashboardStats);
        break;

      case 'popular-bikes':
        // Popular bike types analysis
        result = await executeQuery(prisma, analyticsQueries.getPopularBikeTypes);
        break;

      case 'peak-hours':
        // Peak usage hours analysis
        result = await executeQuery(prisma, analyticsQueries.getPeakUsageHours);
        break;

      case 'location-performance':
        // Location performance metrics
        result = await executeQuery(prisma, analyticsQueries.getLocationPerformance);
        break;

      case 'customer-loyalty':
        // Customer loyalty analysis
        result = await executeQuery(prisma, analyticsQueries.getCustomerLoyalty);
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid endpoint' },
          { status: 400 }
        );
    }

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      count: result.rowCount
    });

  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Get custom analytics with date range
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { startDate, endDate, metric } = body;

    // Custom queries based on date range
    const customQueries = {
      revenue: `
        SELECT 
          DATE(p.PaymentDate) as date,
          SUM(p.Amount) as revenue,
          COUNT(p.PaymentID) as transactions
        FROM payment p
        WHERE p.PaymentDate BETWEEN ? AND ?
        GROUP BY DATE(p.PaymentDate)
        ORDER BY date
      `,

      rentals: `
        SELECT 
          DATE(r.RentalStart) as date,
          COUNT(r.RentalID) as rentals,
          AVG(TIMESTAMPDIFF(MINUTE, r.RentalStart, COALESCE(r.RentalEnd, NOW()))) as avgDuration
        FROM rental r
        WHERE r.RentalStart BETWEEN ? AND ?
        GROUP BY DATE(r.RentalStart)
        ORDER BY date
      `,

      bikes: `
        SELECT 
          b.BikeType,
          COUNT(r.RentalID) as rentals,
          SUM(r.TotalCost) as revenue
        FROM rental r
        JOIN bike b ON r.BikeID = b.BikeID
        WHERE r.RentalStart BETWEEN ? AND ?
        GROUP BY b.BikeType
        ORDER BY rentals DESC
      `
    };

    if (!customQueries[metric as keyof typeof customQueries]) {
      return NextResponse.json(
        { error: 'Invalid metric' },
        { status: 400 }
      );
    }

    const result = await executeQuery(
      prisma,
      customQueries[metric as keyof typeof customQueries],
      [startDate, endDate]
    );

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      metric,
      dateRange: { startDate, endDate },
      data: result.data,
      count: result.rowCount
    });

  } catch (error) {
    console.error('Custom analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch custom analytics' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}