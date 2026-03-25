package ecommerce.graphql.input;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReportRequestInput {
    private String name;
    private String type;
    private String format;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String parameters;
}
