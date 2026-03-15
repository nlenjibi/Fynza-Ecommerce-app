package ecommerce.modules.review.mapper;

import ecommerce.modules.review.dto.ReviewCreateRequest;
import ecommerce.modules.review.dto.ReviewResponse;
import ecommerce.modules.review.dto.ReviewUpdateRequest;
import ecommerce.modules.review.entity.Review;
import org.mapstruct.*;

import java.time.LocalDateTime;
import java.util.List;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface ReviewMapper {

    @Mapping(target = "productId", source = "product.id")
    @Mapping(target = "productName", source = "product.name")
    @Mapping(target = "productSlug", source = "product.slug")
    @Mapping(target = "user.id", source = "customer.id")
    @Mapping(target = "user.firstName", source = "customer.firstName")
    @Mapping(target = "user.lastName", source = "customer.lastName")
    @Mapping(target = "user.email", source = "customer.email")
    @Mapping(target = "comment", source = "text")
    @Mapping(target = "helpfulCount", source = "helpful")
    @Mapping(target = "notHelpfulCount", source = "unhelpful")
    ReviewResponse toDto(Review review);

    List<ReviewResponse> toDtoList(List<Review> reviews);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "product", ignore = true)
    @Mapping(target = "customer", ignore = true)
    @Mapping(target = "verifiedPurchase", constant = "false")
    @Mapping(target = "approved", constant = "false")
    @Mapping(target = "helpful", constant = "0")
    @Mapping(target = "unhelpful", constant = "0")
    @Mapping(target = "deleted", constant = "false")
    @Mapping(target = "adminResponse", ignore = true)
    @Mapping(target = "adminResponseAt", ignore = true)
    @Mapping(target = "rejectionReason", ignore = true)
    @Mapping(target = "deletedAt", ignore = true)
    @Mapping(target = "text", source = "comment")
    Review toEntity(ReviewCreateRequest request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "product", ignore = true)
    @Mapping(target = "customer", ignore = true)
    @Mapping(target = "text", source = "comment")
    void updateFromDto(ReviewUpdateRequest request, @MappingTarget Review review);
}
