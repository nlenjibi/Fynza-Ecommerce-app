package ecommerce.security;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.time.Duration;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.*;

/**
 * TokenBlacklistService Unit Tests
 * 
 * Tests token blacklist functionality including:
 * - Adding tokens to blacklist
 * - Checking if token is blacklisted
 * - Token version tracking per user
 * - Bloom filter for fast lookups
 * 
 * Per system.md:
 * - Uses SHA-256 hashing for blacklisted tokens
 * - Token version tracking per user for immediate invalidation
 */
@DisplayName("TokenBlacklistService Tests")
class TokenBlacklistServiceTest {

    private TokenBlacklistService tokenBlacklistService;

    @BeforeEach
    void setUp() {
        // Create a real Caffeine cache for testing
        Cache<String, Long> tokenCache = Caffeine.newBuilder()
                .maximumSize(10000)
                .expireAfterWrite(24, TimeUnit.HOURS)
                .build();
        
        Cache<String, String> tokenVersionCache = Caffeine.newBuilder()
                .maximumSize(10000)
                .expireAfterWrite(7, TimeUnit.DAYS)
                .build();
        
        tokenBlacklistService = new TokenBlacklistService(tokenCache, tokenVersionCache);
    }

    @Nested
    @DisplayName("Token Blacklisting")
    class TokenBlacklistTests {

        @Test
        @DisplayName("Should add token to blacklist")
        void addToBlacklist_ValidToken_AddsSuccessfully() {
            // Arrange
            String token = "test-jwt-token-123";

            // Act
            tokenBlacklistService.addToBlacklist(token);

            // Assert
            assertTrue(tokenBlacklistService.isBlacklisted(token));
        }

        @Test
        @DisplayName("Should check if token is blacklisted")
        void isBlacklisted_BlacklistedToken_ReturnsTrue() {
            // Arrange
            String token = "another-test-token";
            tokenBlacklistService.addToBlacklist(token);

            // Act
            boolean isBlacklisted = tokenBlacklistService.isBlacklisted(token);

            // Assert
            assertTrue(isBlacklisted);
        }

        @Test
        @DisplayName("Should return false for non-blacklisted token")
        void isBlacklisted_NonBlacklistedToken_ReturnsFalse() {
            // Arrange
            String token = "non-blacklisted-token";

            // Act
            boolean isBlacklisted = tokenBlacklistService.isBlacklisted(token);

            // Assert
            assertFalse(isBlacklisted);
        }

        @Test
        @DisplayName("Should return false for null token")
        void isBlacklisted_NullToken_ReturnsFalse() {
            // Act
            boolean isBlacklisted = tokenBlacklistService.isBlacklisted(null);

            // Assert
            assertFalse(isBlacklisted);
        }

        @Test
        @DisplayName("Should handle empty token")
        void isBlacklisted_EmptyToken_ReturnsFalse() {
            // Act
            boolean isBlacklisted = tokenBlacklistService.isBlacklisted("");

            // Assert
            assertFalse(isBlacklisted);
        }
    }

    @Nested
    @DisplayName("Token Version Management")
    class TokenVersionTests {

        @Test
        @DisplayName("Should create token version for user")
        void createTokenVersion_CreatesNewVersion() {
            // Arrange
            UUID userId = UUID.randomUUID();

            // Act
            String version = tokenBlacklistService.createTokenVersion(userId);

            // Assert
            assertNotNull(version);
            assertFalse(version.isEmpty());
        }

        @Test
        @DisplayName("Should increment token version for user")
        void incrementTokenVersion_IncrementsVersion() {
            // Arrange
            UUID userId = UUID.randomUUID();
            String initialVersion = tokenBlacklistService.createTokenVersion(userId);

            // Act
            String newVersion = tokenBlacklistService.incrementTokenVersion(userId);

            // Assert
            assertNotNull(newVersion);
            assertNotEquals(initialVersion, newVersion);
        }

        @Test
        @DisplayName("Should invalidate user tokens by version")
        void invalidateUserTokens_InvalidatesAllTokens() {
            // Arrange
            UUID userId = UUID.randomUUID();
            String version = tokenBlacklistService.createTokenVersion(userId);

            // Act
            tokenBlacklistService.invalidateUserTokens(userId);

            // Assert - version should be incremented
            String newVersion = tokenBlacklistService.getTokenVersion(userId);
            assertNotEquals(version, newVersion);
        }

        @Test
        @DisplayName("Should get token version for user")
        void getTokenVersion_ReturnsCurrentVersion() {
            // Arrange
            UUID userId = UUID.randomUUID();
            String version = tokenBlacklistService.createTokenVersion(userId);

            // Act
            String retrievedVersion = tokenBlacklistService.getTokenVersion(userId);

            // Assert
            assertEquals(version, retrievedVersion);
        }

        @Test
        @DisplayName("Should return null for non-existent user version")
        void getTokenVersion_NonExistentUser_ReturnsNull() {
            // Arrange
            UUID userId = UUID.randomUUID();

            // Act
            String version = tokenBlacklistService.getTokenVersion(userId);

            // Assert
            assertNull(version);
        }
    }

    @Nested
    @DisplayName("Bulk Operations")
    class BulkOperationTests {

        @Test
        @DisplayName("Should add multiple tokens to blacklist")
        void addMultipleToBlacklist_AddsAllTokens() {
            // Arrange
            String[] tokens = {"token1", "token2", "token3"};

            // Act
            for (String token : tokens) {
                tokenBlacklistService.addToBlacklist(token);
            }

            // Assert
            assertTrue(tokenBlacklistService.isBlacklisted("token1"));
            assertTrue(tokenBlacklistService.isBlacklisted("token2"));
            assertTrue(tokenBlacklistService.isBlacklisted("token3"));
        }

        @Test
        @DisplayName("Should clear blacklist")
        void clearBlacklist_RemovesAllTokens() {
            // Arrange
            tokenBlacklistService.addToBlacklist("token1");
            tokenBlacklistService.addToBlacklist("token2");

            // Act
            tokenBlacklistService.clearBlacklist();

            // Assert
            assertFalse(tokenBlacklistService.isBlacklisted("token1"));
            assertFalse(tokenBlacklistService.isBlacklisted("token2"));
        }
    }

    @Nested
    @DisplayName("Token Version Validation")
    class TokenVersionValidationTests {

        @Test
        @DisplayName("Should validate token version")
        void isTokenVersionValid_ValidVersion_ReturnsTrue() {
            // Arrange
            UUID userId = UUID.randomUUID();
            String version = tokenBlacklistService.createTokenVersion(userId);

            // Act
            boolean isValid = tokenBlacklistService.isTokenVersionValid(userId, version);

            // Assert
            assertTrue(isValid);
        }

        @Test
        @DisplayName("Should invalidate old token version")
        void isTokenVersionValid_OldVersion_ReturnsFalse() {
            // Arrange
            UUID userId = UUID.randomUUID();
            String oldVersion = tokenBlacklistService.createTokenVersion(userId);
            
            // Increment version (invalidate old tokens)
            tokenBlacklistService.incrementTokenVersion(userId);

            // Act
            boolean isValid = tokenBlacklistService.isTokenVersionValid(userId, oldVersion);

            // Assert
            assertFalse(isValid);
        }

        @Test
        @DisplayName("Should return false for null version")
        void isTokenVersionValid_NullVersion_ReturnsFalse() {
            // Arrange
            UUID userId = UUID.randomUUID();
            tokenBlacklistService.createTokenVersion(userId);

            // Act
            boolean isValid = tokenBlacklistService.isTokenVersionValid(userId, null);

            // Assert
            assertFalse(isValid);
        }

        @Test
        @DisplayName("Should return false for non-existent user")
        void isTokenVersionValid_NonExistentUser_ReturnsFalse() {
            // Arrange
            UUID userId = UUID.randomUUID();

            // Act
            boolean isValid = tokenBlacklistService.isTokenVersionValid(userId, "some-version");

            // Assert
            assertFalse(isValid);
        }
    }
}
