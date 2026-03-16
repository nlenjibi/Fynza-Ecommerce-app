package ecommerce.modules.user.controller;

import ecommerce.common.response.ApiResponse;
import ecommerce.modules.user.dto.AddressDto;
import ecommerce.modules.user.dto.AddressRequest;
import ecommerce.modules.user.dto.UserDto;
import ecommerce.modules.user.entity.User;
import ecommerce.modules.user.repository.UserRepository;
import ecommerce.modules.user.service.UserService;
import ecommerce.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("api/v1/customers")
@RequiredArgsConstructor
@Tag(name = "Customer Management", description = "Customer profile and address management endpoints")
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    @PreAuthorize("hasRole('CUSTOMER')")
    @Operation(summary = "Get customer profile", description = "Retrieve the authenticated customer's profile")
    public ResponseEntity<ApiResponse<UserDto>> getCustomerProfile(
            @AuthenticationPrincipal UserPrincipal principal) {
        UUID userId = principal.getId();
        UserDto userDto = userService.getCustomerProfile(userId);
        return ResponseEntity.ok(ApiResponse.success("Profile retrieved successfully", userDto));
    }

    @PutMapping("/profile")
    @PreAuthorize("hasRole('CUSTOMER')")
    @Operation(summary = "Update customer profile", description = "Update the authenticated customer's profile")
    public ResponseEntity<ApiResponse<UserDto>> updateCustomerProfile(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody UserDto request) {
        UUID userId = principal.getId();
        UserDto userDto = userService.updateCustomerProfile(userId, request);
        return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", userDto));
    }

    @GetMapping("/addresses")
    @PreAuthorize("hasRole('CUSTOMER')")
    @Operation(summary = "Get customer addresses", description = "Retrieve all addresses for the authenticated customer")
    public ResponseEntity<ApiResponse<java.util.List<AddressDto>>> getCustomerAddresses(
            @AuthenticationPrincipal UserPrincipal principal) {
        UUID userId = principal.getId();
        java.util.List<AddressDto> addresses = userService.getCustomerAddresses(userId);
        return ResponseEntity.ok(ApiResponse.success("Addresses retrieved successfully", addresses));
    }

    @PostMapping("/addresses")
    @PreAuthorize("hasRole('CUSTOMER')")
    @Operation(summary = "Add customer address", description = "Add a new address for the authenticated customer")
    public ResponseEntity<ApiResponse<AddressDto>> addCustomerAddress(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody AddressRequest request) {
        UUID userId = principal.getId();
        AddressDto address = userService.addCustomerAddress(userId, request);
        return ResponseEntity.ok(ApiResponse.success("Address added successfully", address));
    }

    @PutMapping("/addresses/{id}")
    @PreAuthorize("hasRole('CUSTOMER')")
    @Operation(summary = "Update customer address", description = "Update an existing address for the authenticated customer")
    public ResponseEntity<ApiResponse<AddressDto>> updateCustomerAddress(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID id,
            @Valid @RequestBody AddressRequest request) {
        UUID userId = principal.getId();
        AddressDto address = userService.updateCustomerAddress(userId, id, request);
        return ResponseEntity.ok(ApiResponse.success("Address updated successfully", address));
    }

    @DeleteMapping("/addresses/{id}")
    @PreAuthorize("hasRole('CUSTOMER')")
    @Operation(summary = "Delete customer address", description = "Delete an address for the authenticated customer")
    public ResponseEntity<ApiResponse<Void>> deleteCustomerAddress(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID id) {
        UUID userId = principal.getId();
        userService.deleteCustomerAddress(userId, id);
        return ResponseEntity.ok(ApiResponse.success("Address deleted successfully", null));
    }
}
