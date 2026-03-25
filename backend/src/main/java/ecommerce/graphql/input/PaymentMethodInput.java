package ecommerce.graphql.input;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PaymentMethodInput {
    private String type;
    private String last4;
    private Integer expiryMonth;
    private Integer expiryYear;
    private String cardBrand;
    private String bankName;
    private Boolean isDefault;
}
