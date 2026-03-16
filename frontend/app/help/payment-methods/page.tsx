'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CreditCard, Smartphone, Wallet } from 'lucide-react';
import Link from 'next/link';

export default function PaymentMethodsPage() {
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
                        Payment Methods
                    </h1>
                    <p className="text-gray-600 mt-2">Accepted payment methods on Fynza</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Accepted Payment Methods</h2>
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg flex items-center gap-3">
                            <CreditCard className="h-6 w-6 text-orange-500" />
                            <div>
                                <h3 className="font-medium text-gray-900">Credit/Debit Cards</h3>
                                <p className="text-sm text-gray-600">Visa, Mastercard, American Express</p>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg flex items-center gap-3">
                            <Smartphone className="h-6 w-6 text-green-500" />
                            <div>
                                <h3 className="font-medium text-gray-900">Mobile Money</h3>
                                <p className="text-sm text-gray-600">MTN Mobile Money, Vodafone Cash, AirtelTigo Money</p>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg flex items-center gap-3">
                            <Wallet className="h-6 w-6 text-blue-500" />
                            <div>
                                <h3 className="font-medium text-gray-900">Cash on Delivery</h3>
                                <p className="text-sm text-gray-600">Pay when you receive your order</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">How to Add Payment Method</h2>
                    <ol className="list-decimal list-inside space-y-2 text-gray-600">
                        <li>Go to Account Settings</li>
                        <li>Click on Payment Methods</li>
                        <li>Add your card or mobile money details</li>
                        <li>Verify your payment method</li>
                    </ol>
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
