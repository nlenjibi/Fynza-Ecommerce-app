package ecommerce.graphql.input;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReportScheduleInput {
    private String name;
    private String type;
    private String format;
    private String schedule;
    private String parameters;
    private Boolean isActive;
}
