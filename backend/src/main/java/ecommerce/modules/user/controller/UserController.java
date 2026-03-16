package ecommerce.modules.user.controller;

import ecommerce.common.response.ApiResponse;
import ecommerce.modules.user.dto.AddressRequest;
import ecommerce.modules.user.dto.UserDto;
import ecommerce.modules.user.entity.Address;
import ecommerce.modules.user.entity.User;
import ecommerce.modules.user.repository.AddressRepository;
import ecommerce.modules.user.repository.CustomerProfileRepository;
import ecommerce.modules.user.repository.UserRepository;
import ecommerce.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/customers")
@RequiredArgsConstructor
@Tag(name = "Customer Management", description = "Customer profile and address management endpoints")
public class UserController {

    private final UserRepository userRepository;
    private final CustomerProfileRepository customerProfileRepository;
    private final AddressRepository addressRepository;

    @GetMapping("/profile")
    @PreAuthorize("hasRole('CUSTOMER')")
    @Operation(summary = "Get customer profile", description = "Retrieve the authenticated customer's profile")
    public ResponseEntity<ApiResponse<UserDto>> getCustomerProfile(
            @AuthenticationPrincipal UserPrincipal principal) {
        UUID userId = principal.getId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        UserDto userDto = UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .phone(user.getPhone())
                .avatar(user.getAvatar())
                .dateOfBirth(user.getDateOfBirth())
                .build();
        
        return ResponseEntity.ok(ApiResponse.success("Profile retrieved successfully", userDto));
    }

    @PutMapping("/profile")
    @PreAuthorize("hasRole('CUSTOMER')")
    @Operation(summary = "Update customer profile", description = "Update the authenticated customer's profile")
    public ResponseEntity<ApiResponse<UserDto>> updateCustomerProfile(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody UserDto request) {
        UUID userId = principal.getId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (request.getFirstName() != null) {
            user.setFirstName(request.getFirstName());
        }
        if (request.getLastName() != null) {
            user.setLastName(request.getLastName());
        }
        if (request.getPhone() != null) {
            user.setPhone(request.getPhone());
        }
        if (request.getAvatar() != null) {
            user.setAvatar(request.getAvatar());
        }
        if (request.getDateOfBirth() != null) {
            user.setDateOfBirth(request.getDateOfBirth());
        }
        
        User updatedUser = userRepository.save(user);
        
        UserDto userDto = UserDto.builder()
                .id(updatedUser.getId())
                .email(updatedUser.getEmail())
                .firstName(updatedUser.getFirstName())
                .lastName(updatedUser.getLastName())
                .phone(updatedUser.getPhone())
                .avatar(updatedUser.getAvatar())
                .dateOfBirth(updatedUser.getDateOfBirth())
                .build();
        
        return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", userDto));
    }

    @GetMapping("/addresses")
    @PreAuthorize("hasRole('CUSTOMER')")
    @Operation(summary = "Get customer addresses", description = "Retrieve all addresses for the authenticated customer")
    public ResponseEntity<ApiResponse<List<Address>>> getCustomerAddresses(
            @AuthenticationPrincipal UserPrincipal principal) {
        UUID userId = principal.getId();
        List<Address> addresses = addressRepository.findByUserId(userId);
        return ResponseEntity.ok(ApiResponse.success("Addresses retrieved successfully", addresses));
    }

    @PostMapping("/addresses")
    @PreAuthorize("hasRole('CUSTOMER')")
    @Operation(summary = "Add customer address", description = "Add a new address for the authenticated customer")
    @Transactional
    public ResponseEntity<ApiResponse<Address>> addCustomerAddress(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody AddressRequest request) {
        UUID userId = principal.getId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (Boolean.TRUE.equals(request.getIsDefault())) {
            addressRepository.clearDefaultByUserId(userId);
        }
        
        Address address = Address.builder()
                .user(user)
                .label(request.getLabel())
                .streetAddress(request.getStreetAddress())
                .city(request.getCity())
                .state(request.getState())
                .postalCode(request.getPostalCode())
                .country(request.getCountry())
                .isDefault(request.getIsDefault() != null ? request.getIsDefault() : false)
                .build();
        
        Address savedAddress = addressRepository.save(address);
        return ResponseEntity.ok(ApiResponse.success("Address added successfully", savedAddress));
    }

    @PutMapping("/addresses/{id}")
    @PreAuthorize("hasRole('CUSTOMER')")
    @Operation(summary = "Update customer address", description = "Update an existing address for the authenticated customer")
    @Transactional
    public ResponseEntity<ApiResponse<Address>> updateCustomerAddress(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID id,
            @Valid @RequestBody AddressRequest request) {
        UUID userId = principal.getId();
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found"));
        
        if (!address.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized to update this address");
        }
        
        if (Boolean.TRUE.equals(request.getIsDefault())) {
            addressRepository.clearDefaultByUserId(userId);
        }
        
        if (request.getLabel() != null) {
            address.setLabel(request.getLabel());
        }
        if (request.getStreetAddress() != null) {
            address.setStreetAddress(request.getStreetAddress());
        }
        if (request.getCity() != null) {
            address.setCity(request.getCity());
        }
        if (request.getState() != null) {
            address.setState(request.getState());
        }
        if (request.getPostalCode() != null) {
            address.setPostalCode(request.getPostalCode());
        }
        if (request.getCountry() != null) {
            address.setCountry(request.getCountry());
        }
        if (request.getIsDefault() != null) {
            address.setIsDefault(request.getIsDefault());
        }
        
        Address updatedAddress = addressRepository.save(address);
        return ResponseEntity.ok(ApiResponse.success("Address updated successfully", updatedAddress));
    }

    @DeleteMapping("/addresses/{id}")
    @PreAuthorize("hasRole('CUSTOMER')")
    @Operation(summary = "Delete customer address", description = "Delete an address for the authenticated customer")
    @Transactional
    public ResponseEntity<ApiResponse<Void>> deleteCustomerAddress(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID id) {
        UUID userId = principal.getId();
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found"));
        
        if (!address.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized to delete this address");
        }
        
        addressRepository.delete(address);
        return ResponseEntity.ok(ApiResponse.success("Address deleted successfully", null));
    }
}
