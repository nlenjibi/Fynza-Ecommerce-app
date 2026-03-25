package ecommerce.graphql.resolver;

import ecommerce.common.response.PaginatedResponse;
import ecommerce.graphql.dto.SubscriberConnection;
import ecommerce.graphql.input.PageInput;
import ecommerce.graphql.input.SubscriberInput;
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

import java.util.List;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
@Slf4j
public class SubscriberResolver {

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public SubscriberConnection subscribers(
            @Argument Boolean isActive,
            @Argument PageInput pagination) {
        log.info("GraphQL Query: subscribers(isActive: {})", isActive);
        
        Pageable pageable = createPageable(pagination);
        
        return SubscriberConnection.builder()
                .content(List.of())
                .pageInfo(PaginatedResponse.from(Page.empty()))
                .build();
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Object subscriber(@Argument UUID id) {
        log.info("GraphQL Query: subscriber(id: {})", id);
        return null;
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Object subscriberByEmail(@Argument String email) {
        log.info("GraphQL Query: subscriberByEmail(email: {})", email);
        return null;
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public SubscriberStats subscriberStats() {
        log.info("GraphQL Query: subscriberStats");
        
        return SubscriberStats.builder()
                .total(0)
                .active(0)
                .inactive(0)
                .subscribedToday(0)
                .unsubscribedToday(0)
                .build();
    }

    @MutationMapping
    public Object subscribe(@Argument SubscriberInput input) {
        log.info("GraphQL Mutation: subscribe(email: {})", input.getEmail());
        return null;
    }

    @MutationMapping
    public boolean unsubscribe(@Argument String email) {
        log.info("GraphQL Mutation: unsubscribe(email: {})", email);
        return true;
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Object activateSubscriber(@Argument UUID id) {
        log.info("GraphQL Mutation: activateSubscriber(id: {})", id);
        return null;
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Object deactivateSubscriber(@Argument UUID id) {
        log.info("GraphQL Mutation: deactivateSubscriber(id: {})", id);
        return null;
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public boolean deleteSubscriber(@Argument UUID id) {
        log.info("GraphQL Mutation: deleteSubscriber(id: {})", id);
        return true;
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public int importSubscribers(@Argument List<String> emails) {
        log.info("GraphQL Mutation: importSubscribers(count: {})", emails.size());
        return 0;
    }

    private Pageable createPageable(PageInput input) {
        if (input == null) {
            return PageRequest.of(0, 20, Sort.by(Sort.Direction.DESC, "createdAt"));
        }
        Sort.Direction direction = input.getDirection() == ecommerce.graphql.input.SortDirection.DESC
                ? Sort.Direction.DESC : Sort.Direction.ASC;
        String sortBy = input.getSortBy() != null ? input.getSortBy() : "createdAt";
        return PageRequest.of(input.getPage(), input.getSize(), Sort.by(direction, sortBy));
    }

    @lombok.Data
    @lombok.Builder
    public static class SubscriberStats {
        private int total;
        private int active;
        private int inactive;
        private int subscribedToday;
        private int unsubscribedToday;
    }
}
