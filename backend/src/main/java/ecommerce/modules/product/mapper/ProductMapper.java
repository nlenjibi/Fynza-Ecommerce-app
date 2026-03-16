package ecommerce.modules.product.mapper;

import ecommerce.modules.product.dto.CreateProductRequest;
import ecommerce.modules.product.dto.ProductResponse;
import ecommerce.modules.product.dto.UpdateProductRequest;
import ecommerce.modules.product.entity.Product;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProductMapper {

    ProductResponse toResponse(Product product);

    List<ProductResponse> toResponseList(List<Product> products);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "slug", ignore = true)
    @Mapping(target = "status", constant = "DRAFT")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "seller", ignore = true)
    @Mapping(target = "category", ignore = true)
    @Mapping(target = "brand", source = "brand")
    Product toEntity(CreateProductRequest request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "slug", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "seller", ignore = true)
    @Mapping(target = "category", ignore = true)
    @Mapping(target = "brand", source = "brand")
    void updateEntityFromRequest(UpdateProductRequest request, @MappingTarget Product product);

    default List<String> mapImagesToUrls(List<ecommerce.modules.product.entity.ProductImage> images) {
        if (images == null) return null;
        return images.stream().map(ecommerce.modules.product.entity.ProductImage::getUrl).toList();
    }

    default List<ecommerce.modules.product.entity.ProductImage> mapUrlsToImages(List<String> urls) {
        if (urls == null) return null;
        return urls.stream().map(url -> ecommerce.modules.product.entity.ProductImage.builder().url(url).build()).toList();
    }
}
