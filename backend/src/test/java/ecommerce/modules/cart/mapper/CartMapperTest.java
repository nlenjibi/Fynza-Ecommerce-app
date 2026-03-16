package ecommerce.modules.cart.mapper;

import ecommerce.modules.cart.dto.CartItemResponse;
import ecommerce.modules.cart.dto.CartResponse;
import ecommerce.modules.cart.entity.Cart;
import ecommerce.modules.cart.entity.CartItem;
import ecommerce.modules.product.entity.Product;
import ecommerce.modules.product.entity.ProductVariant;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

public class CartMapperTest {

    private CartMapper cartMapper;

    @BeforeEach
    public void setUp() {
        cartMapper = Mappers.getMapper(CartMapper.class);
    }

    @Test
    public void testToDto() {
        // Given
        UUID cartId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();
        
        Product product = Product.builder()
                .id(UUID.randomUUID())
                .name("Test Product")
                .imageUrl("https://example.com/product.jpg")
                .build();
        
        ProductVariant variant = ProductVariant.builder()
                .id(UUID.randomUUID())
                .size("M")
                .color("Blue")
                .build();
        
        CartItem cartItem = CartItem.builder()
                .id(UUID.randomUUID())
                .product(product)
                .variant(variant)
                .quantity(2)
                .price(new BigDecimal("29.99"))
                .build();
        
        List<CartItem> items = new ArrayList<>();
        items.add(cartItem);
        
        Cart cart = Cart.builder()
                .id(cartId)
                .userId(userId)
                .couponCode("SAVE10")
                .items(items)
                .build();

        // When
        CartResponse response = cartMapper.toDto(cart);

        // Then
        assertNotNull(response);
        assertEquals(cartId, response.getId());
        assertEquals(userId, response.getUserId());
        assertEquals("SAVE10", response.getCouponCode());
        assertEquals(1, response.getItemsCount());
        assertEquals(1, response.getItems().size());
    }

    @Test
    public void testToDto_NullItems() {
        // Given
        UUID cartId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();
        
        Cart cart = Cart.builder()
                .id(cartId)
                .userId(userId)
                .items(null)
                .build();

        // When
        CartResponse response = cartMapper.toDto(cart);

        // Then
        assertNotNull(response);
        assertEquals(0, response.getItemsCount());
    }

    @Test
    public void testToDto_EmptyItems() {
        // Given
        UUID cartId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();
        
        Cart cart = Cart.builder()
                .id(cartId)
                .userId(userId)
                .items(new ArrayList<>())
                .build();

        // When
        CartResponse response = cartMapper.toDto(cart);

        // Then
        assertNotNull(response);
        assertEquals(0, response.getItemsCount());
    }

    @Test
    public void testToCartItemDto() {
        // Given
        Product product = Product.builder()
                .id(UUID.randomUUID())
                .name("Test Product")
                .imageUrl("https://example.com/product.jpg")
                .build();
        
        ProductVariant variant = ProductVariant.builder()
                .id(UUID.randomUUID())
                .size("L")
                .color("Red")
                .build();
        
        CartItem cartItem = CartItem.builder()
                .id(UUID.randomUUID())
                .product(product)
                .variant(variant)
                .quantity(3)
                .price(new BigDecimal("49.99"))
                .build();

        // When
        CartItemResponse response = cartMapper.toDto(cartItem);

        // Then
        assertNotNull(response);
        assertEquals(product.getId(), response.getProductId());
        assertEquals("Test Product", response.getProductName());
        assertEquals(variant.getId(), response.getVariantId());
        assertEquals("L", response.getSize());
        assertEquals("Red", response.getColor());
        assertEquals("https://example.com/product.jpg", response.getImage());
        assertEquals(3, response.getQuantity());
        assertEquals(new BigDecimal("149.97"), response.getSubtotal());
    }

    @Test
    public void testToCartItemDto_NullProduct() {
        // Given
        CartItem cartItem = CartItem.builder()
                .id(UUID.randomUUID())
                .product(null)
                .quantity(1)
                .price(new BigDecimal("10.00"))
                .build();

        // When
        CartItemResponse response = cartMapper.toDto(cartItem);

        // Then
        assertNotNull(response);
        assertNull(response.getProductId());
        assertNull(response.getProductName());
    }

    @Test
    public void testToDtoList() {
        // Given
        Cart cart1 = Cart.builder()
                .id(UUID.randomUUID())
                .userId(UUID.randomUUID())
                .items(new ArrayList<>())
                .build();
        
        Cart cart2 = Cart.builder()
                .id(UUID.randomUUID())
                .userId(UUID.randomUUID())
                .items(new ArrayList<>())
                .build();
        
        List<Cart> carts = List.of(cart1, cart2);

        // When
        List<CartResponse> responses = cartMapper.toDtoList(carts);

        // Then
        assertNotNull(responses);
        assertEquals(2, responses.size());
    }

    @Test
    public void testToCartItemDtoList() {
        // Given
        CartItem item1 = CartItem.builder()
                .id(UUID.randomUUID())
                .product(Product.builder().id(UUID.randomUUID()).name("Product 1").build())
                .quantity(1)
                .price(new BigDecimal("10.00"))
                .build();
        
        CartItem item2 = CartItem.builder()
                .id(UUID.randomUUID())
                .product(Product.builder().id(UUID.randomUUID()).name("Product 2").build())
                .quantity(2)
                .price(new BigDecimal("20.00"))
                .build();
        
        List<CartItem> items = List.of(item1, item2);

        // When
        List<CartItemResponse> responses = cartMapper.toCartItemDtoList(items);

        // Then
        assertNotNull(responses);
        assertEquals(2, responses.size());
    }
}
