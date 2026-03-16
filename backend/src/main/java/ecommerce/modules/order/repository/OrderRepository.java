package ecommerce.modules.order.repository;

import ecommerce.common.base.BaseRepository;
import ecommerce.modules.order.entity.Order;
import ecommerce.common.enums.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrderRepository extends BaseRepository<Order, UUID> {
    
    Page<Order> findByCustomerId(UUID customerId, Pageable pageable);
    
    Optional<Order> findByOrderNumber(String orderNumber);
    
    long countByStatus(OrderStatus status);
    
    Page<Order> findByStatus(OrderStatus status, Pageable pageable);
    
    boolean existsByCustomerIdAndProductId(UUID customerId, UUID productId);
}
