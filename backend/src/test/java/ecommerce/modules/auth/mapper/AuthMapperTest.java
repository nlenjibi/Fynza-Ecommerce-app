package ecommerce.modules.auth.mapper;

import ecommerce.common.enums.UserStatus;
import ecommerce.modules.auth.dto.AuthResponse;
import ecommerce.modules.user.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

public class AuthMapperTest {

    private AuthMapper authMapper;

    @BeforeEach
    public void setUp() {
        authMapper = new AuthMapper();
    }

    @Test
    public void testToAuthResponse() {
        // Given
        UUID userId = UUID.randomUUID();
        User user = User.builder()
                .id(userId)
                .email("test@example.com")
                .username("testuser")
                .firstName("John")
                .lastName("Doe")
                .role(User.Role.CUSTOMER)
                .status(UserStatus.ACTIVE)
                .build();

        String accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
        String refreshToken = "refresh-token-123";
        Long expiresIn = 3600L;

        // When
        AuthResponse response = authMapper.toAuthResponse(accessToken, refreshToken, expiresIn, user);

        // Then
        assertNotNull(response);
        assertEquals(accessToken, response.getAccessToken());
        assertEquals(refreshToken, response.getRefreshToken());
        assertEquals("Bearer", response.getTokenType());
        assertEquals(expiresIn, response.getExpiresIn());
        assertNotNull(response.getUser());
        assertEquals(userId, response.getUser().getId());
        assertEquals("test@example.com", response.getUser().getEmail());
        assertEquals("testuser", response.getUser().getUsername());
        assertEquals("CUSTOMER", response.getUser().getRole());
        assertEquals("John", response.getUser().getFirstName());
        assertEquals("Doe", response.getUser().getLastName());
    }

    @Test
    public void testToAuthResponse_AdminUser() {
        // Given
        UUID userId = UUID.randomUUID();
        User user = User.builder()
                .id(userId)
                .email("admin@example.com")
                .username("admin")
                .firstName("Admin")
                .lastName("User")
                .role(User.Role.ADMIN)
                .status(UserStatus.ACTIVE)
                .build();

        // When
        AuthResponse response = authMapper.toAuthResponse("token", "refresh", 1800L, user);

        // Then
        assertNotNull(response.getUser());
        assertEquals("ADMIN", response.getUser().getRole());
    }

    @Test
    public void testToAuthResponse_SellerUser() {
        // Given
        UUID userId = UUID.randomUUID();
        User user = User.builder()
                .id(userId)
                .email("seller@example.com")
                .username("seller")
                .firstName("Seller")
                .lastName("User")
                .role(User.Role.SELLER)
                .status(UserStatus.ACTIVE)
                .build();

        // When
        AuthResponse response = authMapper.toAuthResponse("token", "refresh", 1800L, user);

        // Then
        assertNotNull(response.getUser());
        assertEquals("SELLER", response.getUser().getRole());
    }

    @Test
    public void testToUserInfo() {
        // Given
        UUID userId = UUID.randomUUID();
        User user = User.builder()
                .id(userId)
                .email("info@example.com")
                .username("infouser")
                .firstName("Info")
                .lastName("User")
                .role(User.Role.CUSTOMER)
                .build();

        // When
        AuthResponse.UserInfo userInfo = authMapper.toUserInfo(user);

        // Then
        assertNotNull(userInfo);
        assertEquals(userId, userInfo.getId());
        assertEquals("info@example.com", userInfo.getEmail());
        assertEquals("infouser", userInfo.getUsername());
        assertEquals("CUSTOMER", userInfo.getRole());
        assertEquals("Info", userInfo.getFirstName());
        assertEquals("User", userInfo.getLastName());
    }

    @Test
    public void testToUserInfo_NullUser() {
        // When & Then
        assertThrows(NullPointerException.class, () -> authMapper.toUserInfo(null));
    }
}
