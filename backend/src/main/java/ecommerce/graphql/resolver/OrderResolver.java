package ecommerce.graphql.resolver;

import ecommerce.common.enums.OrderStatus;
import ecommerce.common.response.PaginatedResponse;
import ecommerce.graphql.dto.OrderResponseDto;
import ecommerce.graphql.input.PageInput;
import ecommerce.graphql.input.SortDirection;
import ecommerce.modules.order.dto.CreateOrderRequest;
import ecommerce.modules.order.dto.OrderResponse;
import ecommerce.modules.order.dto.OrderStatsResponse;
import ecommerce.modules.order.dto.OrderStatusUpdateRequest;
import ecommerce.modules.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.ContextValue;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
@RequiredArgsConstructor
@Slf4j
public class OrderResolver {

    private final OrderService orderService;

    @QueryMapping
    public OrderResponse order(@Argument UUID id, @ContextValue UUID userId) {
        log.debug("GQL order(id={})", id);
        return orderService.getOrderById(id, userId);
    }

    @QueryMapping
    public OrderResponse orderByNumber(@Argument String orderNumber,
                                       @ContextValue UUID userId) {
        log.debug("GQL orderByNumber({})", orderNumber);
        return orderService.getOrderByOrderNumber(orderNumber, userId);
    }

    @QueryMapping
    public OrderResponseDto myOrders(@Argument PageInput pagination,
                                     @ContextValue UUID userId) {
        log.debug("GQL myOrders(user={})", userId);
        Page<OrderResponse> page = orderService.getUserOrders(userId, toPageable(pagination));
        return OrderResponseDto.builder()
                .content(page.getContent())
                .pageInfo(PaginatedResponse.from(page))
                .build();
    }

    @QueryMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public OrderResponseDto allOrders(@Argument PageInput pagination) {
        log.debug("GQL allOrders");
        Page<OrderResponse> page = orderService.getAllOrders(toPageable(pagination));
        return OrderResponseDto.builder()
                .content(page.getContent())
                .pageInfo(PaginatedResponse.from(page))
                .build();
    }

    @QueryMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public OrderResponseDto ordersByStatus(@Argument OrderStatus status,
                                           @Argument PageInput pagination) {
        log.debug("GQL ordersByStatus(status={})", status);
        Page<OrderResponse> page = orderService.getOrdersByStatus(status, toPageable(pagination));
        return OrderResponseDto.builder()
                .content(page.getContent())
                .pageInfo(PaginatedResponse.from(page))
                .build();
    }

    @QueryMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public OrderStatsResponse orderStatistics() {
        log.debug("GQL orderStatistics");
        return orderService.getOrderStatistics();
    }

    @QueryMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    public OrderResponseDto staffOrderManagement(@Argument PageInput pagination) {
        log.debug("GQL staffOrderManagement");
        Page<OrderResponse> page = orderService.getAllOrders(toPageable(pagination));
        return OrderResponseDto.builder()
                .content(page.getContent())
                .pageInfo(PaginatedResponse.from(page))
                .build();
    }

    // ==================== Mutations ====================

    @MutationMapping
    public OrderResponse createOrder(@Argument CreateOrderRequest input,
                                     @ContextValue UUID userId) {
        log.info("GQL createOrder(user={})", userId);
        return orderService.createOrder(input, userId);
    }

    @MutationMapping
    public OrderResponse cancelOrder(@Argument UUID id,
                                      @Argument String reason,
                                      @ContextValue UUID userId) {
        log.info("GQL cancelOrder(id={}, user={})", id, userId);
        return orderService.cancelOrder(id, userId, reason);
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public OrderResponse cancelOrderAdmin(@Argument UUID id,
                                          @Argument String reason) {
        log.info("GQL cancelOrderAdmin(id={})", id);
        return orderService.cancelOrder(id, reason);
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public OrderResponse updateOrderStatus(@Argument UUID id,
                                           @Argument OrderStatusUpdateRequest request) {
        log.info("GQL updateOrderStatus(id={})", id);
        return orderService.updateOrderStatus(id, request);
    }

    private Pageable toPageable(PageInput input) {
        if (input == null) {
            return PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "createdAt"));
        }
        Sort sort = input.getDirection() == SortDirection.DESC
                ? Sort.by(input.getSortBy()).descending()
                : Sort.by(input.getSortBy()).ascending();
        return PageRequest.of(input.getPage(), input.getSize(), sort);
    }
}
