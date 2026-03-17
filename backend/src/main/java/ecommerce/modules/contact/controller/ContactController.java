package ecommerce.modules.contact.controller;

import ecommerce.modules.contact.dto.ContactMessageRequest;
import ecommerce.modules.contact.dto.ContactMessageResponse;
import ecommerce.modules.contact.entity.ContactMessage;
import ecommerce.modules.contact.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<ContactMessageResponse> createMessage(@Valid @RequestBody ContactMessageRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(contactService.createMessage(request));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<ContactMessageResponse>> getAllMessages(
            @RequestParam(required = false) ContactMessage.ContactStatus status,
            Pageable pageable) {
        return ResponseEntity.ok(contactService.getAllMessages(status, pageable));
    }

    @PostMapping("/{id}/respond")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ContactMessageResponse> respondToMessage(
            @PathVariable UUID id,
            @RequestBody Map<String, String> payload) {
        String response = payload.get("response");
        String adminId = payload.get("adminId");
        return ResponseEntity.ok(contactService.respondToMessage(id.toString(), response, adminId));
    }
}
