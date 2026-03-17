package ecommerce.modules.admin.controller;

import ecommerce.common.response.ApiResponse;
import ecommerce.common.response.PaginatedResponse;
import ecommerce.modules.order.dto.OrderResponse;
import ecommerce.modules.order.dto.OrderStatusUpdateRequest;
import ecommerce.modules.order.service.OrderService;
import ecommerce.modules.product.dto.ProductResponse;
import ecommerce.modules.product.service.ProductService;
import ecommerce.modules.user.dto.UserDto;
import ecommerce.modules.user.dto.BulkUserUpdateRequest;
import ecommerce.modules.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@Tag(name = "Admin Management", description = "Admin management endpoints")
public class AdminController {

    private final OrderService orderService;
    private final ProductService productService;
    private final UserService userService;

    @GetMapping("/orders")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get all orders", description = "Get all orders for admin")
    public ResponseEntity<ApiResponse<PaginatedResponse<OrderResponse>>> getAllOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") Sort.Direction direction) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        Page<OrderResponse> orders = orderService.getAllOrders(pageable);
        return ResponseEntity.ok(ApiResponse.success("Orders retrieved successfully",PaginatedResponse.from(orders)));

            }

    @PutMapping("/orders/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update order status", description = "Update order status as admin")
    public ResponseEntity<ApiResponse<OrderResponse>> updateOrderStatus(
            @PathVariable UUID id,
            @RequestBody OrderStatusUpdateRequest request) {
        var updateRequest = new ecommerce.modules.order.dto.OrderUpdateRequest();
        updateRequest.setStatus(request.getStatus());
        updateRequest.setAdminNotes(request.getNotes());
        
        OrderResponse order = orderService.updateOrderStatus(id, updateRequest.getStatus());
        return ResponseEntity.ok(ApiResponse.success("Order status updated successfully", order));
    }

    @PutMapping("/products/{id}/inventory")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update product inventory", description = "Update product inventory as admin")
    public ResponseEntity<ApiResponse<ProductResponse>> updateInventory(
            @PathVariable UUID id,
            @RequestParam Integer stock) {
        ProductResponse product = productService.findById(id);
        
        var updateRequest = new ecommerce.modules.product.dto.UpdateProductRequest();
        updateRequest.setStock(stock);
        
        ProductResponse updated = productService.update(id, updateRequest);
        return ResponseEntity.ok(ApiResponse.success("Inventory updated successfully", updated));
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get all users", description = "Get paginated list of users")
    public ResponseEntity<ApiResponse<Page<UserDto>>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") Sort.Direction direction) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        Page<UserDto> users = userService.getAllUsers(pageable);
        return ResponseEntity.ok(ApiResponse.success("Users retrieved successfully", users));
    }

    @GetMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get user by ID", description = "Get a specific user by ID")
    public ResponseEntity<ApiResponse<UserDto>> getUserById(@PathVariable UUID id) {
        UserDto user = userService.getUserById(id)
                .orElseThrow(() -> new ecommerce.exception.ResourceNotFoundException("User not found"));
        return ResponseEntity.ok(ApiResponse.success("User retrieved successfully", user));
    }

    @PostMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create user", description = "Create a new user")
    public ResponseEntity<ApiResponse<UserDto>> createUser(
            @Valid @RequestBody ecommerce.modules.user.dto.UserCreateRequest request) {
        UserDto user = userService.createUser(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("User created successfully", user));
    }

    @PutMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update user", description = "Update an existing user")
    public ResponseEntity<ApiResponse<UserDto>> updateUser(
            @PathVariable UUID id,
            @Valid @RequestBody ecommerce.modules.user.dto.UserUpdateRequest request) {
        UserDto user = userService.updateUser(id, request);
        return ResponseEntity.ok(ApiResponse.success("User updated successfully", user));
    }

    @DeleteMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete user", description = "Soft delete a user")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable UUID id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(ApiResponse.success("User deleted successfully", null));
    }

    @PatchMapping("/users/{id}/role")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update user role", description = "Update user's role")
    public ResponseEntity<ApiResponse<UserDto>> updateUserRole(
            @PathVariable UUID id,
            @RequestParam String role) {
        UserDto user = userService.updateUserRole(id, 
                new ecommerce.modules.user.dto.UpdateUserRoleRequest(role));
        return ResponseEntity.ok(ApiResponse.success("User role updated successfully", user));
    }

    @PatchMapping("/users/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update user status", description = "Lock/unlock/activate user account")
    public ResponseEntity<ApiResponse<UserDto>> updateUserStatus(
            @PathVariable UUID id,
            @RequestParam Boolean isActive) {
        UserDto user = userService.updateUserStatus(id, 
                new ecommerce.modules.user.dto.UserStatusRequest(isActive));
        return ResponseEntity.ok(ApiResponse.success("User status updated successfully", user));
    }

    @PostMapping("/users/bulk-update")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Bulk update users", description = "Update multiple users at once (activate, deactivate, role change)")
    public ResponseEntity<ApiResponse<List<UserDto>>> bulkUpdateUsers(
            @Valid @RequestBody BulkUserUpdateRequest request) {
        List<UserDto> updatedUsers = userService.bulkUpdateUsers(request);
        return ResponseEntity.ok(ApiResponse.success(
                "Bulk update completed successfully. Updated " + updatedUsers.size() + " users.", 
                updatedUsers));
    }
}
