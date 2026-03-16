package ecommerce.modules.user.service;

import com.querydsl.core.types.Predicate;
import ecommerce.modules.user.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserService {
    UserDto createUser(UserCreateRequest request);
    Optional<UserDto> getUserById(UUID id);

    Page<UserDto> getAllUsers(Pageable pageable);
    UserDto updateUser(UUID id, UserUpdateRequest request);
    void deleteUser(UUID id);

    void changePassword(UUID userId, ChangePasswordRequest request);
    UserDto updateUserRole(UUID userId, UpdateUserRoleRequest request);
    UserDto updateUserStatus(UUID userId, UserStatusRequest request);

    // Customer profile operations
    UserDto getCustomerProfile(UUID userId);
    UserDto updateCustomerProfile(UUID userId, UserDto request);

    // Address operations
    List<AddressDto> getCustomerAddresses(UUID userId);
    AddressDto addCustomerAddress(UUID userId, AddressRequest request);
    AddressDto updateCustomerAddress(UUID userId, UUID addressId, AddressRequest request);
    void deleteCustomerAddress(UUID userId, UUID addressId);

    // Bulk operations for admin
    List<UserDto> bulkUpdateUsers(BulkUserUpdateRequest request);

    // Advanced querying with predicates
    Page<UserDto> findUsersWithPredicate(Predicate predicate, Pageable pageable);
}
