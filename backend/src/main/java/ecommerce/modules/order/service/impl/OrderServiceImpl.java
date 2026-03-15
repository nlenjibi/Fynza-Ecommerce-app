package ecommerce.modules.order.service.impl;

import ecommerce.common.enums.OrderStatus;
import ecommerce.common.enums.PaymentStatus;
import ecommerce.exception.ResourceNotFoundException;
import ecommerce.exception.UnauthorizedException;
import ecommerce.modules.order.dto.*;
import ecommerce.modules.order.entity.Order;
import ecommerce.modules.order.mapper.OrderMapper;
import ecommerce.modules.order.repository.OrderRepository;
import ecommerce.modules.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;

    @Override
    @Transactional
    public OrderResponse createOrder(CreateOrderRequest request, UUID userId) {
        log.info("Creating order for user: {}", userId);
        // Implementation logic
        return null;
    }

    @Override
    public OrderResponse getOrderById(UUID id, UUID userId) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "id", id));
        
        if (userId != null && !order.getCustomer().getId().equals(userId)) {
            throw new UnauthorizedException("You are not authorized to view this order");
        }
        
        return orderMapper.toResponse(order);
    }

    @Override
    public OrderResponse getOrderByOrderNumber(String orderNumber, UUID userId) {
        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "orderNumber", orderNumber));
        
        if (userId != null && !order.getCustomer().getId().equals(userId)) {
            throw new UnauthorizedException("You are not authorized to view this order");
        }
        
        return orderMapper.toResponse(order);
    }

    @Override
    public Page<OrderResponse> getUserOrders(UUID userId, Pageable pageable) {
        return orderRepository.findByCustomerId(userId, pageable)
                .map(orderMapper::toResponse);
    }

    @Override
    @Transactional
    public OrderResponse cancelOrder(UUID id, String reason) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "id", id));
        
        order.setStatus(OrderStatus.CANCELLED);
        order.setNotes(reason);
        // order.setCancelledAt(LocalDateTime.now());
        
        return orderMapper.toResponse(orderRepository.save(order));
    }

    @Override
    @Transactional
    public OrderResponse cancelOrder(UUID id, UUID userId) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "id", id));
        
        if (!order.getCustomer().getId().equals(userId)) {
            throw new UnauthorizedException("You are not authorized to cancel this order");
        }
        
        if (order.getStatus() != OrderStatus.PENDING) {
            throw new IllegalStateException("Only PENDING orders can be cancelled");
        }
        
        order.setStatus(OrderStatus.CANCELLED);
        // order.setCancelledAt(LocalDateTime.now());
        
        return orderMapper.toResponse(orderRepository.save(order));
    }

    @Override
    public Page<OrderResponse> getAllOrders(Pageable pageable) {
        return orderRepository.findAll(pageable)
                .map(orderMapper::toResponse);
    }

    @Override
    public Page<OrderResponse> getOrdersByStatus(OrderStatus status, Pageable pageable) {
        return orderRepository.findByStatus(status, pageable)
                .map(orderMapper::toResponse);
    }

    @Override
    @Transactional
    public OrderResponse updateOrderStatus(UUID id, OrderStatus status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "id", id));
        
        order.setStatus(status);
        if (status == OrderStatus.PAID) {
            order.setPaymentStatus(PaymentStatus.PAID);
        }
        
        return orderMapper.toResponse(orderRepository.save(order));
    }

    @Override
    @Transactional
    public OrderResponse updateOrderStatus(UUID id, OrderStatusUpdateRequest request) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "id", id));
        
        if (request.getStatus() != null) {
            order.setStatus(request.getStatus());
        }
        if (request.getNotes() != null) {
            order.setNotes(request.getNotes());
        }
        
        return orderMapper.toResponse(orderRepository.save(order));
    }

    @Override
    public OrderStatsResponse getOrderStatistics() {
        // Implementation logic
        return null;
    }
}
