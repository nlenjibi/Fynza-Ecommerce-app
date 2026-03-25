package ecommerce.graphql.dto;

import ecommerce.common.response.PaginatedResponse;
import ecommerce.modules.tag.dto.TagResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TagConnection {
    private List<TagResponse> content;
    private PaginatedResponse<TagResponse> pageInfo;
}
