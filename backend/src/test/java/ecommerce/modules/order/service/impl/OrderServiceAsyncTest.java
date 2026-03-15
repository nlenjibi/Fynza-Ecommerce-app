package ecommerce.modules.order.service.impl;

import ecommerce.modules.cart.entity.Cart;
import ecommerce.modules.cart.entity.CartItem;
import ecommerce.modules.cart.repository.CartItemRepository;
import ecommerce.modules.cart.repository.CartRepository;
import ecommerce.modules.integration.dto.IntegrationResult;
import ecommerce.modules.integration.service.IntegrationService;
import ecommerce.modules.notification.service.SellerNotificationService;
import ecommerce.modules.order.dto.CreateOrderRequest;
import ecommerce.modules.order.dto.OrderResponse;
import ecommerce.modules.order.entity.Order;
import ecommerce.modules.order.mapper.OrderMapper;
import ecommerce.modules.order.repository.OrderItemRepository;
import ecommerce.modules.order.repository.OrderRepository;
import ecommerce.modules.order.repository.OrderTimelineRepository;
import ecommerce.modules.product.entity.Product;
import ecommerce.modules.product.repository.ProductRepository;
import ecommerce.modules.product.service.InventoryService;
import ecommerce.modules.search.async.SearchIndexingService;
import ecommerce.modules.user.entity.User;
import ecommerce.modules.user.repository.AddressRepository;
import ecommerce.modules.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationEventPublisher;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class OrderServiceAsyncTest {

    @Mock private OrderRepository orderRepository;
    @Mock private OrderItemRepository orderItemRepository;
    @Mock private OrderTimelineRepository orderTimelineRepository;
    @Mock private CartRepository cartRepository;
    @Mock private CartItemRepository cartItemRepository;
    @Mock private AddressRepository addressRepository;
    @Mock private UserRepository userRepository;
    @Mock private ProductRepository productRepository;
    @Mock private InventoryService inventoryService;
    @Mock private SellerNotificationService sellerNotificationService;
    @Mock private OrderMapper orderMapper;
    @Mock private IntegrationService integrationService;
    @Mock private SearchIndexingService searchIndexingService;
    @Mock private ApplicationEventPublisher eventPublisher;

    @InjectMocks
    private OrderServiceImpl orderService;

    private UUID customerId;
    private User customer;
    private Product product;
    private Cart cart;
    private CartItem cartItem;

    @BeforeEach
    void setUp() {
        customerId = UUID.randomUUID();
        customer = User.builder().id(customerId).email("test@example.com").build();
        
        product = Product.builder()
                .id(UUID.randomUUID())
                .name("Test Product")
                .price(new BigDecimal("100.00"))
                .stock(10)
                .build();
        
        cartItem = CartItem.builder()
                .product(product)
                .quantity(2)
                .build();
        
        cart = Cart.builder()
                .id(UUID.randomUUID())
                .user(customer)
                .items(Collections.singletonList(cartItem))
                .build();
    }

    @Test
    void testCreateOrderSuccessfulAsyncFlow() {
        // Prepare
        CreateOrderRequest request = new CreateOrderRequest();
        
        when(userRepository.findById(customerId)).thenReturn(Optional.of(customer));
        when(cartRepository.findByUserIdWithItems(customerId)).thenReturn(Optional.of(cart));
        when(orderRepository.save(any(Order.class))).thenAnswer(i -> i.getArguments()[0]);
        
        // Mock Async components
        when(inventoryService.reserveStock(any(), anyInt()))
                .thenReturn(CompletableFuture.completedFuture(true));
        when(integrationService.processAllIntegrations(any(), any(), anyDouble(), any(), any(), any()))
                .thenReturn(CompletableFuture.completedFuture(new IntegrationResult(true, true, true, BigDecimal.TEN)));
        when(sellerNotificationService.notifySellerOfOrder(any(), any(), any(), any(), anyInt()))
                .thenReturn(CompletableFuture.completedFuture(true));

        // Execute
        OrderResponse response = orderService.createOrder(customerId, request);

        // Verify
        assertNotNull(response);
        verify(orderRepository).save(any(Order.class));
        verify(inventoryService).reserveStock(eq(product.getId()), eq(2));
        verify(integrationService).processAllIntegrations(any(), any(), anyDouble(), any(), any(), eq(customerId));
        verify(sellerNotificationService).notifySellerOfOrder(any(), any(), any(), eq("Test Product"), eq(2));
        verify(cartItemRepository).deleteByCartId(cart.getId());
    }

    @Test
    void testCreateOrderRollbackOnReservationFailure() {
        // Prepare
        CreateOrderRequest request = new CreateOrderRequest();
        
        when(userRepository.findById(customerId)).thenReturn(Optional.of(customer));
        when(cartRepository.findByUserIdWithItems(customerId)).thenReturn(Optional.of(cart));
        when(orderRepository.save(any(Order.class))).thenAnswer(i -> {
            Order o = (Order) i.getArguments()[0];
            o.setId(UUID.randomUUID());
            return o;
        });
        
        // Mock stock failure
        when(inventoryService.reserveStock(any(), anyInt()))
                .thenReturn(CompletableFuture.completedFuture(false));
        when(inventoryService.restoreStock(any(), anyInt()))
                .thenReturn(CompletableFuture.completedFuture(true));

        // Execute & Verify
        assertThrows(IllegalStateException.class, () -> 
                orderService.createOrder(customerId, request));
        
        verify(inventoryService).restoreStock(eq(product.getId()), eq(2));
        verify(cartItemRepository, never()).deleteByCartId(any());
    }
}
