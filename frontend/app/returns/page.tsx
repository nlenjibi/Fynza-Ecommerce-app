'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Return & Refund Policy</h1>
        <p className="text-gray-600 mb-8">We want you to be completely satisfied with your purchase</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <Clock className="w-12 h-12 text-orange-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">30-Day Returns</h3>
            <p className="text-sm text-gray-600">Return items within 30 days of delivery</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Full Refunds</h3>
            <p className="text-sm text-gray-600">Get your money back quickly and easily</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <AlertCircle className="w-12 h-12 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Easy Process</h3>
            <p className="text-sm text-gray-600">Simple return initiation and tracking</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-8 space-y-6 mb-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Return Eligibility</h2>
            <p className="text-gray-700 mb-3">Items are eligible for return if they meet all of the following conditions:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Purchased within the last 30 days</li>
              <li>In original, unused condition</li>
              <li>In original packaging with all accessories and documents</li>
              <li>Not damaged due to misuse or normal wear</li>
              <li>From authorized Fynza sellers</li>
            </ul>
          </section>

          <section className="border-t pt-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Items Not Eligible for Return</h2>
            <p className="text-gray-700 mb-3">The following items cannot be returned:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Items showing signs of use or wear</li>
              <li>Items without original packaging</li>
              <li>Customized or personalized products</li>
              <li>Perishable items</li>
              <li>Items purchased as "final sale"</li>
            </ul>
          </section>

          <section className="border-t pt-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Initiate a Return</h2>
            <div className="bg-gray-50 p-4 rounded space-y-3">
              <div className="flex gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-bold">1</span>
                <div>
                  <p className="font-semibold text-gray-900">Log in to Your Account</p>
                  <p className="text-sm text-gray-600">Go to "My Orders" and find the item you want to return</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-bold">2</span>
                <div>
                  <p className="font-semibold text-gray-900">Click "Return Item"</p>
                  <p className="text-sm text-gray-600">Select the reason and provide photos if needed</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-bold">3</span>
                <div>
                  <p className="font-semibold text-gray-900">Get Return Label</p>
                  <p className="text-sm text-gray-600">Download or print your return shipping label</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-bold">4</span>
                <div>
                  <p className="font-semibold text-gray-900">Ship It Back</p>
                  <p className="text-sm text-gray-600">Package the item and drop it off at any courier location</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-bold">5</span>
                <div>
                  <p className="font-semibold text-gray-900">Get Your Refund</p>
                  <p className="text-sm text-gray-600">Refund processed within 7-10 business days of receipt</p>
                </div>
              </div>
            </div>
          </section>

          <section className="border-t pt-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Timeline</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Return request received: Immediately</li>
              <li>Return label issued: Same day</li>
              <li>Item shipped: Up to 3 days</li>
              <li>Item received and inspected: 2-3 business days</li>
              <li>Refund processed: Within 7-10 business days</li>
            </ul>
          </section>

          <section className="border-t pt-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Costs</h2>
            <p className="text-gray-700 mb-2">
              Free return shipping applies for defective items or seller errors. For other returns, customers may be responsible 
              for return shipping costs. Express returns may have additional fees.
            </p>
          </section>

          <section className="border-t pt-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Damaged or Defective Items</h2>
            <p className="text-gray-700 mb-3">
              If you receive a damaged or defective item, report it immediately:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Contact our support team within 48 hours of delivery</li>
              <li>Provide clear photos of the damage or defect</li>
              <li>Keep original packaging and all accessories</li>
              <li>We'll arrange immediate replacement or refund</li>
            </ul>
          </section>
        </div>

        <div className="bg-orange-50 border-l-4 border-orange-500 rounded p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
          <p className="text-gray-700 mb-4">
            If you have questions about returns or need assistance, our customer support team is here to help.
          </p>
          <a href="/contact">
            <Button className="bg-orange-500 hover:bg-orange-600">Contact Support</Button>
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
