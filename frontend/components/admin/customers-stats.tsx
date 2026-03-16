import { Users, UserPlus, UserCheck, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    title: "Total Customers",
    value: "8,547",
    change: "+14.2%",
    trend: "up",
    icon: Users,
  },
  {
    title: "New This Month",
    value: "342",
    change: "+23.1%",
    trend: "up",
    icon: UserPlus,
  },
  {
    title: "Active Customers",
    value: "7,234",
    change: "+8.7%",
    trend: "up",
    icon: UserCheck,
  },
  {
    title: "Avg Order Value",
    value: "GH₵ 156.50",
    change: "+12.3%",
    trend: "up",
    icon: TrendingUp,
  },
]

export function CustomersStats() {
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
