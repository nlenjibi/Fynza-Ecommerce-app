'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function OrderConfirmationPage() {
  const orderNumber = 'FYN-2024-001234';
  const orderDate = new Date().toLocaleDateString();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-8 text-center mb-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been successfully placed.</p>
          
          <div className="bg-gray-50 p-6 rounded mb-6">
            <p className="text-gray-600 mb-1">Order Number</p>
            <p className="text-2xl font-bold text-gray-900 mb-4">{orderNumber}</p>
            <p className="text-gray-600 mb-1">Order Date</p>
            <p className="text-lg text-gray-900">{orderDate}</p>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Details</h2>
            <div className="space-y-3 text-left">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Girls PU Leather Princess Shoes</span>
                <span className="font-semibold">GH₵ 166.66</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Boys Sports Hook & Loop Shoes</span>
                <span className="font-semibold">GH₵ 199.94</span>
              </div>
              <div className="border-t flex justify-between py-2 font-bold">
                <span>Subtotal</span>
                <span>GH₵ 366.60</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Tax (5%)</span>
                <span>GH₵ 18.33</span>
              </div>
              <div className="border-t border-b flex justify-between py-3 text-lg font-bold text-orange-500">
                <span>Total</span>
                <span>GH₵ 384.93</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Delivery Address</h2>
          <div className="text-gray-700">
            <p className="font-medium">John Doe</p>
            <p>123 Main Street</p>
            <p>Accra, Ghana</p>
            <p>+233 24 XXX XXXX</p>
          </div>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
            <p className="text-sm text-blue-800">
              📦 Your order will be delivered within 3-5 business days. You'll receive a tracking number via email.
            </p>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Link href="/my-orders">
            <Button className="bg-orange-500 hover:bg-orange-600">View My Orders</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Continue Shopping</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
