import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/app/generated/prisma';
import { salesReportQueries, executeQuery } from '@/lib/queries';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const reportType = searchParams.get('type') || 'monthly';
    const months = parseInt(searchParams.get('months') || '12');
    const quarters = parseInt(searchParams.get('quarters') || '4');
    const years = parseInt(searchParams.get('years') || '3');
    const days = parseInt(searchParams.get('days') || '30');
    const limit = parseInt(searchParams.get('limit') || '20');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let result;
    let reportTitle = '';

    switch (reportType) {
      case 'daily':
        if (!startDate || !endDate) {
          return NextResponse.json(
            { success: false, message: 'Start date and end date required for daily report' },
            { status: 400 }
          );
        }
        result = await executeQuery(
          prisma, 
          salesReportQueries.getDailySalesReport, 
          [startDate, endDate]
        );
        reportTitle = `Daily Sales Report (${startDate} to ${endDate})`;
        break;

      case 'monthly':
        result = await executeQuery(
          prisma, 
          salesReportQueries.getMonthlySalesReport, 
          [months]
        );
        reportTitle = `Monthly Sales Report (Last ${months} months)`;
        break;

      case 'quarterly':
        result = await executeQuery(
          prisma, 
          salesReportQueries.getQuarterlySalesReport, 
          [quarters]
        );
        reportTitle = `Quarterly Sales Report (Last ${quarters} quarters)`;
        break;

      case 'yearly':
        result = await executeQuery(
          prisma, 
          salesReportQueries.getYearlySalesReport, 
          [years]
        );
        reportTitle = `Yearly Sales Report (Last ${years} years)`;
        break;

      case 'locations':
        result = await executeQuery(
          prisma, 
          salesReportQueries.getLocationPerformanceReport, 
          [months]
        );
        reportTitle = `Location Performance Report (Last ${months} months)`;
        break;

      case 'bike-types':
        result = await executeQuery(
          prisma, 
          salesReportQueries.getBikeTypePerformanceReport, 
          [months]
        );
        reportTitle = `Bike Type Performance Report (Last ${months} months)`;
        break;

      case 'top-customers':
        result = await executeQuery(
          prisma, 
          salesReportQueries.getTopCustomersReport, 
          [months, limit]
        );
        reportTitle = `Top ${limit} Customers Report (Last ${months} months)`;
        break;

      case 'payment-methods':
        result = await executeQuery(
          prisma, 
          salesReportQueries.getPaymentMethodReport, 
          [months, months, months]
        );
        reportTitle = `Payment Method Analysis (Last ${months} months)`;
        break;

      case 'peak-usage':
        result = await executeQuery(
          prisma, 
          salesReportQueries.getPeakUsageReport, 
          [months, months]
        );
        reportTitle = `Peak Usage Hours Report (Last ${months} months)`;
        break;

      case 'revenue-trend':
        result = await executeQuery(
          prisma, 
          salesReportQueries.getRevenueTrendReport, 
          []
        );
        reportTitle = 'Revenue Trend Analysis (Last 12 months)';
        break;

      case 'business-summary':
        result = await executeQuery(
          prisma, 
          salesReportQueries.getBusinessSummaryReport, 
          [days, days, months]
        );
        reportTitle = `Business Summary Report (Last ${months} months)`;
        break;

      default:
        return NextResponse.json(
          { success: false, message: 'Invalid report type' },
          { status: 400 }
        );
    }

    if (!result.success) {
      console.error('Sales report query failed:', result.error);
      return NextResponse.json(
        { 
          success: false, 
          message: result.error || 'Failed to generate sales report'
        },
        { status: 500 }
      );
    }

    // Calculate summary statistics for the report
    const data = result.data || [];
    let summary = {};

    if (data.length > 0) {
      switch (reportType) {
        case 'daily':
        case 'monthly':
        case 'quarterly':
        case 'yearly':
          const totalRevenue = data.reduce((sum: number, row: any) => sum + (Number(row.TotalRevenue) || 0), 0);
          const totalRentals = data.reduce((sum: number, row: any) => sum + (Number(row.TotalRentals) || 0), 0);
          const avgRevenue = totalRentals > 0 ? totalRevenue / totalRentals : 0;

          summary = {
            totalRevenue: Math.round(totalRevenue * 100) / 100,
            totalRentals,
            averageRevenuePerRental: Math.round(avgRevenue * 100) / 100,
            totalPeriods: data.length,
            highestRevenuePeriod: data.reduce((max: any, row: any) => 
              (Number(row.TotalRevenue) || 0) > (Number(max.TotalRevenue) || 0) ? row : max
            , data[0]),
            lowestRevenuePeriod: data.reduce((min: any, row: any) => 
              (Number(row.TotalRevenue) || 0) < (Number(min.TotalRevenue) || 0) ? row : min
            , data[0])
          };
          break;

        case 'locations':
          summary = {
            totalLocations: data.length,
            topLocation: data[0],
            totalRevenue: data.reduce((sum: number, row: any) => sum + (Number(row.TotalRevenue) || 0), 0),
            totalRentals: data.reduce((sum: number, row: any) => sum + (Number(row.TotalRentals) || 0), 0)
          };
          break;

        case 'top-customers':
          summary = {
            totalCustomersInReport: data.length,
            topCustomer: data[0],
            totalRevenueFromTopCustomers: data.reduce((sum: number, row: any) => sum + (Number(row.TotalSpent) || 0), 0),
            averageSpendingPerCustomer: data.length > 0 ? 
              data.reduce((sum: number, row: any) => sum + (Number(row.TotalSpent) || 0), 0) / data.length : 0
          };
          break;
      }
    }

    return NextResponse.json({
      success: true,
      reportTitle,
      reportType,
      generatedAt: new Date().toISOString(),
      parameters: {
        months,
        quarters,
        years,
        days,
        limit,
        startDate,
        endDate
      },
      summary,
      data,
      recordCount: data.length
    });

  } catch (error) {
    console.error('Error generating sales report:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        error: 'Failed to generate sales report'
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

// POST method to generate custom reports with specific criteria
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      reportType, 
      customQuery, 
      parameters = [],
      title = 'Custom Sales Report'
    } = body;

    if (!customQuery) {
      return NextResponse.json(
        { success: false, message: 'Custom query is required' },
        { status: 400 }
      );
    }

    // Basic validation to ensure it's a SELECT query for security
    const trimmedQuery = customQuery.trim().toLowerCase();
    if (!trimmedQuery.startsWith('select')) {
      return NextResponse.json(
        { success: false, message: 'Only SELECT queries are allowed' },
        { status: 400 }
      );
    }

    // Execute the custom query
    const result = await executeQuery(prisma, customQuery, parameters);

    if (!result.success) {
      console.error('Custom sales report query failed:', result.error);
      return NextResponse.json(
        { 
          success: false, 
          message: result.error || 'Failed to execute custom query'
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      reportTitle: title,
      reportType: 'custom',
      generatedAt: new Date().toISOString(),
      customQuery,
      parameters,
      data: result.data || [],
      recordCount: result.rowCount || 0
    });

  } catch (error) {
    console.error('Error executing custom sales report:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        error: 'Failed to execute custom sales report'
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