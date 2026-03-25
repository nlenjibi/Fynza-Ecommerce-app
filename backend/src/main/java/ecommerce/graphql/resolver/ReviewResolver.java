package ecommerce.graphql.resolver;

import com.querydsl.core.types.Predicate;
import ecommerce.common.response.PaginatedResponse;
import ecommerce.graphql.dto.ReviewResponseDto;
import ecommerce.graphql.input.PageInput;
import ecommerce.graphql.input.ReviewFilterInput;
import ecommerce.modules.review.dto.AdminResponseRequest;
import ecommerce.modules.review.dto.ReviewCreateRequest;
import ecommerce.modules.review.dto.ReviewResponse;
import ecommerce.modules.review.dto.ReviewSummaryResponse;
import ecommerce.modules.review.dto.ReviewUpdateRequest;
import ecommerce.modules.review.entity.ReviewPredicates;
import ecommerce.modules.review.service.ReviewService;
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
import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
@RequiredArgsConstructor
@Slf4j
class ReviewResolver {

    private final ReviewService reviewService;

    @QueryMapping
    public ReviewResponseDto productReviews(
            @Argument UUID productId,
            @Argument PageInput pagination,
            @Argument ReviewFilterInput filter) {
        log.info("GraphQL Query: productReviews productId={}", productId);
        Pageable page = createPageable(pagination);
        Page<ReviewResponse> pageResult = filter != null
                ? reviewService.findReviewsWithPredicate(buildProductPredicate(productId, filter), page)
                : reviewService.getProductReviews(productId, page);
        return ReviewResponseDto.builder()
                .content(pageResult.getContent())
                .pageInfo(PaginatedResponse.from(pageResult))
                .build();
    }

    @QueryMapping
    public ReviewSummaryResponse productRatingStats(@Argument UUID productId) {
        log.info("GraphQL Query: productRatingStats productId={}", productId);
        return reviewService.getProductRatingStats(productId);
    }

    @QueryMapping
    public ReviewResponseDto searchReviews(
            @Argument ReviewFilterInput filter,
            @Argument PageInput pagination) {
        log.info("GraphQL Query: searchReviews");
        Pageable page = createPageable(pagination);
        Page<ReviewResponse> pageResult = reviewService.findReviewsWithPredicate(buildGeneralPredicate(filter), page);
        return ReviewResponseDto.builder()
                .content(pageResult.getContent())
                .pageInfo(PaginatedResponse.from(pageResult))
                .build();
    }

    @QueryMapping
    public ReviewResponseDto myReviews(
            @Argument PageInput pagination,
            @ContextValue UUID userId) {
        log.info("GraphQL Query: myReviews user={}", userId);
        Pageable page = createPageable(pagination);
        Page<ReviewResponse> pageResult = reviewService.getUserReviews(userId, page);
        return ReviewResponseDto.builder()
                .content(pageResult.getContent())
                .pageInfo(PaginatedResponse.from(pageResult))
                .build();
    }

    @QueryMapping
    public ReviewResponse review(@Argument UUID id) {
        log.info("GraphQL Query: review id={}", id);
        return reviewService.getReview(id);
    }

    @MutationMapping
    public ReviewResponse createReview(
            @Argument ReviewCreateRequest input,
            @ContextValue UUID userId) {
        log.info("GraphQL Mutation: createReview user={}", userId);
        return reviewService.createReview(input, userId);
    }

    @MutationMapping
    public ReviewResponse updateReview(
            @Argument UUID id,
            @Argument ReviewUpdateRequest input,
            @ContextValue UUID userId) {
        log.info("GraphQL Mutation: updateReview id={} user={}", id, userId);
        return reviewService.updateReview(id, input, userId);
    }

    @MutationMapping
    public Boolean deleteReview(
            @Argument UUID id,
            @ContextValue UUID userId) {
        log.info("GraphQL Mutation: deleteReview id={} user={}", id, userId);
        reviewService.deleteReview(id, userId);
        return true;
    }

    @MutationMapping
    public ReviewResponse restoreReview(
            @Argument UUID id,
            @ContextValue UUID userId) {
        log.info("GraphQL Mutation: restoreReview id={} user={}", id, userId);
        return reviewService.restoreReview(id, userId);
    }

    @MutationMapping
    public ReviewResponse markReviewHelpful(@Argument UUID id) {
        log.info("GraphQL Mutation: markReviewHelpful id={}", id);
        reviewService.markHelpful(id);
        return reviewService.getReview(id);
    }

    @MutationMapping
    public ReviewResponse approveReview(@Argument UUID id) {
        log.info("GraphQL Mutation: approveReview id={}", id);
        return reviewService.approveReview(id);
    }

    @MutationMapping
    public ReviewResponse rejectReview(@Argument UUID id, @Argument String reason) {
        log.info("GraphQL Mutation: rejectReview id={} reason={}", id, reason);
        return reviewService.rejectReview(id, reason);
    }

    @MutationMapping
    public ReviewResponse addAdminResponse(
            @Argument UUID id,
            @Argument AdminResponseRequest input) {
        log.info("GraphQL Mutation: addAdminResponse id={}", id);
        return reviewService.addAdminResponse(id, input);
    }

    @MutationMapping
    public ReviewResponse removeAdminResponse(@Argument UUID id) {
        log.info("GraphQL Mutation: removeAdminResponse id={}", id);
        return reviewService.removeAdminResponse(id);
    }

    @MutationMapping
    public int bulkApproveReviews(@Argument java.util.List<UUID> ids) {
        log.info("GraphQL Mutation: bulkApproveReviews count={}", ids.size());
        return reviewService.bulkApproveReviews(ids);
    }

    @MutationMapping
    public int bulkRejectReviews(@Argument java.util.List<UUID> ids, @Argument String reason) {
        log.info("GraphQL Mutation: bulkRejectReviews count={}", ids.size());
        return reviewService.bulkRejectReviews(ids, reason);
    }

    private Predicate buildProductPredicate(UUID productId, ecommerce.graphql.input.ReviewFilterInput f) {
        ReviewPredicates p = ReviewPredicates.builder()
                .withProductId(productId)
                .withRating(f.getRating())
                .withMinRating(f.getMinRating())
                .withMaxRating(f.getMaxRating())
                .withVerifiedPurchase(f.getVerifiedPurchase())
                .withApproved(f.getApproved())
                .withImages(f.getWithImages())
                .withTextContaining(f.getSearchText())
                .withCreatedAfter(f.getDateFrom())
                .withCreatedBefore(f.getDateTo());
        if (Boolean.TRUE.equals(f.getPositiveOnly())) p.withPositiveRating();
        if (Boolean.TRUE.equals(f.getNegativeOnly())) p.withNegativeRating();
        if (Boolean.TRUE.equals(f.getNeedsAttention())) p.withNeedsAttention();
        return p.build();
    }

    private Predicate buildGeneralPredicate(ecommerce.graphql.input.ReviewFilterInput f) {
        ReviewPredicates p = ReviewPredicates.builder()
                .withProductId(f.getProductId())
                .withUserId(f.getUserId())
                .withRating(f.getRating())
                .withMinRating(f.getMinRating())
                .withMaxRating(f.getMaxRating())
                .withVerifiedPurchase(f.getVerifiedPurchase())
                .withApproved(f.getApproved())
                .withImages(f.getWithImages())
                .withTextContaining(f.getSearchText())
                .withCreatedAfter(f.getDateFrom())
                .withCreatedBefore(f.getDateTo());
        if (Boolean.TRUE.equals(f.getPositiveOnly())) p.withPositiveRating();
        if (Boolean.TRUE.equals(f.getNegativeOnly())) p.withNegativeRating();
        if (Boolean.TRUE.equals(f.getNeedsAttention())) p.withNeedsAttention();
        return p.buildActiveOnly();
    }

    private Pageable createPageable(PageInput input) {
        if (input == null) {
            return PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "createdAt"));
        }
        Sort.Direction direction = input.getDirection() == ecommerce.graphql.input.SortDirection.DESC
                ? Sort.Direction.DESC : Sort.Direction.ASC;
        String sortBy = input.getSortBy() != null ? input.getSortBy() : "createdAt";
        return PageRequest.of(input.getPage(), input.getSize(), Sort.by(direction, sortBy));
    }
}
