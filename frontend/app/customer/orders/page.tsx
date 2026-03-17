'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CustomerSidebar } from '@/components/customer/customer-sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Download, Eye } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const orders = [
    {
      id: 'FYN-2024-001245',
      date: 'Jan 15, 2024',
      status: 'Delivered',
      statusColor: 'green',
      items: 3,
      total: 450.00,
      deliveryDate: 'Jan 18, 2024',
    },
    {
      id: 'FYN-2024-001244',
      date: 'Jan 12, 2024',
      status: 'In Transit',
      statusColor: 'blue',
      items: 2,
      total: 320.00,
      deliveryDate: 'Jan 20, 2024',
    },
    {
      id: 'FYN-2024-001243',
      date: 'Jan 8, 2024',
      status: 'Processing',
      statusColor: 'yellow',
      items: 1,
      total: 180.00,
      deliveryDate: 'Jan 22, 2024',
    },
    {
      id: 'FYN-2024-001242',
      date: 'Jan 5, 2024',
      status: 'Delivered',
      statusColor: 'green',
      items: 4,
      total: 620.00,
      deliveryDate: 'Jan 10, 2024',
    },
    {
      id: 'FYN-2024-001241',
      date: 'Dec 28, 2023',
      status: 'Delivered',
      statusColor: 'green',
      items: 2,
      total: 290.00,
      deliveryDate: 'Jan 2, 2024',
    },
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        <CustomerSidebar />

        <main className="flex-1">
          <div className="max-w-6xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
              <p className="text-gray-600">Track and manage all your orders</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search by order ID..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">All Orders</option>
                  <option value="processing">Processing</option>
                  <option value="in transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <Button className="bg-orange-500 hover:bg-orange-600 justify-center gap-2">
                  <Download className="h-4 w-4" />
                  Export Orders
                </Button>
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <div key={order.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                      <div>
                        <p className="text-sm text-gray-600">Order ID</p>
                        <p className="font-semibold text-gray-900">{order.id}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600">Order Date</p>
                        <p className="font-semibold text-gray-900">{order.date}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-${order.statusColor}-100 text-${order.statusColor}-800`}>
                          {order.status}
                        </span>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600">Total</p>
                        <p className="font-semibold text-gray-900">GHS {order.total.toFixed(2)}</p>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">Track</Button>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Items</p>
                        <p className="font-semibold text-gray-900">{order.items} items</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Expected Delivery</p>
                        <p className="font-semibold text-gray-900">{order.deliveryDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Shipping</p>
                        <p className="font-semibold text-gray-900">Standard</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Payment</p>
                        <p className="font-semibold text-gray-900">Completed</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                  <p className="text-gray-600 mb-4">No orders found</p>
                  <Link href="/">
                    <Button className="bg-orange-500 hover:bg-orange-600">Continue Shopping</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
