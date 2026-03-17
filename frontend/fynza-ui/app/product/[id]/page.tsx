'use client'

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RelatedProducts } from "@/components/related-products"
import { RecentlyViewed } from "@/components/recently-viewed"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Heart, Share2, Truck, RotateCcw, Shield, Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ProductPage() {
  const router = useRouter()
  const [selectedSize, setSelectedSize] = useState("38")
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    // Add to cart logic
    console.log("[v0] Product added to cart:", { selectedSize, quantity })
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
    <div className="min-h-screen bg-muted">
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-primary font-medium transition">
            Home
          </Link>
          <span>&gt;</span>
          <Link href="/category/fashion" className="hover:text-primary font-medium transition">
            Fashion
          </Link>
          <span>&gt;</span>
          <Link href="/category/womens-fashion" className="hover:text-[#FF6700]">
            Women's Fashion
          </Link>
          <span>&gt;</span>
          <span className="text-gray-900">Shop Bekia BEKIA Women's Lace Up Canvas Sports Shoes</span>
        </nav>

        <div className="grid lg:grid-cols-[1fr_400px] gap-6">
          {/* Main Content */}
          <div className="space-y-4">
            {/* Product Images and Details */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-[300px_1fr] gap-6">
                  {/* Image Gallery */}
                  <div>
                    <div className="relative aspect-square mb-4 bg-gray-100 rounded overflow-hidden">
                      <Image src="/colorful-bekia-sneakers.jpg" alt="Product" fill className="object-cover" />
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className="relative aspect-square bg-gray-100 rounded overflow-hidden cursor-pointer border-2 border-transparent hover:border-[#FF6700]"
                        >
                          <Image
                            src="/colorful-bekia-sneakers.jpg"
                            alt={`Thumbnail ${i}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4 bg-transparent" variant="outline">
                      <Heart className="mr-2 h-4 w-4" />
                      SAVE FOR LATER
                    </Button>
                    <Button className="w-full mt-2 bg-transparent" variant="outline">
                      <Share2 className="mr-2 h-4 w-4" />
                      SHARE THIS PRODUCT
                    </Button>
                  </div>

                  {/* Product Info */}
                  <div>
                    <h1 className="text-2xl font-bold mb-3">
                      Shop Bekia BEKIA Women's Lace Up Canvas Sports Shoes classical sneakers - Black
                    </h1>
                    <div className="mb-4">
                      <span className="text-sm text-gray-600">Brand: </span>
                      <Link href="/brand/bekia" className="text-[#FF6700] hover:underline">
                        Bekia
                      </Link>
                      <span className="mx-2">|</span>
                      <Link href="#reviews" className="text-[#FF6700] hover:underline text-sm">
                        138 ratings
                      </Link>
                    </div>

                    <div className="border-t border-b py-4 mb-4">
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="text-3xl font-bold">GHC 59.00 - GHC 62.72</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 line-through">GHC 88.48 - GHC 99.68</span>
                        <span className="bg-[#FFE5D9] text-[#FF6700] px-2 py-1 rounded text-sm font-semibold">
                          Save -15% - -18%
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">+ shipping from GHC 8.70 to Accra</p>
                    </div>

                    {/* Promotions */}
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2 text-sm">PROMOTIONS</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <span className="text-green-600">✓</span>
                          <span>
                            Enjoy cheaper delivery when you select a Pickup Station at checkout (see discount at
                            checkout)
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-600">✓</span>
                          <span>Free delivery on orders above GH₵ 200</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-600">✓</span>
                          <span>Free and easy return on eligible orders</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-600">✓</span>
                          <span>Need help with this product? Call our customer service on 0302740642</span>
                        </div>
                      </div>
                    </div>

                    {/* Variations */}
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">Size</h3>
                      <div className="flex flex-wrap gap-2">
                        {["36", "37", "38", "39", "40", "41"].map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-4 py-2 border rounded transition ${
                              selectedSize === size
                                ? "border-primary text-white bg-primary"
                                : "border-border hover:border-primary hover:text-primary"
                            }`}
                            aria-pressed={selectedSize === size}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="mb-6">
                      <h3 className="font-semibold mb-2">Quantity</h3>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-10 h-10 border rounded flex items-center justify-center hover:bg-gray-50"
                        >
                          -
                        </button>
                        <span className="w-16 h-10 border rounded flex items-center justify-center font-semibold">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-10 h-10 border rounded flex items-center justify-center hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={handleAddToCart}
                        className={`flex-1 h-12 text-white text-lg font-semibold transition ${
                          isAdded
                            ? "bg-green-600 hover:bg-green-600"
                            : "bg-secondary hover:bg-secondary-dark"
                        }`}
                        aria-label={isAdded ? "Added to cart" : "Add to cart"}
                      >
                        {isAdded ? (
                          <span className="flex items-center gap-2">
                            <Check className="h-5 w-5" />
                            ADDED TO CART
                          </span>
                        ) : (
                          "ADD TO CART"
                        )}
                      </Button>
                      <Button
                        onClick={handleBuyNow}
                        className="flex-1 h-12 border-2 border-primary text-white bg-primary text-lg font-semibold hover:bg-primary-dark transition"
                        aria-label="Buy now"
                      >
                        BUY NOW
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <h2 className="font-bold text-lg mb-4">Product details</h2>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-[150px_1fr]">
                    <span className="text-gray-600">Brand</span>
                    <span className="font-medium">Bekia</span>
                  </div>
                  <div className="grid grid-cols-[150px_1fr]">
                    <span className="text-gray-600">Model</span>
                    <span className="font-medium">Women's Canvas Sneakers</span>
                  </div>
                  <div className="grid grid-cols-[150px_1fr]">
                    <span className="text-gray-600">Production Country</span>
                    <span className="font-medium">China</span>
                  </div>
                  <div className="grid grid-cols-[150px_1fr]">
                    <span className="text-gray-600">Size (L x W x H cm)</span>
                    <span className="font-medium">15 x 3 x 5</span>
                  </div>
                  <div className="grid grid-cols-[150px_1fr]">
                    <span className="text-gray-600">Weight (kg)</span>
                    <span className="font-medium">0.25</span>
                  </div>
                  <div className="grid grid-cols-[150px_1fr]">
                    <span className="text-gray-600">Color</span>
                    <span className="font-medium">Multi-color</span>
                  </div>
                  <div className="grid grid-cols-[150px_1fr]">
                    <span className="text-gray-600">Main Material</span>
                    <span className="font-medium">Canvas</span>
                  </div>
                  <div className="grid grid-cols-[150px_1fr]">
                    <span className="text-gray-600">Shop Type</span>
                    <span className="font-medium">Fynza Mall</span>
                  </div>
                </div>

                <h3 className="font-bold mt-6 mb-3">Specifications</h3>
                <div className="space-y-2 text-sm">
                  <h4 className="font-semibold">KEY FEATURES</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Type:Casual shoes for wide or high-level we should be</li>
                    <li>Upper Material:Canvas</li>
                    <li>Insole Material:PU</li>
                    <li>Lining Material:Mesh</li>
                    <li>Outsole Material:Rubber</li>
                    <li>Gender:Women</li>
                    <li>Closure Type:Lace-Up</li>
                    <li>Size charts:Measurement chart shows the standard china shoe size</li>
                    <li>Pattern Type:Patchwork</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <h2 className="font-bold text-lg mb-4">Verified Customer Feedback</h2>
                <div className="flex items-start gap-8 mb-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-[#FF6700] mb-2">3.5/5</div>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < 3 ? "fill-[#FF6700] text-[#FF6700]" : "fill-gray-200 text-gray-200"
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
                        <Star className="h-3 w-3 fill-[#FF6700] text-[#FF6700]" />
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#FF6700]"
                            style={{
                              width: `${rating === 5 ? "45%" : rating === 4 ? "30%" : rating === 3 ? "15%" : rating === 2 ? "7%" : "3%"}`,
                            }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-8">
                          {rating === 5
                            ? "45%"
                            : rating === 4
                              ? "30%"
                              : rating === 3
                                ? "15%"
                                : rating === 2
                                  ? "7%"
                                  : "3%"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-[#FF6700] text-[#FF6700]" />
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
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Delivery & Returns */}
            <Card className="bg-white">
              <CardContent className="p-4">
                <h3 className="font-bold mb-4">DELIVERY & RETURNS</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      Delivery
                    </h4>
                    <p className="text-gray-600 mb-2">Estimated delivery time 1-9 business days</p>
                    <p className="text-xs text-gray-500">For Same-Day-Delivery: Please place your order before 11AM</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Next-Day-Delivery: Orders placed after 11AM will be delivered the next day
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Note: Availability may vary by location</p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <RotateCcw className="h-4 w-4" />
                      Return Policy
                    </h4>
                    <p className="text-gray-600">Free return within 7 days for ALL eligible items</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seller Information */}
            <Card className="bg-white">
              <CardContent className="p-4">
                <h3 className="font-bold mb-4">SELLER INFORMATION</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold">BEKIA FASHION</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-[#FF6700] text-[#FF6700]" />
                        ))}
                      </div>
                      <span className="text-sm">(92% Seller Score)</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Seller Performance */}
            <Card className="bg-white">
              <CardContent className="p-4">
                <h3 className="font-bold mb-4">Seller Performance</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Fulfillment Rate:</span>
                    <span className="font-semibold text-green-600">Excellent</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quality Score:</span>
                    <span className="font-semibold text-green-600">Excellent</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Customer Rating:</span>
                    <span className="font-semibold text-green-600">Excellent</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
