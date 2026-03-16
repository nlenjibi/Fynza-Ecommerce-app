'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, CreditCard, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function RefundTimePage() {
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
                        <Clock className="h-8 w-8 text-orange-500" />
                        How Long Do Refunds Take
                    </h1>
                    <p className="text-gray-600 mt-2">Understanding refund processing times on Fynza</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Refund Processing Times</h2>
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-medium text-gray-900 flex items-center gap-2">
                                <CreditCard className="h-5 w-5 text-orange-500" />
                                Credit/Debit Card
                            </h3>
                            <p className="text-gray-600 mt-1">5-10 business days</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-medium text-gray-900 flex items-center gap-2">
                                <Building2 className="h-5 w-5 text-blue-500" />
                                Bank Transfer
                            </h3>
                            <p className="text-gray-600 mt-1">7-14 business days</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-medium text-gray-900 flex items-center gap-2">
                                <Clock className="h-5 w-5 text-green-500" />
                                Mobile Money
                            </h3>
                            <p className="text-gray-600 mt-1">2-5 business days</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">What Affects Refund Time</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>Bank processing times</li>
                        <li>Verification requirements</li>
                        <li>Weekends and holidays</li>
                        <li>Return inspection period</li>
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
