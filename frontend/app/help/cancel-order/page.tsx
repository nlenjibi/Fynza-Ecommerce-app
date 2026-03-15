'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ChevronRight, XCircle, Clock, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function CancelOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [showForm, setShowForm] = useState(false);

  const cancellationReasons = [
    'I found a better price elsewhere',
    'I no longer need the product',
    'I want to change the delivery address',
    'I want to change the product',
    'I placed the order by mistake',
    'Delivery is taking too long',
    'Other reason',
  ];

  const orderStatuses = [
    {
      status: 'Order Placed',
      canCancel: true,
      icon: '📋',
    },
    {
      status: 'Processing',
      canCancel: true,
      icon: '⚙️',
    },
    {
      status: 'Shipped',
      canCancel: false,
      icon: '🚚',
    },
    {
      status: 'Out for Delivery',
      canCancel: false,
      icon: '🏃',
    },
    {
      status: 'Delivered',
      canCancel: false,
      icon: '✅',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/help" className="hover:text-orange-500">Help Center</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">Cancel an Order</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Cancel an Order</h1>
        <p className="text-gray-600 mb-8">
          You can cancel your order as long as it hasn't been shipped yet. Learn about our cancellation policy below.
        </p>

        {/* Important Notice */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex gap-3">
            <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-800">Important Information</h3>
              <ul className="text-yellow-700 text-sm mt-2 space-y-1">
                <li>• Orders can only be cancelled before they are shipped</li>
                <li>• Once cancelled, refunds are processed within 5-7 business days</li>
                <li>• If you received your order, please use the Returns feature instead</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Cancel Order Form */}
        {!showForm ? (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Cancel Your Order</h2>
            <p className="text-gray-600 mb-6">Enter your order number to cancel your order.</p>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Enter order number"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <Button 
                onClick={() => setShowForm(true)}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Continue
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Cancel Order #{orderNumber || 'FYN123456'}</h2>
              <button 
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Order Status */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Order Status: Processing</h3>
              <p className="text-green-600 text-sm">✓ This order can be cancelled</p>
            </div>

            {/* Reason Selection */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Why are you cancelling?</h3>
              <div className="space-y-2">
                {cancellationReasons.map((reason, index) => (
                  <label key={index} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="reason" className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-700">{reason}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Notes */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Additional Notes (Optional)</h3>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows={3}
                placeholder="Tell us more about your cancellation..."
              ></textarea>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button className="bg-red-500 hover:bg-red-600">
                Confirm Cancellation
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                Keep Order
              </Button>
            </div>
          </div>
        )}

        {/* Cancellation Status Guide */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">When Can You Cancel?</h2>
          <div className="space-y-4">
            {orderStatuses.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="text-2xl">{item.icon}</div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.status}</h3>
                </div>
                {item.canCancel ? (
                  <span className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    Can Cancel
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-red-500">
                    <XCircle className="h-5 w-5" />
                    Cannot Cancel
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Refund Information */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Refund Information</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Clock className="h-6 w-6 text-orange-500 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">Processing Time</h3>
                <p className="text-gray-600 text-sm">Refunds are processed within 5-7 business days after cancellation.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <RefreshCw className="h-6 w-6 text-orange-500 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">Refund Method</h3>
                <p className="text-gray-600 text-sm">Refunds will be credited to your original payment method or Fynza wallet.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alternative Options */}
        <div className="bg-orange-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Need Help?</h2>
          <p className="text-gray-700 mb-4">
            If your order cannot be cancelled or if you have any questions, please contact our support team.
          </p>
          <div className="flex gap-4">
            <Link href="/contact">
              <Button className="bg-orange-500 hover:bg-orange-600">
                Contact Support
              </Button>
            </Link>
            <Link href="/my-orders">
              <Button variant="outline">
                View My Orders
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
