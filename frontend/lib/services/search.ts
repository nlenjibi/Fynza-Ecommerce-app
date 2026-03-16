import { apiClient } from '@/lib/api-client'

/**
 * Search Service - REST API endpoints for product search
 * Handles general search across products, brands, and categories
 * 
 * API Base: https://api.fynza.com/api/v1
 */

export interface SearchFilters {
    // Search
    keyword?: string;
    name?: string;
    description?: string;
    sku?: string;
    slug?: string;

    // Category
    categoryId?: string;
    categoryIds?: string[];
    categoryName?: string;
    categorySlug?: string;

    // Price
    minPrice?: number;
    maxPrice?: number;
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
    inventoryStatus?: string;
    inventoryStatuses?: string[];
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
    createdAfter?: string;
    createdBefore?: string;

    // Popularity
    minViews?: number;
    maxViews?: number;
    minSales?: number;

    // Pagination & Sorting
    page?: number;
    limit?: number;
    sortBy?: 'popularity' | 'price-low' | 'price-high' | 'rating' | 'newest' | 'views' | 'sales';

    // Eager loading
    includeCategory?: boolean;
    includeImages?: boolean;
}

export interface SearchResult {
    id: string;
    name: string;
    description?: string;
    price: number;
    originalPrice?: number;
    discountPercentage?: number;
    image: string;
    images?: string[];
    rating: number;
    totalReviews: number;
    seller: {
        id: string;
        name: string;
        rating: number;
    };
    category?: {
        id: string;
        name: string;
    };
    inStock: boolean;
}

export interface SearchResponse {
    results: SearchResult[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
    suggestions?: string[];
}

export const searchService = {
    /**
     * GET /search
     * General search across products, brands, and categories
     * 
     * Query Parameters:
     * - q: string (search query - required)
     * - categoryId: string
     * - minPrice: number
     * - maxPrice: number
     * - minRating: number
     * - inStock: boolean
     * - sortBy: 'popularity' | 'price-low' | 'price-high' | 'rating' | 'newest'
     * - page: number (default: 1)
     * - limit: number (default: 20)
     */
    async search(query: string, filters: SearchFilters = {}): Promise<SearchResponse> {
        if (!query.trim()) {
            throw new Error('Search query is required')
        }

        try {
            const queryParams = new URLSearchParams()
            queryParams.append('q', query)

            if (filters.categoryId) queryParams.append('categoryId', filters.categoryId)
            if (filters.minPrice !== undefined) queryParams.append('minPrice', filters.minPrice.toString())
            if (filters.maxPrice !== undefined) queryParams.append('maxPrice', filters.maxPrice.toString())
            if (filters.minRating !== undefined) queryParams.append('minRating', filters.minRating.toString())
            if (filters.inStock !== undefined) queryParams.append('inStock', filters.inStock.toString())
            if (filters.sortBy) queryParams.append('sortBy', filters.sortBy)
            if (filters.page) queryParams.append('page', filters.page.toString())
            if (filters.limit) queryParams.append('limit', filters.limit.toString())

            const response = await apiClient.get(`/search?${queryParams.toString()}`)
            console.log('[Search] GET /search - found', response?.data?.total, 'results for query:', query)
            return response?.data
        } catch (error) {
            console.error('[Search] Error in searchService.search:', error)
            throw error
        }
    },

    /**
     * GET /search/suggestions
     * Get search suggestions based on partial query
     * Useful for autocomplete functionality
     * 
     * Query Parameters:
     * - q: string (partial search query - required)
     * - limit: number (default: 10)
     */
    async getSuggestions(query: string, limit: number = 10): Promise<string[]> {
        if (!query.trim()) {
            return []
        }

        try {
            const queryParams = new URLSearchParams()
            queryParams.append('q', query)
            queryParams.append('limit', limit.toString())

            const response = await apiClient.get(`/search/suggestions?${queryParams.toString()}`)
            console.log('[Search] GET /search/suggestions - found', response?.data?.length, 'suggestions')
            return response?.data || []
        } catch (error) {
            console.error('[Search] Error in searchService.getSuggestions:', error)
            return []
        }
    },

    /**
     * GET /search/trending
     * Get trending search queries
     * 
     * Query Parameters:
     * - limit: number (default: 10)
     */
    async getTrendingSearches(limit: number = 10): Promise<string[]> {
        try {
            const queryParams = new URLSearchParams()
            queryParams.append('limit', limit.toString())

            const response = await apiClient.get(`/search/trending?${queryParams.toString()}`)
            console.log('[Search] GET /search/trending - found', response?.data?.length, 'trending searches')
            return response?.data || []
        } catch (error) {
            console.error('[Search] Error in searchService.getTrendingSearches:', error)
            return []
        }
    },

    /**
     * GET /search/popular
     * Get popular products
     * 
     * Query Parameters:
     * - limit: number (default: 20)
     * - categoryId: string (optional)
     */
    async getPopularProducts(limit: number = 20, categoryId?: string): Promise<SearchResult[]> {
        try {
            const queryParams = new URLSearchParams()
            queryParams.append('limit', limit.toString())
            if (categoryId) queryParams.append('categoryId', categoryId)

            const response = await apiClient.get(`/search/popular?${queryParams.toString()}`)
            console.log('[Search] GET /search/popular - found', response?.data?.length, 'popular products')
            return response?.data || []
        } catch (error) {
            console.error('[Search] Error in searchService.getPopularProducts:', error)
            return []
        }
    },
}
