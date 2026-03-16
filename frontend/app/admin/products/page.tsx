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
  Edit,
  Trash2,
  Package,
  DollarSign,
  Star,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Store,
  Image
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const products = [
  {
    id: "PROD-001",
    name: "iPhone 15 Pro Max 256GB",
    sku: "IPC-15PM-256",
    category: "Smartphones",
    seller: "TechZone",
    price: "$1,199.00",
    comparePrice: "$1,299.00",
    stock: 45,
    sold: 234,
    rating: 4.9,
    status: "active",
    approved: true,
    image: null,
  },
  {
    id: "PROD-002",
    name: "Nike Air Max 270 Running Shoes",
    sku: "NAM-270-BLK",
    category: "Footwear",
    seller: "Fashion Hub",
    price: "$149.99",
    comparePrice: "$179.99",
    stock: 3,
    sold: 567,
    rating: 4.7,
    status: "active",
    approved: true,
    image: null,
  },
  {
    id: "PROD-003",
    name: "Samsung 65-inch 4K Smart TV",
    sku: "SS-65-4K-TV",
    category: "Electronics",
    seller: "TechZone",
    price: "$899.00",
    comparePrice: "$1,099.00",
    stock: 12,
    sold: 89,
    rating: 4.8,
    status: "active",
    approved: true,
    image: null,
  },
  {
    id: "PROD-004",
    name: "Organic Face Cream",
    sku: "OFC-001",
    category: "Beauty",
    seller: "Beauty Store",
    price: "$34.99",
    comparePrice: null,
    stock: 0,
    sold: 1234,
    rating: 4.6,
    status: "out_of_stock",
    approved: true,
    image: null,
  },
  {
    id: "PROD-005",
    name: "Wireless Gaming Mouse",
    sku: "WGM-PRO",
    category: "Electronics",
    seller: "TechZone",
    price: "$79.99",
    comparePrice: "$99.99",
    stock: 78,
    sold: 345,
    rating: 4.5,
    status: "pending",
    approved: false,
    image: null,
  },
  {
    id: "PROD-006",
    name: "Leather Wallet",
    sku: "LW-PREMIUM",
    category: "Accessories",
    seller: "Fashion Hub",
    price: "$49.99",
    comparePrice: null,
    stock: 156,
    sold: 234,
    rating: 4.4,
    status: "active",
    approved: true,
    image: null,
  },
]

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700 border-green-200",
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  out_of_stock: "bg-red-100 text-red-700 border-red-200",
  inactive: "bg-gray-100 text-gray-700 border-gray-200",
}

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null)
  const totalPages = 25

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader title="Products" subtitle="Manage all marketplace products" />

        <main className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Products</p>
                    <p className="text-2xl font-bold text-gray-900">45,678</p>
                  </div>
                  <div className="p-2 rounded-lg bg-blue-100">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Active</p>
                    <p className="text-2xl font-bold text-green-600">42,345</p>
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
                    <p className="text-sm text-gray-500">Pending Approval</p>
                    <p className="text-2xl font-bold text-yellow-600">234</p>
                  </div>
                  <div className="p-2 rounded-lg bg-yellow-100">
                    <Filter className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Low Stock</p>
                    <p className="text-2xl font-bold text-orange-600">567</p>
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
                    <p className="text-sm text-gray-500">Out of Stock</p>
                    <p className="text-2xl font-bold text-red-600">123</p>
                  </div>
                  <div className="p-2 rounded-lg bg-red-100">
                    <XCircle className="h-5 w-5 text-red-600" />
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
                    placeholder="Search products..."
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
                    <option value="pending">Pending</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Products Table */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold">All Products</CardTitle>
              <p className="text-sm text-gray-500">Showing 1-10 of 45,678 products</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3 pl-4">Product</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Category</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Seller</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Price</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Stock</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Sold</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Rating</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Status</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="py-4 pl-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                              <Image className="h-6 w-6 text-gray-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{product.name}</p>
                              <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-sm text-gray-600">{product.category}</td>
                        <td className="py-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Store className="h-3 w-3" />
                            {product.seller}
                          </div>
                        </td>
                        <td className="py-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{product.price}</p>
                            {product.comparePrice && (
                              <p className="text-xs text-gray-400 line-through">{product.comparePrice}</p>
                            )}
                          </div>
                        </td>
                        <td className="py-4">
                          {product.stock === 0 ? (
                            <span className="text-sm text-red-600 font-medium flex items-center gap-1">
                              <XCircle className="h-4 w-4" />
                              Out of stock
                            </span>
                          ) : product.stock < 10 ? (
                            <span className="text-sm text-orange-600 font-medium flex items-center gap-1">
                              <AlertTriangle className="h-4 w-4" />
                              {product.stock} left
                            </span>
                          ) : (
                            <span className="text-sm font-medium text-gray-900">{product.stock}</span>
                          )}
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-900">{product.sold}</td>
                        <td className="py-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                          </div>
                        </td>
                        <td className="py-4">
                          {product.status === "pending" && !product.approved ? (
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Pending Review</Badge>
                          ) : (
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[product.status]}`}>
                              {product.status === "out_of_stock" ? "Out of Stock" : product.status}
                            </span>
                          )}
                        </td>
                        <td className="py-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedProduct(product)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Product
                              </DropdownMenuItem>
                              {!product.approved && (
                                <DropdownMenuItem className="text-green-600">
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Approve
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
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

        {/* Product Details Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl">
              <div className="sticky top-0 flex items-center justify-between p-6 border-b bg-white rounded-t-xl">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Product Details</h2>
                  <p className="text-sm text-gray-500">{selectedProduct.id}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedProduct(null)}>
                  ×
                </Button>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex gap-6">
                  <div className="w-40 h-40 rounded-lg bg-gray-100 flex items-center justify-center">
                    <Image className="h-12 w-12 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{selectedProduct.name}</h3>
                    <p className="text-sm text-gray-500">SKU: {selectedProduct.sku}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">{selectedProduct.rating} rating</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-gray-50">
                    <p className="text-xs text-gray-500">Price</p>
                    <p className="text-xl font-bold text-gray-900">{selectedProduct.price}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <p className="text-xs text-gray-500">Compare Price</p>
                    <p className="text-xl font-bold text-gray-900">{selectedProduct.comparePrice || "N/A"}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <p className="text-xs text-gray-500">Stock</p>
                    <p className="text-xl font-bold text-gray-900">{selectedProduct.stock} units</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <p className="text-xs text-gray-500">Sold</p>
                    <p className="text-xl font-bold text-gray-900">{selectedProduct.sold} units</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Product
                  </Button>
                  {!selectedProduct.approved && (
                    <Button className="bg-green-500 hover:bg-green-600">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                  )}
                  <Button variant="destructive" className="bg-red-500 hover:bg-red-600 ml-auto">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
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
