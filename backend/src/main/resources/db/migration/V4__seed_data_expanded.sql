-- Expanded Seed Data for Development
-- V4: Additional users, products, orders, addresses, wishlists, reviews, and notifications

-- Create additional tables needed for seed data

-- Addresses table
CREATE TABLE IF NOT EXISTS addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    label VARCHAR(50) NOT NULL,
    street_address VARCHAR(255) NOT NULL,
    apartment_suite VARCHAR(100),
    city VARCHAR(100) NOT NULL,
    state_province VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL DEFAULT 'USA',
    address_type VARCHAR(20) DEFAULT 'SHIPPING',
    is_default BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_addresses_user_id ON addresses(user_id);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id),
    product_id UUID NOT NULL REFERENCES products(id),
    variant_id UUID REFERENCES product_variants(id),
    seller_id UUID REFERENCES users(id),
    product_name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    size VARCHAR(50),
    color VARCHAR(50),
    review_status VARCHAR(20) DEFAULT 'NO_REVIEW',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- Wishlists table
CREATE TABLE IF NOT EXISTS wishlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_wishlists_user_id ON wishlists(user_id);

-- Wishlist items table
CREATE TABLE IF NOT EXISTS wishlist_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wishlist_id UUID NOT NULL REFERENCES wishlists(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_wishlist_items_wishlist_id ON wishlist_items(wishlist_id);
CREATE INDEX idx_wishlist_items_product_id ON wishlist_items(product_id);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id),
    user_id UUID NOT NULL REFERENCES users(id),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    verified_purchase BOOLEAN DEFAULT false,
    helpful_count INTEGER DEFAULT 0,
    unhelpful_count INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'PENDING',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    link VARCHAR(500),
    is_read BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);

-- Seller profiles table
CREATE TABLE IF NOT EXISTS seller_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id),
    store_name VARCHAR(255) NOT NULL,
    store_description TEXT,
    store_logo_url VARCHAR(500),
    store_banner_url VARCHAR(500),
    business_type VARCHAR(50),
    verification_status VARCHAR(20) DEFAULT 'PENDING',
    rating DECIMAL(3, 2) DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    total_products INTEGER DEFAULT 0,
    total_sales INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_seller_profiles_user_id ON seller_profiles(user_id);

-- Seller coupons table
CREATE TABLE IF NOT EXISTS seller_coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID NOT NULL REFERENCES users(id),
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    discount_type VARCHAR(20) NOT NULL,
    discount_value DECIMAL(10, 2) NOT NULL,
    min_order_amount DECIMAL(10, 2) DEFAULT 0,
    max_discount DECIMAL(10, 2),
    usage_limit INTEGER,
    usage_count INTEGER DEFAULT 0,
    valid_from TIMESTAMP NOT NULL,
    valid_until TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_seller_coupons_seller_id ON seller_coupons(seller_id);
CREATE INDEX idx_seller_coupons_code ON seller_coupons(code);

-- Insert additional customer users
INSERT INTO users (id, username, email, password_hash, first_name, last_name, phone, profile_image_url, role, status, email_verified, is_active, created_at, updated_at) VALUES
('44444444-4444-4444-4444-444444444444', 'johndoe', 'john.doe@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'John', 'Doe', '+1234567890', 'https://cdn.fynza.com/avatars/user_123.jpg', 'CUSTOMER', 'ACTIVE', true, true, '2023-01-10 10:00:00', '2024-03-15 10:00:00'),
('55555555-5555-5555-5555-555555555555', 'sarahsmith', 'seller@premiumfootwear.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Sarah', 'Smith', '+1987654321', NULL, 'SELLER', 'ACTIVE', true, true, '2023-03-15 10:00:00', '2024-03-15 10:00:00'),
('66666666-6666-6666-6666-666666666666', 'emilyjones', 'emily.jones@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Emily', 'Jones', '+1122334455', NULL, 'CUSTOMER', 'ACTIVE', true, true, '2023-06-20 10:00:00', '2024-03-15 10:00:00'),
('77777777-7777-7777-7777-777777777777', 'mikebrown', 'mike.brown@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Mike', 'Brown', '+1555666777', NULL, 'CUSTOMER', 'ACTIVE', true, true, '2023-08-05 10:00:00', '2024-03-15 10:00:00')
ON CONFLICT (id) DO NOTHING;

-- Insert additional categories
INSERT INTO categories (id, name, slug, description, image, featured, is_active, created_at, updated_at) VALUES
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Footwear', 'footwear', 'Shoes, sneakers, sandals, and boots', '/category-footwear.jpg', true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Apparel', 'apparel', 'Clothing and fashion items', '/category-apparel.jpg', true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Electronics', 'electronics', 'Electronic devices and gadgets', '/category-electronics.jpg', true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('11111111-1111-1111-1111-111111111112', 'Accessories', 'accessories', 'Bags, watches, jewelry and more', '/category-accessories.jpg', false, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('11111111-1111-1111-1111-111111111113', 'Fitness', 'fitness', 'Fitness equipment and gear', '/category-fitness.jpg', false, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('11111111-1111-1111-1111-111111111114', 'Kitchen', 'kitchen', 'Kitchen appliances and utensils', '/category-kitchen.jpg', false, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;

-- Insert additional products
INSERT INTO products (id, name, slug, brand, sku, description, price, original_price, discount, stock, available_quantity, sold_quantity, rating, review_count, view_count, category_id, seller_id, status, inventory_status, featured, is_new, is_bestseller, main_image_url, is_active, created_at, updated_at) VALUES
('prod123-1234-1234-1234-123456789012', 'Premium Sneakers', 'premium-sneakers', 'Nike', 'SNK-001', 'High-quality sports sneakers with premium comfort', 149.99, 199.99, 25.00, 45, 45, 156, 4.50, 128, 500, 'dddddddd-dddd-dddd-dddd-dddddddddddd', '55555555-5555-5555-5555-555555555555', 'APPROVED', 'IN_STOCK', true, false, true, 'https://cdn.fynza.com/products/sneakers_main.jpg', true, '2024-01-15 10:00:00', '2024-03-15 10:00:00'),
('prod124-1234-1234-1234-123456789013', 'Running Shirt', 'running-shirt', 'Adidas', 'APR-002', 'Breathable athletic running shirt', 49.99, 79.99, 37.00, 120, 120, 89, 4.30, 89, 300, 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '55555555-5555-5555-5555-555555555555', 'APPROVED', 'IN_STOCK', false, true, false, 'https://cdn.fynza.com/products/shirt_main.jpg', true, '2024-02-01 10:00:00', '2024-03-15 10:00:00'),
('prod125-1234-1234-1234-123456789014', 'Wireless Headphones', 'wireless-headphones', 'Sony', 'ELE-003', 'Premium noise-cancelling wireless headphones', 299.99, 399.99, 25.00, 30, 30, 342, 4.70, 342, 800, 'ffffffff-ffff-ffff-ffff-ffffffffffff', '55555555-5555-5555-5555-555555555555', 'APPROVED', 'IN_STOCK', true, false, false, 'https://cdn.fynza.com/products/headphones_main.jpg', true, '2024-01-20 10:00:00', '2024-03-15 10:00:00'),
('prod126-1234-1234-1234-123456789015', 'Sports Watch', 'sports-watch', 'Garmin', 'ACC-004', 'Fitness tracking smartwatch with GPS', 199.99, 249.99, 20.00, 55, 55, 205, 4.40, 205, 450, '11111111-1111-1111-1111-111111111112', '55555555-5555-5555-5555-555555555555', 'APPROVED', 'IN_STOCK', false, false, false, 'https://cdn.fynza.com/products/watch_main.jpg', true, '2024-02-10 10:00:00', '2024-03-15 10:00:00'),
('prod127-1234-1234-1234-123456789016', 'Yoga Mat', 'yoga-mat', 'Gaiam', 'FIT-005', 'Non-slip premium yoga mat', 34.99, 49.99, 30.00, 200, 200, 156, 4.60, 156, 250, '11111111-1111-1111-1111-111111111113', '55555555-5555-5555-5555-555555555555', 'APPROVED', 'IN_STOCK', false, false, false, 'https://cdn.fynza.com/products/yoga_mat_main.jpg', true, '2024-01-25 10:00:00', '2024-03-15 10:00:00'),
('prod128-1234-1234-1234-123456789017', 'Laptop Backpack', 'laptop-backpack', 'SwissGear', 'ACC-006', 'Durable laptop backpack with multiple compartments', 89.99, 129.99, 30.00, 80, 80, 178, 4.50, 178, 320, '11111111-1111-1111-1111-111111111112', '55555555-5555-5555-5555-555555555555', 'APPROVED', 'IN_STOCK', false, false, true, 'https://cdn.fynza.com/products/backpack_main.jpg', true, '2024-02-05 10:00:00', '2024-03-15 10:00:00'),
('prod129-1234-1234-1234-123456789018', 'Coffee Maker', 'coffee-maker', 'Cuisinart', 'KIT-007', 'Programmable automatic coffee maker', 79.99, 99.99, 20.00, 40, 40, 92, 4.40, 92, 180, '11111111-1111-1111-1111-111111111114', '55555555-5555-5555-5555-555555555555', 'APPROVED', 'IN_STOCK', false, false, false, 'https://cdn.fynza.com/products/coffee_main.jpg', true, '2024-02-15 10:00:00', '2024-03-15 10:00:00'),
('prod130-1234-1234-1234-123456789019', 'Casual Sneakers', 'casual-sneakers', 'Puma', 'SNK-008', 'Comfortable casual sneakers for everyday wear', 89.99, 120.00, 25.00, 0, 0, 89, 4.30, 89, 150, 'dddddddd-dddd-dddd-dddd-dddddddddddd', '55555555-5555-5555-5555-555555555555', 'APPROVED', 'OUT_OF_STOCK', false, true, false, 'https://cdn.fynza.com/products/casual_sneakers.jpg', true, '2024-02-20 10:00:00', '2024-03-15 10:00:00')
ON CONFLICT (id) DO NOTHING;

-- Insert addresses for users
INSERT INTO addresses (id, user_id, label, street_address, apartment_suite, city, state_province, postal_code, country, address_type, is_default, is_active, created_at, updated_at) VALUES
('addr123-1234-1234-1234-123456789012', '44444444-4444-4444-4444-444444444444', 'Home', '123 Main St', NULL, 'New York', 'NY', '10001', 'USA', 'SHIPPING', true, true, '2024-01-15 10:00:00', '2024-03-15 10:00:00'),
('addr124-1234-1234-1234-123456789013', '44444444-4444-4444-4444-444444444444', 'Office', '456 Business Ave', 'Suite 100', 'New York', 'NY', '10002', 'USA', 'SHIPPING', false, true, '2024-02-20 10:00:00', '2024-03-15 10:00:00'),
('addr125-1234-1234-1234-123456789014', '66666666-6666-6666-6666-666666666666', 'Home', '789 Park Lane', NULL, 'Los Angeles', 'CA', '90001', 'USA', 'SHIPPING', true, true, '2024-03-01 10:00:00', '2024-03-15 10:00:00')
ON CONFLICT (id) DO NOTHING;

-- Add additional columns to orders table
ALTER TABLE orders ADD COLUMN IF NOT EXISTS order_number VARCHAR(50);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS subtotal DECIMAL(10, 2);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS tax DECIMAL(10, 2);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_cost DECIMAL(10, 2) DEFAULT 0;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS discount DECIMAL(10, 2) DEFAULT 0;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_status VARCHAR(50) DEFAULT 'PENDING';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS tracking_number VARCHAR(100);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS estimated_delivery TIMESTAMP;

-- Insert orders
INSERT INTO orders (id, user_id, order_number, total_amount, subtotal, tax, shipping_cost, discount, status, payment_status, tracking_number, estimated_delivery, is_active, created_at, updated_at) VALUES
('order001-1234-1234-1234-123456789012', '44444444-4444-4444-4444-444444444444', 'FYZ-2024-001', 299.99, 259.99, 20.00, 20.00, 0.00, 'DELIVERED', 'COMPLETED', 'FDX123456789', '2024-03-15 10:00:00', true, '2024-03-10 10:30:00', '2024-03-13 16:45:00'),
('order002-1234-1234-1234-123456789013', '44444444-4444-4444-4444-444444444444', 'FYZ-2024-002', 449.98, 399.98, 32.00, 18.00, 0.00, 'SHIPPED', 'COMPLETED', 'FDX234567890', '2024-03-16 10:00:00', true, '2024-03-12 14:15:00', '2024-03-13 10:00:00'),
('order003-1234-1234-1234-123456789014', '66666666-6666-6666-6666-666666666666', 'FYZ-2024-003', 199.99, 179.99, 14.40, 5.60, 0.00, 'DELIVERED', 'COMPLETED', 'FDX345678901', '2024-03-12 10:00:00', true, '2024-03-08 09:45:00', '2024-03-11 15:30:00')
ON CONFLICT (id) DO NOTHING;

-- Insert order items
INSERT INTO order_items (id, order_id, product_id, product_name, quantity, unit_price, total_price, review_status, is_active, created_at, updated_at) VALUES
('item001-1234-1234-1234-123456789012', 'order001-1234-1234-1234-123456789012', 'prod123-1234-1234-1234-123456789012', 'Premium Sneakers', 1, 149.99, 149.99, 'NO_REVIEW', true, '2024-03-10 10:30:00', '2024-03-10 10:30:00'),
('item002-1234-1234-1234-123456789013', 'order001-1234-1234-1234-123456789012', 'prod124-1234-1234-1234-123456789013', 'Running Shirt', 2, 49.99, 99.98, 'NO_REVIEW', true, '2024-03-10 10:30:00', '2024-03-10 10:30:00'),
('item003-1234-1234-1234-123456789014', 'order002-1234-1234-1234-123456789013', 'prod125-1234-1234-1234-123456789014', 'Wireless Headphones', 1, 299.99, 299.99, 'NO_REVIEW', true, '2024-03-12 14:15:00', '2024-03-12 14:15:00'),
('item004-1234-1234-1234-123456789015', 'order003-1234-1234-1234-123456789014', 'prod126-1234-1234-1234-123456789015', 'Sports Watch', 1, 199.99, 199.99, 'NO_REVIEW', true, '2024-03-08 09:45:00', '2024-03-08 09:45:00')
ON CONFLICT (id) DO NOTHING;

-- Insert wishlists
INSERT INTO wishlists (id, user_id, is_active, created_at, updated_at) VALUES
('wishlist123-1234-1234-1234-123456789012', '44444444-4444-4444-4444-444444444444', true, '2024-03-10 10:30:00', '2024-03-15 10:00:00'),
('wishlist124-1234-1234-1234-123456789013', '66666666-6666-6666-6666-666666666666', true, '2024-03-11 14:20:00', '2024-03-15 10:00:00')
ON CONFLICT (id) DO NOTHING;

-- Insert wishlist items
INSERT INTO wishlist_items (id, wishlist_id, product_id, is_active, created_at) VALUES
('wishitem001-1234-1234-1234-123456789012', 'wishlist123-1234-1234-1234-123456789012', 'prod123-1234-1234-1234-123456789012', true, '2024-03-10 10:30:00'),
('wishitem002-1234-1234-1234-123456789013', 'wishlist124-1234-1234-1234-123456789013', 'prod125-1234-1234-1234-123456789014', true, '2024-03-11 14:20:00'),
('wishitem003-1234-1234-1234-123456789014', 'wishlist124-1234-1234-1234-123456789013', 'prod128-1234-1234-1234-123456789017', true, '2024-03-12 09:15:00')
ON CONFLICT (id) DO NOTHING;

-- Insert reviews
INSERT INTO reviews (id, product_id, user_id, rating, title, comment, verified_purchase, helpful_count, unhelpful_count, status, is_active, created_at, updated_at) VALUES
('review001-1234-1234-1234-123456789012', 'prod123-1234-1234-1234-123456789012', '44444444-4444-4444-4444-444444444444', 5, 'Excellent quality', 'Great shoes, very comfortable and durable. Highly recommended!', true, 45, 2, 'APPROVED', true, '2024-03-10 10:30:00', '2024-03-10 10:30:00'),
('review002-1234-1234-1234-123456789013', 'prod123-1234-1234-1234-123456789012', '66666666-6666-6666-6666-666666666666', 4, 'Good value for money', 'Good product, fits perfectly. Shipping was fast.', true, 32, 1, 'APPROVED', true, '2024-03-09 15:45:00', '2024-03-09 15:45:00'),
('review003-1234-1234-1234-123456789014', 'prod125-1234-1234-1234-123456789014', '77777777-7777-7777-7777-777777777777', 5, 'Best noise cancelling headphones', 'The noise cancellation is phenomenal. Perfect for commuting and travel.', true, 67, 4, 'APPROVED', true, '2024-03-11 14:30:00', '2024-03-11 14:30:00')
ON CONFLICT (id) DO NOTHING;

-- Insert notifications
INSERT INTO notifications (id, user_id, type, title, message, link, is_read, is_active, created_at) VALUES
('notif001-1234-1234-1234-123456789012', '44444444-4444-4444-4444-444444444444', 'ORDER', 'Order Confirmed', 'Your order #FYZ-2024-002 has been confirmed and is being processed.', '/my-orders', false, true, '2024-03-12 14:20:00'),
('notif002-1234-1234-1234-123456789013', '44444444-4444-4444-4444-444444444444', 'DELIVERY', 'Shipped', 'Your order #FYZ-2024-001 has been shipped and is on its way.', '/my-orders', false, true, '2024-03-11 14:00:00'),
('notif003-1234-1234-1234-123456789014', '44444444-4444-4444-4444-444444444444', 'PAYMENT', 'Payment Successful', 'Payment of GH₵ 299.99 for order #FYZ-2024-001 was successful.', '/my-orders', true, true, '2024-03-10 10:35:00'),
('notif004-1234-1234-1234-123456789015', '66666666-6666-6666-6666-666666666666', 'WISHLIST', 'Price Drop Alert', 'Premium Sneakers price has dropped by 15%!', '/wishlist', true, true, '2024-03-09 12:00:00'),
('notif005-1234-1234-1234-123456789016', '77777777-7777-7777-7777-777777777777', 'PROMOTION', 'Flash Sale', 'Up to 60% off on electronics! Limited time offer.', '/flash-sales', true, true, '2024-03-08 09:00:00')
ON CONFLICT (id) DO NOTHING;

-- Insert seller profiles
INSERT INTO seller_profiles (id, user_id, store_name, store_description, store_logo_url, store_banner_url, business_type, verification_status, rating, total_reviews, total_products, total_sales, is_featured, is_active, created_at, updated_at) VALUES
('sellerprof001-1234-1234-1234-123456789012', '55555555-5555-5555-5555-555555555555', 'Premium Footwear Co', 'Premium fashion store offering the latest trends in footwear and apparel. We specialize in quality shoes, bags, and accessories for the modern consumer.', 'https://cdn.fynza.com/stores/premium-footwear-logo.jpg', 'https://cdn.fynza.com/stores/premium-footwear-banner.jpg', 'COMPANY', 'VERIFIED', 4.70, 328, 24, 2450, true, true, '2023-03-15 10:00:00', '2024-03-15 10:00:00')
ON CONFLICT (id) DO NOTHING;

-- Insert coupons
INSERT INTO seller_coupons (id, seller_id, code, name, description, discount_type, discount_value, min_order_amount, max_discount, usage_limit, usage_count, valid_from, valid_until, status, is_active, created_at, updated_at) VALUES
('coupon001-1234-1234-1234-123456789012', '55555555-5555-5555-5555-555555555555', 'SAVE10', '10% Off', 'Get 10% off on orders above GHC 50', 'PERCENTAGE', 10.00, 50.00, NULL, 100, 45, '2024-01-01 00:00:00', '2026-04-30 23:59:59', 'ACTIVE', true, '2024-01-01 10:00:00', '2024-03-15 10:00:00'),
('coupon002-1234-1234-1234-123456789013', '55555555-5555-5555-5555-555555555555', 'FREESHIP', 'Free Shipping', 'Free delivery on orders above GHC 100', 'FREE_SHIPPING', 0.00, 100.00, NULL, 200, 120, '2024-01-01 00:00:00', '2026-04-15 23:59:59', 'ACTIVE', true, '2024-01-01 10:00:00', '2024-03-15 10:00:00')
ON CONFLICT (id) DO NOTHING;
