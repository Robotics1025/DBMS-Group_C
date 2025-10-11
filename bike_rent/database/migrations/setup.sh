#!/bin/bash

# ============================================================================
# BikeRent Database Setup Script - Linux/Mac
# ============================================================================
# This script automates the database setup process
# Run this from the migrations directory: ./setup.sh
# ============================================================================

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}========================================"
echo -e "  BikeRent Database Setup"
echo -e "========================================${NC}"
echo ""

# Check if MySQL is accessible
echo -e "${YELLOW}Checking MySQL installation...${NC}"
if ! command -v mysql &> /dev/null; then
    echo -e "${RED}ERROR: MySQL command not found!${NC}"
    echo -e "${RED}Please ensure MySQL is installed and added to PATH${NC}"
    echo -e "${YELLOW}Install on Ubuntu/Debian: sudo apt-get install mysql-client${NC}"
    echo -e "${YELLOW}Install on Mac: brew install mysql-client${NC}"
    exit 1
fi

echo -e "${GREEN}✓ MySQL found${NC}"
echo ""

# Get MySQL credentials
echo -e "${YELLOW}MySQL Connection Details:${NC}"
read -p "Enter MySQL username (default: root): " MYSQL_USER
MYSQL_USER=${MYSQL_USER:-root}

read -sp "Enter MySQL password: " MYSQL_PASSWORD
echo ""

# Test connection
echo ""
echo -e "${YELLOW}Testing MySQL connection...${NC}"
if ! mysql -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" -e "SELECT 1;" &> /dev/null; then
    echo -e "${RED}ERROR: Cannot connect to MySQL!${NC}"
    echo -e "${RED}Please check your username and password${NC}"
    exit 1
fi

echo -e "${GREEN}✓ MySQL connection successful${NC}"
echo ""

# Confirm before proceeding
echo -e "${CYAN}========================================${NC}"
echo -e "${YELLOW}This will:${NC}"
echo -e "  ${NC}1. Create 'bikerent' database"
echo -e "  ${NC}2. Create all tables"
echo -e "  ${NC}3. Insert sample data"
echo -e "  ${NC}4. Apply schema updates"
echo ""
echo -e "${RED}WARNING: This will drop existing 'bikerent' database!${NC}"
echo -e "${CYAN}========================================${NC}"
echo ""

read -p "Continue? (yes/no): " CONFIRM
if [ "$CONFIRM" != "yes" ]; then
    echo -e "${YELLOW}Setup cancelled${NC}"
    exit 0
fi

echo ""
echo -e "${CYAN}========================================"
echo -e "Starting Database Setup..."
echo -e "========================================${NC}"
echo ""

# Step 1: Create Database Schema
echo -e "${YELLOW}[1/3] Creating database schema...${NC}"
if mysql -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" < "001_create_database_schema.sql" &> /dev/null; then
    echo -e "${GREEN}✓ Database schema created successfully${NC}"
else
    echo -e "${RED}✗ Failed to create database schema${NC}"
    exit 1
fi

echo ""

# Step 2: Insert Sample Data
echo -e "${YELLOW}[2/3] Inserting sample data...${NC}"
if mysql -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" < "002_insert_sample_data.sql" &> /dev/null; then
    echo -e "${GREEN}✓ Sample data inserted successfully${NC}"
else
    echo -e "${RED}✗ Failed to insert sample data${NC}"
    exit 1
fi

echo ""

# Step 3: Apply Schema Alterations
echo -e "${YELLOW}[3/3] Applying schema updates...${NC}"
if mysql -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" < "003_alter_schema.sql" &> /dev/null; then
    echo -e "${GREEN}✓ Schema updates applied successfully${NC}"
else
    echo -e "${RED}✗ Failed to apply schema updates${NC}"
    exit 1
fi

echo ""

# Verify Installation
echo -e "${CYAN}========================================"
echo -e "Verifying Installation..."
echo -e "========================================${NC}"
echo ""

VERIFY_QUERY="USE bikerent;
SELECT 
    (SELECT COUNT(*) FROM location) AS Locations,
    (SELECT COUNT(*) FROM user) AS Users,
    (SELECT COUNT(*) FROM bike) AS Bikes,
    (SELECT COUNT(*) FROM rental) AS Rentals,
    (SELECT COUNT(*) FROM payment) AS Payments;"

echo -e "${YELLOW}Database Statistics:${NC}"
echo "$VERIFY_QUERY" | mysql -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" -t

echo ""
echo -e "${CYAN}========================================"
echo -e "  ${GREEN}Setup Complete!${NC}"
echo -e "${CYAN}========================================${NC}"
echo ""

echo -e "${YELLOW}Next Steps:${NC}"
echo -e "${NC}1. Update your .env file:"
echo -e "${CYAN}   DATABASE_URL=\"mysql://$MYSQL_USER:yourpassword@localhost:3306/bikerent\"${NC}"
echo ""
echo -e "${NC}2. Generate Prisma client:"
echo -e "${CYAN}   npx prisma generate${NC}"
echo ""
echo -e "${NC}3. Start the development server:"
echo -e "${CYAN}   npm run dev${NC}"
echo ""

echo -e "${YELLOW}Sample Login Credentials:${NC}"
echo -e "${NC}  Customer: john.doe@email.com / password123"
echo -e "${NC}  Staff: michael.davis@bikerent.com / password123"
echo -e "${NC}  Admin: admin@bikerent.com / password123"
echo ""

echo -e "${GREEN}✓ All done! Happy coding! 🚴‍♂️${NC}"
