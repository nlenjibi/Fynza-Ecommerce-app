package ecommerce.modules.seller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SellerDashboardResponse {

    private Long totalProducts;
    private Long totalOrders;
    private Long pendingOrders;
    private Long completedOrders;
    private BigDecimal totalRevenue;
    private BigDecimal monthlyRevenue;
    private Double averageRating;
    private Long totalCustomers;
}
