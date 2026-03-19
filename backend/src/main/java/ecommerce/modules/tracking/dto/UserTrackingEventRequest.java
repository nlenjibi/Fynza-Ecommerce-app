package ecommerce.modules.tracking.dto;

import ecommerce.common.enums.TrackingEventType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserTrackingEventRequest {

    private TrackingEventType eventType;

    private UUID userId;

    private String sessionId;

    private UUID productId;

    private String productName;

    private String category;

    private BigDecimal price;

    private String source;

    private String referrer;

    private String utmCampaign;

    private String utmSource;

    private String metadata;
}
