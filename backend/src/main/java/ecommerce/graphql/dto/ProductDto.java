package ecommerce.graphql.dto;

import ecommerce.common.response.PaginatedResponse;
import ecommerce.modules.product.dto.ProductResponse;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder(setterPrefix = "with")
@Getter
@Setter
public class ProductDto {
    private List<ProductResponse> content;
    private PaginatedResponse<ProductResponse> pageInfo;


}
