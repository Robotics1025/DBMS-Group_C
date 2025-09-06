# DBMS-Group_C
**BIKE RENTAL DATABASE MANAGEMENT SYSTEM**
A comprehensive Database Management System designed to streamline the operations of a modern bike rental business. This system facilitates bike rentals, returns, customer management, payment processing, and detailed reporting.


**🎯 Purpose & Scope**
The primary purpose of this DBMS is to effectively manage all core operations of a bike rental service, including:

Bike Management: Tracking inventory, status, and location of all bicycles.

Customer Management: Handling customer registrations, profiles, and rental history.

Rental/Return Processing: Managing the complete lifecycle of a rental transaction.

Payment Processing: Recording transactions via multiple payment methods.

Reporting: Generating insights into revenue, bike usage, and business performance.


**👥 Main User Groups**
The system is designed for three distinct user groups:

Customers: Can view available bikes, register accounts, rent bikes, view rental history, and make payments.

Staff: Can process rentals and returns, manage bike inventory, check bike conditions, and handle customer accounts.

Administrators: Have full system access to generate reports, manage all data, manage staff accounts, and configure rental locations.


**🗄️ Core Entities & Database Schema**
The system is built around the following key entities and their relationships:

|🗄️ Core Entities & Database Schema
The system is built around the following key entities and their relationships:


# Database Entities

| Entity              | Description                                        | Key Attributes                                                                   |
|--------------------|----------------------------------------------------|----------------------------------------------------------------------------------|
| **Customer**       | Individuals who rent bikes.                        | `CustomerID` (PK), `FirstName`,`LastName`, `Email`, `PasswordHash`             |
| **Bike**           | Individual bicycles in the inventory.              | `BikeID` (PK), `BikeSerialNumber`, `Model`, `BikeType`, `CurrentStatus`, `RentalRatePerMinute` |
| **Rental**         | Core transactional record of a bike rental.       | `RentalID` (PK), `CustomerID` (FK), `BikeID` (FK), `RentalStartDate`, `RentalEndDate`, `TotalCost` |
| **Location**       | Physical stations for renting/returning bikes.    | `LocationID` (PK), `LocationName`, `Address`, `Capacity`                        |
| **Staff**          | Employees managing operations.                     | `StaffID` (PK), `FirstName`, `LastName`, `Role`, `LocationID` (FK)              |
| **Payment**        | Records of all financial transactions.            | `PaymentID` (PK), `RentalID` (FK), `Amount`, `PaymentMethod`, `TransactionID`   |
| **Maintenance Log** | History of bike servicing and repairs.            | `LogID` (PK), `BikeID` (FK), `MaintenanceDate`, `Description`, `Cost`           |

## Legend
- **PK**: Primary Key
- **FK**: Foreign Key

|Entity       |Description                                    |Key Attributes
|-----------  |-----------------------------------------------|-----------------------------------------------------
|**Customer** |Individual who rents a bike.                   | `CustomerID`(PK),`FirstName`,`LastName`, `Email`,
                                                                `PasswordHash`
|-------------|-----------------------------------------------|-----------------------------------------------------
|**Bike**     | Individual bicycles in the inventory.         |`BikeID`(PK),`BikeSerialNumber`,`Model`,`BikeType`,
                                                               `CurrentStatus`, `RentalRatePerMinute`
|-------------|-----------------------------------------------|-----------------------------------------------------
|**Rental**   | Core transactional record of a bike rental.   |`RentalID`(PK),`CustomerID`(FK),`BikeID`(FK), 
                                                               `RentalStartDate`, `RentalEndDate`, `TotalCost` 
|-------------|-----------------------------------------------|-----------------------------------------------------
|**Location** |Physical stations for renting/returning bikes. |`LocationID`(PK),`LocationName`,`Address`, `Capacity`
|-------------|-----------------------------------------------|-----------------------------------------------------
|**Staff**    |Employees managing operations.                 |`StaffID`(PK),`FirstName`,`LastName`,`Role`, 
                                                               `LocationID`(FK)
|-------------|-----------------------------------------------|-----------------------------------------------------
|**Payment**  |Records of all financial transactions.         |`PaymentID`(PK),`RentalID`(FK), `Amount`, 
                                                               `PaymentMethod`, `TransactionID`   
|-------------|-----------------------------------------------|-----------------------------------------------------
|**Maintenance Log**|History of bike servicing and repairs.   |`LogID` (PK),`BikeID`(FK),`MaintenanceDate`, 
                                                               `Description`, `Cost`   
--------------------------------------------------------------------------------------------------------------------
## Legend
- **PK**: Primary Key
- **FK**: Foreign Key        

