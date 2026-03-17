'use client';

import { SellerSidebar } from '@/components/seller/seller-sidebar';
import { Button } from '@/components/ui/button';
import { Search, Download } from 'lucide-react';
import { useState } from 'react';

export default function SellerOrders() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const orders = [
    {
      id: 'ORD-5234',
      customer: 'Sarah Johnson',
      product: 'Wireless Headphones',
      quantity: 1,
      amount: 299.99,
      date: 'Jan 8, 2024',
      status: 'Pending',
      statusColor: 'bg-yellow-100 text-yellow-800',
    },
    {
      id: 'ORD-5233',
      customer: 'Mike Chen',
      product: 'USB-C Hub',
      quantity: 2,
      amount: 99.98,
      date: 'Jan 7, 2024',
      status: 'Shipped',
      statusColor: 'bg-blue-100 text-blue-800',
    },
    {
      id: 'ORD-5232',
      customer: 'Emily Davis',
      product: 'Phone Case Set',
      quantity: 3,
      amount: 89.97,
      date: 'Jan 6, 2024',
      status: 'Delivered',
      statusColor: 'bg-green-100 text-green-800',
    },
    {
      id: 'ORD-5231',
      customer: 'John Smith',
      product: 'Screen Protector',
      quantity: 5,
      amount: 99.95,
      date: 'Jan 5, 2024',
      status: 'Delivered',
      statusColor: 'bg-green-100 text-green-800',
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <SellerSidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
            <Button className="bg-orange-500 hover:bg-orange-600 flex items-center gap-2">
              <Download size={18} />
              Export Report
            </Button>
          </div>

          {/* Filters */}
          <div className="flex gap-3 mb-6">
            {['All', 'Pending', 'Shipped', 'Delivered'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status.toLowerCase())}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === status.toLowerCase()
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex items-center gap-2">
              <Search className="text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by order ID or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 outline-none text-gray-700"
              />
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Order ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Customer</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Product</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Qty</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 text-gray-600">{order.customer}</td>
                    <td className="px-6 py-4 text-gray-600">{order.product}</td>
                    <td className="px-6 py-4 text-center text-gray-900">{order.quantity}</td>
                    <td className="px-6 py-4 text-right font-semibold text-gray-900">GH₵ {order.amount}</td>
                    <td className="px-6 py-4 text-gray-600">{order.date}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button variant="outline" size="sm">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
