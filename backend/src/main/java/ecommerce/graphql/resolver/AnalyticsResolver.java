package ecommerce.graphql.resolver;

import ecommerce.modules.admin.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.ContextValue;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
@Slf4j
public class AnalyticsResolver {

    private final AnalyticsService analyticsService;

    // ==================== Admin Analytics ====================

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Long totalUsers() {
        log.info("GraphQL Query: totalUsers");
        return analyticsService.getTotalUsers();
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public BigDecimal totalRevenue() {
        log.info("GraphQL Query: totalRevenue");
        return analyticsService.getTotalRevenue();
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public BigDecimal revenueForPeriod(
            @Argument LocalDateTime start,
            @Argument LocalDateTime end) {
        log.info("GraphQL Query: revenueForPeriod from {} to {}", start, end);
        return analyticsService.getRevenueForPeriod(start, end);
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Long totalOrderCount() {
        log.info("GraphQL Query: totalOrderCount");
        return analyticsService.getTotalOrderCount();
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Long orderCountForPeriod(
            @Argument LocalDateTime start,
            @Argument LocalDateTime end) {
        log.info("GraphQL Query: orderCountForPeriod from {} to {}", start, end);
        return analyticsService.getOrderCountForPeriod(start, end);
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<AnalyticsService.SellerMetrics> topSellers(@Argument int limit) {
        log.info("GraphQL Query: topSellers with limit {}", limit);
        return analyticsService.getTopSellers(limit);
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<AnalyticsService.TrendData> orderTrends(
            @Argument LocalDateTime start,
            @Argument LocalDateTime end) {
        log.info("GraphQL Query: orderTrends from {} to {}", start, end);
        return analyticsService.getOrderTrends(start, end);
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<AnalyticsService.TrendData> revenueTrends(
            @Argument LocalDateTime start,
            @Argument LocalDateTime end) {
        log.info("GraphQL Query: revenueTrends from {} to {}", start, end);
        return analyticsService.getRevenueTrends(start, end);
    }

    // ==================== Seller Analytics ====================

    @QueryMapping
    @PreAuthorize("hasRole('SELLER')")
    public Long sellerProductSales(@ContextValue UUID sellerId) {
        log.info("GraphQL Query: sellerProductSales for seller {}", sellerId);
        return analyticsService.getProductSales(sellerId);
    }

    @QueryMapping
    @PreAuthorize("hasRole('SELLER')")
    public BigDecimal sellerRevenue(@ContextValue UUID sellerId) {
        log.info("GraphQL Query: sellerRevenue for seller {}", sellerId);
        return analyticsService.getSellerRevenue(sellerId);
    }

    @QueryMapping
    @PreAuthorize("hasRole('SELLER')")
    public BigDecimal sellerRevenueForPeriod(
            @Argument LocalDateTime start,
            @Argument LocalDateTime end,
            @ContextValue UUID sellerId) {
        log.info("GraphQL Query: sellerRevenueForPeriod for seller {} from {} to {}", sellerId, start, end);
        return analyticsService.getSellerRevenueForPeriod(sellerId, start, end);
    }

    @QueryMapping
    @PreAuthorize("hasRole('SELLER')")
    public Double sellerCancellationRate(@ContextValue UUID sellerId) {
        log.info("GraphQL Query: sellerCancellationRate for seller {}", sellerId);
        return analyticsService.getSellerCancellationRate(sellerId);
    }

    @QueryMapping
    @PreAuthorize("hasRole('SELLER')")
    public Long sellerLowStockCount(@ContextValue UUID sellerId) {
        log.info("GraphQL Query: sellerLowStockCount for seller {}", sellerId);
        return analyticsService.getLowStockCount(sellerId);
    }

    @QueryMapping
    @PreAuthorize("hasRole('SELLER')")
    public AnalyticsService.SellerMetrics sellerMetrics(@ContextValue UUID sellerId) {
        log.info("GraphQL Query: sellerMetrics for seller {}", sellerId);
        return analyticsService.getSellerMetrics(sellerId);
    }

    // ==================== Customer Analytics ====================

    @QueryMapping
    @PreAuthorize("isAuthenticated()")
    public BigDecimal customerTotalSpending(@ContextValue UUID userId) {
        log.info("GraphQL Query: customerTotalSpending for user {}", userId);
        return analyticsService.getCustomerTotalSpending(userId);
    }

    @QueryMapping
    @PreAuthorize("isAuthenticated()")
    public List<AnalyticsService.CategoryPreference> customerCategoryPreferences(@ContextValue UUID userId) {
        log.info("GraphQL Query: customerCategoryPreferences for user {}", userId);
        return analyticsService.getCustomerCategoryPreferences(userId);
    }
}
