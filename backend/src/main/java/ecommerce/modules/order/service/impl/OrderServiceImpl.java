package ecommerce.modules.order.service.impl;

import ecommerce.common.enums.OrderStatus;
import ecommerce.common.enums.PaymentMethod;
import ecommerce.common.enums.PaymentStatus;
import ecommerce.exception.BadRequestException;
import ecommerce.exception.ResourceNotFoundException;
import ecommerce.exception.UnauthorizedException;
import ecommerce.modules.cart.entity.Cart;
import ecommerce.modules.cart.repository.CartRepository;
import ecommerce.modules.coupon.service.CouponService;
import ecommerce.modules.order.dto.*;
import ecommerce.modules.order.entity.Order;
import ecommerce.modules.order.entity.OrderItem;
import ecommerce.modules.order.mapper.OrderMapper;
import ecommerce.modules.order.repository.OrderRepository;
import ecommerce.modules.order.service.OrderService;
import ecommerce.modules.product.repository.ProductRepository;
import ecommerce.modules.user.entity.Address;
import ecommerce.modules.user.entity.User;
import ecommerce.modules.user.repository.AddressRepository;
import ecommerce.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final CartRepository cartRepository;
    private final CouponService couponService;
    private final ProductRepository productRepository;

    private static final BigDecimal TAX_RATE = BigDecimal.valueOf(0.1);
    private static final BigDecimal FREE_SHIPPING_THRESHOLD = BigDecimal.valueOf(50);
    private static final BigDecimal SHIPPING_COST = BigDecimal.valueOf(5.99);

    @Override
    @Transactional
    public OrderResponse createOrder(CreateOrderRequest request, UUID userId) {
        log.info("Creating order for user: {}", userId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        Cart cart = cartRepository.findByUserIdWithItems(userId)
                .orElseThrow(() -> new BadRequestException("Cart is empty or not found"));

        if (cart.getItems() == null || cart.getItems().isEmpty()) {
            throw new BadRequestException("Cart is empty");
        }

        Address shippingAddress = null;
        if (request.getShippingAddressId() != null) {
            shippingAddress = addressRepository.findById(request.getShippingAddressId())
                    .orElseThrow(() -> new ResourceNotFoundException("Shipping address not found"));
            if (!shippingAddress.getUser().getId().equals(userId)) {
                throw new UnauthorizedException("Address does not belong to user");
            }
        }

        Address billingAddress = null;
        if (request.getBillingAddressId() != null) {
            billingAddress = addressRepository.findById(request.getBillingAddressId())
                    .orElseThrow(() -> new ResourceNotFoundException("Billing address not found"));
            if (!billingAddress.getUser().getId().equals(userId)) {
                throw new UnauthorizedException("Address does not belong to user");
            }
        }

        if (shippingAddress == null && billingAddress == null) {
            throw new BadRequestException("Shipping or billing address is required");
        }

        BigDecimal subtotal = calculateSubtotal(cart);
        BigDecimal discount = BigDecimal.ZERO;

        if (cart.getCouponCode() != null && !cart.getCouponCode().isBlank()) {
            try {
                var coupon = couponService.validate(cart.getCouponCode(), subtotal);
                if (coupon.getDiscountType() == ecommerce.common.enums.DiscountType.PERCENTAGE) {
                    discount = subtotal.multiply(coupon.getDiscountValue()).divide(BigDecimal.valueOf(100));
                } else {
                    discount = coupon.getDiscountValue();
                }
            } catch (Exception e) {
                log.warn("Coupon validation failed: {}", e.getMessage());
            }
        }

        BigDecimal tax = subtotal.subtract(discount).multiply(TAX_RATE);
        BigDecimal shippingCost = subtotal.compareTo(FREE_SHIPPING_THRESHOLD) >= 0 
                ? BigDecimal.ZERO 
                : SHIPPING_COST;
        BigDecimal total = subtotal.subtract(discount).add(tax).add(shippingCost);

        String orderNumber = generateOrderNumber();

        Order order = Order.builder()
                .orderNumber(orderNumber)
                .customer(user)
                .status(OrderStatus.PENDING)
                .subtotal(subtotal)
                .tax(tax)
                .shippingCost(shippingCost)
                .discount(discount)
                .totalAmount(total)
                .shippingAddress(shippingAddress)
                .billingAddress(billingAddress != null ? billingAddress : shippingAddress)
                .paymentStatus(PaymentStatus.PENDING)
                .couponCode(cart.getCouponCode())
                .build();

        if (request.getPaymentMethod() != null) {
            try {
                order.setPaymentMethod(PaymentMethod.valueOf(request.getPaymentMethod().toUpperCase()));
            } catch (IllegalArgumentException e) {
                log.warn("Invalid payment method: {}", request.getPaymentMethod());
            }
        }

        for (var cartItem : cart.getItems()) {
            var product = cartItem.getProduct();
            BigDecimal itemPrice = cartItem.getPrice();
            BigDecimal itemSubtotal = itemPrice.multiply(BigDecimal.valueOf(cartItem.getQuantity()));

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantity(cartItem.getQuantity())
                    .price(itemPrice)
                    .subtotal(itemSubtotal)
                    .build();

            order.addOrderItem(orderItem);

            productRepository.releaseReservedStockAndIsActiveTrue(product.getId(), cartItem.getQuantity());
        }

        Order savedOrder = orderRepository.save(order);

        cart.getItems().clear();
        cart.setCouponCode(null);
        cartRepository.save(cart);

        log.info("Order created successfully with order number: {}", orderNumber);
        return orderMapper.toResponse(savedOrder);
    }

    private BigDecimal calculateSubtotal(Cart cart) {
        BigDecimal subtotal = BigDecimal.ZERO;
        for (var item : cart.getItems()) {
            subtotal = subtotal.add(item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
        }
        return subtotal;
    }

    private String generateOrderNumber() {
        String timestamp = String.valueOf(System.currentTimeMillis()).substring(5);
        String random = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        return "ORD-" + timestamp + "-" + random;
    }

    @Override
    @Transactional(readOnly = true)
    public OrderResponse getOrderById(UUID id, UUID userId) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.forResource("Order", id));
        
        if (userId != null && !order.getCustomer().getId().equals(userId)) {
            throw new UnauthorizedException("You are not authorized to view this order");
        }
        
        return orderMapper.toResponse(order);
    }

    @Override
    @Transactional(readOnly = true)
    public OrderResponse getOrderByOrderNumber(String orderNumber, UUID userId) {
        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with orderNumber: " + orderNumber));
        
        if (userId != null && !order.getCustomer().getId().equals(userId)) {
            throw new UnauthorizedException("You are not authorized to view this order");
        }
        
        return orderMapper.toResponse(order);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<OrderResponse> getUserOrders(UUID userId, Pageable pageable) {
        return orderRepository.findByCustomerId(userId, pageable)
                .map(orderMapper::toResponse);
    }

    @Override
    @Transactional
    public OrderResponse cancelOrder(UUID id, String reason) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.forResource("Order", id));
        
        order.setStatus(OrderStatus.CANCELLED);
        order.setNotes(reason);
        
        return orderMapper.toResponse(orderRepository.save(order));
    }

    @Override
    @Transactional
    public OrderResponse cancelOrder(UUID id, UUID userId) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.forResource("Order", id));
        
        if (!order.getCustomer().getId().equals(userId)) {
            throw new UnauthorizedException("You are not authorized to cancel this order");
        }
        
        if (order.getStatus() != OrderStatus.PENDING) {
            throw new IllegalStateException("Only PENDING orders can be cancelled");
        }
        
        order.setStatus(OrderStatus.CANCELLED);
        
        return orderMapper.toResponse(orderRepository.save(order));
    }

    @Override
    @Transactional
    public OrderResponse cancelOrder(UUID id, UUID userId, String reason) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.forResource("Order", id));
        
        if (!order.getCustomer().getId().equals(userId)) {
            throw new UnauthorizedException("You are not authorized to cancel this order");
        }
        
        if (order.getStatus() != OrderStatus.PENDING) {
            throw new IllegalStateException("Only PENDING orders can be cancelled");
        }
        
        order.setStatus(OrderStatus.CANCELLED);
        if (reason != null && !reason.isBlank()) {
            order.setNotes(reason);
        }
        
        return orderMapper.toResponse(orderRepository.save(order));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<OrderResponse> getAllOrders(Pageable pageable) {
        return orderRepository.findAll(pageable)
                .map(orderMapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<OrderResponse> getOrdersByStatus(OrderStatus status, Pageable pageable) {
        return orderRepository.findByStatus(status, pageable)
                .map(orderMapper::toResponse);
    }

    @Override
    @Transactional
    public OrderResponse updateOrderStatus(UUID id, OrderStatus status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.forResource("Order", id));
        
        order.setStatus(status);
        if (status == OrderStatus.CONFIRMED) {
            order.setPaymentStatus(PaymentStatus.PAID);
        }
        
        return orderMapper.toResponse(orderRepository.save(order));
    }

    @Override
    @Transactional
    public OrderResponse updateOrderStatus(UUID id, OrderStatusUpdateRequest request) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.forResource("Order", id));
        
        if (request.getStatus() != null) {
            order.setStatus(request.getStatus());
        }
        if (request.getNotes() != null) {
            order.setNotes(request.getNotes());
        }
        
        return orderMapper.toResponse(orderRepository.save(order));
    }

    @Override
    @Transactional(readOnly = true)
    public OrderStatsResponse getOrderStatistics() {
        return OrderStatsResponse.builder()
                .totalOrders(orderRepository.count())
                .pendingOrders(orderRepository.countByStatus(OrderStatus.PENDING))
                .processingOrders(orderRepository.countByStatus(OrderStatus.PROCESSING))
                .shippedOrders(orderRepository.countByStatus(OrderStatus.SHIPPED))
                .deliveredOrders(orderRepository.countByStatus(OrderStatus.DELIVERED))
                .cancelledOrders(orderRepository.countByStatus(OrderStatus.CANCELLED))
                .build();
    }
}
