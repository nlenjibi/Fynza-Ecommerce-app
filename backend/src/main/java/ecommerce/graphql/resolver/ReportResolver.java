package ecommerce.graphql.resolver;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

@Controller
public class ReportResolver {

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String reports() {
        throw new UnsupportedOperationException("Report service not implemented");
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String report() {
        throw new UnsupportedOperationException("Report service not implemented");
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String reportSchedules() {
        throw new UnsupportedOperationException("Report service not implemented");
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String generateReportPreview() {
        throw new UnsupportedOperationException("Report service not implemented");
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String generateReport(@Argument String input) {
        throw new UnsupportedOperationException("Report service not implemented");
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String createReportSchedule(@Argument String input) {
        throw new UnsupportedOperationException("Report service not implemented");
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteReport() {
        throw new UnsupportedOperationException("Report service not implemented");
    }
}