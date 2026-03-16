"use client"

import { useState, useEffect, useRef } from "react"
import { Star, ChevronLeft, ChevronRight, Store, Award } from "lucide-react"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

const sellers = [
  {
    id: 1,
    name: "Fynza Official Store",
    rating: 4.8,
    reviews: 12500,
    products: 2500,
    image: "/stores/official-store.jpg",
    badge: "Top Rated",
    verified: true,
  },
  {
    id: 2,
    name: "TechHub Ghana",
    rating: 4.6,
    reviews: 8200,
    products: 450,
    image: "/stores/techhub.jpg",
    badge: "Fast Shipping",
    verified: true,
  },
  {
    id: 3,
    name: "Fashion Plus",
    rating: 4.5,
    reviews: 5600,
    products: 890,
    image: "/stores/fashion-plus.jpg",
    badge: "Best Seller",
    verified: true,
  },
  {
    id: 4,
    name: "Home Essentials",
    rating: 4.7,
    reviews: 3400,
    products: 320,
    image: "/stores/home-essentials.jpg",
    badge: "Trusted",
    verified: true,
  },
  {
    id: 5,
    name: "Phone World",
    rating: 4.4,
    reviews: 9800,
    products: 180,
    image: "/stores/phone-world.jpg",
    badge: "Verified",
    verified: true,
  },
  {
    id: 6,
    name: "Baby Store Ghana",
    rating: 4.8,
    reviews: 2100,
    products: 420,
    image: "/stores/baby-store.jpg",
    badge: "Top Rated",
    verified: true,
  },
]

export function SellerHighlights() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (scrollContainer) {
      checkScroll()
      scrollContainer.addEventListener("scroll", checkScroll)
      return () => scrollContainer.removeEventListener("scroll", checkScroll)
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8
      scrollRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Top Rated":
        return "bg-yellow-500"
      case "Fast Shipping":
        return "bg-blue-500"
      case "Best Seller":
        return "bg-green-500"
      case "Trusted":
        return "bg-purple-500"
      case "Verified":
        return "bg-gray-500"
      default:
        return "bg-orange-500"
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Store className="h-5 w-5 text-green-500" />
          <h2 className="font-bold text-xl">Featured Sellers</h2>
        </div>
        <a href="/sellers" className="text-orange-500 hover:underline text-sm">
          See All Sellers
        </a>
      </div>

      <div className="relative group">
        {/* Left Navigation Arrow */}
        <button
          onClick={() => scroll("left")}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center transition-all duration-300 hover:bg-green-500 hover:text-white -ml-5 ${
            !canScrollLeft ? "hidden" : ""
          }`}
          style={{ top: "calc(50% - 20px)" }}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Seller Cards */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
          style={{ scrollBehavior: "smooth" }}
        >
          {sellers.map((seller) => (
            <div
              key={seller.id}
              className="flex-shrink-0 w-[200px] sm:w-[220px]"
            >
              <Link href={`/seller/${seller.id}`}>
                <Card className="bg-white hover:shadow-lg transition-shadow overflow-hidden h-full">
                  <div className="p-4">
                    {/* Store Image */}
                    <div className="relative w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden bg-gray-100">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Store className="w-8 h-8 text-gray-400" />
                      </div>
                    </div>

                    {/* Seller Info */}
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <h3 className="font-semibold text-sm line-clamp-1">{seller.name}</h3>
                        {seller.verified && (
                          <Award className="w-4 h-4 text-blue-500" />
                        )}
                      </div>

                      {/* Rating */}
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(seller.rating)
                                  ? "fill-yellow-500 text-yellow-500"
                                  : "fill-gray-200 text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">({seller.reviews.toLocaleString()})</span>
                      </div>

                      {/* Products Count */}
                      <p className="text-xs text-gray-500 mb-2">
                        {seller.products.toLocaleString()} products
                      </p>

                      {/* Badge */}
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium text-white ${getBadgeColor(seller.badge)}`}>
                        {seller.badge}
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          ))}
        </div>

        {/* Right Navigation Arrow */}
        <button
          onClick={() => scroll("right")}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center transition-all duration-300 hover:bg-green-500 hover:text-white -mr-5 ${
            !canScrollRight ? "hidden" : ""
          }`}
          style={{ top: "calc(50% - 20px)" }}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
