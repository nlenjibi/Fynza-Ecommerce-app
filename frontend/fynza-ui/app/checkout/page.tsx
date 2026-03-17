'use client';

import React from "react"

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Link from 'next/link';

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    zipCode: '',
    paymentMethod: 'card',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Checkout:', formData);
  };

  const cartTotal = 366.60;
  const shipping = 0;
  const tax = 18.33;
  const total = cartTotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Shipping Address */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="col-span-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="col-span-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="col-span-2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="col-span-2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="col-span-2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="col-span-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                    required
                  />
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    className="col-span-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                    required
                  >
                    <option value="">Select Region</option>
                    <option value="accra">Accra</option>
                    <option value="kumasi">Kumasi</option>
                    <option value="takoradi">Takoradi</option>
                  </select>
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="Zip Code"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="col-span-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
                <div className="space-y-3">
                  <label className="flex items-center p-3 border border-gray-300 rounded cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                      className="w-4 h-4 accent-orange-500"
                    />
                    <span className="ml-3 font-medium">Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center p-3 border border-gray-300 rounded cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                      className="w-4 h-4 accent-orange-500"
                    />
                    <span className="ml-3 font-medium">Cash on Delivery</span>
                  </label>
                  <label className="flex items-center p-3 border border-gray-300 rounded cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="momo"
                      checked={formData.paymentMethod === 'momo'}
                      onChange={handleChange}
                      className="w-4 h-4 accent-orange-500"
                    />
                    <span className="ml-3 font-medium">Mobile Money</span>
                  </label>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-3 mb-4 border-b pb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>GH₵ {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (5%)</span>
                  <span>GH₵ {tax.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
                <span>Total</span>
                <span className="text-orange-500">GH₵ {total.toFixed(2)}</span>
              </div>
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold mb-2">
                Place Order
              </Button>
              <Link href="/cart" className="block">
                <Button variant="outline" className="w-full bg-transparent">
                  Back to Cart
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
