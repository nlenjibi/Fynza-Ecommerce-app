import { useState, useCallback } from 'react'
import { cartService, type Cart, type AddToCartRequest } from '@/lib/services/cart'

export function useCart() {
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCart = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await cartService.getCart()
      setCart(data)
      return data
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch cart'
      setError(errorMsg)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const addToCart = useCallback(async (item: AddToCartRequest) => {
    setLoading(true)
    setError(null)
    try {
      const data = await cartService.addToCart(item)
      setCart(data)
      return data
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to add item to cart'
      setError(errorMsg)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const updateCartItem = useCallback(async (itemId: string, quantity: number) => {
    setLoading(true)
    setError(null)
    try {
      const data = await cartService.updateCartItem(itemId, quantity)
      setCart(data)
      return data
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to update cart item'
      setError(errorMsg)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const removeFromCart = useCallback(async (itemId: string) => {
    setLoading(true)
    setError(null)
    try {
      const data = await cartService.removeFromCart(itemId)
      setCart(data)
      return data
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to remove item from cart'
      setError(errorMsg)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const clearCart = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      await cartService.clearCart()
      setCart(null)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to clear cart'
      setError(errorMsg)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    cart,
    loading,
    error,
    fetchCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
  }
}
