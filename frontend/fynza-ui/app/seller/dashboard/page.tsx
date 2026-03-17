'use client';

import { SellerSidebar } from '@/components/seller/seller-sidebar';
import { Button } from '@/components/ui/button';
import { TrendingUp, ShoppingCart, Package, DollarSign, Star, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function SellerDashboard() {
  const stats = [
    { label: 'Total Sales', value: 'GH₵ 12,450', change: '+12.5%', icon: TrendingUp, color: 'bg-green-100 text-green-600' },
    { label: 'Active Products', value: '24', change: '+2', icon: Package, color: 'bg-blue-100 text-blue-600' },
    { label: 'Orders Today', value: '8', change: '+3 pending', icon: ShoppingCart, color: 'bg-purple-100 text-purple-600' },
    { label: 'Store Rating', value: '4.8', change: '(328 reviews)', icon: Star, color: 'bg-orange-100 text-orange-600' },
  ];

  const recentOrders = [
    {
      id: 'ORD-5234',
      customer: 'Sarah Johnson',
      product: 'Wireless Headphones',
      amount: 299.99,
      status: 'Pending',
      statusColor: 'bg-yellow-100 text-yellow-800',
    },
    {
      id: 'ORD-5233',
      customer: 'Mike Chen',
      product: 'USB-C Hub',
      amount: 49.99,
      status: 'Shipped',
      statusColor: 'bg-blue-100 text-blue-800',
    },
    {
      id: 'ORD-5232',
      customer: 'Emily Davis',
      product: 'Phone Case Set',
      amount: 29.99,
      status: 'Delivered',
      statusColor: 'bg-green-100 text-green-800',
    },
  ];

  const topProducts = [
    { name: 'Wireless Headphones', sales: 156, revenue: 'GH₵ 46,744' },
    { name: 'USB-C Hub', sales: 89, revenue: 'GH₵ 4,451' },
    { name: 'Phone Case Set', sales: 234, revenue: 'GH₵ 7,026' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <SellerSidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Seller Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's your store performance overview</p>
          </div>

          {/* Alert */}
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="font-semibold text-blue-900">New feature available</p>
              <p className="text-sm text-blue-700">Check out the new seller analytics dashboard to track your performance.</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} rounded-lg p-3`}>
                    <stat.icon size={20} />
                  </div>
                </div>
                <p className="text-sm font-medium text-green-600">{stat.change}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Orders */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                <Link href="/seller/orders">
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left text-sm font-semibold text-gray-700 pb-3">Order ID</th>
                      <th className="text-left text-sm font-semibold text-gray-700 pb-3">Customer</th>
                      <th className="text-left text-sm font-semibold text-gray-700 pb-3">Product</th>
                      <th className="text-right text-sm font-semibold text-gray-700 pb-3">Amount</th>
                      <th className="text-left text-sm font-semibold text-gray-700 pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b last:border-b-0 hover:bg-gray-50">
                        <td className="py-3 text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="py-3 text-sm text-gray-600">{order.customer}</td>
                        <td className="py-3 text-sm text-gray-600">{order.product}</td>
                        <td className="py-3 text-sm font-semibold text-gray-900 text-right">GH₵ {order.amount}</td>
                        <td className="py-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Products & Quick Links */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Top Products</h3>
                <div className="space-y-4">
                  {topProducts.map((product, i) => (
                    <div key={i} className="flex justify-between items-start pb-4 border-b last:border-b-0">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-600">{product.sales} sales</p>
                      </div>
                      <p className="text-sm font-semibold text-orange-600">{product.revenue}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow p-6 text-white">
                <h3 className="text-lg font-bold mb-2">Quick Actions</h3>
                <div className="space-y-2">
                  <Link href="/seller/products">
                    <Button className="w-full justify-center bg-white text-orange-600 hover:bg-gray-100 mb-2">
                      Add New Product
                    </Button>
                  </Link>
                  <Link href="/seller/analytics">
                    <Button className="w-full justify-center bg-white/20 hover:bg-white/30">
                      View Analytics
                    </Button>
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
