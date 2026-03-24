package ecommerce.graphql.resolver;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

@Controller
public class FollowResolver {

    @QueryMapping
    @PreAuthorize("isAuthenticated()")
    public String myFollowing() {
        throw new UnsupportedOperationException("Follow service not implemented");
    }

    @QueryMapping
    public String isFollowing() {
        throw new UnsupportedOperationException("Follow service not implemented");
    }

    @QueryMapping
    public String followStats() {
        throw new UnsupportedOperationException("Follow service not implemented");
    }

    @QueryMapping
    public String storeFollowers() {
        throw new UnsupportedOperationException("Follow service not implemented");
    }

    @MutationMapping
    @PreAuthorize("isAuthenticated()")
    public String followStore(@Argument String input) {
        throw new UnsupportedOperationException("Follow service not implemented");
    }

    @MutationMapping
    @PreAuthorize("isAuthenticated()")
    public String unfollowStore() {
        throw new UnsupportedOperationException("Follow service not implemented");
    }
}