package ecommerce.modules.contact.dto;

import ecommerce.modules.contact.entity.ContactMessage;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContactMessageResponse {
    private UUID id;
    private String name;
    private String email;
    private String phone;
    private String subject;
    private String message;
    private String status;
    private String adminResponse;
    private LocalDateTime respondedAt;
    private String respondedBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static ContactMessageResponse from(ContactMessage message) {
        return ContactMessageResponse.builder()
                .id(message.getId())
                .name(message.getName())
                .email(message.getEmail())
                .phone(message.getPhone())
                .subject(message.getSubject())
                .message(message.getMessage())
                .status(message.getStatus().name())
                .adminResponse(message.getAdminResponse())
                .respondedAt(message.getRespondedAt())
                .respondedBy(message.getRespondedBy())
                .createdAt(message.getCreatedAt())
                .updatedAt(message.getUpdatedAt())
                .build();
    }
}
