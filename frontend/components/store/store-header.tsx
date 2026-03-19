'use client'

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, MapPin, Shield, Clock, ThumbsUp, ShoppingBag, MessageCircle, Facebook, Instagram, Twitter, ExternalLink, UserPlus, UserCheck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

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
  responseRate: number
  responseTime: string
  joinedDate: string
  totalProducts: number
  totalOrders: number
  location: string
  socialLinks?: {
    facebook?: string
    instagram?: string
    twitter?: string
  }
  followerCount?: number
  isFollowing?: boolean
}

interface StoreHeaderProps {
  store: Store
}

export function StoreHeader({ store }: StoreHeaderProps) {
  const router = useRouter()
  const [isFollowing, setIsFollowing] = useState(store.isFollowing || false)
  const [followerCount, setFollowerCount] = useState(store.followerCount || 156)

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    setFollowerCount(isFollowing ? followerCount - 1 : followerCount + 1)
  }

  const handleChat = () => {
    router.push(`/customer/messages?chat=${store.id}`)
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      {/* Banner */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-[#FF6900] to-[#FF8C33]">
        {store.banner && (
          <Image
            src={store.banner}
            alt="Store Banner"
            fill
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Store Info */}
      <CardContent className="p-4 md:p-6 -mt-16 relative">
        <div className="flex flex-col md:flex-row gap-4 md:items-end">
          {/* Logo */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 bg-white rounded-lg shadow-lg border-4 border-white flex items-center justify-center">
            {store.logo ? (
              <Image
                src={store.logo}
                alt={store.storeName}
                fill
                className="object-contain p-2"
              />
            ) : (
              <div className="w-20 h-20 bg-[#FF6900] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {store.storeName.charAt(0)}
              </div>
            )}
            {store.verified && (
              <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1 rounded-full">
                <Shield className="h-4 w-4" />
              </div>
            )}
          </div>

          {/* Store Details */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  {store.storeName}
                  {store.verified && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </h1>
                <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                  <MapPin className="h-4 w-4" />
                  {store.location} · Joined {new Date(store.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(store.rating) ? "fill-[#FF6900] text-[#FF6900]" : "fill-gray-200 text-gray-200"}`}
                    />
                  ))}
                  <span className="font-bold ml-1">{store.rating}</span>
                  <span className="text-gray-500">({store.totalReviews} reviews)</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm">
                <ThumbsUp className="h-4 w-4 text-green-600" />
                <span className="text-gray-600">Positive:</span>
                <span className="font-semibold">{store.positiveRate}%</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MessageCircle className="h-4 w-4 text-blue-600" />
                <span className="text-gray-600">Response Rate:</span>
                <span className="font-semibold">{store.responseRate}%</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-orange-600" />
                <span className="text-gray-600">Response Time:</span>
                <span className="font-semibold">{store.responseTime}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <ShoppingBag className="h-4 w-4 text-purple-600" />
                <span className="text-gray-600">Total Orders:</span>
                <span className="font-semibold">{store.totalOrders.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button 
              className="bg-[#FF6900] hover:bg-[#E55F00]"
              onClick={handleChat}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat
            </Button>
            <Button 
              variant={isFollowing ? "secondary" : "outline"} 
              className={`${isFollowing ? "bg-green-100 text-green-700 border-green-300 hover:bg-green-200" : "border-[#FF6900] text-[#FF6900] hover:bg-[#FF6900] hover:text-white"}`}
              onClick={handleFollow}
            >
              {isFollowing ? (
                <>
                  <UserCheck className="h-4 w-4 mr-2" />
                  Following
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Follow
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Followers Count */}
        {isFollowing && (
          <div className="mt-3 text-sm text-green-600 flex items-center gap-1">
            <UserCheck className="h-4 w-4" />
            You're following this store · {followerCount.toLocaleString()} followers
          </div>
        )}

        {/* Social Links */}
        {store.socialLinks && (
          <div className="flex gap-3 mt-4 pt-4 border-t">
            {store.socialLinks.facebook && (
              <Link href={store.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-blue-600 hover:bg-blue-50">
                  <Facebook className="h-5 w-5" />
                </Button>
              </Link>
            )}
            {store.socialLinks.instagram && (
              <Link href={store.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-pink-600 hover:bg-pink-50">
                  <Instagram className="h-5 w-5" />
                </Button>
              </Link>
            )}
            {store.socialLinks.twitter && (
              <Link href={store.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-blue-400 hover:bg-blue-50">
                  <Twitter className="h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
        )}
      </CardContent>
    </div>
  )
}
