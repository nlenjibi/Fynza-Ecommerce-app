package ecommerce.graphql.resolver;

import ecommerce.common.response.PaginatedResponse;
import ecommerce.graphql.dto.ProductDto;
import ecommerce.graphql.input.PageInput;
import ecommerce.graphql.input.SortDirection;
import ecommerce.modules.product.dto.CreateProductRequest;
import ecommerce.modules.product.dto.ProductResponse;
import ecommerce.modules.product.dto.UpdateProductRequest;
import ecommerce.modules.product.service.ProductService;
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

import java.util.UUID;

/**
 * GraphQL Resolver for Product operations
 */
@Controller
@RequiredArgsConstructor
@Slf4j
public class ProductResolver {

    private final ProductService productService;

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
}
