'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
}

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([
    {
      id: '1',
      name: 'Girls PU Leather Princess Shoes',
      price: 166.66,
      originalPrice: 195.00,
      image: '/black-girls-shoes.jpg',
      rating: 4.5,
      reviews: 9,
    },
    {
      id: '2',
      name: 'Boys Sports Hook & Loop Shoes',
      price: 199.94,
      originalPrice: 234.00,
      image: '/boys-sports-shoes.jpg',
      rating: 4,
      reviews: 5,
    },
  ]);

  const removeFromWishlist = (id: string) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Heart size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">Your wishlist is empty</p>
            <Link href="/">
              <Button className="bg-orange-500 hover:bg-orange-600">Add Items to Wishlist</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
                <div className="relative">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-2 right-2 bg-white rounded-full p-2 hover:bg-gray-100"
                  >
                    <Trash2 size={20} className="text-red-500" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.name}</h3>
                  <div className="flex items-center mb-3">
                    <div className="flex text-orange-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>{i < Math.floor(item.rating) ? '★' : '☆'}</span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">({item.reviews})</span>
                  </div>
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-orange-500">GH₵ {item.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">GH₵ {item.originalPrice.toFixed(2)}</span>
                  </div>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center gap-2">
                    <ShoppingCart size={18} />
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
