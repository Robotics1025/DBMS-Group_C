import { NextRequest, NextResponse } from 'next/server';// Analytics Dashboard API// Analytics Dashboard API

import { PrismaClient } from '@/app/generated/prisma';

import { bikeQueries, rentalQueries, userQueries, executeQuery } from '@/lib/queries';import { NextRequest, NextResponse } from 'next/server';import { NextRequest, NextResponse } from 'next/server';



const prisma = new PrismaClient();import { PrismaClient } from '@/app/generated/prisma';import { PrismaClient } from '@/app/generated/prisma';



export async function GET(request: NextRequest) {import { bikeQueries, rentalQueries, userQueries, executeQuery } from '@/lib/queries';import { bikeQueries, rentalQueries, userQueries, executeQuery } from '@/lib/queries';

  try {

    const bikesResult = await executeQuery(prisma, bikeQueries.getAllBikes);

    const rentalsResult = await executeQuery(prisma, rentalQueries.getAllActiveRentals);

    const customersResult = await executeQuery(prisma, userQueries.getAllCustomers);const prisma = new PrismaClient();const prisma = new PrismaClient();



    const analytics = {

      totalBikes: bikesResult.data?.length || 0,

      activeRentals: rentalsResult.data?.length || 0,// Get dashboard overview statistics// Get dashboard overview statistics

      totalCustomers: customersResult.data?.length || 0,

      availableBikes: bikesResult.data?.filter((bike: any) => bike.CurrentStatus === 'Available').length || 0export async function GET(request: NextRequest) {export async function GET(request: NextRequest) {

    };

  try {  try {

    return NextResponse.json({

      success: true,    // Simple analytics using existing queries    // Simple analytics using existing queries

      data: analytics

    });    const bikesResult = await executeQuery(prisma, bikeQueries.getAllBikes);    const bikesResult = await executeQuery(prisma, bikeQueries.getAllBikes);



  } catch (error) {    const rentalsResult = await executeQuery(prisma, rentalQueries.getAllActiveRentals);    const rentalsResult = await executeQuery(prisma, rentalQueries.getAllActiveRentals);

    console.error('Analytics API error:', error);

    return NextResponse.json(    const customersResult = await executeQuery(prisma, userQueries.getAllCustomers);    const customersResult = await executeQuery(prisma, userQueries.getAllCustomers);

      { error: 'Failed to fetch analytics data' },

      { status: 500 }

    );

  } finally {    const analytics = {    const analytics = {

    await prisma.$disconnect();

  }      totalBikes: bikesResult.data?.length || 0,      totalBikes: bikesResult.data?.length || 0,

}
      activeRentals: rentalsResult.data?.length || 0,      activeRentals: rentalsResult.data?.length || 0,

      totalCustomers: customersResult.data?.length || 0,      totalCustomers: customersResult.data?.length || 0,

      availableBikes: bikesResult.data?.filter((bike: any) => bike.CurrentStatus === 'Available').length || 0      availableBikes: bikesResult.data?.filter((bike: any) => bike.CurrentStatus === 'Available').length || 0

    };    };



    return NextResponse.json({    return NextResponse.json({

      success: true,      success: true,

      data: analytics      data: analytics

    });    });



  } catch (error) {      default:

    console.error('Analytics API error:', error);        return NextResponse.json(

    return NextResponse.json(          { error: 'Invalid endpoint' },

      { error: 'Failed to fetch analytics data' },          { status: 400 }

      { status: 500 }        );

    );    }

  } finally {

    await prisma.$disconnect();    if (!result.success) {

  }      return NextResponse.json(

}        { error: result.error },
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