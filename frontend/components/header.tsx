"use client"

import { Search, ShoppingCart, User, HelpCircle, ChevronDown, Menu, Heart, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"
import { MegaMenu } from "@/components/mega-menu"
import { SearchSuggestions } from "@/components/search-suggestions"
import { NotificationBell } from "@/components/notification-bell"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/cart-context"
import { useWishlist } from "@/components/wishlist-context"
import { useAuth } from "@/components/auth-context"

export function Header() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const router = useRouter()
  const { itemCount: cartCount } = useCart()
  const { itemCount: wishlistCount } = useWishlist()
  const { user, logout } = useAuth()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery("")
      setShowSuggestions(false)
    }
  }

  const handleSelectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion)
    router.push(`/search?q=${encodeURIComponent(suggestion)}`)
    setShowSuggestions(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm overflow-x-hidden">
      {/* Top Banner - Fynza Blue */}
      <div className="bg-primary text-white py-2 overflow-hidden">
        <div className="container mx-auto px-4 flex items-center justify-between min-w-0">
          <div className="flex items-center gap-4 whitespace-nowrap">
            <span className="text-sm font-semibold">NEW YEAR SALE</span>
            <div className="bg-secondary text-white px-3 py-0.5 rounded-full">
              <span className="font-bold text-sm">UP TO 60% OFF</span>
            </div>
          </div>
          <div className="flex items-center gap-4 whitespace-nowrap">
            <span className="text-sm font-semibold hidden sm:inline">CALL TO ORDER</span>
            <span className="text-lg font-bold">030 274 0642</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Categories Dropdown */}
            <div className="relative flex-shrink-0">
              <Button
                variant="ghost"
                className="flex items-center gap-2 font-semibold"
                onMouseEnter={() => setMegaMenuOpen(true)}
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
              >
                <Menu className="h-5 w-5" />
                <span className="hidden sm:inline">Categories</span>
              </Button>
            </div>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <span className="text-xl md:text-2xl font-bold text-orange-500">FYNZA</span>
            </Link>

            {/* Search */}
            <div className="flex-1 max-w-2xl relative">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" aria-hidden="true" />
                <Input
                  placeholder="Search products, brands and categories"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setShowSuggestions(true)
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  aria-label="Search products, brands and categories"
                  aria-autocomplete="list"
                  aria-controls="search-suggestions"
                  className="pl-10 pr-24 h-12 border-2 border-border focus:border-primary focus:outline-none transition-colors w-full"
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={!searchQuery.trim()}
                  className="absolute right-0 top-0 h-12 rounded-l-none bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-colors"
                  aria-label={`Search for "${searchQuery}"`}
                >
                  Search
                </Button>
              </form>
              <SearchSuggestions
                query={searchQuery}
                onSelectSuggestion={handleSelectSuggestion}
                isOpen={showSuggestions}
              />
            </div>

            {/* Account */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <span>{user.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <div className="p-4 border-b">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link href="/account-settings">
                      <User className="mr-2 h-4 w-4" />
                      My Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/my-orders">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/wishlist">
                      <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                      </svg>
                      Wishlist
                    </Link>
                  </DropdownMenuItem>
                  <div className="p-2">
                    <Button
                      variant="outline"
                      className="w-full border-red-500 text-red-500 hover:bg-red-50"
                      onClick={logout}
                    >
                      Logout
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <span>Account</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <div className="p-4">
                    <Link href="/login">
                      <Button className="w-full bg-primary hover:bg-primary-dark text-white font-semibold">
                        Sign In
                      </Button>
                    </Link>
                  </div>
                  <div className="px-4 pb-4 text-center">
                    <span className="text-sm text-muted-foreground">Don't have an account? </span>
                    <Link href="/signup" className="text-primary hover:underline text-sm">
                      Sign Up
                    </Link>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link href="/account-settings">
                      <User className="mr-2 h-4 w-4" />
                      My Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/my-orders">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/wishlist">
                      <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                      </svg>
                      Wishlist
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Support */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  <span>Support</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/help">Help Center</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/help/place-order">Place an Order</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/help/track-order">Track Your Order</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/help/cancel-order">Cancel an Order</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Wishlist */}
            <Link href="/wishlist">
              <Button variant="ghost" className="flex items-center gap-2 relative">
                <Heart className="h-5 w-5" />
                <span className="hidden sm:inline">Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Notifications */}
            <NotificationBell />

            {/* Theme Toggle */}

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" className="flex items-center gap-2 relative">
                <ShoppingCart className="h-5 w-5" />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {megaMenuOpen && (
          <MegaMenu
            onClose={() => setMegaMenuOpen(false)}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        )}
      </div>
    </header>
  )
}
