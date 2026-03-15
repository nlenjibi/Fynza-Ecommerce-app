package ecommerce.modules.cart.dto;

import ecommerce.modules.product.dto.ProductResponse;
import lombok.*;

import java.math.BigDecimal;



@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CartItemDto {
    private Long id;
    private ProductResponse product;
    private Integer quantity;
    private BigDecimal totalPrice;
}
