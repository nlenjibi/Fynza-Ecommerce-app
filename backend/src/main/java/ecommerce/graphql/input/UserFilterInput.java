package ecommerce.graphql.input;

import ecommerce.common.enums.PaymentMethod;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * GraphQL Input for User filtering using Specifications
 */
@Data
public class UserFilterInput {
    private String search;
    private PaymentMethod.Role role;
    private Boolean active;
    private Boolean emailVerified;
    private LocalDateTime createdAfter;
    private LocalDateTime createdBefore;
    private String phoneNumber;
    private String name;
}
