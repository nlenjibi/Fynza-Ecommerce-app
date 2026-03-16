"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreVertical, Search } from "lucide-react"

const products = [
  {
    id: 1,
    name: "0-3 Years Baby Boys Summer Casual Sets",
    category: "Baby Products",
    price: 75.01,
    stock: 45,
    status: "active",
    image: "/yellow-striped-shirt.jpg",
  },
  {
    id: 2,
    name: "Girls PU Leather Princess Shoes",
    category: "Fashion",
    price: 166.66,
    stock: 12,
    status: "active",
    image: "/black-girls-shoes.jpg",
  },
  {
    id: 3,
    name: "Boys Sports Hook & Loop Casual Shoes",
    category: "Fashion",
    price: 199.94,
    stock: 8,
    status: "low_stock",
    image: "/boys-sports-shoes.jpg",
  },
  {
    id: 4,
    name: "Portable Wardrobe Closet",
    category: "Home & Office",
    price: 479.0,
    stock: 0,
    status: "out_of_stock",
    image: "/portable-wardrobe-closet.jpg",
  },
]

export function ProductsTable() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="low_stock">Low Stock</SelectItem>
                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="baby">Baby Products</SelectItem>
                <SelectItem value="home">Home & Office</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 text-left text-sm text-gray-600">
                <th className="pb-3 font-medium">Product</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Price</th>
                <th className="pb-3 font-medium">Stock</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-100">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-gray-200">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium text-gray-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-gray-600">{product.category}</td>
                  <td className="py-4 font-medium text-gray-900">GH₵ {product.price}</td>
                  <td className="py-4 text-gray-600">{product.stock}</td>
                  <td className="py-4">
                    <Badge
                      variant="secondary"
                      className={
                        product.status === "active"
                          ? "bg-green-100 text-green-700"
                          : product.status === "low_stock"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }
                    >
                      {product.status.replace("_", " ")}
                    </Badge>
                  </td>
                  <td className="py-4">
                    <button className="rounded p-1 hover:bg-gray-100">
                      <MoreVertical className="h-4 w-4 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">Showing 1-4 of 2,847 products</p>
          <div className="flex gap-2">
            <button className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">Previous</button>
            <button className="rounded bg-orange-500 px-3 py-1 text-sm text-white hover:bg-orange-600">1</button>
            <button className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">2</button>
            <button className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">3</button>
            <button className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">Next</button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
