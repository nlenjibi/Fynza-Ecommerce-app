package ecommerce.modules.category.mapper;

import ecommerce.modules.category.dto.CategoryCreateRequest;
import ecommerce.modules.category.dto.CategoryRequest;
import ecommerce.modules.category.dto.CategoryResponse;
import ecommerce.modules.category.entity.Category;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

public class CategoryMapperTest {

    private CategoryMapper categoryMapper;

    @BeforeEach
    public void setUp() {
        categoryMapper = Mappers.getMapper(CategoryMapper.class);
    }

    @Test
    public void testToEntityFromCreateRequest() {
        // Given
        UUID parentCategoryId = UUID.randomUUID();
        CategoryCreateRequest request = CategoryCreateRequest.builder()
                .name("Electronics")
                .description("Electronic devices and accessories")
                .imageUrl("https://example.com/electronics.jpg")
                .displayOrder(1)
                .featured(true)
                .parentCategoryId(parentCategoryId)
                .build();

        // When
        Category category = categoryMapper.toEntity(request);

        // Then
        assertNotNull(category);
        assertEquals("Electronics", category.getName());
        assertEquals("Electronic devices and accessories", category.getDescription());
        assertEquals("https://example.com/electronics.jpg", category.getImage());
        assertTrue(category.getFeatured());
        assertTrue(category.getIsActive());
        assertNotNull(category.getParentCategory());
        assertEquals(parentCategoryId, category.getParentCategory().getId());
    }

    @Test
    public void testToEntityFromCreateRequest_NullParentCategory() {
        // Given
        CategoryCreateRequest request = CategoryCreateRequest.builder()
                .name("Books")
                .description("Books and literature")
                .build();

        // When
        Category category = categoryMapper.toEntity(request);

        // Then
        assertNotNull(category);
        assertEquals("Books", category.getName());
        assertNull(category.getParentCategory());
    }

    @Test
    public void testToEntityFromRequest() {
        // Given
        UUID parentCategoryId = UUID.randomUUID();
        CategoryRequest request = CategoryRequest.builder()
                .name("Clothing")
                .description("Apparel and accessories")
                .parentCategoryId(parentCategoryId)
                .build();

        // When
        Category category = categoryMapper.toEntityFromRequest(request);

        // Then
        assertNotNull(category);
        assertEquals("Clothing", category.getName());
        assertTrue(category.getIsActive());
        assertFalse(category.getFeatured());
    }

    @Test
    public void testToSimpleResponse() {
        // Given
        UUID parentCategoryId = UUID.randomUUID();
        Category parentCategory = Category.builder()
                .id(parentCategoryId)
                .name("Parent Category")
                .build();

        Category category = Category.builder()
                .id(UUID.randomUUID())
                .name("Electronics")
                .description("Electronic devices")
                .slug("electronics")
                .image("https://example.com/electronics.jpg")
                .parentCategory(parentCategory)
                .featured(true)
                .isActive(true)
                .build();

        // When
        CategoryResponse response = categoryMapper.toSimpleResponse(category);

        // Then
        assertNotNull(response);
        assertEquals(category.getId(), response.getId());
        assertEquals("Electronics", response.getName());
        assertEquals("Electronic devices", response.getDescription());
        assertEquals("electronics", response.getSlug());
        assertEquals("https://example.com/electronics.jpg", response.getImage());
        assertEquals(parentCategoryId, response.getParentCategoryId());
    }

    @Test
    public void testToSimpleResponse_NullParentCategory() {
        // Given
        Category category = Category.builder()
                .id(UUID.randomUUID())
                .name("Root Category")
                .slug("root-category")
                .build();

        // When
        CategoryResponse response = categoryMapper.toSimpleResponse(category);

        // Then
        assertNotNull(response);
        assertEquals("Root Category", response.getName());
        assertNull(response.getParentCategoryId());
    }

    @Test
    public void testUpdateEntityFromRequest() {
        // Given
        UUID parentCategoryId = UUID.randomUUID();
        Category existingCategory = Category.builder()
                .id(UUID.randomUUID())
                .name("Old Name")
                .description("Old Description")
                .slug("old-slug")
                .isActive(true)
                .featured(false)
                .build();

        CategoryRequest request = CategoryRequest.builder()
                .name("Updated Name")
                .description("Updated Description")
                .parentCategoryId(parentCategoryId)
                .build();

        // When
        categoryMapper.updateEntityFromRequest(request, existingCategory);

        // Then
        assertEquals("Updated Name", existingCategory.getName());
        assertEquals("Updated Description", existingCategory.getDescription());
        assertNotNull(existingCategory.getParentCategory());
        assertEquals(parentCategoryId, existingCategory.getParentCategory().getId());
        // These should not change
        assertEquals("old-slug", existingCategory.getSlug());
        assertTrue(existingCategory.getIsActive());
    }

    @Test
    public void testMapParentCategory() {
        // Given
        UUID parentId = UUID.randomUUID();

        // When
        Category result = categoryMapper.mapParentCategory(parentId);

        // Then
        assertNotNull(result);
        assertEquals(parentId, result.getId());
    }

    @Test
    public void testMapParentCategory_Null() {
        // When
        Category result = categoryMapper.mapParentCategory(null);

        // Then
        assertNull(result);
    }
}
