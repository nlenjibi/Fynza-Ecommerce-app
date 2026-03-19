package ecommerce.modules.contact.service;

import ecommerce.exception.ResourceNotFoundException;
import ecommerce.modules.contact.dto.ContactMessageRequest;
import ecommerce.modules.contact.dto.ContactMessageResponse;
import ecommerce.modules.contact.dto.ContactResponseRequest;
import ecommerce.modules.contact.entity.ContactMessage;
import ecommerce.modules.contact.entity.ContactMessage.ContactStatus;
import ecommerce.modules.contact.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;

    @Transactional
    public ContactMessageResponse createMessage(ContactMessageRequest request) {
        log.info("Creating new contact message from: {}", request.getEmail());

        ContactMessage message = ContactMessage.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .subject(request.getSubject())
                .message(request.getMessage())
                .status(ContactStatus.PENDING)
                .build();

        ContactMessage savedMessage = contactMessageRepository.save(message);
        log.info("Contact message created with ID: {}", savedMessage.getId());

        return ContactMessageResponse.from(savedMessage);
    }

    @Transactional(readOnly = true)
    public Page<ContactMessageResponse> getAllMessages(ContactStatus status, Pageable pageable) {
        log.debug("Fetching contact messages with status: {}", status);

        if (status != null) {
            return contactMessageRepository.findByStatus(status, pageable)
                    .map(ContactMessageResponse::from);
        }
        return contactMessageRepository.findAll(pageable)
                .map(ContactMessageResponse::from);
    }

    @Transactional(readOnly = true)
    public ContactMessageResponse getMessageById(UUID id) {
        log.debug("Fetching contact message with ID: {}", id);

        ContactMessage message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact message not found with ID: " + id));

        return ContactMessageResponse.from(message);
    }

    @Transactional
    public ContactMessageResponse respondToMessage(UUID id, ContactResponseRequest request) {
        log.info("Admin responding to contact message ID: {}", id);

        ContactMessage message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact message not found with ID: " + id));

        message.setAdminResponse(request.getAdminResponse());
        message.setRespondedAt(LocalDateTime.now());
        message.setRespondedBy(request.getAdminId());
        message.setStatus(ContactStatus.RESOLVED);

        ContactMessage updatedMessage = contactMessageRepository.save(message);
        log.info("Contact message {} responded by admin {}", id, request.getAdminId());

        return ContactMessageResponse.from(updatedMessage);
    }

    @Transactional
    public ContactMessageResponse updateMessageStatus(UUID id, ContactStatus status) {
        log.info("Updating contact message {} status to: {}", id, status);

        ContactMessage message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact message not found with ID: " + id));

        message.setStatus(status);
        ContactMessage updatedMessage = contactMessageRepository.save(message);

        return ContactMessageResponse.from(updatedMessage);
    }

    @Transactional
    public void deleteMessage(UUID id) {
        log.info("Deleting contact message with ID: {}", id);

        ContactMessage message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact message not found with ID: " + id));

        message.setIsActive(false);
        contactMessageRepository.save(message);
        log.info("Contact message {} soft deleted", id);
    }

    @Transactional(readOnly = true)
    public Page<ContactMessageResponse> searchMessages(String searchTerm, Pageable pageable) {
        log.debug("Searching contact messages with term: {}", searchTerm);

        return contactMessageRepository.searchMessages(searchTerm, pageable)
                .map(ContactMessageResponse::from);
    }

    @Transactional(readOnly = true)
    public long countMessagesByStatus(ContactStatus status) {
        return contactMessageRepository.countByStatus(status);
    }

    @Transactional
    public ContactMessageResponse submitMessage(ContactMessageRequest request) {
        return createMessage(request);
    }
}
