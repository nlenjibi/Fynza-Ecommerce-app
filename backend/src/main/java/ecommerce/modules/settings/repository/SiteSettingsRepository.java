package ecommerce.modules.settings.repository;

import ecommerce.modules.settings.entity.SiteSettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface SiteSettingsRepository extends JpaRepository<SiteSettings, UUID> {
}
