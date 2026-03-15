package ecommerce.modules.product.repository;

import ecommerce.modules.product.entity.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProductVariantRepository extends JpaRepository<ProductVariant, UUID> {

    List<ProductVariant> findByProductId(UUID productId);

    /**
     * Batch fetch variants for multiple products to avoid N+1 queries.
     * @param productIds List of product IDs
     * @return List of variants for the given product IDs
     */
    @Query("SELECT v FROM ProductVariant v WHERE v.product.id IN :productIds")
    List<ProductVariant> findByProductIdIn(java.util.Collection<UUID> productIds);

    Optional<ProductVariant> findBySku(String sku);
}
