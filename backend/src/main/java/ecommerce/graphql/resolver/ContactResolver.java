package ecommerce.graphql.resolver;

import ecommerce.graphql.dto.ContactMessageConnection;
import ecommerce.graphql.input.ContactFilterInput;
import ecommerce.graphql.input.ContactMessageInput;
import ecommerce.graphql.input.ContactResponseInput;
import ecommerce.graphql.input.PageInput;
import ecommerce.modules.contact.dto.ContactMessageRequest;
import ecommerce.modules.contact.dto.ContactMessageResponse;
import ecommerce.modules.contact.dto.ContactResponseRequest;
import ecommerce.modules.contact.dto.ContactStats;
import ecommerce.modules.contact.entity.ContactMessage.ContactStatus;
import ecommerce.modules.contact.service.ContactService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ContactResolver {

    private final ContactService contactService;

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ContactMessageConnection contactMessages(
            @Argument ContactFilterInput filter,
            @Argument PageInput pagination) {
        log.info("GraphQL Query: contactMessages with filter: {}", filter);
        
        ContactStatus status = filter != null ? (ContactStatus) filter.getStatus() : null;
        Pageable pageable = createPageable(pagination);
        
        Page<ContactMessageResponse> messagesPage = contactService.getAllMessages(status, pageable);
        
        return ContactMessageConnection.builder()
                .content(messagesPage.getContent())
                .pageInfo(ecommerce.common.response.PaginatedResponse.from(messagesPage))
                .build();
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ContactMessageResponse contactMessage(@Argument UUID id) {
        log.info("GraphQL Query: contactMessage(id: {})", id);
        return contactService.getMessageById(id);
    }

    @QueryMapping
    public ContactStatus contactMessageStatus(@Argument UUID id) {
        log.info("GraphQL Query: contactMessageStatus(id: {})", id);
        ContactMessageResponse message = contactService.getMessageById(id);
        return message.getStatus();
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ContactStats contactMessageStats() {
        log.info("GraphQL Query: contactMessageStats");
        return contactService.getMessageStats();
    }

    @MutationMapping
    public ContactMessageResponse submitContactMessage(@Argument ContactMessageInput input) {
        log.info("GraphQL Mutation: submitContactMessage from: {}", input.getEmail());
        
        ContactMessageRequest request = ContactMessageRequest.builder()
                .name(input.getName())
                .email(input.getEmail())
                .phone(input.getPhone())
                .subject(input.getSubject())
                .message(input.getMessage())
                .build();
        
        return contactService.submitMessage(request);
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ContactMessageResponse updateContactStatus(
            @Argument UUID id,
            @Argument ContactStatus status) {
        log.info("GraphQL Mutation: updateContactStatus(id: {}, status: {})", id, status);
        return contactService.updateMessageStatus(id, status);
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ContactMessageResponse assignContact(
            @Argument UUID id,
            @Argument UUID assignedToId) {
        log.info("GraphQL Mutation: assignContact(id: {}, assignedToId: {})", id, assignedToId);
        return contactService.getMessageById(id);
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ContactMessageResponse respondToContact(
            @Argument UUID id,
            @Argument ContactResponseInput input) {
        log.info("GraphQL Mutation: respondToContact(id: {})", id);
        
        ContactResponseRequest request = ContactResponseRequest.builder()
                .adminResponse(input.getResponse())
                .build();
        
        return contactService.respondToMessage(id, request);
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public boolean deleteContactMessage(@Argument UUID id) {
        log.info("GraphQL Mutation: deleteContactMessage(id: {})", id);
        contactService.deleteMessage(id);
        return true;
    }

    private Pageable createPageable(PageInput input) {
        if (input == null) {
            return PageRequest.of(0, 20, Sort.by(Sort.Direction.DESC, "createdAt"));
        }
        Sort.Direction direction = "DESC".equalsIgnoreCase(input.getDirection()) 
            ? Sort.Direction.DESC : Sort.Direction.ASC;
        String sortBy = input.getSortBy() != null ? input.getSortBy() : "createdAt";
        return PageRequest.of(input.getPage(), input.getSize(), Sort.by(direction, sortBy));
    }
}
