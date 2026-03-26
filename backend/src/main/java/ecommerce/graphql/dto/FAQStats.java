package ecommerce.graphql.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class FAQStats {
    private Integer totalFAQs;
    private Integer activeFAQs;
    private Integer draftFAQs;
    private Integer totalViews;
}
