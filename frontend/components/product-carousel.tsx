"use client"

import { useState, useRef, useEffect } from "react"
import { Star, ChevronLeft, ChevronRight, ArrowUp } from "lucide-react"
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
        quantityInStock: 15
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
        quantityInStock: 30
    },
]

// Extend products to show more for carousel scrolling
const allProducts = [
    ...products,
    ...products,
    ...products,
]

// Move to Top Button Component
function MoveToTopButton() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener("scroll", toggleVisibility)
        return () => window.removeEventListener("scroll", toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 z-50 w-12 h-12 bg-[#FF6700] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-[#E30613] hover:scale-110 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                }`}
            aria-label="Move to top"
        >
            <ArrowUp className="w-5 h-5" />
        </button>
    )
}

function ProductCard({ product }: { product: typeof products[0] }) {
    return (
        <Link href={`/product/${product.id}`}>
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
    )
}

export function ProductCarousel({ title, limit = 8 }: { title?: string, limit?: number }) {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)
    const [showLeftArrow, setShowLeftArrow] = useState(false)
    const [showRightArrow, setShowRightArrow] = useState(false)

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
            const scrollAmount = scrollRef.current.clientWidth
            scrollRef.current.scrollBy({
                left: direction === "right" ? scrollAmount : -scrollAmount,
                behavior: "smooth"
            })
        }
    }

    const handleMouseEnter = (side: "left" | "right") => {
        if (side === "left" && canScrollLeft) {
            setShowLeftArrow(true)
        } else if (side === "right" && canScrollRight) {
            setShowRightArrow(true)
        }
    }

    const handleMouseLeave = () => {
        setShowLeftArrow(false)
        setShowRightArrow(false)
    }

    return (
        <>
            <div className="relative group" onMouseLeave={handleMouseLeave}>
                {/* Left Navigation Arrow */}
                <button
                    onClick={() => scroll("left")}
                    className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#FF6700] hover:text-white -ml-5 opacity-0 group-hover:opacity-100 ${showLeftArrow && canScrollLeft ? "opacity-100" : ""
                        } ${!canScrollLeft ? "hidden" : ""}`}
                    aria-label="Scroll left"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Product Carousel */}
                <div
                    ref={scrollRef}
                    className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
                    style={{ scrollBehavior: "smooth" }}
                    onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect()
                        const centerX = rect.left + rect.width / 2
                        handleMouseEnter("right")
                    }}
                >
                    {allProducts.slice(0, limit).map((product, index) => (
                        <div
                            key={`${product.id}-${index}`}
                            className="flex-shrink-0 w-[calc((100%-1.5rem)/2)] sm:w-[calc((100%-1.5rem)/3)] md:w-[calc((100%-3rem)/4)] lg:w-[calc((100%-7.5rem)/6)]"
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                {/* Right Navigation Arrow */}
                <button
                    onClick={() => scroll("right")}
                    className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#FF6700] hover:text-white -mr-5 opacity-0 group-hover:opacity-100 ${showRightArrow && canScrollRight ? "opacity-100" : ""
                        } ${!canScrollRight ? "hidden" : ""}`}
                    aria-label="Scroll right"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            <MoveToTopButton />
        </>
    )
}
