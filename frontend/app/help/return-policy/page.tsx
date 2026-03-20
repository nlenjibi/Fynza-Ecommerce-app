'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ChevronRight, RefreshCw, Package, Truck, CreditCard, CheckCircle, AlertCircle, Shield } from 'lucide-react';
import Link from 'next/link';

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/help" className="hover:text-orange-500">Help Center</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/help#returns" className="hover:text-orange-500">Returns & Refunds</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">Return Policy</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">Return Policy</h1>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
            <h2 className="text-xl font-semibold mb-2">Fynza Return Policy</h2>
            <p className="text-orange-100">We want you to love your purchase. If you're not satisfied, we're here to help.</p>
          </div>

          <div className="p-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-blue-800 text-sm">Our return policy allows you to return products within 7 days of delivery for most items. Please read the full policy below for specific conditions.</p>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Eligibility for Returns:</h3>

            <div className="space-y-4 mb-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Original Condition</h4>
                  <p className="text-gray-600 mt-1">Product must be in its original condition with all tags, packaging, and accessories intact.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Unopened/Sealed Items</h4>
                  <p className="text-gray-600 mt-1">Sealed items must remain sealed. Opened electronics may be returned if defective.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Proof of Purchase</h4>
                  <p className="text-gray-600 mt-1">Original receipt or order confirmation must be provided for all returns.</p>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Items Not Eligible for Return:</h3>

            <div className="bg-red-50 rounded-lg p-4 mb-6">
              <ul className="space-y-2 text-red-700">
                <li>✗ Used or worn items (unless defective)</li>
                <li>✗ Personal care items (makeup, skincare, hygiene products)</li>
                <li>✗ Digital products and software</li>
                <li>✗ Gift cards and vouchers</li>
                <li>✗ Items on final sale or clearance</li>
                <li>✗ Customized or personalized items</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Return Timeframe:</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <RefreshCw className="h-6 w-6 text-orange-500" />
                  <h4 className="font-medium text-gray-900">Standard Items</h4>
                </div>
                <p className="text-sm text-gray-600">7 days from delivery</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <Package className="h-6 w-6 text-orange-500" />
                  <h4 className="font-medium text-gray-900">Defective Items</h4>
                </div>
                <p className="text-sm text-gray-600">14 days from delivery</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="h-6 w-6 text-orange-500" />
                  <h4 className="font-medium text-gray-900">Warranty Items</h4>
                </div>
                <p className="text-sm text-gray-600">Per manufacturer warranty</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Refund Process:</h3>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Refund Timeline</h4>
                  <p className="text-gray-600 mt-1">Refunds are processed within 5-7 business days after we receive and inspect your return. The amount will be credited to your original payment method.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Truck className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Return Shipping</h4>
                  <p className="text-gray-600 mt-1">For defective items, we provide free return shipping. For other returns, a shipping fee may apply based on your order value.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
          <p className="text-gray-600 mb-4">If you have questions about our return policy or need to initiate a return, please contact our support team.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              Contact Us
            </Link>
            <Link href="/help/return-product" className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              How to Return
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
