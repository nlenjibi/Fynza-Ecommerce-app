package ecommerce.graphql.resolver;

import ecommerce.common.response.PaginatedResponse;
import ecommerce.graphql.dto.FAQCategoryCount;
import ecommerce.graphql.dto.FAQConnection;
import ecommerce.graphql.input.FAQFilterInput;
import ecommerce.graphql.input.FAQInput;
import ecommerce.graphql.input.PageInput;
import ecommerce.graphql.input.SortDirection;
import ecommerce.modules.faq.dto.CreateFAQRequest;
import ecommerce.modules.faq.dto.FAQResponse;
import ecommerce.modules.faq.dto.UpdateFAQRequest;
import ecommerce.modules.faq.service.FAQService;
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

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Controller
@RequiredArgsConstructor
@Slf4j
public class FAQResolver {

    private final FAQService faqService;

    @QueryMapping
    public FAQConnection faqs(
            @Argument FAQFilterInput filter,
            @Argument PageInput pagination) {
        log.info("GraphQL Query: faqs with filter: {}", filter);
        
        Pageable pageable = createPageable(pagination);
        Page<FAQResponse> faqsPage;
        
        if (filter != null && filter.getCategory() != null) {
            faqsPage = faqService.getFAQsByCategory(filter.getCategory(), pageable);
        } else if (filter != null && filter.getSearch() != null && !filter.getSearch().isEmpty()) {
            faqsPage = faqService.searchFAQs(filter.getSearch(), pageable);
        } else {
            faqsPage = faqService.getActiveFAQs(pageable);
        }
        
        return FAQConnection.builder()
                .content(faqsPage.getContent())
                .pageInfo(PaginatedResponse.from(faqsPage))
                .build();
    }

    @QueryMapping
    public FAQResponse faq(@Argument UUID id) {
        log.info("GraphQL Query: faq(id: {})", id);
        return faqService.getFAQById(id);
    }

    @QueryMapping
    public List<FAQCategoryCount> faqCategories() {
        log.info("GraphQL Query: faqCategories");
        return faqService.getPublicFAQs().stream()
                .collect(Collectors.groupingBy(FAQResponse::getCategory, Collectors.counting()))
                .entrySet().stream()
                .map(entry -> FAQCategoryCount.builder()
                        .category(entry.getKey())
                        .count(entry.getValue().intValue())
                        .build())
                .collect(Collectors.toList());
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public FAQConnection adminFaqs(
            @Argument FAQFilterInput filter,
            @Argument PageInput pagination) {
        log.info("GraphQL Query: adminFaqs with filter: {}", filter);
        
        Pageable pageable = createPageable(pagination);
        Page<FAQResponse> faqsPage = faqService.getAllFAQs(pageable);
        
        return FAQConnection.builder()
                .content(faqsPage.getContent())
                .pageInfo(PaginatedResponse.from(faqsPage))
                .build();
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public FAQResponse createFAQ(@Argument FAQInput input) {
        log.info("GraphQL Mutation: createFAQ(question: {})", input.getQuestion());
        
        CreateFAQRequest request = CreateFAQRequest.builder()
                .question(input.getQuestion())
                .answer(input.getAnswer())
                .category(input.getCategory())
                .displayOrder(input.getOrder())
                .build();
        
        return faqService.createFAQ(request);
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public FAQResponse updateFAQ(
            @Argument UUID id,
            @Argument FAQInput input) {
        log.info("GraphQL Mutation: updateFAQ(id: {})", id);
        
        UpdateFAQRequest request = UpdateFAQRequest.builder()
                .question(input.getQuestion())
                .answer(input.getAnswer())
                .category(input.getCategory())
                .displayOrder(input.getOrder())
                .build();
        
        return faqService.updateFAQ(id, request);
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public boolean deleteFAQ(@Argument UUID id) {
        log.info("GraphQL Mutation: deleteFAQ(id: {})", id);
        faqService.deleteFAQ(id);
        return true;
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public boolean reorderFAQs(@Argument List<UUID> faqIds) {
        log.info("GraphQL Mutation: reorderFAQs");
        return true;
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public FAQResponse toggleFAQActive(@Argument UUID id) {
        log.info("GraphQL Mutation: toggleFAQActive(id: {})", id);
        return faqService.toggleFAQStatus(id);
    }

    private Pageable createPageable(PageInput input) {
        if (input == null) {
            return PageRequest.of(0, 20, Sort.by(Sort.Direction.ASC, "displayOrder"));
        }
        Sort.Direction direction = input.getDirection() == SortDirection.DESC
            ? Sort.Direction.DESC : Sort.Direction.ASC;
        String sortBy = input.getSortBy() != null ? input.getSortBy() : "displayOrder";
        return PageRequest.of(input.getPage(), input.getSize(), Sort.by(direction, sortBy));
    }
}
