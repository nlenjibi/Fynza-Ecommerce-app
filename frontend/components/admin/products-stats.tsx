import { Package, ShoppingCart, TrendingUp, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    title: "Total Products",
    value: "2,847",
    change: "+12.3%",
    trend: "up",
    icon: Package,
  },
  {
    title: "In Stock",
    value: "2,456",
    change: "+8.1%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "Low Stock",
    value: "143",
    change: "-5.2%",
    trend: "down",
    icon: AlertCircle,
  },
  {
    title: "Revenue",
    value: "GH₵ 142.5K",
    change: "+18.7%",
    trend: "up",
    icon: TrendingUp,
  },
]

export function ProductsStats() {
  return (
    <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                <stat.icon className="h-6 w-6 text-orange-600" />
              </div>
              <span className={`text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">{stat.title}</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
