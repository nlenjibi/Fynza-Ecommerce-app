'use client';

import { CustomerSidebar } from '@/components/customer/customer-sidebar';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Heart, MapPin, Award, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function CustomerDashboard() {
  const stats = [
    { label: 'Total Orders', value: '12', icon: ShoppingBag, color: 'bg-blue-100 text-blue-600' },
    { label: 'Wishlist Items', value: '45', icon: Heart, color: 'bg-red-100 text-red-600' },
    { label: 'Saved Addresses', value: '3', icon: MapPin, color: 'bg-green-100 text-green-600' },
    { label: 'Loyalty Points', value: '2,450', icon: Award, color: 'bg-orange-100 text-orange-600' },
  ];

  const recentOrders = [
    {
      id: 'FYN-2024-001234',
      date: 'Jan 6, 2024',
      status: 'Delivered',
      total: 384.93,
      statusColor: 'bg-green-100 text-green-800',
    },
    {
      id: 'FYN-2024-001233',
      date: 'Jan 5, 2024',
      status: 'Shipped',
      total: 250.50,
      statusColor: 'bg-blue-100 text-blue-800',
    },
    {
      id: 'FYN-2024-001232',
      date: 'Jan 3, 2024',
      status: 'Processing',
      total: 125.75,
      statusColor: 'bg-yellow-100 text-yellow-800',
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <CustomerSidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back, John!</h1>
            <p className="text-gray-600">Here's your shopping activity at a glance</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} rounded-lg p-3`}>
                    <stat.icon size={24} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Orders */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                <Link href="/customer/orders">
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              </div>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div>
                      <p className="font-semibold text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.statusColor}`}>
                        {order.status}
                      </span>
                      <p className="font-semibold text-orange-600">GH₵ {order.total.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link href="/customer/wishlist">
                    <Button className="w-full justify-start gap-2 bg-orange-50 text-orange-600 hover:bg-orange-100">
                      <Heart size={18} />
                      View Wishlist
                    </Button>
                  </Link>
                  <Link href="/customer/addresses">
                    <Button className="w-full justify-start gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100">
                      <MapPin size={18} />
                      Manage Addresses
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button className="w-full justify-start gap-2 bg-green-50 text-green-600 hover:bg-green-100">
                      <ShoppingBag size={18} />
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Loyalty Program */}
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow p-6 text-white">
                <h3 className="text-lg font-bold mb-2">Loyalty Points</h3>
                <p className="text-orange-100 mb-4">Earn points on every purchase!</p>
                <div className="bg-white/20 rounded p-3 mb-4">
                  <p className="text-2xl font-bold">2,450 Points</p>
                  <p className="text-sm text-orange-100">Redeem for discounts</p>
                </div>
                <Button className="w-full bg-white text-orange-600 hover:bg-gray-100">
                  Redeem Points
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
