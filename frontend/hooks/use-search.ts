import { useState, useCallback } from 'react'
import { searchService, type SearchFilters, type SearchResult, type SearchResponse } from '@/lib/services/search'

export function useSearch() {
    const [results, setResults] = useState<SearchResult[]>([])
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [trendingSearches, setTrendingSearches] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [total, setTotal] = useState(0)
    const [hasMore, setHasMore] = useState(false)

    const search = useCallback(async (query: string, filters?: SearchFilters) => {
        if (!query.trim()) {
            setResults([])
            setError(null)
            return
        }

        setLoading(true)
        setError(null)
        try {
            const response: SearchResponse = await searchService.search(query, filters)
            setResults(response.results)
            setTotal(response.total)
            setHasMore(response.hasMore)
            return response
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Failed to search products'
            setError(errorMsg)
            setResults([])
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const getSuggestions = useCallback(async (query: string, limit?: number) => {
        if (!query.trim()) {
            setSuggestions([])
            return []
        }

        try {
            const data = await searchService.getSuggestions(query, limit)
            setSuggestions(data)
            return data
        } catch (err) {
            console.error('Failed to fetch suggestions:', err)
            setSuggestions([])
            return []
        }
    }, [])

    const getTrendingSearches = useCallback(async (limit?: number) => {
        setLoading(true)
        try {
            const data = await searchService.getTrendingSearches(limit)
            setTrendingSearches(data)
            return data
        } catch (err) {
            console.error('Failed to fetch trending searches:', err)
            setTrendingSearches([])
            return []
        } finally {
            setLoading(false)
        }
    }, [])

    const getPopularProducts = useCallback(async (limit?: number, categoryId?: string) => {
        setLoading(true)
        setError(null)
        try {
            const data = await searchService.getPopularProducts(limit, categoryId)
            setResults(data)
            return data
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Failed to fetch popular products'
            setError(errorMsg)
            setResults([])
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const clearResults = useCallback(() => {
        setResults([])
        setError(null)
        setSuggestions([])
    }, [])

    return {
        results,
        suggestions,
        trendingSearches,
        loading,
        error,
        total,
        hasMore,
        search,
        getSuggestions,
        getTrendingSearches,
        getPopularProducts,
        clearResults,
    }
}
