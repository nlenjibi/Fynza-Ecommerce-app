'use client';

import React, { useState } from "react";

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, ShieldCheck, Lock, CreditCard, Smartphone, Wallet } from 'lucide-react';
import { useCart, CartItem } from '@/components/cart-context';

interface OrderData {
  orderId: string;
  items: CartItem[];
  customerEmail: string;
  customerName: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    region: string;
    zipCode: string;
    phone: string;
  };
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: string;
  createdAt: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total: cartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    zipCode: '',
    paymentMethod: 'paystack',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  // Calculate order totals
  const subtotal = cartTotal;
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  // Generate a unique order ID
  const generateOrderId = () => {
    return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handlePaymentMethodChange = (method: string) => {
    setFormData({ ...formData, paymentMethod: method });
    setError('');
  };

  // Save order data to localStorage for retrieval after payment
  const saveOrderData = (orderId: string, paymentReference: string) => {
    const orderData: OrderData = {
      orderId,
      items,
      customerEmail: formData.email,
      customerName: `${formData.firstName} ${formData.lastName}`,
      shippingAddress: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        region: formData.region,
        zipCode: formData.zipCode,
        phone: formData.phone,
      },
      subtotal,
      shipping,
      tax,
      total,
      paymentMethod: 'paystack',
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(`order_${orderId}`, JSON.stringify(orderData));
    localStorage.setItem(`payment_ref_${orderId}`, paymentReference);
    return orderData;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email ||
      !formData.phone || !formData.address || !formData.city || !formData.region) {
      setError('Please fill in all required fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const orderId = generateOrderId();

      // If Paystack is selected, call backend to initialize transaction
      if (formData.paymentMethod === 'paystack') {
        const response = await fetch('/api/payments/paystack/initialize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId,
            customerEmail: formData.email,
            customerName: `${formData.firstName} ${formData.lastName}`,
            customerPhone: formData.phone,
            amount: Math.round(total * 100), // Convert to kobo (Paystack uses kobo)
            currency: 'GHS',
            shippingAddress: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              address: formData.address,
              city: formData.city,
              region: formData.region,
              zipCode: formData.zipCode,
              phone: formData.phone,
            },
            items: items.map(item => ({
              id: item.id,
              name: item.name,
              price: parseFloat(item.price.replace("GHC ", "").replace("GH₵ ", "")),
              quantity: item.quantity,
            })),
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to initialize payment');
        }

        // Save order data before redirect
        saveOrderData(orderId, data.reference || data.data?.reference || '');

        // Redirect to Paystack payment page
        if (data.authorization_url) {
          window.location.href = data.authorization_url;
          return;
        } else if (data.data && data.data.authorization_url) {
          window.location.href = data.data.authorization_url;
          return;
        }

        throw new Error('Payment authorization URL not received');
      }

      // For Cash on Delivery, proceed to confirmation
      if (formData.paymentMethod === 'cod') {
        const orderData = saveOrderData(orderId, 'COD-' + orderId);

        // Store order in localStorage for order confirmation page
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(orders));

        router.push(`/order-confirmation?orderId=${orderId}`);
        return;
      }

      // For other payment methods, proceed normally (placeholder)
      console.log('Checkout:', formData);
      router.push('/order-confirmation');
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || 'Payment could not be completed. Please try again or choose another payment method.');
    } finally {
      setIsProcessing(false);
    }
  };

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

                {/* Security Indicator */}
                <div className="flex items-center gap-2 mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-700 font-medium">Secure Checkout - SSL Encrypted</span>
                </div>

                <div className="space-y-3">
                  {/* Paystack Option */}
                  <label
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.paymentMethod === 'paystack'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                      }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paystack"
                      checked={formData.paymentMethod === 'paystack'}
                      onChange={() => handlePaymentMethodChange('paystack')}
                      className="w-5 h-5 accent-orange-500"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">Paystack</span>
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded">Recommended</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Pay securely with Visa, Mastercard, Mobile Money</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <CreditCard className="w-6 h-6 text-gray-400" />
                      <Smartphone className="w-6 h-6 text-gray-400" />
                    </div>
                  </label>

                  {/* Cash on Delivery Option */}
                  <label
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.paymentMethod === 'cod'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                      }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => handlePaymentMethodChange('cod')}
                      className="w-5 h-5 accent-orange-500"
                    />
                    <div className="ml-4 flex-1">
                      <span className="font-semibold text-gray-900">Cash on Delivery</span>
                      <p className="text-sm text-gray-500 mt-1">Pay when you receive your order</p>
                    </div>
                    <Wallet className="w-6 h-6 text-gray-400" />
                  </label>
                </div>

                {/* Paystack Badge */}
                {formData.paymentMethod === 'paystack' && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center gap-2 text-sm text-gray-600">
                    <Lock className="w-4 h-4 text-green-600" />
                    <span>Your payment is secured by Paystack. We never store your card details.</span>
                  </div>
                )}
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
                  <span>GH₵ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>
                    {shipping === 0 ? 'FREE' : `GH₵ ${shipping.toFixed(2)}`}
                  </span>
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

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
                  {error}
                </div>
              )}

              <Button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold mb-2"
                disabled={isProcessing}
                onClick={handleSubmit}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : formData.paymentMethod === 'paystack' ? (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Pay with Paystack
                  </>
                ) : (
                  'Place Order'
                )}
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
