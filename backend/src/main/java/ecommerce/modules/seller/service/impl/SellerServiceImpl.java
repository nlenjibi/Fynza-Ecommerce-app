package ecommerce.modules.seller.service.impl;

import ecommerce.common.enums.OrderStatus;
import ecommerce.modules.order.dto.OrderResponse;
import ecommerce.modules.order.dto.OrderStatusUpdateRequest;
import ecommerce.modules.order.mapper.OrderMapper;
import ecommerce.modules.order.repository.OrderItemRepository;
import ecommerce.modules.order.repository.OrderRepository;
import ecommerce.modules.product.repository.ProductRepository;
import ecommerce.modules.seller.dto.SellerAnalyticsResponse;
import ecommerce.modules.seller.dto.SellerDashboardResponse;
import ecommerce.modules.seller.service.SellerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class SellerServiceImpl implements SellerService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;
    private final OrderMapper orderMapper;

    @Override
    @Transactional(readOnly = true)
    public SellerDashboardResponse getDashboard(UUID sellerId) {
        long totalProducts = productRepository.findBySellerId(sellerId, Pageable.unpaged()).getTotalElements();
        
        List<ecommerce.modules.order.entity.Order> sellerOrders = orderRepository.findBySellerId(sellerId);
        
        long totalOrders = sellerOrders.size();
        long pendingOrders = sellerOrders.stream()
                .filter(o -> o.getStatus() == OrderStatus.PENDING || o.getStatus() == OrderStatus.CONFIRMED)
                .count();
        long completedOrders = sellerOrders.stream()
                .filter(o -> o.getStatus() == OrderStatus.DELIVERED)
                .count();
        
        BigDecimal totalRevenue = sellerOrders.stream()
                .filter(o -> o.getPaymentStatus() == ecommerce.modules.order.entity.PaymentStatus.PAID)
                .map(ecommerce.modules.order.entity.Order::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        LocalDateTime startOfMonth = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
        BigDecimal monthlyRevenue = sellerOrders.stream()
                .filter(o -> o.getCreatedAt() != null && o.getCreatedAt().isAfter(startOfMonth))
                .filter(o -> o.getPaymentStatus() == ecommerce.modules.order.entity.PaymentStatus.PAID)
                .map(ecommerce.modules.order.entity.Order::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        Double averageRating = productRepository.findBySellerId(sellerId, Pageable.unpaged()).getContent().stream()
                .filter(p -> p.getRating() != null)
                .mapToDouble(p -> p.getRating().doubleValue())
                .average()
                .orElse(0.0);
        
        long totalCustomers = sellerOrders.stream()
                .map(o -> o.getCustomer() != null ? o.getCustomer().getId() : null)
                .filter(java.util.Objects::nonNull)
                .distinct()
                .count();
        
        return SellerDashboardResponse.builder()
                .totalProducts(totalProducts)
                .totalOrders(totalOrders)
                .pendingOrders(pendingOrders)
                .completedOrders(completedOrders)
                .totalRevenue(totalRevenue)
                .monthlyRevenue(monthlyRevenue)
                .averageRating(averageRating)
                .totalCustomers(totalCustomers)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public Page<OrderResponse> getSellerOrders(UUID sellerId, Pageable pageable) {
        Page<ecommerce.modules.order.entity.Order> orders = orderRepository.findBySellerIdPage(sellerId, pageable);
        return orders.map(orderMapper::toResponse);
    }

    @Override
    @Transactional
    public OrderResponse updateOrderStatus(UUID orderId, OrderStatusUpdateRequest request, UUID sellerId) {
        ecommerce.modules.order.entity.Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        boolean hasSellerItem = order.getOrderItems().stream()
                .anyMatch(item -> item.getSeller().getId().equals(sellerId));
        
        if (!hasSellerItem) {
            throw new RuntimeException("Order does not contain items from this seller");
        }
        
        if (request.getStatus() != null) {
            order.setStatus(request.getStatus());
        }
        if (request.getNotes() != null) {
            order.setNotes(request.getNotes());
        }
        
        order = orderRepository.save(order);
        return orderMapper.toResponse(order);
    }

    @Override
    @Transactional(readOnly = true)
    public SellerAnalyticsResponse getSalesAnalytics(UUID sellerId, int days) {
        LocalDateTime startDate = LocalDateTime.now().minusDays(days);
        
        List<ecommerce.modules.order.entity.Order> sellerOrders = orderRepository.findBySellerId(sellerId);
        List<ecommerce.modules.order.entity.Order> filteredOrders = sellerOrders.stream()
                .filter(o -> o.getCreatedAt().isAfter(startDate))
                .filter(o -> o.getPaymentStatus() == ecommerce.modules.order.entity.PaymentStatus.PAID)
                .collect(Collectors.toList());
        
        BigDecimal totalSales = filteredOrders.stream()
                .map(ecommerce.modules.order.entity.Order::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        long totalOrders = filteredOrders.size();
        BigDecimal averageOrderValue = totalOrders > 0 
                ? totalSales.divide(BigDecimal.valueOf(totalOrders), 2, java.math.RoundingMode.HALF_UP)
                : BigDecimal.ZERO;
        
        long totalProductsSold = filteredOrders.stream()
                .flatMap(o -> o.getOrderItems().stream())
                .filter(item -> item.getSeller().getId().equals(sellerId))
                .mapToLong(ecommerce.modules.order.entity.OrderItem::getQuantity)
                .sum();
        
        List<SellerAnalyticsResponse.DailySales> dailySalesList = new ArrayList<>();
        for (int i = 0; i < days; i++) {
            LocalDateTime dayStart = LocalDateTime.now().minusDays(i).withHour(0).withMinute(0).withSecond(0);
            LocalDateTime dayEnd = dayStart.plusDays(1);
            
            BigDecimal daySales = filteredOrders.stream()
                    .filter(o -> o.getCreatedAt().isAfter(dayStart) && o.getCreatedAt().isBefore(dayEnd))
                    .map(ecommerce.modules.order.entity.Order::getTotalAmount)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            
            long dayOrders = filteredOrders.stream()
                    .filter(o -> o.getCreatedAt().isAfter(dayStart) && o.getCreatedAt().isBefore(dayEnd))
                    .count();
            
            dailySalesList.add(SellerAnalyticsResponse.DailySales.builder()
                    .date(dayStart.toLocalDate().toString())
                    .sales(daySales)
                    .orders(dayOrders)
                    .build());
        }
        
        List<ecommerce.modules.order.entity.OrderItem> allItems = filteredOrders.stream()
                .flatMap(o -> o.getOrderItems().stream())
                .filter(item -> item.getSeller().getId().equals(sellerId))
                .collect(Collectors.toList());
        
        List<SellerAnalyticsResponse.TopProduct> topProducts = allItems.stream()
                .collect(Collectors.groupingBy(
                        item -> item.getProduct().getId().toString(),
                        Collectors.collectingAndThen(
                                Collectors.toList(),
                                items -> {
                                    long quantity = items.stream().mapToLong(ecommerce.modules.order.entity.OrderItem::getQuantity).sum();
                                    BigDecimal revenue = items.stream()
                                            .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                                            .reduce(BigDecimal.ZERO, BigDecimal::add);
                                    String name = items.get(0).getProduct().getName();
                                    return new Object[] { name, quantity, revenue };
                                }
                        )
                ))
                .values().stream()
                .map(data -> SellerAnalyticsResponse.TopProduct.builder()
                        .productId(UUID.randomUUID().toString())
                        .productName((String) data[0])
                        .quantitySold((Long) data[1])
                        .revenue((BigDecimal) data[2])
                        .build())
                .sorted((a, b) -> b.getRevenue().compareTo(a.getRevenue()))
                .limit(5)
                .collect(Collectors.toList());
        
        long totalViews = productRepository.findBySellerId(sellerId, Pageable.unpaged()).getContent().stream()
                .mapToLong(p -> p.getViewCount() != null ? p.getViewCount().longValue() : 0L)
                .sum();
        double conversionRate = totalViews > 0 ? (double) totalOrders / totalViews * 100 : 0.0;
        
        return SellerAnalyticsResponse.builder()
                .totalSales(totalSales)
                .averageOrderValue(averageOrderValue)
                .totalOrders(totalOrders)
                .totalProductsSold(totalProductsSold)
                .conversionRate(conversionRate)
                .dailySales(dailySalesList)
                .topProducts(topProducts)
                .build();
    }
}
