// User Authentication API
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/app/generated/prisma';
import { userQueries, sessionQueries, executeQuery, executeInsertQuery } from '@/lib/queries';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

// User Registration
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nationalId, firstName, lastName, email, phoneNumber, password, dateOfBirth } = body;

    // Validate required fields
    if (!nationalId || !firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await executeQuery(
      prisma,
      userQueries.getUserByEmail,
      [email]
    );

    if (existingUser.success && existingUser.data && existingUser.data.length > 0) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create new user
    const result = await executeInsertQuery(
      prisma,
      userQueries.createUser,
      [nationalId, firstName, lastName, email, phoneNumber, passwordHash, dateOfBirth]
    );

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      userId: result.insertId
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// User Login
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Get user by email
    const userResult = await executeQuery(
      prisma,
      userQueries.getUserByEmail,
      [email]
    );

    if (!userResult.success || !userResult.data || userResult.data.length === 0) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const user = userResult.data[0];

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.PasswordHash);
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create session
    const sessionId = uuidv4();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24 hour session

    const userAgent = request.headers.get('user-agent') || '';
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';

    await executeQuery(
      prisma,
      sessionQueries.createSession,
      [sessionId, user.UserID, expiresAt, userAgent, ipAddress]
    );

    // Return user data (without password hash)
    const { PasswordHash, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      session: {
        sessionId,
        expiresAt
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Failed to login' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}