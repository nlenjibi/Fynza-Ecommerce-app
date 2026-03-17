package ecommerce.modules.settings.dto;

import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentSettingsResponse {
    private UUID id;
    private String paystackPublicKey;
    private Boolean enableCashOnDelivery;
    private Boolean enableMobileMoney;
    private LocalDateTime updatedAt;
}
