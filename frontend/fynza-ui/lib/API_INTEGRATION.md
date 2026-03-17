# API Integration Guide - Fynza E-Commerce Platform

This guide explains how to use the GraphQL and REST API integration in your Fynza application.

## Architecture Overview

The API integration is structured in three layers:

1. **API Clients** (`lib/api-client.ts`, `lib/graphql-client.ts`)
   - Low-level HTTP communication
   - Automatic token management
   - Error handling

2. **Services** (`lib/services/`)
   - Business logic for different domains
   - Mix of GraphQL (complex queries) and REST (CRUD operations)
   - Type-safe interfaces

3. **Hooks** (`hooks/`)
   - React hooks for component integration
   - State management and loading/error handling
   - Reusable across components

## API Strategy

### GraphQL (Complex Queries)
Use GraphQL for operations requiring:
- Complex filtering and sorting
- Nested data relationships
- Aggregations and calculations
- Multiple data sources in one request

**Examples:**
- Search products with filters
- Get orders with nested items and shipping info
- Analytics dashboards with aggregated data

### REST API (Simple CRUD)
Use REST for straightforward operations:
- Creating resources (POST)
- Updating resources (PUT/PATCH)
- Deleting resources (DELETE)
- Fetching individual items

**Examples:**
- Add item to cart
- Update product quantity
- Create new order
- Delete cart item

## Configuration

Set environment variables in `.env.local`:

```env
# API Endpoints
NEXT_PUBLIC_API_URL=http://localhost:9190/api/v1
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:9190/graphql
```

## Usage Examples

### Fetching Products

```tsx
import { useProducts } from '@/hooks/use-products'

export function ProductList() {
  const { products, loading, error, fetchProducts } = useProducts()

  useEffect(() => {
    fetchProducts(1, 20)
  }, [fetchProducts])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  )
}
```

### Searching Products (GraphQL)

```tsx
import { useProducts } from '@/hooks/use-products'

export function ProductSearch() {
  const { searchProducts, loading } = useProducts()

  const handleSearch = async (query: string) => {
    try {
      const results = await searchProducts(query, {
        minPrice: 10,
        maxPrice: 500,
        inStock: true,
      })
      console.log('Search results:', results)
    } catch (error) {
      console.error('Search failed:', error)
    }
  }

  return (
    <input 
      placeholder="Search products..." 
      onChange={(e) => handleSearch(e.target.value)}
    />
  )
}
```

### Authentication

```tsx
import { useAuth } from '@/hooks/use-auth'

export function LoginForm() {
  const { login, loading, error } = useAuth()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    try {
      await login({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      })
      // User logged in successfully
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}
```

### Adding to Cart (REST)

```tsx
import { useCart } from '@/hooks/use-cart'

export function AddToCartButton({ productId, quantity, size }) {
  const { addToCart, loading } = useCart()

  const handleAddToCart = async () => {
    try {
      await addToCart({
        productId,
        quantity,
        selectedSize: size,
      })
      // Item added successfully
    } catch (error) {
      console.error('Failed to add to cart:', error)
    }
  }

  return (
    <button onClick={handleAddToCart} disabled={loading}>
      {loading ? 'Adding...' : 'Add to Cart'}
    </button>
  )
}
```

### Fetching Orders (GraphQL)

```tsx
import { useOrders } from '@/hooks/use-orders'

export function OrderHistory() {
  const { orders, loading, error, fetchOrders } = useOrders()

  useEffect(() => {
    fetchOrders('DELIVERED')
  }, [fetchOrders])

  if (loading) return <div>Loading orders...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      {orders.map(order => (
        <div key={order.id}>
          <h3>Order #{order.orderNumber}</h3>
          <p>Total: ${order.total}</p>
          <p>Status: {order.status}</p>
        </div>
      ))}
    </div>
  )
}
```

## Error Handling

All hooks provide error state that you should handle:

```tsx
const { data, error, loading } = useProducts()

if (loading) return <Spinner />
if (error) return <ErrorMessage message={error} />
return <YourComponent data={data} />
```

## Authentication

The API client automatically:
- Stores JWT token in localStorage
- Includes token in all authenticated requests
- Clears token on 401 errors

Use `useAuth()` hook to manage authentication:

```tsx
const { user, isAuthenticated, login, logout } = useAuth()

if (!isAuthenticated) {
  return <LoginForm />
}

return <Dashboard user={user} onLogout={logout} />
```

## Debugging

All API calls log to console with `[v0]` prefix:

```
[v0] REST API Request: GET /products
[v0] GraphQL Request: SearchProducts
[v0] Error fetching products: Network error
```

Check browser console for debugging information.

## Service List

- **authService** - Authentication (login, register, logout)
- **productService** - Products and categories (REST + GraphQL)
- **orderService** - Orders management (REST + GraphQL)
- **cartService** - Shopping cart operations (REST)

## Adding New Services

To add a new service:

1. Create `lib/services/newservice.ts`
2. Define TypeScript interfaces
3. Mix GraphQL and REST endpoints as needed
4. Create `hooks/use-newservice.ts`
5. Use in components

## Token Refresh

Currently implemented with localStorage. For production, implement token refresh:

```tsx
// In api-client.ts - Add refresh token logic
if (response.status === 401) {
  // Call refresh endpoint
  // Update token
  // Retry request
}
```
