'use client'

import { useEffect, useState } from 'react'
import { useSearch } from '@/hooks/use-search'
import { Skeleton } from '@/components/ui/skeleton'
import { TrendingUp } from 'lucide-react'
import Link from 'next/link'

interface SearchSuggestionsProps {
    query: string
    onSelectSuggestion?: (suggestion: string) => void
    isOpen: boolean
}

export function SearchSuggestions({
    query,
    onSelectSuggestion,
    isOpen,
}: SearchSuggestionsProps) {
    const { suggestions, trendingSearches, loading, getSuggestions, getTrendingSearches } = useSearch()
    const [showTrending, setShowTrending] = useState(false)

    useEffect(() => {
        if (!isOpen) return

        if (query.trim()) {
            getSuggestions(query, 8)
            setShowTrending(false)
        } else {
            getTrendingSearches(8)
            setShowTrending(true)
        }
    }, [query, isOpen, getSuggestions, getTrendingSearches])

    if (!isOpen) return null

    const displayItems = showTrending ? trendingSearches : suggestions
    const isEmpty = displayItems.length === 0 && !loading

    return (
        <div
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
            role="listbox"
            aria-label="Search suggestions"
        >
            {loading ? (
                <div className="p-4 space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center gap-2">
                            <Skeleton className="h-4 w-4" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                    ))}
                </div>
            ) : isEmpty ? (
                <div className="p-4 text-center text-muted-foreground text-sm">
                    {query.trim() ? 'No suggestions found' : 'No trending searches'}
                </div>
            ) : (
                <ul className="divide-y divide-border">
                    {displayItems.map((item, index) => (
                        <li key={`${item}-${index}`}>
                            <button
                                onClick={() => onSelectSuggestion?.(item)}
                                className="w-full text-left px-4 py-3 hover:bg-muted transition-colors flex items-center gap-2 text-sm"
                                role="option"
                                aria-selected={false}
                            >
                                {showTrending ? (
                                    <TrendingUp className="h-4 w-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
                                ) : (
                                    <svg
                                        className="h-4 w-4 text-muted-foreground flex-shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                )}
                                <span className="text-foreground">{item}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
