package ecommerce.graphql.resolver;

import ecommerce.common.response.PaginatedResponse;
import ecommerce.graphql.dto.PaymentTransactionConnection;
import ecommerce.graphql.input.InitiatePaymentInput;
import ecommerce.graphql.input.PageInput;
import ecommerce.graphql.input.PaymentMethodInput;
import ecommerce.graphql.input.PaymentWebhookInput;
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
public class PaymentResolver {

    @QueryMapping
    public PaymentTransactionConnection paymentTransactions(
            @Argument String status,
            @Argument PageInput pagination,
            @ContextValue UUID userId) {
        log.info("GraphQL Query: paymentTransactions(userId: {})", userId);
        
        Pageable pageable = createPageable(pagination);
        
        return PaymentTransactionConnection.builder()
                .content(List.of())
                .pageInfo(PaginatedResponse.from(Page.empty()))
                .build();
    }

    @QueryMapping
    public Object paymentTransaction(@Argument UUID id) {
        log.info("GraphQL Query: paymentTransaction(id: {})", id);
        return null;
    }

    @QueryMapping
    public List<Object> savedPaymentMethods(@ContextValue UUID userId) {
        log.info("GraphQL Query: savedPaymentMethods(userId: {})", userId);
        return List.of();
    }

    @QueryMapping
    public Object defaultPaymentMethod(@ContextValue UUID userId) {
        log.info("GraphQL Query: defaultPaymentMethod(userId: {})", userId);
        return null;
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public PaymentTransactionConnection allPaymentTransactions(
            @Argument String status,
            @Argument LocalDateTime fromDate,
            @Argument LocalDateTime toDate,
            @Argument PageInput pagination) {
        log.info("GraphQL Query: allPaymentTransactions");
        
        Pageable pageable = createPageable(pagination);
        
        return PaymentTransactionConnection.builder()
                .content(List.of())
                .pageInfo(PaginatedResponse.from(Page.empty()))
                .build();
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public PaymentStats paymentStats(
            @Argument LocalDateTime fromDate,
            @Argument LocalDateTime toDate) {
        log.info("GraphQL Query: paymentStats");
        
        return PaymentStats.builder()
                .totalAmount(BigDecimal.ZERO)
                .successfulAmount(BigDecimal.ZERO)
                .failedAmount(BigDecimal.ZERO)
                .refundedAmount(BigDecimal.ZERO)
                .transactionCount(0)
                .successRate(0f)
                .build();
    }

    @MutationMapping
    public Object initiatePayment(
            @Argument InitiatePaymentInput input,
            @ContextValue UUID userId) {
        log.info("GraphQL Mutation: initiatePayment(orderId: {}, userId: {})", input.getOrderId(), userId);
        return null;
    }

    @MutationMapping
    public Object processPaymentWebhook(@Argument PaymentWebhookInput input) {
        log.info("GraphQL Mutation: processPaymentWebhook(transactionId: {})", input.getTransactionId());
        return null;
    }

    @MutationMapping
    public Object cancelPayment(
            @Argument UUID transactionId,
            @ContextValue UUID userId) {
        log.info("GraphQL Mutation: cancelPayment(transactionId: {}, userId: {})", transactionId, userId);
        return null;
    }

    @MutationMapping
    public Object savePaymentMethod(
            @Argument PaymentMethodInput input,
            @ContextValue UUID userId) {
        log.info("GraphQL Mutation: savePaymentMethod(userId: {})", userId);
        return null;
    }

    @MutationMapping
    public boolean deletePaymentMethod(
            @Argument UUID id,
            @ContextValue UUID userId) {
        log.info("GraphQL Mutation: deletePaymentMethod(id: {}, userId: {})", id, userId);
        return true;
    }

    @MutationMapping
    public Object setDefaultPaymentMethod(
            @Argument UUID id,
            @ContextValue UUID userId) {
        log.info("GraphQL Mutation: setDefaultPaymentMethod(id: {}, userId: {})", id, userId);
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

    @lombok.Data
    @lombok.Builder
    public static class PaymentStats {
        private BigDecimal totalAmount;
        private BigDecimal successfulAmount;
        private BigDecimal failedAmount;
        private BigDecimal refundedAmount;
        private int transactionCount;
        private float successRate;
    }
}
