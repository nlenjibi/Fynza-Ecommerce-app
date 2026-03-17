'use client';

import React from "react"

import { SellerSidebar } from '@/components/seller/seller-sidebar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Bell, DollarSign, Store } from 'lucide-react';
import { useState } from 'react';

export default function SellerSettings() {
  const [storeInfo, setStoreInfo] = useState({
    storeName: 'Tech Store',
    storeDescription: 'Premium technology products and accessories',
    email: 'contact@techstore.com',
    phone: '+233 24 XXX XXXX',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setStoreInfo({ ...storeInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SellerSidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Store Settings</h1>

          <Tabs defaultValue="store" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white rounded-lg shadow p-2 mb-6">
              <TabsTrigger value="store" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                Store Info
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                Security
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                Notifications
              </TabsTrigger>
              <TabsTrigger value="payments" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                Payments
              </TabsTrigger>
            </TabsList>

            {/* Store Info Tab */}
            <TabsContent value="store" className="bg-white rounded-lg shadow p-6 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Store size={24} className="text-orange-500" />
                  Store Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                    <input
                      type="text"
                      name="storeName"
                      value={storeInfo.storeName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Store Description</label>
                    <textarea
                      name="storeDescription"
                      value={storeInfo.storeDescription}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={storeInfo.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={storeInfo.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">Save Changes</Button>
                </div>
              </div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="bg-white rounded-lg shadow p-6 space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Shield size={24} className="text-orange-500" />
                Security Settings
              </h2>
              <div className="space-y-4">
                <div className="border border-gray-300 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Change Password</h3>
                  <div className="space-y-3">
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                    <Button className="w-full bg-orange-500 hover:bg-orange-600">Update Password</Button>
                  </div>
                </div>
                <div className="border border-gray-300 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-600 mb-4">Enable 2FA for enhanced security</p>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
              </div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Bell size={24} className="text-orange-500" />
                Notification Preferences
              </h2>
              <div className="space-y-4">
                {[
                  { label: 'New Orders', desc: 'Get notified when you receive new orders' },
                  { label: 'Customer Messages', desc: 'Notifications for customer inquiries' },
                  { label: 'Stock Alerts', desc: 'Alert when products are low in stock' },
                  { label: 'Payment Updates', desc: 'Updates about payouts and payments' },
                  { label: 'Promotional Emails', desc: 'Updates about new features and promotions' },
                ].map((item) => (
                  <label key={item.label} className="flex items-start gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-orange-500 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </TabsContent>

            {/* Payments Tab */}
            <TabsContent value="payments" className="bg-white rounded-lg shadow p-6 space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <DollarSign size={24} className="text-orange-500" />
                Payment Settings
              </h2>
              <div className="space-y-4">
                <div className="border border-gray-300 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Bank Account</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Bank Name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                    <input
                      type="text"
                      placeholder="Account Holder Name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                    <input
                      type="text"
                      placeholder="Account Number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                    <Button className="w-full bg-orange-500 hover:bg-orange-600">Update Bank Details</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
