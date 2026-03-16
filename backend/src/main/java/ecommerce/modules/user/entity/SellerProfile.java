package ecommerce.modules.user.entity;

import ecommerce.common.base.BaseEntity;
import ecommerce.common.enums.VerificationStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "seller_profiles", indexes = {
        @Index(name = "idx_seller_user_id", columnList = "user_id"),
        @Index(name = "idx_seller_verification", columnList = "verificationStatus")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class SellerProfile extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "store_name", nullable = false, length = 255)
    private String storeName;

    @Column(name = "store_description", columnDefinition = "TEXT")
    private String storeDescription;

    @Column(name = "store_website", length = 500)
    private String storeWebsite;

    @Column(name = "store_logo", length = 500)
    private String storeLogo;

    @Column(precision = 3, scale = 2)
    @Builder.Default
    private BigDecimal rating = BigDecimal.ZERO;

    @Column(name = "total_reviews")
    @Builder.Default
    private Integer totalReviews = 0;

    @Column(name = "total_products")
    @Builder.Default
    private Integer totalProducts = 0;

    @Column(name = "total_sales")
    @Builder.Default
    private Integer totalSales = 0;

    @Column(name = "total_revenue", precision = 12, scale = 2)
    @Builder.Default
    private BigDecimal totalRevenue = BigDecimal.ZERO;

    @Enumerated(EnumType.STRING)
    @Column(name = "verification_status")
    @Builder.Default
    private VerificationStatus verificationStatus = VerificationStatus.PENDING;

    @Column(name = "business_registration", length = 500)
    private String businessRegistration;

    @Column(name = "tax_id", length = 100)
    private String taxId;

    @Column(name = "bank_name", length = 255)
    private String bankName;

    @Column(name = "account_holder_name", length = 255)
    private String accountHolderName;

    @Column(name = "account_number", length = 100)
    private String accountNumber;
}
