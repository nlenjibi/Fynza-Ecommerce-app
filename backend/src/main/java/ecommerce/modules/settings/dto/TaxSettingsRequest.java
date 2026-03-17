package ecommerce.modules.settings.dto;

import lombok.*;
import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaxSettingsRequest {
    private BigDecimal taxRate;
    private String taxNumber;
}
