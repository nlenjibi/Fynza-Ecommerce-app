package ecommerce.modules.seller.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateStoreRequest {
    
    @NotBlank(message = "Store name is required")
    private String storeName;
    
    private String storeDescription;
    
    private String storeWebsite;
    
    private String storeLogo;
    
    private String businessRegistration;
    
    private String bankName;
    
    private String accountHolderName;
    
    private String accountNumber;
}
