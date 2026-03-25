package ecommerce.graphql.resolver;

import com.querydsl.core.types.Predicate;
import ecommerce.modules.user.entity.UserPredicates;
import ecommerce.common.response.PaginatedResponse;
import ecommerce.graphql.dto.UserResponceDto;
import ecommerce.graphql.input.PageInput;
import ecommerce.graphql.input.SortDirection;
import ecommerce.graphql.input.UserFilterInput;
import ecommerce.modules.admin.dto.AdminDashboardDto;
import ecommerce.modules.admin.service.AdminService;
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
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
@RequiredArgsConstructor
@Slf4j
public class AdminResolver {

    private final UserService userService;
    private final AdminService adminService;

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public AdminDashboardDto adminDashboard() {
        log.info("GraphQL Query: adminDashboard");
        return adminService.getDashboardStats();
    }

    @QueryMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    public AdminDashboardDto staffDashboard() {
        log.info("GraphQL Query: staffDashboard");
        return adminService.getDashboardStats();
    }

    @QueryMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public UserResponceDto allUsers(@Argument PageInput pagination, @Argument UserFilterInput filter) {
        log.info("GraphQL Query: allUsers");
        Pageable pageable = createPageable(pagination);

        Page<UserDto> userPage;
        if (filter != null) {
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
        return UserPredicates.builder()
                .withSearch(filter.getSearch())
                .withRole(filter.getRole())
                .withActive(filter.getActive())
                .withEmailVerified(filter.getEmailVerified())
                .withCreatedAfter(filter.getCreatedAfter())
                .withCreatedBefore(filter.getCreatedBefore())
                .withPhoneNumberContaining(filter.getPhoneNumber())
                .withNameContaining(filter.getName())
                .build();
    }
}
