"use client"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function Filters() {
  return (
    <div className="space-y-6">
      {/* Express Delivery */}
      <div>
        <Badge variant="outline" className="text-[oklch(0.65_0.18_45)] border-[oklch(0.65_0.18_45)]">
          ⚡ EXPRESS
        </Badge>
      </div>

      {/* Brand Filter */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">BRAND</h3>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="All brands" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All brands</SelectItem>
            <SelectItem value="brand1">Brand 1</SelectItem>
            <SelectItem value="brand2">Brand 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Price Filter */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">PRICE (GHC)</h3>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="All prices" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All prices</SelectItem>
            <SelectItem value="0-50">Under GHC 50</SelectItem>
            <SelectItem value="50-100">GHC 50 - 100</SelectItem>
            <SelectItem value="100+">Over GHC 100</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Size Filter */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">SIZE</h3>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="All sizes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All sizes</SelectItem>
            <SelectItem value="0-3m">0-3 months</SelectItem>
            <SelectItem value="3-6m">3-6 months</SelectItem>
            <SelectItem value="6-12m">6-12 months</SelectItem>
            <SelectItem value="1-2y">1-2 years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Product Rating */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">PRODUCT RATING</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2].map((rating) => (
            <div key={rating} className="flex items-center gap-2">
              <Checkbox id={`rating-${rating}`} />
              <Label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer">
                {rating}★ & above
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Discount */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">DISCOUNT PERCENTAGE</h3>
        <div className="space-y-2">
          {["50% or more", "40% or more", "30% or more", "20% or more"].map((discount) => (
            <div key={discount} className="flex items-center gap-2">
              <Checkbox id={discount} />
              <Label htmlFor={discount} className="text-sm cursor-pointer">
                {discount}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
