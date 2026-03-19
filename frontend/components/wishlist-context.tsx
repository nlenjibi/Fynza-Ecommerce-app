"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { trackingService } from "@/lib/services/tracking"

export interface WishlistItem {
  id: number
  name: string
  price: string
  oldPrice: string
  image: string
  rating: number
  reviews: number
}

interface WishlistContextType {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: number) => void
  isInWishlist: (id: number) => boolean
  toggleItem: (item: WishlistItem) => void
  clearWishlist: () => void
  itemCount: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("fynza-wishlist")
    if (savedWishlist) {
      try {
        setItems(JSON.parse(savedWishlist))
      } catch (e) {
        console.error("Failed to parse wishlist from localStorage", e)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save wishlist to localStorage whenever items change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fynza-wishlist", JSON.stringify(items))
    }
  }, [items, isLoaded])

  const addItem = (newItem: WishlistItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id)
      if (existingItem) {
        return prevItems
      }
      
      trackingService.trackAddToWishlist({
        id: String(newItem.id),
        name: newItem.name,
        price: parseFloat(newItem.price),
      })
      
      return [...prevItems, newItem]
    })
  }

  const removeItem = (id: number) => {
    const item = items.find((item) => item.id === id)
    if (item) {
      trackingService.trackRemoveFromWishlist({
        id: String(item.id),
        name: item.name,
        price: parseFloat(item.price),
      })
    }
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const isInWishlist = (id: number) => {
    return items.some((item) => item.id === id)
  }

  const toggleItem = (item: WishlistItem) => {
    if (isInWishlist(item.id)) {
      removeItem(item.id)
    } else {
      addItem(item)
    }
  }

  const clearWishlist = () => {
    setItems([])
  }

  const itemCount = items.length

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        isInWishlist,
        toggleItem,
        clearWishlist,
        itemCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
