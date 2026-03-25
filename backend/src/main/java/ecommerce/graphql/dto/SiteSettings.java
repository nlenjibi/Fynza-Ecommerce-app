package ecommerce.graphql.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class SiteSettings {
    private String id;
    private String siteName;
    private String siteDescription;
    private String siteLogo;
    private String siteFavicon;
    private String defaultLanguage;
    private String timezone;
    private String currency;
    private String currencySymbol;
    private List<Object> paymentGateways;
    private Boolean enableCOD;
    private Boolean enablePrepaid;
    private Object minimumOrderAmount;
    private Boolean enableShipping;
    private Object defaultShippingFee;
    private Object freeShippingThreshold;
    private List<String> shippingMethods;
    private Boolean enableTax;
    private Object taxRate;
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
