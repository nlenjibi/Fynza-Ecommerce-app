'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Grid, List, SlidersHorizontal } from "lucide-react"

interface StoreFilterBarProps {
  totalProducts: number
}

export function StoreFilterBar({ totalProducts }: StoreFilterBarProps) {
  const [sortBy, setSortBy] = useState("popularity")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const sortOptions = [
    { value: "popularity", label: "Popularity" },
    { value: "newest", label: "Newest" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Best Rated" },
    { value: "sales", label: "Best Sales" },
  ]

  return (
    <div className="bg-white rounded-lg p-4 mb-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left - Results count */}
        <div className="text-sm text-gray-600">
          <span className="font-semibold">{totalProducts}</span> products found
        </div>

        {/* Center - Sort options */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Sort by:</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6900] focus:border-transparent cursor-pointer"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Right - View mode & Filters */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            <Badge variant="secondary" className="ml-1 bg-[#FF6900] text-white text-xs">
              2
            </Badge>
          </Button>

          <div className="flex border rounded overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "bg-[#FF6900] text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${viewMode === "list" ? "bg-[#FF6900] text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t">
        <Badge variant="outline" className="bg-orange-50 text-[#FF6900] border-orange-200">
          Women Shoes ×
        </Badge>
        <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200 cursor-pointer">
          Size: 38 ×
        </Badge>
        <Button variant="link" size="sm" className="text-[#FF6900] h-auto p-0">
          Clear all
        </Button>
      </div>
    </div>
  )
}
