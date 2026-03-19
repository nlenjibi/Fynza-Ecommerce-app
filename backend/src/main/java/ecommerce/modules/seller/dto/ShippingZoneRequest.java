package ecommerce.modules.seller.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShippingZoneRequest {
    @NotBlank(message = "Zone name is required")
    private String zoneName;
    
    private String zoneDescription;
    
    @NotNull(message = "Shipping cost is required")
    @Positive(message = "Shipping cost must be positive")
    private BigDecimal shippingCost;
    
    private String estimatedDays;
}
