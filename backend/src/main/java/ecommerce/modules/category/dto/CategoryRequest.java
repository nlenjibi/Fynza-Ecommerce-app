package ecommerce.modules.category.dto;

import lombok.*;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryRequest {
    private String name;
    private String description;
    private UUID parentCategoryId;
    private String image;
    private String slug;
}
