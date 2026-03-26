Unmapped fields: {DeliveryFee=[weightBasedFee, freeShippingThreshold], 
ShippingCalculation=[deliveryMethod, townName], 
OrderResponse=[order, errors], 
OrderResponseDto=[errors], 
Query=[staffOrderManagement, productsByCategory, productsByCategoryName, productsByPriceRange, searchProducts, productsByInventoryStatus, productsNeedingReorder, lowStockProducts, outOfStockProducts, productStatistics], 
PaginationInfo=[total, hasMore, size], FilterOption=[value, label, count], 
SearchFilters=[availableFilters], 
Refund=[order, user, currency, reasonDescription, paymentMethod, refundTransactionId, processedAt], 
Review=[hasImages], 
ProductRatingStats=[productId], 
SellerDashboard=[processingOrders, shippedOrders, cancelledOrders, lowStockProducts, outOfStockProducts, averageOrderValue, conversionRate], 
SellerAnalytics=[totalRevenue, topSellingProducts, ordersByStatus, revenueByDay, revenueByMonth], 
SiteSettings=[createdAt, updatedAt], 
SocialLinks=[createdAt, updatedAt], 
Tag=[slug, productCount, isActive, createdAt, updatedAt], 
Mutation=[updateCategory, activateCategory, deactivateCategory, featureCategory, unfeatureCategory, deleteCategory, updateShippingZone, deleteShippingZone, bulkDeleteItems, activateDeliveryFee, deactivateDeliveryFee, confirmOrder, processOrder, shipOrder, deliverOrder, refundOrder, bulkUpdateFeatured, bulkDelete]}
Unmapped registrations: {Query.shippingZones=DeliveryResolver#shippingZones[0 args], 
Mutation.createShippingZone=DeliveryResolver#createShippingZone[1 args]}
Unmapped arguments: {DeliveryResolver#deliveryFees[2 args]=[regionId, shippingMethod]}
Skipped types: [User, Conversation, Conversation, Message, PaymentTransaction, PaymentTransaction, SavedPaymentMethod, SavedPaymentMethod, ContentTrendPoint, CategoryEngagement, TopContentItem, RateLimitEndpoint, CacheStatistics, Promotion, Promotion, Promotion, FlashSale, FlashSale, FlashSale, Refund, Refund, Report, Report, ReportSchedule, ReportSchedule, PaymentGatewayConfig, Subscriber, Subscriber, Subscriber, SellerProductTag, SellerProductTag, User, User, User, Conversation, Message, Message, Conversation, PaymentTransaction, PaymentTransaction, PaymentTransaction, SavedPaymentMethod, SavedPaymentMethod, Promotion, Promotion, Promotion, FlashSale, FlashSale, Refund, Refund, Refund, Refund, Report, Report, ReportSchedule, ReportSchedule, ReportSchedule, Subscriber, Subscriber, Subscriber, SellerProductTag, SellerProductTag]
09:44:27.812 [main] INFO  o.s.b.a.g.s.GraphQlWebMvcAutoConfiguration - GraphQL endpoint HTTP POST /graphql