package ecommerce.modules.settings.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShippingSettingsResponse {
    private UUID id;
    private BigDecimal shippingCost;
    private BigDecimal freeShippingThreshold;
    private String estimatedDeliveryDays;
    private LocalDateTime updatedAt;
}
