/**
 * Centralized SQL Queries for Bike Rental System
 * Based on Prisma Schema - MySQL Database
 * 
 * SCHEMA-ONLY FIELDS - No demo data, strictly following Prisma models
 * 
 * Usage: Import and use these queries in your API routes
 * Execute with: await prisma.$queryRaw`${queries.queryName}`
 */

// =============================================================================
// USER MANAGEMENT QUERIES
// =============================================================================

export const userQueries = {
  // Create new user (customer registration)
  createUser: `
    INSERT INTO user (
      NationalID, FirstName, LastName, Email, PhoneNumber, 
      PasswordHash, DateOfBirth, Role, RegistrationDate, LoyaltyPoints
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), 0)
  `,

  // Get user by email (for login)
  getUserByEmail: `
    SELECT UserID, NationalID, FirstName, LastName, Email, PhoneNumber, 
           PasswordHash, Role, LoyaltyPoints, RegistrationDate, DateOfBirth, DateHired
    FROM user 
    WHERE Email = ?
  `,

  // Get user by ID
  getUserById: `
    SELECT UserID, NationalID, FirstName, LastName, Email, PhoneNumber, 
           Role, LoyaltyPoints, DateOfBirth, RegistrationDate, DateHired
    FROM user 
    WHERE UserID = ?
  `,

  // Update user profile
  updateUserProfile: `
    UPDATE user 
    SET FirstName = ?, LastName = ?, PhoneNumber = ?, DateOfBirth = ?
    WHERE UserID = ?
  `,

  // Update user loyalty points
  updateLoyaltyPoints: `
    UPDATE user 
    SET LoyaltyPoints = LoyaltyPoints + ?
    WHERE UserID = ?
  `,

  // Get all customers
  getAllCustomers: `
    SELECT UserID, NationalID, FirstName, LastName, Email, PhoneNumber, 
           DateOfBirth, RegistrationDate, LoyaltyPoints
    FROM user 
    WHERE Role = 'Customer'
    ORDER BY RegistrationDate DESC
  `,

  // Get staff members
  getStaffMembers: `
    SELECT UserID, NationalID, FirstName, LastName, Email, PhoneNumber, 
           Role, DateHired
    FROM user 
    WHERE Role IN ('Staff', 'Administrator')
    ORDER BY Role DESC, FirstName ASC
  `
};

// =============================================================================
// USER SESSION QUERIES
// =============================================================================

export const sessionQueries = {
  // Create new session
  createSession: `
    INSERT INTO usersession (SessionID, UserID, ExpiresAt, UserAgent, IPAddress)
    VALUES (?, ?, ?, ?, ?)
  `,

  // Get active session
  getActiveSession: `
    SELECT s.SessionID, s.UserID, s.ExpiresAt, s.IsActive,
           u.FirstName, u.LastName, u.Email, u.Role
    FROM usersession s
    JOIN user u ON s.UserID = u.UserID
    WHERE s.SessionID = ? AND s.IsActive = TRUE AND s.ExpiresAt > NOW()
  `,

  // Deactivate session (logout)
  deactivateSession: `
    UPDATE usersession 
    SET IsActive = FALSE 
    WHERE SessionID = ?
  `,

  // Clean expired sessions
  cleanExpiredSessions: `
    DELETE FROM usersession 
    WHERE ExpiresAt < NOW() OR IsActive = FALSE
  `
};

// =============================================================================
// BIKE MANAGEMENT QUERIES
// =============================================================================

export const bikeQueries = {
  // Get all available bikes with location info
  getAvailableBikes: `
    SELECT 
      b.BikeID, b.BikeSerialNumber, b.Model, b.BikeType, 
      b.RentalRatePerMinute, b.CurrentStatus, b.LastMaintenanceDate, b.LocationID,
      l.LocationName, l.Address, l.City, l.PhoneNumber, l.Capacity
    FROM bike b
    JOIN location l ON b.LocationID = l.LocationID
    WHERE b.CurrentStatus = 'Available'
    ORDER BY l.LocationName, b.BikeType
  `,

  // Get bike by ID with location
  getBikeById: `
    SELECT 
      b.BikeID, b.BikeSerialNumber, b.Model, b.BikeType, 
      b.RentalRatePerMinute, b.CurrentStatus, b.LastMaintenanceDate, b.LocationID,
      l.LocationName, l.Address, l.City, l.PhoneNumber, l.Capacity
    FROM bike b
    JOIN location l ON b.LocationID = l.LocationID
    WHERE b.BikeID = ?
  `,

  // Get all bikes
  getAllBikes: `
    SELECT 
      b.BikeID, b.BikeSerialNumber, b.Model, b.BikeType, 
      b.RentalRatePerMinute, b.CurrentStatus, b.LastMaintenanceDate, b.LocationID,
      l.LocationName, l.Address, l.City
    FROM bike b
    JOIN location l ON b.LocationID = l.LocationID
    ORDER BY b.BikeID
  `,

  // Add new bike
  addBike: `
    INSERT INTO bike (
      BikeSerialNumber, Model, BikeType, RentalRatePerMinute, LocationID, CurrentStatus
    ) VALUES (?, ?, ?, ?, ?, 'Available')
  `,

  // Update bike status
  updateBikeStatus: `
    UPDATE bike 
    SET CurrentStatus = ? 
    WHERE BikeID = ?
  `,

  // Update bike location
  updateBikeLocation: `
    UPDATE bike 
    SET LocationID = ? 
    WHERE BikeID = ?
  `,

  // Update maintenance date
  updateMaintenanceDate: `
    UPDATE bike 
    SET LastMaintenanceDate = CURDATE()
    WHERE BikeID = ?
  `
};

// =============================================================================
// LOCATION MANAGEMENT QUERIES
// =============================================================================

export const locationQueries = {
  // Get all locations
  getAllLocations: `
    SELECT LocationID, LocationName, Address, City, PhoneNumber, Capacity
    FROM location
    ORDER BY LocationName
  `,

  // Get location by ID
  getLocationById: `
    SELECT LocationID, LocationName, Address, City, PhoneNumber, Capacity
    FROM location
    WHERE LocationID = ?
  `,

  // Add new location
  addLocation: `
    INSERT INTO location (LocationName, Address, City, PhoneNumber, Capacity)
    VALUES (?, ?, ?, ?, ?)
  `,

  // Update location
  updateLocation: `
    UPDATE location 
    SET LocationName = ?, Address = ?, City = ?, PhoneNumber = ?, Capacity = ?
    WHERE LocationID = ?
  `
};

// =============================================================================
// RENTAL MANAGEMENT QUERIES - DIRECT RENTAL (NO CART)
// =============================================================================

export const rentalQueries = {
  // Create new rental (immediate)
  createRental: `
    INSERT INTO rental (
      CustomerID, BikeID, RentalStart, ExpectedReturn, TotalCost, PaymentStatus, PromoID
    ) VALUES (?, ?, NOW(), ?, ?, 'Pending', ?)
  `,

  // Get active rentals for a customer
  getActiveRentals: `
    SELECT 
      r.RentalID, r.CustomerID, r.BikeID, r.RentalStart, r.ExpectedReturn, 
      r.RentalEnd, r.TotalCost, r.PaymentStatus, r.PromoID,
      b.BikeSerialNumber, b.Model, b.BikeType, b.CurrentStatus, 
      b.RentalRatePerMinute, b.LastMaintenanceDate, b.LocationID
    FROM rental r
    JOIN bike b ON r.BikeID = b.BikeID
    WHERE r.CustomerID = ? AND r.RentalEnd IS NULL
    ORDER BY r.RentalStart DESC
  `,

  // Complete rental (return bike)
  completeRental: `
    UPDATE rental 
    SET RentalEnd = NOW(), TotalCost = ?, PaymentStatus = 'Paid'
    WHERE RentalID = ?
  `,

  // Get rental history for customer
  getRentalHistory: `
    SELECT 
      r.RentalID, r.CustomerID, r.BikeID, r.RentalStart, r.ExpectedReturn, 
      r.RentalEnd, r.TotalCost, r.PaymentStatus, r.PromoID,
      b.BikeSerialNumber, b.Model, b.BikeType
    FROM rental r
    JOIN bike b ON r.BikeID = b.BikeID
    WHERE r.CustomerID = ?
    ORDER BY r.RentalStart DESC
  `,

  // Get all active rentals (for staff notifications)
  getAllActiveRentals: `
    SELECT 
      r.RentalID, r.CustomerID, r.BikeID, r.RentalStart, r.ExpectedReturn, 
      r.TotalCost, r.PaymentStatus, r.PromoID,
      u.FirstName, u.LastName, u.Email, u.PhoneNumber, u.NationalID,
      b.BikeSerialNumber, b.Model, b.BikeType, b.LocationID
    FROM rental r
    JOIN user u ON r.CustomerID = u.UserID
    JOIN bike b ON r.BikeID = b.BikeID
    WHERE r.RentalEnd IS NULL
    ORDER BY r.RentalStart DESC
  `,

  // Get rental by ID
  getRentalById: `
    SELECT 
      r.RentalID, r.CustomerID, r.BikeID, r.RentalStart, r.ExpectedReturn, 
      r.RentalEnd, r.TotalCost, r.PaymentStatus, r.PromoID
    FROM rental r
    WHERE r.RentalID = ?
  `,

  // Get recent rentals (for staff notifications)
  getRecentRentals: `
    SELECT 
      r.RentalID, r.CustomerID, r.BikeID, r.RentalStart, r.ExpectedReturn, 
      r.TotalCost, r.PaymentStatus,
      u.FirstName, u.LastName, u.Email, u.PhoneNumber,
      b.BikeSerialNumber, b.Model, b.BikeType
    FROM rental r
    JOIN user u ON r.CustomerID = u.UserID
    JOIN bike b ON r.BikeID = b.BikeID
    WHERE r.RentalStart >= DATE_SUB(NOW(), INTERVAL 1 HOUR)
    ORDER BY r.RentalStart DESC
  `
};

// =============================================================================
// PAYMENT MANAGEMENT QUERIES
// =============================================================================

export const paymentQueries = {
  // Create payment record
  createPayment: `
    INSERT INTO payment (
      RentalID, PaymentDate, Amount, PaymentMethod, TransactionID
    ) VALUES (?, NOW(), ?, ?, ?)
  `,

  // Get payment by rental ID
  getPaymentByRentalId: `
    SELECT PaymentID, RentalID, PaymentDate, Amount, PaymentMethod, TransactionID
    FROM payment
    WHERE RentalID = ?
  `,

  // Get all payments
  getAllPayments: `
    SELECT PaymentID, RentalID, PaymentDate, Amount, PaymentMethod, TransactionID
    FROM payment
    ORDER BY PaymentDate DESC
  `,

  // Get payment by ID
  getPaymentById: `
    SELECT PaymentID, RentalID, PaymentDate, Amount, PaymentMethod, TransactionID
    FROM payment
    WHERE PaymentID = ?
  `
};

// =============================================================================
// PROMO CODE MANAGEMENT QUERIES
// =============================================================================

export const promoQueries = {
  // Get valid promo by code
  getValidPromoByCode: `
    SELECT PromoID, PromoCode, DiscountPercent, ValidFrom, ValidUntil, MaxUsage
    FROM promo
    WHERE PromoCode = ? 
      AND NOW() BETWEEN ValidFrom AND ValidUntil
  `,

  // Get all promos
  getAllPromos: `
    SELECT PromoID, PromoCode, DiscountPercent, ValidFrom, ValidUntil, MaxUsage
    FROM promo
    ORDER BY ValidFrom DESC
  `,

  // Get promo by ID
  getPromoById: `
    SELECT PromoID, PromoCode, DiscountPercent, ValidFrom, ValidUntil, MaxUsage
    FROM promo
    WHERE PromoID = ?
  `,

  // Create new promo
  createPromo: `
    INSERT INTO promo (PromoCode, DiscountPercent, ValidFrom, ValidUntil, MaxUsage)
    VALUES (?, ?, ?, ?, ?)
  `,

  // Update promo
  updatePromo: `
    UPDATE promo 
    SET PromoCode = ?, DiscountPercent = ?, ValidFrom = ?, ValidUntil = ?, MaxUsage = ?
    WHERE PromoID = ?
  `
};

// =============================================================================
// MAINTENANCE MANAGEMENT QUERIES
// =============================================================================

export const maintenanceQueries = {
  // Add maintenance record
  addMaintenance: `
    INSERT INTO maintenance (BikeID, StaffID, MaintenanceDate, Description, Cost)
    VALUES (?, ?, NOW(), ?, ?)
  `,

  // Get maintenance by ID
  getMaintenanceById: `
    SELECT MaintenanceID, BikeID, StaffID, MaintenanceDate, Description, Cost
    FROM maintenance
    WHERE MaintenanceID = ?
  `,

  // Get maintenance history for bike
  getMaintenanceByBike: `
    SELECT MaintenanceID, BikeID, StaffID, MaintenanceDate, Description, Cost
    FROM maintenance
    WHERE BikeID = ?
    ORDER BY MaintenanceDate DESC
  `,

  // Get all maintenance records
  getAllMaintenance: `
    SELECT MaintenanceID, BikeID, StaffID, MaintenanceDate, Description, Cost
    FROM maintenance
    ORDER BY MaintenanceDate DESC
  `
};

// =============================================================================
// FEEDBACK MANAGEMENT QUERIES
// =============================================================================

export const feedbackQueries = {
  // Add feedback
  addFeedback: `
    INSERT INTO feedback (RentalID, Rating, Comments, FeedbackDate)
    VALUES (?, ?, ?, NOW())
  `,

  // Get feedback by rental ID
  getFeedbackByRentalId: `
    SELECT FeedbackID, RentalID, Rating, Comments, FeedbackDate
    FROM feedback
    WHERE RentalID = ?
  `,

  // Get feedback by ID
  getFeedbackById: `
    SELECT FeedbackID, RentalID, Rating, Comments, FeedbackDate
    FROM feedback
    WHERE FeedbackID = ?
  `,

  // Get all feedback
  getAllFeedback: `
    SELECT FeedbackID, RentalID, Rating, Comments, FeedbackDate
    FROM feedback
    ORDER BY FeedbackDate DESC
  `
};

// =============================================================================
// BIKE MOVEMENT TRACKING QUERIES
// =============================================================================

export const movementQueries = {
  // Record bike movement
  recordMovement: `
    INSERT INTO bikemovement (BikeID, FromLocationID, ToLocationID, StaffID, Notes, MovementDate)
    VALUES (?, ?, ?, ?, ?, NOW())
  `,

  // Get movement by ID
  getMovementById: `
    SELECT MovementID, BikeID, FromLocationID, ToLocationID, MovementDate, StaffID, Notes
    FROM bikemovement
    WHERE MovementID = ?
  `,

  // Get movement history for bike
  getMovementsByBike: `
    SELECT MovementID, BikeID, FromLocationID, ToLocationID, MovementDate, StaffID, Notes
    FROM bikemovement
    WHERE BikeID = ?
    ORDER BY MovementDate DESC
  `,

  // Get all movements
  getAllMovements: `
    SELECT MovementID, BikeID, FromLocationID, ToLocationID, MovementDate, StaffID, Notes
    FROM bikemovement
    ORDER BY MovementDate DESC
  `
};

// =============================================================================
// STAFF NOTIFICATION QUERIES
// =============================================================================

export const notificationQueries = {
  // Get recent rental notifications for staff
  getRecentRentalNotifications: `
    SELECT 
      r.RentalID, r.CustomerID, r.BikeID, r.RentalStart, r.ExpectedReturn,
      u.FirstName, u.LastName, u.Email, u.PhoneNumber, u.NationalID,
      b.BikeSerialNumber, b.Model, b.BikeType, b.LocationID
    FROM rental r
    JOIN user u ON r.CustomerID = u.UserID  
    JOIN bike b ON r.BikeID = b.BikeID
    WHERE r.RentalStart >= DATE_SUB(NOW(), INTERVAL 10 MINUTE)
    ORDER BY r.RentalStart DESC
  `,

  // Mark notification as read (you can extend this)
  markNotificationRead: `
    UPDATE rental 
    SET PaymentStatus = PaymentStatus 
    WHERE RentalID = ?
  `
};

// =============================================================================
// SALES & ANALYTICS REPORT QUERIES
// =============================================================================

export const salesReportQueries = {
  // Daily Sales Report
  getDailySalesReport: `
    SELECT 
      DATE(r.RentalStart) as SalesDate,
      COUNT(r.RentalID) as TotalRentals,
      SUM(CASE WHEN r.PaymentStatus = 'Paid' THEN r.TotalCost ELSE 0 END) as TotalRevenue,
      AVG(CASE WHEN r.PaymentStatus = 'Paid' AND r.RentalEnd IS NOT NULL THEN 
        TIMESTAMPDIFF(MINUTE, r.RentalStart, r.RentalEnd) ELSE NULL END) as AvgRentalDurationMinutes,
      COUNT(DISTINCT r.CustomerID) as UniqueCustomers,
      SUM(CASE WHEN r.PaymentStatus = 'Paid' THEN 1 ELSE 0 END) as PaidRentals,
      SUM(CASE WHEN r.PaymentStatus = 'Pending' THEN 1 ELSE 0 END) as PendingPayments,
      SUM(CASE WHEN r.PaymentStatus = 'Cancelled' THEN 1 ELSE 0 END) as CancelledRentals
    FROM rental r
    WHERE DATE(r.RentalStart) BETWEEN ? AND ?
    GROUP BY DATE(r.RentalStart)
    ORDER BY SalesDate DESC
  `,

  // Monthly Sales Report
  getMonthlySalesReport: `
    SELECT 
      YEAR(r.RentalStart) as SalesYear,
      MONTH(r.RentalStart) as SalesMonth,
      DATE_FORMAT(r.RentalStart, '%M') as MonthName,
      COUNT(r.RentalID) as TotalRentals,
      SUM(CASE WHEN r.PaymentStatus = 'Paid' THEN r.TotalCost ELSE 0 END) as TotalRevenue,
      AVG(CASE WHEN r.PaymentStatus = 'Paid' AND r.RentalEnd IS NOT NULL THEN 
        TIMESTAMPDIFF(MINUTE, r.RentalStart, r.RentalEnd) ELSE NULL END) as AvgRentalDurationMinutes,
      COUNT(DISTINCT r.CustomerID) as UniqueCustomers,
      SUM(CASE WHEN r.PaymentStatus = 'Paid' THEN 1 ELSE 0 END) as PaidRentals,
      AVG(CASE WHEN r.PaymentStatus = 'Paid' THEN r.TotalCost ELSE NULL END) as AvgRevenuePerRental
    FROM rental r
    WHERE r.RentalStart >= DATE_SUB(CURDATE(), INTERVAL ? MONTH)
    GROUP BY YEAR(r.RentalStart), MONTH(r.RentalStart), DATE_FORMAT(r.RentalStart, '%M')
    ORDER BY SalesYear DESC, SalesMonth DESC
  `,

  // Quarterly Sales Report
  getQuarterlySalesReport: `
    SELECT 
      YEAR(r.RentalStart) as SalesYear,
      QUARTER(r.RentalStart) as SalesQuarter,
      CONCAT('Q', QUARTER(r.RentalStart), ' ', YEAR(r.RentalStart)) as QuarterLabel,
      COUNT(r.RentalID) as TotalRentals,
      SUM(CASE WHEN r.PaymentStatus = 'Paid' THEN r.TotalCost ELSE 0 END) as TotalRevenue,
      AVG(CASE WHEN r.PaymentStatus = 'Paid' AND r.RentalEnd IS NOT NULL THEN 
        TIMESTAMPDIFF(MINUTE, r.RentalStart, r.RentalEnd) ELSE NULL END) as AvgRentalDurationMinutes,
      COUNT(DISTINCT r.CustomerID) as UniqueCustomers,
      SUM(CASE WHEN r.PaymentStatus = 'Paid' THEN 1 ELSE 0 END) as PaidRentals,
      AVG(CASE WHEN r.PaymentStatus = 'Paid' THEN r.TotalCost ELSE NULL END) as AvgRevenuePerRental,
      MAX(r.TotalCost) as HighestSingleRental,
      MIN(CASE WHEN r.PaymentStatus = 'Paid' AND r.TotalCost > 0 THEN r.TotalCost ELSE NULL END) as LowestSingleRental
    FROM rental r
    WHERE r.RentalStart >= DATE_SUB(CURDATE(), INTERVAL ? QUARTER)
    GROUP BY YEAR(r.RentalStart), QUARTER(r.RentalStart), CONCAT('Q', QUARTER(r.RentalStart), ' ', YEAR(r.RentalStart))
    ORDER BY SalesYear DESC, SalesQuarter DESC
  `,

  // Yearly Sales Report
  getYearlySalesReport: `
    SELECT 
      YEAR(r.RentalStart) as SalesYear,
      COUNT(r.RentalID) as TotalRentals,
      SUM(CASE WHEN r.PaymentStatus = 'Paid' THEN r.TotalCost ELSE 0 END) as TotalRevenue,
      AVG(CASE WHEN r.PaymentStatus = 'Paid' AND r.RentalEnd IS NOT NULL THEN 
        TIMESTAMPDIFF(MINUTE, r.RentalStart, r.RentalEnd) ELSE NULL END) as AvgRentalDurationMinutes,
      COUNT(DISTINCT r.CustomerID) as UniqueCustomers,
      SUM(CASE WHEN r.PaymentStatus = 'Paid' THEN 1 ELSE 0 END) as PaidRentals,
      AVG(CASE WHEN r.PaymentStatus = 'Paid' THEN r.TotalCost ELSE NULL END) as AvgRevenuePerRental,
      MAX(r.TotalCost) as HighestSingleRental,
      MIN(CASE WHEN r.PaymentStatus = 'Paid' AND r.TotalCost > 0 THEN r.TotalCost ELSE NULL END) as LowestSingleRental,
      -- Growth calculation compared to previous year
      (SUM(CASE WHEN r.PaymentStatus = 'Paid' THEN r.TotalCost ELSE 0 END) - 
       LAG(SUM(CASE WHEN r.PaymentStatus = 'Paid' THEN r.TotalCost ELSE 0 END)) OVER (ORDER BY YEAR(r.RentalStart))) 
       / NULLIF(LAG(SUM(CASE WHEN r.PaymentStatus = 'Paid' THEN r.TotalCost ELSE 0 END)) OVER (ORDER BY YEAR(r.RentalStart)), 0) * 100 as RevenueGrowthPercent
    FROM rental r
    WHERE r.RentalStart >= DATE_SUB(CURDATE(), INTERVAL ? YEAR)
    GROUP BY YEAR(r.RentalStart)
    ORDER BY SalesYear DESC
  `,

  // Top Performing Locations Report
  getLocationPerformanceReport: `
    SELECT 
      l.LocationID,
      l.LocationName,
      l.Address,
      l.City,
      COUNT(r.RentalID) as TotalRentals,
      SUM(CASE WHEN r.PaymentStatus = 'Paid' THEN r.TotalCost ELSE 0 END) as TotalRevenue,
      AVG(CASE WHEN r.PaymentStatus = 'Paid' THEN r.TotalCost ELSE NULL END) as AvgRevenuePerRental,
      COUNT(DISTINCT r.CustomerID) as UniqueCustomers,
      COUNT(DISTINCT b.BikeID) as TotalBikes,
      ROUND(COUNT(r.RentalID) / COUNT(DISTINCT b.BikeID), 2) as RentalsPerBike,
      ROUND(SUM(CASE WHEN r.PaymentStatus = 'Paid' THEN r.TotalCost ELSE 0 END) / COUNT(DISTINCT b.BikeID), 2) as RevenuePerBike
    FROM location l
    LEFT JOIN bike b ON l.LocationID = b.LocationID
    LEFT JOIN rental r ON b.BikeID = r.BikeID 
      AND r.RentalStart >= DATE_SUB(CURDATE(), INTERVAL ? MONTH)
    GROUP BY l.LocationID, l.LocationName, l.Address, l.City
    ORDER BY TotalRevenue DESC
  `,

  // Bike Type Performance Report
  getBikeTypePerformanceReport: `
    SELECT 
      b.BikeType,
      COUNT(r.RentalID) as TotalRentals,
      SUM(CASE WHEN r.PaymentStatus = 'Paid' THEN r.TotalCost ELSE 0 END) as TotalRevenue,
      AVG(CASE WHEN r.PaymentStatus = 'Paid' THEN r.TotalCost ELSE NULL END) as AvgRevenuePerRental,
      AVG(CASE WHEN r.PaymentStatus = 'Paid' AND r.RentalEnd IS NOT NULL THEN 
        TIMESTAMPDIFF(MINUTE, r.RentalStart, r.RentalEnd) ELSE NULL END) as AvgRentalDurationMinutes,
      COUNT(DISTINCT b.BikeID) as TotalBikes,
      ROUND(COUNT(r.RentalID) / COUNT(DISTINCT b.BikeID), 2) as RentalsPerBike,
      AVG(b.RentalRatePerMinute) as AvgRatePerMinute
    FROM bike b
    LEFT JOIN rental r ON b.BikeID = r.BikeID 
      AND r.RentalStart >= DATE_SUB(CURDATE(), INTERVAL ? MONTH)
    GROUP BY b.BikeType
    ORDER BY TotalRevenue DESC
  `,

  // Top Customers Report
  getTopCustomersReport: `
    SELECT 
      u.UserID,
      u.FirstName,
      u.LastName,
      u.Email,
      u.PhoneNumber,
      u.RegistrationDate,
      u.LoyaltyPoints,
      COUNT(r.RentalID) as TotalRentals,
      SUM(CASE WHEN r.PaymentStatus = 'Paid' THEN r.TotalCost ELSE 0 END) as TotalSpent,
      AVG(CASE WHEN r.PaymentStatus = 'Paid' THEN r.TotalCost ELSE NULL END) as AvgSpentPerRental,
      AVG(CASE WHEN r.PaymentStatus = 'Paid' AND r.RentalEnd IS NOT NULL THEN 
        TIMESTAMPDIFF(MINUTE, r.RentalStart, r.RentalEnd) ELSE NULL END) as AvgRentalDurationMinutes,
      MAX(r.RentalStart) as LastRentalDate,
      DATEDIFF(CURDATE(), MAX(r.RentalStart)) as DaysSinceLastRental
    FROM user u
    LEFT JOIN rental r ON u.UserID = r.CustomerID 
      AND r.RentalStart >= DATE_SUB(CURDATE(), INTERVAL ? MONTH)
    WHERE u.Role = 'Customer'
    GROUP BY u.UserID, u.FirstName, u.LastName, u.Email, u.PhoneNumber, u.RegistrationDate, u.LoyaltyPoints
    HAVING TotalRentals > 0
    ORDER BY TotalSpent DESC
    LIMIT ?
  `,

  // Payment Method Analysis
  getPaymentMethodReport: `
    SELECT 
      p.PaymentMethod,
      COUNT(p.PaymentID) as TotalTransactions,
      SUM(p.Amount) as TotalAmount,
      AVG(p.Amount) as AvgTransactionAmount,
      MAX(p.Amount) as HighestTransaction,
      MIN(p.Amount) as LowestTransaction,
      ROUND(COUNT(p.PaymentID) * 100.0 / (SELECT COUNT(*) FROM payment WHERE PaymentDate >= DATE_SUB(CURDATE(), INTERVAL ? MONTH)), 2) as PercentageOfTransactions,
      ROUND(SUM(p.Amount) * 100.0 / (SELECT SUM(Amount) FROM payment WHERE PaymentDate >= DATE_SUB(CURDATE(), INTERVAL ? MONTH)), 2) as PercentageOfRevenue
    FROM payment p
    WHERE p.PaymentDate >= DATE_SUB(CURDATE(), INTERVAL ? MONTH)
    GROUP BY p.PaymentMethod
    ORDER BY TotalAmount DESC
  `,

  // Peak Usage Hours Report
  getPeakUsageReport: `
    SELECT 
      HOUR(r.RentalStart) as RentalHour,
      COUNT(r.RentalID) as TotalRentals,
      SUM(CASE WHEN r.PaymentStatus = 'Paid' THEN r.TotalCost ELSE 0 END) as TotalRevenue,
      AVG(CASE WHEN r.PaymentStatus = 'Paid' THEN r.TotalCost ELSE NULL END) as AvgRevenuePerRental,
      COUNT(DISTINCT r.CustomerID) as UniqueCustomers,
      ROUND(COUNT(r.RentalID) * 100.0 / (SELECT COUNT(*) FROM rental WHERE RentalStart >= DATE_SUB(CURDATE(), INTERVAL ? MONTH)), 2) as PercentageOfTotalRentals
    FROM rental r
    WHERE r.RentalStart >= DATE_SUB(CURDATE(), INTERVAL ? MONTH)
    GROUP BY HOUR(r.RentalStart)
    ORDER BY TotalRentals DESC
  `,

  // Revenue Trend Analysis (Last 12 Months)
  getRevenueTrendReport: `
    SELECT 
      DATE_FORMAT(r.RentalStart, '%Y-%m') as MonthYear,
      YEAR(r.RentalStart) as Year,
      MONTH(r.RentalStart) as Month,
      DATE_FORMAT(r.RentalStart, '%M') as MonthName,
      COUNT(r.RentalID) as TotalRentals,
      SUM(CASE WHEN r.PaymentStatus = 'Paid' THEN r.TotalCost ELSE 0 END) as TotalRevenue,
      AVG(CASE WHEN r.PaymentStatus = 'Paid' THEN r.TotalCost ELSE NULL END) as AvgRevenuePerRental,
      -- Moving average (3-month)
      AVG(SUM(CASE WHEN r.PaymentStatus = 'Paid' THEN r.TotalCost ELSE 0 END)) 
        OVER (ORDER BY YEAR(r.RentalStart), MONTH(r.RentalStart) ROWS 2 PRECEDING) as ThreeMonthMovingAvg,
      -- Month-over-month growth
      (SUM(CASE WHEN r.PaymentStatus = 'Paid' THEN r.TotalCost ELSE 0 END) - 
       LAG(SUM(CASE WHEN r.PaymentStatus = 'Paid' THEN r.TotalCost ELSE 0 END)) 
       OVER (ORDER BY YEAR(r.RentalStart), MONTH(r.RentalStart))) 
       / NULLIF(LAG(SUM(CASE WHEN r.PaymentStatus = 'Paid' THEN r.TotalCost ELSE 0 END)) 
       OVER (ORDER BY YEAR(r.RentalStart), MONTH(r.RentalStart)), 0) * 100 as MonthOverMonthGrowthPercent
    FROM rental r
    WHERE r.RentalStart >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
    GROUP BY YEAR(r.RentalStart), MONTH(r.RentalStart), DATE_FORMAT(r.RentalStart, '%Y-%m'), DATE_FORMAT(r.RentalStart, '%M')
    ORDER BY Year DESC, Month DESC
  `,

  // Comprehensive Business Summary Report
  getBusinessSummaryReport: `
    SELECT 
      -- Overall Metrics
      COUNT(DISTINCT r.RentalID) as TotalRentals,
      COUNT(DISTINCT r.CustomerID) as TotalCustomers,
      COUNT(DISTINCT b.BikeID) as TotalBikes,
      COUNT(DISTINCT l.LocationID) as TotalLocations,
      
      -- Revenue Metrics
      SUM(CASE WHEN r.PaymentStatus = 'Paid' THEN r.TotalCost ELSE 0 END) as TotalRevenue,
      AVG(CASE WHEN r.PaymentStatus = 'Paid' THEN r.TotalCost ELSE NULL END) as AvgRevenuePerRental,
      MAX(r.TotalCost) as HighestSingleRental,
      
      -- Operational Metrics
      AVG(CASE WHEN r.PaymentStatus = 'Paid' AND r.RentalEnd IS NOT NULL THEN 
        TIMESTAMPDIFF(MINUTE, r.RentalStart, r.RentalEnd) ELSE NULL END) as AvgRentalDurationMinutes,
      
      -- Payment Status Distribution
      SUM(CASE WHEN r.PaymentStatus = 'Paid' THEN 1 ELSE 0 END) as PaidRentals,
      SUM(CASE WHEN r.PaymentStatus = 'Pending' THEN 1 ELSE 0 END) as PendingPayments,
      SUM(CASE WHEN r.PaymentStatus = 'Cancelled' THEN 1 ELSE 0 END) as CancelledRentals,
      
      -- Growth Metrics (compared to previous period)
      COUNT(CASE WHEN r.RentalStart >= DATE_SUB(CURDATE(), INTERVAL ? DAY) THEN 1 END) as RecentRentals,
      SUM(CASE WHEN r.RentalStart >= DATE_SUB(CURDATE(), INTERVAL ? DAY) AND r.PaymentStatus = 'Paid' 
        THEN r.TotalCost ELSE 0 END) as RecentRevenue
      
    FROM rental r
    LEFT JOIN bike b ON r.BikeID = b.BikeID
    LEFT JOIN location l ON b.LocationID = l.LocationID
    WHERE r.RentalStart >= DATE_SUB(CURDATE(), INTERVAL ? MONTH)
  `
};

// =============================================================================
// UTILITY FUNCTIONS FOR QUERY EXECUTION
// =============================================================================

export type QueryParams = (string | number | Date | null | undefined)[];

export interface QueryResult {
  success: boolean;
  data?: any;
  error?: string;
  rowCount?: number;
}

/**
 * Helper function to execute raw SQL queries with Prisma
 * Usage: const result = await executeQuery(prisma, queries.userQueries.getUserByEmail, [email]);
 */
export const executeQuery = async (
  prisma: any,
  query: string,
  params: QueryParams = []
): Promise<QueryResult> => {
  try {
    // Use MySQL-style ? placeholders directly with Prisma
    const result = await prisma.$queryRawUnsafe(query, ...params);
    
    // Convert BigInt values to regular numbers for JSON serialization
    const serializedResult = Array.isArray(result) 
      ? result.map(row => {
          const serialized: any = {};
          for (const [key, value] of Object.entries(row as any)) {
            serialized[key] = typeof value === 'bigint' ? Number(value) : value;
          }
          return serialized;
        })
      : result;
    
    return {
      success: true,
      data: serializedResult,
      rowCount: Array.isArray(serializedResult) ? serializedResult.length : 1
    };
  } catch (error) {
    console.error('Query execution error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

/**
 * Helper function for INSERT queries that return the inserted ID
 */
export const executeInsertQuery = async (
  prisma: any,
  query: string,
  params: QueryParams = []
): Promise<QueryResult & { insertId?: number }> => {
  try {
    // Use MySQL-style ? placeholders directly with Prisma
    const result = await prisma.$executeRawUnsafe(query, ...params);
    
    // For INSERT queries, get the last inserted ID
    const lastInsertResult = await prisma.$queryRawUnsafe('SELECT LAST_INSERT_ID() as insertId');
    const rawInsertId = Array.isArray(lastInsertResult) && lastInsertResult[0] 
      ? lastInsertResult[0].insertId 
      : undefined;
    
    // Convert BigInt insertId to number
    const insertId = typeof rawInsertId === 'bigint' ? Number(rawInsertId) : rawInsertId;
    
    return {
      success: true,
      data: result,
      insertId,
      rowCount: typeof result === 'number' ? result : 1
    };
  } catch (error) {
    console.error('Insert query execution error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
  