-- ============================================================================
-- BikeRentalDB - Complete Database Schema with Triggers
-- ============================================================================
-- This script creates the complete database schema from scratch including:
-- - All 10 tables with proper relationships
-- - All indexes for performance optimization
-- - All triggers for business logic automation
-- Run this if you're setting up the database for the first time
-- ============================================================================

-- =========================
-- Create Database
-- =========================
CREATE DATABASE IF NOT EXISTS BikeRentalDB;
USE BikeRentalDB;

-- =========================
-- 1. User Table
-- =========================
CREATE TABLE IF NOT EXISTS User (
    UserID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    NationalID VARCHAR(20) NOT NULL UNIQUE,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    PhoneNumber VARCHAR(20),
    PasswordHash VARCHAR(255) NOT NULL,
    DateOfBirth DATE,
    Role ENUM('Customer', 'Staff', 'Administrator') NOT NULL,
    DateHired DATE,             -- Only for Staff/Admin
    RegistrationDate DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Only for Customers
    LoyaltyPoints INT UNSIGNED DEFAULT 0,
    PRIMARY KEY (UserID),
    INDEX idx_email (Email),
    INDEX idx_role (Role),
    INDEX idx_national_id (NationalID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================
-- 2. User Session Table
-- =========================
CREATE TABLE IF NOT EXISTS UserSession (
    SessionID CHAR(64) NOT NULL PRIMARY KEY,
    UserID INT UNSIGNED NOT NULL,
    CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ExpiresAt DATETIME NOT NULL,
    UserAgent VARCHAR(255),
    IPAddress VARCHAR(45),
    IsActive BOOLEAN NOT NULL DEFAULT TRUE,
    INDEX idx_user_id (UserID),
    INDEX idx_expires_at (ExpiresAt),
    INDEX idx_is_active (IsActive),
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================
-- 3. Location Table
-- =========================
CREATE TABLE IF NOT EXISTS Location (
    LocationID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    LocationName VARCHAR(100) NOT NULL UNIQUE,
    Address VARCHAR(255) NOT NULL,
    City VARCHAR(50) NOT NULL,
    PhoneNumber VARCHAR(20),
    Capacity INT UNSIGNED,
    PRIMARY KEY (LocationID),
    INDEX idx_city (City),
    INDEX idx_location_name (LocationName)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================
-- 4. Bike Table
-- =========================
CREATE TABLE IF NOT EXISTS Bike (
    BikeID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    BikeSerialNumber VARCHAR(50) NOT NULL UNIQUE,
    Model VARCHAR(50),
    BikeType VARCHAR(30) NOT NULL,
    CurrentStatus ENUM('Available', 'Rented', 'In Maintenance') NOT NULL DEFAULT 'Available',
    LastMaintenanceDate DATE,
    RentalRatePerMinute DECIMAL(5, 2) NOT NULL,
    LocationID INT UNSIGNED NOT NULL,
    bike_image VARCHAR(200),
    PRIMARY KEY (BikeID),
    INDEX idx_serial_number (BikeSerialNumber),
    INDEX idx_status (CurrentStatus),
    INDEX idx_bike_type (BikeType),
    INDEX idx_location (LocationID),
    FOREIGN KEY (LocationID) REFERENCES Location(LocationID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================
-- 5. Promo Table
-- =========================
CREATE TABLE IF NOT EXISTS Promo (
    PromoID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    PromoCode VARCHAR(50) NOT NULL UNIQUE,
    DiscountPercent DECIMAL(5,2) NOT NULL,  -- 0-100%
    ValidFrom DATETIME NOT NULL,
    ValidUntil DATETIME NOT NULL,
    MaxUsage INT UNSIGNED DEFAULT NULL,  -- NULL = unlimited
    PRIMARY KEY (PromoID),
    INDEX idx_promo_code (PromoCode),
    INDEX idx_valid_dates (ValidFrom, ValidUntil)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================
-- 6. Rental Table
-- =========================
CREATE TABLE IF NOT EXISTS Rental (
    RentalID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    CustomerID INT UNSIGNED NOT NULL,  -- User with Role='Customer'
    BikeID INT UNSIGNED NOT NULL,
    RentalStart DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ExpectedReturn DATETIME NOT NULL,
    RentalEnd DATETIME DEFAULT NULL,  -- NULL if ongoing
    TotalCost DECIMAL(8, 2) DEFAULT 0,
    PaymentStatus ENUM('Pending', 'Paid', 'Cancelled') NOT NULL DEFAULT 'Pending',
    PromoID INT UNSIGNED DEFAULT NULL,
    PRIMARY KEY (RentalID),
    INDEX idx_customer (CustomerID),
    INDEX idx_bike (BikeID),
    INDEX idx_rental_start (RentalStart),
    INDEX idx_payment_status (PaymentStatus),
    FOREIGN KEY (CustomerID) REFERENCES User(UserID),
    FOREIGN KEY (BikeID) REFERENCES Bike(BikeID),
    FOREIGN KEY (PromoID) REFERENCES Promo(PromoID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================
-- 7. Payment Table
-- =========================
CREATE TABLE IF NOT EXISTS Payment (
    PaymentID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    RentalID INT UNSIGNED NOT NULL,
    PaymentDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Amount DECIMAL(8, 2) NOT NULL,
    PaymentMethod VARCHAR(50) NOT NULL,
    TransactionID VARCHAR(100) NOT NULL UNIQUE,
    PRIMARY KEY (PaymentID),
    INDEX idx_rental (RentalID),
    INDEX idx_transaction (TransactionID),
    INDEX idx_payment_date (PaymentDate),
    FOREIGN KEY (RentalID) REFERENCES Rental(RentalID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================
-- 8. Maintenance Table
-- =========================
CREATE TABLE IF NOT EXISTS Maintenance (
    MaintenanceID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    BikeID INT UNSIGNED NOT NULL,
    StaffID INT UNSIGNED NOT NULL,  -- User with Role='Staff' or 'Administrator'
    MaintenanceDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Description TEXT NOT NULL,
    Cost DECIMAL(8, 2) NOT NULL,
    PRIMARY KEY (MaintenanceID),
    INDEX idx_bike (BikeID),
    INDEX idx_staff (StaffID),
    INDEX idx_maintenance_date (MaintenanceDate),
    FOREIGN KEY (BikeID) REFERENCES Bike(BikeID),
    FOREIGN KEY (StaffID) REFERENCES User(UserID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================
-- 9. Feedback Table
-- =========================
CREATE TABLE IF NOT EXISTS Feedback (
    FeedbackID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    RentalID INT UNSIGNED NOT NULL UNIQUE,
    Rating TINYINT NOT NULL CHECK (Rating BETWEEN 1 AND 5),
    Comments TEXT,
    FeedbackDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (FeedbackID),
    INDEX idx_rental (RentalID),
    INDEX idx_rating (Rating),
    INDEX idx_feedback_date (FeedbackDate),
    FOREIGN KEY (RentalID) REFERENCES Rental(RentalID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================
-- 10. Bike Movement Table
-- =========================
CREATE TABLE IF NOT EXISTS BikeMovement (
    MovementID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    BikeID INT UNSIGNED NOT NULL,
    FromLocationID INT UNSIGNED NOT NULL,
    ToLocationID INT UNSIGNED NOT NULL,
    MovementDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    StaffID INT UNSIGNED NOT NULL,
    Notes TEXT,
    PRIMARY KEY (MovementID),
    INDEX idx_bike (BikeID),
    INDEX idx_from_location (FromLocationID),
    INDEX idx_to_location (ToLocationID),
    INDEX idx_staff (StaffID),
    INDEX idx_movement_date (MovementDate),
    FOREIGN KEY (BikeID) REFERENCES Bike(BikeID),
    FOREIGN KEY (FromLocationID) REFERENCES Location(LocationID),
    FOREIGN KEY (ToLocationID) REFERENCES Location(LocationID),
    FOREIGN KEY (StaffID) REFERENCES User(UserID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================
-- 11. Bike Images Table
-- =========================
CREATE TABLE IF NOT EXISTS BikeImages (
    ImageID         INT UNSIGNED NOT NULL AUTO_INCREMENT,
    BikeID          INT UNSIGNED NOT NULL,
    ImageURL        VARCHAR(255) NOT NULL,
    ImageType       ENUM('main', 'gallery', 'detail', 'thumbnail') DEFAULT 'gallery',
    AltText         VARCHAR(255),
    DisplayOrder    INT UNSIGNED DEFAULT 0,
    IsActive        BOOLEAN DEFAULT TRUE,
    CreatedAt       DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (ImageID),
    INDEX idx_bike_id (BikeID),
    INDEX idx_image_type (ImageType),
    INDEX idx_display_order (DisplayOrder),
    INDEX idx_is_active (IsActive),
    FOREIGN KEY (BikeID) REFERENCES Bike(BikeID) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- TRIGGERS - Business Logic Automation
-- ============================================================================

DELIMITER $$

-- =========================
-- Trigger 1: Set bike status to Rented when rental starts
-- =========================
DROP TRIGGER IF EXISTS trg_RentalStart_UpdateBikeStatus$$
CREATE TRIGGER trg_RentalStart_UpdateBikeStatus
AFTER INSERT ON Rental
FOR EACH ROW
BEGIN
    UPDATE Bike
    SET CurrentStatus = 'Rented'
    WHERE BikeID = NEW.BikeID;
END$$

-- =========================
-- Trigger 2: Set bike status to Available when rental ends
-- =========================
DROP TRIGGER IF EXISTS trg_RentalEnd_UpdateBikeStatus$$
CREATE TRIGGER trg_RentalEnd_UpdateBikeStatus
AFTER UPDATE ON Rental
FOR EACH ROW
BEGIN
    IF NEW.RentalEnd IS NOT NULL AND OLD.RentalEnd IS NULL THEN
        UPDATE Bike
        SET CurrentStatus = 'Available'
        WHERE BikeID = NEW.BikeID;
    END IF;
END$$

-- =========================
-- Trigger 3: Set bike status to Available when rental is cancelled
-- =========================
DROP TRIGGER IF EXISTS trg_RentalCancelled_UpdateBikeStatus$$
CREATE TRIGGER trg_RentalCancelled_UpdateBikeStatus
AFTER UPDATE ON Rental
FOR EACH ROW
BEGIN
    IF NEW.PaymentStatus = 'Cancelled' AND OLD.PaymentStatus != 'Cancelled' THEN
        UPDATE Bike
        SET CurrentStatus = 'Available'
        WHERE BikeID = NEW.BikeID;
    END IF;
END$$

-- =========================
-- Trigger 4: Update bike status to In Maintenance when maintenance is added
-- =========================
DROP TRIGGER IF EXISTS trg_Maintenance_UpdateBikeStatus$$
CREATE TRIGGER trg_Maintenance_UpdateBikeStatus
AFTER INSERT ON Maintenance
FOR EACH ROW
BEGIN
    UPDATE Bike
    SET CurrentStatus = 'In Maintenance', LastMaintenanceDate = NEW.MaintenanceDate
    WHERE BikeID = NEW.BikeID;
END$$

-- =========================
-- Trigger 5: Calculate rental cost and update loyalty points
-- =========================
DROP TRIGGER IF EXISTS trg_CalculateRentalCost$$
CREATE TRIGGER trg_CalculateRentalCost
BEFORE UPDATE ON Rental
FOR EACH ROW
BEGIN
    IF NEW.RentalEnd IS NOT NULL AND OLD.RentalEnd IS NULL THEN
        -- Calculate minutes rented
        SET @minutes = TIMESTAMPDIFF(MINUTE, NEW.RentalStart, NEW.RentalEnd);
        
        -- Get rental rate
        SET @rate = (SELECT RentalRatePerMinute FROM Bike WHERE BikeID = NEW.BikeID);
        
        -- Calculate base cost
        SET @cost = @minutes * @rate;

        -- Apply promo discount if exists
        IF NEW.PromoID IS NOT NULL THEN
            SET @discount = (SELECT DiscountPercent FROM Promo WHERE PromoID = NEW.PromoID);
            SET @cost = @cost * (1 - @discount/100);
        END IF;

        -- Add late fee if rental ended after ExpectedReturn
        IF NEW.RentalEnd > NEW.ExpectedReturn THEN
            SET @lateMinutes = TIMESTAMPDIFF(MINUTE, NEW.ExpectedReturn, NEW.RentalEnd);
            SET @lateFee = @lateMinutes * @rate * 1.5; -- 50% extra per late minute
            SET @cost = @cost + @lateFee;
        END IF;

        -- Set the total cost
        SET NEW.TotalCost = @cost;

        -- Update Loyalty Points (1 point per 10 units of currency)
        UPDATE User
        SET LoyaltyPoints = LoyaltyPoints + FLOOR(@cost/10)
        WHERE UserID = NEW.CustomerID;
    END IF;
END$$

-- =========================
-- Trigger 6: Update bike location after movement
-- =========================
DROP TRIGGER IF EXISTS trg_UpdateBikeLocation$$
CREATE TRIGGER trg_UpdateBikeLocation
AFTER INSERT ON BikeMovement
FOR EACH ROW
BEGIN
    UPDATE Bike
    SET LocationID = NEW.ToLocationID
    WHERE BikeID = NEW.BikeID;
END$$

DELIMITER ;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Show all created tables
SELECT 'Tables Created:' AS Status;
SHOW TABLES;

-- Show all triggers
SELECT 'Triggers Created:' AS Status;
SHOW TRIGGERS;

-- Table summary
SELECT 'Database Schema Summary:' AS Status;
SELECT 
    'Tables' AS Type, 
    COUNT(*) AS Count 
FROM information_schema.tables 
WHERE table_schema = 'BikeRentalDB';

SELECT 
    'Triggers' AS Type, 
    COUNT(*) AS Count 
FROM information_schema.triggers 
WHERE trigger_schema = 'BikeRentalDB';

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================
SELECT '✅ Database schema with triggers created successfully!' AS Status;
SELECT 'Database: BikeRentalDB' AS Info;
SELECT '11 Tables + 6 Triggers Configured' AS Configuration;
