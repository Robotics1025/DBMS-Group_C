/**
 * Receipt Generation API - Alibaba Style Transaction Receipts
 * Generates detailed receipts for completed rentals/payments with staff assignment
 */

import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeInsertQuery } from '@/lib/queries';
import { PrismaClient } from '@/app/generated/prisma';

const prisma = new PrismaClient();

// Generate a unique receipt number (Alibaba style)
function generateReceiptNumber(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `RCP-${timestamp}-${random}`;
}

// Assign a random available staff member
async function assignStaff(): Promise<any> {
  const staffQuery = `
    SELECT UserID, FirstName, LastName, Email, PhoneNumber
    FROM user 
    WHERE Role IN ('Staff', 'Administrator')
    ORDER BY RAND()
    LIMIT 1
  `;
  
  const result = await executeQuery(prisma, staffQuery, []);
  
  if (result.success && result.data && result.data.length > 0) {
    return result.data[0];
  }
  
  // Return default staff info if none found
  return {
    UserID: 1,
    FirstName: 'System',
    LastName: 'Administrator',
    Email: 'admin@bikerent.com',
    PhoneNumber: '+256-XXX-XXXX'
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { rentalID, paymentMethod = 'Card', transactionID } = body;

    if (!rentalID) {
      return NextResponse.json({
        success: false,
        error: 'RentalID is required'
      }, { status: 400 });
    }

    // Get rental details with bike and customer info
    const rentalQuery = `
      SELECT 
        r.RentalID, r.CustomerID, r.BikeID, r.RentalStart, r.ExpectedReturn,
        r.RentalEnd, r.TotalCost, r.PaymentStatus, r.PromoID,
        u.FirstName, u.LastName, u.Email, u.PhoneNumber, u.NationalID, u.LoyaltyPoints,
        b.BikeSerialNumber, b.Model, b.BikeType, b.RentalRatePerMinute, b.bike_image,
        l.LocationName, l.Address, l.City, l.PhoneNumber as LocationPhone,
        p.PromoCode, p.DiscountPercent
      FROM rental r
      JOIN user u ON r.CustomerID = u.UserID
      JOIN bike b ON r.BikeID = b.BikeID
      LEFT JOIN location l ON b.LocationID = l.LocationID
      LEFT JOIN promo p ON r.PromoID = p.PromoID
      WHERE r.RentalID = ?
    `;

    const rentalResult = await executeQuery(prisma, rentalQuery, [rentalID]);

    if (!rentalResult.success || !rentalResult.data || rentalResult.data.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Rental not found'
      }, { status: 404 });
    }

    const rental = rentalResult.data[0];

    // Assign a staff member to handle this transaction
    const staff = await assignStaff();

    // Generate receipt number
    const receiptNumber = generateReceiptNumber();
    const generatedTransactionID = transactionID || `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    // Calculate costs
    const subtotal = parseFloat(rental.TotalCost) || 0;
    const discountPercent = parseFloat(rental.DiscountPercent) || 0;
    const discountAmount = (subtotal * discountPercent / 100);
    const tax = (subtotal - discountAmount) * 0.18; // 18% VAT
    const total = subtotal - discountAmount + tax;

    // Check if payment already exists for this rental
    const checkPaymentQuery = `
      SELECT PaymentID FROM payment WHERE RentalID = ?
    `;
    const existingPayment = await executeQuery(prisma, checkPaymentQuery, [rentalID]);

    let paymentID;
    
    if (existingPayment.success && existingPayment.data && existingPayment.data.length > 0) {
      // Update existing payment
      paymentID = existingPayment.data[0].PaymentID;
      const updatePaymentQuery = `
        UPDATE payment 
        SET Amount = ?, PaymentMethod = ?, TransactionID = ?, PaymentDate = NOW()
        WHERE PaymentID = ?
      `;
      await executeQuery(prisma, updatePaymentQuery, [total.toFixed(2), paymentMethod, generatedTransactionID, paymentID]);
    } else {
      // Create new payment record
      const paymentInsertQuery = `
        INSERT INTO payment (RentalID, PaymentDate, Amount, PaymentMethod, TransactionID)
        VALUES (?, NOW(), ?, ?, ?)
      `;

      const paymentResult = await executeInsertQuery(prisma, paymentInsertQuery, [
        rentalID,
        total.toFixed(2),
        paymentMethod,
        generatedTransactionID
      ]);

      if (!paymentResult.success) {
        return NextResponse.json({
          success: false,
          error: 'Failed to create payment record'
        }, { status: 500 });
      }

      paymentID = paymentResult.insertId;
    }

    // Update rental payment status
    const updateRentalQuery = `
      UPDATE rental 
      SET PaymentStatus = 'Paid'
      WHERE RentalID = ?
    `;
    await executeQuery(prisma, updateRentalQuery, [rentalID]);

    // Update customer loyalty points (1 point per dollar spent)
    const loyaltyPoints = Math.floor(total);
    const currentPoints = parseInt(rental.LoyaltyPoints) || 0;
    const newTotalPoints = currentPoints + loyaltyPoints;
    
    const updateLoyaltyQuery = `
      UPDATE user 
      SET LoyaltyPoints = ?
      WHERE UserID = ?
    `;
    await executeQuery(prisma, updateLoyaltyQuery, [newTotalPoints, rental.CustomerID]);

    // Build comprehensive receipt (Alibaba style)
    const receipt = {
      receiptNumber,
      transactionID: generatedTransactionID,
      paymentID,
      status: 'Completed',
      timestamp: new Date().toISOString(),
      
      // Customer Information
      customer: {
        customerID: rental.CustomerID,
        name: `${rental.FirstName} ${rental.LastName}`,
        email: rental.Email,
        phone: rental.PhoneNumber,
        nationalID: rental.NationalID,
        loyaltyPointsEarned: loyaltyPoints,
        totalLoyaltyPoints: newTotalPoints
      },

      // Staff Assignment (Alibaba has service representatives)
      assignedStaff: {
        staffID: staff.UserID,
        name: `${staff.FirstName} ${staff.LastName}`,
        email: staff.Email,
        phone: staff.PhoneNumber,
        role: 'Service Representative'
      },

      // Rental Details
      rental: {
        rentalID: rental.RentalID,
        bikeSerialNumber: rental.BikeSerialNumber,
        bikeModel: rental.Model,
        bikeType: rental.BikeType,
        bikeImage: rental.bike_image,
        rentalStart: rental.RentalStart,
        expectedReturn: rental.ExpectedReturn,
        rentalEnd: rental.RentalEnd,
        duration: rental.RentalEnd 
          ? Math.round((new Date(rental.RentalEnd).getTime() - new Date(rental.RentalStart).getTime()) / (1000 * 60)) 
          : Math.round((new Date().getTime() - new Date(rental.RentalStart).getTime()) / (1000 * 60)),
        ratePerMinute: parseFloat(rental.RentalRatePerMinute)
      },

      // Location Information
      location: {
        locationName: rental.LocationName,
        address: rental.Address,
        city: rental.City,
        phone: rental.LocationPhone
      },

      // Payment Breakdown (Alibaba style)
      payment: {
        subtotal: subtotal.toFixed(2),
        discount: discountAmount > 0 ? {
          code: rental.PromoCode,
          percent: discountPercent,
          amount: discountAmount.toFixed(2)
        } : null,
        tax: tax.toFixed(2),
        taxRate: '18%',
        total: total.toFixed(2),
        method: paymentMethod,
        currency: 'USD'
      },

      // Company Information
      company: {
        name: 'BikeRent',
        address: '123 Main Street, Kampala, Uganda',
        phone: '+256-XXX-XXXX',
        email: 'support@bikerent.com',
        website: 'www.bikerent.com',
        taxID: 'BR-TAX-2025'
      },

      // Additional Information
      notes: 'Thank you for choosing BikeRent! Your satisfaction is our priority.',
      termsAndConditions: 'All rentals are subject to our terms and conditions. Bikes must be returned in good condition.',
      
      // QR Code data for verification (Alibaba uses QR codes)
      qrData: `RECEIPT:${receiptNumber}|TXN:${generatedTransactionID}|AMOUNT:${total.toFixed(2)}|DATE:${new Date().toISOString()}`
    };

    // Notification payload for staff (Alibaba sends real-time notifications)
    const staffNotification = {
      type: 'payment_received',
      title: '💰 New Payment Received',
      message: `Payment of $${total.toFixed(2)} received from ${rental.FirstName} ${rental.LastName}`,
      rentalID,
      receiptNumber,
      amount: total.toFixed(2),
      customerName: `${rental.FirstName} ${rental.LastName}`,
      customerEmail: rental.Email,
      bikeModel: `${rental.BikeType} - ${rental.Model}`,
      timestamp: new Date().toISOString(),
      assignedTo: staff.UserID,
      priority: 'high',
      actionRequired: false
    };

    return NextResponse.json({
      success: true,
      receipt,
      staffNotification,
      message: 'Receipt generated successfully. Staff has been notified.'
    });

  } catch (error) {
    console.error('Receipt generation error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  } finally {
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      console.error('Error disconnecting Prisma:', disconnectError);
    }
  }
}

// GET endpoint to retrieve existing receipts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rentalID = searchParams.get('rentalID');
    const transactionID = searchParams.get('transactionID');
    const customerID = searchParams.get('customerID');

    let query = '';
    let params: any[] = [];

    if (transactionID) {
      query = `
        SELECT 
          p.PaymentID, p.RentalID, p.PaymentDate, p.Amount, p.PaymentMethod, p.TransactionID,
          r.CustomerID, r.BikeID, r.RentalStart, r.ExpectedReturn, r.RentalEnd, r.TotalCost, r.PaymentStatus,
          u.FirstName, u.LastName, u.Email, u.PhoneNumber, u.LoyaltyPoints,
          b.BikeSerialNumber, b.Model, b.BikeType, b.bike_image, b.RentalRatePerMinute,
          l.LocationName, l.Address, l.City
        FROM payment p
        JOIN rental r ON p.RentalID = r.RentalID
        JOIN user u ON r.CustomerID = u.UserID
        JOIN bike b ON r.BikeID = b.BikeID
        LEFT JOIN location l ON b.LocationID = l.LocationID
        WHERE p.TransactionID = ?
      `;
      params = [transactionID];
    } else if (rentalID) {
      query = `
        SELECT 
          p.PaymentID, p.RentalID, p.PaymentDate, p.Amount, p.PaymentMethod, p.TransactionID,
          r.CustomerID, r.BikeID, r.RentalStart, r.ExpectedReturn, r.RentalEnd, r.TotalCost, r.PaymentStatus,
          u.FirstName, u.LastName, u.Email, u.PhoneNumber, u.LoyaltyPoints,
          b.BikeSerialNumber, b.Model, b.BikeType, b.bike_image, b.RentalRatePerMinute,
          l.LocationName, l.Address, l.City
        FROM payment p
        JOIN rental r ON p.RentalID = r.RentalID
        JOIN user u ON r.CustomerID = u.UserID
        JOIN bike b ON r.BikeID = b.BikeID
        LEFT JOIN location l ON b.LocationID = l.LocationID
        WHERE r.RentalID = ?
      `;
      params = [rentalID];
    } else if (customerID) {
      query = `
        SELECT 
          p.PaymentID, p.RentalID, p.PaymentDate, p.Amount, p.PaymentMethod, p.TransactionID,
          r.CustomerID, r.BikeID, r.RentalStart, r.ExpectedReturn, r.RentalEnd, r.TotalCost, r.PaymentStatus,
          u.FirstName, u.LastName, u.Email, u.PhoneNumber, u.LoyaltyPoints,
          b.BikeSerialNumber, b.Model, b.BikeType, b.bike_image, b.RentalRatePerMinute,
          l.LocationName, l.Address, l.City
        FROM payment p
        JOIN rental r ON p.RentalID = r.RentalID
        JOIN user u ON r.CustomerID = u.UserID
        JOIN bike b ON r.BikeID = b.BikeID
        LEFT JOIN location l ON b.LocationID = l.LocationID
        WHERE r.CustomerID = ?
        ORDER BY p.PaymentDate DESC
      `;
      params = [customerID];
    } else {
      return NextResponse.json({
        success: false,
        error: 'Please provide rentalID, transactionID, or customerID'
      }, { status: 400 });
    }

    const result = await executeQuery(prisma, query, params);

    return NextResponse.json({
      success: true,
      receipts: result.data || []
    });

  } catch (error) {
    console.error('Get receipt error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  } finally {
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      console.error('Error disconnecting Prisma:', disconnectError);
    }
  }
}