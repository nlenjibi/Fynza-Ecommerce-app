package ecommerce.modules.settings.dto;

import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GeneralSettingsResponse {
    private UUID id;
    private String siteName;
    private String siteEmail;
    private String sitePhone;
    private String currency;
    private String timezone;
    private LocalDateTime updatedAt;
}
