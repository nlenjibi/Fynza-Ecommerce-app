"use client";

import { useState } from "react";
import { SellerSidebar } from "@/components/seller/seller-sidebar";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Calendar,
} from "lucide-react";

export default function SellerAnalytics() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dateRange, setDateRange] = useState("month");

  const metrics = [
    {
      label: "Total Revenue",
      value: "GH₵ 45,230",
      change: "+23.5%",
      trend: "up",
      icon: DollarSign,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Total Orders",
      value: "1,245",
      change: "+12.3%",
      trend: "up",
      icon: ShoppingCart,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Total Customers",
      value: "856",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "Avg Order Value",
      value: "GH₵ 36.35",
      change: "-2.1%",
      trend: "down",
      icon: TrendingDown,
      color: "bg-red-100 text-red-600",
    },
    {
      label: "Conversion Rate",
      value: "3.2%",
      change: "+0.5%",
      trend: "up",
      icon: TrendingUp,
      color: "bg-orange-100 text-orange-600",
    },
    {
      label: "Refund Rate",
      value: "2.1%",
      change: "-0.3%",
      trend: "down",
      icon: TrendingDown,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  const dailySales = [
    { day: "Mon", orders: 45, revenue: 1820 },
    { day: "Tue", orders: 52, revenue: 2150 },
    { day: "Wed", orders: 48, revenue: 1890 },
    { day: "Thu", orders: 61, revenue: 2450 },
    { day: "Fri", orders: 72, revenue: 2980 },
    { day: "Sat", orders: 85, revenue: 3420 },
    { day: "Sun", orders: 68, revenue: 2750 },
  ];

  const monthlySales = [
    { month: "Jan", sales: 42000 },
    { month: "Feb", sales: 38000 },
    { month: "Mar", sales: 52000 },
    { month: "Apr", sales: 49000 },
    { month: "May", sales: 61000 },
    { month: "Jun", sales: 58000 },
  ];

  const productPerformance = [
    { name: "Wireless Earbuds Pro", sales: 156, revenue: 29844, growth: "+12%", rating: 4.8 },
    { name: "Smart Watch Series 5", sales: 89, revenue: 40050, growth: "+8%", rating: 4.9 },
    { name: "Phone Case Premium", sales: 234, revenue: 10692, growth: "+25%", rating: 4.6 },
    { name: "USB-C Hub 7-in-1", sales: 156, revenue: 7798, growth: "+15%", rating: 4.5 },
    { name: "Laptop Stand", sales: 112, revenue: 10079, growth: "+5%", rating: 4.7 },
  ];

  const salesByCategory = [
    { name: "Electronics", sales: "35%", color: "bg-blue-500", value: 35 },
    { name: "Accessories", sales: "28%", color: "bg-green-500", value: 28 },
    { name: "Gadgets", sales: "22%", color: "bg-orange-500", value: 22 },
    { name: "Others", sales: "15%", color: "bg-purple-500", value: 15 },
  ];

  const topCustomers = [
    { name: "Abena Mensah", orders: 12, spent: 2450, lastOrder: "2 days ago" },
    { name: "Kofi Doe", orders: 8, spent: 1890, lastOrder: "5 days ago" },
    { name: "Sarah Adjei", orders: 6, spent: 1560, lastOrder: "1 week ago" },
  ];

  const maxDailyOrders = Math.max(...dailySales.map((d) => d.orders));
  const maxMonthlySales = Math.max(...monthlySales.map((d) => d.sales));

  return (
    <div className="flex h-screen bg-gray-50">
      <SellerSidebar isOpen={sidebarOpen} onToggle={(open) => setSidebarOpen(open)} />

      <main className={`flex-1 overflow-auto ${sidebarOpen ? 'lg:ml-0' : 'lg:ml-20'}`}>
        {/* Sidebar Toggle Header - Shows when sidebar is collapsed */}
        {!sidebarOpen && (
          <div className="hidden lg:flex bg-white border-b border-gray-200 px-4 py-3 items-center gap-3">
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
            <span className="font-semibold text-gray-900">Analytics</span>
          </div>
        )}

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
          <span className="font-semibold text-gray-900">Analytics</span>
          <div className="w-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
              <p className="text-gray-600 mt-1">Track your store performance and sales metrics</p>
            </div>
            <div className="flex gap-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
              <Button className="bg-orange-500 hover:bg-orange-600 flex items-center gap-2">
                <Download size={18} />
                Export
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {metrics.map((metric, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4 sm:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-xs sm:text-sm mb-1">{metric.label}</p>
                    <p className="text-lg sm:text-xl font-bold text-gray-900">{metric.value}</p>
                  </div>
                  <div className={`${metric.color} rounded-lg p-2`}>
                    <metric.icon size={16} className="sm:w-5 sm:h-5" />
                  </div>
                </div>
                <div
                  className={`flex items-center gap-1 ${metric.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {metric.trend === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  <span className="text-xs sm:text-sm font-medium">{metric.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Daily Orders Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Daily Orders</h2>
                <span className="text-sm text-gray-500">Last 7 days</span>
              </div>
              <div className="flex items-end justify-between gap-2 h-48">
                {dailySales.map((item, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-gradient-to-t from-orange-500 to-orange-400 rounded-t"
                      style={{ height: `${(item.orders / maxDailyOrders) * 100}%` }}
                    />
                    <span className="text-xs text-gray-500 mt-2">{item.day}</span>
                    <span className="text-xs font-medium text-gray-900">{item.orders}</span>
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

          {/* Product Performance & Sales by Category */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Product Performance */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-lg font-bold text-gray-900">Top Products Performance</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Sales
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Revenue
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Growth
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Rating
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {productPerformance.map((product, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {product.name}
                        </td>
                        <td className="px-6 py-4 text-center text-sm text-gray-900">
                          {product.sales}
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                          GH₵ {product.revenue.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-green-600 text-sm font-medium">{product.growth}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <span className="text-yellow-400">★</span>
                            <span className="text-gray-900 text-sm">{product.rating}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sales by Category */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Sales by Category</h2>
              <div className="space-y-4">
                {salesByCategory.map((category, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{category.name}</span>
                      <span className="text-sm font-bold text-gray-900">{category.sales}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${category.color} h-2 rounded-full`}
                        style={{ width: category.sales }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Customers */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-lg font-bold text-gray-900">Top Customers</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Total Orders
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Total Spent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Last Order
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {topCustomers.map((customer, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                            <Users className="text-orange-600" size={18} />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{customer.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-900">
                        {customer.orders}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                        GH₵ {customer.spent.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {customer.lastOrder}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
