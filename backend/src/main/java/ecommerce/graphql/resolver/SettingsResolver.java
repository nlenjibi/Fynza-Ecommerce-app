package ecommerce.graphql.resolver;

import ecommerce.graphql.dto.SiteSettings;
import ecommerce.graphql.dto.SocialLinks;
import ecommerce.graphql.input.SiteSettingsInput;
import ecommerce.graphql.input.SocialLinksInput;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
@Slf4j
public class SettingsResolver {

    @QueryMapping
    public SiteSettings siteSettings() {
        log.info("GraphQL Query: siteSettings");
        
        return SiteSettings.builder()
                .id(UUID.randomUUID().toString())
                .siteName("Fynza Ecommerce")
                .siteDescription("Your trusted ecommerce platform")
                .currency("USD")
                .currencySymbol("$")
                .enableCOD(true)
                .enablePrepaid(true)
                .enableShipping(true)
                .enableTax(true)
                .taxRate(new BigDecimal("10.00"))
                .taxInclusive(false)
                .enableEmailNotifications(true)
                .enablePushNotifications(true)
                .enableSMSNotifications(false)
                .enable2FA(false)
                .passwordMinLength(8)
                .maintenanceMode(false)
                .paymentGateways(List.of())
                .shippingMethods(List.of("STANDARD", "EXPRESS"))
                .build();
    }

    @QueryMapping
    public SocialLinks socialLinks() {
        log.info("GraphQL Query: socialLinks");
        
        return SocialLinks.builder()
                .id(UUID.randomUUID().toString())
                .facebook("https://facebook.com/fynza")
                .twitter("https://twitter.com/fynza")
                .instagram("https://instagram.com/fynza")
                .youtube("https://youtube.com/fynza")
                .isActive(true)
                .build();
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public SiteSettings updateSiteSettings(@Argument SiteSettingsInput input) {
        log.info("GraphQL Mutation: updateSiteSettings");
        
        return SiteSettings.builder()
                .id(UUID.randomUUID().toString())
                .siteName(input.getSiteName() != null ? input.getSiteName() : "Fynza Ecommerce")
                .siteDescription(input.getSiteDescription())
                .siteLogo(input.getSiteLogo())
                .siteFavicon(input.getSiteFavicon())
                .defaultLanguage(input.getDefaultLanguage())
                .timezone(input.getTimezone())
                .currency(input.getCurrency() != null ? input.getCurrency() : "USD")
                .currencySymbol(input.getCurrencySymbol() != null ? input.getCurrencySymbol() : "$")
                .enableCOD(input.getEnableCOD() != null ? input.getEnableCOD() : true)
                .enablePrepaid(input.getEnablePrepaid() != null ? input.getEnablePrepaid() : true)
                .minimumOrderAmount(input.getMinimumOrderAmount())
                .enableShipping(input.getEnableShipping() != null ? input.getEnableShipping() : true)
                .defaultShippingFee(input.getDefaultShippingFee())
                .freeShippingThreshold(input.getFreeShippingThreshold())
                .shippingMethods(input.getShippingMethods() != null ? input.getShippingMethods() : List.of("STANDARD", "EXPRESS"))
                .enableTax(input.getEnableTax() != null ? input.getEnableTax() : true)
                .taxRate(input.getTaxRate())
                .taxInclusive(input.getTaxInclusive() != null ? input.getTaxInclusive() : false)
                .emailFrom(input.getEmailFrom())
                .emailFromName(input.getEmailFromName())
                .smtpHost(input.getSmtpHost())
                .smtpPort(input.getSmtpPort())
                .enableEmailNotifications(input.getEnableEmailNotifications() != null ? input.getEnableEmailNotifications() : true)
                .enablePushNotifications(input.getEnablePushNotifications() != null ? input.getEnablePushNotifications() : true)
                .enableSMSNotifications(input.getEnableSMSNotifications() != null ? input.getEnableSMSNotifications() : false)
                .enable2FA(input.getEnable2FA() != null ? input.getEnable2FA() : false)
                .passwordMinLength(input.getPasswordMinLength() != null ? input.getPasswordMinLength() : 8)
                .maintenanceMode(input.getMaintenanceMode() != null ? input.getMaintenanceMode() : false)
                .maintenanceMessage(input.getMaintenanceMessage())
                .metaKeywords(input.getMetaKeywords())
                .metaDescription(input.getMetaDescription())
                .build();
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public SocialLinks updateSocialLinks(@Argument SocialLinksInput input) {
        log.info("GraphQL Mutation: updateSocialLinks");
        
        return SocialLinks.builder()
                .id(UUID.randomUUID().toString())
                .facebook(input.getFacebook())
                .twitter(input.getTwitter())
                .instagram(input.getInstagram())
                .youtube(input.getYoutube())
                .linkedin(input.getLinkedin())
                .pinterest(input.getPinterest())
                .tiktok(input.getTiktok())
                .whatsapp(input.getWhatsapp())
                .telegram(input.getTelegram())
                .isActive(true)
                .build();
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public SiteSettings resetSiteSettings() {
        log.info("GraphQL Mutation: resetSiteSettings");
        
        return SiteSettings.builder()
                .id(UUID.randomUUID().toString())
                .siteName("Fynza Ecommerce")
                .siteDescription("Your trusted ecommerce platform")
                .currency("USD")
                .currencySymbol("$")
                .enableCOD(true)
                .enablePrepaid(true)
                .enableShipping(true)
                .enableTax(true)
                .taxRate(new BigDecimal("10.00"))
                .taxInclusive(false)
                .enableEmailNotifications(true)
                .enablePushNotifications(true)
                .enableSMSNotifications(false)
                .enable2FA(false)
                .passwordMinLength(8)
                .maintenanceMode(false)
                .paymentGateways(List.of())
                .shippingMethods(List.of("STANDARD", "EXPRESS"))
                .build();
    }
}
