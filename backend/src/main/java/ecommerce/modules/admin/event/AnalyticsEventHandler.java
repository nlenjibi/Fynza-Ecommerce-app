package ecommerce.modules.admin.event;

import ecommerce.modules.admin.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.util.UUID;

/**
 * AnalyticsEventHandler
 * 
 * Async listeners for system events that trigger analytics updates.
 * Events include: Order Created/Confirmed/Cancelled, Product Added, User Registered.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class AnalyticsEventHandler {

    private final AnalyticsService analyticsService;

    /**
     * Handle order created event
     */
    @Async("analyticsExecutor")
    @EventListener
    public void handleOrderCreated(OrderCreatedEvent event) {
        log.info("Handling order created event for order: {}", event.getOrderId());
        
        analyticsService.recordEvent("ORDER_CREATED", event.getOrderId(), java.util.Map.of(
            "customerId", event.getCustomerId(),
            "totalAmount", event.getTotalAmount(),
            "itemCount", event.getItemCount()
        ));
        
        // Trigger analytics refresh
        analyticsService.refreshAnalyticsCache();
    }

    /**
     * Handle order confirmed event
     */
    @Async("analyticsExecutor")
    @EventListener
    public void handleOrderConfirmed(OrderConfirmedEvent event) {
        log.info("Handling order confirmed event for order: {}", event.getOrderId());
        
        analyticsService.recordEvent("ORDER_CONFIRMED", event.getOrderId(), java.util.Map.of(
            "customerId", event.getCustomerId(),
            "totalAmount", event.getTotalAmount()
        ));
    }

    /**
     * Handle order cancelled event
     */
    @Async("analyticsExecutor")
    @EventListener
    public void handleOrderCancelled(OrderCancelledEvent event) {
        log.info("Handling order cancelled event for order: {}", event.getOrderId());
        
        analyticsService.recordEvent("ORDER_CANCELLED", event.getOrderId(), java.util.Map.of(
            "customerId", event.getCustomerId(),
            "totalAmount", event.getTotalAmount(),
            "reason", event.getReason()
        ));
    }

    /**
     * Handle product added event
     */
    @Async("analyticsExecutor")
    @EventListener
    public void handleProductAdded(ProductAddedEvent event) {
        log.info("Handling product added event for product: {}", event.getProductId());
        
        analyticsService.recordEvent("PRODUCT_ADDED", event.getProductId(), java.util.Map.of(
            "sellerId", event.getSellerId(),
            "categoryId", event.getCategoryId(),
            "price", event.getPrice()
        ));
    }

    /**
     * Handle user registered event
     */
    @Async("analyticsExecutor")
    @EventListener
    public void handleUserRegistered(UserRegisteredEvent event) {
        log.info("Handling user registered event for user: {}", event.getUserId());
        
        analyticsService.recordEvent("USER_REGISTERED", event.getUserId(), java.util.Map.of(
            "role", event.getRole()
        ));
    }

    // ==================== Event Classes ====================

    /**
     * Event triggered when an order is created
     */
    public record OrderCreatedEvent(
        UUID orderId,
        UUID customerId,
        java.math.BigDecimal totalAmount,
        int itemCount
    ) {}

    /**
     * Event triggered when an order is confirmed
     */
    public record OrderConfirmedEvent(
        UUID orderId,
        UUID customerId,
        java.math.BigDecimal totalAmount
    ) {}

    /**
     * Event triggered when an order is cancelled
     */
    public record OrderCancelledEvent(
        UUID orderId,
        UUID customerId,
        java.math.BigDecimal totalAmount,
        String reason
    ) {}

    /**
     * Event triggered when a product is added
     */
    public record ProductAddedEvent(
        UUID productId,
        UUID sellerId,
        UUID categoryId,
        java.math.BigDecimal price
    ) {}

    /**
     * Event triggered when a user registers
     */
    public record UserRegisteredEvent(
        UUID userId,
        String role
    ) {}
}
