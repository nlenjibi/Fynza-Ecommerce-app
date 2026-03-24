package ecommerce.graphql.resolver;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

@Controller
public class PaymentResolver {

    @QueryMapping
    public String paymentTransactions() {
        throw new UnsupportedOperationException("Payment service not implemented");
    }

    @QueryMapping
    public String paymentTransaction() {
        throw new UnsupportedOperationException("Payment service not implemented");
    }

    @QueryMapping
    public String savedPaymentMethods() {
        throw new UnsupportedOperationException("Payment service not implemented");
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String paymentStats() {
        throw new UnsupportedOperationException("Payment service not implemented");
    }

    @MutationMapping
    public String initiatePayment(@Argument String input) {
        throw new UnsupportedOperationException("Payment service not implemented");
    }

    @MutationMapping
    public String savePaymentMethod(@Argument String input) {
        throw new UnsupportedOperationException("Payment service not implemented");
    }

    @MutationMapping
    public String deletePaymentMethod() {
        throw new UnsupportedOperationException("Payment service not implemented");
    }
}