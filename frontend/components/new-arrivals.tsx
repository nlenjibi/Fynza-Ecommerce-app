"use client"

import { useState, useEffect, useRef } from "react"
import { Star, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

const newArrivals = [
  {
    id: 1,
    name: "iPhone 15 Pro Max - 256GB",
    price: "GHC 8,499.00",
    oldPrice: "GHC 9,299.00",
    discount: "-9%",
    rating: 5,
    reviews: 45,
    image: "/iphone-15-pro.jpg",
    isNew: true,
  },
  {
    id: 2,
    name: "MacBook Air M2 - 256GB",
    price: "GHC 6,999.00",
    oldPrice: "GHC 7,599.00",
    discount: "-8%",
    rating: 5,
    reviews: 28,
    image: "/macbook-air-m2.jpg",
    isNew: true,
  },
  {
    id: 3,
    name: "Sony WH-1000XM5 Headphones",
    price: "GHC 1,899.00",
    oldPrice: "GHC 2,299.00",
    discount: "-17%",
    rating: 5,
    reviews: 156,
    image: "/sony-wh1000xm5.jpg",
    isNew: true,
  },
  {
    id: 4,
    name: "Samsung Galaxy Watch 6",
    price: "GHC 1,699.00",
    oldPrice: "GHC 1,999.00",
    discount: "-15%",
    rating: 4,
    reviews: 89,
    image: "/galaxy-watch-6.jpg",
    isNew: true,
  },
  {
    id: 5,
    name: "PS5 Console Bundle",
    price: "GHC 4,299.00",
    oldPrice: "GHC 4,799.00",
    discount: "-10%",
    rating: 5,
    reviews: 234,
    image: "/ps5-console.jpg",
    isNew: true,
  },
  {
    id: 6,
    name: "Dyson V15 Detect Vacuum",
    price: "GHC 3,499.00",
    oldPrice: "GHC 4,199.00",
    discount: "-17%",
    rating: 5,
    reviews: 67,
    image: "/dyson-v15.jpg",
    isNew: true,
  },
]

export function NewArrivals() {
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

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          <h2 className="font-bold text-xl">New Arrivals</h2>
        </div>
        <a href="/category/new-arrivals" className="text-orange-500 hover:underline text-sm">
          See All
        </a>
      </div>

      <div className="relative group">
        {/* Left Navigation Arrow */}
        <button
          onClick={() => scroll("left")}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center transition-all duration-300 hover:bg-purple-500 hover:text-white -ml-5 ${
            !canScrollLeft ? "hidden" : ""
          }`}
          style={{ top: "calc(50% - 20px)" }}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Product Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
          style={{ scrollBehavior: "smooth" }}
        >
          {newArrivals.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[calc((100%-1.5rem)/2)] sm:w-[calc((100%-1.5rem)/3)] lg:w-[calc((100%-7.5rem)/6)]"
            >
              <Link href={`/product/${product.id}`}>
                <Card className="bg-white hover:shadow-lg transition-shadow overflow-hidden h-full">
                  <div className="relative aspect-square">
                    {product.isNew && (
                      <div className="absolute top-2 left-2 bg-purple-500 text-white px-2 py-1 rounded text-xs font-bold z-10">
                        NEW
                      </div>
                    )}
                    {product.discount && (
                      <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold z-10">
                        {product.discount}
                      </div>
                    )}
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm line-clamp-2 mb-2 min-h-[40px]">{product.name}</h3>
                    <div className="mb-2">
                      <div className="font-bold text-lg">{product.price}</div>
                      <div className="text-xs text-gray-500 line-through">{product.oldPrice}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < product.rating ? "fill-orange-500 text-orange-500" : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-500">({product.reviews})</span>
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
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center transition-all duration-300 hover:bg-purple-500 hover:text-white -mr-5 ${
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
