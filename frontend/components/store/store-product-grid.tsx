'use client'

import { useState } from "react"
import { Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Eye, Zap, Gift, Truck } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  oldPrice?: number
  discount?: number
  rating: number
  reviews: number
  image: string
  badge?: string
  isNew?: boolean
  isBestseller?: boolean
  inStock: boolean
  quantityInStock: number
  hasFlashSale?: boolean
  freeShipping?: boolean
}

interface StoreProductGridProps {
  storeId: string
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Women's Lace Up Canvas Sports Shoes - Black",
    price: 59.00,
    oldPrice: 72.00,
    discount: 18,
    rating: 4,
    reviews: 138,
    image: "/colorful-bekia-sneakers.jpg",
    badge: "Best Seller",
    isBestseller: true,
    inStock: true,
    quantityInStock: 45,
    hasFlashSale: true,
    freeShipping: true
  },
  {
    id: "2",
    name: "Women's Fashion Sneakers - White",
    price: 89.00,
    oldPrice: 120.00,
    discount: 26,
    rating: 5,
    reviews: 89,
    image: "/girls-sports-shoes.jpg",
    isNew: true,
    inStock: true,
    quantityInStock: 28
  },
  {
    id: "3",
    name: "Casual Canvas Shoes for Women",
    price: 45.00,
    oldPrice: 55.00,
    discount: 18,
    rating: 4,
    reviews: 56,
    image: "/kids-tshirt-shorts.jpg",
    inStock: true,
    quantityInStock: 120
  },
  {
    id: "4",
    name: "Premium Leather Women's Sandals",
    price: 125.00,
    rating: 4,
    reviews: 34,
    image: "/baby-feeding-set.jpg",
    inStock: true,
    quantityInStock: 15,
    freeShipping: true
  },
  {
    id: "5",
    name: "Women's Winter Boots - Brown",
    price: 156.00,
    oldPrice: 195.00,
    discount: 20,
    rating: 4,
    reviews: 67,
    image: "/black-girls-shoes.jpg",
    badge: "Winter Sale",
    inStock: true,
    quantityInStock: 22,
    hasFlashSale: true
  },
  {
    id: "6",
    name: "Fashion Women's Handbag - Black",
    price: 78.00,
    oldPrice: 98.00,
    discount: 20,
    rating: 5,
    reviews: 112,
    image: "/boys-sports-shoes.jpg",
    isBestseller: true,
    inStock: true,
    quantityInStock: 38
  },
  {
    id: "7",
    name: "Women's Running Shoes - Pink",
    price: 95.00,
    rating: 4,
    reviews: 45,
    image: "/tropical-shirt.jpg",
    isNew: true,
    inStock: true,
    quantityInStock: 30
  },
  {
    id: "8",
    name: "Classic Women's Loafers",
    price: 68.00,
    oldPrice: 85.00,
    discount: 20,
    rating: 4,
    reviews: 78,
    image: "/baby-romper-set-pink.jpg",
    inStock: false,
    quantityInStock: 0
  },
]

export function StoreProductGrid({ storeId }: StoreProductGridProps) {
  const [products] = useState<Product[]>(mockProducts)
  const [wishlist, setWishlist] = useState<string[]>([])

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {products.map((product) => (
          <Card key={product.id} className="bg-white hover:shadow-lg transition-all duration-300 overflow-hidden group h-full">
            <Link href={`/product/${product.id}`}>
              <div className="relative aspect-square">
                {/* Badges */}
                <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                  {product.discount && (
                    <div className="bg-[#FF6700] text-white px-2 py-1 rounded text-xs font-bold">
                      -{product.discount}%
                    </div>
                  )}
                  {product.isNew && (
                    <div className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
                      NEW
                    </div>
                  )}
                  {product.isBestseller && (
                    <div className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold">
                      BEST
                    </div>
                  )}
                  {product.hasFlashSale && (
                    <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      FLASH
                    </div>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    toggleWishlist(product.id)
                  }}
                  className="absolute top-2 right-2 z-10 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  <Heart
                    className={`h-4 w-4 ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                  />
                </button>

                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Out of Stock Overlay */}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold">Out of Stock</span>
                  </div>
                )}
              </div>
            </Link>

            <div className="p-3">
              <Link href={`/product/${product.id}`}>
                <h3 className="text-sm line-clamp-2 mb-2 min-h-[40px] hover:text-[#FF6900] transition-colors">
                  {product.name}
                </h3>
              </Link>

              {/* Price */}
              <div className="mb-2">
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-lg">GHC {product.price.toFixed(2)}</span>
                  {product.oldPrice && (
                    <span className="text-xs text-gray-500 line-through">
                      GHC {product.oldPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                {product.freeShipping && (
                  <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                    <Truck className="h-3 w-3" />
                    Free Shipping
                  </div>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < product.rating ? "fill-[#FF6700] text-[#FF6700]" : "fill-gray-200 text-gray-200"}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">({product.reviews})</span>
              </div>

              {/* Stock Level */}
              {product.inStock && product.quantityInStock > 0 && (
                <div className="mb-2">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-[#FF6700] h-1.5 rounded-full"
                      style={{ width: `${Math.min((product.quantityInStock / 50) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {product.quantityInStock} left
                  </p>
                </div>
              )}

              {/* Quick Actions */}
              <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  className="flex-1 bg-[#FF6900] hover:bg-[#E55F00] text-xs h-8"
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Add
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-[#FF6900] text-[#FF6900] hover:bg-[#FF6900] hover:text-white text-xs h-8"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-8">
        <button className="px-3 py-1 border rounded hover:bg-gray-50 text-sm">Previous</button>
        <button className="px-3 py-1 bg-[#FF6900] text-white rounded text-sm">1</button>
        <button className="px-3 py-1 border rounded hover:bg-gray-50 text-sm">2</button>
        <button className="px-3 py-1 border rounded hover:bg-gray-50 text-sm">3</button>
        <button className="px-3 py-1 border rounded hover:bg-gray-50 text-sm">4</button>
        <span className="text-gray-400">...</span>
        <button className="px-3 py-1 border rounded hover:bg-gray-50 text-sm">20</button>
        <button className="px-3 py-1 border rounded hover:bg-gray-50 text-sm">Next</button>
      </div>
    </>
  )
}
