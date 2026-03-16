package ecommerce.modules.cart.mapper;

import ecommerce.modules.cart.dto.CartItemResponse;
import ecommerce.modules.cart.dto.CartResponse;
import ecommerce.modules.cart.entity.Cart;
import ecommerce.modules.cart.entity.CartItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface CartMapper {

    @Mapping(target = "itemsCount", expression = "java(cart.getItems() != null ? cart.getItems().size() : 0)")
    @Mapping(target = "items", source = "items")
    CartResponse toDto(Cart cart);

    List<CartResponse> toDtoList(List<Cart> carts);

    @Mapping(target = "productId", source = "product.id")
    @Mapping(target = "productName", source = "product.name")
    @Mapping(target = "variantId", source = "variant.id")
    @Mapping(target = "size", source = "variant.size")
    @Mapping(target = "color", source = "variant.color")
    @Mapping(target = "image", expression = "java(cartItem.getProduct() != null ? cartItem.getProduct().getImageUrl() : null)")
    @Mapping(target = "subtotal", expression = "java(cartItem.getPrice().multiply(java.math.BigDecimal.valueOf(cartItem.getQuantity())))")
    CartItemResponse toDto(CartItem cartItem);

    List<CartItemResponse> toCartItemDtoList(List<CartItem> cartItems);
}
