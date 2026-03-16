'use client';

import React from "react"

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AccountSettingsPage() {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+233 24 XXX XXXX',
  });

  const [addressData, setAddressData] = useState({
    street: '123 Main Street',
    city: 'Accra',
    region: 'Accra',
    zipCode: '00100',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Account Settings</h1>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white rounded-lg shadow p-2 mb-6">
            <TabsTrigger value="personal" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Personal Info
            </TabsTrigger>
            <TabsTrigger value="address" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Addresses
            </TabsTrigger>
            <TabsTrigger value="password" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Password
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Notifications
            </TabsTrigger>
          </TabsList>

          {/* Personal Information */}
          <TabsContent value="personal" className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="col-span-2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="col-span-2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
              />
            </div>
            <Button className="mt-6 bg-orange-500 hover:bg-orange-600">Save Changes</Button>
          </TabsContent>

          {/* Addresses */}
          <TabsContent value="address" className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Delivery Addresses</h2>
            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-gray-900">Primary Address</h3>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="street"
                    placeholder="Street Address"
                    value={addressData.street}
                    onChange={handleAddressChange}
                    className="col-span-2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={addressData.city}
                    onChange={handleAddressChange}
                    className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                  />
                  <select
                    name="region"
                    value={addressData.region}
                    onChange={handleAddressChange}
                    className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                  >
                    <option>Select Region</option>
                    <option value="accra">Accra</option>
                    <option value="kumasi">Kumasi</option>
                    <option value="takoradi">Takoradi</option>
                  </select>
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="Zip Code"
                    value={addressData.zipCode}
                    onChange={handleAddressChange}
                    className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>
            <Button className="mt-6 bg-orange-500 hover:bg-orange-600">Add New Address</Button>
          </TabsContent>

          {/* Password */}
          <TabsContent value="password" className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Change Password</h2>
            <div className="space-y-4 max-w-md">
              <input
                type="password"
                placeholder="Current Password"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
              />
              <input
                type="password"
                placeholder="New Password"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
              />
            </div>
            <Button className="mt-6 bg-orange-500 hover:bg-orange-600">Update Password</Button>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Settings</h2>
            <div className="space-y-4 max-w-md">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-orange-500" />
                <span className="ml-3 text-gray-700">Order Updates</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-orange-500" />
                <span className="ml-3 text-gray-700">Promotional Offers</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-orange-500" />
                <span className="ml-3 text-gray-700">Price Drop Alerts</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 accent-orange-500" />
                <span className="ml-3 text-gray-700">Newsletter</span>
              </label>
            </div>
            <Button className="mt-6 bg-orange-500 hover:bg-orange-600">Save Preferences</Button>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
