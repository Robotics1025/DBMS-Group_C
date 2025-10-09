# Bike Rental System - Database Queries & API Documentation

## Overview

This system provides a centralized approach to database operations using raw SQL queries with Prisma. All queries are organized in `/lib/queries.ts` and can be used across your API routes.

## 🏗️ Architecture

```
lib/
├── queries.ts          # Centralized SQL queries
app/api/
├── bikes/             # Bike management endpoints
├── auth/              # Authentication endpoints  
├── rentals/           # Rental management endpoints
├── payments/          # Payment processing endpoints
├── analytics/         # Dashboard & reporting endpoints
├── locations/         # Station management endpoints
└── maintenance/       # Bike maintenance endpoints
```

## 🔧 Setup & Installation

### 1. Install Dependencies

```bash
npm install @prisma/client bcryptjs uuid
npm install -D @types/bcryptjs @types/uuid
```

### 2. Configure Environment Variables

```env
# .env.local
DATABASE_URL="mysql://username:password@localhost:3306/bike_rental_db"
NEXTAUTH_SECRET="your-secret-key"
```

### 3. Generate Prisma Client

```bash
npx prisma generate
```

## 📚 Query Categories

### 🔐 User Management (`userQueries`)

- **createUser**: Register new customers
- **getUserByEmail**: Login authentication
- **getUserById**: Get user profile
- **updateUserProfile**: Update user information
- **updateLoyaltyPoints**: Loyalty system integration
- **getCustomersWithStats**: Customer analytics
- **getStaffMembers**: Staff management

### 🚴 Bike Management (`bikeQueries`)

- **getAvailableBikes**: Display rental inventory
- **getBikeById**: Bike details page
- **searchBikes**: Filter by type/location
- **addBike**: Add new bikes to fleet
- **updateBikeStatus**: Rental status tracking
- **updateBikeLocation**: Station transfers
- **getBikesNeedingMaintenance**: Maintenance scheduling
- **getBikeRentalHistory**: Bike usage history

### 📍 Location Management (`locationQueries`)

- **getLocationsWithBikeCounts**: Station overview
- **getLocationById**: Station details
- **addLocation**: New station setup
- **updateLocation**: Station information updates

### 🏁 Rental Operations (`rentalQueries`)

- **createRental**: Start new rental
- **getActiveRentals**: Current customer rentals
- **completeRental**: Return bike process
- **getRentalHistory**: Customer rental history
- **getAllActiveRentals**: Admin rental monitoring
- **getRentalById**: Rental details
- **calculateRentalCost**: Pricing with promos

### 💳 Payment Processing (`paymentQueries`)

- **createPayment**: Process payments
- **getPaymentByRentalId**: Rental payment lookup
- **getPaymentHistory**: Customer payment history
- **getDailyRevenue**: Revenue analytics
- **getPaymentMethodsStats**: Payment method analysis

### 🎯 Promo Codes (`promoQueries`)

- **getValidPromo**: Validate promo codes
- **getAllPromos**: Promo management
- **createPromo**: New promo campaigns
- **updatePromo**: Promo modifications

### 🔧 Maintenance (`maintenanceQueries`)

- **addMaintenance**: Record maintenance
- **getMaintenanceHistory**: Bike maintenance log
- **getRecentMaintenance**: Recent maintenance overview
- **getMaintenanceCosts**: Maintenance cost analysis

### 📊 Analytics (`analyticsQueries`)

- **getDashboardStats**: Key metrics overview
- **getPopularBikeTypes**: Popular bike analysis
- **getPeakUsageHours**: Usage pattern analysis
- **getLocationPerformance**: Station performance
- **getCustomerLoyalty**: Customer segmentation

## 🚀 Usage Examples

### Basic Query Execution

```typescript
import { PrismaClient } from '@/app/generated/prisma';
import { bikeQueries, executeQuery } from '@/lib/queries';

const prisma = new PrismaClient();

// Get all available bikes
const result = await executeQuery(prisma, bikeQueries.getAvailableBikes);

if (result.success) {
  console.log('Available bikes:', result.data);
  console.log('Total count:', result.rowCount);
} else {
  console.error('Query failed:', result.error);
}
```

### Parameterized Queries

```typescript
// Get bike by ID
const bikeId = 123;
const result = await executeQuery(
  prisma, 
  bikeQueries.getBikeById, 
  [bikeId]
);

// Search bikes with filters
const result2 = await executeQuery(
  prisma,
  bikeQueries.searchBikes,
  ['Mountain', 'Mountain', 5, 5] // bikeType, bikeType, locationId, locationId
);
```

### Insert Operations

```typescript
import { executeInsertQuery } from '@/lib/queries';

// Create new user
const result = await executeInsertQuery(
  prisma,
  userQueries.createUser,
  ['ID123', 'John', 'Doe', 'john@example.com', '+256700123456', 'hashedPassword', '1990-01-01']
);

if (result.success) {
  console.log('New user ID:', result.insertId);
}
```

## 🔌 API Route Integration

### Complete API Route Example

```typescript
// app/api/bikes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/app/generated/prisma';
import { bikeQueries, executeQuery } from '@/lib/queries';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const location = searchParams.get('location');

    let result;
    if (type || location) {
      result = await executeQuery(
        prisma, 
        bikeQueries.searchBikes, 
        [type, type, location, location]
      );
    } else {
      result = await executeQuery(prisma, bikeQueries.getAvailableBikes);
    }

    return NextResponse.json({
      success: result.success,
      data: result.data,
      error: result.error
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
```

## 🔄 Frontend Integration

### React Hook Example

```typescript
// hooks/useBikes.ts
import { useState, useEffect } from 'react';

interface Bike {
  BikeID: number;
  BikeSerialNumber: string;
  Model: string;
  BikeType: string;
  RentalRatePerMinute: number;
  LocationName: string;
}

export const useBikes = (filters?: { type?: string; location?: string }) => {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (filters?.type) params.append('type', filters.type);
        if (filters?.location) params.append('location', filters.location);

        const response = await fetch(`/api/bikes?${params.toString()}`);
        const data = await response.json();

        if (data.success) {
          setBikes(data.data);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError('Failed to fetch bikes');
      } finally {
        setLoading(false);
      }
    };

    fetchBikes();
  }, [filters?.type, filters?.location]);

  return { bikes, loading, error };
};
```

### Usage in Component

```typescript
// components/BikeList.tsx
import { useBikes } from '@/hooks/useBikes';

export default function BikeList() {
  const { bikes, loading, error } = useBikes();

  if (loading) return <div>Loading bikes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bikes.map(bike => (
        <div key={bike.BikeID} className="border rounded-lg p-4">
          <h3 className="font-bold">{bike.Model}</h3>
          <p className="text-gray-600">{bike.BikeType}</p>
          <p className="text-sm">Location: {bike.LocationName}</p>
          <p className="text-lg font-semibold">
            ${bike.RentalRatePerMinute}/minute
          </p>
        </div>
      ))}
    </div>
  );
}
```

## 🔒 Security Best Practices

### 1. Input Validation

```typescript
// Validate and sanitize inputs
const validateBikeInput = (data: any) => {
  const { bikeSerialNumber, model, bikeType, rentalRatePerMinute, locationId } = data;
  
  if (!bikeSerialNumber || typeof bikeSerialNumber !== 'string') {
    throw new Error('Invalid bike serial number');
  }
  
  if (!bikeType || !['Mountain', 'Road', 'Electric', 'Hybrid'].includes(bikeType)) {
    throw new Error('Invalid bike type');
  }
  
  if (!rentalRatePerMinute || rentalRatePerMinute <= 0) {
    throw new Error('Invalid rental rate');
  }
  
  return { bikeSerialNumber, model, bikeType, rentalRatePerMinute, locationId };
};
```

### 2. Error Handling

```typescript
const handleDatabaseOperation = async (operation: () => Promise<any>) => {
  try {
    return await operation();
  } catch (error) {
    console.error('Database operation failed:', error);
    
    // Don't expose internal errors to client
    if (error instanceof Error) {
      if (error.message.includes('Duplicate entry')) {
        throw new Error('Record already exists');
      }
      if (error.message.includes('Foreign key constraint')) {
        throw new Error('Invalid reference');
      }
    }
    
    throw new Error('Database operation failed');
  }
};
```

### 3. Authentication Middleware

```typescript
// middleware/auth.ts
import { executeQuery } from '@/lib/queries';
import { sessionQueries } from '@/lib/queries';

export const authenticateSession = async (sessionId: string) => {
  const result = await executeQuery(
    prisma,
    sessionQueries.getActiveSession,
    [sessionId]
  );

  if (!result.success || !result.data || result.data.length === 0) {
    throw new Error('Invalid session');
  }

  return result.data[0];
};
```

## 📈 Performance Optimization

### 1. Connection Pooling

```typescript
// lib/prisma.ts
import { PrismaClient } from '@/app/generated/prisma';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

### 2. Query Optimization

- Use indexes on frequently queried columns
- Limit result sets with LIMIT clauses
- Use appropriate JOINs instead of multiple queries
- Cache frequently accessed data

### 3. Batch Operations

```typescript
// Process multiple operations in a transaction
const batchRentals = async (rentals: Array<RentalData>) => {
  return await prisma.$transaction(async (tx) => {
    const results = [];
    
    for (const rental of rentals) {
      const result = await executeQuery(tx, rentalQueries.createRental, [
        rental.customerId,
        rental.bikeId,
        rental.rentalStart,
        rental.expectedReturn,
        rental.promoId
      ]);
      
      results.push(result);
    }
    
    return results;
  });
};
```

## 🚨 Error Codes & Troubleshooting

### Common Error Scenarios

| Error | Cause | Solution |
|-------|-------|----------|
| `Duplicate entry` | Unique constraint violation | Check for existing records |
| `Foreign key constraint` | Invalid reference ID | Validate referenced IDs exist |
| `Data too long` | String exceeds column length | Validate input lengths |
| `Cannot be null` | Required field missing | Validate required fields |

### Debug Mode

```typescript
// Enable query logging in development
if (process.env.NODE_ENV === 'development') {
  prisma.$on('query', (e) => {
    console.log('Query:', e.query);
    console.log('Params:', e.params);
    console.log('Duration:', e.duration, 'ms');
  });
}
```

## 📋 Testing

### Unit Test Example

```typescript
// tests/queries.test.ts
import { PrismaClient } from '@/app/generated/prisma';
import { bikeQueries, executeQuery } from '@/lib/queries';

describe('Bike Queries', () => {
  let prisma: PrismaClient;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('should fetch available bikes', async () => {
    const result = await executeQuery(prisma, bikeQueries.getAvailableBikes);
    
    expect(result.success).toBe(true);
    expect(Array.isArray(result.data)).toBe(true);
  });

  test('should get bike by ID', async () => {
    const bikeId = 1;
    const result = await executeQuery(prisma, bikeQueries.getBikeById, [bikeId]);
    
    expect(result.success).toBe(true);
    if (result.data && result.data.length > 0) {
      expect(result.data[0].BikeID).toBe(bikeId);
    }
  });
});
```

This comprehensive system provides a robust foundation for your bike rental application with proper error handling, security measures, and scalability considerations.