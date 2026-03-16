'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ChevronRight, RefreshCw, Package, Truck, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function ReturnProductPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/help" className="hover:text-orange-500">Help Center</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/help#returns" className="hover:text-orange-500">Returns & Refunds</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">How do I return a product?</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">How to Return a Product</h1>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
            <h2 className="text-xl font-semibold mb-2">Return Process</h2>
            <p className="text-red-100">Hassle-free returns within 7 days of delivery</p>
          </div>

          <div className="p-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                <div>
                  <p className="text-yellow-800 text-sm">You have 7 days from the date of delivery to initiate a return. The product must be unused, in original packaging, and with all tags attached.</p>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Step-by-Step Return Process:</h3>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Go to My Orders</h4>
                  <p className="text-gray-600 mt-1">Log into your account and navigate to "My Orders" to find the order containing the item you wish to return.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Select the Item</h4>
                  <p className="text-gray-600 mt-1">Find the specific item you want to return and click "Return Item" next to it.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Select Return Reason</h4>
                  <p className="text-gray-600 mt-1">Choose from the available reasons: Wrong item received, Defective product, Not as described, Changed mind, or Other.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Schedule Pickup</h4>
                  <p className="text-gray-600 mt-1">Choose whether you want a pickup or drop-off. Schedule a convenient time for our courier to collect the item.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold">5</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Prepare the Package</h4>
                  <p className="text-gray-600 mt-1">Pack the item in original packaging with all accessories, tags, and invoice. Seal the package securely.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold">6</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Hand Over to Courier</h4>
                  <p className="text-gray-600 mt-1">Our courier will collect the package at the scheduled time. You'll receive a confirmation once the return is processed.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                What Happens Next
              </h3>
              <ul className="mt-3 space-y-2 text-green-700">
                <li>✓ Return is inspected within 3-5 business days</li>
                <li>✓ Refund is processed to original payment method</li>
                <li>✓ You'll receive email confirmation at each step</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Return Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Truck className="h-6 w-6 text-orange-500" />
                <h4 className="font-medium text-gray-900">Home Pickup</h4>
              </div>
              <p className="text-sm text-gray-600">We collect the item from your address. Free for orders over GH₵ 100.</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Package className="h-6 w-6 text-orange-500" />
                <h4 className="font-medium text-gray-900">Drop-off Point</h4>
              </div>
              <p className="text-sm text-gray-600">Drop the item at nearest pickup station. Reduced return fee.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
