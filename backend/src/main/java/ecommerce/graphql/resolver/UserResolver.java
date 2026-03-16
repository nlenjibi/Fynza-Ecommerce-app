package ecommerce.graphql.resolver;

import com.querydsl.core.types.Predicate;
import ecommerce.modules.user.entity.UserPredicates;
import ecommerce.common.response.PaginatedResponse;
import ecommerce.graphql.dto.UserResponceDto;
import ecommerce.graphql.input.PageInput;
import ecommerce.graphql.input.SortDirection;
import ecommerce.graphql.input.UserFilterInput;
import ecommerce.modules.admin.AdminDashboardDto;
import ecommerce.modules.admin.service.AdminService;
import ecommerce.modules.user.dto.AddressDto;
import ecommerce.modules.user.dto.AddressRequest;
import ecommerce.modules.user.dto.UserCreateRequest;
import ecommerce.modules.user.dto.UserDto;
import ecommerce.modules.user.dto.UserUpdateRequest;
import ecommerce.modules.user.service.UserService;
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

import java.util.List;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
@Slf4j
public class UserResolver {

    private final UserService userService;
    private final AdminService adminService;

    @QueryMapping
    
    public UserDto user(@Argument UUID id) {
        log.info("GraphQL Query: user(id: {})", id);
        return userService.getUserById(id).orElse(null);
    }

    @QueryMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public UserResponceDto users(@Argument PageInput pagination, @Argument UserFilterInput filter) {
        log.info("GraphQL Query: users");
        Pageable pageable = createPageable(pagination);

        Page<UserDto> userPage;
        if (filter != null) {
            // Build predicate for advanced filtering
            Predicate predicate = buildPredicateFromFilter(filter);
            userPage = userService.findUsersWithPredicate(predicate, pageable);
        } else {
            userPage = userService.getAllUsers(pageable);
        }

        return UserResponceDto.builder()
                .content(userPage.getContent())
                .pageInfo(PaginatedResponse.from(userPage))
                .build();
    }

    @QueryMapping
    
    public UserDto currentUser(@ContextValue UUID userId) {
        log.info("GraphQL Query: currentUser for user {}", userId);
        return userService.getUserById(userId).orElse(null);
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public AdminDashboardDto adminDashboard() {
        log.info("GraphQL Query: adminDashboard");
        return adminService.getDashboardStats();
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public UserDto createUser(@Argument UserCreateRequest input) {
        log.info("GraphQL Mutation: createUser");
        return userService.createUser(input);
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public UserDto updateUser(@Argument UUID id, @Argument UserUpdateRequest input) {
        log.info("GraphQL Mutation: updateUser(id: {})", id);
        return userService.updateUser(id, input);
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Boolean deleteUser(@Argument UUID id) {
        log.info("GraphQL Mutation: deleteUser(id: {})", id);
        userService.deleteUser(id);
        return true;
    }

    // ==================== Address Operations ====================

    @QueryMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public List<AddressDto> myAddresses(@ContextValue UUID userId) {
        log.info("GraphQL Query: myAddresses for user {}", userId);
        return userService.getCustomerAddresses(userId);
    }

    @MutationMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public AddressDto addAddress(@Argument AddressRequest input, @ContextValue UUID userId) {
        log.info("GraphQL Mutation: addAddress for user {}", userId);
        return userService.addCustomerAddress(userId, input);
    }

    @MutationMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public AddressDto updateAddress(@Argument UUID id, @Argument AddressRequest input, @ContextValue UUID userId) {
        log.info("GraphQL Mutation: updateAddress(id: {})", id);
        return userService.updateCustomerAddress(userId, id, input);
    }

    @MutationMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public Boolean deleteAddress(@Argument UUID id, @ContextValue UUID userId) {
        log.info("GraphQL Mutation: deleteAddress(id: {})", id);
        userService.deleteCustomerAddress(userId, id);
        return true;
    }

    // ==================== Admin Operations ====================

    @QueryMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    public AdminDashboardDto staffDashboard() {
        log.info("GraphQL Query: staffDashboard");
        return adminService.getDashboardStats();
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Boolean lockAccount(@Argument UUID userId) {
        log.info("GraphQL Mutation: lockAccount(userId: {})", userId);
        return userService.lockUserAccount(userId);
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Boolean unlockAccount(@Argument UUID userId) {
        log.info("GraphQL Mutation: unlockAccount(userId: {})", userId);
        return userService.unlockUserAccount(userId);
    }

    private Pageable createPageable(PageInput input) {
        if (input == null) {
            return PageRequest.of(0, 20, Sort.by("id"));
        }
        Sort sort = input.getDirection() == SortDirection.DESC
                ? Sort.by(input.getSortBy()).descending()
                : Sort.by(input.getSortBy()).ascending();
        return PageRequest.of(input.getPage(), input.getSize(), sort);
    }

    private Predicate buildPredicateFromFilter(UserFilterInput filter) {
        UserPredicates predicates = UserPredicates.builder()
                .withSearch(filter.getSearch())
                .withRole(filter.getRole())
                .withActive(filter.getActive())
                .withEmailVerified(filter.getEmailVerified())
                .withCreatedAfter(filter.getCreatedAfter())
                .withCreatedBefore(filter.getCreatedBefore())
                .withPhoneNumberContaining(filter.getPhoneNumber())
                .withNameContaining(filter.getName());

        return predicates.build();
    }
}
