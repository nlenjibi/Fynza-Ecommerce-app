"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

const flashProducts = [
  {
    id: 1,
    name: "Blouse Men T-Shirt Casual Long Sleeve",
    price: "GHC 41.00",
    oldPrice: "GHC 76.01",
    discount: "-46%",
    image: "/white-black-long-sleeve-tshirt.jpg",
    rating: 4,
    reviews: 10,
    stock: 10,
  },
  {
    id: 2,
    name: "Oraimo Necklace Lite Call",
    price: "GHC 124.00",
    oldPrice: "GHC 252.46",
    discount: "-51%",
    image: "/green-oraimo-necklace-earphones.jpg",
    rating: 5,
    reviews: 26,
    stock: 26,
  },
  {
    id: 3,
    name: "P9 Bluetooth Wireless Headphones",
    price: "GHC 64.00",
    oldPrice: "GHC 156.00",
    discount: "-59%",
    image: "/white-bluetooth-headphones.jpg",
    rating: 4,
    reviews: 38,
    stock: 38,
  },
  {
    id: 4,
    name: "Bekia BEKIA Women's Lace Up Canvas Sports Shoes",
    price: "GHC 59.00",
    oldPrice: "GHC 88.48",
    discount: "-39%",
    image: "/colorful-bekia-sneakers.jpg",
    rating: 5,
    reviews: 17,
    stock: 17,
  },
  {
    id: 5,
    name: "Men Tank Top Sleeveless Vest",
    price: "GHC 33.00",
    oldPrice: "GHC 74.66",
    discount: "-56%",
    image: "/black-tank-top-mens.jpg",
    rating: 4,
    reviews: 5,
    stock: 5,
  },
  {
    id: 6,
    name: "12 Portable Cubes Wardrobe",
    price: "GHC 479.00",
    oldPrice: "GHC 699.00",
    discount: "-31%",
    image: "/portable-wardrobe-closet.jpg",
    rating: 5,
    reviews: 47,
    stock: 47,
  },
]

export function FlashSales() {
  const [timeLeft, setTimeLeft] = useState({ hours: 15, minutes: 15, seconds: 22 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-[#E30613] py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-[#FFD700]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
              </svg>
              <span className="text-white font-bold text-2xl">Flash Sales</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <span>Time Left:</span>
              <span className="font-bold text-xl">
                {String(timeLeft.hours).padStart(2, "0")}h : {String(timeLeft.minutes).padStart(2, "0")}m :{" "}
                {String(timeLeft.seconds).padStart(2, "0")}s
              </span>
            </div>
          </div>
          <Link href="/flash-sales" className="text-white hover:underline flex items-center gap-1">
            See All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {flashProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <Card className="bg-white hover:shadow-lg transition-shadow overflow-hidden h-full">
                <div className="relative aspect-square">
                  <div className="absolute top-2 left-2 bg-[#FF6700] text-white px-2 py-1 rounded text-xs font-bold z-10">
                    {product.discount}
                  </div>
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
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
                        className={`h-3 w-3 ${
                          i < product.rating ? "fill-[#FF6700] text-[#FF6700]" : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#FF6700] h-2 rounded-full"
                      style={{ width: `${(product.stock / 50) * 100}%` }}
                    />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
