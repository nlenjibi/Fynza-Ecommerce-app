package ecommerce.graphql.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class RefundStats {
    private int totalRefunds;
    private BigDecimal totalAmount;
    private int pendingCount;
    private int approvedCount;
    private int rejectedCount;
    private int completedCount;
    private BigDecimal averageRefundAmount;
}
