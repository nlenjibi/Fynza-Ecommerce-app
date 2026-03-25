package ecommerce.graphql.resolver;

import ecommerce.graphql.dto.FollowStats;
import ecommerce.graphql.dto.StoreFollow;
import ecommerce.graphql.dto.StoreFollowConnection;
import ecommerce.graphql.dto.UserPage;
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
    public StoreFollowConnection myFollowing(@Argument PageInput pagination) {
        log.info("GraphQL Query: myFollowing");
        
        Pageable pageable = createPageable(pagination);
        Page<FollowedStoreResponse> followedStores = followService.getFollowedStores(null, pageable);
        
        return StoreFollowConnection.builder()
                .content(followedStores.getContent())
                .pageInfo(ecommerce.common.response.PaginatedResponse.from(followedStores))
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
                .followerCount((int) stats.getTotalFollowers())
                .followingCount(0)
                .isFollowing(false)
                .build();
    }

    @QueryMapping
    public UserPage storeFollowers(@Argument UUID sellerId, @Argument PageInput pagination) {
        log.info("GraphQL Query: storeFollowers(sellerId: {})", sellerId);
        
        Pageable pageable = createPageable(pagination);
        Page<FollowerResponse> followers = followService.getFollowers(sellerId, pageable);
        
        return UserPage.builder()
                .content(followers.getContent())
                .pageInfo(ecommerce.common.response.PaginatedResponse.from(followers))
                .build();
    }

    @MutationMapping
    @PreAuthorize("isAuthenticated()")
    public StoreFollow followStore(@Argument FollowInput input) {
        log.info("GraphQL Mutation: followStore(sellerId: {})", input.getSellerId());
        followService.followStore(null, input.getSellerId());
        return StoreFollow.builder().build();
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
