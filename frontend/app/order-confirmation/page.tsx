'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Truck, CreditCard, Wallet, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface OrderData {
  orderId: string;
  items: Array<{
    id: number;
    name: string;
    price: string;
    image: string;
    quantity: number;
  }>;
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

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try to get order data from localStorage
    if (orderId) {
      const storedOrder = localStorage.getItem(`order_${orderId}`);
      if (storedOrder) {
        try {
          const parsed = JSON.parse(storedOrder);
          setOrderData(parsed);
        } catch (e) {
          console.error("Failed to parse order data:", e);
        }
      }

      // Also check the orders array
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const orderFromArray = orders.find((o: OrderData) => o.orderId === orderId);
      if (orderFromArray) {
        setOrderData(orderFromArray);
      }
    }
    setIsLoading(false);
  }, [orderId]);

  // Calculate estimated delivery date (3-5 business days from now)
  const getEstimatedDelivery = () => {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 5);
    return deliveryDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get payment method display name
  const getPaymentMethodDisplay = () => {
    if (!orderData?.paymentMethod) return 'Unknown';
    switch (orderData.paymentMethod) {
      case 'paystack':
        return 'Paystack';
      case 'cod':
        return 'Cash on Delivery';
      default:
        return orderData.paymentMethod;
    }
  };

  // Get payment method icon
  const getPaymentMethodIcon = () => {
    if (!orderData?.paymentMethod) return <CreditCard className="w-6 h-6" />;
    switch (orderData.paymentMethod) {
      case 'paystack':
        return <CreditCard className="w-6 h-6 text-blue-600" />;
      case 'cod':
        return <Wallet className="w-6 h-6 text-green-600" />;
      default:
        return <CreditCard className="w-6 h-6" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-3xl mx-auto px-4 py-8">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <Skeleton className="h-16 w-16 mx-auto rounded-full" />
                <Skeleton className="h-8 w-64 mx-auto" />
                <Skeleton className="h-4 w-96 mx-auto" />
                <div className="bg-gray-50 p-6 rounded mt-6 space-y-3">
                  <Skeleton className="h-4 w-32 mx-auto" />
                  <Skeleton className="h-8 w-48 mx-auto" />
                  <Skeleton className="h-4 w-24 mx-auto" />
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const displayOrderId = orderData?.orderId || orderId || `ORD-${Date.now()}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-8 text-center mb-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            {orderData?.paymentMethod === 'cod'
              ? 'Thank you for your purchase. Your order has been placed and will be delivered to you.'
              : 'Thank you for your purchase. Your order has been successfully placed and payment has been received.'}
          </p>

          <div className="bg-gray-50 p-6 rounded mb-6">
            <p className="text-gray-600 mb-1">Order Number</p>
            <p className="text-2xl font-bold text-gray-900 mb-4">{displayOrderId}</p>
            <p className="text-gray-600 mb-1">Order Date</p>
            <p className="text-lg text-gray-900">
              {orderData?.createdAt
                ? new Date(orderData.createdAt).toLocaleDateString()
                : new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Payment Information */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              {getPaymentMethodIcon()}
              <span className="font-medium">Payment Method: {getPaymentMethodDisplay()}</span>
            </div>

            {orderData?.paymentMethod === 'paystack' && (
              <div className="flex items-center justify-center gap-2 text-sm text-green-600 mb-4">
                <ShieldCheck className="w-4 h-4" />
                <span>Payment verified via Paystack</span>
              </div>
            )}

            {orderData?.paymentMethod === 'cod' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> Please prepare {orderData.total.toFixed(2)} GHS for payment upon delivery.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Order Details */}
        {orderData?.items && orderData.items.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Items</h2>
            <div className="space-y-3">
              {orderData.items.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-gray-900">
                    GH₵ {(parseFloat(item.price.replace("GH₵ ", "").replace("GHC ", "").replace(" ", "")) * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">GH₵ {orderData.subtotal?.toFixed(2) || "0.00"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {orderData.shipping === 0 ? 'FREE' : `GH₵ ${orderData.shipping?.toFixed(2) || "0.00"}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (5%)</span>
                <span className="font-medium">GH₵ {orderData.tax?.toFixed(2) || "0.00"}</span>
              </div>
              <div className="flex justify-between pt-2 border-t text-lg font-bold">
                <span>Total</span>
                <span className="text-orange-500">GH₵ {orderData.total?.toFixed(2) || "0.00"}</span>
              </div>
            </div>
          </div>
        )}

        {/* Fallback static content if no order data */}
        {!orderData && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Details</h2>
            <div className="space-y-3 text-left">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Sample Product 1</span>
                <span className="font-semibold">GH₵ 166.66</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Sample Product 2</span>
                <span className="font-semibold">GH₵ 199.94</span>
              </div>
              <div className="border-t flex justify-between py-2 font-bold">
                <span>Subtotal</span>
                <span>GH₵ 366.60</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Tax (5%)</span>
                <span>GH₵ 18.33</span>
              </div>
              <div className="border-t border-b flex justify-between py-3 text-lg font-bold text-orange-500">
                <span>Total</span>
                <span>GH₵ 384.93</span>
              </div>
            </div>
          </div>
        )}

        {/* Delivery Address */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Delivery Address</h2>
          {orderData?.shippingAddress ? (
            <div className="text-gray-700">
              <p className="font-medium">{orderData.shippingAddress.firstName} {orderData.shippingAddress.lastName}</p>
              <p>{orderData.shippingAddress.address}</p>
              <p>{orderData.shippingAddress.city}, {orderData.shippingAddress.region} {orderData.shippingAddress.zipCode}</p>
              <p>{orderData.shippingAddress.phone}</p>
            </div>
          ) : (
            <div className="text-gray-700">
              <p className="font-medium">John Doe</p>
              <p>123 Main Street</p>
              <p>Accra, Ghana</p>
              <p>+233 24 XXX XXXX</p>
            </div>
          )}
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
            <p className="text-sm text-blue-800">
              📦 Your order will be delivered within 3-5 business days. You'll receive a tracking number via email.
            </p>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Link href="/my-orders">
            <Button className="bg-orange-500 hover:bg-orange-600">View My Orders</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Continue Shopping</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
