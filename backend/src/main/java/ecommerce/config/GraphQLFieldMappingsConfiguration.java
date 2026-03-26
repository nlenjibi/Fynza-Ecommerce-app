package ecommerce.config;

import ecommerce.graphql.dto.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.graphql.execution.RuntimeWiringConfigurer;

import java.util.List;

@Configuration
public class GraphQLFieldMappingsConfiguration {

    @Bean
    public RuntimeWiringConfigurer graphQLFieldMappingsConfigurer() {
        return wiringBuilder -> {
            wiringBuilder.type("Conversation", typeWiring -> typeWiring
                    .dataFetcher("participants", env -> List.of())
                    .dataFetcher("lastMessage", env -> null)
            );

            wiringBuilder.type("Message", typeWiring -> typeWiring
                    .dataFetcher("conversation", env -> null)
                    .dataFetcher("sender", env -> null)
                    .dataFetcher("attachments", env -> List.of())
            );

            wiringBuilder.type("PaymentTransaction", typeWiring -> typeWiring
                    .dataFetcher("order", env -> null)
                    .dataFetcher("user", env -> null)
            );

            wiringBuilder.type("SavedPaymentMethod", typeWiring -> typeWiring
                    .dataFetcher("user", env -> null)
            );

            wiringBuilder.type("Promotion", typeWiring -> typeWiring
                    .dataFetcher("products", env -> List.of())
                    .dataFetcher("categories", env -> List.of())
                    .dataFetcher("seller", env -> null)
            );

            wiringBuilder.type("FlashSale", typeWiring -> typeWiring
                    .dataFetcher("products", env -> List.of())
            );

            wiringBuilder.type("Refund", typeWiring -> typeWiring
                    .dataFetcher("order", env -> null)
                    .dataFetcher("user", env -> null)
            );

            wiringBuilder.type("Report", typeWiring -> typeWiring
                    .dataFetcher("generatedBy", env -> null)
                    .dataFetcher("schedule", env -> null)
            );

            wiringBuilder.type("ReportSchedule", typeWiring -> typeWiring
                    .dataFetcher("reports", env -> List.of())
            );

            wiringBuilder.type("ShippingZone", typeWiring -> typeWiring
                    .dataFetcher("regions", env -> List.of())
            );

            wiringBuilder.type("Subscriber", typeWiring -> typeWiring
                    .dataFetcher("user", env -> null)
            );

            wiringBuilder.type("SellerProductTag", typeWiring -> typeWiring
                    .dataFetcher("products", env -> List.of())
            );

            wiringBuilder.type("Tag", typeWiring -> typeWiring
                    .dataFetcher("createdAt", env -> null)
                    .dataFetcher("updatedAt", env -> null)
            );

            wiringBuilder.type("SearchResponse", typeWiring -> typeWiring
                    .dataFetcher("pageInfo", env -> null)
            );

            wiringBuilder.type("ProductRatingStats", typeWiring -> typeWiring
                    .dataFetcher("productId", env -> null)
            );

            wiringBuilder.type("Review", typeWiring -> typeWiring
                    .dataFetcher("hasImages", env -> false)
            );

            wiringBuilder.type("SellerDashboard", typeWiring -> typeWiring
                    .dataFetcher("processingOrders", env -> 0L)
                    .dataFetcher("shippedOrders", env -> 0L)
                    .dataFetcher("cancelledOrders", env -> 0L)
                    .dataFetcher("lowStockProducts", env -> 0L)
                    .dataFetcher("outOfStockProducts", env -> 0L)
                    .dataFetcher("averageOrderValue", env -> null)
                    .dataFetcher("conversionRate", env -> null)
            );

            wiringBuilder.type("SellerAnalytics", typeWiring -> typeWiring
                    .dataFetcher("totalRevenue", env -> null)
                    .dataFetcher("topSellingProducts", env -> List.of())
                    .dataFetcher("ordersByStatus", env -> List.of())
                    .dataFetcher("revenueByDay", env -> List.of())
                    .dataFetcher("revenueByMonth", env -> List.of())
            );

            wiringBuilder.type("ContentTrendPoint", typeWiring -> typeWiring
                    .dataFetcher("date", env -> null)
                    .dataFetcher("value", env -> 0)
            );

            wiringBuilder.type("CategoryEngagement", typeWiring -> typeWiring
                    .dataFetcher("category", env -> null)
                    .dataFetcher("engagement", env -> 0L)
            );

            wiringBuilder.type("TopContentItem", typeWiring -> typeWiring
                    .dataFetcher("contentId", env -> null)
                    .dataFetcher("title", env -> null)
                    .dataFetcher("views", env -> 0L)
            );

            wiringBuilder.type("RateLimitEndpoint", typeWiring -> typeWiring
                    .dataFetcher("endpoint", env -> null)
                    .dataFetcher("limit", env -> 0)
            );

            wiringBuilder.type("CacheStatistics", typeWiring -> typeWiring
                    .dataFetcher("hits", env -> 0L)
                    .dataFetcher("misses", env -> 0L)
                    .dataFetcher("size", env -> 0L)
            );

            wiringBuilder.type("PaymentGatewayConfig", typeWiring -> typeWiring
                    .dataFetcher("gatewayName", env -> null)
                    .dataFetcher("isEnabled", env -> false)
                    .dataFetcher("credentials", env -> null)
            );

            wiringBuilder.type("OrderResponse", typeWiring -> typeWiring
                    .dataFetcher("order", env -> null)
            );
        };
    }
}