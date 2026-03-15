"use client"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Filter, X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Inventory status enum
enum InventoryStatus {
  IN_STOCK = "IN_STOCK",
  LOW_STOCK = "LOW_STOCK",
  OUT_OF_STOCK = "OUT_OF_STOCK",
  DISCONTINUED = "DISCONTINUED",
  PRE_ORDER = "PRE_ORDER",
  BACKORDER = "BACKORDER",
  COMING_SOON = "COMING_SOON"
}

// Filter interface
interface AdvancedFiltersState {
  // Product status
  featured: boolean
  isNew: boolean
  isBestseller: boolean
  isActive: boolean

  // Inventory
  inStockOnly: boolean
  lowStockOnly: boolean
  outOfStockOnly: boolean
  needsReorderOnly: boolean
  inventoryStatus: InventoryStatus | null
  inventoryStatuses: InventoryStatus[]
  minStock: number | null
  maxStock: number | null
  minAvailableQuantity: number | null

  // Discount
  hasDiscount: boolean
  minDiscountPercent: number | null
  maxDiscountPercent: number | null

// Component props
interface AdvancedFiltersProps {
  onFilterChange?: (filters: AdvancedFiltersState) => void
}

// Rating & engagement
minRating: number | null
maxRating: number | null
minViews: number | null
minSales: number | null
popular: boolean
trending: boolean

// Dates
createdAfter: Date | null
createdBefore: Date | null

// Tags
tags: string[]
newTag: string

// Response options
includeCategory: boolean
includeImages: boolean

// Sorting
sortBy: string
sortOrder: "asc" | "desc"
}

export function AdvancedFilters() {
  const [filters, setFilters] = useState<AdvancedFilters>({
    // Default values
    featured: false,
    isNew: false,
    isBestseller: false,
    isActive: true,
    inStockOnly: false,
    lowStockOnly: false,
    outOfStockOnly: false,
    needsReorderOnly: false,
    inventoryStatus: null,
    inventoryStatuses: [],
    minStock: null,
    maxStock: null,
    minAvailableQuantity: null,
    hasDiscount: false,
    minDiscountPercent: null,
    maxDiscountPercent: null,
    minRating: null,
    maxRating: null,
    minViews: null,
    minSales: null,
    popular: false,
    trending: false,
    createdAfter: null,
    createdBefore: null,
    tags: [],
    newTag: "",
    includeCategory: true,
    includeImages: false,
    sortBy: "popularity",
    sortOrder: "desc"
  })

  const [isExpanded, setIsExpanded] = useState(false)

  const handleFilterChange = (key: keyof AdvancedFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleApplyFilters = () => {
    // TODO: Implement filter application
    console.log("Applying filters:", filters)
  }

  const handleResetFilters = () => {
    setFilters({
      featured: false,
      isNew: false,
      isBestseller: false,
      isActive: true,
      inStockOnly: false,
      lowStockOnly: false,
      outOfStockOnly: false,
      needsReorderOnly: false,
      inventoryStatus: null,
      inventoryStatuses: [],
      minStock: null,
      maxStock: null,
      minAvailableQuantity: null,
      hasDiscount: false,
      minDiscountPercent: null,
      maxDiscountPercent: null,
      minRating: null,
      maxRating: null,
      minViews: null,
      minSales: null,
      popular: false,
      trending: false,
      createdAfter: null,
      createdBefore: null,
      tags: [],
      newTag: "",
      includeCategory: true,
      includeImages: false,
      sortBy: "popularity",
      sortOrder: "desc"
    })
  }

  const addTag = () => {
    if (filters.newTag.trim()) {
      handleFilterChange("tags", [...filters.tags, filters.newTag.trim()])
      handleFilterChange("newTag", "")
    }
  }

  const removeTag = (tagToRemove: string) => {
    handleFilterChange("tags", filters.tags.filter(tag => tag !== tagToRemove))
  }

  return (
    <div className="space-y-6 p-4 border rounded-lg bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Advanced Filters</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Collapse" : "Expand"}
        </Button>
      </div>

      {/* Basic filters (always visible) */}
      <div className="space-y-4">
        {/* Product Status Filters */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm">PRODUCT STATUS</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="featured"
                checked={filters.featured}
                onCheckedChange={(checked) => handleFilterChange("featured", checked)}
              />
              <Label htmlFor="featured" className="text-sm cursor-pointer">
                Featured
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="isNew"
                checked={filters.isNew}
                onCheckedChange={(checked) => handleFilterChange("isNew", checked)}
              />
              <Label htmlFor="isNew" className="text-sm cursor-pointer">
                New
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="isBestseller"
                checked={filters.isBestseller}
                onCheckedChange={(checked) => handleFilterChange("isBestseller", checked)}
              />
              <Label htmlFor="isBestseller" className="text-sm cursor-pointer">
                Bestseller
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="isActive"
                checked={filters.isActive}
                onCheckedChange={(checked) => handleFilterChange("isActive", checked)}
              />
              <Label htmlFor="isActive" className="text-sm cursor-pointer">
                Active
              </Label>
            </div>
          </div>
        </div>

        {/* Inventory Status Filters */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm">INVENTORY STATUS</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="inStockOnly"
                checked={filters.inStockOnly}
                onCheckedChange={(checked) => handleFilterChange("inStockOnly", checked)}
              />
              <Label htmlFor="inStockOnly" className="text-sm cursor-pointer">
                In Stock Only
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="lowStockOnly"
                checked={filters.lowStockOnly}
                onCheckedChange={(checked) => handleFilterChange("lowStockOnly", checked)}
              />
              <Label htmlFor="lowStockOnly" className="text-sm cursor-pointer">
                Low Stock Only
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="outOfStockOnly"
                checked={filters.outOfStockOnly}
                onCheckedChange={(checked) => handleFilterChange("outOfStockOnly", checked)}
              />
              <Label htmlFor="outOfStockOnly" className="text-sm cursor-pointer">
                Out of Stock Only
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="needsReorderOnly"
                checked={filters.needsReorderOnly}
                onCheckedChange={(checked) => handleFilterChange("needsReorderOnly", checked)}
              />
              <Label htmlFor="needsReorderOnly" className="text-sm cursor-pointer">
                Needs Reorder
              </Label>
            </div>
          </div>
        </div>

        {/* Discount Filters */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm">DISCOUNT</h3>
          <div className="flex items-center gap-2">
            <Checkbox
              id="hasDiscount"
              checked={filters.hasDiscount}
              onCheckedChange={(checked) => handleFilterChange("hasDiscount", checked)}
            />
            <Label htmlFor="hasDiscount" className="text-sm cursor-pointer">
              Has Discount
            </Label>
          </div>
          {filters.hasDiscount && (
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="minDiscount" className="text-xs">Min %</Label>
                <Input
                  id="minDiscount"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="0"
                  value={filters.minDiscountPercent || ""}
                  onChange={(e) => handleFilterChange("minDiscountPercent", e.target.value ? parseInt(e.target.value) : null)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="maxDiscount" className="text-xs">Max %</Label>
                <Input
                  id="maxDiscount"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="100"
                  value={filters.maxDiscountPercent || ""}
                  onChange={(e) => handleFilterChange("maxDiscountPercent", e.target.value ? parseInt(e.target.value) : null)}
                />
              </div>
            </div>
          )}
        </div>

        {/* Rating Filter */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm">RATING</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="minRating" className="text-xs">Min (1-5)</Label>
              <Input
                id="minRating"
                type="number"
                min="1"
                max="5"
                step="0.1"
                placeholder="1"
                value={filters.minRating || ""}
                onChange={(e) => handleFilterChange("minRating", e.target.value ? parseFloat(e.target.value) : null)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="maxRating" className="text-xs">Max (1-5)</Label>
              <Input
                id="maxRating"
                type="number"
                min="1"
                max="5"
                step="0.1"
                placeholder="5"
                value={filters.maxRating || ""}
                onChange={(e) => handleFilterChange("maxRating", e.target.value ? parseFloat(e.target.value) : null)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Expanded filters */}
      {isExpanded && (
        <div className="space-y-4 pt-4 border-t">
          {/* Stock Quantity Range */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">STOCK QUANTITY</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="minStock" className="text-xs">Min Stock</Label>
                <Input
                  id="minStock"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={filters.minStock || ""}
                  onChange={(e) => handleFilterChange("minStock", e.target.value ? parseInt(e.target.value) : null)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="maxStock" className="text-xs">Max Stock</Label>
                <Input
                  id="maxStock"
                  type="number"
                  min="0"
                  placeholder="1000"
                  value={filters.maxStock || ""}
                  onChange={(e) => handleFilterChange("maxStock", e.target.value ? parseInt(e.target.value) : null)}
                />
              </div>
            </div>
          </div>

          {/* Available Quantity */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">AVAILABLE QUANTITY</h3>
            <div className="space-y-1">
              <Label htmlFor="minAvailableQuantity" className="text-xs">Minimum Available</Label>
              <Input
                id="minAvailableQuantity"
                type="number"
                min="0"
                placeholder="0"
                value={filters.minAvailableQuantity || ""}
                onChange={(e) => handleFilterChange("minAvailableQuantity", e.target.value ? parseInt(e.target.value) : null)}
              />
            </div>
          </div>

          {/* Engagement Filters */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">ENGAGEMENT</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="minViews" className="text-xs">Min Views</Label>
                <Input
                  id="minViews"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={filters.minViews || ""}
                  onChange={(e) => handleFilterChange("minViews", e.target.value ? parseInt(e.target.value) : null)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="minSales" className="text-xs">Min Sales</Label>
                <Input
                  id="minSales"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={filters.minSales || ""}
                  onChange={(e) => handleFilterChange("minSales", e.target.value ? parseInt(e.target.value) : null)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="popular"
                  checked={filters.popular}
                  onCheckedChange={(checked) => handleFilterChange("popular", checked)}
                />
                <Label htmlFor="popular" className="text-sm cursor-pointer">
                  Popular
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="trending"
                  checked={filters.trending}
                  onCheckedChange={(checked) => handleFilterChange("trending", checked)}
                />
                <Label htmlFor="trending" className="text-sm cursor-pointer">
                  Trending
                </Label>
              </div>
            </div>
          </div>

          {/* Date Filters */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">CREATION DATE</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Created After</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !filters.createdAfter && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.createdAfter ? format(filters.createdAfter, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={filters.createdAfter || undefined}
                      onSelect={(date) => handleFilterChange("createdAfter", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Created Before</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !filters.createdBefore && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.createdBefore ? format(filters.createdBefore, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={filters.createdBefore || undefined}
                      onSelect={(date) => handleFilterChange("createdBefore", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Tag Filters */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">TAGS</h3>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag"
                  value={filters.newTag}
                  onChange={(e) => handleFilterChange("newTag", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTag()}
                />
                <Button onClick={addTag} size="sm">
                  Add
                </Button>
              </div>
              {filters.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {filters.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Response Options */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">RESPONSE OPTIONS</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="includeCategory"
                  checked={filters.includeCategory}
                  onCheckedChange={(checked) => handleFilterChange("includeCategory", checked)}
                />
                <Label htmlFor="includeCategory" className="text-sm cursor-pointer">
                  Include Category
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="includeImages"
                  checked={filters.includeImages}
                  onCheckedChange={(checked) => handleFilterChange("includeImages", checked)}
                />
                <Label htmlFor="includeImages" className="text-sm cursor-pointer">
                  Include Images
                </Label>
              </div>
            </div>
          </div>

          {/* Sorting Options */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">SORT BY</h3>
            <div className="grid grid-cols-2 gap-3">
              <Select
                value={filters.sortBy}
                onValueChange={(value) => handleFilterChange("sortBy", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="views">Views</SelectItem>
                  <SelectItem value="discount">Discount</SelectItem>
                  <SelectItem value="stock">Stock</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filters.sortOrder}
                onValueChange={(value) => handleFilterChange("sortOrder", value as "asc" | "desc")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">Descending</SelectItem>
                  <SelectItem value="asc">Ascending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t">
        <Button onClick={handleApplyFilters} className="flex-1">
          Apply Filters
        </Button>
        <Button onClick={handleResetFilters} variant="outline">
          Reset
        </Button>
      </div>
    </div>
  )
}