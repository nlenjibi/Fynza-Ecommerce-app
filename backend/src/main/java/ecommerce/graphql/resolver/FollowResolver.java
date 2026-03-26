package ecommerce.graphql.resolver;

import ecommerce.common.response.PaginatedResponse;
import ecommerce.graphql.dto.FollowStats;
import ecommerce.graphql.dto.FollowerPage;

import ecommerce.graphql.dto.FollowedStoreConnection;
import ecommerce.graphql.input.FollowInput;
import ecommerce.graphql.input.PageInput;
import ecommerce.graphql.input.SortDirection;
import ecommerce.modules.follow.dto.FollowStatsResponse;
import ecommerce.modules.follow.dto.FollowedStoreResponse;
import ecommerce.modules.follow.dto.FollowerResponse;
import ecommerce.modules.follow.service.FollowService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
@RequiredArgsConstructor
@Slf4j
public class FollowResolver {

    private final FollowService followService;

    @QueryMapping
    @PreAuthorize("isAuthenticated()")
    public FollowedStoreConnection myFollowing(@Argument PageInput pagination) {
        log.info("GraphQL Query: myFollowing");
        
        Pageable pageable = createPageable(pagination);
        Page<FollowedStoreResponse> followedStores = followService.getFollowedStores(null, pageable);
        
        return FollowedStoreConnection.builder()
                .content(followedStores.getContent().stream()
                        .map(store -> FollowedStoreResponse.builder()
                                .id(store.getId())
                                .sellerId(store.getSellerId())
                                .storeName(store.getStoreName())
                                .storeLogo(store.getStoreLogo())
                                .isVerified(store.getIsVerified())
                                .rating(store.getRating())
                                .reviewCount(store.getReviewCount())
                                .location(store.getLocation())
                                .productCount(store.getProductCount())
                                .followedDate(store.getFollowedDate())
                                .build())
                        .collect(java.util.stream.Collectors.toList()))
                .pageInfo(PaginatedResponse.from(followedStores))
                .build();
    }

    @QueryMapping
    public boolean isFollowing(@Argument UUID sellerId) {
        log.info("GraphQL Query: isFollowing(sellerId: {})", sellerId);
        return followService.isFollowing(null, sellerId);
    }

    @QueryMapping
    public FollowStats followStats(@Argument UUID sellerId) {
        log.info("GraphQL Query: followStats(sellerId: {})", sellerId);
        FollowStatsResponse stats = followService.getSellerFollowStats(sellerId);
        
        return FollowStats.builder()
                .totalFollowers((int) stats.getTotalFollowers())
                .activeThisMonth((int) stats.getActiveThisMonth())
                .newThisWeek((int) stats.getNewThisWeek())
                .avgFollowAge((float) stats.getAvgFollowAge())
                .build();
    }

    @QueryMapping
    public FollowerPage storeFollowers(@Argument UUID sellerId, @Argument PageInput pagination) {
        log.info("GraphQL Query: storeFollowers(sellerId: {})", sellerId);
        
        Pageable pageable = createPageable(pagination);
        Page<ecommerce.modules.follow.dto.FollowerResponse> followers = followService.getFollowers(sellerId, pageable);
        
        return FollowerPage.builder()
                .content(followers.getContent().stream()
                        .map(follower -> FollowerResponse.builder()
                                .id(follower.getId())
                                .customerId(follower.getCustomerId())
                                .customerName(follower.getCustomerName())
                                .customerEmail(follower.getCustomerEmail())
                                .customerAvatar(follower.getCustomerAvatar())
                                .joinedDate(follower.getJoinedDate())
                                .orderCount(follower.getOrderCount())
                                .totalSpent(follower.getTotalSpent())
                                .lastActive(follower.getLastActive())
                                .build())
                        .collect(java.util.stream.Collectors.toList()))
                .pageInfo(ecommerce.common.response.PaginatedResponse.from(followers))
                .build();
    }

    @MutationMapping
    @PreAuthorize("isAuthenticated()")
    public boolean followStore(@Argument FollowInput input) {
        log.info("GraphQL Mutation: followStore(sellerId: {})", input.getSellerId());
        followService.followStore(null, input.getSellerId());
        return true;
    }

    @MutationMapping
    @PreAuthorize("isAuthenticated()")
    public boolean unfollowStore(@Argument UUID sellerId) {
        log.info("GraphQL Mutation: unfollowStore(sellerId: {})", sellerId);
        followService.unfollowStore(null, sellerId);
        return true;
    }

    private Pageable createPageable(PageInput input) {
        if (input == null) {
            return PageRequest.of(0, 20, Sort.by(Sort.Direction.DESC, "createdAt"));
        }
        Sort.Direction direction = input.getDirection() == SortDirection.DESC 
            ? Sort.Direction.DESC : Sort.Direction.ASC;
        String sortBy = input.getSortBy() != null ? input.getSortBy() : "createdAt";
        return PageRequest.of(input.getPage(), input.getSize(), Sort.by(direction, sortBy));
    }
}
