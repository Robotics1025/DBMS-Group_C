# 🚀 Quick Start - BikeRentalDB Setup

> **⏱️ Total Time: 5 minutes**  
> Get your BikeRent database up and running in 3 simple steps!

---

## ✅ Prerequisites (1 minute)

Make sure you have:
- ✅ MySQL 8.0+ installed
- ✅ MySQL running on port 3306
- ✅ MySQL root password ready

**Check MySQL:**
```bash
mysql --version
```

---

## 🎯 Three Ways to Setup

Choose your preferred method:

### 🔷 Method 1: Automated Script (EASIEST) ⭐

**Windows:**
```powershell
cd database/migrations
.\setup_BikeRentalDB.ps1
```

**Linux/Mac:**
```bash
cd database/migrations
chmod +x setup_BikeRentalDB.sh
./setup_BikeRentalDB.sh
```

**What it does:**
- Creates database
- Creates 10 tables
- Adds 6 triggers
- Inserts 50+ sample records
- Verifies everything

**Duration:** 2 minutes

---

### 🔶 Method 2: Command Line

```bash
cd database/migrations

# Step 1: Create schema + triggers
mysql -u root -p < 001_create_database_schema_with_triggers.sql

# Step 2: Insert sample data
mysql -u root -p < 002_insert_sample_data_BikeRentalDB.sql
```

**Duration:** 3 minutes

---

### 🔷 Method 3: MySQL Workbench (GUI)

1. Open MySQL Workbench
2. Connect to your MySQL server
3. File → Open SQL Script → `001_create_database_schema_with_triggers.sql`
4. Click ⚡ Execute
5. File → Open SQL Script → `002_insert_sample_data_BikeRentalDB.sql`
6. Click ⚡ Execute

**Duration:** 4 minutes

---

## ⚙️ Configure Your App (2 minutes)

### **Step 1: Update .env**

```env
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/BikeRentalDB"
```

Replace `YOUR_PASSWORD` with your MySQL password.

### **Step 2: Generate Prisma Client**

```bash
npx prisma db pull
npx prisma generate
```

### **Step 3: Start Dev Server**

```bash
npm run dev
```

---

## 🧪 Test It! (1 minute)

### **Login with Sample Accounts:**

| User Type | Email | Password |
|-----------|-------|----------|
| **Customer** | john.doe@email.com | password123 |
| **Staff** | michael.davis@bikerent.com | password123 |
| **Admin** | admin@bikerent.com | password123 |

### **Quick Database Check:**

```sql
USE BikeRentalDB;

-- Should show 10 tables
SHOW TABLES;

-- Should show 6 triggers
SHOW TRIGGERS;

-- Should show sample data
SELECT COUNT(*) AS TotalUsers FROM User;
SELECT COUNT(*) AS TotalBikes FROM Bike;
```

---

## 📊 What You Get

After setup, your database includes:

### **Tables (10)**
✅ User, UserSession, Location, Bike, Promo  
✅ Rental, Payment, Feedback, Maintenance, BikeMovement

### **Triggers (6)**
✅ Auto-update bike status (Rented ↔ Available ↔ Maintenance)  
✅ Auto-calculate rental costs  
✅ Auto-apply promo discounts  
✅ Auto-calculate late fees  
✅ Auto-award loyalty points  
✅ Auto-update bike locations  

### **Sample Data**
✅ 5 Locations (Kampala & Entebbe)  
✅ 10 Users (5 customers + 3 staff + 2 admins)  
✅ 16 Bikes (City, Electric, Hybrid, Mountain)  
✅ 5 Promo Codes (10%-50% off)  
✅ 5 Sample Rentals (3 completed + 2 active)  

---

## 🔥 Test the Triggers

### **Test Rental Flow:**

```sql
USE BikeRentalDB;

-- 1. Check available bikes
SELECT BikeSerialNumber, Model, CurrentStatus 
FROM Bike 
WHERE BikeID = 1;
-- Status should be 'Available'

-- 2. Start a rental
INSERT INTO Rental (CustomerID, BikeID, RentalStart, ExpectedReturn)
VALUES (1, 1, NOW(), DATE_ADD(NOW(), INTERVAL 2 HOUR));

-- 3. Check bike status again
SELECT BikeSerialNumber, Model, CurrentStatus 
FROM Bike 
WHERE BikeID = 1;
-- Status should now be 'Rented' (auto-updated by trigger!)

-- 4. End the rental
UPDATE Rental 
SET RentalEnd = DATE_ADD(RentalStart, INTERVAL 105 MINUTE)
WHERE BikeID = 1 AND RentalEnd IS NULL;

-- 5. Check total cost
SELECT TotalCost FROM Rental WHERE BikeID = 1 ORDER BY RentalID DESC LIMIT 1;
-- Cost should be calculated (105 minutes * rate)

-- 6. Check bike status again
SELECT BikeSerialNumber, Model, CurrentStatus 
FROM Bike 
WHERE BikeID = 1;
-- Status should be 'Available' again (auto-updated!)

-- 7. Check loyalty points
SELECT FirstName, LastName, LoyaltyPoints 
FROM User 
WHERE UserID = 1;
-- Points should have increased (auto-awarded!)
```

---

## 🎯 Next Steps

Now that your database is ready:

### **Development**
1. ✅ Database setup complete
2. 🔄 Configure `.env`
3. 🔄 Generate Prisma client
4. 🔄 Start building features

### **Testing**
- Use sample accounts to test login
- Create test rentals
- Test payment flow
- Test receipt generation
- Verify triggers work

### **Production**
- Change all default passwords
- Update `.env` with production credentials
- Backup database regularly
- Monitor trigger performance

---

## 🆘 Common Issues

### **"MySQL command not found"**

**Windows:**
```powershell
# Add to PATH or use full path
& "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" --version
```

**Linux/Mac:**
```bash
# Install MySQL
sudo apt-get install mysql-server  # Ubuntu/Debian
brew install mysql                  # macOS
```

### **"Access denied"**

Check your password:
```bash
mysql -u root -p
# Enter password when prompted
```

### **"Database already exists"**

Either:
- Drop it: `DROP DATABASE BikeRentalDB;`
- Or use existing database (tables will be created if not exist)

### **"Prisma errors"**

Regenerate client:
```bash
npx prisma db pull
npx prisma generate
```

---

## 📚 Documentation

For more details, check:

- **Complete Guide:** [README_BikeRentalDB.md](./README_BikeRentalDB.md)
- **Schema Comparison:** [MIGRATION_COMPARISON.md](./MIGRATION_COMPARISON.md)
- **Main Database README:** [../README.md](../README.md)

---

## ✅ Success Checklist

Before you start coding:

- [ ] MySQL is installed and running
- [ ] BikeRentalDB database created
- [ ] 10 tables created
- [ ] 6 triggers created
- [ ] Sample data loaded
- [ ] Can login to MySQL
- [ ] `.env` configured
- [ ] Prisma client generated
- [ ] Dev server starts
- [ ] Can login with test account
- [ ] Database queries work

---

## 🎉 You're Ready!

Your BikeRentalDB is now fully configured with:
- ✅ Complete schema
- ✅ Automated triggers
- ✅ Sample data for testing
- ✅ Ready for development

**Start building!** 🚀

---

**Need Help?**
- Check troubleshooting in [README_BikeRentalDB.md](./README_BikeRentalDB.md)
- Test MySQL connection: `mysql -u root -p`
- Verify tables: `SHOW TABLES;`
- Check triggers: `SHOW TRIGGERS;`

---

**Last Updated:** October 10, 2025  
**Setup Time:** ~5 minutes  
**Difficulty:** Easy ⭐
