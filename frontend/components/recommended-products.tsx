"use client"

import { useState, useEffect, useRef } from "react"
import { Star, ChevronLeft, ChevronRight, ThumbsUp } from "lucide-react"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

const recommendedProducts = [
  {
    id: 1,
    name: "4K Smart TV 55\" Ultra HD",
    price: "GHC 2,499.00",
    oldPrice: "GHC 3,299.00",
    discount: "-24%",
    rating: 5,
    reviews: 234,
    image: "/smart-tv-55.jpg",
    recommendation: "Highly Recommended",
  },
  {
    id: 2,
    name: "Air Fryer 5.8L Digital",
    price: "GHC 399.00",
    oldPrice: "GHC 549.00",
    discount: "-27%",
    rating: 4,
    reviews: 567,
    image: "/air-fryer.jpg",
    recommendation: "Customer Favorite",
  },
  {
    id: 3,
    name: "Blender 1000W Professional",
    price: "GHC 249.00",
    oldPrice: "GHC 329.00",
    discount: "-24%",
    rating: 4,
    reviews: 189,
    image: "/professional-blender.jpg",
    recommendation: "Best Value",
  },
  {
    id: 4,
    name: "Wireless Mouse Ergonomic",
    price: "GHC 89.00",
    oldPrice: "GHC 129.00",
    discount: "-31%",
    rating: 4,
    reviews: 892,
    image: "/ergonomic-mouse.jpg",
    recommendation: "Highly Recommended",
  },
  {
    id: 5,
    name: "Bluetooth Speaker Portable",
    price: "GHC 179.00",
    oldPrice: "GHC 249.00",
    discount: "-28%",
    rating: 5,
    reviews: 445,
    image: "/bluetooth-speaker.jpg",
    recommendation: "Customer Favorite",
  },
  {
    id: 6,
    name: "Electric Kettle 1.8L Stainless",
    price: "GHC 129.00",
    oldPrice: "GHC 179.00",
    discount: "-28%",
    rating: 4,
    reviews: 678,
    image: "/electric-kettle.jpg",
    recommendation: "Best Value",
  },
]

export function RecommendedProducts() {
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

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case "Highly Recommended":
        return "bg-green-500"
      case "Customer Favorite":
        return "bg-blue-500"
      case "Best Value":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ThumbsUp className="h-5 w-5 text-blue-500" />
          <h2 className="font-bold text-xl">Recommended For You</h2>
        </div>
        <a href="/category/recommended" className="text-orange-500 hover:underline text-sm">
          See All
        </a>
      </div>

      <div className="relative group">
        {/* Left Navigation Arrow */}
        <button
          onClick={() => scroll("left")}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center transition-all duration-300 hover:bg-blue-500 hover:text-white -ml-5 ${
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
          {recommendedProducts.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[calc((100%-1.5rem)/2)] sm:w-[calc((100%-1.5rem)/3)] lg:w-[calc((100%-7.5rem)/6)]"
            >
              <Link href={`/product/${product.id}`}>
                <Card className="bg-white hover:shadow-lg transition-shadow overflow-hidden h-full">
                  <div className="relative aspect-square">
                    {product.discount && (
                      <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold z-10">
                        {product.discount}
                      </div>
                    )}
                    <div className={`absolute top-2 right-2 ${getRecommendationColor(product.recommendation)} text-white px-2 py-1 rounded text-xs font-bold z-10`}>
                      {product.recommendation}
                    </div>
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
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center transition-all duration-300 hover:bg-blue-500 hover:text-white -mr-5 ${
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
