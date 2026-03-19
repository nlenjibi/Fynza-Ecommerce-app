package ecommerce.modules.seller.controller;

import ecommerce.common.response.ApiResponse;
import ecommerce.modules.order.dto.OrderResponse;
import ecommerce.modules.order.dto.OrderStatusUpdateRequest;
import ecommerce.modules.product.dto.CreateProductRequest;
import ecommerce.modules.product.dto.ProductResponse;
import ecommerce.modules.product.dto.UpdateProductRequest;
import ecommerce.modules.product.service.ProductService;
import ecommerce.modules.review.dto.ReviewResponse;
import ecommerce.modules.seller.dto.SellerAnalyticsDto;
import ecommerce.modules.seller.dto.SellerAnalyticsResponse;
import ecommerce.modules.seller.dto.SellerDashboardResponse;
import ecommerce.modules.seller.dto.StoreResponse;
import ecommerce.modules.seller.dto.UpdateStoreRequest;
import ecommerce.modules.seller.service.SellerService;
import ecommerce.modules.tag.dto.TagResponse;
import ecommerce.security.UserPrincipal;
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
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/sellers")
@RequiredArgsConstructor
@Tag(name = "Seller Management", description = "Seller management endpoints")
public class SellerController {

    private final SellerService sellerService;
    private final ProductService productService;

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('SELLER')")
    @Operation(summary = "Get seller dashboard", description = "Get dashboard statistics for the authenticated seller")
    public ResponseEntity<ApiResponse<SellerDashboardResponse>> getDashboard(
            @AuthenticationPrincipal UserPrincipal principal) {
        SellerDashboardResponse dashboard = sellerService.getDashboard(principal.getId());
        return ResponseEntity.ok(ApiResponse.success("Dashboard retrieved successfully", dashboard));
    }

    @GetMapping("/products")
    @PreAuthorize("hasRole('SELLER')")
    @Operation(summary = "Get seller products", description = "Get all products for the authenticated seller")
    public ResponseEntity<ApiResponse<Page<ProductResponse>>> getProducts(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") Sort.Direction direction) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        UUID sellerId = UUID.fromString(principal.getId().toString());
        Page<ProductResponse> products = productService.findBySellerId(sellerId, pageable);
        return ResponseEntity.ok(ApiResponse.success("Products retrieved successfully", products));
    }

    @PostMapping("/products")
    @PreAuthorize("hasRole('SELLER')")
    @Operation(summary = "Create product", description = "Create a new product for the authenticated seller")
    public ResponseEntity<ApiResponse<ProductResponse>> createProduct(
            @Valid @RequestBody CreateProductRequest request,
            @AuthenticationPrincipal UserPrincipal principal,
            UriComponentsBuilder uriBuilder) {
        UUID sellerId = UUID.fromString(principal.getId().toString());
        ProductResponse response = productService.create(request, sellerId);
        var uri = uriBuilder.path("/api/v1/sellers/products/{id}").buildAndExpand(response.getId()).toUri();
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Product created successfully", response));
    }

    @PutMapping("/products/{id}")
    @PreAuthorize("hasRole('SELLER')")
    @Operation(summary = "Update product", description = "Update an existing product for the authenticated seller")
    public ResponseEntity<ApiResponse<ProductResponse>> updateProduct(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateProductRequest request,
            @AuthenticationPrincipal UserPrincipal principal) {
        ProductResponse existingProduct = productService.findById(id);
        
        boolean isOwner = existingProduct.getSeller() != null && 
                existingProduct.getSeller().getId().toString().equals(principal.getId().toString());
        
        if (!isOwner) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ApiResponse.error("You are not authorized to update this product"));
        }
        
        ProductResponse response = productService.update(id, request);
        return ResponseEntity.ok(ApiResponse.success("Product updated successfully", response));
    }

    @DeleteMapping("/products/{id}")
    @PreAuthorize("hasRole('SELLER')")
    @Operation(summary = "Delete product", description = "Delete a product for the authenticated seller")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(
            @PathVariable UUID id,
            @AuthenticationPrincipal UserPrincipal principal) {
        ProductResponse existingProduct = productService.findById(id);
        
        boolean isOwner = existingProduct.getSeller() != null && 
                existingProduct.getSeller().getId().toString().equals(principal.getId().toString());
        
        if (!isOwner) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ApiResponse.error("You are not authorized to delete this product"));
        }
        
        productService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Product deleted successfully", null));
    }

    @GetMapping("/orders")
    @PreAuthorize("hasRole('SELLER')")
    @Operation(summary = "Get seller orders", description = "Get all orders for the authenticated seller")
    public ResponseEntity<ApiResponse<Page<OrderResponse>>> getOrders(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") Sort.Direction direction) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        UUID sellerId = UUID.fromString(principal.getId().toString());
        Page<OrderResponse> orders = sellerService.getSellerOrders(sellerId, pageable);
        return ResponseEntity.ok(ApiResponse.success("Orders retrieved successfully", orders));
    }

    @PatchMapping("/orders/{id}/status")
    @PreAuthorize("hasRole('SELLER')")
    @Operation(summary = "Update order status", description = "Update order status for the authenticated seller")
    public ResponseEntity<ApiResponse<OrderResponse>> updateOrderStatus(
            @PathVariable UUID id,
            @RequestBody OrderStatusUpdateRequest request,
            @AuthenticationPrincipal UserPrincipal principal) {
        UUID sellerId = UUID.fromString(principal.getId().toString());
        OrderResponse order = sellerService.updateOrderStatus(id, request, sellerId);
        return ResponseEntity.ok(ApiResponse.success("Order status updated successfully", order));
    }

    @GetMapping("/analytics/sales")
    @PreAuthorize("hasRole('SELLER')")
    @Operation(summary = "Get sales analytics", description = "Get sales analytics for the authenticated seller")
    public ResponseEntity<ApiResponse<SellerAnalyticsResponse>> getSalesAnalytics(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestParam(defaultValue = "30") int days) {
        UUID sellerId = UUID.fromString(principal.getId().toString());
        SellerAnalyticsResponse analytics = sellerService.getSalesAnalytics(sellerId, days);
        return ResponseEntity.ok(ApiResponse.success("Sales analytics retrieved successfully", analytics));
    }

    @GetMapping("/analytics")
    @PreAuthorize("hasRole('SELLER')")
    @Operation(summary = "Get seller analytics", description = "Get comprehensive analytics for seller dashboard")
    public ResponseEntity<ApiResponse<SellerAnalyticsDto>> getAnalytics(
            @AuthenticationPrincipal UserPrincipal principal) {
        UUID sellerId = UUID.fromString(principal.getId().toString());
        SellerAnalyticsDto analytics = sellerService.getSellerAnalytics(sellerId);
        return ResponseEntity.ok(ApiResponse.success("Analytics retrieved successfully", analytics));
    }

    @GetMapping("/store")
    @PreAuthorize("hasRole('SELLER')")
    @Operation(summary = "Get store info", description = "Get store information for the authenticated seller")
    public ResponseEntity<ApiResponse<StoreResponse>> getStore(
            @AuthenticationPrincipal UserPrincipal principal) {
        UUID sellerId = UUID.fromString(principal.getId().toString());
        StoreResponse store = sellerService.getStore(sellerId);
        return ResponseEntity.ok(ApiResponse.success("Store retrieved successfully", store));
    }

    @PutMapping("/store")
    @PreAuthorize("hasRole('SELLER')")
    @Operation(summary = "Update store info", description = "Update store information for the authenticated seller")
    public ResponseEntity<ApiResponse<StoreResponse>> updateStore(
            @Valid @RequestBody UpdateStoreRequest request,
            @AuthenticationPrincipal UserPrincipal principal) {
        UUID sellerId = UUID.fromString(principal.getId().toString());
        StoreResponse store = sellerService.updateStore(sellerId, request);
        return ResponseEntity.ok(ApiResponse.success("Store updated successfully", store));
    }

    @GetMapping("/reviews")
    @PreAuthorize("hasRole('SELLER')")
    @Operation(summary = "Get seller reviews", description = "Get reviews for all products of the authenticated seller")
    public ResponseEntity<ApiResponse<Page<ReviewResponse>>> getSellerReviews(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        UUID sellerId = UUID.fromString(principal.getId().toString());
        Page<ReviewResponse> reviews = sellerService.getSellerReviews(sellerId, pageable);
        return ResponseEntity.ok(ApiResponse.success("Reviews retrieved successfully", reviews));
    }

    @GetMapping("/tags")
    @PreAuthorize("hasRole('SELLER')")
    @Operation(summary = "Get available tags", description = "Get all available tags for products")
    public ResponseEntity<ApiResponse<List<TagResponse>>> getTags() {
        return ResponseEntity.ok(ApiResponse.success(
                "Tags retrieved successfully",
                sellerService.getTags()));
    }

    @PostMapping("/products/{id}/tags")
    @PreAuthorize("hasRole('SELLER')")
    @Operation(summary = "Assign tags to product", description = "Assign tags to a product")
    public ResponseEntity<ApiResponse<Void>> assignTags(
            @PathVariable UUID id,
            @RequestBody List<String> tags,
            @AuthenticationPrincipal UserPrincipal principal) {
        UUID sellerId = UUID.fromString(principal.getId().toString());
        sellerService.assignTagsToProduct(id, tags, sellerId);
        return ResponseEntity.ok(ApiResponse.success("Tags assigned successfully", null));
    }
}
