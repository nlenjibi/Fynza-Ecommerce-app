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
  Ban,
  CheckCircle,
  Package,
  DollarSign,
  Star,
  Calendar,
  MapPin,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
  Building2,
  TrendingUp,
  X,
  Check
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const sellers = [
  {
    id: "SEL-001",
    name: "TechZone",
    email: "contact@techzone.com",
    phone: "+1 (555) 111-2222",
    location: "New York, NY",
    joinedDate: "2022-01-15",
    status: "active",
    approved: true,
    totalProducts: 234,
    totalOrders: 1245,
    revenue: "$125,400",
    rating: 4.9,
    pendingProducts: 5,
  },
  {
    id: "SEL-002",
    name: "Fashion Hub",
    email: "info@fashionhub.com",
    phone: "+1 (555) 222-3333",
    location: "Los Angeles, CA",
    joinedDate: "2022-03-22",
    status: "active",
    approved: true,
    totalProducts: 456,
    totalOrders: 987,
    revenue: "$98,700",
    rating: 4.8,
    pendingProducts: 12,
  },
  {
    id: "SEL-003",
    name: "Home Essentials",
    email: "support@homeessentials.com",
    phone: "+1 (555) 333-4444",
    location: "Chicago, IL",
    joinedDate: "2022-05-10",
    status: "active",
    approved: true,
    totalProducts: 189,
    totalOrders: 756,
    revenue: "$75,600",
    rating: 4.7,
    pendingProducts: 3,
  },
  {
    id: "SEL-004",
    name: "Gadget World",
    email: "sales@gadgetworld.com",
    phone: "+1 (555) 444-5555",
    location: "San Francisco, CA",
    joinedDate: "2022-07-08",
    status: "pending",
    approved: false,
    totalProducts: 0,
    totalOrders: 0,
    revenue: "$0",
    rating: 0,
    pendingProducts: 0,
  },
  {
    id: "SEL-005",
    name: "Beauty Store",
    email: "hello@beautystore.com",
    phone: "+1 (555) 555-6666",
    location: "Miami, FL",
    joinedDate: "2022-09-14",
    status: "suspended",
    approved: true,
    totalProducts: 278,
    totalOrders: 543,
    revenue: "$54,300",
    rating: 4.5,
    pendingProducts: 0,
  },
]

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700 border-green-200",
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  suspended: "bg-red-100 text-red-700 border-red-200",
}

export default function SellersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedSeller, setSelectedSeller] = useState<typeof sellers[0] | null>(null)
  const [showApprovalModal, setShowApprovalModal] = useState(false)
  const totalPages = 8

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader title="Sellers" subtitle="Manage marketplace sellers" />

        <main className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Sellers</p>
                    <p className="text-2xl font-bold text-gray-900">1,245</p>
                  </div>
                  <div className="p-2 rounded-lg bg-blue-100">
                    <Building2 className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Active</p>
                    <p className="text-2xl font-bold text-green-600">1,123</p>
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
                    <p className="text-sm text-gray-500">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">89</p>
                  </div>
                  <div className="p-2 rounded-lg bg-yellow-100">
                    <Calendar className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Suspended</p>
                    <p className="text-2xl font-bold text-red-600">33</p>
                  </div>
                  <div className="p-2 rounded-lg bg-red-100">
                    <Ban className="h-5 w-5 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Revenue</p>
                    <p className="text-2xl font-bold text-orange-600">$2.4M</p>
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
                    placeholder="Search sellers..."
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
                    <option value="active">Active</option>
                    <option value="pending">Pending Approval</option>
                    <option value="suspended">Suspended</option>
                  </select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sellers Table */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold">All Sellers</CardTitle>
              <p className="text-sm text-gray-500">Showing 1-10 of 1,245 sellers</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3 pl-4">Seller</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Location</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Products</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Orders</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Revenue</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Rating</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Status</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {sellers.map((seller) => (
                      <tr key={seller.id} className="hover:bg-gray-50">
                        <td className="py-4 pl-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                              <Building2 className="h-5 w-5 text-orange-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{seller.name}</p>
                              <p className="text-xs text-gray-500">{seller.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {seller.location}
                          </div>
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-900">
                          <div className="flex items-center gap-2">
                            {seller.totalProducts}
                            {seller.pendingProducts > 0 && (
                              <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 text-xs">
                                {seller.pendingProducts} pending
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-900">{seller.totalOrders}</td>
                        <td className="py-4 text-sm font-semibold text-gray-900">{seller.revenue}</td>
                        <td className="py-4">
                          {seller.rating > 0 ? (
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm font-medium text-gray-900">{seller.rating}</span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">N/A</span>
                          )}
                        </td>
                        <td className="py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[seller.status]}`}>
                            {seller.status}
                          </span>
                        </td>
                        <td className="py-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedSeller(seller)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Package className="h-4 w-4 mr-2" />
                                View Products
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <DollarSign className="h-4 w-4 mr-2" />
                                View Revenue
                              </DropdownMenuItem>
                              {!seller.approved && (
                                <DropdownMenuItem className="text-green-600" onClick={() => setShowApprovalModal(true)}>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Approve Seller
                                </DropdownMenuItem>
                              )}
                              {seller.status === "active" ? (
                                <DropdownMenuItem className="text-red-600">
                                  <Ban className="h-4 w-4 mr-2" />
                                  Suspend Seller
                                </DropdownMenuItem>
                              ) : seller.status === "suspended" ? (
                                <DropdownMenuItem className="text-green-600">
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Reactivate Seller
                                </DropdownMenuItem>
                              ) : null}
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

        {/* Seller Details Modal */}
        {selectedSeller && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl">
              <div className="sticky top-0 flex items-center justify-between p-6 border-b bg-white rounded-t-xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-orange-100 flex items-center justify-center">
                    <Building2 className="h-7 w-7 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedSeller.name}</h2>
                    <p className="text-sm text-gray-500">{selectedSeller.id}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedSeller(null)}>
                  ×
                </Button>
              </div>

              <div className="p-6 space-y-6">
                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <Mail className="h-4 w-4" />
                      <span className="text-xs">Email</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{selectedSeller.email}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <Phone className="h-4 w-4" />
                      <span className="text-xs">Phone</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{selectedSeller.phone}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg border text-center">
                    <p className="text-2xl font-bold text-gray-900">{selectedSeller.totalProducts}</p>
                    <p className="text-xs text-gray-500">Products</p>
                  </div>
                  <div className="p-4 rounded-lg border text-center">
                    <p className="text-2xl font-bold text-gray-900">{selectedSeller.totalOrders}</p>
                    <p className="text-xs text-gray-500">Orders</p>
                  </div>
                  <div className="p-4 rounded-lg border text-center">
                    <p className="text-2xl font-bold text-orange-600">{selectedSeller.revenue}</p>
                    <p className="text-xs text-gray-500">Revenue</p>
                  </div>
                  <div className="p-4 rounded-lg border text-center">
                    <div className="flex items-center justify-center gap-1">
                      <p className="text-2xl font-bold text-gray-900">{selectedSeller.rating}</p>
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    </div>
                    <p className="text-xs text-gray-500">Rating</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <Eye className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                  <Button variant="outline">
                    <Package className="h-4 w-4 mr-2" />
                    View Products
                  </Button>
                  {selectedSeller.status === "active" ? (
                    <Button variant="destructive" className="bg-red-500 hover:bg-red-600 ml-auto">
                      <Ban className="h-4 w-4 mr-2" />
                      Suspend
                    </Button>
                  ) : selectedSeller.status === "suspended" ? (
                    <Button className="bg-green-500 hover:bg-green-600 ml-auto">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Reactivate
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
