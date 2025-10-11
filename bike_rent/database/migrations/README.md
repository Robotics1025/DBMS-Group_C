# BikeRent Database Migrations

This directory contains SQL migration scripts to set up and maintain the BikeRent database schema.

## 📋 Prerequisites

- MySQL 8.0 or higher
- MySQL client installed (mysql command-line tool)
- Database credentials (username, password)
- Appropriate permissions (CREATE DATABASE, CREATE TABLE, INSERT, ALTER)

---

## 🚀 Quick Start

### Option 1: MySQL Command Line (Recommended)

1. **Open Terminal/Command Prompt**

2. **Navigate to migrations directory:**
   ```bash
   cd database/migrations
   ```

3. **Run migrations in order:**

   **On Windows (PowerShell):**
   ```powershell
   # Connect to MySQL and run all migrations
   Get-Content 001_create_database_schema.sql, 002_insert_sample_data.sql, 003_alter_schema.sql | mysql -u root -p
   ```

   **On Linux/Mac:**
   ```bash
   # Connect to MySQL and run all migrations
   cat 001_create_database_schema.sql 002_insert_sample_data.sql 003_alter_schema.sql | mysql -u root -p
   ```

   **Or run each file individually:**
   ```bash
   mysql -u root -p < 001_create_database_schema.sql
   mysql -u root -p < 002_insert_sample_data.sql
   mysql -u root -p < 003_alter_schema.sql
   ```

### Option 2: MySQL Workbench (GUI)

1. Open MySQL Workbench
2. Connect to your MySQL server
3. Open each SQL file in order:
   - `001_create_database_schema.sql`
   - `002_insert_sample_data.sql`
   - `003_alter_schema.sql`
4. Execute each script (⚡ Execute button or Ctrl+Shift+Enter)

### Option 3: phpMyAdmin

1. Log in to phpMyAdmin
2. Click "SQL" tab
3. Copy and paste content from each file in order
4. Click "Go" to execute

---

## 📁 Migration Files

### `001_create_database_schema.sql`
**Purpose:** Creates the complete database schema from scratch

**What it does:**
- Creates `bikerent` database
- Creates all tables:
  - `location` - Bike rental stations
  - `user` - Customers, staff, administrators
  - `usersession` - Login session tracking
  - `bike` - Bike inventory
  - `promo` - Promotional codes
  - `rental` - Rental transactions
  - `payment` - Payment records
  - `feedback` - Customer reviews
  - `maintenance` - Bike maintenance logs
  - `bikemovement` - Bike transfer records
- Sets up foreign keys and indexes

**When to run:**
- Fresh installation
- After dropping the database
- Setting up development/production environment

---

### `002_insert_sample_data.sql`
**Purpose:** Populates database with sample data for testing

**What it inserts:**
- 5 Locations (Central Station, University Hub, Shopping Mall, Airport, Beach)
- 10 Users (5 customers, 3 staff, 2 administrators)
- 16 Bikes (various types across all locations)
- 5 Promo codes (WELCOME10, STUDENT15, WEEKEND20, FLASH25, LOYALTY50)
- 5 Rentals (3 completed, 2 active)
- 3 Payments
- 3 Feedback entries
- 4 Maintenance records
- 4 Bike movements

**Sample Credentials:**
```
Customer Login:
- Email: john.doe@email.com
- Password: password123

Staff Login:
- Email: michael.davis@bikerent.com  
- Password: password123

Admin Login:
- Email: admin@bikerent.com
- Password: password123
```

**When to run:**
- After creating schema
- For development/testing
- Skip for production (or modify with real data)

---

### `003_alter_schema.sql`
**Purpose:** Applies schema modifications to existing database

**What it does:**
- Adds `bike_image` column to bike table (if not exists)
- Updates ENUM values for `PaymentStatus` and `CurrentStatus`
- Adds performance indexes to tables
- Safe to run multiple times (checks if changes exist)

**When to run:**
- After cloning repository on existing database
- When updating from older schema version
- After schema changes

---

## 🔐 Database Configuration

### Update `.env` file

After running migrations, update your environment variables:

```env
DATABASE_URL="mysql://username:password@localhost:3306/bikerent"
```

**Example:**
```env
DATABASE_URL="mysql://root:your_password@localhost:3306/bikerent"
```

### Generate Prisma Client

After migrations, regenerate Prisma client:

```bash
npx prisma generate
```

---

## 📊 Verify Installation

### Check Tables Created

```sql
USE bikerent;
SHOW TABLES;
```

**Expected output:**
```
+---------------------+
| Tables_in_bikerent  |
+---------------------+
| bike                |
| bikemovement        |
| feedback            |
| location            |
| maintenance         |
| payment             |
| promo               |
| rental              |
| user                |
| usersession         |
+---------------------+
```

### Check Sample Data

```sql
SELECT 
    (SELECT COUNT(*) FROM location) AS Locations,
    (SELECT COUNT(*) FROM user) AS Users,
    (SELECT COUNT(*) FROM bike) AS Bikes,
    (SELECT COUNT(*) FROM rental) AS Rentals;
```

**Expected output:**
```
+-----------+-------+-------+---------+
| Locations | Users | Bikes | Rentals |
+-----------+-------+-------+---------+
|         5 |    10 |    16 |       5 |
+-----------+-------+-------+---------+
```

### Test Query

```sql
-- Get all available bikes
SELECT 
    b.BikeSerialNumber, 
    b.Model, 
    b.BikeType, 
    l.LocationName 
FROM bike b
JOIN location l ON b.LocationID = l.LocationID
WHERE b.CurrentStatus = 'Available';
```

---

## 🛠️ Troubleshooting

### Error: "Access denied for user"
**Solution:** Check your MySQL credentials
```bash
mysql -u your_username -p
# Enter password when prompted
```

### Error: "Database already exists"
**Solution:** Drop existing database first (⚠️ WARNING: Deletes all data!)
```sql
DROP DATABASE IF EXISTS bikerent;
```

### Error: "Unknown column"
**Solution:** Run `003_alter_schema.sql` to add missing columns

### Error: "Table already exists"
**Solution:** Migration already run, skip to next file

### Prisma Client not synced
**Solution:** Regenerate Prisma client
```bash
npx prisma db pull    # Pull schema from database
npx prisma generate   # Generate client
```

---

## 🔄 Migration Workflow

### For New Developers (First Time Setup)

```bash
# 1. Clone repository
git clone <repository-url>
cd bike_rent

# 2. Install dependencies
npm install

# 3. Run database migrations
cd database/migrations
mysql -u root -p < 001_create_database_schema.sql
mysql -u root -p < 002_insert_sample_data.sql
mysql -u root -p < 003_alter_schema.sql

# 4. Update .env file
DATABASE_URL="mysql://root:password@localhost:3306/bikerent"

# 5. Generate Prisma client
npx prisma generate

# 6. Start development server
npm run dev
```

### For Existing Database (Schema Updates Only)

```bash
# Run only the alter script
cd database/migrations
mysql -u root -p bikerent < 003_alter_schema.sql

# Regenerate Prisma client
npx prisma generate
```

---

## 📝 Creating New Migrations

When adding new features that require schema changes:

1. **Create new migration file:**
   ```
   004_add_new_feature.sql
   ```

2. **Follow naming convention:**
   ```
   [number]_[description].sql
   ```

3. **Make changes idempotent (safe to run multiple times):**
   ```sql
   -- Good: Check if column exists before adding
   ALTER TABLE bike 
   ADD COLUMN IF NOT EXISTS new_column VARCHAR(100);
   
   -- Bad: Will fail if run twice
   ALTER TABLE bike ADD COLUMN new_column VARCHAR(100);
   ```

4. **Test migration:**
   - Test on development database
   - Test with existing data
   - Test running twice (should not error)

5. **Update this README** with new migration details

---

## 🗄️ Backup & Restore

### Create Backup

```bash
# Backup entire database
mysqldump -u root -p bikerent > backup_bikerent_$(date +%Y%m%d).sql

# Backup structure only
mysqldump -u root -p --no-data bikerent > backup_structure.sql

# Backup data only
mysqldump -u root -p --no-create-info bikerent > backup_data.sql
```

### Restore from Backup

```bash
mysql -u root -p bikerent < backup_bikerent_20251010.sql
```

---

## 📚 Additional Resources

- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [SQL Migration Best Practices](https://www.prisma.io/dataguide/types/relational/expand-and-contract-pattern)

---

## ⚠️ Important Notes

1. **Always backup before running migrations in production**
2. **Test migrations on development database first**
3. **Run migrations in order (001, 002, 003, ...)**
4. **Do not modify old migration files** - create new ones instead
5. **Keep `.env` file secure** - never commit to version control
6. **Sample passwords are for development only** - change in production

---

## 🆘 Support

If you encounter issues:

1. Check the **Troubleshooting** section above
2. Verify MySQL is running: `mysql --version`
3. Check database connection: `mysql -u root -p`
4. Review error messages carefully
5. Check MySQL error log: `/var/log/mysql/error.log` (Linux) or MySQL Workbench logs

---

## ✅ Checklist

Before starting development:

- [ ] MySQL installed and running
- [ ] All migrations executed successfully
- [ ] Sample data loaded
- [ ] `.env` file configured with DATABASE_URL
- [ ] Prisma client generated (`npx prisma generate`)
- [ ] Test database connection
- [ ] Application starts without errors

---

Last Updated: October 10, 2025
