package ecommerce.modules.activity.service;

import ecommerce.modules.activity.entity.ActivityLog;
import ecommerce.modules.activity.entity.OrderActivityLog;
import ecommerce.modules.activity.entity.PaymentActivityLog;
import ecommerce.modules.activity.repository.ActivityLogRepository;
import ecommerce.modules.activity.repository.OrderActivityLogRepository;
import ecommerce.modules.activity.repository.PaymentActivityLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * =================================================================
 * ACTIVITY LOG SERVICE
 * =================================================================
 * 
 * PURPOSE:
 * Unified service for all activity logging operations across the application.
 * Handles general activity logs, order-specific logs, and payment-specific logs.
 * 
 * LAYER: Service (Business Logic)
 * 
 * ARCHITECTURE:
 * - General ActivityLog: Tracks user actions, product changes, etc.
 * - OrderActivityLog: Detailed order lifecycle tracking
 * - PaymentActivityLog: Detailed payment lifecycle tracking
 * 
 * @author Fynza Backend Team
 * @version 2.1
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ActivityLogService {

    private final ActivityLogRepository activityLogRepository;
    private final OrderActivityLogRepository orderActivityLogRepository;
    private final PaymentActivityLogRepository paymentActivityLogRepository;

    // =================================================================
    // GENERAL ACTIVITY LOG METHODS
    // =================================================================

    /**
     * Logs a general activity asynchronously.
     * 
     * @param type        The type of activity
     * @param description Human-readable description
     * @param entityType  The entity type affected (e.g., "USER", "PRODUCT")
     * @param entityId    The affected entity's ID
     * @param userId      The user who performed the action
     * @param userName    The user's name
     * @param userEmail   The user's email
     * @param ipAddress   The client's IP address
     */
    @Async
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void logActivity(ActivityLog.ActivityType type, String description, 
                            String entityType, UUID entityId, UUID userId, 
                            String userName, String userEmail, String ipAddress) {
        ActivityLog activityLog = ActivityLog.builder()
                .userId(userId)
                .userName(userName)
                .userEmail(userEmail)
                .activityType(type)
                .description(description)
                .entityType(entityType)
                .entityId(entityId)
                .ipAddress(ipAddress)
                .createdAt(LocalDateTime.now())
                .build();
        activityLogRepository.save(activityLog);
    }

    /**
     * Retrieves all activities with pagination.
     */
    @Transactional(readOnly = true)
    public Page<ActivityLog> getAllActivities(Pageable pageable) {
        return activityLogRepository.findAll(pageable);
    }

    /**
     * Retrieves all activities for a specific user.
     */
    @Transactional(readOnly = true)
    public Page<ActivityLog> getActivitiesByUser(UUID userId, Pageable pageable) {
        return activityLogRepository.findByUserId(userId, pageable);
    }

    /**
     * Retrieves all activities of a specific type.
     */
    @Transactional(readOnly = true)
    public Page<ActivityLog> getActivitiesByType(ActivityLog.ActivityType type, Pageable pageable) {
        return activityLogRepository.findByActivityType(type, pageable);
    }

    /**
     * Retrieves activities within a date range.
     */
    @Transactional(readOnly = true)
    public Page<ActivityLog> getActivitiesByDateRange(LocalDateTime start, LocalDateTime end, Pageable pageable) {
        return activityLogRepository.findByDateRange(start, end, pageable);
    }

    /**
     * Retrieves the history of changes for a specific entity.
     */
    @Transactional(readOnly = true)
    public List<ActivityLog> getEntityHistory(String entityType, UUID entityId) {
        return activityLogRepository.findByEntity(entityType, entityId);
    }

    /**
     * Gets activity summary statistics since a given time.
     */
    @Transactional(readOnly = true)
    public List<Object[]> getActivitySummary(LocalDateTime since) {
        return activityLogRepository.countByActivityTypeGrouped(since);
    }

    // =================================================================
    // ORDER ACTIVITY LOG METHODS
    // =================================================================

    /**
     * Logs an order activity asynchronously.
     * 
     * @param orderId     The order ID
     * @param type        The order activity type
     * @param description Human-readable description
     * @param userId      The user who performed the action
     * @param oldValue    The previous value (e.g., old status)
     * @param newValue    The new value (e.g., new status)
     * @param ipAddress   The client's IP address
     */
    @Async
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void logOrderActivity(UUID orderId, OrderActivityLog.OrderActivityType type, 
                                 String description, UUID userId, String oldValue, 
                                 String newValue, String ipAddress) {
        OrderActivityLog activity = OrderActivityLog.builder()
                .orderId(orderId)
                .userId(userId)
                .activityType(type)
                .description(description)
                .oldValue(oldValue)
                .newValue(newValue)
                .ipAddress(ipAddress)
                .createdAt(LocalDateTime.now())
                .build();
        orderActivityLogRepository.save(activity);
    }

    /**
     * Retrieves all activities for a specific order.
     */
    @Transactional(readOnly = true)
    public Page<OrderActivityLog> getOrderActivities(UUID orderId, Pageable pageable) {
        return orderActivityLogRepository.findByOrderIdOrderByCreatedAtDesc(orderId, pageable);
    }

    /**
     * Retrieves activities for a specific user.
     */
    @Transactional(readOnly = true)
    public Page<OrderActivityLog> getOrderActivitiesByUser(UUID userId, Pageable pageable) {
        return orderActivityLogRepository.findByUserId(userId, pageable);
    }

    /**
     * Retrieves activities by order ID and activity type.
     */
    @Transactional(readOnly = true)
    public List<OrderActivityLog> getOrderActivitiesByType(UUID orderId, OrderActivityLog.OrderActivityType type) {
        return orderActivityLogRepository.findByOrderIdAndType(orderId, type);
    }

    /**
     * Retrieves recent order activities.
     */
    @Transactional(readOnly = true)
    public List<OrderActivityLog> getRecentOrderActivities(int limit) {
        return orderActivityLogRepository.findRecentActivities(
                LocalDateTime.now().minusHours(24), Pageable.ofSize(limit));
    }

    /**
     * Gets activity summary for a specific order.
     */
    @Transactional(readOnly = true)
    public List<Object[]> getOrderActivitySummary(UUID orderId) {
        return orderActivityLogRepository.countByActivityTypeForOrder(orderId);
    }

    // =================================================================
    // PAYMENT ACTIVITY LOG METHODS
    // =================================================================

    /**
     * Logs a payment activity asynchronously.
     * 
     * @param userId       The user ID
     * @param type         The payment activity type
     * @param description  Human-readable description
     * @param amount      The payment amount
     * @param paymentMethod The payment method used
     * @param status      The payment status
     * @param paymentId   The payment ID
     * @param ipAddress   The client's IP address
     */
    @Async
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void logPaymentActivity(UUID userId, PaymentActivityLog.PaymentActivityType type, 
                                  String description, BigDecimal amount, String paymentMethod,
                                  String status, UUID paymentId, String ipAddress) {
        PaymentActivityLog activity = PaymentActivityLog.builder()
                .userId(userId)
                .paymentId(paymentId)
                .activityType(type)
                .description(description)
                .amount(amount)
                .paymentMethod(paymentMethod)
                .status(status)
                .ipAddress(ipAddress)
                .createdAt(LocalDateTime.now())
                .build();
        paymentActivityLogRepository.save(activity);
        log.debug("Payment activity logged: {} for user: {}", type, userId);
    }

    /**
     * Retrieves all payment activities for a specific user.
     */
    @Transactional(readOnly = true)
    public Page<PaymentActivityLog> getUserPaymentActivities(UUID userId, Pageable pageable) {
        return paymentActivityLogRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable);
    }

    /**
     * Retrieves payment activities by user ID and activity type.
     */
    @Transactional(readOnly = true)
    public Page<PaymentActivityLog> getPaymentActivitiesByType(UUID userId, PaymentActivityLog.PaymentActivityType type, Pageable pageable) {
        return paymentActivityLogRepository.findByUserIdAndType(userId, type, pageable);
    }

    /**
     * Retrieves payment activities within a date range.
     */
    @Transactional(readOnly = true)
    public Page<PaymentActivityLog> getPaymentActivitiesByDateRange(UUID userId, LocalDateTime start, LocalDateTime end, Pageable pageable) {
        return paymentActivityLogRepository.findByUserIdAndDateRange(userId, start, end, pageable);
    }

    /**
     * Gets payment activity summary for a user.
     */
    @Transactional(readOnly = true)
    public List<Object[]> getPaymentActivitySummary(UUID userId, int days) {
        return paymentActivityLogRepository.getActivitySummary(userId, LocalDateTime.now().minusDays(days));
    }

    /**
     * Gets total amount spent by user within a time period.
     */
    @Transactional(readOnly = true)
    public BigDecimal getTotalSpent(UUID userId, int days) {
        return paymentActivityLogRepository.getTotalSpent(userId, LocalDateTime.now().minusDays(days));
    }
}
