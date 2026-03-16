package ecommerce.modules.seller.service;

import ecommerce.modules.order.dto.OrderResponse;
import ecommerce.modules.order.dto.OrderStatusUpdateRequest;
import ecommerce.modules.seller.dto.SellerAnalyticsResponse;
import ecommerce.modules.seller.dto.SellerDashboardResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface SellerService {

    SellerDashboardResponse getDashboard(UUID sellerId);

    Page<OrderResponse> getSellerOrders(UUID sellerId, Pageable pageable);

    OrderResponse updateOrderStatus(UUID orderId, OrderStatusUpdateRequest request, UUID sellerId);

    SellerAnalyticsResponse getSalesAnalytics(UUID sellerId, int days);
}
