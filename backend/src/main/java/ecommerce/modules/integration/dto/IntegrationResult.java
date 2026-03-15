package ecommerce.modules.integration.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class IntegrationResult {
    private BigDecimal shippingCost;
    private BigDecimal taxAmount;
    private boolean fraudCheckPassed;
    private String trackingNumber;
    
    // Additional fields used in Implementation
    private String fraudRiskLevel;
    private boolean shippingSuccess;
    private boolean taxSuccess;
    private boolean fraudCheckSuccess;

    public boolean isAllSuccessful() {
        return shippingSuccess && taxSuccess && fraudCheckSuccess;
    }
}
