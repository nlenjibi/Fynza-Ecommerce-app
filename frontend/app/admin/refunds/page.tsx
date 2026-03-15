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
  MoreVertical,
  Eye,
  CheckCircle,
  XCircle,
  RefreshCw,
  DollarSign,
  AlertTriangle,
  Calendar,
  User,
  Store,
  ChevronLeft,
  ChevronRight,
  MessageSquare
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const refunds = [
  {
    id: "REF-001",
    orderId: "ORD-7829",
    customer: { name: "John Smith", email: "john.smith@email.com" },
    seller: "TechZone",
    amount: "$105.00",
    reason: "Product damaged during shipping",
    status: "pending",
    requestedDate: "2024-03-15",
    items: [
      { name: "iPhone 15 Pro Case", quantity: 2, price: "$45.00" },
      { name: "Screen Protector", quantity: 1, price: "$15.00" }
    ]
  },
  {
    id: "REF-002",
    orderId: "ORD-7654",
    customer: { name: "Sarah Johnson", email: "sarah.j@email.com" },
    seller: "Fashion Hub",
    amount: "$89.00",
    reason: "Wrong size received",
    status: "approved",
    requestedDate: "2024-03-14",
    resolvedDate: "2024-03-15",
    items: [
      { name: "Summer Dress", quantity: 1, price: "$89.00" }
    ]
  },
  {
    id: "REF-003",
    orderId: "ORD-7412",
    customer: { name: "Mike Brown", email: "mike.brown@email.com" },
    seller: "Home Essentials",
    amount: "$129.00",
    reason: "Product not as described",
    status: "rejected",
    requestedDate: "2024-03-12",
    resolvedDate: "2024-03-13",
    rejectionReason: "Product was delivered as described",
    items: [
      { name: "Coffee Maker", quantity: 1, price: "$129.00" }
    ]
  },
  {
    id: "REF-004",
    orderId: "ORD-7234",
    customer: { name: "Emily Davis", email: "emily.d@email.com" },
    seller: "Gadget World",
    amount: "$248.00",
    reason: "Item arrived defective",
    status: "pending",
    requestedDate: "2024-03-15",
    items: [
      { name: "Wireless Earbuds Pro", quantity: 1, price: "$199.00" },
      { name: "Charging Case", quantity: 1, price: "$49.00" }
    ]
  },
  {
    id: "REF-005",
    orderId: "ORD-7100",
    customer: { name: "David Wilson", email: "david.w@email.com" },
    seller: "Beauty Store",
    amount: "$70.00",
    reason: "Changed mind",
    status: "completed",
    requestedDate: "2024-03-10",
    resolvedDate: "2024-03-12",
    items: [
      { name: "Anti-aging Cream", quantity: 2, price: "$35.00" }
    ]
  },
]

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  approved: "bg-blue-100 text-blue-700 border-blue-200",
  rejected: "bg-red-100 text-red-700 border-red-200",
  completed: "bg-green-100 text-green-700 border-green-200",
}

export default function RefundsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRefund, setSelectedRefund] = useState<typeof refunds[0] | null>(null)
  const totalPages = 8

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader title="Refunds" subtitle="Manage refund requests" />
        
        <main className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Refunds</p>
                    <p className="text-2xl font-bold text-gray-900">142</p>
                  </div>
                  <div className="p-2 rounded-lg bg-gray-100">
                    <RefreshCw className="h-5 w-5 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">24</p>
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
                    <p className="text-sm text-gray-500">Approved</p>
                    <p className="text-2xl font-bold text-blue-600">67</p>
                  </div>
                  <div className="p-2 rounded-lg bg-blue-100">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Rejected</p>
                    <p className="text-2xl font-bold text-red-600">18</p>
                  </div>
                  <div className="p-2 rounded-lg bg-red-100">
                    <XCircle className="h-5 w-5 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="text-2xl font-bold text-orange-600">$18.4K</p>
                  </div>
                  <div className="p-2 rounded-lg bg-orange-100">
                    <DollarSign className="h-5 w-5 text-orange-600" />
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
                    placeholder="Search by order ID, customer..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <select 
                    className="h-10 px-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="All">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="completed">Completed</option>
                  </select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Refunds Table */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold">Refund Requests</CardTitle>
              <p className="text-sm text-gray-500">Showing 1-10 of 142 refunds</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3 pl-4">Refund ID</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Order ID</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Customer</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Seller</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Amount</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Reason</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Status</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Date</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {refunds.map((refund) => (
                      <tr key={refund.id} className="hover:bg-gray-50">
                        <td className="py-4 pl-4 text-sm font-medium text-orange-600">{refund.id}</td>
                        <td className="py-4 text-sm text-gray-900">{refund.orderId}</td>
                        <td className="py-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{refund.customer.name}</p>
                            <p className="text-xs text-gray-500">{refund.customer.email}</p>
                          </div>
                        </td>
                        <td className="py-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Store className="h-3 w-3" />
                            {refund.seller}
                          </div>
                        </td>
                        <td className="py-4 text-sm font-semibold text-gray-900">{refund.amount}</td>
                        <td className="py-4 text-sm text-gray-600 max-w-xs truncate">{refund.reason}</td>
                        <td className="py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[refund.status]}`}>
                            {refund.status}
                          </span>
                        </td>
                        <td className="py-4 text-sm text-gray-500">{refund.requestedDate}</td>
                        <td className="py-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedRefund(refund)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              {refund.status === "pending" && (
                                <>
                                  <DropdownMenuItem className="text-green-600">
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Reject
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

        {/* Refund Details Modal */}
        {selectedRefund && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl">
              <div className="sticky top-0 flex items-center justify-between p-6 border-b bg-white rounded-t-xl">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Refund Details</h2>
                  <p className="text-sm text-gray-500">{selectedRefund.id}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedRefund(null)}>
                  ×
                </Button>
              </div>

              <div className="p-6 space-y-6">
                {/* Status */}
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusColors[selectedRefund.status]}`}>
                    {selectedRefund.status}
                  </span>
                  <span className="text-sm text-gray-500">{selectedRefund.amount}</span>
                </div>

                {/* Order & Customer */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <User className="h-4 w-4" />
                      <span className="text-xs">Customer</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{selectedRefund.customer.name}</p>
                    <p className="text-xs text-gray-500">{selectedRefund.customer.email}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <Store className="h-4 w-4" />
                      <span className="text-xs">Seller</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{selectedRefund.seller}</p>
                  </div>
                </div>

                {/* Reason */}
                <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-100">
                  <div className="flex items-center gap-2 text-yellow-700 mb-1">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm font-medium">Reason for Refund</span>
                  </div>
                  <p className="text-sm text-gray-900">{selectedRefund.reason}</p>
                </div>

                {/* Items */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Items</h3>
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
                        {selectedRefund.items.map((item, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{item.quantity}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Actions */}
                {selectedRefund.status === "pending" && (
                  <div className="flex gap-3 pt-4 border-t">
                    <Button className="bg-green-500 hover:bg-green-600 flex-1">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve Refund
                    </Button>
                    <Button variant="destructive" className="bg-red-500 hover:bg-red-600 flex-1">
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject Refund
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
