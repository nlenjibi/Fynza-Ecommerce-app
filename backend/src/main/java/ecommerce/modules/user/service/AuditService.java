package ecommerce.modules.user.service;

import ecommerce.modules.user.entity.AuditLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface AuditService {

    /**
     * Log an audit entry
     */
    AuditLog logAudit(AuditLog auditLog);

    /**
     * Create a simple audit log entry
     */
    AuditLog logAction(UUID userId, String username, String action, String entityType, 
                       UUID entityId, String methodName, String className, 
                       String status, String details);

    /**
     * Get audit logs for a specific user
     */
    Page<AuditLog> getAuditLogsByUserId(UUID userId, Pageable pageable);

    /**
     * Get audit logs by action type
     */
    Page<AuditLog> getAuditLogsByAction(String action, Pageable pageable);

    /**
     * Get audit logs by status
     */
    Page<AuditLog> getAuditLogsByStatus(String status, Pageable pageable);

    /**
     * Get audit logs within a date range
     */
    Page<AuditLog> getAuditLogsByDateRange(LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);

    /**
     * Get audit logs for a specific entity
     */
    List<AuditLog> getAuditLogsForEntity(String entityType, UUID entityId);
}
