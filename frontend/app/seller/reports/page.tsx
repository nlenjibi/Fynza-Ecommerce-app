"use client";

import { useState } from "react";
import { SellerSidebar } from "@/components/seller/seller-sidebar";
import { Button } from "@/components/ui/button";
import {
    FileText,
    Download,
    Calendar,
    TrendingUp,
    ShoppingCart,
    Package,
    DollarSign,
    RefreshCw,
    Filter,
} from "lucide-react";

export default function SellerReports() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [dateRange, setDateRange] = useState("month");
    const [reportType, setReportType] = useState("sales");

    const reportTypes = [
        { id: "sales", name: "Sales Report", icon: DollarSign, description: "Revenue and sales performance" },
        { id: "orders", name: "Order Report", icon: ShoppingCart, description: "Order details and status" },
        { id: "products", name: "Product Performance", icon: Package, description: "Top performing products" },
        { id: "refunds", name: "Refund Report", icon: RefreshCw, description: "Refund analytics" },
        { id: "revenue", name: "Revenue Report", icon: TrendingUp, description: "Revenue breakdown" },
    ];

    const salesData = [
        { period: "Week 1", revenue: 12400, orders: 145, avgOrder: 85.52 },
        { period: "Week 2", revenue: 18200, orders: 198, avgOrder: 91.92 },
        { period: "Week 3", revenue: 15600, orders: 167, avgOrder: 93.41 },
        { period: "Week 4", revenue: 21300, orders: 234, avgOrder: 91.03 },
    ];

    const productPerformance = [
        { name: "Wireless Earbuds Pro", revenue: 29844, orders: 156, growth: "+12%" },
        { name: "Smart Watch Series 5", revenue: 40050, orders: 89, growth: "+8%" },
        { name: "Phone Case Premium", revenue: 10692, orders: 234, growth: "+25%" },
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
                        <span className="font-semibold text-gray-900">Reports</span>
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
                    <span className="font-semibold text-gray-900">Reports</span>
                    <div className="w-10" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
                            <p className="text-gray-600 mt-1">Download and analyze your store reports</p>
                        </div>
                        <Button className="bg-orange-500 hover:bg-orange-600 flex items-center gap-2">
                            <Download size={18} />
                            Export Report
                        </Button>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-lg shadow p-4 mb-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Report Type
                                </label>
                                <select
                                    value={reportType}
                                    onChange={(e) => setReportType(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                                >
                                    {reportTypes.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Date Range
                                </label>
                                <select
                                    value={dateRange}
                                    onChange={(e) => setDateRange(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                                >
                                    <option value="today">Today</option>
                                    <option value="week">This Week</option>
                                    <option value="month">This Month</option>
                                    <option value="quarter">This Quarter</option>
                                    <option value="year">This Year</option>
                                    <option value="custom">Custom Range</option>
                                </select>
                            </div>
                            <div className="flex items-end">
                                <Button variant="outline" className="w-full">
                                    <Filter size={16} className="mr-2" />
                                    Apply Filters
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Report Types Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                        {reportTypes.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => setReportType(type.id)}
                                className={`bg-white rounded-lg shadow p-4 text-center transition-all hover:shadow-md ${reportType === type.id
                                        ? "ring-2 ring-orange-500"
                                        : ""
                                    }`}
                            >
                                <div className="bg-orange-100 p-3 rounded-lg inline-flex mb-3">
                                    <type.icon className="text-orange-600" size={24} />
                                </div>
                                <p className="font-medium text-gray-900 text-sm">{type.name}</p>
                            </button>
                        ))}
                    </div>

                    {/* Report Content */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6 border-b">
                            <h2 className="text-xl font-bold text-gray-900">
                                {reportTypes.find((t) => t.id === reportType)?.name}
                            </h2>
                            <p className="text-gray-600 text-sm mt-1">
                                {reportTypes.find((t) => t.id === reportType)?.description}
                            </p>
                        </div>

                        {/* Summary Stats */}
                        <div className="p-6 border-b">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="p-4 bg-green-50 rounded-lg">
                                    <p className="text-sm text-green-600 mb-1">Total Revenue</p>
                                    <p className="text-2xl font-bold text-green-700">GH₵ 67,500</p>
                                </div>
                                <div className="p-4 bg-blue-50 rounded-lg">
                                    <p className="text-sm text-blue-600 mb-1">Total Orders</p>
                                    <p className="text-2xl font-bold text-blue-700">744</p>
                                </div>
                                <div className="p-4 bg-purple-50 rounded-lg">
                                    <p className="text-sm text-purple-600 mb-1">Avg Order Value</p>
                                    <p className="text-2xl font-bold text-purple-700">GH₵ 90.72</p>
                                </div>
                                <div className="p-4 bg-orange-50 rounded-lg">
                                    <p className="text-sm text-orange-600 mb-1">Growth</p>
                                    <p className="text-2xl font-bold text-orange-700">+15.3%</p>
                                </div>
                            </div>
                        </div>

                        {/* Data Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Period
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Revenue
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Orders
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Avg Order Value
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {salesData.map((data, i) => (
                                        <tr key={i} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                {data.period}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 text-right font-semibold">
                                                GH₵ {data.revenue.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 text-right">
                                                {data.orders}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 text-right">
                                                GH₵ {data.avgOrder.toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Export Options */}
                        <div className="p-6 border-t bg-gray-50">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <p className="text-sm text-gray-600">
                                    Export this report in your preferred format
                                </p>
                                <div className="flex gap-3">
                                    <Button variant="outline">
                                        <FileText size={16} className="mr-2" />
                                        CSV
                                    </Button>
                                    <Button variant="outline">
                                        <FileText size={16} className="mr-2" />
                                        PDF
                                    </Button>
                                    <Button className="bg-orange-500 hover:bg-orange-600">
                                        <Download size={16} className="mr-2" />
                                        Download
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
