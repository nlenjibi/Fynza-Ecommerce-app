"use client"

import { useState, useEffect, useRef } from "react"
import { Star, ChevronLeft, ChevronRight, TrendingUp } from "lucide-react"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

const bestSellers = [
    {
        id: 1,
        name: "Oraimo FreePods 3 True Wireless Earbuds",
        price: "GHC 249.00",
        oldPrice: "GHC 350.00",
        discount: "-29%",
        rating: 5,
        reviews: 523,
        image: "/oraimo-freepods-3.jpg",
        sales: 1200,
    },
    {
        id: 2,
        name: "Samsung Galaxy A14 6GB RAM 128GB",
        price: "GHC 1,899.00",
        oldPrice: "GHC 2,299.00",
        discount: "-17%",
        rating: 4,
        reviews: 892,
        image: "/samsung-galaxy-a14.jpg",
        sales: 980,
    },
    {
        id: 3,
        name: "Infinix Hot 30i - 6.6\" Display",
        price: "GHC 999.00",
        oldPrice: "GHC 1,199.00",
        discount: "-17%",
        rating: 4,
        reviews: 1245,
        image: "/infinix-hot-30i.jpg",
        sales: 2150,
    },
    {
        id: 4,
        name: "Tecno Spark 10C - 6.6\" HD+",
        price: "GHC 849.00",
        oldPrice: "GHC 999.00",
        discount: "-15%",
        rating: 4,
        reviews: 678,
        image: "/tecno-spark-10c.jpg",
        sales: 890,
    },
    {
        id: 5,
        name: "Itel A18 - 5.0\" Display",
        price: "GHC 349.00",
        oldPrice: "GHC 449.00",
        discount: "-22%",
        rating: 3,
        reviews: 2341,
        image: "/itel-a18.jpg",
        sales: 3200,
    },
    {
        id: 6,
        name: "Power Bank 20000mAh Fast Charge",
        price: "GHC 159.00",
        oldPrice: "GHC 220.00",
        discount: "-28%",
        rating: 4,
        reviews: 567,
        image: "/power-bank-20000.jpg",
        sales: 750,
    },
]

export function BestSellingProducts() {
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
                    <TrendingUp className="h-5 w-5 text-orange-500" />
                    <h2 className="font-bold text-xl">Best Selling</h2>
                </div>
                <a href="/category/best-sellers" className="text-orange-500 hover:underline text-sm">
                    See All
                </a>
            </div>

            <div className="relative group">
                {/* Left Navigation Arrow */}
                <button
                    onClick={() => scroll("left")}
                    className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center transition-all duration-300 hover:bg-orange-500 hover:text-white -ml-5 ${!canScrollLeft ? "hidden" : ""
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
                    {bestSellers.map((product) => (
                        <div
                            key={product.id}
                            className="flex-shrink-0 w-[calc((100%-1.5rem)/2)] sm:w-[calc((100%-1.5rem)/3)] lg:w-[calc((100%-7.5rem)/6)]"
                        >
                            <Link href={`/product/${product.id}`}>
                                <Card className="bg-white hover:shadow-lg transition-shadow overflow-hidden h-full">
                                    <div className="relative aspect-square">
                                        <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold z-10">
                                            {product.discount}
                                        </div>
                                        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold z-10">
                                            Best Seller
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
                                        <div className="flex items-center gap-1 mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-3 w-3 ${i < product.rating ? "fill-orange-500 text-orange-500" : "fill-gray-200 text-gray-200"
                                                        }`}
                                                />
                                            ))}
                                            <span className="text-xs text-gray-500">({product.reviews})</span>
                                        </div>
                                        <div className="text-xs text-green-600 font-medium">
                                            {product.sales.toLocaleString()} sold
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
                    className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center transition-all duration-300 hover:bg-orange-500 hover:text-white -mr-5 ${!canScrollRight ? "hidden" : ""
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
