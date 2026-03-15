package ecommerce.modules.user.repository;

import ecommerce.common.enums.VerificationStatus;
import ecommerce.modules.user.entity.SellerProfile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SellerProfileRepository extends JpaRepository<SellerProfile, UUID> {

    Optional<SellerProfile> findByUserId(UUID userId);

    /**
     * Batch fetch seller profiles for multiple user IDs to avoid N+1 queries.
     * @param userIds List of user IDs
     * @return List of seller profiles
     */
    List<SellerProfile> findByUserIdIn(List<UUID> userIds);

    @Query("SELECT sp FROM SellerProfile sp WHERE sp.verificationStatus = :status")
    Page<SellerProfile> findByVerificationStatus(VerificationStatus status, Pageable pageable);

    @Query("SELECT sp FROM SellerProfile sp ORDER BY sp.rating DESC")
    Page<SellerProfile> findTopSellers(Pageable pageable);
}
