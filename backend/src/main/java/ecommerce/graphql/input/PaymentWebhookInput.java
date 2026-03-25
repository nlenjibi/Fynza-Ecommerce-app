package ecommerce.graphql.input;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PaymentWebhookInput {
    private UUID transactionId;
    private String gatewayTransactionId;
    private String status;
    private String gatewayResponse;
    private String failureReason;
}
