package ecommerce.modules.review.service.impl;

import com.querydsl.core.types.Predicate;
import ecommerce.exception.BadRequestException;
import ecommerce.exception.ResourceNotFoundException;
import ecommerce.exception.AuthorizationException;
import ecommerce.modules.order.repository.OrderRepository;
import ecommerce.modules.product.entity.Product;
import ecommerce.modules.product.repository.ProductRepository;
import ecommerce.modules.review.dto.*;
import ecommerce.modules.review.entity.Review;
import ecommerce.modules.review.entity.ReviewPredicates;
import ecommerce.modules.review.mapper.ReviewMapper;
import ecommerce.modules.review.repository.ReviewRepository;
import ecommerce.modules.review.service.ReviewService;
import ecommerce.modules.user.entity.User;
import ecommerce.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Implementation of ReviewService
 * Handles all business logic for product reviews
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final ReviewMapper reviewMapper;

    private static final String REVIEW_ID_LITERAL = "Review id";

    // ==================== Basic CRUD Operations ====================

    @Override
    @CacheEvict(value = {
            "reviews",
            "reviews-predicate",
            "review-stats",
            "rating-distribution",
            "review-trends",
            "top-rated-products",
            "most-reviewed-products"
    }, allEntries = true)
    public ReviewResponse createReview(ReviewCreateRequest request, UUID userId) {
        log.info("Creating review for product {} by user {}", request.getProductId(), userId);

        // Validate user hasn't already reviewed this product
        if (reviewRepository.existsByCustomerIdAndProductId(userId, request.getProductId())) {
            throw new BadRequestException("You have already reviewed this product");
        }

        // Create review entity
        Review review = reviewMapper.toEntity(request);
        review.setProduct(productRepository.findById(request.getProductId())
                .orElseThrow(() -> ResourceNotFoundException.forResource("Product id", request.getProductId())));
        
        // Fetch and validate customer
        User customer = userRepository.findById(userId)
                .orElseThrow(() -> ResourceNotFoundException.forResource("Userid", userId));
        review.setCustomer(customer);

        // Check if verified purchase
        boolean hasOrdered = orderRepository.existsByCustomerIdAndProductId(userId, request.getProductId());
        review.setVerifiedPurchase(hasOrdered);

        // Auto-approve verified purchases, pending for others
        review.setApproved(hasOrdered);

        // Save review
        Review savedReview = reviewRepository.save(review);
        log.info("Review created successfully with ID: {}", savedReview.getId());

        return reviewMapper.toDto(savedReview);
    }

    @Override
    @CacheEvict(value = {
            "reviews",
            "reviews-predicate",
            "review-stats",
            "rating-distribution",
            "review-trends"
    }, allEntries = true)
    @CachePut(value = "review", key = "#reviewId")
    public ReviewResponse updateReview(UUID reviewId, ReviewUpdateRequest request, UUID userId) {
        log.info("Updating review {} by user {}", reviewId, userId);

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> ResourceNotFoundException.forResource(REVIEW_ID_LITERAL, reviewId));

        // Validate ownership
        if (!review.canBeEditedBy(userId)) {
            throw new AuthorizationException("You can only update your own reviews");
        }

        // Update review fields
        reviewMapper.updateFromDto(request, review);

        // Reset approval status if content changed significantly
        if (request.getRating() != null || request.getComment() != null) {
            review.setApproved(review.getVerifiedPurchase()); // Re-approve only if verified
        }

        Review updatedReview = reviewRepository.save(review);
        log.info("Review {} updated successfully", reviewId);

        return reviewMapper.toDto(updatedReview);
    }

    @Override
    @CacheEvict(value = {
            "reviews",
            "reviews-predicate",
            "review-stats",
            "rating-distribution",
            "review-trends",
            "top-rated-products",
            "most-reviewed-products"
    }, allEntries = true)
    public void deleteReview(UUID reviewId, UUID userId) {
        log.info("Deleting review {} by user {}", reviewId, userId);

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> ResourceNotFoundException.forResource(REVIEW_ID_LITERAL, reviewId));

        if (!review.canBeDeletedBy(userId)) {
            throw new AuthorizationException("You can only delete your own reviews");
        }

        review.softDelete();
        reviewRepository.save(review);
        log.info("Review {} deleted successfully", reviewId);
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable(value = "review", key = "#reviewId")
    public ReviewResponse getReview(UUID reviewId) {
        // Use a new repository method with @EntityGraph for eager fetch
        Review review = reviewRepository.findByIdWithUserAndProduct(reviewId)
                .orElseThrow(() -> ResourceNotFoundException.forResource(REVIEW_ID_LITERAL, reviewId));
        return reviewMapper.toDto(review);
    }

    @Override
    @CacheEvict(value = {
            "reviews",
            "reviews-predicate",
            "review-stats",
            "rating-distribution",
            "review-trends",
            "top-rated-products",
            "most-reviewed-products"
    }, allEntries = true)
    public ReviewResponse restoreReview(UUID reviewId, UUID userId) {
        log.info("Restoring review {} by user {}", reviewId, userId);

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> ResourceNotFoundException.forResource(REVIEW_ID_LITERAL, reviewId));

        if (!review.getCustomer().getId().equals(userId)) {
            throw new AuthorizationException("You can only restore your own reviews");
        }

        review.restore();
        Review restoredReview = reviewRepository.save(review);
        log.info("Review {} restored successfully", reviewId);

        return reviewMapper.toDto(restoredReview);
    }

    // ==================== Query Operations ====================

    @Override
    @Transactional(readOnly = true)
    @Cacheable(value = "reviews", key = "'product:' + #productId + ':' + #pageable.pageNumber + ':' + #pageable.pageSize + ':' + #pageable.sort")
    public Page<ReviewResponse> getProductReviews(UUID productId, Pageable pageable) {
        log.debug("Fetching reviews for product {}", productId);

        // Verify product exists
        if (!productRepository.existsById(productId)) {
            throw ResourceNotFoundException.forResource("Product id", productId);
        }

        Page<Review> reviews = reviewRepository.findByProductIdAndApproved(productId, true, pageable);
        return reviews.map(reviewMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable(value = "reviews", key = "'filtered-product:' + #productId + ':' + T(org.springframework.util.DigestUtils).md5DigestAsHex((#filters.toString() + ':' + #pageable.pageNumber + ':' + #pageable.pageSize + ':' + #pageable.sort).getBytes())")
    public Page<ReviewResponse> getProductReviewsWithFilters(UUID productId, ReviewFilterRequest filters, Pageable pageable) {
        log.debug("Fetching filtered reviews for product {}", productId);

        // Use ReviewPredicates builder for flexible predicate construction
        Predicate predicate = ReviewPredicates.builder()
                .withProductId(productId)
                .withRating(filters.getRating())
                .withVerifiedPurchase(filters.getVerifiedPurchase())
                .withApproved(filters.getApproved())
                .withImages(filters.getWithImages())
                .withCreatedAfter(filters.getDateFrom())
                .withCreatedBefore(filters.getDateTo())
                .buildActiveOnly();

        // Use the @EntityGraph-enabled method to fix N+1
        Page<Review> reviews = reviewRepository.findAll(predicate, pageable);
        return reviews.map(reviewMapper::toDto);
    }


    @Transactional(readOnly = true)
    @Cacheable(value = "reviews", key = "'verified-product:' + #productId + ':' + #pageable.pageNumber + ':' + #pageable.pageSize + ':' + #pageable.sort")
    public Page<ReviewResponse> getVerifiedReviews(UUID productId, Pageable pageable) {
        Page<Review> reviews = reviewRepository.findByProductIdAndVerifiedPurchase(productId, true, pageable);
        return reviews.map(reviewMapper::toDto);
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "user-reviews", key = "'user:' + #userId + ':' + #pageable.pageNumber + ':' + #pageable.pageSize + ':' + #pageable.sort")
    public Page<ReviewResponse> getUserReviews(UUID userId, Pageable pageable) {
        log.debug("Fetching reviews for user {}", userId);

        if (!userRepository.existsById(userId)) {
            throw ResourceNotFoundException.forResource("User id", userId);
        }

        Page<Review> reviews = reviewRepository.findByCustomerId(userId, pageable);
        return reviews.map(reviewMapper::toDto);
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "reviews", key = "'product-rating:' + #productId + ':' + #rating + ':' + #pageable.pageNumber + ':' + #pageable.pageSize + ':' + #pageable.sort")
    public Page<ReviewResponse> getReviewsByRating(UUID productId, Integer rating, Pageable pageable) {
        if (rating < 1 || rating > 5) {
            throw new BadRequestException("Rating must be between 1 and 5");
        }

        Page<Review> reviews = reviewRepository.findByProductIdAndRating(productId, rating, pageable);
        return reviews.map(reviewMapper::toDto);
    }


    @Transactional(readOnly = true)
    @Cacheable(value = "review-lists", key = "'most-helpful:' + #productId + ':' + #limit")
    public List<ReviewResponse> getMostHelpfulReviews(UUID productId, int limit) {
        List<Review> reviews = reviewRepository.findMostHelpfulReviews(productId, limit);
        return reviews.stream()
                .map(reviewMapper::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "review-lists", key = "'recent:' + #productId + ':' + #limit")
    public List<ReviewResponse> getRecentReviews(UUID productId, int limit) {
        List<Review> reviews = reviewRepository.findRecentReviews(productId, limit);
        return reviews.stream()
                .map(reviewMapper::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "reviews", key = "'with-images:' + #productId + ':' + #pageable.pageNumber + ':' + #pageable.pageSize + ':' + #pageable.sort")
    public Page<ReviewResponse> getReviewsWithImages(UUID productId, Pageable pageable) {
        Page<Review> reviews = reviewRepository.findByHasImagesTrueAndIsActiveTrue(pageable);
        return reviews.map(reviewMapper::toDto);
    }



    // ==================== Advanced Querying with Predicates ====================

    @Override
    @Transactional(readOnly = true)
    @Cacheable(value = "reviews-predicate", key = "T(org.springframework.util.DigestUtils).md5DigestAsHex(('#predicate=' + #predicate.toString() + '&page=' + #pageable.pageNumber + '&size=' + #pageable.pageSize + '&sort=' + #pageable.sort).getBytes())")
    public Page<ReviewResponse> findReviewsWithPredicate(Predicate predicate, Pageable pageable) {
        Page<Review> reviews = reviewRepository.findAll(predicate, pageable);
        return reviews.map(reviewMapper::toDto);
    }

    // ==================== Statistics & Analytics ====================

    @Override
    @Transactional(readOnly = true)
    @Cacheable(value = "review-stats", key = "'product:' + #productId")
    public ReviewSummaryResponse getProductRatingStats(UUID productId) {
        log.debug("Fetching rating statistics for product {}", productId);

        Object[] stats = reviewRepository.getProductRatingStats(productId);
        List<Object[]> distribution = reviewRepository.getRatingDistributionWithPercentages(productId);
        List<String> topPros = reviewRepository.getMostCommonPros(productId, 5);
        List<String> topCons = reviewRepository.getMostCommonCons(productId, 5);

        Long totalReviews = 0L;
        Double avgRating = 0.0;
        Long verifiedPurchases = 0L;
        if (stats != null) {
            if (stats.length > 0 && stats[0] instanceof Number) {
                totalReviews = ((Number) stats[0]).longValue();
            }
            if (stats.length > 1 && stats[1] instanceof Number) {
                avgRating = ((Number) stats[1]).doubleValue();
            }
            if (stats.length > 2 && stats[2] instanceof Number) {
                verifiedPurchases = ((Number) stats[2]).longValue();
            }
        }
        Double verifiedPercentage = totalReviews > 0 ? (verifiedPurchases.doubleValue() / totalReviews * 100.0) : 0.0;

        return ReviewSummaryResponse.builder()
                .totalReviews(totalReviews)
                .averageRating(avgRating)
                .verifiedPurchases(verifiedPurchases)
                .verifiedPurchasePercentage(verifiedPercentage)
                .distribution(buildRatingDistribution(distribution))
                .topPros(topPros)
                .topCons(topCons)
                .build();
    }

    private ReviewSummaryResponse.RatingDistribution buildRatingDistribution(List<Object[]> distribution) {
        Map<Integer, Long> countMap = new HashMap<>();
        Map<Integer, Double> percentageMap = new HashMap<>();

        if (distribution != null) {
            for (Object[] row : distribution) {
                Integer rating = (Integer) row[0];
                Long count = ((Number) row[1]).longValue();
                Double percentage = (Double) row[2];
                countMap.put(rating, count);
                percentageMap.put(rating, percentage);
            }
        }

        return ReviewSummaryResponse.RatingDistribution.builder()
                .fiveStars(countMap.getOrDefault(5, 0L))
                .fiveStarsPercentage(percentageMap.getOrDefault(5, 0.0))
                .fourStars(countMap.getOrDefault(4, 0L))
                .fourStarsPercentage(percentageMap.getOrDefault(4, 0.0))
                .threeStars(countMap.getOrDefault(3, 0L))
                .threeStarsPercentage(percentageMap.getOrDefault(3, 0.0))
                .twoStars(countMap.getOrDefault(2, 0L))
                .twoStarsPercentage(percentageMap.getOrDefault(2, 0.0))
                .oneStar(countMap.getOrDefault(1, 0L))
                .oneStarPercentage(percentageMap.getOrDefault(1, 0.0))
                .build();
    }



    // ==================== Voting Operations ====================

    @Override
    @CacheEvict(value = {
            "review",
            "reviews",
            "reviews-predicate",
            "review-lists"
    }, allEntries = true)
    public void markHelpful(UUID reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> ResourceNotFoundException.forResource(REVIEW_ID_LITERAL, reviewId));

        review.incrementHelpful();
        reviewRepository.save(review);
        log.debug("Review {} marked as helpful", reviewId);
    }



    // ==================== Admin Operations ====================

    @Override
    @CacheEvict(value = {
            "reviews",
            "reviews-predicate",
            "review-stats",
            "rating-distribution",
            "review-trends"
    }, allEntries = true)
    @CachePut(value = "review", key = "#reviewId")
    public ReviewResponse approveReview(UUID reviewId) {
        log.info("Approving review {}", reviewId);

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> ResourceNotFoundException.forResource(REVIEW_ID_LITERAL, reviewId));

        review.approve();
        Review approvedReview = reviewRepository.save(review);

        return reviewMapper.toDto(approvedReview);
    }

    @Override
    @CacheEvict(value = {
            "reviews",
            "reviews-predicate",
            "review-stats",
            "rating-distribution",
            "review-trends"
    }, allEntries = true)
    @CachePut(value = "review", key = "#reviewId")
    public ReviewResponse rejectReview(UUID reviewId, String reason) {
        log.info("Rejecting review {} with reason: {}", reviewId, reason);

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> ResourceNotFoundException.forResource(REVIEW_ID_LITERAL, reviewId));

        review.reject(reason);
        Review rejectedReview = reviewRepository.save(review);

        return reviewMapper.toDto(rejectedReview);
    }

    @Override
    @CacheEvict(value = {
            "review",
            "reviews",
            "reviews-predicate"
    }, allEntries = true)
    public ReviewResponse addAdminResponse(UUID reviewId, AdminResponseRequest request) {
        log.info("Adding admin response to review {}", reviewId);

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> ResourceNotFoundException.forResource(REVIEW_ID_LITERAL, reviewId));

        review.addAdminResponse(request.getResponse(), null);
        Review updatedReview = reviewRepository.save(review);

        return reviewMapper.toDto(updatedReview);
    }

    @Override
    @CacheEvict(value = {
            "review",
            "reviews",
            "reviews-predicate"
    }, allEntries = true)
    public ReviewResponse removeAdminResponse(UUID reviewId) {
        log.info("Removing admin response from review {}", reviewId);

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> ResourceNotFoundException.forResource(REVIEW_ID_LITERAL, reviewId));

        review.setAdminResponse(null);
        review.setAdminResponseAt(null);
        review.setAdminResponseBy(null);
        Review updatedReview = reviewRepository.save(review);

        return reviewMapper.toDto(updatedReview);
    }


    @Override
    @CacheEvict(value = {
            "reviews",
            "reviews-predicate",
            "review-stats",
            "rating-distribution",
            "review-trends",
            "admin-reviews"
    }, allEntries = true)
    public int bulkApproveReviews(List<UUID> reviewIds) {
        log.info("Bulk approving {} reviews", reviewIds.size());
        return reviewRepository.approveReviews(reviewIds);
    }

    @Override
    @CacheEvict(value = {
            "reviews",
            "reviews-predicate",
            "review-stats",
            "rating-distribution",
            "review-trends",
            "admin-reviews"
    }, allEntries = true)
    public int bulkRejectReviews(List<UUID> reviewIds, String reason) {
        log.info("Bulk rejecting {} reviews", reviewIds.size());
        return reviewRepository.rejectReviews(reviewIds, reason);
    }


}
