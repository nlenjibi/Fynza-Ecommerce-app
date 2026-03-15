'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart, Package, Truck } from 'lucide-react';
import Link from 'next/link';

export default function ManageOrdersPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-4xl mx-auto px-4 py-8">
                <Link href="/help" className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-6">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Help Center
                </Link>

                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        <ShoppingCart className="h-8 w-8 text-orange-500" />
                        Managing Your Orders
                    </h1>
                    <p className="text-gray-600 mt-2">How to handle orders as a seller on Fynza</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Management</h2>
                    <ol className="list-decimal list-inside space-y-3 text-gray-600">
                        <li>View all orders in your seller dashboard</li>
                        <li>Process orders within 48 hours</li>
                        <li>Update order status (Processing, Shipped, Delivered)</li>
                        <li>Print shipping labels</li>
                        <li>Handle customer inquiries</li>
                    </ol>
                </div>

                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Statuses</h2>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded">
                            <Package className="h-4 w-4 text-yellow-600" />
                            <span className="text-gray-700">Pending - Awaiting processing</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                            <Package className="h-4 w-4 text-blue-600" />
                            <span className="text-gray-700">Processing - Being prepared</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-orange-50 rounded">
                            <Truck className="h-4 w-4 text-orange-600" />
                            <span className="text-gray-700">Shipped - On the way</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-100 rounded-lg p-6 text-center">
                    <Link href="/seller/orders">
                        <Button className="bg-orange-500 hover:bg-orange-600">View Orders</Button>
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
