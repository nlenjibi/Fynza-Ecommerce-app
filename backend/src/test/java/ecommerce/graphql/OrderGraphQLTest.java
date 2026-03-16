package ecommerce.graphql;

import ecommerce.modules.order.dto.OrderResponse;
import ecommerce.modules.order.service.OrderService;
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
import static org.mockito.Mockito.when;

@GraphQlTest(ecommerce.graphql.resolver.OrderResolver.class)
public class OrderGraphQLTest {

    @Autowired
    private GraphQlTester graphQlTester;

    @MockBean
    private OrderService orderService;

    @Test
    @WithMockUser
    public void testGetMyOrders() {
        UUID orderId = UUID.randomUUID();
        OrderResponse response = OrderResponse.builder()
                .id(orderId)
                .orderNumber("ORD-123456")
                .totalAmount(new BigDecimal("150.00"))
                .status("PENDING")
                .build();

        when(orderService.findByCustomer(any(), any(Pageable.class)))
                .thenReturn(new PageImpl<>(Collections.singletonList(response)));

        String query = """
            query {
                myOrders(pagination: {page: 0, size: 10}) {
                    content {
                        id
                        orderNumber
                        totalAmount
                    }
                }
            }
        """;

        graphQlTester.document(query)
                .execute()
                .errors()
                .verify()
                .path("myOrders.content[0].orderNumber")
                .entity(String.class)
                .isEqualTo("ORD-123456");
    }

    @Test
    @WithMockUser
    public void testGetOrderById() {
        UUID orderId = UUID.randomUUID();
        OrderResponse response = OrderResponse.builder()
                .id(orderId)
                .orderNumber("ORD-123456")
                .build();

        when(orderService.findById(orderId)).thenReturn(response);

        String query = """
            query($id: ID!) {
                order(id: $id) {
                    order {
                        id
                        orderNumber
                    }
                }
            }
        """;

        graphQlTester.document(query)
                .variable("id", orderId.toString())
                .execute()
                .errors()
                .verify()
                .path("order.order.orderNumber")
                .entity(String.class)
                .isEqualTo("ORD-123456");
    }
}
