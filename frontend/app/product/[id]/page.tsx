'use client'

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RelatedProducts } from "@/components/related-products"
import { RecentlyViewed } from "@/components/recently-viewed"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, Share2, Truck, RotateCcw, Shield, Check, ChevronRight, MapPin, Store, Package, ArrowRight, ChevronDown, Clock, Tag, Percent, Gift, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { trackingService } from "@/lib/services/tracking"

const locations = [
  "Accra",
  "Kumasi",
  "Takoradi",
  "Cape Coast",
  "Tema",
  "Koforidua",
  "Ho",
  "Tamale",
  "Bolgatanga",
  "Bawku"
]

const regions = [
  "Greater Accra",
  "Ashanti",
  "Western",
  "Central",
  "Eastern",
  "Volta",
  "Northern",
  "Upper East",
  "Upper West"
]

const townsByRegion: Record<string, string[]> = {
  "Greater Accra": ["Accra", "Tema", "Tetteh Quarshie", "Madina", "Legon"],
  "Ashanti": ["Kumasi", "Obuasi", "Mampong", "Ejisu", "Bekwai"],
  "Western": ["Takoradi", "Sekondi", "Axim", "Tarkwa", "Bibiani"],
  "Central": ["Cape Coast", "Elmina", "Kumasi", "Winneba", "Mumford"],
  "Eastern": ["Koforidua", "Akwapim", "Nsawam", "Aburi", "Asamang"],
  "Volta": ["Ho", "Keta", "Hohoe", "Aflao", "Sogakope"],
  "Northern": ["Tamale", "Yendi", "Savelugu", "Bole", "Bamboi"],
  "Upper East": ["Bolgatanga", "Bawku", "Navrongo", "Paga", "Zuarinbu"],
  "Upper West": ["Wa", "Lawra", "Nandom", "Jirapa", "Hamile"]
}

interface SellerCoupon {
  id: string
  code: string
  name: string
  description: string
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SHIPPING'
  discountValue: number
  minOrderAmount: number
  maxDiscountAmount?: number
  validUntil: string
}

interface FlashSale {
  id: string
  discountPercent: number
  endTime: string
  originalPrice: number
  salePrice: number
}

interface ProductTag {
  id: string
  name: string
  color: string
}

interface Promotion {
  id: string
  name: string
  description: string
  discountValue: number
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT'
  endsAt: string
}

interface SellerInfo {
  id: string
  storeName: string
  logo?: string
  verified: boolean
  rating: number
  positiveRate: number
  orderFulfillment: string
  qualityScore: string
}

export default function ProductPage() {
  const router = useRouter()
  const [selectedSize, setSelectedSize] = useState("38")
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedRegion, setSelectedRegion] = useState("Greater Accra")
  const [selectedTown, setSelectedTown] = useState("Accra")
  const [showRegionDropdown, setShowRegionDropdown] = useState(false)
  const [showTownDropdown, setShowTownDropdown] = useState(false)
  const [deliveryOption, setDeliveryOption] = useState<"home" | "pickup">("home")
  const [coupons, setCoupons] = useState<SellerCoupon[]>([])
  const [flashSale, setFlashSale] = useState<FlashSale | null>(null)
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const [tags, setTags] = useState<ProductTag[]>([])
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [sellerInfo, setSellerInfo] = useState<SellerInfo | null>(null)
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)

  useEffect(() => {
    fetchSellerInfo()
    fetchCoupons()
    fetchFlashSale()
    fetchTags()
    fetchPromotions()
    
    trackingService.trackProductView({
      id: "product-1",
      name: "Shop Bekia Women's Lace Up Canvas Sports Shoes",
      category: "Fashion",
      price: 45.99,
    })
  }, [])

  useEffect(() => {
    if (flashSale?.endTime) {
      const timer = setInterval(() => {
        const end = new Date(flashSale.endTime).getTime()
        const now = new Date().getTime()
        const diff = end - now

        if (diff <= 0) {
          setFlashSale(null)
          clearInterval(timer)
        } else {
          setTimeLeft({
            hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000)
          })
        }
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [flashSale?.endTime])

  const fetchSellerInfo = async () => {
    const mockSeller: SellerInfo = {
      id: "seller-123",
      storeName: "BEKIA FASHION",
      verified: true,
      rating: 4.5,
      positiveRate: 92,
      orderFulfillment: "Excellent",
      qualityScore: "Excellent"
    }
    setSellerInfo(mockSeller)
  }

  const fetchCoupons = async () => {
    const mockCoupons: SellerCoupon[] = [
      {
        id: "1",
        code: "SAVE10",
        name: "10% Off",
        description: "Get 10% off on orders above GHC 50",
        discountType: "PERCENTAGE",
        discountValue: 10,
        minOrderAmount: 50,
        validUntil: "2026-04-30T23:59:59"
      },
      {
        id: "2",
        code: "FREESHIP",
        name: "Free Shipping",
        description: "Free delivery on orders above GHC 100",
        discountType: "FREE_SHIPPING",
        discountValue: 0,
        minOrderAmount: 100,
        validUntil: "2026-04-15T23:59:59"
      }
    ]
    setCoupons(mockCoupons)
  }

  const fetchFlashSale = async () => {
    const endTime = new Date()
    endTime.setHours(endTime.getHours() + 5)
    const mockFlashSale: FlashSale = {
      id: "flash-1",
      discountPercent: 18,
      endTime: endTime.toISOString(),
      originalPrice: 72,
      salePrice: 59
    }
    setFlashSale(mockFlashSale)
  }

  const fetchTags = async () => {
    const mockTags: ProductTag[] = [
      { id: "1", name: "Lace-Up", color: "#FF6900" },
      { id: "2", name: "Canvas", color: "#3B82F6" },
      { id: "3", name: "Casual", color: "#10B981" }
    ]
    setTags(mockTags)
  }

  const fetchPromotions = async () => {
    const mockPromotions: Promotion[] = [
      {
        id: "1",
        name: "New Year Sale",
        description: "Extra 5% off",
        discountValue: 5,
        discountType: "PERCENTAGE",
        endsAt: "2026-03-31T23:59:59"
      }
    ]
    setPromotions(mockPromotions)
  }

  const handleApplyCoupon = (code: string) => {
    setAppliedCoupon(code)
    router.push("/cart?coupon=" + code)
  }

  const formatDiscount = (coupon: SellerCoupon) => {
    if (coupon.discountType === "PERCENTAGE") {
      return `${coupon.discountValue}% OFF`
    } else if (coupon.discountType === "FREE_SHIPPING") {
      return "FREE SHIPPING"
    }
    return `GHC ${coupon.discountValue} OFF`
  }

  const productImages = [
    "/colorful-bekia-sneakers.jpg",
    "/colorful-bekia-sneakers.jpg",
    "/colorful-bekia-sneakers.jpg",
    "/colorful-bekia-sneakers.jpg",
    "/colorful-bekia-sneakers.jpg"
  ]

  const handleAddToCart = () => {
    console.log("[v0] Product added to cart:", { selectedSize, quantity })
    
    trackingService.trackAddToCart({
      id: "product-1",
      name: "Shop Bekia Women's Lace Up Canvas Sports Shoes",
      category: "Fashion",
      price: 45.99,
      quantity: quantity,
    })
    
    setIsAdded(true)
    setTimeout(() => {
      setIsAdded(false)
    }, 2000)
  }

  const handleBuyNow = () => {
    handleAddToCart()
    setTimeout(() => {
      router.push("/checkout")
    }, 500)
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Header />

      <main className="container mx-auto px-2 py-2">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#FF6900] font-medium transition">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/category/fashion" className="hover:text-[#FF6900] font-medium transition">
            Fashion
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/category/womens-fashion" className="hover:text-[#FF6900] font-medium transition">
            Women's Fashion
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-900">Shop Bekia Women's Lace Up Canvas Sports Shoes</span>
        </nav>

        {/* Main Product Section */}
        <div className="grid lg:grid-cols-[80px_1fr_320px] gap-4">
          {/* Left Thumbnail Gallery */}
          <div className="hidden lg:flex flex-col gap-2">
            {productImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative w-16 h-16 rounded overflow-hidden border-2 transition ${selectedImage === idx ? "border-[#FF6900]" : "border-transparent hover:border-gray-300"
                  }`}
              >
                <Image src={img} alt={`Product ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>

          {/* Main Product Area */}
          <Card className="bg-white overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-[1fr_1fr] h-full">
                  {/* Large Image */}
                <div className="relative aspect-square md:aspect-auto md:min-h-[400px] bg-white p-4 flex items-center justify-center">
                  <Image
                    src={productImages[selectedImage]}
                    alt="Product"
                    fill
                    className="object-contain"
                  />
                  {/* Sale Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {flashSale ? (
                      <Badge className="bg-red-600 text-white hover:bg-red-700">
                        <Zap className="h-3 w-3 mr-1" />
                        FLASH SALE
                      </Badge>
                    ) : (
                      <Badge className="bg-[#FF6900] text-white hover:bg-[#FF6900]">
                        -18%
                      </Badge>
                    )}
                    {promotions.map((promo) => (
                      <Badge key={promo.id} className="bg-green-600 text-white hover:bg-green-700">
                        <Gift className="h-3 w-3 mr-1" />
                        {promo.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 md:p-6 border-l flex flex-col">
                  <div className="mb-3">
                    <span className="text-xs text-gray-500">Brand: </span>
                    <Link href="/brand/bekia" className="text-[#FF6900] hover:underline text-sm font-medium">
                      Bekia
                    </Link>
                    <span className="mx-1 text-gray-300">|</span>
                    <Link href="#reviews" className="text-[#FF6900] hover:underline text-sm">
                      138 ratings
                    </Link>
                  </div>

                  <h1 className="text-lg md:text-xl font-bold mb-3 line-clamp-2">
                    Shop Bekia BEKIA Women's Lace Up Canvas Sports Shoes classical sneakers - Black
                  </h1>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 3 ? "fill-[#FF6900] text-[#FF6900]" : "fill-gray-200 text-gray-200"
                            }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">(138 verified ratings)</span>
                  </div>

                  {/* Price */}
                  <div className="border-t border-b py-4 mb-4">
                    {flashSale ? (
                      <div className="flex items-baseline gap-3 mb-1">
                        <span className="text-2xl md:text-3xl font-bold text-red-600">GHC {flashSale.salePrice.toFixed(2)}</span>
                        <span className="text-sm text-gray-400 line-through">GHC {flashSale.originalPrice.toFixed(2)}</span>
                        <Badge className="bg-red-600 text-white text-xs">-{flashSale.discountPercent}%</Badge>
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-3 mb-1">
                        <span className="text-2xl md:text-3xl font-bold text-[#FF6900]">GHC 59.00</span>
                        <span className="text-sm text-gray-400 line-through">GHC 72.00</span>
                      </div>
                    )}
                    <p className="text-xs text-gray-500">+ shipping from GHC 8.70 to {selectedTown}</p>
                  </div>

                  {/* Product Tags */}
                  {tags.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <Badge
                            key={tag.id}
                            variant="outline"
                            className="border-2 font-normal text-xs"
                            style={{ borderColor: tag.color, color: tag.color }}
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Color/Size Selection */}
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2 text-sm">Select Size</h3>
                    <div className="flex flex-wrap gap-2">
                      {["36", "37", "38", "39", "40", "41"].map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-2 border rounded text-sm font-medium transition ${selectedSize === size
                            ? "border-[#FF6900] text-[#FF6900] bg-[#FFF5F0]"
                            : "border-gray-200 hover:border-[#FF6900] hover:text-[#FF6900]"
                            }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2 text-sm">Quantity</h3>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-50 text-lg"
                      >
                        -
                      </button>
                      <span className="w-12 h-8 border rounded flex items-center justify-center font-semibold">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-50 text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Available Coupons */}
                  {coupons.length > 0 && (
                    <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <h3 className="font-semibold mb-2 text-sm flex items-center gap-2">
                        <Percent className="h-4 w-4 text-[#FF6900]" />
                        Available Coupons
                      </h3>
                      <div className="space-y-2">
                        {coupons.map((coupon) => (
                          <div
                            key={coupon.id}
                            className="flex items-center justify-between bg-white p-2 rounded border border-orange-200"
                          >
                            <div>
                              <span className="font-bold text-[#FF6900] text-sm">{coupon.code}</span>
                              <p className="text-xs text-gray-500">{coupon.name} - Min GHC {coupon.minOrderAmount}</p>
                            </div>
                            <Button
                              size="sm"
                              variant={appliedCoupon === coupon.code ? "secondary" : "outline"}
                              onClick={() => handleApplyCoupon(coupon.code)}
                              className="text-xs h-7 border-[#FF6900] text-[#FF6900] hover:bg-[#FF6900] hover:text-white"
                            >
                              {appliedCoupon === coupon.code ? "Applied" : "Apply"}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 mb-4">
                    <Button
                      onClick={handleAddToCart}
                      className={`flex-1 h-11 text-white text-sm font-semibold transition ${isAdded
                        ? "bg-green-600 hover:bg-green-600"
                        : "bg-[#FF6900] hover:bg-[#E55F00]"
                        }`}
                    >
                      {isAdded ? (
                        <span className="flex items-center gap-2">
                          <Check className="h-4 w-4" />
                          ADDED
                        </span>
                      ) : (
                        "ADD TO CART"
                      )}
                    </Button>
                    <Button
                      onClick={handleBuyNow}
                      className="flex-1 h-11 border-2 border-[#FF6900] text-[#FF6900] bg-white hover:bg-[#FF6900] hover:text-white text-sm font-semibold transition"
                    >
                      BUY NOW
                    </Button>
                  </div>

                  {/* Save/Share */}
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 h-9 border-gray-200 hover:border-[#FF6900] hover:text-[#FF6900] bg-transparent text-sm">
                      <Heart className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                    <Button variant="outline" className="flex-1 h-9 border-gray-200 hover:border-[#FF6900] hover:text-[#FF6900] bg-transparent text-sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Sidebar - Delivery & Returns */}
          <div className="space-y-3">
            {/* Delivery Card with Location Selector */}
            <Card className="bg-white">
              <CardContent className="p-4">
                <h3 className="font-bold text-sm mb-3">DELIVERY</h3>

                {/* Location Selector */}
                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-1">Delivery to</p>
                  
                  {/* Region Selector */}
                  <div className="relative mb-2">
                    <button
                      onClick={() => {
                        setShowRegionDropdown(!showRegionDropdown)
                        setShowTownDropdown(false)
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 border rounded text-sm hover:border-[#FF6900]"
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#FF6900]" />
                        {selectedRegion}
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {showRegionDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-40 overflow-y-auto">
                        {regions.map((region) => (
                          <button
                            key={region}
                            onClick={() => {
                              setSelectedRegion(region)
                              setSelectedTown(townsByRegion[region][0])
                              setShowRegionDropdown(false)
                            }}
                            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${selectedRegion === region ? "bg-orange-50 text-[#FF6900]" : ""
                              }`}
                          >
                            {region}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Town Selector */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowTownDropdown(!showTownDropdown)
                        setShowRegionDropdown(false)
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 border rounded text-sm hover:border-[#FF6900]"
                    >
                      <span className="flex items-center gap-2">
                        <Store className="h-4 w-4 text-[#FF6900]" />
                        {selectedTown}
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {showTownDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-40 overflow-y-auto">
                        {townsByRegion[selectedRegion].map((town) => (
                          <button
                            key={town}
                            onClick={() => {
                              setSelectedTown(town)
                              setShowTownDropdown(false)
                            }}
                            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${selectedTown === town ? "bg-orange-50 text-[#FF6900]" : ""
                              }`}
                          >
                            {town}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Delivery Options */}
                <div className="space-y-2">
                  <button
                    onClick={() => setDeliveryOption("home")}
                    className={`w-full p-3 border rounded flex items-start gap-3 transition ${deliveryOption === "home" ? "border-[#FF6900] bg-orange-50" : "hover:border-gray-300"
                      }`}
                  >
                    <Truck className="h-4 w-4 text-[#FF6900] mt-0.5" />
                    <div className="text-left">
                      <p className="font-medium text-sm">Home Delivery</p>
                      <p className="text-xs text-gray-500">Delivery by {selectedTown === "Accra" ? "Fynza" : "Courier"} · 1-9 days</p>
                      <p className="text-xs text-[#FF6900] font-medium">GHC 8.70</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setDeliveryOption("pickup")}
                    className={`w-full p-3 border rounded flex items-start gap-3 transition ${deliveryOption === "pickup" ? "border-[#FF6900] bg-orange-50" : "hover:border-gray-300"
                      }`}
                  >
                    <Store className="h-4 w-4 text-[#FF6900] mt-0.5" />
                    <div className="text-left">
                      <p className="font-medium text-sm">Pickup Station</p>
                      <p className="text-xs text-gray-500">Deliver to nearest pickup point · 2-5 days</p>
                      <p className="text-xs text-green-600 font-medium">FREE</p>
                    </div>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Return Policy */}
            <Card className="bg-white">
              <CardContent className="p-4">
                <h3 className="font-bold text-sm mb-3">RETURN POLICY</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <RotateCcw className="h-4 w-4 text-green-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-green-600">Free Return</p>
                      <p className="text-gray-500 text-xs">7 days return policy</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">Warranty</p>
                      <p className="text-gray-500 text-xs">1 Year Warranty</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seller Card */}
            <Card className="bg-white">
              <CardContent className="p-4">
                <h3 className="font-bold text-sm mb-3">SOLD BY</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold flex items-center gap-2">
                      {sellerInfo?.storeName || "BEKIA FASHION"}
                      {sellerInfo?.verified && (
                        <Shield className="h-4 w-4 text-green-600" />
                      )}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < Math.floor(sellerInfo?.rating || 4) ? "fill-[#FF6900] text-[#FF6900]" : "fill-gray-200 text-gray-200"}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">({sellerInfo?.positiveRate || 92}% positive)</span>
                    </div>
                  </div>
                  <Link href={`/store/${sellerInfo?.id || 'seller-123'}`}>
                    <Button variant="outline" className="w-full h-8 text-xs border-gray-200 hover:border-[#FF6900] hover:text-[#FF6900] bg-transparent">
                      Visit Store
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Seller Performance */}
            <Card className="bg-white">
              <CardContent className="p-4">
                <h3 className="font-bold text-sm mb-3">Seller Performance</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Order Fulfillment</span>
                    <span className="font-semibold text-green-600">★ {sellerInfo?.orderFulfillment || "Excellent"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Quality Score</span>
                    <span className="font-semibold text-green-600">★ {sellerInfo?.qualityScore || "Excellent"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Flash Sale Card with Timer */}
            {flashSale ? (
              <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-sm flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      FLASH SALE
                    </h3>
                    <Badge className="bg-white text-red-600 text-xs">
                      -{flashSale.discountPercent}% OFF
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mb-3 text-xs">
                    <Clock className="h-4 w-4" />
                    <span>Ends in:</span>
                    <div className="flex gap-1">
                      <span className="bg-red-800 px-2 py-1 rounded font-mono">
                        {String(timeLeft.hours).padStart(2, '0')}
                      </span>
                      <span>:</span>
                      <span className="bg-red-800 px-2 py-1 rounded font-mono">
                        {String(timeLeft.minutes).padStart(2, '0')}
                      </span>
                      <span>:</span>
                      <span className="bg-red-800 px-2 py-1 rounded font-mono">
                        {String(timeLeft.seconds).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs mb-2 opacity-90">Limited time offer!</p>
                  <Button variant="secondary" size="sm" className="w-full bg-white text-red-600 hover:bg-gray-100 text-xs">
                    Shop Now <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gradient-to-r from-[#FF6900] to-[#FF8C33] text-white">
                <CardContent className="p-4">
                  <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    FLASH SALE
                  </h3>
                  <p className="text-xs mb-2">Get 15% off on orders above GHC 100!</p>
                  <Button variant="secondary" size="sm" className="w-full bg-white text-[#FF6900] hover:bg-gray-100 text-xs">
                    Shop Now <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Active Promotions */}
            {promotions.length > 0 && (
              <Card className="bg-green-50 border border-green-200">
                <CardContent className="p-4">
                  <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-green-700">
                    <Gift className="h-4 w-4" />
                    Active Promotions
                  </h3>
                  <div className="space-y-2">
                    {promotions.map((promo) => (
                      <div key={promo.id} className="bg-white p-2 rounded border border-green-200">
                        <p className="font-semibold text-sm text-green-700">{promo.name}</p>
                        <p className="text-xs text-gray-500">{promo.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Product Details Section */}
        <Card className="bg-white">
          <CardContent className="p-4 md:p-6">
            <h2 className="font-bold text-lg mb-4">Product Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-sm text-gray-600 uppercase">Specifications</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-500">Brand</span>
                    <span className="font-medium">Bekia</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-500">Model</span>
                    <span className="font-medium">Women's Canvas Sneakers</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-500">Production Country</span>
                    <span className="font-medium">China</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-500">Size (L x W x H cm)</span>
                    <span className="font-medium">15 x 3 x 5</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-500">Weight (kg)</span>
                    <span className="font-medium">0.25</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-500">Color</span>
                    <span className="font-medium">Black/Multi</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-500">Main Material</span>
                    <span className="font-medium">Canvas</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-500">Shop Type</span>
                    <span className="font-medium">Fynza Mall</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-sm text-gray-600 uppercase">Key Features</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Casual shoes for wide or high-instep feet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Upper Material: Canvas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Insole Material: PU</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Lining Material: Mesh</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Outsole Material: Rubber</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Gender: Women</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Closure Type: Lace-Up</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Pattern Type: Patchwork</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reviews Section */}
        <Card className="bg-white">
          <CardContent className="p-4 md:p-6">
            <h2 className="font-bold text-lg mb-4">Verified Customer Feedback</h2>
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="text-center md:text-left">
                <div className="text-5xl font-bold text-[#FF6900] mb-2">3.5/5</div>
                <div className="flex items-center justify-center md:justify-start gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < 3 ? "fill-[#FF6900] text-[#FF6900]" : "fill-gray-200 text-gray-200"
                        }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600">138 verified ratings</p>
              </div>

              <div className="flex-1">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-3 mb-2">
                    <span className="text-sm w-4">{rating}</span>
                    <Star className="h-3 w-3 fill-[#FF6900] text-[#FF6900]" />
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#FF6900]"
                        style={{
                          width: `${rating === 5 ? "45%" : rating === 4 ? "30%" : rating === 3 ? "15%" : rating === 2 ? "7%" : "3%"}`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-8">
                      {rating === 5 ? "45%" : rating === 4 ? "30%" : rating === 3 ? "15%" : rating === 2 ? "7%" : "3%"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Review Cards */}
            <div className="border-t pt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-[#FF6900] text-[#FF6900]" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold">I like it</span>
                </div>
                <p className="text-sm text-gray-700">Easy and comfortable for wearing</p>
                <p className="text-xs text-gray-500">22-11-2025 by Felicia</p>
                <button className="text-xs text-green-600 flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Verified Purchase
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-[#FF6900] text-[#FF6900]" />
                    ))}
                    <Star className="h-3 w-3 fill-gray-200 text-gray-200" />
                  </div>
                  <span className="text-sm font-semibold">Good quality</span>
                </div>
                <p className="text-sm text-gray-700">Worth the price, material is good</p>
                <p className="text-xs text-gray-500">15-11-2025 by Sarah</p>
                <button className="text-xs text-green-600 flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Verified Purchase
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Promotional Banner */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-r from-[#1a1a1a] to-[#333] text-white">
            <CardContent className="p-4 text-center">
              <Truck className="h-8 w-8 mx-auto mb-2 text-[#FF6900]" />
              <h3 className="font-bold">Free Delivery</h3>
              <p className="text-xs text-gray-300">On orders above GHC 200</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-[#1a1a1a] to-[#333] text-white">
            <CardContent className="p-4 text-center">
              <RotateCcw className="h-8 w-8 mx-auto mb-2 text-[#FF6900]" />
              <h3 className="font-bold">Easy Returns</h3>
              <p className="text-xs text-gray-300">7-day return policy</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-[#1a1a1a] to-[#333] text-white">
            <CardContent className="p-4 text-center">
              <Shield className="h-8 w-8 mx-auto mb-2 text-[#FF6900]" />
              <h3 className="font-bold">Secure Payment</h3>
              <p className="text-xs text-gray-300">100% secure checkout</p>
            </CardContent>
          </Card>
        </div>

        {/* Related Products */}
        <RelatedProducts />

        {/* Recently Viewed */}
        <RecentlyViewed />
      </main>

      <Footer />
    </div>
  )
}
