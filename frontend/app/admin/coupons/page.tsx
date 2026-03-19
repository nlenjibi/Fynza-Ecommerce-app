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
  Percent,
  Tag,
  Calendar,
  DollarSign,
  Users,
  Copy,
  CheckCircle,
  XCircle,
  Gift,
  TrendingUp,
  Clock,
  Filter
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const coupons = [
  {
    id: "COUP-001",
    code: "SUMMER25",
    name: "Summer Sale 2024",
    type: "percentage",
    value: 25,
    minPurchase: 50,
    maxDiscount: 100,
    usage: 1234,
    usageLimit: 5000,
    startDate: "2024-06-01",
    endDate: "2024-06-30",
    status: "active",
    seller: "All Sellers",
  },
  {
    id: "COUP-002",
    code: "WELCOME15",
    name: "New User Discount",
    type: "percentage",
    value: 15,
    minPurchase: null,
    maxDiscount: 50,
    usage: 5678,
    usageLimit: 10000,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "active",
    seller: "All Sellers",
  },
  {
    id: "COUP-003",
    code: "SAVE20",
    name: "First Order Discount",
    type: "fixed",
    value: 20,
    minPurchase: 100,
    maxDiscount: null,
    usage: 890,
    usageLimit: 2000,
    startDate: "2024-03-01",
    endDate: "2024-08-31",
    status: "expired",
    seller: "TechZone Ghana",
  },
  {
    id: "COUP-004",
    code: "FREESHIP",
    name: "Free Shipping",
    type: "shipping",
    value: 0,
    minPurchase: 75,
    maxDiscount: null,
    usage: 2345,
    usageLimit: null,
    startDate: "2024-05-01",
    endDate: "2024-05-31",
    status: "active",
    seller: "All Sellers",
  },
  {
    id: "COUP-005",
    code: "VIP30",
    name: "VIP Customer Discount",
    type: "percentage",
    value: 30,
    minPurchase: 200,
    maxDiscount: 150,
    usage: 156,
    usageLimit: 500,
    startDate: "2024-04-01",
    endDate: "2024-06-30",
    status: "active",
    seller: "Fashion Hub",
  },
  {
    id: "COUP-006",
    code: "FLASH50",
    name: "Flash Sale Special",
    type: "percentage",
    value: 50,
    minPurchase: null,
    maxDiscount: 25,
    usage: 450,
    usageLimit: 1000,
    startDate: "2024-06-15",
    endDate: "2024-06-17",
    status: "scheduled",
    seller: "All Sellers",
  },
]

const couponStats = [
  { title: "Total Coupons", value: "156", icon: Tag, color: "bg-blue-100 text-blue-600" },
  { title: "Active Coupons", value: "89", icon: CheckCircle, color: "bg-green-100 text-green-600" },
  { title: "Expired Coupons", value: "45", icon: XCircle, color: "bg-red-100 text-red-600" },
  { title: "Total Savings", value: "GH₵ 45,678", icon: TrendingUp, color: "bg-purple-100 text-purple-600" },
]

export default function CouponsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredCoupons = coupons.filter(coupon => {
    const matchesSearch = coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || coupon.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700">Active</Badge>
      case "expired":
        return <Badge className="bg-red-100 text-red-700">Expired</Badge>
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-700">Scheduled</Badge>
      case "paused":
        return <Badge className="bg-yellow-100 text-yellow-700">Paused</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "percentage":
        return <Badge variant="outline" className="border-orange-500 text-orange-600">Percentage</Badge>
      case "fixed":
        return <Badge variant="outline" className="border-blue-500 text-blue-600">Fixed Amount</Badge>
      case "shipping":
        return <Badge variant="outline" className="border-green-500 text-green-600">Free Shipping</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader title="Manage Coupons" subtitle="Create and manage discount coupons" />

        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {couponStats.map((stat, index) => (
              <Card key={index} className="shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{stat.title}</p>
                      <p className="text-xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search coupons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="scheduled">Scheduled</option>
                <option value="paused">Paused</option>
              </select>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setShowAddModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Coupon
            </Button>
          </div>

          {/* Coupons Table */}
          <Card className="shadow-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Coupon</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Type</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Discount</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Usage</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Valid Period</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Status</th>
                      <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredCoupons.map((coupon) => (
                      <tr key={coupon.id} className="hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-100 rounded-lg">
                              <Tag className="h-4 w-4 text-orange-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{coupon.name}</p>
                              <p className="text-sm text-gray-500 flex items-center gap-1">
                                {coupon.code}
                                <button className="p-1 hover:bg-gray-100 rounded" title="Copy code">
                                  <Copy className="h-3 w-3" />
                                </button>
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          {getTypeBadge(coupon.type)}
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">
                              {coupon.type === "shipping" ? "Free Shipping" : 
                                coupon.type === "fixed" ? `GH₵ ${coupon.value}` : 
                                `${coupon.value}%`}
                            </p>
                            {coupon.minPurchase && (
                              <p className="text-xs text-gray-500">Min: GH₵ {coupon.minPurchase}</p>
                            )}
                            {coupon.maxDiscount && (
                              <p className="text-xs text-gray-500">Max: GH₵ {coupon.maxDiscount}</p>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {coupon.usage.toLocaleString()}
                              {coupon.usageLimit && ` / ${coupon.usageLimit.toLocaleString()}`}
                            </p>
                            {coupon.usageLimit && (
                              <div className="w-24 bg-gray-200 rounded-full h-1.5 mt-1">
                                <div 
                                  className="bg-orange-500 h-1.5 rounded-full" 
                                  style={{ width: `${(coupon.usage / coupon.usageLimit) * 100}%` }}
                                />
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>{coupon.startDate} - {coupon.endDate}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          {getStatusBadge(coupon.status)}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4 text-gray-500" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4 text-gray-500" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4 text-gray-500" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Copy className="h-4 w-4 mr-2" />
                                  Duplicate
                                </DropdownMenuItem>
                                {coupon.status === "active" && (
                                  <DropdownMenuItem>
                                    <Clock className="h-4 w-4 mr-2" />
                                    Pause
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-4 py-3 border-t">
                <p className="text-sm text-gray-600">Showing {filteredCoupons.length} of {coupons.length} coupons</p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="bg-orange-500 text-white hover:bg-orange-600">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <Button variant="outline" size="sm">
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
