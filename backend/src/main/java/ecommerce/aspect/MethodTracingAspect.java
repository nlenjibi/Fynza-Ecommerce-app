package ecommerce.aspect;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import java.util.Stack;
import java.util.UUID;

/**
 * Method Tracing Aspect
 * 
 * Provides distributed tracing capabilities for method calls across the application.
 * Tracks method call hierarchy, execution flow, and call chains.
 * 
 * Features:
 * - Hierarchical method call tracking
 * - Trace ID generation for request tracking
 * - Call depth visualization
 * - Execution flow analysis
 * - Performance profiling with call hierarchy
 * - Support for distributed tracing integration
 * 
 * Useful for:
 * - Debugging complex workflows
 * - Understanding execution paths
 * - Performance bottleneck identification
 * - Distributed system troubleshooting
 */
@Aspect
@Component
@Slf4j
public class MethodTracingAspect {

    // Thread-local storage for trace context
    private static final ThreadLocal<TraceContext> traceContext = ThreadLocal.withInitial(TraceContext::new);

    /**
     * Pointcut for all service methods
     */
    @Pointcut("execution(* ecommerce.modules..service..*.*(..))")
    public void serviceMethodsPointcut() {}

    /**
     * Trace all service method executions
     */
    @Around("serviceMethodsPointcut()")
    public Object traceMethod(ProceedingJoinPoint joinPoint) throws Throwable {
        String methodName = joinPoint.getSignature().getName();
        String className = joinPoint.getTarget().getClass().getSimpleName();
        String fullMethodName = className + "." + methodName;

        TraceContext context = traceContext.get();
        
        // Initialize trace ID for root call
        if (context.callStack.isEmpty()) {
            context.traceId = UUID.randomUUID().toString().substring(0, 8);
            log.info("🔍 Starting new trace: {}", context.traceId);
        }

        // Track call depth
        int depth = context.callStack.size();
        context.callStack.push(fullMethodName);

        // Create indentation for visualization
        String indent = createIndent(depth);
        String arrow = depth == 0 ? "▶" : "└─▶";

        long startTime = System.currentTimeMillis();

        // Log method entry
        log.debug("{}[{}] {} {} ENTER", indent, context.traceId, arrow, fullMethodName);

        try {
            // Execute the method
            Object result = joinPoint.proceed();

            long duration = System.currentTimeMillis() - startTime;

            // Log method exit
            log.debug("{}[{}] {} {} EXIT ({} ms)", 
                indent, context.traceId, arrow, fullMethodName, duration);

            return result;

        } catch (Throwable ex) {
            long duration = System.currentTimeMillis() - startTime;

            // Log method exception
            log.error("{}[{}] {} {} EXCEPTION: {} ({} ms)", 
                indent, context.traceId, arrow, fullMethodName, 
                ex.getClass().getSimpleName(), duration);

            throw ex;

        } finally {
            // Pop from call stack
            context.callStack.pop();

            // Clear trace context when returning to root
            if (context.callStack.isEmpty()) {
                long totalDuration = System.currentTimeMillis() - context.startTime;
                log.info("✅ Trace {} completed in {} ms", context.traceId, totalDuration);
                
                // Generate call tree summary
                if (log.isDebugEnabled()) {
                    logCallTreeSummary(context);
                }
                
                traceContext.remove();
            }
        }
    }

    /**
     * Create indentation for hierarchical visualization
     */
    private String createIndent(int depth) {
        if (depth == 0) return "";
        
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < depth; i++) {
            sb.append("  │ ");
        }
        return sb.toString();
    }

    /**
     * Log call tree summary
     */
    private void logCallTreeSummary(TraceContext context) {
        StringBuilder summary = new StringBuilder();
        summary.append("\n╔════════════════════════════════════════════════════════════");
        summary.append("\n║ 📊 TRACE SUMMARY");
        summary.append("\n╠════════════════════════════════════════════════════════════");
        summary.append("\n║ Trace ID:       ").append(context.traceId);
        summary.append("\n║ Total Methods:  ").append(context.methodCount);
        summary.append("\n║ Max Depth:      ").append(context.maxDepth);
        summary.append("\n║ Total Duration: ").append(System.currentTimeMillis() - context.startTime).append(" ms");
        summary.append("\n╚════════════════════════════════════════════════════════════");
        
        log.debug(summary.toString());
    }

    /**
     * Get current trace ID
     */
    public static String getCurrentTraceId() {
        TraceContext context = traceContext.get();
        return context != null ? context.traceId : null;
    }

    /**
     * Trace context class
     */
    private static class TraceContext {
        String traceId;
        final Stack<String> callStack = new Stack<>();
        final long startTime = System.currentTimeMillis();
        int methodCount = 0;
        int maxDepth = 0;

        public TraceContext() {
            this.traceId = UUID.randomUUID().toString().substring(0, 8);
        }
    }
}
