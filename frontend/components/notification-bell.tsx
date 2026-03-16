"use client"

import { useState } from "react"
import { Bell, X, Check, Package, Truck, CreditCard, Heart, Tag, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface Notification {
  id: string
  type: "order" | "payment" | "delivery" | "wishlist" | "promotion" | "general"
  title: string
  message: string
  time: string
  read: boolean
  link?: string
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "Order Confirmed",
    message: "Your order #ORD-12345 has been confirmed and is being processed.",
    time: "2 minutes ago",
    read: false,
    link: "/my-orders",
  },
  {
    id: "2",
    type: "delivery",
    title: "Shipped",
    message: "Your order #ORD-12344 has been shipped and is on its way.",
    time: "1 hour ago",
    read: false,
    link: "/my-orders",
  },
  {
    id: "3",
    type: "payment",
    title: "Payment Successful",
    message: "Payment of GH₵ 299.00 for order #ORD-12343 was successful.",
    time: "3 hours ago",
    read: true,
    link: "/my-orders",
  },
  {
    id: "4",
    type: "wishlist",
    title: "Price Drop Alert",
    message: "Oraimo FreePods 3 price has dropped by 15%!",
    time: "5 hours ago",
    read: true,
    link: "/wishlist",
  },
  {
    id: "5",
    type: "promotion",
    title: "Flash Sale",
    message: "Up to 60% off on electronics! Limited time offer.",
    time: "1 day ago",
    read: true,
    link: "/flash-sales",
  },
  {
    id: "6",
    type: "delivery",
    title: "Delivered",
    message: "Your order #ORD-12340 has been delivered successfully.",
    time: "2 days ago",
    read: true,
    link: "/my-orders",
  },
]

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "order":
        return <Package className="h-4 w-4 text-blue-500" />
      case "delivery":
        return <Truck className="h-4 w-4 text-green-500" />
      case "payment":
        return <CreditCard className="h-4 w-4 text-purple-500" />
      case "wishlist":
        return <Heart className="h-4 w-4 text-red-500" />
      case "promotion":
        return <Tag className="h-4 w-4 text-orange-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "order":
        return "bg-blue-50"
      case "delivery":
        return "bg-green-50"
      case "payment":
        return "bg-purple-50"
      case "wishlist":
        return "bg-red-50"
      case "promotion":
        return "bg-orange-50"
      default:
        return "bg-gray-50"
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5 text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Notification Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-xl border z-50 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="bg-red-500">
                    {unreadCount} new
                  </Badge>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-orange-500 hover:underline"
                >
                  Mark all as read
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b hover:bg-gray-50 transition-colors ${
                      !notification.read ? "bg-blue-50/50" : ""
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex gap-3">
                      <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-medium text-sm text-gray-900">
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        {notification.link && (
                          <Link
                            href={notification.link}
                            className="text-sm text-orange-500 hover:underline mt-1 inline-block"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View Details
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t bg-gray-50">
              <Link href="/notifications" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full">
                  View All Notifications
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
