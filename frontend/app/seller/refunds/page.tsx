"use client";

import { useState } from "react";
import { SellerSidebar } from "@/components/seller/seller-sidebar";
import { Button } from "@/components/ui/button";
import {
    Search,
    RefreshCw,
    Check,
    X,
    Eye,
    AlertTriangle,
    DollarSign,
    Package,
    User,
    Calendar,
} from "lucide-react";

type RefundStatus = "pending" | "approved" | "rejected" | "processed";

interface Refund {
    id: string;
    orderId: string;
    customer: {
        name: string;
        email: string;
    };
    product: string;
    amount: number;
    reason: string;
    status: RefundStatus;
    requestDate: string;
    processedDate?: string;
}

export default function SellerRefunds() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [selectedRefund, setSelectedRefund] = useState<Refund | null>(null);

    const refunds: Refund[] = [
        {
            id: "REF-001",
            orderId: "ORD-7816",
            customer: { name: "Michael Kwaku", email: "michael.kwaku@email.com" },
            product: "Wireless Charger Pad",
            amount: 35.99,
            reason: "Product not as described",
            status: "pending",
            requestDate: "Jan 6, 2024",
        },
        {
            id: "REF-002",
            orderId: "ORD-7798",
            customer: { name: "Sarah Adams", email: "sarah.adams@email.com" },
            product: "USB-C Cable 2m",
            amount: 15.99,
            reason: "Wrong item received",
            status: "approved",
            requestDate: "Jan 4, 2024",
            processedDate: "Jan 5, 2024",
        },
        {
            id: "REF-003",
            orderId: "ORD-7756",
            customer: { name: "John Doe", email: "john.doe@email.com" },
            product: "Phone Case Premium",
            amount: 29.99,
            reason: "Changed mind",
            status: "rejected",
            requestDate: "Jan 2, 2024",
        },
        {
            id: "REF-004",
            orderId: "ORD-7734",
            customer: { name: "Emma Owusu", email: "emma.owusu@email.com" },
            product: "Laptop Sleeve 15.6\"",
            amount: 45.99,
            reason: "Defective product",
            status: "processed",
            requestDate: "Dec 30, 2023",
            processedDate: "Jan 2, 2024",
        },
    ];

    const getStatusColor = (status: RefundStatus) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "approved":
                return "bg-blue-100 text-blue-800";
            case "rejected":
                return "bg-red-100 text-red-800";
            case "processed":
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const filteredRefunds = refunds.filter((refund) => {
        const matchesSearch =
            searchTerm === "" ||
            refund.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            refund.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            refund.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === "all" || refund.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const stats = [
        { label: "Total Refunds", value: "23", icon: RefreshCw, color: "bg-gray-100 text-gray-600" },
        { label: "Pending", value: "3", icon: AlertTriangle, color: "bg-yellow-100 text-yellow-600" },
        { label: "Approved", value: "15", icon: Check, color: "bg-blue-100 text-blue-600" },
        { label: "Total Refunded", value: "GH₵ 1,245", icon: DollarSign, color: "bg-green-100 text-green-600" },
    ];

    const handleApprove = (id: string) => {
        console.log(`Approving refund ${id}`);
    };

    const handleReject = (id: string) => {
        console.log(`Rejecting refund ${id}`);
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
                    <span className="font-semibold text-gray-900">Refunds</span>
                    <div className="w-10" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Refund Management</h1>
                        <p className="text-gray-600 mt-1">Manage and process refund requests</p>
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

                    {/* Filters */}
                    <div className="bg-white rounded-lg shadow p-4 mb-6">
                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search by refund ID, order ID, or customer..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {["all", "pending", "approved", "rejected", "processed"].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setFilterStatus(status)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${filterStatus === status
                                                ? "bg-orange-500 text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Refunds Table */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Refund ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Order ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Customer
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Product
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Reason
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Request Date
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
                                    {filteredRefunds.map((refund) => (
                                        <tr key={refund.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                {refund.id}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {refund.orderId}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{refund.customer.name}</p>
                                                    <p className="text-xs text-gray-500">{refund.customer.email}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {refund.product}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">
                                                GH₵ {refund.amount.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {refund.reason}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {refund.requestDate}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                                                        refund.status
                                                    )}`}
                                                >
                                                    {refund.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => setSelectedRefund(refund)}
                                                    >
                                                        <Eye size={16} />
                                                    </Button>
                                                    {refund.status === "pending" && (
                                                        <>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="text-green-600 border-green-600 hover:bg-green-50"
                                                                onClick={() => handleApprove(refund.id)}
                                                            >
                                                                <Check size={16} />
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="text-red-600 border-red-600 hover:bg-red-50"
                                                                onClick={() => handleReject(refund.id)}
                                                            >
                                                                <X size={16} />
                                                            </Button>
                                                        </>
                                                    )}
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

            {/* Refund Details Modal */}
            {selectedRefund && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
                        <div className="p-6 border-b flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">Refund Details</h2>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedRefund(null)}>
                                <X size={20} />
                            </Button>
                        </div>

                        <div className="p-6 space-y-4">
                            {/* Refund Info */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">Refund ID</p>
                                    <p className="font-semibold text-gray-900">{selectedRefund.id}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Order ID</p>
                                    <p className="font-semibold text-gray-900">{selectedRefund.orderId}</p>
                                </div>
                            </div>

                            {/* Customer Info */}
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3 mb-2">
                                    <User className="text-gray-500" size={18} />
                                    <p className="font-semibold text-gray-900">Customer Information</p>
                                </div>
                                <p className="text-sm text-gray-700">{selectedRefund.customer.name}</p>
                                <p className="text-sm text-gray-500">{selectedRefund.customer.email}</p>
                            </div>

                            {/* Product Info */}
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3 mb-2">
                                    <Package className="text-gray-500" size={18} />
                                    <p className="font-semibold text-gray-900">Product</p>
                                </div>
                                <p className="text-sm text-gray-700">{selectedRefund.product}</p>
                            </div>

                            {/* Amount */}
                            <div className="p-4 bg-green-50 rounded-lg">
                                <p className="text-sm text-green-600">Refund Amount</p>
                                <p className="text-2xl font-bold text-green-700">
                                    GH₵ {selectedRefund.amount.toFixed(2)}
                                </p>
                            </div>

                            {/* Reason */}
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Reason</p>
                                <p className="text-sm text-gray-700 p-3 bg-gray-50 rounded-lg">
                                    {selectedRefund.reason}
                                </p>
                            </div>

                            {/* Dates */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">Request Date</p>
                                    <p className="font-semibold text-gray-900">{selectedRefund.requestDate}</p>
                                </div>
                                {selectedRefund.processedDate && (
                                    <div>
                                        <p className="text-sm text-gray-600">Processed Date</p>
                                        <p className="font-semibold text-gray-900">{selectedRefund.processedDate}</p>
                                    </div>
                                )}
                            </div>

                            {/* Status */}
                            <div>
                                <p className="text-sm text-gray-600 mb-2">Status</p>
                                <span
                                    className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${getStatusColor(
                                        selectedRefund.status
                                    )}`}
                                >
                                    {selectedRefund.status}
                                </span>
                            </div>

                            {/* Actions */}
                            {selectedRefund.status === "pending" && (
                                <div className="flex gap-3 pt-4 border-t">
                                    <Button
                                        className="flex-1 bg-green-500 hover:bg-green-600"
                                        onClick={() => handleApprove(selectedRefund.id)}
                                    >
                                        <Check size={16} className="mr-2" />
                                        Approve Refund
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
                                        onClick={() => handleReject(selectedRefund.id)}
                                    >
                                        <X size={16} className="mr-2" />
                                        Reject Refund
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
