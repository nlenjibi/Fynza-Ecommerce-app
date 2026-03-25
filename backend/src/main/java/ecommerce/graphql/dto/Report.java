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
public class Report {
    private String id;
    private String name;
    private String type;
    private String format;
    private String parameters;
    private Object generatedBy;
    private String fileUrl;
    private String status;
    private String errorMessage;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime createdAt;
    private LocalDateTime completedAt;
}
