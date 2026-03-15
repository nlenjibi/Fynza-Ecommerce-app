import { useState, useCallback, useMemo } from 'react'
import { ProductFilters, AppliedFilter } from '@/types/filters'

export function useProductFilters(initialFilters?: ProductFilters) {
    const [filters, setFilters] = useState<ProductFilters>(initialFilters || {})
    const [isLoading, setIsLoading] = useState(false)

    // Update single filter
    const updateFilter = useCallback((key: keyof ProductFilters, value: any) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
            page: 1, // Reset to first page when filters change
        }))
    }, [])

    // Update multiple filters at once
    const updateFilters = useCallback((newFilters: Partial<ProductFilters>) => {
        setFilters((prev) => ({
            ...prev,
            ...newFilters,
            page: 1,
        }))
    }, [])

    // Add value to array filter
    const addFilterValue = useCallback((key: keyof ProductFilters, value: any) => {
        setFilters((prev) => {
            const current = prev[key] as any[]
            return {
                ...prev,
                [key]: current ? [...current, value] : [value],
                page: 1,
            }
        })
    }, [])

    // Remove value from array filter
    const removeFilterValue = useCallback((key: keyof ProductFilters, value: any) => {
        setFilters((prev) => {
            const current = prev[key] as any[]
            return {
                ...prev,
                [key]: current?.filter((v) => v !== value),
                page: 1,
            }
        })
    }, [])

    // Toggle boolean filter
    const toggleFilter = useCallback((key: keyof ProductFilters) => {
        setFilters((prev) => ({
            ...prev,
            [key]: !prev[key],
            page: 1,
        }))
    }, [])

    // Set price range
    const setPriceRange = useCallback((minPrice?: number, maxPrice?: number) => {
        setFilters((prev) => ({
            ...prev,
            minPrice,
            maxPrice,
            page: 1,
        }))
    }, [])

    // Set effective price range (considers discount)
    const setEffectivePriceRange = useCallback((minPrice?: number, maxPrice?: number) => {
        setFilters((prev) => ({
            ...prev,
            minEffectivePrice: minPrice,
            maxEffectivePrice: maxPrice,
            page: 1,
        }))
    }, [])

    // Set rating range
    const setRatingRange = useCallback((minRating?: number, maxRating?: number) => {
        setFilters((prev) => ({
            ...prev,
            minRating,
            maxRating,
            page: 1,
        }))
    }, [])

    // Set discount range
    const setDiscountRange = useCallback((minDiscount?: number, maxDiscount?: number) => {
        setFilters((prev) => ({
            ...prev,
            minDiscountPercent: minDiscount,
            maxDiscountPercent: maxDiscount,
            page: 1,
        }))
    }, [])

    // Set stock range
    const setStockRange = useCallback((minStock?: number, maxStock?: number) => {
        setFilters((prev) => ({
            ...prev,
            minStock,
            maxStock,
            page: 1,
        }))
    }, [])

    // Set date range
    const setDateRange = useCallback((createdAfter?: string, createdBefore?: string) => {
        setFilters((prev) => ({
            ...prev,
            createdAfter,
            createdBefore,
            page: 1,
        }))
    }, [])

    // Set views range
    const setViewsRange = useCallback((minViews?: number, maxViews?: number) => {
        setFilters((prev) => ({
            ...prev,
            minViews,
            maxViews,
            page: 1,
        }))
    }, [])

    // Clear all filters
    const clearFilters = useCallback(() => {
        setFilters({
            page: 1,
            limit: 20,
            includeCategory: true,
        })
    }, [])

    // Clear specific filter group
    const clearFilterGroup = useCallback((key: keyof ProductFilters) => {
        setFilters((prev) => {
            const newFilters = { ...prev }
            delete newFilters[key]
            return { ...newFilters, page: 1 }
        })
    }, [])

    // Get applied filters for display
    const appliedFilters = useMemo<AppliedFilter[]>(() => {
        const applied: AppliedFilter[] = []

        if (filters.keyword) {
            applied.push({
                groupId: 'keyword',
                label: 'Search',
                value: filters.keyword,
            })
        }

        if (filters.categoryIds?.length) {
            applied.push({
                groupId: 'category',
                label: 'Categories',
                value: filters.categoryIds,
            })
        }

        if (filters.minPrice || filters.maxPrice) {
            applied.push({
                groupId: 'price',
                label: 'Price',
                value: `${filters.minPrice || 0} - ${filters.maxPrice || '∞'}`,
            })
        }

        if (filters.minRating) {
            applied.push({
                groupId: 'rating',
                label: 'Rating',
                value: `${filters.minRating}★+`,
            })
        }

        if (filters.hasDiscount) {
            applied.push({
                groupId: 'discount',
                label: 'Discounted',
                value: 'Yes',
            })
        }

        if (filters.inStockOnly) {
            applied.push({
                groupId: 'stock',
                label: 'Stock',
                value: 'In Stock',
            })
        }

        if (filters.featured) {
            applied.push({
                groupId: 'featured',
                label: 'Featured',
                value: 'Yes',
            })
        }

        if (filters.isBestseller) {
            applied.push({
                groupId: 'bestseller',
                label: 'Bestseller',
                value: 'Yes',
            })
        }

        if (filters.isNew) {
            applied.push({
                groupId: 'new',
                label: 'New',
                value: 'Yes',
            })
        }

        if (filters.tags?.length) {
            applied.push({
                groupId: 'tags',
                label: 'Tags',
                value: filters.tags,
            })
        }

        return applied
    }, [filters])

    // Check if any filters are applied
    const hasActiveFilters = useMemo(() => {
        return appliedFilters.length > 0
    }, [appliedFilters])

    // Get filter count
    const filterCount = useMemo(() => {
        return appliedFilters.length
    }, [appliedFilters])

    return {
        filters,
        isLoading,
        setIsLoading,
        updateFilter,
        updateFilters,
        addFilterValue,
        removeFilterValue,
        toggleFilter,
        setPriceRange,
        setEffectivePriceRange,
        setRatingRange,
        setDiscountRange,
        setStockRange,
        setDateRange,
        setViewsRange,
        clearFilters,
        clearFilterGroup,
        appliedFilters,
        hasActiveFilters,
        filterCount,
    }
}
