package ecommerce.modules.settings.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SecuritySettingsRequest {
    private Boolean twoFactorEnabled;
    private Integer sessionTimeoutMinutes;
    private Boolean loginNotifications;
}
