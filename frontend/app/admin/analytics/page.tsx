"use client"

import { useState, useEffect } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AnalyticsSkeleton } from "@/components/skeletons"
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  Package,
  Store,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  Filter
} from "lucide-react"
import { RevenueChart } from "@/components/admin/revenue-chart"
import { TopProducts } from "@/components/admin/top-products"

const metrics = [
  {
    title: "Total Revenue",
    value: "$1,245,678",
    change: "+18.4%",
    trend: "up",
    icon: DollarSign,
    color: "green",
  },
  {
    title: "Total Orders",
    value: "8,934",
    change: "+23.1%",
    trend: "up",
    icon: ShoppingCart,
    color: "blue",
  },
  {
    title: "Total Customers",
    value: "18,234",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    color: "purple",
  },
  {
    title: "Total Sellers",
    value: "1,245",
    change: "+15.3%",
    trend: "up",
    icon: Store,
    color: "orange",
  },
  {
    title: "Products Sold",
    value: "45,678",
    change: "+12.5%",
    trend: "up",
    icon: Package,
    color: "cyan",
  },
  {
    title: "Avg Order Value",
    value: "$139.42",
    change: "-2.3%",
    trend: "down",
    icon: TrendingDown,
    color: "red",
  },
]

const salesData = [
  { month: "Jan", sales: 45000, orders: 1200 },
  { month: "Feb", sales: 52000, orders: 1450 },
  { month: "Mar", sales: 48000, orders: 1320 },
  { month: "Apr", sales: 61000, orders: 1680 },
  { month: "May", sales: 55000, orders: 1520 },
  { month: "Jun", sales: 67000, orders: 1850 },
  { month: "Jul", sales: 72000, orders: 1980 },
  { month: "Aug", sales: 69000, orders: 1890 },
  { month: "Sep", sales: 81000, orders: 2200 },
  { month: "Oct", sales: 78000, orders: 2150 },
  { month: "Nov", sales: 95000, orders: 2600 },
  { month: "Dec", sales: 110000, orders: 3000 },
]

const categoryPerformance = [
  { name: "Electronics", sales: 450000, percentage: 36 },
  { name: "Fashion", sales: 320000, percentage: 26 },
  { name: "Home & Living", sales: 210000, percentage: 17 },
  { name: "Beauty", sales: 185000, percentage: 15 },
  { name: "Others", sales: 80678, percentage: 6 },
]

const topSellers = [
  { name: "TechZone", revenue: "$125,400", orders: 1245, growth: "+15%" },
  { name: "Fashion Hub", revenue: "$98,700", orders: 987, growth: "+12%" },
  { name: "Home Essentials", revenue: "$75,600", orders: 756, growth: "+8%" },
  { name: "Gadget World", revenue: "$65,400", orders: 654, growth: "+22%" },
  { name: "Beauty Store", revenue: "$54,300", orders: 543, growth: "+5%" },
]

const colorMap: Record<string, string> = {
  green: "bg-green-500",
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
  cyan: "bg-cyan-500",
  red: "bg-red-500",
}

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("this-month")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 ml-64">
          <AdminHeader title="Analytics" subtitle="Platform performance insights" />
          <main className="p-6">
            <AnalyticsSkeleton />
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader title="Analytics" subtitle="Platform performance insights" />

        <main className="p-6">
          {/* Date Range Filter */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              <Button variant={dateRange === "today" ? "default" : "outline"} size="sm" className={dateRange === "today" ? "bg-orange-500" : ""} onClick={() => setDateRange("today")}>Today</Button>
              <Button variant={dateRange === "this-week" ? "default" : "outline"} size="sm" className={dateRange === "this-week" ? "bg-orange-500" : ""} onClick={() => setDateRange("this-week")}>This Week</Button>
              <Button variant={dateRange === "this-month" ? "default" : "outline"} size="sm" className={dateRange === "this-month" ? "bg-orange-500" : ""} onClick={() => setDateRange("this-month")}>This Month</Button>
              <Button variant={dateRange === "this-year" ? "default" : "outline"} size="sm" className={dateRange === "this-year" ? "bg-orange-500" : ""} onClick={() => setDateRange("this-year")}>This Year</Button>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
            {metrics.map((metric) => (
              <Card key={metric.title} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${colorMap[metric.color].replace('bg-', 'bg-opacity-10 ')}`}>
                      <metric.icon className={`h-5 w-5 ${colorMap[metric.color].replace('bg-', 'text-')}`} />
                    </div>
                    <Badge variant="outline" className={metric.trend === "up" ? "text-green-600 border-green-200" : "text-red-600 border-red-200"}>
                      {metric.trend === "up" ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                      {metric.change}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="lg:col-span-2 border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <RevenueChart />
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Sales by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryPerformance.map((category) => (
                    <div key={category.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{category.name}</span>
                        <span className="text-sm text-gray-500">${category.sales.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${category.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Sellers */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold">Top Performing Sellers</CardTitle>
                <Button variant="ghost" size="sm" className="text-orange-600">View All</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topSellers.map((seller, index) => (
                    <div key={seller.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-semibold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{seller.name}</p>
                          <p className="text-xs text-gray-500">{seller.orders} orders</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{seller.revenue}</p>
                        <p className="text-xs text-green-600">{seller.growth}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold">Best Selling Products</CardTitle>
                <Button variant="ghost" size="sm" className="text-orange-600">View All</Button>
              </CardHeader>
              <CardContent>
                <TopProducts />
              </CardContent>
            </Card>
          </div>

          {/* Sales Trend Table */}
          <Card className="border-0 shadow-sm mt-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Monthly Sales Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Month</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Sales Revenue</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Orders</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Avg Order Value</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Growth</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {salesData.map((data) => (
                      <tr key={data.month} className="hover:bg-gray-50">
                        <td className="py-3 text-sm font-medium text-gray-900">{data.month}</td>
                        <td className="py-3 text-sm text-gray-900">${data.sales.toLocaleString()}</td>
                        <td className="py-3 text-sm text-gray-600">{data.orders.toLocaleString()}</td>
                        <td className="py-3 text-sm text-gray-600">${Math.round(data.sales / data.orders)}</td>
                        <td className="py-3">
                          <span className="text-sm text-green-600">+{Math.round((data.sales / 45000 - 1) * 100)}%</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
