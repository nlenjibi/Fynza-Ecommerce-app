'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function NonReturnablePage() {
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
                        <AlertCircle className="h-8 w-8 text-orange-500" />
                        Non-Returnable Items
                    </h1>
                    <p className="text-gray-600 mt-2">Items that cannot be returned on Fynza</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Items That Cannot Be Returned</h2>
                    <ul className="list-disc list-inside space-y-3 text-gray-600">
                        <li>Intimate apparel and swimwear</li>
                        <li>Personal care items (if opened)</li>
                        <li>Medical equipment and supplies</li>
                        <li>Perishable goods (food items)</li>
                        <li>Customized or personalized products</li>
                        <li>Digital products and software</li>
                        <li>Gift cards and vouchers</li>
                        <li>Items damaged due to misuse</li>
                    </ul>
                </div>

                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Exceptions</h2>
                    <p className="text-gray-600">If you receive a defective or damaged item, please contact our support team within 48 hours for assistance.</p>
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
