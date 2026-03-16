package ecommerce.modules.review.service;

import com.querydsl.core.types.Predicate;
import ecommerce.modules.review.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

/**
 * Service interface for review operations
 * Provides business logic for managing product reviews
 */
public interface ReviewService {

    // ==================== Basic CRUD Operations ====================

    ReviewResponse createReview(ReviewCreateRequest request, UUID userId);

    ReviewResponse updateReview(UUID reviewId, ReviewUpdateRequest request, UUID userId);

    void deleteReview(UUID reviewId, UUID userId);

    ReviewResponse getReview(UUID reviewId);

    ReviewResponse restoreReview(UUID reviewId, UUID userId);

    // ==================== Query Operations ====================

    Page<ReviewResponse> getProductReviews(UUID productId, Pageable pageable);

    Page<ReviewResponse> getProductReviewsWithFilters(UUID productId, ReviewFilterRequest filters, Pageable pageable);

    // ==================== Statistics & Analytics ====================

    ReviewSummaryResponse getProductRatingStats(UUID productId);

    // ==================== Voting Operations ====================

    void markHelpful(UUID reviewId);


    // ==================== Admin Operations ====================

    ReviewResponse approveReview(UUID reviewId);

    ReviewResponse rejectReview(UUID reviewId, String reason);

    ReviewResponse addAdminResponse(UUID reviewId, AdminResponseRequest request, UUID adminId);

    ReviewResponse removeAdminResponse(UUID reviewId);


    int bulkApproveReviews(List<UUID> reviewIds);

    int bulkRejectReviews(List<UUID> reviewIds, String reason);

    // ==================== Utility Operations ====================



    /**
     * Find reviews with QueryDSL predicate for advanced filtering
     */
    Page<ReviewResponse> findReviewsWithPredicate(Predicate predicate, Pageable pageable);
}
