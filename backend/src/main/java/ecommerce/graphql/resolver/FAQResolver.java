package ecommerce.graphql.resolver;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

@Controller
public class FAQResolver {

    @QueryMapping
    public String faqs() {
        throw new UnsupportedOperationException("FAQ service not implemented");
    }

    @QueryMapping
    public String faq() {
        throw new UnsupportedOperationException("FAQ service not implemented");
    }

    @QueryMapping
    public String faqCategories() {
        throw new UnsupportedOperationException("FAQ service not implemented");
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String adminFaqs() {
        throw new UnsupportedOperationException("FAQ service not implemented");
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String createFAQ(@Argument String input) {
        throw new UnsupportedOperationException("FAQ service not implemented");
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String updateFAQ() {
        throw new UnsupportedOperationException("FAQ service not implemented");
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteFAQ() {
        throw new UnsupportedOperationException("FAQ service not implemented");
    }
}