package ecommerce.graphql.input;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DeliveryFeeInput {
    private UUID regionId;
    private String shippingMethod;
    private BigDecimal baseFee;
    private BigDecimal weightBasedFee;
    private BigDecimal freeShippingThreshold;
    private Integer estimatedDays;
}
