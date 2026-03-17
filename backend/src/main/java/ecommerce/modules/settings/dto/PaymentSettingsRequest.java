package ecommerce.modules.settings.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentSettingsRequest {
    private String paystackPublicKey;
    private String paystackSecretKey;
    private Boolean enableCashOnDelivery;
    private Boolean enableMobileMoney;
}
