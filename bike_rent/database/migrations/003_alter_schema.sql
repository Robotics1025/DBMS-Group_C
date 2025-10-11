-- ============================================================================
-- BikeRent Database - Schema Alterations
-- ============================================================================
-- This script contains ALTER TABLE statements for schema updates
-- Run this if you need to modify existing tables
-- ============================================================================

USE bikerent;

-- ============================================================================
-- ALTER: bike table - Add bike_image column if not exists
-- ============================================================================
SELECT 'Checking if bike_image column exists...' AS Status;

SET @dbname = 'bikerent';
SET @tablename = 'bike';
SET @columnname = 'bike_image';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE 
      TABLE_SCHEMA = @dbname
      AND TABLE_NAME = @tablename
      AND COLUMN_NAME = @columnname
  ) > 0,
  "SELECT 'bike_image column already exists' AS Status;",
  "ALTER TABLE bike ADD COLUMN bike_image VARCHAR(200) AFTER LocationID;"
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- ============================================================================
-- ALTER: rental table - Ensure PaymentStatus has correct ENUM values
-- ============================================================================
SELECT 'Updating rental PaymentStatus ENUM values...' AS Status;

ALTER TABLE rental 
MODIFY COLUMN PaymentStatus ENUM('Pending', 'Paid', 'Cancelled') NOT NULL DEFAULT 'Pending';

-- ============================================================================
-- ALTER: bike table - Ensure CurrentStatus has correct ENUM values
-- ============================================================================
SELECT 'Updating bike CurrentStatus ENUM values...' AS Status;

ALTER TABLE bike 
MODIFY COLUMN CurrentStatus ENUM('Available', 'Rented', 'In Maintenance') DEFAULT 'Available';

-- ============================================================================
-- ALTER: user table - Add indexes for better performance
-- ============================================================================
SELECT 'Adding indexes to user table...' AS Status;

-- Drop existing indexes if they exist and recreate
SET @dbname = 'bikerent';
SET @tablename = 'user';

-- Check and add email index
SET @indexname = 'idx_email';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.STATISTICS
    WHERE TABLE_SCHEMA = @dbname
      AND TABLE_NAME = @tablename
      AND INDEX_NAME = @indexname
  ) > 0,
  "SELECT 'idx_email already exists' AS Status;",
  "CREATE INDEX idx_email ON user(Email);"
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- Check and add role index
SET @indexname = 'idx_role';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.STATISTICS
    WHERE TABLE_SCHEMA = @dbname
      AND TABLE_NAME = @tablename
      AND INDEX_NAME = @indexname
  ) > 0,
  "SELECT 'idx_role already exists' AS Status;",
  "CREATE INDEX idx_role ON user(Role);"
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- ============================================================================
-- ALTER: bike table - Add indexes for better performance
-- ============================================================================
SELECT 'Adding indexes to bike table...' AS Status;

SET @tablename = 'bike';

-- Check and add serial number index
SET @indexname = 'idx_serial_number';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.STATISTICS
    WHERE TABLE_SCHEMA = @dbname
      AND TABLE_NAME = @tablename
      AND INDEX_NAME = @indexname
  ) > 0,
  "SELECT 'idx_serial_number already exists' AS Status;",
  "CREATE INDEX idx_serial_number ON bike(BikeSerialNumber);"
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- Check and add status index
SET @indexname = 'idx_status';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.STATISTICS
    WHERE TABLE_SCHEMA = @dbname
      AND TABLE_NAME = @tablename
      AND INDEX_NAME = @indexname
  ) > 0,
  "SELECT 'idx_status already exists' AS Status;",
  "CREATE INDEX idx_status ON bike(CurrentStatus);"
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- Check and add bike type index
SET @indexname = 'idx_bike_type';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.STATISTICS
    WHERE TABLE_SCHEMA = @dbname
      AND TABLE_NAME = @tablename
      AND INDEX_NAME = @indexname
  ) > 0,
  "SELECT 'idx_bike_type already exists' AS Status;",
  "CREATE INDEX idx_bike_type ON bike(BikeType);"
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- ============================================================================
-- ALTER: rental table - Add indexes for better query performance
-- ============================================================================
SELECT 'Adding indexes to rental table...' AS Status;

SET @tablename = 'rental';

-- Check and add rental start index
SET @indexname = 'idx_rental_start';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.STATISTICS
    WHERE TABLE_SCHEMA = @dbname
      AND TABLE_NAME = @tablename
      AND INDEX_NAME = @indexname
  ) > 0,
  "SELECT 'idx_rental_start already exists' AS Status;",
  "CREATE INDEX idx_rental_start ON rental(RentalStart);"
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- Check and add payment status index
SET @indexname = 'idx_payment_status';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.STATISTICS
    WHERE TABLE_SCHEMA = @dbname
      AND TABLE_NAME = @tablename
      AND INDEX_NAME = @indexname
  ) > 0,
  "SELECT 'idx_payment_status already exists' AS Status;",
  "CREATE INDEX idx_payment_status ON rental(PaymentStatus);"
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- ============================================================================
-- ALTER: payment table - Add indexes for transaction lookup
-- ============================================================================
SELECT 'Adding indexes to payment table...' AS Status;

SET @tablename = 'payment';

-- Check and add transaction ID index
SET @indexname = 'idx_transaction';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.STATISTICS
    WHERE TABLE_SCHEMA = @dbname
      AND TABLE_NAME = @tablename
      AND INDEX_NAME = @indexname
  ) > 0,
  "SELECT 'idx_transaction already exists' AS Status;",
  "CREATE INDEX idx_transaction ON payment(TransactionID);"
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- Check and add payment date index
SET @indexname = 'idx_payment_date';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.STATISTICS
    WHERE TABLE_SCHEMA = @dbname
      AND TABLE_NAME = @tablename
      AND INDEX_NAME = @indexname
  ) > 0,
  "SELECT 'idx_payment_date already exists' AS Status;",
  "CREATE INDEX idx_payment_date ON payment(PaymentDate);"
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================
SELECT 'Schema alterations completed successfully!' AS Status;

-- Display current table structure
SELECT 'Current bike table structure:' AS Info;
DESCRIBE bike;

SELECT 'Current rental table structure:' AS Info;
DESCRIBE rental;

SELECT 'Current payment table structure:' AS Info;
DESCRIBE payment;
