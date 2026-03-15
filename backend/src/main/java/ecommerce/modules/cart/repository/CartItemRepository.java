package ecommerce.modules.cart.repository;

import ecommerce.modules.cart.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, UUID> {
    List<CartItem> findByCartId(UUID cartId);
    void deleteByCartId(UUID cartId);
    Optional<CartItem> findByCartIdAndId(UUID cartId, UUID cartItemId);
    Optional<CartItem> findByCartIdAndProductId(UUID cartId, Long productId);
}
