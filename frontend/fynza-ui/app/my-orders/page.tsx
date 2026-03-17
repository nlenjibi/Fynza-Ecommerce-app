'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Package, MessageCircle } from 'lucide-react';
import Link from 'next/link';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  total: number;
  items: Array<{ name: string; price: number; quantity: number }>;
}

export default function MyOrdersPage() {
  const orders: Order[] = [
    {
      id: '1',
      orderNumber: 'FYN-2024-001234',
      date: '2024-01-06',
      status: 'delivered',
      total: 384.93,
      items: [
        { name: 'Girls PU Leather Princess Shoes', price: 166.66, quantity: 1 },
        { name: 'Boys Sports Hook & Loop Shoes', price: 199.94, quantity: 1 },
      ],
    },
    {
      id: '2',
      orderNumber: 'FYN-2024-001233',
      date: '2024-01-05',
      status: 'shipped',
      total: 250.50,
      items: [{ name: 'Baby Boy Summer Casual Sets', price: 250.50, quantity: 1 }],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'shipped':
        return 'text-blue-600 bg-blue-50';
      case 'confirmed':
        return 'text-yellow-600 bg-yellow-50';
      case 'pending':
        return 'text-gray-600 bg-gray-50';
      default:
        return '';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">You haven't placed any orders yet</p>
            <Link href="/">
              <Button className="bg-orange-500 hover:bg-orange-600">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-lg shadow p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-gray-600 text-sm">Order Number</p>
                    <p className="font-semibold text-gray-900">{order.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Order Date</p>
                    <p className="font-semibold text-gray-900">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Total</p>
                    <p className="font-semibold text-orange-500 text-lg">GH₵ {order.total.toFixed(2)}</p>
                  </div>
                </div>

                <div className="border-t pt-4 mb-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between py-2 text-gray-700">
                      <span>{item.name} x{item.quantity}</span>
                      <span>GH₵ {item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 justify-end">
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <MessageCircle size={18} />
                    Contact Seller
                  </Button>
                  <Link href={`/order-confirmation`}>
                    <Button className="bg-orange-500 hover:bg-orange-600">View Details</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
