import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    title: "Total Revenue",
    value: "GH₵ 142,547",
    change: "+18.7%",
    trend: "up",
    subtitle: "vs last month",
    icon: DollarSign,
  },
  {
    title: "Total Orders",
    value: "1,247",
    change: "+12.3%",
    trend: "up",
    subtitle: "vs last month",
    icon: ShoppingCart,
  },
  {
    title: "New Customers",
    value: "342",
    change: "+23.1%",
    trend: "up",
    subtitle: "vs last month",
    icon: Users,
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    change: "+2.4%",
    trend: "up",
    subtitle: "vs last month",
    icon: TrendingUp,
  },
]

export function AnalyticsOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
              <p className="mt-1 text-xs text-gray-500">{stat.subtitle}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
