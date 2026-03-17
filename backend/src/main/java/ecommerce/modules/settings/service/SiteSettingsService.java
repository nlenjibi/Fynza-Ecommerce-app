package ecommerce.modules.settings.service;

import ecommerce.modules.settings.dto.*;
import ecommerce.modules.settings.entity.SiteSettings;
import ecommerce.modules.settings.entity.SocialLinks;
import ecommerce.modules.settings.repository.SiteSettingsRepository;
import ecommerce.modules.settings.repository.SocialLinksRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SiteSettingsService {

    private final SiteSettingsRepository siteSettingsRepository;
    private final SocialLinksRepository socialLinksRepository;

    private SiteSettings getOrCreateSettings() {
        return siteSettingsRepository.findAll().stream().findFirst()
                .orElseGet(() -> siteSettingsRepository.save(SiteSettings.builder().build()));
    }

    @Transactional
    public GeneralSettingsResponse getGeneralSettings() {
        SiteSettings settings = getOrCreateSettings();
        return GeneralSettingsResponse.builder()
                .id(settings.getId())
                .siteName(settings.getSiteName())
                .siteEmail(settings.getSiteEmail())
                .sitePhone(settings.getSitePhone())
                .currency(settings.getCurrency())
                .timezone(settings.getTimezone())
                .updatedAt(settings.getUpdatedAt())
                .build();
    }

    @Transactional
    public GeneralSettingsResponse updateGeneralSettings(GeneralSettingsRequest request) {
        SiteSettings settings = getOrCreateSettings();
        settings.setSiteName(request.getSiteName());
        settings.setSiteEmail(request.getSiteEmail());
        settings.setSitePhone(request.getSitePhone());
        settings.setCurrency(request.getCurrency());
        settings.setTimezone(request.getTimezone());
        
        settings = siteSettingsRepository.save(settings);
        
        return GeneralSettingsResponse.builder()
                .id(settings.getId())
                .siteName(settings.getSiteName())
                .siteEmail(settings.getSiteEmail())
                .sitePhone(settings.getSitePhone())
                .currency(settings.getCurrency())
                .timezone(settings.getTimezone())
                .updatedAt(settings.getUpdatedAt())
                .build();
    }

    @Transactional
    public PaymentSettingsResponse getPaymentSettings() {
        SiteSettings settings = getOrCreateSettings();
        return PaymentSettingsResponse.builder()
                .id(settings.getId())
                .paystackPublicKey(maskKey(settings.getPaystackPublicKey()))
                .enableCashOnDelivery(settings.getEnableCashOnDelivery())
                .enableMobileMoney(settings.getEnableMobileMoney())
                .updatedAt(settings.getUpdatedAt())
                .build();
    }

    @Transactional
    public PaymentSettingsResponse updatePaymentSettings(PaymentSettingsRequest request) {
        SiteSettings settings = getOrCreateSettings();
        settings.setPaystackPublicKey(request.getPaystackPublicKey());
        settings.setPaystackSecretKey(request.getPaystackSecretKey());
        settings.setEnableCashOnDelivery(request.getEnableCashOnDelivery());
        settings.setEnableMobileMoney(request.getEnableMobileMoney());
        
        settings = siteSettingsRepository.save(settings);
        
        return PaymentSettingsResponse.builder()
                .id(settings.getId())
                .paystackPublicKey(maskKey(settings.getPaystackPublicKey()))
                .enableCashOnDelivery(settings.getEnableCashOnDelivery())
                .enableMobileMoney(settings.getEnableMobileMoney())
                .updatedAt(settings.getUpdatedAt())
                .build();
    }

    @Transactional
    public ShippingSettingsResponse getShippingSettings() {
        SiteSettings settings = getOrCreateSettings();
        return ShippingSettingsResponse.builder()
                .id(settings.getId())
                .shippingCost(settings.getShippingCost())
                .freeShippingThreshold(settings.getFreeShippingThreshold())
                .estimatedDeliveryDays(settings.getEstimatedDeliveryDays())
                .updatedAt(settings.getUpdatedAt())
                .build();
    }

    @Transactional
    public ShippingSettingsResponse updateShippingSettings(ShippingSettingsRequest request) {
        SiteSettings settings = getOrCreateSettings();
        settings.setShippingCost(request.getShippingCost());
        settings.setFreeShippingThreshold(request.getFreeShippingThreshold());
        settings.setEstimatedDeliveryDays(request.getEstimatedDeliveryDays());
        
        settings = siteSettingsRepository.save(settings);
        
        return ShippingSettingsResponse.builder()
                .id(settings.getId())
                .shippingCost(settings.getShippingCost())
                .freeShippingThreshold(settings.getFreeShippingThreshold())
                .estimatedDeliveryDays(settings.getEstimatedDeliveryDays())
                .updatedAt(settings.getUpdatedAt())
                .build();
    }

    @Transactional
    public TaxSettingsResponse getTaxSettings() {
        SiteSettings settings = getOrCreateSettings();
        return TaxSettingsResponse.builder()
                .id(settings.getId())
                .taxRate(settings.getTaxRate())
                .taxNumber(settings.getTaxNumber())
                .updatedAt(settings.getUpdatedAt())
                .build();
    }

    @Transactional
    public TaxSettingsResponse updateTaxSettings(TaxSettingsRequest request) {
        SiteSettings settings = getOrCreateSettings();
        settings.setTaxRate(request.getTaxRate());
        settings.setTaxNumber(request.getTaxNumber());
        
        settings = siteSettingsRepository.save(settings);
        
        return TaxSettingsResponse.builder()
                .id(settings.getId())
                .taxRate(settings.getTaxRate())
                .taxNumber(settings.getTaxNumber())
                .updatedAt(settings.getUpdatedAt())
                .build();
    }

    @Transactional
    public EmailSettingsResponse getEmailSettings() {
        SiteSettings settings = getOrCreateSettings();
        return EmailSettingsResponse.builder()
                .id(settings.getId())
                .smtpHost(settings.getSmtpHost())
                .smtpPort(settings.getSmtpPort())
                .smtpEmail(settings.getSmtpEmail())
                .updatedAt(settings.getUpdatedAt())
                .build();
    }

    @Transactional
    public EmailSettingsResponse updateEmailSettings(EmailSettingsRequest request) {
        SiteSettings settings = getOrCreateSettings();
        settings.setSmtpHost(request.getSmtpHost());
        settings.setSmtpPort(request.getSmtpPort());
        settings.setSmtpEmail(request.getSmtpEmail());
        settings.setSmtpPassword(request.getSmtpPassword());
        
        settings = siteSettingsRepository.save(settings);
        
        return EmailSettingsResponse.builder()
                .id(settings.getId())
                .smtpHost(settings.getSmtpHost())
                .smtpPort(settings.getSmtpPort())
                .smtpEmail(settings.getSmtpEmail())
                .updatedAt(settings.getUpdatedAt())
                .build();
    }

    @Transactional
    public NotificationSettingsResponse getNotificationSettings() {
        SiteSettings settings = getOrCreateSettings();
        return NotificationSettingsResponse.builder()
                .id(settings.getId())
                .emailNotifications(settings.getEmailNotifications())
                .orderNotifications(settings.getOrderNotifications())
                .refundNotifications(settings.getRefundNotifications())
                .sellerNotifications(settings.getSellerNotifications())
                .updatedAt(settings.getUpdatedAt())
                .build();
    }

    @Transactional
    public NotificationSettingsResponse updateNotificationSettings(NotificationSettingsRequest request) {
        SiteSettings settings = getOrCreateSettings();
        settings.setEmailNotifications(request.getEmailNotifications());
        settings.setOrderNotifications(request.getOrderNotifications());
        settings.setRefundNotifications(request.getRefundNotifications());
        settings.setSellerNotifications(request.getSellerNotifications());
        
        settings = siteSettingsRepository.save(settings);
        
        return NotificationSettingsResponse.builder()
                .id(settings.getId())
                .emailNotifications(settings.getEmailNotifications())
                .orderNotifications(settings.getOrderNotifications())
                .refundNotifications(settings.getRefundNotifications())
                .sellerNotifications(settings.getSellerNotifications())
                .updatedAt(settings.getUpdatedAt())
                .build();
    }

    @Transactional
    public SecuritySettingsResponse getSecuritySettings() {
        SiteSettings settings = getOrCreateSettings();
        return SecuritySettingsResponse.builder()
                .id(settings.getId())
                .twoFactorEnabled(settings.getTwoFactorEnabled())
                .sessionTimeoutMinutes(settings.getSessionTimeoutMinutes())
                .loginNotifications(settings.getLoginNotifications())
                .updatedAt(settings.getUpdatedAt())
                .build();
    }

    @Transactional
    public SecuritySettingsResponse updateSecuritySettings(SecuritySettingsRequest request) {
        SiteSettings settings = getOrCreateSettings();
        settings.setTwoFactorEnabled(request.getTwoFactorEnabled());
        settings.setSessionTimeoutMinutes(request.getSessionTimeoutMinutes());
        settings.setLoginNotifications(request.getLoginNotifications());
        
        settings = siteSettingsRepository.save(settings);
        
        return SecuritySettingsResponse.builder()
                .id(settings.getId())
                .twoFactorEnabled(settings.getTwoFactorEnabled())
                .sessionTimeoutMinutes(settings.getSessionTimeoutMinutes())
                .loginNotifications(settings.getLoginNotifications())
                .updatedAt(settings.getUpdatedAt())
                .build();
    }

    @Transactional
    public SocialLinksResponse getSocialLinks() {
        SocialLinks links = socialLinksRepository.findAll().stream().findFirst()
                .orElseGet(() -> socialLinksRepository.save(SocialLinks.builder().build()));
        return SocialLinksResponse.from(links);
    }

    @Transactional
    public SocialLinksResponse updateSocialLinks(SocialLinksRequest request) {
        SocialLinks links = socialLinksRepository.findAll().stream().findFirst()
                .orElseGet(() -> SocialLinks.builder().build());

        links.setFacebookUrl(request.getFacebookUrl());
        links.setTwitterUrl(request.getTwitterUrl());
        links.setInstagramUrl(request.getInstagramUrl());
        links.setLinkedinUrl(request.getLinkedinUrl());
        links.setYoutubeUrl(request.getYoutubeUrl());
        links.setTiktokUrl(request.getTiktokUrl());
        links.setPinterestUrl(request.getPinterestUrl());
        links.setWhatsappNumber(request.getWhatsappNumber());

        return SocialLinksResponse.from(socialLinksRepository.save(links));
    }

    private String maskKey(String key) {
        if (key == null || key.length() < 10) return key;
        return key.substring(0, 8) + "..." + key.substring(key.length() - 4);
    }
}
