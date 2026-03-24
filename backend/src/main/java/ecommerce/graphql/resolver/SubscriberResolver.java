package ecommerce.graphql.resolver;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

@Controller
public class SubscriberResolver {

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String subscribers() {
        throw new UnsupportedOperationException("Subscriber service not implemented");
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String subscriber() {
        throw new UnsupportedOperationException("Subscriber service not implemented");
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String subscriberStats() {
        throw new UnsupportedOperationException("Subscriber service not implemented");
    }

    @MutationMapping
    public String subscribe(@Argument String input) {
        throw new UnsupportedOperationException("Subscriber service not implemented");
    }

    @MutationMapping
    public String unsubscribe() {
        throw new UnsupportedOperationException("Subscriber service not implemented");
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String activateSubscriber() {
        throw new UnsupportedOperationException("Subscriber service not implemented");
    }
}