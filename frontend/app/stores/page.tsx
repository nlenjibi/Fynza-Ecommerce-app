'use client'

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Store, 
  MapPin, 
  Star, 
  Package, 
  Users,
  Verified,
  Grid,
  List,
  Filter,
  ChevronDown,
  SlidersHorizontal
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Store {
  id: string
  storeName: string
  logo?: string
  banner?: string
  description: string
  verified: boolean
  rating: number
  totalReviews: number
  positiveRate: number
  totalProducts: number
  totalOrders: number
  location: string
  followers: number
  isFollowing?: boolean
}

export default function StoresPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("popularity")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState("all")

  const [stores, setStores] = useState<Store[]>([
    {
      id: "seller-1",
      storeName: "BEKIA FASHION",
      verified: true,
      rating: 4.5,
      totalReviews: 328,
      positiveRate: 92,
      totalProducts: 156,
      totalOrders: 2450,
      location: "Accra, Ghana",
      followers: 1245,
      description: "Premium fashion store offering the latest trends in footwear and apparel."
    },
    {
      id: "seller-2",
      storeName: "TechZone Ghana",
      verified: true,
      rating: 4.8,
      totalReviews: 512,
      positiveRate: 96,
      totalProducts: 89,
      totalOrders: 1890,
      location: "Kumasi, Ghana",
      followers: 892,
      description: "Your one-stop shop for electronics, gadgets, and accessories."
    },
    {
      id: "seller-3",
      storeName: "Fashion Hub",
      verified: false,
      rating: 4.2,
      totalReviews: 156,
      positiveRate: 85,
      totalProducts: 234,
      totalOrders: 980,
      location: "Takoradi, Ghana",
      followers: 456,
      description: "Trendy clothing and accessories for the modern shopper."
    },
    {
      id: "seller-4",
      storeName: "Baby Essentials",
      verified: true,
      rating: 4.7,
      totalReviews: 289,
      positiveRate: 94,
      totalProducts: 178,
      totalOrders: 1567,
      location: "Accra, Ghana",
      followers: 678,
      description: "Quality baby products, toys, and essentials."
    },
    {
      id: "seller-5",
      storeName: "Home Decor Plus",
      verified: true,
      rating: 4.4,
      totalReviews: 198,
      positiveRate: 88,
      totalProducts: 145,
      totalOrders: 780,
      location: "Cape Coast, Ghana",
      followers: 345,
      description: "Beautiful home decor, furniture, and interior accessories."
    },
    {
      id: "seller-6",
      storeName: "Sports World",
      verified: false,
      rating: 4.1,
      totalReviews: 124,
      positiveRate: 82,
      totalProducts: 267,
      totalOrders: 560,
      location: "Tema, Ghana",
      followers: 234,
      description: "Sports equipment, fitness gear, and athletic wear."
    },
    {
      id: "seller-7",
      storeName: "Beauty Palace",
      verified: true,
      rating: 4.6,
      totalReviews: 342,
      positiveRate: 91,
      totalProducts: 198,
      totalOrders: 2100,
      location: "Accra, Ghana",
      followers: 1567,
      description: "Premium cosmetics, skincare, and beauty products."
    },
    {
      id: "seller-8",
      storeName: "Grocery Mart",
      verified: true,
      rating: 4.3,
      totalReviews: 567,
      positiveRate: 89,
      totalProducts: 520,
      totalOrders: 4500,
      location: "Kumasi, Ghana",
      followers: 2340,
      description: "Fresh groceries, household essentials, and daily needs."
    },
  ])

  const regions = ["all", "Greater Accra", "Ashanti", "Western", "Central", "Eastern", "Volta", "Northern"]

  const filteredStores = stores
    .filter(store => 
      store.storeName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedRegion === "all" || store.location.includes(selectedRegion))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "popularity": return b.followers - a.followers
        case "rating": return b.rating - a.rating
        case "products": return b.totalProducts - a.totalProducts
        case "newest": return 0
        default: return 0
      }
    })

  const handleFollow = (storeId: string) => {
    setStores(stores.map(store => 
      store.id === storeId 
        ? { ...store, isFollowing: !store.isFollowing, followers: store.isFollowing ? store.followers - 1 : store.followers + 1 }
        : store
    ))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Stores</h1>
          <p className="text-gray-600">Discover and follow your favorite stores</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search stores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Region Filter */}
            <div className="relative">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="h-10 px-4 pr-10 border rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {regions.map(region => (
                  <option key={region} value={region}>
                    {region === "all" ? "All Regions" : region}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 px-4 pr-10 border rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="popularity">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="products">Most Products</option>
                <option value="newest">Newest</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            {/* View Toggle */}
            <div className="flex border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${viewMode === "grid" ? "bg-orange-500 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${viewMode === "list" ? "bg-orange-500 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedRegion !== "all" || searchQuery) && (
            <div className="flex gap-2 mt-4 pt-4 border-t">
              {selectedRegion !== "all" && (
                <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200">
                  Region: {selectedRegion} ×
                </Badge>
              )}
              {searchQuery && (
                <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-200">
                  Search: {searchQuery} ×
                </Badge>
              )}
              <Button 
                variant="link" 
                size="sm" 
                className="text-orange-500 h-auto p-0"
                onClick={() => { setSearchQuery(""); setSelectedRegion("all"); }}
              >
                Clear all
              </Button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600">
          {filteredStores.length} store{filteredStores.length !== 1 ? "s" : ""} found
        </div>

        {/* Stores Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStores.map((store) => (
              <Card key={store.id} className="bg-white hover:shadow-lg transition-shadow overflow-hidden">
                {/* Banner */}
                <div className="h-24 bg-gradient-to-r from-orange-400 to-orange-600 relative">
                  {store.banner && (
                    <Image src={store.banner} alt="" fill className="object-cover" />
                  )}
                </div>
                
                <CardContent className="p-4">
                  {/* Logo & Name */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center -mt-8 relative border-4 border-white shadow">
                      {store.logo ? (
                        <Image src={store.logo} alt={store.storeName} fill className="object-contain p-1" />
                      ) : (
                        <Store className="h-6 w-6 text-orange-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate flex items-center gap-1">
                        {store.storeName}
                        {store.verified && <Verified className="h-4 w-4 text-blue-500 flex-shrink-0" />}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin className="h-3 w-3" />
                        {store.location}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{store.description}</p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{store.rating}</span>
                      <span>({store.totalReviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Package className="h-3 w-3" />
                      {store.totalProducts} products
                    </div>
                  </div>

                  {/* Followers */}
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                    <Users className="h-3 w-3" />
                    {store.followers.toLocaleString()} followers
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link href={`/store/${store.id}`} className="flex-1">
                      <Button variant="outline" className="w-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                        Visit Store
                      </Button>
                    </Link>
                    <Button
                      variant={store.isFollowing ? "secondary" : "default"}
                      className={store.isFollowing ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-orange-500 hover:bg-orange-600"}
                      onClick={() => handleFollow(store.id)}
                    >
                      {store.isFollowing ? "Following" : "Follow"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredStores.map((store) => (
              <Card key={store.id} className="bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Logo */}
                    <div className="w-20 h-20 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {store.logo ? (
                        <Image src={store.logo} alt={store.storeName} width={80} height={80} className="object-contain" />
                      ) : (
                        <Store className="h-8 w-8 text-orange-600" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-1">
                          {store.storeName}
                          {store.verified && <Verified className="h-4 w-4 text-blue-500" />}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{store.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {store.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {store.rating} ({store.totalReviews} reviews)
                        </div>
                        <div className="flex items-center gap-1">
                          <Package className="h-4 w-4" />
                          {store.totalProducts} products
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {store.followers.toLocaleString()} followers
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 flex-shrink-0">
                      <Link href={`/store/${store.id}`}>
                        <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                          Visit Store
                        </Button>
                      </Link>
                      <Button
                        variant={store.isFollowing ? "secondary" : "default"}
                        className={store.isFollowing ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-orange-500 hover:bg-orange-600"}
                        onClick={() => handleFollow(store.id)}
                      >
                        {store.isFollowing ? "Following" : "Follow"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredStores.length === 0 && (
          <div className="text-center py-16">
            <Store className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No stores found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || selectedRegion !== "all" 
                ? "Try adjusting your search or filters" 
                : "No stores available yet"}
            </p>
            {(searchQuery || selectedRegion !== "all") && (
              <Button 
                onClick={() => { setSearchQuery(""); setSelectedRegion("all"); }}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
