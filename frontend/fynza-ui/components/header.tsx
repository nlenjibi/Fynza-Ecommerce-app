"use client"

import { Search, ShoppingCart, User, HelpCircle, ChevronDown, Menu, Moon, Sun, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"
import { MegaMenu } from "@/components/mega-menu"
import { useState } from "react"
import { useTheme } from "next-themes"

export function Header() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top Banner - Fynza Blue */}
      <div className="bg-primary text-white py-3">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-sm md:text-base font-semibold">NEW YEAR SALE</span>
            <div className="bg-secondary text-white px-4 py-1 rounded-full">
              <span className="font-bold">UP TO 60% OFF</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm md:text-base font-semibold">CALL TO ORDER</span>
            <span className="text-lg font-bold">030 274 0642</span>
            <Button size="sm" className="bg-secondary hover:bg-secondary-dark text-white font-semibold">
              SHOP NOW
            </Button>
          </div>
        </div>
      </div>

      {/* Secondary Bar */}
      <div className="bg-muted py-2 border-b border-border">
        <div className="container mx-auto px-4 flex items-center justify-between text-sm">
          <Link href="/sell" className="flex items-center gap-1 text-primary hover:text-primary-dark font-medium transition">
            <span>🏪</span>
            <span>Sell on Fynza</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-primary hover:text-primary-dark transition">
              FYNZA
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition">
              FYNZA PAY
            </Link>
            <Link href="/delivery" className="text-muted-foreground hover:text-foreground transition">
              DELIVERY
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-6">
            {/* Menu button for mega menu */}
            <Button
              variant="ghost"
              size="icon"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onClick={() => setMegaMenuOpen(!megaMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/chatgpt-20image-20jan-206-2c-202026-2c-2006-16-48-20pm.png"
                alt="Fynza"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>

            {/* Search */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search products, brands and categories" className="pl-10 pr-4 h-12 border-2 border-border focus:border-primary" />
                <Button
                  size="lg"
                  className="absolute right-0 top-0 h-12 rounded-l-none bg-primary hover:bg-primary-dark text-white font-semibold"
                >
                  Search
                </Button>
              </div>
            </div>

            {/* Account */}
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
                  <Button className="w-full bg-primary hover:bg-primary-dark text-white font-semibold">Sign In</Button>
                </div>
                <DropdownMenuItem asChild>
                  <Link href="/account">
                    <User className="mr-2 h-4 w-4" />
                    My Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders">
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

            {/* Help */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  <span>Help</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/help">Help Center</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Place an Order</DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/track-order">Track Your Order</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Cancel an Order</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Wishlist */}
            <Link href="/wishlist">
              <Button variant="ghost" className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                <span className="hidden sm:inline">Wishlist</span>
              </Button>
            </Link>

            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme} title="Toggle theme" aria-label="Toggle dark mode">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                <span>Cart</span>
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
