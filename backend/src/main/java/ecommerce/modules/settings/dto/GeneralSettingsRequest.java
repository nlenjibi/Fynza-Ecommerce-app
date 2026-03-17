package ecommerce.modules.settings.dto;

import lombok.*;
import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GeneralSettingsRequest {
    private String siteName;
    private String siteEmail;
    private String sitePhone;
    private String currency;
    private String timezone;
}
