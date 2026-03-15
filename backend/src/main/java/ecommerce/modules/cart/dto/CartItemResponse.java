package ecommerce.modules.cart.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemResponse {
    private UUID id;
    private UUID productId;
    private String productName;
    private UUID variantId;
    private String size;
    private String color;
    private BigDecimal price;
    private Integer quantity;
    private String image;
    private BigDecimal subtotal;
    private Boolean reserved;
    private LocalDateTime reservationExpiresAt;
}
