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
  Eye, 
  X, 
  RefreshCw,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Calendar,
  ArrowUpDown
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const orders = [
  {
    id: "ORD-7829",
    customer: "John Smith",
    customerEmail: "john.smith@email.com",
    seller: "TechZone",
    products: [
      { name: "iPhone 15 Pro Case", quantity: 2, price: "$45.00" },
      { name: "Screen Protector", quantity: 1, price: "$15.00" }
    ],
    total: "$105.00",
    status: "delivered",
    paymentMethod: "Credit Card",
    shippingAddress: "123 Main St, New York, NY 10001",
    orderDate: "2024-03-15",
    deliveryDate: "2024-03-18",
    timeline: [
      { status: "Order Placed", date: "2024-03-15 10:30", completed: true },
      { status: "Payment Confirmed", date: "2024-03-15 10:35", completed: true },
      { status: "Processing", date: "2024-03-16 09:00", completed: true },
      { status: "Shipped", date: "2024-03-17 14:00", completed: true },
      { status: "Delivered", date: "2024-03-18 11:00", completed: true }
    ]
  },
  {
    id: "ORD-7828",
    customer: "Sarah Johnson",
    customerEmail: "sarah.j@email.com",
    seller: "Fashion Hub",
    products: [
      { name: "Summer Dress", quantity: 1, price: "$89.00" },
      { name: "Sandals", quantity: 1, price: "$49.00" }
    ],
    total: "$138.00",
    status: "processing",
    paymentMethod: "Paystack",
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90001",
    orderDate: "2024-03-15",
    deliveryDate: null,
    timeline: [
      { status: "Order Placed", date: "2024-03-15 14:20", completed: true },
      { status: "Payment Confirmed", date: "2024-03-15 14:25", completed: true },
      { status: "Processing", date: "2024-03-16 10:00", completed: true },
      { status: "Shipped", date: null, completed: false },
      { status: "Delivered", date: null, completed: false }
    ]
  },
  {
    id: "ORD-7827",
    customer: "Mike Brown",
    customerEmail: "mike.brown@email.com",
    seller: "Home Essentials",
    products: [
      { name: "Coffee Maker", quantity: 1, price: "$129.00" }
    ],
    total: "$129.00",
    status: "shipped",
    paymentMethod: "Credit Card",
    shippingAddress: "789 Pine St, Chicago, IL 60601",
    orderDate: "2024-03-14",
    deliveryDate: null,
    timeline: [
      { status: "Order Placed", date: "2024-03-14 09:15", completed: true },
      { status: "Payment Confirmed", date: "2024-03-14 09:20", completed: true },
      { status: "Processing", date: "2024-03-14 16:00", completed: true },
      { status: "Shipped", date: "2024-03-15 10:00", completed: true },
      { status: "Delivered", date: null, completed: false }
    ]
  },
  {
    id: "ORD-7826",
    customer: "Emily Davis",
    customerEmail: "emily.d@email.com",
    seller: "Gadget World",
    products: [
      { name: "Wireless Earbuds Pro", quantity: 1, price: "$199.00" },
      { name: "Charging Case", quantity: 1, price: "$49.00" }
    ],
    total: "$248.00",
    status: "pending",
    paymentMethod: "Debit Card",
    shippingAddress: "321 Elm St, Houston, TX 77001",
    orderDate: "2024-03-15",
    deliveryDate: null,
    timeline: [
      { status: "Order Placed", date: "2024-03-15 16:45", completed: true },
      { status: "Payment Confirmed", date: null, completed: false },
      { status: "Processing", date: null, completed: false },
      { status: "Shipped", date: null, completed: false },
      { status: "Delivered", date: null, completed: false }
    ]
  },
  {
    id: "ORD-7825",
    customer: "David Wilson",
    customerEmail: "david.w@email.com",
    seller: "Beauty Store",
    products: [
      { name: "Anti-aging Cream", quantity: 2, price: "$35.00" }
    ],
    total: "$70.00",
    status: "cancelled",
    paymentMethod: "Credit Card",
    shippingAddress: "654 Maple Dr, Phoenix, AZ 85001",
    orderDate: "2024-03-13",
    deliveryDate: null,
    timeline: [
      { status: "Order Placed", date: "2024-03-13 11:00", completed: true },
      { status: "Payment Confirmed", date: "2024-03-13 11:05", completed: true },
      { status: "Cancelled", date: "2024-03-13 15:00", completed: true }
    ]
  },
  {
    id: "ORD-7824",
    customer: "Lisa Anderson",
    customerEmail: "lisa.a@email.com",
    seller: "TechZone",
    products: [
      { name: "Laptop Stand", quantity: 1, price: "$79.00" },
      { name: "USB Hub", quantity: 1, price: "$29.00" }
    ],
    total: "$108.00",
    status: "refunded",
    paymentMethod: "Paystack",
    shippingAddress: "987 Cedar Ln, San Diego, CA 92101",
    orderDate: "2024-03-10",
    deliveryDate: null,
    timeline: [
      { status: "Order Placed", date: "2024-03-10 13:30", completed: true },
      { status: "Payment Confirmed", date: "2024-03-10 13:35", completed: true },
      { status: "Shipped", date: "2024-03-12 09:00", completed: true },
      { status: "Refunded", date: "2024-03-14 10:00", completed: true }
    ]
  }
]

const statusConfig: Record<string, { color: string; icon: any }> = {
  pending: { color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: Clock },
  processing: { color: "bg-blue-100 text-blue-700 border-blue-200", icon: Package },
  shipped: { color: "bg-purple-100 text-purple-700 border-purple-200", icon: Truck },
  delivered: { color: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle },
  cancelled: { color: "bg-red-100 text-red-700 border-red-200", icon: XCircle },
  refunded: { color: "bg-gray-100 text-gray-700 border-gray-200", icon: RefreshCw },
}

const filterOptions = {
  status: ["All Status", "Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Refunded"],
  seller: ["All Sellers", "TechZone", "Fashion Hub", "Home Essentials", "Gadget World", "Beauty Store"],
  date: ["All Time", "Today", "Yesterday", "Last 7 Days", "Last 30 Days", "This Month", "Last Month"]
}

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [sellerFilter, setSellerFilter] = useState("All Sellers")
  const [dateFilter, setDateFilter] = useState("All Time")
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 12

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader title="Orders" subtitle="Manage all platform orders" />
        
        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">8,934</p>
                  </div>
                  <div className="p-2 rounded-lg bg-blue-100">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <p className="text-xs text-green-600 mt-2">+23.1% from last month</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Completed</p>
                    <p className="text-2xl font-bold text-green-600">7,845</p>
                  </div>
                  <div className="p-2 rounded-lg bg-green-100">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">87.8% completion rate</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Cancelled</p>
                    <p className="text-2xl font-bold text-red-600">286</p>
                  </div>
                  <div className="p-2 rounded-lg bg-red-100">
                    <XCircle className="h-5 w-5 text-red-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">3.2% cancellation rate</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Refunds</p>
                    <p className="text-2xl font-bold text-gray-600">142</p>
                  </div>
                  <div className="p-2 rounded-lg bg-gray-100">
                    <RefreshCw className="h-5 w-5 text-gray-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">1.6% refund rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="border-0 shadow-sm mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search by order ID, customer name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <select 
                    className="h-10 px-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    {filterOptions.status.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  <select 
                    className="h-10 px-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    value={sellerFilter}
                    onChange={(e) => setSellerFilter(e.target.value)}
                  >
                    {filterOptions.seller.map((seller) => (
                      <option key={seller} value={seller}>{seller}</option>
                    ))}
                  </select>
                  <select 
                    className="h-10 px-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  >
                    {filterOptions.date.map((date) => (
                      <option key={date} value={date}>{date}</option>
                    ))}
                  </select>
                  <Button variant="outline" className="h-10">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                  <Button className="h-10 bg-orange-500 hover:bg-orange-600">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Orders Table */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold">All Orders</CardTitle>
              <p className="text-sm text-gray-500">Showing 1-10 of 8,934 orders</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3 pl-4">
                        <button className="flex items-center gap-1 hover:text-gray-700">
                          Order ID <ArrowUpDown className="h-3 w-3" />
                        </button>
                      </th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Customer</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Seller</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Products</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Total</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Status</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Date</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {orders.map((order) => {
                      const StatusIcon = statusConfig[order.status]?.icon || Clock
                      return (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="py-4 pl-4">
                            <button 
                              onClick={() => setSelectedOrder(order)}
                              className="text-sm font-medium text-orange-600 hover:text-orange-700"
                            >
                              {order.id}
                            </button>
                          </td>
                          <td className="py-4">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                              <p className="text-xs text-gray-500">{order.customerEmail}</p>
                            </div>
                          </td>
                          <td className="py-4 text-sm text-gray-600">{order.seller}</td>
                          <td className="py-4 text-sm text-gray-600">
                            {order.products.length} item(s)
                          </td>
                          <td className="py-4 text-sm font-semibold text-gray-900">{order.total}</td>
                          <td className="py-4">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig[order.status]?.color}`}>
                              <StatusIcon className="h-3 w-3" />
                              {order.status}
                            </span>
                          </td>
                          <td className="py-4 text-sm text-gray-500">{order.orderDate}</td>
                          <td className="py-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setSelectedOrder(order)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download Invoice
                                </DropdownMenuItem>
                                {order.status === "pending" && (
                                  <DropdownMenuItem className="text-red-600">
                                    <X className="h-4 w-4 mr-2" />
                                    Cancel Order
                                  </DropdownMenuItem>
                                )}
                                {(order.status === "shipped" || order.status === "delivered") && (
                                  <DropdownMenuItem>
                                    <RefreshCw className="h-4 w-4 mr-2" />
                                    Process Refund
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {[1, 2, 3, 4, 5].map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      className={currentPage === page ? "bg-orange-500 hover:bg-orange-600" : ""}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl">
              {/* Modal Header */}
              <div className="sticky top-0 flex items-center justify-between p-6 border-b bg-white rounded-t-xl">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
                  <p className="text-sm text-gray-500">{selectedOrder.id}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(null)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Status & Timeline */}
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Order Timeline</h3>
                    <div className="space-y-3">
                      {selectedOrder.timeline.map((event, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className={`mt-0.5 h-2 w-2 rounded-full ${event.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                          <div>
                            <p className={`text-sm font-medium ${event.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                              {event.status}
                            </p>
                            {event.date && (
                              <p className="text-xs text-gray-500">{event.date}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    {/* Order Info */}
                    <div className="p-4 rounded-lg bg-gray-50">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">Order Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Status</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${statusConfig[selectedOrder.status]?.color}`}>
                            {selectedOrder.status}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Order Date</span>
                          <span className="text-gray-900">{selectedOrder.orderDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Payment Method</span>
                          <span className="text-gray-900">{selectedOrder.paymentMethod}</span>
                        </div>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="p-4 rounded-lg bg-gray-50">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">Customer</h3>
                      <div className="space-y-2 text-sm">
                        <p className="font-medium text-gray-900">{selectedOrder.customer}</p>
                        <p className="text-gray-500">{selectedOrder.customerEmail}</p>
                      </div>
                    </div>

                    {/* Shipping */}
                    <div className="p-4 rounded-lg bg-gray-50">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">Shipping Address</h3>
                      <p className="text-sm text-gray-600">{selectedOrder.shippingAddress}</p>
                    </div>
                  </div>
                </div>

                {/* Products */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Ordered Products</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left text-xs font-medium text-gray-500 px-4 py-2">Product</th>
                          <th className="text-left text-xs font-medium text-gray-500 px-4 py-2">Qty</th>
                          <th className="text-left text-xs font-medium text-gray-500 px-4 py-2">Price</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {selectedOrder.products.map((product, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3 text-sm text-gray-900">{product.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{product.quantity}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{product.price}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50">
                        <tr>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-900">Total</td>
                          <td className="px-4 py-3"></td>
                          <td className="px-4 py-3 text-sm font-bold text-orange-600">{selectedOrder.total}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  {selectedOrder.status === "pending" && (
                    <Button variant="destructive" className="bg-red-500 hover:bg-red-600">
                      <X className="h-4 w-4 mr-2" />
                      Cancel Order
                    </Button>
                  )}
                  {(selectedOrder.status === "shipped" || selectedOrder.status === "delivered") && (
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Process Refund
                    </Button>
                  )}
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Invoice
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
