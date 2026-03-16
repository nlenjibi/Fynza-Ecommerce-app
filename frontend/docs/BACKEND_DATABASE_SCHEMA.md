# Backend Database Schema for Search & Filters

## Database Tables Required

---

## 1. Products Table

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL REFERENCES sellers(id),
  category_id UUID NOT NULL REFERENCES categories(id),
  brand_id UUID REFERENCES brands(id),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  short_description VARCHAR(500),
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  discount_percentage DECIMAL(5, 2) DEFAULT 0,
  sku VARCHAR(100),
  quantity_in_stock INTEGER DEFAULT 0,
  status ENUM('ACTIVE', 'INACTIVE', 'OUT_OF_STOCK', 'DISCONTINUED') DEFAULT 'ACTIVE',
  rating DECIMAL(3, 2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  total_sold INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  express_delivery BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Indexes
  INDEX idx_seller_id (seller_id),
  INDEX idx_category_id (category_id),
  INDEX idx_brand_id (brand_id),
  INDEX idx_status (status),
  INDEX idx_price (price),
  INDEX idx_rating (rating),
  INDEX idx_created_at (created_at),
  FULLTEXT INDEX ft_search (name, description)
);
```

---

## 2. Categories Table

```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID REFERENCES categories(id),
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  commission_rate DECIMAL(5, 2) DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Indexes
  INDEX idx_parent_id (parent_id),
  INDEX idx_is_active (is_active),
  INDEX idx_display_order (display_order)
);
```

---

## 3. Brands Table

```sql
CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  logo_url VARCHAR(500),
  website_url VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Indexes
  INDEX idx_is_active (is_active)
);
```

---

## 4. Sellers Table

```sql
CREATE TABLE sellers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  store_name VARCHAR(255) NOT NULL,
  store_description TEXT,
  store_logo_url VARCHAR(500),
  store_banner_url VARCHAR(500),
  business_type VARCHAR(100),
  verification_status ENUM('PENDING', 'VERIFIED', 'REJECTED', 'SUSPENDED') DEFAULT 'PENDING',
  rating DECIMAL(3, 2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  total_products INTEGER DEFAULT 0,
  total_sales INTEGER DEFAULT 0,
  average_delivery_days INTEGER,
  cancellation_rate DECIMAL(5, 2) DEFAULT 0,
  return_rate DECIMAL(5, 2) DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Indexes
  INDEX idx_user_id (user_id),
  INDEX idx_verification_status (verification_status),
  INDEX idx_is_featured (is_featured)
);
```

---

## 5. Product Images Table

```sql
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url VARCHAR(500) NOT NULL,
  alt_text VARCHAR(255),
  is_primary BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Indexes
  INDEX idx_product_id (product_id),
  INDEX idx_is_primary (is_primary)
);
```

---

## 6. Product Specifications Table

```sql
CREATE TABLE product_specifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  specification_key VARCHAR(100) NOT NULL,
  specification_value VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Indexes
  INDEX idx_product_id (product_id),
  INDEX idx_specification_key (specification_key)
);
```

---

## 7. Search Queries Table (for analytics)

```sql
CREATE TABLE search_queries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  query VARCHAR(500) NOT NULL,
  user_id UUID REFERENCES users(id),
  results_count INTEGER DEFAULT 0,
  clicked_product_id UUID REFERENCES products(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Indexes
  INDEX idx_query (query),
  INDEX idx_user_id (user_id),
  INDEX idx_created_at (created_at),
  INDEX idx_query_created_at (query, created_at)
);
```

---

## 8. Search Suggestions Table (for caching)

```sql
CREATE TABLE search_suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  query VARCHAR(500) NOT NULL UNIQUE,
  suggestion_type ENUM('product', 'brand', 'category') NOT NULL,
  result_count INTEGER DEFAULT 0,
  popularity_score DECIMAL(10, 2) DEFAULT 0,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Indexes
  INDEX idx_query (query),
  INDEX idx_suggestion_type (suggestion_type),
  INDEX idx_popularity_score (popularity_score)
);
```

---

## 9. Trending Searches Table

```sql
CREATE TABLE trending_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  query VARCHAR(500) NOT NULL,
  search_count INTEGER DEFAULT 0,
  time_range ENUM('24h', '7d', '30d') NOT NULL,
  trend_direction ENUM('up', 'down', 'stable') DEFAULT 'stable',
  percentage_change DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Indexes
  INDEX idx_query_time_range (query, time_range),
  INDEX idx_search_count (search_count),
  INDEX idx_created_at (created_at),
  UNIQUE KEY unique_query_time_range (query, time_range)
);
```

---

## 10. Product Reviews Table

```sql
CREATE TABLE product_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  seller_id UUID NOT NULL REFERENCES sellers(id),
  reviewer_id UUID NOT NULL REFERENCES users(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  comment TEXT,
  helpful_count INTEGER DEFAULT 0,
  unhelpful_count INTEGER DEFAULT 0,
  seller_response TEXT,
  seller_response_at TIMESTAMP,
  verified_purchase BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Indexes
  INDEX idx_product_id (product_id),
  INDEX idx_seller_id (seller_id),
  INDEX idx_reviewer_id (reviewer_id),
  INDEX idx_rating (rating),
  INDEX idx_verified_purchase (verified_purchase),
  INDEX idx_created_at (created_at)
);
```

---

## Database Indexes for Performance

```sql
-- Full-text search indexes
ALTER TABLE products ADD FULLTEXT INDEX ft_name_description (name, description);
ALTER TABLE products ADD FULLTEXT INDEX ft_name (name);

-- Search optimization indexes
CREATE INDEX idx_products_category_status ON products(category_id, status);
CREATE INDEX idx_products_brand_status ON products(brand_id, status);
CREATE INDEX idx_products_price_status ON products(price, status);
CREATE INDEX idx_products_rating_status ON products(rating, status);
CREATE INDEX idx_products_created_status ON products(created_at, status);

-- Composite indexes for common filter combinations
CREATE INDEX idx_products_category_price ON products(category_id, price);
CREATE INDEX idx_products_brand_price ON products(brand_id, price);
CREATE INDEX idx_products_category_rating ON products(category_id, rating);
CREATE INDEX idx_products_brand_rating ON products(brand_id, rating);

-- Analytics indexes
CREATE INDEX idx_search_queries_date ON search_queries(created_at);
CREATE INDEX idx_search_queries_user_date ON search_queries(user_id, created_at);
CREATE INDEX idx_trending_searches_date ON trending_searches(created_at);
```

---

## Query Examples

### Search with Filters
```sql
SELECT 
  p.id,
  p.name,
  p.description,
  p.price,
  p.original_price,
  p.discount_percentage,
  p.rating,
  p.total_reviews,
  p.quantity_in_stock,
  p.express_delivery,
  p.seller_id,
  p.category_id,
  p.brand_id,
  p.created_at
FROM products p
WHERE 
  p.status = 'ACTIVE'
  AND (MATCH(p.name, p.description) AGAINST(? IN BOOLEAN MODE))
  AND (p.category_id = ? OR ? IS NULL)
  AND (p.brand_id = ? OR ? IS NULL)
  AND p.price BETWEEN ? AND ?
  AND p.rating >= ?
  AND (p.quantity_in_stock > 0 OR ? = FALSE)
  AND (p.express_delivery = TRUE OR ? = FALSE)
ORDER BY 
  CASE 
    WHEN ? = 'popularity' THEN p.total_reviews DESC
    WHEN ? = 'price-low' THEN p.price ASC
    WHEN ? = 'price-high' THEN p.price DESC
    WHEN ? = 'rating' THEN p.rating DESC
    WHEN ? = 'newest' THEN p.created_at DESC
  END
LIMIT ? OFFSET ?;
```

### Get Available Filters
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

-- Rating range
SELECT MIN(rating) as min_rating, MAX(rating) as max_rating
FROM products
WHERE status = 'ACTIVE';
```

### Get Trending Searches
```sql
SELECT query, search_count, trend_direction, percentage_change
FROM trending_searches
WHERE time_range = '7d'
ORDER BY search_count DESC
LIMIT 10;
```

### Get Popular Products
```sql
SELECT 
  p.id,
  p.name,
  p.price,
  p.rating,
  COUNT(sq.id) as views,
  COUNT(DISTINCT pr.id) as sales
FROM products p
LEFT JOIN search_queries sq ON p.id = sq.clicked_product_id 
  AND sq.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
LEFT JOIN product_reviews pr ON p.id = pr.product_id 
  AND pr.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
WHERE p.status = 'ACTIVE'
GROUP BY p.id, p.name, p.price, p.rating
ORDER BY views DESC
LIMIT 20;
```

---

## Data Relationships

```
Products
├── Seller (many-to-one)
├── Category (many-to-one)
├── Brand (many-to-one)
├── Product Images (one-to-many)
├── Product Specifications (one-to-many)
├── Product Reviews (one-to-many)
└── Search Queries (one-to-many)

Categories
├── Parent Category (self-referencing)
└── Products (one-to-many)

Brands
└── Products (one-to-many)

Sellers
├── User (many-to-one)
└── Products (one-to-many)
```

---

## Caching Strategy

```
Cache Keys:
- search:{query}:{filters}:{page}:{limit} → Search results (TTL: 1 hour)
- trending_searches:{timeRange} → Trending searches (TTL: 24 hours)
- popular_products:{categoryId}:{timeRange} → Popular products (TTL: 6 hours)
- available_filters:{categoryId} → Available filters (TTL: 12 hours)
- suggestions:{query} → Search suggestions (TTL: 30 minutes)
- product:{productId} → Product details (TTL: 2 hours)
- category:{categoryId} → Category details (TTL: 24 hours)
- brand:{brandId} → Brand details (TTL: 24 hours)
```

---

## Performance Optimization Tips

1. **Use Indexes**: Create indexes on frequently searched columns
2. **Denormalization**: Store calculated values (rating, total_reviews) in products table
3. **Caching**: Cache search results and trending data
4. **Pagination**: Always use pagination to limit result sets
5. **Query Optimization**: Use EXPLAIN to analyze slow queries
6. **Connection Pooling**: Use database connection pooling
7. **Read Replicas**: Use read replicas for search queries
8. **Sharding**: Consider sharding for very large datasets

---

## Migration Scripts

```sql
-- Create all tables
CREATE TABLE products (...);
CREATE TABLE categories (...);
CREATE TABLE brands (...);
CREATE TABLE sellers (...);
CREATE TABLE product_images (...);
CREATE TABLE product_specifications (...);
CREATE TABLE search_queries (...);
CREATE TABLE search_suggestions (...);
CREATE TABLE trending_searches (...);
CREATE TABLE product_reviews (...);

-- Create indexes
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_category ON products(category_id);
-- ... more indexes

-- Add full-text search indexes
ALTER TABLE products ADD FULLTEXT INDEX ft_search (name, description);
```

---

## Backup & Recovery

```
Backup Strategy:
- Daily full backups
- Hourly incremental backups
- Point-in-time recovery enabled
- Backup retention: 30 days

Recovery Procedures:
- Test recovery procedures monthly
- Document recovery steps
- Maintain backup documentation
- Monitor backup success
```
