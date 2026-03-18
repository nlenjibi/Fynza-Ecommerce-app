"use client"

import { useState, useEffect } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  RefreshCw,
  Trash2,
  ShoppingCart,
  Heart,
  Eye,
  MousePointerClick,
  Package,
  DollarSign,
} from "lucide-react"

interface TrackingEvent {
  id: string
  event: string
  productName: string
  productId: number
  category: string
  price: number
  timestamp: string
  sessionId?: string
}

const sampleEvents: TrackingEvent[] = [
  {
    id: "1",
    event: "add_to_cart",
    productName: "iPhone 15 Pro Max",
    productId: 101,
    category: "Electronics",
    price: 1199,
    timestamp: "2024-03-15T14:30:25Z",
    sessionId: "sess_abc123",
  },
  {
    id: "2",
    event: "product_view",
    productName: "Samsung Galaxy S24",
    productId: 102,
    category: "Electronics",
    price: 899,
    timestamp: "2024-03-15T14:25:10Z",
    sessionId: "sess_def456",
  },
  {
    id: "3",
    event: "add_to_wishlist",
    productName: "Nike Air Max 270",
    productId: 201,
    category: "Fashion",
    price: 149,
    timestamp: "2024-03-15T14:20:45Z",
    sessionId: "sess_ghi789",
  },
  {
    id: "4",
    event: "product_click",
    productName: "MacBook Pro 16",
    productId: 103,
    category: "Electronics",
    price: 2499,
    timestamp: "2024-03-15T14:15:30Z",
    sessionId: "sess_jkl012",
  },
  {
    id: "5",
    event: "add_to_cart",
    productName: "Sony WH-1000XM5",
    productId: 104,
    category: "Electronics",
    price: 399,
    timestamp: "2024-03-15T14:10:15Z",
    sessionId: "sess_mno345",
  },
  {
    id: "6",
    event: "product_view",
    productName: "Adidas Ultraboost",
    productId: 202,
    category: "Fashion",
    price: 179,
    timestamp: "2024-03-15T14:05:00Z",
    sessionId: "sess_pqr678",
  },
  {
    id: "7",
    event: "add_to_wishlist",
    productName: "Apple Watch Series 9",
    productId: 105,
    category: "Electronics",
    price: 429,
    timestamp: "2024-03-15T14:00:25Z",
    sessionId: "sess_stu901",
  },
  {
    id: "8",
    event: "purchase",
    productName: "iPad Pro 12.9",
    productId: 106,
    category: "Electronics",
    price: 1199,
    timestamp: "2024-03-15T13:55:10Z",
    sessionId: "sess_vwx234",
  },
]

export default function TrackingPage() {
  const [events, setEvents] = useState(sampleEvents)
  const [currentTime, setCurrentTime] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString())
  }, [refreshKey])

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1)
  }

  const handleClear = () => {
    if (confirm("Are you sure you want to clear all tracking events?")) {
      setEvents([])
    }
  }

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case "add_to_cart":
        return ShoppingCart
      case "product_click":
        return MousePointerClick
      case "add_to_wishlist":
        return Heart
      case "product_view":
        return Eye
      case "purchase":
        return DollarSign
      default:
        return Package
    }
  }

  const getEventColor = (eventType: string) => {
    switch (eventType) {
      case "add_to_cart":
        return "bg-green-100 text-green-700 border-green-200"
      case "product_click":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "add_to_wishlist":
        return "bg-red-100 text-red-700 border-red-200"
      case "product_view":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "purchase":
        return "bg-orange-100 text-orange-700 border-orange-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const eventStats = {
    total: events.length,
    cart: events.filter((e) => e.event === "add_to_cart").length,
    views: events.filter((e) => e.event === "product_view").length,
    wishlist: events.filter((e) => e.event === "add_to_wishlist").length,
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader title="Tracking" subtitle="Monitor user interactions and events" />

        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Tracking Events</h1>
                <p className="text-sm text-gray-500">Monitor user interactions in real-time</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={handleClear}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">Total Events</p>
                <p className="text-3xl font-bold text-gray-900">{eventStats.total}</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">Add to Cart</p>
                <p className="text-3xl font-bold text-green-600">{eventStats.cart}</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">Product Views</p>
                <p className="text-3xl font-bold text-purple-600">{eventStats.views}</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">Wishlist</p>
                <p className="text-3xl font-bold text-red-600">{eventStats.wishlist}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Event Log</CardTitle>
            </CardHeader>
            <CardContent>
              {events.length === 0 ? (
                <div className="text-center py-12">
                  <Eye className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No tracking events yet</h3>
                  <p className="text-gray-500">
                    Start interacting with products to see tracking events here
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {[...events].reverse().map((event) => {
                    const Icon = getEventIcon(event.event)
                    return (
                      <div
                        key={event.id}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${getEventColor(event.event)}`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getEventColor(event.event)}`}>
                                  {event.event.replace(/_/g, " ").toUpperCase()}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {new Date(event.timestamp).toLocaleString()}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                                <div>
                                  <span className="font-medium text-gray-700">Product:</span>
                                  <span className="ml-2 text-gray-900">{event.productName}</span>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-700">ID:</span>
                                  <span className="ml-2 text-gray-900">#{event.productId}</span>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-700">Category:</span>
                                  <span className="ml-2 text-gray-900">{event.category}</span>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-700">Price:</span>
                                  <span className="ml-2 text-gray-900">${event.price}</span>
                                </div>
                                {event.sessionId && (
                                  <div className="md:col-span-2">
                                    <span className="font-medium text-gray-700">Session:</span>
                                    <span className="ml-2 text-gray-500 text-xs font-mono">{event.sessionId}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
