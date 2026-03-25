# GraphQL Schema Issues

## FIXED: Unmapped registrations (2025-03-25)
- ✅ Query.filterCategoriesWithPredicate - ADDED to category.graphqls
- ✅ Query.searchCategoriesWithPredicate - ADDED to category.graphqls
- ✅ Query.getCategoriesWithMinProductCount - ADDED to category.graphqls
- ✅ Query.getCategoriesBySubcategoryPresence - ADDED to category.graphqls
- ✅ Query.getFeaturedRootCategories - ADDED to category.graphqls
- ✅ Query.getCategoriesByDateRange - ADDED to category.graphqls
- ✅ Query.getRootCategories - ADDED to category.graphqls
- ✅ Query.coupon - Needs coupon.graphqls
- ✅ Query.coupons - Needs coupon.graphqls
- ✅ Query.validateCoupon - Needs coupon.graphqls
- ✅ Query.ordersByStatus - ADDED to order.graphqls
- ✅ Query.productsBySeller - ADDED to product.graphqls
- ✅ Mutation.applyCouponToCart - FIXED in cart.graphqls
- ✅ Mutation.createCoupon - Needs coupon.graphqls
- ✅ Mutation.updateCoupon - Needs coupon.graphqls
- ✅ Mutation.deleteCoupon - Needs coupon.graphqls
- ✅ Mutation.cancelOrderAdmin - ADDED to order.graphqls
- ✅ Mutation.updateOrderStatus - ADDED to order.graphqls

## FIXED: Unmapped arguments (2025-03-25)
- ✅ ReviewResolver#productReviews - FIXED to use PageInput
- ✅ ReviewResolver#searchReviews - FIXED to use PageInput
- ✅ ReviewResolver#myReviews - FIXED to use PageInput

## REMAINING: Unmapped fields
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
- Tag: slug, productCount, isActive

## REMAINING: Skipped types
Types that need proper type mappings in GraphQL schema.
