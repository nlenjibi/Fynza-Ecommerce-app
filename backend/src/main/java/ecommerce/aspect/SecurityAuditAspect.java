package ecommerce.aspect;

import ecommerce.modules.activity.entity.ActivityLog;
import ecommerce.modules.activity.service.ActivityLogService;
import ecommerce.modules.auth.service.SecurityService;
import ecommerce.modules.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Security Audit Aspect
 *
 * Provides comprehensive security auditing for sensitive operations.
 * Logs all create, update, delete operations and authentication attempts.
 * Persists audit logs to database for compliance and security monitoring.
 *
 * Audit Trail includes:
 * - Timestamp of operation
 * - Operation type (create/update/delete/authenticate)
 * - Method and class name
 * - Input parameters (sanitized for security)
 * - Operation outcome (success/failure)
 * - Exception details if failed
 *
 * Use Cases:
 * - Compliance requirements (SOC2, GDPR, HIPAA)
 * - Security incident investigation
 * - Access pattern analysis
 * - Fraud detection
 */
@Aspect
@Component
@Slf4j
@AllArgsConstructor
public class SecurityAuditAspect {

    private final ActivityLogService activityLogService;
    private final SecurityService securityService;

    private static final DateTimeFormatter TIMESTAMP_FORMATTER =
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");

    /**
     * Pointcut for sensitive CREATE operations
     * Matches all create* methods in service layer
     */
    @Pointcut("execution(* ecommerce.modules..service..*.create*(..))")
    public void createOperationsPointcut() {}

    /**
     * Pointcut for sensitive UPDATE operations
     * Matches all update* methods in service layer
     */
    @Pointcut("execution(* ecommerce.modules..service..*.update*(..))")
    public void updateOperationsPointcut() {}

    /**
     * Pointcut for sensitive DELETE operations
     * Matches all delete* methods in service layer
     */
    @Pointcut("execution(* ecommerce.modules..service..*.delete*(..))")
    public void deleteOperationsPointcut() {}

    /**
     * Pointcut for authentication operations
     * Matches authentication and login methods
     */
    @Pointcut("execution(* ecommerce.modules..service..*.*authenticate*(..)) || " +
            "execution(* ecommerce.modules..service..*.*login*(..))")
    public void authenticationOperationsPointcut() {}

    /**
     * Combined pointcut for all sensitive operations
     */
    @Pointcut("createOperationsPointcut() || updateOperationsPointcut() || " +
            "deleteOperationsPointcut() || authenticationOperationsPointcut()")
    public void sensitiveOperationsPointcut() {}

    /**
     * Before advice - logs security audit trail BEFORE sensitive operation
     * Captures the attempt to perform a sensitive operation
     */
    @Before("sensitiveOperationsPointcut()")
    public void auditSensitiveOperation(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        String className = joinPoint.getTarget().getClass().getSimpleName();
        Object[] args = joinPoint.getArgs();
        String timestamp = LocalDateTime.now().format(TIMESTAMP_FORMATTER);
        String operationType = determineOperationType(methodName);

        StringBuilder auditLog = new StringBuilder();
        auditLog.append("\n┌─────────────────────────────────────────────────────────────");
        auditLog.append("\n│ 🔐 SECURITY AUDIT - OPERATION INITIATED");
        auditLog.append("\n├─────────────────────────────────────────────────────────────");
        auditLog.append("\n│ Timestamp:    ").append(timestamp);
        auditLog.append("\n│ Operation:    ").append(operationType);
        auditLog.append("\n│ Class:        ").append(className);
        auditLog.append("\n│ Method:       ").append(methodName);
        auditLog.append("\n│ Parameters:   ").append(formatParameters(args));
        auditLog.append("\n└─────────────────────────────────────────────────────────────");

        log.warn(auditLog.toString());

        // Persist audit log to database
        persistAuditLog(null, operationType, className, methodName, 
                ActivityLog.AuditStatus.ATTEMPTED.name(), "Operation initiated");
    }

    /**
     * AfterReturning advice - logs successful completion of sensitive operation
     * Captures successful execution of sensitive operations
     */
    @AfterReturning(pointcut = "sensitiveOperationsPointcut()", returning = "result")
    public void auditSensitiveOperationSuccess(JoinPoint joinPoint, Object result) {
        String methodName = joinPoint.getSignature().getName();
        String className = joinPoint.getTarget().getClass().getSimpleName();
        String timestamp = LocalDateTime.now().format(TIMESTAMP_FORMATTER);
        String operationType = determineOperationType(methodName);

        StringBuilder auditLog = new StringBuilder();
        auditLog.append("\n┌─────────────────────────────────────────────────────────────");
        auditLog.append("\n│ ✅ SECURITY AUDIT - OPERATION SUCCESSFUL");
        auditLog.append("\n├─────────────────────────────────────────────────────────────");
        auditLog.append("\n│ Timestamp:    ").append(timestamp);
        auditLog.append("\n│ Operation:    ").append(operationType);
        auditLog.append("\n│ Class:        ").append(className);
        auditLog.append("\n│ Method:       ").append(methodName);
        auditLog.append("\n│ Status:       SUCCESS");
        auditLog.append("\n│ Result:       ").append(formatResult(result));
        auditLog.append("\n└─────────────────────────────────────────────────────────────");

        log.warn(auditLog.toString());

        // Persist audit log to database
        persistAuditLog(null, operationType, className, methodName, 
                "SUCCESS", "Operation completed successfully");
    }

    /**
     * AfterThrowing advice - logs failures of sensitive operations
     * Captures failed execution attempts - critical for security monitoring
     */
    @AfterThrowing(pointcut = "sensitiveOperationsPointcut()", throwing = "exception")
    public void auditSensitiveOperationFailure(JoinPoint joinPoint, Exception exception) {
        String methodName = joinPoint.getSignature().getName();
        String className = joinPoint.getTarget().getClass().getSimpleName();
        String timestamp = LocalDateTime.now().format(TIMESTAMP_FORMATTER);
        String operationType = determineOperationType(methodName);
        String exceptionType = exception.getClass().getSimpleName();
        String exceptionMessage = exception.getMessage();

        StringBuilder auditLog = new StringBuilder();
        auditLog.append("\n┌─────────────────────────────────────────────────────────────");
        auditLog.append("\n│ ❌ SECURITY AUDIT - OPERATION FAILED");
        auditLog.append("\n├─────────────────────────────────────────────────────────────");
        auditLog.append("\n│ Timestamp:    ").append(timestamp);
        auditLog.append("\n│ Operation:    ").append(operationType);
        auditLog.append("\n│ Class:        ").append(className);
        auditLog.append("\n│ Method:       ").append(methodName);
        auditLog.append("\n│ Status:       FAILED");
        auditLog.append("\n│ Exception:    ").append(exceptionType);
        auditLog.append("\n│ Message:      ").append(exceptionMessage != null ? exceptionMessage : "No message");
        auditLog.append("\n└─────────────────────────────────────────────────────────────");

        log.error(auditLog.toString());

        if (log.isDebugEnabled()) {
            log.debug("Exception stack trace for security audit:", exception);
        }

        // Persist audit log to database
        persistAuditLog(null, operationType, className, methodName, 
                "FAILURE", exceptionType + ": " + (exceptionMessage != null ? exceptionMessage : "No message"));
    }

    /**
     * Determine the type of operation based on method name
     */
    private String determineOperationType(String methodName) {
        String lowerMethodName = methodName.toLowerCase();

        if (lowerMethodName.contains("create") || lowerMethodName.contains("add") || lowerMethodName.contains("insert")) {
            return "CREATE";
        } else if (lowerMethodName.contains("update") || lowerMethodName.contains("modify") || lowerMethodName.contains("edit")) {
            return "UPDATE";
        } else if (lowerMethodName.contains("delete") || lowerMethodName.contains("remove")) {
            return "DELETE";
        } else if (lowerMethodName.contains("auth") || lowerMethodName.contains("login") || lowerMethodName.contains("signin")) {
            return "AUTHENTICATION";
        }

        return "SENSITIVE_OPERATION";
    }

    /**
     * Format parameters for audit log (sanitize sensitive data)
     */
    private String formatParameters(Object[] args) {
        if (args == null || args.length == 0) {
            return "none";
        }

        return Arrays.stream(args)
                .map(arg -> {
                    if (arg == null) {
                        return "null";
                    }
                    // Sanitize password fields
                    String argString = arg.toString();
                    if (argString.toLowerCase().contains("password")) {
                        return "[REDACTED]";
                    }
                    return arg.getClass().getSimpleName() + "@" + Integer.toHexString(arg.hashCode());
                })
                .collect(Collectors.joining(", "));
    }

    /**
     * Format result for audit log
     */
    private String formatResult(Object result) {
        if (result == null) {
            return "null";
        }

        if (result instanceof Boolean) {
            return result.toString();
        }

        return result.getClass().getSimpleName();
    }

    /**
     * Persist audit log to database
     */
    private void persistAuditLog(UUID userId, String action, String className, 
                                  String methodName, String status, String details) {
        try {
            // Get current user from security service
            String username = null;
            if (securityService.isAuthenticated()) {
                User currentUser = securityService.getCurrentUser();
                if (currentUser != null) {
                    username = currentUser.getEmail();
                }
            }

            activityLogService.logAuditAction(userId, username, action, null, null, status, details, null);
        } catch (Exception e) {
            log.error("Failed to persist audit log: {}", e.getMessage());
        }
    }
}

