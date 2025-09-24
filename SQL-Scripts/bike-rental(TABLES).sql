-- Create the Customer Table
CREATE TABLE Customer (
    CustomerID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    NationalID VARCHAR(20) NOT NULL UNIQUE,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    PhoneNumber VARCHAR(20),
    DateOfBirth DATE,
    RegistrationDate DATETIME NOT NULL,
    PasswordHash CHAR(255) NOT NULL,
    PRIMARY KEY (CustomerID)
);

-- Create the Location Table
CREATE TABLE Location (
    LocationID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    LocationName VARCHAR(100) NOT NULL UNIQUE,
    Address VARCHAR(255) NOT NULL,
    City VARCHAR(50) NOT NULL,
    PhoneNumber VARCHAR(20),
    Capacity INT UNSIGNED,
    PRIMARY KEY (LocationID)
);

-- Create the Staff Table
CREATE TABLE Staff (
    StaffID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    NationalID VARCHAR(20) NOT NULL UNIQUE,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    PhoneNumber VARCHAR(20) NOT NULL,
    Role ENUM('Staff', 'Administrator') NOT NULL,
    DateHired DATE NOT NULL,
    PasswordHash CHAR(255) NOT NULL,
    PRIMARY KEY (StaffID)
);

-- Create the Bike Table
CREATE TABLE Bike (
    BikeID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    BikeSerialNumber VARCHAR(50) NOT NULL UNIQUE,
    Model VARCHAR(50),
    BikeType VARCHAR(30) NOT NULL,
    CurrentStatus ENUM('Available', 'Rented', 'In Maintenance') NOT NULL,
    LastMaintenanceDate DATE,
    RentalRatePerMinute DECIMAL(5, 2) NOT NULL,
    LocationID INT UNSIGNED NOT NULL,
    PRIMARY KEY (BikeID),
    FOREIGN KEY (LocationID) REFERENCES Location(LocationID)
);

-- Create the Rental Table
CREATE TABLE Rental (
    RentalID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    CustomerID INT UNSIGNED NOT NULL,
    BikeID INT UNSIGNED NOT NULL,
    RentalStart DATETIME NOT NULL,
    RentalEnd DATETIME NOT NULL,
    TotalCost DECIMAL(8, 2) NOT NULL,
    PaymentStatus ENUM('Pending', 'Paid', 'Cancelled') NOT NULL,
    PRIMARY KEY (RentalID),
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID),
    FOREIGN KEY (BikeID) REFERENCES Bike(BikeID)
);

-- Create the Payment Table
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

-- Create the Maintenance Table
CREATE TABLE Maintenance (
    MaintenanceID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    BikeID INT UNSIGNED NOT NULL,
    StaffID INT UNSIGNED NOT NULL,
    MaintenanceDate DATETIME NOT NULL,
    Description TEXT NOT NULL,
    Cost DECIMAL(8, 2) NOT NULL,
    PRIMARY KEY (MaintenanceID),
    FOREIGN KEY (BikeID) REFERENCES Bike(BikeID),
    FOREIGN KEY (StaffID) REFERENCES Staff(StaffID)
);

-- Create the Feedback Table
CREATE TABLE Feedback (
    FeedbackID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    RentalID INT UNSIGNED NOT NULL UNIQUE,
    Rating TINYINT NOT NULL,
    Comments TEXT,
    FeedbackDate DATETIME NOT NULL,
    PRIMARY KEY (FeedbackID),
    FOREIGN KEY (RentalID) REFERENCES Rental(RentalID)
);
