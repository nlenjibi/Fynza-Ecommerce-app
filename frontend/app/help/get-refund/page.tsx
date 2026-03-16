'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw, CreditCard, Mail } from 'lucide-react';
import Link from 'next/link';

export default function GetRefundPage() {
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
                        <RefreshCw className="h-8 w-8 text-orange-500" />
                        How to Get a Refund
                    </h1>
                    <p className="text-gray-600 mt-2">Learn how to request and receive refunds on Fynza</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Refund Eligibility</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>Item not received</li>
                        <li>Wrong item delivered</li>
                        <li>Defective or damaged product</li>
                        <li>Product significantly different from description</li>
                        <li>Order cancelled before shipment</li>
                    </ul>
                </div>

                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">How to Request a Refund</h2>
                    <div className="space-y-4">
                        <div className="flex gap-3">
                            <span className="bg-orange-100 rounded-full w-6 h-6 flex items-center justify-center text-orange-600 font-semibold text-sm">1</span>
                            <p className="text-gray-600">Go to My Orders and select the order</p>
                        </div>
                        <div className="flex gap-3">
                            <span className="bg-orange-100 rounded-full w-6 h-6 flex items-center justify-center text-orange-600 font-semibold text-sm">2</span>
                            <p className="text-gray-600">Click on Request Refund</p>
                        </div>
                        <div className="flex gap-3">
                            <span className="bg-orange-100 rounded-full w-6 h-6 flex items-center justify-center text-orange-600 font-semibold text-sm">3</span>
                            <p className="text-gray-600">Fill in the refund form with reason</p>
                        </div>
                        <div className="flex gap-3">
                            <span className="bg-orange-100 rounded-full w-6 h-6 flex items-center justify-center text-orange-600 font-semibold text-sm">4</span>
                            <p className="text-gray-600">Submit and wait for confirmation</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Refund Methods</h2>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <CreditCard className="h-5 w-5 text-orange-500" />
                            <span className="text-gray-600">Original payment method</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <Mail className="h-5 w-5 text-blue-500" />
                            <span className="text-gray-600">Store credit for faster refund</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-100 rounded-lg p-6 text-center">
                    <Link href="/contact">
                        <Button className="bg-orange-500 hover:bg-orange-600">Contact Us</Button>
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
