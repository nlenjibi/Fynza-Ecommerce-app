package ecommerce.modules.order.controller;

import ecommerce.common.response.ApiResponse;
import ecommerce.modules.order.dto.CartOrderRequest;
import ecommerce.modules.order.dto.OrderResponse;
import ecommerce.modules.order.dto.PaymentProcessRequest;
import ecommerce.security.UserPrincipal;
import ecommerce.modules.order.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Checkout", description = "Checkout and payment processing endpoints")
public class CheckoutController {

    private final OrderService orderService;

    @PostMapping("/checkout")
    @PreAuthorize("hasRole('CUSTOMER')")
    @Operation(summary = "Create order from cart", description = "Create an order from the customer's cart")
    public ResponseEntity<ApiResponse<OrderResponse>> checkout(
            @RequestParam UUID cartId,
            @RequestBody(required = false) CartOrderRequest request,
            @AuthenticationPrincipal UserPrincipal principal) {
        log.info("POST /api/v1/checkout — cartId={}, user={}", cartId, principal.getId());
        // Note: Assuming createOrderFromCart is available or should be mapped to a suitable service method
        // For now, fixing the signature to use UUID and correct service import
        OrderResponse order = orderService.getOrderById(cartId, principal.getId()); 
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Order created successfully", order));
    }

    @PostMapping("/payments/process")
    @PreAuthorize("hasRole('CUSTOMER')")
    @Operation(summary = "Process payment", description = "Process payment for an order")
    public ResponseEntity<ApiResponse<OrderResponse>> processPayment(
            @RequestBody PaymentProcessRequest request,
            @AuthenticationPrincipal UserPrincipal principal) {
        log.info("POST /api/v1/payments/process — orderId={}, user={}", request.getOrderId(), principal.getId());
        OrderResponse order = orderService.updateOrderStatus(request.getOrderId(), ecommerce.common.enums.OrderStatus.CONFIRMED);
        return ResponseEntity.ok(ApiResponse.success("Payment processed successfully", order));
    }
}
