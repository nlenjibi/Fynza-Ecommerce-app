package ecommerce.modules.settings.dto;

import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SecuritySettingsResponse {
    private UUID id;
    private Boolean twoFactorEnabled;
    private Integer sessionTimeoutMinutes;
    private Boolean loginNotifications;
    private LocalDateTime updatedAt;
}
