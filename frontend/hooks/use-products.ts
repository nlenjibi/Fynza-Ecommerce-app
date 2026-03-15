import { useState, useCallback } from 'react'
import { productService, type Product, type Category } from '@/lib/services/products'

// Inventory status enum
export enum InventoryStatus {
  IN_STOCK = "IN_STOCK",
  LOW_STOCK = "LOW_STOCK",
  OUT_OF_STOCK = "OUT_OF_STOCK",
  DISCONTINUED = "DISCONTINUED",
  PRE_ORDER = "PRE_ORDER",
  BACKORDER = "BACKORDER",
  COMING_SOON = "COMING_SOON"
}

// Product status enum
export enum ProductStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DRAFT = "DRAFT",
  ARCHIVED = "ARCHIVED",
  DELETED = "DELETED"
}

// Comprehensive filter interface
export interface ProductFilters {
  // Category filters
  categoryId?: string
  categoryIds?: string[]
  categoryName?: string
  categorySlug?: string

  // Product information filters
  name?: string
  description?: string
  sku?: string
  slug?: string
  keyword?: string

  // Price filters
  minPrice?: number
  maxPrice?: number
  minEffectivePrice?: number
  maxEffectivePrice?: number

  // Status filters
  featured?: boolean
  isNew?: boolean
  isActive?: boolean
  isBestseller?: boolean

  // Inventory filters
  inStockOnly?: boolean
  lowStockOnly?: boolean
  outOfStockOnly?: boolean
  needsReorderOnly?: boolean
  inventoryStatus?: InventoryStatus
  inventoryStatuses?: InventoryStatus[]
  minStock?: number
  maxStock?: number
  minAvailableQuantity?: number

  // Discount filters
  hasDiscount?: boolean
  minDiscountPercent?: number
  maxDiscountPercent?: number

  // Rating filters
  minRating?: number
  maxRating?: number

  // Engagement filters
  minViews?: number
  maxViews?: number
  minSales?: number
  popular?: boolean
  trending?: boolean

  // Tag filters
  tags?: string[]

  // Date filters
  createdAfter?: string
  createdBefore?: string

  // Response options
  includeCategory?: boolean
  includeImages?: boolean

  // Existing filters
  sellerId?: string
  search?: string
  status?: ProductStatus
  brandId?: string
  expressDelivery?: boolean

  // Sorting
  sortBy?: 'price' | 'rating' | 'newest' | 'popularity' | 'sales' | 'views' | 'discount' | 'stock'
  sortOrder?: 'asc' | 'desc'

  // Pagination
  page?: number
  limit?: number
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = useCallback(async (page = 1, limit = 20) => {
    setLoading(true)
    setError(null)
    try {
      const data = await productService.getAllProducts(page, limit)
      setProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchProductById = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      const data = await productService.getProductById(id)
      return data
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch product'
      setError(errorMsg)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const searchProducts = useCallback(async (query: string, filters?: ProductFilters) => {
    setLoading(true)
    setError(null)
    try {
      const data = await productService.searchProducts(query, filters)
      setProducts(data)
      return data
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to search products'
      setError(errorMsg)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const searchProductsWithFilters = useCallback(async (filters: ProductFilters) => {
    setLoading(true)
    setError(null)
    try {
      const data = await productService.searchProductsWithFilters(filters)
      setProducts(data)
      return data
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to search products with filters'
      setError(errorMsg)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchProductsWithFilters = useCallback(async (filters: ProductFilters) => {
    setLoading(true)
    setError(null)
    try {
      const data = await productService.getProductsWithFilters(filters)
      setProducts(data)
      return data
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch products with filters'
      setError(errorMsg)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchCategories = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await productService.getCategories()
      setCategories(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch categories')
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchProductsByCategory = useCallback(async (categoryId: string, page = 1, limit = 20) => {
    setLoading(true)
    setError(null)
    try {
      const data = await productService.getProductsByCategory(categoryId, page, limit)
      setProducts(data)
      return data
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch category products'
      setError(errorMsg)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    products,
    categories,
    loading,
    error,
    fetchProducts,
    fetchProductById,
    searchProducts,
    searchProductsWithFilters,
    fetchProductsWithFilters,
    fetchCategories,
    fetchProductsByCategory,
  }
}
