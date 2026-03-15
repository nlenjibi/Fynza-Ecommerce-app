package ecommerce.modules.product.entity;

import ecommerce.common.base.BaseEntity;
import ecommerce.common.enums.InventoryStatus;
import ecommerce.common.enums.ProductStatus;
import ecommerce.modules.category.entity.Category;
import ecommerce.modules.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "products", indexes = {
    @Index(name = "idx_product_seller_id", columnList = "seller_id"),
    @Index(name = "idx_product_category_id", columnList = "category_id"),
    @Index(name = "idx_product_status", columnList = "status"),
    @Index(name = "idx_product_price", columnList = "price"),
    @Index(name = "idx_product_rating", columnList = "rating"),
    @Index(name = "idx_product_brand", columnList = "brand")
})
public class Product extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column
    private String brand;

    @Column
    private String sku;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    @Column
    private BigDecimal originalPrice;

    @Column
    private BigDecimal discount;

    @Column
    private Integer stock;

    @Column(nullable = false)
    private Integer availableQuantity;

    @Column(nullable = false)
    private Integer soldQuantity;

    @Column(precision = 3, scale = 2)
    private BigDecimal rating;

    @Column
    private Integer reviewCount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id")
    private User seller;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProductStatus status;

    @Enumerated(EnumType.STRING)
    private InventoryStatus inventoryStatus;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ProductImage> images = new ArrayList<>();

    @Column
    private String mainImageUrl;

    @Column
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime updatedAt;

    public void addImage(ProductImage image) {
        images.add(image);
        image.setProduct(this);
    }

    public void removeImage(ProductImage image) {
        images.remove(image);
        image.setProduct(null);
    }

    public boolean isInStock() {
        return (stock != null && stock > 0) || (availableQuantity != null && availableQuantity > 0);
    }

    public void reserveStock(int quantity) {
        if (availableQuantity != null) {
            this.availableQuantity -= quantity;
        }
        if (stock != null) {
            this.stock -= quantity;
        }
    }

    public String getImageUrl() {
        if (mainImageUrl != null && !mainImageUrl.isEmpty()) {
            return mainImageUrl;
        }
        return (images != null && !images.isEmpty()) ? images.get(0).getUrl() : null;
    }

    public InventoryStatus getInventoryStatus() {
        int currentStock = (stock != null) ? stock : (availableQuantity != null ? availableQuantity : 0);
        if (currentStock <= 0) {
            return InventoryStatus.OUT_OF_STOCK;
        } else if (currentStock < 10) {
            return InventoryStatus.LOW_STOCK;
        } else {
            return InventoryStatus.IN_STOCK;
        }
    }
}
