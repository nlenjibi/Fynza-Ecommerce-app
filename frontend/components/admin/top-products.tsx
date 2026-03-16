import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const products = [
  {
    id: 1,
    name: "0-3 Years Baby Boys Summer Casual Sets",
    sales: 456,
    revenue: 34245.6,
    trend: "up",
    image: "/yellow-striped-shirt.jpg",
  },
  {
    id: 2,
    name: "Girls PU Leather Princess Shoes",
    sales: 342,
    revenue: 56998.72,
    trend: "up",
    image: "/black-girls-shoes.jpg",
  },
  {
    id: 3,
    name: "Boys Sports Hook & Loop Casual Shoes",
    sales: 298,
    revenue: 59581.12,
    trend: "up",
    image: "/boys-sports-shoes.jpg",
  },
  {
    id: 4,
    name: "Portable Wardrobe Closet",
    sales: 187,
    revenue: 89573.0,
    trend: "down",
    image: "/portable-wardrobe-closet.jpg",
  },
]

export function TopProducts() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Top Selling Products</CardTitle>
        <button className="text-sm font-medium text-orange-600 hover:text-orange-700">View all</button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 text-left text-sm text-gray-600">
                <th className="pb-3 font-medium">Product</th>
                <th className="pb-3 font-medium">Sales</th>
                <th className="pb-3 font-medium">Revenue</th>
                <th className="pb-3 font-medium">Trend</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {products.map((product, index) => (
                <tr key={product.id} className="border-b border-gray-100">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-500">#{index + 1}</span>
                      <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-gray-200">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium text-gray-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-gray-900">{product.sales}</td>
                  <td className="py-4 font-medium text-gray-900">GH₵ {product.revenue.toFixed(2)}</td>
                  <td className="py-4">
                    <Badge
                      variant="secondary"
                      className={product.trend === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
                    >
                      {product.trend === "up" ? "↑" : "↓"} {product.trend === "up" ? "12%" : "5%"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
