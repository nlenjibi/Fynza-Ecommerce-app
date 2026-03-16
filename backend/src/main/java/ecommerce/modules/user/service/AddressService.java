package ecommerce.modules.user.service;

import ecommerce.modules.user.dto.AddressCreateRequest;
import ecommerce.modules.user.dto.AddressDto;

import java.util.List;
import java.util.UUID;

public interface AddressService {

    /**
     * Get all addresses for a specific user
     */
    List<AddressDto> getAddressesByUserId(UUID userId);

    /**
     * Get a specific address by ID (ensuring it belongs to the user)
     */
    AddressDto getAddressById(UUID userId, UUID addressId);

    /**
     * Create a new address for a user
     * - Maximum 10 addresses per user
     * - If isDefault is true, clear other default addresses
     */
    AddressDto createAddress(UUID userId, AddressCreateRequest request);

    /**
     * Update an existing address
     */
    AddressDto updateAddress(UUID userId, UUID addressId, AddressCreateRequest request);

    /**
     * Delete an address
     */
    void deleteAddress(UUID userId, UUID addressId);

    /**
     * Set an address as the default
     */
    AddressDto setDefaultAddress(UUID userId, UUID addressId);
}
