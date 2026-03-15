// GraphQL Queries and Mutations for Fynza E-Commerce Platform

// ===== PRODUCT QUERIES =====

export const SEARCH_PRODUCTS_QUERY = `
  query SearchProducts($query: String!, $filters: ProductFilters) {
    searchProducts(query: $query, filters: $filters) {
      id
      name
      description
      price
      discountPrice
      images
      category {
        id
        name
      }
      stock
      rating
      reviews
      seller {
        id
        name
      }
    }
  }
`

export const GET_PRODUCT_DETAILS_QUERY = `
  query GetProductDetails($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
      discountPrice
      images
      category {
        id
        name
        slug
      }
      stock
      rating
      reviews
      seller {
        id
        name
        rating
        totalSales
      }
      specifications {
        key
        value
      }
      reviews {
        id
        userId
        userName
        rating
        text
        createdAt
      }
    }
  }
`

export const GET_PRODUCTS_BY_CATEGORY_QUERY = `
  query GetProductsByCategory($categoryId: ID!, $page: Int, $limit: Int) {
    productsByCategory(categoryId: $categoryId, page: $page, limit: $limit) {
      id
      name
      price
      discountPrice
      images
      rating
      stock
      category {
        id
        name
      }
    }
  }
`

export const GET_TRENDING_PRODUCTS_QUERY = `
  query GetTrendingProducts($limit: Int) {
    trendingProducts(limit: $limit) {
      id
      name
      price
      discountPrice
      images
      rating
      views
      sales
    }
  }
`

// ===== ORDER QUERIES =====

export const GET_ORDERS_QUERY = `
  query GetOrders($status: String, $page: Int, $limit: Int) {
    getOrders(status: $status, page: $page, limit: $limit) {
      id
      orderNumber
      userId
      items {
        productId
        productName
        quantity
        price
        image
      }
      subtotal
      tax
      shipping
      total
      status
      shippingAddress {
        street
        city
        state
        zip
        country
      }
      paymentMethod
      createdAt
      updatedAt
      estimatedDelivery
    }
  }
`

export const GET_ORDER_DETAILS_QUERY = `
  query GetOrderDetails($id: ID!) {
    order(id: $id) {
      id
      orderNumber
      userId
      items {
        id
        productId
        productName
        quantity
        price
        image
      }
      subtotal
      tax
      shipping
      discount
      total
      status
      statusHistory {
        status
        timestamp
      }
      shippingAddress {
        street
        city
        state
        zip
        country
      }
      billingAddress {
        street
        city
        state
        zip
        country
      }
      paymentMethod {
        type
        lastDigits
      }
      trackingNumber
      carrier
      createdAt
      updatedAt
      estimatedDelivery
    }
  }
`

export const GET_ORDER_STATISTICS_QUERY = `
  query GetOrderStatistics($userId: ID!) {
    orderStats(userId: $userId) {
      totalOrders
      totalSpent
      averageOrderValue
      lastOrderDate
      pendingOrders
      completedOrders
    }
  }
`

// ===== USER QUERIES =====

export const GET_USER_PROFILE_QUERY = `
  query GetUserProfile {
    userProfile {
      id
      firstName
      lastName
      email
      phone
      avatar
      memberSince
      loyaltyPoints
      role
    }
  }
`

export const GET_USER_ADDRESSES_QUERY = `
  query GetUserAddresses {
    userAddresses {
      id
      label
      street
      city
      state
      zip
      country
      isDefault
      phone
    }
  }
`

export const GET_USER_WISHLIST_QUERY = `
  query GetUserWishlist($page: Int, $limit: Int) {
    userWishlist(page: $page, limit: $limit) {
      id
      productId
      productName
      price
      discountPrice
      image
      addedAt
    }
  }
`

// ===== ANALYTICS QUERIES =====

export const GET_SELLER_ANALYTICS_QUERY = `
  query GetSellerAnalytics($period: String!) {
    sellerAnalytics(period: $period) {
      totalRevenue
      totalOrders
      totalCustomers
      averageOrderValue
      topProducts {
        id
        name
        sales
        revenue
      }
      salesByCategory {
        category
        amount
        percentage
      }
      monthlySalesData {
        month
        sales
        orders
      }
    }
  }
`

export const GET_PRODUCT_ANALYTICS_QUERY = `
  query GetProductAnalytics($productId: ID!) {
    productAnalytics(productId: $productId) {
      id
      name
      views
      sales
      revenue
      averageRating
      reviews
      stock
      reorderLevel
    }
  }
`

// ===== SEARCH AND FILTER QUERIES =====

export const ADVANCED_SEARCH_QUERY = `
  query AdvancedSearch(
    $query: String
    $categories: [ID!]
    $minPrice: Float
    $maxPrice: Float
    $minRating: Float
    $inStock: Boolean
    $sortBy: String
    $page: Int
    $limit: Int
  ) {
    advancedSearch(
      query: $query
      categories: $categories
      minPrice: $minPrice
      maxPrice: $maxPrice
      minRating: $minRating
      inStock: $inStock
      sortBy: $sortBy
      page: $page
      limit: $limit
    ) {
      products {
        id
        name
        price
        discountPrice
        images
        rating
        stock
        category {
          id
          name
        }
      }
      total
      hasMore
    }
  }
`

// ===== MUTATIONS =====

export const ADD_PRODUCT_REVIEW_MUTATION = `
  mutation AddProductReview($productId: ID!, $rating: Int!, $text: String!) {
    addProductReview(productId: $productId, rating: $rating, text: $text) {
      id
      productId
      rating
      text
      userName
      createdAt
    }
  }
`

export const ADD_TO_WISHLIST_MUTATION = `
  mutation AddToWishlist($productId: ID!) {
    addToWishlist(productId: $productId) {
      id
      productId
      productName
      addedAt
    }
  }
`

export const REMOVE_FROM_WISHLIST_MUTATION = `
  mutation RemoveFromWishlist($productId: ID!) {
    removeFromWishlist(productId: $productId)
  }
`

export const UPDATE_USER_PROFILE_MUTATION = `
  mutation UpdateUserProfile($input: UserProfileInput!) {
    updateUserProfile(input: $input) {
      id
      firstName
      lastName
      email
      phone
      avatar
      memberSince
    }
  }
`

export const APPLY_COUPON_MUTATION = `
  mutation ApplyCoupon($couponCode: String!) {
    applyCoupon(couponCode: $couponCode) {
      code
      discountAmount
      discountPercentage
      expiresAt
    }
  }
`
