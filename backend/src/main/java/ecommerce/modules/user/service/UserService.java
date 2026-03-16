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

    // Bulk operations for admin
    List<UserDto> bulkUpdateUsers(BulkUserUpdateRequest request);

    // Advanced querying with predicates
    Page<UserDto> findUsersWithPredicate(Predicate predicate, Pageable pageable);
}
