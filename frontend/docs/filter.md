# Fynza Filters & Search Requirements

This document outlines all filtering and search functionality implemented across the Fynza e-commerce platform, including UI components, API endpoints, and query parameters.

---

## Table of Contents
1. [Product Filters](#product-filters)
2. [Order Filters](#order-filters)
3. [Search Functionality](#search-functionality)
4. [API Endpoints](#api-endpoints)
5. [GraphQL Queries](#graphql-queries)
6. [Admin Dashboard Filters](#admin-dashboard-filters)
7. [Filter State Management](#filter-state-management)

---

## Product Filters

### UI Filter Components

#### 1. Category Sidebar Filter
**Location:** `components/category-sidebar.tsx`

**Filter Options:**
- **Category**: Fashion, Baby Products
- **Brand**: Multiple brand selection (checkboxes)
- **Size**: Age-based sizing
  - 2-3 Years
  - 6-9 Months
  - 9-12 Months
  - 12-18 Months
  - 18-24 Months
- **Price Range**: Min/Max input fields (GH₵)
  - Default: 40 - 200
  - Apply button to submit
- **Product Rating**: Star-based filtering (1-5 stars)
  - 5★ & above
  - 4★ & above
  - 3★ & above
  - 2★ & above
  - 1★ & above
- **Express Delivery**: Checkbox for express-eligible products
- **Discount Percentage**: Multiple ranges
  - 50% or more
  - 40% or more
  - 30% or more
  - 20% or more
  - 10% or more
  - Less than 10%

#### 2. Filter Bar Component
**Location:** `components/filter-bar.tsx`

**Filter Options:**
- **Express Delivery**: Badge indicator
- **Brand**: Dropdown menu
- **Price**: Dropdown with sort options
  - Low to High
  - High to Low
- **Size**: Dropdown with age ranges
  - 0-3 Months
  - 3-6 Months
  - 6-9 Months
  - 9-12 Months
  - 12-18 Months
  - 18-24 Months
  - 2-3 Years

**Sort Options:**
- Popularity (default)
- Price: Low to High
- Price: High to Low
- Newest

#### 3. Generic Filters Component
**Location:** `components/filters.tsx`

**Filter Options:**
- **Express Delivery**: Badge
- **Brand**: Dropdown
- **Price**: Dropdown with ranges
  - All prices
  - Under GHC 50
  - GHC 50 - 100
  - Over GHC 100
- **Size**: Dropdown with age ranges
  - 0-3 months
  - 3-6 months
  - 6-12 months
  - 1-2 years
- **Product Rating**: Checkboxes (5, 4, 3, 2 stars & above)
- **Discount Percentage**: Checkboxes
  - 50% or more
  - 40% or more
  - 30% or more
  - 20% or more

#### 4. Advanced Filter Components
**Location:** `components/advanced-filters.tsx` ✅ **CREATED**

**Component Features:**
- **Collapsible Design**: Basic filters always visible, advanced filters expandable
- **Comprehensive Filter Groups**: Organized by filter type (status, inventory, discount, etc.)
- **Real-time State Management**: React state hooks for all filter parameters
- **User-friendly UI**: Clean, accessible interface with proper labels and inputs
- **Action Controls**: Apply and reset buttons with proper feedback
- **Tag Management**: Add/remove tags with visual badges
- **Date Pickers**: Calendar-based date selection for date ranges
- **Sorting Options**: Multiple sort criteria with ascending/descending order

**Comprehensive Filter Options:**

**Product Status Filters:**
- **Featured Products**: Checkbox for featured products only
- **New Products**: Checkbox for new arrivals only
- **Bestseller Products**: Checkbox for bestseller products only
- **Active Products**: Checkbox for active products only

**Inventory Status Filters:**
- **In Stock Only**: Checkbox for products with stock > 0
- **Low Stock Only**: Checkbox for products with low stock (e.g., < 10)
- **Out of Stock Only**: Checkbox for out of stock products
- **Needs Reorder**: Checkbox for products needing reorder
- **Stock Quantity Range**: Min/Max input for stock quantity
- **Available Quantity Range**: Min/Max input for available quantity

**Discount Filters:**
- **Has Discount**: Checkbox for discounted products only
- **Discount Percentage Range**: Min/Max input for discount percentage
  - 0% - 100% range
  - Step: 5%

**Rating & Engagement Filters:**
- **Rating Range**: Min/Max slider for product rating (1-5 stars)
- **Minimum Views**: Input for minimum view count
- **Minimum Sales**: Input for minimum sales count
- **Popular Products**: Checkbox for popular products (high views)
- **Trending Products**: Checkbox for trending products (high sales)

**Date Filters:**
- **Created After**: Date picker for products created after specific date
- **Created Before**: Date picker for products created before specific date

**Tag Filters:**
- **Tags**: Multi-select dropdown for product tags
- **Add New Tag**: Input for adding custom tag filters

**Response Options:**
- **Include Category**: Checkbox to include category data in response
- **Include Images**: Checkbox to include image data in response

**Advanced Sorting Options:**
- Sales Count (High to Low)
- Sales Count (Low to High)
- View Count (High to Low)
- View Count (Low to High)
- Discount Percentage (High to Low)
- Stock Quantity (High to Low)

### REST API Product Filters

#### GET /products
**Query Parameters:**
```typescript
{
  // Pagination
  page?: number;              // Default: 1
  limit?: number;             // Default: 20
  
  // Category Filters
  category?: string;          // Category ID or slug
  categoryId?: number;        // Filter by single category ID
  categoryIds?: number[];     // Filter by multiple category IDs
  categoryName?: string;      // Filter by category name (exact match, case-insensitive)
  categorySlug?: string;      // Filter by category slug
  
  // Product Information Filters
  name?: string;              // Product name search
  description?: string;       // Filter by description
  sku?: string;               // Product SKU
  slug?: string;              // Product slug
  keyword?: string;           // Search keyword (searches name, description, SKU)
  
  // Price Filters
  minPrice?: number;          // Minimum price filter
  maxPrice?: number;          // Maximum price filter
  minEffectivePrice?: number; // Minimum effective price (considers discount price if available)
  maxEffectivePrice?: number; // Maximum effective price (considers discount price if available)
  
  // Status Filters
  featured?: boolean;         // Show only featured products
  isNew?: boolean;            // Show only new products
  isActive?: boolean;         // Show only active products
  isBestseller?: boolean;     // Show only bestseller products
  
  // Inventory Filters
  inStockOnly?: boolean;      // Show only in-stock products
  lowStockOnly?: boolean;     // Show only low stock products
  outOfStockOnly?: boolean;   // Show only out of stock products
  needsReorderOnly?: boolean; // Show only products needing reorder
  inventoryStatus?: string;   // Filter by inventory status
  inventoryStatuses?: string[]; // Filter by multiple inventory statuses
  minStock?: number;          // Minimum stock quantity
  maxStock?: number;          // Maximum stock quantity
  minAvailableQuantity?: number; // Minimum available quantity
  
  // Discount Filters
  hasDiscount?: boolean;      // Show only discounted products
  minDiscountPercent?: number; // Minimum discount percentage
  maxDiscountPercent?: number; // Maximum discount percentage
  
  // Rating Filters
  minRating?: number;         // Minimum rating (1-5)
  maxRating?: number;         // Maximum rating (1-5)
  
  // Engagement Filters
  minViews?: number;          // Minimum view count
  maxViews?: number;          // Maximum view count
  minSales?: number;          // Minimum sales count
  popular?: boolean;          // Show only popular products (high view count)
  trending?: boolean;         // Show only trending products (high sales)
  
  // Tag Filters
  tags?: string[];            // Filter by tags
  
  // Date Filters
  createdAfter?: string;      // Created after this date (ISO format)
  createdBefore?: string;     // Created before this date (ISO format)
  
  // Response Options
  includeCategory?: boolean;  // Include category in response (eager loading) - Default: true
  includeImages?: boolean;    // Include images in response (eager loading) - Default: false
  
  // Sorting
  sortBy?: 'price' | 'rating' | 'newest' | 'popularity' | 'sales' | 'views';  // Sort option
}
```

**Example Request:**
```
GET /products?category=fashion&minPrice=50&maxPrice=200&minRating=4&inStockOnly=true&hasDiscount=true&sortBy=price&page=1&limit=20
```

**Advanced Example Request:**
```
GET /products?categoryIds=1,2,3&minPrice=50&maxPrice=200&minRating=4&inStockOnly=true&hasDiscount=true&minDiscountPercent=20&isNew=true&featured=true&includeImages=true&sortBy=popularity&page=1&limit=20
```

#### GET /products/:productId/reviews
**Query Parameters:**
```typescript
{
  page?: number;              // Default: 1
  limit?: number;             // Default: 10
  sortBy?: 'recent' | 'helpful' | 'rating';  // Sort reviews
}
```

**Sort Options:**
- `recent`: Most recent reviews first
- `helpful`: Most helpful reviews first
- `rating`: Highest rated reviews first

### Backend Filter Implementation

#### Database Schema for Filters

**Products Table:**
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY,
  seller_id UUID NOT NULL,
  category_id UUID NOT NULL,
  brand_id UUID,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  discount_percentage DECIMAL(5, 2) DEFAULT 0,
  quantity_in_stock INTEGER DEFAULT 0,
  status ENUM('ACTIVE', 'INACTIVE', 'OUT_OF_STOCK', 'DISCONTINUED') DEFAULT 'ACTIVE',
  rating DECIMAL(3, 2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  express_delivery BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**Categories Table:**
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);
```

**Brands Table:**
```sql
CREATE TABLE brands (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);
```

#### Backend Filter Query Examples

**MySQL/PostgreSQL Query with Filters:**
```sql
SELECT 
  p.id,
  p.name,
  p.price,
  p.original_price,
  p.discount_percentage,
  p.rating,
  p.total_reviews,
  p.quantity_in_stock,
  p.express_delivery,
  c.name as category_name,
  b.name as brand_name
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN brands b ON p.brand_id = b.id
WHERE 
  p.status = 'ACTIVE'
  AND (c.id = ? OR ? IS NULL)  -- Category filter
  AND (b.id = ? OR ? IS NULL)  -- Brand filter
  AND p.price BETWEEN ? AND ?   -- Price range filter
  AND p.rating >= ?             -- Rating filter
  AND (p.quantity_in_stock > 0 OR ? = FALSE)  -- Stock filter
  AND (p.express_delivery = TRUE OR ? = FALSE) -- Express delivery filter
  AND p.discount_percentage >= ?  -- Discount filter
ORDER BY 
  CASE 
    WHEN ? = 'price' THEN p.price
    WHEN ? = 'rating' THEN p.rating
    WHEN ? = 'newest' THEN p.created_at
  END
LIMIT ? OFFSET ?;
```

**Node.js/Express Implementation:**
```javascript
// GET /api/v1/products
app.get('/api/v1/products', async (req, res) => {
  try {
    const {
      category,
      brand,
      minPrice,
      maxPrice,
      minRating,
      inStock,
      expressDelivery,
      discountMin,
      sortBy = 'popularity',
      page = 1,
      limit = 20
    } = req.query;

    // Build query
    let query = `
      SELECT * FROM products 
      WHERE status = 'ACTIVE'
    `;
    let params = [];
    let paramIndex = 1;

    // Apply filters
    if (category) {
      query += ` AND category_id = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }

    if (brand) {
      query += ` AND brand_id = $${paramIndex}`;
      params.push(brand);
      paramIndex++;
    }

    if (minPrice) {
      query += ` AND price >= $${paramIndex}`;
      params.push(minPrice);
      paramIndex++;
    }

    if (maxPrice) {
      query += ` AND price <= $${paramIndex}`;
      params.push(maxPrice);
      paramIndex++;
    }

    if (minRating) {
      query += ` AND rating >= $${paramIndex}`;
      params.push(minRating);
      paramIndex++;
    }

    if (inStock === 'true') {
      query += ` AND quantity_in_stock > 0`;
    }

    if (expressDelivery === 'true') {
      query += ` AND express_delivery = true`;
    }

    if (discountMin) {
      query += ` AND discount_percentage >= $${paramIndex}`;
      params.push(discountMin);
      paramIndex++;
    }

    // Add sorting
    const sortMap = {
      'popularity': 'total_reviews DESC',
      'price': 'price ASC',
      'price-desc': 'price DESC',
      'rating': 'rating DESC',
      'newest': 'created_at DESC'
    };
    query += ` ORDER BY ${sortMap[sortBy] || sortMap['popularity']}`;

    // Add pagination
    const offset = (page - 1) * limit;
    query += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    // Execute query
    const result = await db.query(query, params);

    // Get total count for pagination
    const countResult = await db.query(
      'SELECT COUNT(*) as total FROM products WHERE status = $1',
      ['ACTIVE']
    );

    res.json({
      success: true,
      data: {
        products: result.rows,
        pagination: {
          total: parseInt(countResult.rows[0].total),
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(countResult.rows[0].total / limit),
          hasMore: offset + limit < countResult.rows[0].total
        }
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products'
    });
  }
});
```

**Python/Flask Implementation:**
```python
from flask import request, jsonify
from sqlalchemy import and_, or_

@app.route('/api/v1/products', methods=['GET'])
def get_products():
    try:
        # Get filter parameters
        category = request.args.get('category')
        brand = request.args.get('brand')
        min_price = request.args.get('minPrice', type=float)
        max_price = request.args.get('maxPrice', type=float)
        min_rating = request.args.get('minRating', type=float)
        in_stock = request.args.get('inStock')
        express_delivery = request.args.get('expressDelivery')
        discount_min = request.args.get('discountMin', type=float)
        sort_by = request.args.get('sortBy', 'popularity')
        page = request.args.get('page', 1, type=int)
        limit = request.args.get('limit', 20, type=int)

        # Build query
        query = Product.query.filter(Product.status == 'ACTIVE')
        
        # Apply filters
        if category:
            query = query.filter(Product.category_id == category)
        
        if brand:
            query = query.filter(Product.brand_id == brand)
        
        if min_price:
            query = query.filter(Product.price >= min_price)
        
        if max_price:
            query = query.filter(Product.price <= max_price)
        
        if min_rating:
            query = query.filter(Product.rating >= min_rating)
        
        if in_stock == 'true':
            query = query.filter(Product.quantity_in_stock > 0)
        
        if express_delivery == 'true':
            query = query.filter(Product.express_delivery == True)
        
        if discount_min:
            query = query.filter(Product.discount_percentage >= discount_min)

        # Apply sorting
        sort_map = {
            'popularity': Product.total_reviews.desc(),
            'price': Product.price.asc(),
            'price-desc': Product.price.desc(),
            'rating': Product.rating.desc(),
            'newest': Product.created_at.desc()
        }
        query = query.order_by(sort_map.get(sort_by, sort_map['popularity']))

        # Apply pagination
        offset = (page - 1) * limit
        products = query.limit(limit).offset(offset).all()
        total = query.count()

        return jsonify({
            'success': True,
            'data': {
                'products': [p.to_dict() for p in products],
                'pagination': {
                    'total': total,
                    'page': page,
                    'limit': limit,
                    'totalPages': (total + limit - 1) // limit,
                    'hasMore': offset + limit < total
                }
            }
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
```

#### Filter Parameter Validation

**Backend Validation Rules:**
```typescript
interface ProductFilterParams {
  // Pagination
  page?: number;              // Must be >= 1
  limit?: number;             // Must be 1-100
  
  // Category Filters
  category?: string;          // Must be valid UUID or slug
  categoryId?: number;        // Must be valid numeric ID
  categoryIds?: number[];     // Must be array of valid numeric IDs
  categoryName?: string;      // Must be non-empty string
  categorySlug?: string;      // Must be valid slug format
  
  // Product Information Filters
  name?: string;              // Must be non-empty string
  description?: string;       // Must be non-empty string
  sku?: string;               // Must be valid SKU format
  slug?: string;              // Must be valid slug format
  keyword?: string;           // Must be non-empty string
  
  // Price Filters
  minPrice?: number;          // Must be >= 0
  maxPrice?: number;          // Must be > minPrice
  minEffectivePrice?: number; // Must be >= 0
  maxEffectivePrice?: number; // Must be > minEffectivePrice
  
  // Status Filters
  featured?: boolean;         // Must be true/false
  isNew?: boolean;            // Must be true/false
  isActive?: boolean;         // Must be true/false
  isBestseller?: boolean;     // Must be true/false
  
  // Inventory Filters
  inStockOnly?: boolean;      // Must be true/false
  lowStockOnly?: boolean;     // Must be true/false
  outOfStockOnly?: boolean;   // Must be true/false
  needsReorderOnly?: boolean; // Must be true/false
  inventoryStatus?: string;   // Must be valid inventory status
  inventoryStatuses?: string[]; // Must be array of valid inventory statuses
  minStock?: number;          // Must be >= 0
  maxStock?: number;          // Must be > minStock
  minAvailableQuantity?: number; // Must be >= 0
  
  // Discount Filters
  hasDiscount?: boolean;      // Must be true/false
  minDiscountPercent?: number; // Must be 0-100
  maxDiscountPercent?: number; // Must be 0-100 and > minDiscountPercent
  
  // Rating Filters
  minRating?: number;         // Must be 1-5
  maxRating?: number;         // Must be 1-5 and > minRating
  
  // Engagement Filters
  minViews?: number;          // Must be >= 0
  maxViews?: number;          // Must be > minViews
  minSales?: number;          // Must be >= 0
  popular?: boolean;          // Must be true/false
  trending?: boolean;         // Must be true/false
  
  // Tag Filters
  tags?: string[];            // Must be array of non-empty strings
  
  // Date Filters
  createdAfter?: string;      // Must be valid ISO date string
  createdBefore?: string;     // Must be valid ISO date string and after createdAfter
  
  // Response Options
  includeCategory?: boolean;  // Must be true/false
  includeImages?: boolean;    // Must be true/false
  
  // Brand Filter
  brand?: string;            // Must be valid UUID
  
  // Express Delivery Filter
  expressDelivery?: boolean; // Must be true/false
  
  // Sorting
  sortBy?: string;           // Must be one of: popularity, price, price-desc, rating, newest, sales, views
}
```

**Validation Example:**
```javascript
function validateFilters(filters) {
  const errors = [];
  
  // Price validation
  if (filters.minPrice && filters.minPrice < 0) {
    errors.push('minPrice must be positive');
  }
  
  if (filters.maxPrice && filters.minPrice && filters.maxPrice <= filters.minPrice) {
    errors.push('maxPrice must be greater than minPrice');
  }
  
  // Rating validation
  if (filters.minRating && (filters.minRating < 1 || filters.minRating > 5)) {
    errors.push('minRating must be between 1 and 5');
  }
  
  if (filters.maxRating && (filters.maxRating < 1 || filters.maxRating > 5)) {
    errors.push('maxRating must be between 1 and 5');
  }
  
  if (filters.minRating && filters.maxRating && filters.minRating > filters.maxRating) {
    errors.push('minRating must be less than or equal to maxRating');
  }
  
  // Pagination validation
  if (filters.page && filters.page < 1) {
    errors.push('page must be at least 1');
  }
  
  if (filters.limit && (filters.limit < 1 || filters.limit > 100)) {
    errors.push('limit must be between 1 and 100');
  }
  
  // Discount validation
  if (filters.minDiscountPercent && (filters.minDiscountPercent < 0 || filters.minDiscountPercent > 100)) {
    errors.push('minDiscountPercent must be between 0 and 100');
  }
  
  if (filters.maxDiscountPercent && (filters.maxDiscountPercent < 0 || filters.maxDiscountPercent > 100)) {
    errors.push('maxDiscountPercent must be between 0 and 100');
  }
  
  if (filters.minDiscountPercent && filters.maxDiscountPercent && 
      filters.minDiscountPercent > filters.maxDiscountPercent) {
    errors.push('minDiscountPercent must be less than or equal to maxDiscountPercent');
  }
  
  // Stock validation
  if (filters.minStock && filters.minStock < 0) {
    errors.push('minStock must be non-negative');
  }
  
  if (filters.maxStock && filters.minStock && filters.maxStock < filters.minStock) {
    errors.push('maxStock must be greater than or equal to minStock');
  }
  
  // Date validation
  if (filters.createdAfter && filters.createdBefore) {
    const after = new Date(filters.createdAfter);
    const before = new Date(filters.createdBefore);
    if (after >= before) {
      errors.push('createdAfter must be before createdBefore');
    }
  }
  
  // Sort validation
  const validSortOptions = ['popularity', 'price', 'price-desc', 'rating', 'newest', 'sales', 'views'];
  if (filters.sortBy && !validSortOptions.includes(filters.sortBy)) {
    errors.push(`sortBy must be one of: ${validSortOptions.join(', ')}`);
  }
  
  return errors;
}
```

#### Performance Optimization

**Database Indexes:**
```sql
-- Create indexes for faster filtering
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_brand ON products(brand_id);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_rating ON products(rating);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_express_delivery ON products(express_delivery);
CREATE INDEX idx_products_discount ON products(discount_percentage);
CREATE INDEX idx_products_created_at ON products(created_at);

-- Composite indexes for common filter combinations
CREATE INDEX idx_products_category_price ON products(category_id, price);
CREATE INDEX idx_products_brand_rating ON products(brand_id, rating);
CREATE INDEX idx_products_status_price ON products(status, price);
```

**Caching Strategy:**
```javascript
// Cache filter results for 1 hour
const cacheKey = `products:${JSON.stringify(filters)}:${page}:${limit}`;
const cachedResult = await cache.get(cacheKey);

if (cachedResult) {
  return JSON.parse(cachedResult);
}

// Execute query and cache result
const result = await executeQuery(filters, page, limit);
await cache.set(cacheKey, JSON.stringify(result), 3600); // 1 hour TTL
return result;
```

#### Available Filters Endpoint

**Endpoint:** `GET /api/v1/products/filters`

**Purpose:** Get available filter options for current product list

**Response:**
```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "id": "cat_1",
        "name": "Fashion",
        "count": 120
      },
      {
        "id": "cat_2",
        "name": "Electronics",
        "count": 85
      }
    ],
    "brands": [
      {
        "id": "brand_1",
        "name": "Nike",
        "count": 45
      },
      {
        "id": "brand_2",
        "name": "Adidas",
        "count": 38
      }
    ],
    "priceRange": {
      "min": 10,
      "max": 5000
    },
    "ratingRange": {
      "min": 1,
      "max": 5
    }
  }
}
```

**Query to get available filters:**
```sql
-- Available categories
SELECT c.id, c.name, COUNT(p.id) as count
FROM categories c
LEFT JOIN products p ON c.id = p.category_id AND p.status = 'ACTIVE'
GROUP BY c.id, c.name
ORDER BY count DESC;

-- Available brands
SELECT b.id, b.name, COUNT(p.id) as count
FROM brands b
LEFT JOIN products p ON b.id = p.brand_id AND p.status = 'ACTIVE'
GROUP BY b.id, b.name
ORDER BY count DESC;

-- Price range
SELECT MIN(price) as min_price, MAX(price) as max_price
FROM products
WHERE status = 'ACTIVE';
```

#### Error Handling

**Error Responses:**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_FILTERS",
    "message": "Invalid filter parameters",
    "details": {
      "minPrice": "Must be a positive number",
      "maxPrice": "Must be greater than minPrice"
    }
  }
}
```

**Common Error Codes:**
- `INVALID_FILTERS`: Filter parameters are invalid
- `INVALID_PAGINATION`: Page or limit parameters are invalid
- `CATEGORY_NOT_FOUND`: Category ID does not exist
- `BRAND_NOT_FOUND`: Brand ID does not exist
- `DATABASE_ERROR`: Database connection error

#### Testing Filter Implementation

**Unit Tests:**
```javascript
describe('Product Filters', () => {
  test('should filter by category', async () => {
    const response = await request(app)
      .get('/api/v1/products')
      .query({ category: 'fashion' });
    
    expect(response.status).toBe(200);
    expect(response.body.data.products).toHaveLength(10);
  });

  test('should filter by price range', async () => {
    const response = await request(app)
      .get('/api/v1/products')
      .query({ minPrice: 50, maxPrice: 200 });
    
    expect(response.status).toBe(200);
    response.body.data.products.forEach(product => {
      expect(product.price).toBeGreaterThanOrEqual(50);
      expect(product.price).toBeLessThanOrEqual(200);
    });
  });

  test('should return error for invalid price range', async () => {
    const response = await request(app)
      .get('/api/v1/products')
      .query({ minPrice: 200, maxPrice: 50 });
    
    expect(response.status).toBe(422);
    expect(response.body.error.code).toBe('INVALID_FILTERS');
  });
});
```

#### Summary

The backend filter implementation should:
1. ✅ Accept all filter parameters from frontend
2. ✅ Validate all input parameters
3. ✅ Build efficient SQL queries with filters
4. ✅ Apply sorting based on user selection
5. ✅ Implement pagination for large result sets
6. ✅ Return available filter options
7. ✅ Handle errors gracefully
8. ✅ Optimize performance with indexes and caching
9. ✅ Provide comprehensive error messages
10. ✅ Support all filter combinations

---

## Order Filters

### Admin Orders Table Filters
**Location:** `components/admin/orders-table.tsx`

**Filter Options:**
- **Status**: Dropdown
  - All Status
  - Pending
  - Processing
  - Completed
  - Cancelled
- **Date Range**: Dropdown
  - Today
  - This Week
  - This Month
  - All Time
- **Search**: Text input for order ID or customer name

**Pagination:**
- Previous/Next buttons
- Page number selection
- Items per page display

### Customer Orders Filters
**Location:** `app/my-orders/page.tsx`

**Filter Options:**
- **Status**: Implicit filtering by order status
  - Pending
  - Confirmed
  - Shipped
  - Delivered

### REST API Order Filters

#### GET /customers/orders
**Query Parameters:**
```typescript
{
  status?: string;            // PENDING | CONFIRMED | SHIPPED | DELIVERED | CANCELLED | RETURNED
  page?: number;              // Default: 1
  limit?: number;             // Default: 10
  sortBy?: string;            // Default: 'createdAt' (DESC)
}
```

**Example Request:**
```
GET /customers/orders?status=DELIVERED&page=1&limit=10&sortBy=createdAt
```

#### GET /customers/orders/:orderId
**No query parameters** - Returns detailed order information

---

## Search Functionality

### General Search Bar (Header)

#### Location & Implementation
**Location:** `components/header.tsx`

**Current Status:** ⚠️ **NOT FUNCTIONAL** - The search bar is a UI component without backend integration.

**Component Structure:**
```typescript
<div className="flex-1 max-w-2xl">
  <div className="relative">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
    <Input 
      placeholder="Search products, brands and categories" 
      className="pl-10 pr-4 h-12 border-2 border-border focus:border-primary" 
    />
    <Button
      size="lg"
      className="absolute right-0 top-0 h-12 rounded-l-none bg-primary hover:bg-primary-dark text-white font-semibold"
    >
      Search
    </Button>
  </div>
</div>
```

**Issues:**
- ❌ No `onChange` handler on Input field
- ❌ No `onClick` handler on Search button
- ❌ No state management for search query
- ❌ No navigation to search results page
- ❌ No API integration

**What Needs to be Implemented:**
1. Add state to track search input value
2. Add onChange handler to capture user input
3. Add onClick handler to Search button
4. Implement search navigation (likely to `/search?q=query`)
5. Create a search results page at `/search` or similar
6. Integrate with `useProducts` hook for searching
7. Handle search with filters (products, brands, categories)

**Recommended Implementation:**
```typescript
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, ShoppingCart, User, HelpCircle, ChevronDown, Menu, Moon, Sun, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* ... other header content ... */}
      
      {/* Search */}
      <div className="flex-1 max-w-2xl">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search products, brands and categories"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 h-12 border-2 border-border focus:border-primary" 
          />
          <Button
            type="submit"
            size="lg"
            className="absolute right-0 top-0 h-12 rounded-l-none bg-primary hover:bg-primary-dark text-white font-semibold"
          >
            Search
          </Button>
        </form>
      </div>
    </header>
  )
}
```

### Product Search

#### Hook Implementation
**Location:** `hooks/use-products.ts`

**Search Methods:**
```typescript
// Search products with query and optional filters
searchProducts(query: string, filters?: Record<string, unknown>): Promise<Product[]>

// Fetch products by category
fetchProductsByCategory(categoryId: string, page?: number, limit?: number): Promise<Product[]>

// Fetch all products with pagination
fetchProducts(page?: number, limit?: number): Promise<Product[]>
```

#### Search Parameters
```typescript
interface ProductSearchParams {
  query: string;              // Search query (required)
  filters?: {
    categoryId?: string;
    sellerId?: string;
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
    status?: ProductStatus;
  };
  page?: number;
  limit?: number;
  sortBy?: 'price' | 'rating' | 'newest';
}
```

### Order Search

#### Hook Implementation
**Location:** `hooks/use-orders.ts`

**Search Methods:**
```typescript
// Fetch orders with optional status filter
fetchOrders(status?: string): Promise<Order[]>

// Fetch specific order by ID
fetchOrderById(id: string): Promise<Order>
```

---

## API Endpoints

### Product Endpoints

| Endpoint | Method | Purpose | Filters |
|----------|--------|---------|---------|
| `/products` | GET | List all products | category, minPrice, maxPrice, search, sortBy, page, limit |
| `/products/:productId` | GET | Get product details | None |
| `/products/:productId/reviews` | GET | Get product reviews | sortBy (recent, helpful, rating), page, limit |
| `/products/:productId/reviews` | POST | Add product review | None (body: rating, title, text, images) |
| `/categories` | GET | List categories | None |
| `/categories/:categoryId/products` | GET | Get products by category | page, limit |

### Order Endpoints

| Endpoint | Method | Purpose | Filters |
|----------|--------|---------|---------|
| `/customers/orders` | GET | List customer orders | status, page, limit, sortBy |
| `/customers/orders/:orderId` | GET | Get order details | None |
| `/customers/orders/:orderId/cancel` | POST | Cancel order | None |

---

## GraphQL Queries

### Product Search Queries

#### SEARCH_PRODUCTS_QUERY
```graphql
query SearchProducts($query: String!, $filters: ProductFilters) {
  searchProducts(query: $query, filters: $filters) {
    id
    name
    description
    price
    discountPrice
    images
    category {
      id
      name
    }
    stock
    rating
    reviews
    seller {
      id
      name
    }
  }
}
```

**Variables:**
```typescript
{
  query: string;              // Search query
  filters?: {
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
  };
}
```

#### GET_PRODUCTS_BY_CATEGORY_QUERY
```graphql
query GetProductsByCategory($categoryId: ID!, $page: Int, $limit: Int) {
  productsByCategory(categoryId: $categoryId, page: $page, limit: $limit) {
    id
    name
    price
    discountPrice
    images
    rating
    stock
    category {
      id
      name
    }
  }
}
```

**Variables:**
```typescript
{
  categoryId: string;         // Category ID
  page?: number;              // Default: 1
  limit?: number;             // Default: 20
}
```

#### GET_TRENDING_PRODUCTS_QUERY
```graphql
query GetTrendingProducts($limit: Int) {
  trendingProducts(limit: $limit) {
    id
    name
    price
    discountPrice
    images
    rating
    views
    sales
  }
}
```

**Variables:**
```typescript
{
  limit?: number;             // Number of trending products
}
```

#### ADVANCED_SEARCH_QUERY
```graphql
query AdvancedSearch(
  $query: String
  $categories: [ID!]
  $minPrice: Float
  $maxPrice: Float
  $minRating: Float
  $inStock: Boolean
  $sortBy: String
  $page: Int
  $limit: Int
) {
  advancedSearch(
    query: $query
    categories: $categories
    minPrice: $minPrice
    maxPrice: $maxPrice
    minRating: $minRating
    inStock: $inStock
    sortBy: $sortBy
    page: $page
    limit: $limit
  ) {
    products {
      id
      name
      price
      discountPrice
      images
      rating
      stock
      category {
        id
        name
      }
    }
    total
    hasMore
  }
}
```

**Variables:**
```typescript
{
  query?: string;             // Search query
  categories?: string[];      // Array of category IDs
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStock?: boolean;
  sortBy?: string;            // 'price', 'rating', 'newest', 'popularity'
  page?: number;              // Default: 1
  limit?: number;             // Default: 20
}
```

### Order Queries

#### GET_ORDERS_QUERY
```graphql
query GetOrders($status: String, $page: Int, $limit: Int) {
  getOrders(status: $status, page: $page, limit: $limit) {
    id
    orderNumber
    userId
    items {
      productId
      productName
      quantity
      price
      image
    }
    subtotal
    tax
    shipping
    total
    status
    shippingAddress {
      street
      city
      state
      zip
      country
    }
    paymentMethod
    createdAt
    updatedAt
    estimatedDelivery
  }
}
```

**Variables:**
```typescript
{
  status?: string;            // Order status filter
  page?: number;              // Default: 1
  limit?: number;             // Default: 10
}
```

#### GET_ORDER_DETAILS_QUERY
```graphql
query GetOrderDetails($id: ID!) {
  order(id: $id) {
    id
    orderNumber
    userId
    items {
      id
      productId
      productName
      quantity
      price
      image
    }
    subtotal
    tax
    shipping
    discount
    total
    status
    statusHistory {
      status
      timestamp
    }
    shippingAddress {
      street
      city
      state
      zip
      country
    }
    billingAddress {
      street
      city
      state
      zip
      country
    }
    paymentMethod {
      type
      lastDigits
    }
    trackingNumber
    carrier
    createdAt
    updatedAt
    estimatedDelivery
  }
}
```

---

## Admin Dashboard Filters

### Products Table Filters
**Location:** `components/admin/products-table.tsx`

**Filter Options:**
- **Search**: Text input for product name
- **Status**: Dropdown
  - All Status
  - Active
  - Low Stock
  - Out of Stock
- **Category**: Dropdown
  - All Categories
  - Fashion
  - Baby Products
  - Home & Office

**Columns:**
- Product name (with image)
- Category
- Price
- Stock quantity
- Status badge
- Actions

**Pagination:**
- Previous/Next buttons
- Page number selection
- Items count display

### Orders Table Filters
**Location:** `components/admin/orders-table.tsx`

**Filter Options:**
- **Search**: Text input for order ID or customer name
- **Status**: Dropdown
  - All Status
  - Pending
  - Processing
  - Completed
  - Cancelled
- **Date Range**: Dropdown
  - Today
  - This Week
  - This Month
  - All Time

**Columns:**
- Order ID
- Customer name
- Order date
- Number of items
- Total amount
- Status badge
- Actions (view details)

**Pagination:**
- Previous/Next buttons
- Page number selection
- Items count display

---

## Filter State Management

### useProducts Hook
**Location:** `hooks/use-products.ts`

**State:**
```typescript
{
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
}
```

**Methods:**
```typescript
// Fetch all products with pagination
fetchProducts(page?: number, limit?: number): Promise<Product[]>

// Fetch product by ID
fetchProductById(id: string): Promise<Product>

// Search products with query and filters
searchProducts(query: string, filters?: Record<string, unknown>): Promise<Product[]>

// Fetch all categories
fetchCategories(): Promise<void>

// Fetch products by category
fetchProductsByCategory(categoryId: string, page?: number, limit?: number): Promise<Product[]>
```

### useOrders Hook
**Location:** `hooks/use-orders.ts`

**State:**
```typescript
{
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
}
```

**Methods:**
```typescript
// Fetch orders with optional status filter
fetchOrders(status?: string): Promise<Order[]>

// Fetch specific order by ID
fetchOrderById(id: string): Promise<Order>

// Create new order
createOrder(orderData: CreateOrderRequest): Promise<Order>

// Cancel order
cancelOrder(id: string): Promise<Order>
```

---

## Filter Type Definitions

### ProductQuery
```typescript
interface ProductQuery extends ListQuery {
  // Category Filters
  categoryId?: string;
  categoryIds?: string[];
  categoryName?: string;
  categorySlug?: string;
  
  // Product Information Filters
  name?: string;
  description?: string;
  sku?: string;
  slug?: string;
  keyword?: string;
  
  // Price Filters
  minPrice?: number;
  maxPrice?: number;
  minEffectivePrice?: number;
  maxEffectivePrice?: number;
  
  // Status Filters
  featured?: boolean;
  isNew?: boolean;
  isActive?: boolean;
  isBestseller?: boolean;
  
  // Inventory Filters
  inStockOnly?: boolean;
  lowStockOnly?: boolean;
  outOfStockOnly?: boolean;
  needsReorderOnly?: boolean;
  inventoryStatus?: InventoryStatus;
  inventoryStatuses?: InventoryStatus[];
  minStock?: number;
  maxStock?: number;
  minAvailableQuantity?: number;
  
  // Discount Filters
  hasDiscount?: boolean;
  minDiscountPercent?: number;
  maxDiscountPercent?: number;
  
  // Rating Filters
  minRating?: number;
  maxRating?: number;
  
  // Engagement Filters
  minViews?: number;
  maxViews?: number;
  minSales?: number;
  popular?: boolean;
  trending?: boolean;
  
  // Tag Filters
  tags?: string[];
  
  // Date Filters
  createdAfter?: string;
  createdBefore?: string;
  
  // Response Options
  includeCategory?: boolean;
  includeImages?: boolean;
  
  // Existing Filters
  sellerId?: string;
  search?: string;
  status?: ProductStatus;
  brandId?: string;
  expressDelivery?: boolean;
}
```

### OrderQuery
```typescript
interface OrderQuery extends ListQuery {
  status?: OrderStatus;
  startDate?: string;
  endDate?: string;
  customerId?: string;
  sellerId?: string;
}
```

### ListQuery
```typescript
interface ListQuery {
  limit?: number;
  offset?: number;
  sort?: 'price' | 'rating' | 'newest' | 'popularity' | 'sales' | 'views' | 'discount' | 'stock';
  order?: 'asc' | 'desc';
}
```

### InventoryStatus Enum
```typescript
enum InventoryStatus {
  IN_STOCK = 'IN_STOCK',
  LOW_STOCK = 'LOW_STOCK',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  DISCONTINUED = 'DISCONTINUED',
  PRE_ORDER = 'PRE_ORDER',
  BACKORDER = 'BACKORDER',
  COMING_SOON = 'COMING_SOON'
}
```

### ProductStatus Enum
```typescript
enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DRAFT = 'DRAFT',
  ARCHIVED = 'ARCHIVED',
  DELETED = 'DELETED'
}
```

---

## Filter Implementation Examples

### Example 1: Product Search with Filters
```typescript
// Using useProducts hook
const { searchProducts } = useProducts();

const handleSearch = async () => {
  const results = await searchProducts('sneakers', {
    categoryId: 'fashion',
    minPrice: 50,
    maxPrice: 200,
    rating: 4,
  });
};
```

### Example 2: Order Filtering
```typescript
// Using useOrders hook
const { fetchOrders } = useOrders();

const handleFilterByStatus = async () => {
  const orders = await fetchOrders('DELIVERED');
};
```

### Example 3: Category Products
```typescript
// Using useProducts hook
const { fetchProductsByCategory } = useProducts();

const handleCategoryFilter = async () => {
  const products = await fetchProductsByCategory('fashion', 1, 20);
};
```

### Example 4: REST API Call
```typescript
// Direct API call for products
const response = await fetch(
  '/api/products?category=fashion&minPrice=50&maxPrice=200&sortBy=price&page=1&limit=20'
);
const data = await response.json();
```

### Example 5: GraphQL Query
```typescript
// Using GraphQL for advanced search
const query = ADVANCED_SEARCH_QUERY;
const variables = {
  query: 'sneakers',
  categories: ['fashion'],
  minPrice: 50,
  maxPrice: 200,
  minRating: 4,
  inStock: true,
  sortBy: 'price',
  page: 1,
  limit: 20,
};

const response = await graphqlClient.request(query, variables);
```

### Example 6: Advanced Product Search with Comprehensive Filters
```typescript
// Using useProducts hook with all new comprehensive filters
const { searchProducts } = useProducts();

const handleAdvancedSearch = async () => {
  const results = await searchProducts('', {
    // Category filters
    categoryIds: ['fashion', 'electronics'],
    categoryName: 'Fashion',
    
    // Product status filters
    featured: true,
    isNew: true,
    isBestseller: true,
    
    // Inventory filters
    inStockOnly: true,
    lowStockOnly: false,
    minStock: 5,
    maxStock: 100,
    
    // Discount filters
    hasDiscount: true,
    minDiscountPercent: 20,
    maxDiscountPercent: 80,
    
    // Rating filters
    minRating: 4,
    maxRating: 5,
    
    // Engagement filters
    minViews: 1000,
    minSales: 50,
    popular: true,
    trending: true,
    
    // Date filters
    createdAfter: '2024-01-01',
    createdBefore: '2024-12-31',
    
    // Tag filters
    tags: ['summer', 'sale', 'limited'],
    
    // Response options
    includeCategory: true,
    includeImages: true,
    
    // Sorting
    sort: 'sales',
    order: 'desc',
    
    // Pagination
    limit: 50,
    offset: 0
  });
};
```

### Example 7: REST API Call with Comprehensive Filters
```typescript
// Direct API call with all comprehensive filters
const queryParams = new URLSearchParams({
  categoryIds: '1,2,3',
  featured: 'true',
  isNew: 'true',
  inStockOnly: 'true',
  hasDiscount: 'true',
  minDiscountPercent: '20',
  maxDiscountPercent: '80',
  minRating: '4',
  minViews: '1000',
  minSales: '50',
  createdAfter: '2024-01-01',
  createdBefore: '2024-12-31',
  tags: 'summer,sale,limited',
  includeCategory: 'true',
  includeImages: 'true',
  sort: 'sales',
  order: 'desc',
  limit: '50',
  offset: '0'
});

const response = await fetch(`/api/products?${queryParams}`);
const data = await response.json();
```

### Example 8: Inventory Status Filtering
```typescript
// Filter by inventory status
const { searchProducts } = useProducts();

const handleInventoryFilter = async () => {
  const results = await searchProducts('', {
    inventoryStatus: InventoryStatus.IN_STOCK,
    // OR multiple statuses
    inventoryStatuses: [InventoryStatus.IN_STOCK, InventoryStatus.LOW_STOCK],
    minAvailableQuantity: 10
  });
};
```

### Example 9: Price Range with Effective Price
```typescript
// Filter by effective price (considering discounts)
const { searchProducts } = useProducts();

const handleEffectivePriceFilter = async () => {
  const results = await searchProducts('', {
    minEffectivePrice: 50,
    maxEffectivePrice: 200,
    hasDiscount: true
  });
};
```

### Example 10: Advanced Sorting Options
```typescript
// Using different sorting options
const { searchProducts } = useProducts();

const handleSorting = async (sortOption: string) => {
  const results = await searchProducts('', {
    sort: sortOption as any, // 'sales', 'views', 'discount', 'stock'
    order: 'desc',
    limit: 20
  });
};

// Usage examples
handleSorting('sales');    // Sort by sales count (high to low)
handleSorting('views');    // Sort by view count (high to low)
handleSorting('discount'); // Sort by discount percentage (high to low)
handleSorting('stock');    // Sort by stock quantity (high to low)
```

---

## Summary

The Fynza platform implements a comprehensive filtering system with:

### Enhanced Filtering Capabilities:

**UI Filter Components:**
- **Basic Filters**: Category sidebar, filter bar, and generic filters for common use cases
- **Advanced Filters**: Comprehensive filter components for detailed product discovery
- **Status Filters**: Featured, new, bestseller, and active product filters
- **Inventory Filters**: Stock status, quantity ranges, and availability filters
- **Discount Filters**: Discount percentage ranges and discount status
- **Engagement Filters**: View counts, sales counts, popularity, and trending filters
- **Date Filters**: Creation date ranges for temporal filtering
- **Tag Filters**: Multi-tag selection and filtering

**Backend API Support:**
- **REST API**: Comprehensive query parameters for all filter types
- **GraphQL**: Advanced search queries with complex filtering scenarios
- **Validation**: Robust parameter validation with detailed error messages
- **Performance**: Optimized database queries with proper indexing
- **Pagination**: Efficient pagination for large result sets

**Filter Types:**
- **Category Filters**: Single/multiple category IDs, names, and slugs
- **Product Filters**: Name, description, SKU, slug, and keyword search
- **Price Filters**: Regular and effective price ranges (considering discounts)
- **Status Filters**: Product status, featured status, and activity status
- **Inventory Filters**: Stock levels, availability, and inventory status
- **Discount Filters**: Discount presence and percentage ranges
- **Rating Filters**: Minimum and maximum rating ranges
- **Engagement Filters**: View counts, sales counts, and engagement metrics
- **Date Filters**: Creation date ranges
- **Tag Filters**: Product tag filtering

**Advanced Features:**
- **Multiple Sorting Options**: Price, rating, popularity, sales, views, discount, stock
- **Response Customization**: Include category and image data options
- **Combined Filtering**: Seamless combination of multiple filter criteria
- **Performance Optimization**: Database indexes, query optimization, and caching
- **Error Handling**: Comprehensive validation and error reporting

All filters are designed to work together seamlessly, allowing users to combine multiple filter criteria for precise product discovery. The system supports both simple use cases (basic category and price filtering) and advanced scenarios (complex multi-criteria filtering with engagement metrics and temporal constraints).
