import { ShoppingBag, Clock, CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    title: "Total Orders",
    value: "1,247",
    change: "+12.3%",
    trend: "up",
    icon: ShoppingBag,
    color: "orange",
  },
  {
    title: "Pending",
    value: "89",
    change: "+5.2%",
    trend: "up",
    icon: Clock,
    color: "yellow",
  },
  {
    title: "Completed",
    value: "1,098",
    change: "+18.7%",
    trend: "up",
    icon: CheckCircle,
    color: "green",
  },
  {
    title: "Cancelled",
    value: "60",
    change: "-3.4%",
    trend: "down",
    icon: XCircle,
    color: "red",
  },
]

export function OrdersStats() {
  return (
    <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                  stat.color === "orange"
                    ? "bg-orange-100"
                    : stat.color === "yellow"
                      ? "bg-yellow-100"
                      : stat.color === "green"
                        ? "bg-green-100"
                        : "bg-red-100"
                }`}
              >
                <stat.icon
                  className={`h-6 w-6 ${
                    stat.color === "orange"
                      ? "text-orange-600"
                      : stat.color === "yellow"
                        ? "text-yellow-600"
                        : stat.color === "green"
                          ? "text-green-600"
                          : "text-red-600"
                  }`}
                />
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
