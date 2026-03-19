package ecommerce.modules.seller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StoreResponse {
    private UUID id;
    private String storeName;
    private String storeDescription;
    private String storeWebsite;
    private String storeLogo;
    private BigDecimal rating;
    private Integer totalReviews;
    private Integer totalProducts;
    private Integer totalSales;
    private BigDecimal totalRevenue;
    private String verificationStatus;
    private String businessRegistration;
    private String bankName;
}
