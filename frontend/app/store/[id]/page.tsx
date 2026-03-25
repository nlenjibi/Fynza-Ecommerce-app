'use client'

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StoreHeader } from "@/components/store/store-header"
import { StoreProductGrid } from "@/components/store/store-product-grid"
import { StoreFilterBar } from "@/components/store/store-filter-bar"
import { StoreSidebar } from "@/components/store/store-sidebar"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"

interface Store {
  id: string
  storeName: string
  logo?: string
  banner?: string
  description: string
  verified: boolean
  rating: number
  totalReviews: number
  positiveRate: number
  responseRate: number
  responseTime: string
  joinedDate: string
  totalProducts: number
  totalOrders: number
  location: string
  socialLinks?: {
    facebook?: string
    instagram?: string
    twitter?: string
  }
  followerCount?: number
  isFollowing?: boolean
}

export default function StorePage() {
  const params = useParams()
  const storeId = params.id as string
  const [store, setStore] = useState<Store | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStoreData(storeId)
  }, [storeId])

  const fetchStoreData = async (id: string) => {
    setLoading(true)
    const mockStore: Store = {
      id: id,
      storeName: "BEKIA FASHION",
      logo: "/store-logo-placeholder.jpg",
      banner: "/store-banner-placeholder.jpg",
      description: "Premium fashion store offering the latest trends in footwear and apparel. We specialize in quality shoes, bags, and accessories for the modern consumer.",
      verified: true,
      rating: 4.5,
      totalReviews: 328,
      positiveRate: 92,
      responseRate: 98,
      responseTime: "Within 1 hour",
      joinedDate: "2023-03-15",
      totalProducts: 156,
      totalOrders: 2450,
      location: "Accra, Ghana",
      followerCount: 1245,
      isFollowing: false,
      socialLinks: {
        facebook: "https://facebook.com/bekiafashion",
        instagram: "https://instagram.com/bekiafashion"
      }
    }
    setTimeout(() => {
      setStore(mockStore)
      setLoading(false)
    }, 500)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-lg mb-6"></div>
            <div className="flex gap-6">
              <div className="w-64 h-96 bg-gray-200 rounded-lg"></div>
              <div className="flex-1">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-72 bg-gray-200 rounded-lg"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!store) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-gray-800">Store Not Found</h1>
            <p className="text-gray-600 mt-2">The store you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <StoreHeader store={store} />

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 mt-6">
          <StoreSidebar store={store} />
          <div>
            <StoreFilterBar totalProducts={store.totalProducts} />
            <StoreProductGrid storeId={storeId} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
