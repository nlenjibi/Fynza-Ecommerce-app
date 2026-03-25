# GraphQL Schema Issues

## FIXED: Unmapped registrations (2025-03-25)
- ✅ Query.filterCategoriesWithPredicate - ADDED to category.graphqls
- ✅ Query.searchCategoriesWithPredicate - ADDED to category.graphqls
- ✅ Query.getCategoriesWithMinProductCount - ADDED to category.graphqls
- ✅ Query.getCategoriesBySubcategoryPresence - ADDED to category.graphqls
- ✅ Query.getFeaturedRootCategories - ADDED to category.graphqls
- ✅ Query.getCategoriesByDateRange - ADDED to category.graphqls
- ✅ Query.getRootCategories - ADDED to category.graphqls
- ✅ Query.coupon - ADDED to coupon.graphqls
- ✅ Query.coupons - ADDED to coupon.graphqls
- ✅ Query.validateCoupon - ADDED to coupon.graphqls
- ✅ Query.ordersByStatus - ADDED to order.graphqls
- ✅ Query.productsBySeller - ADDED to product.graphqls
- ✅ Mutation.applyCouponToCart - FIXED in cart.graphqls
- ✅ Mutation.createCoupon - ADDED to coupon.graphqls
- ✅ Mutation.updateCoupon - ADDED to coupon.graphqls
- ✅ Mutation.deleteCoupon - ADDED to coupon.graphqls
- ✅ Mutation.cancelOrderAdmin - ADDED to order.graphqls
- ✅ Mutation.updateOrderStatus - FIXED in order.graphqls (use OrderStatusUpdateRequest)

## FIXED: Unmapped arguments (2025-03-25)
- ✅ ReviewResolver#productReviews - FIXED to use PageInput
- ✅ ReviewResolver#searchReviews - FIXED to use PageInput
- ✅ ReviewResolver#myReviews - FIXED to use PageInput
- ✅ OrderResolver#updateOrderStatus - FIXED (now uses request argument)
- ✅ SellerResolver#updateSellerOrderStatus - FIXED (now uses orderId, request)

## REMAINING: Unmapped fields
These are fields in GraphQL types that don't have corresponding resolvers or are not exposed:
- ContactMessage: assignedTo, response, isRead, ipAddress, userAgent
- ContactStats: new
- DeliveryFee: region, shippingMethod, weightBasedFee, freeShippingThreshold
- ShippingZone: description, regions, defaultDeliveryFee
- FAQ: order, isPublic
- StoreFollow: user, seller, isActive, createdAt
- Notification: userId, channel, readAt, metadata
- OrderResponse: order, errors
- Order: orderDate, taxAmount, discountAmount, couponDiscount, couponCode, paidAt, carrier, shippedAt, estimatedDeliveryDate, deliveredAt, cancelledAt, cancellationReason, refundedAt, refundAmount, refundReason, customerNotes, customerEmail, customerName, updatedAt
- OrderItem: unitPrice, discount, totalPrice, productImageUrl
- OrderResponseDto: errors
- PaginationInfo: total, hasMore
- FilterOption: count
- SearchFilters: availableFilters
- Refund: order, user, currency, reasonDescription, paymentMethod, refundTransactionId, processedAt
- Review: product, customer, hasImages
- ProductRatingStats: productId
- SellerDashboard: processingOrders, shippedOrders, cancelledOrders, lowStockProducts, outOfStockProducts, averageOrderValue, conversionRate
- SellerAnalytics: totalRevenue, topSellingProducts, ordersByStatus, revenueByDay, revenueByMonth
- SiteSettings: createdAt, updatedAt
- SocialLinks: createdAt, updatedAt
- Tag: slug, productCount, isActive, createdAt, updatedAt

## REMAINING: Unmapped Query fields
These queries exist in schema but need resolvers:
- categoryBySlug, activeCategories, activeCategoriesPaginated, featuredCategories
- searchCategories, searchActiveCategories, filterCategories
- categoriesWithProducts, categoriesByProductCount
- categoriesCreatedBetween, categoriesUpdatedBetween
- categoriesByIds, categoriesBySlugs
- shippingZone, staffOrderManagement
- productBySlug, productBySku
- productsByCategory, productsByCategoryName, productsByPriceRange
- featuredProducts, newProducts, discountedProducts, bestsellerProducts
- topRatedProducts, trendingProducts, searchProducts
- productsByInventoryStatus, productsNeedingReorder
- lowStockProducts, outOfStockProducts, productStatistics

## REMAINING: Unmapped Mutation fields
- updateCategory, activateCategory, deactivateCategory
- featureCategory, unfeatureCategory, deleteCategory
- updateShippingZone, deleteShippingZone
- confirmOrder, processOrder, shipOrder, deliverOrder, refundOrder
- bulkUpdateFeatured, bulkDelete

## Skipped types
Types that need proper type mappings or don't have resolvers.
