# BikeRent Database

Complete database setup and migration files for the BikeRent application.

## 📁 Directory Structure

```
database/
├── migrations/
│   ├── 001_create_database_schema.sql    # Creates all tables and schema
│   ├── 002_insert_sample_data.sql        # Inserts sample/test data
│   ├── 003_alter_schema.sql              # Schema updates and alterations
│   ├── setup.ps1                         # Automated setup (Windows)
│   ├── setup.sh                          # Automated setup (Linux/Mac)
│   └── README.md                         # Detailed migration guide
└── README.md                             # This file
```

---

## 🚀 Quick Setup

### Automated Setup (Recommended)

**Windows PowerShell:**
```powershell
cd database/migrations
.\setup.ps1
```

**Linux/Mac:**
```bash
cd database/migrations
chmod +x setup.sh
./setup.sh
```

The script will:
- ✅ Test MySQL connection
- ✅ Create database and tables
- ✅ Insert sample data
- ✅ Apply schema updates
- ✅ Verify installation

---

### Manual Setup

**1. Create Schema:**
```bash
mysql -u root -p < migrations/001_create_database_schema.sql
```

**2. Insert Sample Data:**
```bash
mysql -u root -p < migrations/002_insert_sample_data.sql
```

**3. Apply Updates:**
```bash
mysql -u root -p < migrations/003_alter_schema.sql
```

---

## 📊 Database Schema

### Tables

| Table | Description | Records (Sample) |
|-------|-------------|------------------|
| `location` | Bike rental stations | 5 |
| `user` | Customers, staff, admins | 10 |
| `usersession` | Login sessions | 0 |
| `bike` | Bike inventory | 16 |
| `promo` | Discount codes | 5 |
| `rental` | Rental transactions | 5 |
| `payment` | Payment records | 3 |
| `feedback` | Customer reviews | 3 |
| `maintenance` | Maintenance logs | 4 |
| `bikemovement` | Bike transfers | 4 |

### Entity Relationship

```
┌─────────┐       ┌──────┐       ┌────────┐
│ User    │──────>│Rental│<──────│ Bike   │
│(Customer)│      └──────┘       └────────┘
└─────────┘          │               │
                     │               │
                     ▼               ▼
                ┌────────┐      ┌──────────┐
                │Payment │      │Maintenance│
                └────────┘      └──────────┘
                     │
                     ▼
                ┌────────┐
                │Feedback│
                └────────┘
```

---

## 🔐 Sample Credentials

After running migrations with sample data:

**Customer Account:**
- Email: `john.doe@email.com`
- Password: `password123`
- Loyalty Points: 150

**Staff Account:**
- Email: `michael.davis@bikerent.com`
- Password: `password123`

**Admin Account:**
- Email: `admin@bikerent.com`
- Password: `password123`

⚠️ **Change these in production!**

---

## 🔧 Configuration

### Update `.env` File

After setup, update your environment file:

```env
DATABASE_URL="mysql://username:password@localhost:3306/bikerent"
```

**Example:**
```env
DATABASE_URL="mysql://root:mypassword@localhost:3306/bikerent"
```

### Generate Prisma Client

```bash
npx prisma generate
```

---

## 📋 Sample Data Overview

### Locations (5)
- Central Station (Kampala) - 50 bikes capacity
- University Hub (Kampala) - 40 bikes capacity
- Shopping Mall (Kampala) - 35 bikes capacity
- Airport Terminal (Entebbe) - 30 bikes capacity
- Beach Station (Entebbe) - 25 bikes capacity

### Bikes (16)
- **City Bikes:** 5 bikes (₦0.10-0.15/min)
- **Electric Bikes:** 7 bikes (₦0.24-0.30/min)
- **Hybrid Bikes:** 3 bikes (₦0.16-0.18/min)
- **Mountain Bikes:** 2 bikes (₦0.20-0.22/min)

### Promo Codes (5)
- `WELCOME10` - 10% off for new users
- `STUDENT15` - 15% off for students
- `WEEKEND20` - 20% off on weekends
- `FLASH25` - 25% off (limited time)
- `LOYALTY50` - 50% off for loyal customers

### Rentals
- 3 completed rentals with payments
- 2 active rentals (currently ongoing)

---

## 🛠️ Common Tasks

### View All Tables
```sql
USE bikerent;
SHOW TABLES;
```

### Count Records
```sql
SELECT 
    (SELECT COUNT(*) FROM location) AS Locations,
    (SELECT COUNT(*) FROM user) AS Users,
    (SELECT COUNT(*) FROM bike) AS Bikes;
```

### List Available Bikes
```sql
SELECT 
    b.BikeSerialNumber, 
    b.Model, 
    b.BikeType, 
    l.LocationName 
FROM bike b
JOIN location l ON b.LocationID = l.LocationID
WHERE b.CurrentStatus = 'Available';
```

### Check Active Rentals
```sql
SELECT 
    r.RentalID,
    CONCAT(u.FirstName, ' ', u.LastName) AS Customer,
    b.BikeSerialNumber,
    b.Model,
    r.RentalStart,
    r.ExpectedReturn
FROM rental r
JOIN user u ON r.CustomerID = u.UserID
JOIN bike b ON r.BikeID = b.BikeID
WHERE r.RentalEnd IS NULL;
```

---

## 🔄 Reset Database

**⚠️ WARNING: This deletes all data!**

```sql
DROP DATABASE IF EXISTS bikerent;
```

Then re-run setup scripts.

---

## 📦 Backup & Restore

### Create Backup
```bash
# Full backup
mysqldump -u root -p bikerent > backup_$(date +%Y%m%d).sql

# Structure only
mysqldump -u root -p --no-data bikerent > structure.sql

# Data only
mysqldump -u root -p --no-create-info bikerent > data.sql
```

### Restore Backup
```bash
mysql -u root -p bikerent < backup_20251010.sql
```

---

## 📚 Documentation

For detailed information, see:
- [Migration README](migrations/README.md) - Complete migration guide
- [Prisma Schema](../prisma/schema.prisma) - TypeScript schema definition
- [SQL Queries](../lib/queries.ts) - Application query library

---

## ✅ Verification Checklist

Before starting development:

- [ ] MySQL installed and running
- [ ] All migrations executed without errors
- [ ] Sample data loaded successfully
- [ ] `.env` configured with correct DATABASE_URL
- [ ] Prisma client generated
- [ ] Can login with sample credentials
- [ ] Application starts without database errors

---

## 🆘 Troubleshooting

### "Access denied for user"
**Fix:** Check MySQL username and password
```bash
mysql -u your_username -p
```

### "Database does not exist"
**Fix:** Run `001_create_database_schema.sql` first

### "Table already exists"
**Fix:** Either drop database and start fresh, or skip to next migration

### Prisma errors after migration
**Fix:** Regenerate Prisma client
```bash
npx prisma db pull
npx prisma generate
```

### Cannot connect from application
**Fix:** Check `.env` file DATABASE_URL format:
```
mysql://username:password@host:port/database
```

---

## 🔗 Related Files

- `../prisma/schema.prisma` - Prisma schema definition
- `../lib/queries.ts` - SQL query definitions
- `../.env` - Database connection string
- `../app/api/**` - API routes using database

---

## 📞 Support

If you encounter issues:

1. Check [Migration README](migrations/README.md) troubleshooting section
2. Verify MySQL service is running
3. Test connection: `mysql -u root -p`
4. Check error logs
5. Ensure proper file permissions on scripts

---

Last Updated: October 10, 2025
