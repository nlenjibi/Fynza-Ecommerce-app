import { apiClient } from '@/lib/api-client'

/**
 * Customer Orders Service - REST API endpoints for order management
 * Uses REST for simple CRUD operations
 * 
 * API Base: https://api.fynza.com/api/v1
 */

export const orderService = {
  /**
   * GET /customers/orders
   * Get customer's order history with pagination and filtering
   * 
   * Query Parameters:
   * - status: PENDING | SHIPPED | DELIVERED | CANCELLED
   * - page: number (default: 1)
   * - limit: number (default: 10)
   * - sortBy: 'createdAt' (DESC default)
   */
  async getOrders(params: {
    status?: string
    page?: number
    limit?: number
    sortBy?: string
  } = {}) {
    try {
      const queryParams = new URLSearchParams()
      if (params.status) queryParams.append('status', params.status)
      if (params.page) queryParams.append('page', params.page.toString())
      if (params.limit) queryParams.append('limit', params.limit.toString())
      if (params.sortBy) queryParams.append('sortBy', params.sortBy)

      const response = await apiClient.get(`/customers/orders?${queryParams.toString()}`)
      console.log('[v0] GET /customers/orders - fetched', response?.data?.pagination?.totalItems, 'orders')
      return response?.data
    } catch (error) {
      console.error('[v0] Error in orderService.getOrders:', error)
      throw error
    }
  },

  /**
   * GET /customers/orders/:orderId
   * Get detailed order information with timeline and shipping details
   */
  async getOrderById(orderId: string) {
    try {
      const response = await apiClient.get(`/customers/orders/${orderId}`)
      console.log('[v0] GET /customers/orders/:orderId - fetched order', response?.data?.orderNumber)
      return response?.data
    } catch (error) {
      console.error(`[v0] Error fetching order ${orderId}:`, error)
      throw error
    }
  },

  /**
   * POST /customers/orders/:orderId/cancel
   * Cancel an order (if eligible)
   */
  async cancelOrder(orderId: string) {
    try {
      const response = await apiClient.post(`/customers/orders/${orderId}/cancel`)
      console.log('[v0] POST /customers/orders/:orderId/cancel - order cancelled')
      return response?.data
    } catch (error) {
      console.error(`[v0] Error cancelling order ${orderId}:`, error)
      throw error
    }
  },
}
