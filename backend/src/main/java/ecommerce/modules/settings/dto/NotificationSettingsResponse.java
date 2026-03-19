package ecommerce.modules.settings.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationSettingsResponse {
    private UUID id;
    private Boolean emailNotifications;
    private Boolean orderNotifications;
    private Boolean refundNotifications;
    private Boolean sellerNotifications;
    private LocalDateTime updatedAt;
}
