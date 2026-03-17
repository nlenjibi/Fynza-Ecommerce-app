-- Cart Module Schema
-- V2: Cart and Cart Items tables for hybrid Redis + DB cart system

-- Product variants table (referenced by cart items)
CREATE TABLE IF NOT EXISTS product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id),
    sku VARCHAR(50) NOT NULL UNIQUE,
    size VARCHAR(50),
    color VARCHAR(50),
    price_override DECIMAL(10, 2),
    stock INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_product_variant_product ON product_variants(product_id);
CREATE INDEX idx_product_variant_sku ON product_variants(sku);

-- Cart table
CREATE TABLE IF NOT EXISTS carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id),
    coupon_code VARCHAR(50),
    is_checked_out BOOLEAN DEFAULT false,
    checked_out_at TIMESTAMP,
    is_abandoned BOOLEAN DEFAULT false,
    abandoned_at TIMESTAMP,
    last_activity_at TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Cart Items table
CREATE TABLE IF NOT EXISTS cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    variant_id UUID REFERENCES product_variants(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    price DECIMAL(10, 2) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for cart performance
CREATE INDEX idx_cart_user_id ON carts(user_id);
CREATE INDEX idx_cart_abandoned ON carts(is_abandoned, is_checked_out);
CREATE INDEX idx_cart_last_activity ON carts(last_activity_at);

-- Indexes for cart items
CREATE INDEX idx_cart_items_cart_id ON cart_items(cart_id);
CREATE INDEX idx_cart_items_product_id ON cart_items(product_id);
CREATE INDEX idx_cart_items_variant_id ON cart_items(variant_id);

-- Stock reservations table for Redis-based reservations
CREATE TABLE IF NOT EXISTS stock_reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id),
    variant_id UUID REFERENCES product_variants(id),
    user_id UUID NOT NULL REFERENCES users(id),
    quantity INTEGER NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_stock_reservations_product ON stock_reservations(product_id, variant_id);
CREATE INDEX idx_stock_reservations_user ON stock_reservations(user_id);
CREATE INDEX idx_stock_reservations_expires ON stock_reservations(expires_at, status);
