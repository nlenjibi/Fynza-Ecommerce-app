package ecommerce.graphql.resolver;

import ecommerce.modules.seller.dto.SellerAnalyticsResponse;
import ecommerce.modules.seller.dto.SellerDashboardResponse;
import ecommerce.modules.seller.service.SellerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.ContextValue;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
@RequiredArgsConstructor
@Slf4j
public class SellerResolver {

    private final SellerService sellerService;

    @QueryMapping
    @PreAuthorize("hasRole('SELLER')")
    public SellerDashboardResponse sellerDashboard(@ContextValue UUID sellerId) {
        log.info("GraphQL Query: sellerDashboard for seller {}", sellerId);
        return sellerService.getDashboard(sellerId);
    }

    @QueryMapping
    @PreAuthorize("hasRole('SELLER')")
    public SellerAnalyticsResponse sellerAnalytics(
            @Argument int days,
            @ContextValue UUID sellerId) {
        log.info("GraphQL Query: sellerAnalytics for seller {} with {} days", sellerId, days);
        return sellerService.getSalesAnalytics(sellerId, days);
    }
}
