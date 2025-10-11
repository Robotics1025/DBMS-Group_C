# ============================================================================
# BikeRent Database Setup Script - Windows PowerShell
# ============================================================================
# This script automates the database setup process
# Run this from the migrations directory
# ============================================================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  BikeRent Database Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if MySQL is accessible
Write-Host "Checking MySQL installation..." -ForegroundColor Yellow
$mysqlCheck = Get-Command mysql -ErrorAction SilentlyContinue

if (-not $mysqlCheck) {
    Write-Host "ERROR: MySQL command not found!" -ForegroundColor Red
    Write-Host "Please ensure MySQL is installed and added to PATH" -ForegroundColor Red
    Write-Host "Download from: https://dev.mysql.com/downloads/installer/" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ MySQL found" -ForegroundColor Green
Write-Host ""

# Get MySQL credentials
Write-Host "MySQL Connection Details:" -ForegroundColor Yellow
$mysqlUser = Read-Host "Enter MySQL username (default: root)"
if ([string]::IsNullOrWhiteSpace($mysqlUser)) {
    $mysqlUser = "root"
}

$mysqlPassword = Read-Host "Enter MySQL password" -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($mysqlPassword)
$mysqlPasswordPlain = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

Write-Host ""
Write-Host "Testing MySQL connection..." -ForegroundColor Yellow

# Test connection
$testConnection = "SELECT 1;" | mysql -u $mysqlUser -p$mysqlPasswordPlain 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Cannot connect to MySQL!" -ForegroundColor Red
    Write-Host "Please check your username and password" -ForegroundColor Red
    exit 1
}

Write-Host "✓ MySQL connection successful" -ForegroundColor Green
Write-Host ""

# Confirm before proceeding
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "This will:" -ForegroundColor Yellow
Write-Host "  1. Create 'bikerent' database" -ForegroundColor White
Write-Host "  2. Create all tables" -ForegroundColor White
Write-Host "  3. Insert sample data" -ForegroundColor White
Write-Host "  4. Apply schema updates" -ForegroundColor White
Write-Host ""
Write-Host "WARNING: This will drop existing 'bikerent' database!" -ForegroundColor Red
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$confirm = Read-Host "Continue? (yes/no)"
if ($confirm -ne "yes") {
    Write-Host "Setup cancelled" -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting Database Setup..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Create Database Schema
Write-Host "[1/3] Creating database schema..." -ForegroundColor Yellow
Get-Content "001_create_database_schema.sql" | mysql -u $mysqlUser -p$mysqlPasswordPlain 2>&1 | Out-Null

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Database schema created successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to create database schema" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 2: Insert Sample Data
Write-Host "[2/3] Inserting sample data..." -ForegroundColor Yellow
Get-Content "002_insert_sample_data.sql" | mysql -u $mysqlUser -p$mysqlPasswordPlain 2>&1 | Out-Null

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Sample data inserted successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to insert sample data" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 3: Apply Schema Alterations
Write-Host "[3/3] Applying schema updates..." -ForegroundColor Yellow
Get-Content "003_alter_schema.sql" | mysql -u $mysqlUser -p$mysqlPasswordPlain 2>&1 | Out-Null

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Schema updates applied successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to apply schema updates" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Verify Installation
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Verifying Installation..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$verifyQuery = @"
USE bikerent;
SELECT 
    (SELECT COUNT(*) FROM location) AS Locations,
    (SELECT COUNT(*) FROM user) AS Users,
    (SELECT COUNT(*) FROM bike) AS Bikes,
    (SELECT COUNT(*) FROM rental) AS Rentals,
    (SELECT COUNT(*) FROM payment) AS Payments;
"@

Write-Host "Database Statistics:" -ForegroundColor Yellow
$verifyQuery | mysql -u $mysqlUser -p$mysqlPasswordPlain -t

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Update your .env file:" -ForegroundColor White
Write-Host "   DATABASE_URL=`"mysql://$mysqlUser:yourpassword@localhost:3306/bikerent`"" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Generate Prisma client:" -ForegroundColor White
Write-Host "   npx prisma generate" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Start the development server:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Cyan
Write-Host ""

Write-Host "Sample Login Credentials:" -ForegroundColor Yellow
Write-Host "  Customer: john.doe@email.com / password123" -ForegroundColor White
Write-Host "  Staff: michael.davis@bikerent.com / password123" -ForegroundColor White
Write-Host "  Admin: admin@bikerent.com / password123" -ForegroundColor White
Write-Host ""

Write-Host "✓ All done! Happy coding! 🚴‍♂️" -ForegroundColor Green
