'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Lock, Shield } from 'lucide-react';
import Link from 'next/link';

export default function PaymentSecurityPage() {
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
                        <Shield className="h-8 w-8 text-orange-500" />
                        Payment Security
                    </h1>
                    <p className="text-gray-600 mt-2">How we keep your payment information safe</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Security Measures</h2>
                    <ul className="space-y-3 text-gray-600">
                        <li className="flex items-center gap-2">
                            <Lock className="h-5 w-5 text-green-500" />
                            <span>SSL Encryption for all transactions</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-blue-500" />
                            <span>PCI DSS compliant payment processing</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-orange-500" />
                            <span>Two-factor authentication available</span>
                        </li>
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
