'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ChevronRight, Package, Truck, MapPin, CheckCircle, XCircle, Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function TrackOrderPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [searched, setSearched] = useState(false);

  const trackingSteps = [
    {
      status: 'Order Placed',
      description: 'Your order has been received and confirmed',
      icon: '📋',
      completed: true,
    },
    {
      status: 'Processing',
      description: 'Your order is being prepared for shipment',
      icon: '📦',
      completed: true,
    },
    {
      status: 'Shipped',
      description: 'Your order has been dispatched from our warehouse',
      icon: '🚚',
      completed: true,
    },
    {
      status: 'Out for Delivery',
      description: 'Your order is on its way to you',
      icon: '🏃',
      completed: false,
    },
    {
      status: 'Delivered',
      description: 'Your order has been delivered',
      icon: '✅',
      completed: false,
    },
  ];

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      setSearched(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/help" className="hover:text-orange-500">Help Center</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">Track Your Order</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Track Your Order</h1>
        <p className="text-gray-600 mb-8">
          Enter your order number or tracking number to get real-time updates on your delivery.
        </p>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <form onSubmit={handleTrack} className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter your order number or tracking number"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600 px-8">
              Track
            </Button>
          </form>
        </div>

        {/* Demo Tracking Result */}
        {searched && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Order #FYN{trackingNumber || '123456'}</h2>
                <p className="text-gray-600">Estimated Delivery: 2-3 business days</p>
              </div>
              <div className="text-right">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  In Transit
                </span>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              <div className="space-y-8">
                {trackingSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4 relative">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                      step.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
                    }`}>
                      {step.completed ? <CheckCircle className="h-5 w-5" /> : <Package className="h-5 w-5" />}
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className={`font-semibold ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                        {step.status}
                      </h3>
                      <p className={`text-sm ${step.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                        {step.description}
                      </p>
                      {index === 2 && (
                        <p className="text-xs text-gray-500 mt-1">Today, 10:30 AM</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Info */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Delivery Address</h3>
              <p className="text-gray-600">
                John Doe<br />
                123 Main Street, Accra<br />
                Ghana
              </p>
            </div>
          </div>
        )}

        {/* How to Track */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">How to Track Your Order</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-medium text-gray-900">Log into Your Account</h3>
                <p className="text-gray-600 text-sm">Visit the Fynza website and sign in to your account.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-medium text-gray-900">Go to My Orders</h3>
                <p className="text-gray-600 text-sm">Click on "My Orders" in your account menu to view all your orders.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-medium text-gray-900">Track Your Order</h3>
                <p className="text-gray-600 text-sm">Click on "Track Order" next to any order to see its current status and delivery timeline.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tracking via SMS */}
        <div className="bg-orange-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">📱 Track via SMS</h2>
          <p className="text-gray-700 mb-4">
            You can also track your order by sending an SMS with your order number to 1598.
          </p>
          <p className="text-sm text-gray-600">
            Example: Send "FYN 123456" to 1598
          </p>
        </div>

        {/* Delivery Timeframes */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery Timeframes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Standard Delivery</h3>
              <p className="text-gray-600 text-sm">3-7 business days</p>
              <p className="text-green-600 text-sm font-medium">Free for orders over GH₵ 100</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Express Delivery</h3>
              <p className="text-gray-600 text-sm">1-3 business days</p>
              <p className="text-orange-600 text-sm font-medium">GH₵ 15.00</p>
            </div>
          </div>
        </div>

        {/* Need Help */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">Having trouble tracking your order?</p>
          <Link href="/contact">
            <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
              Contact Customer Support
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
