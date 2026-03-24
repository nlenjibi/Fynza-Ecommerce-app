package ecommerce.graphql.resolver;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

@Controller
public class AuthResolver {

    @QueryMapping
    public String me() {
        throw new UnsupportedOperationException("Auth service not implemented");
    }

    @QueryMapping
    public String isEmailAvailable() {
        throw new UnsupportedOperationException("Auth service not implemented");
    }

    @QueryMapping
    public String isUsernameAvailable() {
        throw new UnsupportedOperationException("Auth service not implemented");
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String users() {
        throw new UnsupportedOperationException("Auth service not implemented");
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String user() {
        throw new UnsupportedOperationException("Auth service not implemented");
    }

    @MutationMapping
    public String register(@Argument String input) {
        throw new UnsupportedOperationException("Auth service not implemented");
    }

    @MutationMapping
    public String login(@Argument String input) {
        throw new UnsupportedOperationException("Auth service not implemented");
    }

    @MutationMapping
    public String oauthLogin(@Argument String input) {
        throw new UnsupportedOperationException("Auth service not implemented");
    }

    @MutationMapping
    public String logout() {
        throw new UnsupportedOperationException("Auth service not implemented");
    }

    @MutationMapping
    public String requestPasswordReset(@Argument String input) {
        throw new UnsupportedOperationException("Auth service not implemented");
    }

    @MutationMapping
    public String resetPassword(@Argument String input) {
        throw new UnsupportedOperationException("Auth service not implemented");
    }

    @MutationMapping
    public String changePassword(@Argument String input) {
        throw new UnsupportedOperationException("Auth service not implemented");
    }

    @MutationMapping
    public String refreshToken(@Argument String input) {
        throw new UnsupportedOperationException("Auth service not implemented");
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String updateUserRole() {
        throw new UnsupportedOperationException("Auth service not implemented");
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String updateUserStatus() {
        throw new UnsupportedOperationException("Auth service not implemented");
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteUser() {
        throw new UnsupportedOperationException("Auth service not implemented");
    }
}