package ecommerce.graphql.resolver;

import ecommerce.graphql.input.AddItemToCartInput;
import ecommerce.graphql.input.ApplyCouponInput;
import ecommerce.graphql.input.UpdateCartItemInput;
import ecommerce.modules.cart.dto.AddToCartRequest;
import ecommerce.modules.cart.dto.CartItemResponse;
import ecommerce.modules.cart.dto.CartResponse;
import ecommerce.modules.cart.service.CartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.ContextValue;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
@RequiredArgsConstructor
@Slf4j
public class CartResolver {

    private final CartService cartService;

    @QueryMapping
    public CartResponse cart(@Argument UUID id, @ContextValue UUID userId) {
        log.info("GraphQL Query: cart(id: {})", id);
        return cartService.getCartById(id, userId);
    }

    @MutationMapping
    public CartResponse createCart(@ContextValue UUID userId) {
        log.info("GraphQL Mutation: createCart");
        return cartService.createCart(userId);
    }

    @MutationMapping
    public CartItemResponse addItemToCart(
            @Argument UUID cartId,
            @Argument AddItemToCartInput input,
            @ContextValue UUID userId) {
        log.info("GraphQL Mutation: addItemToCart(cartId: {}, productId: {}, quantity: {})", 
                cartId, input.getProductId(), input.getQuantity());
        AddToCartRequest request = AddToCartRequest.builder()
                .productId(input.getProductId())
                .variantId(input.getVariantId())
                .quantity(input.getQuantity())
                .build();
        return cartService.addItem(userId, request);
    }

    @MutationMapping
    public CartItemResponse updateCartItem(
            @Argument UUID cartId,
            @Argument UUID productId,
            @Argument UpdateCartItemInput input,
            @ContextValue UUID userId) {
        log.info("GraphQL Mutation: updateCartItem(cartId: {}, productId: {}, quantity: {})", 
                cartId, productId, input.getQuantity());
        return cartService.updateItemByProductId(userId, productId, input.getQuantity());
    }

    @MutationMapping
    public Boolean removeCartItem(
            @Argument UUID cartId,
            @Argument UUID productId,
            @ContextValue UUID userId) {
        log.info("GraphQL Mutation: removeCartItem(cartId: {}, productId: {})", cartId, productId);
        cartService.removeItemByProductId(userId, productId);
        return true;
    }

    @MutationMapping
    public Boolean clearCart(@Argument UUID cartId, @ContextValue UUID userId) {
        log.info("GraphQL Mutation: clearCart(cartId: {})", cartId);
        cartService.clearCart(userId);
        return true;
    }

    @MutationMapping
    public CartResponse applyCouponToCart(
            @Argument UUID cartId,
            @Argument ApplyCouponInput input,
            @ContextValue UUID userId) {
        log.info("GraphQL Mutation: applyCouponToCart(cartId: {}, coupon: {})", cartId, input.getCouponCode());
        return cartService.applyCoupon(userId, input.getCouponCode());
    }

    @MutationMapping
    public CartResponse mergeCart(
            @Argument UUID guestCartId,
            @ContextValue UUID userId) {
        log.info("GraphQL Mutation: mergeCart(guestCartId: {})", guestCartId);
        return cartService.mergeCart(userId, guestCartId);
    }
}
