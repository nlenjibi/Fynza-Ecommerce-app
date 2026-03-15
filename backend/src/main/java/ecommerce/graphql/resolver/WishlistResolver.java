package ecommerce.graphql.resolver;

import ecommerce.common.response.PaginatedResponse;
import ecommerce.graphql.dto.WishListItemResponseDto;
import ecommerce.graphql.input.PageInput;
import ecommerce.graphql.input.SortDirection;
import ecommerce.modules.auth.service.SecurityService;
import ecommerce.modules.wishlist.dto.AddToWishlistRequest;
import ecommerce.modules.wishlist.dto.UpdateWishlistItemRequest;
import ecommerce.modules.wishlist.dto.WishlistItemDto;
import ecommerce.modules.wishlist.dto.WishlistSummaryDto;
import ecommerce.modules.wishlist.service.WishlistService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.ContextValue;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.UUID;

/**
 * GraphQL resolver for Wishlist queries and mutations.
 *
 * Security model
 * ──────────────
 * Every operation requires authentication — @RequestValidation with no roles
 * means any authenticated user is permitted.
 *
 * The authenticated user's ID is always sourced from @ContextValue (injected by
 * AuthenticationFilter from the validated token), never from a caller-supplied
 * argument. This prevents one user from reading or mutating another user's wishlist.
 * The WishlistService also enforces ownership as a second line of defence.
 */
@Controller
@RequiredArgsConstructor
@Slf4j
@CacheConfig(cacheNames = "wishlists")
class WishlistResolver {

    private final WishlistService wishlistService;


    // ─────────────────────────────────────────────────────────────────────────
    //  Queries – any authenticated user
    // ─────────────────────────────────────────────────────────────────────────

    @QueryMapping
    
    public List<WishlistItemDto> myWishlist(@ContextValue UUID userId) {
        log.info("GraphQL Query: myWishlist user={}", userId);
        return wishlistService.getUserWishlist(userId);
    }

    @QueryMapping
    
    public WishListItemResponseDto myWishlistPaginated(
            @Argument PageInput pagination,
            @ContextValue UUID userId) {
        log.info("GraphQL Query: myWishlistPaginated user={}", userId);
        Page<WishlistItemDto> page = wishlistService.getUserWishlistPaginated(userId, buildPageable(pagination));
        return WishListItemResponseDto.builder()
                .content(page.getContent())
                .pageInfo(PaginatedResponse.from(page))
                .build();
    }

    @QueryMapping
    
    public WishlistSummaryDto wishlistSummary(@ContextValue UUID userId) {
        log.info("GraphQL Query: wishlistSummary user={}", userId);
        return wishlistService.getWishlistSummary(userId);
    }

    @QueryMapping
    
    public Boolean isInWishlist(@Argument UUID productId, @ContextValue UUID userId) {
        log.info("GraphQL Query: isInWishlist productId={} user={}", productId, userId);
        return wishlistService.isInWishlist(userId, productId);
    }

    @QueryMapping
    
    public List<WishlistItemDto> wishlistItemsWithPriceDrops(@ContextValue UUID userId) {
        log.info("GraphQL Query: wishlistItemsWithPriceDrops user={}", userId);
        return wishlistService.getItemsWithPriceDrops(userId);
    }

    // ─────────────────────────────────────────────────────────────────────────
    //  Mutations – any authenticated user
    // ─────────────────────────────────────────────────────────────────────────

    @MutationMapping
    
    public WishlistItemDto addToWishlist(
            @Argument AddToWishlistRequest input,
            @ContextValue UUID userId) {
        log.info("GraphQL Mutation: addToWishlist user={}", userId);
        return wishlistService.addToWishlist(userId, input);
    }

    @MutationMapping
    
    public WishlistItemDto updateWishlistItem(
            @Argument UUID productId,
            @Argument UpdateWishlistItemRequest input,
            @ContextValue UUID userId) {
        log.info("GraphQL Mutation: updateWishlistItem productId={} user={}", productId, userId);
        return wishlistService.updateWishlistItem(userId, productId, input);
    }

    @MutationMapping
    
    public Boolean removeFromWishlist(@Argument UUID productId, @ContextValue UUID userId) {
        log.info("GraphQL Mutation: removeFromWishlist productId={} user={}", productId, userId);
        wishlistService.removeFromWishlist(userId, productId);
        return true;
    }

    @MutationMapping
    
    public Boolean clearWishlist(@ContextValue UUID userId) {
        log.info("GraphQL Mutation: clearWishlist user={}", userId);
        wishlistService.clearWishlist(userId);
        return true;
    }

    @MutationMapping
    
    public WishlistItemDto markWishlistItemPurchased(
            @Argument UUID productId,
            @ContextValue UUID userId) {
        log.info("GraphQL Mutation: markWishlistItemPurchased productId={} user={}", productId, userId);
        return wishlistService.markAsPurchased(userId, productId);
    }

    // ─────────────────────────────────────────────────────────────────────────
    //  Helpers
    // ─────────────────────────────────────────────────────────────────────────

    private static Pageable buildPageable(PageInput input) {
        if (input == null) {
            return PageRequest.of(0, 20, Sort.by(Sort.Direction.DESC, "createdAt"));
        }
        Sort.Direction dir = input.getDirection() == SortDirection.DESC
                ? Sort.Direction.DESC : Sort.Direction.ASC;
        String field = input.getSortBy() != null ? input.getSortBy() : "createdAt";
        return PageRequest.of(input.getPage(), input.getSize(), Sort.by(dir, field));
    }
}
