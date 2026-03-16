# Backend API Specification - Search & Filters

## Complete API Reference for Search with Filters

---

## 1. Main Search Endpoint

### Endpoint
```
GET /api/v1/search
```

### Description
Comprehensive search across products, brands, and categories with advanced filtering and sorting.

### Request Headers
```
Content-Type: application/json
Authorization: Bearer {token} (optional)
```

### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| q | string | Yes | - | Search query (min: 1, max: 500 chars) |
| categoryId | string | No | - | Filter by category ID |
| brandId | string | No | - | Filter by brand ID |
| minPrice | number | No | - | Minimum price (must be >= 0) |
| maxPrice | number | No | - | Maximum price (must be > minPrice) |
| minRating | number | No | - | Minimum rating (1-5) |
| maxRating | number | No | - | Maximum rating (1-5) |
| inStock | boolean | No | - | Filter by stock availability |
| expressDelivery | boolean | No | - | Filter by express delivery |
| discountMin | number | No | - | Minimum discount % (0-100) |
| discountMax | number | No | - | Maximum discount % (0-100) |
| sortBy | string | No | popularity | Sort option: popularity, price-low, price-high, rating, newest |
| page | number | No | 1 | Page number (min: 1) |
| limit | number | No | 20 | Results per page (1-100) |

### Example Request
```
GET /api/v1/search?q=sneakers&categoryId=fashion&minPrice=50&maxPrice=200&sortBy=price-low&page=1&limit=20
```

### Success Response (200 OK)
```json
{
  "success": true,
  "data": {
    "results": [
      {
        "id": "prod_123",
        "name": "Nike Air Max Sneakers",
        "description": "Premium quality sneakers",
        "price": 149.99,
        "originalPrice": 199.99,
        "discountPercentage": 25,
        "image": "https://cdn.example.com/image.jpg",
        "images": ["url1", "url2", "url3"],
        "rating": 4.5,
        "totalReviews": 128,
        "inStock": true,
        "quantityInStock": 45,
        "seller": {
          "id": "seller_456",
          "name": "Premium Store",
          "rating": 4.7,
          "verificationStatus": "VERIFIED"
        },
        "category": {
          "id": "cat_1",
          "name": "Fashion",
          "slug": "fashion"
        },
        "brand": {
          "id": "brand_1",
          "name": "Nike",
          "logo": "https://cdn.example.com/nike-logo.png"
        },
        "expressDelivery": true,
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-03-14T10:30:00Z"
      }
    ],
    "pagination": {
      "total": 245,
      "page": 1,
      "limit": 20,
      "totalPages": 13,
      "hasMore": true
    },
    "filters": {
      "availableCategories": [
        {
          "id": "cat_1",
          "name": "Fashion",
          "count": 120
        },
        {
          "id": "cat_2",
          "name": "Electronics",
          "count": 85
        }
      ],
      "availableBrands": [
        {
          "id": "brand_1",
          "name": "Nike",
          "count": 45
        },
        {
          "id": "brand_2",
          "name": "Adidas",
          "count": 38
        }
      ],
      "priceRange": {
        "min": 10,
        "max": 5000
      },
      "ratingRange": {
        "min": 1,
        "max": 5
      }
    }
  },
  "timestamp": "2024-03-14T10:30:00Z"
}
```

### Error Responses

#### 400 Bad Request
```json
{
  "success": false,
  "error": {
    "code": "INVALID_QUERY",
    "message": "Search query is required",
    "details": "The 'q' parameter must be provided and non-empty"
  },
  "timestamp": "2024-03-14T10:30:00Z"
}
```

#### 422 Unprocessable Entity
```json
{
  "success": false,
  "error": {
    "code": "INVALID_FILTERS",
    "message": "Invalid filter parameters",
    "details": {
      "minPrice": "Must be a positive number",
      "maxPrice": "Must be greater than minPrice",
      "limit": "Must be between 1 and 100"
    }
  },
  "timestamp": "2024-03-14T10:30:00Z"
}
```

#### 500 Internal Server Error
```json
{
  "success": false,
  "error": {
    "code": "SEARCH_ERROR",
    "message": "An error occurred while processing your search",
    "requestId": "req_123456"
  },
  "timestamp": "2024-03-14T10:30:00Z"
}
```

---

## 2. Search Suggestions Endpoint

### Endpoint
```
GET /api/v1/search/suggestions
```

### Description
Get autocomplete suggestions for search queries.

### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| q | string | Yes | - | Partial search query (min: 2 chars) |
| limit | number | No | 10 | Number of suggestions (1-50) |
| type | string | No | all | Suggestion type: products, brands, categories, all |

### Example Request
```
GET /api/v1/search/suggestions?q=sne&limit=10&type=all
```

### Success Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "text": "sneakers",
      "type": "product",
      "count": 245,
      "icon": "👟"
    },
    {
      "text": "Nike",
      "type": "brand",
      "count": 89,
      "icon": "🏷️"
    },
    {
      "text": "Fashion",
      "type": "category",
      "count": 1200,
      "icon": "👕"
    }
  ],
  "timestamp": "2024-03-14T10:30:00Z"
}
```

---

## 3. Trending Searches Endpoint

### Endpoint
```
GET /api/v1/search/trending
```

### Description
Get trending search queries.

### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| limit | number | No | 10 | Number of trending searches (1-50) |
| timeRange | string | No | 7d | Time range: 24h, 7d, 30d |

### Example Request
```
GET /api/v1/search/trending?limit=10&timeRange=7d
```

### Success Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "query": "sneakers",
      "searchCount": 5420,
      "trend": "up",
      "percentageChange": 15.5
    },
    {
      "query": "dresses",
      "searchCount": 4890,
      "trend": "stable",
      "percentageChange": 0
    },
    {
      "query": "electronics",
      "searchCount": 3210,
      "trend": "down",
      "percentageChange": -8.2
    }
  ],
  "timestamp": "2024-03-14T10:30:00Z"
}
```

---

## 4. Popular Products Endpoint

### Endpoint
```
GET /api/v1/search/popular
```

### Description
Get popular products with optional category filter.

### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| limit | number | No | 20 | Number of products (1-100) |
| categoryId | string | No | - | Filter by category ID |
| timeRange | string | No | 7d | Time range: 24h, 7d, 30d |

### Example Request
```
GET /api/v1/search/popular?limit=20&categoryId=fashion&timeRange=7d
```

### Success Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "id": "prod_123",
      "name": "Popular Product",
      "price": 149.99,
      "rating": 4.8,
      "views": 5420,
      "sales": 234,
      "image": "https://cdn.example.com/image.jpg"
    }
  ],
  "timestamp": "2024-03-14T10:30:00Z"
}
```

---

## 5. Filter Options Endpoint

### Endpoint
```
GET /api/v1/search/filters
```

### Description
Get available filter options for search.

### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| categoryId | string | No | - | Filter by category |

### Example Request
```
GET /api/v1/search/filters?categoryId=fashion
```

### Success Response (200 OK)
```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "id": "cat_1",
        "name": "Fashion",
        "count": 1200,
        "subcategories": [
          {
            "id": "subcat_1",
            "name": "Men",
            "count": 600
          }
        ]
      }
    ],
    "brands": [
      {
        "id": "brand_1",
        "name": "Nike",
        "count": 450,
        "logo": "https://cdn.example.com/nike-logo.png"
      }
    ],
    "priceRange": {
      "min": 10,
      "max": 5000,
      "currency": "GHC"
    },
    "ratingRange": {
      "min": 1,
      "max": 5
    },
    "sizes": [
      {
        "id": "size_1",
        "name": "XS",
        "count": 120
      }
    ],
    "colors": [
      {
        "id": "color_1",
        "name": "Black",
        "count": 340,
        "hex": "#000000"
      }
    ]
  },
  "timestamp": "2024-03-14T10:30:00Z"
}
```

---

## Request/Response Validation

### Input Validation Rules

```typescript
// Query validation
- q: required, 1-500 characters, no SQL injection
- categoryId: valid UUID format
- brandId: valid UUID format
- minPrice: number >= 0
- maxPrice: number > minPrice
- minRating: number between 1-5
- maxRating: number between 1-5
- inStock: boolean
- expressDelivery: boolean
- discountMin: number 0-100
- discountMax: number 0-100
- sortBy: one of [popularity, price-low, price-high, rating, newest]
- page: number >= 1
- limit: number between 1-100
```

### Output Validation Rules

```typescript
// Response validation
- All timestamps in ISO 8601 format
- All prices as decimal numbers
- All ratings between 0-5
- All percentages between 0-100
- All IDs as valid UUIDs
- All URLs as valid HTTP/HTTPS URLs
- All counts as non-negative integers
```

---

## Rate Limiting

```
- Requests per minute: 60
- Requests per hour: 3600
- Burst limit: 10 requests per second

Headers:
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1234567890
```

---

## Caching Strategy

```
Cache-Control: public, max-age=3600
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
Last-Modified: Wed, 14 Mar 2024 10:30:00 GMT

Cache TTL:
- Search results: 1 hour
- Trending searches: 24 hours
- Popular products: 6 hours
- Available filters: 12 hours
- Suggestions: 30 minutes
```

---

## Performance Metrics

```
Target Response Times:
- Search: < 500ms
- Suggestions: < 200ms
- Trending: < 300ms
- Popular: < 400ms
- Filters: < 300ms

Database Indexes Required:
- products(name)
- products(category_id)
- products(brand_id)
- products(price)
- products(rating)
- products(status)
- products(created_at)
- Full-text search index on name + description
```

---

## Security Considerations

```
1. Input Sanitization
   - Remove SQL injection attempts
   - Validate all parameters
   - Limit query length

2. Authentication
   - Optional for public search
   - Required for personalized results
   - Use JWT tokens

3. Authorization
   - Only return active products
   - Respect seller visibility settings
   - Filter by user permissions

4. Rate Limiting
   - Prevent abuse
   - Implement per-IP limits
   - Use exponential backoff

5. Data Protection
   - Encrypt sensitive data
   - Use HTTPS only
   - Implement CORS properly
```

---

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| INVALID_QUERY | 400 | Search query is missing or invalid |
| INVALID_FILTERS | 422 | Filter parameters are invalid |
| INVALID_PAGINATION | 422 | Page or limit parameters are invalid |
| CATEGORY_NOT_FOUND | 404 | Category ID does not exist |
| BRAND_NOT_FOUND | 404 | Brand ID does not exist |
| SEARCH_ERROR | 500 | Internal server error during search |
| DATABASE_ERROR | 500 | Database connection error |
| TIMEOUT | 504 | Request timeout |

---

## Implementation Checklist

- [ ] Implement main search endpoint
- [ ] Implement suggestions endpoint
- [ ] Implement trending endpoint
- [ ] Implement popular products endpoint
- [ ] Implement filters endpoint
- [ ] Add input validation
- [ ] Add error handling
- [ ] Add database indexes
- [ ] Add caching layer
- [ ] Add rate limiting
- [ ] Add logging
- [ ] Add monitoring
- [ ] Write unit tests
- [ ] Write integration tests
- [ ] Document API
- [ ] Deploy to production
