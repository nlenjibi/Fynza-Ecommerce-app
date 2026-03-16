-- V2__add_product_brand.sql
-- Add brand column to products table and create index
-- Created: March 2026

ALTER TABLE products 
ADD COLUMN IF NOT EXISTS brand VARCHAR(255);

CREATE INDEX IF NOT EXISTS idx_products_brand 
ON products(brand);

ANALYZE products;
