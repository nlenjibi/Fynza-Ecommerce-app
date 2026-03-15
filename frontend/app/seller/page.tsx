'use client';

import { SellerSidebar } from '@/components/seller/seller-sidebar';
import { Button } from '@/components/ui/button';
import {
    TrendingUp,
    ShoppingCart,
    Package,
    DollarSign,
    Eye,
    MessageSquare,
    Settings,
} from 'lucide-react';
import Link from 'next/link';

export default function SellerPage() {
    const stats = [
        {
            label: 'Total Revenue',
            value: 'GH₵ 45,230',
            change: '+15.3%',
            icon: DollarSign,
            color: 'bg-green-100 text-green-600'
        },
        {
            label: 'Orders This Month',
            value: '156',
            change: '+23 new',
            icon: ShoppingCart,
            color: 'bg-blue-100 text-blue-600'
        },
        {
            label: 'Active Products',
            value: '48',
            change: '+5 this week',
            icon: Package,
            color: 'bg-purple-100 text-purple-600'
        },
        {
            label: 'Store Visits',
            value: '2,340',
            change: '+8.2%',
            icon: Eye,
            color: 'bg-orange-100 text-orange-600'
        },
    ];

    const pendingOrders = [
        {
            id: 'ORD-7821',
            customer: 'Abena Mensah',
            product: 'Wireless Bluetooth Earbuds',
            amount: 189.99,
            status: 'Pending',
            time: '5 min ago',
        },
        {
            id: 'ORD-7820',
            customer: 'Kofi Doe',
            product: 'Smart Watch Series 5',
            amount: 450.00,
            status: 'Processing',
            time: '12 min ago',
        },
        {
            id: 'ORD-7819',
            customer: 'Sarah Adjei',
            product: 'Laptop Stand Adjustable',
            amount: 89.99,
            status: 'Shipped',
            time: '1 hour ago',
        },
        {
            id: 'ORD-7818',
            customer: 'John Amponsah',
            product: 'USB-C Hub 7-in-1',
            amount: 129.99,
            status: 'Delivered',
            time: '2 hours ago',
        },
    ];

    const topProducts = [
        { name: 'Wireless Earbuds Pro', sales: 89, revenue: 'GH₵ 16,911', growth: '+12%' },
        { name: 'Smart Watch Band', sales: 67, revenue: 'GH₵ 6,699', growth: '+8%' },
        { name: 'Phone Case Premium', sales: 156, revenue: 'GH₵ 7,800', growth: '+25%' },
        { name: 'Laptop Sleeve 15.6"', sales: 43, revenue: 'GH₵ 4,299', growth: '+5%' },
    ];

    const recentMessages = [
        { from: 'Customer Support', subject: 'Order inquiry', time: '10 min ago', unread: true },
        { from: 'Kofi Mensah', subject: 'Product availability', time: '1 hour ago', unread: true },
        { from: 'Fynza Team', subject: 'New promotion available', time: '3 hours ago', unread: false },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'Processing':
                return 'bg-blue-100 text-blue-800';
            case 'Shipped':
                return 'bg-purple-100 text-purple-800';
            case 'Delivered':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <SellerSidebar />

            <main className="flex-1 overflow-auto">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Seller Center</h1>
                        <p className="text-gray-600">Welcome back! Here&apos;s your store overview</p>
                    </div>

                    {/* Quick Actions Banner */}
                    <div className="mb-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-bold mb-1">Complete your seller profile</h2>
                                <p className="text-white/90 text-sm">Add your bank details to receive payouts faster</p>
                            </div>
                            <div className="flex gap-3">
                                <Link href="/seller/products">
                                    <Button className="bg-white text-orange-600 hover:bg-gray-100 font-semibold">
                                        <Package className="w-4 h-4 mr-2" />
                                        Add Products
                                    </Button>
                                </Link>
                                <Link href="/seller/settings">
                                    <Button variant="outline" className="border-white text-white hover:bg-white/20">
                                        <Settings className="w-4 h-4 mr-2" />
                                        Settings
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                    </div>
                                    <div className={`${stat.color} rounded-lg p-3`}>
                                        <stat.icon size={20} />
                                    </div>
                                </div>
                                <p className="text-sm font-medium text-green-600">{stat.change}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Pending Orders */}
                        <div className="lg:col-span-2 bg-white rounded-lg shadow">
                            <div className="p-6 border-b flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="bg-orange-100 p-2 rounded-lg">
                                        <ShoppingCart className="text-orange-600" size={20} />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                                </div>
                                <Link href="/seller/orders">
                                    <Button variant="outline" size="sm">View All</Button>
                                </Link>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {pendingOrders.map((order) => (
                                        <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                                    <ShoppingCart className="text-orange-600" size={18} />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{order.id}</p>
                                                    <p className="text-sm text-gray-600">{order.customer} • {order.product}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-gray-900">GH₵ {order.amount}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                    <span className="text-xs text-gray-500">{order.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Top Products */}
                            <div className="bg-white rounded-lg shadow">
                                <div className="p-6 border-b">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-green-100 p-2 rounded-lg">
                                            <TrendingUp className="text-green-600" size={20} />
                                        </div>
                                        <h2 className="text-lg font-bold text-gray-900">Top Products</h2>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-4">
                                        {topProducts.map((product, i) => (
                                            <div key={i} className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                                                    <p className="text-xs text-gray-600">{product.sales} sales</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-semibold text-gray-900">{product.revenue}</p>
                                                    <p className="text-xs text-green-600">{product.growth}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="bg-white rounded-lg shadow">
                                <div className="p-6 border-b">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-blue-100 p-2 rounded-lg">
                                                <MessageSquare className="text-blue-600" size={20} />
                                            </div>
                                            <h2 className="text-lg font-bold text-gray-900">Messages</h2>
                                        </div>
                                        <Link href="/seller/messages">
                                            <Button variant="ghost" size="sm" className="text-orange-600">View All</Button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="p-4 space-y-3">
                                    {recentMessages.map((message, i) => (
                                        <div key={i} className={`p-3 rounded-lg ${message.unread ? 'bg-orange-50 border border-orange-100' : 'bg-gray-50'}`}>
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{message.from}</p>
                                                    <p className="text-xs text-gray-600">{message.subject}</p>
                                                </div>
                                                {message.unread && (
                                                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">{message.time}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="mt-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            <Link href="/seller/products">
                                <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center cursor-pointer">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Package className="text-orange-600" size={24} />
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">Add Product</p>
                                </div>
                            </Link>
                            <Link href="/seller/orders">
                                <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center cursor-pointer">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <ShoppingCart className="text-blue-600" size={24} />
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">Manage Orders</p>
                                </div>
                            </Link>
                            <Link href="/seller/analytics">
                                <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center cursor-pointer">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <TrendingUp className="text-green-600" size={24} />
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">Analytics</p>
                                </div>
                            </Link>
                            <Link href="/seller/messages">
                                <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center cursor-pointer">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <MessageSquare className="text-purple-600" size={24} />
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">Messages</p>
                                </div>
                            </Link>
                            <Link href="/seller/settings">
                                <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center cursor-pointer">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Settings className="text-gray-600" size={24} />
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">Settings</p>
                                </div>
                            </Link>
                            <Link href="/sell">
                                <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center cursor-pointer">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <DollarSign className="text-orange-600" size={24} />
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">Become a Seller</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}