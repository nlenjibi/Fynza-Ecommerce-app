package ecommerce.modules.order.repository;

import ecommerce.common.base.BaseRepository;
import ecommerce.modules.order.entity.Order;
import ecommerce.common.enums.OrderStatus;
import ecommerce.modules.order.entity.PaymentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrderRepository extends BaseRepository<Order, UUID> {
    
    @EntityGraph(attributePaths = {"customer", "orderItems", "orderItems.product", "shippingAddress", "billingAddress"})
    Page<Order> findByCustomerId(UUID customerId, Pageable pageable);
    
    @EntityGraph(attributePaths = {"customer", "orderItems", "orderItems.product", "shippingAddress", "billingAddress"})
    Optional<Order> findByOrderNumber(String orderNumber);
    
    @EntityGraph(attributePaths = {"customer", "orderItems", "orderItems.product", "shippingAddress", "billingAddress"})
    Optional<Order> findById(UUID id);
    
    @EntityGraph(attributePaths = {"customer", "orderItems", "orderItems.product", "shippingAddress", "billingAddress"})
    Page<Order> findAll(Pageable pageable);
    
    long countByStatus(OrderStatus status);
    
    @EntityGraph(attributePaths = {"customer", "orderItems", "orderItems.product", "shippingAddress", "billingAddress"})
    Page<Order> findByStatus(OrderStatus status, Pageable pageable);
    
    boolean existsByCustomerIdAndProductId(UUID customerId, UUID productId);
    
    @Query("SELECT DISTINCT o FROM Order o LEFT JOIN FETCH o.orderItems oi LEFT JOIN FETCH oi.product WHERE o.customer.id IN :customerIds")
    List<Order> findByCustomerIdIn(@Param("customerIds") List<UUID> customerIds);
    
    @Query("SELECT DISTINCT o FROM Order o LEFT JOIN FETCH o.orderItems oi LEFT JOIN FETCH oi.product WHERE o.id IN :orderIds")
    List<Order> findByIdIn(@Param("orderIds") List<UUID> orderIds);

    @Query("SELECT COUNT(o) FROM Order o WHERE o.payment.status = :paymentStatus AND o.isActive = true")
    long countByPaymentStatusAndIsActiveTrue(@Param("paymentStatus") PaymentStatus paymentStatus);

    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o WHERE o.status = 'COMPLETED' OR o.status = 'PAID'")
    BigDecimal calculateTotalRevenue();

    @EntityGraph(attributePaths = {"customer", "orderItems", "orderItems.product", "shippingAddress", "billingAddress"})
    Page<Order> findBySellerId(@Param("sellerId") UUID sellerId, Pageable pageable);

    @EntityGraph(attributePaths = {"customer", "orderItems", "orderItems.product", "shippingAddress", "billingAddress"})
    List<Order> findBySellerId(@Param("sellerId") UUID sellerId);
}
