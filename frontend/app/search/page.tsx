'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CategorySidebar } from '@/components/category-sidebar';
import { FilterBar } from '@/components/filter-bar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { ProductGridSkeleton } from '@/components/skeletons';

interface SearchProduct {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating: number;
    reviews: number;
    seller: string;
    discount?: number;
}

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const [products, setProducts] = useState<SearchProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState('popularity');
    const [filteredProducts, setFilteredProducts] = useState<SearchProduct[]>([]);

    // Mock search results - replace with actual API call
    useEffect(() => {
        if (!query.trim()) {
            setProducts([]);
            return;
        }

        setLoading(true);
        setError(null);

        // Simulate API call
        const timer = setTimeout(() => {
            // Mock data - in production, call actual search API
            const mockResults: SearchProduct[] = [
                {
                    id: 'prod_1',
                    name: `${query} - Premium Quality Product`,
                    price: 149.99,
                    originalPrice: 199.99,
                    image: '/placeholder.svg',
                    rating: 4.5,
                    reviews: 128,
                    seller: 'Premium Store',
                    discount: 25,
                },
                {
                    id: 'prod_2',
                    name: `${query} - Best Seller`,
                    price: 89.99,
                    originalPrice: 129.99,
                    image: '/placeholder.svg',
                    rating: 4.3,
                    reviews: 89,
                    seller: 'Quality Goods',
                    discount: 30,
                },
                {
                    id: 'prod_3',
                    name: `${query} - Affordable Option`,
                    price: 49.99,
                    image: '/placeholder.svg',
                    rating: 4.0,
                    reviews: 45,
                    seller: 'Budget Store',
                },
            ];

            setProducts(mockResults);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    // Apply sorting
    useEffect(() => {
        let sorted = [...products];

        switch (sortBy) {
            case 'price-low':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                sorted.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                // In production, sort by createdAt
                break;
            case 'popularity':
            default:
                sorted.sort((a, b) => b.reviews - a.reviews);
        }

        setFilteredProducts(sorted);
    }, [products, sortBy]);

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-8">
                {/* Search Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        Search Results
                    </h1>
                    {query && (
                        <p className="text-muted-foreground">
                            Showing results for <span className="font-semibold text-foreground">"{query}"</span>
                        </p>
                    )}
                </div>

                {!query ? (
                    <div className="bg-white rounded-lg border border-border p-12 text-center">
                        <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" aria-hidden="true" />
                        <h2 className="text-xl font-semibold text-foreground mb-2">
                            Enter a search term
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            Use the search bar above to find products, brands, and categories
                        </p>
                        <Link href="/">
                            <Button className="bg-primary hover:bg-primary-dark text-white font-semibold">
                                Back to Home
                            </Button>
                        </Link>
                    </div>
                ) : loading ? (
                    <ProductGridSkeleton count={8} />
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-4">
                        <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                            <h3 className="font-semibold text-red-900">Search Error</h3>
                            <p className="text-red-700 text-sm mt-1">{error}</p>
                        </div>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="bg-white rounded-lg border border-border p-12 text-center">
                        <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" aria-hidden="true" />
                        <h2 className="text-xl font-semibold text-foreground mb-2">
                            No products found
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            We couldn't find any products matching "{query}". Try different keywords or browse our categories.
                        </p>
                        <div className="flex gap-3 justify-center">
                            <Link href="/">
                                <Button variant="outline" className="border-border hover:bg-muted">
                                    Browse All Products
                                </Button>
                            </Link>
                            <Link href="/category/fashion">
                                <Button className="bg-primary hover:bg-primary-dark text-white font-semibold">
                                    Browse Categories
                                </Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
                        {/* Sidebar Filters */}
                        <CategorySidebar />

                        {/* Results */}
                        <div>
                            {/* Sort Bar */}
                            <div className="bg-white rounded-lg border border-border p-4 mb-6 flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    Found <span className="font-semibold text-foreground">{filteredProducts.length}</span> products
                                </p>
                                <div className="flex items-center gap-2">
                                    <label htmlFor="sort-select" className="text-sm text-muted-foreground">
                                        Sort by:
                                    </label>
                                    <Select value={sortBy} onValueChange={setSortBy}>
                                        <SelectTrigger id="sort-select" className="w-40 border-border">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="popularity">Popularity</SelectItem>
                                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                                            <SelectItem value="rating">Highest Rated</SelectItem>
                                            <SelectItem value="newest">Newest</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Products Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredProducts.map((product) => (
                                    <Link key={product.id} href={`/product/${product.id}`}>
                                        <div className="bg-white rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                                            {/* Product Image */}
                                            <div className="relative bg-muted aspect-square overflow-hidden">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                                                />
                                                {product.discount && (
                                                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                                                        -{product.discount}%
                                                    </div>
                                                )}
                                            </div>

                                            {/* Product Info */}
                                            <div className="p-4 flex-1 flex flex-col">
                                                <h3 className="font-semibold text-foreground line-clamp-2 mb-2 text-sm">
                                                    {product.name}
                                                </h3>

                                                {/* Rating */}
                                                <div className="flex items-center gap-1 mb-3">
                                                    <div className="flex">
                                                        {[...Array(5)].map((_, i) => (
                                                            <svg
                                                                key={i}
                                                                className={`w-3 h-3 ${i < Math.floor(product.rating)
                                                                        ? 'text-primary fill-primary'
                                                                        : 'text-muted-foreground'
                                                                    }`}
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                aria-hidden="true"
                                                            >
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                    <span className="text-xs text-muted-foreground ml-1">
                                                        ({product.reviews})
                                                    </span>
                                                </div>

                                                {/* Price */}
                                                <div className="mb-3">
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-lg font-bold text-primary">
                                                            GH₵ {product.price.toFixed(2)}
                                                        </span>
                                                        {product.originalPrice && (
                                                            <span className="text-sm text-muted-foreground line-through">
                                                                GH₵ {product.originalPrice.toFixed(2)}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Seller */}
                                                <p className="text-xs text-muted-foreground mb-3">
                                                    by <span className="font-medium text-foreground">{product.seller}</span>
                                                </p>

                                                {/* Add to Cart Button */}
                                                <Button
                                                    className="w-full bg-primary hover:bg-primary-dark text-white font-semibold mt-auto"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        // Add to cart logic here
                                                    }}
                                                    aria-label={`Add ${product.name} to cart`}
                                                >
                                                    Add to Cart
                                                </Button>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
