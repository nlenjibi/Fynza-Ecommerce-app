package ecommerce.graphql.dto;

import ecommerce.common.response.PaginatedResponse;
import ecommerce.modules.contact.dto.ContactMessageResponse;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class ContactMessageConnection {
    private List<ContactMessageResponse> content;
    private PaginatedResponse<ContactMessageResponse> pageInfo;
}
