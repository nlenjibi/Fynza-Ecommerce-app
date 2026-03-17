# Fynza Database Schema

## Tables Overview

### 1. Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  date_of_birth DATE,
  profile_image_url VARCHAR(500),
  role ENUM('CUSTOMER', 'SELLER', 'ADMIN', 'MODERATOR'),
  status ENUM('ACTIVE', 'INACTIVE', 'BANNED', 'SUSPENDED'),
  email_verified BOOLEAN DEFAULT FALSE,
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  INDEX idx_email,
  INDEX idx_role,
  INDEX idx_status
);
```

### 2. Sellers Table
```sql
CREATE TABLE sellers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id),
  store_name VARCHAR(255) NOT NULL,
  store_description TEXT,
  store_logo_url VARCHAR(500),
  store_banner_url VARCHAR(500),
  business_type VARCHAR(100),
  tax_id VARCHAR(50) UNIQUE,
  business_registration_number VARCHAR(50),
  verification_status ENUM('PENDING', 'VERIFIED', 'REJECTED', 'SUSPENDED') DEFAULT 'PENDING',
  verification_documents JSONB,
  rating DECIMAL(3,2) DEFAULT 0.00,
  total_reviews INT DEFAULT 0,
  bank_account_holder VARCHAR(255),
  bank_account_number VARCHAR(30),
  bank_code VARCHAR(20),
  upi_id VARCHAR(100),
  total_products INT DEFAULT 0,
  total_sales DECIMAL(15,2) DEFAULT 0.00,
  average_delivery_days INT,
  cancellation_rate DECIMAL(5,2),
  return_rate DECIMAL(5,2),
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_id,
  INDEX idx_verification_status,
  INDEX idx_rating
);
```

### 3. Categories Table
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  image_url VARCHAR(500),
  parent_category_id UUID REFERENCES categories(id),
  commission_rate DECIMAL(5,2) DEFAULT 10.00,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_slug,
  INDEX idx_parent_category_id,
  INDEX idx_is_active
);
```

### 4. Products Table
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID NOT NULL REFERENCES sellers(id),
  category_id UUID NOT NULL REFERENCES categories(id),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  short_description VARCHAR(500),
  price DECIMAL(12,2) NOT NULL,
  original_price DECIMAL(12,2),
  discount_percentage DECIMAL(5,2) DEFAULT 0,
  sku VARCHAR(100) UNIQUE,
  quantity_in_stock INT DEFAULT 0,
  status ENUM('ACTIVE', 'INACTIVE', 'OUT_OF_STOCK', 'DISCONTINUED') DEFAULT 'ACTIVE',
  images JSONB NOT NULL,
  specifications JSONB,
  rating DECIMAL(3,2) DEFAULT 0.00,
  total_reviews INT DEFAULT 0,
  total_sold INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  seo_keywords VARCHAR(500),
  seo_description VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  INDEX idx_seller_id,
  INDEX idx_category_id,
  INDEX idx_slug,
  INDEX idx_status,
  INDEX idx_price,
  FULLTEXT INDEX idx_search (name, description)
);
```

### 5. Orders Table
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_id UUID NOT NULL REFERENCES users(id),
  seller_id UUID NOT NULL REFERENCES sellers(id),
  status ENUM('PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURNED') DEFAULT 'PENDING',
  payment_status ENUM('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED') DEFAULT 'PENDING',
  subtotal DECIMAL(12,2) NOT NULL,
  shipping_cost DECIMAL(12,2) DEFAULT 0.00,
  tax DECIMAL(12,2) DEFAULT 0.00,
  discount DECIMAL(12,2) DEFAULT 0.00,
  total_amount DECIMAL(12,2) NOT NULL,
  shipping_address JSONB NOT NULL,
  billing_address JSONB,
  tracking_number VARCHAR(100),
  tracking_provider VARCHAR(50),
  estimated_delivery_date DATE,
  actual_delivery_date DATE,
  return_requested_at TIMESTAMP NULL,
  return_status ENUM('NONE', 'INITIATED', 'APPROVED', 'REJECTED', 'COMPLETED') DEFAULT 'NONE',
  return_reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP NULL,
  INDEX idx_customer_id,
  INDEX idx_seller_id,
  INDEX idx_order_number,
  INDEX idx_status,
  INDEX idx_created_at
);
```

### 6. Order Items Table
```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id),
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INT NOT NULL,
  unit_price DECIMAL(12,2) NOT NULL,
  total_price DECIMAL(12,2) NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  product_image_url VARCHAR(500),
  review_status ENUM('NO_REVIEW', 'PENDING', 'REVIEWED') DEFAULT 'NO_REVIEW',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_order_id,
  INDEX idx_product_id
);
```

### 7. Cart Items Table
```sql
CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INT NOT NULL DEFAULT 1,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, product_id),
  INDEX idx_user_id
);
```

### 8. Reviews Table
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_item_id UUID NOT NULL REFERENCES order_items(id),
  product_id UUID NOT NULL REFERENCES products(id),
  seller_id UUID NOT NULL REFERENCES sellers(id),
  reviewer_id UUID NOT NULL REFERENCES users(id),
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  comment TEXT,
  images JSONB,
  helpful_count INT DEFAULT 0,
  unhelpful_count INT DEFAULT 0,
  seller_response TEXT,
  seller_response_at TIMESTAMP NULL,
  verified_purchase BOOLEAN DEFAULT TRUE,
  is_approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_product_id,
  INDEX idx_seller_id,
  INDEX idx_reviewer_id,
  INDEX idx_rating
);
```

### 9. Wishlist Table
```sql
CREATE TABLE wishlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  product_id UUID NOT NULL REFERENCES products(id),
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, product_id),
  INDEX idx_user_id
);
```

### 10. Addresses Table
```sql
CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  label VARCHAR(50),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  street_address VARCHAR(255) NOT NULL,
  apartment_suite VARCHAR(100),
  city VARCHAR(100) NOT NULL,
  state_province VARCHAR(100),
  postal_code VARCHAR(20) NOT NULL,
  country VARCHAR(100) NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_id,
  INDEX idx_is_default
);
```

### 11. Payments Table
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id),
  user_id UUID NOT NULL REFERENCES users(id),
  amount DECIMAL(12,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'INR',
  payment_method VARCHAR(50) NOT NULL,
  payment_gateway VARCHAR(50),
  transaction_id VARCHAR(255),
  status ENUM('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED') DEFAULT 'PENDING',
  receipt_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP NULL,
  INDEX idx_order_id,
  INDEX idx_user_id,
  INDEX idx_transaction_id
);
```

### 12. Notifications Table
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  related_entity_id UUID,
  related_entity_type VARCHAR(50),
  is_read BOOLEAN DEFAULT FALSE,
  action_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read_at TIMESTAMP NULL,
  INDEX idx_user_id,
  INDEX idx_type,
  INDEX idx_is_read
);
```

### 13. Disputes Table
```sql
CREATE TABLE disputes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id),
  initiated_by UUID NOT NULL REFERENCES users(id),
  dispute_type VARCHAR(50) NOT NULL,
  reason TEXT NOT NULL,
  status ENUM('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED') DEFAULT 'OPEN',
  resolution TEXT,
  resolved_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP NULL,
  INDEX idx_order_id,
  INDEX idx_status
);
```

### 14. Coupons Table
```sql
CREATE TABLE coupons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  discount_type ENUM('PERCENTAGE', 'FIXED_AMOUNT') NOT NULL,
  discount_value DECIMAL(10,2) NOT NULL,
  max_discount DECIMAL(12,2),
  min_purchase_amount DECIMAL(12,2),
  max_uses_per_coupon INT,
  max_uses_per_user INT DEFAULT 1,
  applicable_categories JSONB,
  excluded_sellers JSONB,
  valid_from TIMESTAMP NOT NULL,
  valid_until TIMESTAMP NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  usage_count INT DEFAULT 0,
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_code,
  INDEX idx_is_active
);
```

---

## Key Indexes for Performance
- All foreign keys indexed
- Status fields indexed for filtering
- Timestamps indexed for sorting
- Email and slug fields uniquely indexed
- Full-text search on products (name, description)
