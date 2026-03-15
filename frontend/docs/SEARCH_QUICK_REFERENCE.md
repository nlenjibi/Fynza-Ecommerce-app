# Search Implementation - Quick Reference

## 🚀 Quick Start

### Using the Search Hook
```typescript
import { useSearch } from '@/hooks/use-search'

export function MyComponent() {
  const { search, results, loading, error } = useSearch()

  const handleSearch = async () => {
    await search('sneakers', {
      minPrice: 50,
      maxPrice: 200,
      sortBy: 'price-low'
    })
  }

  return (
    <div>
      <button onClick={handleSearch}>Search</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {results.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  )
}
```

---

## 📁 File Structure

```
components/
├── header.tsx                    ← Search bar
└── search-suggestions.tsx        ← Suggestions dropdown

app/
└── search/
    └── page.tsx                  ← Search results page

lib/
└── services/
    └── search.ts                 ← Search API service

hooks/
└── use-search.ts                 ← Search hook

docs/
├── SEARCH_IMPLEMENTATION.md      ← Full documentation
├── SEARCH_SUMMARY.md             ← Implementation summary
└── SEARCH_QUICK_REFERENCE.md     ← This file
```

---

## 🔍 Search Features

### 1. Header Search Bar
- Real-time search input
- Autocomplete suggestions
- Trending searches
- Form submission
- Navigation to results

### 2. Search Results Page
- Product grid display
- Sorting (5 options)
- Filtering (sidebar)
- Pagination
- Empty/error states

### 3. Search Suggestions
- Autocomplete dropdown
- Trending searches
- Click to select
- Keyboard navigation

---

## 🎨 Color Scheme

| Element | Color | Class |
|---------|-------|-------|
| Primary Button | Orange | `bg-primary` |
| Button Hover | Dark Orange | `hover:bg-primary-dark` |
| Background | Light | `bg-background` |
| Text | Dark | `text-foreground` |
| Muted Text | Gray | `text-muted-foreground` |
| Border | Light Gray | `border-border` |
| Discount Badge | Red | `bg-red-500` |

---

## 🔗 API Endpoints

```
GET /search                    Main search
GET /search/suggestions        Autocomplete
GET /search/trending          Trending searches
GET /search/popular           Popular products
```

### Query Parameters
```
q              Search query (required)
categoryId     Category filter
minPrice       Min price
maxPrice       Max price
minRating      Min rating
inStock        Stock filter
sortBy         Sort option
page           Page number
limit          Results per page
```

---

## 🎯 Common Tasks

### Search Products
```typescript
const { search } = useSearch()
await search('shoes')
```

### Search with Filters
```typescript
await search('shoes', {
  minPrice: 50,
  maxPrice: 200,
  sortBy: 'price-low'
})
```

### Get Suggestions
```typescript
const { getSuggestions } = useSearch()
const suggestions = await getSuggestions('sne', 10)
```

### Get Trending
```typescript
const { getTrendingSearches } = useSearch()
const trending = await getTrendingSearches(8)
```

### Get Popular
```typescript
const { getPopularProducts } = useSearch()
const popular = await getPopularProducts(20, 'fashion')
```

---

## ♿ Accessibility

### ARIA Attributes
- `aria-label`: Describes input purpose
- `aria-autocomplete="list"`: Indicates autocomplete
- `aria-controls`: Links input to suggestions
- `role="listbox"`: Suggestions container
- `role="option"`: Individual suggestions

### Keyboard Support
- **Tab**: Navigate elements
- **Enter**: Submit/select
- **Escape**: Close suggestions
- **Arrow Keys**: Navigate suggestions (when implemented)

### Screen Reader
- All inputs have labels
- Loading states announced
- Error messages described
- Semantic HTML used

---

## 📱 Responsive Design

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile | < 640px | Single column |
| Tablet | 640-1024px | Two columns |
| Desktop | > 1024px | Three columns |

---

## 🧪 Testing

### Test Search
```typescript
// Type in search bar
userEvent.type(searchInput, 'sneakers')

// Submit search
userEvent.click(searchButton)

// Verify navigation
expect(router.push).toHaveBeenCalledWith('/search?q=sneakers')
```

### Test Suggestions
```typescript
// Type to show suggestions
userEvent.type(searchInput, 'sne')

// Verify suggestions appear
expect(suggestionsDropdown).toBeVisible()

// Click suggestion
userEvent.click(suggestion)

// Verify navigation
expect(router.push).toHaveBeenCalled()
```

---

## 🐛 Troubleshooting

### Search not working
- Check API endpoint is correct
- Verify query parameter is passed
- Check network tab for errors
- Verify search service is imported

### Suggestions not showing
- Check `showSuggestions` state
- Verify `SearchSuggestions` component is rendered
- Check API response
- Verify `onSelectSuggestion` callback

### Styling issues
- Check color classes are applied
- Verify Tailwind CSS is configured
- Check responsive breakpoints
- Verify dark mode compatibility

### Accessibility issues
- Check ARIA labels are present
- Verify keyboard navigation works
- Test with screen reader
- Check color contrast

---

## 📊 Performance Tips

1. **Debounce Suggestions**: Add debouncing to API calls
2. **Cache Results**: Cache trending and popular products
3. **Lazy Load Images**: Load product images on demand
4. **Code Split**: Split search page code
5. **Pagination**: Paginate large result sets

---

## 🔐 Security

- Sanitize search queries
- Validate API responses
- Use HTTPS for API calls
- Implement rate limiting
- Validate user input

---

## 📚 Documentation

- **Full Guide**: `docs/SEARCH_IMPLEMENTATION.md`
- **Summary**: `docs/SEARCH_SUMMARY.md`
- **Checklist**: `SEARCH_IMPLEMENTATION_CHECKLIST.md`
- **Filters**: `docs/filter.md`
- **Data Types**: `docs/data.md`

---

## 🚀 Deployment

1. Verify all tests pass
2. Check accessibility compliance
3. Test on multiple browsers
4. Test on mobile devices
5. Verify API endpoints
6. Monitor error logs
7. Track performance metrics

---

## 📞 Support

For issues or questions:
1. Check documentation files
2. Review code comments
3. Check error messages
4. Review browser console
5. Check network tab

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-03-14 | Initial implementation |

---

## ✅ Checklist for Using Search

- [ ] Import `useSearch` hook
- [ ] Call `search()` method
- [ ] Handle loading state
- [ ] Handle error state
- [ ] Display results
- [ ] Add sorting/filtering
- [ ] Test accessibility
- [ ] Test on mobile
- [ ] Verify color scheme
- [ ] Deploy to production

---

**Last Updated:** March 14, 2026
**Status:** Production Ready ✅
