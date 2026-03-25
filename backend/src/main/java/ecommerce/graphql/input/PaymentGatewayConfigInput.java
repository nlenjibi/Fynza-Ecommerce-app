package ecommerce.graphql.input;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PaymentGatewayConfigInput {
    private String gateway;
    private Boolean enabled;
    private String merchantId;
    private String environment;
}
