import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeInsertQuery } from '@/lib/queries';
import { PrismaClient } from '@/app/generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phoneNumber, role, password, locationID } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate role
    if (!['Staff', 'Administrator'].includes(role)) {
      return NextResponse.json(
        { success: false, message: 'Invalid role specified' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUserQuery = `
      SELECT UserID FROM user WHERE Email = ?
    `;
    const existingUserResult = await executeQuery(prisma, existingUserQuery, [email]);
    
    if (!existingUserResult.success) {
      throw new Error('Failed to check existing user');
    }

    if (existingUserResult.data && existingUserResult.data.length > 0) {
      return NextResponse.json(
        { success: false, message: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new staff member (Note: AssignedLocationID not available in current schema)
    const insertQuery = `
      INSERT INTO user (
        NationalID,
        FirstName, 
        LastName, 
        Email, 
        PhoneNumber, 
        PasswordHash, 
        Role, 
        DateHired,
        RegistrationDate
      ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    // Generate a shorter temporary NationalID since it's required but we don't collect it
    // Format: STF + 6 random digits (total 9 characters, well under 20 char limit)
    const tempNationalID = `STF${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;

    const values = [
      tempNationalID,
      firstName,
      lastName,
      email,
      phoneNumber || null,
      hashedPassword,
      role
    ];

    const result = await executeInsertQuery(prisma, insertQuery, values);

    if (!result.success) {
      console.error('Database insert failed:', result.error);
      return NextResponse.json(
        { 
          success: false, 
          message: result.error || 'Database insert failed'
        },
        { status: 500 }
      );
    }

    if (result.insertId) {
      return NextResponse.json({
        success: true,
        message: 'Staff member added successfully',
        userId: Number(result.insertId)
      });
    } else {
      throw new Error('Failed to get insert ID');
    }

  } catch (error) {
    console.error('Error adding staff member:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        error: 'Failed to add staff member'
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