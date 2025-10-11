# Schema Migration Guide: bikerent → BikeRentalDB

## 📋 Overview

This document explains the differences between the original `bikerent` database and the new `BikeRentalDB` schema with triggers.

---

## 🔄 Key Changes

### **Database Name**
- **Old:** `bikerent` (lowercase)
- **New:** `BikeRentalDB` (PascalCase)

### **Table Names**
- **Old:** lowercase (user, bike, rental, etc.)
- **New:** PascalCase (User, Bike, Rental, etc.)

### **New Features**
✅ **6 Automated Triggers** for business logic
✅ **Enhanced User table** with DateHired and RegistrationDate
✅ **bike_image column** in Bike table
✅ **Comprehensive indexes** for better performance

---

## 📊 Detailed Comparison

### **1. User Table**

| Feature | Old Schema | New Schema |
|---------|-----------|------------|
| Table Name | `user` | `User` |
| DateHired | ❌ Not present | ✅ For Staff/Admin |
| RegistrationDate | ❌ Not present | ✅ Default CURRENT_TIMESTAMP |
| Indexes | Email, Role, NationalID | Email, Role, NationalID |

**Migration Impact:** No data loss, new columns are optional

---

### **2. UserSession Table**

| Feature | Old Schema | New Schema |
|---------|-----------|------------|
| Table Name | `usersession` | `UserSession` |
| Indexes | UserID, ExpiresAt | UserID, ExpiresAt, IsActive |
| Changes | - | Added IsActive index |

---

### **3. Location Table**

| Feature | Old Schema | New Schema |
|---------|-----------|------------|
| Table Name | `location` | `Location` |
| Schema | Identical | Identical |

**No changes**

---

### **4. Bike Table**

| Feature | Old Schema | New Schema |
|---------|-----------|------------|
| Table Name | `bike` | `Bike` |
| bike_image | ✅ Present | ✅ Present |
| Indexes | SerialNumber, Status, Location, BikeType | Same |

**No changes** (bike_image already added via migration 003)

---

### **5. Promo Table**

| Feature | Old Schema | New Schema |
|---------|-----------|------------|
| Table Name | `promo` | `Promo` |
| Schema | Identical | Identical |

**No changes**

---

### **6. Rental Table**

| Feature | Old Schema | New Schema |
|---------|-----------|------------|
| Table Name | `rental` | `Rental` |
| RentalStart | Default CURRENT_TIMESTAMP | Default CURRENT_TIMESTAMP |
| Schema | Identical | Identical |

**No changes**

---

### **7. Payment Table**

| Feature | Old Schema | New Schema |
|---------|-----------|------------|
| Table Name | `payment` | `Payment` |
| Schema | Identical | Identical |

**No changes**

---

### **8. Feedback Table**

| Feature | Old Schema | New Schema |
|---------|-----------|------------|
| Table Name | `feedback` | `Feedback` |
| Schema | Identical | Identical |

**No changes**

---

### **9. Maintenance Table**

| Feature | Old Schema | New Schema |
|---------|-----------|------------|
| Table Name | `maintenance` | `Maintenance` |
| Schema | Identical | Identical |

**No changes**

---

### **10. BikeMovement Table**

| Feature | Old Schema | New Schema |
|---------|-----------|------------|
| Table Name | `bikemovement` | `BikeMovement` |
| Schema | Identical | Identical |

**No changes**

---

## 🔧 NEW: Automated Triggers

The **BikeRentalDB** schema includes 6 triggers that automate business logic:

### **1. trg_RentalStart_UpdateBikeStatus**
```sql
AFTER INSERT ON Rental
-- Automatically sets bike status to 'Rented' when rental starts
```

### **2. trg_RentalEnd_UpdateBikeStatus**
```sql
AFTER UPDATE ON Rental
-- Sets bike status to 'Available' when rental ends (RentalEnd is set)
```

### **3. trg_RentalCancelled_UpdateBikeStatus**
```sql
AFTER UPDATE ON Rental
-- Sets bike status to 'Available' when PaymentStatus = 'Cancelled'
```

### **4. trg_Maintenance_UpdateBikeStatus**
```sql
AFTER INSERT ON Maintenance
-- Sets bike status to 'In Maintenance' and updates LastMaintenanceDate
```

### **5. trg_CalculateRentalCost** ⭐ (Most Complex)
```sql
BEFORE UPDATE ON Rental
-- When RentalEnd is set:
--   1. Calculates rental duration in minutes
--   2. Applies base rate (RentalRatePerMinute)
--   3. Applies promo discount if PromoID exists
--   4. Adds late fee (50% extra) if returned late
--   5. Updates TotalCost
--   6. Awards loyalty points (1 point per 10 currency units)
```

### **6. trg_UpdateBikeLocation**
```sql
AFTER INSERT ON BikeMovement
-- Updates bike's LocationID when moved between stations
```

---

## 📈 Benefits of New Schema

### **1. Automation**
- ✅ No manual bike status updates needed
- ✅ Automatic cost calculation with discounts and late fees
- ✅ Automatic loyalty points
- ✅ Automatic location tracking

### **2. Data Integrity**
- ✅ Triggers ensure consistency
- ✅ Status always reflects actual state
- ✅ Costs calculated uniformly

### **3. Business Logic**
- ✅ Late fee calculation (50% extra per minute late)
- ✅ Promo code discounts applied automatically
- ✅ Loyalty rewards (1 point per 10 currency units)

### **4. Developer Experience**
- ✅ Less code in application layer
- ✅ Database handles business rules
- ✅ Consistent behavior across all API endpoints

---

## 🔀 Migration Path

### **Option A: Fresh Install (Recommended)**

Best for new projects or testing:

1. Drop old database: `DROP DATABASE bikerent;`
2. Run: `.\setup_BikeRentalDB.ps1` or `./setup_BikeRentalDB.sh`
3. Update `.env`: `DATABASE_URL="mysql://user:pass@localhost:3306/BikeRentalDB"`
4. Generate Prisma: `npx prisma generate`

### **Option B: Keep Both Databases**

For testing/comparison:

1. Keep `bikerent` as-is
2. Create `BikeRentalDB` separately
3. Switch between them by changing `.env`

### **Option C: Migrate Existing Data**

If you have production data in `bikerent`:

```sql
-- 1. Backup old database
mysqldump -u root -p bikerent > backup_bikerent.sql

-- 2. Create new schema
mysql -u root -p < 001_create_database_schema_with_triggers.sql

-- 3. Migrate data (table by table)
INSERT INTO BikeRentalDB.Location 
SELECT * FROM bikerent.location;

INSERT INTO BikeRentalDB.User 
SELECT 
    UserID, NationalID, FirstName, LastName, Email, PhoneNumber,
    PasswordHash, DateOfBirth, Role,
    NULL AS DateHired,  -- New column
    RegistrationDate,
    LoyaltyPoints
FROM bikerent.user;

-- Repeat for other tables...

-- 4. Verify data
USE BikeRentalDB;
SELECT COUNT(*) FROM User;
```

---

## ⚙️ Application Code Changes

### **Database Connection (.env)**

```env
# Old
DATABASE_URL="mysql://root:password@localhost:3306/bikerent"

# New
DATABASE_URL="mysql://root:password@localhost:3306/BikeRentalDB"
```

### **Prisma Schema**

```prisma
// Old
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

// New - Same, but pull from BikeRentalDB
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

After changing DATABASE_URL:
```bash
npx prisma db pull
npx prisma generate
```

### **API Code Changes**

**Good news:** Most API code remains the same!

The triggers handle business logic automatically:

```typescript
// OLD: Manual status update
await prisma.rental.create({ data: rentalData });
await prisma.bike.update({
  where: { BikeID: bikeId },
  data: { CurrentStatus: 'Rented' }
});

// NEW: Trigger handles it automatically
await prisma.rental.create({ data: rentalData });
// Status automatically updated by trg_RentalStart_UpdateBikeStatus
```

```typescript
// OLD: Manual cost calculation
const minutes = calculateMinutes(start, end);
const cost = minutes * rate;
const discount = applyPromo(cost, promoCode);
const total = cost - discount;
await prisma.rental.update({
  where: { RentalID: id },
  data: { TotalCost: total }
});

// NEW: Trigger calculates automatically
await prisma.rental.update({
  where: { RentalID: id },
  data: { RentalEnd: new Date() }
});
// TotalCost calculated by trg_CalculateRentalCost
// Loyalty points also awarded automatically
```

---

## 🧪 Testing Triggers

### **Test 1: Rental Start**

```sql
-- Create a rental
INSERT INTO Rental (CustomerID, BikeID, RentalStart, ExpectedReturn)
VALUES (1, 1, NOW(), DATE_ADD(NOW(), INTERVAL 2 HOUR));

-- Check bike status (should be 'Rented')
SELECT CurrentStatus FROM Bike WHERE BikeID = 1;
-- Expected: 'Rented'
```

### **Test 2: Rental End with Cost Calculation**

```sql
-- End the rental
UPDATE Rental 
SET RentalEnd = DATE_ADD(RentalStart, INTERVAL 105 MINUTE)
WHERE RentalID = 1;

-- Check cost calculation
SELECT TotalCost FROM Rental WHERE RentalID = 1;
-- Expected: 105 minutes * rate (should be calculated)

-- Check bike status
SELECT CurrentStatus FROM Bike WHERE BikeID = 1;
-- Expected: 'Available'

-- Check loyalty points
SELECT LoyaltyPoints FROM User WHERE UserID = 1;
-- Expected: Previous points + FLOOR(TotalCost/10)
```

### **Test 3: Late Return Fee**

```sql
-- Create rental expected to return in 1 hour
INSERT INTO Rental (CustomerID, BikeID, RentalStart, ExpectedReturn)
VALUES (2, 2, NOW(), DATE_ADD(NOW(), INTERVAL 1 HOUR));

-- Return 30 minutes late
UPDATE Rental 
SET RentalEnd = DATE_ADD(RentalStart, INTERVAL 90 MINUTE)
WHERE RentalID = 2;

-- Check if late fee applied
-- TotalCost should be: (60 min * rate) + (30 min * rate * 1.5)
SELECT TotalCost FROM Rental WHERE RentalID = 2;
```

### **Test 4: Promo Code Discount**

```sql
-- Create rental with promo
INSERT INTO Rental (CustomerID, BikeID, RentalStart, ExpectedReturn, PromoID)
VALUES (3, 3, NOW(), DATE_ADD(NOW(), INTERVAL 2 HOUR), 1);

-- End rental
UPDATE Rental 
SET RentalEnd = DATE_ADD(RentalStart, INTERVAL 120 MINUTE)
WHERE RentalID = 3;

-- Check discounted cost
-- TotalCost should be: (120 min * rate) * (1 - discount%)
SELECT TotalCost, PromoID FROM Rental WHERE RentalID = 3;
```

---

## 🔍 Verification Checklist

After migration, verify:

- [ ] All 10 tables created
- [ ] All 6 triggers created
- [ ] Sample data loaded (if using 002 script)
- [ ] Triggers work correctly (test rentals)
- [ ] Application connects successfully
- [ ] Prisma client generated
- [ ] Login works with sample credentials
- [ ] Bike rental flow works
- [ ] Cost calculations correct
- [ ] Loyalty points awarded

---

## 📚 Quick Reference

### **Check What You Have**

```sql
-- Current database
SELECT DATABASE();

-- List all tables
SHOW TABLES;

-- List all triggers
SHOW TRIGGERS;

-- Count records
SELECT 
    (SELECT COUNT(*) FROM User) AS Users,
    (SELECT COUNT(*) FROM Bike) AS Bikes,
    (SELECT COUNT(*) FROM Rental) AS Rentals;
```

### **Switch Between Schemas**

```bash
# Use old schema
export DATABASE_URL="mysql://root:pass@localhost:3306/bikerent"
npx prisma generate

# Use new schema
export DATABASE_URL="mysql://root:pass@localhost:3306/BikeRentalDB"
npx prisma generate
```

---

## 🎯 Recommendation

**Use BikeRentalDB** for:
- ✅ New projects
- ✅ Development/testing environments
- ✅ Projects needing automated business logic
- ✅ Projects with complex rental calculations

**Keep bikerent** if:
- ⚠️ You have production data that's hard to migrate
- ⚠️ You prefer manual control over business logic
- ⚠️ You're making a gradual transition

---

**Last Updated:** October 10, 2025  
**Author:** BikeRent Development Team
