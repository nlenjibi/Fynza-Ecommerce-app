package ecommerce.modules.settings.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmailSettingsRequest {
    private String smtpHost;
    private String smtpPort;
    private String smtpEmail;
    private String smtpPassword;
}
