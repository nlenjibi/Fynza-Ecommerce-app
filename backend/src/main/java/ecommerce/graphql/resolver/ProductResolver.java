package ecommerce.graphql.resolver;

import ecommerce.common.response.PaginatedResponse;
import ecommerce.graphql.dto.ProductDto;
import ecommerce.graphql.input.PageInput;
import ecommerce.graphql.input.SortDirection;
import ecommerce.modules.product.dto.*;
import ecommerce.modules.product.service.ProductService;
import ecommerce.modules.product.service.SearchService;
import ecommerce.common.enums.InventoryStatus;
import ecommerce.common.enums.ProductStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.ContextValue;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * GraphQL Resolver for Product operations
 */
@Controller
@RequiredArgsConstructor
@Slf4j
public class ProductResolver {

    private final ProductService productService;
    private final SearchService searchService;

    @QueryMapping
    public ProductResponse product(@Argument UUID id) {
        log.debug("GraphQL Query: product(id: {})", id);
        return productService.findById(id);
    }

    @QueryMapping
    public ProductDto products(
            @Argument PageInput pagination,
            @Argument ecommerce.graphql.input.ProductFilterInput filter) {
        log.debug("GraphQL Query: products");

        Pageable pageable = createPageable(pagination);
        
        // Handle filter if provided
        ecommerce.modules.product.dto.ProductFilterRequest filterRequest = null;
        if (filter != null) {
            filterRequest = filter.toFilterRequest();
        }
        
        Page<ProductResponse> productPage = productService.findAll(filterRequest, pageable);

        return ProductDto.builder()
                .content(productPage.getContent())
                .pageInfo(PaginatedResponse.from(productPage))
                .build();
    }

    @QueryMapping
    public SearchResponse search(
            @Argument ecommerce.graphql.input.SearchInput input) {
        log.debug("GraphQL Query: search(q: {})", input != null ? input.getQ() : null);

        SearchRequest request = mapToSearchRequest(input);
        SearchResponse response = searchService.search(request);

        return response;
    }

    @QueryMapping
    public List<String> searchSuggestions(
            @Argument String query,
            @Argument Integer limit) {
        log.debug("GraphQL Query: searchSuggestions(query: {}, limit: {})", query, limit);
        return searchService.getSuggestions(query, limit != null ? limit : 10);
    }

    @QueryMapping
    public List<String> trendingSearches(
            @Argument Integer limit) {
        log.debug("GraphQL Query: trendingSearches(limit: {})", limit);
        return searchService.getTrending(limit != null ? limit : 10, "week");
    }

    @QueryMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ProductDto productsBySeller(
            @Argument UUID sellerId,
            @Argument PageInput pagination) {
        log.debug("GraphQL Query: productsBySeller(sellerId: {})", sellerId);

        Pageable pageable = createPageable(pagination);
        Page<ProductResponse> productPage = productService.findBySellerId(sellerId, pageable);

        return ProductDto.builder()
                .content(productPage.getContent())
                .pageInfo(PaginatedResponse.from(productPage))
                .build();
    }

    @QueryMapping
    public ProductDto productsByCategory(
            @Argument UUID categoryId,
            @Argument PageInput pagination) {
        log.debug("GraphQL Query: productsByCategory(categoryId: {})", categoryId);

        Pageable pageable = createPageable(pagination);
        ProductFilterRequest filterRequest = ProductFilterRequest.builder()
                .categoryId(categoryId)
                .build();
        Page<ProductResponse> productPage = productService.findAll(filterRequest, pageable);

        return ProductDto.builder()
                .content(productPage.getContent())
                .pageInfo(PaginatedResponse.from(productPage))
                .build();
    }

    @QueryMapping
    public ProductDto productsByCategoryName(
            @Argument String categoryName,
            @Argument PageInput pagination) {
        log.debug("GraphQL Query: productsByCategoryName(categoryName: {})", categoryName);

        Pageable pageable = createPageable(pagination);
        ProductFilterRequest filterRequest = ProductFilterRequest.builder()
                .categoryName(categoryName)
                .build();
        Page<ProductResponse> productPage = productService.findAll(filterRequest, pageable);

        return ProductDto.builder()
                .content(productPage.getContent())
                .pageInfo(PaginatedResponse.from(productPage))
                .build();
    }

    @QueryMapping
    public ProductDto productsByPriceRange(
            @Argument BigDecimal minPrice,
            @Argument BigDecimal maxPrice,
            @Argument PageInput pagination) {
        log.debug("GraphQL Query: productsByPriceRange(minPrice: {}, maxPrice: {})", minPrice, maxPrice);

        Pageable pageable = createPageable(pagination);
        ProductFilterRequest filterRequest = ProductFilterRequest.builder()
                .minPrice(minPrice)
                .maxPrice(maxPrice)
                .build();
        Page<ProductResponse> productPage = productService.findAll(filterRequest, pageable);

        return ProductDto.builder()
                .content(productPage.getContent())
                .pageInfo(PaginatedResponse.from(productPage))
                .build();
    }

    @QueryMapping
    public ProductDto searchProducts(
            @Argument String keyword,
            @Argument PageInput pagination) {
        log.debug("GraphQL Query: searchProducts(keyword: {})", keyword);

        Pageable pageable = createPageable(pagination);
        ProductFilterRequest filterRequest = ProductFilterRequest.builder()
                .keyword(keyword)
                .build();
        Page<ProductResponse> productPage = productService.findAll(filterRequest, pageable);

        return ProductDto.builder()
                .content(productPage.getContent())
                .pageInfo(PaginatedResponse.from(productPage))
                .build();
    }

    @QueryMapping
    public ProductDto productsByInventoryStatus(
            @Argument InventoryStatus status,
            @Argument PageInput pagination) {
        log.debug("GraphQL Query: productsByInventoryStatus(status: {})", status);

        Pageable pageable = createPageable(pagination);
        ProductFilterRequest filterRequest = ProductFilterRequest.builder()
                .inventoryStatus(status.name())
                .build();
        Page<ProductResponse> productPage = productService.findAll(filterRequest, pageable);

        return ProductDto.builder()
                .content(productPage.getContent())
                .pageInfo(PaginatedResponse.from(productPage))
                .build();
    }

    @QueryMapping
    public ProductDto productsNeedingReorder(@Argument PageInput pagination) {
        log.debug("GraphQL Query: productsNeedingReorder");

        Pageable pageable = createPageable(pagination);
        ProductFilterRequest filterRequest = ProductFilterRequest.builder()
                .needsReorderOnly(true)
                .build();
        Page<ProductResponse> productPage = productService.findAll(filterRequest, pageable);

        return ProductDto.builder()
                .content(productPage.getContent())
                .pageInfo(PaginatedResponse.from(productPage))
                .build();
    }

    @QueryMapping
    public List<ProductResponse> lowStockProducts() {
        log.debug("GraphQL Query: lowStockProducts");
        
        ProductFilterRequest filterRequest = ProductFilterRequest.builder()
                .inventoryStatus(InventoryStatus.LOW_STOCK.name())
                .build();
        
        return productService.findAll(filterRequest, PageRequest.of(0, 50)).getContent();
    }

    @QueryMapping
    public List<ProductResponse> outOfStockProducts() {
        log.debug("GraphQL Query: outOfStockProducts");
        
        ProductFilterRequest filterRequest = ProductFilterRequest.builder()
                .inventoryStatus(InventoryStatus.OUT_OF_STOCK.name())
                .build();
        
        return productService.findAll(filterRequest, PageRequest.of(0, 50)).getContent();
    }

    @QueryMapping
    public AdminProductStatsResponse productStatistics() {
        log.debug("GraphQL Query: productStatistics");
        return productService.getAdminProductStats();
    }

    // ==================== Mutations ====================

    @MutationMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SELLER')")
    public ProductResponse createProduct(
            @Argument CreateProductRequest input,
            @ContextValue UUID sellerId) {
        log.info("GraphQL Mutation: createProduct(name: {})", input.getName());
        UUID resolvedSellerId = sellerId != null ? sellerId : UUID.fromString("00000000-0000-0000-0000-000000000001");
        return productService.create(input, resolvedSellerId);
    }

    @MutationMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ProductResponse updateProduct(
            @Argument UUID id,
            @Argument UpdateProductRequest input) {
        log.info("GraphQL Mutation: updateProduct(id: {})", id);
        return productService.update(id, input);
    }

    @MutationMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public Boolean deleteProduct(@Argument UUID id) {
        log.info("GraphQL Mutation: deleteProduct(id: {})", id);
        productService.delete(id);
        return true;
    }

    @MutationMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ProductResponse addStock(
            @Argument UUID id,
            @Argument Integer quantity) {
        log.info("GraphQL Mutation: addStock(id: {}, quantity: {})", id, quantity);
        return productService.addStock(id, quantity);
    }

    @MutationMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ProductResponse restoreStock(
            @Argument UUID id,
            @Argument Integer quantity) {
        log.info("GraphQL Mutation: restoreStock(id: {}, quantity: {})", id, quantity);
        return productService.restoreStock(id, quantity);
    }

    @MutationMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ProductResponse reserveStock(
            @Argument UUID id,
            @Argument Integer quantity) {
        log.info("GraphQL Mutation: reserveStock(id: {}, quantity: {})", id, quantity);
        return productService.reserveStock(id, quantity);
    }

    @MutationMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ProductResponse releaseReservedStock(
            @Argument UUID id,
            @Argument Integer quantity) {
        log.info("GraphQL Mutation: releaseReservedStock(id: {}, quantity: {})", id, quantity);
        return productService.releaseReservedStock(id, quantity);
    }

    @MutationMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ProductResponse reduceStock(
            @Argument UUID id,
            @Argument Integer quantity) {
        log.info("GraphQL Mutation: reduceStock(id: {}, quantity: {})", id, quantity);
        return productService.reduceStock(id, quantity);
    }

    @MutationMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public Boolean incrementViewCount(@Argument UUID id) {
        log.info("GraphQL Mutation: incrementViewCount(id: {})", id);
        return productService.incrementViewCount(id);
    }

    @MutationMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ProductResponse updateRating(
            @Argument UUID id,
            @Argument Float rating) {
        log.info("GraphQL Mutation: updateRating(id: {}, rating: {})", id, rating);
        return productService.updateRating(id, rating);
    }

    @MutationMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public Boolean bulkUpdateFeatured(
            @Argument List<UUID> productIds,
            @Argument Boolean featured) {
        log.info("GraphQL Mutation: bulkUpdateFeatured(productIds: {}, featured: {})", productIds, featured);
        for (UUID id : productIds) {
            try {
                productService.updateProductStatus(id, featured ? ProductStatus.ACTIVE : ProductStatus.INACTIVE);
            } catch (Exception e) {
                log.warn("Failed to update product {}: {}", id, e.getMessage());
            }
        }
        return true;
    }

    @MutationMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public Boolean bulkDelete(@Argument List<UUID> productIds) {
        log.info("GraphQL Mutation: bulkDelete(productIds: {})", productIds);
        for (UUID id : productIds) {
            try {
                productService.delete(id);
            } catch (Exception e) {
                log.warn("Failed to delete product {}: {}", id, e.getMessage());
            }
        }
        return true;
    }

    private Pageable createPageable(PageInput input) {
        if (input == null) {
            return PageRequest.of(0, 20, Sort.by(Sort.Direction.ASC, "id"));
        }
        Sort.Direction direction = input.getDirection() == SortDirection.DESC
                ? Sort.Direction.DESC
                : Sort.Direction.ASC;
        String sortBy = input.getSortBy() != null ? input.getSortBy() : "id";
        int page = input.getPage();
        int size = input.getSize();
        return PageRequest.of(page, size, Sort.by(direction, sortBy));
    }

    private SearchRequest mapToSearchRequest(ecommerce.graphql.input.SearchInput input) {
        if (input == null) {
            return SearchRequest.builder().build();
        }

        return SearchRequest.builder()
                .q(input.getQ())
                .categoryId(input.getCategoryId() != null ? UUID.fromString(input.getCategoryId()) : null)
                .brandId(input.getBrandId() != null ? UUID.fromString(input.getBrandId()) : null)
                .minPrice(input.getMinPrice())
                .maxPrice(input.getMaxPrice())
                .minRating(input.getMinRating() != null ? BigDecimal.valueOf(input.getMinRating()) : null)
                .maxRating(input.getMaxRating() != null ? BigDecimal.valueOf(input.getMaxRating()) : null)
                .inStock(input.getInStock())
                .expressDelivery(input.getExpressDelivery())
                .discountMin(input.getDiscountMin() != null ? BigDecimal.valueOf(input.getDiscountMin()) : null)
                .discountMax(input.getDiscountMax() != null ? BigDecimal.valueOf(input.getDiscountMax()) : null)
                .sortBy(input.getSortBy() != null ? input.getSortBy() : "popularity")
                .page(input.getPage() != null ? input.getPage() : 0)
                .limit(input.getLimit() != null ? input.getLimit() : 20)
                .build();
    }
}
