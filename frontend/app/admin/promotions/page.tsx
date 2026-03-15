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
  Zap,
  Calendar,
  DollarSign,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Image,
  Copy,
  CheckCircle,
  XCircle
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const promotions = [
  {
    id: "PROMO-001",
    name: "Summer Sale 2024",
    type: "flash_sale",
    code: "SUMMER24",
    discount: "25%",
    minPurchase: "$50",
    maxDiscount: "$100",
    startDate: "2024-06-01",
    endDate: "2024-06-30",
    usage: 1234,
    usageLimit: 5000,
    status: "active",
    revenue: "$45,600",
  },
  {
    id: "PROMO-002",
    name: "New User Discount",
    type: "discount_code",
    code: "WELCOME20",
    discount: "20%",
    minPurchase: null,
    maxDiscount: "$50",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    usage: 5678,
    usageLimit: null,
    status: "active",
    revenue: "$78,900",
  },
  {
    id: "PROMO-003",
    name: "Electronics Week",
    type: "category_promo",
    code: "ELEC15",
    discount: "15%",
    minPurchase: "$100",
    maxDiscount: null,
    startDate: "2024-03-15",
    endDate: "2024-03-22",
    usage: 890,
    usageLimit: 2000,
    status: "expired",
    revenue: "$34,500",
  },
  {
    id: "PROMO-004",
    name: "Free Shipping Weekend",
    type: "free_shipping",
    code: "FREESHIP",
    discount: "Free Shipping",
    minPurchase: "$75",
    maxDiscount: null,
    startDate: "2024-03-01",
    endDate: "2024-03-03",
    usage: 2345,
    usageLimit: null,
    status: "scheduled",
    revenue: "$0",
  },
  {
    id: "PROMO-005",
    name: "Flash Sale - Weekend Special",
    type: "flash_sale",
    code: "WEEKEND30",
    discount: "30%",
    minPurchase: "$30",
    maxDiscount: "$75",
    startDate: "2024-03-20",
    endDate: "2024-03-22",
    usage: 0,
    usageLimit: 1000,
    status: "scheduled",
    revenue: "$0",
  },
]

const typeIcons: Record<string, any> = {
  flash_sale: Zap,
  discount_code: Tag,
  category_promo: Percent,
  free_shipping: DollarSign,
}

const typeColors: Record<string, string> = {
  flash_sale: "bg-purple-100 text-purple-700 border-purple-200",
  discount_code: "bg-blue-100 text-blue-700 border-blue-200",
  category_promo: "bg-green-100 text-green-700 border-green-200",
  free_shipping: "bg-orange-100 text-orange-700 border-orange-200",
}

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700 border-green-200",
  scheduled: "bg-blue-100 text-blue-700 border-blue-200",
  expired: "bg-gray-100 text-gray-700 border-gray-200",
}

export default function PromotionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader title="Promotions" subtitle="Manage marketing campaigns" />

        <main className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Active Promotions</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
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
                    <p className="text-sm text-gray-500">Total Revenue</p>
                    <p className="text-2xl font-bold text-orange-600">$159K</p>
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
                    <p className="text-sm text-gray-500">Coupons Used</p>
                    <p className="text-2xl font-bold text-blue-600">10,147</p>
                  </div>
                  <div className="p-2 rounded-lg bg-blue-100">
                    <Tag className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Avg Discount</p>
                    <p className="text-2xl font-bold text-purple-600">22%</p>
                  </div>
                  <div className="p-2 rounded-lg bg-purple-100">
                    <Percent className="h-5 w-5 text-purple-600" />
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
                placeholder="Search promotions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Promotion
            </Button>
          </div>

          {/* Promotions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promotions.map((promo) => {
              const Icon = typeIcons[promo.type] || Tag
              return (
                <Card key={promo.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg ${typeColors[promo.type].split(" ")[0]}`}>
                        <Icon className={`h-6 w-6 ${typeColors[promo.type].split(" ")[1]}`} />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{promo.name}</h3>

                    <div className="flex items-center gap-2 mb-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${typeColors[promo.type]}`}>
                        {promo.type.replace("_", " ")}
                      </span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[promo.status]}`}>
                        {promo.status}
                      </span>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Code</span>
                        <div className="flex items-center gap-2">
                          <code className="text-sm font-mono font-semibold text-orange-600">{promo.code}</code>
                          <button className="text-gray-400 hover:text-gray-600">
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-gray-500">Discount</span>
                      <span className="font-semibold text-gray-900">{promo.discount}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-gray-500">Valid Period</span>
                      <span className="text-gray-900">{promo.startDate} - {promo.endDate}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div>
                        <p className="text-xs text-gray-500">Usage</p>
                        <p className="text-sm font-semibold text-gray-900">{promo.usage}{promo.usageLimit ? ` / ${promo.usageLimit}` : ''}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Revenue</p>
                        <p className="text-sm font-semibold text-green-600">{promo.revenue}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </main>

        {/* Create Promotion Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold text-gray-900">Create Promotion</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowCreateModal(false)}>
                  ×
                </Button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Promotion Name</label>
                  <Input placeholder="e.g., Summer Sale 2024" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Promotion Type</label>
                  <select className="w-full h-10 px-3 rounded-lg border border-gray-300">
                    <option value="flash_sale">Flash Sale</option>
                    <option value="discount_code">Discount Code</option>
                    <option value="category_promo">Category Promotion</option>
                    <option value="free_shipping">Free Shipping</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Promo Code</label>
                  <Input placeholder="e.g., SUMMER20" className="uppercase" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount</label>
                    <Input placeholder="e.g., 20%" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Purchase</label>
                    <Input placeholder="e.g., $50" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setShowCreateModal(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                    Create Promotion
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
