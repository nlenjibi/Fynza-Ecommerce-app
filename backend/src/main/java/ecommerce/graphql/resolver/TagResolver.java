package ecommerce.graphql.resolver;

import ecommerce.common.response.PaginatedResponse;
import ecommerce.graphql.dto.TagConnection;
import ecommerce.graphql.dto.SellerTagConnection;
import ecommerce.graphql.input.PageInput;
import ecommerce.graphql.input.SortDirection;
import ecommerce.graphql.input.TagInput;
import ecommerce.graphql.input.SellerTagInput;
import ecommerce.modules.tag.dto.TagResponse;
import ecommerce.modules.tag.service.TagService;
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

@Controller
@RequiredArgsConstructor
@Slf4j
public class TagResolver {

    private final TagService tagService;

    @QueryMapping
    public TagConnection tags(
            @Argument Boolean isActive,
            @Argument PageInput pagination) {
        log.info("GraphQL Query: tags(isActive: {})", isActive);
        
        Pageable pageable = createPageable(pagination);
        List<TagResponse> tags;
        
        if (isActive != null && isActive) {
            tags = tagService.getActiveTags();
        } else {
            tags = tagService.getAllTags();
        }
        
        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), tags.size());
        List<TagResponse> pageContent = start < tags.size() ? tags.subList(start, end) : List.of();
        
        Page<TagResponse> tagPage = new org.springframework.data.domain.PageImpl<>(
                pageContent, pageable, tags.size());
        
        return TagConnection.builder()
                .content(tagPage.getContent())
                .pageInfo(PaginatedResponse.from(tagPage))
                .build();
    }

    @QueryMapping
    public TagResponse tag(@Argument UUID id) {
        log.info("GraphQL Query: tag(id: {})", id);
        return tagService.getTag(id);
    }

    @QueryMapping
    public TagResponse tagBySlug(@Argument String slug) {
        log.info("GraphQL Query: tagBySlug(slug: {})", slug);
        return tagService.getTag(UUID.fromString(slug));
    }

    @QueryMapping
    @PreAuthorize("hasRole('SELLER')")
    public SellerTagConnection sellerTags(
            @Argument Boolean isActive,
            @Argument PageInput pagination) {
        log.info("GraphQL Query: sellerTags");
        return SellerTagConnection.builder()
                .content(List.of())
                .pageInfo(PaginatedResponse.from(Page.empty()))
                .build();
    }

    @QueryMapping
    @PreAuthorize("hasRole('SELLER')")
    public Object sellerTag(@Argument UUID id) {
        log.info("GraphQL Query: sellerTag(id: {})", id);
        return null;
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public TagResponse createTag(@Argument TagInput input) {
        log.info("GraphQL Mutation: createTag(name: {})", input.getName());
        
        ecommerce.modules.tag.dto.CreateTagRequest request = 
                ecommerce.modules.tag.dto.CreateTagRequest.builder()
                .name(input.getName())
                .description(input.getDescription())
                .color(input.getColor())
                .build();
        
        return tagService.createTag(request);
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public TagResponse updateTag(@Argument UUID id, @Argument TagInput input) {
        log.info("GraphQL Mutation: updateTag(id: {})", id);
        
        ecommerce.modules.tag.dto.CreateTagRequest request = 
                ecommerce.modules.tag.dto.CreateTagRequest.builder()
                .name(input.getName())
                .description(input.getDescription())
                .color(input.getColor())
                .build();
        
        return tagService.updateTag(id, request);
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public boolean deleteTag(@Argument UUID id) {
        log.info("GraphQL Mutation: deleteTag(id: {})", id);
        tagService.deleteTag(id);
        return true;
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public TagResponse toggleTagActive(@Argument UUID id) {
        log.info("GraphQL Mutation: toggleTagActive(id: {})", id);
        return tagService.getTag(id);
    }

    @MutationMapping
    @PreAuthorize("hasRole('SELLER')")
    public Object createSellerTag(@Argument SellerTagInput input) {
        log.info("GraphQL Mutation: createSellerTag(name: {})", input.getName());
        return null;
    }

    @MutationMapping
    @PreAuthorize("hasRole('SELLER')")
    public Object updateSellerTag(@Argument UUID id, @Argument SellerTagInput input) {
        log.info("GraphQL Mutation: updateSellerTag(id: {})", id);
        return null;
    }

    @MutationMapping
    @PreAuthorize("hasRole('SELLER')")
    public boolean deleteSellerTag(@Argument UUID id) {
        log.info("GraphQL Mutation: deleteSellerTag(id: {})", id);
        return true;
    }

    private Pageable createPageable(PageInput input) {
        if (input == null) {
            return PageRequest.of(0, 20, Sort.by(Sort.Direction.ASC, "name"));
        }
        Sort.Direction direction = input.getDirection() == SortDirection.DESC
                ? Sort.Direction.DESC : Sort.Direction.ASC;
        String sortBy = input.getSortBy() != null ? input.getSortBy() : "name";
        return PageRequest.of(input.getPage(), input.getSize(), Sort.by(direction, sortBy));
    }
}
