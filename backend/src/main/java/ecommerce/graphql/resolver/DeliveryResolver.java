package ecommerce.graphql.resolver;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

@Controller
public class DeliveryResolver {

    @QueryMapping
    public String deliveryRegions() {
        throw new UnsupportedOperationException("Delivery service not implemented");
    }

    @QueryMapping
    public String deliveryRegion() {
        throw new UnsupportedOperationException("Delivery service not implemented");
    }

    @QueryMapping
    public String deliveryFees() {
        throw new UnsupportedOperationException("Delivery service not implemented");
    }

    @QueryMapping
    public String shippingZones() {
        throw new UnsupportedOperationException("Delivery service not implemented");
    }

    @QueryMapping
    public String calculateShipping() {
        throw new UnsupportedOperationException("Delivery service not implemented");
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String createDeliveryRegion() {
        throw new UnsupportedOperationException("Delivery service not implemented");
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String createDeliveryFee() {
        throw new UnsupportedOperationException("Delivery service not implemented");
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String createShippingZone() {
        throw new UnsupportedOperationException("Delivery service not implemented");
    }
}