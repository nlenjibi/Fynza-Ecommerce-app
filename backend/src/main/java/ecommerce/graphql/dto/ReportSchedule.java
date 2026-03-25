package ecommerce.graphql.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ReportSchedule {
    private String id;
    private String name;
    private String type;
    private String format;
    private String schedule;
    private String parameters;
    private LocalDateTime lastRunAt;
    private LocalDateTime nextRunAt;
    private Boolean isActive;
    private Object createdBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
