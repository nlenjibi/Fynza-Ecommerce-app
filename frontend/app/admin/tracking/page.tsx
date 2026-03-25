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
import { trackingService, TrackingEvent as LocalTrackingEvent, TrackingEventType } from "@/lib/services/tracking"

export default function TrackingPage() {
  const [events, setEvents] = useState<LocalTrackingEvent[]>([])
  const [currentTime, setCurrentTime] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    const storedEvents = trackingService.getEvents()
    setEvents(storedEvents)
    setCurrentTime(new Date().toLocaleTimeString())
  }, [refreshKey])

  const handleRefresh = () => {
    const storedEvents = trackingService.getEvents()
    setEvents(storedEvents)
    setRefreshKey((prev) => prev + 1)
  }

  const handleClear = () => {
    if (confirm("Are you sure you want to clear all tracking events?")) {
      trackingService.clearEvents()
      setEvents([])
    }
  }

  const getEventIcon = (eventType: TrackingEventType) => {
    switch (eventType) {
      case "ADD_TO_CART":
        return ShoppingCart
      case "PRODUCT_CLICK":
        return MousePointerClick
      case "ADD_TO_WISHLIST":
        return Heart
      case "PRODUCT_VIEW":
        return Eye
      case "PURCHASE":
        return DollarSign
      default:
        return Package
    }
  }

  const getEventColor = (eventType: TrackingEventType) => {
    switch (eventType) {
      case "ADD_TO_CART":
        return "bg-green-100 text-green-700 border-green-200"
      case "PRODUCT_CLICK":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "ADD_TO_WISHLIST":
        return "bg-red-100 text-red-700 border-red-200"
      case "PRODUCT_VIEW":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "PURCHASE":
        return "bg-orange-100 text-orange-700 border-orange-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const eventStats = {
    total: events.length,
    cart: events.filter((e) => e.eventType === "ADD_TO_CART").length,
    views: events.filter((e) => e.eventType === "PRODUCT_VIEW").length,
    wishlist: events.filter((e) => e.eventType === "ADD_TO_WISHLIST").length,
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
                    const Icon = getEventIcon(event.eventType)
                    return (
                      <div
                        key={event.id}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${getEventColor(event.eventType)}`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getEventColor(event.eventType)}`}>
                                  {event.eventType.replace(/_/g, " ")}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {new Date(event.timestamp).toLocaleString()}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                                <div>
                                  <span className="font-medium text-gray-700">Product:</span>
                                  <span className="ml-2 text-gray-900">{event.productName || '-'}</span>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-700">ID:</span>
                                  <span className="ml-2 text-gray-900">#{event.productId || '-'}</span>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-700">Category:</span>
                                  <span className="ml-2 text-gray-900">{event.category || '-'}</span>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-700">Price:</span>
                                  <span className="ml-2 text-gray-900">{event.price ? `$${event.price}` : '-'}</span>
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
