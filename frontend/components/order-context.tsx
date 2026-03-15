"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface OrderItem {
  id: number
  name: string
  price: string
  oldPrice: string
  image: string
  quantity: number
}

export interface Order {
  id: string
  items: OrderItem[]
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  date: string
  deliveryAddress: string
  paymentMethod: string
}

interface OrderContextType {
  orders: Order[]
  addOrder: (order: Order) => void
  updateOrder: (orderId: string, updates: Partial<Order>) => void
  cancelOrder: (orderId: string) => void
  getOrderById: (orderId: string) => Order | undefined
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem("fynza-orders")
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders))
      } catch (e) {
        console.error("Failed to parse orders from localStorage", e)
      }
    } else {
      // Add demo orders for testing
      const demoOrders: Order[] = [
        {
          id: "FYN001",
          items: [
            { id: 1, name: "Girls PU Leather Princess Shoes", price: "GHC 166.66", oldPrice: "GHC 195.00", image: "/black-girls-shoes.jpg", quantity: 1 },
          ],
          status: "pending",
          total: 166.66,
          date: new Date().toISOString(),
          deliveryAddress: "123 Main Street, Accra",
          paymentMethod: "Cash on Delivery"
        },
        {
          id: "FYN002",
          items: [
            { id: 2, name: "Boys Sports Casual Shoes", price: "GHC 199.94", oldPrice: "GHC 234.00", image: "/boys-sports-shoes.jpg", quantity: 2 },
          ],
          status: "shipped",
          total: 399.88,
          date: new Date(Date.now() - 86400000).toISOString(),
          deliveryAddress: "123 Main Street, Accra",
          paymentMethod: "Mobile Money"
        },
      ]
      setOrders(demoOrders)
    }
    setIsLoaded(true)
  }, [])

  // Save orders to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fynza-orders", JSON.stringify(orders))
    }
  }, [orders, isLoaded])

  const addOrder = (newOrder: Order) => {
    setOrders((prevOrders) => [...prevOrders, newOrder])
  }

  const updateOrder = (orderId: string, updates: Partial<Order>) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, ...updates } : order
      )
    )
  }

  const cancelOrder = (orderId: string) => {
    updateOrder(orderId, { status: "cancelled" })
  }

  const getOrderById = (orderId: string) => {
    return orders.find((order) => order.id === orderId)
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        updateOrder,
        cancelOrder,
        getOrderById,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrderProvider")
  }
  return context
}
