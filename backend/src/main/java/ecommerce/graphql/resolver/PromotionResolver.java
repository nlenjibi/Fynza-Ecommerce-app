package ecommerce.graphql.resolver;

import ecommerce.common.response.PaginatedResponse;
import ecommerce.graphql.dto.FlashSaleConnection;
import ecommerce.graphql.dto.PromotionConnection;
import ecommerce.graphql.input.FlashSaleInput;
import ecommerce.graphql.input.PageInput;
import ecommerce.graphql.input.PromotionInput;
import ecommerce.modules.promotion.dto.PromotionResponse;
import ecommerce.modules.promotion.service.PromotionService;
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

import java.util.List;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
@Slf4j
public class PromotionResolver {

    private final PromotionService promotionService;

    @QueryMapping
    public List<Object> activePromotions() {
        log.info("GraphQL Query: activePromotions");
        return List.of();
    }

    @QueryMapping
    public Object promotion(@Argument UUID id) {
        log.info("GraphQL Query: promotion(id: {})", id);
        return null;
    }

    @QueryMapping
    public PromotionConnection promotions(@Argument PageInput pagination) {
        log.info("GraphQL Query: promotions");
        
        Pageable pageable = createPageable(pagination);
        
        return PromotionConnection.builder()
                .content(List.of())
                .pageInfo(PaginatedResponse.from(Page.empty()))
                .build();
    }

    @QueryMapping
    public List<Object> activeFlashSales() {
        log.info("GraphQL Query: activeFlashSales");
        return List.of();
    }

    @QueryMapping
    public Object flashSale(@Argument UUID id) {
        log.info("GraphQL Query: flashSale(id: {})", id);
        return null;
    }

    @QueryMapping
    public FlashSaleConnection flashSales(@Argument PageInput pagination) {
        log.info("GraphQL Query: flashSales");
        
        Pageable pageable = createPageable(pagination);
        
        return FlashSaleConnection.builder()
                .content(List.of())
                .pageInfo(PaginatedResponse.from(Page.empty()))
                .build();
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public PromotionConnection adminPromotions(@Argument PageInput pagination) {
        log.info("GraphQL Query: adminPromotions");
        
        Pageable pageable = createPageable(pagination);
        
        return PromotionConnection.builder()
                .content(List.of())
                .pageInfo(PaginatedResponse.from(Page.empty()))
                .build();
    }

    @QueryMapping
    @PreAuthorize("hasRole('SELLER')")
    public PromotionConnection sellerPromotions(@Argument PageInput pagination) {
        log.info("GraphQL Query: sellerPromotions");
        
        Pageable pageable = createPageable(pagination);
        
        return PromotionConnection.builder()
                .content(List.of())
                .pageInfo(PaginatedResponse.from(Page.empty()))
                .build();
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Object createPromotion(@Argument PromotionInput input) {
        log.info("GraphQL Mutation: createPromotion(name: {})", input.getName());
        return null;
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Object updatePromotion(@Argument UUID id, @Argument PromotionInput input) {
        log.info("GraphQL Mutation: updatePromotion(id: {})", id);
        return null;
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public boolean deletePromotion(@Argument UUID id) {
        log.info("GraphQL Mutation: deletePromotion(id: {})", id);
        return true;
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Object togglePromotionActive(@Argument UUID id) {
        log.info("GraphQL Mutation: togglePromotionActive(id: {})", id);
        return null;
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Object createFlashSale(@Argument FlashSaleInput input) {
        log.info("GraphQL Mutation: createFlashSale(name: {})", input.getName());
        return null;
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Object updateFlashSale(@Argument UUID id, @Argument FlashSaleInput input) {
        log.info("GraphQL Mutation: updateFlashSale(id: {})", id);
        return null;
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public boolean deleteFlashSale(@Argument UUID id) {
        log.info("GraphQL Mutation: deleteFlashSale(id: {})", id);
        return true;
    }

    @MutationMapping
    @PreAuthorize("hasRole('SELLER')")
    public boolean applyForFlashSale(
            @Argument UUID flashSaleId,
            @Argument List<UUID> productIds,
            @ContextValue UUID sellerId) {
        log.info("GraphQL Mutation: applyForFlashSale(flashSaleId: {}, sellerId: {})", flashSaleId, sellerId);
        return true;
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
