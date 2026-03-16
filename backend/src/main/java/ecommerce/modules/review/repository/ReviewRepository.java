package ecommerce.modules.review.repository;

import ecommerce.common.base.BaseRepository;
import ecommerce.modules.review.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ReviewRepository extends BaseRepository<Review, UUID> {

    Page<Review> findByProductId(UUID productId, Pageable pageable);

    Page<Review> findByCustomerId(UUID customerId, Pageable pageable);
}
