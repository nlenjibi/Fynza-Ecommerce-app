"use client";

import { useState } from "react";
import { SellerSidebar } from "@/components/seller/seller-sidebar";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  ShoppingCart,
  Package,
  DollarSign,
  Star,
  AlertCircle,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  TrendingDown,
} from "lucide-react";
import Link from "next/link";

export default function SellerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dashboard Statistics
  const stats = [
    {
      label: "Total Products",
      value: "156",
      change: "+12",
      icon: Package,
      color: "bg-blue-100 text-blue-600",
      trend: "up",
    },
    {
      label: "Total Orders",
      value: "1,245",
      change: "+23%",
      icon: ShoppingCart,
      color: "bg-purple-100 text-purple-600",
      trend: "up",
    },
    {
      label: "Pending Orders",
      value: "28",
      change: "-5",
      icon: Clock,
      color: "bg-orange-100 text-orange-600",
      trend: "down",
    },
    {
      label: "Completed Orders",
      value: "1,089",
      change: "+18%",
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
      trend: "up",
    },
    {
      label: "Cancelled Orders",
      value: "45",
      change: "-2",
      icon: XCircle,
      color: "bg-red-100 text-red-600",
      trend: "down",
    },
    {
      label: "Refunded Orders",
      value: "23",
      change: "+1",
      icon: RefreshCw,
      color: "bg-yellow-100 text-yellow-600",
      trend: "up",
    },
    {
      label: "Total Revenue",
      value: "GH₵ 45,230",
      change: "+15.3%",
      icon: DollarSign,
      color: "bg-green-100 text-green-600",
      trend: "up",
    },
    {
      label: "Store Rating",
      value: "4.8",
      change: "(328 reviews)",
      icon: Star,
      color: "bg-yellow-100 text-yellow-600",
      trend: "neutral",
    },
  ];

  // Sales Data
  const dailySales = [
    { day: "Mon", sales: 1200 },
    { day: "Tue", sales: 1800 },
    { day: "Wed", sales: 1400 },
    { day: "Thu", sales: 2100 },
    { day: "Fri", sales: 2800 },
    { day: "Sat", sales: 3200 },
    { day: "Sun", sales: 2400 },
  ];

  const weeklySales = [
    { week: "Week 1", sales: 12400 },
    { week: "Week 2", sales: 18200 },
    { week: "Week 3", sales: 15600 },
    { week: "Week 4", sales: 21300 },
  ];

  const monthlySales = [
    { month: "Jan", sales: 42000 },
    { month: "Feb", sales: 38000 },
    { month: "Mar", sales: 52000 },
    { month: "Apr", sales: 49000 },
    { month: "May", sales: 61000 },
    { month: "Jun", sales: 58000 },
  ];

  // Recent Orders
  const recentOrders = [
    {
      id: "ORD-7821",
      customer: "Abena Mensah",
      product: "Wireless Bluetooth Earbuds",
      amount: 189.99,
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-800",
      date: "Jan 8, 2024",
    },
    {
      id: "ORD-7820",
      customer: "Kofi Doe",
      product: "Smart Watch Series 5",
      amount: 450.0,
      status: "Processing",
      statusColor: "bg-blue-100 text-blue-800",
      date: "Jan 8, 2024",
    },
    {
      id: "ORD-7819",
      customer: "Sarah Adjei",
      product: "Laptop Stand Adjustable",
      amount: 89.99,
      status: "Shipped",
      statusColor: "bg-purple-100 text-purple-800",
      date: "Jan 7, 2024",
    },
    {
      id: "ORD-7818",
      customer: "John Amponsah",
      product: "USB-C Hub 7-in-1",
      amount: 129.99,
      status: "Delivered",
      statusColor: "bg-green-100 text-green-800",
      date: "Jan 7, 2024",
    },
    {
      id: "ORD-7817",
      customer: "Emma Owusu",
      product: "Phone Case Premium",
      amount: 45.99,
      status: "Cancelled",
      statusColor: "bg-red-100 text-red-800",
      date: "Jan 6, 2024",
    },
  ];

  // Top Selling Products
  const topProducts = [
    { name: "Wireless Earbuds Pro", sales: 156, revenue: "GH₵ 29,844", growth: "+12%" },
    { name: "Smart Watch Band", sales: 89, revenue: "GH₵ 8,899", growth: "+8%" },
    { name: "Phone Case Premium", sales: 234, revenue: "GH₵ 10,692", growth: "+25%" },
    { name: "Laptop Sleeve 15.6\"", sales: 67, revenue: "GH₵ 6,699", growth: "+5%" },
  ];

  // Low Stock Products
  const lowStockProducts = [
    { name: "Wireless Headphones", stock: 5, threshold: 10 },
    { name: "USB-C Cable 2m", stock: 3, threshold: 15 },
    { name: "Screen Protector", stock: 8, threshold: 20 },
  ];

  // Customer Reviews
  const recentReviews = [
    { customer: "Kofi M.", rating: 5, comment: "Great product, fast shipping!", date: "2 hours ago" },
    { customer: "Sarah A.", rating: 4, comment: "Good quality, slight delay in delivery", date: "1 day ago" },
    { customer: "John D.", rating: 5, comment: "Excellent seller, highly recommended!", date: "2 days ago" },
  ];

  // Calculate max values for charts
  const maxDailySales = Math.max(...dailySales.map((d) => d.sales));
  const maxMonthlySales = Math.max(...monthlySales.map((d) => d.sales));

  return (
    <div className="flex h-screen bg-gray-50">
      <SellerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 overflow-auto lg:ml-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </Button>
          <span className="font-semibold text-gray-900">Seller Dashboard</span>
          <div className="w-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Seller Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's your store performance overview</p>
          </div>

          {/* Alert Banner */}
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="font-semibold text-blue-900">New feature available</p>
              <p className="text-sm text-blue-700">
                Check out the new seller analytics dashboard to track your performance.
              </p>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.slice(0, 8).map((stat, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4 sm:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-xs sm:text-sm mb-1">{stat.label}</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} rounded-lg p-2 sm:p-3`}>
                    <stat.icon size={18} className="sm:w-5 sm:h-5" />
                  </div>
                </div>
                <div
                  className={`flex items-center gap-1 ${stat.trend === "up"
                      ? "text-green-600"
                      : stat.trend === "down"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                >
                  {stat.trend === "up" && <ArrowUpRight size={14} />}
                  {stat.trend === "down" && <ArrowDownRight size={14} />}
                  <span className="text-xs sm:text-sm font-medium">{stat.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Daily Sales Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Daily Sales</h2>
                <span className="text-sm text-gray-500">Last 7 days</span>
              </div>
              <div className="flex items-end justify-between gap-2 h-40">
                {dailySales.map((item, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-gradient-to-t from-orange-500 to-orange-400 rounded-t"
                      style={{ height: `${(item.sales / maxDailySales) * 100}%` }}
                    />
                    <span className="text-xs text-gray-500 mt-2">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Revenue Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Monthly Revenue</h2>
                <span className="text-sm text-gray-500">Last 6 months</span>
              </div>
              <div className="space-y-4">
                {monthlySales.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{item.month}</span>
                      <span className="text-sm font-bold text-gray-900">
                        GH₵ {item.sales.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full"
                        style={{ width: `${(item.sales / maxMonthlySales) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Orders and Products Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Recent Orders */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow">
              <div className="p-6 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <ShoppingCart className="text-orange-600" size={20} />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
                </div>
                <Link href="/seller/orders">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {order.customer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 truncate max-w-[200px]">
                          {order.product}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 text-right">
                          GH₵ {order.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${order.statusColor}`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Top Products */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <TrendingUp className="text-green-600" size={20} />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">Top Products</h2>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  {topProducts.map((product, i) => (
                    <div key={i} className="flex justify-between items-start pb-4 border-b last:border-b-0">
                      <div>
                        <p className="text-sm font-medium text-gray-900 truncate max-w-[150px]">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-600">{product.sales} sales</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">{product.revenue}</p>
                        <p className="text-xs text-green-600">{product.growth}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Low Stock Alert */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <AlertCircle className="text-red-600" size={20} />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">Low Stock Alert</h2>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {lowStockProducts.map((product, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center p-3 bg-red-50 rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                        <p className="text-xs text-red-600">
                          Only {product.stock} left (min: {product.threshold})
                        </p>
                      </div>
                      <Link href="/seller/products">
                        <Button variant="outline" size="sm" className="text-xs">
                          Restock
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Reviews and Quick Actions Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Reviews */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <Star className="text-yellow-600" size={20} />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Recent Reviews</h2>
                </div>
              </div>
              <div className="p-4 space-y-4">
                {recentReviews.map((review, i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-900">{review.customer}</p>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            size={12}
                            className={j < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{review.comment}</p>
                    <p className="text-xs text-gray-400">{review.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow p-6 text-white">
                <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <Link href="/seller/products">
                    <div className="bg-white/10 hover:bg-white/20 rounded-lg p-4 text-center transition-colors cursor-pointer">
                      <Package className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">Add Product</p>
                    </div>
                  </Link>
                  <Link href="/seller/orders">
                    <div className="bg-white/10 hover:bg-white/20 rounded-lg p-4 text-center transition-colors cursor-pointer">
                      <ShoppingCart className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">Manage Orders</p>
                    </div>
                  </Link>
                  <Link href="/seller/analytics">
                    <div className="bg-white/10 hover:bg-white/20 rounded-lg p-4 text-center transition-colors cursor-pointer">
                      <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">Analytics</p>
                    </div>
                  </Link>
                  <Link href="/seller/promotions">
                    <div className="bg-white/10 hover:bg-white/20 rounded-lg p-4 text-center transition-colors cursor-pointer">
                      <DollarSign className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">Promotions</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
