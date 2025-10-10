# DBMS-Group_C

## BIKE RENTAL DATABASE MANAGEMENT SYSTEM

A comprehensive Database Management System designed to streamline the operations of a modern bike rental business. This system facilitates bike rentals, returns, customer management, payment processing, and detailed reporting.


## 🎯 Purpose & Scope

The primary purpose of this DBMS is to effectively manage all core operations of a bike rental service, including:

Bike Management: Tracking inventory, status, and location of all bicycles.

Customer Management: Handling customer registrations, profiles, and rental history.

Rental/Return Processing: Managing the complete lifecycle of a rental transacti

Payment Processing: Recording transactions via multiple payment methods.

Reporting: Generating insights into revenue, bike usage, and business performance.



## 👥 Main User Groups

The system is designed for three distinct user groups:

Customers: Can view available bikes, register accounts, rent bikes, view rental history, and make payments.

Staff: Can process rentals and returns, manage bike inventory, check bike conditions, and handle customer accounts.

Administrators: Have full system access to generate reports, manage all data, manage staff accounts, and configure rental locations.


## Table of Contents

- Prerequisites
- Installation (development)
- Environment variables
- Database setup & seeding
- Run (development & production)
- Prisma quick reference
- Project structure
- Testing & linting
- Contributing
- Documentation & ERD
- Maintainers

## Prerequisites

- Node.js v18+ 
- MySQL server 
- Git

## Installation (development)

Clone the repository:

git clone <git@github.com:Robotics1025/DBMS-Group_C.git>

cd DBMS-Group_C

## Install dependencies for the Next.js app:

cd bike_rent
npm install

## Create an environment file:

create bike_rent/.env and add variables as shown below.

Environment variables
Create bike_rent/.env and set at minimum:

DATABASE_URL — e.g.:
DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/DATABASE_NAME"
NEXT_PUBLIC_BASE_URL — e.g.:
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
(Optional) NEXTAUTH_URL, NEXTAUTH_SECRET if you use NextAuth or other auth providers.

## Database setup & seeding
This project includes Prisma and SQL scripts for initializing or populating the database.

From project root:

mysql -u root -p bike_rental_db < "SQL-Scripts/bike-rental-seed.sql"

## Run the app
Development

From bike_rent:
npm run dev

## Build & Production

Build:
npm run build
Start:
npm start
For production deployments, consider using Vercel, Netlify (for frontend), or a Node process manager (PM2) and a managed MySQL instance.


# 🗄️ Core Entities & Database Schema

The system is built around the following key entities and their relationships:

## Database Entities

| Entity            | Description                                      | Key Attributes                                                                 |
|-------------------|--------------------------------------------------|--------------------------------------------------------------------------------|
| **Customer**      | Individuals who rent bikes.                      | `CustomerID` (PK), `FirstName`, `LastName`, `Email`, `PasswordHash`            |
| **Bike**          | Individual bicycles in the inventory.            | `BikeID` (PK), `BikeSerialNumber`, `Model`, `BikeType`, `CurrentStatus`, `RentalRatePerMinute` |
| **Rental**        | Core transactional record of a bike rental.      | `RentalID` (PK), `CustomerID` (FK), `BikeID` (FK), `RentalStartDate`, `RentalEndDate`, `TotalCost` |
| **Location**      | Physical stations for renting/returning bikes.   | `LocationID` (PK), `LocationName`, `Address`, `Capacity`                       |
| **Staff**         | Employees managing operations.                   | `StaffID` (PK), `FirstName`, `LastName`, `Role`, `LocationID` (FK)             |
| **Payment**       | Records of all financial transactions.           | `PaymentID` (PK), `RentalID` (FK), `Amount`, `PaymentMethod`, `TransactionID`  |
| **Maintenance Log**| History of bike servicing and repairs.           | `LogID` (PK), `BikeID` (FK), `MaintenanceDate`, `Description`, `Cost`          |
## Legend
- **PK**: Primary Key
- **FK**: Foreign Key        

A detailed Entity-Relationship Diagram (ERD) is available in the project documentation.





## ⚙️ Key System Functions

-Bike & Inventory Management: Add, update, remove, and track the status and location of bikes.

-Customer Account Management: Register new customers and maintain their profiles and history.

-Rental Process: Handle the complete process from bike check-out to check-in and cost calculation.

-Payment Processing: Support for various payment methods (Credit Card, Mobile Money, Cash).

-Maintenance Tracking: Log all service and repair activities for each bike.

-Comprehensive Reporting: Generate reports on revenue, popular bikes, and high-traffic locations.



## 🛠️ Technology Stack

Database System: MySQL

Modeling Tool: Microsoft visio (for ERD)

<<<<<<< HEAD
Backend: (NEXT JS) 

Frontend: (NEXT JS),tailwindcss and prisma for helping generarting the models 
## Prisma 
is an ORM (Object-Relational Mapping) tool for Node.js/TypeScript. It helps you interact with databases (PostgreSQL, MySQL, SQLite, SQL Server, MongoDB) easily, without writing raw SQL.

## It has three main parts:

Prisma Client – auto-generated library to query your database.

Prisma Migrate – for database migrations.

Prisma Studio – a GUI to explore your database.
--npm init -y   (intailize the nodejs prisma)

## Install Prisma CLI and Client:
npm install prisma --save-dev
npm install @prisma/client

## Prisma Commands Cheat Sheet
## Prisma Commands Cheat Sheet

| Command | Description | Example |
|---------|-------------|---------|
| `npx prisma init` | Initialize Prisma in your project. Creates `prisma/` folder and `.env`. | `npx prisma init` |
| `npx prisma migrate dev --name <name>` | Apply migrations during development. Generates SQL migration files and updates DB. | `npx prisma migrate dev --name init` |
| `npx prisma migrate deploy` | Apply pending migrations in production. | `npx prisma migrate deploy` |
| `npx prisma generate` | Generate Prisma Client based on the current schema. | `npx prisma generate` |
| `npx prisma studio` | Open Prisma Studio, a GUI to view and edit your database. | `npx prisma studio` |
| `npx prisma db pull` | Pull an existing database schema into Prisma. | `npx prisma db pull` |
| `npx prisma db push` | Push schema changes directly to the database (without generating migrations). | `npx prisma db push` |
| `npx prisma migrate reset` | Reset the database and reapply all migrations (dev only). | `npx prisma migrate reset` |
| `npx prisma format` | Format the `schema.prisma` file. | `npx prisma format` |


## Workflow for Pulling Existing Database:

npx prisma init → Initialize Prisma

Set DATABASE_URL in .env

npx prisma db pull → Pull existing schema

npx prisma generate → Generate Prisma client

npx prisma studio → Explore DB
=======
Backend: (Proposed) 

Frontend: (Proposed) HTML, CSS, JavaScript, React



>>>>>>> 3c66385 (the frontend)

## High level Project structure 

bike_rent/
    app/ — Next.js app (routes, pages, layouts)
    components/ — React components
    prisma/ — Prisma schema & migrations
    public/ — static assets (images, svg)
    package.json — scripts & dependencies
    next.config.ts, tsconfig.json, etc.
Documentation/ — ERD, data dictionary, SDLC, use cases (PDF/DOCX)

SQL-Scripts

README.md — this file


## 👨‍💻 Development Team (Group C)


Keith Paul Kato - (GitHub: keithpaulkato)

Ageno Elizabeth - (GitHub: AgenoElizabeth)

Mugole Joel - (GitHub: Robotics1025)

Kigozi Allan - (GitHub:)

Nalubega Shadia - (GitHub:)



