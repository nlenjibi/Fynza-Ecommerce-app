# Search Implementation Guide

This document details the complete search functionality implementation for the Fynza e-commerce platform.

---

## Overview

The search system includes:
- General search bar in header with autocomplete
- Search results page with filtering and sorting
- Search suggestions and trending searches
- Full accessibility support
- Responsive design with consistent color scheme

---

## Components

### 1. Header Search Bar
**Location:** `components/header.tsx`

**Status:** ✅ **FULLY FUNCTIONAL**

**Features:**
- Real-time search input with state management
- Form submission handling
- Navigation to search results page
- Search suggestions dropdown
- Trending searches display
- Full accessibility (ARIA labels, keyboard navigation)
- Disabled state for empty search
- Responsive design

**Key Implementation:**
```typescript
const [searchQuery, setSearchQuery] = useState("")
const [showSuggestions, setShowSuggestions] = useState(false)
const router = useRouter()

const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  if (searchQuery.trim()) {
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    setSearchQuery("")
    setShowSuggestions(false)
  }
}

const handleSelectSuggestion = (suggestion: string) => {
  setSearchQuery(suggestion)
  router.push(`/search?q=${encodeURIComponent(suggestion)}`)
  setShowSuggestions(false)
}
```

**Accessibility Features:**
- `aria-label`: Describes search input purpose
- `aria-autocomplete="list"`: Indicates autocomplete behavior
- `aria-controls="search-suggestions"`: Links input to suggestions
- `aria-hidden="true"`: Hides decorative search icon from screen readers
- Disabled button state for empty search
- Focus management with blur delay

**Color Scheme:**
- Primary color: `bg-primary` (orange)
- Border: `border-border`
- Text: `text-foreground` / `text-muted-foreground`
- Hover: `hover:bg-primary-dark`
- Disabled: `disabled:opacity-50`

### 2. Search Suggestions Component
**Location:** `components/search-suggestions.tsx`

**Features:**
- Autocomplete suggestions dropdown
- Trending searches display
- Loading state with spinner
- Empty state messaging
- Keyboard navigation support
- Click to select suggestion
- Accessible listbox implementation

**Props:**
```typescript
interface SearchSuggestionsProps {
  query: string;
  onSelectSuggestion?: (suggestion: string) => void;
  isOpen: boolean;
}
```

**Accessibility:**
- `role="listbox"`: Semantic list role
- `role="option"`: Individual suggestion items
- `aria-label`: Describes the suggestions list
- `aria-selected`: Indicates selection state
- Keyboard navigation support

**Color Scheme:**
- Background: `bg-white`
- Border: `border-border`
- Hover: `hover:bg-muted`
- Text: `text-foreground` / `text-muted-foreground`
- Icons: `text-muted-foreground`

### 3. Search Results Page
**Location:** `app/search/page.tsx`

**Features:**
- Search results grid with product cards
- Sorting options (popularity, price, rating, newest)
- Filter sidebar integration
- Empty state handling
- Loading state with spinner
- Error state with helpful message
- Product cards with:
  - Product image with discount badge
  - Product name and rating
  - Price with original price strikethrough
  - Seller information
  - Add to cart button
  - Link to product details

**Query Parameters:**
- `q`: Search query (required)

**Example URL:**
```
/search?q=sneakers
```

**States:**
1. **No Query**: Shows empty state with search instructions
2. **Loading**: Shows spinner while fetching results
3. **Error**: Shows error message with helpful actions
4. **No Results**: Shows empty state with suggestions
5. **Results**: Shows product grid with sorting and filters

**Color Scheme:**
- Background: `bg-background`
- Cards: `bg-white` with `border-border`
- Discount badge: `bg-red-500`
- Rating stars: `text-primary` (filled) / `text-muted-foreground` (empty)
- Price: `text-primary` (current) / `text-muted-foreground` (original)
- Buttons: `bg-primary` with `hover:bg-primary-dark`

---

## Hooks

### useSearch Hook
**Location:** `hooks/use-search.ts`

**Methods:**
```typescript
// Main search with filters
search(query: string, filters?: SearchFilters): Promise<SearchResponse>

// Get autocomplete suggestions
getSuggestions(query: string, limit?: number): Promise<string[]>

// Get trending searches
getTrendingSearches(limit?: number): Promise<string[]>

// Get popular products
getPopularProducts(limit?: number, categoryId?: string): Promise<SearchResult[]>

// Clear all results
clearResults(): void
```

**State:**
```typescript
{
  results: SearchResult[];
  suggestions: string[];
  trendingSearches: string[];
  loading: boolean;
  error: string | null;
  total: number;
  hasMore: boolean;
}
```

**Usage Example:**
```typescript
const { search, results, loading, error } = useSearch()

const handleSearch = async () => {
  await search('sneakers', {
    minPrice: 50,
    maxPrice: 200,
    sortBy: 'price-low'
  })
}
```

---

## Services

### Search Service
**Location:** `lib/services/search.ts`

**API Endpoints:**

#### 1. GET /search
General search across products, brands, and categories.

**Query Parameters:**
```typescript
{
  q: string;                    // Search query (required)
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStock?: boolean;
  sortBy?: 'popularity' | 'price-low' | 'price-high' | 'rating' | 'newest';
  page?: number;                // Default: 1
  limit?: number;               // Default: 20
}
```

**Response:**
```typescript
{
  results: SearchResult[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  suggestions?: string[];
}
```

**Example:**
```typescript
const response = await searchService.search('sneakers', {
  minPrice: 50,
  maxPrice: 200,
  sortBy: 'price-low',
  page: 1,
  limit: 20
})
```

#### 2. GET /search/suggestions
Get autocomplete suggestions for partial query.

**Query Parameters:**
```typescript
{
  q: string;                    // Partial search query (required)
  limit?: number;               // Default: 10
}
```

**Response:** `string[]` - Array of suggestions

**Example:**
```typescript
const suggestions = await searchService.getSuggestions('sne', 8)
// Returns: ['sneakers', 'sneaker shoes', 'sneaker boots', ...]
```

#### 3. GET /search/trending
Get trending search queries.

**Query Parameters:**
```typescript
{
  limit?: number;               // Default: 10
}
```

**Response:** `string[]` - Array of trending searches

**Example:**
```typescript
const trending = await searchService.getTrendingSearches(8)
// Returns: ['shoes', 'dresses', 'electronics', ...]
```

#### 4. GET /search/popular
Get popular products.

**Query Parameters:**
```typescript
{
  limit?: number;               // Default: 20
  categoryId?: string;          // Optional category filter
}
```

**Response:** `SearchResult[]` - Array of popular products

**Example:**
```typescript
const popular = await searchService.getPopularProducts(20, 'fashion')
```

---

## Types

### SearchFilters
```typescript
interface SearchFilters {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStock?: boolean;
  sortBy?: 'popularity' | 'price-low' | 'price-high' | 'rating' | 'newest';
  page?: number;
  limit?: number;
}
```

### SearchResult
```typescript
interface SearchResult {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  image: string;
  images?: string[];
  rating: number;
  totalReviews: number;
  seller: {
    id: string;
    name: string;
    rating: number;
  };
  category?: {
    id: string;
    name: string;
  };
  inStock: boolean;
}
```

### SearchResponse
```typescript
interface SearchResponse {
  results: SearchResult[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  suggestions?: string[];
}
```

---

## Usage Examples

### Example 1: Basic Search
```typescript
import { useSearch } from '@/hooks/use-search'

export function SearchComponent() {
  const { search, results, loading } = useSearch()

  const handleSearch = async () => {
    await search('sneakers')
  }

  return (
    <div>
      <button onClick={handleSearch}>Search</button>
      {loading && <p>Loading...</p>}
      {results.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  )
}
```

### Example 2: Search with Filters
```typescript
const { search, results } = useSearch()

const handleFilteredSearch = async () => {
  await search('shoes', {
    minPrice: 50,
    maxPrice: 200,
    minRating: 4,
    sortBy: 'price-low',
    page: 1,
    limit: 20
  })
}
```

### Example 3: Get Suggestions
```typescript
const { getSuggestions, suggestions } = useSearch()

const handleInputChange = async (query: string) => {
  if (query.length > 2) {
    await getSuggestions(query, 10)
  }
}
```

### Example 4: Get Trending Searches
```typescript
const { getTrendingSearches, trendingSearches } = useSearch()

useEffect(() => {
  getTrendingSearches(8)
}, [getTrendingSearches])
```

---

## Accessibility Features

### Keyboard Navigation
- **Tab**: Navigate through search input and suggestions
- **Enter**: Submit search or select suggestion
- **Escape**: Close suggestions dropdown
- **Arrow Up/Down**: Navigate suggestions (when implemented)

### Screen Reader Support
- Search input has descriptive `aria-label`
- Suggestions list has `role="listbox"`
- Individual suggestions have `role="option"`
- Loading states announced
- Error messages clearly described

### Visual Accessibility
- High contrast colors maintained
- Focus indicators visible
- Disabled states clearly indicated
- Icons paired with text labels
- Sufficient spacing between interactive elements

### Color Contrast
- Primary text on white: WCAG AAA compliant
- Muted text on white: WCAG AA compliant
- Buttons meet WCAG AA standards
- Focus indicators have sufficient contrast

---

## Performance Considerations

1. **Debouncing**: Suggestions API calls should be debounced
2. **Caching**: Cache trending searches and popular products
3. **Pagination**: Implement pagination for large result sets
4. **Lazy Loading**: Load product images lazily
5. **Code Splitting**: Search page can be code-split

---

## Future Enhancements

1. **Advanced Filters**: Add more filter options
2. **Search Analytics**: Track popular searches
3. **Personalization**: Recommend based on user history
4. **Faceted Search**: Category-based filtering
5. **Search Refinement**: "Did you mean?" suggestions
6. **Voice Search**: Add voice input capability
7. **Search History**: Save user search history
8. **Saved Searches**: Allow users to save searches

---

## Testing

### Unit Tests
- Search input state management
- Form submission handling
- Suggestion selection
- Filter application

### Integration Tests
- Search API calls
- Navigation to results page
- Filter and sort functionality
- Pagination

### E2E Tests
- Complete search flow
- Suggestion selection flow
- Filter and sort flow
- Empty state handling

### Accessibility Tests
- Keyboard navigation
- Screen reader compatibility
- Color contrast
- Focus management
