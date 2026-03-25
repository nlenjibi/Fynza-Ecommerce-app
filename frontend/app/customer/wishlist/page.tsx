'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CustomerSidebar } from '@/components/customer/customer-sidebar';
import { Button } from '@/components/ui/button';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function WishlistPage() {
    const [wishlistItems, setWishlistItems] = useState([
        {
            id: 1,
            name: 'Premium Wireless Headphones',
            price: 299.99,
            originalPrice: 399.99,
            image: '/products/headphones.jpg',
            rating: 4.5,
            reviews: 128,
            inStock: true,
        },
        {
            id: 2,
            name: 'Smart Watch Pro',
            price: 199.99,
            originalPrice: 249.99,
            image: '/products/smartwatch.jpg',
            rating: 4.8,
            reviews: 256,
            inStock: true,
        },
        {
            id: 3,
            name: 'USB-C Fast Charger',
            price: 49.99,
            originalPrice: 79.99,
            image: '/products/charger.jpg',
            rating: 4.3,
            reviews: 89,
            inStock: false,
        },
        {
            id: 4,
            name: 'Portable Power Bank',
            price: 79.99,
            originalPrice: 99.99,
            image: '/products/powerbank.jpg',
            rating: 4.6,
            reviews: 342,
            inStock: true,
        },
        {
            id: 5,
            name: 'Wireless Mouse',
            price: 39.99,
            originalPrice: 59.99,
            image: '/products/mouse.jpg',
            rating: 4.4,
            reviews: 167,
            inStock: true,
        },
        {
            id: 6,
            name: 'Mechanical Keyboard',
            price: 129.99,
            originalPrice: 179.99,
            image: '/products/keyboard.jpg',
            rating: 4.7,
            reviews: 203,
            inStock: true,
        },
        {
            id: 7,
            name: 'Phone Stand',
            price: 19.99,
            originalPrice: 29.99,
            image: '/products/stand.jpg',
            rating: 4.2,
            reviews: 95,
            inStock: true,
        },
        {
            id: 8,
            name: 'Screen Protector Pack',
            price: 14.99,
            originalPrice: 24.99,
            image: '/products/protector.jpg',
            rating: 4.1,
            reviews: 156,
            inStock: true,
        },
    ]);

    const removeFromWishlist = (id: number) => {
        setWishlistItems(wishlistItems.filter(item => item.id !== id));
    };

    const totalSavings = wishlistItems.reduce((sum, item) => sum + (item.originalPrice - item.price), 0);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="flex">
                <CustomerSidebar />

                <main className="flex-1">
                    <div className="max-w-6xl mx-auto px-6 py-8">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
                            <p className="text-gray-600">{wishlistItems.length} items saved</p>
                        </div>

                        {wishlistItems.length > 0 ? (
                            <>
                                {/* Savings Banner */}
                                <div className="bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg shadow p-6 mb-8 text-white">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-orange-100 text-sm">Total Potential Savings</p>
                                            <p className="text-3xl font-bold">GHS {totalSavings.toFixed(2)}</p>
                                        </div>
                                        <Heart className="h-16 w-16 opacity-20" />
                                    </div>
                                </div>

                                {/* Wishlist Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {wishlistItems.map((item) => (
                                        <div key={item.id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden group">
                                            {/* Product Image */}
                                            <div className="relative bg-gray-200 h-48 overflow-hidden">
                                                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                                                    <span className="text-gray-500">Product Image</span>
                                                </div>

                                                {/* Stock Badge */}
                                                {!item.inStock && (
                                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                        <span className="text-white font-semibold">Out of Stock</span>
                                                    </div>
                                                )}

                                                {/* Discount Badge */}
                                                {item.price < item.originalPrice && (
                                                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                                                        -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                                                    </div>
                                                )}

                                                {/* Remove Button */}
                                                <button
                                                    onClick={() => removeFromWishlist(item.id)}
                                                    className="absolute top-2 left-2 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
                                                >
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </button>
                                            </div>

                                            {/* Product Info */}
                                            <div className="p-4">
                                                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.name}</h3>

                                                {/* Rating */}
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="flex text-yellow-400">
                                                        {'★'.repeat(Math.floor(item.rating))}
                                                        {'☆'.repeat(5 - Math.floor(item.rating))}
                                                    </div>
                                                    <span className="text-xs text-gray-600">({item.reviews})</span>
                                                </div>

                                                {/* Price */}
                                                <div className="mb-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-lg font-bold text-gray-900">GHS {item.price.toFixed(2)}</span>
                                                        {item.price < item.originalPrice && (
                                                            <span className="text-sm text-gray-500 line-through">GHS {item.originalPrice.toFixed(2)}</span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="space-y-2">
                                                    <Button
                                                        className="w-full bg-orange-500 hover:bg-orange-600 gap-2"
                                                        disabled={!item.inStock}
                                                    >
                                                        <ShoppingCart className="h-4 w-4" />
                                                        Add to Cart
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        className="w-full"
                                                        onClick={() => removeFromWishlist(item.id)}
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="bg-white rounded-lg shadow p-12 text-center">
                                <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
                                <p className="text-gray-600 mb-6">Start adding items to your wishlist to save them for later</p>
                                <Link href="/">
                                    <Button className="bg-orange-500 hover:bg-orange-600">Continue Shopping</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
}
