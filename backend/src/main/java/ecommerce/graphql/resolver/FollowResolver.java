package ecommerce.graphql.resolver;

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
    public StoreFollowConnection myFollowing(
            @Argument PageInput pagination) {
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
    public UserPage storeFollowers(
            @Argument UUID sellerId,
            @Argument PageInput pagination) {
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
        followStore(null, input.getSellerId());
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
        Sort.Direction direction = "DESC".equalsIgnoreCase(input.getDirection()) 
            ? Sort.Direction.DESC : Sort.Direction.ASC;
        String sortBy = input.getSortBy() != null ? input.getSortBy() : "createdAt";
        return PageRequest.of(input.getPage(), input.getSize(), Sort.by(direction, sortBy));
    }

    public static class PageInput {
        private int page = 0;
        private int size = 20;
        private String sortBy;
        private String direction;

        public int getPage() { return page; }
        public void setPage(int page) { this.page = page; }
        public int getSize() { return size; }
        public void setSize(int size) { this.size = size; }
        public String getSortBy() { return sortBy; }
        public void setSortBy(String sortBy) { this.sortBy = sortBy; }
        public String getDirection() { return direction; }
        public void setDirection(String direction) { this.direction = direction; }
    }

    public static class FollowInput {
        private UUID sellerId;

        public UUID getSellerId() { return sellerId; }
        public void setSellerId(UUID sellerId) { this.sellerId = sellerId; }
    }

    @lombok.Data
    @lombok.Builder
    public static class StoreFollowConnection {
        private java.util.List<FollowedStoreResponse> content;
        private ecommerce.common.response.PaginatedResponse<FollowedStoreResponse> pageInfo;
    }

    @lombok.Data
    @lombok.Builder
    public static class UserPage {
        private java.util.List<FollowerResponse> content;
        private ecommerce.common.response.PaginatedResponse<FollowerResponse> pageInfo;
    }

    @lombok.Data
    @lombok.Builder
    public static class FollowStats {
        private int followerCount;
        private int followingCount;
        private boolean isFollowing;
    }

    @lombok.Data
    @lombok.Builder
    public static class StoreFollow {
        private UUID id;
    }
}
