package ecommerce.modules.subscriber;

/**
 * Security rules for Subscriber module.
 * Defines authorization expressions for subscriber management.
 */
public class SubscriberSecurityRules {

    /**
     * Admin-only access for subscriber management.
     */
    public static final String ADMIN_ONLY = "hasRole('ADMIN')";

    /**
     * Public access for newsletter subscription.
     */
    public static final String PUBLIC_SUBSCRIBE = "permitAll()";

    /**
     * Rate limiting check for public endpoints.
     */
    public static final String RATE_LIMITED = "@rateLimitingAspect.checkRateLimit()";

    private SubscriberSecurityRules() {
    }
}
