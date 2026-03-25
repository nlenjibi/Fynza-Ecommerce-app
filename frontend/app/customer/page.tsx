'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CustomerSidebar } from '@/components/customer/customer-sidebar';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Heart, MapPin, CreditCard, TrendingUp, Award } from 'lucide-react';
import Link from 'next/link';

export default function CustomerPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="flex">
                <CustomerSidebar />

                <main className="flex-1">
                    <div className="max-w-6xl mx-auto px-6 py-8">
                        {/* Welcome Section */}
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back, John!</h1>
                            <p className="text-gray-600">Here's what's happening with your account today</p>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm font-medium">Total Orders</p>
                                        <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
                                    </div>
                                    <ShoppingBag className="h-12 w-12 text-orange-500 opacity-20" />
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm font-medium">Wishlist Items</p>
                                        <p className="text-3xl font-bold text-gray-900 mt-2">8</p>
                                    </div>
                                    <Heart className="h-12 w-12 text-red-500 opacity-20" />
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm font-medium">Loyalty Points</p>
                                        <p className="text-3xl font-bold text-gray-900 mt-2">2,450</p>
                                    </div>
                                    <Award className="h-12 w-12 text-yellow-500 opacity-20" />
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm font-medium">Avg Rating</p>
                                        <p className="text-3xl font-bold text-gray-900 mt-2">4.8★</p>
                                    </div>
                                    <TrendingUp className="h-12 w-12 text-green-500 opacity-20" />
                                </div>
                            </div>
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Recent Orders */}
                            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                                    <Link href="/customer/orders" className="text-orange-500 hover:text-orange-600 text-sm font-semibold">
                                        View All →
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    {/* Order Item 1 */}
                                    <div className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <p className="font-semibold text-gray-900">Order #FYN-2024-001245</p>
                                                <p className="text-sm text-gray-600">Placed on Jan 15, 2024</p>
                                            </div>
                                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">Delivered</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-gray-700">3 items • GHS 450.00</p>
                                            <Button variant="outline" size="sm">Track Order</Button>
                                        </div>
                                    </div>

                                    {/* Order Item 2 */}
                                    <div className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <p className="font-semibold text-gray-900">Order #FYN-2024-001244</p>
                                                <p className="text-sm text-gray-600">Placed on Jan 12, 2024</p>
                                            </div>
                                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">In Transit</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-gray-700">2 items • GHS 320.00</p>
                                            <Button variant="outline" size="sm">Track Order</Button>
                                        </div>
                                    </div>

                                    {/* Order Item 3 */}
                                    <div className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <p className="font-semibold text-gray-900">Order #FYN-2024-001243</p>
                                                <p className="text-sm text-gray-600">Placed on Jan 8, 2024</p>
                                            </div>
                                            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">Processing</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-gray-700">1 item • GHS 180.00</p>
                                            <Button variant="outline" size="sm">Track Order</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="space-y-4">
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                                    <div className="space-y-3">
                                        <Link href="/customer/orders" className="block">
                                            <Button className="w-full bg-orange-500 hover:bg-orange-600 justify-start gap-2">
                                                <ShoppingBag className="h-4 w-4" />
                                                My Orders
                                            </Button>
                                        </Link>
                                        <Link href="/customer/wishlist" className="block">
                                            <Button variant="outline" className="w-full justify-start gap-2">
                                                <Heart className="h-4 w-4" />
                                                My Wishlist
                                            </Button>
                                        </Link>
                                        <Link href="/customer/addresses" className="block">
                                            <Button variant="outline" className="w-full justify-start gap-2">
                                                <MapPin className="h-4 w-4" />
                                                Addresses
                                            </Button>
                                        </Link>
                                        <Link href="/customer/payments" className="block">
                                            <Button variant="outline" className="w-full justify-start gap-2">
                                                <CreditCard className="h-4 w-4" />
                                                Payment Methods
                                            </Button>
                                        </Link>
                                    </div>
                                </div>

                                {/* Loyalty Program */}
                                <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg shadow p-6 text-white">
                                    <h3 className="text-lg font-bold mb-2">Loyalty Program</h3>
                                    <p className="text-orange-100 text-sm mb-4">You're 550 points away from Gold status</p>
                                    <div className="w-full bg-orange-300 rounded-full h-2 mb-3">
                                        <div className="bg-white rounded-full h-2 w-3/4"></div>
                                    </div>
                                    <p className="text-xs text-orange-100">2,450 / 3,000 points</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
}
