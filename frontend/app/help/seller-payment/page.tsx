'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, DollarSign, Calendar, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function SellerPaymentPage() {
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
                        <DollarSign className="h-8 w-8 text-orange-500" />
                        Seller Payments
                    </h1>
                    <p className="text-gray-600 mt-2">Understanding how and when you get paid</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Schedule</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>Payments are processed every 14 days</li>
                        <li>Minimum payout amount: GHS 100</li>
                        <li>Payments are made to your registered bank account</li>
                    </ul>
                </div>

                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Methods</h2>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <CreditCard className="h-5 w-5 text-orange-500" />
                            <span className="text-gray-600">Bank Transfer</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <Calendar className="h-5 w-5 text-green-500" />
                            <span className="text-gray-600">Mobile Money</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">How to Check Earnings</h2>
                    <ol className="list-decimal list-inside space-y-2 text-gray-600">
                        <li>Go to your seller dashboard</li>
                        <li>Click on "Earnings" or "Wallet"</li>
                        <li>View your balance and transaction history</li>
                    </ol>
                </div>

                <div className="bg-gray-100 rounded-lg p-6 text-center">
                    <Link href="/seller/settings">
                        <Button className="bg-orange-500 hover:bg-orange-600">View Settings</Button>
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
