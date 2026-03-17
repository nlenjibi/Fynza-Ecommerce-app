package ecommerce.graphql.resolver;

import ecommerce.modules.notification.dto.NotificationResponse;
import ecommerce.modules.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.ContextValue;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
@Slf4j
public class NotificationResolver {

    private final NotificationService notificationService;

    @QueryMapping
    public List<NotificationResponse> myNotifications(@ContextValue UUID userId) {
        log.info("GraphQL Query: myNotifications for user {}", userId);
        return notificationService.findByUser(userId);
    }

    @MutationMapping
    public NotificationResponse markNotificationAsRead(@Argument UUID id, @ContextValue UUID userId) {
        log.info("GraphQL Mutation: markNotificationAsRead(id: {})", id);
        return notificationService.markAsRead(id);
    }

    @MutationMapping
    public Boolean markAllNotificationsAsRead(@ContextValue UUID userId) {
        log.info("GraphQL Mutation: markAllNotificationsAsRead for user {}", userId);
        notificationService.markAllAsRead(userId);
        return true;
    }
}
