package ecommerce.modules.order.service;

import ecommerce.common.enums.OrderStatus;
import ecommerce.modules.order.dto.CreateOrderRequest;
import ecommerce.modules.order.dto.OrderResponse;
import ecommerce.modules.order.dto.OrderStatsResponse;
import ecommerce.modules.order.dto.OrderStatusUpdateRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface OrderService {
    OrderResponse createOrder(CreateOrderRequest request, UUID userId);
    OrderResponse getOrderById(UUID id, UUID userId);
    OrderResponse getOrderByOrderNumber(String orderNumber, UUID userId);
    Page<OrderResponse> getUserOrders(UUID userId, Pageable pageable);
    OrderResponse cancelOrder(UUID id, String reason);
    OrderResponse cancelOrder(UUID id, UUID userId);
    OrderResponse cancelOrder(UUID id, UUID userId, String reason);
    
    // Admin methods
    Page<OrderResponse> getAllOrders(Pageable pageable);
    Page<OrderResponse> getOrdersByStatus(OrderStatus status, Pageable pageable);
    OrderResponse updateOrderStatus(UUID id, OrderStatus status);
    OrderResponse updateOrderStatus(UUID id, OrderStatusUpdateRequest request);
    OrderStatsResponse getOrderStatistics();
}
