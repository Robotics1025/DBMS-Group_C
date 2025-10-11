# BikeRentalDB - Complete Database Setup Guide

## 📋 Overview

This folder contains all the necessary files to set up the **BikeRentalDB** database with complete schema, sample data, triggers, and automated scripts.

## 🗂️ Files in This Folder

```
migrations/
├── 001_create_database_schema_with_triggers.sql  # Complete schema + 6 triggers
├── 002_insert_sample_data_BikeRentalDB.sql       # Sample data for testing
├── setup_BikeRentalDB.ps1                        # Windows setup script
├── setup_BikeRentalDB.sh                         # Linux/Mac setup script
└── README_BikeRentalDB.md                        # This file
```

---

## 🚀 Quick Setup (Recommended)

### **Option 1: Windows (PowerShell)**

```powershell
cd database/migrations
.\setup_BikeRentalDB.ps1
```

### **Option 2: Linux/Mac (Bash)**

```bash
cd database/migrations
chmod +x setup_BikeRentalDB.sh
./setup_BikeRentalDB.sh
```

The script will:
- ✅ Check MySQL installation
- ✅ Test database connection
- ✅ Create BikeRentalDB database
- ✅ Create 10 tables with indexes
- ✅ Create 6 automated triggers
- ✅ Insert sample data (50+ records)
- ✅ Verify installation

---

## 📊 Database Structure

### **10 Tables**

1. **User** - Customers, staff, and administrators
2. **UserSession** - Login session tracking
3. **Location** - Bike rental stations
4. **Bike** - Bike inventory
5. **Promo** - Promotional discount codes
6. **Rental** - Rental transactions
7. **Payment** - Payment records
8. **Feedback** - Customer reviews
9. **Maintenance** - Maintenance logs
10. **BikeMovement** - Bike relocations

### **6 Automated Triggers**

| Trigger | Function |
|---------|----------|
| `trg_RentalStart_UpdateBikeStatus` | Sets bike to 'Rented' when rental starts |
| `trg_RentalEnd_UpdateBikeStatus` | Sets bike to 'Available' when rental ends |
| `trg_RentalCancelled_UpdateBikeStatus` | Sets bike to 'Available' when cancelled |
| `trg_Maintenance_UpdateBikeStatus` | Sets bike to 'In Maintenance' |
| `trg_CalculateRentalCost` | Calculates total cost, applies discounts, late fees, updates loyalty points |
| `trg_UpdateBikeLocation` | Updates bike location after movement |

---

## 🗄️ Sample Data Included

After running the setup:

### **Locations (5)**
- Central Station (Kampala) - 50 bikes capacity
- University Hub (Kampala) - 40 bikes capacity
- Shopping Mall (Kampala) - 35 bikes capacity
- Airport Terminal (Entebbe) - 30 bikes capacity
- Beach Station (Entebbe) - 25 bikes capacity

### **Users (10)**
- **5 Customers:** john.doe@email.com, jane.smith@email.com, etc.
- **3 Staff:** michael.davis@bikerent.com, sarah.martinez@bikerent.com, james.anderson@bikerent.com
- **2 Admins:** admin@bikerent.com, superadmin@bikerent.com
- **Password for ALL:** `password123` ⚠️

### **Bikes (16)**
- 5 City Bikes (₦0.10-0.15/min)
- 7 Electric Bikes (₦0.24-0.30/min)
- 3 Hybrid Bikes (₦0.16-0.20/min)
- 2 Mountain Bikes (₦0.20-0.22/min)

### **Promo Codes (5)**
- `WELCOME10` - 10% off for new users
- `STUDENT15` - 15% off for students
- `WEEKEND20` - 20% off on weekends
- `FLASH25` - 25% off (limited time)
- `LOYALTY50` - 50% off for loyal customers

### **Sample Rentals**
- 3 completed rentals with payments
- 2 active ongoing rentals
- 3 customer reviews (4-5 stars)
- 4 maintenance records
- 4 bike movements between locations

---

## 🔧 Manual Setup (Alternative)

If you prefer manual setup:

### **Step 1: Create Schema**

```bash
mysql -u root -p < 001_create_database_schema_with_triggers.sql
```

### **Step 2: Insert Sample Data**

```bash
mysql -u root -p < 002_insert_sample_data_BikeRentalDB.sql
```

---

## ⚙️ Configuration

### **1. Update .env File**

After running setup, update your environment file:

```env
DATABASE_URL="mysql://username:password@localhost:3306/BikeRentalDB"
```

**Example:**
```env
DATABASE_URL="mysql://root:mypassword@localhost:3306/BikeRentalDB"
```

### **2. Generate Prisma Client**

```bash
npx prisma db pull
npx prisma generate
```

### **3. Start Development Server**

```bash
npm run dev
```

---

## 🔐 Test Login Credentials

Use these credentials to test the application:

| Role | Email | Password |
|------|-------|----------|
| Customer | john.doe@email.com | password123 |
| Customer | jane.smith@email.com | password123 |
| Staff | michael.davis@bikerent.com | password123 |
| Admin | admin@bikerent.com | password123 |

⚠️ **IMPORTANT:** Change all passwords before deploying to production!

---

## ✅ Verify Installation

### **Check Tables**

```sql
USE BikeRentalDB;
SHOW TABLES;
```

Expected output: 10 tables

### **Check Triggers**

```sql
SHOW TRIGGERS;
```

Expected output: 6 triggers

### **Check Sample Data**

```sql
SELECT 
    (SELECT COUNT(*) FROM User) AS Users,
    (SELECT COUNT(*) FROM Bike) AS Bikes,
    (SELECT COUNT(*) FROM Location) AS Locations,
    (SELECT COUNT(*) FROM Rental) AS Rentals;
```

### **List Available Bikes**

```sql
SELECT 
    b.BikeSerialNumber,
    b.Model,
    b.BikeType,
    l.LocationName,
    b.RentalRatePerMinute
FROM Bike b
JOIN Location l ON b.LocationID = l.LocationID
WHERE b.CurrentStatus = 'Available';
```

### **Check Active Rentals**

```sql
SELECT 
    CONCAT(u.FirstName, ' ', u.LastName) AS Customer,
    b.BikeSerialNumber,
    b.Model,
    r.RentalStart,
    r.ExpectedReturn
FROM Rental r
JOIN User u ON r.CustomerID = u.UserID
JOIN Bike b ON r.BikeID = b.BikeID
WHERE r.RentalEnd IS NULL;
```

---

## 🔄 Reset Database

**⚠️ WARNING: This deletes all data!**

```sql
DROP DATABASE IF EXISTS BikeRentalDB;
```

Then re-run the setup script.

---

## 📦 Backup & Restore

### **Create Full Backup**

```bash
mysqldump -u root -p BikeRentalDB > backup_BikeRentalDB_$(date +%Y%m%d).sql
```

### **Create Structure-Only Backup**

```bash
mysqldump -u root -p --no-data BikeRentalDB > structure_BikeRentalDB.sql
```

### **Restore from Backup**

```bash
mysql -u root -p BikeRentalDB < backup_BikeRentalDB_20251010.sql
```

---

## 🛠️ Troubleshooting

### **Problem: "Access denied for user"**

**Solution:** Check MySQL username and password

```bash
mysql -u your_username -p
```

### **Problem: "Database already exists"**

**Solution:** Either drop and recreate, or skip to data insertion

```sql
DROP DATABASE BikeRentalDB;
```

### **Problem: "Table already exists"**

**Solution:** The schema creation script uses `CREATE TABLE IF NOT EXISTS`, so this shouldn't happen. If it does, drop tables manually or recreate database.

### **Problem: Trigger creation fails**

**Solution:** Triggers use `DROP TRIGGER IF EXISTS` before creation. Check MySQL user has TRIGGER privilege:

```sql
GRANT TRIGGER ON BikeRentalDB.* TO 'your_user'@'localhost';
FLUSH PRIVILEGES;
```

### **Problem: Prisma errors after migration**

**Solution:** Pull schema and regenerate Prisma client

```bash
npx prisma db pull
npx prisma generate
```

### **Problem: Application can't connect**

**Solution:** 
1. Check `.env` file has correct DATABASE_URL
2. Verify MySQL is running: `mysql -u root -p`
3. Check firewall allows MySQL connections (port 3306)

---

## 🎯 Key Features

### **Automated Business Logic**

The triggers handle:
- ✅ Automatic bike status updates (Available ↔ Rented ↔ In Maintenance)
- ✅ Automatic rental cost calculation with:
  - Promo code discounts
  - Late return fees (50% extra)
  - Loyalty points (1 point per 10 currency units)
- ✅ Automatic location tracking during bike movements

### **Data Integrity**

- Foreign key constraints maintain referential integrity
- Enum types enforce valid status values
- Check constraints validate ratings (1-5)
- Unique constraints prevent duplicates

### **Performance Optimization**

- Indexes on frequently queried columns
- Composite indexes for multi-column queries
- Efficient JOIN operations

---

## 📚 Related Files

- **Prisma Schema:** `../../prisma/schema.prisma`
- **API Routes:** `../../app/api/**`
- **Environment Config:** `../../.env`

---

## 🚀 What's Next?

After setting up the database:

1. ✅ Configure `.env` with DATABASE_URL
2. ✅ Generate Prisma client
3. ✅ Start development server
4. ✅ Test login with sample credentials
5. ✅ Test bike rental flow
6. ✅ Test receipt generation
7. ✅ Change default passwords
8. ✅ Deploy to production

---

## 📞 Support

If you encounter issues:

1. Check this troubleshooting section
2. Verify MySQL is running: `mysql -u root -p`
3. Check error logs
4. Ensure all migration files are in the same folder
5. Try manual setup instead of automated script

---

## 📄 License

This database schema is part of the BikeRent application.

---

**Last Updated:** October 10, 2025  
**Database Version:** BikeRentalDB v1.0  
**Compatible with:** MySQL 8.0+
