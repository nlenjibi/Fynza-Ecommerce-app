import { apiClient } from '@/lib/api-client'

/**
 * Product Service - REST API endpoints for product management
 * Uses REST for simple CRUD operations as per API design
 * GraphQL available for complex queries (search, filtering, aggregations)
 * 
 * API Base: https://api.fynza.com/api/v1
 */
export const productService = {
  /**
   * GET /products
   * Get all products with filtering and pagination
   * 
   * Query Parameters:
   * - category: string
   * - minPrice: number
   * - maxPrice: number
   * - search: string
   * - page: number (default: 1)
   * - limit: number (default: 20)
   * - sortBy: 'price' | 'rating' | 'newest'
   */
  async getProducts(params: {
    page?: number
    limit?: number
    category?: string
    minPrice?: number
    maxPrice?: number
    search?: string
    sortBy?: 'price' | 'rating' | 'newest'
  } = {}) {
    try {
      const queryParams = new URLSearchParams()
      if (params.page) queryParams.append('page', params.page.toString())
      if (params.limit) queryParams.append('limit', params.limit.toString())
      if (params.category) queryParams.append('category', params.category)
      if (params.minPrice) queryParams.append('minPrice', params.minPrice.toString())
      if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString())
      if (params.search) queryParams.append('search', params.search)
      if (params.sortBy) queryParams.append('sortBy', params.sortBy)

      const response = await apiClient.get(`/products?${queryParams.toString()}`)
      console.log('[v0] GET /products - fetched', response?.data?.pagination?.totalItems, 'items')
      return response?.data
    } catch (error) {
      console.error('[v0] Error in productService.getProducts:', error)
      throw error
    }
  },

  /**
   * GET /products/:productId
   * Get detailed product information including reviews and seller details
   */
  async getProductById(productId: string) {
    try {
      const response = await apiClient.get(`/products/${productId}`)
      console.log('[v0] GET /products/:productId - fetched', response?.data?.name)
      return response?.data
    } catch (error) {
      console.error(`[v0] Error fetching product ${productId}:`, error)
      throw error
    }
  },

  /**
   * GET /products/:productId/reviews
   * Get product reviews with pagination and sorting
   * 
   * Query Parameters:
   * - page: number (default: 1)
   * - limit: number (default: 10)
   * - sortBy: 'recent' | 'helpful' | 'rating'
   */
  async getProductReviews(
    productId: string,
    params: {
      page?: number
      limit?: number
      sortBy?: 'recent' | 'helpful' | 'rating'
    } = {}
  ) {
    try {
      const queryParams = new URLSearchParams()
      if (params.page) queryParams.append('page', params.page.toString())
      if (params.limit) queryParams.append('limit', params.limit.toString())
      if (params.sortBy) queryParams.append('sortBy', params.sortBy)

      const response = await apiClient.get(`/products/${productId}/reviews?${queryParams.toString()}`)
      console.log('[v0] GET /products/:productId/reviews - fetched', response?.data?.data?.length, 'reviews')
      return response?.data
    } catch (error) {
      console.error(`[v0] Error fetching reviews for ${productId}:`, error)
      throw error
    }
  },

  /**
   * POST /products/:productId/reviews
   * Add a review to a product
   * Only accessible to authenticated customers with verified purchase
   * 
   * Request Body:
   * {
   *   rating: number (1-5),
   *   title: string,
   *   text: string,
   *   images?: string[]
   * }
   */
  async addProductReview(
    productId: string,
    reviewData: {
      rating: number
      title: string
      text: string
      images?: string[]
    }
  ) {
    try {
      const response = await apiClient.post(`/products/${productId}/reviews`, reviewData)
      console.log('[v0] POST /products/:productId/reviews - review added')
      return response?.data
    } catch (error) {
      console.error(`[v0] Error adding review for ${productId}:`, error)
      throw error
    }
  },

  /**
   * GET /products/search
   * Search products with comprehensive filters
   * 
   * Query Parameters: See ProductFilters interface for all available parameters
   */
  async searchProducts(query: string, filters?: any) {
    try {
      const queryParams = new URLSearchParams()
      queryParams.append('q', query)
      
      // Add filter parameters if provided
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
              queryParams.append(key, value.join(','))
            } else if (typeof value === 'boolean') {
              queryParams.append(key, value.toString())
            } else {
              queryParams.append(key, String(value))
            }
          }
        })
      }

      const response = await apiClient.get(`/products/search?${queryParams.toString()}`)
      console.log('[v0] GET /products/search - fetched', response?.data?.data?.results?.length, 'products')
      return response?.data?.data?.results || []
    } catch (error) {
      console.error('[v0] Error in productService.searchProducts:', error)
      throw error
    }
  },

  /**
   * GET /products/search/advanced
   * Search products with comprehensive filters (without query parameter)
   */
  async searchProductsWithFilters(filters: any) {
    try {
      const queryParams = new URLSearchParams()
      
      // Add filter parameters
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
              queryParams.append(key, value.join(','))
            } else if (typeof value === 'boolean') {
              queryParams.append(key, value.toString())
            } else {
              queryParams.append(key, String(value))
            }
          }
        })
      }

      const response = await apiClient.get(`/products/search/advanced?${queryParams.toString()}`)
      console.log('[v0] GET /products/search/advanced - fetched', response?.data?.data?.results?.length, 'products')
      return response?.data?.data?.results || []
    } catch (error) {
      console.error('[v0] Error in productService.searchProductsWithFilters:', error)
      throw error
    }
  },

  /**
   * GET /products/filtered
   * Get products with comprehensive filters
   */
  async getProductsWithFilters(filters: any) {
    try {
      const queryParams = new URLSearchParams()
      
      // Add filter parameters
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
              queryParams.append(key, value.join(','))
            } else if (typeof value === 'boolean') {
              queryParams.append(key, value.toString())
            } else {
              queryParams.append(key, String(value))
            }
          }
        })
      }

      const response = await apiClient.get(`/products/filtered?${queryParams.toString()}`)
      console.log('[v0] GET /products/filtered - fetched', response?.data?.data?.results?.length, 'products')
      return response?.data?.data?.results || []
    } catch (error) {
      console.error('[v0] Error in productService.getProductsWithFilters:', error)
      throw error
    }
  },

  /**
   * GET /categories
   * Get all product categories
   */
  async getCategories() {
    try {
      const response = await apiClient.get('/categories')
      console.log('[v0] GET /categories - fetched', response?.data?.data?.length, 'categories')
      return response?.data?.data || []
    } catch (error) {
      console.error('[v0] Error in productService.getCategories:', error)
      throw error
    }
  },

  /**
   * GET /categories/:categoryId/products
   * Get products by category with pagination
   */
  async getProductsByCategory(categoryId: string, page = 1, limit = 20) {
    try {
      const queryParams = new URLSearchParams()
      queryParams.append('page', page.toString())
      queryParams.append('limit', limit.toString())

      const response = await apiClient.get(`/categories/${categoryId}/products?${queryParams.toString()}`)
      console.log('[v0] GET /categories/:categoryId/products - fetched', response?.data?.data?.length, 'products')
      return response?.data?.data || []
    } catch (error) {
      console.error(`[v0] Error fetching products for category ${categoryId}:`, error)
      throw error
    }
  },

  /**
   * GET /products/all
   * Get all products with pagination (legacy method)
   */
  async getAllProducts(page = 1, limit = 20) {
    try {
      const queryParams = new URLSearchParams()
      queryParams.append('page', page.toString())
      queryParams.append('limit', limit.toString())

      const response = await apiClient.get(`/products/all?${queryParams.toString()}`)
      console.log('[v0] GET /products/all - fetched', response?.data?.data?.length, 'products')
      return response?.data?.data || []
    } catch (error) {
      console.error('[v0] Error in productService.getAllProducts:', error)
      throw error
    }
  },
}