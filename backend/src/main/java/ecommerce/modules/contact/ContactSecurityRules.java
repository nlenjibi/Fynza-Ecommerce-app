package ecommerce.modules.contact;

/**
 * Security rules for Contact module.
 * Defines authorization expressions for contact message management.
 */
public class ContactSecurityRules {

    /**
     * Admin-only access for message management.
     */
    public static final String ADMIN_ONLY = "hasRole('ADMIN')";

    /**
     * Public access for submitting contact messages.
     */
    public static final String PUBLIC_SUBMIT = "permitAll()";

    /**
     * Rate limiting check for public endpoints.
     */
    public static final String RATE_LIMITED = "@rateLimitingAspect.checkRateLimit()";

    /**
     * Admin or support staff access.
     */
    public static final String SUPPORT_STAFF = "hasAnyRole('ADMIN', 'SUPPORT')";

    private ContactSecurityRules() {
        // Utility class
    }
}
