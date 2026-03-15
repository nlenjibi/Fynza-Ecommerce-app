'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ChevronRight, ShoppingCart, Check, MapPin, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function PlaceOrderPage() {
  const steps = [
    {
      number: 1,
      title: 'Browse Products',
      description: 'Search for products using the search bar or browse through categories.',
      icon: '🔍',
    },
    {
      number: 2,
      title: 'Add to Cart',
      description: 'Click "Add to Cart" on any product you wish to purchase. You can add multiple items.',
      icon: '🛒',
    },
    {
      number: 3,
      title: 'Review Cart',
      description: 'Click on the cart icon to review your selected items, quantities, and prices.',
      icon: '📋',
    },
    {
      number: 4,
      title: 'Delivery Details',
      description: 'Enter your delivery address and preferred delivery time slot.',
      icon: '🚚',
    },
    {
      number: 5,
      title: 'Payment',
      description: 'Choose your preferred payment method (Cash on Delivery, Mobile Money, or Card).',
      icon: '💳',
    },
    {
      number: 6,
      title: 'Confirm Order',
      description: 'Review your order details and click "Place Order" to complete your purchase.',
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
          <span className="text-gray-900 font-medium">Place an Order</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">How to Place an Order</h1>
        <p className="text-gray-600 mb-8">
          Follow these simple steps to place your order on Fynza. You can also watch our video guide below.
        </p>

        {/* Video Placeholder */}
        <div className="bg-gray-200 rounded-lg aspect-video mb-8 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">🎬</div>
            <p className="text-gray-600">Video guide coming soon</p>
          </div>
        </div>

        {/* Steps */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Step-by-Step Guide</h2>
          <div className="space-y-6">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                  {step.number}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <span className="text-2xl">{step.icon}</span>
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-orange-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">💡 Tips for a Great Shopping Experience</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Check product reviews and ratings before purchasing</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Verify delivery availability in your area before checkout</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Keep your phone number updated for order notifications</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Save your favorite products for quick reordering</span>
            </li>
          </ul>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Accepted Payment Methods</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">💵</div>
              <h3 className="font-medium text-gray-900">Cash on Delivery</h3>
              <p className="text-sm text-gray-600">Pay when you receive</p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">📱</div>
              <h3 className="font-medium text-gray-900">Mobile Money</h3>
              <p className="text-sm text-gray-600">MTN, Vodafone, AirtelTigo</p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">💳</div>
              <h3 className="font-medium text-gray-900">Debit/Credit Card</h3>
              <p className="text-sm text-gray-600">Visa, Mastercard</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/">
            <Button className="bg-orange-500 hover:bg-orange-600 text-lg px-8">
              Start Shopping Now
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
