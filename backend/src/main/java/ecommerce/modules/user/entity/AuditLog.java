package ecommerce.modules.user.entity;

import ecommerce.common.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.UUID;

@Entity
@Table(name = "audit_logs", indexes = {
        @Index(name = "idx_audit_logs_user_id", columnList = "user_id"),
        @Index(name = "idx_audit_logs_action", columnList = "action"),
        @Index(name = "idx_audit_logs_timestamp", columnList = "created_at"),
        @Index(name = "idx_audit_logs_status", columnList = "status")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class AuditLog extends BaseEntity {

    @Column(name = "user_id")
    private UUID userId;

    @Column(name = "username", length = 100)
    private String username;

    @Column(name = "action", nullable = false, length = 50)
    private String action;

    @Column(name = "entity_type", length = 100)
    private String entityType;

    @Column(name = "entity_id", columnDefinition = "UUID")
    private UUID entityId;

    @Column(name = "method_name", length = 200)
    private String methodName;

    @Column(name = "class_name", length = 200)
    private String className;

    @Column(name = "status", nullable = false, length = 20)
    private String status;

    @Column(name = "details", length = 1000)
    private String details;

    @Column(name = "ip_address", length = 50)
    private String ipAddress;

    @Column(name = "request_method", length = 10)
    private String requestMethod;

    @Column(name = "request_path", length = 500)
    private String requestPath;

    public enum AuditStatus {
        SUCCESS,
        FAILURE,
        ATTEMPTED
    }

    public enum AuditAction {
        CREATE,
        UPDATE,
        DELETE,
        READ,
        LOGIN,
        LOGOUT,
        CHANGE_PASSWORD,
        ROLE_CHANGE,
        STATUS_CHANGE,
        LOCK,
        UNLOCK
    }
}
