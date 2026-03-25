package ecommerce.graphql.resolver;

import ecommerce.common.enums.FAQCategory;
import ecommerce.common.response.PaginatedResponse;
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
        Sort.Direction direction = "DESC".equalsIgnoreCase(input.getDirection()) 
            ? Sort.Direction.DESC : Sort.Direction.ASC;
        String sortBy = input.getSortBy() != null ? input.getSortBy() : "displayOrder";
        return PageRequest.of(input.getPage(), input.getSize(), Sort.by(direction, sortBy));
    }

    public static class PageInput {
        private int page = 0;
        private int size = 20;
        private String sortBy;
        private String direction;

        public int getPage() { return page; }
        public void setPage(int page) { this.page = page; }
        public int getSize() { return size; }
        public void setSize(int size) { this.size = size; }
        public String getSortBy() { return sortBy; }
        public void setSortBy(String sortBy) { this.sortBy = sortBy; }
        public String getDirection() { return direction; }
        public void setDirection(String direction) { this.direction = direction; }
    }

    public static class FAQFilterInput {
        private FAQCategory category;
        private Boolean isActive;
        private Boolean isPublic;
        private String search;

        public FAQCategory getCategory() { return category; }
        public void setCategory(FAQCategory category) { this.category = category; }
        public Boolean getIsActive() { return isActive; }
        public void setIsActive(Boolean isActive) { this.isActive = isActive; }
        public Boolean getIsPublic() { return isPublic; }
        public void setIsPublic(Boolean isPublic) { this.isPublic = isPublic; }
        public String getSearch() { return search; }
        public void setSearch(String search) { this.search = search; }
    }

    public static class FAQInput {
        private String question;
        private String answer;
        private FAQCategory category;
        private Integer order;
        private Boolean isPublic;

        public String getQuestion() { return question; }
        public void setQuestion(String question) { this.question = question; }
        public String getAnswer() { return answer; }
        public void setAnswer(String answer) { this.answer = answer; }
        public FAQCategory getCategory() { return category; }
        public void setCategory(FAQCategory category) { this.category = category; }
        public Integer getOrder() { return order; }
        public void setOrder(Integer order) { this.order = order; }
        public Boolean getIsPublic() { return isPublic; }
        public void setIsPublic(Boolean isPublic) { this.isPublic = isPublic; }
    }

    @lombok.Data
    @lombok.Builder
    public static class FAQConnection {
        private List<FAQResponse> content;
        private PaginatedResponse<FAQResponse> pageInfo;
    }

    @lombok.Data
    @lombok.Builder
    public static class FAQCategoryCount {
        private FAQCategory category;
        private Integer count;
    }
}
