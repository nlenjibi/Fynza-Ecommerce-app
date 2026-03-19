package ecommerce.modules.tracking.repository;

import ecommerce.common.enums.TrackingEventType;
import ecommerce.modules.tracking.entity.UserTrackingEvent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface UserTrackingEventRepository extends JpaRepository<UserTrackingEvent, UUID> {

    Page<UserTrackingEvent> findByEventType(TrackingEventType eventType, Pageable pageable);

    Page<UserTrackingEvent> findByProductId(UUID productId, Pageable pageable);

    Page<UserTrackingEvent> findBySessionId(String sessionId, Pageable pageable);

    Page<UserTrackingEvent> findByUserId(UUID userId, Pageable pageable);

    Page<UserTrackingEvent> findByEventTimestampBetween(LocalDateTime start, LocalDateTime end, Pageable pageable);

    long countByEventTypeAndEventTimestampBetween(TrackingEventType type, LocalDateTime start, LocalDateTime end);

    @Query("SELECT e.eventType, COUNT(e) FROM UserTrackingEvent e WHERE e.eventTimestamp >= :since GROUP BY e.eventType")
    List<Object[]> findEventCountGroupByEventType(@Param("since") LocalDateTime since);

    @Query("SELECT e.productId, e.productName, COUNT(e) as cnt FROM UserTrackingEvent e " +
            "WHERE e.eventType = :type AND e.eventTimestamp >= :since AND e.productId IS NOT NULL " +
            "GROUP BY e.productId, e.productName ORDER BY cnt DESC")
    List<Object[]> findTopProductsByEventType(
            @Param("type") TrackingEventType type,
            @Param("since") LocalDateTime since,
            Pageable pageable);

    @Query("SELECT e.productId, e.productName, COUNT(e) as cnt FROM UserTrackingEvent e " +
            "WHERE e.eventType = 'ADD_TO_CART' AND e.eventTimestamp >= :since AND e.productId IS NOT NULL " +
            "GROUP BY e.productId, e.productName ORDER BY cnt DESC")
    List<Object[]> findTopProductsAddedToCart(@Param("since") LocalDateTime since, Pageable pageable);

    @Query("SELECT e.productId, e.productName, COUNT(e) as cnt FROM UserTrackingEvent e " +
            "WHERE e.eventType = 'PRODUCT_VIEW' AND e.eventTimestamp >= :since AND e.productId IS NOT NULL " +
            "GROUP BY e.productId, e.productName ORDER BY cnt DESC")
    List<Object[]> findTopViewedProducts(@Param("since") LocalDateTime since, Pageable pageable);

    @Query("SELECT e.productId, e.productName, COUNT(e) as cnt FROM UserTrackingEvent e " +
            "WHERE e.eventType = 'PURCHASE' AND e.eventTimestamp >= :since AND e.productId IS NOT NULL " +
            "GROUP BY e.productId, e.productName ORDER BY cnt DESC")
    List<Object[]> findTopPurchasedProducts(@Param("since") LocalDateTime since, Pageable pageable);

    @Query("SELECT COUNT(e) FROM UserTrackingEvent e WHERE e.eventType = 'ADD_TO_CART' AND e.eventTimestamp >= :since")
    long countAddToCartSince(@Param("since") LocalDateTime since);

    @Query("SELECT COUNT(e) FROM UserTrackingEvent e WHERE e.eventType = 'PRODUCT_VIEW' AND e.eventTimestamp >= :since")
    long countProductViewsSince(@Param("since") LocalDateTime since);

    @Query("SELECT COUNT(e) FROM UserTrackingEvent e WHERE e.eventType = 'PURCHASE' AND e.eventTimestamp >= :since")
    long countPurchasesSince(@Param("since") LocalDateTime since);

    @Query("SELECT COUNT(DISTINCT e.sessionId) FROM UserTrackingEvent e WHERE e.eventTimestamp >= :since")
    long countUniqueSessionsSince(@Param("since") LocalDateTime since);

    @Query("SELECT COUNT(DISTINCT e.userId) FROM UserTrackingEvent e WHERE e.userId IS NOT NULL AND e.eventTimestamp >= :since")
    long countUniqueUsersSince(@Param("since") LocalDateTime since);

    void deleteByCreatedAtBefore(LocalDateTime dateTime);
}
