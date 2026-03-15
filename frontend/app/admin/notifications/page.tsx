"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Bell,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  Settings,
  Trash2,
  Check,
  Send,
  Filter,
  Search
} from "lucide-react"

const notifications = [
  {
    id: 1,
    type: "warning",
    title: "Large Refund Request",
    message: "A refund request of $459.00 has been submitted for order #ORD-7829",
    time: "2 min ago",
    read: false,
    icon: DollarSign,
  },
  {
    id: 2,
    type: "info",
    title: "New Seller Registration",
    message: "Gadget World has applied to become a seller on the platform",
    time: "15 min ago",
    read: false,
    icon: Users,
  },
  {
    id: 3,
    type: "error",
    title: "Low Stock Alert",
    message: "5 products are running low on stock and need attention",
    time: "1 hour ago",
    read: false,
    icon: Package,
  },
  {
    id: 4,
    type: "success",
    title: "Order Delivered",
    message: "Order #ORD-7654 has been successfully delivered",
    time: "2 hours ago",
    read: true,
    icon: ShoppingCart,
  },
  {
    id: 5,
    type: "warning",
    title: "Suspicious Activity",
    message: "Unusual login pattern detected from IP 192.168.1.105",
    time: "3 hours ago",
    read: true,
    icon: AlertTriangle,
  },
  {
    id: 6,
    type: "info",
    title: "New Product Submitted",
    message: "TechZone submitted 3 new products for review",
    time: "4 hours ago",
    read: true,
    icon: Package,
  },
  {
    id: 7,
    type: "success",
    title: "Payment Received",
    message: "Payment of $1,245.00 received for order #ORD-7800",
    time: "5 hours ago",
    read: true,
    icon: DollarSign,
  },
  {
    id: 8,
    type: "info",
    title: "System Update",
    message: "Platform maintenance scheduled for Sunday 2:00 AM - 4:00 AM",
    time: "6 hours ago",
    read: true,
    icon: Settings,
  },
]

const typeColors: Record<string, string> = {
  success: "bg-green-100 text-green-600 border-green-200",
  error: "bg-red-100 text-red-600 border-red-200",
  warning: "bg-yellow-100 text-yellow-600 border-yellow-200",
  info: "bg-blue-100 text-blue-600 border-blue-200",
}

const typeIcons: Record<string, any> = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
}

export default function NotificationsPage() {
  const [filter, setFilter] = useState("all")
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([])

  const unreadCount = notifications.filter(n => !n.read).length

  const filteredNotifications = filter === "all" 
    ? notifications 
    : filter === "unread" 
      ? notifications.filter(n => !n.read)
      : notifications.filter(n => n.type === filter)

  const toggleSelect = (id: number) => {
    setSelectedNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(n => n !== id)
        : [...prev, id]
    )
  }

  const markAllAsRead = () => {
    // In a real app, this would update the backend
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader title="Notifications" subtitle="System alerts and announcements" />
        
        <main className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-blue-100">
                    <Bell className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Unread</p>
                    <p className="text-2xl font-bold text-orange-600">{unreadCount}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-orange-100">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Warnings</p>
                    <p className="text-2xl font-bold text-yellow-600">2</p>
                  </div>
                  <div className="p-2 rounded-lg bg-yellow-100">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Errors</p>
                    <p className="text-2xl font-bold text-red-600">1</p>
                  </div>
                  <div className="p-2 rounded-lg bg-red-100">
                    <XCircle className="h-5 w-5 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              <Button variant={filter === "all" ? "default" : "outline"} size="sm" className={filter === "all" ? "bg-orange-500" : ""} onClick={() => setFilter("all")}>All</Button>
              <Button variant={filter === "unread" ? "default" : "outline"} size="sm" className={filter === "unread" ? "bg-orange-500" : ""} onClick={() => setFilter("unread")}>Unread</Button>
              <Button variant={filter === "warning" ? "default" : "outline"} size="sm" className={filter === "warning" ? "bg-orange-500" : ""} onClick={() => setFilter("warning")}>Warnings</Button>
              <Button variant={filter === "error" ? "default" : "outline"} size="sm" className={filter === "error" ? "bg-orange-500" : ""} onClick={() => setFilter("error")}>Errors</Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={markAllAsRead}>
                <Check className="h-4 w-4 mr-2" />
                Mark All as Read
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Send className="h-4 w-4 mr-2" />
                Send Announcement
              </Button>
            </div>
          </div>

          {/* Notifications List */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredNotifications.map((notification) => {
                  const Icon = typeIcons[notification.type] || Bell
                  return (
                    <div 
                      key={notification.id} 
                      className={`p-4 flex items-start gap-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-orange-50/50' : ''}`}
                    >
                      <div className={`p-2 rounded-lg border ${typeColors[notification.type]}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900">{notification.title}</h3>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-orange-500 rounded-full" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
