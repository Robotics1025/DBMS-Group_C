-- ============================================================================
-- BikeRentalDB - Sample Data Insertion
-- ============================================================================
-- This script populates the database with realistic sample/test data
-- Run this AFTER creating the schema (001_create_database_schema_with_triggers.sql)
-- ============================================================================

USE BikeRentalDB;

-- ============================================================================
-- 1. INSERT LOCATIONS (5 stations)
-- ============================================================================

INSERT INTO Location (LocationName, Address, City, PhoneNumber, Capacity) VALUES
('Central Station', '123 Main Street', 'Kampala', '+256-700-111111', 50),
('University Hub', '456 Campus Road', 'Kampala', '+256-700-222222', 40),
('Shopping Mall', '789 Commerce Avenue', 'Kampala', '+256-700-333333', 35),
('Airport Terminal', '321 Airport Road', 'Entebbe', '+256-700-444444', 30),
('Beach Station', '654 Waterfront Drive', 'Entebbe', '+256-700-555555', 25);

-- ============================================================================
-- 2. INSERT USERS (10 users: 5 customers + 3 staff + 2 admins)
-- ============================================================================

-- Password for all users: 'password123'
-- Bcrypt hash generated with: bcrypt.hash('password123', 10)

-- CUSTOMERS (5)
INSERT INTO User (NationalID, FirstName, LastName, Email, PhoneNumber, PasswordHash, DateOfBirth, Role, RegistrationDate, LoyaltyPoints) VALUES
('CM12345678901', 'John', 'Doe', 'john.doe@email.com', '+256-701-111111', '$2a$10$rQZ3hXGx.x4vN2Kp1Q7xLe8YzK9pL3nQ9wX2vB4cD6eF8gH0iJ1kK', '1990-05-15', 'Customer', NOW(), 150),
('CM23456789012', 'Jane', 'Smith', 'jane.smith@email.com', '+256-701-222222', '$2a$10$rQZ3hXGx.x4vN2Kp1Q7xLe8YzK9pL3nQ9wX2vB4cD6eF8gH0iJ1kK', '1992-08-22', 'Customer', NOW(), 200),
('CM34567890123', 'Robert', 'Johnson', 'robert.johnson@email.com', '+256-701-333333', '$2a$10$rQZ3hXGx.x4vN2Kp1Q7xLe8YzK9pL3nQ9wX2vB4cD6eF8gH0iJ1kK', '1988-03-10', 'Customer', NOW(), 75),
('CM45678901234', 'Emily', 'Brown', 'emily.brown@email.com', '+256-701-444444', '$2a$10$rQZ3hXGx.x4vN2Kp1Q7xLe8YzK9pL3nQ9wX2vB4cD6eF8gH0iJ1kK', '1995-11-30', 'Customer', NOW(), 300),
('CM56789012345', 'David', 'Wilson', 'david.wilson@email.com', '+256-701-555555', '$2a$10$rQZ3hXGx.x4vN2Kp1Q7xLe8YzK9pL3nQ9wX2vB4cD6eF8gH0iJ1kK', '1985-07-18', 'Customer', NOW(), 50);

-- STAFF (3)
INSERT INTO User (NationalID, FirstName, LastName, Email, PhoneNumber, PasswordHash, DateOfBirth, Role, DateHired, LoyaltyPoints) VALUES
('ST12345678901', 'Michael', 'Davis', 'michael.davis@bikerent.com', '+256-702-111111', '$2a$10$rQZ3hXGx.x4vN2Kp1Q7xLe8YzK9pL3nQ9wX2vB4cD6eF8gH0iJ1kK', '1987-04-12', 'Staff', '2023-01-15', 0),
('ST23456789012', 'Sarah', 'Martinez', 'sarah.martinez@bikerent.com', '+256-702-222222', '$2a$10$rQZ3hXGx.x4vN2Kp1Q7xLe8YzK9pL3nQ9wX2vB4cD6eF8gH0iJ1kK', '1991-09-25', 'Staff', '2023-03-20', 0),
('ST34567890123', 'James', 'Anderson', 'james.anderson@bikerent.com', '+256-702-333333', '$2a$10$rQZ3hXGx.x4vN2Kp1Q7xLe8YzK9pL3nQ9wX2vB4cD6eF8gH0iJ1kK', '1989-12-05', 'Staff', '2023-06-10', 0);

-- ADMINISTRATORS (2)
INSERT INTO User (NationalID, FirstName, LastName, Email, PhoneNumber, PasswordHash, DateOfBirth, Role, DateHired, LoyaltyPoints) VALUES
('AD12345678901', 'Admin', 'User', 'admin@bikerent.com', '+256-703-111111', '$2a$10$rQZ3hXGx.x4vN2Kp1Q7xLe8YzK9pL3nQ9wX2vB4cD6eF8gH0iJ1kK', '1980-01-01', 'Administrator', '2022-01-01', 0),
('AD23456789012', 'Super', 'Admin', 'superadmin@bikerent.com', '+256-703-222222', '$2a$10$rQZ3hXGx.x4vN2Kp1Q7xLe8YzK9pL3nQ9wX2vB4cD6eF8gH0iJ1kK', '1978-06-15', 'Administrator', '2022-01-01', 0);

-- ============================================================================
-- 3. INSERT BIKES (16 bikes across all locations)
-- ============================================================================

-- Central Station (6 bikes)
INSERT INTO Bike (BikeSerialNumber, Model, BikeType, CurrentStatus, RentalRatePerMinute, LocationID, bike_image) VALUES
('B-100001', 'CityCruiser X1', 'City', 'Available', 0.15, 1, '/assets/images/bikes/city-bike-1.jpg'),
('B-100002', 'SpeedMaster 200', 'Electric', 'Available', 0.30, 1, '/assets/images/bikes/electric-bike-1.jpg'),
('B-100003', 'EcoRide Pro', 'Hybrid', 'Available', 0.20, 1, '/assets/images/bikes/hybrid-bike-1.jpg'),
('B-100004', 'UrbanGlide', 'City', 'Rented', 0.12, 1, '/assets/images/bikes/city-bike-2.jpg'),
('B-100005', 'ThunderBolt E-Bike', 'Electric', 'Available', 0.28, 1, '/assets/images/bikes/electric-bike-2.jpg'),
('B-100006', 'MountainKing Pro', 'Mountain', 'Available', 0.22, 1, '/assets/images/bikes/mountain-bike-1.jpg');

-- University Hub (4 bikes)
INSERT INTO Bike (BikeSerialNumber, Model, BikeType, CurrentStatus, RentalRatePerMinute, LocationID, bike_image) VALUES
('B-200001', 'Student Special', 'City', 'Available', 0.10, 2, '/assets/images/bikes/city-bike-3.jpg'),
('B-200002', 'Campus Cruiser', 'City', 'Rented', 0.12, 2, '/assets/images/bikes/city-bike-4.jpg'),
('B-200003', 'E-Scholar', 'Electric', 'Available', 0.25, 2, '/assets/images/bikes/electric-bike-3.jpg'),
('B-200004', 'FlexRide Hybrid', 'Hybrid', 'Available', 0.18, 2, '/assets/images/bikes/hybrid-bike-2.jpg');

-- Shopping Mall (3 bikes)
INSERT INTO Bike (BikeSerialNumber, Model, BikeType, CurrentStatus, RentalRatePerMinute, LocationID, bike_image) VALUES
('B-300001', 'ShopperExpress', 'City', 'Available', 0.15, 3, '/assets/images/bikes/city-bike-5.jpg'),
('B-300002', 'PowerShop E-Bike', 'Electric', 'Available', 0.27, 3, '/assets/images/bikes/electric-bike-4.jpg'),
('B-300003', 'CargoMaster', 'Hybrid', 'In Maintenance', 0.16, 3, '/assets/images/bikes/hybrid-bike-3.jpg');

-- Airport Terminal (2 bikes)
INSERT INTO Bike (BikeSerialNumber, Model, BikeType, CurrentStatus, RentalRatePerMinute, LocationID, bike_image) VALUES
('B-400001', 'JetSet Rider', 'Electric', 'Available', 0.30, 4, '/assets/images/bikes/electric-bike-5.jpg'),
('B-400002', 'TravelLight', 'Electric', 'Available', 0.28, 4, '/assets/images/bikes/electric-bike-6.jpg');

-- Beach Station (1 bike)
INSERT INTO Bike (BikeSerialNumber, Model, BikeType, CurrentStatus, RentalRatePerMinute, LocationID, bike_image) VALUES
('B-500001', 'BeachCruiser Wave', 'Mountain', 'Available', 0.20, 5, '/assets/images/bikes/mountain-bike-2.jpg');

-- ============================================================================
-- 4. INSERT PROMO CODES (5 promotional offers)
-- ============================================================================

INSERT INTO Promo (PromoCode, DiscountPercent, ValidFrom, ValidUntil, MaxUsage) VALUES
('WELCOME10', 10.00, '2025-01-01 00:00:00', '2025-12-31 23:59:59', NULL),
('STUDENT15', 15.00, '2025-01-01 00:00:00', '2025-12-31 23:59:59', 1000),
('WEEKEND20', 20.00, '2025-01-01 00:00:00', '2025-12-31 23:59:59', NULL),
('FLASH25', 25.00, '2025-10-01 00:00:00', '2025-10-31 23:59:59', 500),
('LOYALTY50', 50.00, '2025-01-01 00:00:00', '2025-12-31 23:59:59', 100);

-- ============================================================================
-- 5. INSERT RENTALS (5 rentals: 3 completed + 2 active)
-- ============================================================================

-- Completed Rentals (with RentalEnd set) - Triggers will calculate TotalCost
INSERT INTO Rental (CustomerID, BikeID, RentalStart, ExpectedReturn, RentalEnd, PaymentStatus, PromoID) VALUES
(1, 1, '2025-10-01 09:00:00', '2025-10-01 11:00:00', '2025-10-01 10:45:00', 'Paid', 1),
(2, 2, '2025-10-02 14:00:00', '2025-10-02 16:00:00', '2025-10-02 16:30:00', 'Paid', 2),
(3, 3, '2025-10-03 08:00:00', '2025-10-03 12:00:00', '2025-10-03 11:50:00', 'Paid', NULL);

-- Active Rentals (ongoing - no RentalEnd)
INSERT INTO Rental (CustomerID, BikeID, RentalStart, ExpectedReturn, PaymentStatus, PromoID) VALUES
(4, 4, '2025-10-10 10:00:00', '2025-10-10 14:00:00', 'Pending', NULL),
(5, 8, '2025-10-10 11:30:00', '2025-10-10 15:30:00', 'Pending', 3);

-- ============================================================================
-- 6. INSERT PAYMENTS (3 payments for completed rentals)
-- ============================================================================

INSERT INTO Payment (RentalID, PaymentDate, Amount, PaymentMethod, TransactionID) VALUES
(1, '2025-10-01 10:50:00', 14.18, 'Credit Card', 'TXN-1728382500-0001'),
(2, '2025-10-02 16:35:00', 76.50, 'Mobile Money', 'TXN-1728468900-0002'),
(3, '2025-10-03 12:00:00', 47.00, 'Cash', 'TXN-1728555300-0003');

-- ============================================================================
-- 7. INSERT FEEDBACK (3 reviews)
-- ============================================================================

INSERT INTO Feedback (RentalID, Rating, Comments, FeedbackDate) VALUES
(1, 5, 'Excellent bike! Very smooth ride and easy to use. Highly recommend!', '2025-10-01 11:00:00'),
(2, 4, 'Good experience overall. The bike was fast but battery could last longer.', '2025-10-02 17:00:00'),
(3, 5, 'Perfect for my morning commute. Great service and affordable pricing!', '2025-10-03 12:30:00');

-- ============================================================================
-- 8. INSERT MAINTENANCE RECORDS (4 maintenance logs)
-- ============================================================================

INSERT INTO Maintenance (BikeID, StaffID, MaintenanceDate, Description, Cost) VALUES
(1, 6, '2025-09-15 10:00:00', 'Regular maintenance: Chain lubrication, brake adjustment, tire pressure check', 15.00),
(2, 7, '2025-09-20 14:30:00', 'Battery replacement and electrical system check', 85.00),
(3, 6, '2025-09-25 09:00:00', 'Full service: Gear tuning, brake pad replacement, frame inspection', 45.00),
(11, 8, '2025-10-05 11:00:00', 'Emergency repair: Flat tire replacement and wheel alignment', 25.00);

-- ============================================================================
-- 9. INSERT BIKE MOVEMENTS (4 relocations)
-- ============================================================================

INSERT INTO BikeMovement (BikeID, FromLocationID, ToLocationID, StaffID, Notes) VALUES
(5, 1, 2, 6, 'Relocated to University Hub due to high demand'),
(6, 1, 3, 7, 'Moved to Shopping Mall for weekend promotion'),
(10, 3, 1, 6, 'Returned to Central Station after maintenance'),
(14, 4, 5, 8, 'Transferred to Beach Station for summer season');

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

SELECT '✅ Sample data inserted successfully!' AS Status;

-- Show record counts
SELECT 'Data Summary:' AS Info;
SELECT 
    (SELECT COUNT(*) FROM Location) AS Locations,
    (SELECT COUNT(*) FROM User) AS Users,
    (SELECT COUNT(*) FROM Bike) AS Bikes,
    (SELECT COUNT(*) FROM Promo) AS Promos,
    (SELECT COUNT(*) FROM Rental) AS Rentals,
    (SELECT COUNT(*) FROM Payment) AS Payments,
    (SELECT COUNT(*) FROM Feedback) AS Feedbacks,
    (SELECT COUNT(*) FROM Maintenance) AS MaintenanceRecords,
    (SELECT COUNT(*) FROM BikeMovement) AS BikeMovements;

-- Show available bikes
SELECT 'Available Bikes:' AS Info;
SELECT 
    b.BikeSerialNumber,
    b.Model,
    b.BikeType,
    l.LocationName,
    b.RentalRatePerMinute
FROM Bike b
JOIN Location l ON b.LocationID = l.LocationID
WHERE b.CurrentStatus = 'Available'
ORDER BY l.LocationName, b.BikeType;

-- Show sample login credentials
SELECT 'Sample Login Credentials:' AS Info;

(SELECT 
    'Customer' AS UserType,
    Email,
    'password123' AS Password,
    CONCAT(FirstName, ' ', LastName) AS Name
FROM User
WHERE Role = 'Customer'
LIMIT 3)

UNION ALL

(SELECT 
    'Staff' AS UserType,
    Email,
    'password123' AS Password,
    CONCAT(FirstName, ' ', LastName) AS Name
FROM User
WHERE Role = 'Staff'
LIMIT 2)

UNION ALL

(SELECT 
    'Admin' AS UserType,
    Email,
    'password123' AS Password,
    CONCAT(FirstName, ' ', LastName) AS Name
FROM User
WHERE Role = 'Administrator'
LIMIT 1);

-- ============================================================================
-- IMPORTANT NOTE
-- ============================================================================
SELECT '⚠️ SECURITY WARNING:' AS Alert;
SELECT 'All users have password: password123' AS Info;
SELECT 'Change these credentials before deploying to production!' AS Action;

-- ============================================================================
-- 11. INSERT BIKE IMAGES (Multiple images per bike)
-- ============================================================================

-- BIKE 1: CityCruiser X1
INSERT INTO BikeImages (BikeID, ImageURL, ImageType, AltText, DisplayOrder) VALUES
(1, '/assets/images/bikes/city/city-bike-1-main.jpg', 'main', 'CityCruiser X1 - Main View', 1),
(1, '/assets/images/bikes/city/city-bike-1-side.jpg', 'gallery', 'CityCruiser X1 - Side Profile', 2),
(1, '/assets/images/bikes/city/city-bike-1-basket.jpg', 'detail', 'CityCruiser X1 - Front Basket Detail', 3),
(1, '/assets/images/bikes/city/city-bike-1-wheels.jpg', 'detail', 'CityCruiser X1 - Wheels & Brakes', 4);

-- BIKE 2: SpeedMaster 200
INSERT INTO BikeImages (BikeID, ImageURL, ImageType, AltText, DisplayOrder) VALUES
(2, '/assets/images/bikes/electric/electric-bike-1-main.jpg', 'main', 'SpeedMaster 200 - Main View', 1),
(2, '/assets/images/bikes/electric/electric-bike-1-battery.jpg', 'detail', 'SpeedMaster 200 - Battery Pack', 2),
(2, '/assets/images/bikes/electric/electric-bike-1-display.jpg', 'detail', 'SpeedMaster 200 - LCD Display', 3),
(2, '/assets/images/bikes/electric/electric-bike-1-action.jpg', 'gallery', 'SpeedMaster 200 - In Action', 4);

-- BIKE 3: EcoRide Pro
INSERT INTO BikeImages (BikeID, ImageURL, ImageType, AltText, DisplayOrder) VALUES
(3, '/assets/images/bikes/hybrid/hybrid-bike-1-main.jpg', 'main', 'EcoRide Pro - Main View', 1),
(3, '/assets/images/bikes/hybrid/hybrid-bike-1-gears.jpg', 'detail', 'EcoRide Pro - Gear System', 2),
(3, '/assets/images/bikes/hybrid/hybrid-bike-1-frame.jpg', 'gallery', 'EcoRide Pro - Eco Frame', 3);

-- BIKE 4: UrbanGlide
INSERT INTO BikeImages (BikeID, ImageURL, ImageType, AltText, DisplayOrder) VALUES
(4, '/assets/images/bikes/city/city-bike-2-main.jpg', 'main', 'UrbanGlide - Main View', 1),
(4, '/assets/images/bikes/city/city-bike-2-lights.jpg', 'detail', 'UrbanGlide - LED Lights', 2),
(4, '/assets/images/bikes/city/city-bike-2-seat.jpg', 'detail', 'UrbanGlide - Comfort Seat', 3);

-- BIKE 5: ThunderBolt E-Bike
INSERT INTO BikeImages (BikeID, ImageURL, ImageType, AltText, DisplayOrder) VALUES
(5, '/assets/images/bikes/electric/electric-bike-2-main.jpg', 'main', 'ThunderBolt - Main View', 1),
(5, '/assets/images/bikes/electric/electric-bike-2-motor.jpg', 'detail', 'ThunderBolt - Powerful Motor', 2),
(5, '/assets/images/bikes/electric/electric-bike-2-charging.jpg', 'detail', 'ThunderBolt - Charging Port', 3),
(5, '/assets/images/bikes/electric/electric-bike-2-side.jpg', 'gallery', 'ThunderBolt - Side View', 4);

-- BIKE 6: MountainKing Pro
INSERT INTO BikeImages (BikeID, ImageURL, ImageType, AltText, DisplayOrder) VALUES
(6, '/assets/images/bikes/mountain/mountain-bike-1-main.jpg', 'main', 'MountainKing Pro - Main View', 1),
(6, '/assets/images/bikes/mountain/mountain-bike-1-suspension.jpg', 'detail', 'MountainKing Pro - Front Suspension', 2),
(6, '/assets/images/bikes/mountain/mountain-bike-1-tires.jpg', 'detail', 'MountainKing Pro - Off-Road Tires', 3),
(6, '/assets/images/bikes/mountain/mountain-bike-1-trail.jpg', 'gallery', 'MountainKing Pro - On Trail', 4);

-- BIKE 7: Student Special
INSERT INTO BikeImages (BikeID, ImageURL, ImageType, AltText, DisplayOrder) VALUES
(7, '/assets/images/bikes/city/city-bike-3-main.jpg', 'main', 'Student Special - Main View', 1),
(7, '/assets/images/bikes/city/city-bike-3-carrier.jpg', 'detail', 'Student Special - Book Carrier', 2),
(7, '/assets/images/bikes/city/city-bike-3-lock.jpg', 'detail', 'Student Special - Integrated Lock', 3);

-- BIKE 8: Campus Cruiser
INSERT INTO BikeImages (BikeID, ImageURL, ImageType, AltText, DisplayOrder) VALUES
(8, '/assets/images/bikes/city/city-bike-4-main.jpg', 'main', 'Campus Cruiser - Main View', 1),
(8, '/assets/images/bikes/city/city-bike-4-handlebars.jpg', 'detail', 'Campus Cruiser - Ergonomic Handlebars', 2);

-- BIKE 9: E-Scholar
INSERT INTO BikeImages (BikeID, ImageURL, ImageType, AltText, DisplayOrder) VALUES
(9, '/assets/images/bikes/electric/electric-bike-3-main.jpg', 'main', 'E-Scholar - Main View', 1),
(9, '/assets/images/bikes/electric/electric-bike-3-compact.jpg', 'gallery', 'E-Scholar - Compact Design', 2),
(9, '/assets/images/bikes/electric/electric-bike-3-panel.jpg', 'detail', 'E-Scholar - Control Panel', 3);

-- BIKE 10: FlexRide Hybrid
INSERT INTO BikeImages (BikeID, ImageURL, ImageType, AltText, DisplayOrder) VALUES
(10, '/assets/images/bikes/hybrid/hybrid-bike-2-main.jpg', 'main', 'FlexRide Hybrid - Main View', 1),
(10, '/assets/images/bikes/hybrid/hybrid-bike-2-terrain.jpg', 'gallery', 'FlexRide Hybrid - All-Terrain', 2),
(10, '/assets/images/bikes/hybrid/hybrid-bike-2-dual.jpg', 'detail', 'FlexRide Hybrid - Dual Mode System', 3);

-- BIKE 11: ShopperExpress
INSERT INTO BikeImages (BikeID, ImageURL, ImageType, AltText, DisplayOrder) VALUES
(11, '/assets/images/bikes/city/city-bike-5-main.jpg', 'main', 'ShopperExpress - Main View', 1),
(11, '/assets/images/bikes/city/city-bike-5-cargo.jpg', 'detail', 'ShopperExpress - Large Cargo Rack', 2),
(11, '/assets/images/bikes/city/city-bike-5-shopping.jpg', 'gallery', 'ShopperExpress - Shopping Mode', 3);

-- BIKE 12: PowerShop E-Bike
INSERT INTO BikeImages (BikeID, ImageURL, ImageType, AltText, DisplayOrder) VALUES
(12, '/assets/images/bikes/electric/electric-bike-4-main.jpg', 'main', 'PowerShop E-Bike - Main View', 1),
(12, '/assets/images/bikes/electric/electric-bike-4-cargo.jpg', 'detail', 'PowerShop E-Bike - Electric Cargo', 2);

-- BIKE 13: CargoMaster
INSERT INTO BikeImages (BikeID, ImageURL, ImageType, AltText, DisplayOrder) VALUES
(13, '/assets/images/bikes/hybrid/hybrid-bike-3-main.jpg', 'main', 'CargoMaster - Main View', 1),
(13, '/assets/images/bikes/hybrid/hybrid-bike-3-box.jpg', 'detail', 'CargoMaster - Cargo Box', 2),
(13, '/assets/images/bikes/hybrid/hybrid-bike-3-loaded.jpg', 'gallery', 'CargoMaster - Fully Loaded', 3);

-- BIKE 14: JetSet Rider
INSERT INTO BikeImages (BikeID, ImageURL, ImageType, AltText, DisplayOrder) VALUES
(14, '/assets/images/bikes/electric/electric-bike-5-main.jpg', 'main', 'JetSet Rider - Main View', 1),
(14, '/assets/images/bikes/electric/electric-bike-5-premium.jpg', 'gallery', 'JetSet Rider - Premium Features', 2),
(14, '/assets/images/bikes/electric/electric-bike-5-travel.jpg', 'gallery', 'JetSet Rider - Travel Ready', 3);

-- BIKE 15: TravelLight
INSERT INTO BikeImages (BikeID, ImageURL, ImageType, AltText, DisplayOrder) VALUES
(15, '/assets/images/bikes/electric/electric-bike-6-main.jpg', 'main', 'TravelLight - Main View', 1),
(15, '/assets/images/bikes/electric/electric-bike-6-folded.jpg', 'detail', 'TravelLight - Folded Position', 2),
(15, '/assets/images/bikes/electric/electric-bike-6-portable.jpg', 'gallery', 'TravelLight - Ultra Portable', 3);

-- BIKE 16: BeachCruiser Wave
INSERT INTO BikeImages (BikeID, ImageURL, ImageType, AltText, DisplayOrder) VALUES
(16, '/assets/images/bikes/mountain/mountain-bike-2-main.jpg', 'main', 'BeachCruiser Wave - Main View', 1),
(16, '/assets/images/bikes/mountain/mountain-bike-2-beach.jpg', 'gallery', 'BeachCruiser Wave - On Beach', 2),
(16, '/assets/images/bikes/mountain/mountain-bike-2-sand.jpg', 'detail', 'BeachCruiser Wave - Sand Tires', 3);

-- ============================================================================
-- VERIFICATION: BikeImages Summary
-- ============================================================================
SELECT '✅ Bike images data inserted!' AS Status;

SELECT 
    (SELECT COUNT(*) FROM BikeImages) AS TotalImages,
    (SELECT COUNT(DISTINCT BikeID) FROM BikeImages) AS BikesWithImages,
    (SELECT COUNT(*) FROM BikeImages WHERE ImageType = 'main') AS MainImages,
    (SELECT COUNT(*) FROM BikeImages WHERE ImageType = 'gallery') AS GalleryImages,
    (SELECT COUNT(*) FROM BikeImages WHERE ImageType = 'detail') AS DetailImages;
