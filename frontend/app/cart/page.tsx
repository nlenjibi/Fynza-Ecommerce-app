'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus, Tag, Check, X, Gift } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/components/cart-context';
import { useState } from 'react';

interface Coupon {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minOrder: number;
  description: string;
}

const availableCoupons: Coupon[] = [
  { code: 'WELCOME10', discount: 10, type: 'percentage', minOrder: 50, description: '10% off your first order' },
  { code: 'SAVE20', discount: 20, type: 'percentage', minOrder: 100, description: '20% off orders above GHC 100' },
  { code: 'FLAT50', discount: 50, type: 'fixed', minOrder: 200, description: 'GHC 50 off orders above GHC 200' },
  { code: 'NEWYEAR30', discount: 30, type: 'fixed', minOrder: 150, description: 'GHC 30 off for New Year' },
];

export default function CartPage() {
  const { items, updateQuantity, removeItem, total } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState('');
  const [showCoupons, setShowCoupons] = useState(false);

  const subtotal = items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace("GHC ", "").replace("GH₵ ", ""));
    return sum + price * item.quantity;
  }, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.05;

  // Calculate discount
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      discount = subtotal * (appliedCoupon.discount / 100);
    } else {
      discount = appliedCoupon.discount;
    }
  }

  const cartTotal = subtotal + shipping + tax - discount;

  const handleApplyCoupon = () => {
    setCouponError('');
    const coupon = availableCoupons.find(c => c.code.toUpperCase() === couponCode.toUpperCase());
    
    if (!coupon) {
      setCouponError('Invalid coupon code');
      return;
    }

    if (subtotal < coupon.minOrder) {
      setCouponError(`Minimum order of GHC ${coupon.minOrder} required for this coupon`);
      return;
    }

    setAppliedCoupon(coupon);
    setCouponCode('');
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
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
                {items.map(item => (
                  <div key={item.id} className="p-4 flex gap-4">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-24 h-24 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">JUMIA EXPRESS</p>
                      <div className="mt-3 flex items-center gap-4">
                        <div className="flex items-center gap-2 border border-gray-300 rounded">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1">
                            <Minus size={16} />
                          </button>
                          <span className="px-3 py-1">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1">
                            <Plus size={16} />
                          </button>
                        </div>
                        <div className="text-lg font-bold text-orange-500">
                          GH₵ {(parseFloat(item.price.replace("GHC ", "").replace("GH₵ ", "")) * item.quantity).toFixed(2)}
                        </div>
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

                {/* Coupon Code Section */}
                <div className="mb-4 pb-4 border-b">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Have a coupon?</span>
                    <button 
                      onClick={() => setShowCoupons(!showCoupons)}
                      className="text-sm text-orange-500 hover:underline flex items-center gap-1"
                    >
                      <Gift size={14} />
                      View available coupons
                    </button>
                  </div>

                  {showCoupons && (
                    <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-2">Available coupons:</p>
                      <div className="space-y-2">
                        {availableCoupons.map((coupon) => (
                          <button
                            key={coupon.code}
                            onClick={() => {
                              setCouponCode(coupon.code);
                              setShowCoupons(false);
                            }}
                            className="w-full text-left p-2 bg-white border border-gray-200 rounded hover:border-orange-500 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-sm text-orange-500">{coupon.code}</span>
                              <span className="text-xs text-gray-500">{coupon.description}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {!appliedCoupon ? (
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="flex-1"
                      />
                      <Button 
                        onClick={handleApplyCoupon}
                        variant="outline"
                        className="border-orange-500 text-orange-500 hover:bg-orange-50"
                      >
                        Apply
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-sm text-green-700">{appliedCoupon.code}</span>
                      </div>
                      <button onClick={handleRemoveCoupon} className="text-gray-500 hover:text-red-500">
                        <X size={16} />
                      </button>
                    </div>
                  )}

                  {couponError && (
                    <p className="text-red-500 text-sm mt-2">{couponError}</p>
                  )}
                </div>

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
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-GH₵ {discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
                  <span>Total</span>
                  <span className="text-orange-500">GH₵ {cartTotal.toFixed(2)}</span>
                </div>
                <Link href="/checkout">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold">
                    Proceed to Checkout
                  </Button>
                </Link>
                <Link href="/" className="block mt-3 text-center">
                  <Button variant="ghost" className="text-gray-600 hover:text-orange-500">
                    Continue Shopping
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
