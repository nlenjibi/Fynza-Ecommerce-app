package ecommerce.modules.cart.service;

import ecommerce.modules.cart.dto.AddToCartRequest;
import ecommerce.modules.cart.dto.CartItemResponse;
import ecommerce.modules.cart.dto.CartResponse;

import java.util.UUID;

public interface CartService {
    CartResponse getCart(UUID userId);
    CartItemResponse addItem(UUID userId, AddToCartRequest request);
    CartItemResponse updateItemQuantity(UUID userId, UUID cartItemId, int quantity);
    void removeItem(UUID userId, UUID cartItemId);
    CartResponse applyCoupon(UUID userId, String couponCode);
    void clearCart(UUID userId);
}
