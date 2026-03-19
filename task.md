# Admin Performance (/admin/performance)

## Overview
Admin performance page for monitoring system performance, content analytics, cache, database, and security metrics. Contains 5 tabs.

---

# 1. Content Tab

## Activities

### Date Range Filters
- **Last 7 Days**
- **Last 30 Days**
- **Last 12 Months**

### Content Type Filter
- All Content
- Articles
- Products
- Categories

### Export
- **Export Report** button

---

## Content Metrics (6 Cards)
| Metric | Value | Change |
|--------|-------|--------|
| Total Page Views | 1,245,678 | +18.4% |
| Total Clicks | 456,234 | +23.1% |
| Avg. Time on Page | 3:42 | +8.2% |
| Unique Visitors | 234,567 | +15.3% |
| Bounce Rate | 42.3% | -5.2% |
| Articles Published | 728 | +12.5% |

---

## Charts

### Content Performance Trend (Line Chart)
- Articles Published over time
- Page Views (K) over time
- Monthly data for 12 months

### Engagement by Category (Bar Chart)
- Electronics: 85% engagement, 4:32 avg time
- Fashion: 72%, 3:45
- Home & Living: 68%, 5:12
- Beauty: 65%, 3:15
- Sports: 58%, 2:48

---

## Top Performing Content Table
| Content Title | Page Views | Clicks | CTR | Trend |
|---------------|------------|--------|-----|-------|
| Best Selling Products Guide | 45,230 | 12,450 | 27.5% | ↑ |
| Holiday Shopping Tips | 38,920 | 9,870 | 25.4% | ↑ |
| New Arrivals Collection | 32,450 | 8,230 | 25.4% | ↓ |
| Electronics Deals 2024 | 29,870 | 7,560 | 25.3% | ↑ |
| Fashion Trends This Season | 27,650 | 6,890 | 24.9% | ↑ |

---

# 2. System Tab

## Activities

### Controls
- **Auto-refresh** checkbox
- **Export** button
- **Refresh All** button

---

## Memory Usage Card
- **Max Memory**: 512 MB
- **Used Memory**: 245 MB
- **Usage**: 47.8%
- Visual progress bar
- Warning alert if >= 75%

---

## CPU & Threads Card
- **Thread Count**: 124
- **Peak Threads**: 156
- **Daemon Threads**: 98
- **Non-Heap Memory**: 89 MB

---

## Server Status Card
- Status: **Running** (green)
- Message: "All systems operational"

---

## Rate Limiting Card
| Endpoint | Total | /Min | /Sec | Errors |
|----------|-------|------|------|--------|
| /api/products | 45,678 | 234 | 12 | 3 |
| /api/orders | 23,456 | 156 | 8 | 1 |
| /api/users | 12,345 | 89 | 5 | 0 |
| /api/auth | 34,567 | 178 | 9 | 5 |

---

# 3. Cache Tab

## Activities

### Actions
- **Warmup Cache** button
- **Clear All** button

---

## Cache Statistics Table
| Cache Name | Hits | Misses | Hit Rate | Size |
|------------|------|--------|----------|------|
| Token Cache | 125,430 | 23,450 | 84.2% | 45,678 |
| Product Cache | 89,234 | 34,567 | 72.1% | 234,567 |
| Category Cache | 56,789 | 12,345 | 82.1% | 34,567 |
| User Session | 45,678 | 8,901 | 83.7% | 12,345 |

### Hit Rate Color Coding
- >= 80%: Green
- 50-79%: Yellow
- < 50%: Red

---

# 4. Database Tab

## Database Information
- **Product**: PostgreSQL
- **Driver**: psycopg2

---

## Connection Pool
| Metric | Value |
|--------|-------|
| Active | 5 |
| Idle | 15 |
| Total | 20 |
| Max | 50 |
| Utilization | 33% |
| Health | HEALTHY |

---

## Query Performance
- **Total Queries**: 15,234
- **Slow Queries**: 12
- **Avg Time**: 45ms
- **Status**: EXCELLENT

---

# 5. Security Tab

## Security Statistics
| Metric | Value |
|--------|-------|
| Failed Login Attempts | 23 |
| Hit Rate | 94.5% |
| Access Log Size | 45,678 |
| Lockout Duration | 30 min |

### Actions
- **Cleanup** button (clears old logs)

---

# Tabs Summary

| Tab | Purpose | Key Features |
|-----|---------|--------------|
| Content | Content analytics | Page views, clicks, top content, charts |
| System | Server monitoring | Memory, CPU, threads, rate limits |
| Cache | Cache management | Hit rates, warmup, clear cache |
| Database | DB performance | Connection pool, query stats |
| Security | Security metrics | Failed logins, access logs |

---

# Note
This page appears to be for **platform/system monitoring** rather than seller analytics. It shows backend system health rather than sales/performance metrics for sellers.
