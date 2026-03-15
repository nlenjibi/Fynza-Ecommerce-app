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
  Edit, 
  Trash2, 
  MoreVertical,
  ChevronRight,
  ChevronDown,
  Image,
  ArrowUpDown,
  Eye,
  Package,
  DollarSign,
  Filter
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Category {
  id: number
  name: string
  slug: string
  description: string
  parentId: number | null
  image: string
  products: number
  revenue: string
  status: "active" | "inactive"
  children?: Category[]
}

const categories: Category[] = [
  {
    id: 1,
    name: "Electronics",
    slug: "electronics",
    description: "Electronic devices and accessories",
    parentId: null,
    image: "/placeholder-category.jpg",
    products: 12543,
    revenue: "$450,000",
    status: "active",
    children: [
      { id: 11, name: "Smartphones", slug: "smartphones", description: "Mobile phones", parentId: 1, image: "", products: 3421, revenue: "$180,000", status: "active" },
      { id: 12, name: "Laptops", slug: "laptops", description: "Laptops and notebooks", parentId: 1, image: "", products: 2134, revenue: "$150,000", status: "active" },
      { id: 13, name: "Accessories", slug: "accessories", description: "Electronic accessories", parentId: 1, image: "", products: 6988, revenue: "$120,000", status: "active" },
    ]
  },
  {
    id: 2,
    name: "Fashion",
    slug: "fashion",
    description: "Clothing and fashion items",
    parentId: null,
    image: "/placeholder-category.jpg",
    products: 8934,
    revenue: "$320,000",
    status: "active",
    children: [
      { id: 21, name: "Men's Clothing", slug: "mens-clothing", description: "Men's fashion", parentId: 2, image: "", products: 3456, revenue: "$140,000", status: "active" },
      { id: 22, name: "Women's Clothing", slug: "womens-clothing", description: "Women's fashion", parentId: 2, image: "", products: 4567, revenue: "$160,000", status: "active" },
    ]
  },
  {
    id: 3,
    name: "Home & Living",
    slug: "home-living",
    description: "Home and living essentials",
    parentId: null,
    image: "/placeholder-category.jpg",
    products: 5678,
    revenue: "$210,000",
    status: "active",
  },
  {
    id: 4,
    name: "Beauty & Personal Care",
    slug: "beauty",
    description: "Beauty and personal care products",
    parentId: null,
    image: "/placeholder-category.jpg",
    products: 4521,
    revenue: "$185,000",
    status: "active",
  },
  {
    id: 5,
    name: "Sports & Outdoors",
    slug: "sports",
    description: "Sports and outdoor equipment",
    parentId: null,
    image: "/placeholder-category.jpg",
    products: 3245,
    revenue: "$145,000",
    status: "active",
  },
  {
    id: 6,
    name: "Books & Media",
    slug: "books",
    description: "Books, music, and media",
    parentId: null,
    image: "/placeholder-category.jpg",
    products: 8765,
    revenue: "$95,000",
    status: "inactive",
  },
]

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCategories, setExpandedCategories] = useState<number[]>([1, 2])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  const toggleExpand = (id: number) => {
    setExpandedCategories((prev) => 
      prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader title="Categories" subtitle="Manage product categories" />
        
        <main className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Categories</p>
                    <p className="text-2xl font-bold text-gray-900">42</p>
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
                    <p className="text-2xl font-bold text-green-600">38</p>
                  </div>
                  <div className="p-2 rounded-lg bg-green-100">
                    <Eye className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Subcategories</p>
                    <p className="text-2xl font-bold text-purple-600">28</p>
                  </div>
                  <div className="p-2 rounded-lg bg-purple-100">
                    <ChevronDown className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Revenue</p>
                    <p className="text-2xl font-bold text-orange-600">$1.4M</p>
                  </div>
                  <div className="p-2 rounded-lg bg-orange-100">
                    <DollarSign className="h-5 w-5 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Header Actions */}
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setIsModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </div>
          </div>

          {/* Categories Table */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">All Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id}>
                    {/* Main Category Row */}
                    <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all">
                      <div className="flex items-center gap-4">
                        {category.children && category.children.length > 0 && (
                          <button
                            onClick={() => toggleExpand(category.id)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            {expandedCategories.includes(category.id) ? (
                              <ChevronDown className="h-4 w-4 text-gray-500" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-gray-500" />
                            )}
                          </button>
                        )}
                        {!category.children && <div className="w-6" />}
                        
                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Image className="h-6 w-6 text-gray-400" />
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-gray-900">{category.name}</h3>
                            {category.status === "active" ? (
                              <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">Active</Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">Inactive</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{category.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-900">{category.products.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Products</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-900">{category.revenue}</p>
                          <p className="text-xs text-gray-500">Revenue</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => { setSelectedCategory(category); setIsModalOpen(true) }}>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { setSelectedCategory(category); setIsModalOpen(true) }}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Image className="h-4 w-4 mr-2" />
                              Change Image
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Subcategories */}
                    {category.children && expandedCategories.includes(category.id) && (
                      <div className="ml-14 space-y-2 mb-4">
                        {category.children.map((child) => (
                          <div
                            key={child.id}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all bg-gray-30/30"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center ml-6">
                                <Image className="h-5 w-5 text-gray-400" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="text-sm font-medium text-gray-900">{child.name}</h4>
                                  <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">Active</Badge>
                                </div>
                                <p className="text-xs text-gray-500">{child.description}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-8">
                              <div className="text-center">
                                <p className="text-sm font-medium text-gray-900">{child.products.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">Products</p>
                              </div>
                              <div className="text-center">
                                <p className="text-sm font-medium text-gray-900">{child.revenue}</p>
                                <p className="text-xs text-gray-500">Revenue</p>
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
                                    View
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
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Add/Edit Category Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedCategory ? "Edit Category" : "Add New Category"}
                </h2>
                <Button variant="ghost" size="sm" onClick={() => { setIsModalOpen(false); setSelectedCategory(null) }}>
                  ×
                </Button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                  <Input placeholder="Enter category name" defaultValue={selectedCategory?.name} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                  <Input placeholder="category-slug" defaultValue={selectedCategory?.slug} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    className="w-full min-h-[100px] p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter category description"
                    defaultValue={selectedCategory?.description}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Parent Category</label>
                  <select className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                    <option value="">No Parent</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Image className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => { setIsModalOpen(false); setSelectedCategory(null) }}>
                    Cancel
                  </Button>
                  <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                    {selectedCategory ? "Save Changes" : "Create Category"}
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
