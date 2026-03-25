package ecommerce.graphql.resolver;

import ecommerce.common.response.PaginatedResponse;
import ecommerce.graphql.dto.OrderResponseDto;
import ecommerce.graphql.input.PageInput;
import ecommerce.graphql.input.SortDirection;
import ecommerce.modules.order.dto.OrderResponse;
import ecommerce.modules.order.dto.OrderStatusUpdateRequest;
import ecommerce.modules.seller.dto.SellerAnalyticsResponse;
import ecommerce.modules.seller.dto.SellerDashboardResponse;
import ecommerce.modules.seller.service.SellerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.ContextValue;
import org.springframework.graphql.data.method.annotation.MutationMapping;
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
    public OrderResponseDto sellerOrders(
            @Argument PageInput pagination,
            @ContextValue UUID sellerId) {
        log.info("GraphQL Query: sellerOrders for seller {}", sellerId);
        Pageable pageable = createPageable(pagination);
        Page<OrderResponse> orders = sellerService.getSellerOrders(sellerId, pageable);
        return OrderResponseDto.builder()
                .content(orders.getContent())
                .pageInfo(PaginatedResponse.from(orders))
                .build();
    }

    @QueryMapping
    @PreAuthorize("hasRole('SELLER')")
    public SellerAnalyticsResponse sellerAnalytics(
            @Argument int days,
            @ContextValue UUID sellerId) {
        log.info("GraphQL Query: sellerAnalytics for seller {} with {} days", sellerId, days);
        return sellerService.getSalesAnalytics(sellerId, days);
    }

    @MutationMapping
    @PreAuthorize("hasRole('SELLER')")
    public OrderResponse updateSellerOrderStatus(
            @Argument UUID orderId,
            @Argument OrderStatusUpdateRequest request,
            @ContextValue UUID sellerId) {
        log.info("GraphQL Mutation: updateSellerOrderStatus for order {}", orderId);
        return sellerService.updateOrderStatus(orderId, request, sellerId);
    }

    private Pageable createPageable(PageInput input) {
        if (input == null) {
            return PageRequest.of(0, 20, Sort.by(Sort.Direction.DESC, "createdAt"));
        }
        Sort sort = input.getDirection() == SortDirection.DESC
                ? Sort.by(input.getSortBy()).descending()
                : Sort.by(input.getSortBy()).ascending();
        return PageRequest.of(input.getPage(), input.getSize(), sort);
    }
}
