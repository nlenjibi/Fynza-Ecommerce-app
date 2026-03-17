import { useState, useCallback, useEffect } from 'react'
import { productService, type Product, type Category } from '@/lib/services/products'

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

  const searchProducts = useCallback(async (query: string, filters?: Record<string, unknown>) => {
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
    fetchCategories,
    fetchProductsByCategory,
  }
}
