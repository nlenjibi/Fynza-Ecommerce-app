"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Store,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Wallet,
  Banknote,
  Percent,
  PieChart,
  BarChart3
} from "lucide-react"

const revenueSummary = [
  {
    title: "Total Revenue",
    value: "GH₵ 2,456,789",
    change: "+18.4%",
    trend: "up",
    icon: DollarSign,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Today's Revenue",
    value: "GH₵ 45,678",
    change: "+12.3%",
    trend: "up",
    icon: Banknote,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Pending Payments",
    value: "GH₵ 12,345",
    change: "-5.2%",
    trend: "down",
    icon: Wallet,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Refunds Processed",
    value: "GH₵ 8,901",
    change: "-2.1%",
    trend: "down",
    icon: RefreshCw,
    color: "bg-red-100 text-red-600",
  },
]

const revenueByCategory = [
  { category: "Electronics", revenue: 856000, percentage: 35, color: "bg-blue-500" },
  { category: "Fashion", revenue: 612000, percentage: 25, color: "bg-purple-500" },
  { category: "Home & Garden", revenue: 367000, percentage: 15, color: "bg-green-500" },
  { category: "Beauty", revenue: 245000, percentage: 10, color: "bg-pink-500" },
  { category: "Sports", revenue: 196000, percentage: 8, color: "bg-orange-500" },
  { category: "Others", revenue: 180000, percentage: 7, color: "bg-gray-500" },
]

const topSellers = [
  { name: "TechZone Ghana", orders: 1234, revenue: 456789, status: "active" },
  { name: "Fashion Hub", orders: 987, revenue: 345678, status: "active" },
  { name: "Home Essentials", orders: 756, revenue: 234567, status: "active" },
  { name: "Beauty Store", orders: 543, revenue: 178901, status: "active" },
  { name: "Sports World", orders: 432, revenue: 156789, status: "inactive" },
]

const paymentMethods = [
  { method: "Mobile Money", transactions: 8560, amount: 856000, percentage: 35 },
  { method: "Bank Transfer", transactions: 4320, amount: 612000, percentage: 25 },
  { method: "Cash on Delivery", transactions: 3210, amount: 489000, percentage: 20 },
  { method: "Card Payment", transactions: 2150, amount: 367000, percentage: 15 },
  { method: "Wallet", transactions: 890, amount: 132789, percentage: 5 },
]

const monthlyRevenue = [
  { month: "Jan", revenue: 180000, orders: 1234 },
  { month: "Feb", revenue: 195000, orders: 1345 },
  { month: "Mar", revenue: 210000, orders: 1456 },
  { month: "Apr", revenue: 188000, orders: 1289 },
  { month: "May", revenue: 225000, orders: 1567 },
  { month: "Jun", revenue: 240000, orders: 1678 },
  { month: "Jul", revenue: 256000, orders: 1789 },
  { month: "Aug", revenue: 268000, orders: 1890 },
  { month: "Sep", revenue: 245000, orders: 1701 },
  { month: "Oct", revenue: 278000, orders: 1956 },
  { month: "Nov", revenue: 295000, orders: 2089 },
  { month: "Dec", revenue: 326000, orders: 2345 },
]

export default function RevenuePage() {
  const [dateRange, setDateRange] = useState("this-month")
  const maxRevenue = Math.max(...monthlyRevenue.map(r => r.revenue))

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader title="Revenue Management" subtitle="Track and analyze platform revenue" />

        <main className="p-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="this-week">This Week</option>
                <option value="this-month">This Month</option>
                <option value="last-month">Last Month</option>
                <option value="this-year">This Year</option>
              </select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Revenue Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {revenueSummary.map((item, index) => (
              <Card key={index} className="shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{item.title}</p>
                      <p className="text-xl font-bold text-gray-900">{item.value}</p>
                      <div className={`flex items-center gap-1 mt-2 text-xs ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {item.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        <span>{item.change} vs last period</span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${item.color}`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Monthly Revenue Chart */}
            <Card className="lg:col-span-2 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Revenue Trend</CardTitle>
                  <select className="text-sm border border-gray-300 rounded px-2 py-1">
                    <option>Monthly</option>
                    <option>Weekly</option>
                    <option>Daily</option>
                  </select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between gap-2">
                  {monthlyRevenue.map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-gradient-to-t from-orange-500 to-orange-400 rounded-t transition-all hover:from-orange-600 hover:to-orange-500"
                        style={{ height: `${(item.revenue / maxRevenue) * 100}%` }}
                        title={`GH₵ ${item.revenue.toLocaleString()}`}
                      />
                      <span className="text-xs text-gray-500 mt-2">{item.month}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Revenue by Category */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Revenue by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueByCategory.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-700">{item.category}</span>
                        <span className="text-sm font-medium text-gray-900">GH₵ {(item.revenue / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`${item.color} h-2 rounded-full`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tables Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Top Sellers by Revenue */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Top Sellers by Revenue</CardTitle>
                  <Button variant="ghost" size="sm" className="text-orange-500">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600">Seller</th>
                        <th className="text-center py-3 px-2 text-xs font-semibold text-gray-600">Orders</th>
                        <th className="text-right py-3 px-2 text-xs font-semibold text-gray-600">Revenue</th>
                        <th className="text-center py-3 px-2 text-xs font-semibold text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topSellers.map((seller, index) => (
                        <tr key={index} className="border-b last:border-b-0">
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                <Store className="h-4 w-4 text-orange-600" />
                              </div>
                              <span className="text-sm font-medium text-gray-900">{seller.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-2 text-center text-sm text-gray-600">{seller.orders}</td>
                          <td className="py-3 px-2 text-right text-sm font-medium text-gray-900">GH₵ {seller.revenue.toLocaleString()}</td>
                          <td className="py-3 px-2 text-center">
                            <Badge className={seller.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                              {seller.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Payment Methods</CardTitle>
                  <Button variant="ghost" size="sm" className="text-orange-500">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600">Method</th>
                        <th className="text-center py-3 px-2 text-xs font-semibold text-gray-600">Transactions</th>
                        <th className="text-right py-3 px-2 text-xs font-semibold text-gray-600">Amount</th>
                        <th className="text-right py-3 px-2 text-xs font-semibold text-gray-600">Share</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentMethods.map((method, index) => (
                        <tr key={index} className="border-b last:border-b-0">
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4 text-gray-500" />
                              <span className="text-sm font-medium text-gray-900">{method.method}</span>
                            </div>
                          </td>
                          <td className="py-3 px-2 text-center text-sm text-gray-600">{method.transactions.toLocaleString()}</td>
                          <td className="py-3 px-2 text-right text-sm font-medium text-gray-900">GH₵ {method.amount.toLocaleString()}</td>
                          <td className="py-3 px-2 text-right">
                            <span className="text-sm text-gray-600">{method.percentage}%</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Commission Earned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">GH₵ 245,678</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      +12.5% from last month
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Percent className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Platform Commission (5%)</span>
                    <span className="font-medium">GH₵ 122,839</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Transaction Fees</span>
                    <span className="font-medium">GH₵ 73,703</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Payment Processing</span>
                    <span className="font-medium">GH₵ 49,136</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Seller Payouts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">GH₵ 1,834,567</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      +8.2% from last month
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Banknote className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Pending Payouts</span>
                    <span className="font-medium">GH₵ 234,567</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Processing</span>
                    <span className="font-medium">GH₵ 89,012</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Completed</span>
                    <span className="font-medium">GH₵ 1,510,988</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Net Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">GH₵ 622,222</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      +15.3% from last month
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Gross Revenue</span>
                    <span className="font-medium">GH₵ 2,456,789</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Less: Refunds</span>
                    <span className="font-medium text-red-600">-GH₵ 89,012</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Less: Payouts</span>
                    <span className="font-medium text-red-600">-GH₵ 1,834,567</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
