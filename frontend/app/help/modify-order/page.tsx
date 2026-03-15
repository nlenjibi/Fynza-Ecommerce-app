'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart, Package, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ModifyOrderPage() {
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
                        <ShoppingCart className="h-8 w-8 text-orange-500" />
                        Modifying Your Order
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Learn about modifying your order after placement
                    </p>
                </div>

                {/* Important Notice */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-semibold text-amber-800">Important</h3>
                            <p className="text-amber-700 text-sm mt-1">
                                Once an order is placed, modifications are only possible while the order status is "Pending" or "Processing".
                                After the order has been shipped, changes cannot be made.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Guide Sections */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">How to Modify Your Order</h2>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="bg-orange-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                                <span className="text-orange-600 font-semibold">1</span>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Check Order Status</h3>
                                <p className="text-gray-600 mt-1">
                                    Log in to your account and go to "My Orders" to check if your order is still in "Pending" or "Processing" status.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-orange-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                                <span className="text-orange-600 font-semibold">2</span>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Contact Customer Support</h3>
                                <p className="text-gray-600 mt-1">
                                    If modifications are still possible, contact our customer support team at 030 274 0642 or through live chat.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-orange-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                                <span className="text-orange-600 font-semibold">3</span>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Request Modification</h3>
                                <p className="text-gray-600 mt-1">
                                    Provide your order number and the changes you'd like to make. Our team will assist you.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* What Can Be Modified */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">What Can Be Modified</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium text-gray-900">Shipping Address</p>
                                <p className="text-sm text-gray-600">Change delivery address before shipment</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium text-gray-900">Phone Number</p>
                                <p className="text-sm text-gray-600">Update contact number for delivery</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium text-gray-900">Delivery Date</p>
                                <p className="text-sm text-gray-600">Schedule a convenient delivery date</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium text-gray-900">Product Changes</p>
                                <p className="text-sm text-gray-600">Product changes require cancelling and re-ordering</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Status Guide */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Status Guide</h2>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <Clock className="h-5 w-5 text-yellow-500" />
                            <div>
                                <p className="font-medium text-gray-900">Pending</p>
                                <p className="text-sm text-gray-600">Order placed, awaiting confirmation - MODIFICATIONS POSSIBLE</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <Package className="h-5 w-5 text-blue-500" />
                            <div>
                                <p className="font-medium text-gray-900">Processing</p>
                                <p className="text-sm text-gray-600">Order being prepared - MODIFICATIONS MAY BE POSSIBLE</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <Package className="h-5 w-5 text-orange-500" />
                            <div>
                                <p className="font-medium text-gray-900">Shipped</p>
                                <p className="text-sm text-gray-600">Order on its way - MODIFICATIONS NOT POSSIBLE</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <div>
                                <p className="font-medium text-gray-900">Delivered</p>
                                <p className="text-sm text-gray-600">Order received - MODIFICATIONS NOT POSSIBLE</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Alternative Options */}
                <div className="bg-blue-50 rounded-lg p-6 mb-6">
                    <h3 className="font-semibold text-blue-900 mb-3">If You Can't Modify Your Order</h3>
                    <ul className="list-disc list-inside text-blue-800 space-y-2">
                        <li>Cancel the current order and place a new one with the correct details</li>
                        <li>For address changes, you may be able to redirect the delivery through the courier</li>
                        <li>Contact the delivery driver directly if your order is already out for delivery</li>
                        <li>Our support team can advise on the best course of action for your specific situation</li>
                    </ul>
                </div>

                {/* Contact Support */}
                <div className="bg-gray-100 rounded-lg p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Need More Help?</h3>
                    <p className="text-gray-600 mb-4">Contact our support team to modify your order</p>
                    <div className="flex justify-center gap-4">
                        <Link href="/contact">
                            <Button className="bg-orange-500 hover:bg-orange-600">Contact Us</Button>
                        </Link>
                        <Link href="/my-orders">
                            <Button variant="outline">View My Orders</Button>
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
