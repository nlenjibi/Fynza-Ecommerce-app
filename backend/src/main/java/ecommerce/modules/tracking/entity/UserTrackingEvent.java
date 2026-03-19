package ecommerce.modules.tracking.entity;

import ecommerce.common.base.BaseEntity;
import ecommerce.common.enums.TrackingEventType;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_tracking_events", indexes = {
        @Index(name = "idx_tracking_event_type", columnList = "event_type"),
        @Index(name = "idx_tracking_user_id", columnList = "user_id"),
        @Index(name = "idx_tracking_session_id", columnList = "session_id"),
        @Index(name = "idx_tracking_product_id", columnList = "product_id"),
        @Index(name = "idx_tracking_event_timestamp", columnList = "event_timestamp"),
        @Index(name = "idx_tracking_created_at", columnList = "created_at")
})
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
public class UserTrackingEvent extends BaseEntity {

    @EqualsAndHashCode.Include
    @Enumerated(EnumType.STRING)
    @Column(name = "event_type", nullable = false, length = 30)
    private TrackingEventType eventType;

    @Column(name = "user_id", columnDefinition = "UUID")
    private java.util.UUID userId;

    @Column(name = "session_id", length = 100)
    private String sessionId;

    @Column(name = "product_id", columnDefinition = "UUID")
    private java.util.UUID productId;

    @Column(name = "product_name", length = 255)
    private String productName;

    @Column(name = "category", length = 100)
    private String category;

    @Column(name = "price", precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "source", length = 100)
    private String source;

    @Column(name = "referrer", length = 500)
    private String referrer;

    @Column(name = "utm_campaign", length = 100)
    private String utmCampaign;

    @Column(name = "utm_source", length = 100)
    private String utmSource;

    @Column(name = "ip_address", length = 50)
    private String ipAddress;

    @Column(name = "user_agent", length = 500)
    private String userAgent;

    @Column(name = "device_type", length = 20)
    private String deviceType;

    @Column(name = "country", length = 100)
    private String country;

    @Column(name = "city", length = 100)
    private String city;

    @Column(name = "event_timestamp", nullable = false)
    private LocalDateTime eventTimestamp;

    @Column(name = "metadata", columnDefinition = "TEXT")
    private String metadata;
}
