package ecommerce.modules.category.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CategoryResponse {
    private UUID id;
    private String name;
    private String description;
    private UUID parentCategoryId;
    private String image;
    private String slug;
    private List<CategoryResponse> children;
}
