# Fynza Frontend Dummy Data

This file contains all dummy/sample data used throughout the Fynza frontend application to match the API structure.

---

## Authentication Data

### Sample User (Customer)
```json
{
  "id": "user_123",
  "email": "john.doe@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "avatar": "https://cdn.fynza.com/avatars/user_123.jpg",
  "dateOfBirth": "1990-05-15",
  "memberSince": "2023-01-10",
  "loyaltyPoints": 450,
  "membershipStatus": "GOLD",
  "totalOrders": 12,
  "totalSpent": 5420.50,
  "userType": "CUSTOMER"
}
```

### Sample User (Seller)
```json
{
  "id": "seller_456",
  "email": "seller@premiumfootwear.com",
  "firstName": "Sarah",
  "lastName": "Smith",
  "phone": "+1987654321",
  "storeName": "Premium Footwear Co",
  "storeRating": 4.7,
  "totalProducts": 24,
  "totalOrders": 156,
  "totalRevenue": 25450.99,
  "userType": "SELLER"
}
```

### Auth Tokens
```json
{
  "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 86400,
  "refreshToken": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Products Data

### Product List (10 items)
```json
[
  {
    "id": "prod_123",
    "name": "Premium Sneakers",
    "description": "High-quality sports sneakers with premium comfort",
    "category": "footwear",
    "price": 149.99,
    "originalPrice": 199.99,
    "discount": 25,
    "rating": 4.5,
    "reviewCount": 128,
    "image": "https://cdn.fynza.com/products/sneakers_main.jpg",
    "images": [
      "https://cdn.fynza.com/products/sneakers_1.jpg",
      "https://cdn.fynza.com/products/sneakers_2.jpg",
      "https://cdn.fynza.com/products/sneakers_3.jpg"
    ],
    "inStock": true,
    "stockCount": 45,
    "seller": {
      "id": "seller_456",
      "name": "Premium Footwear Co",
      "rating": 4.7,
      "responseTime": "2 hours"
    },
    "specifications": {
      "material": "Mesh and Synthetic",
      "color": "Black",
      "sizes": ["36", "37", "38", "39", "40", "41", "42"],
      "weight": "0.35 kg"
    }
  },
  {
    "id": "prod_124",
    "name": "Running Shirt",
    "description": "Breathable athletic running shirt",
    "category": "apparel",
    "price": 49.99,
    "originalPrice": 79.99,
    "discount": 37,
    "rating": 4.3,
    "reviewCount": 89,
    "image": "https://cdn.fynza.com/products/shirt_main.jpg",
    "images": [
      "https://cdn.fynza.com/products/shirt_1.jpg",
      "https://cdn.fynza.com/products/shirt_2.jpg"
    ],
    "inStock": true,
    "stockCount": 120,
    "seller": {
      "id": "seller_789",
      "name": "Active Wear Ltd",
      "rating": 4.6,
      "responseTime": "1 hour"
    },
    "specifications": {
      "material": "Polyester Mesh",
      "color": "Blue",
      "sizes": ["XS", "S", "M", "L", "XL", "XXL"]
    }
  },
  {
    "id": "prod_125",
    "name": "Wireless Headphones",
    "description": "Premium noise-cancelling wireless headphones",
    "category": "electronics",
    "price": 299.99,
    "originalPrice": 399.99,
    "discount": 25,
    "rating": 4.7,
    "reviewCount": 342,
    "image": "https://cdn.fynza.com/products/headphones_main.jpg",
    "images": [
      "https://cdn.fynza.com/products/headphones_1.jpg",
      "https://cdn.fynza.com/products/headphones_2.jpg"
    ],
    "inStock": true,
    "stockCount": 30,
    "seller": {
      "id": "seller_101",
      "name": "TechHub Electronics",
      "rating": 4.8,
      "responseTime": "30 minutes"
    },
    "specifications": {
      "batteryLife": "30 hours",
      "color": "Black",
      "connectivity": "Bluetooth 5.0",
      "weight": "0.25 kg"
    }
  },
  {
    "id": "prod_126",
    "name": "Sports Watch",
    "description": "Fitness tracking smartwatch with GPS",
    "category": "accessories",
    "price": 199.99,
    "originalPrice": 249.99,
    "discount": 20,
    "rating": 4.4,
    "reviewCount": 205,
    "image": "https://cdn.fynza.com/products/watch_main.jpg",
    "images": [
      "https://cdn.fynza.com/products/watch_1.jpg"
    ],
    "inStock": true,
    "stockCount": 55,
    "seller": {
      "id": "seller_102",
      "name": "Fitness Gear Pro",
      "rating": 4.5,
      "responseTime": "2 hours"
    },
    "specifications": {
      "display": "AMOLED",
      "batteryLife": "7 days",
      "water_resistance": "5ATM"
    }
  },
  {
    "id": "prod_127",
    "name": "Yoga Mat",
    "description": "Non-slip premium yoga mat",
    "category": "fitness",
    "price": 34.99,
    "originalPrice": 49.99,
    "discount": 30,
    "rating": 4.6,
    "reviewCount": 156,
    "image": "https://cdn.fynza.com/products/yoga_mat_main.jpg",
    "images": [
      "https://cdn.fynza.com/products/yoga_mat_1.jpg"
    ],
    "inStock": true,
    "stockCount": 200,
    "seller": {
      "id": "seller_103",
      "name": "Wellness Store",
      "rating": 4.7,
      "responseTime": "1 hour"
    },
    "specifications": {
      "material": "TPE",
      "thickness": "6mm",
      "length": "180cm",
      "color": "Purple"
    }
  },
  {
    "id": "prod_128",
    "name": "Laptop Backpack",
    "description": "Durable laptop backpack with multiple compartments",
    "category": "bags",
    "price": 89.99,
    "originalPrice": 129.99,
    "discount": 30,
    "rating": 4.5,
    "reviewCount": 178,
    "image": "https://cdn.fynza.com/products/backpack_main.jpg",
    "images": [
      "https://cdn.fynza.com/products/backpack_1.jpg",
      "https://cdn.fynza.com/products/backpack_2.jpg"
    ],
    "inStock": true,
    "stockCount": 80,
    "seller": {
      "id": "seller_104",
      "name": "Travel Essentials Co",
      "rating": 4.6,
      "responseTime": "3 hours"
    },
    "specifications": {
      "capacity": "30L",
      "material": "Water-resistant Polyester",
      "color": "Black",
      "laptop_sleeve": "Fits up to 17 inch"
    }
  },
  {
    "id": "prod_129",
    "name": "Coffee Maker",
    "description": "Programmable automatic coffee maker",
    "category": "kitchen",
    "price": 79.99,
    "originalPrice": 99.99,
    "discount": 20,
    "rating": 4.4,
    "reviewCount": 92,
    "image": "https://cdn.fynza.com/products/coffee_main.jpg",
    "images": [
      "https://cdn.fynza.com/products/coffee_1.jpg"
    ],
    "inStock": true,
    "stockCount": 40,
    "seller": {
      "id": "seller_105",
      "name": "Home Appliances Plus",
      "rating": 4.5,
      "responseTime": "2 hours"
    },
    "specifications": {
      "capacity": "12 cups",
      "power": "1000W",
      "color": "Stainless Steel",
      "features": "Programmable, Auto-shutoff, Keep warm"
    }
  }
]
```

---

## Customer Orders Data

### Order History (5 orders)
```json
[
  {
    "id": "order_001",
    "orderNumber": "FYZ-2024-001",
    "createdAt": "2024-03-10T10:30:00Z",
    "status": "DELIVERED",
    "totalAmount": 299.99,
    "subtotal": 259.99,
    "tax": 20.00,
    "shippingCost": 20.00,
    "itemsCount": 2,
    "items": [
      {
        "id": "item_001",
        "productId": "prod_123",
        "productName": "Premium Sneakers",
        "quantity": 1,
        "price": 149.99,
        "size": "42",
        "color": "Black",
        "image": "https://cdn.fynza.com/products/sneakers.jpg"
      },
      {
        "id": "item_002",
        "productId": "prod_124",
        "productName": "Running Shirt",
        "quantity": 2,
        "price": 49.99,
        "size": "L",
        "color": "Blue",
        "image": "https://cdn.fynza.com/products/shirt.jpg"
      }
    ],
    "shippingAddress": {
      "streetAddress": "123 Main St",
      "city": "New York",
      "state": "NY",
      "postalCode": "10001",
      "country": "USA"
    },
    "paymentMethod": "CREDIT_CARD",
    "trackingNumber": "FDX123456789",
    "estimatedDelivery": "2024-03-15T10:30:00Z",
    "timeline": [
      {
        "status": "PENDING",
        "timestamp": "2024-03-10T10:30:00Z",
        "message": "Order placed"
      },
      {
        "status": "PROCESSING",
        "timestamp": "2024-03-10T14:00:00Z",
        "message": "Order processing"
      },
      {
        "status": "SHIPPED",
        "timestamp": "2024-03-11T14:00:00Z",
        "message": "Package shipped"
      },
      {
        "status": "DELIVERED",
        "timestamp": "2024-03-13T16:45:00Z",
        "message": "Package delivered"
      }
    ]
  },
  {
    "id": "order_002",
    "orderNumber": "FYZ-2024-002",
    "createdAt": "2024-03-12T14:15:00Z",
    "status": "SHIPPED",
    "totalAmount": 449.98,
    "subtotal": 399.98,
    "tax": 32.00,
    "shippingCost": 18.00,
    "itemsCount": 1,
    "items": [
      {
        "id": "item_003",
        "productId": "prod_125",
        "productName": "Wireless Headphones",
        "quantity": 1,
        "price": 299.99,
        "color": "Black",
        "image": "https://cdn.fynza.com/products/headphones.jpg"
      }
    ],
    "shippingAddress": {
      "streetAddress": "456 Business Ave",
      "city": "New York",
      "state": "NY",
      "postalCode": "10002",
      "country": "USA"
    },
    "paymentMethod": "DEBIT_CARD",
    "trackingNumber": "FDX234567890",
    "estimatedDelivery": "2024-03-16T10:30:00Z",
    "timeline": [
      {
        "status": "PENDING",
        "timestamp": "2024-03-12T14:15:00Z",
        "message": "Order placed"
      },
      {
        "status": "SHIPPED",
        "timestamp": "2024-03-13T10:00:00Z",
        "message": "Package shipped"
      }
    ]
  },
  {
    "id": "order_003",
    "orderNumber": "FYZ-2024-003",
    "createdAt": "2024-03-08T09:45:00Z",
    "status": "DELIVERED",
    "totalAmount": 199.99,
    "subtotal": 179.99,
    "tax": 14.40,
    "shippingCost": 5.60,
    "itemsCount": 1,
    "items": [
      {
        "id": "item_004",
        "productId": "prod_126",
        "productName": "Sports Watch",
        "quantity": 1,
        "price": 199.99,
        "color": "Silver",
        "image": "https://cdn.fynza.com/products/watch.jpg"
      }
    ],
    "shippingAddress": {
      "streetAddress": "789 Park Lane",
      "city": "Los Angeles",
      "state": "CA",
      "postalCode": "90001",
      "country": "USA"
    },
    "paymentMethod": "PAYPAL",
    "trackingNumber": "FDX345678901",
    "estimatedDelivery": "2024-03-12T10:30:00Z",
    "timeline": [
      {
        "status": "PENDING",
        "timestamp": "2024-03-08T09:45:00Z",
        "message": "Order placed"
      },
      {
        "status": "SHIPPED",
        "timestamp": "2024-03-09T11:00:00Z",
        "message": "Package shipped"
      },
      {
        "status": "DELIVERED",
        "timestamp": "2024-03-11T15:30:00Z",
        "message": "Package delivered"
      }
    ]
  }
]
```

---

## Shopping Cart Data

### Sample Cart
```json
{
  "id": "cart_user_123",
  "items": [
    {
      "id": "cart_item_001",
      "productId": "prod_123",
      "productName": "Premium Sneakers",
      "price": 149.99,
      "quantity": 1,
      "size": "42",
      "color": "Black",
      "image": "https://cdn.fynza.com/products/sneakers.jpg",
      "subtotal": 149.99
    },
    {
      "id": "cart_item_002",
      "productId": "prod_124",
      "productName": "Running Shirt",
      "price": 49.99,
      "quantity": 2,
      "size": "L",
      "color": "Blue",
      "image": "https://cdn.fynza.com/products/shirt.jpg",
      "subtotal": 99.98
    }
  ],
  "subtotal": 249.97,
  "tax": 19.99,
  "shippingCost": 10.00,
  "discount": 0,
  "total": 279.96,
  "itemsCount": 3,
  "updatedAt": "2024-03-13T10:30:00Z"
}
```

---

## Addresses Data

### Saved Addresses (3 addresses)
```json
[
  {
    "id": "addr_123",
    "label": "Home",
    "streetAddress": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "USA",
    "isDefault": true,
    "createdAt": "2024-01-15T10:30:00Z"
  },
  {
    "id": "addr_124",
    "label": "Office",
    "streetAddress": "456 Business Ave",
    "city": "New York",
    "state": "NY",
    "postalCode": "10002",
    "country": "USA",
    "isDefault": false,
    "createdAt": "2024-02-20T10:30:00Z"
  },
  {
    "id": "addr_125",
    "label": "Parents House",
    "streetAddress": "789 Suburban Rd",
    "city": "New Jersey",
    "state": "NJ",
    "postalCode": "07001",
    "country": "USA",
    "isDefault": false,
    "createdAt": "2024-03-01T10:30:00Z"
  }
]
```

---

## Wishlist Data

### Sample Wishlist (5 items)
```json
{
  "id": "wishlist_user_123",
  "items": [
    {
      "id": "wishlist_item_001",
      "productId": "prod_123",
      "productName": "Premium Sneakers",
      "price": 149.99,
      "originalPrice": 199.99,
      "discount": 25,
      "image": "https://cdn.fynza.com/products/sneakers.jpg",
      "rating": 4.5,
      "inStock": true,
      "addedAt": "2024-03-10T10:30:00Z"
    },
    {
      "id": "wishlist_item_002",
      "productId": "prod_125",
      "productName": "Wireless Headphones",
      "price": 299.99,
      "originalPrice": 399.99,
      "discount": 25,
      "image": "https://cdn.fynza.com/products/headphones.jpg",
      "rating": 4.7,
      "inStock": true,
      "addedAt": "2024-03-11T14:20:00Z"
    },
    {
      "id": "wishlist_item_003",
      "productId": "prod_128",
      "productName": "Laptop Backpack",
      "price": 89.99,
      "originalPrice": 129.99,
      "discount": 30,
      "image": "https://cdn.fynza.com/products/backpack.jpg",
      "rating": 4.5,
      "inStock": true,
      "addedAt": "2024-03-12T09:15:00Z"
    }
  ],
  "itemsCount": 3
}
```

---

## Reviews Data

### Product Reviews (5 reviews)
```json
[
  {
    "id": "review_001",
    "rating": 5,
    "title": "Excellent quality",
    "text": "Great shoes, very comfortable and durable. Highly recommended!",
    "author": "John D.",
    "helpful": 45,
    "unhelpful": 2,
    "createdAt": "2024-03-10T10:30:00Z"
  },
  {
    "id": "review_002",
    "rating": 4,
    "title": "Good value for money",
    "text": "Good product, fits perfectly. Shipping was fast.",
    "author": "Sarah M.",
    "helpful": 32,
    "unhelpful": 1,
    "createdAt": "2024-03-09T15:45:00Z"
  },
  {
    "id": "review_003",
    "rating": 5,
    "title": "Best purchase",
    "text": "Amazing quality, better than expected. Will buy again.",
    "author": "Mike T.",
    "helpful": 56,
    "unhelpful": 3,
    "createdAt": "2024-03-08T12:20:00Z"
  },
  {
    "id": "review_004",
    "rating": 4,
    "title": "Very satisfied",
    "text": "Product is as described. Comfortable fit.",
    "author": "Emma L.",
    "helpful": 28,
    "unhelpful": 0,
    "createdAt": "2024-03-07T08:10:00Z"
  },
  {
    "id": "review_005",
    "rating": 5,
    "title": "Perfect",
    "text": "Exactly what I was looking for. Fast delivery.",
    "author": "Alex R.",
    "helpful": 67,
    "unhelpful": 4,
    "createdAt": "2024-03-06T14:30:00Z"
  }
]
```

---

## Seller Dashboard Data

### Seller KPIs
```json
{
  "kpis": {
    "totalSales": 25450.99,
    "totalSalesChange": 12.5,
    "activeProducts": 24,
    "activeProductsChange": 2,
    "ordersToday": 8,
    "ordersTodayChange": -5,
    "storeRating": 4.7,
    "ratingChange": 0.1
  }
}
```

### Seller Orders (5 orders)
```json
[
  {
    "id": "order_001",
    "orderNumber": "FYZ-2024-001",
    "customerId": "cust_123",
    "customerName": "John Doe",
    "productName": "Premium Sneakers",
    "quantity": 1,
    "amount": 149.99,
    "status": "SHIPPED",
    "date": "2024-03-13T10:30:00Z"
  },
  {
    "id": "order_002",
    "orderNumber": "FYZ-2024-002",
    "customerId": "cust_124",
    "customerName": "Jane Smith",
    "productName": "Premium Sneakers",
    "quantity": 2,
    "amount": 299.98,
    "status": "PROCESSING",
    "date": "2024-03-12T14:15:00Z"
  },
  {
    "id": "order_003",
    "orderNumber": "FYZ-2024-003",
    "customerId": "cust_125",
    "customerName": "Bob Johnson",
    "productName": "Premium Sneakers",
    "quantity": 1,
    "amount": 149.99,
    "status": "DELIVERED",
    "date": "2024-03-10T09:45:00Z"
  }
]
```

### Seller Products (8 products)
```json
[
  {
    "id": "prod_123",
    "name": "Premium Sneakers",
    "sku": "PSNK-001",
    "price": 149.99,
    "stock": 45,
    "stockStatus": "IN_STOCK",
    "sales": 156,
    "revenue": 23344.44,
    "rating": 4.5,
    "status": "ACTIVE",
    "image": "https://cdn.fynza.com/products/sneakers.jpg",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  {
    "id": "prod_130",
    "name": "Casual Sneakers",
    "sku": "CSNK-001",
    "price": 99.99,
    "stock": 0,
    "stockStatus": "OUT_OF_STOCK",
    "sales": 89,
    "revenue": 8899.11,
    "rating": 4.3,
    "status": "ACTIVE",
    "image": "https://cdn.fynza.com/products/casual_sneakers.jpg",
    "createdAt": "2024-02-01T10:30:00Z"
  }
]
```

### Seller Analytics (Sales Data)
```json
{
  "totalRevenue": 25450.99,
  "totalOrders": 156,
  "avgOrderValue": 163.15,
  "totalCustomers": 89,
  "salesTrend": [
    {
      "date": "2024-03-01",
      "revenue": 1250.50,
      "orders": 8
    },
    {
      "date": "2024-03-02",
      "revenue": 1450.75,
      "orders": 9
    },
    {
      "date": "2024-03-03",
      "revenue": 980.25,
      "orders": 6
    },
    {
      "date": "2024-03-04",
      "revenue": 2150.00,
      "orders": 13
    },
    {
      "date": "2024-03-05",
      "revenue": 1875.50,
      "orders": 11
    },
    {
      "date": "2024-03-06",
      "revenue": 2340.99,
      "orders": 14
    }
  ],
  "categoryBreakdown": [
    {
      "category": "footwear",
      "revenue": 15670.50,
      "percentage": 61.5
    },
    {
      "category": "apparel",
      "revenue": 6200.75,
      "percentage": 24.3
    },
    {
      "category": "accessories",
      "revenue": 3579.74,
      "percentage": 14.2
    }
  ]
}
```

---

## Analytics Charts Data

### Monthly Sales Chart (12 months)
```json
{
  "months": [
    { "month": "Jan", "revenue": 12500, "orders": 85 },
    { "month": "Feb", "revenue": 15200, "orders": 102 },
    { "month": "Mar", "revenue": 18700, "orders": 125 },
    { "month": "Apr", "revenue": 14300, "orders": 95 },
    { "month": "May", "revenue": 19800, "orders": 135 },
    { "month": "Jun", "revenue": 22100, "orders": 148 },
    { "month": "Jul", "revenue": 25450, "orders": 170 },
    { "month": "Aug", "revenue": 23600, "orders": 158 },
    { "month": "Sep", "revenue": 20500, "orders": 140 },
    { "month": "Oct", "revenue": 21200, "orders": 142 },
    { "month": "Nov", "revenue": 28900, "orders": 195 },
    { "month": "Dec", "revenue": 35600, "orders": 240 }
  ]
}
```

---

## Navigation & Categories

### Product Categories
```json
[
  {
    "id": "cat_1",
    "name": "Electronics",
    "icon": "📱",
    "subcategories": ["Phones", "Laptops", "Accessories"]
  },
  {
    "id": "cat_2",
    "name": "Fashion",
    "icon": "👕",
    "subcategories": ["Men", "Women", "Shoes"]
  },
  {
    "id": "cat_3",
    "name": "Home & Office",
    "icon": "🏠",
    "subcategories": ["Furniture", "Kitchen", "Decor"]
  },
  {
    "id": "cat_4",
    "name": "Sports & Fitness",
    "icon": "⚽",
    "subcategories": ["Equipment", "Apparel", "Accessories"]
  },
  {
    "id": "cat_5",
    "name": "Books & Media",
    "icon": "📚",
    "subcategories": ["Books", "eBooks", "Audiobooks"]
  }
]
```

---

## Flash Sales & Promotions

### Flash Sale Products
```json
{
  "saleId": "flash_001",
  "title": "Flash Sale - Up to 60% Off",
  "startTime": "2024-03-13T18:00:00Z",
  "endTime": "2024-03-14T06:00:00Z",
  "products": [
    {
      "productId": "prod_123",
      "name": "Premium Sneakers",
      "originalPrice": 199.99,
      "salePrice": 79.99,
      "discount": 60,
      "image": "https://cdn.fynza.com/products/sneakers.jpg"
    },
    {
      "productId": "prod_125",
      "name": "Wireless Headphones",
      "originalPrice": 399.99,
      "salePrice": 179.99,
      "discount": 55,
      "image": "https://cdn.fynza.com/products/headphones.jpg"
    }
  ]
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Bad Request",
  "message": "Invalid request parameters",
  "details": "email field is required"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "You do not have permission to access this resource"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Resource not found",
  "resource": "Product"
}
```

### 500 Server Error
```json
{
  "error": "Server Error",
  "message": "An unexpected error occurred"
}
```

---

## Summary of Dummy Data

- **Users**: 2 (1 customer, 1 seller)
- **Products**: 7 products across various categories
- **Orders**: 3 customer orders with full timeline
- **Cart**: 1 sample cart with 2 items
- **Addresses**: 3 saved addresses
- **Wishlist**: 3 items
- **Reviews**: 5 reviews per product
- **Seller Orders**: 3 orders
- **Seller Products**: 8 products
- **Analytics Data**: 6 months of sales trend, category breakdown
- **Categories**: 5 main categories with subcategories
- **Flash Sale**: 1 active flash sale with 2 products

This dummy data is structured exactly as the API returns and is used throughout the frontend components for development and testing purposes.
