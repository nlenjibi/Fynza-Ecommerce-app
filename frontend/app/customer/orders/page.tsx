'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CustomerSidebar } from '@/components/customer/customer-sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Download, Eye, X, Package, Truck, CheckCircle, XCircle, MapPin, Phone, Mail, Clock, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface Order {
  id: string;
  date: string;
  status: string;
  statusColor: string;
  items: number;
  total: number;
  deliveryDate: string;
  trackingNumber?: string;
  products: OrderItem[];
  shippingAddress: {
    street: string;
    city: string;
    region: string;
  };
  customer: {
    name: string;
    phone: string;
  };
}

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'FYN-2024-001245',
      date: 'Jan 15, 2024',
      status: 'Delivered',
      statusColor: 'green',
      items: 3,
      total: 450.00,
      deliveryDate: 'Jan 18, 2024',
      trackingNumber: 'FYN-TRK-001245',
      products: [
        { name: 'Wireless Bluetooth Earbuds', quantity: 1, price: 189.99 },
        { name: 'Phone Case', quantity: 2, price: 30.00 },
      ],
      shippingAddress: { street: '123 Main St', city: 'Accra', region: 'Greater Accra' },
      customer: { name: 'John Doe', phone: '+233 24 123 4567' },
    },
    {
      id: 'FYN-2024-001244',
      date: 'Jan 12, 2024',
      status: 'In Transit',
      statusColor: 'blue',
      items: 2,
      total: 320.00,
      deliveryDate: 'Jan 20, 2024',
      trackingNumber: 'FYN-TRK-001244',
      products: [
        { name: 'Smart Watch', quantity: 1, price: 250.00 },
        { name: 'Charger', quantity: 1, price: 70.00 },
      ],
      shippingAddress: { street: '456 Oak Ave', city: 'Kumasi', region: 'Ashanti' },
      customer: { name: 'John Doe', phone: '+233 24 123 4567' },
    },
    {
      id: 'FYN-2024-001243',
      date: 'Jan 8, 2024',
      status: 'Processing',
      statusColor: 'yellow',
      items: 1,
      total: 180.00,
      deliveryDate: 'Jan 22, 2024',
      products: [
        { name: 'Laptop Stand', quantity: 1, price: 180.00 },
      ],
      shippingAddress: { street: '789 Pine Rd', city: 'Tema', region: 'Greater Accra' },
      customer: { name: 'John Doe', phone: '+233 24 123 4567' },
    },
    {
      id: 'FYN-2024-001242',
      date: 'Jan 5, 2024',
      status: 'Delivered',
      statusColor: 'green',
      items: 4,
      total: 620.00,
      deliveryDate: 'Jan 10, 2024',
      products: [
        { name: 'USB Hub', quantity: 2, price: 100.00 },
        { name: 'Keyboard', quantity: 1, price: 250.00 },
        { name: 'Mouse', quantity: 1, price: 270.00 },
      ],
      shippingAddress: { street: '321 Elm St', city: 'Cape Coast', region: 'Central' },
      customer: { name: 'John Doe', phone: '+233 24 123 4567' },
    },
    {
      id: 'FYN-2024-001241',
      date: 'Dec 28, 2023',
      status: 'Delivered',
      statusColor: 'green',
      items: 2,
      total: 290.00,
      deliveryDate: 'Jan 2, 2024',
      products: [
        { name: 'Headphones', quantity: 2, price: 290.00 },
      ],
      shippingAddress: { street: '654 Birch Ln', city: 'Takoradi', region: 'Western' },
      customer: { name: 'John Doe', phone: '+233 24 123 4567' },
    },
  ]);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleExportOrders = () => {
    const csvContent = [
      ['Order ID', 'Date', 'Status', 'Items', 'Total', 'Delivery Date'].join(','),
      ...filteredOrders.map(order => [
        order.id,
        order.date,
        order.status,
        order.items,
        order.total.toFixed(2),
        order.deliveryDate
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleCancelOrder = () => {
    if (selectedOrder) {
      setOrders(orders.map(o => o.id === selectedOrder.id ? { ...o, status: 'Cancelled', statusColor: 'red' } : o));
      setSelectedOrder({ ...selectedOrder, status: 'Cancelled', statusColor: 'red' });
      setShowCancelModal(false);
      alert(`Order ${selectedOrder.id} has been cancelled`);
    }
  };

  const handleRefundRequest = () => {
    if (selectedOrder) {
      setOrders(orders.map(o => o.id === selectedOrder.id ? { ...o, status: 'Refund Requested', statusColor: 'orange' } : o));
      setSelectedOrder({ ...selectedOrder, status: 'Refund Requested', statusColor: 'orange' });
      setShowRefundModal(false);
      alert(`Refund request submitted for order ${selectedOrder.id}`);
    }
  };

  const getStatusColor = (color: string) => {
    switch (color) {
      case 'green': return 'bg-green-100 text-green-800';
      case 'blue': return 'bg-blue-100 text-blue-800';
      case 'yellow': return 'bg-yellow-100 text-yellow-800';
      case 'red': return 'bg-red-100 text-red-800';
      case 'orange': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        <CustomerSidebar />

        <main className="flex-1">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
              <p className="text-gray-600">Track and manage all your orders</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search by order ID..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">All Orders</option>
                  <option value="processing">Processing</option>
                  <option value="in transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <Button 
                  className="bg-orange-500 hover:bg-orange-600 justify-center gap-2"
                  onClick={handleExportOrders}
                >
                  <Download className="h-4 w-4" />
                  Export Orders
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <div key={order.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                      <div>
                        <p className="text-sm text-gray-600">Order ID</p>
                        <p className="font-semibold text-gray-900">{order.id}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600">Order Date</p>
                        <p className="font-semibold text-gray-900">{order.date}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.statusColor)}`}>
                          {order.status}
                        </span>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600">Total</p>
                        <p className="font-semibold text-gray-900">GHS {order.total.toFixed(2)}</p>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-2"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedOrder(order);
                            if (order.trackingNumber) {
                              alert(`Tracking Number: ${order.trackingNumber}`);
                            } else {
                              alert('Tracking number not yet available');
                            }
                          }}
                        >
                          Track
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Items</p>
                        <p className="font-semibold text-gray-900">{order.items} items</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Expected Delivery</p>
                        <p className="font-semibold text-gray-900">{order.deliveryDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Shipping</p>
                        <p className="font-semibold text-gray-900">Standard</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Payment</p>
                        <p className="font-semibold text-gray-900">Completed</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                  <p className="text-gray-600 mb-4">No orders found</p>
                  <Link href="/">
                    <Button className="bg-orange-500 hover:bg-orange-600">Continue Shopping</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
                <p className="text-gray-600 text-sm">Order ID: {selectedOrder.id}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(null)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedOrder.statusColor)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Order Date</p>
                  <p className="font-semibold text-gray-900">{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Expected Delivery</p>
                  <p className="font-semibold text-gray-900">{selectedOrder.deliveryDate}</p>
                </div>
              </div>

              {/* Tracking */}
              {selectedOrder.trackingNumber && (
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <Truck className="text-blue-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Tracking Number</p>
                    <p className="font-medium text-gray-900">{selectedOrder.trackingNumber}</p>
                  </div>
                </div>
              )}

              {/* Shipping Address */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Shipping Address</h3>
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <MapPin className="text-gray-400" size={18} />
                  <div>
                    <p className="font-medium text-gray-900">{selectedOrder.shippingAddress.street}</p>
                    <p className="text-sm text-gray-600">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.region}</p>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Products</h3>
                <div className="space-y-3">
                  {selectedOrder.products.map((product, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">Qty: {product.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-900">GHS {(product.price * product.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                  <p className="text-lg font-bold text-gray-900">Total</p>
                  <p className="text-xl font-bold text-orange-600">GHS {selectedOrder.total.toFixed(2)}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t">
                {(selectedOrder.status === 'Processing' || selectedOrder.status === 'In Transit') && (
                  <>
                    <Button
                      variant="outline"
                      className="text-red-600 border-red-600 hover:bg-red-50"
                      onClick={() => setShowCancelModal(true)}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Cancel Order
                    </Button>
                    <Button
                      variant="outline"
                      className="text-orange-600 border-orange-600 hover:bg-orange-50"
                      onClick={() => setShowRefundModal(true)}
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Request Refund
                    </Button>
                  </>
                )}
                {selectedOrder.trackingNumber && (
                  <Button
                    variant="outline"
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                    onClick={() => alert(`Tracking: ${selectedOrder.trackingNumber}`)}
                  >
                    <Truck className="mr-2 h-4 w-4" />
                    Track Order
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Order Modal */}
      {showCancelModal && selectedOrder && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Cancel Order</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowCancelModal(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel order <strong>{selectedOrder.id}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700"
                onClick={handleCancelOrder}
              >
                Yes, Cancel Order
              </Button>
              <Button variant="outline" onClick={() => setShowCancelModal(false)}>
                No, Keep Order
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Refund Modal */}
      {showRefundModal && selectedOrder && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Request Refund</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowRefundModal(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-gray-600 mb-6">
              Request a refund for order <strong>{selectedOrder.id}</strong> (GHS {selectedOrder.total.toFixed(2)})?
            </p>
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-orange-500 hover:bg-orange-600"
                onClick={handleRefundRequest}
              >
                Submit Refund Request
              </Button>
              <Button variant="outline" onClick={() => setShowRefundModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
