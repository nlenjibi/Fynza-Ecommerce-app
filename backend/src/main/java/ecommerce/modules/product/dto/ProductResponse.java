package ecommerce.modules.product.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {
    private UUID id;
    private String name;
    private String description;
    private String brand;
    private String sku;
    private CategoryInfo category;
    private BigDecimal price;
    private BigDecimal originalPrice;
    private BigDecimal discount;
    private BigDecimal rating;
    private Integer reviewCount;
    private List<String> images;
    private List<ProductVariantResponse> variants;
    private Boolean inStock;
    private Integer stockCount;
    private SellerInfo seller;
    private LocalDateTime createdAt;
}
