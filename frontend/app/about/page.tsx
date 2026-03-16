'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">About Fynza</h1>

        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                Fynza is dedicated to providing a seamless online shopping experience for customers across Ghana and West Africa. 
                We believe in making quality products accessible and affordable for everyone.
              </p>
              <p className="text-gray-700">
                Our platform connects sellers and buyers through a secure, efficient, and user-friendly marketplace that prioritizes 
                customer satisfaction and trust.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg p-8 text-center">
              <div className="text-5xl font-bold text-orange-500 mb-4">10+</div>
              <p className="text-gray-700">Years of Excellence</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-3">100K+</div>
              <p className="text-gray-700">Active Sellers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-3">5M+</div>
              <p className="text-gray-700">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-3">1M+</div>
              <p className="text-gray-700">Products Listed</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Fynza?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Verified Sellers', desc: 'All sellers are verified and trusted' },
              { title: 'Secure Payments', desc: 'Multiple payment options with 100% security' },
              { title: 'Fast Delivery', desc: 'Express delivery available in major cities' },
              { title: 'Easy Returns', desc: '30-day return policy on most items' },
              { title: '24/7 Support', desc: 'Round-the-clock customer support' },
              { title: 'Best Prices', desc: 'Competitive prices with frequent promotions' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <CheckCircle className="text-orange-500 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Join the Fynza Community</h2>
          <p className="mb-6">Start shopping or selling with us today!</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
