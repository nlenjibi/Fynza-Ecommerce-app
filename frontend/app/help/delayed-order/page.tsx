'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ChevronRight, Clock, Package } from 'lucide-react';
import Link from 'next/link';

export default function DelayedOrderPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/help" className="hover:text-orange-500">Help Center</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/help#delivery" className="hover:text-orange-500">Delivery</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">Delayed Order</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">What to Do If Your Order Is Delayed</h1>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
            <h2 className="text-xl font-semibold mb-2">Order Delay Support</h2>
            <p className="text-orange-100">We're here to help you track and resolve delayed orders</p>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Your Order Might Be Delayed</h3>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 text-gray-700">
                <Clock className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>High order volume during promotions or holidays</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <Package className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>Weather conditions affecting delivery routes</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <Clock className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>Address verification or customs clearance</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <Package className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>Product availability issues</span>
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">What You Can Do</h3>
            
            <ol className="space-y-4 mb-6">
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="font-medium text-gray-900">Check Your Tracking Information</h4>
                  <p className="text-gray-600 text-sm mt-1">Log into your account and visit "My Orders" to see the latest tracking updates.</p>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="font-medium text-gray-900">Wait 24-48 Hours</h4>
                  <p className="text-gray-600 text-sm mt-1">Sometimes tracking updates are delayed. Please wait a day or two before taking further action.</p>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h4 className="font-medium text-gray-900">Contact Customer Support</h4>
                  <p className="text-gray-600 text-sm mt-1">If your order is significantly delayed, contact us for assistance.</p>
                </div>
              </li>
            </ol>

            <div className="bg-orange-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Need Help?</h4>
              <p className="text-sm text-gray-600 mb-3">Our support team is ready to assist you with delayed orders.</p>
              <div className="flex gap-2">
                <Link href="/contact">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-sm">Contact Support</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
