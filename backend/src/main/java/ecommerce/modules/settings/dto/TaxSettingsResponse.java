package ecommerce.modules.settings.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaxSettingsResponse {
    private UUID id;
    private BigDecimal taxRate;
    private String taxNumber;
    private LocalDateTime updatedAt;
}
