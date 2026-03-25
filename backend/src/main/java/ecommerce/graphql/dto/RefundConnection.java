package ecommerce.graphql.dto;

import ecommerce.common.response.PaginatedResponse;
import ecommerce.modules.refund.dto.RefundResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RefundConnection {
    private List<RefundResponse> content;
    private PaginatedResponse<RefundResponse> pageInfo;
}
