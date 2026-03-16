"use client"

import { useState } from "react"
import { ChevronDown, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function FilterBar() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [showMoreFilters, setShowMoreFilters] = useState(false)

  const handleFilterSelect = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter))
    } else {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const clearAllFilters = () => {
    setActiveFilters([])
  }

  const removeFilter = (filterToRemove: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filterToRemove))
  }

  return (
    <div className="mb-6">
      {/* Main Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-lg border">
        {/* Left side - Basic filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Express Delivery Badge */}
          <div className="flex items-center gap-2 text-[#FF6700]">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
            </svg>
            <span className="text-sm font-semibold">EXPRESS</span>
          </div>

          {/* Essential Filters */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                Brand
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Fashion</DropdownMenuItem>
              <DropdownMenuItem>Generic</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                Price
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Low to High</DropdownMenuItem>
              <DropdownMenuItem>High to Low</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                Size
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>0-3 Months</DropdownMenuItem>
              <DropdownMenuItem>3-6 Months</DropdownMenuItem>
              <DropdownMenuItem>6-9 Months</DropdownMenuItem>
              <DropdownMenuItem>9-12 Months</DropdownMenuItem>
              <DropdownMenuItem>12-18 Months</DropdownMenuItem>
              <DropdownMenuItem>18-24 Months</DropdownMenuItem>
              <DropdownMenuItem>2-3 Years</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* More Filters Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                <Filter className="h-3 w-3" />
                More
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div className="p-2">
                <div className="mb-2 text-xs font-medium text-gray-500">Rating</div>
                <DropdownMenuItem onClick={() => handleFilterSelect("rating")}>
                  5 Stars & Above
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterSelect("rating")}>
                  4 Stars & Above
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterSelect("rating")}>
                  3 Stars & Above
                </DropdownMenuItem>

                <div className="mt-2 mb-2 text-xs font-medium text-gray-500">Availability</div>
                <DropdownMenuItem onClick={() => handleFilterSelect("availability")}>
                  In Stock
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterSelect("availability")}>
                  Low Stock
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterSelect("availability")}>
                  Out of Stock
                </DropdownMenuItem>

                <div className="mt-2 mb-2 text-xs font-medium text-gray-500">Discount</div>
                <DropdownMenuItem onClick={() => handleFilterSelect("discount")}>
                  Has Discount
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterSelect("discount")}>
                  20% or More
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterSelect("discount")}>
                  50% or More
                </DropdownMenuItem>

                <div className="mt-2 mb-2 text-xs font-medium text-gray-500">Status</div>
                <DropdownMenuItem onClick={() => handleFilterSelect("status")}>
                  Featured
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterSelect("status")}>
                  New Arrivals
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterSelect("status")}>
                  Bestsellers
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right side - Sort dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 hidden sm:inline">Sort by:</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                Popularity
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Popularity</DropdownMenuItem>
              <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
              <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
              <DropdownMenuItem>Newest</DropdownMenuItem>
              <DropdownMenuItem>Rating: High to Low</DropdownMenuItem>
              <DropdownMenuItem>Sales: High to Low</DropdownMenuItem>
              <DropdownMenuItem>Views: High to Low</DropdownMenuItem>
              <DropdownMenuItem>Discount: High to Low</DropdownMenuItem>
              <DropdownMenuItem>Stock: High to Low</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-500">Active filters:</span>
          {activeFilters.map(filter => (
            <Badge key={filter} variant="secondary" className="gap-1">
              {filter === "rating" && "Rating: 4+ Stars"}
              {filter === "availability" && "In Stock"}
              {filter === "discount" && "Has Discount"}
              {filter === "status" && "Featured"}
              <button
                onClick={() => removeFilter(filter)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Expanded Filters Section (when More Filters is clicked) */}
      {showMoreFilters && (
        <div className="mt-3 p-4 bg-gray-50 rounded-lg border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Additional Filters</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMoreFilters(false)}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Rating Filter */}
            <div className="space-y-1">
              <label className="text-xs font-medium">Rating</label>
              <select className="w-full border rounded px-2 py-1 text-sm">
                <option value="">Any Rating</option>
                <option value="5">5 Stars & Above</option>
                <option value="4">4 Stars & Above</option>
                <option value="3">3 Stars & Above</option>
                <option value="2">2 Stars & Above</option>
                <option value="1">1 Star & Above</option>
              </select>
            </div>

            {/* Availability Filter */}
            <div className="space-y-1">
              <label className="text-xs font-medium">Availability</label>
              <select className="w-full border rounded px-2 py-1 text-sm">
                <option value="">Any Status</option>
                <option value="in-stock">In Stock</option>
                <option value="low-stock">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
                <option value="pre-order">Pre-order</option>
                <option value="backorder">Backorder</option>
              </select>
            </div>

            {/* Discount Filter */}
            <div className="space-y-1">
              <label className="text-xs font-medium">Discount</label>
              <select className="w-full border rounded px-2 py-1 text-sm">
                <option value="">Any Discount</option>
                <option value="has-discount">Has Discount</option>
                <option value="10">10% or More</option>
                <option value="20">20% or More</option>
                <option value="30">30% or More</option>
                <option value="40">40% or More</option>
                <option value="50">50% or More</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="space-y-1">
              <label className="text-xs font-medium">Status</label>
              <select className="w-full border rounded px-2 py-1 text-sm">
                <option value="">Any Status</option>
                <option value="featured">Featured</option>
                <option value="new">New Arrivals</option>
                <option value="bestseller">Bestsellers</option>
                <option value="active">Active Only</option>
              </select>
            </div>
          </div>

          <div className="mt-3 flex justify-end">
            <Button size="sm" onClick={() => setShowMoreFilters(false)}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
