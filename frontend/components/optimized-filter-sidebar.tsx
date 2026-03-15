'use client'

import { useState } from 'react'
import { ChevronDown, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useProductFilters } from '@/hooks/use-product-filters'
import { ProductFilters, InventoryStatus } from '@/types/filters'

interface OptimizedFilterSidebarProps {
    onFiltersChange?: (filters: ProductFilters) => void
    initialFilters?: ProductFilters
}

export function OptimizedFilterSidebar({
    onFiltersChange,
    initialFilters,
}: OptimizedFilterSidebarProps) {
    const {
        filters,
        updateFilter,
        setPriceRange,
        setRatingRange,
        setDiscountRange,
        setStockRange,
        toggleFilter,
        addFilterValue,
        removeFilterValue,
        clearFilters,
        appliedFilters,
        filterCount,
    } = useProductFilters(initialFilters)

    const [expandedSections, setExpandedSections] = useState<Set<string>>(
        new Set(['price', 'rating', 'stock', 'discount'])
    )

    const toggleSection = (section: string) => {
        const newExpanded = new Set(expandedSections)
        if (newExpanded.has(section)) {
            newExpanded.delete(section)
        } else {
            newExpanded.add(section)
        }
        setExpandedSections(newExpanded)
    }

    const handleFilterChange = () => {
        onFiltersChange?.(filters)
    }

    return (
        <aside className="w-full bg-white rounded-lg border border-border">
            {/* Header with Clear Button */}
            <div className="p-4 border-b border-border flex items-center justify-between">
                <h2 className="font-bold text-sm">FILTERS</h2>
                {filterCount > 0 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-xs text-primary hover:text-primary-dark"
                    >
                        Clear All ({filterCount})
                    </Button>
                )}
            </div>

            {/* Applied Filters Display */}
            {appliedFilters.length > 0 && (
                <div className="p-4 border-b border-border space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">ACTIVE FILTERS</p>
                    <div className="flex flex-wrap gap-2">
                        {appliedFilters.map((filter) => (
                            <div
                                key={filter.groupId}
                                className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded text-xs"
                            >
                                <span>{filter.label}:</span>
                                <span className="font-semibold">
                                    {Array.isArray(filter.value) ? filter.value.join(', ') : filter.value}
                                </span>
                                <button
                                    onClick={() => {
                                        // Handle filter removal
                                        handleFilterChange()
                                    }}
                                    className="ml-1 hover:text-primary-dark"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Search/Keyword Filter */}
            <div className="p-4 border-b border-border">
                <h3 className="font-bold text-sm mb-3">SEARCH</h3>
                <Input
                    placeholder="Search products..."
                    value={filters.keyword || ''}
                    onChange={(e) => {
                        updateFilter('keyword', e.target.value || undefined)
                        handleFilterChange()
                    }}
                    className="text-sm"
                />
            </div>

            {/* Price Filter */}
            <FilterSection
                title="PRICE (GH₵)"
                isExpanded={expandedSections.has('price')}
                onToggle={() => toggleSection('price')}
            >
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <Input
                            type="number"
                            placeholder="Min"
                            value={filters.minPrice || ''}
                            onChange={(e) => {
                                const value = e.target.value ? Number(e.target.value) : undefined
                                setPriceRange(value, filters.maxPrice)
                                handleFilterChange()
                            }}
                            className="w-24 text-sm"
                        />
                        <span className="text-sm">-</span>
                        <Input
                            type="number"
                            placeholder="Max"
                            value={filters.maxPrice || ''}
                            onChange={(e) => {
                                const value = e.target.value ? Number(e.target.value) : undefined
                                setPriceRange(filters.minPrice, value)
                                handleFilterChange()
                            }}
                            className="w-24 text-sm"
                        />
                    </div>
                    <Button
                        size="sm"
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={handleFilterChange}
                    >
                        Apply
                    </Button>
                </div>
            </FilterSection>

            {/* Rating Filter */}
            <FilterSection
                title="RATING"
                isExpanded={expandedSections.has('rating')}
                onToggle={() => toggleSection('rating')}
            >
                <div className="space-y-2">
                    {[5, 4, 3, 2].map((rating) => (
                        <div key={rating} className="flex items-center space-x-2">
                            <Checkbox
                                id={`rating-${rating}`}
                                checked={filters.minRating === rating}
                                onCheckedChange={(checked) => {
                                    setRatingRange(checked ? rating : undefined, undefined)
                                    handleFilterChange()
                                }}
                            />
                            <Label htmlFor={`rating-${rating}`} className="text-sm font-normal cursor-pointer flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-3 h-3 ${i < rating ? 'text-primary fill-primary' : 'text-muted-foreground'
                                            }`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                                <span className="ml-1">& up</span>
                            </Label>
                        </div>
                    ))}
                </div>
            </FilterSection>

            {/* Stock Status Filter */}
            <FilterSection
                title="STOCK STATUS"
                isExpanded={expandedSections.has('stock')}
                onToggle={() => toggleSection('stock')}
            >
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="in-stock"
                            checked={filters.inStockOnly || false}
                            onCheckedChange={(checked) => {
                                toggleFilter('inStockOnly')
                                handleFilterChange()
                            }}
                        />
                        <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
                            In Stock
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="low-stock"
                            checked={filters.lowStockOnly || false}
                            onCheckedChange={() => {
                                toggleFilter('lowStockOnly')
                                handleFilterChange()
                            }}
                        />
                        <Label htmlFor="low-stock" className="text-sm font-normal cursor-pointer">
                            Low Stock
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="out-of-stock"
                            checked={filters.outOfStockOnly || false}
                            onCheckedChange={() => {
                                toggleFilter('outOfStockOnly')
                                handleFilterChange()
                            }}
                        />
                        <Label htmlFor="out-of-stock" className="text-sm font-normal cursor-pointer">
                            Out of Stock
                        </Label>
                    </div>
                </div>
            </FilterSection>

            {/* Discount Filter */}
            <FilterSection
                title="DISCOUNT"
                isExpanded={expandedSections.has('discount')}
                onToggle={() => toggleSection('discount')}
            >
                <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="has-discount"
                            checked={filters.hasDiscount || false}
                            onCheckedChange={() => {
                                toggleFilter('hasDiscount')
                                handleFilterChange()
                            }}
                        />
                        <Label htmlFor="has-discount" className="text-sm font-normal cursor-pointer">
                            Discounted Only
                        </Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Input
                            type="number"
                            placeholder="Min %"
                            value={filters.minDiscountPercent || ''}
                            onChange={(e) => {
                                const value = e.target.value ? Number(e.target.value) : undefined
                                setDiscountRange(value, filters.maxDiscountPercent)
                                handleFilterChange()
                            }}
                            className="w-20 text-sm"
                        />
                        <span className="text-sm">-</span>
                        <Input
                            type="number"
                            placeholder="Max %"
                            value={filters.maxDiscountPercent || ''}
                            onChange={(e) => {
                                const value = e.target.value ? Number(e.target.value) : undefined
                                setDiscountRange(filters.minDiscountPercent, value)
                                handleFilterChange()
                            }}
                            className="w-20 text-sm"
                        />
                    </div>
                </div>
            </FilterSection>

            {/* Product Status Filters */}
            <FilterSection title="PRODUCT STATUS" isExpanded={true} onToggle={() => { }}>
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="featured"
                            checked={filters.featured || false}
                            onCheckedChange={() => {
                                toggleFilter('featured')
                                handleFilterChange()
                            }}
                        />
                        <Label htmlFor="featured" className="text-sm font-normal cursor-pointer">
                            Featured
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="bestseller"
                            checked={filters.isBestseller || false}
                            onCheckedChange={() => {
                                toggleFilter('isBestseller')
                                handleFilterChange()
                            }}
                        />
                        <Label htmlFor="bestseller" className="text-sm font-normal cursor-pointer">
                            Bestseller
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="new"
                            checked={filters.isNew || false}
                            onCheckedChange={() => {
                                toggleFilter('isNew')
                                handleFilterChange()
                            }}
                        />
                        <Label htmlFor="new" className="text-sm font-normal cursor-pointer">
                            New
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="popular"
                            checked={filters.popular || false}
                            onCheckedChange={() => {
                                toggleFilter('popular')
                                handleFilterChange()
                            }}
                        />
                        <Label htmlFor="popular" className="text-sm font-normal cursor-pointer">
                            Popular
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="trending"
                            checked={filters.trending || false}
                            onCheckedChange={() => {
                                toggleFilter('trending')
                                handleFilterChange()
                            }}
                        />
                        <Label htmlFor="trending" className="text-sm font-normal cursor-pointer">
                            Trending
                        </Label>
                    </div>
                </div>
            </FilterSection>
        </aside>
    )
}

// Helper component for collapsible filter sections
interface FilterSectionProps {
    title: string
    isExpanded: boolean
    onToggle: () => void
    children: React.ReactNode
}

function FilterSection({ title, isExpanded, onToggle, children }: FilterSectionProps) {
    return (
        <div className="border-b border-border">
            <button
                onClick={onToggle}
                className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
                <h3 className="font-bold text-sm">{title}</h3>
                <ChevronDown
                    className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                />
            </button>
            {isExpanded && <div className="px-4 pb-4 space-y-3">{children}</div>}
        </div>
    )
}
