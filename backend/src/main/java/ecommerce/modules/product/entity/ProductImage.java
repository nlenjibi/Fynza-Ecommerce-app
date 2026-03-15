package ecommerce.modules.product.entity;

import ecommerce.common.base.BaseEntity;
import jakarta.persistence.*;
import lombok.experimental.SuperBuilder;

@Entity
@SuperBuilder
@Table(name = "product_images")
public class ProductImage extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private String imageUrl;

    @Column(length = 255)
    private String alt;

    @Column(nullable = false)
    private Integer ordering = 0;
}
