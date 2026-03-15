// API Configuration
export const API_CONFIG = {
  // Backend API URLs
  REST_API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9190/api/v1',
  GRAPHQL_ENDPOINT: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:9190/graphql',
  
  // Authentication
  AUTH_ENDPOINTS: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    oauth2Google: '/auth/oauth2/authorization/google',
  },
  
  // Products
  PRODUCTS_ENDPOINTS: {
    list: '/products',
    getById: (id: string) => `/products/${id}`,
    search: '/products/search',
    categories: '/categories',
    categoryProducts: (categoryId: string) => `/categories/${categoryId}/products`,
  },
  
  // Orders
  ORDERS_ENDPOINTS: {
    list: '/orders',
    create: '/orders',
    getById: (id: string) => `/orders/${id}`,
    update: (id: string) => `/orders/${id}`,
    cancel: (id: string) => `/orders/${id}/cancel`,
  },
  
  // Users
  USERS_ENDPOINTS: {
    profile: '/users/profile',
    update: '/users/profile',
    addresses: '/users/addresses',
    wishlist: '/users/wishlist',
  },
  
  // Cart
  CART_ENDPOINTS: {
    get: '/cart',
    add: '/cart/items',
    update: (itemId: string) => `/cart/items/${itemId}`,
    remove: (itemId: string) => `/cart/items/${itemId}`,
    clear: '/cart/clear',
  },
}

// Token key for localStorage
export const TOKEN_KEY = 'fynza_auth_token'
export const REFRESH_TOKEN_KEY = 'fynza_refresh_token'
