package ecommerce.modules.settings.dto;

import lombok.*;
import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShippingSettingsRequest {
    private BigDecimal shippingCost;
    private BigDecimal freeShippingThreshold;
    private String estimatedDeliveryDays;
}
