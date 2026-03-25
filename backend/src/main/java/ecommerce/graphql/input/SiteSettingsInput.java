package ecommerce.graphql.input;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SiteSettingsInput {
    private String siteName;
    private String siteDescription;
    private String siteLogo;
    private String siteFavicon;
    private String defaultLanguage;
    private String timezone;
    private String currency;
    private String currencySymbol;
    private List<PaymentGatewayConfigInput> paymentGateways;
    private Boolean enableCOD;
    private Boolean enablePrepaid;
    private BigDecimal minimumOrderAmount;
    private Boolean enableShipping;
    private BigDecimal defaultShippingFee;
    private BigDecimal freeShippingThreshold;
    private List<String> shippingMethods;
    private Boolean enableTax;
    private BigDecimal taxRate;
    private Boolean taxInclusive;
    private String emailFrom;
    private String emailFromName;
    private String smtpHost;
    private Integer smtpPort;
    private String smtpUsername;
    private String smtpPassword;
    private Boolean enableEmailNotifications;
    private Boolean enablePushNotifications;
    private Boolean enableSMSNotifications;
    private String orderNotificationEmail;
    private Boolean enable2FA;
    private Integer passwordMinLength;
    private Integer sessionTimeout;
    private Integer maxLoginAttempts;
    private Integer lockoutDuration;
    private Boolean maintenanceMode;
    private String maintenanceMessage;
    private String metaKeywords;
    private String metaDescription;
}
