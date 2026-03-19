package ecommerce.modules.admin.service.impl;

import ecommerce.common.enums.InventoryStatus;
import ecommerce.modules.admin.dto.AdminAnalyticsDto;
import ecommerce.modules.admin.dto.AdminDashboardDto;
import ecommerce.modules.admin.service.AdminService;
import ecommerce.modules.order.dto.OrderDashboardDto;
import ecommerce.modules.order.entity.PaymentStatus;
import ecommerce.modules.order.repository.OrderItemRepository;
import ecommerce.modules.order.service.OrderService;
import ecommerce.modules.product.entity.Product;
import ecommerce.modules.product.repository.ProductRepository;
import ecommerce.modules.user.entity.Role;
import ecommerce.modules.user.entity.User;
import ecommerce.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Admin service implementation.
 * Handles admin dashboard and analytics.
 * 
 * Note: Order-related methods delegate to OrderService for consistency.
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderService orderService;
    private final OrderItemRepository orderItemRepository;

    @Override
    @Cacheable(value = "admin-dashboard", key = "'stats'")
    public AdminDashboardDto getDashboardStats() {
        log.info("Calculating dashboard statistics");

        long totalUsers = userRepository.count();
        long totalCustomers = userRepository.countByRole(Role.CUSTOMER);
        long totalSellers = userRepository.countByRole(Role.SELLER);
        long totalProducts = productRepository.count();
        long lowStockProducts = productRepository.countByInventoryStatusAndIsActiveTrue(InventoryStatus.LOW_STOCK);

        OrderDashboardDto orderDashboard = orderService.getOrderDashboard();
        List<AdminDashboardDto.RecentOrderDto> recentOrders = orderDashboard.getRecentOrders().stream()
                .map(this::convertRecentOrderDto)
                .collect(Collectors.toList());

        List<AdminDashboardDto.TopSellerDto> topSellers = getTopSellers(5);
        List<AdminDashboardDto.LowStockAlertDto> lowStockAlerts = getLowStockAlerts(10);

        return AdminDashboardDto.builder()
                .totalUsers(totalUsers)
                .totalCustomers(totalCustomers)
                .totalSellers(totalSellers)
                .totalOrders(orderDashboard.getTotalOrders())
                .totalProducts(totalProducts)
                .totalRevenue(orderDashboard.getTotalRevenue())
                .pendingOrders(orderDashboard.getPendingOrders())
                .activeUsers(userRepository.countActiveUsers())
                .lowStockProducts(lowStockProducts)
                .ordersByStatus(orderDashboard.getOrdersByStatus())
                .recentOrders(recentOrders)
                .topSellers(topSellers)
                .lowStockAlerts(lowStockAlerts)
                .orderCompletionRate(orderDashboard.getOrderCompletionRate())
                .cancellationRate(orderDashboard.getCancellationRate())
                .build();
    }

    @Override
    @Cacheable(value = "admin-analytics", key = "#filterPeriod")
    public AdminAnalyticsDto getAnalytics(String filterPeriod) {
        log.info("Getting admin analytics for period: {}", filterPeriod);
        return orderService.getAdminAnalytics(filterPeriod);
    }

    private AdminDashboardDto.RecentOrderDto convertRecentOrderDto(OrderDashboardDto.RecentOrderDto source) {
        return AdminDashboardDto.RecentOrderDto.builder()
                .orderId(source.getOrderId())
                .orderNumber(source.getOrderNumber())
                .customerName(source.getCustomerName())
                .sellerName(source.getSellerName())
                .amount(source.getAmount())
                .status(source.getStatus())
                .createdAt(source.getCreatedAt())
                .build();
    }

    private List<AdminDashboardDto.TopSellerDto> getTopSellers(int limit) {
        List<Object[]> topSellerIds = orderItemRepository.findTopSellerIdsByOrderCount(PageRequest.of(0, limit));
        List<AdminDashboardDto.TopSellerDto> topSellers = new ArrayList<>();
        
        for (Object[] result : topSellerIds) {
            UUID sellerId = (UUID) result[0];
            Long orderCount = (Long) result[1];
            
            User seller = userRepository.findById(sellerId).orElse(null);
            if (seller != null) {
                BigDecimal revenue = orderItemRepository.sumRevenueBySellerId(sellerId);
                long productCount = productRepository.findBySellerId(UUID.fromString("00000000-0000-0000-0000-000000000000"), PageRequest.of(0, 1000))
                        .getContent().stream()
                        .filter(p -> p.getSeller() != null && p.getSeller().getId().equals(sellerId))
                        .count();
                
                topSellers.add(AdminDashboardDto.TopSellerDto.builder()
                        .sellerId(sellerId.toString())
                        .sellerName(seller.getEmail())
                        .productCount(productCount)
                        .revenue(revenue != null ? revenue : BigDecimal.ZERO)
                        .orderCount(orderCount)
                        .build());
            }
        }
        return topSellers;
    }

    private List<AdminDashboardDto.LowStockAlertDto> getLowStockAlerts(int limit) {
        List<Product> lowStockProducts = productRepository.findByStatus(
                ecommerce.common.enums.ProductStatus.ACTIVE, 
                PageRequest.of(0, limit * 2))
                .getContent();
        
        return lowStockProducts.stream()
                .filter(p -> p.getInventoryStatus() == InventoryStatus.LOW_STOCK || 
                           p.getInventoryStatus() == InventoryStatus.OUT_OF_STOCK)
                .filter(p -> p.getIsActive())
                .limit(limit)
                .map(product -> AdminDashboardDto.LowStockAlertDto.builder()
                        .productId(product.getId().toString())
                        .productName(product.getName())
                        .sku(product.getSku())
                        .sellerName(product.getSeller() != null ? product.getSeller().getEmail() : "N/A")
                        .currentStock(product.getStock() != null ? product.getStock() : 0)
                        .build())
                .collect(Collectors.toList());
    }

    @CacheEvict(value = "admin-dashboard", allEntries = true)
    @Scheduled(fixedRate = 300_000)
    public void clearDashboardCache() {
        log.debug("Clearing admin dashboard cache");
    }
}
