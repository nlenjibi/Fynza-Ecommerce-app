package ecommerce.modules.contact.repository;

import ecommerce.modules.contact.entity.ContactMessage;
import ecommerce.modules.contact.entity.ContactMessage.ContactStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * Repository interface for ContactMessage entity.
 * Provides CRUD operations and custom queries for contact message management.
 */
@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, UUID> {

    /**
     * Find contact messages by status with pagination.
     *
     * @param status   the contact status to filter by
     * @param pageable pagination information
     * @return page of contact messages
     */
    Page<ContactMessage> findByStatus(ContactStatus status, Pageable pageable);

    /**
     * Find contact messages by email containing search term.
     *
     * @param email    the email search term
     * @param pageable pagination information
     * @return page of contact messages
     */
    Page<ContactMessage> findByEmailContainingIgnoreCase(String email, Pageable pageable);

    /**
     * Find contact messages by name containing search term.
     *
     * @param name     the name search term
     * @param pageable pagination information
     * @return page of contact messages
     */
    Page<ContactMessage> findByNameContainingIgnoreCase(String name, Pageable pageable);

    /**
     * Search contact messages by email or name.
     *
     * @param searchTerm the search term
     * @param pageable   pagination information
     * @return page of contact messages
     */
    @Query("SELECT c FROM ContactMessage c WHERE " +
           "LOWER(c.email) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(c.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(c.subject) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    Page<ContactMessage> searchMessages(@Param("searchTerm") String searchTerm, Pageable pageable);

    /**
     * Count messages by status.
     *
     * @param status the contact status
     * @return count of messages
     */
    long countByStatus(ContactStatus status);
}
