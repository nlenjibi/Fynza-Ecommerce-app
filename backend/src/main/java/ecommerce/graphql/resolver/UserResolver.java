package ecommerce.graphql.resolver;

import com.querydsl.core.types.Predicate;
import ecommerce.modules.user.entity.UserPredicates;
import ecommerce.graphql.dto.UserResponceDto;
import ecommerce.graphql.input.PageInput;
import ecommerce.graphql.input.SortDirection;
import ecommerce.graphql.input.UserFilterInput;
import ecommerce.modules.user.dto.AddressDto;
import ecommerce.modules.user.dto.AddressRequest;
import ecommerce.modules.user.dto.UserDto;
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
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
@Slf4j
public class UserResolver {

    private final UserService userService;

    @QueryMapping
    public UserDto user(@Argument UUID id) {
        log.info("GraphQL Query: user(id: {})", id);
        return userService.getUserById(id).orElse(null);
    }

    @QueryMapping
    public UserDto currentUser(@ContextValue UUID userId) {
        log.info("GraphQL Query: currentUser for user {}", userId);
        return userService.getUserById(userId).orElse(null);
    }

    @QueryMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public UserResponceDto users(@Argument PageInput pagination, @Argument UserFilterInput filter) {
        log.info("GraphQL Query: users");
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
                .pageInfo(ecommerce.common.response.PaginatedResponse.from(userPage))
                .build();
    }

    // ==================== Address Operations ====================

    @QueryMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public List<AddressDto> myAddresses(@ContextValue UUID userId) {
        log.info("GraphQL Query: myAddresses for user {}", userId);
        return userService.getCustomerAddresses(userId);
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

    @SchemaMapping(typeName = "User")
    public String fullName(UserDto user) {
        return user.getFullName();
    }
}
