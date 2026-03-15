'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Package, MessageCircle, Edit, Trash2, Plus, Minus, X, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useOrders, type Order, type OrderItem } from '@/components/order-context';
import { useCart } from '@/components/cart-context';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

export default function MyOrdersPage() {
  const { orders, updateOrder, cancelOrder } = useOrders();
  const { addItem: addToCart } = useCart();
  const { toast } = useToast();
  const [editingOrder, setEditingOrder] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'shipped':
        return 'text-blue-600 bg-blue-50';
      case 'processing':
        return 'text-yellow-600 bg-yellow-50';
      case 'pending':
        return 'text-orange-600 bg-orange-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return '';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleEditOrder = (orderId: string) => {
    setEditingOrder(editingOrder === orderId ? null : orderId);
  };

  const handleRemoveItem = (orderId: string, itemId: number) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      const updatedItems = order.items.filter(item => item.id !== itemId);
      const newTotal = updatedItems.reduce((sum, item) => {
        const price = parseFloat(item.price.replace("GHC ", "").replace("GH₵ ", ""));
        return sum + price * item.quantity;
      }, 0);
      
      if (updatedItems.length === 0) {
        cancelOrder(orderId);
        toast({
          title: "Order cancelled",
          description: "All items have been removed from the order.",
          duration: 3000,
        });
      } else {
        updateOrder(orderId, { items: updatedItems, total: newTotal });
        toast({
          title: "Item removed",
          description: "Item has been removed from your order.",
          duration: 3000,
        });
      }
    }
    setEditingOrder(null);
  };

  const handleUpdateQuantity = (orderId: string, itemId: number, delta: number) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      const updatedItems = order.items.map(item => {
        if (item.id === itemId) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      });
      const newTotal = updatedItems.reduce((sum, item) => {
        const price = parseFloat(item.price.replace("GHC ", "").replace("GH₵ ", ""));
        return sum + price * item.quantity;
      }, 0);
      updateOrder(orderId, { items: updatedItems, total: newTotal });
    }
  };

  const handleAddToCartFromOrder = (item: OrderItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      oldPrice: item.oldPrice,
      image: item.image,
      quantity: item.quantity
    });
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  const handleAddMoreItems = (orderId: string) => {
    setEditingOrder(null);
    toast({
      title: "Add more items",
      description: "Browse our products to add more items.",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">You haven't placed any orders yet</p>
            <Link href="/">
              <Button className="bg-orange-500 hover:bg-orange-600">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-lg shadow p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-gray-600 text-sm">Order Number</p>
                    <p className="font-semibold text-gray-900">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Order Date</p>
                    <p className="font-semibold text-gray-900">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Total</p>
                    <p className="font-semibold text-orange-500 text-lg">GH₵ {order.total.toFixed(2)}</p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="border-t pt-4 mb-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between py-2 text-gray-700 items-center">
                      <div className="flex items-center gap-4">
                        <span>{item.name} x{item.quantity}</span>
                        <span className="text-gray-500">GH₵ {(parseFloat(item.price.replace("GHC ", "").replace("GH₵ ", "")) * item.quantity).toFixed(2)}</span>
                      </div>
                      
                      {/* Edit controls for pending orders */}
                      {order.status === 'pending' && editingOrder === order.id && (
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleUpdateQuantity(order.id, item.id, -1)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => handleUpdateQuantity(order.id, item.id, 1)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Plus size={16} />
                          </button>
                          <button 
                            onClick={() => handleRemoveItem(order.id, item.id)}
                            className="p-1 hover:bg-red-100 rounded text-red-500"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Edit Mode: Add More Items */}
                {order.status === 'pending' && editingOrder === order.id && (
                  <div className="border-t pt-4 mb-4">
                    <h4 className="font-medium text-gray-900 mb-3">Add More Items</h4>
                    <div className="flex gap-2 flex-wrap">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAddMoreItems(order.id)}
                        className="flex items-center gap-2"
                      >
                        <Plus size={16} />
                        Browse Products
                      </Button>
                    </div>
                  </div>
                )}

                {/* Order Actions */}
                <div className="flex gap-2 justify-end">
                  {order.status === 'pending' && (
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2 bg-transparent border-orange-500 text-orange-500 hover:bg-orange-50"
                      onClick={() => handleEditOrder(order.id)}
                    >
                      <Edit size={18} />
                      {editingOrder === order.id ? 'Done Editing' : 'Edit Order'}
                    </Button>
                  )}
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <MessageCircle size={18} />
                    Contact Seller
                  </Button>
                  <Link href={`/order-confirmation?id=${order.id}`}>
                    <Button className="bg-orange-500 hover:bg-orange-600">View Details</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
