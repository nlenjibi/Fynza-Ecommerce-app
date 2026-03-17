package ecommerce.config;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.jsontype.impl.LaissezFaireSubTypeValidator;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.autoconfigure.data.redis.RedisProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.CacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

/**
 * Redis Configuration (L2 Cache)
 * 
 * Smart Caching Strategy (per system.md):
 * - Token blacklist: Redis only (24 hours)
 * - Stock reservations: Redis only (15 min)
 * - Shared product cache: Redis only (5 min)
 * - Categories: Redis only (1 hour)
 * - User sessions: Redis only (15 min)
 * 
 * NOT cached in Redis (per smart guidelines):
 * - Orders (write-heavy, real-time)
 * - Payments (critical, real-time)
 * - Cart items (frequently changing)
 */
@Configuration
@RequiredArgsConstructor
@Slf4j
@EnableConfigurationProperties(RedisProperties.class)
@ConditionalOnProperty(name = "cache.level", havingValue = "redis")
public class RedisConfig {

    // Smart caching - only cache read-heavy, infrequently changing data
    // Per system.md: products (5 min), categories (1 hour), userSessions (15 min)
    // Redis-only: tokenBlacklist (24 hours), stockReservations (15 min)

    private final RedisProperties redisProperties;

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        log.info("Configuring Redis connection: host={}, port={}",
                redisProperties.getHost(),
                redisProperties.getPort());
        return new org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory(
                redisProperties.getHost(),
                redisProperties.getPort()
        );
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.activateDefaultTyping(
                LaissezFaireSubTypeValidator.instance,
                ObjectMapper.DefaultTyping.NON_FINAL,
                JsonTypeInfo.As.PROPERTY
        );

        GenericJackson2JsonRedisSerializer jsonSerializer = new GenericJackson2JsonRedisSerializer(objectMapper);
        StringRedisSerializer stringSerializer = new StringRedisSerializer();

        template.setKeySerializer(stringSerializer);
        template.setValueSerializer(jsonSerializer);
        template.setHashKeySerializer(stringSerializer);
        template.setHashValueSerializer(jsonSerializer);

        template.afterPropertiesSet();
        log.info("RedisTemplate configured successfully");
        return template;
    }

    @Bean
    public CacheManager cacheManager(RedisConnectionFactory connectionFactory) {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.activateDefaultTyping(
                LaissezFaireSubTypeValidator.instance,
                ObjectMapper.DefaultTyping.NON_FINAL,
                JsonTypeInfo.As.PROPERTY
        );

        GenericJackson2JsonRedisSerializer jsonSerializer = new GenericJackson2JsonRedisSerializer(objectMapper);
        StringRedisSerializer stringSerializer = new StringRedisSerializer();

        RedisCacheConfiguration defaultConfig = RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofMinutes(15))
                .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(stringSerializer))
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(jsonSerializer))
                .disableCachingNullValues();

        Map<String, RedisCacheConfiguration> cacheConfigs = new HashMap<>();

        // Per system.md TTL specifications
        cacheConfigs.put("products", defaultConfig.entryTtl(Duration.ofMinutes(5)));
        cacheConfigs.put("categories", defaultConfig.entryTtl(Duration.ofHours(1)));
        cacheConfigs.put("userSessions", defaultConfig.entryTtl(Duration.ofMinutes(15)));
        
        // Security-critical, longer TTL
        cacheConfigs.put("tokenBlacklist", defaultConfig.entryTtl(Duration.ofHours(24)));
        
        // Stock reservations - per architecture.md
        cacheConfigs.put("stockReservations", defaultConfig.entryTtl(Duration.ofMinutes(15)));

        log.info("Redis CacheManager configured with {} caches (smart caching enabled)", cacheConfigs.size());
        return RedisCacheManager.builder(connectionFactory)
                .cacheDefaults(defaultConfig)
                .withInitialCacheConfigurations(cacheConfigs)
                .transactionAware()
                .build();
    }
}
