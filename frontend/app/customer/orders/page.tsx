'use client';

import { CustomerSidebar } from '@/components/customer/customer-sidebar';
import { Button } from '@/components/ui/button';
import { Search, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function CustomerOrders() {
  const [filter, setFilter] = useState('all');

  const orders = [
    {
      id: 'FYN-2024-001234',
      date: 'Jan 6, 2024',
      status: 'Delivered',
      total: 384.93,
      items: 2,
      statusColor: 'bg-green-100 text-green-800',
    },
    {
      id: 'FYN-2024-001233',
      date: 'Jan 5, 2024',
      status: 'Shipped',
      total: 250.50,
      items: 1,
      statusColor: 'bg-blue-100 text-blue-800',
    },
    {
      id: 'FYN-2024-001232',
      date: 'Jan 3, 2024',
      status: 'Processing',
      total: 125.75,
      items: 1,
      statusColor: 'bg-yellow-100 text-yellow-800',
    },
    {
      id: 'FYN-2024-001231',
      date: 'Jan 1, 2024',
      status: 'Delivered',
      total: 599.99,
      items: 3,
      statusColor: 'bg-green-100 text-green-800',
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <CustomerSidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">My Orders</h1>

          {/* Filters */}
          <div className="flex gap-3 mb-6">
            {['All', 'Delivered', 'Shipped', 'Processing'].map((status) => (
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

          {/* Orders List */}
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{order.id}</h3>
                    <p className="text-sm text-gray-600">{order.date}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${order.statusColor}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">{order.items} item(s)</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-lg font-bold text-orange-600">GH₵ {order.total.toFixed(2)}</p>
                    <Button className="bg-orange-500 hover:bg-orange-600">View Details</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
