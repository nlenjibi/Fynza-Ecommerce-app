import type { Metadata } from "next"
import { useState, useEffect } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { DashboardMetrics } from "@/components/admin/dashboard-metrics"
import { RevenueChart } from "@/components/admin/revenue-chart"
import { OrdersStats } from "@/components/admin/orders-stats"
import { TopProducts } from "@/components/admin/top-products"
import { CustomersStats } from "@/components/admin/customers-stats"
import { ProductsStats } from "@/components/admin/products-stats"
import { SystemHistory } from "@/components/admin/system-history"
import { DashboardSkeleton } from "@/components/skeletons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle
} from "lucide-react"

export const metadata: Metadata = {
  title: "Admin Dashboard - Fynza",
  description: "Comprehensive marketplace admin dashboard",
}

// Mock data for dashboard
const statsCards = [
  {
    title: "Total Users",
    value: "24,589",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "blue",
  },
  {
    title: "Total Customers",
    value: "18,234",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    color: "green",
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
    title: "Total Products",
    value: "45,678",
    change: "+5.7%",
    trend: "up",
    icon: Package,
    color: "purple",
  },
  {
    title: "Total Orders",
    value: "8,934",
    change: "+23.1%",
    trend: "up",
    icon: ShoppingCart,
    color: "cyan",
  },
  {
    title: "Total Revenue",
    value: "$1.2M",
    change: "+18.4%",
    trend: "up",
    icon: DollarSign,
    color: "green",
  },
]

const recentOrders = [
  { id: "ORD-7829", customer: "John Smith", seller: "TechZone", amount: "$459.00", status: "delivered", date: "2 min ago" },
  { id: "ORD-7828", customer: "Sarah Johnson", seller: "Fashion Hub", amount: "$189.00", status: "processing", date: "15 min ago" },
  { id: "ORD-7827", customer: "Mike Brown", seller: "Home Essentials", amount: "$299.00", status: "shipped", date: "1 hour ago" },
  { id: "ORD-7826", customer: "Emily Davis", seller: "Gadget World", amount: "$899.00", status: "pending", date: "2 hours ago" },
  { id: "ORD-7825", customer: "David Wilson", seller: "Beauty Store", amount: "$145.00", status: "cancelled", date: "3 hours ago" },
]

const topSellers = [
  { name: "TechZone", orders: 1245, revenue: "$125,400", rating: 4.9, products: 234 },
  { name: "Fashion Hub", orders: 987, revenue: "$98,700", rating: 4.8, products: 456 },
  { name: "Home Essentials", orders: 756, revenue: "$75,600", rating: 4.7, products: 189 },
  { name: "Gadget World", orders: 654, revenue: "$65,400", rating: 4.6, products: 312 },
  { name: "Beauty Store", orders: 543, revenue: "$54,300", rating: 4.8, products: 278 },
]

const lowStockProducts = [
  { name: "iPhone 15 Pro Case", sku: "IPC-001", stock: 3, seller: "TechZone" },
  { name: "Nike Air Max", sku: "NAM-202", stock: 5, seller: "Fashion Hub" },
  { name: "Wireless Earbuds", sku: "WBE-055", stock: 2, seller: "Gadget World" },
  { name: "Smart Watch Band", sku: "SWB-012", stock: 8, seller: "TechZone" },
]

const colorMap: Record<string, string> = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  orange: "bg-orange-500",
  purple: "bg-purple-500",
  cyan: "bg-cyan-500",
}

const statusColors: Record<string, string> = {
  delivered: "bg-green-100 text-green-700 border-green-200",
  processing: "bg-blue-100 text-blue-700 border-blue-200",
  shipped: "bg-purple-100 text-purple-700 border-purple-200",
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
}

export default function AdminDashboard() {
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
          <AdminHeader title="Dashboard" subtitle="Overview" />
          <main className="p-6">
            <DashboardSkeleton />
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader title="Dashboard" subtitle="Overview" />
        <main className="p-6">
          {/* Stats Cards */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Platform Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {statsCards.map((stat) => (
                <Card key={stat.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-lg ${colorMap[stat.color]} bg-opacity-10`}>
                        <stat.icon className={`h-5 w-5 ${colorMap[stat.color].replace('bg-', 'text-')}`} />
                      </div>
                      <Badge variant="outline" className={stat.trend === "up" ? "text-green-600 border-green-200" : "text-red-600 border-red-200"}>
                        {stat.trend === "up" ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                        {stat.change}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="lg:col-span-2 border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">Revenue Overview</CardTitle>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-xs font-medium rounded-md bg-orange-100 text-orange-700">Daily</button>
                  <button className="px-3 py-1 text-xs font-medium rounded-md text-gray-500 hover:bg-gray-100">Weekly</button>
                  <button className="px-3 py-1 text-xs font-medium rounded-md text-gray-500 hover:bg-gray-100">Monthly</button>
                </div>
              </CardHeader>
              <CardContent>
                <RevenueChart />
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">Orders Status</CardTitle>
              </CardHeader>
              <CardContent>
                <OrdersStats />
              </CardContent>
            </Card>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Recent Orders */}
            <Card className="lg:col-span-2 border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
                <a href="/admin/orders" className="text-sm text-orange-600 hover:text-orange-700 font-medium">View All</a>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Order ID</th>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Customer</th>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Seller</th>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Amount</th>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Status</th>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="py-3 text-sm font-medium text-orange-600">{order.id}</td>
                          <td className="py-3 text-sm text-gray-900">{order.customer}</td>
                          <td className="py-3 text-sm text-gray-600">{order.seller}</td>
                          <td className="py-3 text-sm font-medium text-gray-900">{order.amount}</td>
                          <td className="py-3">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[order.status]}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 text-sm text-gray-500">{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Top Sellers */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold">Top Sellers</CardTitle>
                <a href="/admin/sellers" className="text-sm text-orange-600 hover:text-orange-700 font-medium">View All</a>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topSellers.map((seller, index) => (
                    <div key={seller.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-semibold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{seller.name}</p>
                          <p className="text-xs text-gray-500">{seller.products} products</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">{seller.revenue}</p>
                        <p className="text-xs text-gray-500">{seller.orders} orders</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Low Stock Alerts */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Low Stock Alerts
                </CardTitle>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">4 items</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lowStockProducts.map((product) => (
                    <div key={product.sku} className="flex items-center justify-between p-3 rounded-lg border border-yellow-100 bg-yellow-50/50">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-500">SKU: {product.sku} • {product.seller}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-yellow-700">{product.stock} left</p>
                        <button className="text-xs text-orange-600 hover:text-orange-700 font-medium">Restock</button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold">Quick Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-green-50 border border-green-100">
                    <div className="flex items-center justify-between mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-xs text-green-600 font-medium">+12%</span>
                    </div>
                    <p className="text-2xl font-bold text-green-700">89%</p>
                    <p className="text-xs text-green-600">Order Completion</p>
                  </div>
                  <div className="p-4 rounded-lg bg-red-50 border border-red-100">
                    <div className="flex items-center justify-between mb-2">
                      <XCircle className="h-5 w-5 text-red-600" />
                      <span className="text-xs text-red-600 font-medium">-3%</span>
                    </div>
                    <p className="text-2xl font-bold text-red-700">3.2%</p>
                    <p className="text-xs text-red-600">Cancellation Rate</p>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                    <div className="flex items-center justify-between mb-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <span className="text-xs text-blue-600 font-medium">-5%</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-700">2.4h</p>
                    <p className="text-xs text-blue-600">Avg Response Time</p>
                  </div>
                  <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
                    <div className="flex items-center justify-between mb-2">
                      <DollarSign className="h-5 w-5 text-purple-600" />
                      <span className="text-xs text-purple-600 font-medium">+8%</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-700">$142</p>
                    <p className="text-xs text-purple-600">Avg Order Value</p>
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
