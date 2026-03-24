package ecommerce.graphql.resolver;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

@Controller
public class SettingsResolver {

    @QueryMapping
    public String siteSettings() {
        throw new UnsupportedOperationException("Site settings service not implemented");
    }

    @QueryMapping
    public String socialLinks() {
        throw new UnsupportedOperationException("Social links service not implemented");
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String updateSiteSettings(@Argument String input) {
        throw new UnsupportedOperationException("Site settings service not implemented");
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String updateSocialLinks(@Argument String input) {
        throw new UnsupportedOperationException("Social links service not implemented");
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String resetSiteSettings() {
        throw new UnsupportedOperationException("Site settings service not implemented");
    }
}