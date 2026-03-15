package ecommerce.graphql;

import ecommerce.modules.product.dto.ProductDto;
import ecommerce.modules.product.dto.ProductResponse;
import ecommerce.modules.product.service.ProductService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.GraphQlTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.graphql.test.tester.GraphQlTester;
import org.springframework.security.test.context.support.WithMockUser;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@GraphQlTest(ecommerce.graphql.resolver.ProductResolver.class)
public class ProductGraphQLTest {

    @Autowired
    private GraphQlTester graphQlTester;

    @MockBean
    private ProductService productService;

    @Test
    public void testGetProduct() {
        UUID productId = UUID.randomUUID();
        ProductResponse response = ProductResponse.builder()
                .id(productId)
                .name("Test Product")
                .price(new BigDecimal("99.99"))
                .build();

        when(productService.findById(productId)).thenReturn(response);

        String query = """
            query($id: ID!) {
                product(id: $id) {
                    id
                    name
                    price
                }
            }
        """;

        graphQlTester.document(query)
                .variable("id", productId.toString())
                .execute()
                .errors()
                .verify()
                .path("product.name")
                .entity(String.class)
                .isEqualTo("Test Product");
    }

    @Test
    public void testGetProducts() {
        UUID productId = UUID.randomUUID();
        ProductResponse response = ProductResponse.builder()
                .id(productId)
                .name("Test Product")
                .price(new BigDecimal("99.99"))
                .build();

        when(productService.findAll(any(), any(Pageable.class)))
                .thenReturn(new PageImpl<>(Collections.singletonList(response)));

        String query = """
            query {
                products(pagination: {page: 0, size: 10}) {
                    content {
                        id
                        name
                    }
                    pageInfo {
                        totalElements
                    }
                }
            }
        """;

        graphQlTester.document(query)
                .execute()
                .errors()
                .verify()
                .path("products.content[0].name")
                .entity(String.class)
                .isEqualTo("Test Product");
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void testCreateProduct() {
        UUID productId = UUID.randomUUID();
        ProductResponse response = ProductResponse.builder()
                .id(productId)
                .name("New Product")
                .build();

        when(productService.create(any(), any())).thenReturn(response);

        String mutation = """
            mutation($input: ProductCreateRequest!) {
                createProduct(input: $input) {
                    id
                    name
                }
            }
        """;

        graphQlTester.document(mutation)
                .variable("input", Collections.singletonMap("name", "New Product"))
                .execute()
                .errors()
                .verify()
                .path("createProduct.name")
                .entity(String.class)
                .isEqualTo("New Product");
    }
}
