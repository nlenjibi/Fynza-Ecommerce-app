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
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Zap,
  Clock,
  DollarSign,
  Package,
  Calendar,
  Image,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const flashSales = [
  {
    id: "FS-001",
    name: "Weekend Flash Sale",
    discount: "50%",
    minPurchase: "$30",
    maxDiscount: "$100",
    startDate: "2024-03-20",
    endDate: "2024-03-22",
    products: 25,
    status: "scheduled",
    orders: 0,
    revenue: "$0",
    banner: "/flash-sale-banner.jpg",
  },
  {
    id: "FS-002",
    name: "Tech Tuesday",
    discount: "30%",
    minPurchase: "$50",
    maxDiscount: "$75",
    startDate: "2024-03-15",
    endDate: "2024-03-15",
    products: 15,
    status: "active",
    orders: 234,
    revenue: "$12,450",
    banner: "/tech-tuesday.jpg",
  },
  {
    id: "FS-003",
    name: "Clearance Week",
    discount: "70%",
    minPurchase: "$20",
    maxDiscount: "$150",
    startDate: "2024-03-10",
    endDate: "2024-03-17",
    products: 50,
    status: "expired",
    orders: 567,
    revenue: "$34,200",
    banner: "/clearance.jpg",
  },
]

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700 border-green-200",
  scheduled: "bg-blue-100 text-blue-700 border-blue-200",
  expired: "bg-gray-100 text-gray-700 border-gray-200",
}

export default function FlashSalesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 5

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader title="Flash Sales" subtitle="Manage time-limited promotional campaigns" />
        
        <main className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Flash Sales</p>
                    <p className="text-2xl font-bold text-gray-900">24</p>
                  </div>
                  <div className="p-2 rounded-lg bg-purple-100">
                    <Zap className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Active Now</p>
                    <p className="text-2xl font-bold text-green-600">2</p>
                  </div>
                  <div className="p-2 rounded-lg bg-green-100">
                    <Clock className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Revenue</p>
                    <p className="text-2xl font-bold text-orange-600">$156K</p>
                  </div>
                  <div className="p-2 rounded-lg bg-orange-100">
                    <DollarSign className="h-5 w-5 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Products Featured</p>
                    <p className="text-2xl font-bold text-blue-600">345</p>
                  </div>
                  <div className="p-2 rounded-lg bg-blue-100">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Header Actions */}
          <div className="flex justify-between gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search flash sales..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Flash Sale
            </Button>
          </div>

          {/* Flash Sales Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashSales.map((sale) => (
              <Card key={sale.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  {/* Banner Placeholder */}
                  <div className="h-32 bg-gradient-to-r from-orange-500 to-purple-500 rounded-lg mb-4 flex items-center justify-center">
                    <Zap className="h-12 w-12 text-white" />
                  </div>

                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{sale.name}</h3>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[sale.status]}`}>
                      {sale.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-3xl font-bold text-orange-600">{sale.discount}</span>
                    <span className="text-sm text-gray-500">OFF</span>
                  </div>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Min Purchase</span>
                      <span className="font-medium">{sale.minPurchase || "None"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Max Discount</span>
                      <span className="font-medium">{sale.maxDiscount || "None"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Duration</span>
                      <span className="font-medium">{sale.startDate} - {sale.endDate}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-4 border-t">
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">{sale.products}</p>
                      <p className="text-xs text-gray-500">Products</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">{sale.orders}</p>
                      <p className="text-xs text-gray-500">Orders</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-green-600">{sale.revenue}</p>
                      <p className="text-xs text-gray-500">Revenue</p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-500">Showing 1-3 of 24 flash sales</p>
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
        </main>

        {/* Create Flash Sale Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold text-gray-900">Create Flash Sale</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowCreateModal(false)}>
                  ×
                </Button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Flash Sale Name</label>
                  <Input placeholder="e.g., Weekend Flash Sale" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                    <Input type="number" placeholder="e.g., 30" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Discount ($)</label>
                    <Input type="number" placeholder="e.g., 50" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Purchase ($)</label>
                  <Input type="number" placeholder="e.g., 30" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date & Time</label>
                    <Input type="datetime-local" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date & Time</label>
                    <Input type="datetime-local" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Banner Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Image className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setShowCreateModal(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                    Create Flash Sale
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
