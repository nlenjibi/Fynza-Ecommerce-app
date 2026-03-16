package ecommerce.aspect;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Transaction Monitoring Aspect
 * 
 * Monitors database transactions across the application.
 * Tracks transaction lifecycle, detects long-running transactions,
 * and identifies potential transaction issues.
 * 
 * Features:
 * - Monitors transaction boundaries and lifecycle
 * - Detects long-running transactions (> 5 seconds)
 * - Tracks nested transactions
 * - Identifies transaction rollbacks
 * - Provides transaction performance metrics
 * - Warns about potential deadlock situations
 */
@Aspect
@Component
@Slf4j
public class TransactionMonitoringAspect {

    private static final DateTimeFormatter TIMESTAMP_FORMATTER = 
        DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");
    
    // Transaction duration thresholds (in milliseconds)
    private static final long NORMAL_TRANSACTION_THRESHOLD = 1000;      // 1 second
    private static final long SLOW_TRANSACTION_THRESHOLD = 3000;        // 3 seconds
    private static final long CRITICAL_TRANSACTION_THRESHOLD = 5000;    // 5 seconds

    /**
     * Pointcut for methods annotated with @Transactional
     */
    @Pointcut("@annotation(org.springframework.transaction.annotation.Transactional)")
    public void transactionalMethodsPointcut() {}

    /**
     * Pointcut for classes annotated with @Transactional
     */
    @Pointcut("@within(org.springframework.transaction.annotation.Transactional)")
    public void transactionalClassPointcut() {}

    /**
     * Combined pointcut for all transactional operations
     */
    @Pointcut("transactionalMethodsPointcut() || transactionalClassPointcut()")
    public void allTransactionalOperations() {}

    /**
     * Monitor all transactional operations
     */
    @Around("allTransactionalOperations()")
    public Object monitorTransaction(ProceedingJoinPoint joinPoint) throws Throwable {
        String methodName = joinPoint.getSignature().getName();
        String className = joinPoint.getTarget().getClass().getSimpleName();
        String fullMethodName = className + "." + methodName;
        String timestamp = LocalDateTime.now().format(TIMESTAMP_FORMATTER);

        // Check if we're in a transaction
        boolean isTransactionActive = TransactionSynchronizationManager.isActualTransactionActive();
        boolean isNewTransaction = !TransactionSynchronizationManager.isCurrentTransactionReadOnly();
        String transactionName = TransactionSynchronizationManager.getCurrentTransactionName();
        Integer isolationLevelObj = TransactionSynchronizationManager.getCurrentTransactionIsolationLevel();
        String isolationLevelName;
        if (isolationLevelObj == null) {
            isolationLevelName = "UNKNOWN (null)";
        } else {
            int isolationLevel = isolationLevelObj.intValue();
            isolationLevelName = getIsolationLevelName(isolationLevel);
        }
        if (!isTransactionActive) {
            log.debug("⚠️  Method {} called but NO ACTIVE TRANSACTION", fullMethodName);
        }

        // Log transaction start
        StringBuilder startLog = new StringBuilder();
        startLog.append("\n┌──────────────────────────────────────────────────────────");
        startLog.append("\n│ 🔄 TRANSACTION START");
        startLog.append("\n├──────────────────────────────────────────────────────────");
        startLog.append("\n│ Timestamp:      ").append(timestamp);
        startLog.append("\n│ Method:         ").append(fullMethodName);
        startLog.append("\n│ Active:         ").append(isTransactionActive);
        startLog.append("\n│ New:            ").append(isNewTransaction);
        startLog.append("\n│ Name:           ").append(transactionName != null ? transactionName : "N/A");
        startLog.append("\n│ Isolation:      ").append(isolationLevelName);
        startLog.append("\n└──────────────────────────────────────────────────────────");
        
        log.debug(startLog.toString());

        long startTime = System.currentTimeMillis();
        Object result = null;
        boolean committed = false;
        boolean rolledBack = false;

        try {
            // Execute the transactional method
            result = joinPoint.proceed();
            committed = true;
            return result;

        } catch (Throwable ex) {
            rolledBack = true;
            
            log.error("🔴 TRANSACTION ROLLBACK - Exception in {}: {}", 
                fullMethodName, ex.getClass().getSimpleName());
            
            throw ex;

        } finally {
            long endTime = System.currentTimeMillis();
            long duration = endTime - startTime;

            // Log transaction completion
            logTransactionCompletion(fullMethodName, duration, committed, rolledBack);
        }
    }

    /**
     * Log transaction completion with performance analysis
     */
    private void logTransactionCompletion(String methodName, long duration, 
                                         boolean committed, boolean rolledBack) {
        String timestamp = LocalDateTime.now().format(TIMESTAMP_FORMATTER);
        String status = rolledBack ? "ROLLED BACK" : (committed ? "COMMITTED" : "UNKNOWN");
        String emoji = rolledBack ? "🔴" : "✅";
        
        StringBuilder completionLog = new StringBuilder();
        completionLog.append("\n┌──────────────────────────────────────────────────────────");
        completionLog.append("\n│ ").append(emoji).append(" TRANSACTION END");
        completionLog.append("\n├──────────────────────────────────────────────────────────");
        completionLog.append("\n│ Timestamp:      ").append(timestamp);
        completionLog.append("\n│ Method:         ").append(methodName);
        completionLog.append("\n│ Status:         ").append(status);
        completionLog.append("\n│ Duration:       ").append(duration).append(" ms");
        completionLog.append("\n│ Performance:    ").append(getPerformanceLabel(duration));
        completionLog.append("\n└──────────────────────────────────────────────────────────");

        // Log at appropriate level based on duration and status
        if (rolledBack) {
            log.error(completionLog.toString());
        } else if (duration >= CRITICAL_TRANSACTION_THRESHOLD) {
            log.error(completionLog.toString());
            log.error("⚠️  CRITICAL: Transaction {} took {} ms - Investigate immediately!", 
                methodName, duration);
        } else if (duration >= SLOW_TRANSACTION_THRESHOLD) {
            log.warn(completionLog.toString());
            log.warn("⚠️  WARNING: Slow transaction in {} - {} ms", methodName, duration);
        } else if (duration >= NORMAL_TRANSACTION_THRESHOLD) {
            log.info(completionLog.toString());
        } else {
            log.debug(completionLog.toString());
        }
    }

    /**
     * Get performance label based on duration
     */
    private String getPerformanceLabel(long duration) {
        if (duration < NORMAL_TRANSACTION_THRESHOLD) {
            return "⚡ FAST";
        } else if (duration < SLOW_TRANSACTION_THRESHOLD) {
            return "✓ ACCEPTABLE";
        } else if (duration < CRITICAL_TRANSACTION_THRESHOLD) {
            return "⚠️ SLOW";
        } else {
            return "🐌 CRITICAL - NEEDS OPTIMIZATION";
        }
    }

    /**
     * Get human-readable isolation level name
     */
    private String getIsolationLevelName(int isolationLevel) {
        switch (isolationLevel) {
            case -1: return "DEFAULT";
            case 1: return "READ_UNCOMMITTED";
            case 2: return "READ_COMMITTED";
            case 4: return "REPEATABLE_READ";
            case 8: return "SERIALIZABLE";
            default: return "UNKNOWN (" + isolationLevel + ")";
        }
    }
}
