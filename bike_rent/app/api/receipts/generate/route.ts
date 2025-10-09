import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/queries';
import { PrismaClient } from '@/app/generated/prisma';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { rentalId, receiptNumber, generatedDate } = await request.json();

    // Validate required fields
    if (!rentalId || !receiptNumber || !generatedDate) {
      return NextResponse.json(
        { success: false, message: 'RentalId, receiptNumber, and generatedDate are required' },
        { status: 400 }
      );
    }

    // Check if rental exists
    const rentalCheckQuery = `
      SELECT RentalID, PaymentStatus 
      FROM rental 
      WHERE RentalID = ?
    `;

    const rentalResult = await executeQuery(prisma, rentalCheckQuery, [rentalId]);
    
    if (!rentalResult.success || !rentalResult.data || rentalResult.data.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Rental not found' },
        { status: 404 }
      );
    }

    const rental = rentalResult.data[0];

    if (rental.PaymentStatus !== 'Completed') {
      return NextResponse.json(
        { success: false, message: 'Cannot generate receipt for unpaid rental' },
        { status: 400 }
      );
    }

    // Check if receipt already exists
    const receiptCheckQuery = `
      SELECT ReceiptID 
      FROM receipt 
      WHERE RentalID = ?
    `;

    const existingReceiptResult = await executeQuery(prisma, receiptCheckQuery, [rentalId]);

    if (existingReceiptResult.success && existingReceiptResult.data && existingReceiptResult.data.length > 0) {
      // Update existing receipt
      const updateReceiptQuery = `
        UPDATE receipt 
        SET ReceiptNumber = ?, GeneratedDate = ?
        WHERE RentalID = ?
      `;

      const updateResult = await executeQuery(prisma, updateReceiptQuery, [receiptNumber, generatedDate, rentalId]);

      if (!updateResult.success) {
        console.error('Failed to update receipt:', updateResult.error);
        return NextResponse.json(
          { success: false, message: 'Failed to update receipt' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Receipt updated successfully',
        receiptNumber: receiptNumber,
        rentalId: Number(rentalId),
        action: 'updated'
      });
    } else {
      // Create new receipt
      const insertReceiptQuery = `
        INSERT INTO receipt (
          RentalID,
          ReceiptNumber,
          GeneratedDate
        ) VALUES (?, ?, ?)
      `;

      const insertResult = await executeQuery(prisma, insertReceiptQuery, [rentalId, receiptNumber, generatedDate]);

      if (!insertResult.success) {
        console.error('Failed to create receipt:', insertResult.error);
        return NextResponse.json(
          { success: false, message: 'Failed to create receipt' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Receipt created successfully',
        receiptNumber: receiptNumber,
        rentalId: Number(rentalId),
        action: 'created'
      });
    }

  } catch (error) {
    console.error('Error generating receipt:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        error: 'Failed to generate receipt'
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