package ecommerce.modules.settings.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
