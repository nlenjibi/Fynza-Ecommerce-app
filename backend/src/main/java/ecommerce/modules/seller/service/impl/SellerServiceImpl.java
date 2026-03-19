package ecommerce.modules.seller.service.impl;

import ecommerce.exception.ResourceNotFoundException;
import ecommerce.modules.order.dto.OrderResponse;
import ecommerce.modules.order.dto.OrderStatusUpdateRequest;
import ecommerce.modules.order.dto.SellerOrderDto;
import ecommerce.modules.order.mapper.OrderMapper;
import ecommerce.modules.order.repository.OrderItemRepository;
import ecommerce.modules.order.service.OrderService;
import ecommerce.modules.product.entity.Product;
import ecommerce.modules.product.repository.ProductRepository;
import ecommerce.modules.review.dto.ReviewResponse;
import ecommerce.modules.review.entity.Review;
import ecommerce.modules.review.repository.ReviewRepository;
import ecommerce.modules.seller.dto.SellerAnalyticsDto;
import ecommerce.modules.seller.dto.SellerAnalyticsResponse;
import ecommerce.modules.seller.dto.SellerDashboardResponse;
import ecommerce.modules.seller.dto.StoreResponse;
import ecommerce.modules.seller.dto.UpdateStoreRequest;
import ecommerce.modules.seller.service.SellerService;
import ecommerce.modules.tag.dto.TagResponse;
import ecommerce.modules.tag.service.TagService;
import ecommerce.modules.user.entity.SellerProfile;
import ecommerce.modules.user.repository.SellerProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Seller service implementation.
 * Handles seller dashboard and analytics.
 * 
 * Note: Order-related methods delegate to OrderService for consistency.
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class SellerServiceImpl implements SellerService {

    private final OrderService orderService;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;
    private final OrderMapper orderMapper;
    private final SellerProfileRepository sellerProfileRepository;
    private final ReviewRepository reviewRepository;
    private final TagService tagService;

    @Override
    public SellerDashboardResponse getDashboard(UUID sellerId) {
        log.info("Getting seller dashboard for: {}", sellerId);
        
        long totalProducts = productRepository.findBySellerId(sellerId, Pageable.unpaged()).getTotalElements();
        long activeProducts = productRepository.findBySellerId(sellerId, Pageable.unpaged()).getContent()
                .stream().filter(p -> p.getIsActive()).count();
        
        Double averageRating = productRepository.findBySellerId(sellerId, Pageable.unpaged()).getContent().stream()
                .filter(p -> p.getRating() != null)
                .mapToDouble(p -> p.getRating().doubleValue())
                .average()
                .orElse(0.0);
        
        long storeVisits = productRepository.findBySellerId(sellerId, Pageable.unpaged()).getContent().stream()
                .mapToLong(p -> p.getViewCount() != null ? p.getViewCount().longValue() : 0L)
                .sum();
        
        long lastMonthVisits = storeVisits > 0 ? (long)(storeVisits * 0.9) : 0;
        double visitGrowth = lastMonthVisits > 0 ? (double)(storeVisits - lastMonthVisits) / lastMonthVisits * 100 : 0;

        SellerOrderDto orderDashboard = orderService.getSellerOrderDashboard(sellerId);

        return SellerDashboardResponse.builder()
                .totalProducts(totalProducts)
                .activeProducts(activeProducts)
                .totalOrders(orderDashboard.getTotalOrders())
                .ordersThisMonth(orderDashboard.getOrdersThisMonth())
                .pendingOrders(orderDashboard.getPendingOrders())
                .completedOrders(orderDashboard.getCompletedOrders())
                .totalRevenue(orderDashboard.getTotalRevenue())
                .monthlyRevenue(orderDashboard.getMonthlyRevenue())
                .revenueGrowth(orderDashboard.getRevenueGrowth())
                .averageRating(averageRating)
                .totalCustomers(orderDashboard.getTotalCustomers())
                .storeVisits(storeVisits)
                .visitGrowth(visitGrowth)
                .recentOrders(convertRecentOrders(orderDashboard.getRecentOrders()))
                .topProducts(getTopProductsForSeller(sellerId, 5))
                .build();
    }

    @Override
    public Page<OrderResponse> getSellerOrders(UUID sellerId, Pageable pageable) {
        return orderService.getSellerOrders(sellerId, pageable);
    }

    @Override
    @Transactional
    public OrderResponse updateOrderStatus(UUID orderId, OrderStatusUpdateRequest request, UUID sellerId) {
        return orderService.updateSellerOrderStatus(orderId, request, sellerId);
    }

    @Override
    public SellerAnalyticsResponse getSalesAnalytics(UUID sellerId, int days) {
        SellerOrderDto.SellerOrderAnalytics analytics = orderService.getSellerOrderAnalytics(sellerId, days);

        long totalViews = productRepository.findBySellerId(sellerId, Pageable.unpaged()).getContent().stream()
                .mapToLong(p -> p.getViewCount() != null ? p.getViewCount().longValue() : 0L)
                .sum();
        double conversionRate = totalViews > 0 ? (double) analytics.getTotalOrders() / totalViews * 100 : 0.0;

        return SellerAnalyticsResponse.builder()
                .totalSales(analytics.getTotalSales())
                .averageOrderValue(analytics.getAverageOrderValue())
                .totalOrders(analytics.getTotalOrders())
                .totalProductsSold(analytics.getTotalProductsSold())
                .conversionRate(conversionRate)
                .dailySales(convertDailySales(analytics.getDailySales()))
                .topProducts(analytics.getTopProducts().stream()
                        .map(p -> SellerAnalyticsResponse.TopProduct.builder()
                                .productId(p.getProductId())
                                .productName(p.getProductName())
                                .quantitySold(p.getQuantitySold())
                                .revenue(p.getRevenue())
                                .build())
                        .toList())
                .build();
    }

    @Override
    public SellerAnalyticsDto getSellerAnalytics(UUID sellerId) {
        return orderService.getSellerAnalytics(sellerId);
    }

    private java.util.List<SellerDashboardResponse.RecentOrderDto> convertRecentOrders(
            java.util.List<SellerOrderDto.RecentSellerOrderDto> recentOrders) {
        if (recentOrders == null) return java.util.Collections.emptyList();
        return recentOrders.stream()
                .map(order -> SellerDashboardResponse.RecentOrderDto.builder()
                        .orderId(order.getOrderId())
                        .orderNumber(order.getOrderNumber())
                        .customerName(order.getCustomerName())
                        .productName(order.getProductName())
                        .amount(order.getAmount())
                        .status(order.getStatus())
                        .timeAgo(order.getTimeAgo())
                        .build())
                .collect(java.util.stream.Collectors.toList());
    }

    private java.util.List<SellerAnalyticsResponse.DailySales> convertDailySales(
            java.util.List<SellerOrderDto.DailySalesDto> dailySales) {
        if (dailySales == null) return java.util.Collections.emptyList();
        return dailySales.stream()
                .map(sale -> SellerAnalyticsResponse.DailySales.builder()
                        .date(sale.getDate())
                        .sales(sale.getSales())
                        .orders(sale.getOrders())
                        .build())
                .collect(java.util.stream.Collectors.toList());
    }

    private java.util.List<SellerDashboardResponse.TopProductDto> getTopProductsForSeller(UUID sellerId, int limit) {
        return java.util.Collections.emptyList();
    }

    @Override
    public StoreResponse getStore(UUID sellerId) {
        SellerProfile profile = sellerProfileRepository.findByUserId(sellerId)
                .orElseThrow(() -> new ResourceNotFoundException("Seller profile not found"));
        return mapToStoreResponse(profile);
    }

    @Override
    @Transactional
    public StoreResponse updateStore(UUID sellerId, UpdateStoreRequest request) {
        SellerProfile profile = sellerProfileRepository.findByUserId(sellerId)
                .orElseThrow(() -> new ResourceNotFoundException("Seller profile not found"));

        if (request.getStoreName() != null) profile.setStoreName(request.getStoreName());
        if (request.getStoreDescription() != null) profile.setStoreDescription(request.getStoreDescription());
        if (request.getStoreWebsite() != null) profile.setStoreWebsite(request.getStoreWebsite());
        if (request.getStoreLogo() != null) profile.setStoreLogo(request.getStoreLogo());
        if (request.getBusinessRegistration() != null) profile.setBusinessRegistration(request.getBusinessRegistration());
        if (request.getBankName() != null) profile.setBankName(request.getBankName());
        if (request.getAccountHolderName() != null) profile.setAccountHolderName(request.getAccountHolderName());
        if (request.getAccountNumber() != null) profile.setAccountNumber(request.getAccountNumber());

        SellerProfile saved = sellerProfileRepository.save(profile);
        return mapToStoreResponse(saved);
    }

    @Override
    public Page<ReviewResponse> getSellerReviews(UUID sellerId, Pageable pageable) {
        List<UUID> productIds = productRepository.findBySellerId(sellerId, Pageable.unpaged()).getContent()
                .stream()
                .map(p -> p.getId())
                .collect(Collectors.toList());

        if (productIds.isEmpty()) {
            return Page.empty(pageable);
        }

        List<ReviewResponse> reviews = reviewRepository.findAll().stream()
                .filter(r -> productIds.contains(r.getProduct().getId()))
                .map(this::mapToReviewResponse)
                .collect(Collectors.toList());

        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), reviews.size());
        List<ReviewResponse> pageContent = start < reviews.size() 
                ? reviews.subList(start, end) 
                : java.util.Collections.emptyList();

        return new org.springframework.data.domain.PageImpl<>(pageContent, pageable, reviews.size());
    }

    @Override
    public List<TagResponse> getTags() {
        return tagService.getActiveTags();
    }

    @Override
    @Transactional
    public void assignTagsToProduct(UUID productId, List<String> tagNames, UUID sellerId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        if (!product.getSeller().getId().equals(sellerId)) {
            throw new ResourceNotFoundException("Product does not belong to this seller");
        }

        for (String tagName : tagNames) {
            TagResponse tag = tagService.getOrCreateTag(tagName);
            tagService.incrementUsage(tag.getId());
        }
    }

    private StoreResponse mapToStoreResponse(SellerProfile profile) {
        return StoreResponse.builder()
                .id(profile.getId())
                .storeName(profile.getStoreName())
                .storeDescription(profile.getStoreDescription())
                .storeWebsite(profile.getStoreWebsite())
                .storeLogo(profile.getStoreLogo())
                .rating(profile.getRating())
                .totalReviews(profile.getTotalReviews())
                .totalProducts(profile.getTotalProducts())
                .totalSales(profile.getTotalSales())
                .totalRevenue(profile.getTotalRevenue())
                .verificationStatus(profile.getVerificationStatus().name())
                .businessRegistration(profile.getBusinessRegistration())
                .bankName(profile.getBankName())
                .build();
    }

    private ReviewResponse mapToReviewResponse(Review review) {
        return ReviewResponse.builder()
                .id(review.getId())
                .productId(review.getProduct().getId())
                .productName(review.getProduct().getName())
                .user(ReviewResponse.UserInfo.builder()
                        .id(review.getCustomer().getId())
                        .email(review.getCustomer().getEmail())
                        .build())
                .rating(review.getRating())
                .title(review.getTitle())
                .comment(review.getComment())
                .verifiedPurchase(review.getVerifiedPurchase())
                .approved(review.getApproved())
                .helpfulCount(review.getHelpful())
                .createdAt(review.getCreatedAt())
                .build();
    }
}
