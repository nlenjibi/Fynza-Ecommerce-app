'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ChevronRight, Lock, KeyRound, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ChangePasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/help" className="hover:text-orange-500">Help Center</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/help#account" className="hover:text-orange-500">Account & Settings</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">How do I change my password?</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">How to Change Your Password</h1>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
            <h2 className="text-xl font-semibold mb-2">Secure Your Account</h2>
            <p className="text-blue-100">Keep your account safe by regularly updating your password</p>
          </div>

          <div className="p-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                <div>
                  <p className="text-yellow-800 text-sm">For your security, we recommend changing your password every 3-6 months and using a unique password that you don't use for other accounts.</p>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Change Your Password:</h3>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Log into Your Account</h4>
                  <p className="text-gray-600 mt-1">Sign in to your Fynza account using your current email and password.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Go to Account Settings</h4>
                  <p className="text-gray-600 mt-1">Click on "Account" in the top navigation, then select "Account Settings" or navigate to your profile page.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Click "Change Password"</h4>
                  <p className="text-gray-600 mt-1">Find the "Security" or "Password" section and click on "Change Password".</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Enter Your Details</h4>
                  <p className="text-gray-600 mt-1">Fill in the following:</p>
                  <ul className="mt-2 space-y-2 text-gray-600">
                    <li className="flex items-center gap-2"><KeyRound className="h-4 w-4 text-blue-500" /> Current Password</li>
                    <li className="flex items-center gap-2"><Lock className="h-4 w-4 text-blue-500" /> New Password (8-20 characters)</li>
                    <li className="flex items-center gap-2"><Lock className="h-4 w-4 text-blue-500" /> Confirm New Password</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">5</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Confirm the Change</h4>
                  <p className="text-gray-600 mt-1">Click "Save Changes" or "Update Password" to complete the process. You'll receive a confirmation email.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Password Requirements
              </h3>
              <ul className="mt-3 space-y-2 text-green-700">
                <li>✓ At least 8 characters long</li>
                <li>✓ At least one uppercase letter (A-Z)</li>
                <li>✓ At least one lowercase letter (a-z)</li>
                <li>✓ At least one number (0-9)</li>
                <li>✓ At least one special character (!@#$%^&*)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Forgot Your Password?</h3>
          <p className="text-gray-600 mb-4">If you've forgotten your password, follow these steps:</p>
          <ol className="list-decimal list-inside space-y-2 text-gray-600 mb-4">
            <li>Click "Sign In" then "Forgot Password?"</li>
            <li>Enter your registered email address</li>
            <li>Check your email for a password reset link</li>
            <li>Click the link and create a new password</li>
          </ol>
          <Link href="/">
            <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
              Reset Password
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
