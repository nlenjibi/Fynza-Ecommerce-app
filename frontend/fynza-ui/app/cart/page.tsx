'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  quantity: number;
  image: string;
  seller: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Girls PU Leather Princess Shoes',
      price: 166.66,
      originalPrice: 195.00,
      quantity: 1,
      image: '/black-girls-shoes.jpg',
      seller: 'JUMIA EXPRESS',
    },
    {
      id: '2',
      name: 'Boys Sports Hook & Loop Casual Shoes',
      price: 199.94,
      originalPrice: 234.00,
      quantity: 1,
      image: '/boys-sports-shoes.jpg',
      seller: 'JUMIA EXPRESS',
    },
  ]);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(cartItems.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <Link href="/">
              <Button className="bg-orange-500 hover:bg-orange-600">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow divide-y">
                {cartItems.map(item => (
                  <div key={item.id} className="p-4 flex gap-4">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-24 h-24 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{item.seller}</p>
                      <div className="mt-3 flex items-center gap-4">
                        <div className="flex items-center gap-2 border border-gray-300 rounded">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1">
                            <Minus size={16} />
                          </button>
                          <span className="px-3 py-1">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1">
                            <Plus size={16} />
                          </button>
                        </div>
                        <div className="text-lg font-bold text-orange-500">GH₵ {(item.price * item.quantity).toFixed(2)}</div>
                        <button onClick={() => removeItem(item.id)} className="ml-auto text-red-500 hover:text-red-700">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
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
                <Link href="/checkout">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold">
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
