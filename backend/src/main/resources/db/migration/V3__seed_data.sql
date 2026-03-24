-- Seed Data for Development
-- V3: Sample users, products, and cart data

-- Insert sample users (matching entity schema)
INSERT INTO users (id, username, email, password, first_name, last_name, phone, role, status, email_verified, is_active, created_at, updated_at) VALUES
('11111111-1111-1111-1111-111111111111', 'admin', 'admin@fynza.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Admin', 'User', '+1234567890', 'ADMIN', 'ACTIVE', true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('22222222-2222-2222-2222-222222222222', 'customer1', 'customer1@fynza.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Customer', 'One', '+1234567891', 'CUSTOMER', 'ACTIVE', true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('33333333-3333-3333-3333-333333333333', 'customer2', 'customer2@fynza.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Customer', 'Two', '+1234567892', 'CUSTOMER', 'ACTIVE', true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;

-- Insert sample categories
INSERT INTO categories (id, name, slug, description, is_active, created_at, updated_at) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Electronics', 'electronics', 'Electronic devices and accessories', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Clothing', 'clothing', 'Fashion and apparel', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Home & Garden', 'home-garden', 'Home improvement and garden', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;

-- Insert sample products
INSERT INTO products (id, name, slug, description, price, stock_quantity, category_id, is_active, created_at, updated_at) VALUES
('aaaa1111-aaaa-1111-aaaa-111111111111', 'Laptop Pro 15', 'laptop-pro-15', 'High-performance laptop with 16GB RAM', 1299.99, 50, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('aaaa2222-aaaa-2222-aaaa-222222222222', 'Wireless Mouse', 'wireless-mouse', 'Ergonomic wireless mouse', 29.99, 200, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('bbbb1111-bbbb-1111-bbbb-111111111111', 'Cotton T-Shirt', 'cotton-t-shirt', '100% organic cotton t-shirt', 19.99, 500, 'bbbbbbbb-bbbb-bbbb-bbbbbbbbbbbb', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('bbbb2222-bbbb-2222-bbbb-222222222222', 'Denim Jeans', 'denim-jeans', 'Classic fit denim jeans', 49.99, 150, 'bbbbbbbb-bbbb-bbbb-bbbbbbbbbbbb', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('cccc1111-cccc-1111-cccc-111111111111', 'Garden Chair', 'garden-chair', 'Outdoor garden chair', 89.99, 75, 'cccccccc-cccc-cccc-cccccccccccc', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;

-- Insert sample product variants (for products with variants)
INSERT INTO product_variants (id, product_id, sku, size, color, price_override, stock, is_active, created_at, updated_at) VALUES
('vaaa1111-vaaa-1111-vaaa-111111111111', 'aaaa1111-aaaa-1111-aaaa-111111111111', 'LAPTOP-PRO-15-512', '512GB', NULL, 1299.99, 25, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('vaaa2222-vaaa-2222-vaaa-222222222222', 'aaaa1111-aaaa-1111-aaaa-111111111111', 'LAPTOP-PRO-15-1TB', '1TB', NULL, 1499.99, 25, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('vbbbb1111-vbbb-1111-vbbb-111111111111', 'bbbb1111-bbbb-1111-bbbb-111111111111', 'TSHIRT-S-WHITE', 'S', 'White', NULL, 100, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('vbbbb2222-vbbb-2222-vbbb-222222222222', 'bbbb1111-bbbb-1111-bbbb-111111111111', 'TSHIRT-M-WHITE', 'M', 'White', NULL, 150, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('vbbbb3333-vbbb-3333-vbbb-333333333333', 'bbbb1111-bbbb-1111-bbbb-111111111111', 'TSHIRT-L-WHITE', 'L', 'White', NULL, 150, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('vcccc1111-vccc-1111-vccc-111111111111', 'cccc1111-cccc-1111-cccc-111111111111', 'CHAIR-BLUE', NULL, 'Blue', NULL, 40, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('vcccc2222-vccc-2222-vccc-222222222222', 'cccc1111-cccc-1111-cccc-111111111111', 'CHAIR-GREEN', NULL, 'Green', NULL, 35, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;

-- Insert sample carts (active, not checked out, not abandoned)
INSERT INTO carts (id, user_id, coupon_code, is_checked_out, is_abandoned, last_activity_at, is_active, created_at, updated_at) VALUES
('cart1111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', NULL, false, false, CURRENT_TIMESTAMP, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;

-- Insert sample cart items
INSERT INTO cart_items (id, cart_id, product_id, variant_id, quantity, price, is_active, created_at, updated_at) VALUES
('citem111-1111-1111-1111-111111111111', 'cart1111-1111-1111-1111-111111111111', 'aaaa1111-aaaa-1111-aaaa-111111111111', 'vaaa1111-vaaa-1111-vaaa-111111111111', 1, 1299.99, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('citem222-2222-2222-2222-222222222222', 'cart1111-1111-1111-1111-111111111111', 'aaaa2222-aaaa-2222-aaaa-222222222222', NULL, 2, 29.99, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;

-- Insert sample abandoned cart (created 10 days ago)
INSERT INTO carts (id, user_id, coupon_code, is_checked_out, is_abandoned, abandoned_at, last_activity_at, is_active, created_at, updated_at) VALUES
('cart2222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', 'SAVE10', false, true, CURRENT_TIMESTAMP - INTERVAL '10 days', CURRENT_TIMESTAMP - INTERVAL '10 days', true, CURRENT_TIMESTAMP - INTERVAL '10 days', CURRENT_TIMESTAMP - INTERVAL '10 days')
ON CONFLICT (id) DO NOTHING;

INSERT INTO cart_items (id, cart_id, product_id, variant_id, quantity, price, is_active, created_at, updated_at) VALUES
('citem333-3333-3333-3333-333333333333', 'cart2222-2222-2222-2222-222222222222', 'bbbb1111-bbbb-1111-bbbb-111111111111', 'vbbbb1111-vbbb-1111-vbbb-111111111111', 3, 19.99, true, CURRENT_TIMESTAMP - INTERVAL '10 days', CURRENT_TIMESTAMP - INTERVAL '10 days')
ON CONFLICT (id) DO NOTHING;
