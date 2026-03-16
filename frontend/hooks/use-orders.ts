import { useState, useCallback } from 'react'
import { orderService, type Order, type CreateOrderRequest } from '@/lib/services/orders'

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = useCallback(async (status?: string) => {
    setLoading(true)
    setError(null)
    try {
      const data = await orderService.getOrders(status)
      setOrders(data)
      return data
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch orders'
      setError(errorMsg)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchOrderById = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      const data = await orderService.getOrderById(id)
      setCurrentOrder(data)
      return data
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch order'
      setError(errorMsg)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const createOrder = useCallback(async (orderData: CreateOrderRequest) => {
    setLoading(true)
    setError(null)
    try {
      const data = await orderService.createOrder(orderData)
      setOrders((prev) => [data, ...prev])
      return data
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to create order'
      setError(errorMsg)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const cancelOrder = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      const data = await orderService.cancelOrder(id)
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? data : order))
      )
      if (currentOrder?.id === id) {
        setCurrentOrder(data)
      }
      return data
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to cancel order'
      setError(errorMsg)
      throw err
    } finally {
      setLoading(false)
    }
  }, [currentOrder])

  return {
    orders,
    currentOrder,
    loading,
    error,
    fetchOrders,
    fetchOrderById,
    createOrder,
    cancelOrder,
  }
}
