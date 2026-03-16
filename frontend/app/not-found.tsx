import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search, ShoppingBag } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="max-w-lg w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <span className="text-[150px] leading-none font-bold text-[#FF6900] opacity-20">
            404
          </span>
        </div>

        {/* Illustration */}
        <div className="mb-8 relative">
          <div className="w-48 h-48 mx-auto bg-white rounded-full shadow-xl flex items-center justify-center">
            <ShoppingBag className="w-24 h-24 text-[#FF6900]" />
          </div>
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">!</span>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          Sorry, the page you're looking for doesn't exist or has been moved.
          Let's get you back on track!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="w-full sm:w-auto bg-[#FF6900] hover:bg-[#FF6700] text-white px-8 py-6 text-lg">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </Link>
          <Link href="/search">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-2 border-[#FF6900] text-[#FF6900] hover:bg-[#FF6900] hover:text-white px-8 py-6 text-lg"
            >
              <Search className="w-5 h-5 mr-2" />
              Shop Products
            </Button>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 mb-4">Or explore popular categories:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/category/phones-tablets"
              className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-[#FF6900] hover:text-white transition-colors shadow-sm"
            >
              Phones & Tablets
            </Link>
            <Link
              href="/category/electronics"
              className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-[#FF6900] hover:text-white transition-colors shadow-sm"
            >
              Electronics
            </Link>
            <Link
              href="/category/womens-fashion"
              className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-[#FF6900] hover:text-white transition-colors shadow-sm"
            >
              Women's Fashion
            </Link>
            <Link
              href="/category/mens-fashion"
              className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-[#FF6900] hover:text-white transition-colors shadow-sm"
            >
              Men's Fashion
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}