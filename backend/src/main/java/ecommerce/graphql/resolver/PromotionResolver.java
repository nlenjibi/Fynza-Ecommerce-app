package ecommerce.graphql.resolver;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

@Controller
public class PromotionResolver {

    @QueryMapping
    public String activePromotions() {
        throw new UnsupportedOperationException("Promotion service not implemented");
    }

    @QueryMapping
    public String promotion() {
        throw new UnsupportedOperationException("Promotion service not implemented");
    }

    @QueryMapping
    public String activeFlashSales() {
        throw new UnsupportedOperationException("Promotion service not implemented");
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String adminPromotions() {
        throw new UnsupportedOperationException("Promotion service not implemented");
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String createPromotion(@Argument String input) {
        throw new UnsupportedOperationException("Promotion service not implemented");
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String createFlashSale(@Argument String input) {
        throw new UnsupportedOperationException("Promotion service not implemented");
    }

    @MutationMapping
    @PreAuthorize("hasRole('SELLER')")
    public String applyForFlashSale() {
        throw new UnsupportedOperationException("Promotion service not implemented");
    }
}