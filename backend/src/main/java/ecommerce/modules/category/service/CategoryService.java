package ecommerce.modules.category.service;

import ecommerce.modules.category.dto.CategoryRequest;
import ecommerce.modules.category.dto.CategoryResponse;
import ecommerce.modules.category.entity.Category;

import java.util.List;
import java.util.UUID;

public interface CategoryService {

    List<CategoryResponse> findAll();

    CategoryResponse findById(UUID id);

    List<CategoryResponse> findTree();

    CategoryResponse create(CategoryRequest request);

    CategoryResponse update(UUID id, CategoryRequest request);

    void delete(UUID id);
}
