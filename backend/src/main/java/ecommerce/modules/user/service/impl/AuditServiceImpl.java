package ecommerce.modules.user.service.impl;

import ecommerce.modules.user.entity.AuditLog;
import ecommerce.modules.user.repository.AuditLogRepository;
import ecommerce.modules.user.service.AuditService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Slf4j
@AllArgsConstructor
@Service
public class AuditServiceImpl implements AuditService {

    private final AuditLogRepository auditLogRepository;

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @Async
    public AuditLog logAudit(AuditLog auditLog) {
        try {
            AuditLog saved = auditLogRepository.save(auditLog);
            log.debug("Audit log persisted: {} - {}", auditLog.getAction(), auditLog.getStatus());
            return saved;
        } catch (Exception e) {
            log.error("Failed to persist audit log: {}", e.getMessage(), e);
            return null;
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @Async
    public AuditLog logAction(UUID userId, String username, String action, String entityType, 
                              UUID entityId, String methodName, String className, 
                              String status, String details) {
        try {
            AuditLog auditLog = AuditLog.builder()
                    .userId(userId)
                    .username(username)
                    .action(action)
                    .entityType(entityType)
                    .entityId(entityId)
                    .methodName(methodName)
                    .className(className)
                    .status(status)
                    .details(details)
                    .build();

            AuditLog saved = auditLogRepository.save(auditLog);
            log.debug("Audit action logged: {} by user {}", action, username);
            return saved;
        } catch (Exception e) {
            log.error("Failed to log audit action: {}", e.getMessage(), e);
            return null;
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AuditLog> getAuditLogsByUserId(UUID userId, Pageable pageable) {
        return auditLogRepository.findByUserId(userId, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AuditLog> getAuditLogsByAction(String action, Pageable pageable) {
        return auditLogRepository.findByAction(action, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AuditLog> getAuditLogsByStatus(String status, Pageable pageable) {
        return auditLogRepository.findByStatus(status, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AuditLog> getAuditLogsByDateRange(LocalDateTime startDate, LocalDateTime endDate, Pageable pageable) {
        return auditLogRepository.findByDateRange(startDate, endDate, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AuditLog> getAuditLogsForEntity(String entityType, UUID entityId) {
        return auditLogRepository.findByEntityTypeAndEntityId(entityType, entityId);
    }
}
