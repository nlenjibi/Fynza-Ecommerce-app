'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ChevronRight, User, Mail, Lock, Phone, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function CreateAccountPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/help" className="hover:text-orange-500">Help Center</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/help#account" className="hover:text-orange-500">Account & Settings</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">How do I create an account?</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">How to Create an Account on Fynza</h1>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
            <h2 className="text-xl font-semibold mb-2">Create Your Fynza Account</h2>
            <p className="text-orange-100">Join millions of shoppers and enjoy a personalized shopping experience</p>
          </div>

          <div className="p-6">
            <p className="text-gray-700 mb-6">
              Creating an account on Fynza is quick and easy. Follow these simple steps to get started:
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Visit the Fynza Website</h3>
                  <p className="text-gray-600 mt-1">Go to <Link href="/" className="text-orange-500 hover:underline">www.fynza.com</Link> and click on the "Account" button in the top right corner.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Click "Sign Up"</h3>
                  <p className="text-gray-600 mt-1">On the dropdown menu, click on "Sign In" and then select "Create Account" or click the "Sign Up" button.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Fill in Your Details</h3>
                  <p className="text-gray-600 mt-1">Enter the following information:</p>
                  <ul className="mt-2 space-y-2 text-gray-600">
                    <li className="flex items-center gap-2"><User className="h-4 w-4 text-orange-500" /> Full Name</li>
                    <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-orange-500" /> Email Address</li>
                    <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-orange-500" /> Phone Number</li>
                    <li className="flex items-center gap-2"><Lock className="h-4 w-4 text-orange-500" /> Password (minimum 8 characters)</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Verify Your Email</h3>
                  <p className="text-gray-600 mt-1">Check your email inbox for a verification link. Click on the link to verify your email address.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-bold">5</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Complete Your Profile</h3>
                  <p className="text-gray-600 mt-1">Add your delivery address and preferences to get personalized recommendations.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Benefits of Creating an Account
              </h3>
              <ul className="mt-3 space-y-2 text-green-700">
                <li>✓ Faster checkout with saved information</li>
                <li>✓ Track your orders in real-time</li>
                <li>✓ Save items to your wishlist</li>
                <li>✓ Get exclusive deals and promotions</li>
                <li>✓ Order history and easy reordering</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/">
            <Button className="bg-orange-500 hover:bg-orange-600 text-lg px-8">
              Create Account Now
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
