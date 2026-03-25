package ecommerce.graphql.resolver;

import ecommerce.common.response.PaginatedResponse;
import ecommerce.graphql.dto.Report;
import ecommerce.graphql.dto.ReportConnection;
import ecommerce.graphql.dto.ReportSchedule;
import ecommerce.graphql.dto.ReportScheduleConnection;
import ecommerce.graphql.input.PageInput;
import ecommerce.graphql.input.ReportRequestInput;
import ecommerce.graphql.input.ReportScheduleInput;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ReportResolver {

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ReportConnection reports(@Argument PageInput pagination) {
        log.info("GraphQL Query: reports");
        
        Pageable pageable = createPageable(pagination);
        
        return ReportConnection.builder()
                .content(List.of())
                .pageInfo(PaginatedResponse.from(Page.empty()))
                .build();
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Object report(@Argument UUID id) {
        log.info("GraphQL Query: report(id: {})", id);
        return null;
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ReportScheduleConnection reportSchedules(
            @Argument Boolean isActive,
            @Argument PageInput pagination) {
        log.info("GraphQL Query: reportSchedules(isActive: {})", isActive);
        
        Pageable pageable = createPageable(pagination);
        
        return ReportScheduleConnection.builder()
                .content(List.of())
                .pageInfo(PaginatedResponse.from(Page.empty()))
                .build();
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Object reportSchedule(@Argument UUID id) {
        log.info("GraphQL Query: reportSchedule(id: {})", id);
        return null;
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String generateReportPreview(
            @Argument String type,
            @Argument LocalDateTime startDate,
            @Argument LocalDateTime endDate) {
        log.info("GraphQL Query: generateReportPreview(type: {}, startDate: {}, endDate: {})", type, startDate, endDate);
        return "{}";
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Object generateReport(@Argument ReportRequestInput input) {
        log.info("GraphQL Mutation: generateReport(name: {}, type: {})", input.getName(), input.getType());
        
        return Report.builder()
                .id(UUID.randomUUID().toString())
                .name(input.getName())
                .type(input.getType())
                .format(input.getFormat())
                .status("PENDING")
                .startDate(input.getStartDate())
                .endDate(input.getEndDate())
                .build();
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Object regenerateReport(@Argument UUID reportId) {
        log.info("GraphQL Mutation: regenerateReport(reportId: {})", reportId);
        
        return Report.builder()
                .id(reportId.toString())
                .status("PENDING")
                .build();
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public boolean deleteReport(@Argument UUID id) {
        log.info("GraphQL Mutation: deleteReport(id: {})", id);
        return true;
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Object createReportSchedule(@Argument ReportScheduleInput input) {
        log.info("GraphQL Mutation: createReportSchedule(name: {})", input.getName());
        
        return ReportSchedule.builder()
                .id(UUID.randomUUID().toString())
                .name(input.getName())
                .type(input.getType())
                .format(input.getFormat())
                .schedule(input.getSchedule())
                .isActive(input.getIsActive() != null ? input.getIsActive() : true)
                .build();
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Object updateReportSchedule(
            @Argument UUID id,
            @Argument ReportScheduleInput input) {
        log.info("GraphQL Mutation: updateReportSchedule(id: {})", id);
        
        return ReportSchedule.builder()
                .id(id.toString())
                .name(input.getName())
                .type(input.getType())
                .format(input.getFormat())
                .schedule(input.getSchedule())
                .isActive(input.getIsActive() != null ? input.getIsActive() : true)
                .build();
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public boolean deleteReportSchedule(@Argument UUID id) {
        log.info("GraphQL Mutation: deleteReportSchedule(id: {})", id);
        return true;
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Object toggleReportSchedule(@Argument UUID id) {
        log.info("GraphQL Mutation: toggleReportSchedule(id: {})", id);
        
        return ReportSchedule.builder()
                .id(id.toString())
                .isActive(true)
                .build();
    }

    private Pageable createPageable(PageInput input) {
        if (input == null) {
            return PageRequest.of(0, 20, Sort.by(Sort.Direction.DESC, "createdAt"));
        }
        Sort.Direction direction = input.getDirection() == ecommerce.graphql.input.SortDirection.DESC
                ? Sort.Direction.DESC : Sort.Direction.ASC;
        String sortBy = input.getSortBy() != null ? input.getSortBy() : "createdAt";
        return PageRequest.of(input.getPage(), input.getSize(), Sort.by(direction, sortBy));
    }
}
