package ecommerce.modules.order.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentProcessRequest {
    private Long orderId;
    private String status;
    private String paymentMethod;
    private String transactionId;
}
