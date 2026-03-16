package ecommerce.aspect;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.LongAdder;

/**
 * Rate Limiting Aspect with Token Bucket Algorithm
 * 
 * Monitors and controls the rate of API calls to prevent abuse and ensure
 * fair resource usage across all users.
 * 
 * Features:
 * - Token bucket algorithm for rate limiting (low contention)
 * - LongAdder for high-concurrency counter updates (lower than AtomicInteger)
 * - Tracks request frequency per endpoint
 * - Monitors suspicious activity patterns
 * - Logs potential abuse attempts
 * - Provides rate limit statistics
 * - Identifies hot endpoints
 * - Detects DDoS-like patterns
 * - IP-based rate limiting for auth endpoints (S1.1: 10 attempts/min/IP)
 * - Username/email-based rate limiting for auth endpoints (S7.1: 5 attempts/min/email)
 * 
 * Thread-safety optimizations:
 * - LongAdder instead of AtomicInteger (better for high contention)
 * - Caffeine cache for token bucket (thread-safe, low contention)
 */
@Aspect
@Component
@Slf4j
public class RateLimitingAspect {

    private static final DateTimeFormatter TIMESTAMP_FORMATTER = 
        DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");

    @Value("${rate-limit.requests-per-minute:100}")
    private int requestsPerMinuteThreshold;

    @Value("${rate-limit.requests-per-second:10}")
    private int requestsPerSecondThreshold;

    @Value("${rate-limit.enabled:false}")
    private boolean rateLimitEnabled;

    // Auth-specific rate limits
    @Value("${rate-limit.auth.ip.attempts-per-minute:10}")
    private int authIpAttemptsPerMinute;

    @Value("${rate-limit.auth.email.attempts-per-minute:5}")
    private int authEmailAttemptsPerMinute;

    // Token bucket cache - tokens refill based on time
    private final Cache<String, TokenBucket> tokenBuckets;

    // Request tracking using LongAdder (lower contention than AtomicInteger)
    private final Map<String, RequestCounter> requestCounters = new ConcurrentHashMap<>();

    // Auth-specific rate limit caches
    private final Cache<String, AuthRateLimitCounter> authIpCounters;
    private final Cache<String, AuthRateLimitCounter> authEmailCounters;

    public RateLimitingAspect() {
        // Initialize token bucket cache with 1 hour expiry
        this.tokenBuckets = Caffeine.newBuilder()
                .maximumSize(10000)
                .expireAfterAccess(1, TimeUnit.HOURS)
                .build();
        
        // Initialize auth IP rate limit cache (15 minute expiry)
        this.authIpCounters = Caffeine.newBuilder()
                .maximumSize(10000)
                .expireAfterWrite(15, TimeUnit.MINUTES)
                .build();
        
        // Initialize auth email rate limit cache (15 minute expiry)
        this.authEmailCounters = Caffeine.newBuilder()
                .maximumSize(10000)
                .expireAfterWrite(15, TimeUnit.MINUTES)
                .build();
    }

    /**
     * Token Bucket implementation for rate limiting
     */
    private static class TokenBucket {
        private final LongAdder tokens;
        private final int capacity;
        private final int refillRate; // tokens per second
        private volatile long lastRefillTime;

        public TokenBucket(int capacity, int refillRate) {
            this.tokens = new LongAdder();
            this.tokens.add(capacity);
            this.capacity = capacity;
            this.refillRate = refillRate;
            this.lastRefillTime = System.nanoTime();
        }

        public synchronized boolean tryConsume() {
            refill();
            if (tokens.sum() > 0) {
                tokens.decrement();
                return true;
            }
            return false;
        }

        private void refill() {
            long now = System.nanoTime();
            long elapsed = now - lastRefillTime;
            if (elapsed > 1_000_000_000) { // 1 second
                long seconds = elapsed / 1_000_000_000;
                long newTokens = seconds * refillRate;
                long current = tokens.sum();
                long target = Math.min(current + newTokens, capacity);
                tokens.add(target - current);
                lastRefillTime = now;
            }
        }

        public long getAvailableTokens() {
            return tokens.sum();
        }
    }

    /**
     * Pointcut for all GraphQL endpoints
     */
    @Pointcut("@annotation(org.springframework.graphql.data.method.annotation.QueryMapping) || " +
              "@annotation(org.springframework.graphql.data.method.annotation.MutationMapping)")
    public void graphqlEndpointsPointcut() {}

    /**
     * Pointcut for all REST controller endpoints
     */
    @Pointcut("@annotation(org.springframework.web.bind.annotation.GetMapping) || " +
              "@annotation(org.springframework.web.bind.annotation.PostMapping) || " +
              "@annotation(org.springframework.web.bind.annotation.PutMapping) || " +
              "@annotation(org.springframework.web.bind.annotation.DeleteMapping) || " +
              "@annotation(org.springframework.web.bind.annotation.PatchMapping)")
    public void restEndpointsPointcut() {}

    /**
     * Combined pointcut for all API endpoints
     */
    @Pointcut("graphqlEndpointsPointcut() || restEndpointsPointcut()")
    public void apiEndpointsPointcut() {}

    /**
     * Monitor and log API request rates
     */
    @Around("apiEndpointsPointcut()")
    public Object monitorRequestRate(ProceedingJoinPoint joinPoint) throws Throwable {
        String methodName = joinPoint.getSignature().getName();
        String className = joinPoint.getTarget().getClass().getSimpleName();
        String endpoint = className + "." + methodName;

        // Check auth-specific rate limits for authentication endpoints
        if (isAuthEndpoint(joinPoint)) {
            checkAuthRateLimit(joinPoint);
        }

        // Check rate limit if enabled
        if (rateLimitEnabled) {
            TokenBucket bucket = tokenBuckets.get(endpoint, k -> 
                new TokenBucket(requestsPerMinuteThreshold, requestsPerSecondThreshold));
            if (!bucket.tryConsume()) {
                log.warn("Rate limit exceeded for endpoint: {}", endpoint);
                throw new RateLimitExceededException("Rate limit exceeded. Please try again later.");
            }
        }

        // Get or create request counter for this endpoint
        RequestCounter counter = requestCounters.computeIfAbsent(
            endpoint, 
            k -> new RequestCounter()
        );

        // Increment request count using LongAdder
        counter.incrementTotal();
        counter.incrementMinute();
        counter.incrementSecond();

        // Check for suspicious activity (sampling to reduce log overhead)
        if (counter.getTotalRequests() % 100 == 0) {
            checkForSuspiciousActivity(endpoint, counter);
        }

        long startTime = System.currentTimeMillis();

        try {
            Object result = joinPoint.proceed();
            long duration = System.currentTimeMillis() - startTime;

            // Log request details (sampled)
            if (counter.getTotalRequests() % 50 == 0) {
                log.debug("API Request: {} | Total: {} | Last min: {} | Last sec: {} | Duration: {} ms",
                    endpoint, counter.getTotalRequests(), 
                    counter.getRequestsLastMinute(), counter.getRequestsLastSecond(), duration);
            }

            return result;

        } catch (Throwable ex) {
            counter.incrementErrors();
            throw ex;
        }
    }

    /**
     * Check if the endpoint is an authentication endpoint
     */
    private boolean isAuthEndpoint(ProceedingJoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        String className = joinPoint.getTarget().getClass().getSimpleName();
        
        // Check for auth-related endpoints
        return className.contains("Auth") || 
               methodName.toLowerCase().contains("login") ||
               methodName.toLowerCase().contains("register") ||
               methodName.toLowerCase().contains("signup") ||
               methodName.toLowerCase().contains("oauth");
    }

    /**
     * Check for suspicious activity patterns
     */
    private void checkForSuspiciousActivity(String endpoint, RequestCounter counter) {
        long requestsPerSecond = counter.getRequestsLastSecond();
        long requestsPerMinute = counter.getRequestsLastMinute();

        // Check for burst traffic (potential DDoS)
        if (requestsPerSecond > requestsPerSecondThreshold * 2) {
            log.warn("SECURITY ALERT - Burst traffic detected on {} - {} requests/sec (threshold: {})",
                endpoint, requestsPerSecond, requestsPerSecondThreshold);
        }

        // Check for sustained high traffic
        if (requestsPerMinute > requestsPerMinuteThreshold) {
            log.warn("High traffic detected on {} - {} requests/min (threshold: {})",
                endpoint, requestsPerMinute, requestsPerMinuteThreshold);
        }
    }

    /**
     * Get rate limit statistics for all endpoints
     */
    public Map<String, RequestStats> getStatistics() {
        Map<String, RequestStats> stats = new ConcurrentHashMap<>();
        
        requestCounters.forEach((endpoint, counter) -> {
            stats.put(endpoint, new RequestStats(
                counter.getTotalRequests(),
                counter.getRequestsLastMinute(),
                counter.getRequestsLastSecond(),
                counter.getErrorCount()
            ));
        });
        
        return stats;
    }

    /**
     * Reset all counters
     */
    public void resetCounters() {
        requestCounters.clear();
        tokenBuckets.invalidateAll();
        log.info("Rate limiting counters and buckets reset");
    }

    /**
     * Custom exception for rate limit exceeded
     */
    public static class RateLimitExceededException extends RuntimeException {
        public RateLimitExceededException(String message) {
            super(message);
        }
    }

    /**
     * Request counter class using LongAdder for lower contention
     */
    private static class RequestCounter {
        private final LongAdder totalRequests = new LongAdder();
        private final LongAdder requestsLastMinute = new LongAdder();
        private final LongAdder requestsLastSecond = new LongAdder();
        private final LongAdder errorCount = new LongAdder();
        private volatile long lastMinuteReset = System.currentTimeMillis();
        private volatile long lastSecondReset = System.currentTimeMillis();

        public void incrementTotal() {
            totalRequests.increment();
        }

        public void incrementMinute() {
            long now = System.currentTimeMillis();
            if (now - lastMinuteReset > 60000) {
                requestsLastMinute.reset();
                lastMinuteReset = now;
            }
            requestsLastMinute.increment();
        }

        public void incrementSecond() {
            long now = System.currentTimeMillis();
            if (now - lastSecondReset > 1000) {
                requestsLastSecond.reset();
                lastSecondReset = now;
            }
            requestsLastSecond.increment();
        }

        public void incrementErrors() {
            errorCount.increment();
        }

        public long getTotalRequests() {
            return totalRequests.sum();
        }

        public long getRequestsLastMinute() {
            return requestsLastMinute.sum();
        }

        public long getRequestsLastSecond() {
            return requestsLastSecond.sum();
        }

        public long getErrorCount() {
            return errorCount.sum();
        }
    }

    /**
     * Request statistics record
     */
    public record RequestStats(
        long totalRequests,
        long requestsLastMinute,
        long requestsLastSecond,
        long errorCount
    ) {}

    /**
     * Auth-specific rate limit counter with both IP and email tracking
     */
    private static class AuthRateLimitCounter {
        private final LongAdder ipAttempts = new LongAdder();
        private final LongAdder emailAttempts = new LongAdder();
        private volatile long ipResetTime = System.currentTimeMillis();
        private volatile long emailResetTime = System.currentTimeMillis();

        public void incrementIpAttempts() {
            long now = System.currentTimeMillis();
            if (now - ipResetTime > 60000) {
                ipAttempts.reset();
                ipResetTime = now;
            }
            ipAttempts.increment();
        }

        public void incrementEmailAttempts() {
            long now = System.currentTimeMillis();
            if (now - emailResetTime > 60000) {
                emailAttempts.reset();
                emailResetTime = now;
            }
            emailAttempts.increment();
        }

        public long getIpAttempts() {
            return ipAttempts.sum();
        }

        public long getEmailAttempts() {
            return emailAttempts.sum();
        }
    }

    /**
     * Pointcut for authentication endpoints (login, register, refresh)
     */
    @Pointcut("execution(* ecommerce.modules.auth.controller.AuthController.login(..))")
    public void authLoginPointcut() {}

    @Pointcut("execution(* ecommerce.modules.auth.controller.AuthController.register(..))")
    public void authRegisterPointcut() {}

    @Pointcut("execution(* ecommerce.modules.auth.controller.AuthController.refreshToken(..))")
    public void authRefreshPointcut() {}

    /**
     * Combined pointcut for auth endpoints
     */
    @Pointcut("authLoginPointcut() || authRegisterPointcut() || authRefreshPointcut()")
    public void authEndpointsPointcut() {}

    /**
     * Get client IP address from request
     */
    private String getClientIp() {
        try {
            ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
            if (attributes != null) {
                HttpServletRequest request = attributes.getRequest();
                String ip = request.getHeader("X-Forwarded-For");
                if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
                    ip = request.getHeader("X-Real-IP");
                }
                if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
                    ip = request.getRemoteAddr();
                }
                // Handle multiple IPs in X-Forwarded-For
                if (ip != null && ip.contains(",")) {
                    ip = ip.split(",")[0].trim();
                }
                return ip;
            }
        } catch (Exception e) {
            log.debug("Could not get client IP: {}", e.getMessage());
        }
        return "unknown";
    }

    /**
     * Extract email from login request arguments
     */
    private String extractEmailFromArgs(Object[] args) {
        if (args != null && args.length > 0) {
            for (Object arg : args) {
                if (arg != null) {
                    // Check for common DTO patterns
                    if (arg.getClass().getSimpleName().toLowerCase().contains("login")) {
                        try {
                            var emailMethod = arg.getClass().getMethod("getEmail");
                            Object email = emailMethod.invoke(arg);
                            if (email != null) {
                                return email.toString();
                            }
                        } catch (Exception ignored) {}
                    }
                    // Check for String email parameter
                    if (arg instanceof String) {
                        String str = (String) arg;
                        if (str.contains("@")) {
                            return str;
                        }
                    }
                }
            }
        }
        return "unknown";
    }

    /**
     * Check auth-specific rate limits (IP and email based)
     */
    private void checkAuthRateLimit(ProceedingJoinPoint joinPoint) {
        String clientIp = getClientIp();
        String email = extractEmailFromArgs(joinPoint.getArgs());

        // Check IP-based rate limit (10 attempts/min/IP)
        String ipKey = "auth:ip:" + clientIp;
        AuthRateLimitCounter ipCounter = authIpCounters.get(ipKey, k -> new AuthRateLimitCounter());
        ipCounter.incrementIpAttempts();

        if (ipCounter.getIpAttempts() > authIpAttemptsPerMinute) {
            log.warn("Auth rate limit exceeded for IP: {} - {} attempts (max: {})",
                clientIp, ipCounter.getIpAttempts(), authIpAttemptsPerMinute);
            throw new RateLimitExceededException(
                "Too many attempts from this IP address. Please try again later.");
        }

        // Check email-based rate limit (5 attempts/min/email)
        if (!"unknown".equals(email)) {
            String emailKey = "auth:email:" + email.toLowerCase();
            AuthRateLimitCounter emailCounter = authEmailCounters.get(emailKey, k -> new AuthRateLimitCounter());
            emailCounter.incrementEmailAttempts();

            if (emailCounter.getEmailAttempts() > authEmailAttemptsPerMinute) {
                log.warn("Auth rate limit exceeded for email: {} - {} attempts (max: {})",
                    email, emailCounter.getEmailAttempts(), authEmailAttemptsPerMinute);
                throw new RateLimitExceededException(
                    "Too many attempts for this account. Please try again later.");
            }
        }
    }
}
