package ecommerce.modules.cart.service.impl;

import ecommerce.exception.InsufficientStockException;
import ecommerce.exception.ResourceNotFoundException;
import ecommerce.modules.cart.dto.AddToCartRequest;
import ecommerce.modules.cart.dto.CartItemResponse;
import ecommerce.modules.cart.dto.CartResponse;
import ecommerce.modules.cart.entity.Cart;
import ecommerce.modules.cart.entity.CartItem;
import ecommerce.modules.cart.entity.StockReservation;
import ecommerce.modules.cart.repository.CartItemRepository;
import ecommerce.modules.cart.repository.CartRepository;
import ecommerce.modules.cart.repository.StockReservationRepository;
import ecommerce.modules.cart.service.CartService;
import ecommerce.modules.coupon.entity.Coupon;
import ecommerce.modules.coupon.repository.CouponRepository;
import ecommerce.modules.product.entity.Product;
import ecommerce.modules.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class CartServiceImpl implements CartService {

    private static final int RESERVATION_MINUTES = 15;

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final StockReservationRepository stockReservationRepository;
    private final CouponRepository couponRepository;

    @Override
    @Transactional(readOnly = true)
    public CartResponse getCart(UUID userId) {
        log.info("Fetching cart for user: {}", userId);
        Cart cart = getOrCreateCart(userId);
        return mapToCartResponse(cart);
    }

    @Override
    @Transactional
    public CartItemResponse addItem(UUID userId, AddToCartRequest request) {
        log.info("Adding item to cart for user: {}, product: {}, quantity: {}", 
                userId, request.getProductId(), request.getQuantity());
        
        Cart cart = getOrCreateCart(userId);
        
        var product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> ResourceNotFoundException.forResource("Product", request.getProductId()));
        
        int quantity = request.getQuantity() != null ? request.getQuantity() : 1;
        
        int availableStock = product.getStockQuantity() - product.getReservedQuantity();
        if (availableStock < quantity) {
            throw new InsufficientStockException(product.getName(), availableStock, quantity);
        }
        
        CartItem cartItem = cartItemRepository.findByCartIdAndProductId(cart.getId(), request.getProductId())
                .orElse(null);
        
        if (cartItem != null) {
            int newQuantity = cartItem.getQuantity() + quantity;
            int newAvailableStock = product.getStockQuantity() - product.getReservedQuantity();
            if (newAvailableStock < newQuantity) {
                throw new InsufficientStockException(product.getName(), newAvailableStock, newQuantity);
            }
            cartItem.setQuantity(newQuantity);
            cartItem.setPrice(product.getDiscountPrice() != null ? product.getDiscountPrice() : product.getPrice());
            cartItem = cartItemRepository.save(cartItem);
        } else {
            cartItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(quantity)
                    .price(product.getDiscountPrice() != null ? product.getDiscountPrice() : product.getPrice())
                    .build();
            cartItem = cartItemRepository.save(cartItem);
        }
        
        createStockReservation(cartItem, product, quantity);
        
        return mapToCartItemResponse(cartItem);
    }

    @Override
    @Transactional
    public CartItemResponse updateItemQuantity(UUID userId, UUID cartItemId, int quantity) {
        log.info("Updating cart item quantity for user: {}, cartItem: {}, quantity: {}", 
                userId, cartItemId, quantity);
        
        Cart cart = getOrCreateCart(userId);
        
        CartItem cartItem = cartItemRepository.findByCartIdAndId(cart.getId(), cartItemId)
                .orElseThrow(() -> ResourceNotFoundException.forResource("Cart item", cartItemId));
        
        var product = cartItem.getProduct();
        int availableStock = product.getStockQuantity() - product.getReservedQuantity();
        
        int existingReserved = 0;
        StockReservation reservation = stockReservationRepository.findByCartItemId(cartItemId).orElse(null);
        if (reservation != null) {
            existingReserved = reservation.getQuantity();
        }
        
        int netAvailable = availableStock + existingReserved;
        if (netAvailable < quantity) {
            throw new InsufficientStockException(product.getName(), netAvailable, quantity);
        }
        
        cartItem.setQuantity(quantity);
        cartItem = cartItemRepository.save(cartItem);
        
        if (reservation != null) {
            reservation.setQuantity(quantity);
            reservation.setExpiresAt(LocalDateTime.now().plusMinutes(RESERVATION_MINUTES));
            stockReservationRepository.save(reservation);
        }
        
        return mapToCartItemResponse(cartItem);
    }

    @Override
    @Transactional
    public void removeItem(UUID userId, UUID cartItemId) {
        log.info("Removing item from cart for user: {}, cartItem: {}", userId, cartItemId);
        
        Cart cart = getOrCreateCart(userId);
        
        CartItem cartItem = cartItemRepository.findByCartIdAndId(cart.getId(), cartItemId)
                .orElseThrow(() -> ResourceNotFoundException.forResource("Cart item", cartItemId));
        
        stockReservationRepository.findByCartItemId(cartItemId)
                .ifPresent(reservation -> {
                    stockReservationRepository.delete(reservation);
                    releaseStockReservation(cartItem.getProduct(), reservation.getQuantity());
                });
        
        cartItemRepository.delete(cartItem);
    }

    @Override
    @Transactional
    public CartResponse applyCoupon(UUID userId, String couponCode) {
        log.info("Applying coupon for user: {}, coupon: {}", userId, couponCode);
        
        Cart cart = getOrCreateCart(userId);
        
        Coupon coupon = couponRepository.findByCode(couponCode)
                .orElseThrow(() -> ResourceNotFoundException.forResource("Coupon", couponCode));
        
        validateCoupon(coupon, cart);
        
        cart.setCouponCode(couponCode);
        cartRepository.save(cart);
        
        return mapToCartResponse(cart);
    }

    @Override
    @Transactional
    public void clearCart(UUID userId) {
        log.info("Clearing cart for user: {}", userId);
        
        Cart cart = getOrCreateCart(userId);
        
        var cartItems = cartItemRepository.findByCartId(cart.getId());
        
        for (CartItem item : cartItems) {
            stockReservationRepository.findByCartItemId(item.getId())
                    .ifPresent(reservation -> {
                        stockReservationRepository.delete(reservation);
                        releaseStockReservation(item.getProduct(), reservation.getQuantity());
                    });
        }
        
        cartItemRepository.deleteByCartId(cart.getId());
        
        cart.setCouponCode(null);
        cartRepository.save(cart);
    }

    private Cart getOrCreateCart(UUID userId) {
        return cartRepository.findByUserIdWithItems(userId)
                .orElseGet(() -> {
                    Cart newCart = Cart.builder()
                            .userId(userId)
                            .build();
                    return cartRepository.save(newCart);
                });
    }

    private void createStockReservation(CartItem cartItem, Product product, int quantity) {
        StockReservation reservation = StockReservation.builder()
                .cartItem(cartItem)
                .product(product)
                .quantity(quantity)
                .expiresAt(LocalDateTime.now().plusMinutes(RESERVATION_MINUTES))
                .build();
        stockReservationRepository.save(reservation);
        
        productRepository.reserveStockAndIsActiveTrue(product.getId(), quantity);
    }

    private void releaseStockReservation(Product product, int quantity) {
        productRepository.releaseReservedStockAndIsActiveTrue(product.getId(), quantity);
    }

    private void validateCoupon(Coupon coupon, Cart cart) {
        if (coupon.getStatus() != ecommerce.common.enums.CouponStatus.ACTIVE) {
            throw new IllegalStateException("Coupon is not active");
        }
        
        LocalDateTime now = LocalDateTime.now();
        if (now.isBefore(coupon.getValidFrom()) || now.isAfter(coupon.getValidUntil())) {
            throw new IllegalStateException("Coupon is expired or not yet valid");
        }
        
        if (coupon.getMaxUses() != null && coupon.getUsageCount() >= coupon.getMaxUses()) {
            throw new IllegalStateException("Coupon usage limit reached");
        }
        
        BigDecimal subtotal = calculateSubtotal(cart);
        if (coupon.getMinOrderAmount() != null && subtotal.compareTo(coupon.getMinOrderAmount()) < 0) {
            throw new IllegalStateException("Minimum order amount not met");
        }
    }

    private CartResponse mapToCartResponse(Cart cart) {
        var cartItems = cartItemRepository.findByCartId(cart.getId());
        
        BigDecimal subtotal = calculateSubtotal(cart);
        BigDecimal discount = BigDecimal.ZERO;
        
        if (cart.getCouponCode() != null) {
            couponRepository.findByCode(cart.getCouponCode()).ifPresent(coupon -> {
                if (coupon.getDiscountType() == ecommerce.common.enums.DiscountType.PERCENTAGE) {
                    discount = subtotal.multiply(coupon.getDiscountValue()).divide(BigDecimal.valueOf(100));
                } else {
                    discount = coupon.getDiscountValue();
                }
            });
        }
        
        BigDecimal tax = subtotal.subtract(discount).multiply(BigDecimal.valueOf(0.1));
        BigDecimal shippingCost = subtotal.compareTo(BigDecimal.valueOf(50)) >= 0 ? BigDecimal.ZERO : BigDecimal.valueOf(5.99);
        BigDecimal total = subtotal.subtract(discount).add(tax).add(shippingCost);
        
        var itemResponses = new ArrayList<CartItemResponse>();
        for (CartItem item : cartItems) {
            itemResponses.add(mapToCartItemResponse(item));
        }
        
        return CartResponse.builder()
                .id(cart.getId())
                .userId(cart.getUserId())
                .items(itemResponses)
                .subtotal(subtotal)
                .tax(tax)
                .shippingCost(shippingCost)
                .discount(discount)
                .total(total)
                .itemsCount(itemResponses.size())
                .couponCode(cart.getCouponCode())
                .build();
    }

    private BigDecimal calculateSubtotal(Cart cart) {
        var cartItems = cartItemRepository.findByCartId(cart.getId());
        BigDecimal subtotal = BigDecimal.ZERO;
        for (CartItem item : cartItems) {
            subtotal = subtotal.add(item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
        }
        return subtotal;
    }

    private CartItemResponse mapToCartItemResponse(CartItem cartItem) {
        StockReservation reservation = stockReservationRepository.findByCartItemId(cartItem.getId()).orElse(null);
        
        return CartItemResponse.builder()
                .id(cartItem.getId())
                .productId(cartItem.getProduct().getId())
                .productName(cartItem.getProduct().getName())
                .price(cartItem.getPrice())
                .quantity(cartItem.getQuantity())
                .subtotal(cartItem.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())))
                .reserved(reservation != null && !reservation.isExpired())
                .reservationExpiresAt(reservation != null ? reservation.getExpiresAt() : null)
                .build();
    }
}
