package ecommerce.modules.contact.service;

import ecommerce.exception.ResourceNotFoundException;
import ecommerce.modules.contact.dto.ContactMessageRequest;
import ecommerce.modules.contact.dto.ContactMessageResponse;
import ecommerce.modules.contact.entity.ContactMessage;
import ecommerce.modules.contact.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;

    @Transactional
    public ContactMessageResponse createMessage(ContactMessageRequest request) {
        ContactMessage message = ContactMessage.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .subject(request.getSubject())
                .message(request.getMessage())
                .status(ContactMessage.ContactStatus.PENDING)
                .build();

        return ContactMessageResponse.from(contactMessageRepository.save(message));
    }

    @Transactional
    public Page<ContactMessageResponse> getAllMessages(ContactMessage.ContactStatus status, Pageable pageable) {
        if (status != null) {
            return contactMessageRepository.findByStatus(status, pageable)
                    .map(ContactMessageResponse::from);
        }
        return contactMessageRepository.findAll(pageable)
                .map(ContactMessageResponse::from);
    }

    @Transactional
    public ContactMessageResponse respondToMessage(String id, String response, String adminId) {
        ContactMessage message = contactMessageRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new ResourceNotFoundException("Message not found"));

        message.setAdminResponse(response);
        message.setRespondedAt(LocalDateTime.now());
        message.setRespondedBy(adminId);
        message.setStatus(ContactMessage.ContactStatus.RESOLVED);

        return ContactMessageResponse.from(contactMessageRepository.save(message));
    }
}
