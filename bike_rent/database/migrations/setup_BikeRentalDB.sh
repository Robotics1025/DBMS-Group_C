#!/bin/bash

# ============================================================================
# BikeRentalDB - Automated Database Setup Script (Linux/Mac)
# ============================================================================
# This script automates the complete database setup process
# Run this after cloning the repository to set up your local database
# ============================================================================

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}╔══════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║         BikeRentalDB - Automated Setup Script                   ║${NC}"
echo -e "${CYAN}║         Database Initialization for BikeRent Application         ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════════════════════════════════╝${NC}"
echo ""

# ============================================================================
# Step 1: Check MySQL Installation
# ============================================================================
echo -e "${YELLOW}[1/6] Checking MySQL installation...${NC}"
if ! command -v mysql &> /dev/null; then
    echo -e "${RED}❌ MySQL is not installed or not in PATH${NC}"
    echo -e "${YELLOW}Please install MySQL and try again${NC}"
    exit 1
fi
echo -e "${GREEN}✅ MySQL found${NC}"
echo ""

# ============================================================================
# Step 2: Get MySQL Credentials
# ============================================================================
echo -e "${YELLOW}[2/6] MySQL Connection Setup${NC}"
read -p "Enter MySQL username (default: root): " MYSQL_USER
MYSQL_USER=${MYSQL_USER:-root}

read -sp "Enter MySQL password: " MYSQL_PASSWORD
echo ""
echo ""

# ============================================================================
# Step 3: Test MySQL Connection
# ============================================================================
echo -e "${YELLOW}[3/6] Testing MySQL connection...${NC}"
if ! mysql -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" -e "SELECT 1;" &> /dev/null; then
    echo -e "${RED}❌ Failed to connect to MySQL${NC}"
    echo -e "${YELLOW}Please check your credentials and try again${NC}"
    exit 1
fi
echo -e "${GREEN}✅ MySQL connection successful${NC}"
echo ""

# ============================================================================
# Step 4: Confirm Installation
# ============================================================================
echo -e "${CYAN}════════════════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}⚠️  WARNING: This will create/recreate the BikeRentalDB database${NC}"
echo -e "${YELLOW}   All existing data in BikeRentalDB will be preserved unless tables conflict${NC}"
echo -e "${CYAN}════════════════════════════════════════════════════════════════${NC}"
echo ""
read -p "Do you want to continue? (yes/no): " CONFIRM

if [[ "$CONFIRM" != "yes" ]]; then
    echo -e "${YELLOW}Setup cancelled by user${NC}"
    exit 0
fi
echo ""

# ============================================================================
# Step 5: Run Migration Files
# ============================================================================
echo -e "${YELLOW}[4/6] Running database migrations...${NC}"
echo ""

# Migration 1: Create Schema with Triggers
echo -e "${CYAN}Running: 001_create_database_schema_with_triggers.sql${NC}"
if mysql -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" < 001_create_database_schema_with_triggers.sql; then
    echo -e "${GREEN}✅ Database schema and triggers created${NC}"
else
    echo -e "${RED}❌ Failed to create schema${NC}"
    exit 1
fi
echo ""

# Migration 2: Insert Sample Data
echo -e "${CYAN}Running: 002_insert_sample_data_BikeRentalDB.sql${NC}"
if mysql -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" < 002_insert_sample_data_BikeRentalDB.sql; then
    echo -e "${GREEN}✅ Sample data inserted${NC}"
else
    echo -e "${RED}❌ Failed to insert sample data${NC}"
    exit 1
fi
echo ""

# Migration 4: Create BikeImages Table
echo -e "${CYAN}Running: 004_add_bike_images_table.sql${NC}"
if mysql -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" < 004_add_bike_images_table.sql; then
    echo -e "${GREEN}✅ BikeImages table created${NC}"
else
    echo -e "${RED}❌ Failed to create BikeImages table${NC}"
    exit 1
fi
echo ""

# Migration 5: Insert Bike Images Data
echo -e "${CYAN}Running: 005_insert_bike_images_data.sql${NC}"
if mysql -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" < 005_insert_bike_images_data.sql; then
    echo -e "${GREEN}✅ Bike images data inserted${NC}"
else
    echo -e "${RED}❌ Failed to insert bike images data${NC}"
    exit 1
fi
echo ""

# ============================================================================
# Step 6: Verify Installation
# ============================================================================
echo -e "${YELLOW}[5/6] Verifying installation...${NC}"
VERIFICATION=$(mysql -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" -D BikeRentalDB -se "
SELECT CONCAT(
    'Tables: ', (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'BikeRentalDB'),
    ' | Triggers: ', (SELECT COUNT(*) FROM information_schema.triggers WHERE trigger_schema = 'BikeRentalDB'),
    ' | Users: ', (SELECT COUNT(*) FROM User),
    ' | Bikes: ', (SELECT COUNT(*) FROM Bike),
    ' | Images: ', (SELECT COUNT(*) FROM BikeImages)
);
")

echo -e "${GREEN}✅ Installation verified:${NC}"
echo -e "${CYAN}   $VERIFICATION${NC}"
echo ""

# ============================================================================
# Step 7: Display Next Steps
# ============================================================================
echo -e "${GREEN}╔══════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                  ✅ Setup Complete!                              ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${CYAN}📋 Next Steps:${NC}"
echo ""
echo -e "${YELLOW}1. Update your .env file:${NC}"
echo -e "   ${CYAN}DATABASE_URL=\"mysql://$MYSQL_USER:YOUR_PASSWORD@localhost:3306/BikeRentalDB\"${NC}"
echo ""
echo -e "${YELLOW}2. Generate Prisma Client:${NC}"
echo -e "   ${CYAN}npx prisma generate${NC}"
echo ""
echo -e "${YELLOW}3. Start your development server:${NC}"
echo -e "   ${CYAN}npm run dev${NC}"
echo ""
echo -e "${YELLOW}4. Test with sample credentials:${NC}"
echo -e "   ${CYAN}Customer: john.doe@email.com / password123${NC}"
echo -e "   ${CYAN}Staff: michael.davis@bikerent.com / password123${NC}"
echo -e "   ${CYAN}Admin: admin@bikerent.com / password123${NC}"
echo ""
echo -e "${RED}⚠️  Remember to change default passwords in production!${NC}"
echo ""
echo -e "${GREEN}════════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}Happy coding! 🚀${NC}"
echo -e "${GREEN}════════════════════════════════════════════════════════════════${NC}"
