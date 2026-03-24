package ecommerce.graphql.resolver;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

@Controller
public class RefundResolver {

    @QueryMapping
    public String myRefunds() {
        throw new UnsupportedOperationException("Refund service not implemented");
    }

    @QueryMapping
    public String refund() {
        throw new UnsupportedOperationException("Refund service not implemented");
    }

    @QueryMapping
    public String orderRefunds() {
        throw new UnsupportedOperationException("Refund service not implemented");
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String refundStats() {
        throw new UnsupportedOperationException("Refund service not implemented");
    }

    @MutationMapping
    public String requestRefund(@Argument String input) {
        throw new UnsupportedOperationException("Refund service not implemented");
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String reviewRefund() {
        throw new UnsupportedOperationException("Refund service not implemented");
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String processRefund() {
        throw new UnsupportedOperationException("Refund service not implemented");
    }
}