package ecommerce.graphql.input;

import ecommerce.common.enums.ContactCategory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ContactMessageInput {
    private String name;
    private String email;
    private String phone;
    private String subject;
    private String message;
    private String orderId;
    private ContactCategory category;
}
