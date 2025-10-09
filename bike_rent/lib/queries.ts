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
    ) VALUES (?, ?, ?, ?, ?, ?, ?, 'Customer', NOW(), 0)
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
    // Replace ? placeholders with $1, $2, etc. for Prisma raw queries
    let paramIndex = 1;
    const processedQuery = query.replace(/\?/g, () => `$${paramIndex++}`);
    
    const result = await prisma.$queryRawUnsafe(processedQuery, ...params);
    
    return {
      success: true,
      data: result,
      rowCount: Array.isArray(result) ? result.length : 1
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
    let paramIndex = 1;
    const processedQuery = query.replace(/\?/g, () => `$${paramIndex++}`);
    
    const result = await prisma.$executeRawUnsafe(processedQuery, ...params);
    
    // For INSERT queries, get the last inserted ID
    const lastInsertResult = await prisma.$queryRawUnsafe('SELECT LAST_INSERT_ID() as insertId');
    const insertId = Array.isArray(lastInsertResult) && lastInsertResult[0] 
      ? Number(lastInsertResult[0].insertId) 
      : undefined;
    
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
  