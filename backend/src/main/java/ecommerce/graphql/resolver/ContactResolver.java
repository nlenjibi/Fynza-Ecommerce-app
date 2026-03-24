package ecommerce.graphql.resolver;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

@Controller
public class ContactResolver {

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String contactMessages() {
        throw new UnsupportedOperationException("Contact service not implemented");
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String contactMessage() {
        throw new UnsupportedOperationException("Contact service not implemented");
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String contactMessageStats() {
        throw new UnsupportedOperationException("Contact service not implemented");
    }

    @MutationMapping
    public String submitContactMessage(@Argument String input) {
        throw new UnsupportedOperationException("Contact service not implemented");
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String updateContactStatus() {
        throw new UnsupportedOperationException("Contact service not implemented");
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String respondToContact() {
        throw new UnsupportedOperationException("Contact service not implemented");
    }
}