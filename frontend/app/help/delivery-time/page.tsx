'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ChevronRight, Truck, Clock, MapPin, Store } from 'lucide-react';
import Link from 'next/link';

export default function DeliveryTimePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-4xl mx-auto px-4 py-8">
                <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                    <Link href="/help" className="hover:text-orange-500">Help Center</Link>
                    <ChevronRight className="h-4 w-4" />
                    <Link href="/help#delivery" className="hover:text-orange-500">Delivery</Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-gray-900 font-medium">How long does delivery take?</span>
                </nav>

                <h1 className="text-3xl font-bold text-gray-900 mb-6">Delivery Timeframes</h1>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
                        <h2 className="text-xl font-semibold mb-2">Delivery Information</h2>
                        <p className="text-green-100">Fast and reliable delivery across Ghana</p>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="border-2 border-green-200 rounded-lg p-6 bg-green-50">
                                <div className="flex items-center gap-3 mb-3">
                                    <Truck className="h-8 w-8 text-green-600" />
                                    <h3 className="text-lg font-semibold text-gray-900">Standard Delivery</h3>
                                </div>
                                <p className="text-3xl font-bold text-green-600 mb-2">3-7</p>
                                <p className="text-gray-600">Business Days</p>
                                <p className="text-sm text-green-600 mt-2">Free for orders over GH₵ 100</p>
                            </div>

                            <div className="border-2 border-orange-200 rounded-lg p-6 bg-orange-50">
                                <div className="flex items-center gap-3 mb-3">
                                    <Clock className="h-8 w-8 text-orange-600" />
                                    <h3 className="text-lg font-semibold text-gray-900">Express Delivery</h3>
                                </div>
                                <p className="text-3xl font-bold text-orange-600 mb-2">1-3</p>
                                <p className="text-gray-600">Business Days</p>
                                <p className="text-sm text-orange-600 mt-2">GH₵ 15.00 additional fee</p>
                            </div>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Factors Affecting Delivery Time:</h3>
                        <div className="space-y-4">
                            <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                                <MapPin className="h-6 w-6 text-orange-500 flex-shrink-0" />
                                <div>
                                    <h4 className="font-medium text-gray-900">Location</h4>
                                    <p className="text-gray-600 text-sm">Delivery times may vary depending on your location. Major cities typically receive deliveries faster than remote areas.</p>
                                </div>
                            </div>

                            <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                                <Store className="h-6 w-6 text-orange-500 flex-shrink-0" />
                                <div>
                                    <h4 className="font-medium text-gray-900">Product Availability</h4>
                                    <p className="text-gray-600 text-sm">If an item is in stock, it will be shipped immediately. Pre-order or out-of-stock items may take longer.</p>
                                </div>
                            </div>

                            <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                                <Clock className="h-6 w-6 text-orange-500 flex-shrink-0" />
                                <div>
                                    <h4 className="font-medium text-gray-900">Order Processing Time</h4>
                                    <p className="text-gray-600 text-sm">Orders are processed within 24 hours. Orders placed on weekends or holidays will be processed the next business day.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery by Region:</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-900">Region</th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-900">Standard</th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-900">Express</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        <tr>
                                            <td className="px-4 py-3">Greater Accra</td>
                                            <td className="px-4 py-3">1-2 days</td>
                                            <td className="px-4 py-3">Same day</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3">Ashanti</td>
                                            <td className="px-4 py-3">2-3 days</td>
                                            <td className="px-4 py-3">1 day</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3">Western</td>
                                            <td className="px-4 py-3">3-4 days</td>
                                            <td className="px-4 py-3">2 days</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3">Other Regions</td>
                                            <td className="px-4 py-3">5-7 days</td>
                                            <td className="px-4 py-3">3 days</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
