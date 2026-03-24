package ecommerce.graphql.resolver;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

@Controller
public class TagResolver {

    @QueryMapping
    public String tags() {
        throw new UnsupportedOperationException("Tag service not implemented");
    }

    @QueryMapping
    public String tag() {
        throw new UnsupportedOperationException("Tag service not implemented");
    }

    @QueryMapping
    @PreAuthorize("hasRole('SELLER')")
    public String sellerTags() {
        throw new UnsupportedOperationException("Tag service not implemented");
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String createTag(@Argument String input) {
        throw new UnsupportedOperationException("Tag service not implemented");
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String updateTag() {
        throw new UnsupportedOperationException("Tag service not implemented");
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteTag() {
        throw new UnsupportedOperationException("Tag service not implemented");
    }

    @MutationMapping
    @PreAuthorize("hasRole('SELLER')")
    public String createSellerTag(@Argument String input) {
        throw new UnsupportedOperationException("Tag service not implemented");
    }
}