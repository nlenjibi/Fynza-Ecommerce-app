package ecommerce.graphql.resolver;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

@Controller
public class MessageResolver {

    @QueryMapping
    public String conversations() {
        throw new UnsupportedOperationException("Message service not implemented");
    }

    @QueryMapping
    public String conversation() {
        throw new UnsupportedOperationException("Message service not implemented");
    }

    @QueryMapping
    public String messages() {
        throw new UnsupportedOperationException("Message service not implemented");
    }

    @QueryMapping
    public String unreadMessageCount() {
        throw new UnsupportedOperationException("Message service not implemented");
    }

    @MutationMapping
    public String createConversation(@Argument String input) {
        throw new UnsupportedOperationException("Message service not implemented");
    }

    @MutationMapping
    public String sendMessage(@Argument String input) {
        throw new UnsupportedOperationException("Message service not implemented");
    }

    @MutationMapping
    public String markMessageAsRead() {
        throw new UnsupportedOperationException("Message service not implemented");
    }
}