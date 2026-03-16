'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ChevronRight, Truck, Package, Gift, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function DeliveryCostPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/help" className="hover:text-orange-500">Help Center</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/help#delivery" className="hover:text-orange-500">Delivery</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">How much does delivery cost?</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">Delivery Costs</h1>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white">
            <h2 className="text-xl font-semibold mb-2">Delivery Pricing</h2>
            <p className="text-purple-100">Transparent pricing with no hidden fees</p>
          </div>

          <div className="p-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold">Free Delivery on orders over GH₵ 100!</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="border rounded-lg p-6 text-center">
                <Truck className="h-10 w-10 text-purple-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Standard Delivery</h3>
                <p className="text-2xl font-bold text-purple-600">GH₵ 10</p>
                <p className="text-sm text-gray-500 mt-1">Orders under GH₵ 100</p>
                <p className="text-xs text-gray-400 mt-2">3-7 business days</p>
              </div>

              <div className="border-2 border-orange-500 rounded-lg p-6 text-center bg-orange-50">
                <Package className="h-10 w-10 text-orange-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Express Delivery</h3>
                <p className="text-2xl font-bold text-orange-600">GH₵ 15</p>
                <p className="text-sm text-gray-500 mt-1">All orders</p>
                <p className="text-xs text-gray-400 mt-2">1-3 business days</p>
              </div>

              <div className="border rounded-lg p-6 text-center">
                <Gift className="h-10 w-10 text-green-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Free Delivery</h3>
                <p className="text-2xl font-bold text-green-600">GH₵ 0</p>
                <p className="text-sm text-gray-500 mt-1">Orders over GH₵ 100</p>
                <p className="text-xs text-gray-400 mt-2">5-7 business days</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Delivery Options:</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Pickup Station</h4>
                  <p className="text-sm text-gray-500">Collect from nearest pickup station</p>
                </div>
                <span className="font-bold text-green-600">GH₵ 5.99</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Scheduled Delivery</h4>
                  <p className="text-sm text-gray-500">Choose your preferred delivery date</p>
                </div>
                <span className="font-bold text-gray-900">GH₵ 8.99</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Large Items Delivery</h4>
                  <p className="text-sm text-gray-500">Appliances, furniture, etc.</p>
                </div>
                <span className="font-bold text-gray-900">From GH₵ 25</span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">💡 Pro Tips</h3>
              <ul className="space-y-2 text-blue-800 text-sm">
                <li>• Bundle items together to reach GH₵ 100 for free delivery</li>
                <li>• Subscribe to Fynza Prime for free express delivery</li>
                <li>• Check for promotional free delivery codes</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
