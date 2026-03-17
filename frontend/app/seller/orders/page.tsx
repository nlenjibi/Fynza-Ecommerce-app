"use client";

import { useState } from "react";
import { SellerSidebar } from "@/components/seller/seller-sidebar";
import { Button } from "@/components/ui/button";
import {
  Search,
  Download,
  Filter,
  Eye,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  ChevronDown,
} from "lucide-react";

type OrderStatus = "all" | "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  products: {
    name: string;
    quantity: number;
    price: number;
    variant?: string;
  }[];
  total: number;
  date: string;
  status: OrderStatus;
  paymentStatus: "paid" | "pending" | "failed";
  shippingAddress: {
    street: string;
    city: string;
    region: string;
  };
  trackingNumber?: string;
}

export default function SellerOrders() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState<OrderStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [dateRange, setDateRange] = useState("all");
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-7821",
      customer: {
        name: "Abena Mensah",
        email: "abena.mensah@email.com",
        phone: "+233 24 123 4567",
      },
      products: [
        { name: "Wireless Bluetooth Earbuds", quantity: 1, price: 189.99, variant: "Black" },
      ],
      total: 189.99,
      date: "Jan 8, 2024",
      status: "pending",
      paymentStatus: "paid",
      shippingAddress: {
        street: "123 Main Street",
        city: "Accra",
        region: "Greater Accra",
      },
    },
    {
      id: "ORD-7820",
      customer: {
        name: "Kofi Doe",
        email: "kofi.doe@email.com",
        phone: "+233 24 234 5678",
      },
      products: [
        { name: "Smart Watch Series 5", quantity: 1, price: 450.0, variant: "Silver/45mm" },
      ],
      total: 450.0,
      date: "Jan 8, 2024",
      status: "processing",
      paymentStatus: "paid",
      shippingAddress: {
        street: "456 Oak Avenue",
        city: "Kumasi",
        region: "Ashanti",
      },
    },
    {
      id: "ORD-7819",
      customer: {
        name: "Sarah Adjei",
        email: "sarah.adjei@email.com",
        phone: "+233 24 345 6789",
      },
      products: [
        { name: "Laptop Stand Adjustable", quantity: 2, price: 89.99, variant: "Silver" },
      ],
      total: 179.98,
      date: "Jan 7, 2024",
      status: "shipped",
      paymentStatus: "paid",
      shippingAddress: {
        street: "789 Pine Road",
        city: "Takoradi",
        region: "Western",
      },
      trackingNumber: "FYN-TRK-78219",
    },
    {
      id: "ORD-7818",
      customer: {
        name: "John Amponsah",
        email: "john.amponsah@email.com",
        phone: "+233 24 456 7890",
      },
      products: [
        { name: "USB-C Hub 7-in-1", quantity: 1, price: 129.99, variant: "Space Gray" },
      ],
      total: 129.99,
      date: "Jan 7, 2024",
      status: "delivered",
      paymentStatus: "paid",
      shippingAddress: {
        street: "321 Elm Street",
        city: "Cape Coast",
        region: "Central",
      },
      trackingNumber: "FYN-TRK-78188",
    },
    {
      id: "ORD-7817",
      customer: {
        name: "Emma Owusu",
        email: "emma.owusu@email.com",
        phone: "+233 24 567 8901",
      },
      products: [
        { name: "Phone Case Premium", quantity: 3, price: 45.99, variant: "Clear" },
      ],
      total: 137.97,
      date: "Jan 6, 2024",
      status: "cancelled",
      paymentStatus: "failed",
      shippingAddress: {
        street: "654 Birch Lane",
        city: "Tema",
        region: "Greater Accra",
      },
    },
    {
      id: "ORD-7816",
      customer: {
        name: "Michael Kwaku",
        email: "michael.kwaku@email.com",
        phone: "+233 24 678 9012",
      },
      products: [
        { name: "Wireless Charger Pad", quantity: 2, price: 35.99, variant: "White" },
        { name: "USB-C Cable 2m", quantity: 3, price: 15.99, variant: "Black" },
      ],
      total: 111.95,
      date: "Jan 6, 2024",
      status: "refunded",
      paymentStatus: "paid",
      shippingAddress: {
        street: "987 Cedar Avenue",
        city: "Accra",
        region: "Greater Accra",
      },
    },
  ]);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactMethod, setContactMethod] = useState<"email" | "phone" | "message" | null>(null);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-indigo-100 text-indigo-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesFilter = filter === "all" || order.status === filter;
    const matchesSearch =
      searchTerm === "" ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
    alert(`Order ${orderId} status updated to ${newStatus}`);
  };

  const handleAddTrackingNumber = () => {
    if (selectedOrder && trackingNumber.trim()) {
      setOrders(orders.map(order => 
        order.id === selectedOrder.id ? { ...order, trackingNumber: trackingNumber, status: "shipped" as OrderStatus } : order
      ));
      setSelectedOrder({ ...selectedOrder, trackingNumber: trackingNumber, status: "shipped" });
      setShowTrackingModal(false);
      setTrackingNumber("");
      alert(`Tracking number added to order ${selectedOrder.id}`);
    }
  };

  const handleContactCustomer = (method: "email" | "phone" | "message") => {
    if (!selectedOrder) return;
    
    switch (method) {
      case "email":
        window.location.href = `mailto:${selectedOrder.customer.email}?subject=Order ${selectedOrder.id}`;
        break;
      case "phone":
        window.location.href = `tel:${selectedOrder.customer.phone}`;
        break;
      case "message":
        alert(`Message composer would open for ${selectedOrder.customer.name}`);
        break;
    }
    setShowContactModal(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SellerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 overflow-auto lg:ml-0">
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
          <span className="font-semibold text-gray-900">Orders</span>
          <div className="w-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
              <p className="text-gray-600 mt-1">Manage and track your customer orders</p>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 flex items-center gap-2">
              <Download size={18} />
              Export Report
            </Button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
            {[
              { label: "Total Orders", value: "1,245", color: "bg-blue-100 text-blue-700" },
              { label: "Pending", value: "28", color: "bg-yellow-100 text-yellow-700" },
              { label: "Processing", value: "45", color: "bg-indigo-100 text-indigo-700" },
              { label: "Shipped", value: "67", color: "bg-purple-100 text-purple-700" },
              { label: "Delivered", value: "1,089", color: "bg-green-100 text-green-700" },
              { label: "Cancelled", value: "45", color: "bg-red-100 text-red-700" },
              { label: "Refunded", value: "23", color: "bg-gray-100 text-gray-700" },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4 text-center">
                <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Filters Row */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search by order ID or customer name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="flex flex-wrap gap-2">
                {["all", "pending", "processing", "shipped", "delivered", "cancelled"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status as OrderStatus)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${filter === status
                        ? "bg-orange-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              {/* Date Filter */}
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Products
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Qty
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{order.customer.name}</p>
                          <p className="text-xs text-gray-500">{order.customer.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {order.products[0].name}
                          {order.products.length > 1 && (
                            <span className="text-gray-500 ml-1">+{order.products.length - 1} more</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-900">
                        {order.products.reduce((sum, p) => sum + p.quantity, 0)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 text-right">
                        GH₵ {order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(
                            order.paymentStatus
                          )}`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye size={16} />
                          </Button>
                          {order.status === "processing" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-purple-600 border-purple-600 hover:bg-purple-50"
                              onClick={() => handleUpdateStatus(order.id, "shipped")}
                            >
                              <Truck size={16} />
                            </Button>
                          )}
                          {order.status === "shipped" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600 border-green-600 hover:bg-green-50"
                              onClick={() => handleUpdateStatus(order.id, "delivered")}
                            >
                              <CheckCircle size={16} />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {filteredOrders.length} of {orders.length} orders
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedOrder(null)}
                >
                  <XCircle size={20} />
                </Button>
              </div>
              <p className="text-gray-600 mt-1">Order ID: {selectedOrder.id}</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Order Status</p>
                  <p className={`font-semibold capitalize ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Status</p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getPaymentStatusColor(
                      selectedOrder.paymentStatus
                    )}`}
                  >
                    {selectedOrder.paymentStatus}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Order Date</p>
                  <p className="font-semibold text-gray-900">{selectedOrder.date}</p>
                </div>
              </div>

              {/* Customer Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Package className="text-blue-600" size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium text-gray-900">{selectedOrder.customer.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Mail className="text-green-600" size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">{selectedOrder.customer.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Phone className="text-purple-600" size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium text-gray-900">{selectedOrder.customer.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <MapPin className="text-orange-600" size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {selectedOrder.shippingAddress.street}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.region}
                    </p>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Products</h3>
                <div className="space-y-3">
                  {selectedOrder.products.map((product, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">
                          {product.variant && <span className="mr-2">Variant: {product.variant}</span>}
                          Qty: {product.quantity}
                        </p>
                      </div>
                      <p className="font-semibold text-gray-900">GH₵ {(product.price * product.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                  <p className="text-lg font-bold text-gray-900">Total</p>
                  <p className="text-xl font-bold text-orange-600">GH₵ {selectedOrder.total.toFixed(2)}</p>
                </div>
              </div>

              {/* Tracking */}
              {selectedOrder.trackingNumber && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tracking Information</h3>
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                    <Truck className="text-blue-600" size={20} />
                    <div>
                      <p className="text-sm text-gray-600">Tracking Number</p>
                      <p className="font-medium text-gray-900">{selectedOrder.trackingNumber}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t">
                {selectedOrder.status === "pending" && (
                  <Button
                    className="bg-blue-500 hover:bg-blue-600"
                    onClick={() => handleUpdateStatus(selectedOrder.id, "confirmed")}
                  >
                    <CheckCircle size={16} className="mr-2" />
                    Confirm Order
                  </Button>
                )}
                {selectedOrder.status === "confirmed" && (
                  <Button
                    className="bg-indigo-500 hover:bg-indigo-600"
                    onClick={() => handleUpdateStatus(selectedOrder.id, "processing")}
                  >
                    <Package size={16} className="mr-2" />
                    Start Processing
                  </Button>
                )}
                {selectedOrder.status === "processing" && (
                  <>
                    <Button
                      className="bg-purple-500 hover:bg-purple-600"
                      onClick={() => handleUpdateStatus(selectedOrder.id, "shipped")}
                    >
                      <Truck size={16} className="mr-2" />
                      Mark as Shipped
                    </Button>
                    <Button variant="outline" onClick={() => setShowTrackingModal(true)}>
                      Add Tracking Number
                    </Button>
                  </>
                )}
                {selectedOrder.status === "shipped" && (
                  <Button
                    className="bg-green-500 hover:bg-green-600"
                    onClick={() => handleUpdateStatus(selectedOrder.id, "delivered")}
                  >
                    <CheckCircle size={16} className="mr-2" />
                    Mark as Delivered
                  </Button>
                )}
                <Button variant="outline" onClick={() => setShowContactModal(true)}>
                  <MessageSquare size={16} className="mr-2" />
                  Contact Customer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Tracking Number Modal */}
      {showTrackingModal && selectedOrder && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add Tracking Number</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowTrackingModal(false)}>
                <XCircle size={20} />
              </Button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Enter the tracking number for order {selectedOrder.id}
            </p>
            <input
              type="text"
              placeholder="e.g., FYN-TRK-12345"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 mb-4"
            />
            <div className="flex gap-3">
              <Button 
                className="flex-1 bg-orange-500 hover:bg-orange-600"
                onClick={handleAddTrackingNumber}
                disabled={!trackingNumber.trim()}
              >
                Add Tracking Number
              </Button>
              <Button variant="outline" onClick={() => setShowTrackingModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Customer Modal */}
      {showContactModal && selectedOrder && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Contact Customer</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowContactModal(false)}>
                <XCircle size={20} />
              </Button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Contact {selectedOrder.customer.name} regarding order {selectedOrder.id}
            </p>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleContactCustomer("email")}
              >
                <Mail size={18} className="mr-3" />
                Send Email
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleContactCustomer("phone")}
              >
                <Phone size={18} className="mr-3" />
                Call {selectedOrder.customer.phone}
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleContactCustomer("message")}
              >
                <MessageSquare size={18} className="mr-3" />
                Send Message
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
