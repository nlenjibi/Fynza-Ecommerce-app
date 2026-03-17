"use client"

import { Search, ShoppingCart, User, HelpCircle, ChevronDown, Menu, Heart, Bell, Smartphone, ShoppingBag, Home, Laptop, Shirt, Dumbbell, Baby, Gamepad2, Tv, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
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
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-6">
            {/* Categories Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => {
                setMegaMenuOpen(false)
                setActiveCategory(null)
              }}
            >
              <Button variant="outline" className="flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold">
                <Menu className="h-5 w-5" />
                <span className="hidden md:inline">Categories</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
              
              {megaMenuOpen && (
                <div className="absolute left-0 top-full mt-1 bg-white border shadow-xl z-50 flex" style={{ minWidth: '600px' }}>
                  {/* Categories Sidebar */}
                  <div className="w-56 border-r py-2 bg-white">
                    <div 
                      className={`flex items-center gap-3 px-4 py-2.5 hover:bg-muted cursor-pointer ${activeCategory === 'supermarket' ? 'bg-muted' : ''}`}
                      onMouseEnter={() => setActiveCategory('supermarket')}
                    >
                      <ShoppingBag className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Supermarket</span>
                    </div>
                    <div 
                      className={`flex items-center gap-3 px-4 py-2.5 hover:bg-muted cursor-pointer ${activeCategory === 'phones' ? 'bg-muted' : ''}`}
                      onMouseEnter={() => setActiveCategory('phones')}
                    >
                      <Smartphone className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Phones & Tablets</span>
                    </div>
                    <div 
                      className={`flex items-center gap-3 px-4 py-2.5 hover:bg-muted cursor-pointer ${activeCategory === 'health' ? 'bg-muted' : ''}`}
                      onMouseEnter={() => setActiveCategory('health')}
                    >
                      <Heart className="h-4 w-4 text-pink-600" />
                      <span className="text-sm">Health & Beauty</span>
                    </div>
                    <div 
                      className={`flex items-center gap-3 px-4 py-2.5 hover:bg-muted cursor-pointer ${activeCategory === 'home' ? 'bg-muted' : ''}`}
                      onMouseEnter={() => setActiveCategory('home')}
                    >
                      <Home className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm">Home & Office</span>
                    </div>
                    <div 
                      className={`flex items-center gap-3 px-4 py-2.5 hover:bg-muted cursor-pointer ${activeCategory === 'appliances' ? 'bg-muted' : ''}`}
                      onMouseEnter={() => setActiveCategory('appliances')}
                    >
                      <Package className="h-4 w-4 text-orange-600" />
                      <span className="text-sm">Appliances</span>
                    </div>
                    <div 
                      className={`flex items-center gap-3 px-4 py-2.5 hover:bg-muted cursor-pointer ${activeCategory === 'electronics' ? 'bg-muted' : ''}`}
                      onMouseEnter={() => setActiveCategory('electronics')}
                    >
                      <Tv className="h-4 w-4 text-purple-600" />
                      <span className="text-sm">Electronics</span>
                    </div>
                    <div 
                      className={`flex items-center gap-3 px-4 py-2.5 hover:bg-muted cursor-pointer ${activeCategory === 'computing' ? 'bg-muted' : ''}`}
                      onMouseEnter={() => setActiveCategory('computing')}
                    >
                      <Laptop className="h-4 w-4 text-indigo-600" />
                      <span className="text-sm">Computing</span>
                    </div>
                    <div 
                      className={`flex items-center gap-3 px-4 py-2.5 hover:bg-muted cursor-pointer ${activeCategory === 'fashion' ? 'bg-muted' : ''}`}
                      onMouseEnter={() => setActiveCategory('fashion')}
                    >
                      <Shirt className="h-4 w-4 text-red-600" />
                      <span className="text-sm">Fashion</span>
                    </div>
                    <div 
                      className={`flex items-center gap-3 px-4 py-2.5 hover:bg-muted cursor-pointer ${activeCategory === 'sporting' ? 'bg-muted' : ''}`}
                      onMouseEnter={() => setActiveCategory('sporting')}
                    >
                      <Dumbbell className="h-4 w-4 text-teal-600" />
                      <span className="text-sm">Sporting Goods</span>
                    </div>
                    <div 
                      className={`flex items-center gap-3 px-4 py-2.5 hover:bg-muted cursor-pointer ${activeCategory === 'baby' ? 'bg-muted' : ''}`}
                      onMouseEnter={() => setActiveCategory('baby')}
                    >
                      <Baby className="h-4 w-4 text-cyan-600" />
                      <span className="text-sm">Baby Products</span>
                    </div>
                    <div 
                      className={`flex items-center gap-3 px-4 py-2.5 hover:bg-muted cursor-pointer ${activeCategory === 'gaming' ? 'bg-muted' : ''}`}
                      onMouseEnter={() => setActiveCategory('gaming')}
                    >
                      <Gamepad2 className="h-4 w-4 text-violet-600" />
                      <span className="text-sm">Gaming</span>
                    </div>
                  </div>

                  {/* Subcategories Panel */}
                  <div className="flex-1 py-3 px-4 bg-white min-h-[300px]">
                    {activeCategory === 'phones' && (
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        <div>
                          <h4 className="font-semibold text-sm mb-2 text-primary">MOBILE PHONES</h4>
                          <ul className="space-y-1">
                            <li><Link href="/category/smartphones" className="text-sm text-muted-foreground hover:text-primary">Smartphones</Link></li>
                            <li><Link href="/category/android-phones" className="text-sm text-muted-foreground hover:text-primary">Android Phones</Link></li>
                            <li><Link href="/category/ios-phones" className="text-sm text-muted-foreground hover:text-primary">iOS Phones</Link></li>
                            <li><Link href="/category/5g-phones" className="text-sm text-muted-foreground hover:text-primary">5G Phones</Link></li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2 text-primary">TABLETS</h4>
                          <ul className="space-y-1">
                            <li><Link href="/category/tablets" className="text-sm text-muted-foreground hover:text-primary">Tablets</Link></li>
                            <li><Link href="/category/kids-tablets" className="text-sm text-muted-foreground hover:text-primary">Kids Tablets</Link></li>
                            <li><Link href="/category/samsung-tablets" className="text-sm text-muted-foreground hover:text-primary">Samsung Tablets</Link></li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2 text-primary">ACCESSORIES</h4>
                          <ul className="space-y-1">
                            <li><Link href="/category/phone-cases" className="text-sm text-muted-foreground hover:text-primary">Phone Cases</Link></li>
                            <li><Link href="/category/power-banks" className="text-sm text-muted-foreground hover:text-primary">Power Banks</Link></li>
                            <li><Link href="/category/screen-protectors" className="text-sm text-muted-foreground hover:text-primary">Screen Protectors</Link></li>
                          </ul>
                        </div>
                      </div>
                    )}
                    {activeCategory === 'fashion' && (
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        <div>
                          <h4 className="font-semibold text-sm mb-2 text-primary">WOMEN'S FASHION</h4>
                          <ul className="space-y-1">
                            <li><Link href="/category/womens-clothing" className="text-sm text-muted-foreground hover:text-primary">Clothing</Link></li>
                            <li><Link href="/category/womens-shoes" className="text-sm text-muted-foreground hover:text-primary">Shoes</Link></li>
                            <li><Link href="/category/womens-accessories" className="text-sm text-muted-foreground hover:text-primary">Accessories</Link></li>
                            <li><Link href="/category/jewelry" className="text-sm text-muted-foreground hover:text-primary">Jewelry</Link></li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2 text-primary">MEN'S FASHION</h4>
                          <ul className="space-y-1">
                            <li><Link href="/category/mens-clothing" className="text-sm text-muted-foreground hover:text-primary">Clothing</Link></li>
                            <li><Link href="/category/mens-shoes" className="text-sm text-muted-foreground hover:text-primary">Shoes</Link></li>
                            <li><Link href="/category/mens-underwear" className="text-sm text-muted-foreground hover:text-primary">Underwear</Link></li>
                          </ul>
                        </div>
                      </div>
                    )}
                    {activeCategory === 'home' && (
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        <div>
                          <h4 className="font-semibold text-sm mb-2 text-primary">HOME & KITCHEN</h4>
                          <ul className="space-y-1">
                            <li><Link href="/category/home-decor" className="text-sm text-muted-foreground hover:text-primary">Home Decor</Link></li>
                            <li><Link href="/category/bedding" className="text-sm text-muted-foreground hover:text-primary">Bedding</Link></li>
                            <li><Link href="/category/kitchen-gadgets" className="text-sm text-muted-foreground hover:text-primary">Kitchen Gadgets</Link></li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2 text-primary">FURNITURE</h4>
                          <ul className="space-y-1">
                            <li><Link href="/category/living-room-furniture" className="text-sm text-muted-foreground hover:text-primary">Living Room</Link></li>
                            <li><Link href="/category/bedroom-furniture" className="text-sm text-muted-foreground hover:text-primary">Bedroom</Link></li>
                            <li><Link href="/category/office-furniture" className="text-sm text-muted-foreground hover:text-primary">Office</Link></li>
                          </ul>
                        </div>
                      </div>
                    )}
                    {activeCategory === 'appliances' && (
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        <div>
                          <h4 className="font-semibold text-sm mb-2 text-primary">LARGE APPLIANCES</h4>
                          <ul className="space-y-1">
                            <li><Link href="/category/refrigerators" className="text-sm text-muted-foreground hover:text-primary">Refrigerators</Link></li>
                            <li><Link href="/category/washing-machines" className="text-sm text-muted-foreground hover:text-primary">Washing Machines</Link></li>
                            <li><Link href="/category/air-conditioners" className="text-sm text-muted-foreground hover:text-primary">Air Conditioners</Link></li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2 text-primary">SMALL APPLIANCES</h4>
                          <ul className="space-y-1">
                            <li><Link href="/category/blenders" className="text-sm text-muted-foreground hover:text-primary">Blenders</Link></li>
                            <li><Link href="/category/microwaves" className="text-sm text-muted-foreground hover:text-primary">Microwaves</Link></li>
                            <li><Link href="/category/toasters" className="text-sm text-muted-foreground hover:text-primary">Toasters</Link></li>
                          </ul>
                        </div>
                      </div>
                    )}
                    {activeCategory === 'electronics' && (
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        <div>
                          <h4 className="font-semibold text-sm mb-2 text-primary">TELEVISION</h4>
                          <ul className="space-y-1">
                            <li><Link href="/category/televisions" className="text-sm text-muted-foreground hover:text-primary">Televisions</Link></li>
                            <li><Link href="/category/led-tvs" className="text-sm text-muted-foreground hover:text-primary">LED & LCD TVs</Link></li>
                            <li><Link href="/category/smart-tvs" className="text-sm text-muted-foreground hover:text-primary">Smart TVs</Link></li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2 text-primary">AUDIO</h4>
                          <ul className="space-y-1">
                            <li><Link href="/category/speakers" className="text-sm text-muted-foreground hover:text-primary">Speakers</Link></li>
                            <li><Link href="/category/headphones" className="text-sm text-muted-foreground hover:text-primary">Headphones</Link></li>
                            <li><Link href="/category/home-theatre" className="text-sm text-muted-foreground hover:text-primary">Home Theatre</Link></li>
                          </ul>
                        </div>
                      </div>
                    )}
                    {activeCategory === 'computing' && (
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        <div>
                          <h4 className="font-semibold text-sm mb-2 text-primary">LAPTOPS</h4>
                          <ul className="space-y-1">
                            <li><Link href="/category/hp-laptops" className="text-sm text-muted-foreground hover:text-primary">HP Laptops</Link></li>
                            <li><Link href="/category/dell-laptops" className="text-sm text-muted-foreground hover:text-primary">Dell Laptops</Link></li>
                            <li><Link href="/category/macbooks" className="text-sm text-muted-foreground hover:text-primary">Macbooks</Link></li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2 text-primary">ACCESSORIES</h4>
                          <ul className="space-y-1">
                            <li><Link href="/category/keyboards-mice" className="text-sm text-muted-foreground hover:text-primary">Keyboards & Mice</Link></li>
                            <li><Link href="/category/printers" className="text-sm text-muted-foreground hover:text-primary">Printers</Link></li>
                            <li><Link href="/category/flash-drives" className="text-sm text-muted-foreground hover:text-primary">Flash Drives</Link></li>
                          </ul>
                        </div>
                      </div>
                    )}
                    {activeCategory === 'health' && (
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        <div>
                          <h4 className="font-semibold text-sm mb-2 text-primary">BEAUTY</h4>
                          <ul className="space-y-1">
                            <li><Link href="/category/makeup" className="text-sm text-muted-foreground hover:text-primary">Makeup</Link></li>
                            <li><Link href="/category/skin-care" className="text-sm text-muted-foreground hover:text-primary">Skin Care</Link></li>
                            <li><Link href="/category/hair-care" className="text-sm text-muted-foreground hover:text-primary">Hair Care</Link></li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2 text-primary">FRAGRANCES</h4>
                          <ul className="space-y-1">
                            <li><Link href="/category/mens-fragrances" className="text-sm text-muted-foreground hover:text-primary">Men's Fragrances</Link></li>
                            <li><Link href="/category/womens-fragrances" className="text-sm text-muted-foreground hover:text-primary">Women's Fragrances</Link></li>
                          </ul>
                        </div>
                      </div>
                    )}
                    {activeCategory === 'supermarket' && (
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        <div>
                          <h4 className="font-semibold text-sm mb-2 text-primary">GROCERY</h4>
                          <ul className="space-y-1">
                            <li><Link href="/category/pasta" className="text-sm text-muted-foreground hover:text-primary">Pasta & Noodles</Link></li>
                            <li><Link href="/category/rice" className="text-sm text-muted-foreground hover:text-primary">Rice & Grains</Link></li>
                            <li><Link href="/category/canned-foods" className="text-sm text-muted-foreground hover:text-primary">Canned Foods</Link></li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2 text-primary">BEVERAGES</h4>
                          <ul className="space-y-1">
                            <li><Link href="/category/juices" className="text-sm text-muted-foreground hover:text-primary">Juices</Link></li>
                            <li><Link href="/category/coffee" className="text-sm text-muted-foreground hover:text-primary">Coffee & Tea</Link></li>
                          </ul>
                        </div>
                      </div>
                    )}
                    {activeCategory === 'sporting' && (
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        <div>
                          <h4 className="font-semibold text-sm mb-2 text-primary">SPORTS & FITNESS</h4>
                          <ul className="space-y-1">
                            <li><Link href="/category/exercise-fitness" className="text-sm text-muted-foreground hover:text-primary">Exercise & Fitness</Link></li>
                            <li><Link href="/category/team-sports" className="text-sm text-muted-foreground hover:text-primary">Team Sports</Link></li>
                          </ul>
                        </div>
                      </div>
                    )}
                    {activeCategory === 'baby' && (
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        <div>
                          <h4 className="font-semibold text-sm mb-2 text-primary">BABY CLOTHING</h4>
                          <ul className="space-y-1">
                            <li><Link href="/category/baby-boys" className="text-sm text-muted-foreground hover:text-primary">Baby Boys</Link></li>
                            <li><Link href="/category/baby-girls" className="text-sm text-muted-foreground hover:text-primary">Baby Girls</Link></li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2 text-primary">BABY CARE</h4>
                          <ul className="space-y-1">
                            <li><Link href="/category/diapers" className="text-sm text-muted-foreground hover:text-primary">Diapers</Link></li>
                            <li><Link href="/category/baby-food" className="text-sm text-muted-foreground hover:text-primary">Baby Food</Link></li>
                          </ul>
                        </div>
                      </div>
                    )}
                    {activeCategory === 'gaming' && (
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        <div>
                          <h4 className="font-semibold text-sm mb-2 text-primary">GAMING</h4>
                          <ul className="space-y-1">
                            <li><Link href="/category/video-games" className="text-sm text-muted-foreground hover:text-primary">Video Games</Link></li>
                            <li><Link href="/category/gaming-consoles" className="text-sm text-muted-foreground hover:text-primary">Gaming Consoles</Link></li>
                            <li><Link href="/category/gaming-accessories" className="text-sm text-muted-foreground hover:text-primary">Accessories</Link></li>
                          </ul>
                        </div>
                      </div>
                    )}
                    {!activeCategory && (
                      <div className="text-sm text-muted-foreground p-4">
                        Hover over a category to see subcategories
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <span className="text-xl md:text-2xl font-bold text-orange-500">FYNZA</span>
            </Link>

            {/* Search */}
            <div className="flex-1 max-w-2xl">
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
                  className="pl-10 pr-4 h-12 border-2 border-border focus:border-primary"
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={!searchQuery.trim()}
                  className="absolute right-0 top-0 h-12 rounded-l-none bg-primary hover:bg-primary-dark text-white font-semibold"
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
      </div>
    </header>
  )
}
