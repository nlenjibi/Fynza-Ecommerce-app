'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Package, CheckCircle, XCircle, RotateCcw, Eye, Download } from 'lucide-react';
import Link from 'next/link';

export default function OrderHistoryPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-4xl mx-auto px-4 py-8">
                {/* Back Button */}
                <Link href="/help" className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-6">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Help Center
                </Link>

                {/* Page Header */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        <Clock className="h-8 w-8 text-orange-500" />
                        Viewing Your Order History
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Learn how to access and manage your order history on Fynza
                    </p>
                </div>

                {/* Guide Sections */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">How to View Your Order History</h2>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="bg-orange-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                                <span className="text-orange-600 font-semibold">1</span>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Log In to Your Account</h3>
                                <p className="text-gray-600 mt-1">
                                    Sign in to your Fynza account using your email and password.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-orange-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                                <span className="text-orange-600 font-semibold">2</span>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Go to My Orders</h3>
                                <p className="text-gray-600 mt-1">
                                    Click on "My Orders" in the navigation menu or visit /my-orders directly.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-orange-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                                <span className="text-orange-600 font-semibold">3</span>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Browse Your History</h3>
                                <p className="text-gray-600 mt-1">
                                    View all your past and current orders with their status, order details, and dates.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-orange-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                                <span className="text-orange-600 font-semibold">4</span>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Order Details</h3>
                                <p className="text-gray-600 mt-1">
                                    Click on any order to see detailed information including items, shipping address, and payment status.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order History Features */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Order History Features</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                            <Eye className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium text-gray-900">View Order Details</p>
                                <p className="text-sm text-gray-600">See complete details of each order including items, prices, and delivery information</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                            <Package className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium text-gray-900">Track Orders</p>
                                <p className="text-sm text-gray-600">Monitor the status of current orders in real-time</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                            <RotateCcw className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium text-gray-900">Request Returns</p>
                                <p className="text-sm text-gray-600">Initiate return requests for eligible orders directly from your history</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                            <Download className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium text-gray-900">Download Invoices</p>
                                <p className="text-sm text-gray-600">Download and print invoices for your records</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Status Types */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Understanding Order Status</h2>

                    <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                            <Clock className="h-5 w-5 text-yellow-600" />
                            <span className="font-medium text-gray-900">Pending</span>
                            <span className="text-gray-600 text-sm">- Order placed, awaiting confirmation</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <Package className="h-5 w-5 text-blue-600" />
                            <span className="font-medium text-gray-900">Processing</span>
                            <span className="text-gray-600 text-sm">- Order is being prepared</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                            <Package className="h-5 w-5 text-orange-600" />
                            <span className="font-medium text-gray-900">Shipped</span>
                            <span className="text-gray-600 text-sm">- On the way to delivery address</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="font-medium text-gray-900">Delivered</span>
                            <span className="text-gray-600 text-sm">- Order has been received</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                            <XCircle className="h-5 w-5 text-red-600" />
                            <span className="font-medium text-gray-900">Cancelled</span>
                            <span className="text-gray-600 text-sm">- Order was cancelled</span>
                        </div>
                    </div>
                </div>

                {/* How Long is History Kept */}
                <div className="bg-blue-50 rounded-lg p-6 mb-6">
                    <h3 className="font-semibold text-blue-900 mb-3">Order History Retention</h3>
                    <ul className="list-disc list-inside text-blue-800 space-y-2">
                        <li>Your complete order history is stored indefinitely in your account</li>
                        <li>You can view orders from several years back</li>
                        <li>Order invoices can be downloaded for record-keeping</li>
                        <li>For orders older than 12 months, some detailed information may be archived</li>
                    </ul>
                </div>

                {/* Contact Support */}
                <div className="bg-gray-100 rounded-lg p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Need More Help?</h3>
                    <p className="text-gray-600 mb-4">Our support team is here to assist you</p>
                    <div className="flex justify-center gap-4">
                        <Link href="/my-orders">
                            <Button className="bg-orange-500 hover:bg-orange-600">View My Orders</Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline">Contact Us</Button>
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
