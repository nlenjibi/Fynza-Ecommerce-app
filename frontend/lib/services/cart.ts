import { apiClient } from '@/lib/api-client'

/**
 * Shopping Cart Service - REST API endpoints
 * All cart operations use REST for simple CRUD
 * 
 * API Base: https://api.fynza.com/api/v1
 */

export const cartService = {
  /**
   * GET /cart
   * Get current shopping cart with all items and calculations
   */
  async getCart() {
    try {
      const response = await apiClient.get('/cart')
      console.log('[v0] GET /cart - fetched', response?.data?.itemsCount, 'items')
      return response?.data
    } catch (error) {
      console.error('[v0] Error in cartService.getCart:', error)
      throw error
    }
  },

  /**
   * POST /cart/items
   * Add item to shopping cart
   * 
   * Request Body:
   * {
   *   productId: string,
   *   quantity: number,
   *   size?: string,
   *   color?: string
   * }
   */
  async addToCart(item: {
    productId: string
    quantity: number
    size?: string
    color?: string
  }) {
    try {
      const response = await apiClient.post('/cart/items', item)
      console.log('[v0] POST /cart/items - item added')
      return response?.data
    } catch (error) {
      console.error('[v0] Error in cartService.addToCart:', error)
      throw error
    }
  },

  /**
   * PUT /cart/items/:cartItemId
   * Update cart item quantity
   * 
   * Request Body:
   * {
   *   quantity: number
   * }
   */
  async updateCartItem(cartItemId: string, quantity: number) {
    try {
      const response = await apiClient.put(`/cart/items/${cartItemId}`, { quantity })
      console.log('[v0] PUT /cart/items/:cartItemId - updated to qty', quantity)
      return response?.data
    } catch (error) {
      console.error(`[v0] Error updating cart item ${cartItemId}:`, error)
      throw error
    }
  },

  /**
   * DELETE /cart/items/:cartItemId
   * Remove item from shopping cart
   */
  async removeFromCart(cartItemId: string) {
    try {
      const response = await apiClient.delete(`/cart/items/${cartItemId}`)
      console.log('[v0] DELETE /cart/items/:cartItemId - item removed')
      return response?.data
    } catch (error) {
      console.error(`[v0] Error removing cart item ${cartItemId}:`, error)
      throw error
    }
  },

  /**
   * DELETE /cart
   * Clear entire shopping cart
   */
  async clearCart() {
    try {
      const response = await apiClient.delete('/cart')
      console.log('[v0] DELETE /cart - cart cleared')
      return response?.data
    } catch (error) {
      console.error('[v0] Error clearing cart:', error)
      throw error
    }
  },
}
