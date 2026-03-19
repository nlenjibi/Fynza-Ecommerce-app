'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ChevronRight, Store, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BecomeSellerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/help" className="hover:text-orange-500">Help Center</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">Become a Seller</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">Become a Seller on Fynza</h1>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
            <h2 className="text-xl font-semibold mb-2">Start Selling on Fynza</h2>
            <p className="text-orange-100">Reach millions of customers and grow your business</p>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Become a Seller</h3>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="font-medium text-gray-900">Create a Seller Account</h4>
                  <p className="text-gray-600 text-sm mt-1">Sign up for a seller account using your email and business details.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="font-medium text-gray-900">Verify Your Business</h4>
                  <p className="text-gray-600 text-sm mt-1">Submit your business documents for verification.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h4 className="font-medium text-gray-900">List Your Products</h4>
                  <p className="text-gray-600 text-sm mt-1">Add your products with descriptions, images, and pricing.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h4 className="font-medium text-gray-900">Start Selling</h4>
                  <p className="text-gray-600 text-sm mt-1">Once approved, you can start receiving orders and growing your business.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <Link href="/seller">
                <Button className="bg-orange-500 hover:bg-orange-600">
                  Start Selling <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Benefits of Selling on Fynza</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle className="h-4 w-4 text-orange-500" /> Reach millions of customers across Ghana
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle className="h-4 w-4 text-orange-500" /> Easy-to-use seller dashboard
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle className="h-4 w-4 text-orange-500" /> Secure payment processing
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle className="h-4 w-4 text-orange-500" /> 24/7 seller support
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
