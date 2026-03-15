'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Package, Camera, Tag } from 'lucide-react';
import Link from 'next/link';

export default function ListProductsPage() {
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
                        <Package className="h-8 w-8 text-orange-500" />
                        How to List Products
                    </h1>
                    <p className="text-gray-600 mt-2">Learn how to add products to your Fynza store</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Steps to List Products</h2>
                    <ol className="list-decimal list-inside space-y-3 text-gray-600">
                        <li>Log in to your seller dashboard</li>
                        <li>Go to Products and click "Add New Product"</li>
                        <li>Enter product details (name, description, price)</li>
                        <li>Upload high-quality product images</li>
                        <li>Set inventory and shipping options</li>
                        <li>Click "Publish" to list your product</li>
                    </ol>
                </div>

                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Image Guidelines</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>Use images at least 1000x1000 pixels</li>
                        <li>White background preferred</li>
                        <li>Show product from multiple angles</li>
                        <li>File format: JPG or PNG</li>
                    </ul>
                </div>

                <div className="bg-gray-100 rounded-lg p-6 text-center">
                    <Link href="/seller/products">
                        <Button className="bg-orange-500 hover:bg-orange-600">Go to Products</Button>
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
