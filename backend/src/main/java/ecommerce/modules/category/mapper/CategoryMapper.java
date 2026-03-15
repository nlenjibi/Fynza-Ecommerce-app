package ecommerce.modules.category.mapper;

import ecommerce.modules.category.dto.CategoryCreateRequest;
import ecommerce.modules.category.dto.CategoryRequest;
import ecommerce.modules.category.dto.CategoryResponse;
import ecommerce.modules.category.dto.CategoryUpdateRequest;
import ecommerce.modules.category.entity.Category;
import org.mapstruct.*;

import java.util.UUID;

@Mapper(componentModel = "spring", builder = @Builder(disableBuilder = false))
public interface CategoryMapper {

    /**
     * Convert create request to entity
     */
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "slug", ignore = true)
    @Mapping(target = "isActive", constant = "true")
    @Mapping(target = "featured", expression = "java(request.getFeatured() != null ? request.getFeatured() : false)")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "parentCategory", expression = "java(mapParentCategory(request.getParentCategoryId()))")
    Category toEntity(CategoryCreateRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "slug", ignore = true)
    @Mapping(target = "isActive", constant = "true")
    @Mapping(target = "featured", constant = "false")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "parentCategory", expression = "java(mapParentCategory(request.getParentCategoryId()))")
    Category toEntityFromRequest(CategoryRequest request);

    /**
     * Convert entity to response
     */
    @Mapping(target = "parentCategoryId", source = "parentCategory.id")
    CategoryResponse toSimpleResponse(Category category);

    /**
     * Update entity from request (partial update)
     */
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "slug", ignore = true)
    @Mapping(target = "isActive", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "parentCategory", expression = "java(mapParentCategory(request.getParentCategoryId()))")
    void updateEntityFromRequest(CategoryRequest request, @MappingTarget Category category);

    default Category mapParentCategory(UUID parentId) {
        if (parentId == null) {
            return null;
        }
        return Category.builder().id(parentId).build();
    }
}
