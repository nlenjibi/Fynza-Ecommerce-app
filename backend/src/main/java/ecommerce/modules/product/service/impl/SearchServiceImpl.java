package ecommerce.modules.product.service.impl;

import ecommerce.common.enums.ProductStatus;
import ecommerce.modules.auth.service.SecurityService;
import ecommerce.modules.category.entity.Category;
import ecommerce.modules.category.repository.CategoryRepository;
import ecommerce.modules.product.dto.ProductResponse;
import ecommerce.modules.product.dto.SearchRequest;
import ecommerce.modules.product.dto.SearchResponse;
import ecommerce.modules.product.entity.Product;
import ecommerce.modules.product.repository.ProductRepository;
import ecommerce.modules.product.service.SearchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final SecurityService securityService;

    @Override
    @Transactional(readOnly = true)
    public SearchResponse search(SearchRequest request) {
        Specification<Product> spec = buildSpecification(request);
        
        Sort sort = buildSort(request.getSortBy());
        Pageable pageable = PageRequest.of(request.getPage(), request.getLimit(), sort);
        
        Page<Product> productPage = productRepository.findAll(spec, pageable);
        
        List<ProductResponse> results = productPage.getContent().stream()
                .map(this::mapToProductResponse)
                .collect(Collectors.toList());
        
        SearchResponse.Filters filters = buildFilters(spec);
        
        return SearchResponse.builder()
                .results(results)
                .pagination(buildPagination(productPage, request))
                .filters(filters)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<String> getSuggestions(String query, int limit) {
        if (query == null || query.trim().isEmpty()) {
            return List.of();
        }
        
        return productRepository.findByNameContainingIgnoreCase(query, PageRequest.of(0, limit))
                .stream()
                .map(Product::getName)
                .distinct()
                .limit(limit)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<String> getTrending(int limit, String timeRange) {
        return productRepository.findTopByViewCount(limit).stream()
                .map(Product::getName)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getPopularProducts(int limit, UUID categoryId) {
        Pageable pageable = PageRequest.of(0, limit);
        Page<Product> products;
        
        if (categoryId != null) {
            products = productRepository.findByCategoryIdAndStatus(categoryId, ProductStatus.ACTIVE, pageable);
        } else {
            products = productRepository.findByStatus(ProductStatus.ACTIVE, pageable);
        }
        
        return products.getContent().stream()
                .map(this::mapToProductResponse)
                .collect(Collectors.toList());
    }

    /**
     * Build specification for product search.
     * ADMIN users can search inactive products, regular users only see ACTIVE products.
     */
    private Specification<Product> buildSpecification(SearchRequest request) {
        // Check if user is ADMIN - if so, they can see all products
        boolean isAdmin = securityService.isAdmin();
        
        // Default to ACTIVE status for non-admin users
        ProductStatus defaultStatus = isAdmin ? null : ProductStatus.ACTIVE;
        
        Specification<Product> spec = Specification.where(hasStatus(defaultStatus));
        
        if (request.getQ() != null && !request.getQ().isBlank()) {
            spec = spec.and(hasNameOrDescriptionContaining(request.getQ()));
        }
        
        if (request.getCategoryId() != null) {
            spec = spec.and(hasCategoryId(request.getCategoryId()));
        }
        
        if (request.getBrandId() != null) {
            spec = spec.and(hasBrandId(request.getBrandId()));
        }
        
        if (request.getMinPrice() != null) {
            spec = spec.and(hasPriceGreaterThanOrEqual(request.getMinPrice()));
        }
        
        if (request.getMaxPrice() != null) {
            spec = spec.and(hasPriceLessThanOrEqual(request.getMaxPrice()));
        }
        
        if (request.getMinRating() != null) {
            spec = spec.and(hasRatingGreaterThanOrEqual(request.getMinRating()));
        }
        
        if (request.getMaxRating() != null) {
            spec = spec.and(hasRatingLessThanOrEqual(request.getMaxRating()));
        }
        
        if (Boolean.TRUE.equals(request.getInStock())) {
            spec = spec.and(hasStockGreaterThan(0));
        }
        
        if (request.getDiscountMin() != null) {
            spec = spec.and(hasDiscountGreaterThanOrEqual(request.getDiscountMin()));
        }
        
        if (request.getDiscountMax() != null) {
            spec = spec.and(hasDiscountLessThanOrEqual(request.getDiscountMax()));
        }
        
        return spec;
    }

    private Specification<Product> hasStatus(ProductStatus status) {
        if (status == null) {
            // Admin user - no status filter (can see all products)
            return (root, query, cb) -> null;
        }
        return (root, query, cb) -> cb.equal(root.get("status"), status);
    }


    private Specification<Product> hasNameOrDescriptionContaining(String searchTerm) {
        return (root, query, cb) -> cb.or(
                cb.like(cb.lower(root.get("name")), "%" + searchTerm.toLowerCase() + "%"),
                cb.like(cb.lower(root.get("description")), "%" + searchTerm.toLowerCase() + "%")
        );
    }

    private Specification<Product> hasCategoryId(UUID categoryId) {
        return (root, query, cb) -> cb.equal(root.get("category").get("id"), categoryId);
    }

    private Specification<Product> hasBrandId(UUID brandId) {
        return (root, query, cb) -> cb.equal(root.get("seller").get("id"), brandId);
    }

    private Specification<Product> hasPriceGreaterThanOrEqual(BigDecimal minPrice) {
        return (root, query, cb) -> cb.greaterThanOrEqualTo(root.get("price"), minPrice);
    }

    private Specification<Product> hasPriceLessThanOrEqual(BigDecimal maxPrice) {
        return (root, query, cb) -> cb.lessThanOrEqualTo(root.get("price"), maxPrice);
    }

    private Specification<Product> hasRatingGreaterThanOrEqual(BigDecimal minRating) {
        return (root, query, cb) -> cb.greaterThanOrEqualTo(root.get("rating"), minRating);
    }

    private Specification<Product> hasRatingLessThanOrEqual(BigDecimal maxRating) {
        return (root, query, cb) -> cb.lessThanOrEqualTo(root.get("rating"), maxRating);
    }

    private Specification<Product> hasStockGreaterThan(int stock) {
        return (root, query, cb) -> cb.greaterThan(root.get("stock"), stock);
    }

    private Specification<Product> hasDiscountGreaterThanOrEqual(BigDecimal minDiscount) {
        return (root, query, cb) -> cb.greaterThanOrEqualTo(root.get("discount"), minDiscount);
    }

    private Specification<Product> hasDiscountLessThanOrEqual(BigDecimal maxDiscount) {
        return (root, query, cb) -> cb.lessThanOrEqualTo(root.get("discount"), maxDiscount);
    }

    private Sort buildSort(String sortBy) {
        return switch (sortBy) {
            case "price-low" -> Sort.by("price").ascending();
            case "price-high" -> Sort.by("price").descending();
            case "rating" -> Sort.by("rating").descending();
            case "newest" -> Sort.by("createdAt").descending();
            default -> Sort.by("viewCount").descending();
        };
    }

    private SearchResponse.PageInfo buildPagination(Page<Product> page, SearchRequest request) {
        return SearchResponse.PageInfo.builder()
                .page(request.getPage())
                .limit(request.getLimit())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .hasNext(page.hasNext())
                .hasPrevious(page.hasPrevious())
                .build();
    }

    private SearchResponse.Filters buildFilters(Specification<Product> spec) {
        List<Category> categories = categoryRepository.findAll();
        
        List<SearchResponse.CategoryFilter> categoryFilters = categories.stream()
                .map(cat -> SearchResponse.CategoryFilter.builder()
                        .id(cat.getId())
                        .name(cat.getName())
                        .productCount(0L)
                        .build())
                .collect(Collectors.toList());
        
        return SearchResponse.Filters.builder()
                .categories(categoryFilters)
                .brands(List.of())
                .priceRange(SearchResponse.PriceRange.builder()
                        .min(BigDecimal.ZERO)
                        .max(BigDecimal.valueOf(10000))
                        .build())
                .ratingRange(SearchResponse.RatingRange.builder()
                        .min(BigDecimal.ZERO)
                        .max(BigDecimal.valueOf(5))
                        .build())
                .build();
    }

    private ProductResponse mapToProductResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .sku(product.getSku())
                .price(product.getPrice())
                .originalPrice(product.getOriginalPrice())
                .discount(product.getDiscount())
                .rating(product.getRating())
                .reviewCount(product.getReviewCount())
                .inStock(product.getStock() > 0)
                .stockCount(product.getStock())
                .createdAt(product.getCreatedAt())
                .build();
    }
}
