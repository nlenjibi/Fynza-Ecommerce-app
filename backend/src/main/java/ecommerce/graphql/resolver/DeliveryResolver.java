package ecommerce.graphql.resolver;

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
                .deliveryMethod(input.getShippingMethod())
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
                .deliveryMethod(input.getShippingMethod())
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

    public static class DeliveryRegionInput {
        private String name;
        private String code;
        private String country;

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getCode() { return code; }
        public void setCode(String code) { this.code = code; }
        public String getCountry() { return country; }
        public void setCountry(String country) { this.country = country; }
    }

    public static class DeliveryFeeInput {
        private UUID regionId;
        private String shippingMethod;
        private BigDecimal baseFee;
        private BigDecimal weightBasedFee;
        private BigDecimal freeShippingThreshold;
        private Integer estimatedDays;

        public UUID getRegionId() { return regionId; }
        public void setRegionId(UUID regionId) { this.regionId = regionId; }
        public String getShippingMethod() { return shippingMethod; }
        public void setShippingMethod(String shippingMethod) { this.shippingMethod = shippingMethod; }
        public BigDecimal getBaseFee() { return baseFee; }
        public void setBaseFee(BigDecimal baseFee) { this.baseFee = baseFee; }
        public BigDecimal getWeightBasedFee() { return weightBasedFee; }
        public void setWeightBasedFee(BigDecimal weightBasedFee) { this.weightBasedFee = weightBasedFee; }
        public BigDecimal getFreeShippingThreshold() { return freeShippingThreshold; }
        public void setFreeShippingThreshold(BigDecimal freeShippingThreshold) { this.freeShippingThreshold = freeShippingThreshold; }
        public Integer getEstimatedDays() { return estimatedDays; }
        public void setEstimatedDays(Integer estimatedDays) { this.estimatedDays = estimatedDays; }
    }

    public static class CalculateShippingInput {
        private UUID zoneId;
        private UUID regionId;
        private BigDecimal weight;
        private BigDecimal subtotal;

        public UUID getZoneId() { return zoneId; }
        public void setZoneId(UUID zoneId) { this.zoneId = zoneId; }
        public UUID getRegionId() { return regionId; }
        public void setRegionId(UUID regionId) { this.regionId = regionId; }
        public BigDecimal getWeight() { return weight; }
        public void setWeight(BigDecimal weight) { this.weight = weight; }
        public BigDecimal getSubtotal() { return subtotal; }
        public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }
    }

    @lombok.Data
    @lombok.Builder
    public static class ShippingCalculation {
        private String shippingMethod;
        private BigDecimal fee;
        private Integer estimatedDays;
        private Boolean isFreeShipping;
    }
}
