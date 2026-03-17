"use client";

import { useState } from "react";
import { SellerSidebar } from "@/components/seller/seller-sidebar";
import { Button } from "@/components/ui/button";
import {
    Plus,
    Search,
    Tag,
    Percent,
    Clock,
    DollarSign,
    TrendingUp,
    Edit2,
    Trash2,
    Eye,
    X,
    Calendar,
} from "lucide-react";

interface Promotion {
    id: string;
    name: string;
    type: "discount" | "coupon" | "flash_sale";
    discountValue: number;
    minPurchase?: number;
    startDate: string;
    endDate: string;
    status: "active" | "scheduled" | "expired";
    usageCount: number;
    usageLimit?: number;
    products: string[];
}

export default function SellerPromotions() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);

    const promotions: Promotion[] = [
        {
            id: "PROMO-001",
            name: "New Year Sale",
            type: "discount",
            discountValue: 15,
            startDate: "Jan 1, 2024",
            endDate: "Jan 31, 2024",
            status: "active",
            usageCount: 156,
            usageLimit: 500,
            products: ["All Products"],
        },
        {
            id: "PROMO-002",
            name: "WELCOME10",
            type: "coupon",
            discountValue: 10,
            minPurchase: 100,
            startDate: "Jan 1, 2024",
            endDate: "Dec 31, 2024",
            status: "active",
            usageCount: 89,
            products: ["Electronics"],
        },
        {
            id: "PROMO-003",
            name: "Weekend Flash Sale",
            type: "flash_sale",
            discountValue: 25,
            startDate: "Feb 10, 2024",
            endDate: "Feb 12, 2024",
            status: "scheduled",
            usageCount: 0,
            products: ["Selected Products"],
        },
    ];

    const getTypeColor = (type: string) => {
        switch (type) {
            case "discount":
                return "bg-blue-100 text-blue-700";
            case "coupon":
                return "bg-purple-100 text-purple-700";
            case "flash_sale":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active":
                return "bg-green-100 text-green-700";
            case "scheduled":
                return "bg-yellow-100 text-yellow-700";
            case "expired":
                return "bg-gray-100 text-gray-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
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
                    <span className="font-semibold text-gray-900">Promotions</span>
                    <div className="w-10" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Promotions</h1>
                            <p className="text-gray-600 mt-1">Create and manage your promotions</p>
                        </div>
                        <Button
                            className="bg-orange-500 hover:bg-orange-600 flex items-center gap-2"
                            onClick={() => setShowAddModal(true)}
                        >
                            <Plus size={18} />
                            Create Promotion
                        </Button>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        {[
                            { label: "Active Promotions", value: "3", icon: Tag, color: "bg-green-100 text-green-600" },
                            { label: "Total Revenue", value: "GH₵ 12,450", icon: DollarSign, color: "bg-blue-100 text-blue-600" },
                            { label: "Orders from Promo", value: "245", icon: TrendingUp, color: "bg-purple-100 text-purple-600" },
                            { label: "Avg Discount", value: "16%", icon: Percent, color: "bg-orange-100 text-orange-600" },
                        ].map((stat, i) => (
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
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search promotions..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                                    />
                                </div>
                            </div>
                            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500">
                                <option value="all">All Types</option>
                                <option value="discount">Discount</option>
                                <option value="coupon">Coupon</option>
                                <option value="flash_sale">Flash Sale</option>
                            </select>
                            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500">
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="scheduled">Scheduled</option>
                                <option value="expired">Expired</option>
                            </select>
                        </div>
                    </div>

                    {/* Promotions List */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Promotion
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Type
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Discount
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Period
                                        </th>
                                        <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Usage
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
                                    {promotions.map((promo) => (
                                        <tr key={promo.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{promo.name}</p>
                                                    <p className="text-xs text-gray-500">{promo.id}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getTypeColor(
                                                        promo.type
                                                    )}`}
                                                >
                                                    {promo.type.replace("_", " ")}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {promo.discountValue}% OFF
                                                </p>
                                                {promo.minPurchase && (
                                                    <p className="text-xs text-gray-500">Min: GH₵ {promo.minPurchase}</p>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Calendar size={14} />
                                                    {promo.startDate} - {promo.endDate}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {promo.usageCount}
                                                    {promo.usageLimit && ` / ${promo.usageLimit}`}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                                                        promo.status
                                                    )}`}
                                                >
                                                    {promo.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Button variant="outline" size="sm">
                                                        <Eye size={16} />
                                                    </Button>
                                                    <Button variant="outline" size="sm" className="text-blue-600">
                                                        <Edit2 size={16} />
                                                    </Button>
                                                    <Button variant="outline" size="sm" className="text-red-600">
                                                        <Trash2 size={16} />
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

            {/* Add Promotion Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">Create Promotion</h2>
                            <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>
                                <X size={20} />
                            </Button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Promotion Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Promotion Type
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { value: "discount", label: "Discount", icon: Tag },
                                        { value: "coupon", label: "Coupon", icon: Percent },
                                        { value: "flash_sale", label: "Flash Sale", icon: Clock },
                                    ].map((type) => (
                                        <label
                                            key={type.value}
                                            className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                                        >
                                            <input
                                                type="radio"
                                                name="promoType"
                                                value={type.value}
                                                className="sr-only"
                                                defaultChecked={type.value === "discount"}
                                            />
                                            <type.icon className="text-gray-500 mb-2" size={24} />
                                            <span className="text-sm font-medium text-gray-700">{type.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Basic Info */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Promotion Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g., Summer Sale"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Discount Value (%)
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="10"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Minimum Purchase (GH₵)
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Start Date
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            End Date
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Usage Limit (optional)
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Unlimited"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                                    />
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4 border-t">
                                <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                                    Create Promotion
                                </Button>
                                <Button variant="outline" onClick={() => setShowAddModal(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
