package ecommerce.modules.settings.controller;

import ecommerce.modules.settings.dto.*;
import ecommerce.modules.settings.service.SiteSettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/settings")
@RequiredArgsConstructor
public class SettingsController {

    private final SiteSettingsService siteSettingsService;

    @GetMapping("/general")
    public ResponseEntity<GeneralSettingsResponse> getGeneralSettings() {
        return ResponseEntity.ok(siteSettingsService.getGeneralSettings());
    }

    @PutMapping("/general")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GeneralSettingsResponse> updateGeneralSettings(@RequestBody GeneralSettingsRequest request) {
        return ResponseEntity.ok(siteSettingsService.updateGeneralSettings(request));
    }

    @GetMapping("/payment")
    public ResponseEntity<PaymentSettingsResponse> getPaymentSettings() {
        return ResponseEntity.ok(siteSettingsService.getPaymentSettings());
    }

    @PutMapping("/payment")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PaymentSettingsResponse> updatePaymentSettings(@RequestBody PaymentSettingsRequest request) {
        return ResponseEntity.ok(siteSettingsService.updatePaymentSettings(request));
    }

    @GetMapping("/shipping")
    public ResponseEntity<ShippingSettingsResponse> getShippingSettings() {
        return ResponseEntity.ok(siteSettingsService.getShippingSettings());
    }

    @PutMapping("/shipping")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ShippingSettingsResponse> updateShippingSettings(@RequestBody ShippingSettingsRequest request) {
        return ResponseEntity.ok(siteSettingsService.updateShippingSettings(request));
    }

    @GetMapping("/tax")
    public ResponseEntity<TaxSettingsResponse> getTaxSettings() {
        return ResponseEntity.ok(siteSettingsService.getTaxSettings());
    }

    @PutMapping("/tax")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TaxSettingsResponse> updateTaxSettings(@RequestBody TaxSettingsRequest request) {
        return ResponseEntity.ok(siteSettingsService.updateTaxSettings(request));
    }

    @GetMapping("/email")
    public ResponseEntity<EmailSettingsResponse> getEmailSettings() {
        return ResponseEntity.ok(siteSettingsService.getEmailSettings());
    }

    @PutMapping("/email")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<EmailSettingsResponse> updateEmailSettings(@RequestBody EmailSettingsRequest request) {
        return ResponseEntity.ok(siteSettingsService.updateEmailSettings(request));
    }

    @GetMapping("/notifications")
    public ResponseEntity<NotificationSettingsResponse> getNotificationSettings() {
        return ResponseEntity.ok(siteSettingsService.getNotificationSettings());
    }

    @PutMapping("/notifications")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<NotificationSettingsResponse> updateNotificationSettings(@RequestBody NotificationSettingsRequest request) {
        return ResponseEntity.ok(siteSettingsService.updateNotificationSettings(request));
    }

    @GetMapping("/security")
    public ResponseEntity<SecuritySettingsResponse> getSecuritySettings() {
        return ResponseEntity.ok(siteSettingsService.getSecuritySettings());
    }

    @PutMapping("/security")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SecuritySettingsResponse> updateSecuritySettings(@RequestBody SecuritySettingsRequest request) {
        return ResponseEntity.ok(siteSettingsService.updateSecuritySettings(request));
    }

    @GetMapping("/social")
    public ResponseEntity<SocialLinksResponse> getSocialLinks() {
        return ResponseEntity.ok(siteSettingsService.getSocialLinks());
    }

    @PutMapping("/social")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SocialLinksResponse> updateSocialLinks(@RequestBody SocialLinksRequest request) {
        return ResponseEntity.ok(siteSettingsService.updateSocialLinks(request));
    }
}
