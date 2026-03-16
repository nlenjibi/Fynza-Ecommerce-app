package ecommerce.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

/**
 * GraphQL Security Configuration
 * 
 * Enables method-level security for GraphQL resolvers using @PreAuthorize annotations.
 * This replaces hardcoded operation sets with Spring's built-in authorization annotations,
 * making security configuration more flexible and maintainable.
 * 
 * Security is applied at the resolver level via annotations:
 * - @PreAuthorize("hasRole('ADMIN')") - Admin only
 * - @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')") - Admin and Manager
 * - @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SELLER')") - Admin, Manager, Seller
 * - @PreAuthorize("isAuthenticated()") - Any authenticated user
 * 
 * Note: GraphQL endpoints themselves (/graphql, /graphiql) are permitted without auth,
 * but individual operations are secured through resolver-level annotations.
 */
@Configuration
@EnableMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class GraphQLSecurityConfig {
    // Method-level security is enabled via @EnableMethodSecurity
    // Resolvers use @PreAuthorize, @Secured, or @RolesAllowed annotations
    // to secure individual GraphQL operations
}
