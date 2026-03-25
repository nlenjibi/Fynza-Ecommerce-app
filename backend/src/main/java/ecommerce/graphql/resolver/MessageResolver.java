package ecommerce.graphql.resolver;

import ecommerce.common.response.PaginatedResponse;
import ecommerce.graphql.dto.ConversationConnection;
import ecommerce.graphql.dto.MessageConnection;
import ecommerce.graphql.input.ConversationFilterInput;
import ecommerce.graphql.input.MessageInput;
import ecommerce.graphql.input.PageInput;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.ContextValue;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
@Slf4j
public class MessageResolver {

    @QueryMapping
    public ConversationConnection conversations(
            @Argument ConversationFilterInput filter,
            @Argument PageInput pagination,
            @ContextValue UUID userId) {
        log.info("GraphQL Query: conversations(userId: {})", userId);
        
        Pageable pageable = createPageable(pagination);
        
        return ConversationConnection.builder()
                .content(List.of())
                .pageInfo(PaginatedResponse.from(Page.empty()))
                .build();
    }

    @QueryMapping
    public Object conversation(@Argument UUID id) {
        log.info("GraphQL Query: conversation(id: {})", id);
        return null;
    }

    @QueryMapping
    public MessageConnection messages(
            @Argument UUID conversationId,
            @Argument PageInput pagination) {
        log.info("GraphQL Query: messages(conversationId: {})", conversationId);
        
        Pageable pageable = createPageable(pagination);
        
        return MessageConnection.builder()
                .content(List.of())
                .pageInfo(PaginatedResponse.from(Page.empty()))
                .build();
    }

    @QueryMapping
    public int unreadMessageCount(@ContextValue UUID userId) {
        log.info("GraphQL Query: unreadMessageCount(userId: {})", userId);
        return 0;
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ConversationConnection allConversations(
            @Argument ConversationFilterInput filter,
            @Argument PageInput pagination) {
        log.info("GraphQL Query: allConversations");
        
        Pageable pageable = createPageable(pagination);
        
        return ConversationConnection.builder()
                .content(List.of())
                .pageInfo(PaginatedResponse.from(Page.empty()))
                .build();
    }

    @MutationMapping
    public Object createConversation(
            @Argument MessageInput input,
            @ContextValue UUID userId) {
        log.info("GraphQL Mutation: createConversation(userId: {})", userId);
        return null;
    }

    @MutationMapping
    public Object sendMessage(
            @Argument MessageInput input,
            @ContextValue UUID userId) {
        log.info("GraphQL Mutation: sendMessage(userId: {})", userId);
        return null;
    }

    @MutationMapping
    public Object markMessageAsRead(@Argument UUID messageId) {
        log.info("GraphQL Mutation: markMessageAsRead(messageId: {})", messageId);
        return null;
    }

    @MutationMapping
    public Object markConversationAsRead(@Argument UUID conversationId) {
        log.info("GraphQL Mutation: markConversationAsRead(conversationId: {})", conversationId);
        return null;
    }

    @MutationMapping
    public boolean archiveConversation(@Argument UUID conversationId) {
        log.info("GraphQL Mutation: archiveConversation(conversationId: {})", conversationId);
        return true;
    }

    @MutationMapping
    public boolean deleteConversation(@Argument UUID conversationId) {
        log.info("GraphQL Mutation: deleteConversation(conversationId: {})", conversationId);
        return true;
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
