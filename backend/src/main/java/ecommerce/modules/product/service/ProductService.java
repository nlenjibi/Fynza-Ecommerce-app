package ecommerce.modules.product.service;

import ecommerce.modules.product.dto.CreateProductRequest;
import ecommerce.modules.product.dto.ProductFilterRequest;
import ecommerce.modules.product.dto.ProductResponse;
import ecommerce.modules.product.dto.UpdateProductRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface ProductService {

    Page<ProductResponse> findAll(ProductFilterRequest filter, Pageable pageable);

    ProductResponse findById(UUID id);

    ProductResponse create(CreateProductRequest request, UUID sellerId);

    ProductResponse update(UUID id, UpdateProductRequest request);

    void delete(UUID id);

    Page<ProductResponse> findBySellerId(UUID sellerId, Pageable pageable);

    ProductResponse addStock(UUID id, int quantity);

    ProductResponse restoreStock(UUID id, int quantity);

    ProductResponse reserveStock(UUID id, int quantity);

    ProductResponse updateRating(UUID id, Float rating);
}
