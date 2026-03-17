"use client"

import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function CategorySidebar() {
  return (
    <aside className="w-full bg-white rounded-lg border">
      {/* Category Section */}
      <div className="p-4 border-b">
        <h3 className="font-bold text-sm mb-3">CATEGORY</h3>
        <div className="space-y-2">
          <Link href="/category/fashion" className="block text-sm hover:text-[#FF6700]">
            Fashion
          </Link>
          <Link href="/category/baby-products" className="block text-sm hover:text-[#FF6700]">
            Baby Products
          </Link>
        </div>
      </div>

      {/* Brand Section */}
      <div className="p-4 border-b">
        <h3 className="font-bold text-sm mb-3">BRAND</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="fashion1" />
            <Label htmlFor="fashion1" className="text-sm font-normal cursor-pointer">
              Fashion
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="fashion2" />
            <Label htmlFor="fashion2" className="text-sm font-normal cursor-pointer">
              Fashion
            </Label>
          </div>
        </div>
      </div>

      {/* Size Section */}
      <div className="p-4 border-b">
        <h3 className="font-bold text-sm mb-3">SIZE</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          <div className="flex items-center space-x-2">
            <Checkbox id="size-2-3" />
            <Label htmlFor="size-2-3" className="text-sm font-normal cursor-pointer">
              2-3 Years
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="size-6-9" />
            <Label htmlFor="size-6-9" className="text-sm font-normal cursor-pointer">
              6-9 Months
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="size-9-12" />
            <Label htmlFor="size-9-12" className="text-sm font-normal cursor-pointer">
              9-12 Months
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="size-12-18" />
            <Label htmlFor="size-12-18" className="text-sm font-normal cursor-pointer">
              12-18 Months
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="size-18-24" />
            <Label htmlFor="size-18-24" className="text-sm font-normal cursor-pointer">
              18-24 Months
            </Label>
          </div>
        </div>
      </div>

      {/* Price Section */}
      <div className="p-4 border-b">
        <h3 className="font-bold text-sm mb-3">PRICE (GH₵)</h3>
        <div className="flex items-center gap-2 mb-3">
          <input type="number" placeholder="40" className="w-20 px-2 py-1 border rounded text-sm" defaultValue={40} />
          <span className="text-sm">-</span>
          <input type="number" placeholder="200" className="w-20 px-2 py-1 border rounded text-sm" defaultValue={200} />
        </div>
        <Button variant="outline" size="sm" className="w-full bg-transparent">
          Apply
        </Button>
      </div>

      {/* Product Rating */}
      <div className="p-4 border-b">
        <h3 className="font-bold text-sm mb-3">PRODUCT RATING</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox id={`rating-${rating}`} />
              <Label htmlFor={`rating-${rating}`} className="text-sm font-normal cursor-pointer flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-3 h-3 ${i < rating ? "text-[#FF6700] fill-[#FF6700]" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1">& up</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Express Delivery */}
      <div className="p-4 border-b">
        <h3 className="font-bold text-sm mb-3">EXPRESS DELIVERY</h3>
        <div className="flex items-center space-x-2">
          <Checkbox id="express" />
          <Label htmlFor="express" className="text-sm font-normal cursor-pointer">
            Eligible for Express
          </Label>
        </div>
      </div>

      {/* Discount Percentage */}
      <div className="p-4">
        <h3 className="font-bold text-sm mb-3">DISCOUNT PERCENTAGE</h3>
        <div className="space-y-2">
          {["50% or more", "40% or more", "30% or more", "20% or more", "10% or more", "Less than 10%"].map(
            (discount) => (
              <div key={discount} className="flex items-center space-x-2">
                <Checkbox id={`discount-${discount}`} />
                <Label htmlFor={`discount-${discount}`} className="text-sm font-normal cursor-pointer">
                  {discount}
                </Label>
              </div>
            ),
          )}
        </div>
      </div>
    </aside>
  )
}
