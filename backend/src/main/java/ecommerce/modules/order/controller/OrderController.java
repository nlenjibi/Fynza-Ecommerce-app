package ecommerce.modules.order.controller;

import ecommerce.common.response.ApiResponse;
import ecommerce.common.response.PaginatedResponse;
import ecommerce.modules.order.dto.OrderResponse;
import ecommerce.modules.order.dto.OrderStatusUpdateRequest;
import ecommerce.security.UserPrincipal;
import ecommerce.modules.order.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("api/v1/customers/orders")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Customer Orders", description = "Customer order management endpoints")
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    @Operation(summary = "Get customer orders", description = "Get all orders for the authenticated customer")
    public ResponseEntity<ApiResponse<PaginatedResponse<OrderResponse>>> getCustomerOrders(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") Sort.Direction direction) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        Page<OrderResponse> orders = orderService.getUserOrders(principal.getId(), pageable);
        return ResponseEntity.ok(ApiResponse.success("Orders retrieved successfully", PaginatedResponse.from(orders)));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('CUSTOMER')")
    @Operation(summary = "Get order detail", description = "Get order detail by ID for the authenticated customer")
    public ResponseEntity<ApiResponse<OrderResponse>> getOrderDetail(
            @PathVariable UUID id,
            @AuthenticationPrincipal UserPrincipal principal) {
        OrderResponse order = orderService.getOrderById(id, principal.getId());
        return ResponseEntity.ok(ApiResponse.success("Order retrieved successfully", order));
    }

    @PostMapping("/{id}/cancel")
    @PreAuthorize("hasRole('CUSTOMER')")
    @Operation(summary = "Cancel order", description = "Cancel an order by ID for the authenticated customer")
    public ResponseEntity<ApiResponse<OrderResponse>> cancelOrder(
            @PathVariable UUID id,
            @RequestBody(required = false) OrderStatusUpdateRequest request,
            @AuthenticationPrincipal UserPrincipal principal) {
        String reason = request != null ? request.getNotes() : null;
        OrderResponse order = orderService.cancelOrder(id, reason);
        return ResponseEntity.ok(ApiResponse.success("Order cancelled successfully", order));
    }
}
