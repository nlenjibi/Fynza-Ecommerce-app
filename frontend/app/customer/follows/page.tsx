'use client'

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CustomerSidebar } from "@/components/customer/customer-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Store, MapPin, Star, MessageCircle, UserCheck, UserPlus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface FollowedStore {
  id: string
  storeName: string
  logo?: string
  banner?: string
  verified: boolean
  rating: number
  totalReviews: number
  location: string
  totalProducts: number
  followedDate: string
}

export default function CustomerFollowsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [followedStores, setFollowedStores] = useState<FollowedStore[]>([
    {
      id: "seller-123",
      storeName: "BEKIA FASHION",
      verified: true,
      rating: 4.5,
      totalReviews: 328,
      location: "Accra, Ghana",
      totalProducts: 156,
      followedDate: "2024-01-15"
    },
    {
      id: "seller-456",
      storeName: "TechZone Ghana",
      verified: true,
      rating: 4.8,
      totalReviews: 512,
      location: "Kumasi, Ghana",
      totalProducts: 89,
      followedDate: "2024-02-20"
    },
    {
      id: "seller-789",
      storeName: "Fashion Hub",
      verified: false,
      rating: 4.2,
      totalReviews: 156,
      location: "Takoradi, Ghana",
      totalProducts: 234,
      followedDate: "2024-03-10"
    },
  ])

  const filteredStores = followedStores.filter(store =>
    store.storeName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleUnfollow = (storeId: string) => {
    setFollowedStores(followedStores.filter(s => s.id !== storeId))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        <CustomerSidebar />

        <main className="flex-1">
          <div className="max-w-6xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Following</h1>
                <p className="text-gray-600 mt-1">
                  Stores you follow ({followedStores.length})
                </p>
              </div>
              
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search followed stores..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Followed Stores Grid */}
            {filteredStores.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStores.map((store) => (
                  <Card key={store.id} className="bg-white hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      {/* Store Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                          {store.logo ? (
                            <Image
                              src={store.logo}
                              alt={store.storeName}
                              width={64}
                              height={64}
                              className="object-cover"
                            />
                          ) : (
                            <Store className="h-8 w-8 text-orange-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900 truncate">
                              {store.storeName}
                            </h3>
                            {store.verified && (
                              <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{store.rating}</span>
                            <span className="text-xs text-gray-500">({store.totalReviews} reviews)</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                            <MapPin className="h-3 w-3" />
                            {store.location}
                          </div>
                        </div>
                      </div>

                      {/* Store Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4 pb-4 border-b">
                        <span>{store.totalProducts} products</span>
                        <span>Following since {new Date(store.followedDate).toLocaleDateString()}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Link href={`/store/${store.id}`} className="flex-1">
                          <Button variant="outline" className="w-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                            Visit Store
                          </Button>
                        </Link>
                        <Link href={`/customer/messages?chat=${store.id}`} className="flex-1">
                          <Button className="w-full bg-orange-500 hover:bg-orange-600">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Chat
                          </Button>
                        </Link>
                      </div>
                      <Button 
                        variant="ghost" 
                        className="w-full mt-2 text-gray-500 hover:text-red-500"
                        onClick={() => handleUnfollow(store.id)}
                      >
                        <UserCheck className="h-4 w-4 mr-2" />
                        Unfollow
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Store className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {searchQuery ? "No stores found" : "Not following any stores yet"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery 
                    ? "Try searching with a different name" 
                    : "Start following stores to get updates on their latest products and promotions"}
                </p>
                <Link href="/">
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Explore Stores
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
