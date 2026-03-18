package ecommerce.modules.activity.entity;

import ecommerce.common.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.UUID;

@Entity
@Table(name = "activity_logs", indexes = {
    @Index(name = "idx_activity_user", columnList = "user_id"),
    @Index(name = "idx_activity_type", columnList = "activity_type"),
    @Index(name = "idx_activity_created", columnList = "created_at")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class ActivityLog extends BaseEntity {

    @Column(name = "user_id")
    private UUID userId;

    @Column(name = "user_name", length = 255)
    private String userName;

    @Column(name = "user_email", length = 255)
    private String userEmail;

    @Enumerated(EnumType.STRING)
    @Column(name = "activity_type", nullable = false, length = 50)
    private ActivityType activityType;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "entity_type", length = 100)
    private String entityType;

    @Column(name = "entity_id")
    private UUID entityId;

    @Column(name = "ip_address", length = 50)
    private String ipAddress;

    @Column(name = "user_agent", length = 500)
    private String userAgent;

    @Column(name = "old_values", columnDefinition = "TEXT")
    private String oldValues;

    @Column(name = "new_values", columnDefinition = "TEXT")
    private String newValues;

    @Column(name = "status", length = 20)
    private String status;

    public enum ActivityType {
        USER_LOGIN,
        USER_LOGOUT,
        USER_CREATED,
        USER_UPDATED,
        USER_DELETED,
        ORDER_CREATED,
        ORDER_UPDATED,
        ORDER_CANCELLED,
        PRODUCT_CREATED,
        PRODUCT_UPDATED,
        PRODUCT_DELETED,
        CATEGORY_CREATED,
        CATEGORY_UPDATED,
        CATEGORY_DELETED,
        REVIEW_APPROVED,
        REVIEW_REJECTED,
        COUPON_CREATED,
        COUPON_UPDATED,
        COUPON_DELETED,
        SETTINGS_UPDATED,
        PAYMENT_PROCESSED,
        REFUND_PROCESSED,
        DELIVERY_UPDATED,
        EXPORT_DATA,
        IMPORT_DATA
    }
}
