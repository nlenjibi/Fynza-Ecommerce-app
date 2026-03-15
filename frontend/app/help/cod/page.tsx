'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Wallet, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

export default function CODPage() {
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
                        <Wallet className="h-8 w-8 text-orange-500" />
                        Cash on Delivery (COD)
                    </h1>
                    <p className="text-gray-600 mt-2">Pay for your order when you receive it</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">How COD Works</h2>
                    <ol className="list-decimal list-inside space-y-3 text-gray-600">
                        <li>Select Cash on Delivery at checkout</li>
                        <li>Enter your delivery address</li>
                        <li>Place your order</li>
                        <li>Pay in cash when your order is delivered</li>
                    </ol>
                </div>

                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">COD Availability</h2>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <MapPin className="h-5 w-5 text-orange-500" />
                            <span className="text-gray-600">Available in most locations in Ghana</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <Clock className="h-5 w-5 text-blue-500" />
                            <span className="text-gray-600">Maximum order limit: GHS 5,000</span>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 mb-6">
                    <h3 className="font-semibold text-blue-900 mb-2">Important Notes</h3>
                    <ul className="list-disc list-inside text-blue-800 space-y-1">
                        <li>Have exact change ready when receiving your order</li>
                        <li>COD orders cannot be combined with other payment methods</li>
                    </ul>
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
