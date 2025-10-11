# ============================================================================
# BikeRentalDB - Automated Database Setup Script (Windows PowerShell)
# ============================================================================
# This script automates the complete database setup process
# Run this after cloning the repository to set up your local database
# ============================================================================

Write-Host ""
Write-Host "╔══════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║         BikeRentalDB - Automated Setup Script                   ║" -ForegroundColor Cyan
Write-Host "║         Database Initialization for BikeRent Application         ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# ============================================================================
# Step 1: Check MySQL Installation
# ============================================================================
Write-Host "[1/6] Checking MySQL installation..." -ForegroundColor Yellow
try {
    $null = Get-Command mysql -ErrorAction Stop
    Write-Host "✅ MySQL found" -ForegroundColor Green
} catch {
    Write-Host "❌ MySQL is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install MySQL and add it to your PATH, then try again" -ForegroundColor Yellow
    exit 1
}
Write-Host ""

# ============================================================================
# Step 2: Get MySQL Credentials
# ============================================================================
Write-Host "[2/6] MySQL Connection Setup" -ForegroundColor Yellow
$mysqlUser = Read-Host "Enter MySQL username (default: root)"
if ([string]::IsNullOrWhiteSpace($mysqlUser)) {
    $mysqlUser = "root"
}

$securePassword = Read-Host "Enter MySQL password" -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePassword)
$mysqlPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
Write-Host ""

# ============================================================================
# Step 3: Test MySQL Connection
# ============================================================================
Write-Host "[3/6] Testing MySQL connection..." -ForegroundColor Yellow
$testQuery = "SELECT 1;"
$testResult = & mysql -u $mysqlUser -p"$mysqlPassword" -e $testQuery 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to connect to MySQL" -ForegroundColor Red
    Write-Host "Please check your credentials and try again" -ForegroundColor Yellow
    exit 1
}
Write-Host "✅ MySQL connection successful" -ForegroundColor Green
Write-Host ""

# ============================================================================
# Step 4: Confirm Installation
# ============================================================================
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "⚠️  WARNING: This will create/recreate the BikeRentalDB database" -ForegroundColor Yellow
Write-Host "   All existing data in BikeRentalDB will be preserved unless tables conflict" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
$confirm = Read-Host "Do you want to continue? (yes/no)"

if ($confirm -ne "yes") {
    Write-Host "Setup cancelled by user" -ForegroundColor Yellow
    exit 0
}
Write-Host ""

# ============================================================================
# Step 5: Run Migration Files
# ============================================================================
Write-Host "[4/6] Running database migrations..." -ForegroundColor Yellow
Write-Host ""

# Migration 1: Create Schema with Triggers
Write-Host "Running: 001_create_database_schema_with_triggers.sql" -ForegroundColor Cyan
$result1 = & mysql -u $mysqlUser -p"$mysqlPassword" < 001_create_database_schema_with_triggers.sql 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Database schema and triggers created" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to create schema" -ForegroundColor Red
    Write-Host $result1 -ForegroundColor Red
    exit 1
}
Write-Host ""

# Migration 2: Insert Sample Data
Write-Host "Running: 002_insert_sample_data_BikeRentalDB.sql" -ForegroundColor Cyan
$result2 = & mysql -u $mysqlUser -p"$mysqlPassword" < 002_insert_sample_data_BikeRentalDB.sql 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Sample data inserted" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to insert sample data" -ForegroundColor Red
    Write-Host $result2 -ForegroundColor Red
    exit 1
}
Write-Host ""

# Migration 4: Create BikeImages Table
Write-Host "Running: 004_add_bike_images_table.sql" -ForegroundColor Cyan
$result4 = & mysql -u $mysqlUser -p"$mysqlPassword" < 004_add_bike_images_table.sql 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ BikeImages table created" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to create BikeImages table" -ForegroundColor Red
    Write-Host $result4 -ForegroundColor Red
    exit 1
}
Write-Host ""

# Migration 5: Insert Bike Images Data
Write-Host "Running: 005_insert_bike_images_data.sql" -ForegroundColor Cyan
$result5 = & mysql -u $mysqlUser -p"$mysqlPassword" < 005_insert_bike_images_data.sql 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Bike images data inserted" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to insert bike images data" -ForegroundColor Red
    Write-Host $result5 -ForegroundColor Red
    exit 1
}
Write-Host ""

# ============================================================================
# Step 6: Verify Installation
# ============================================================================
Write-Host "[5/6] Verifying installation..." -ForegroundColor Yellow
$verifyQuery = @"
SELECT CONCAT(
    'Tables: ', (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'BikeRentalDB'),
    ' | Triggers: ', (SELECT COUNT(*) FROM information_schema.triggers WHERE trigger_schema = 'BikeRentalDB'),
    ' | Users: ', (SELECT COUNT(*) FROM User),
    ' | Bikes: ', (SELECT COUNT(*) FROM Bike),
    ' | Images: ', (SELECT COUNT(*) FROM BikeImages)
) AS Summary;
"@

$verification = & mysql -u $mysqlUser -p"$mysqlPassword" -D BikeRentalDB -se $verifyQuery 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Installation verified:" -ForegroundColor Green
    Write-Host "   $verification" -ForegroundColor Cyan
} else {
    Write-Host "⚠️  Verification had issues, but installation may be successful" -ForegroundColor Yellow
}
Write-Host ""

# ============================================================================
# Step 7: Display Next Steps
# ============================================================================
Write-Host "╔══════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                  ✅ Setup Complete!                              ║" -ForegroundColor Green
Write-Host "╚══════════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Update your .env file:" -ForegroundColor Yellow
Write-Host "   DATABASE_URL=`"mysql://$mysqlUser`:YOUR_PASSWORD@localhost:3306/BikeRentalDB`"" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Generate Prisma Client:" -ForegroundColor Yellow
Write-Host "   npx prisma generate" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Start your development server:" -ForegroundColor Yellow
Write-Host "   npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "4. Test with sample credentials:" -ForegroundColor Yellow
Write-Host "   Customer: john.doe@email.com / password123" -ForegroundColor Cyan
Write-Host "   Staff: michael.davis@bikerent.com / password123" -ForegroundColor Cyan
Write-Host "   Admin: admin@bikerent.com / password123" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  Remember to change default passwords in production!" -ForegroundColor Red
Write-Host ""
Write-Host "════════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "Happy coding! 🚀" -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""

# Clear sensitive variables
$mysqlPassword = $null
$securePassword = $null
