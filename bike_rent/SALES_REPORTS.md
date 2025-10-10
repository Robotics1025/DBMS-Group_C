# 📊 BikeRental Sales Reports Documentation

## Overview
This comprehensive sales reporting system provides detailed analytics for your bike rental business. The reports help you track revenue, customer behavior, operational efficiency, and business growth trends.

## Available Report Types

### 1. 📅 Daily Sales Report
**Endpoint:** `GET /api/reports/sales?type=daily&startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`

**Purpose:** Track daily performance metrics
**Use Case:** Monitor day-to-day operations, identify peak days, track daily revenue targets

**Sample Data:**
```json
{
  "SalesDate": "2025-10-09",
  "TotalRentals": 45,
  "TotalRevenue": 2250.75,
  "AvgRentalDurationMinutes": 85,
  "UniqueCustomers": 38,
  "PaidRentals": 42,
  "PendingPayments": 3,
  "CancelledRentals": 0
}
```

### 2. 📊 Monthly Sales Report
**Endpoint:** `GET /api/reports/sales?type=monthly&months=12`

**Purpose:** Analyze monthly trends and seasonal patterns
**Use Case:** Budget planning, seasonal inventory management, staff scheduling

**Key Metrics:**
- Total rentals per month
- Monthly revenue trends
- Average rental duration
- Unique customer count
- Revenue per rental ratio

### 3. 📈 Quarterly Sales Report
**Endpoint:** `GET /api/reports/sales?type=quarterly&quarters=4`

**Purpose:** Track quarterly performance and growth
**Use Case:** Business planning, investor reporting, strategic decision making

**Advanced Analytics:**
- Quarter-over-quarter growth
- Highest/lowest performing quarters
- Seasonal trend analysis
- Revenue growth percentage

### 4. 📅 Yearly Sales Report
**Endpoint:** `GET /api/reports/sales?type=yearly&years=3`

**Purpose:** Long-term business analysis
**Use Case:** Annual reviews, strategic planning, expansion decisions

**Features:**
- Year-over-year growth calculation
- Long-term trend identification
- Business performance benchmarks

### 5. 📍 Location Performance Report
**Endpoint:** `GET /api/reports/sales?type=locations&months=6`

**Purpose:** Compare performance across different bike stations
**Use Case:** Location optimization, expansion planning, resource allocation

**Metrics per Location:**
- Total rentals and revenue
- Revenue per bike ratio
- Customer traffic patterns
- Operational efficiency scores

### 6. 🚴 Bike Type Performance Report
**Endpoint:** `GET /api/reports/sales?type=bike-types&months=6`

**Purpose:** Analyze which bike types are most profitable
**Use Case:** Fleet management, purchasing decisions, pricing strategy

**Analytics:**
- Revenue by bike type
- Utilization rates per bike type
- Average rental duration by type
- Demand patterns

### 7. 👥 Top Customers Report
**Endpoint:** `GET /api/reports/sales?type=top-customers&months=6&limit=50`

**Purpose:** Identify your most valuable customers
**Use Case:** Customer retention, loyalty programs, targeted marketing

**Customer Insights:**
- Total spending per customer
- Rental frequency patterns
- Average rental value
- Customer lifetime value

### 8. 💳 Payment Method Analysis
**Endpoint:** `GET /api/reports/sales?type=payment-methods&months=6`

**Purpose:** Understand payment preferences and transaction patterns
**Use Case:** Payment processing optimization, fraud detection, customer convenience

### 9. ⏰ Peak Usage Hours Report
**Endpoint:** `GET /api/reports/sales?type=peak-usage&months=3`

**Purpose:** Identify peak operating hours
**Use Case:** Staff scheduling, dynamic pricing, maintenance planning

### 10. 📊 Revenue Trend Analysis
**Endpoint:** `GET /api/reports/sales?type=revenue-trend`

**Purpose:** 12-month revenue trend with moving averages
**Use Case:** Forecasting, trend analysis, business health monitoring

**Advanced Features:**
- 3-month moving averages
- Month-over-month growth calculations
- Trend indicators

### 11. 📋 Business Summary Report
**Endpoint:** `GET /api/reports/sales?type=business-summary&months=12&days=30`

**Purpose:** Comprehensive business overview
**Use Case:** Executive dashboards, board meetings, quick business health check

## Usage Examples

### Basic Monthly Report
```bash
curl "http://localhost:3001/api/reports/sales?type=monthly&months=6"
```

### Daily Report for Specific Date Range
```bash
curl "http://localhost:3001/api/reports/sales?type=daily&startDate=2025-10-01&endDate=2025-10-09"
```

### Top 20 Customers in Last 3 Months
```bash
curl "http://localhost:3001/api/reports/sales?type=top-customers&months=3&limit=20"
```

### Custom Report (POST Request)
```bash
curl -X POST "http://localhost:3001/api/reports/sales" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Weekend Revenue Analysis",
    "customQuery": "SELECT DAYNAME(r.RentalStart) as DayOfWeek, SUM(r.TotalCost) as Revenue FROM rental r WHERE DAYOFWEEK(r.RentalStart) IN (1,7) AND r.PaymentStatus = \"Paid\" GROUP BY DAYNAME(r.RentalStart)",
    "parameters": []
  }'
```

## Report Response Format

All reports return data in this standardized format:

```json
{
  "success": true,
  "reportTitle": "Monthly Sales Report (Last 12 months)",
  "reportType": "monthly",
  "generatedAt": "2025-10-10T08:30:00.000Z",
  "parameters": {
    "months": 12,
    "limit": 20
  },
  "summary": {
    "totalRevenue": 125750.25,
    "totalRentals": 2847,
    "averageRevenuePerRental": 44.18,
    "totalPeriods": 12
  },
  "data": [
    {
      "SalesYear": 2025,
      "SalesMonth": 10,
      "MonthName": "October",
      "TotalRentals": 245,
      "TotalRevenue": 12875.50
    }
  ],
  "recordCount": 12
}
```

## Business Intelligence Features

### 1. **Growth Metrics**
- Month-over-month growth percentages
- Year-over-year comparisons
- Trend indicators (growing/declining)

### 2. **Performance Benchmarks**
- Revenue per bike ratios
- Customer acquisition metrics
- Operational efficiency scores

### 3. **Predictive Analytics**
- Moving averages for forecasting
- Seasonal pattern identification
- Peak usage predictions

### 4. **Customer Insights**
- Customer lifetime value calculations
- Retention rate analysis
- Usage pattern identification

## Integration with Staff Dashboard

These reports can be easily integrated into your staff dashboard:

```typescript
// Example: Fetch monthly sales data
const fetchMonthlySales = async () => {
  const response = await fetch('/api/reports/sales?type=monthly&months=6');
  const data = await response.json();
  return data;
};

// Example: Generate top customers report
const fetchTopCustomers = async () => {
  const response = await fetch('/api/reports/sales?type=top-customers&months=3&limit=10');
  const data = await response.json();
  return data;
};
```

## Performance Considerations

1. **Large Dataset Handling:** Reports automatically limit results and use efficient queries
2. **Caching:** Consider implementing Redis caching for frequently accessed reports
3. **Pagination:** Available for large datasets (add `offset` and `limit` parameters)
4. **Real-time vs Batch:** Daily reports can be generated in real-time; complex analytics might benefit from scheduled batch processing

## Security & Permissions

- All reports require proper authentication
- Staff and Administrator roles have access
- Custom queries are restricted to SELECT statements only
- Parameter validation prevents SQL injection

## Export Options (Future Enhancement)

Consider adding these export formats:
- CSV export for Excel analysis
- PDF reports for sharing
- Scheduled email reports
- Dashboard widgets

This sales reporting system provides comprehensive business intelligence to help you make data-driven decisions and grow your bike rental business! 📊🚴‍♂️