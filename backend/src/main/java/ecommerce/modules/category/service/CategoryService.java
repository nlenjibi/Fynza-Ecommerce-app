package ecommerce.modules.category.service;

import ecommerce.modules.category.dto.CategoryRequest;
import ecommerce.modules.category.dto.CategoryResponse;
import ecommerce.modules.category.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface CategoryService {

    List<CategoryResponse> findAll();

    CategoryResponse findById(UUID id);

    List<CategoryResponse> findTree();

    CategoryResponse create(CategoryRequest request);

    CategoryResponse update(UUID id, CategoryRequest request);

    void delete(UUID id);

    // GraphQL resolver methods
    CategoryResponse mapToResponse(Category category);

    Page<CategoryResponse> getAllCategories(Pageable pageable);

    CategoryResponse getCategoryById(UUID id);

    CategoryResponse createCategory(ecommerce.modules.category.dto.CategoryCreateRequest request);
}
