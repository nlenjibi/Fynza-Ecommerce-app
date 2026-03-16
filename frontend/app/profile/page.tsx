'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { User, MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 mx-auto flex items-center justify-center mb-4">
                <User size={48} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">John Doe</h2>
              <p className="text-gray-600">Premium Member</p>
            </div>
            <div className="space-y-3 border-t pt-4">
              <div className="flex items-center gap-3 text-gray-700">
                <Mail size={18} />
                <span>john.doe@example.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Phone size={18} />
                <span>+233 24 XXX XXXX</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin size={18} />
                <span>Accra, Ghana</span>
              </div>
            </div>
            <Link href="/account-settings" className="block mt-4">
              <Button className="w-full bg-orange-500 hover:bg-orange-600">Edit Profile</Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-3xl font-bold text-orange-500">12</p>
                <p className="text-gray-600">Total Orders</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-3xl font-bold text-blue-500">45</p>
                <p className="text-gray-600">Wishlist Items</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-3xl font-bold text-green-500">9.8</p>
                <p className="text-gray-600">Avg Rating</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <p className="font-medium text-gray-900">Order #FYN-2024-001234</p>
                    <p className="text-sm text-gray-600">Delivered on Jan 6, 2024</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Delivered</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <p className="font-medium text-gray-900">Order #FYN-2024-001233</p>
                    <p className="text-sm text-gray-600">Shipped on Jan 5, 2024</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Shipped</span>
                </div>
                <Link href="/my-orders" className="text-orange-500 font-semibold hover:text-orange-600">
                  View All Orders →
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
