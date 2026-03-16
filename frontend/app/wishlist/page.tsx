'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Heart, Trash2, ShoppingCart, Search, SlidersHorizontal, X } from 'lucide-react';
import Link from 'next/link';
import { useWishlist } from '@/components/wishlist-context';
import { useCart, type CartItem } from '@/components/cart-context';
import { useToast } from '@/components/ui/use-toast';
import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

type SortOption = 'newest' | 'price-low' | 'price-high' | 'rating' | 'name-asc' | 'name-desc';
const ITEMS_PER_PAGE = 9;

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { addItem: addToCart } = useCart();
  const { toast } = useToast();

  // Filter and search state
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Parse price from string (e.g., "GHC 166.66" -> 166.66)
  const parsePrice = (priceStr: string): number => {
    const match = priceStr.replace(/GHC|GH₵/i, '').trim();
    return parseFloat(match) || 0;
  };

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let result = [...items];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(item =>
        item.name.toLowerCase().includes(query)
      );
    }

    // Price range filter
    if (priceRange !== 'all') {
      const ranges: Record<string, [number, number]> = {
        '0-50': [0, 50],
        '50-100': [50, 100],
        '100-200': [100, 200],
        '200-500': [200, 500],
        '500+': [500, Infinity],
      };
      const [min, max] = ranges[priceRange] || [0, Infinity];
      result = result.filter(item => {
        const price = parsePrice(item.price);
        return price >= min && price <= max;
      });
    }

    // Rating filter
    if (minRating > 0) {
      result = result.filter(item => item.rating >= minRating);
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        break;
      case 'price-high':
        result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'newest':
      default:
        // Keep original order (by id descending for "newest")
        result.sort((a, b) => b.id - a.id);
        break;
    }

    return result;
  }, [items, searchQuery, sortBy, priceRange, minRating]);

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count++;
    if (priceRange !== 'all') count++;
    if (minRating > 0) count++;
    return count;
  }, [searchQuery, priceRange, minRating]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy, priceRange, minRating]);

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setPriceRange('all');
    setMinRating(0);
  };

  const handleAddToCart = (item: typeof items[0]) => {
    const cartItem: CartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      oldPrice: item.oldPrice,
      image: item.image,
      quantity: 1,
    }
    addToCart(cartItem)
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
      duration: 3000,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>

          {items.length > 0 && (
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold">{filteredItems.length}</span> of <span className="font-semibold">{items.length}</span> items
            </div>
          )}
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Heart size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">Your wishlist is empty</p>
            <Link href="/">
              <Button className="bg-orange-500 hover:bg-orange-600">Add Items to Wishlist</Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Search and Filter Bar */}
            <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search wishlist..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-10"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                  <SelectTrigger className="w-full lg:w-[200px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="name-asc">Name: A to Z</SelectItem>
                    <SelectItem value="name-desc">Name: Z to A</SelectItem>
                  </SelectContent>
                </Select>

                {/* Toggle Filters Button */}
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:w-auto"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-2 bg-orange-100 text-orange-600">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </div>

              {/* Expandable Filters Panel */}
              {showFilters && (
                <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Price Range Filter */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Price Range</label>
                    <Select value={priceRange} onValueChange={setPriceRange}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Prices" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Prices</SelectItem>
                        <SelectItem value="0-50">Under GHC 50</SelectItem>
                        <SelectItem value="50-100">GHC 50 - GHC 100</SelectItem>
                        <SelectItem value="100-200">GHC 100 - GHC 200</SelectItem>
                        <SelectItem value="200-500">GHC 200 - GHC 500</SelectItem>
                        <SelectItem value="500+">GHC 500+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Minimum Rating</label>
                    <Select value={minRating.toString()} onValueChange={(value) => setMinRating(parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Ratings" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">All Ratings</SelectItem>
                        <SelectItem value="4">4+ Stars</SelectItem>
                        <SelectItem value="3">3+ Stars</SelectItem>
                        <SelectItem value="2">2+ Stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Clear Filters */}
                  <div className="flex items-end">
                    {activeFiltersCount > 0 && (
                      <Button
                        variant="ghost"
                        onClick={clearFilters}
                        className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Clear All Filters
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Active Filter Tags */}
            {(searchQuery || priceRange !== 'all' || minRating > 0) && filteredItems.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {searchQuery && (
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700 px-3 py-1">
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="ml-2 hover:text-red-500">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {priceRange !== 'all' && (
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700 px-3 py-1">
                    Price: {priceRange.replace('-', ' - ').replace('+', '+')}
                    <button onClick={() => setPriceRange('all')} className="ml-2 hover:text-red-500">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {minRating > 0 && (
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700 px-3 py-1">
                    {minRating}+ Stars
                    <button onClick={() => setMinRating(0)} className="ml-2 hover:text-red-500">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}

            {/* No Results Message */}
            {filteredItems.length === 0 && (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <Search size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">No items match your search</p>
                <p className="text-sm text-gray-500 mb-4">Try adjusting your filters or search terms</p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Product Grid */}
            {filteredItems.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedItems.map(item => (
                    <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
                      <div className="relative">
                        <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
                        <button
                          onClick={() => removeItem(item.id)}
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
                          <span className="text-2xl font-bold text-orange-500">GH₵ {parsePrice(item.price).toFixed(2)}</span>
                          <span className="text-sm text-gray-500 line-through ml-2">GH₵ {parsePrice(item.oldPrice).toFixed(2)}</span>
                        </div>
                        <Button
                          onClick={() => handleAddToCart(item)}
                          className="w-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center gap-2"
                        >
                          <ShoppingCart size={18} />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => handlePageChange(currentPage - 1)}
                            className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => handlePageChange(page)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => handlePageChange(currentPage + 1)}
                            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                    <p className="text-center text-sm text-gray-500 mt-2">
                      Page {currentPage} of {totalPages} ({filteredItems.length} items)
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
