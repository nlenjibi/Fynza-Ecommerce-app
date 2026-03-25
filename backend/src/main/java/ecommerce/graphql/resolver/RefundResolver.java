package ecommerce.graphql.resolver;

import ecommerce.common.response.PaginatedResponse;
import ecommerce.graphql.dto.RefundConnection;
import ecommerce.graphql.dto.RefundStats;
import ecommerce.graphql.input.PageInput;
import ecommerce.graphql.input.RefundApprovalInput;
import ecommerce.graphql.input.RefundRequestInput;
import ecommerce.modules.refund.dto.RefundResponse;
import ecommerce.modules.refund.dto.RefundStatsResponse;
import ecommerce.modules.refund.service.RefundService;
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

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
@Slf4j
public class RefundResolver {

    private final RefundService refundService;

    @QueryMapping
    public RefundConnection myRefunds(
            @Argument PageInput pagination,
            @ContextValue UUID userId) {
        log.info("GraphQL Query: myRefunds(userId: {})", userId);
        
        Pageable pageable = createPageable(pagination);
        Page<RefundResponse> refundsPage = refundService.getRefundsByCustomer(userId, pageable);
        
        return RefundConnection.builder()
                .content(refundsPage.getContent())
                .pageInfo(PaginatedResponse.from(refundsPage))
                .build();
    }

    @QueryMapping
    public Object refund(@Argument UUID id) {
        log.info("GraphQL Query: refund(id: {})", id);
        return null;
    }

    @QueryMapping
    public List<Object> orderRefunds(@Argument UUID orderId) {
        log.info("GraphQL Query: orderRefunds(orderId: {})", orderId);
        return List.of();
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public RefundConnection allRefunds(
            @Argument String status,
            @Argument LocalDateTime fromDate,
            @Argument LocalDateTime toDate,
            @Argument PageInput pagination) {
        log.info("GraphQL Query: allRefunds");
        
        Pageable pageable = createPageable(pagination);
        
        return RefundConnection.builder()
                .content(List.of())
                .pageInfo(PaginatedResponse.from(Page.empty()))
                .build();
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public RefundStats refundStats(
            @Argument LocalDateTime fromDate,
            @Argument LocalDateTime toDate) {
        log.info("GraphQL Query: refundStats");
        
        RefundStatsResponse stats = refundService.getRefundStats();
        
        return RefundStats.builder()
                .totalRefunds((int) stats.getTotalRefunds())
                .totalAmount(stats.getTotalAmount())
                .pendingCount((int) stats.getPendingCount())
                .approvedCount((int) stats.getApprovedCount())
                .rejectedCount((int) stats.getRejectedCount())
                .completedCount((int) stats.getCompletedCount())
                .averageRefundAmount(stats.getAverageRefundAmount())
                .build();
    }

    @MutationMapping
    public Object requestRefund(
            @Argument RefundRequestInput input,
            @ContextValue UUID userId) {
        log.info("GraphQL Mutation: requestRefund(orderId: {}, userId: {})", input.getOrderId(), userId);
        return null;
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Object reviewRefund(
            @Argument UUID refundId,
            @Argument RefundApprovalInput input,
            @ContextValue UUID adminId) {
        log.info("GraphQL Mutation: reviewRefund(refundId: {}, approved: {})", refundId, input.getApproved());
        
        if (Boolean.TRUE.equals(input.getApproved())) {
            return refundService.approveRefund(refundId, adminId, input.getComment());
        } else {
            return refundService.rejectRefund(refundId, adminId, input.getComment());
        }
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Object processRefund(@Argument UUID refundId) {
        log.info("GraphQL Mutation: processRefund(refundId: {})", refundId);
        return refundService.completeRefund(refundId, null);
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Object cancelRefund(
            @Argument UUID refundId,
            @Argument String reason) {
        log.info("GraphQL Mutation: cancelRefund(refundId: {}, reason: {})", refundId, reason);
        return null;
    }

    private Pageable createPageable(PageInput input) {
        if (input == null) {
            return PageRequest.of(0, 20, Sort.by(Sort.Direction.DESC, "createdAt"));
        }
        Sort.Direction direction = input.getDirection() == ecommerce.graphql.input.SortDirection.DESC
                ? Sort.Direction.DESC : Sort.Direction.ASC;
        String sortBy = input.getSortBy() != null ? input.getSortBy() : "createdAt";
        return PageRequest.of(input.getPage(), input.getSize(), Sort.by(direction, sortBy));
    }
}
