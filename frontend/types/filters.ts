/**
 * Filter types matching backend schema
 * Optimized for performance and user experience
 */

export enum InventoryStatus {
    IN_STOCK = 'IN_STOCK',
    LOW_STOCK = 'LOW_STOCK',
    OUT_OF_STOCK = 'OUT_OF_STOCK',
    NEEDS_REORDER = 'NEEDS_REORDER',
}

export interface ProductFilters {
    // Search
    keyword?: string;
    name?: string;
    description?: string;
    sku?: string;
    slug?: string;

    // Category
    categoryId?: number;
    categoryIds?: number[];
    categoryName?: string;
    categorySlug?: string;

    // Price (original price)
    minPrice?: number;
    maxPrice?: number;

    // Price (effective price - considers discount)
    minEffectivePrice?: number;
    maxEffectivePrice?: number;

    // Discount
    hasDiscount?: boolean;
    minDiscountPercent?: number;
    maxDiscountPercent?: number;

    // Rating
    minRating?: number;
    maxRating?: number;

    // Stock
    inStockOnly?: boolean;
    lowStockOnly?: boolean;
    outOfStockOnly?: boolean;
    needsReorderOnly?: boolean;
    inventoryStatus?: InventoryStatus;
    inventoryStatuses?: InventoryStatus[];
    minStock?: number;
    maxStock?: number;
    minAvailableQuantity?: number;

    // Product Status
    featured?: boolean;
    isNew?: boolean;
    isActive?: boolean;
    isBestseller?: boolean;
    popular?: boolean;
    trending?: boolean;

    // Tags
    tags?: string[];

    // Date Range
    createdAfter?: string; // ISO date
    createdBefore?: string; // ISO date

    // Popularity
    minViews?: number;
    maxViews?: number;
    minSales?: number;

    // Pagination
    page?: number;
    limit?: number;

    // Sorting
    sortBy?: 'popularity' | 'price-low' | 'price-high' | 'rating' | 'newest' | 'views' | 'sales';

    // Eager loading
    includeCategory?: boolean;
    includeImages?: boolean;
}

export interface FilterOption {
    id: string | number;
    label: string;
    count?: number;
    icon?: string;
}

export interface FilterGroup {
    id: string;
    label: string;
    type: 'checkbox' | 'radio' | 'range' | 'toggle' | 'date';
    options?: FilterOption[];
    minValue?: number;
    maxValue?: number;
    step?: number;
    unit?: string;
    collapsible?: boolean;
    defaultExpanded?: boolean;
}

export interface AppliedFilter {
    groupId: string;
    label: string;
    value: string | number | boolean | (string | number)[];
    removable?: boolean;
}
