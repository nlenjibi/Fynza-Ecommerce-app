"use client"

import { Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

const products = [
  {
    id: 1,
    name: "Girls PU Leather Princess Shoes Hook & Loop Back To School Party",
    price: "GHC 166.66",
    oldPrice: "GHC 195.00",
    discount: "-15%",
    rating: 4,
    reviews: 9,
    image: "/black-girls-shoes.jpg",
    badge: "CHRISTMAS DEAL",
    featured: true,
    isNew: false,
    isBestseller: true,
    inStock: true,
    quantityInStock: 25
  },
  {
    id: 2,
    name: "Boys Sports Hook & Loop Casual Shoes Breathable Flat Running Tennis",
    price: "GHC 199.94",
    oldPrice: "GHC 234.00",
    discount: "-15%",
    rating: 4,
    reviews: 5,
    image: "/boys-sports-shoes.jpg",
    badge: "CHRISTMAS DEAL",
    featured: false,
    isNew: true,
    isBestseller: false,
    inStock: true,
    quantityInStock: 8
  },
  {
    id: 3,
    name: "Fasfion 2pcs 0-3 Years Boys Clothes Newborn Kids Shirt Casual Sets",
    price: "GHC 85.89",
    oldPrice: "GHC 134.00",
    discount: "-36%",
    rating: 4,
    reviews: 5,
    image: "/tropical-shirt.jpg",
    featured: false,
    isNew: false,
    isBestseller: true,
    inStock: true,
    quantityInStock: 42
  },
  {
    id: 4,
    name: "0-3 Years Baby Boys Summer Casual Sets Short Sleeve Newborn",
    price: "GHC 75.01",
    oldPrice: "GHC 181.35",
    discount: "-59%",
    rating: 4,
    reviews: 4,
    image: "/yellow-striped-shirt.jpg",
    featured: true,
    isNew: false,
    isBestseller: false,
    inStock: false,
    quantityInStock: 0
  },
  {
    id: 5,
    name: "3pcs Newborn Baby Girl Boy Clothes Romper Bodysuit Pants Hat Set",
    price: "GHC 89.80",
    oldPrice: "GHC 125.00",
    discount: "-28%",
    rating: 5,
    reviews: 12,
    image: "/baby-romper-set-pink.jpg",
    featured: false,
    isNew: true,
    isBestseller: true,
    inStock: true,
    quantityInStock: 15
  },
  {
    id: 6,
    name: "5pcs Baby Feeding Set With Bowl Plate Spoon Fork Cup",
    price: "GHC 125.00",
    oldPrice: "GHC 180.00",
    discount: "-31%",
    rating: 5,
    reviews: 23,
    image: "/baby-feeding-set.jpg",
    featured: true,
    isNew: false,
    isBestseller: true,
    inStock: true,
    quantityInStock: 3
  },
  {
    id: 7,
    name: "Boys 3pcs Baby Set 0-3 Years Infant Outfit Kids Shirt Casual Sets",
    price: "GHC 78.00",
    oldPrice: "GHC 145.00",
    discount: "-46%",
    rating: 4,
    reviews: 8,
    image: "/assorted-baby-clothes.png",
    featured: false,
    isNew: false,
    isBestseller: false,
    inStock: true,
    quantityInStock: 18
  },
  {
    id: 8,
    name: "Kid 2 Piece Set Short Sleeve Casual Shirt & Shorts",
    price: "GHC 52.00",
    oldPrice: "GHC 98.00",
    discount: "-47%",
    rating: 4,
    reviews: 6,
    image: "/kids-tshirt-shorts.jpg",
    featured: false,
    isNew: true,
    isBestseller: false,
    inStock: true,
    quantityInStock: 30
  },
]

// Repeat products array multiple times to show 64 products as in the reference
const allProducts = [
  ...products,
  ...products,
  ...products,
  ...products,
  ...products,
  ...products,
  ...products,
  ...products,
]

export function ProductGrid({ limit }: { limit?: number }) {
  const productLimit = limit ?? 64;

  return (
    <>
      <div className="mb-4 text-sm text-gray-600">
        <span className="font-semibold">Vetekids-COD</span> ({productLimit} products found)
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {allProducts.slice(0, productLimit).map((product, index) => (
          <Link key={`${product.id}-${index}`} href={`/product/${product.id}`}>
            <Card className="bg-white hover:shadow-lg transition-shadow overflow-hidden h-full">
              <div className="relative aspect-square">
                {product.discount && (
                  <div className="absolute top-2 left-2 bg-[#FF6700] text-white px-2 py-1 rounded text-xs font-bold z-10">
                    {product.discount}
                  </div>
                )}
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm line-clamp-2 mb-2 min-h-[40px]">{product.name}</h3>
                <div className="mb-2">
                  <div className="font-bold text-lg">{product.price}</div>
                  <div className="text-xs text-gray-500 line-through">{product.oldPrice}</div>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < product.rating ? "fill-[#FF6700] text-[#FF6700]" : "fill-gray-200 text-gray-200"
                        }`}
                    />
                  ))}
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>
                {product.quantityInStock > 0 && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#FF6700] h-2 rounded-full"
                      style={{ width: `${Math.min((product.quantityInStock / 50) * 100, 100)}%` }}
                    />
                  </div>
                )}
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Pagination - only show if more than one page */}
      {productLimit >= 64 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button className="px-3 py-1 border rounded hover:bg-gray-50">Previous</button>
          <button className="px-3 py-1 bg-[#FF6700] text-white rounded">1</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-50">2</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-50">3</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-50">4</button>
          <span>...</span>
          <button className="px-3 py-1 border rounded hover:bg-gray-50">11</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
        </div>
      )}
    </>
  )
}
