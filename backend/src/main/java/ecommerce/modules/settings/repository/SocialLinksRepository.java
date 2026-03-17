package ecommerce.modules.settings.repository;

import ecommerce.modules.settings.entity.SocialLinks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface SocialLinksRepository extends JpaRepository<SocialLinks, UUID> {
}
