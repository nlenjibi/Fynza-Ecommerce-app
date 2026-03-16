"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Search,
  Filter,
  Download,
  User,
  Package,
  ShoppingCart,
  Store,
  Settings,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  Plus,
  LogIn,
  Clock,
  ChevronLeft,
  ChevronRight,
  Eye
} from "lucide-react"

const activities = [
  {
    id: 1,
    admin: "Admin User",
    action: "Product Deleted",
    details: "Deleted product 'iPhone 15 Case' (PROD-001)",
    resource: "Products",
    ip: "192.168.1.100",
    timestamp: "2024-03-15 14:30:25",
  },
  {
    id: 2,
    admin: "Admin User",
    action: "Seller Suspended",
    details: "Suspended seller 'Gadget World' for policy violation",
    resource: "Sellers",
    ip: "192.168.1.100",
    timestamp: "2024-03-15 12:15:10",
  },
  {
    id: 3,
    admin: "Super Admin",
    action: "Refund Approved",
    details: "Approved refund REF-002 for order ORD-7654",
    resource: "Refunds",
    ip: "192.168.1.101",
    timestamp: "2024-03-15 10:45:33",
  },
  {
    id: 4,
    admin: "Admin User",
    action: "Category Created",
    details: "Created new category 'Smart Home Devices'",
    resource: "Categories",
    ip: "192.168.1.100",
    timestamp: "2024-03-14 16:20:45",
  },
  {
    id: 5,
    admin: "Super Admin",
    action: "Order Cancelled",
    details: "Cancelled order ORD-7825 due to customer request",
    resource: "Orders",
    ip: "192.168.1.101",
    timestamp: "2024-03-14 14:10:22",
  },
  {
    id: 6,
    admin: "Admin User",
    action: "Promotion Created",
    details: "Created new promotion 'Weekend Flash Sale'",
    resource: "Promotions",
    ip: "192.168.1.100",
    timestamp: "2024-03-14 11:30:15",
  },
  {
    id: 7,
    admin: "Admin User",
    action: "Product Approved",
    details: "Approved product 'Wireless Gaming Mouse' (PROD-005)",
    resource: "Products",
    ip: "192.168.1.100",
    timestamp: "2024-03-13 15:45:50",
  },
  {
    id: 8,
    admin: "Super Admin",
    action: "Settings Updated",
    details: "Updated payment gateway settings",
    resource: "Settings",
    ip: "192.168.1.101",
    timestamp: "2024-03-13 09:20:35",
  },
  {
    id: 9,
    admin: "Admin User",
    action: "Seller Approved",
    details: "Approved new seller 'Gadget World' application",
    resource: "Sellers",
    ip: "192.168.1.100",
    timestamp: "2024-03-12 14:55:18",
  },
  {
    id: 10,
    admin: "Super Admin",
    action: "Login",
    details: "Admin logged in successfully",
    resource: "Authentication",
    ip: "192.168.1.101",
    timestamp: "2024-03-12 08:00:05",
  },
]

const actionIcons: Record<string, any> = {
  "Product Deleted": Trash2,
  "Product Approved": CheckCircle,
  "Seller Suspended": XCircle,
  "Seller Approved": CheckCircle,
  "Refund Approved": CheckCircle,
  "Category Created": Plus,
  "Order Cancelled": XCircle,
  "Promotion Created": Plus,
  "Settings Updated": Settings,
  "Login": LogIn,
}

const actionColors: Record<string, string> = {
  "Product Deleted": "text-red-600 bg-red-100",
  "Product Approved": "text-green-600 bg-green-100",
  "Seller Suspended": "text-red-600 bg-red-100",
  "Seller Approved": "text-green-600 bg-green-100",
  "Refund Approved": "text-green-600 bg-green-100",
  "Category Created": "text-blue-600 bg-blue-100",
  "Order Cancelled": "text-red-600 bg-red-100",
  "Promotion Created": "text-purple-600 bg-purple-100",
  "Settings Updated": "text-orange-600 bg-orange-100",
  "Login": "text-gray-600 bg-gray-100",
}

export default function ActivityLogsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [actionFilter, setActionFilter] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 12

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader title="Activity Logs" subtitle="Track all admin actions and system events" />
        
        <main className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Activities</p>
                    <p className="text-2xl font-bold text-gray-900">12,456</p>
                  </div>
                  <div className="p-2 rounded-lg bg-blue-100">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Today</p>
                    <p className="text-2xl font-bold text-gray-900">45</p>
                  </div>
                  <div className="p-2 rounded-lg bg-green-100">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">This Week</p>
                    <p className="text-2xl font-bold text-gray-900">312</p>
                  </div>
                  <div className="p-2 rounded-lg bg-purple-100">
                    <Clock className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Admins Active</p>
                    <p className="text-2xl font-bold text-orange-600">5</p>
                  </div>
                  <div className="p-2 rounded-lg bg-orange-100">
                    <User className="h-5 w-5 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="border-0 shadow-sm mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search activities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <select 
                    className="h-10 px-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                    value={actionFilter}
                    onChange={(e) => setActionFilter(e.target.value)}
                  >
                    <option value="All">All Actions</option>
                    <option value="Product Deleted">Product Deleted</option>
                    <option value="Seller Suspended">Seller Suspended</option>
                    <option value="Refund Approved">Refund Approved</option>
                    <option value="Order Cancelled">Order Cancelled</option>
                    <option value="Settings Updated">Settings Updated</option>
                  </select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Logs */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold">Activity Log</CardTitle>
              <p className="text-sm text-gray-500">Showing 1-10 of 12,456 entries</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activities.map((activity) => {
                  const Icon = actionIcons[activity.action] || Clock
                  const colorClass = actionColors[activity.action] || "text-gray-600 bg-gray-100"
                  
                  return (
                    <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                      <div className={`p-2 rounded-lg ${colorClass}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">{activity.action}</span>
                          <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                            {activity.resource}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{activity.details}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {activity.admin}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {activity.timestamp}
                          </span>
                          <span>IP: {activity.ip}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">Page {currentPage} of {totalPages}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {[1, 2, 3, 4, 5].map((page) => (
                    <Button key={page} variant={currentPage === page ? "default" : "outline"} size="sm" className={currentPage === page ? "bg-orange-500 hover:bg-orange-600" : ""} onClick={() => setCurrentPage(page)}>
                      {page}
                    </Button>
                  ))}
                  <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
