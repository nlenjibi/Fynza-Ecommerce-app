package ecommerce.modules.contact.controller;

import ecommerce.common.response.ApiResponse;
import ecommerce.common.response.PaginatedResponse;
import ecommerce.modules.contact.dto.ContactMessageRequest;
import ecommerce.modules.contact.dto.ContactMessageResponse;
import ecommerce.modules.contact.dto.ContactResponseRequest;
import ecommerce.modules.contact.entity.ContactMessage.ContactStatus;
import ecommerce.modules.contact.service.ContactService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/contact")
@RequiredArgsConstructor
@Tag(name = "Contact Management", description = "APIs for managing contact messages")
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    @Operation(summary = "Submit contact message", description = "Submit a new contact message - public endpoint")
    public ResponseEntity<ApiResponse<ContactMessageResponse>> submitMessage(
            @Valid @RequestBody ContactMessageRequest request) {
        ContactMessageResponse response = contactService.createMessage(request);
        return ResponseEntity.ok(ApiResponse.success("Message submitted successfully. We'll get back to you soon!", response));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get all messages", description = "Retrieve all contact messages with pagination - ADMIN only")
    public ResponseEntity<ApiResponse<PaginatedResponse<ContactMessageResponse>>> getAllMessages(
            @RequestParam(required = false) ContactStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase("ASC") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<ContactMessageResponse> messages = contactService.getAllMessages(status, pageable);

        return ResponseEntity.ok(ApiResponse.success("Messages retrieved successfully", PaginatedResponse.from(messages)));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get message by ID", description = "Retrieve contact message details - ADMIN only")
    public ResponseEntity<ApiResponse<ContactMessageResponse>> getMessageById(@PathVariable UUID id) {
        ContactMessageResponse message = contactService.getMessageById(id);
        return ResponseEntity.ok(ApiResponse.success("Message retrieved successfully", message));
    }

    @PutMapping("/{id}/respond")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Respond to message", description = "Admin responds to contact message - ADMIN only")
    public ResponseEntity<ApiResponse<ContactMessageResponse>> respondToMessage(
            @PathVariable UUID id,
            @Valid @RequestBody ContactResponseRequest request) {
        ContactMessageResponse response = contactService.respondToMessage(id, request);
        return ResponseEntity.ok(ApiResponse.success("Response sent successfully", response));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update message status", description = "Update contact message status - ADMIN only")
    public ResponseEntity<ApiResponse<ContactMessageResponse>> updateMessageStatus(
            @PathVariable UUID id,
            @RequestParam ContactStatus status) {
        ContactMessageResponse response = contactService.updateMessageStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success("Status updated successfully", response));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete message", description = "Soft delete contact message - ADMIN only")
    public ResponseEntity<ApiResponse<Void>> deleteMessage(@PathVariable UUID id) {
        contactService.deleteMessage(id);
        return ResponseEntity.ok(ApiResponse.success("Message deleted successfully", null));
    }

    @GetMapping("/search")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Search messages", description = "Search contact messages by email, name, or subject - ADMIN only")
    public ResponseEntity<ApiResponse<PaginatedResponse<ContactMessageResponse>>> searchMessages(
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<ContactMessageResponse> messages = contactService.searchMessages(query, pageable);

        return ResponseEntity.ok(ApiResponse.success("Search results retrieved successfully", PaginatedResponse.from(messages)));
    }

    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get message statistics", description = "Get count of messages by status - ADMIN only")
    public ResponseEntity<ApiResponse<java.util.Map<String, Long>>> getMessageStats() {
        java.util.Map<String, Long> stats = new java.util.HashMap<>();
        stats.put("pending", contactService.countMessagesByStatus(ContactStatus.PENDING));
        stats.put("inProgress", contactService.countMessagesByStatus(ContactStatus.IN_PROGRESS));
        stats.put("resolved", contactService.countMessagesByStatus(ContactStatus.RESOLVED));
        stats.put("closed", contactService.countMessagesByStatus(ContactStatus.CLOSED));

        return ResponseEntity.ok(ApiResponse.success("Statistics retrieved successfully", stats));
    }
}
