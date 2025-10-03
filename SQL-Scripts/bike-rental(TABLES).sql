CREATE DATABASE BikeRentalDB IF NOT EXISTS;
USE BikeRentalDB;

-- =========================
-- 1. User Table
-- =========================
CREATE TABLE User (
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
    RegistrationDate DATETIME,  -- Only for Customers
    LoyaltyPoints INT UNSIGNED DEFAULT 0,
    PRIMARY KEY (UserID)
);

-- =========================
-- 2. User Session Table
-- =========================
CREATE TABLE UserSession (
    SessionID CHAR(64) NOT NULL PRIMARY KEY,
    UserID INT UNSIGNED NOT NULL,
    CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ExpiresAt DATETIME NOT NULL,
    UserAgent VARCHAR(255),
    IPAddress VARCHAR(45),
    IsActive BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE
);

-- =========================
-- 3. Location Table
-- =========================
CREATE TABLE Location (
    LocationID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    LocationName VARCHAR(100) NOT NULL UNIQUE,
    Address VARCHAR(255) NOT NULL,
    City VARCHAR(50) NOT NULL,
    PhoneNumber VARCHAR(20),
    Capacity INT UNSIGNED,
    PRIMARY KEY (LocationID)
);

-- =========================
-- 4. Bike Table
-- =========================
CREATE TABLE Bike (
    BikeID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    BikeSerialNumber VARCHAR(50) NOT NULL UNIQUE,
    Model VARCHAR(50),
    BikeType VARCHAR(30) NOT NULL,
    CurrentStatus ENUM('Available', 'Rented', 'In Maintenance') NOT NULL DEFAULT 'Available',
    LastMaintenanceDate DATE,
    RentalRatePerMinute DECIMAL(5, 2) NOT NULL,
    LocationID INT UNSIGNED NOT NULL,
    PRIMARY KEY (BikeID),
    FOREIGN KEY (LocationID) REFERENCES Location(LocationID)
);

-- =========================
-- 5. Promo / Discount Table
-- =========================
CREATE TABLE Promo (
    PromoID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    PromoCode VARCHAR(50) NOT NULL UNIQUE,
    DiscountPercent DECIMAL(5,2) NOT NULL,  -- 0-100%
    ValidFrom DATETIME NOT NULL,
    ValidUntil DATETIME NOT NULL,
    MaxUsage INT UNSIGNED DEFAULT NULL,  -- NULL = unlimited
    PRIMARY KEY (PromoID)
);

-- =========================
-- 6. Rental Table
-- =========================
CREATE TABLE Rental (
    RentalID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    CustomerID INT UNSIGNED NOT NULL,  -- User with Role='Customer'
    BikeID INT UNSIGNED NOT NULL,
    RentalStart DATETIME NOT NULL,
    ExpectedReturn DATETIME NOT NULL,
    RentalEnd DATETIME,  -- NULL if ongoing
    TotalCost DECIMAL(8, 2) DEFAULT 0,
    PaymentStatus ENUM('Pending', 'Paid', 'Cancelled') NOT NULL,
    PromoID INT UNSIGNED DEFAULT NULL,
    PRIMARY KEY (RentalID),
    FOREIGN KEY (CustomerID) REFERENCES User(UserID),
    FOREIGN KEY (BikeID) REFERENCES Bike(BikeID),
    FOREIGN KEY (PromoID) REFERENCES Promo(PromoID)
);

-- =========================
-- 7. Payment Table
-- =========================
CREATE TABLE Payment (
    PaymentID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    RentalID INT UNSIGNED NOT NULL,
    PaymentDate DATETIME NOT NULL,
    Amount DECIMAL(8, 2) NOT NULL,
    PaymentMethod VARCHAR(50) NOT NULL,
    TransactionID VARCHAR(100) NOT NULL UNIQUE,
    PRIMARY KEY (PaymentID),
    FOREIGN KEY (RentalID) REFERENCES Rental(RentalID)
);

-- =========================
-- 8. Maintenance Table
-- =========================
CREATE TABLE Maintenance (
    MaintenanceID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    BikeID INT UNSIGNED NOT NULL,
    StaffID INT UNSIGNED NOT NULL,  -- User with Role='Staff' or 'Administrator'
    MaintenanceDate DATETIME NOT NULL,
    Description TEXT NOT NULL,
    Cost DECIMAL(8, 2) NOT NULL,
    PRIMARY KEY (MaintenanceID),
    FOREIGN KEY (BikeID) REFERENCES Bike(BikeID),
    FOREIGN KEY (StaffID) REFERENCES User(UserID)
);

-- =========================
-- 9. Feedback Table
-- =========================
CREATE TABLE Feedback (
    FeedbackID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    RentalID INT UNSIGNED NOT NULL UNIQUE,
    Rating TINYINT NOT NULL CHECK (Rating BETWEEN 1 AND 5),
    Comments TEXT,
    FeedbackDate DATETIME NOT NULL,
    PRIMARY KEY (FeedbackID),
    FOREIGN KEY (RentalID) REFERENCES Rental(RentalID)
);

-- =========================
-- 10. Bike Movement Table (Multi-location Tracking)
-- =========================
CREATE TABLE BikeMovement (
    MovementID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    BikeID INT UNSIGNED NOT NULL,
    FromLocationID INT UNSIGNED NOT NULL,
    ToLocationID INT UNSIGNED NOT NULL,
    MovementDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    StaffID INT UNSIGNED NOT NULL,
    Notes TEXT,
    PRIMARY KEY (MovementID),
    FOREIGN KEY (BikeID) REFERENCES Bike(BikeID),
    FOREIGN KEY (FromLocationID) REFERENCES Location(LocationID),
    FOREIGN KEY (ToLocationID) REFERENCES Location(LocationID),
    FOREIGN KEY (StaffID) REFERENCES User(UserID)
);

-- =========================
-- 11. Triggers
-- =========================
DELIMITER $$

-- 11a. Trigger when Rental starts
CREATE TRIGGER trg_RentalStart_UpdateBikeStatus
BEFORE INSERT ON Rental
FOR EACH ROW
BEGIN
    UPDATE Bike
    SET CurrentStatus = 'Rented'
    WHERE BikeID = NEW.BikeID;
END$$

-- 11b. Trigger when Rental ends
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

-- 11c. Trigger when Rental is cancelled
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

-- 11d. Trigger when Maintenance is added
CREATE TRIGGER trg_Maintenance_UpdateBikeStatus
AFTER INSERT ON Maintenance
FOR EACH ROW
BEGIN
    UPDATE Bike
    SET CurrentStatus = 'In Maintenance', LastMaintenanceDate = NEW.MaintenanceDate
    WHERE BikeID = NEW.BikeID;
END$$

-- 11e. Trigger to calculate TotalCost and update loyalty points
CREATE TRIGGER trg_CalculateRentalCost
BEFORE UPDATE ON Rental
FOR EACH ROW
BEGIN
    IF NEW.RentalEnd IS NOT NULL AND OLD.RentalEnd IS NULL THEN
        SET @minutes = TIMESTAMPDIFF(MINUTE, NEW.RentalStart, NEW.RentalEnd);
        SET @rate = (SELECT RentalRatePerMinute FROM Bike WHERE BikeID = NEW.BikeID);
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

        SET NEW.TotalCost = @cost;

        -- Update Loyalty Points
        UPDATE User
        SET LoyaltyPoints = LoyaltyPoints + FLOOR(@cost/10)
        WHERE UserID = NEW.CustomerID;
    END IF;
END$$

-- 11f. Trigger to update Bike location after movement
CREATE TRIGGER trg_UpdateBikeLocation
AFTER INSERT ON BikeMovement
FOR EACH ROW
BEGIN
    UPDATE Bike
    SET LocationID = NEW.ToLocationID
    WHERE BikeID = NEW.BikeID;
END$$

DELIMITER ;
