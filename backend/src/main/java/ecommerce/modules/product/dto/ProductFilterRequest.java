package ecommerce.modules.product.dto;

import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductFilterRequest {
    private UUID categoryId;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private String search;
    private UUID sellerId;
    private String brand;
    private java.util.List<String> brands;
    private Boolean inStock;
    private String status;
}
