package ecommerce.graphql.resolver;

import ecommerce.common.enums.DeliveryMethod;
import ecommerce.graphql.dto.ShippingCalculation;
import ecommerce.graphql.input.CalculateShippingInput;
import ecommerce.graphql.input.DeliveryFeeInput;
import ecommerce.graphql.input.DeliveryRegionInput;
import ecommerce.modules.delivery.dto.DeliveryFeeRequest;
import ecommerce.modules.delivery.dto.DeliveryFeeResponse;
import ecommerce.modules.delivery.dto.DeliveryRegionRequest;
import ecommerce.modules.delivery.dto.DeliveryRegionResponse;
import ecommerce.modules.delivery.entity.DeliveryFee;
import ecommerce.modules.delivery.entity.DeliveryRegion;
import ecommerce.modules.delivery.repository.DeliveryFeeRepository;
import ecommerce.modules.delivery.repository.DeliveryRegionRepository;
import ecommerce.modules.delivery.service.DeliveryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Controller
@RequiredArgsConstructor
@Slf4j
public class DeliveryResolver {

    private final DeliveryService deliveryService;
    private final DeliveryRegionRepository regionRepository;
    private final DeliveryFeeRepository feeRepository;

    @QueryMapping
    public List<DeliveryRegionResponse> deliveryRegions(@Argument String country) {
        log.info("GraphQL Query: deliveryRegions(country: {})", country);
        return deliveryService.getActiveRegions();
    }

    @QueryMapping
    public DeliveryRegionResponse deliveryRegion(@Argument UUID id) {
        log.info("GraphQL Query: deliveryRegion(id: {})", id);
        return deliveryService.getRegionById(id);
    }

    @QueryMapping
    public List<DeliveryFeeResponse> deliveryFees(
            @Argument UUID regionId,
            @Argument String shippingMethod) {
        log.info("GraphQL Query: deliveryFees(regionId: {}, shippingMethod: {})", regionId, shippingMethod);
        
        if (regionId != null) {
            return deliveryService.getDeliveryFeesByRegion(regionId);
        }
        
        return deliveryService.getActiveDeliveryFees();
    }

    @QueryMapping
    public DeliveryFeeResponse deliveryFee(@Argument UUID id) {
        log.info("GraphQL Query: deliveryFee(id: {})", id);
        return deliveryService.getDeliveryFeeById(id);
    }

    @QueryMapping
    public List<DeliveryRegion> shippingZones() {
        log.info("GraphQL Query: shippingZones");
        return regionRepository.findAll();
    }

    @QueryMapping
    public ShippingCalculation calculateShipping(@Argument CalculateShippingInput input) {
        log.info("GraphQL Query: calculateShipping");
        
        BigDecimal subtotal = input.getSubtotal();
        BigDecimal weight = input.getWeight();
        
        BigDecimal shippingFee;
        boolean isFreeShipping = false;
        int estimatedDays = 3;
        
        BigDecimal freeShippingThreshold = new BigDecimal("100.00");
        if (subtotal.compareTo(freeShippingThreshold) >= 0) {
            shippingFee = BigDecimal.ZERO;
            isFreeShipping = true;
        } else {
            shippingFee = new BigDecimal("10.00");
            if (weight != null && weight.compareTo(new BigDecimal("5")) > 0) {
                shippingFee = shippingFee.add(new BigDecimal("5.00"));
            }
        }
        
        return ShippingCalculation.builder()
                .shippingMethod("STANDARD")
                .fee(shippingFee)
                .estimatedDays(estimatedDays)
                .isFreeShipping(isFreeShipping)
                .build();
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public DeliveryRegionResponse createDeliveryRegion(@Argument DeliveryRegionInput input) {
        log.info("GraphQL Mutation: createDeliveryRegion(name: {})", input.getName());
        
        DeliveryRegionRequest request = DeliveryRegionRequest.builder()
                .name(input.getName())
                .code(input.getCode())
                .country(input.getCountry())
                .build();
        
        return deliveryService.createRegion(request);
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public DeliveryRegionResponse updateDeliveryRegion(
            @Argument UUID id,
            @Argument DeliveryRegionInput input) {
        log.info("GraphQL Mutation: updateDeliveryRegion(id: {})", id);
        
        DeliveryRegionRequest request = DeliveryRegionRequest.builder()
                .name(input.getName())
                .code(input.getCode())
                .country(input.getCountry())
                .build();
        
        return deliveryService.updateRegion(id, request);
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public boolean deleteDeliveryRegion(@Argument UUID id) {
        log.info("GraphQL Mutation: deleteDeliveryRegion(id: {})", id);
        deliveryService.deleteRegion(id);
        return true;
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public DeliveryFeeResponse createDeliveryFee(@Argument DeliveryFeeInput input) {
        log.info("GraphQL Mutation: createDeliveryFee");
        
        DeliveryFeeRequest request = DeliveryFeeRequest.builder()
                .regionId(input.getRegionId())
                .deliveryMethod(DeliveryMethod.valueOf(input.getShippingMethod()))
                .baseFee(input.getBaseFee())
                .weightBasedFee(input.getWeightBasedFee())
                .freeShippingThreshold(input.getFreeShippingThreshold())
                .estimatedDays(input.getEstimatedDays())
                .build();
        
        return deliveryService.createDeliveryFee(request);
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public DeliveryFeeResponse updateDeliveryFee(
            @Argument UUID id,
            @Argument DeliveryFeeInput input) {
        log.info("GraphQL Mutation: updateDeliveryFee(id: {})", id);
        
        DeliveryFeeRequest request = DeliveryFeeRequest.builder()
                .regionId(input.getRegionId())
                .deliveryMethod(DeliveryMethod.valueOf(input.getShippingMethod()))
                .baseFee(input.getBaseFee())
                .weightBasedFee(input.getWeightBasedFee())
                .freeShippingThreshold(input.getFreeShippingThreshold())
                .estimatedDays(input.getEstimatedDays())
                .build();
        
        return deliveryService.updateDeliveryFee(id, request);
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public boolean deleteDeliveryFee(@Argument UUID id) {
        log.info("GraphQL Mutation: deleteDeliveryFee(id: {})", id);
        deliveryService.deleteDeliveryFee(id);
        return true;
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Object createShippingZone(@Argument Object input) {
        log.info("GraphQL Mutation: createShippingZone - not implemented");
        throw new UnsupportedOperationException("Shipping zone management not implemented");
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Object updateShippingZone(@Argument UUID id, @Argument Object input) {
        log.info("GraphQL Mutation: updateShippingZone(id: {})", id);
        return null;
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Boolean deleteShippingZone(@Argument UUID id) {
        log.info("GraphQL Mutation: deleteShippingZone(id: {})", id);
        return true;
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Object activateDeliveryFee(@Argument UUID id) {
        log.info("GraphQL Mutation: activateDeliveryFee(id: {})", id);
        return null;
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Object deactivateDeliveryFee(@Argument UUID id) {
        log.info("GraphQL Mutation: deactivateDeliveryFee(id: {})", id);
        return null;
    }
}
