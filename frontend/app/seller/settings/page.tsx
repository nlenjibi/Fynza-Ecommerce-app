"use client";

import React, { useState } from "react";
import { SellerSidebar } from "@/components/seller/seller-sidebar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  Bell,
  DollarSign,
  Store,
  User,
  Lock,
  CreditCard,
  Truck,
  FileText,
  Eye,
  EyeOff,
  Check,
  Upload,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Globe,
  Clock,
  Image,
  Camera,
} from "lucide-react";
import { useState as useReactState } from "react";

export default function SellerSettings() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [storeInfo, setStoreInfo] = useState({
    storeName: "BEKIA FASHION",
    storeDescription: "Premium fashion store offering the latest trends in footwear and apparel. We specialize in quality shoes, bags, and accessories for the modern consumer.",
    email: "contact@bekiafashion.com",
    phone: "+233 24 123 4567",
    address: "123 Main Street, Accra, Ghana",
    returnPolicy: "We offer a 30-day return policy for all eligible products.",
    location: "Accra, Ghana",
    city: "Accra",
    region: "Greater Accra",
    facebook: "https://facebook.com/bekiafashion",
    instagram: "https://instagram.com/bekiafashion",
    twitter: "",
    workingHours: "Monday - Saturday: 9:00 AM - 6:00 PM",
  });

  const [bankInfo, setBankInfo] = useState({
    bankName: "Ghana Commercial Bank",
    accountName: "BEKIA FASHION Ltd",
    accountNumber: "1234567890",
    branch: "Accra Main",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setStoreInfo({ ...storeInfo, [e.target.name]: e.target.value });
  };

  const handleBankChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBankInfo({ ...bankInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SellerSidebar isOpen={sidebarOpen} onToggle={(open) => setSidebarOpen(open)} />

      <main className={`flex-1 overflow-auto ${sidebarOpen ? 'lg:ml-0' : 'lg:ml-20'}`}>
        {/* Sidebar Toggle Header - Shows when sidebar is collapsed */}
        {!sidebarOpen && (
          <div className="hidden lg:flex bg-white border-b border-gray-200 px-4 py-3 items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </Button>
            <span className="font-semibold text-gray-900">Settings</span>
          </div>
        )}

        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </Button>
          <span className="font-semibold text-gray-900">Settings</span>
          <div className="w-10" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Store Settings</h1>

          <Tabs defaultValue="store" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-white rounded-lg shadow p-2 mb-6">
              <TabsTrigger
                value="store"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                <Store size={16} className="mr-2" />
                Store
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                <Shield size={16} className="mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                <Bell size={16} className="mr-2" />
                Alerts
              </TabsTrigger>
              <TabsTrigger
                value="payments"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                <DollarSign size={16} className="mr-2" />
                Payments
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                <Truck size={16} className="mr-2" />
                Shipping
              </TabsTrigger>
            </TabsList>

            {/* Store Info Tab */}
            <TabsContent value="store" className="bg-white rounded-lg shadow p-6 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Store size={24} className="text-orange-500" />
                  Store Information
                </h2>
                <div className="space-y-6">
                  {/* Store Banner */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Store Banner
                    </label>
                    <div className="relative h-40 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white text-center">
                          <Camera className="h-8 w-8 mx-auto mb-2 opacity-80" />
                          <p className="text-sm opacity-80">Click to upload banner image</p>
                          <p className="text-xs opacity-60">Recommended: 1200x300px, JPG or PNG</p>
                        </div>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute bottom-3 right-3 bg-white/90 hover:bg-white"
                      >
                        <Upload size={14} className="mr-1" />
                        Change Banner
                      </Button>
                    </div>
                  </div>

                  {/* Store Logo */}
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-orange-100 rounded-lg flex items-center justify-center overflow-hidden">
                      <Store className="text-orange-600 w-10 h-10" />
                    </div>
                    <div>
                      <Button variant="outline" size="sm">
                        <Upload size={16} className="mr-2" />
                        Upload Logo
                      </Button>
                      <p className="text-xs text-gray-500 mt-1">
                        Recommended: 200x200px, PNG or JPG
                      </p>
                    </div>
                  </div>

                  {/* Store Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Store Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="storeName"
                      value={storeInfo.storeName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      required
                    />
                  </div>

                  {/* Store Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Store Description
                    </label>
                    <textarea
                      name="storeDescription"
                      value={storeInfo.storeDescription}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 resize-none"
                      placeholder="Describe your store, products, and services..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This will be displayed on your store page
                    </p>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={storeInfo.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={storeInfo.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin size={16} className="inline mr-1" />
                      Store Location
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <select
                          name="region"
                          value={storeInfo.region}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        >
                          <option value="Greater Accra">Greater Accra</option>
                          <option value="Ashanti">Ashanti</option>
                          <option value="Western">Western</option>
                          <option value="Central">Central</option>
                          <option value="Eastern">Eastern</option>
                          <option value="Volta">Volta</option>
                          <option value="Northern">Northern</option>
                          <option value="Upper East">Upper East</option>
                          <option value="Upper West">Upper West</option>
                        </select>
                      </div>
                      <div>
                        <input
                          type="text"
                          name="city"
                          value={storeInfo.city}
                          onChange={handleChange}
                          placeholder="City/Town"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={storeInfo.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      placeholder="Street address, landmark, etc."
                    />
                  </div>

                  {/* Working Hours */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock size={16} className="inline mr-1" />
                      Working Hours
                    </label>
                    <input
                      type="text"
                      name="workingHours"
                      value={storeInfo.workingHours}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      placeholder="Monday - Friday: 9:00 AM - 6:00 PM"
                    />
                  </div>

                  {/* Social Links */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      <Globe size={16} className="inline mr-1" />
                      Social Media Links
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                          <Facebook className="text-white h-5 w-5" />
                        </div>
                        <input
                          type="url"
                          name="facebook"
                          value={storeInfo.facebook}
                          onChange={handleChange}
                          placeholder="Facebook URL"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-sm"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center">
                          <Instagram className="text-white h-5 w-5" />
                        </div>
                        <input
                          type="url"
                          name="instagram"
                          value={storeInfo.instagram}
                          onChange={handleChange}
                          placeholder="Instagram URL"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-sm"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center">
                          <Twitter className="text-white h-5 w-5" />
                        </div>
                        <input
                          type="url"
                          name="twitter"
                          value={storeInfo.twitter}
                          onChange={handleChange}
                          placeholder="Twitter/X URL"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-sm"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Add your social media links to help customers connect with you
                    </p>
                  </div>

                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    <Check size={16} className="mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="bg-white rounded-lg shadow p-6 space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Shield size={24} className="text-orange-500" />
                Security Settings
              </h2>

              {/* Change Password */}
              <div className="border border-gray-300 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Lock size={18} className="text-gray-500" />
                  Change Password
                </h3>
                <div className="space-y-3">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Current Password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm New Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    Update Password
                  </Button>
                </div>
              </div>

              {/* Two-Factor Authentication */}
              <div className="border border-gray-300 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-sm text-gray-600">
                      Enable 2FA for enhanced account security
                    </p>
                  </div>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
              </div>

              {/* Active Sessions */}
              <div className="border border-gray-300 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User size={18} className="text-gray-500" />
                  Active Sessions
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Current Session</p>
                      <p className="text-sm text-gray-500">Chrome on Windows • Accra, Ghana</p>
                    </div>
                    <span className="text-xs text-green-600 font-medium">Active</span>
                  </div>
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
                  {
                    label: "New Orders",
                    desc: "Get notified when you receive new orders",
                    enabled: true,
                  },
                  {
                    label: "Order Updates",
                    desc: "Updates on order status changes",
                    enabled: true,
                  },
                  {
                    label: "Customer Messages",
                    desc: "Notifications for customer inquiries",
                    enabled: true,
                  },
                  {
                    label: "Stock Alerts",
                    desc: "Alert when products are low in stock",
                    enabled: true,
                  },
                  {
                    label: "Payment Updates",
                    desc: "Updates about payouts and payments",
                    enabled: true,
                  },
                  {
                    label: "Refund Requests",
                    desc: "Notifications for new refund requests",
                    enabled: true,
                  },
                  {
                    label: "Promotional Emails",
                    desc: "Updates about new features and promotions",
                    enabled: false,
                  },
                ].map((item, i) => (
                  <label
                    key={i}
                    className="flex items-start gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={item.enabled}
                      className="w-5 h-5 accent-orange-500 mt-0.5"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
              <Button className="w-full mt-6 bg-orange-500 hover:bg-orange-600">
                Save Preferences
              </Button>
            </TabsContent>

            {/* Payments Tab */}
            <TabsContent value="payments" className="bg-white rounded-lg shadow p-6 space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <DollarSign size={24} className="text-orange-500" />
                Payment Settings
              </h2>

              {/* Bank Account */}
              <div className="border border-gray-300 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard size={18} className="text-gray-500" />
                  Bank Account (Paystack Payouts)
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bank Name
                    </label>
                    <select
                      name="bankName"
                      value={bankInfo.bankName}
                      onChange={(e) => setBankInfo({ ...bankInfo, bankName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    >
                      <option value="Ghana Commercial Bank">Ghana Commercial Bank</option>
                      <option value="Ecobank">Ecobank</option>
                      <option value="UT Bank">UT Bank</option>
                      <option value="Access Bank">Access Bank</option>
                      <option value="Fidelity Bank">Fidelity Bank</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Holder Name
                    </label>
                    <input
                      type="text"
                      name="accountName"
                      value={bankInfo.accountName}
                      onChange={handleBankChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Number
                    </label>
                    <input
                      type="text"
                      name="accountNumber"
                      value={bankInfo.accountNumber}
                      onChange={handleBankChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Branch
                    </label>
                    <input
                      type="text"
                      name="branch"
                      value={bankInfo.branch}
                      onChange={handleBankChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    Update Bank Details
                  </Button>
                </div>
              </div>

              {/* Payout Schedule */}
              <div className="border border-gray-300 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Payout Schedule</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="payout" defaultChecked className="accent-orange-500" />
                    <div>
                      <p className="font-medium text-gray-900">Weekly</p>
                      <p className="text-sm text-gray-600">Payouts every Monday</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="payout" className="accent-orange-500" />
                    <div>
                      <p className="font-medium text-gray-900">Bi-Weekly</p>
                      <p className="text-sm text-gray-600">Payouts every two weeks</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="payout" className="accent-orange-500" />
                    <div>
                      <p className="font-medium text-gray-900">Monthly</p>
                      <p className="text-sm text-gray-600">Payouts on the 1st of each month</p>
                    </div>
                  </label>
                </div>
              </div>
            </TabsContent>

            {/* Shipping Tab */}
            <TabsContent value="shipping" className="bg-white rounded-lg shadow p-6 space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Truck size={24} className="text-orange-500" />
                Shipping Settings
              </h2>

              {/* Return Policy */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Return Policy
                </label>
                <textarea
                  name="returnPolicy"
                  value={storeInfo.returnPolicy}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>

              {/* Shipping Zones */}
              <div className="border border-gray-300 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Shipping Zones</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Greater Accra</p>
                      <p className="text-sm text-gray-600">GH₵ 10 - Delivery in 1-2 days</p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Other Regions</p>
                      <p className="text-sm text-gray-600">GH₵ 25 - Delivery in 3-5 days</p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Truck size={16} className="mr-2" />
                  Add Shipping Zone
                </Button>
              </div>

              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                <Check size={16} className="mr-2" />
                Save Shipping Settings
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
