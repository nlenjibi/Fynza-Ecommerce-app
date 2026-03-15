package ecommerce.modules.product.repository;

import ecommerce.common.enums.ProductStatus;
import ecommerce.modules.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {

    Page<Product> findByBrandIgnoreCase(String brand, Pageable pageable);

    Page<Product> findByBrandInIgnoreCase(List<String> brands, Pageable pageable);

    Page<Product> findByCategoryId(UUID categoryId, Pageable pageable);

    Page<Product> findByCategoryIdAndStatus(UUID categoryId, ProductStatus status, Pageable pageable);

    Page<Product> findBySellerId(UUID sellerId, Pageable pageable);

    Page<Product> findByStatus(ProductStatus status, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.name LIKE %:keyword% OR p.description LIKE %:keyword%")
    Page<Product> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.status = :status AND p.rating >= :minRating ORDER BY p.rating DESC")
    List<Product> findFeatured(@Param("status") ProductStatus status, @Param("minRating") Double minRating);

    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Product> findByNameContainingIgnoreCase(@Param("name") String name, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.status = :status ORDER BY p.viewCount DESC")
    List<Product> findTopByViewCount(@Param("status") ProductStatus status, Pageable pageable);
}
