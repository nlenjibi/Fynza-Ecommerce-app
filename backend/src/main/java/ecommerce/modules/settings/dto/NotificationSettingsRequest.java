package ecommerce.modules.settings.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationSettingsRequest {
    private Boolean emailNotifications;
    private Boolean orderNotifications;
    private Boolean refundNotifications;
    private Boolean sellerNotifications;
}
