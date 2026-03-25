'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Star, Package, Shield, Truck, RotateCcw, CreditCard, HeadphonesIcon, TrendingUp, Store } from "lucide-react"
import Link from "next/link"

interface Store {
  id: string
  storeName: string
  rating: number
  totalReviews: number
  positiveRate: number
  responseRate: number
  responseTime: string
  totalProducts: number
  totalOrders: number
}

interface StoreSidebarProps {
  store: Store
}

export function StoreSidebar({ store }: StoreSidebarProps) {
  const categories = [
    { name: "Women's Shoes", count: 45 },
    { name: "Men's Shoes", count: 38 },
    { name: "Women's Bags", count: 28 },
    { name: "Accessories", count: 22 },
    { name: "Sandals", count: 15 },
    { name: "Boots", count: 8 },
  ]

  return (
    <div className="space-y-4">
      {/* Store Categories */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Store className="h-4 w-4" />
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/store/${store.id}/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-orange-50 text-sm transition"
            >
              <span className="text-gray-700 hover:text-[#FF6900]">{category.name}</span>
              <Badge variant="secondary" className="text-xs bg-gray-100">
                {category.count}
              </Badge>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6900]"
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              placeholder="Max"
              className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6900]"
            />
          </div>
          <Button className="w-full bg-[#FF6900] hover:bg-[#E55F00] text-sm">
            Apply
          </Button>
        </CardContent>
      </Card>

      {/* Seller Services */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Seller Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Truck className="h-4 w-4 text-green-600" />
            <span>Free Shipping</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <RotateCcw className="h-4 w-4 text-blue-600" />
            <span>7-Day Returns</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4 text-purple-600" />
            <span>Buyer Protection</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CreditCard className="h-4 w-4 text-orange-600" />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <HeadphonesIcon className="h-4 w-4 text-red-600" />
            <span>24/7 Support</span>
          </div>
        </CardContent>
      </Card>

      {/* Rating Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Rating</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
              <Checkbox id={`rating-${rating}`} />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${i < rating ? "fill-[#FF6900] text-[#FF6900]" : "fill-gray-200 text-gray-200"}`}
                  />
                ))}
                <span className="text-sm text-gray-600">& Up</span>
              </div>
            </label>
          ))}
        </CardContent>
      </Card>

      {/* Availability Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Availability</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
            <Checkbox id="in-stock" defaultChecked />
            <span className="text-sm">In Stock</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
            <Checkbox id="out-of-stock" />
            <span className="text-sm">Out of Stock</span>
          </label>
        </CardContent>
      </Card>
    </div>
  )
}
