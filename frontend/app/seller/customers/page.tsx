"use client";

import { useState } from "react";
import { SellerSidebar } from "@/components/seller/seller-sidebar";
import { Button } from "@/components/ui/button";
import {
    Search,
    Users,
    Mail,
    Phone,
    ShoppingCart,
    DollarSign,
    Star,
    Calendar,
    Eye,
    MessageSquare,
    RefreshCw,
} from "lucide-react";

interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    totalOrders: number;
    totalSpent: number;
    lastOrderDate: string;
    rating: number;
    joinedDate: string;
}

export default function SellerCustomers() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    const customers: Customer[] = [
        {
            id: "CUST-001",
            name: "Abena Mensah",
            email: "abena.mensah@email.com",
            phone: "+233 24 123 4567",
            totalOrders: 12,
            totalSpent: 2450.0,
            lastOrderDate: "Jan 8, 2024",
            rating: 5,
            joinedDate: "Mar 15, 2023",
        },
        {
            id: "CUST-002",
            name: "Kofi Doe",
            email: "kofi.doe@email.com",
            phone: "+233 24 234 5678",
            totalOrders: 8,
            totalSpent: 1890.0,
            lastOrderDate: "Jan 5, 2024",
            rating: 4,
            joinedDate: "May 20, 2023",
        },
        {
            id: "CUST-003",
            name: "Sarah Adjei",
            email: "sarah.adjei@email.com",
            phone: "+233 24 345 6789",
            totalOrders: 6,
            totalSpent: 1560.0,
            lastOrderDate: "Dec 28, 2023",
            rating: 5,
            joinedDate: "Jul 10, 2023",
        },
        {
            id: "CUST-004",
            name: "John Amponsah",
            email: "john.amponsah@email.com",
            phone: "+233 24 456 7890",
            totalOrders: 5,
            totalSpent: 980.0,
            lastOrderDate: "Dec 20, 2023",
            rating: 4,
            joinedDate: "Aug 5, 2023",
        },
        {
            id: "CUST-005",
            name: "Emma Owusu",
            email: "emma.owusu@email.com",
            phone: "+233 24 567 8901",
            totalOrders: 3,
            totalSpent: 450.0,
            lastOrderDate: "Dec 15, 2023",
            rating: 3,
            joinedDate: "Oct 12, 2023",
        },
    ];

    const filteredCustomers = customers.filter((customer) => {
        return (
            searchTerm === "" ||
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const stats = [
        { label: "Total Customers", value: "856", icon: Users, color: "bg-blue-100 text-blue-600" },
        { label: "New This Month", value: "45", icon: Calendar, color: "bg-green-100 text-green-600" },
        { label: "Repeat Customers", value: "234", icon: RefreshCw, color: "bg-purple-100 text-purple-600" },
        { label: "Avg Order Value", value: "GH₵ 125", icon: DollarSign, color: "bg-orange-100 text-orange-600" },
    ];

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
                        <span className="font-semibold text-gray-900">Customers</span>
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
                    <span className="font-semibold text-gray-900">Customers</span>
                    <div className="w-10" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
                        <p className="text-gray-600 mt-1">View customers who purchased your products</p>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
                                <div className={`${stat.color} p-3 rounded-lg`}>
                                    <stat.icon size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">{stat.label}</p>
                                    <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="bg-white rounded-lg shadow p-4 mb-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search customers by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                            />
                        </div>
                    </div>

                    {/* Customers Table */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Customer
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Contact
                                        </th>
                                        <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Orders
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Total Spent
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Last Order
                                        </th>
                                        <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Rating
                                        </th>
                                        <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredCustomers.map((customer) => (
                                        <tr key={customer.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                                        <Users className="text-orange-600" size={18} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                                                        <p className="text-xs text-gray-500">Since {customer.joinedDate}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="text-sm text-gray-600 flex items-center gap-2">
                                                        <Mail size={14} /> {customer.email}
                                                    </p>
                                                    <p className="text-sm text-gray-600 flex items-center gap-2">
                                                        <Phone size={14} /> {customer.phone}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <p className="text-sm font-medium text-gray-900">{customer.totalOrders}</p>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <p className="text-sm font-semibold text-gray-900">
                                                    GH₵ {customer.totalSpent.toLocaleString()}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {customer.lastOrderDate}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            size={14}
                                                            className={i < customer.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                                                        />
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => setSelectedCustomer(customer)}
                                                    >
                                                        <Eye size={16} />
                                                    </Button>
                                                    <Button variant="outline" size="sm">
                                                        <MessageSquare size={16} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

            {/* Customer Details Modal */}
            {selectedCustomer && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
                        <div className="p-6 border-b flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">Customer Details</h2>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedCustomer(null)}>
                                ×
                            </Button>
                        </div>

                        <div className="p-6 space-y-4">
                            {/* Customer Header */}
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                                    <Users className="text-orange-600 w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{selectedCustomer.name}</h3>
                                    <p className="text-sm text-gray-500">Customer since {selectedCustomer.joinedDate}</p>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                                <p className="flex items-center gap-2 text-sm text-gray-700">
                                    <Mail size={16} className="text-gray-500" />
                                    {selectedCustomer.email}
                                </p>
                                <p className="flex items-center gap-2 text-sm text-gray-700">
                                    <Phone size={16} className="text-gray-500" />
                                    {selectedCustomer.phone}
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-blue-50 rounded-lg text-center">
                                    <ShoppingCart className="mx-auto text-blue-600 mb-2" size={24} />
                                    <p className="text-2xl font-bold text-gray-900">{selectedCustomer.totalOrders}</p>
                                    <p className="text-sm text-gray-600">Total Orders</p>
                                </div>
                                <div className="p-4 bg-green-50 rounded-lg text-center">
                                    <DollarSign className="mx-auto text-green-600 mb-2" size={24} />
                                    <p className="text-2xl font-bold text-gray-900">
                                        GH₵ {selectedCustomer.totalSpent.toLocaleString()}
                                    </p>
                                    <p className="text-sm text-gray-600">Total Spent</p>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="p-4 bg-yellow-50 rounded-lg">
                                <p className="text-sm text-gray-600 mb-2">Customer Rating</p>
                                <div className="flex items-center gap-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={24}
                                            className={i < selectedCustomer.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4 border-t">
                                <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                                    <MessageSquare size={16} className="mr-2" />
                                    Send Message
                                </Button>
                                <Button variant="outline">View Orders</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
